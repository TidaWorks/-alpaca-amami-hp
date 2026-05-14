"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { SITE } from "@/lib/site";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function WebCTA() {
  const [sectionRef, visible] = useReveal<HTMLElement>({ threshold: 0.1 });
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
      href: SITE.contact.telHref,
      bg: "#FFE900",
      textColor: "#000000",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      label: "TEL",
      title: "電話で相談",
      body: SITE.contact.tel,
      hint: "平日 9:00 - 18:00",
    },
    {
      type: "dm",
      href: SITE.contact.instagramUrl,
      bg: "#EC6C00",
      textColor: "#FFFFFF",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
      label: "DM",
      title: "Instagram DM",
      body: SITE.contact.instagramHandle,
      hint: "DMでお気軽に",
    },
    {
      type: "mail",
      href: SITE.contact.emailHref,
      bg: "#004097",
      textColor: "#FFFFFF",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: "MAIL",
      title: "メールで相談",
      body: SITE.contact.email,
      hint: "24時間受付",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-black text-white scroll-mt-20 overflow-hidden"
    >
      {/* 上半分：黒帯CTA見出し */}
      <div className="relative py-32 md:py-40 px-6 md:px-10">
        {/* 装飾 */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="absolute -top-20 -right-20 w-[480px] h-[480px] hidden md:block"
            viewBox="0 0 400 400"
          >
            <path
              d="M100,180 C70,80 230,40 320,100 C400,160 380,300 310,340 C240,380 80,360 100,180 Z"
              fill="#FFE900"
              opacity="0.18"
            />
          </svg>
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          <div
            className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-16 mb-16 md:mb-20 items-end transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <div>
              <h2
                className="text-white text-[4rem] md:text-[8rem] lg:text-[10rem] leading-[0.95] tracking-[-0.02em]"
                style={{ fontWeight: 400 }}
              >
                Contact
              </h2>
              <p className="text-sm tracking-[0.3em] text-white/70 mt-4">お問い合わせ</p>
            </div>
            <div>
              <h3 className="text-white text-2xl md:text-4xl leading-[1.3] tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                まずは気軽にご相談ください。
              </h3>
              <p className="text-white/75 text-sm md:text-base leading-loose mt-6">
                奄美島内なら直接お伺いします。オンラインも対応可能です。
              </p>
            </div>
          </div>

          {/* 連絡先カード */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
            {contacts.map((c, i) => (
              <a
                key={c.type}
                href={c.href}
                target={c.type === "dm" ? "_blank" : undefined}
                rel={c.type === "dm" ? "noopener noreferrer" : undefined}
                className="relative bg-[#1A1A1A] rounded-3xl p-7 flex flex-col items-start gap-3 hover:-translate-y-1 active:scale-[0.98] transition-all cursor-pointer border border-white/10 hover:border-[#FFE900]/50"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.7s, transform 0.5s, border-color 0.3s",
                  transitionDelay: `${300 + i * 120}ms`,
                }}
              >
                <span
                  className="absolute -top-2 -right-2 text-[10px] tracking-[0.2em] px-3 py-1 rounded-full"
                  style={{ background: c.bg, color: c.textColor, fontWeight: 500 }}
                >
                  {c.label}
                </span>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ background: c.bg, color: c.textColor }}
                >
                  {c.icon}
                </div>
                <span className="text-white text-base" style={{ fontWeight: 500 }}>
                  {c.title}
                </span>
                <span className="text-white/85 text-sm break-all">{c.body}</span>
                <span className="text-white/55 text-xs tracking-wide">{c.hint}</span>
              </a>
            ))}
          </div>

          {/* お問い合わせフォーム */}
          <div
            className="bg-[#1A1A1A] rounded-3xl p-8 md:p-12 mb-12 transition-all duration-700 border border-white/10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "700ms",
            }}
          >
            <h3 className="text-white text-xl md:text-2xl mb-8" style={{ fontWeight: 500 }}>
              フォームから送る
            </h3>
            {submit === "success" ? (
              <div
                role="status"
                className="bg-[#FFE900]/10 border border-[#FFE900]/40 rounded-2xl p-7 text-center"
              >
                <p className="text-white text-lg mb-3" style={{ fontWeight: 500 }}>
                  送信ありがとうございました！
                </p>
                <p className="text-sm text-white/75 leading-loose">
                  内容を確認の上、2営業日以内にご返信いたします。
                  <br />
                  急ぎの場合は上記の電話・DMもご利用ください。
                </p>
                <button
                  type="button"
                  onClick={() => setSubmit("idle")}
                  className="group mt-6 inline-flex items-baseline gap-2 text-sm text-white"
                >
                  <span className="relative">
                    もう一度送る
                    <span className="absolute left-0 -bottom-[3px] w-full h-[1.5px] bg-[#FFE900] scale-x-100 group-hover:scale-x-0 origin-right transition-transform duration-300" />
                  </span>
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="block text-[11px] tracking-[0.2em] text-white/85 mb-2.5" style={{ fontWeight: 500 }}>
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
                    className="w-full bg-black border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFE900] focus:ring-2 focus:ring-[#FFE900]/30 transition"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[11px] tracking-[0.2em] text-white/85 mb-2.5" style={{ fontWeight: 500 }}>
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
                    className="w-full bg-black border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFE900] focus:ring-2 focus:ring-[#FFE900]/30 transition"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[11px] tracking-[0.2em] text-white/85 mb-2.5" style={{ fontWeight: 500 }}>
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
                    className="w-full bg-black border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFE900] focus:ring-2 focus:ring-[#FFE900]/30 transition resize-none"
                  />
                </div>
                {submit === "error" && errorMsg && (
                  <p role="alert" className="text-sm text-red-200 bg-red-900/40 border border-red-400/40 rounded-xl px-4 py-3" style={{ fontWeight: 500 }}>
                    {errorMsg}
                  </p>
                )}
                <p className="text-xs text-white/65 leading-loose">
                  お問い合わせ内容は、ご返信および業務連絡のためにのみ利用します。詳細は
                  <a href="/privacy" className="text-[#FFE900] underline-offset-4 hover:underline" style={{ fontWeight: 500 }}>
                    プライバシーポリシー
                  </a>
                  をご確認ください。送信をもって同意いただいたものとみなします。
                </p>

                {/* 黒丸pill button */}
                <button
                  type="submit"
                  disabled={submit === "submitting"}
                  className="group inline-flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span className="inline-block bg-[#FFE900] text-black text-sm tracking-[0.1em] rounded-full px-8 py-4 group-hover:bg-white transition-colors" style={{ fontWeight: 500 }}>
                    {submit === "submitting" ? "送信中..." : "送信する"}
                  </span>
                  <span className="w-12 h-12 border border-[#FFE900] rounded-full flex items-center justify-center text-[#FFE900] group-hover:bg-[#FFE900] group-hover:text-black transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* フッター：givee風 黒一面・大ロゴ */}
      <footer className="relative bg-black border-t border-white/10 pt-16 pb-8 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 mb-12">
            {/* 左：サイトマップ */}
            <div>
              <p className="text-[11px] tracking-[0.3em] text-white/55 mb-5" style={{ fontWeight: 500 }}>
                SITE MAP
              </p>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="text-white hover:text-[#FFE900] transition-colors text-sm">
                    トップ
                  </a>
                </li>
                <li>
                  <a href="/system" className="text-white hover:text-[#FFE900] transition-colors text-sm">
                    システム開発
                  </a>
                </li>
                <li>
                  <a href="/agent" className="text-white hover:text-[#FFE900] transition-colors text-sm">
                    LINE自動化ボット
                  </a>
                </li>
                <li>
                  <a href={SITE.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FFE900] transition-colors text-sm">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-white hover:text-[#FFE900] transition-colors text-sm">
                    プライバシーポリシー
                  </a>
                </li>
              </ul>
            </div>

            {/* 右：大ロゴ */}
            <div className="text-right">
              <p
                className="text-white text-[5rem] md:text-[10rem] lg:text-[12rem] leading-none tracking-[-0.02em]"
                style={{ fontWeight: 400 }}
              >
                ALPACA
              </p>
              <p className="text-white/70 text-sm tracking-[0.2em] mt-4">
                奄美のWeb制作スタジオ
              </p>
              <p className="text-white/55 text-sm mt-3 leading-loose">
                奄美大島を拠点に、島の事業者さまのWeb制作を承ります。
              </p>
            </div>
          </div>

          {/* 電話番号ウィジェット */}
          <div className="border-t border-white/10 pt-8 flex flex-wrap items-center justify-between gap-4">
            <a
              href={SITE.contact.telHref}
              className="inline-flex items-center gap-3 text-white hover:text-[#FFE900] transition-colors group"
            >
              <span className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center group-hover:border-[#FFE900]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </span>
              <span className="text-base tabular-nums" style={{ fontWeight: 500 }}>{SITE.contact.tel}</span>
            </a>
            <p className="text-white/40 text-xs">
              &copy; 2026 ALPACA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
