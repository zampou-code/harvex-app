import { NextResponse } from "next/server";
// import { ResetPasswordMail } from "@/mail/reset-password-mail";
import { WelcomeMail } from "@/mail/client/welcome-mail";
// import { TestMail } from "@/mail/test-mail";
import { sendMail } from "@/lib/mail";

export async function GET() {
  try {
    sendMail({
      to: "zampou.elec@gmail.com",
      body: WelcomeMail({ name: "Jean François" }),
      subject:
        "Bienvenue chez HARVEX GROUPE - Votre aventure financière commence maintenant !",
    });

    // sendMail({
    //   body: TestMail(),
    //   subject: "Harvex",
    //   to: "zampou.elec@gmail.com",
    // });

    // sendMail({
    //   to: "zampou.elec@gmail.com",
    //   body: ResetPasswordMail({ resetCode: "000000" }),
    //   subject: "Réinitialisation de votre mot de passe Harvex",
    // });

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
    return NextResponse.json(
      {
        error,
        state: false,
        data: { message: "Send email failed" },
      },
      { status: 500 }
    );
  }
}
