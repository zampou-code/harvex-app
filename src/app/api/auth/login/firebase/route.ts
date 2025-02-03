import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase-admin";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request?.json();
    const user = await signInWithEmailAndPassword(auth, email, password);

    console.log(user);
    return NextResponse.json(
      {
        state: true,
        data: {
          id: user.user.uid,
          email: user.user.email,
          message: "Login firebase successful",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        state: false,
        data: { message: "Invalid identifier or password" },
      },
      { status: 500 }
    );
  }
}
