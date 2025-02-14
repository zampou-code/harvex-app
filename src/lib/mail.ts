import { ReactElement } from "react";
import nodemailer from "nodemailer";
import { render } from "@react-email/components";

type sendMailType = {
  to: string;
  subject: string;
  body: ReactElement;
};

export async function sendMail({ to, subject, body }: sendMailType) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    // port: 587,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const emailHtml = await render(body);

  try {
    // await transporter.verify();
    const options = {
      to,
      subject,
      html: emailHtml,
      from: '"Harvex Groupe" <no-reply@harvexgroupe.com>',
    } satisfies nodemailer.SendMailOptions;

    console.log("email data: ", { ...options, html: "" });

    await transporter.sendMail(options);
    console.log("success email send");
  } catch (error) {
    console.error("error email send: ", error);
    throw error;
  }
}
