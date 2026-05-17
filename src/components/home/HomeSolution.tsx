"use client";

import {
  Megaphone,
  Workflow,
  Bot,
  BarChart3,
  MapPin,
  Globe2,
} from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Section 5: Solution (SmartHR top-solution)
 * 3×2 課題カードグリッド。
 */
export default function HomeSolution() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  const cards = [
    { icon: Megaphone, title: "HP制作で集客強化", body: "デザイン性と動線設計で「見られる→問い合わせ」までを引き上げます。" },
    { icon: Workflow, title: "業務システムで効率化", body: "予約・顧客・売上を一元管理。紙とExcelを卒業して時短を実現。" },
    { icon: Bot, title: "AIで省人化", body: "LINE自動応答・問い合わせ要約など、定型対応をAIに任せる仕組みづくり。" },
    { icon: BarChart3, title: "データ可視化", body: "売上・来店・在庫を見える化。経営判断を勘から数字へ。" },
    { icon: MapPin, title: "島内即対応", body: "奄美大島内なら対面で打合せ・現地ヒアリング。スピードと信頼感が違います。" },
    { icon: Globe2, title: "島外もオンライン対応", body: "県外案件もオンラインで完結。距離を理由に諦めないで大丈夫です。" },
  ];

  return (
    <section
      ref={ref}
      id="solution"
      className="relative py-20 md:py-28 px-6 bg-white"
      aria-label="課題解決"
    >
      <div className="max-w-[1184px] mx-auto">
        <h2
          className="text-center font-bold text-[#23221F] mb-12 md:mb-14 transition-all duration-700"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            lineHeight: 1.4,
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
          }}
        >
          こんな課題を解決するなら、
          <br className="md:hidden" />
          ALPACA。
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cards.map((c, i) => (
            <div
              key={c.title}
              className="bg-white border border-[#DADADA]/70 rounded-2xl p-6 md:p-7 flex items-start gap-4 hover:border-[#12C998] transition-all duration-300"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div
                className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "#F2FBF7", color: "#0B8C6E" }}
              >
                <c.icon className="w-7 h-7" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-[#23221F] mb-2">
                  {c.title}
                </h3>
                <p className="text-sm text-[#4C4C4C] leading-[1.8]">{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#service"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border-2 transition-all duration-150 hover:-translate-y-0.5"
            style={{ borderColor: "#0B8C6E", color: "#0B8C6E", background: "#FFFFFF" }}
          >
            もっとみる
          </a>
        </div>
      </div>
    </section>
  );
}
