"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function WebCTA() {
  const [sectionRef, visible] = useReveal<HTMLElement>({ threshold: 0.15 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submit, setSubmit] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submit === "submitting") return;
    setSubmit("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        const reason = typeof data.error === "string" ? data.error : `${res.status}`;
        if (reason === "not_configured") {
          setErrorMsg("送信機能の準備中です。お手数ですが、上のメール・電話・DMからご連絡ください。");
        } else {
          setErrorMsg("送信に失敗しました。少し時間をおいて再度お試しください。");
        }
        setSubmit("error");
        return;
      }
      setSubmit("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrorMsg("通信エラーが発生しました。少し時間をおいて再度お試しください。");
      setSubmit("error");
    }
  };

  const contacts = [
    {
      type: "tel",
      href: "tel:08027906757",
      bg: "#635BFF",
      textColor: "#FFFFFF",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      label: "TEL",
      title: "電話で相談",
      body: "080-2790-6757",
      hint: "平日 9:00 - 18:00",
    },
    {
      type: "dm",
      href: "https://instagram.com/alpaca_amami",
      bg: "#12C998",
      textColor: "#FFFFFF",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
      label: "DM",
      title: "Instagram DM",
      body: "@alpaca_amami",
      hint: "DMでお気軽に",
    },
    {
      type: "mail",
      href: "mailto:alpaca.amami@gmail.com",
      bg: "#8B86FF",
      textColor: "#FFFFFF",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: "MAIL",
      title: "メールで相談",
      body: "alpaca.amami@gmail.com",
      hint: "24時間受付",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-gradient-to-br from-[#F5F3FF] via-white to-[#EFF6FF] pt-20 md:pt-28 pb-12 px-6 scroll-mt-20 overflow-hidden"
    >
      <div className="relative max-w-4xl mx-auto">
        {/* 見出し */}
        <div
          className="mb-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="bg-[#635BFF] text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded-full">
              07
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]">CONTACT / FREE</span>
          </div>

          <h2 className="font-memphis-mincho text-[#1A202C] text-3xl md:text-5xl font-extrabold mb-4 leading-[1.3] tracking-tight">
            まずは
            <span className="relative inline-block mx-1">
              <span className="relative z-10">気軽に</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[40%] bg-[#12C998]/45 -z-0 rounded-sm"
                aria-hidden="true"
              />
            </span>
            <br className="md:hidden" />
            ご相談ください。
          </h2>
          <p className="font-memphis-mincho text-[#1A202C]/75 text-sm md:text-base">
            奄美島内なら直接お伺いします。オンラインも対応可能です。
          </p>
        </div>

        {/* 連絡先カード */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {contacts.map((c, i) => (
            <a
              key={c.type}
              href={c.href}
              target={c.type === "dm" ? "_blank" : undefined}
              rel={c.type === "dm" ? "noopener noreferrer" : undefined}
              className="relative bg-white border border-[#1A202C]/10 rounded-2xl p-6 flex flex-col items-start gap-2 shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all cursor-pointer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s, transform 0.5s, box-shadow 0.3s",
                transitionDelay: `${250 + i * 120}ms`,
              }}
            >
              <span
                className="absolute -top-2 -right-2 text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: c.bg, color: c.textColor }}
              >
                {c.label}
              </span>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
                style={{ background: c.bg, color: c.textColor }}
              >
                {c.icon}
              </div>
              <span className="font-memphis-mincho text-[#1A202C] font-bold text-base">
                {c.title}
              </span>
              <span className="font-memphis-gothic text-[#1A202C] font-bold text-sm break-all">
                {c.body}
              </span>
              <span className="text-[#1A202C]/60 text-xs">{c.hint}</span>
            </a>
          ))}
        </div>

        {/* お問い合わせフォーム */}
        <div
          className="bg-white border border-[#1A202C]/10 rounded-2xl shadow-xl p-7 md:p-10 mb-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "650ms",
          }}
        >
          <h3 className="font-memphis-mincho text-[#1A202C] text-xl md:text-2xl font-extrabold mb-6">
            フォームから送る
          </h3>
          {submit === "success" ? (
            <div
              role="status"
              className="bg-[#F5F3FF]/60 border border-[#12C998]/30 rounded-xl p-6 text-center"
            >
              <p className="font-memphis-mincho text-[#1A202C] text-lg font-extrabold mb-2">
                送信ありがとうございました！
              </p>
              <p className="text-sm text-[#1A202C]/75 leading-relaxed">
                内容を確認の上、2営業日以内にご返信いたします。
                <br />
                急ぎの場合は上記の電話・DMもご利用ください。
              </p>
              <button
                type="button"
                onClick={() => setSubmit("idle")}
                className="mt-5 inline-flex items-center text-sm font-black text-[#1A202C] underline decoration-[#635BFF] decoration-[3px] underline-offset-[6px] hover:decoration-[#12C998] transition-colors"
              >
                もう一度送る
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block font-memphis-gothic text-[11px] font-bold tracking-[0.2em] text-[#1A202C] mb-2">
                  お名前
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="お名前"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-[#F5F3FF]/40 border border-[#1A202C]/10 rounded-lg px-4 py-3 text-sm text-[#1A202C] placeholder:text-[#1A202C]/40 focus:outline-none focus:border-[#635BFF] focus:bg-white focus:ring-2 focus:ring-[#635BFF]/20 transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-memphis-gothic text-[11px] font-bold tracking-[0.2em] text-[#1A202C] mb-2">
                  メールアドレス
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full bg-[#F5F3FF]/40 border border-[#1A202C]/10 rounded-lg px-4 py-3 text-sm text-[#1A202C] placeholder:text-[#1A202C]/40 focus:outline-none focus:border-[#635BFF] focus:bg-white focus:ring-2 focus:ring-[#635BFF]/20 transition"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-memphis-gothic text-[11px] font-bold tracking-[0.2em] text-[#1A202C] mb-2">
                  メッセージを入力
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="ご相談内容をお書きください"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full bg-[#F5F3FF]/40 border border-[#1A202C]/10 rounded-lg px-4 py-3 text-sm text-[#1A202C] placeholder:text-[#1A202C]/40 focus:outline-none focus:border-[#635BFF] focus:bg-white focus:ring-2 focus:ring-[#635BFF]/20 transition resize-none"
                />
              </div>
              {submit === "error" && errorMsg && (
                <p role="alert" className="text-sm font-bold text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  {errorMsg}
                </p>
              )}
              <button
                type="submit"
                disabled={submit === "submitting"}
                className="inline-flex items-center justify-center bg-[#FF3D7F] text-white font-black text-sm tracking-widest px-8 py-3.5 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {submit === "submitting" ? "送信中..." : "送信する →"}
              </button>
            </form>
          )}
        </div>

        {/* フッター */}
        <div className="border-t border-dashed border-[#1A202C]/15 pt-8 text-center">
          <p className="font-memphis-gothic text-2xl font-black tracking-widest mb-2">
            <span className="text-[#1A202C]">ALPACA</span>
            <span className="text-[#1A202C] text-[10px] tracking-[0.3em] ml-2 align-middle">
              WEB DESIGN STUDIO
            </span>
          </p>
          <p className="text-[#1A202C]/65 text-sm mb-3">
            奄美大島を拠点に、島の事業者さまのWeb制作を承ります。
          </p>
          <p className="text-[#1A202C]/55 text-xs mb-3 flex items-center justify-center gap-3 flex-wrap">
            <a href="/" className="hover:text-[#635BFF] transition-colors rounded-sm">トップ</a>
            <span>/</span>
            <a href="/system" className="hover:text-[#635BFF] transition-colors rounded-sm">システム開発</a>
            <span>/</span>
            <a href="https://instagram.com/alpaca_amami" target="_blank" rel="noopener noreferrer" className="hover:text-[#635BFF] transition-colors rounded-sm">
              Instagram
            </a>
          </p>
          <p className="text-[#1A202C]/40 text-xs">
            &copy; 2026 ALPACA. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
