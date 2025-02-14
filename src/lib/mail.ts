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
    port: 587, // Ou 465 si besoin
    secure: false, // false pour 587, true pour 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const emailHtml = await render(body);

  try {
    const options: nodemailer.SendMailOptions = {
      to,
      subject,
      html: emailHtml,

      from: `"Harvex Groupe" ${process.env.SMTP_USER}`, // Doit être un email valide LWS
      // '"Harvex Groupe" <no-reply@harvexgroupe.com>',
      // from: process.env.SMTP_USER, // Doit être un email valide LWS
    };

    console.log("SMTP config:", transporter.options);
    console.log("email data: ", { ...options, html: "" });

    await transporter.sendMail(options);
    console.log("success email send");
  } catch (error) {
    console.error("error email send: ", error);
    throw error;
  }
}
