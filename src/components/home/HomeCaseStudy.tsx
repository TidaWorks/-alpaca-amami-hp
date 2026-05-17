"use client";

import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Section 8: Case Study (SmartHR top-case-study)
 * 3列カードグリッド＋業種別チップ。
 */
const cases = [
  {
    name: "観光ブランドサイト デモ",
    image: "/images/web-kairos/hero.webp",
    copy: "奄美の観光ブランドをイメージしたデモサイト。回遊導線を意識した構成例。",
    industry: "観光・ツーリズム",
    href: "/web",
  },
  {
    name: "Bistro ADAN",
    image: "/images/demo-screenshots/restaurant.png",
    copy: "島食材ビストロのHP・予約導線をシンプルに整理。",
    industry: "飲食",
    href: "/demo/restaurant",
  },
  {
    name: "Hair Salon kukuru",
    image: "/images/demo-screenshots/salon.png",
    copy: "美容室の世界観をデザインで表現、予約までの導線を短く。",
    industry: "美容室",
    href: "/demo/salon",
  },
];

const industries = [
  "飲食",
  "宿泊",
  "美容室",
  "観光・ツーリズム",
  "小売",
  "介護",
  "建設",
  "工務店",
  "農業",
];

export default function HomeCaseStudy() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section
      ref={ref}
      id="works"
      className="relative py-20 md:py-28 px-6 bg-white"
      aria-label="導入事例"
    >
      <div className="max-w-[1184px] mx-auto">
        <div className="flex items-end justify-between mb-10 md:mb-12 flex-wrap gap-4">
          <h2
            className="font-bold text-[#23221F] transition-all duration-700"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              lineHeight: 1.4,
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(16px)",
            }}
          >
            導入事例
          </h2>
          <a
            href="/web"
            className="inline-flex items-center gap-2 font-bold text-sm hover:underline"
            style={{ color: "#0B8C6E" }}
          >
            事例一覧
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {cases.map((c, i) => (
            <a
              key={c.name}
              href={c.href}
              className="group bg-white border border-[#DADADA]/70 rounded-2xl overflow-hidden hover:border-[#12C998] transition-all duration-300"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className="aspect-[260/146] overflow-hidden bg-[#F2FBF7]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base md:text-lg font-bold text-[#23221F] mb-2">
                  {c.name}
                </h3>
                <p className="text-sm text-[#4C4C4C] leading-[1.7] mb-3">
                  {c.copy}
                </p>
                <p className="text-xs text-[#4C4C4C]">業種：{c.industry}</p>
              </div>
            </a>
          ))}
        </div>

        {/* 業種別チップ */}
        <div className="border-t border-[#DADADA]/60 pt-8">
          <p className="text-sm font-bold text-[#23221F] mb-4">業種別で探す</p>
          <ul className="flex flex-wrap gap-2">
            {industries.map((ind) => (
              <li key={ind}>
                <a
                  href="/web"
                  className="inline-block text-sm px-4 py-2 rounded-full border border-[#DADADA] text-[#23221F] hover:border-[#12C998] hover:text-[#0B8C6E] transition-colors"
                >
                  {ind}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
