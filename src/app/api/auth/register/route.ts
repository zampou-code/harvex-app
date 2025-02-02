import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase-admin";

import { NextResponse } from "next/server";

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

    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userId = userCredential.user.uid;

    await db
      .collection("users")
      .doc(userId)
      .set({
        firstname,
        lastname,
        email,
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

    // await sendEmailVerification(userCredential.user);

    return NextResponse.json(
      { state: true, data: { message: "Register successful", userId } },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
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
