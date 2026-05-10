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
        <div>
          <div
            className="inline-flex items-center gap-3 mb-5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full pl-3 pr-4 py-1.5 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <p className="text-[11px] font-bold tracking-[0.4em] text-[#FF6B35]">
              CHAPTER 05
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
      </div>
    </section>
  );
}
