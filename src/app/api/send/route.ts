import { NextResponse } from "next/server";
import { WelcomeMail } from "@/mail/client/welcome-mail";
import { auth } from "@/lib/auth";
import { sendMail } from "@/lib/mail";

export const GET = auth(async function GET(request) {
  if (!request.auth)
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  try {
    const { email } = await request.json();

    await sendMail({
      to: email as string,
      body: WelcomeMail({ name: "Jean François" }),
      subject:
        "Bienvenue chez HARVEX GROUPE - Votre aventure financière commence maintenant !",
    });

    console.log("success email send");

    return NextResponse.json(
      {
        state: true,
        data: {
          message: "Send email successful",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("error email send: ", error);
    return NextResponse.json(
      {
        error,
        state: false,
        data: { message: "Send email failed" },
      },
      { status: 500 }
    );
  }
}) as any;
