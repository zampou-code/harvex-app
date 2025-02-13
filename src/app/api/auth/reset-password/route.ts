import { NextResponse } from "next/server";
import { ResetPasswordMail } from "@/mail/reset-password-mail";
import { db } from "@/lib/firebase-admin";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const { email } = await request?.json();
    const userSnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (userSnapshot.empty) {
      return NextResponse.json(
        {
          state: false,
          message: "Code de réinitialisation invalide ou expiré",
        },
        { status: 400 }
      );
    }

    const userDoc = userSnapshot.docs[0];
    const resetCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    await db.collection("users").doc(userDoc.id).update({
      reset_password_code: resetCode,
    });

    sendMail({
      to: "zampou.elec@gmail.com",
      body: ResetPasswordMail({ resetCode }),
      subject: "Réinitialisation de votre mot de passe Harvex",
    });
  } finally {
    return NextResponse.json(
      {
        state: true,
        message: "Email de réinitialisation envoyé avec succès",
      },
      { status: 200 }
    );
  }
}
