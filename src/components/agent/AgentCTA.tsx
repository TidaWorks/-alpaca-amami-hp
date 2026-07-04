"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function AgentCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submit, setSubmit] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      setRevealed(true);
      io.disconnect();
    }
    const failsafeId = window.setTimeout(() => setRevealed(true), 800);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafeId);
    };
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
          message: `[アルパカスマート（/smart）からのお問い合わせ]\n\n${form.message}`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        const reason = typeof data.error === "string" ? data.error : `${res.status}`;
        if (reason === "not_configured") {
          setErrorMsg("送信機能の準備中です。お手数ですが、上のメール・DMからご連絡ください。");
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
      type: "mail",
      href: `${SITE.contact.emailHref}?subject=アルパカスマートの無料相談予約`,
      Icon: Mail,
      label: "MAIL",
      title: "メールで相談",
      body: SITE.contact.email,
      hint: "24時間受付",
    },
    {
      type: "dm",
      href: SITE.contact.instagramUrl,
      Icon: MessageCircle,
      label: "DM",
      title: "Instagram DM",
      body: SITE.contact.instagramHandle,
      hint: "DMでお気軽に",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#1D2A6E] text-white pt-24 md:pt-32"
    >
      {/* 背景ドット */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(18,201,152,0.18)_0%,rgba(18,201,152,0)_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <div className="relative pb-20 md:pb-24">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 text-center">
          <p
            className={`inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#12C998] font-bold mb-8 border border-[#12C998]/40 bg-[#12C998]/10 rounded-full px-4 py-2 ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.05s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#12C998] animate-pulse" />
            お問い合わせ
          </p>
          <h2
            className={`text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-10 ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.15s" }}
          >
            まずは無料相談から、
            <br />
            <span className="text-[#12C998]">始めませんか？</span>
          </h2>

          <p
            className={`text-white/75 text-base md:text-lg leading-loose mb-14 max-w-2xl mx-auto ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.3s" }}
          >
            30分のオンラインヒアリングで、
            <br className="hidden md:block" />
            業務の現状と繋ぎたいサービス、アルパカスマートが合うかどうかを一緒に整理します。
          </p>

          {/* 連絡先カード（メール / DM） */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12 max-w-2xl mx-auto text-left">
            {contacts.map((c, i) => {
              const IconComponent = c.Icon;
              return (
                <a
                  key={c.type}
                  href={c.href}
                  target={c.type === "dm" ? "_blank" : undefined}
                  rel={c.type === "dm" ? "noopener noreferrer" : undefined}
                  className={`relative bg-white/[0.06] rounded-3xl border border-white/15 hover:border-[#12C998]/50 hover:bg-white/[0.1] hover:-translate-y-1 transition-all duration-300 p-7 cursor-pointer ${revealed ? "fade-in" : "pre"}`}
                  style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                >
                  <span className="absolute -top-2 -right-2 text-[10px] tracking-widest px-3 py-1 rounded-full bg-[#12C998] text-white font-bold">
                    {c.label}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#12C998]/15 flex items-center justify-center mb-4">
                    <IconComponent className="w-5 h-5 text-[#12C998]" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <span className="block text-white text-base font-bold mb-2">{c.title}</span>
                  <span className="block text-white/70 text-sm break-all mb-2">{c.body}</span>
                  <span className="block text-white/45 text-xs font-bold tracking-wide">{c.hint}</span>
                </a>
              );
            })}
          </div>

          {/* フォーム */}
          <div
            className={`bg-white rounded-3xl shadow-[0_8px_28px_rgba(0,0,0,0.18)] p-8 md:p-12 mb-12 max-w-3xl mx-auto text-left ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.6s" }}
          >
            <h3 className="text-[#1D2A6E] text-xl md:text-2xl font-bold mb-8">
              フォームから送る
            </h3>
            {submit === "success" ? (
              <div role="status" className="bg-[#E8F9F3] border border-[#12C998]/40 rounded-2xl p-7 text-center">
                <p className="text-[#1D2A6E] text-lg font-bold mb-3">
                  送信ありがとうございました！
                </p>
                <p className="text-sm text-[#2A2E45] leading-loose">
                  内容を確認の上、営業日24時間以内にご返信いたします。
                  <br />
                  急ぎの場合は上記のDMもご利用ください。
                </p>
                <button
                  type="button"
                  onClick={() => setSubmit("idle")}
                  className="group mt-6 inline-flex items-baseline gap-2 text-sm font-bold text-[#12C998]"
                >
                  <span className="relative">
                    もう一度送る
                    <span className="absolute left-0 -bottom-[3px] w-full h-[1.5px] bg-[#12C998] scale-x-100 group-hover:scale-x-0 origin-right transition-transform duration-300" />
                  </span>
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="smart-name" className="block text-xs font-bold text-[#5A6280] mb-2 tracking-wide">
                    お名前
                  </label>
                  <input
                    id="smart-name"
                    type="text"
                    required
                    placeholder="お名前"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full bg-white border border-[#E5E9F5] rounded-xl px-4 py-3.5 text-sm text-[#1D2A6E] placeholder:text-[#5A6280]/50 focus:outline-none focus:border-[#12C998] focus:ring-2 focus:ring-[#12C998]/15 transition"
                  />
                </div>
                <div>
                  <label htmlFor="smart-email" className="block text-xs font-bold text-[#5A6280] mb-2 tracking-wide">
                    メールアドレス
                  </label>
                  <input
                    id="smart-email"
                    type="email"
                    required
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full bg-white border border-[#E5E9F5] rounded-xl px-4 py-3.5 text-sm text-[#1D2A6E] placeholder:text-[#5A6280]/50 focus:outline-none focus:border-[#12C998] focus:ring-2 focus:ring-[#12C998]/15 transition"
                  />
                </div>
                <div>
                  <label htmlFor="smart-message" className="block text-xs font-bold text-[#5A6280] mb-2 tracking-wide">
                    メッセージを入力
                  </label>
                  <textarea
                    id="smart-message"
                    required
                    rows={5}
                    placeholder="ご相談内容をお書きください（業種・現状の課題・AIで自動化したいことなどをお気軽に）"
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="w-full bg-white border border-[#E5E9F5] rounded-xl px-4 py-3.5 text-sm text-[#1D2A6E] placeholder:text-[#5A6280]/50 focus:outline-none focus:border-[#12C998] focus:ring-2 focus:ring-[#12C998]/15 transition resize-none"
                  />
                </div>
                {submit === "error" && errorMsg && (
                  <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 font-bold">
                    {errorMsg}
                  </p>
                )}
                <p className="text-xs text-[#5A6280] leading-loose">
                  お問い合わせ内容は、ご返信および業務連絡のためにのみ利用します。詳細は
                  <a href="/privacy" className="text-[#12C998] font-bold underline-offset-4 hover:underline">
                    プライバシーポリシー
                  </a>
                  をご確認ください。送信をもって同意いただいたものとみなします。
                </p>

                <button
                  type="submit"
                  disabled={submit === "submitting"}
                  className="mo-cta-shine group inline-flex items-center gap-2 bg-[#12C998] text-white font-bold text-sm md:text-base rounded-full px-7 py-3.5 hover:bg-[#0DA67D] transition-all duration-300 shadow-[0_4px_16px_rgba(18,201,152,0.3)] hover:shadow-[0_8px_24px_rgba(18,201,152,0.4)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submit === "submitting" ? "送信中..." : "送信する"}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>

          {/* 料金プランへの導線 */}
          <div className={`flex flex-wrap items-center justify-center gap-6 mb-4 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.7s" }}>
            <a
              href="#pricing"
              className="group inline-flex items-baseline gap-2 text-sm font-bold text-white"
            >
              <span className="relative">
                料金プランを見る
                <span className="absolute left-0 -bottom-[3px] w-full h-[1.5px] bg-white scale-x-100 origin-left transition-transform duration-500 group-hover:scale-x-0" />
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>

          {/* フッター */}
          <footer className="mt-20 pt-10 border-t border-white/10 text-white/45 text-[11px] font-bold tracking-wider flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <a href="/" className="text-white/65 hover:text-white transition-colors underline-offset-4 hover:underline">
                トップ
              </a>
              <a href="/web" className="text-white/65 hover:text-white transition-colors underline-offset-4 hover:underline">
                ホームページ・ランディングページ制作
              </a>
              <a href="/system" className="text-white/65 hover:text-white transition-colors underline-offset-4 hover:underline">
                業務システム開発
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <a href="/privacy" className="text-white/65 hover:text-white transition-colors underline-offset-4 hover:underline">
                プライバシーポリシー
              </a>
              <a href="/terms" className="text-white/65 hover:text-white transition-colors underline-offset-4 hover:underline">
                利用規約
              </a>
              <a href="/tokushoho" className="text-white/65 hover:text-white transition-colors underline-offset-4 hover:underline">
                特定商取引法に基づく表記
              </a>
            </div>
            <span>© 2026 ALPACA · 鹿児島県奄美大島 · alpaca-amami.com</span>
          </footer>
        </div>
      </div>

      <style>{`
        .pre { opacity: 0; transform: translateY(24px); }
        @keyframes show-up { 0% { opacity: 0; transform: translateY(24px); } 100% { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: show-up 0.85s cubic-bezier(0.165, 0.84, 0.44, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .fade-in { animation: none !important; }
          .pre { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
