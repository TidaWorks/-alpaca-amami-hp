"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErr("お名前・メール・ご相談内容を入れてください。");
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
          message: `[新トップ（AI顧問）からのお問い合わせ]\n\n${form.message}`,
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
      <p className="tp-form__done" role="status">
        送信しました。折り返しご連絡します。
      </p>
    );
  }

  return (
    <form className="tp-form" onSubmit={onSubmit} noValidate>
      <label className="tp-form__field">
        <span className="tp-form__label">お名前（会社名）</span>
        <input
          className="tp-form__input"
          type="text"
          autoComplete="name"
          placeholder="山田 太郎（山田商店）"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </label>
      <label className="tp-form__field">
        <span className="tp-form__label">メール</span>
        <input
          className="tp-form__input"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="taro@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </label>
      <label className="tp-form__field">
        <span className="tp-form__label">ご相談内容</span>
        <textarea
          className="tp-form__input tp-form__textarea"
          rows={5}
          placeholder="例: 見積書づくりに毎週半日かかっている"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </label>
      {err && (
        <p className="tp-form__err" role="alert">
          {err}
        </p>
      )}
      {status === "error" && (
        <p className="tp-form__err" role="alert">
          送れませんでした。お手数ですが {SITE.contact.email} か {SITE.contact.tel} へご連絡ください。
        </p>
      )}
      <button type="submit" className="tp-btn tp-btn--main tp-form__submit" disabled={status === "sending"}>
        <span>{status === "sending" ? "送信中" : "送信する"}</span>
        <span className="tp-btn__arrow" aria-hidden="true" />
      </button>
    </form>
  );
}
