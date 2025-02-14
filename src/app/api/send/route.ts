import { NextResponse } from "next/server";
import { WelcomeMail } from "@/mail/client/welcome-mail";
import { auth } from "@/lib/auth";
import { sendMail } from "@/lib/mail";

export const GET = auth(async function GET(request) {
  try {
    const email = request.auth?.user?.email;
    console.log("email: ", email);

    await sendMail({
      to: email as string,
      // to: "zampou.elec@gmail.com",
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
});
