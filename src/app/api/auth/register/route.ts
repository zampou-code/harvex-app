import { NextResponse } from "next/server";
import { WelcomeMail } from "@/mail/client/welcome-mail";
import { createHash } from "crypto";
import { db } from "@/lib/firebase-admin";
import { nanoid } from "nanoid";
import { sendMail } from "@/lib/mail";
import { signIn } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      country,
      city,
      sex,
      referral_id,
    } = await request?.json();

    const userDoc = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!userDoc.empty) {
      return NextResponse.json(
        { state: false, message: "Cet email est déjà utilisé" },
        { status: 409 }
      );
    }

    const userId = nanoid();
    const hashedPassword = createHash("sha256").update(password).digest("hex");

    await db
      .collection("users")
      .doc(userId)
      .set({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        clear_password: password,
        phone,
        country,
        city,
        sex,
        kyc: {
          file: "",
          type: "",
          status: false,
        },
        role: "user",
        referral_id: referral_id || "",
        created_at: new Date().toISOString(),
        referral_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      });

    await db.collection("accounts").add({
      main: {
        amount: 0,
      },
      affiliate: {
        amount: 0,
      },
      user_id: userId,
      created_at: new Date().toISOString(),
    });

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    sendMail({
      to: email,
      body: WelcomeMail({ name: `${firstname} ${lastname}` }),
      subject:
        "Bienvenue chez HARVEX GROUPE - Votre aventure financière commence maintenant !",
    });

    return NextResponse.json(
      { state: true, data: { message: "Register successful", userId } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
        state: false,
        data: {
          message: "An error occurred during register. Please try again.",
        },
      },
      { status: 500 }
    );
  }
}
