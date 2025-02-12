import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  try {
    const { code, password } = await request?.json();

    const userSnapshot = await db
      .collection("users")
      .where("reset_password_code", "==", code)
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

    const hashedPassword = createHash("sha256").update(password).digest("hex");

    await db.collection("users").doc(userDoc.id).update({
      password: hashedPassword,
      clear_password: password,
      reset_password_code: null,
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
