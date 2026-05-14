"use client";

import { useEffect, useRef } from "react";

export default function WebHero() {
  const blobRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!blobRef.current) return;
      const y = window.scrollY;
      blobRef.current.style.transform = `translate(${y * 0.06}px, ${y * 0.12}px) rotate(${y * 0.05}deg)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="concept"
      className="relative overflow-hidden min-h-[100svh] bg-[#F8F8F8] flex items-center"
    >
      {/* ── 背景：givee風オーガニックシェイプ ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* 左下：黄色の有機曲線（スクロール連動回転） */}
        <div
          ref={blobRef}
          className="absolute -left-32 -bottom-40 w-[640px] h-[640px] md:w-[820px] md:h-[820px] will-change-transform"
          style={{ transition: "transform 0.12s linear" }}
        >
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <path
              d="M120,320 C90,180 240,80 380,120 C520,160 580,300 540,420 C500,540 320,580 200,520 C100,470 150,440 120,320 Z"
              fill="#FFE900"
              className="animate-blob-rotate"
            />
          </svg>
        </div>

        {/* 右上：ディープブルー三角 */}
        <svg
          className="absolute top-[10%] right-[6%] w-[120px] md:w-[180px] h-auto animate-tri-float"
          viewBox="0 0 200 200"
        >
          <polygon points="100,20 180,180 20,180" fill="#004097" />
        </svg>

        {/* 右下：オレンジ半円 */}
        <svg
          className="absolute -right-12 top-[55%] w-[160px] md:w-[240px] h-auto animate-half-rotate"
          viewBox="0 0 200 200"
        >
          <path d="M100,0 A100,100 0 0,1 100,200 Z" fill="#EC6C00" />
        </svg>

        {/* 右の縦ピンクなしの代わりに黄色細帯 */}
        <div className="absolute top-0 right-[2%] w-[3px] h-[60%] bg-black/10 hidden md:block" />
      </div>

      {/* ── 本体 ── */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 py-32 md:py-40">
        {/* 小英文ラベル */}
        <p
          className="text-sm tracking-[0.3em] text-black/70 mb-6 animate-reveal-up"
          style={{ animationDelay: "120ms" }}
        >
          ALPACA — Web Studio in Amami
        </p>

        {/* 巨大JPヘッドライン */}
        <h1
          className="text-black text-[3.2rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] leading-[1.05] tracking-[-0.02em] mb-12 animate-reveal-up"
          style={{ fontWeight: 500, animationDelay: "200ms" }}
        >
          <span className="block">伝わる</span>
          <span className="block">デザインで</span>
          <span className="block relative">
            <span className="relative inline-block">
              島の魅力
              <svg
                className="absolute -bottom-2 left-0 w-full h-4 md:h-6"
                viewBox="0 0 400 30"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M5,18 Q100,4 200,16 T395,12"
                  stroke="#FFE900"
                  strokeWidth="14"
                  fill="none"
                  strokeLinecap="round"
                  className="animate-underline-draw"
                  style={{ strokeDasharray: 500, strokeDashoffset: 500 }}
                />
              </svg>
            </span>
            を、
          </span>
          <span className="block">全国へ。</span>
        </h1>

        {/* リード本文 */}
        <p
          className="text-black/80 text-base md:text-lg leading-loose tracking-wide mb-12 max-w-2xl animate-reveal-up"
          style={{ animationDelay: "380ms" }}
        >
          鹿児島県・奄美大島を拠点にする
          ホームページ・LP制作スタジオです。
          島内なら直接お伺いし、公開後の更新も
          全部お任せいただけます。
        </p>

        {/* CTA群：黒丸pill + アロー丸 */}
        <div
          className="flex flex-wrap items-center gap-6 animate-reveal-up"
          style={{ animationDelay: "560ms" }}
        >
          <a href="#contact" className="group inline-flex items-center gap-3">
            <span className="inline-block bg-black text-white text-base font-medium rounded-full px-8 py-4 group-hover:bg-[#EC6C00] transition-colors">
              無料で相談する
            </span>
            <span className="w-12 h-12 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all group-hover:-translate-y-0.5 animate-arrow-ping">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
          <a
            href="#works"
            className="group inline-flex items-baseline gap-2 text-sm text-black"
          >
            <span className="relative">
              制作実績を見る
              <span className="absolute left-0 -bottom-[3px] w-full h-[1.5px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* 右下：Scroll ヒント（givee準拠） */}
      <div className="absolute bottom-8 right-8 md:right-12 z-20 hidden md:flex flex-col items-center gap-3">
        <span className="text-[11px] tracking-[0.4em] text-black/70 [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <span className="w-px h-12 bg-black/30 animate-scroll-line" />
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal-up {
          opacity: 0;
          animation: reveal-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes blob-rotate {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(8deg) scale(1.03); }
        }
        .animate-blob-rotate {
          transform-origin: center;
          animation: blob-rotate 14s ease-in-out infinite;
        }
        @keyframes tri-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(8deg); }
        }
        .animate-tri-float {
          animation: tri-float 8s ease-in-out infinite;
        }
        @keyframes half-rotate {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-12deg); }
        }
        .animate-half-rotate {
          transform-origin: center;
          animation: half-rotate 10s ease-in-out infinite;
        }
        @keyframes underline-draw {
          to { stroke-dashoffset: 0; }
        }
        .animate-underline-draw {
          animation: underline-draw 1.6s cubic-bezier(0.65, 0, 0.35, 1) 0.9s forwards;
        }
        @keyframes arrow-ping {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,0,0,0.15); }
          50% { box-shadow: 0 0 0 6px rgba(0,0,0,0); }
        }
        .animate-arrow-ping {
          animation: arrow-ping 2.2s ease-in-out infinite;
        }
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        .animate-scroll-line {
          animation: scroll-line 2.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-reveal-up,
          .animate-blob-rotate,
          .animate-tri-float,
          .animate-half-rotate,
          .animate-underline-draw,
          .animate-arrow-ping,
          .animate-scroll-line {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
