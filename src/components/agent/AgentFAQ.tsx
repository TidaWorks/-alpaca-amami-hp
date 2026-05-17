"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    q: "どこから相談すればいいですか？",
    a: "契約後にご案内するLINE公式アカウントに、業務の悩みでもツール選びでも、なんでも気軽にお送りください。営業日24時間以内に返信します。",
  },
  {
    q: "月5時間以内の軽実装って、どれくらいの作業が含まれますか？",
    a: "簡易LINE botの構築、Notionテンプレ作成・運用設計、Zapier等を使った自動化、ChatGPTのプロンプト整備、ホームページの軽微な修正など。「中程度のNotionワークスペース構築」「シンプルなLINEボットの叩き台」くらいが目安です。",
  },
  {
    q: "もっと大きな案件をお願いしたい場合はどうなりますか？",
    a: "本格的なLINEボット構築・ホームページ制作・業務システム開発が必要になった場合は、スマート特典価格にてお見積もりします。通常価格より割引価格でご案内します。",
  },
  {
    q: "解約したい時はどうすればいいですか？",
    a: "最低契約期間は3ヶ月です。4ヶ月目以降はいつでも月単位で解約可能です。解約申請は前月末までにLINE経由でご連絡ください。",
  },
  {
    q: "島外(鹿児島本土・東京等)でも契約できますか？",
    a: "はい、オンラインで完結します。LINE公式アカウント＋オンラインミーティングで運用するため、所在地に関係なくご利用いただけます。",
  },
  {
    q: "業種制限はありますか？",
    a: "基本的にどの業種でも対応可能です。ただし、レンタカー業界は代表が本業で関わっており、利益相反となるためお受けできません。",
  },
  {
    q: "ChatGPTやLINEの月額利用料は別ですか？",
    a: "はい、ツール側のAPI料金や月額利用料は別途実費でご負担いただきます。導入時にコストの見立てもご案内します。",
  },
  {
    q: "ALPACAの実績を教えてください",
    a: "TukTuk（レンタカー事業）でのAI活用・社内システム構築実績、Threads/Xでのキャラクター自動運用実績、ホームページ・LP制作実績などがあります。詳しくは別途事例集をお送りします。",
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
