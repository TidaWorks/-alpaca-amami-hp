"use client";

import {
  MessageCircle,
  Search,
  PencilRuler,
  Package,
  Headphones,
} from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Section 12: Support Flow (SmartHR site-flow-root)
 * 段階フロー図：相談→ヒアリング→設計→納品→保守
 */
const steps = [
  { icon: MessageCircle, num: "01", title: "相談", body: "LINE / メール / 電話で気軽にご相談ください。" },
  { icon: Search, num: "02", title: "ヒアリング", body: "業種・現状の課題・希望を整理。島内なら対面、島外はオンラインで。" },
  { icon: PencilRuler, num: "03", title: "設計", body: "最適なサービスを選定し、デザイン・仕様を作成。" },
  { icon: Package, num: "04", title: "納品", body: "制作・確認を経て本番公開。マニュアルもご用意します。" },
  { icon: Headphones, num: "05", title: "保守", body: "月額サポートで改善・運用・サーバー管理まで一緒に。" },
];

export default function HomeSupportFlow() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section
      ref={ref}
      id="flow"
      className="relative pt-20 md:pt-28 pb-8 md:pb-12 px-6"
      style={{ background: "#F8F8F8" }}
      aria-label="充実したサポート"
    >
      <div className="max-w-[1184px] mx-auto">
        <h2
          className="text-center font-bold text-[#23221F] mb-4 transition-all duration-700"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            lineHeight: 1.4,
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
          }}
        >
          充実したサポート
        </h2>
        <p className="text-center text-base text-[#4C4C4C] leading-[1.8] max-w-2xl mx-auto mb-12 md:mb-16">
          「相談」から「納品後の運用」まで、ALPACAが一貫してサポートします。
        </p>

        {/* フロー図 */}
        <div className="relative">
          {/* PCで横線 */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-7 left-[10%] right-[10%] h-[2px]"
            style={{ background: "#12C998", opacity: 0.3 }}
          />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="flex md:flex-col items-start md:items-center gap-4 md:gap-0 text-left md:text-center transition-all duration-700"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div
                  className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-full text-white relative z-10 md:mb-4"
                  style={{ background: "#0B8C6E" }}
                >
                  <s.icon className="w-7 h-7" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p
                    className="text-xs font-bold tabular-nums mb-1"
                    style={{ color: "#0B8C6E", letterSpacing: "0.15em" }}
                  >
                    STEP {s.num}
                  </p>
                  <h3 className="text-base md:text-lg font-bold text-[#23221F] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#4C4C4C] leading-[1.7]">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
