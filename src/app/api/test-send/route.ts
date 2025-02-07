import { NextResponse } from "next/server";
import { TestMail } from "@/mail/test-mail";
import { sendMail } from "@/lib/mail";

export async function GET() {
  try {
    sendMail({
      name: "Harvex",
      body: TestMail(),
      subject: "Harvex",
      to: "zampou.elec@gmail.com",
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
