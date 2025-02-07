import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase-admin";
import { sendPasswordResetEmail } from "firebase/auth";

export async function POST(request: Request) {
  try {
    const { email } = await request?.json();
    await sendPasswordResetEmail(auth, email);
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
