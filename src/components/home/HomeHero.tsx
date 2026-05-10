"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function HomeHero() {
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
      ref={ref}
      className="relative bg-gradient-to-br from-[#F5F3FF] via-white to-[#ECFDF5] overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28 min-h-[640px] md:min-h-[680px]"
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
            src="/images/home-hero.jpg"
            alt="奄美の事業者がスマホで業務を確認する様子"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>
        {/* モバイル: 縦版、上→下に画像、テキストエリア上にフェード */}
        <div className="md:hidden absolute inset-0">
          <Image
            src="/images/home-hero-mobile.png"
            alt="奄美の事業者がスマホで業務を確認する様子"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 90%" }}
          />
          {/* 上半分を白くフェード（テキスト可読性UP：60%まで強くキープ） */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3FF] via-[#F5F3FF]/85 via-55% to-transparent" />
        </div>
        {/* 下端を背景に溶かすフェード */}
        <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-b from-transparent to-[#ECFDF5]" />
      </div>

      {/* 装飾ブロブ */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none blur-3xl opacity-25 z-[1]"
        style={{
          background: "radial-gradient(circle, #635BFF 0%, transparent 70%)",
          animation: "alpacaBlobDrift 18s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 w-[360px] h-[360px] rounded-full pointer-events-none blur-3xl opacity-20 z-[1]"
        style={{
          background: "radial-gradient(circle, #12C998 0%, transparent 70%)",
          animation: "alpacaBlobDrift 22s ease-in-out infinite reverse",
        }}
      />

      <style>{`
        @keyframes alpacaBlobDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -10px) scale(1.05); }
          66% { transform: translate(-15px, 12px) scale(0.97); }
        }
        @keyframes alpacaShine {
          0% { transform: translateX(-120%) skewX(-12deg); }
          60%, 100% { transform: translateX(220%) skewX(-12deg); }
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div
          className="relative max-w-xl transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A]">
              CHAPTER 00
            </p>
            <span className="w-8 h-[1px] bg-[#1D3A8A]/30" />
            <p className="text-[11px] font-bold tracking-[0.3em] text-[#0A1228]/60">
              BRAND CONCEPT
            </p>
          </div>

          <h1 className="text-[#1A202C] text-[2.4rem] md:text-[3.4rem] lg:text-[4rem] leading-[1.2] font-extrabold mb-6 tracking-tight">
            奄美の事業を、
            <br />
            <span className="text-[#635BFF]">デザイン</span>
            <span className="text-[#1A202C]">と</span>
            <span className="text-[#12C998]">仕組み</span>
            <span className="text-[#1A202C]">で</span>
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">整える</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[35%] bg-[#FFC400]/60 -z-0"
                aria-hidden="true"
              />
            </span>
            。
          </h1>

          <p className="text-[#1A202C]/75 text-[0.95rem] md:text-base leading-[2] mb-9 max-w-md">
            奄美大島を拠点にする、Web制作とシステム開発のスタジオ。
            <br />
            ホームページ・ランディングページ・業務改善システムを、一つの窓口でご相談いただけます。
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <a
              href="#services"
              className="group relative inline-flex items-center gap-2 bg-[#FF6B35] text-white font-black text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-xl hover:bg-[#15296B] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                  animation: "alpacaShine 3.6s ease-in-out infinite",
                }}
              />
              <span className="relative z-10">サービスを見る</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center text-sm font-black text-[#1A202C] underline decoration-[#12C998] decoration-[2px] underline-offset-[6px] hover:decoration-[#635BFF] hover:underline-offset-[8px] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#635BFF] focus-visible:ring-offset-2 rounded-sm"
            >
              無料で相談する <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
