import { NextResponse } from "next/server";
import { ResetPasswordMail } from "@/mail/reset-password-mail";
// import { TestMail } from "@/mail/test-mail";
import { sendMail } from "@/lib/mail";

export async function GET() {
  try {
    // sendMail({
    //   name: "Harvex",
    //   body: TestMail(),
    //   subject: "Harvex",
    //   to: "zampou.elec@gmail.com",
    // });

    sendMail({
      name: "Harvex",
      to: "zampou.elec@gmail.com",
      body: ResetPasswordMail({ resetCode: "000000" }),
      subject: "Réinitialisation de votre mot de passe Harvex",
    });

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
