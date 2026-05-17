"use client";

import { Clock, Sparkles, Headphones } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Section 4: Number One (SmartHR top-number-one)
 * 横帯フルブリード ペールミント。実績バッジ4個並び。
 */
export default function HomeNumberOne() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  const badges = [
    { icon: Clock, num: "3日", label: "ランディングページ最短納期" },
    { icon: Sparkles, num: "100%", label: "オーダーメイド（テンプレ流用なし）" },
    { icon: Headphones, num: "24h", label: "島内サポート対応" },
  ];

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 px-6"
      style={{ background: "#F2FBF7" }}
      aria-label="ALPACAの3つの強み"
    >
      <div
        className="max-w-[1184px] mx-auto transition-all duration-700"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <h2
          className="font-bold text-[#23221F] mb-8 md:mb-10 text-center md:text-left"
          style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", lineHeight: 1.5 }}
        >
          ALPACAの3つの強み
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {badges.map((b, i) => (
            <div
              key={b.label}
              className="bg-white rounded-2xl p-5 md:p-6 flex flex-col items-center text-center transition-all duration-700"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3"
                style={{ background: "#F2FBF7", color: "#0B8C6E" }}
              >
                <b.icon className="w-6 h-6" strokeWidth={2} />
              </div>
              <p
                className="font-extrabold text-3xl md:text-4xl tabular-nums"
                style={{ color: "#0B8C6E" }}
              >
                {b.num}
              </p>
              <p className="text-xs md:text-sm text-[#23221F] mt-2 font-medium leading-snug">
                {b.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
