"use client";

import { useEffect, useRef, useState } from "react";
import {
  UtensilsCrossed,
  BedDouble,
  Scissors,
  Map,
  HardHat,
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
    industry: "飲食店",
    question: "問い合わせ・予約・仕入れ・経理まで、毎日の事務作業に追われてる",
    answer:
      "Gmail / LINE / freee を繋いで、問い合わせの一次対応から予約管理・経費精算まで、AI秘書が下書きを作ります。送信・確定は店主が承認するので、誤送信の不安なく回せます。",
    Icon: UtensilsCrossed,
    accent: "#E85A4F",
    bg: "#FDECE9",
  },
  {
    industry: "宿泊業",
    question: "予約問い合わせや顧客対応に時間が取られて、おもてなしに集中できない",
    answer:
      "Gmail / LINE / Notion を繋いで、予約問い合わせの返信文と顧客台帳の更新をAI秘書が用意。最終的な確認・送信はオーナーが担当する設計です。",
    Icon: BedDouble,
    accent: "#2860E1",
    bg: "#E8F0FE",
  },
  {
    industry: "サロン",
    question: "予約調整・顧客カルテ更新・売上集計でレジ前に時間が消える",
    answer:
      "LINE / Google カレンダー / freee を繋いで、予約調整の下書き・カルテ更新・売上集計をAIで整理。経営と接客に集中できる時間が増えます。",
    Icon: Scissors,
    accent: "#E8669A",
    bg: "#FCEAF1",
  },
  {
    industry: "観光業",
    question: "ツアー予約・案内対応・経費精算をひとりで全部やってる",
    answer:
      "Gmail / LINE / Google カレンダーを繋いで、ツアー予約調整・問い合わせ回答・経費精算をAI秘書がサポート。島でお客様と過ごす時間を増やします。",
    Icon: Map,
    accent: "#12C998",
    bg: "#E2F8F1",
  },
  {
    industry: "土木建設",
    question: "工程管理・書類業務・現場からの報告に手が回らない",
    answer:
      "Gmail / kintone / Backlog を繋いで、工程管理表の更新・書類作成・現場LINEからの日報整理をAIで集約。承認は現場監督が一括で。",
    Icon: HardHat,
    accent: "#F59E0B",
    bg: "#FEF3C7",
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
            事業者さんから実際に寄せられる相談を、業種別にまとめました。
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
