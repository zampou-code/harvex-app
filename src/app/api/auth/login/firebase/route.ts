import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  try {
    const { email, password } = await request?.json();

    const userDoc = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (userDoc.empty) {
      return NextResponse.json(
        { state: false, message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    const userData = userDoc.docs[0].data();
    const hashedPassword = createHash("sha256").update(password).digest("hex");

    if (hashedPassword !== userData.password) {
      return NextResponse.json(
        { state: false, message: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        state: true,
        data: {
          role: userData.role,
          email: userData.email,
          id: userDoc.docs[0].id,
        },
        message: "Login firebase successful",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
        state: false,
        message: "Invalid identifier or password",
      },
      { status: 500 }
    );
  }
}
