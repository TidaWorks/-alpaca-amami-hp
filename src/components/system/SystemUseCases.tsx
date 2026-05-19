"use client";

import { useEffect, useRef, useState } from "react";

const CASES = [
  {
    img: "14-case-restaurant",
    industry: "飲食店",
    question: "予約と売上を1つにまとめたい",
    answer: "予約管理・売上記録・顧客情報を1つのシステムに集約。日々の業務をスマホ1台で。",
  },
  {
    img: "15-case-beauty",
    industry: "美容室・サロン",
    question: "予約管理を紙からデジタルに移したい",
    answer: "顧客×担当×時間枠を一覧管理、カット履歴記録まで標準実装。",
  },
  {
    img: "17-case-clinic",
    industry: "整骨院・接骨院",
    question: "紙のカルテをスマホで見られるようにしたい",
    answer: "電子カルテ・施術履歴・予約管理を統合。タブレット1枚で完結する運用に。",
  },
  {
    img: "18-case-retail",
    industry: "小売・物販",
    question: "在庫が見えない、発注が後手に回る",
    answer: "在庫数の記録・売上集計・欠品アラートを仕組みで自動化。日々の在庫把握が一目で。",
  },
  {
    img: "19-case-construction",
    industry: "建設業",
    question: "紙の日報・案件管理を効率化したい",
    answer: "現場日報をスマホ入力に切替、案件ステータス・施主台帳も一画面に。書類ベースから脱出して時間を生む運用に。",
  },
];

export default function SystemUseCases() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { setRevealed(true); io.disconnect(); } }); },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) { setRevealed(true); io.disconnect(); }
    const failsafeId = window.setTimeout(() => setRevealed(true), 800);
    return () => { io.disconnect(); window.clearTimeout(failsafeId); };
  }, []);

  return (
    <section id="usecases" ref={sectionRef} className="relative overflow-hidden bg-[#EEF1FF] py-24 md:py-32">
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-end mb-14 md:mb-20">
          <div>
            <p className={`inline-block text-[10px] tracking-[0.4em] text-[#2860E1] font-bold mb-6 ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.05s" }}>
              USE CASES — 業種別
            </p>
            <h2 className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.15s" }}>
              業種別の
              <br />
              <span className="text-[#2860E1]">対応例</span>
            </h2>
          </div>
          <p className={`text-[#5A6280] text-base md:text-lg leading-loose ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.3s" }}>
            業種別に、対応可能な業務システムの設計例。実際の構築は現場ヒアリングをふまえてカスタマイズします。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CASES.map(({ img, industry, question, answer }, i) => (
            <div key={industry} className={`group bg-white border border-[#E5E9F5] rounded-2xl overflow-hidden hover:border-[#2860E1]/50 hover:-translate-y-1 transition-all duration-300 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
              <div className="aspect-square bg-[#F4F6F8] overflow-hidden">
                <img src={`/images/system-v3/${img}.png`} alt={`${industry}の利用シーン`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" width={1080} height={1080} loading="lazy" />
              </div>
              <div className="p-7 md:p-8">
                <p className="text-[10px] font-bold tracking-[0.3em] text-[#2860E1] mb-3">業種</p>
                <p className="font-bold text-[#1D2A6E] text-xl md:text-2xl mb-5">{industry}</p>
                <p className="font-bold text-[#1A1A1A] text-sm md:text-base mb-4 leading-snug">「{question}」</p>
                <p className="text-[#5A6280] text-sm leading-loose">
                  <span className="text-[#2860E1] font-bold">→ </span>{answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className={`text-center mt-10 text-[#5A6280] text-[13px] font-bold leading-relaxed ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "1.0s" }}>
          ※ 上記は対応可能な業種の一例です。他業種・複数業務の連動など、まずはご相談ください。
        </p>
      </div>

      <style>{`
        .pre { opacity: 0; transform: translateY(28px); }
        @keyframes show-up { 0% { opacity: 0; transform: translateY(28px); } 100% { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: show-up 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) both; }
        .pre-x { opacity: 0; transform: translate(0, 24px); }
        @keyframes show-x { 0% { opacity: 0; transform: translate(0, 24px); } 100% { opacity: 1; transform: translate(0, 0); } }
        .fade-in-x { animation: show-x 0.85s cubic-bezier(0.165, 0.84, 0.44, 1) both; }
        @media (prefers-reduced-motion: reduce) { .fade-in, .fade-in-x { animation: none !important; } .pre, .pre-x { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
}
