"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

/** 問い合わせフォーム（送り先は今の /api/contact のまま） */
export default function AwForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErr("お名前、メール、ご相談の内容を入れてください。");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setErr("メールの形を確かめてください。");
      return;
    }
    setErr("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `[トップページからのお問い合わせ]\n\n${form.message}`,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <p className="aw-form__done" role="status">
        送信しました。折り返しご連絡します。
      </p>
    );
  }

  return (
    <form className="aw-form" onSubmit={onSubmit} noValidate data-rise>
      <label className="aw-form__f">
        <span className="aw-form__l">お名前（会社名）</span>
        <input
          className="aw-form__i"
          type="text"
          autoComplete="name"
          placeholder="山田 太郎（山田商店）"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </label>
      <label className="aw-form__f">
        <span className="aw-form__l">メール</span>
        <input
          className="aw-form__i"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="taro@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </label>
      <label className="aw-form__f">
        <span className="aw-form__l">ご相談の内容</span>
        <textarea
          className="aw-form__i aw-form__ta"
          rows={4}
          placeholder="例：見積書づくりに毎週半日かかっている"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </label>
      {err && (
        <p className="aw-form__err" role="alert">
          {err}
        </p>
      )}
      {status === "error" && (
        <p className="aw-form__err" role="alert">
          送れませんでした。お手数ですが {SITE.contact.email} か {SITE.contact.tel} へご連絡ください。
        </p>
      )}
      <button type="submit" className="aw-btn aw-btn--paper aw-form__send" disabled={status === "sending"}>
        <span>{status === "sending" ? "送信しています" : "送信する"}</span>
        <svg className="aw-arrow" viewBox="0 0 20 12" aria-hidden="true">
          <path d="M0 6h18M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
    </form>
  );
}
