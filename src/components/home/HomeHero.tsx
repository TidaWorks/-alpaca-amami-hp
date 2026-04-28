"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const heroSlides = [
  {
    src: "/images/home-hero-services.png",
    label: "ホームページ制作",
    sub: "店舗・コーポレートサイト",
    color: "#12C998",
  },
  {
    src: "/images/home-hero-system.png",
    label: "業務改善システム",
    sub: "予約・顧客・売上の一元管理",
    color: "#635BFF",
  },
  {
    src: "/images/home-hero-lp.png",
    label: "LP制作",
    sub: "イベント・キャンペーンを最速3日で",
    color: "#FFC400",
  },
];

export default function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(t);
  }, [paused]);

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
      className="relative bg-gradient-to-br from-[#F5F3FF] via-white to-[#ECFDF5] overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28"
    >
      {/* 装飾 */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, #635BFF 0%, transparent 70%)",
          animation: "alpacaBlobDrift 18s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 w-[360px] h-[360px] rounded-full pointer-events-none blur-3xl opacity-25"
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
        @keyframes alpacaFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes alpacaTickerPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.18); }
        }
      `}</style>

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-center">
        {/* 左カラム */}
        <div
          className="relative z-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="bg-[#12C998] text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded">
              ALPACA
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]">AMAMI WEB & SYSTEM STUDIO</span>
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
            ホームページ・LP・業務改善システムを、一つの窓口でご相談いただけます。
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <a
              href="#services"
              className="group relative inline-flex items-center gap-2 bg-[#635BFF] text-white font-black text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-xl hover:bg-[#5249E0] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#635BFF] focus-visible:ring-offset-2"
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

        {/* 右カラム: 3サービス分岐プレビュー */}
        <div
          className="relative transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "200ms",
          }}
        >
          <div
            className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#1A202C]/5 hover:shadow-2xl transition-shadow duration-500 group"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {heroSlides.map((s, i) => (
              <Image
                key={s.src}
                src={s.src}
                alt={s.label}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 480px"
                className={`object-cover transition-opacity duration-1000 ease-out ${
                  i === slide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#1A202C]/55 via-[#1A202C]/0 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* キャプション */}
            <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-3 pointer-events-none">
              <div className="flex flex-col gap-1">
                {heroSlides.map((s, i) => (
                  <div
                    key={s.src}
                    className={`transition-all duration-700 ${
                      i === slide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 absolute"
                    }`}
                    aria-hidden={i !== slide}
                  >
                    <p
                      className="text-base md:text-lg font-extrabold drop-shadow-md"
                      style={{ color: s.color }}
                    >
                      {s.label}
                    </p>
                    <p className="text-[11px] md:text-xs font-bold text-white/90 drop-shadow">
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* ドットインジケーター */}
              <div className="flex gap-1.5 pointer-events-auto">
                {heroSlides.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    onClick={() => {
                      setSlide(i);
                      setPaused(true);
                      setTimeout(() => setPaused(false), 8000);
                    }}
                    aria-label={`${s.label} を表示`}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                      i === slide ? "w-7 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
