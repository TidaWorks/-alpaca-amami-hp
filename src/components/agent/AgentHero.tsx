"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

function NumberTicker({ to, suffix = "", prefix = "", duration = 1200, start = false }: { to: number; suffix?: string; prefix?: string; duration?: number; start?: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let rafId: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const progress = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(to * eased));
      if (progress < 1) rafId = requestAnimationFrame(tick);
      else setValue(to);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [to, duration, start]);
  return (
    <span className="tabular-nums">
      {prefix}
      {value.toLocaleString("ja-JP")}
      {suffix}
    </span>
  );
}

export default function AgentHero() {
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
    if (rect.top < window.innerHeight * 0.9) {
      setRevealed(true);
      io.disconnect();
    }
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="concept"
      ref={sectionRef}
      className="relative overflow-hidden bg-white pb-16 md:pb-24"
    >
      {/* 背景：ドットパターン */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_22%,rgba(18,201,152,0.10)_0%,rgba(18,201,152,0)_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(29,42,110,0.10) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse 60% 70% at 50% 30%, black 30%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 70% at 50% 30%, black 30%, transparent 70%)",
          }}
        />
      </div>

      {/* 上部：ヘッドライン + Heroビジュアル */}
      <div className="relative pt-28 md:pt-36">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-center">
          {/* 左：ヘッドライン */}
          <div>
            <p
              className={`inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[#12C998] font-bold mb-7 border border-[#12C998]/30 bg-[#E8F9F3] rounded-full px-4 py-2 ${revealed ? "fade-in-x" : "pre-x"}`}
              style={{ animationDelay: "0.05s" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#12C998] animate-pulse" />
              ALPACA × AI ADVISOR · AMAMI
            </p>

            <h1
              className={`text-[#1D2A6E] text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] font-bold tracking-tight mb-8 md:mb-10 ${revealed ? "fade-in-x" : "pre-x"}`}
              style={{ animationDelay: "0.15s" }}
            >
              奄美のあなたの会社に
              <br />
              <span className="text-[#12C998]">AI担当者</span>を、
              <br />
              月¥50,000で。
            </h1>

            <p
              className={`text-[#5A6280] text-base md:text-lg leading-loose mb-10 max-w-xl ${revealed ? "fade-in-x" : "pre-x"}`}
              style={{ animationDelay: "0.3s" }}
            >
              AIをどう使えばいいか分からない。
              <br className="hidden md:block" />
              そんな事業者さんへ、LINEで気軽に相談できる
              <br className="hidden md:block" />
              顧問契約をご用意しました。
            </p>

            <div
              className={`flex flex-wrap items-center gap-5 ${revealed ? "fade-in-x" : "pre-x"}`}
              style={{ animationDelay: "0.45s" }}
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-[#12C998] text-white font-bold text-sm pl-7 pr-2 py-2 rounded-full hover:bg-[#0DA67D] transition-colors duration-200"
              >
                無料で相談する
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#12C998] transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                </span>
              </a>
              <a
                href="#features"
                className="group inline-flex items-baseline gap-2 text-sm font-bold text-[#1D2A6E]"
              >
                <span className="relative">
                  できることを見る
                  <span className="absolute left-0 -bottom-[3px] w-full h-[1.5px] bg-[#1D2A6E] scale-x-100 origin-left transition-transform duration-500 group-hover:scale-x-0" />
                </span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* 右：Heroビジュアル画像（PC/SP切替） */}
          <div className={`relative ${revealed ? "fade-in-up" : "pre-up"}`} style={{ animationDelay: "0.4s" }}>
            <picture>
              <source media="(max-width: 767px)" srcSet="/images/agent-v3/06-hero-sp.png" />
              <img
                src="/images/agent-v3/01-hero-pc.png"
                alt="奄美の事業者がLINEでアルパカAI顧問に相談するイメージ"
                className="w-full h-auto rounded-2xl"
                width={1920}
                height={1080}
              />
            </picture>
          </div>
        </div>
      </div>

      {/* 信頼ポイント帯 — Number Ticker付き */}
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 mt-12 md:mt-16">
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.6s" }}>
          <div className="bg-white border border-[#E5E9F5] rounded-2xl p-6 hover:border-[#12C998]/40 transition-colors duration-300">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#5A6280] mb-3">RESPONSE</p>
            <p className="text-3xl md:text-4xl font-bold text-[#1D2A6E] leading-none mb-2">
              <NumberTicker to={24} start={revealed} />
              <span className="text-base ml-1">時間以内</span>
            </p>
            <p className="text-[12px] text-[#5A6280] font-bold">営業日24時間以内に返信</p>
          </div>
          <div className="bg-white border border-[#E5E9F5] rounded-2xl p-6 hover:border-[#12C998]/40 transition-colors duration-300">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#5A6280] mb-3">IMPLEMENT</p>
            <p className="text-3xl md:text-4xl font-bold text-[#1D2A6E] leading-none mb-2">
              月<NumberTicker to={5} start={revealed} />
              <span className="text-base ml-1">時間まで</span>
            </p>
            <p className="text-[12px] text-[#5A6280] font-bold">追加見積もりなしの軽実装枠</p>
          </div>
          <div className="bg-white border border-[#E5E9F5] rounded-2xl p-6 hover:border-[#12C998]/40 transition-colors duration-300">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#5A6280] mb-3">CONTRACT</p>
            <p className="text-3xl md:text-4xl font-bold text-[#1D2A6E] leading-none mb-2">
              最低<NumberTicker to={3} start={revealed} />
              <span className="text-base ml-1">ヶ月から</span>
            </p>
            <p className="text-[12px] text-[#5A6280] font-bold">4ヶ月目以降は月単位で解約OK</p>
          </div>
        </div>
      </div>

      {/* Trust画像帯 — Powered by */}
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 mt-16 md:mt-20">
        <p className={`text-[10px] font-bold tracking-[0.4em] text-[#5A6280] mb-5 ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.75s" }}>
          POWERED BY
        </p>
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/agent-v3/09-trust-sp.png" />
          <img
            src="/images/agent-v3/04-trust-pc.png"
            alt="アルパカAI顧問が活用する主要AIサービス"
            className={`w-full h-auto rounded-xl ${revealed ? "fade-in-x" : "pre-x"}`}
            style={{ animationDelay: "0.85s" }}
            width={1920}
            height={1080}
          />
        </picture>
      </div>

      <style>{`
        .pre-x { opacity: 0; transform: translate(0, 24px); }
        .pre-up { opacity: 0; transform: translateY(40px); }
        @keyframes fade-show-x { 0% { opacity: 0; transform: translate(0, 24px); } 100% { opacity: 1; transform: translate(0, 0); } }
        @keyframes fade-show-up { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        .fade-in-x { animation: fade-show-x 0.85s cubic-bezier(0.165, 0.84, 0.44, 1) both; }
        .fade-in-up { animation: fade-show-up 1s cubic-bezier(0.165, 0.84, 0.44, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .fade-in-x, .fade-in-up { animation: none !important; }
          .pre-x, .pre-up { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
