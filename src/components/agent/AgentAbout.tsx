"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Wrench, FileText, Sparkles } from "lucide-react";

const PILLARS = [
  { Icon: MessageCircle, label: "相談", desc: "LINEで日々の困りごと" },
  { Icon: Wrench, label: "実装", desc: "月5時間以内の軽実装" },
  { Icon: FileText, label: "レポート", desc: "AI最新情報を月1配信" },
  { Icon: Sparkles, label: "特典", desc: "大型案件は割引価格で" },
];

export default function AgentAbout() {
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
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        {/* セクション見出し */}
        <div className="text-center mb-14 md:mb-16">
          <p
            className={`inline-block text-[10px] tracking-[0.4em] text-[#12C998] font-bold mb-6 ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.05s" }}
          >
            ABOUT — アルパカスマートとは
          </p>
          <h2
            className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-7 ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.15s" }}
          >
            会社の<span className="text-[#12C998]">AI担当者</span>として、
            <br className="hidden md:block" />
            まるっと伴走します。
          </h2>
          <p
            className={`text-[#5A6280] text-base md:text-lg leading-loose max-w-2xl mx-auto ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.3s" }}
          >
            「相談」「実装」「レポート」「特典」の4本柱で、
            <br className="hidden md:block" />
            奄美の小規模事業者さんのAI活用を月¥50,000で支えます。
          </p>
        </div>

        {/* 中央：Aboutビジュアル（PC/SP切替） */}
        <div className={`mb-12 md:mb-16 bg-[#FAFAFA] border border-[#E5E9F5] rounded-3xl overflow-hidden ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.35s" }}>
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/agent-v3/10-about-sp.png" />
            <img
              src="/images/agent-v3/05-about-pc.png"
              alt="アルパカスマートの4つの柱"
              className="w-full h-auto"
              width={1920}
              height={1080}
            />
          </picture>
        </div>

        {/* 4本柱バッジ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-4xl mx-auto">
          {PILLARS.map(({ Icon, label, desc }, i) => (
            <div
              key={label}
              className={`group bg-white border border-[#E5E9F5] rounded-2xl p-6 md:p-7 text-center hover:border-[#12C998]/50 hover:-translate-y-1 transition-all duration-300 ${revealed ? "fade-in" : "pre"}`}
              style={{ animationDelay: `${0.5 + i * 0.08}s` }}
            >
              <span className="inline-flex w-12 h-12 rounded-xl bg-[#E8F9F3] items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#12C998]" strokeWidth={2} aria-hidden="true" />
              </span>
              <p className="font-bold text-[#1D2A6E] text-base md:text-lg mb-1">
                {label}
              </p>
              <p className="text-[#5A6280] text-[12px] font-bold leading-snug">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pre { opacity: 0; transform: translateY(28px); }
        @keyframes show-up { 0% { opacity: 0; transform: translateY(28px); } 100% { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: show-up 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .fade-in { animation: none !important; }
          .pre { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
