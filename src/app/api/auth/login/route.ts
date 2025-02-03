import { NextResponse } from "next/server";
import { signIn } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request?.json();

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return NextResponse.json(
      { state: true, data: { message: "Login successful" } },
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
