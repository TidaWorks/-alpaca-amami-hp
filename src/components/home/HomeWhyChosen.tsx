"use client";

import { ArrowRight, Cpu } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Section 7: Why Chosen
 * 「AI×自社開発で都市部の半額」一本柱。
 */
export default function HomeWhyChosen() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 px-6"
      style={{ background: "#F2FBF7" }}
      aria-label="ALPACAが選ばれる理由"
    >
      <div className="max-w-[1184px] mx-auto">
        <h2
          className="text-center font-bold text-[#23221F] mb-12 md:mb-16 transition-all duration-700"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            lineHeight: 1.4,
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
          }}
        >
          ALPACAが選ばれる理由
        </h2>

        <div
          className="max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden border border-[#DADADA]/40 transition-all duration-700"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="aspect-[680/364] p-5">
            <div className="w-full h-full rounded-xl overflow-hidden relative bg-white border border-[#DADADA]/60">
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] text-[#4C4C4C] line-through tabular-nums">¥600,000</span>
                  <span className="text-2xl font-extrabold tabular-nums" style={{ color: "#0B8C6E" }}>¥300,000</span>
                </div>
                <p className="text-[10px] text-[#4C4C4C] mt-1">業務システム開発（参考）</p>
                <div className="flex-1 mt-3 rounded-lg flex items-end gap-2 p-3" style={{ background: "#F2FBF7" }}>
                  <div className="flex-1 rounded-t bg-[#DADADA]" style={{ height: "100%" }} />
                  <div className="flex-1 rounded-t" style={{ background: "#0B8C6E", height: "50%" }} />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[9px] text-[#4C4C4C]">都市部相場</span>
                  <span className="text-[9px] font-bold" style={{ color: "#0B8C6E" }}>ALPACA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <Cpu className="w-5 h-5" style={{ color: "#0B8C6E" }} strokeWidth={2} />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#23221F] mb-3">
              AI × 自社開発で都市部の半額
            </h3>
            <p className="text-sm md:text-base text-[#4C4C4C] leading-[1.8] mb-5">
              AIを開発工程に標準装備。設計・実装・テストを高速化し、東京の制作会社の半額レンジで提供可能。
            </p>
            <a
              href="#service"
              className="inline-flex items-center gap-2 font-bold text-sm hover:underline"
              style={{ color: "#0B8C6E" }}
            >
              料金体系を見る
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
