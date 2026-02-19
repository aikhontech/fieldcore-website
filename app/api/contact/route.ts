import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Payload = {
  name: string;
  email: string;
  message: string;
  dept?: string;
  subject?: string;
  product?: string;
  pageUrl?: string;
};

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Payload>;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();
    const dept = (body.dept ?? "sales").trim();
    const product = (body.product ?? "").trim();
    const subject = (body.subject ?? "Fieldcore Contact").trim();
    const pageUrl = (body.pageUrl ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // ---- Routing (edit these anytime) ----
    // You can point these to your Google Workspace inboxes:
    // sales@fieldcoretechnologies.com, info@fieldcoretechnologies.com, etc.
    const SALES_TO = process.env.CONTACT_TO_SALES || process.env.CONTACT_TO || "";
    const INFO_TO = process.env.CONTACT_TO_INFO || process.env.CONTACT_TO || "";
    const SUPPORT_TO = process.env.CONTACT_TO_SUPPORT || process.env.CONTACT_TO || "";
    const to =
      dept === "sales"
        ? SALES_TO
        : dept === "support"
          ? SUPPORT_TO
          : INFO_TO;

    if (!to) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "No destination email configured. Set CONTACT_TO (and/or CONTACT_TO_SALES/INFO/SUPPORT) in Vercel env vars.",
        },
        { status: 500 }
      );
    }

    // ---- SMTP (Gmail / Workspace) ----
    // Recommended: use an App Password.
    // SMTP_USER = your mailbox (e.g., aikhon@fieldcoretechnologies.com)
    // SMTP_PASS = app password
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT || "465");
    const smtpSecure = (process.env.SMTP_SECURE || "true") === "true";

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: requiredEnv("SMTP_USER"),
        pass: requiredEnv("SMTP_PASS"),
      },
    });

    const fromName = "Fieldcore Website";
    const fromEmail = requiredEnv("SMTP_USER");

    const lines = [
      `Department: ${dept}`,
      product ? `Product: ${product}` : "",
      pageUrl ? `Page: ${pageUrl}` : "",
      "",
      `From: ${name} <${email}>`,
      "",
      message,
    ].filter(Boolean);

    await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to,
      replyTo: email,
      subject,
      text: lines.join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const msg = typeof err?.message === "string" ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
