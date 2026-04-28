"use client";

import { useEffect, useRef, useState } from "react";

export default function SystemManifesto() {
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
      {/* グリッド背景 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ブルーパープルグロー */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full pointer-events-none blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, #635BFF 0%, transparent 70%)",
          animation: "sysManifestoDrift 18s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-[360px] h-[360px] rounded-full pointer-events-none blur-3xl opacity-25"
        style={{
          background: "radial-gradient(circle, #FFC400 0%, transparent 70%)",
          animation: "sysManifestoDrift 22s ease-in-out infinite reverse",
        }}
      />
      <style>{`
        @keyframes sysManifestoDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -15px) scale(1.05); }
        }
      `}</style>

      <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-14 items-center">
          {/* 左: メッセージ */}
          <div>
            <div
              className="inline-flex items-center gap-2 mb-5 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
              }}
            >
              <span className="bg-[#FFC400] text-[#1A202C] font-black text-[11px] tracking-widest px-2.5 py-1 rounded">
                06
              </span>
              <span className="text-[11px] font-bold tracking-[0.3em] text-white">ABOUT / ALPACA</span>
            </div>
            <h2
              className="text-white text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] leading-tight font-extrabold mb-7 tracking-tight transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "80ms",
              }}
            >
              島の事業に、
              <br />
              <span className="text-[#FFC400]">大きな変化</span>
              を。
            </h2>
            <p
              className="text-white/80 text-[0.95rem] md:text-base leading-[2] max-w-xl transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "200ms",
              }}
            >
              ALPACAは、奄美大島を拠点にする開発スタジオです。
              <br />
              島の事業者さまの業務を、デザインとデータで整えます。
              <br />
              対面で話せる距離だからこそ、現場に合わせたシステムが作れます。
            </p>
          </div>

          {/* 右: 数値 */}
          <div
            className="grid grid-cols-2 md:grid-cols-1 gap-4 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "350ms",
            }}
          >
            {[
              { num: "2", unit: "週間〜", label: "プロトタイプ最短納期", color: "#635BFF" },
              { num: "24", unit: "h", label: "問い合わせ初回返信", color: "#FFC400" },
              { num: "対面", unit: "OK", label: "奄美島内で打合せ可", color: "#0EA5E9" },
            ].map((item, i) => (
              <div
                key={item.label}
                className="group bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-white/20 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:bg-white transition-all duration-300 cursor-default"
                style={{
                  animation: `sysManifestoCardFloat ${4 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
                }}
              >
                <p className="flex items-baseline gap-1.5">
                  <span
                    className="text-4xl md:text-5xl font-extrabold tabular-nums group-hover:scale-110 transition-transform duration-300 origin-left inline-block"
                    style={{ color: item.color }}
                  >
                    {item.num}
                  </span>
                  <span className="text-base md:text-lg font-black text-[#1A202C]">
                    {item.unit}
                  </span>
                </p>
                <p className="text-[#1A202C]/70 text-xs md:text-sm mt-1.5">{item.label}</p>
              </div>
            ))}
            <style>{`
              @keyframes sysManifestoCardFloat {
                0%, 100% { translate: 0 0; }
                50% { translate: 0 -3px; }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
