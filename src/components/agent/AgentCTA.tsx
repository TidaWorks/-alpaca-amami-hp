"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

export default function AgentCTA() {
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
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#1D2A6E] text-white pt-24 md:pt-32"
    >
      {/* 背景ドット */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(18,201,152,0.18)_0%,rgba(18,201,152,0)_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <div className="relative pb-20 md:pb-24">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 text-center">
          <p
            className={`inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#12C998] font-bold mb-8 border border-[#12C998]/40 bg-[#12C998]/10 rounded-full px-4 py-2 ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.05s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#12C998] animate-pulse" />
            CONTACT — まずはお気軽に
          </p>
          <h2
            className={`text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-10 ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.15s" }}
          >
            まずは無料相談から、
            <br />
            <span className="text-[#12C998]">始めませんか？</span>
          </h2>

          <p
            className={`text-white/75 text-base md:text-lg leading-loose mb-14 max-w-2xl mx-auto ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.3s" }}
          >
            30分のオンラインヒアリングで、
            <br className="hidden md:block" />
            御社にAI顧問が必要かどうかも含めてお話しします。
          </p>

          {/* CTAボタン */}
          <div className={`flex flex-wrap items-center justify-center gap-6 mb-12 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.45s" }}>
            <a
              href={`${SITE.contact.emailHref}?subject=アルパカAI顧問の無料相談予約`}
              className="group inline-flex items-center gap-3 bg-[#12C998] text-white font-bold text-sm md:text-base pl-9 pr-2 py-2 rounded-full hover:bg-[#0DA67D] transition-colors duration-200"
            >
              無料相談を予約
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#12C998] transition-transform duration-300 group-hover:rotate-[-45deg]">
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
              </span>
            </a>
            <a
              href="#pricing"
              className="group inline-flex items-baseline gap-2 text-sm font-bold text-white"
            >
              <span className="relative">
                料金プランを見る
                <span className="absolute left-0 -bottom-[3px] w-full h-[1.5px] bg-white scale-x-100 origin-left transition-transform duration-500 group-hover:scale-x-0" />
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>

          {/* 安心の一言 */}
          <p className={`inline-flex items-center gap-3 border border-white/15 rounded-full px-6 py-3 text-white/75 text-xs md:text-sm font-bold mb-12 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.6s" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#12C998]" />
            営業電話・しつこい勧誘は一切ありません
          </p>

          {/* 連絡先 */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-white/65 text-xs md:text-sm font-bold ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.75s" }}>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12C998]" />
              {SITE.contact.email}
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12C998]" />
              返信は1〜2営業日以内
            </span>
          </div>

          {/* フッター */}
          <footer className="mt-24 pt-10 border-t border-white/10 text-white/45 text-[11px] font-bold tracking-wider flex flex-col items-center gap-3">
            <a href="/privacy" className="text-white/65 hover:text-white transition-colors underline-offset-4 hover:underline">
              プライバシーポリシー
            </a>
            <span>© 2026 ALPACA · 鹿児島県奄美大島 · alpaca-amami.com</span>
          </footer>
        </div>
      </div>

      <style>{`
        .pre { opacity: 0; transform: translateY(24px); }
        @keyframes show-up { 0% { opacity: 0; transform: translateY(24px); } 100% { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: show-up 0.85s cubic-bezier(0.165, 0.84, 0.44, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .fade-in { animation: none !important; }
          .pre { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
