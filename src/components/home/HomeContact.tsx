"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function HomeContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submit, setSubmit] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
          message: `[トップページからのお問い合わせ]\n\n${form.message}`,
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
      bg: "#1D2A6E",
      textColor: "#FFFFFF",
      label: "TEL",
      title: "電話で相談",
      body: SITE.contact.tel,
      hint: "平日 9:00 - 18:00",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
    },
    {
      type: "dm",
      href: SITE.contact.instagramUrl,
      bg: "#12C998",
      textColor: "#FFFFFF",
      label: "DM",
      title: "Instagram DM",
      body: SITE.contact.instagramHandle,
      hint: "DMでお気軽に",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      type: "mail",
      href: SITE.contact.emailHref,
      bg: "#FFC400",
      textColor: "#1A202C",
      label: "MAIL",
      title: "メールで相談",
      body: SITE.contact.email,
      hint: "24時間受付",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-gradient-to-br from-white via-[#EEF1FF] to-[#ECFDF5] pt-20 md:pt-28 pb-12 px-6 scroll-mt-20 overflow-hidden border-t border-[#E5E7EB]"
    >
      <div className="relative max-w-4xl mx-auto">
        <div
          className="mb-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A]">
              CHAPTER 06
            </p>
            <span className="w-8 h-[1px] bg-[#1D3A8A]/30" />
            <p className="text-[11px] font-bold tracking-[0.3em] text-[#0A1228]/60">
              CONTACT
            </p>
          </div>
          <h2 className="text-[#1A202C] text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            まずは
            <span className="text-[#1D2A6E]">気軽に</span>
            <br className="md:hidden" />
            ご相談ください。
          </h2>
          <p className="text-[#1A202C]/70 text-sm md:text-base">
            奄美島内なら直接お伺いします。オンラインも対応可能です。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {contacts.map((c, i) => (
            <a
              key={c.type}
              href={c.href}
              target={c.type === "dm" ? "_blank" : undefined}
              rel={c.type === "dm" ? "noopener noreferrer" : undefined}
              className="group relative bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col items-start gap-2 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-transparent overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.7s ease ${250 + i * 120}ms, transform 0.5s ease ${250 + i * 120}ms, box-shadow 0.4s ease, border-color 0.3s ease, translate 0.3s ease`,
                ...(({ "--tw-ring-color": c.bg } as React.CSSProperties)),
              }}
            >
              {/* 上端アクセントライン */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: c.bg }}
              />
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-1 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-300"
                style={{ background: c.bg, color: c.textColor }}
              >
                {c.icon}
              </div>
              <span className="text-[#1A202C] font-bold text-base">{c.title}</span>
              <span className="text-[#1A202C] font-bold text-sm break-all">{c.body}</span>
              <span className="text-[#1A202C]/55 text-xs">{c.hint}</span>
            </a>
          ))}
        </div>

        <div
          className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-7 md:p-10 mb-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "650ms",
          }}
        >
          <h3 className="text-[#1A202C] text-xl md:text-2xl font-extrabold mb-6">
            フォームから送る
          </h3>
          {submit === "success" ? (
            <div role="status" className="bg-[#EEF1FF] border border-[#DBEAFE] rounded-xl p-6 text-center">
              <p className="text-[#1A202C] text-lg font-extrabold mb-2">
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
                className="group mt-5 inline-flex items-baseline gap-2 text-sm font-black text-[#1D2A6E]"
              >
                <span className="relative">
                  もう一度送る
                  <span className="absolute left-0 -bottom-[3px] w-full h-[1.5px] bg-[#1D2A6E] scale-x-100 group-hover:scale-x-0 origin-right transition-transform duration-300" />
                </span>
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="home-name" className="block text-[11px] font-bold tracking-[0.2em] text-[#1A202C] mb-2">
                  お名前
                </label>
                <input
                  id="home-name"
                  type="text"
                  required
                  placeholder="お名前"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#1A202C] placeholder:text-[#1A202C]/40 focus:outline-none focus:bg-white focus:border-[#1D2A6E] focus:ring-2 focus:ring-[#1D2A6E]/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="home-email" className="block text-[11px] font-bold tracking-[0.2em] text-[#1A202C] mb-2">
                  メールアドレス
                </label>
                <input
                  id="home-email"
                  type="email"
                  required
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#1A202C] placeholder:text-[#1A202C]/40 focus:outline-none focus:bg-white focus:border-[#1D2A6E] focus:ring-2 focus:ring-[#1D2A6E]/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="home-message" className="block text-[11px] font-bold tracking-[0.2em] text-[#1A202C] mb-2">
                  メッセージを入力
                </label>
                <textarea
                  id="home-message"
                  required
                  rows={5}
                  placeholder="ご相談内容をお書きください（業種・現状の課題・希望サービスなどお気軽に）"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#1A202C] placeholder:text-[#1A202C]/40 focus:outline-none focus:bg-white focus:border-[#1D2A6E] focus:ring-2 focus:ring-[#1D2A6E]/20 resize-none transition-colors"
                />
              </div>
              {submit === "error" && errorMsg && (
                <p role="alert" className="text-sm font-bold text-[#C0392B] bg-[#FEE2E2] border border-[#FECACA] rounded-lg px-4 py-3">
                  {errorMsg}
                </p>
              )}
              <p className="text-xs text-[#1A202C]/65 leading-relaxed">
                お問い合わせ内容は、ご返信および業務連絡のためにのみ利用します。詳細は
                <a href="/privacy" className="text-[#1D2A6E] font-bold underline-offset-4 hover:underline">
                  プライバシーポリシー
                </a>
                をご確認ください。送信をもって同意いただいたものとみなします。
              </p>
              <button
                type="submit"
                disabled={submit === "submitting"}
                className="group/sub relative inline-flex items-center justify-center bg-[#FF6B9E] text-white font-black text-sm tracking-widest px-8 py-3.5 rounded-full shadow-md hover:shadow-xl hover:bg-[#15296B] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B9E] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover/sub:opacity-100"
                  style={{
                    background: "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)",
                    animation: submit === "submitting" ? undefined : "alpacaContactShine 1.4s ease-out",
                  }}
                />
                <span className="relative z-10 inline-flex items-center gap-1">
                  {submit === "submitting" ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1"
                      />
                      送信中...
                    </>
                  ) : (
                    "送信する →"
                  )}
                </span>
              </button>
              <style>{`
                @keyframes alpacaContactShine {
                  0% { transform: translateX(-120%) skewX(-12deg); }
                  60%, 100% { transform: translateX(220%) skewX(-12deg); }
                }
              `}</style>
            </form>
          )}
        </div>

        {/* フッター */}
        <footer className="border-t border-[#E5E7EB] pt-8 text-center">
          <p className="text-2xl font-black tracking-widest mb-2 text-[#1A202C]">
            ALPACA
            <span className="text-[#12C998] text-[10px] tracking-[0.3em] ml-2 align-middle">
              AMAMI WEB & SYSTEM STUDIO
            </span>
          </p>
          <p className="text-[#1A202C]/65 text-sm mb-2">
            奄美大島を拠点に、Web制作・システム開発・保守運用を承ります。
          </p>
          <p className="text-[#1A202C]/55 text-xs mb-3 flex items-center justify-center gap-3 flex-wrap">
            <a href="/web" className="hover:text-[#1D2A6E] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A6E] focus-visible:ring-offset-2 rounded-sm">ホームページ・LP制作</a>
            <span>/</span>
            <a href="/system" className="hover:text-[#1D2A6E] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A6E] focus-visible:ring-offset-2 rounded-sm">システム開発</a>
            <span>/</span>
            <a href="/smart" className="hover:text-[#1D2A6E] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A6E] focus-visible:ring-offset-2 rounded-sm">アルパカスマート</a>
            <span>/</span>
            <a href={SITE.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#1D2A6E] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A6E] focus-visible:ring-offset-2 rounded-sm">
              Instagram
            </a>
          </p>
          <p className="text-[#1A202C]/55 text-xs mb-3">
            <a href="/privacy" className="hover:text-[#1D2A6E] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A6E] focus-visible:ring-offset-2 rounded-sm underline-offset-4 hover:underline">
              プライバシーポリシー
            </a>
          </p>
          <p className="text-[#1A202C]/40 text-xs">
            &copy; 2026 ALPACA. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
}
