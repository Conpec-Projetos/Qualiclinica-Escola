"use server";

import { QualiFormData } from "@/classes/FormData";
import NovoContato from "@/emails/novo-contato-email";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendEmail(formData: QualiFormData) {
  try {
    await resend.emails.send({
      from: process.env.NEXT_PUBLIC_EMAIL_FROM!,
      to: process.env.NEXT_PUBLIC_EMAIL_TO!,
      subject: "Novo Contato do Site",
      react: await NovoContato(formData),
    });

    return "Email sent successfully";
  } catch (error) {
    return "Error sending email: " + error;
  }
}
