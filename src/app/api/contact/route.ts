import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }
    if (!name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
    }

    const from = process.env.RESEND_FROM ?? "ALPACA HP <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO ?? "alpaca.amami@gmail.com";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `【ALPACA HP お問い合わせ】${name} 様`,
        text: `お名前: ${name}\nメール: ${email}\n\nメッセージ:\n${message}`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return NextResponse.json({ ok: false, error: "resend_failed", detail }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
