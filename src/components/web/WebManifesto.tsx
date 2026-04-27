"use client";

import { useEffect, useRef, useState } from "react";
import { MemphisBlob, MemphisDots, MemphisRing, MemphisSquiggle, MemphisWave } from "./MemphisDecorations";

export default function WebManifesto() {
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
      id="works"
      ref={ref}
      className="relative overflow-hidden bg-[#111111] border-y-2 border-[#111111]"
    >
      {/* 大きな斑点ドット背景 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(#FFFFFF 1.4px, transparent 1.8px), radial-gradient(#FFFFFF 1px, transparent 1.4px)",
          backgroundSize: "32px 32px, 22px 22px",
          backgroundPosition: "0 0, 16px 16px",
        }}
      />

      {/* Memphis装飾（ダーク背景にカラフル） */}
      <MemphisBlob color="#FF2DA0" className="absolute -top-12 -left-12 w-40 md:w-56 rotate-12 pointer-events-none" />
      <MemphisBlob color="#FFD600" className="absolute -bottom-12 -right-12 w-44 md:w-60 -rotate-12 pointer-events-none" />
      <MemphisRing color="#00E0D1" className="absolute top-20 right-20 w-20 md:w-28 pointer-events-none hidden md:block" />
      <MemphisSquiggle color="#FFD600" className="absolute bottom-24 left-12 w-32 md:w-40 pointer-events-none hidden md:block" />
      <MemphisWave color="#FF2DA0" className="absolute top-32 left-1/2 -translate-x-1/2 w-40 md:w-56 pointer-events-none" />
      <MemphisDots color="#FFFFFF" className="absolute top-24 left-1/4 w-20 md:w-28 opacity-50 pointer-events-none" />

      {/* カラーストライプ帯 */}
      <div
        className="absolute top-0 left-0 right-0 h-[6px] pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(90deg, #FF2DA0 0 24px, #FFD600 24px 48px, #00E0D1 48px 72px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[6px] pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(90deg, #00E0D1 0 24px, #FFD600 24px 48px, #FF2DA0 48px 72px)",
        }}
      />

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
              <span className="bg-[#FFD600] text-[#111111] font-black text-[11px] tracking-widest px-2.5 py-1 border-2 border-[#FFD600]">
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
                <span className="relative z-10 text-[#111111]">ホームページ</span>
                <span
                  className="absolute inset-x-0 bottom-1 h-[80%] bg-[#FFD600] -z-0"
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
              <span className="text-[#FFD600] font-bold">必要な機能だけ</span>
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
              { num: "9", unit: "業種", label: "デモサイトを公開中", color: "#FF2DA0" },
              { num: "2", unit: "週間〜", label: "最短 LP 納品", color: "#FFD600" },
              { num: "対面", unit: "OK", label: "奄美島内で打合せ可能", color: "#00E0D1" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white border-2 border-[#111111] p-5 shadow-[5px_5px_0_0_rgba(255,255,255,0.5)]"
                style={{ borderColor: item.color }}
              >
                <p className="flex items-baseline gap-1.5">
                  <span className="font-memphis-mincho text-4xl md:text-5xl font-extrabold text-[#111111]">
                    {item.num}
                  </span>
                  <span className="text-base md:text-lg font-black text-[#111111]">
                    {item.unit}
                  </span>
                </p>
                <p className="text-[#111111]/70 text-xs md:text-sm mt-1.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
