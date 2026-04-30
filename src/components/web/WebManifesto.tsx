"use client";

import { useReveal } from "@/hooks/useReveal";

export default function WebManifesto() {
  const [ref, visible] = useReveal<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      id="works"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[#1A1B3F] via-[#2B2854] to-[#1F1638]"
    >
      <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-14 items-center">
          {/* 左: メッセージ */}
          <div>
            <div
              className="inline-flex items-center gap-2 mb-6 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
              }}
            >
              <span className="bg-white/15 text-white font-black text-[11px] tracking-widest px-2.5 py-1 border border-white/15 backdrop-blur rounded-full">
                05
              </span>
              <span className="text-[11px] font-bold tracking-[0.3em] text-white">ABOUT / ALPACA</span>
            </div>
            <h2
              className="font-memphis-mincho text-white text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] leading-[1.3] font-extrabold mb-8 tracking-tight transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "80ms",
              }}
            >
              奄美大島を拠点に、
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-white">ホームページ</span>
                <span
                  className="absolute inset-x-0 bottom-1 h-[80%] bg-[#12C998]/55 -z-0 rounded-sm"
                  aria-hidden="true"
                />
              </span>
              <br />
              を作っています。
            </h2>
            <p
              className="font-memphis-mincho text-white/80 text-[0.95rem] md:text-base leading-[2] max-w-xl transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "200ms",
              }}
            >
              業種やお店の規模に合わせて、
              <span className="text-[#12C998] font-bold">必要な機能だけ</span>
              を揃えたサイトを作ります。
              <br />
              島内なら直接伺えるので、イメージを詰めるところから一緒に動けます。
            </p>
          </div>

          {/* 右: 実績数字 */}
          <div
            className="grid grid-cols-2 md:grid-cols-1 gap-5 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "350ms",
            }}
          >
            {[
              { num: "9", unit: "業種", label: "デモサイトを公開中" },
              { num: "2", unit: "週間〜", label: "最短ランディングページ納品" },
              { num: "対面", unit: "OK", label: "奄美島内で打合せ可能" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-[3px] hover:bg-white/15 hover:border-white/25"
              >
                <p className="flex items-baseline gap-1.5">
                  <span className="font-memphis-mincho text-4xl md:text-5xl font-extrabold text-white">
                    {item.num}
                  </span>
                  <span className="text-base md:text-lg font-black text-white">
                    {item.unit}
                  </span>
                </p>
                <p className="text-white/70 text-xs md:text-sm mt-1.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
