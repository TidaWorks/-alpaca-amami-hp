"use client";

import { useEffect, useRef, useState } from "react";
import { Zen_Maru_Gothic } from "next/font/google";

const zenMaru = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

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
      ref={ref}
      className="relative overflow-hidden bg-[#0A0A0A]"
    >
      {/* 大きなドットパターン */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, #FFFFFF 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ネオングロー */}
      <div
        className="absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
        style={{ background: "rgba(0,255,133,0.22)" }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
        style={{ background: "rgba(255,46,136,0.22)" }}
      />

      {/* 斜めストライプ背景帯 */}
      <div
        className="absolute top-0 right-0 w-full h-[5px] pointer-events-none"
        style={{ background: "repeating-linear-gradient(90deg, #FF2E88 0 20px, #FFE500 20px 40px, #00FF85 40px 60px)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-[5px] pointer-events-none"
        style={{ background: "repeating-linear-gradient(90deg, #00FF85 0 20px, #FFE500 20px 40px, #FF2E88 40px 60px)" }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-14 items-center">
          {/* 左: メッセージ */}
          <div>
            <div
              className="inline-flex items-center gap-2 mb-5 bg-white text-black text-[10px] font-black tracking-[0.3em] px-3 py-1.5 rounded-sm rotate-[-2deg] shadow-[0_0_24px_rgba(255,255,255,0.3)] transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) rotate(-2deg)" : "translateY(12px) rotate(-2deg)",
              }}
            >
              <span>◉</span>
              <span>ABOUT / ALPACA</span>
            </div>
            <h2
              className={`text-white text-[1.9rem] md:text-[2.8rem] lg:text-[3.2rem] leading-[1.25] font-black mb-8 tracking-tight ${zenMaru.className} transition-all duration-700`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "80ms",
              }}
            >
              奄美大島を拠点に、
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-black">ホームページ</span>
                <span className="absolute inset-x-0 bottom-1 h-full bg-[#00FF85] -z-0 rotate-[-1deg]" style={{ boxShadow: "0 0 32px rgba(0,255,133,0.6)" }} />
              </span>
              <br />
              を作っています。
            </h2>
            <p
              className="text-white/75 text-[0.95rem] md:text-base leading-[2] max-w-xl transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "200ms",
              }}
            >
              業種やお店の規模に合わせて、<span className="text-[#FFE500] font-bold">必要な機能だけ</span>を揃えたサイトを作ります。
              島内なら直接伺えるので、イメージを詰めるところから一緒に動けます。
            </p>
          </div>

          {/* 右: 実績数字 */}
          <div
            className="grid grid-cols-2 md:grid-cols-1 gap-6 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "350ms",
            }}
          >
            {[
              { num: "9", unit: "業種", label: "デモサイトを公開中", color: "#FF2E88" },
              { num: "2", unit: "週間〜", label: "最短 LP 納品", color: "#FFE500" },
              { num: "対面", unit: "OK", label: "奄美島内で打合せ可能", color: "#00FF85" },
            ].map((item) => (
              <div
                key={item.label}
                className="border-l-[3px] pl-5 py-2"
                style={{ borderColor: item.color, boxShadow: `inset 3px 0 12px ${item.color}33` }}
              >
                <p className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl md:text-5xl font-black text-white font-display ${zenMaru.className}`}
                    style={{ textShadow: `0 0 20px ${item.color}88` }}
                  >
                    {item.num}
                  </span>
                  <span className="text-base md:text-lg font-black" style={{ color: item.color }}>
                    {item.unit}
                  </span>
                </p>
                <p className="text-white/60 text-xs md:text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
