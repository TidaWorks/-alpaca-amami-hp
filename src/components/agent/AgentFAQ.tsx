"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    q: "ChatGPT Plusの契約は必要ですか？",
    a: "はい、月¥3,000のChatGPT Plusはお客様側でのご契約をお願いします（Codex Desktopを動かすために必須）。契約のご案内・サポートは初期セットアップ時にこちらで行いますので、ご自身で調べる必要はありません。",
  },
  {
    q: "AIが間違ったメールを送信してしまわないか不安です",
    a: "AIエージェントは「下書き／提案／確認画面まで」を担当する設計です。メール送信・支払い・予約確定・freeeへの記帳などの実行アクションは、必ずお客様自身が画面で承認するように構築します（承認ゲート設計）。さらに責任の所在も契約書で明文化するので、構造的に事故を防ぎます。",
  },
  {
    q: "どんなサービスと連携できますか？",
    a: "Gmail / LINE / Google カレンダー / freee / マネーフォワード / kintone / Slack / Notion / Dropbox 等、50以上のサービスと連携可能です（MCP対応＋OAuth対応のサービスがほぼ対象）。お客様の業務でよく使われる3つを、初期セットアップで構築します。",
  },
  {
    q: "あとから連携を追加したくなったらどうなりますか？",
    a: "月額外のオプションで追加可能です。1連携 ¥10,000〜、5連携セット ¥50,000。導入後に「これも繋ぎたい」というご要望は、月例相談の中で伺います。",
  },
  {
    q: "月額¥15,000は解約できますか？",
    a: "はい、月単位で解約可能です。解約申請は前月末までにご連絡ください。なお、初期セットアップ済みのCodex Desktop・カスタム指示・連携環境はそのままお使いいただけます（再設定や情報の取り戻しが必要になった場合のみ別途お見積もりとなります）。",
  },
  {
    q: "奄美以外の地域でも対応できますか？",
    a: "はい、オンラインで完結します。30分の無料相談、契約手続き、初期セットアップ、90分レクチャーまで、すべてリモートで進められます。日本国内であれば対応可能です。",
  },
];

export default function AgentFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

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

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="relative max-w-[1080px] mx-auto px-6 md:px-10">
        {/* セクション見出し */}
        <div className="text-center mb-14 md:mb-20">
          <p
            className={`inline-block text-[10px] tracking-[0.4em] text-[#12C998] font-bold mb-6 ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.05s" }}
          >
            FAQ — よくあるご質問
          </p>
          <h2
            className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.15s" }}
          >
            よくある
            <br />
            <span className="text-[#12C998]">ご質問</span>
          </h2>
        </div>

        {/* アコーディオン */}
        <div className="bg-[#FAFAFA] border border-[#E5E9F5] rounded-2xl overflow-hidden">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`border-b border-[#E5E9F5] last:border-0 transition-colors duration-300 ${
                  isOpen ? "bg-white" : "hover:bg-white"
                } ${revealed ? "fade-in" : "pre"}`}
                style={{ animationDelay: `${0.25 + i * 0.05}s` }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left px-6 md:px-10 py-7 md:py-8 flex items-start gap-6 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-[#12C998] text-base md:text-lg tracking-wider flex-shrink-0 pt-[3px] tabular-nums">
                    Q{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-bold text-[#1D2A6E] text-base md:text-lg leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-10 h-10 rounded-full bg-[#E8F9F3] ring-1 ring-[#12C998]/40 flex items-center justify-center transition-all duration-500 ${
                      isOpen ? "rotate-45 bg-[#12C998] ring-[#12C998]" : ""
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "white" : "#12C998"} strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 md:px-10 pb-8 md:pb-10 ml-[2.5rem] md:ml-[3rem]">
                    <p className="text-[#5A6280] text-sm md:text-[15px] leading-loose max-w-2xl">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .pre { opacity: 0; transform: translateY(28px); }
        @keyframes show-up { 0% { opacity: 0; transform: translateY(28px); } 100% { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: show-up 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .fade-in { animation: none !important; }
          .pre { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
