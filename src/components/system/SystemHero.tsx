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
      className="relative bg-gradient-to-br from-[#F5F3FF] via-white to-[#EFF6FF] overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28 min-h-[640px] md:min-h-[680px]"
    >
      {/* フルブリード背景画像（PC=ワイド / モバイル=縦） */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* PC: ワイド版、左→右に溶ける */}
        <div
          className="hidden md:block absolute inset-0"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 25%, #000 45%, #000 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 25%, #000 45%, #000 100%)",
          }}
        >
          <Image
            src="/images/system-hero.png"
            alt="奄美の事業者がノートPCで業務システムを操作する様子"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>
        {/* モバイル: 縦版、上→下に画像、テキストエリア上にフェード */}
        <div className="md:hidden absolute inset-0">
          <Image
            src="/images/system-hero-mobile.png"
            alt="奄美の事業者がノートPCで業務システムを操作する様子"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* 上半分を白くフェード（テキスト可読性） */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3FF]/95 via-[#F5F3FF]/60 to-transparent" />
        </div>
        {/* 下端を背景に溶かすフェード */}
        <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-b from-transparent to-[#EFF6FF]" />
      </div>

      {/* 装飾：波 */}
      <svg
        aria-hidden="true"
        className="absolute -top-12 right-0 w-[420px] md:w-[640px] opacity-40 pointer-events-none z-[1]"
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

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* ── テキストブロック ── */}
        <div
          className="relative max-w-xl transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* セクション番号タグ */}
          <div className="inline-flex items-center gap-3 mb-6">
            <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A]">
              CHAPTER 00
            </p>
            <span className="w-8 h-[1px] bg-[#1D3A8A]/30" />
            <p className="text-[11px] font-bold tracking-[0.3em] text-[#0A1228]/60">
              SYSTEM DEVELOPMENT
            </p>
          </div>

          {/* メインヘッドライン */}
          <h1 className="text-[#1A202C] text-[2rem] md:text-[2.6rem] lg:text-[3.2rem] leading-[1.2] font-extrabold mb-6 tracking-tight">
            業務を
            <span className="text-[#635BFF]">システム</span>
            で、
            <br />
            もっと
            <span className="relative inline-block">
              <span className="relative z-10">シンプルに</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[35%] bg-[#FFC400]/60 -z-0"
                aria-hidden="true"
              />
            </span>
            。
          </h1>

          {/* サブコピー */}
          <p className="text-[#1A202C]/75 text-[0.95rem] md:text-base leading-[2] mb-8 max-w-md">
            多機能じゃなく、必要なものだけ。
            <br />
            奄美の事業者にちょうどいい仕組みを、ALPACAがつくります。
          </p>

          {/* CTAボタン群 */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 bg-[#FF6B35] text-white font-black text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-xl hover:bg-[#15296B] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
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

      </div>
    </section>
  );
}
