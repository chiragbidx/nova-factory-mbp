import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email/sendgrid";

const contactSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  agency: z.string().min(2).max(255),
  email: z.string().email(),
  subject: z.string().min(2).max(255),
  message: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed." }, { status: 422 });
    }

    const { firstName, lastName, agency, email, subject, message } = parsed.data;
    const body = `
      <h2>New Marketiq Inquiry</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Agency:</strong> ${agency}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;
    const sendResult = await sendEmail(
      "hi@chirag.co",
      `[Marketiq Contact] ${subject} (${agency})`,
      body
    );
    if (sendResult.success) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json(
        { error: sendResult.error || "SendGrid error." },
        { status: 500 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Error processing request." },
      { status: 500 }
    );
  }
}