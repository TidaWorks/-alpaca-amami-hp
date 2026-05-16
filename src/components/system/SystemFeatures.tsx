"use client";

import { useEffect, useRef, useState } from "react";

const FEATURE_TEXT = [
  { no: "01", title: "予約管理", body: "顧客×日時×担当を1画面で。ダブルブッキング防止＋自動リマインダー送信まで対応。" },
  { no: "02", title: "顧客台帳", body: "顧客の属性・来店履歴・LINE連携・購入履歴を統合。検索1秒、属性別アクション集計も即時。" },
  { no: "03", title: "売上集計・ダッシュボード", body: "売上・客単価・人気メニュー・在庫を瞬時にグラフ化。スマホ1画面で経営状態が把握できる。" },
  { no: "04", title: "帳票出力", body: "請求書・領収書・月次レポートを自動生成。手作業のミスをゼロに、提出までの時間を1/10に。" },
];

export default function SystemFeatures() {
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
    <section id="features" ref={sectionRef} className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-end mb-14 md:mb-20">
          <div>
            <p className={`inline-block text-[10px] tracking-[0.4em] text-[#2860E1] font-bold mb-6 ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.05s" }}>
              FEATURES — 標準で含まれる機能
            </p>
            <h2 className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.15s" }}>
              業務の<span className="text-[#2860E1]">4つの柱</span>を、
              <br />
              ひとつの仕組みに。
            </h2>
          </div>
          <p className={`text-[#5A6280] text-base md:text-lg leading-loose ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.3s" }}>
            業務システム標準パッケージに含まれる4機能。現場ヒアリングで業種に最適化して構築します。
          </p>
        </div>

        <div className={`mb-14 md:mb-20 bg-[#FAFAFA] border border-[#E5E9F5] rounded-3xl overflow-hidden ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.3s" }}>
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/system-v3/07-features-sp.png" />
            <img src="/images/system-v3/03-features-pc.png" alt="業務システムの4つの主要機能" className="w-full h-auto" width={1920} height={1080} />
          </picture>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURE_TEXT.map(({ no, title, body }, i) => (
            <div key={title} className={`group bg-white border border-[#E5E9F5] rounded-2xl p-8 md:p-10 hover:border-[#2860E1]/40 hover:-translate-y-1 transition-all duration-300 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: `${0.4 + i * 0.08}s` }}>
              <div className="flex items-baseline gap-4 mb-5">
                <span className="font-bold text-[#2860E1] text-3xl tracking-tight tabular-nums">{no}</span>
              </div>
              <h3 className="font-bold text-[#1D2A6E] text-xl md:text-2xl mb-4 leading-snug">{title}</h3>
              <p className="text-[#5A6280] text-sm md:text-[15px] leading-loose">{body}</p>
            </div>
          ))}
        </div>
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
