import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const RECIPIENTS = ["jason.shames@nyu.edu", "dsp8094@nyu.edu"];

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "All fields required" }, { status: 400 });
  }

  // Always log (visible in Vercel function logs)
  console.log("Contact submission:", JSON.stringify({ name, email, message, ts: new Date().toISOString() }));

  if (resend) {
    try {
      await resend.emails.send({
        from: "Hotel Distribution <noreply@hoteldistro.com>",
        to: RECIPIENTS,
        replyTo: email,
        subject: `[hoteldistro.com] New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
    } catch (err) {
      console.error("Failed to send email:", err);
      // Still return success — we logged it
    }
  }

  return NextResponse.json({ ok: true });
}
