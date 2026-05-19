"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Mail, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function SystemCTA() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submit, setSubmit] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
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
          message: `[/system ランディングページ からのお問い合わせ]\n\n${form.message}`,
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
      href: SITE.contact.emailHref,
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
      ref={ref}
      id="contact"
      className="relative bg-white overflow-hidden"
    >
      <div className="relative py-28 md:py-36 px-6 md:px-10">
        {/* 雲SVG */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F4F6FF] to-[#EEF1FF]" />
          <svg className="absolute -top-10 -right-20 w-[420px] h-auto opacity-40" viewBox="0 0 400 200" fill="none">
            <ellipse cx="120" cy="120" rx="80" ry="50" fill="#DCE5FF" />
            <ellipse cx="200" cy="100" rx="100" ry="60" fill="#DCE5FF" />
            <ellipse cx="290" cy="130" rx="70" ry="45" fill="#DCE5FF" />
          </svg>
          <svg className="absolute bottom-[10%] -left-10 w-[320px] h-auto opacity-30 hidden md:block" viewBox="0 0 400 200" fill="none">
            <ellipse cx="120" cy="120" rx="80" ry="50" fill="#DCE5FF" />
            <ellipse cx="200" cy="100" rx="100" ry="60" fill="#DCE5FF" />
            <ellipse cx="290" cy="130" rx="70" ry="45" fill="#DCE5FF" />
          </svg>
        </div>

        <div className="relative max-w-[1200px] mx-auto">
          {/* 章扉 */}
          <div className="text-center mb-14 md:mb-16" style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}>
            <p className="inline-block text-[10px] tracking-[0.4em] text-[#2860E1] font-bold mb-5 px-3 py-1 rounded-full bg-white border border-[#E5E9F5]">
              お問い合わせ — まずはお気軽に
            </p>
            <h2 className="text-[#1D2A6E] text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.3] tracking-tight mb-6">
              まずは気軽に
              <br className="md:hidden" />
              <span className="text-[#2860E1]">ご相談</span>
              ください。
            </h2>
            <p className="text-[#2A2E45] text-base md:text-lg leading-loose max-w-2xl mx-auto">
              奄美島内なら直接お伺いします。オンラインも対応可能です。
            </p>
          </div>

          {/* 連絡先カード3つ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14 max-w-2xl mx-auto">
            {contacts.map((c, i) => {
              const IconComponent = c.Icon;
              return (
                <a
                  key={c.type}
                  href={c.href}
                  target={c.type === "dm" ? "_blank" : undefined}
                  rel={c.type === "dm" ? "noopener noreferrer" : undefined}
                  className="relative bg-white rounded-3xl border border-[#E5E9F5] shadow-[0_4px_20px_rgba(40,96,225,0.06)] hover:shadow-[0_12px_36px_rgba(40,96,225,0.14)] hover:-translate-y-1 transition-all duration-300 p-7 cursor-pointer"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.7s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s, box-shadow 0.3s, translate 0.3s`,
                  }}
                >
                  <span className="absolute -top-2 -right-2 text-[10px] tracking-widest px-3 py-1 rounded-full bg-[#2860E1] text-white font-bold">
                    {c.label}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#F4F6FF] flex items-center justify-center mb-4">
                    <IconComponent className="w-5 h-5 text-[#2860E1]" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <span className="block text-[#1D2A6E] text-base font-bold mb-2">
                    {c.title}
                  </span>
                  <span className="block text-[#2A2E45] text-sm break-all mb-2">{c.body}</span>
                  <span className="block text-[#5A6280] text-xs font-bold tracking-wide">{c.hint}</span>
                </a>
              );
            })}
          </div>

          {/* フォーム */}
          <div
            className="bg-white rounded-3xl border border-[#E5E9F5] shadow-[0_8px_28px_rgba(40,96,225,0.08)] p-8 md:p-12 mb-12 max-w-3xl mx-auto"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s",
            }}
          >
            <h3 className="text-[#1D2A6E] text-xl md:text-2xl font-bold mb-8">
              フォームから送る
            </h3>
            {submit === "success" ? (
              <div role="status" className="bg-[#F4F6FF] border border-[#2860E1]/30 rounded-2xl p-7 text-center">
                <p className="text-[#1D2A6E] text-lg font-bold mb-3">
                  送信ありがとうございました！
                </p>
                <p className="text-sm text-[#2A2E45] leading-loose">
                  内容を確認の上、2営業日以内にご返信いたします。
                  <br />
                  急ぎの場合は上記のDMもご利用ください。
                </p>
                <button
                  type="button"
                  onClick={() => setSubmit("idle")}
                  className="group mt-6 inline-flex items-baseline gap-2 text-sm font-bold text-[#2860E1]"
                >
                  <span className="relative">
                    もう一度送る
                    <span className="absolute left-0 -bottom-[3px] w-full h-[1.5px] bg-[#2860E1] scale-x-100 group-hover:scale-x-0 origin-right transition-transform duration-300" />
                  </span>
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="sys-name" className="block text-xs font-bold text-[#5A6280] mb-2 tracking-wide">
                    お名前
                  </label>
                  <input
                    id="sys-name"
                    type="text"
                    required
                    placeholder="お名前"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full bg-white border border-[#E5E9F5] rounded-xl px-4 py-3.5 text-sm text-[#1D2A6E] placeholder:text-[#5A6280]/50 focus:outline-none focus:border-[#2860E1] focus:ring-2 focus:ring-[#2860E1]/15 transition"
                  />
                </div>
                <div>
                  <label htmlFor="sys-email" className="block text-xs font-bold text-[#5A6280] mb-2 tracking-wide">
                    メールアドレス
                  </label>
                  <input
                    id="sys-email"
                    type="email"
                    required
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full bg-white border border-[#E5E9F5] rounded-xl px-4 py-3.5 text-sm text-[#1D2A6E] placeholder:text-[#5A6280]/50 focus:outline-none focus:border-[#2860E1] focus:ring-2 focus:ring-[#2860E1]/15 transition"
                  />
                </div>
                <div>
                  <label htmlFor="sys-message" className="block text-xs font-bold text-[#5A6280] mb-2 tracking-wide">
                    メッセージを入力
                  </label>
                  <textarea
                    id="sys-message"
                    required
                    rows={5}
                    placeholder="ご相談内容をお書きください（業種・現状の課題・希望機能などをお気軽に）"
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="w-full bg-white border border-[#E5E9F5] rounded-xl px-4 py-3.5 text-sm text-[#1D2A6E] placeholder:text-[#5A6280]/50 focus:outline-none focus:border-[#2860E1] focus:ring-2 focus:ring-[#2860E1]/15 transition resize-none"
                  />
                </div>
                {submit === "error" && errorMsg && (
                  <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 font-bold">
                    {errorMsg}
                  </p>
                )}
                <p className="text-xs text-[#5A6280] leading-loose">
                  お問い合わせ内容は、ご返信および業務連絡のためにのみ利用します。詳細は
                  <a href="/privacy" className="text-[#2860E1] font-bold underline-offset-4 hover:underline">
                    プライバシーポリシー
                  </a>
                  をご確認ください。送信をもって同意いただいたものとみなします。
                </p>

                <button
                  type="submit"
                  disabled={submit === "submitting"}
                  className="group inline-flex items-center gap-2 bg-[#2860E1] text-white font-bold text-sm md:text-base rounded-full px-7 py-3.5 hover:bg-[#1D4FCE] transition-all duration-300 shadow-[0_4px_16px_rgba(40,96,225,0.3)] hover:shadow-[0_8px_24px_rgba(40,96,225,0.4)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submit === "submitting" ? "送信中..." : "送信する"}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>

          {/* フッター */}
          <footer className="border-t border-[#E5E9F5] pt-10 text-center">
            <p className="text-2xl font-bold tracking-wide mb-3 text-[#1D2A6E]">
              ALPACA
            </p>
            <p className="text-[#5A6280] text-sm mb-4 leading-loose">
              奄美大島を拠点に、業務システム構築・保守運用を承ります。
            </p>
            <p className="text-[#5A6280] text-xs mb-4 flex items-center justify-center gap-3 flex-wrap font-bold">
              <a href="/" className="hover:text-[#2860E1] transition-colors">トップ</a>
              <span className="text-[#5A6280]/40">/</span>
              <a href="/web" className="hover:text-[#2860E1] transition-colors">ホームページ・LP制作</a>
              <span className="text-[#5A6280]/40">/</span>
              <a href="/smart" className="hover:text-[#2860E1] transition-colors">アルパカスマート</a>
              <span className="text-[#5A6280]/40">/</span>
              <a href={SITE.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#2860E1] transition-colors">Instagram</a>
            </p>
            <p className="text-[#5A6280] text-xs mb-3 font-bold">
              <a href="/privacy" className="hover:text-[#2860E1] transition-colors underline-offset-4 hover:underline">
                プライバシーポリシー
              </a>
            </p>
            <p className="text-[#5A6280]/70 text-xs">&copy; 2026 ALPACA. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </section>
  );
}
