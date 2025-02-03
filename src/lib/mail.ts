import { ReactElement } from "react";
import nodemailer from "nodemailer";
import { render } from "@react-email/components";

type sendMailType = {
  to: string;
  name: string;
  subject: string;
  body: ReactElement;
};

export async function sendMail({ to, name, subject, body }: sendMailType) {
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
      name,
      subject,
      html: emailHtml,
    };

    await transporter.sendMail(options);
  } catch (error) {
    throw error;
  }
}

// Email: contact@harvexgroupe.com
// Mot de passe: @harvex2025Grp
