"use client";

import { useEffect, useRef, useState } from "react";

const wordsChaos = [
  "予約", "シフト", "売上", "請求書", "見積", "在庫", "メモ", "電話", "LINE",
  "Excel", "発注", "顧客台帳", "出勤簿", "領収書", "予定", "工程", "メール",
  "FAX", "現金", "送り状",
];

export default function SystemQuestion() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // スクロール進捗ベースで chaos → order
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh;
      const end = -rect.height + vh * 0.4;
      const pos = rect.top;
      const p = 1 - Math.max(0, Math.min(1, (pos - end) / (start - end)));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-white border-y border-[#0A2540]/10 py-32 md:py-44 overflow-hidden"
    >
      {/* 巨大な問い */}
      <div className="relative max-w-6xl mx-auto px-6 z-10">
        <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#0A2540]/60 mb-8">
          PROLOGUE / 問い
        </p>
        <h2
          className="text-[#0A2540] font-black leading-[0.95] tracking-tight max-w-4xl"
          style={{ fontSize: "clamp(2.4rem, 9vw, 6.5rem)" }}
        >
          いま、業務の
          <br />
          <span className="text-[#FF6B35]">どこ</span>
          が、
          <br />
          詰まっていますか？
        </h2>

        <p className="mt-10 text-[#0A2540]/70 text-base md:text-lg leading-[2] max-w-xl font-medium">
          現場にある仕事を、紙に書いて、Excelに転記して、口頭で共有する。
          <br />
          ひとつの業務に、いくつの場所が必要ですか？
        </p>
      </div>

      {/* カオス→秩序のワード散布 */}
      <div className="relative mt-16 md:mt-24 overflow-hidden h-[280px] md:h-[400px]">
        {wordsChaos.map((w, i) => {
          const angle = (i / wordsChaos.length) * Math.PI * 2;
          const chaosX = Math.cos(angle * 3) * 45 + (i % 5 - 2) * 20;
          const chaosY = Math.sin(angle * 5) * 35 + (i % 7 - 3) * 15;
          const chaosRot = (i % 9 - 4) * 12;
          const targetX = ((i % 5) - 2) * 18;
          const targetY = Math.floor(i / 5) * 60 - 100;

          const tx = chaosX + (targetX - chaosX) * progress;
          const ty = chaosY + (targetY - chaosY) * progress;
          const rot = chaosRot * (1 - progress);
          const opacity = 0.3 + progress * 0.7;

          return (
            <span
              key={w}
              className="absolute left-1/2 top-1/2 text-[#0A2540] font-bold whitespace-nowrap select-none pointer-events-none"
              style={{
                fontSize: progress > 0.7 ? "0.85rem" : `${1.1 - progress * 0.3}rem`,
                transform: `translate(calc(-50% + ${tx}vw), calc(-50% + ${ty}px)) rotate(${rot}deg)`,
                opacity,
                transition: "transform 0.1s linear, opacity 0.1s linear, font-size 0.3s ease",
                background: progress > 0.8 ? "#FAFAF7" : "transparent",
                padding: progress > 0.8 ? "4px 10px" : "0",
                borderRadius: progress > 0.8 ? "999px" : "0",
                border: progress > 0.8 ? "1px solid #E5E7EB" : "none",
              }}
            >
              {w}
            </span>
          );
        })}
      </div>

      {/* 解決メッセージ */}
      <div className="relative max-w-6xl mx-auto px-6 mt-12 md:mt-20 z-10">
        <p
          className="text-[#0A2540] text-2xl md:text-4xl font-black leading-[1.4] max-w-3xl"
          style={{ opacity: 0.3 + progress * 0.7 }}
        >
          散らかった業務を、
          <br />
          <span className="text-[#FF6B35]">ひとつの仕組み</span>
          に。
        </p>
        <p
          className="mt-6 text-[#0A2540]/65 text-sm md:text-base leading-[1.95] max-w-xl font-medium"
          style={{ opacity: 0.3 + progress * 0.7 }}
        >
          ALPACAは、現場ごとに散らかった仕事を仕分けして、必要な機能だけのシステムに組み直します。
        </p>
      </div>
    </section>
  );
}
