import { NextResponse } from "next/server";

// アルパカ先生 Threads Bot 用 Telegram 中継エンドポイント
// Claude Code Routines のサンドボックスから api.telegram.org に直接アクセスできないため、
// このエンドポイント経由で Telegram に転送する。
//
// 使い方:
//   POST /api/threads-relay
//   Headers: { "X-Relay-Token": "<THREADS_RELAY_TOKEN>" }
//   Body: { "text": "<送信したい本文>", "chat_id"?: "<任意・既定は環境変数>" }
//
// 環境変数（Vercelで設定）:
//   THREADS_RELAY_TOKEN — このエンドポイントを叩くための共有シークレット
//   TELEGRAM_BOT_TOKEN  — Telegram Bot API Token
//   TELEGRAM_CHAT_ID    — 既定の送信先 chat_id

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // 認証
    const expectedToken = process.env.THREADS_RELAY_TOKEN;
    if (!expectedToken) {
      return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
    }
    const providedToken = req.headers.get("x-relay-token");
    if (providedToken !== expectedToken) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    // ペイロード検証
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
    }
    const text = (body as { text?: unknown }).text;
    const chatIdOverride = (body as { chat_id?: unknown }).chat_id;

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ ok: false, error: "missing_text" }, { status: 400 });
    }

    // Telegram送信
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const defaultChatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !defaultChatId) {
      return NextResponse.json({ ok: false, error: "telegram_not_configured" }, { status: 503 });
    }

    const chatId = typeof chatIdOverride === "string" && chatIdOverride.trim()
      ? chatIdOverride
      : defaultChatId;

    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });

    const tgJson = (await tgRes.json().catch(() => ({}))) as {
      ok?: boolean;
      description?: string;
      result?: { message_id?: number };
    };

    if (!tgRes.ok || !tgJson.ok) {
      return NextResponse.json(
        { ok: false, error: "telegram_failed", detail: tgJson },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message_id: tgJson.result?.message_id,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

// GETは2モードある：
//   1. パラメータなし → 疎通確認（トークン認証なし、設定状態だけ返す）
//   2. ?token=...&text=... 付き → 認証＋送信（Routinesサンドボックスからの WebFetch 用）
//
// ※ Routinesサンドボックスは Bash curl の外向き通信が制限されていて POSTできないが、
//   WebFetch ツールは広いドメインに GET アクセスできる。GET経由送信のためのフォールバック。
//   GETでは text の URL長制限（〜8KB）に注意。
export async function GET(req: Request) {
  const expectedToken = process.env.THREADS_RELAY_TOKEN;
  if (!expectedToken) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const url = new URL(req.url);
  const providedToken = url.searchParams.get("token");
  const text = url.searchParams.get("text");
  const chatIdOverride = url.searchParams.get("chat_id");

  // 認証パラメータ無し＝疎通確認モード
  if (!providedToken && !text) {
    const ready =
      Boolean(process.env.THREADS_RELAY_TOKEN) &&
      Boolean(process.env.TELEGRAM_BOT_TOKEN) &&
      Boolean(process.env.TELEGRAM_CHAT_ID);
    return NextResponse.json({ ok: true, ready });
  }

  // 認証
  if (providedToken !== expectedToken) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!text || !text.trim()) {
    return NextResponse.json({ ok: false, error: "missing_text" }, { status: 400 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const defaultChatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !defaultChatId) {
    return NextResponse.json({ ok: false, error: "telegram_not_configured" }, { status: 503 });
  }

  const chatId = chatIdOverride && chatIdOverride.trim() ? chatIdOverride : defaultChatId;

  const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  const tgJson = (await tgRes.json().catch(() => ({}))) as {
    ok?: boolean;
    description?: string;
    result?: { message_id?: number };
  };

  if (!tgRes.ok || !tgJson.ok) {
    return NextResponse.json(
      { ok: false, error: "telegram_failed", detail: tgJson },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message_id: tgJson.result?.message_id,
  });
}
