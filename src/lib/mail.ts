import nodemailer from "nodemailer";
import { ReactElement } from "react";
import { render } from "@react-email/components";

type sendMailType = {
  to: string;
  subject: string;
  body: ReactElement;
};

export async function sendMail({ to, subject, body }: sendMailType) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const emailHtml = await render(body);

  try {
    await transporter.verify();

    const options = {
      to,
      subject,
      html: emailHtml,
      from: `"Harvex Groupe" <${process.env.SMTP_USER}>`,
    } satisfies nodemailer.SendMailOptions;

    await transporter.sendMail(options);
    console.log("success email send");
  } catch (error) {
    console.error("error email send: ", error);
    throw error;
  }
}
