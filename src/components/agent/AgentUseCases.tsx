"use client";

import { useEffect, useRef, useState } from "react";
import {
  BedDouble,
  UtensilsCrossed,
  Map,
  Scale,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

type CaseItem = {
  industry: string;
  question: string;
  answer: string;
  Icon: LucideIcon;
  accent: string; // 業種カラー（アイコン＆装飾色）
  bg: string;    // アイコンエリアの薄背景
};

const CASES: CaseItem[] = [
  {
    industry: "宿泊業",
    question: "外国人観光客の予約問い合わせをAIで多言語対応したい",
    answer:
      "LINEボット＋多言語翻訳の組み合わせで対応可能です。月5時間枠で簡易版を構築、本格運用はスマート特典価格でお見積もりします。",
    Icon: BedDouble,
    accent: "#2860E1",
    bg: "#E8F0FE",
  },
  {
    industry: "飲食店",
    question: "インスタDM返信が追いつかない、AIで自動化できる？",
    answer:
      "Meta Business SuiteとChatGPT API連携で自動応答化できます。月5時間枠で構築・調整まで対応します。",
    Icon: UtensilsCrossed,
    accent: "#E85A4F",
    bg: "#FDECE9",
  },
  {
    industry: "観光ガイド",
    question: "予約管理を紙からデジタルに移行したい",
    answer:
      "Notion予約データベースを構築、スマホからも確認できる運用フローを設計します。月5時間以内で完了します。",
    Icon: Map,
    accent: "#12C998",
    bg: "#E2F8F1",
  },
  {
    industry: "士業",
    question: "議事録作成が時間かかる、AIで効率化したい",
    answer:
      "Otter / Notta の導入支援＋運用フロー設計を行います。文字起こしから要約までの一連の流れを整えます。",
    Icon: Scale,
    accent: "#1D2A6E",
    bg: "#E5E9F5",
  },
  {
    industry: "医療・介護",
    question: "問い合わせ電話が多すぎる、自動応答に振りたい",
    answer:
      "LINEボットでの問い合わせ受付＋電話AI応答の組み合わせをご提案します。導入規模に応じて段階的に進めます。",
    Icon: Stethoscope,
    accent: "#E8669A",
    bg: "#FCEAF1",
  },
];

export default function AgentUseCases() {
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
      id="usecases"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F0FBF7] py-24 md:py-32"
    >
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        {/* セクション見出し */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-end mb-14 md:mb-20">
          <div>
            <p
              className={`inline-block text-[10px] tracking-[0.4em] text-[#12C998] font-bold mb-6 ${revealed ? "fade-in-x" : "pre-x"}`}
              style={{ animationDelay: "0.05s" }}
            >
              USE CASES — 業種別
            </p>
            <h2
              className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] ${revealed ? "fade-in-x" : "pre-x"}`}
              style={{ animationDelay: "0.15s" }}
            >
              業種別の
              <br />
              <span className="text-[#12C998]">ご相談例</span>
            </h2>
          </div>
          <p
            className={`text-[#5A6280] text-base md:text-lg leading-loose ${revealed ? "fade-in-x" : "pre-x"}`}
            style={{ animationDelay: "0.3s" }}
          >
            奄美の事業者さんから実際に寄せられる相談を、業種別にまとめました。
          </p>
        </div>

        {/* 5業種カードグリッド */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CASES.map(({ industry, question, answer, Icon, accent, bg }, i) => (
            <div
              key={industry}
              className={`group bg-white border border-[#E5E9F5] rounded-2xl overflow-hidden hover:border-[#12C998]/50 hover:-translate-y-1 transition-all duration-300 ${revealed ? "fade-in" : "pre"}`}
              style={{ animationDelay: `${0.3 + i * 0.08}s` }}
            >
              <div
                className="relative aspect-[16/9] overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: bg }}
              >
                {/* 装飾ドット（業種カラー、控えめ） */}
                <span
                  aria-hidden
                  className="absolute top-5 left-5 w-2 h-2 rounded-full opacity-60"
                  style={{ backgroundColor: accent }}
                />
                <span
                  aria-hidden
                  className="absolute bottom-5 right-5 w-2 h-2 rounded-full opacity-40"
                  style={{ backgroundColor: accent }}
                />
                <span
                  aria-hidden
                  className="absolute top-1/2 right-8 -translate-y-1/2 w-1.5 h-1.5 rounded-full opacity-30"
                  style={{ backgroundColor: accent }}
                />
                <Icon
                  aria-hidden
                  strokeWidth={1.5}
                  className="w-20 h-20 md:w-24 md:h-24 transition-transform duration-500 group-hover:scale-110"
                  style={{ color: accent }}
                />
              </div>
              <div className="p-7 md:p-8">
                <p
                  className="text-[10px] font-bold tracking-[0.3em] mb-3"
                  style={{ color: accent }}
                >
                  業種
                </p>
                <p className="font-bold text-[#1D2A6E] text-xl md:text-2xl mb-5">
                  {industry}
                </p>
                <p className="font-bold text-[#1A1A1A] text-sm md:text-base mb-4 leading-snug">
                  「{question}」
                </p>
                <p className="text-[#5A6280] text-sm leading-loose">
                  <span className="font-bold" style={{ color: accent }}>→ </span>
                  {answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className={`text-center mt-10 text-[#5A6280] text-[13px] font-bold leading-relaxed ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "1.0s" }}>
          ※ 上記は代表例です。お困りごとが他の業種・他のテーマでも、まずはご相談ください。
        </p>
      </div>

      <style>{`
        .pre { opacity: 0; transform: translateY(28px); }
        @keyframes show-up { 0% { opacity: 0; transform: translateY(28px); } 100% { opacity: 1; transform: translateY(0); } }
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
