"use client";

import { useEffect, useRef, useState } from "react";

const FEATURE_TEXT = [
  {
    no: "01",
    title: "LINE公式アカウントで相談無制限",
    body: "AIの活用方法、ツール選び、運用の悩み、なんでもLINEで送ってください。営業日24時間以内に返信します。定例MTGなし、思いついた時に気軽に。",
  },
  {
    no: "02",
    title: "月5時間以内の軽実装",
    body: "簡易LINE bot、Notion設定、Zapier自動化、ChatGPT活用支援、ホームページの軽微な修正など。追加見積もりなしで、月5時間まで実装します。",
  },
  {
    no: "03",
    title: "月1テキストレポート",
    body: "業界のAI最新情報と、御社向けのご提案を月1回テキストでお届け。新しいツール・モデル・活用事例の中から、本当に使えるものだけを選んでお伝えします。",
  },
  {
    no: "04",
    title: "大型実装の顧問特典価格",
    body: "本格的なLINEボット構築・ホームページ制作・業務システム開発が必要になった時は、顧問契約特典の割引価格でお見積もりします。",
  },
];

export default function AgentFeatures() {
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
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        {/* セクション見出し */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-end mb-14 md:mb-20">
          <div>
            <p
              className={`inline-block text-[10px] tracking-[0.4em] text-[#12C998] font-bold mb-6 ${revealed ? "fade-in-x" : "pre-x"}`}
              style={{ animationDelay: "0.05s" }}
            >
              WHAT&apos;S INCLUDED — 月額の中身
            </p>
            <h2
              className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] ${revealed ? "fade-in-x" : "pre-x"}`}
              style={{ animationDelay: "0.15s" }}
            >
              月¥50,000に
              <br />
              <span className="text-[#12C998]">含まれるもの</span>
            </h2>
          </div>
          <p
            className={`text-[#5A6280] text-base md:text-lg leading-loose ${revealed ? "fade-in-x" : "pre-x"}`}
            style={{ animationDelay: "0.3s" }}
          >
            「相談すること」と「軽い実装」を、定額でまるっとお引き受けします。
          </p>
        </div>

        {/* 中央：4要素ビジュアル画像（PC/SP切替） */}
        <div className={`mb-14 md:mb-20 bg-[#FAFAFA] border border-[#E5E9F5] rounded-3xl overflow-hidden ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.3s" }}>
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/agent-v3/07-features-sp.png" />
            <img
              src="/images/agent-v3/02-features-pc.png"
              alt="アルパカAI顧問 月額に含まれる4つのサービス"
              className="w-full h-auto"
              width={1920}
              height={1080}
            />
          </picture>
        </div>

        {/* 詳細テキスト 4カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURE_TEXT.map(({ no, title, body }, i) => (
            <div
              key={title}
              className={`group bg-white border border-[#E5E9F5] rounded-2xl p-8 md:p-10 hover:border-[#12C998]/40 hover:-translate-y-1 transition-all duration-300 ${revealed ? "fade-in" : "pre"}`}
              style={{ animationDelay: `${0.4 + i * 0.08}s` }}
            >
              <div className="flex items-baseline gap-4 mb-5">
                <span className="font-bold text-[#12C998] text-3xl tracking-tight tabular-nums">
                  {no}
                </span>
              </div>
              <h3 className="font-bold text-[#1D2A6E] text-xl md:text-2xl mb-4 leading-snug">
                {title}
              </h3>
              <p className="text-[#5A6280] text-sm md:text-[15px] leading-loose">
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* 含まれないものの注記 */}
        <div className={`mt-12 md:mt-14 bg-[#FAFAFA] border border-[#E5E9F5] rounded-2xl p-8 md:p-10 max-w-3xl ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.9s" }}>
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#5A6280] mb-5">
            含まれないもの
          </p>
          <ul className="space-y-3 text-[#1A1A1A] text-sm font-bold leading-loose">
            <li>※ 定例MTG（必要時のみスポット ¥10,000/30分）</li>
            <li>※ 月5時間を超える実装作業（¥10,000/時間、繰り越しなし）</li>
            <li>※ 本格的なホームページ・業務システム・LINEボット本構築（顧問特典価格にて別途お見積もり）</li>
          </ul>
        </div>
      </div>

      <style>{`
        .pre { opacity: 0; transform: translateY(32px); }
        @keyframes show-up { 0% { opacity: 0; transform: translateY(32px); } 100% { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: show-up 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) both; }

        .pre-x { opacity: 0; transform: translate(0, 24px); }
        @keyframes show-x { 0% { opacity: 0; transform: translate(0, 24px); } 100% { opacity: 1; transform: translate(0, 0); } }
        .fade-in-x { animation: show-x 0.85s cubic-bezier(0.165, 0.84, 0.44, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .fade-in, .fade-in-x { animation: none !important; }
          .pre, .pre-x { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
