"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

export default function HomeAbout() {
  const ref = useRef<HTMLElement>(null);
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
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-[#1A202C] border-y border-[#1A202C]"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full pointer-events-none blur-3xl opacity-25"
        style={{
          background: "radial-gradient(circle, #635BFF 0%, transparent 70%)",
          animation: "alpacaAboutDrift 20s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 w-[360px] h-[360px] rounded-full pointer-events-none blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, #12C998 0%, transparent 70%)",
          animation: "alpacaAboutDrift 24s ease-in-out infinite reverse",
        }}
      />
      <style>{`
        @keyframes alpacaAboutDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -15px) scale(1.07); }
        }
      `}</style>

      <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-14 items-center">
          <div>
            <div
              className="inline-flex items-center gap-3 mb-5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full pl-3 pr-4 py-1.5 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
              }}
            >
              <p className="text-[11px] font-bold tracking-[0.4em] text-[#FF6B35]">
                CHAPTER 03
              </p>
              <span className="w-6 h-[1px] bg-white/40" />
              <p className="text-[11px] font-bold tracking-[0.3em] text-white">
                ABOUT
              </p>
            </div>
            <h2
              className="text-white text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] leading-tight font-extrabold mb-7 tracking-tight transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "80ms",
              }}
            >
              島の事業を、
              <br />
              <span className="text-[#FFC400]">仕組み</span>
              から支える。
            </h2>
            <div
              className="text-white/80 text-[0.95rem] md:text-base leading-[2] max-w-xl space-y-4 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "200ms",
              }}
            >
              <p>
                ALPACAは、奄美大島・名瀬を拠点にするWeb&システムスタジオです。
              </p>
              <p>
                ホームページ・ランディングページ・業務改善システムまで、まとめてご相談いただけます。
                <br />
                現場を見せていただいてから、必要なものだけを設計するスタイルです。
              </p>
              <p>
                島内なら直接お伺いします。
                <br />
                納品後もずっと一緒に育てる関係を大切にしています。
              </p>
            </div>
          </div>

          {/* 代表/拠点情報 */}
          <div
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-7 border border-white/20 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:bg-white"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 350ms, transform 0.5s ease, box-shadow 0.4s ease, background 0.3s ease, translate 0.3s ease",
            }}
          >
            <p className="text-[10px] font-black tracking-[0.3em] text-[#635BFF] mb-4">PROFILE</p>
            <dl className="space-y-3">
              {[
                { k: "屋号", v: "ALPACA（アルパカ）" },
                { k: "代表", v: "作田 大地" },
                { k: "拠点", v: "鹿児島県奄美大島" },
                { k: "事業", v: "Web制作・システム開発・保守運用" },
                { k: "対応", v: "島内 対面 / 全国 オンライン" },
              ].map((item) => (
                <div key={item.k} className="flex items-baseline gap-3 border-b border-dashed border-[#E5E7EB] pb-2 last:border-0">
                  <dt className="text-[10px] font-black tracking-widest text-[#1A202C]/55 w-12 flex-shrink-0">
                    {item.k}
                  </dt>
                  <dd className="text-sm font-bold text-[#1A202C] flex-1">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href={SITE.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 text-xs font-black text-[#635BFF] hover:text-[#5249E0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#635BFF] focus-visible:ring-offset-2 rounded-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-[-8deg] transition-transform duration-300">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              {SITE.contact.instagramHandle} → Instagramもチェック
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
