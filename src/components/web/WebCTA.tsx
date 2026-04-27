"use client";

import { useEffect, useRef, useState } from "react";
import { MemphisBlob, MemphisDots, MemphisRing, MemphisSquiggle, MemphisTriangle, MemphisWave } from "./MemphisDecorations";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function WebCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", agree: false });
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
      setForm({ name: "", email: "", message: "", agree: false });
    } catch {
      setErrorMsg("通信エラーが発生しました。少し時間をおいて再度お試しください。");
      setSubmit("error");
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const contacts = [
    {
      type: "tel",
      href: "tel:08027906757",
      bg: "#FF2DA0",
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
      bg: "#FFD600",
      textColor: "#111111",
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
      bg: "#00E0D1",
      textColor: "#111111",
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
      className="relative bg-[#F7F7F7] pt-20 md:pt-28 pb-12 px-6 scroll-mt-20 overflow-hidden border-t-2 border-[#111111]"
    >
      <div className="absolute inset-0 bg-memphis-speckle opacity-[0.06] pointer-events-none" aria-hidden="true" />

      {/* Memphis装飾 */}
      <MemphisBlob color="#FF2DA0" className="absolute top-12 -right-12 w-44 md:w-56 rotate-12 pointer-events-none" />
      <MemphisBlob color="#00E0D1" className="absolute bottom-32 -left-12 w-40 md:w-52 -rotate-12 pointer-events-none" />
      <MemphisRing color="#FFD600" className="absolute top-1/3 right-1/4 w-20 md:w-28 pointer-events-none hidden md:block" />
      <MemphisSquiggle color="#FF2DA0" className="absolute top-32 left-1/4 w-32 md:w-40 pointer-events-none hidden md:block" />
      <MemphisDots color="#111111" className="absolute bottom-44 right-12 w-20 md:w-28 opacity-50 pointer-events-none" />
      <MemphisTriangle color="#00E0D1" className="absolute top-24 right-1/3 w-12 md:w-14 -rotate-12 pointer-events-none" />
      <MemphisWave color="#FFD600" className="absolute bottom-32 right-1/3 w-32 md:w-40 pointer-events-none hidden md:block" />

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
            <span className="bg-[#FF2DA0] text-white font-black text-[11px] tracking-widest px-2.5 py-1 border-2 border-[#111111]">
              07
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#111111]">CONTACT / FREE</span>
          </div>

          <h2 className="font-memphis-mincho text-[#111111] text-3xl md:text-5xl font-extrabold mb-4 leading-[1.3] tracking-tight">
            まずは
            <span className="relative inline-block mx-1">
              <span className="relative z-10">気軽に</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[40%] bg-[#FFD600] -z-0"
                aria-hidden="true"
              />
            </span>
            <br className="md:hidden" />
            ご相談ください。
          </h2>
          <p className="font-memphis-mincho text-[#111111]/75 text-sm md:text-base">
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
              className="relative bg-white border-2 border-[#111111] p-6 flex flex-col items-start gap-2 shadow-[5px_5px_0_0_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_#111111] transition-all"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s, transform 0.5s, box-shadow 0.15s",
                transitionDelay: `${250 + i * 120}ms`,
              }}
            >
              <span
                className="absolute -top-3 -right-2 text-[10px] font-black tracking-widest border-2 border-[#111111] px-2 py-0.5 rotate-[3deg]"
                style={{ background: c.bg, color: c.textColor }}
              >
                {c.label}
              </span>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#111111] mb-1"
                style={{ background: c.bg, color: c.textColor }}
              >
                {c.icon}
              </div>
              <span className="font-memphis-mincho text-[#111111] font-bold text-base">
                {c.title}
              </span>
              <span className="font-memphis-gothic text-[#111111] font-bold text-sm break-all">
                {c.body}
              </span>
              <span className="text-[#111111]/60 text-xs">{c.hint}</span>
            </a>
          ))}
        </div>

        {/* お問い合わせフォーム */}
        <div
          className="bg-white border-2 border-[#111111] shadow-[6px_6px_0_0_#FF2DA0] p-7 md:p-10 mb-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "650ms",
          }}
        >
          <h3 className="font-memphis-mincho text-[#111111] text-xl md:text-2xl font-extrabold mb-6">
            フォームから送る
          </h3>
          {submit === "success" ? (
            <div
              role="status"
              className="bg-[#F7F7F7] border-2 border-[#111111] p-6 text-center"
            >
              <p className="font-memphis-mincho text-[#111111] text-lg font-extrabold mb-2">
                送信ありがとうございました！
              </p>
              <p className="text-sm text-[#111111]/75 leading-relaxed">
                内容を確認の上、2営業日以内にご返信いたします。
                <br />
                急ぎの場合は上記の電話・DMもご利用ください。
              </p>
              <button
                type="button"
                onClick={() => setSubmit("idle")}
                className="mt-5 inline-flex items-center text-sm font-black text-[#111111] underline decoration-[#FF2DA0] decoration-[3px] underline-offset-[6px] hover:decoration-[#FFD600] transition-colors"
              >
                もう一度送る
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block font-memphis-gothic text-[11px] font-bold tracking-[0.2em] text-[#111111] mb-2">
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
                  className="w-full bg-[#F7F7F7] border-2 border-[#111111] px-4 py-3 text-sm text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-memphis-gothic text-[11px] font-bold tracking-[0.2em] text-[#111111] mb-2">
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
                  className="w-full bg-[#F7F7F7] border-2 border-[#111111] px-4 py-3 text-sm text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-memphis-gothic text-[11px] font-bold tracking-[0.2em] text-[#111111] mb-2">
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
                  className="w-full bg-[#F7F7F7] border-2 border-[#111111] px-4 py-3 text-sm text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:bg-white resize-none"
                />
              </div>
              <label className="flex items-center gap-2 text-xs text-[#111111]/80">
                <input
                  type="checkbox"
                  required
                  checked={form.agree}
                  onChange={(e) => setForm((p) => ({ ...p, agree: e.target.checked }))}
                  className="w-4 h-4 border-2 border-[#111111] accent-[#FF2DA0]"
                />
                プライバシーポリシーに同意する
              </label>
              {submit === "error" && errorMsg && (
                <p role="alert" className="text-sm font-bold text-[#C0392B] bg-white border-2 border-[#C0392B] px-4 py-3">
                  {errorMsg}
                </p>
              )}
              <button
                type="submit"
                disabled={submit === "submitting"}
                className="inline-flex items-center justify-center bg-[#FFD600] text-[#111111] font-black text-sm tracking-widest px-8 py-3.5 border-2 border-[#111111] rounded-full shadow-[4px_4px_0_0_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_#111111] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submit === "submitting" ? "送信中..." : "送信する →"}
              </button>
            </form>
          )}
        </div>

        {/* フッター */}
        <div className="border-t-2 border-dashed border-[#111111]/50 pt-8 text-center">
          <p className="font-memphis-gothic text-2xl font-black tracking-widest mb-2">
            <span className="text-[#FF2DA0]">A</span>
            <span className="text-[#111111]">L</span>
            <span className="text-[#00E0D1]">P</span>
            <span className="text-[#FFD600]">A</span>
            <span className="text-[#111111]">CA</span>
            <span className="text-[#111111] text-[10px] tracking-[0.3em] ml-2 align-middle">
              WEB DESIGN STUDIO
            </span>
          </p>
          <p className="text-[#111111]/65 text-sm mb-3">
            奄美大島を拠点に、島の事業者さまのWeb制作を承ります。
          </p>
          <p className="text-[#111111]/40 text-xs">
            &copy; 2026 ALPACA. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
