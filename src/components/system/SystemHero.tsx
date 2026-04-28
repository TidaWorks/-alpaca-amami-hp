"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function SystemHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="concept"
      ref={ref}
      className="relative bg-gradient-to-br from-[#F5F3FF] via-white to-[#EFF6FF] overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28"
    >
      {/* 装飾：波 */}
      <svg
        aria-hidden="true"
        className="absolute -top-12 right-0 w-[420px] md:w-[640px] opacity-40 pointer-events-none"
        viewBox="0 0 600 200"
        fill="none"
        style={{ animation: "sysHeroWaveDrift 8s ease-in-out infinite" }}
      >
        <path
          d="M0 100 Q 75 40 150 100 T 300 100 T 450 100 T 600 100"
          stroke="#635BFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M0 130 Q 75 70 150 130 T 300 130 T 450 130 T 600 130"
          stroke="#DBEAFE"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* 装飾：太陽 */}
      <svg
        aria-hidden="true"
        className="absolute top-32 right-12 md:right-20 w-16 h-16 text-[#FFC400] opacity-80 pointer-events-none hidden md:block"
        viewBox="0 0 60 60"
        fill="none"
        style={{ animation: "sysHeroSpin 22s linear infinite", transformOrigin: "center" }}
      >
        <circle cx="30" cy="30" r="10" fill="currentColor" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4;
          const x1 = 30 + Math.cos(angle) * 16;
          const y1 = 30 + Math.sin(angle) * 16;
          const x2 = 30 + Math.cos(angle) * 24;
          const y2 = 30 + Math.sin(angle) * 24;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          );
        })}
      </svg>

      <style>{`
        @keyframes sysHeroWaveDrift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-12px); }
        }
        @keyframes sysHeroSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sysHeroShine {
          0% { transform: translateX(-120%) skewX(-12deg); }
          60%, 100% { transform: translateX(220%) skewX(-12deg); }
        }
        @keyframes sysHeroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes sysHeroPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-14 items-center">
        {/* ── 左カラム ── */}
        <div
          className="relative z-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* セクション番号タグ */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="bg-[#635BFF] text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded">
              01
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]">SYSTEM DEVELOPMENT</span>
          </div>

          {/* メインヘッドライン */}
          <h1 className="text-[#1A202C] text-[2.4rem] md:text-[3.4rem] lg:text-[4rem] leading-[1.2] font-extrabold mb-6 tracking-tight">
            業務を
            <span className="text-[#635BFF]">データ</span>
            で、
            <br />
            もっと
            <span className="relative inline-block">
              <span className="relative z-10">なめらかに</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[35%] bg-[#FFC400]/60 -z-0"
                aria-hidden="true"
              />
            </span>
            。
          </h1>

          {/* サブコピー */}
          <p className="text-[#1A202C]/75 text-[0.95rem] md:text-base leading-[2] mb-8 max-w-md">
            奄美の事業者の毎日を、クラウドでスマートに。
            <br />
            ALPACAが、あなたのビジネスを支えます。
          </p>

          {/* CTAボタン群 */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 bg-[#635BFF] text-white font-black text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-xl hover:bg-[#5249E0] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#635BFF] focus-visible:ring-offset-2"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                  animation: "sysHeroShine 3.6s ease-in-out infinite",
                }}
              />
              <span className="relative z-10">無料で相談する</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#features"
              className="group inline-flex items-center text-sm font-black text-[#1A202C] underline decoration-[#635BFF] decoration-[2px] underline-offset-[6px] hover:decoration-[#FFC400] hover:underline-offset-[8px] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#635BFF] focus-visible:ring-offset-2 rounded-sm"
            >
              機能を見る <span className="ml-1 inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>

          {/* キーワードタグ */}
          <div className="flex flex-wrap items-center gap-2">
            {["効率化", "可視化", "自動化", "リアルタイム", "信頼"].map((k, i) => (
              <span
                key={k}
                className="text-xs font-bold text-[#635BFF] bg-white border border-[#DBEAFE] rounded-full px-3 py-1.5 hover:bg-[#635BFF] hover:text-white hover:border-[#635BFF] hover:-translate-y-0.5 cursor-default"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.5s ease ${500 + i * 80}ms, transform 0.5s ease ${500 + i * 80}ms, background 0.25s, color 0.25s, border-color 0.25s, translate 0.25s`,
                }}
              >
                {k}
              </span>
            ))}
          </div>
        </div>

        {/* ── 右カラム: ダッシュボードモック（プレースホルダ） ── */}
        <div
          className="relative flex flex-col items-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "200ms",
          }}
        >
          {/* 装飾バッジ */}
          <span
            className="absolute -top-2 right-4 z-30 bg-[#FFC400] text-[#1A202C] font-black text-[11px] tracking-widest px-3 py-1.5 rounded shadow-md rotate-[-3deg]"
            style={{ animation: "sysHeroFloat 3.2s ease-in-out infinite" }}
          >
            DEMO
          </span>

          {/* ダッシュボードビジュアル */}
          <div className="w-full max-w-md">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#1A202C]/5 hover:shadow-2xl transition-shadow duration-500">
              <Image
                src="/images/system-hero-dashboard.png"
                alt="ALPACAが手がける業務システム開発のビジュアル（蝶ネクタイのアルパカと業務ダッシュボード）"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1A202C]/10 via-transparent to-[#FFC400]/10 pointer-events-none" aria-hidden="true" />
            </div>

            {/* 数値カード3つ */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { num: "¥1,280K", label: "今月の売上", color: "#635BFF" },
                { num: "320", label: "予約件数", color: "#FFC400" },
                { num: "48", label: "新規顧客", color: "#0EA5E9" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="group bg-white border border-[#E5E7EB] rounded-xl p-3 shadow-sm hover:-translate-y-0.5 hover:shadow-md cursor-default"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(10px)",
                    transition: `opacity 0.5s ease ${500 + i * 110}ms, transform 0.5s ease ${500 + i * 110}ms, box-shadow 0.3s, translate 0.3s`,
                    borderTop: `3px solid ${item.color}`,
                  }}
                >
                  <p
                    className="text-base md:text-lg font-extrabold tabular-nums group-hover:scale-105 transition-transform duration-300 origin-left"
                    style={{ color: item.color }}
                  >
                    {item.num}
                  </p>
                  <p className="text-[10px] text-[#1A202C]/60 mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
