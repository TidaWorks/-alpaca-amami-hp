"use client";

import { useEffect, useRef, useState } from "react";

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
      className="relative bg-gradient-to-br from-[#F5F3FF] via-white to-[#ECFDF5] overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28"
    >
      {/* 装飾 */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, #635BFF 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 w-[360px] h-[360px] rounded-full pointer-events-none blur-3xl opacity-25"
        style={{ background: "radial-gradient(circle, #12C998 0%, transparent 70%)" }}
      />

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
            奄美大島を拠点にする、Web制作とシステム開発の小さなスタジオ。
            <br />
            島の小さなお店の毎日を、なめらかにします。
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <a
              href="#services"
              className="inline-flex items-center gap-2 bg-[#635BFF] text-white font-black text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-lg hover:bg-[#5249E0] transition-all"
            >
              サービスを見る
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center text-sm font-black text-[#1A202C] underline decoration-[#12C998] decoration-[2px] underline-offset-[6px] hover:decoration-[#635BFF] transition-colors"
            >
              無料で相談する →
            </a>
          </div>

          {/* 信頼バッジ */}
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {[
              { num: "9", unit: "業種", label: "デモ公開中" },
              { num: "対面", unit: "OK", label: "島内打合せ可" },
              { num: "24", unit: "h", label: "初回返信" },
            ].map((b) => (
              <div key={b.label} className="bg-white/80 backdrop-blur border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-center">
                <p className="flex items-baseline gap-0.5 justify-center">
                  <span className="text-2xl font-extrabold text-[#1A202C] tabular-nums leading-none">{b.num}</span>
                  <span className="text-xs font-black text-[#1A202C]">{b.unit}</span>
                </p>
                <p className="text-[10px] text-[#1A202C]/60 mt-1">{b.label}</p>
              </div>
            ))}
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
          <div className="aspect-[4/5] w-full max-w-md mx-auto rounded-2xl border-2 border-dashed border-[#FFC400] bg-gradient-to-br from-[#FFC400]/10 via-[#635BFF]/5 to-[#12C998]/5 flex flex-col items-center justify-center gap-3 shadow-md">
            <div className="grid grid-cols-2 gap-3 px-6 max-w-xs">
              {[
                { label: "システム", color: "#635BFF", icon: "📊" },
                { label: "Web制作", color: "#12C998", icon: "🌐" },
                { label: "LP制作", color: "#FFC400", icon: "🚀" },
                { label: "保守運用", color: "#0EA5E9", icon: "🛡️" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-3 text-center shadow-sm"
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="text-xs font-black" style={{ color: s.color }}>{s.label}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] font-bold text-[#1A202C]/55 tracking-widest text-center px-4">
              ヒーロー画像差し替え予定
            </p>
            <p className="text-[10px] text-[#1A202C]/40 text-center px-4">
              ※ ALPACAのブランドビジュアルを後日反映
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
