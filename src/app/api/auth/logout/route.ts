import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase-admin";
import { signOut as fireSignOut } from "firebase/auth";
import { signOut } from "@/lib/auth";

export async function GET() {
  try {
    await fireSignOut(auth);
    await signOut({ redirect: false });

    return NextResponse.json(
      { state: true, data: { message: "Logout successful" } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
        state: false,
        data: { message: "An error occurred during logout. Please try again." },
      },
      { status: 500 }
    );
  }
}
