import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request?.json();
    console.log({ email });
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
