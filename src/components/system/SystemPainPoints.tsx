"use client";

import { useEffect, useRef, useState } from "react";

const PAINS = [
  {
    img: "09-pain-paper",
    title: "紙とExcelで限界",
    body: "予約・売上・シフトを紙とExcelに分散して記録。月末の集計に毎月丸1日かかる…。",
    follow: "1つのデータベースに統合、月末集計が自動で完成します。",
  },
  {
    img: "10-pain-software",
    title: "市販ソフトが業務に合わない",
    body: "高い月額を払って導入したのに機能が多すぎて使いこなせない。結局Excelに戻ってお金だけ払い続けている…。",
    follow: "現場の業務に必要な機能だけを設計。迷子になる画面はゼロです。",
  },
  {
    img: "11-pain-blind",
    title: "数字が見えない、経営判断が遅い",
    body: "今月いくら儲かったか即答できない。集計に時間がかかるから経営判断がいつも後手に回る…。",
    follow: "売上・客単価・在庫を瞬時にグラフ化。スマホ1画面で経営状態が見えます。",
  },
  {
    img: "12-pain-double",
    title: "POSと帳簿、二重入力で疲弊",
    body: "レジに打ち込んだ売上を、また会計ソフトに転記。同じ情報を2回・3回入力するのが日課になっている…。",
    follow: "1度の入力で関連データに自動反映、二重入力ゼロの仕組みに。",
  },
  {
    img: "13-pain-handover",
    title: "業務が属人化、新人に引き継げない",
    body: "ベテラン社員の頭の中にしかない手順、辞めたらどう運用すればいいかわからない…。",
    follow: "業務フローを仕組みに落とし込み、誰でも同じ品質でこなせる状態に。",
  },
];

export default function SystemPainPoints() {
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
    <section id="pain" ref={sectionRef} className="relative overflow-hidden bg-[#EEF1FF] py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute top-[8%] right-[5%] w-[240px] h-auto opacity-40" viewBox="0 0 400 200" fill="none">
          <ellipse cx="120" cy="120" rx="80" ry="50" fill="#DCE5FF" />
          <ellipse cx="200" cy="100" rx="100" ry="60" fill="#DCE5FF" />
          <ellipse cx="290" cy="130" rx="70" ry="45" fill="#DCE5FF" />
        </svg>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-end mb-14 md:mb-20">
          <div>
            <p className={`inline-block text-[10px] tracking-[0.4em] text-[#2860E1] font-bold mb-6 ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.05s" }}>
              PAIN POINTS — 業務にある詰まり
            </p>
            <h2 className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.15s" }}>
              こんな業務、
              <br />
              <span className="text-[#2860E1]">続けて</span>
              <br />
              いませんか？
            </h2>
          </div>
          <p className={`text-[#5A6280] text-base md:text-lg leading-loose ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.3s" }}>
            奄美の事業者さんからよく聞く、業務まわりの「詰まり」をまとめました。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PAINS.map(({ img, title, body, follow }, i) => (
            <div key={title} className={`group relative bg-white border border-[#E5E9F5] rounded-2xl overflow-hidden hover:border-[#2860E1]/50 hover:-translate-y-1 transition-all duration-300 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
              <div className="aspect-square bg-[#F4F6F8] overflow-hidden">
                <img src={`/images/system-v3/${img}.png`} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" width={1080} height={1080} loading="lazy" />
              </div>
              <div className="p-7 md:p-8 flex flex-col">
                <h3 className="font-bold text-[#1D2A6E] text-base md:text-lg mb-4 leading-snug">{title}</h3>
                <p className="text-[#5A6280] text-sm leading-loose mb-5 flex-1">{body}</p>
                <div className="mt-auto pt-4 border-t border-[#E5E9F5]">
                  <p className="text-[#2860E1] text-[13px] font-bold leading-relaxed">→ {follow}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20 md:mt-24">
          <p className={`text-[#1D2A6E] text-2xl md:text-4xl font-bold leading-relaxed ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.8s" }}>
            業務の詰まりは、
            <span className="text-[#2860E1]">仕組み</span>
            で
            <br className="md:hidden" />
            ほどけます。
          </p>
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
