"use client";

import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

export default function HomeHero() {
  const { ref, revealed } = useReveal<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <section
      ref={ref}
      aria-label="ALPACA ヒーロー"
      className="relative overflow-hidden bg-[#07BC98] pt-[72px] md:pt-[84px]"
    >
      <div
        className="relative w-full transition-all duration-700"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/home-v3/home-sp-garatto.png" />
          <img
            src="/images/home-v3/home-pc-garatto.png"
            alt="あなたの業務を、ガラッと変える！ — ALPACA"
            className="w-full h-auto block"
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
          />
        </picture>
        {/* 画像下端からセクションbgへの色つなぎフェード（境界線解消） */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 bottom-0 h-20 md:h-24 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(7,188,152,0) 0%, #07BC98 100%)",
          }}
        />
      </div>

      <div
        className="relative pb-14 md:pb-20 pt-8 md:pt-12 px-6 transition-all duration-700"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(16px)",
          transitionDelay: "200ms",
        }}
      >
        <div className="max-w-[440px] mx-auto flex flex-col items-stretch gap-4 md:gap-5">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 bg-[#FF3D8B] text-white font-bold text-lg md:text-xl px-8 py-5 md:py-6 rounded-full shadow-xl shadow-[#0E0E12]/15 active:bg-[#E03078] hover:-translate-y-0.5 transition-all duration-200"
          >
            無料相談
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
          </a>
          <a
            href="#service"
            className="group inline-flex items-center justify-center gap-2 bg-white text-[#0E0E12] font-bold text-lg md:text-xl px-8 py-5 md:py-6 rounded-full shadow-xl shadow-[#0E0E12]/10 hover:-translate-y-0.5 transition-all duration-200"
          >
            サービスを見る
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
