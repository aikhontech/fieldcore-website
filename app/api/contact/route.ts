import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // For now: just log it (you'll see this in Vercel function logs too)
    console.log("CONTACT SUBMISSION:", body);

    // Later: send email via Resend / SendGrid / Gmail API, store to DB, etc.

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}