"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "ヒアリング",
    badge: "無料",
    color: "#1D2A6E",
    description: "業種・現状の課題・希望をお聞きします。島内なら直接お伺い、島外はオンラインで。",
  },
  {
    number: "02",
    title: "ご提案・お見積り",
    badge: "無料",
    color: "#12C998",
    description: "Web制作 or システム開発 or ランディングページ制作 のどれが最適か、機能を絞ってご提案します。",
  },
  {
    number: "03",
    title: "制作・確認",
    badge: "1〜4週間",
    color: "#FFC400",
    description: "デザイン→実装→確認の流れで進行。気になる点はその都度修正します。",
  },
  {
    number: "04",
    title: "公開・運用サポート",
    badge: "ずっと伴走",
    color: "#0EA5E9",
    description: "納品して終わりじゃない。月額保守で改善・サーバー管理まで一緒に。",
  },
];

export default function HomeFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="flow"
      className="relative bg-white py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden border-t border-[#E5E7EB]"
    >
      <div className="relative max-w-5xl mx-auto">
        <div
          className="mb-14 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A]">
              CHAPTER 04
            </p>
            <span className="w-8 h-[1px] bg-[#1D3A8A]/30" />
            <p className="text-[11px] font-bold tracking-[0.3em] text-[#0A1228]/60">
              FLOW
            </p>
          </div>
          <h2 className="text-[#1A202C] text-3xl md:text-5xl font-extrabold leading-tight">
            プロジェクトの
            <br className="md:hidden" />
            <span className="text-[#1D2A6E]">進め方</span>
            。
          </h2>
        </div>

        <div
          className="mb-10 md:mb-14 rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-md transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "120ms",
          }}
        >
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/home-v3/10-flow-sp.png" />
            <img
              src="/images/home-v3/09-flow-pc.png"
              alt="ALPACAの制作フロー4ステップを表現するドキュメンタリー写真（打ち合わせ・設計・制作・納品）"
              className="w-full h-auto"
              width={1920}
              height={1080}
              loading="lazy"
            />
          </picture>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="group relative bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-transparent overflow-hidden"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.7s ease ${150 + i * 100}ms, transform 0.5s ease ${150 + i * 100}ms, box-shadow 0.4s ease, border-color 0.3s ease, translate 0.3s ease`,
              }}
            >
              {/* 背景の薄いカラーブロブ */}
              <span
                aria-hidden="true"
                className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-25 blur-2xl transition-opacity duration-500"
                style={{ background: step.color }}
              />

              <span
                className="relative text-5xl md:text-6xl font-extrabold tabular-nums leading-none block mb-3 group-hover:scale-110 transition-transform duration-300 origin-left"
                style={{ color: step.color }}
              >
                {step.number}
              </span>

              <div className="relative flex items-center gap-2 mb-3 flex-wrap">
                <h3 className="text-[#1A202C] text-base font-extrabold">{step.title}</h3>
                <span
                  className="text-[10px] font-black tracking-widest rounded-full px-2 py-0.5 whitespace-nowrap"
                  style={{ background: `${step.color}1A`, color: step.color }}
                >
                  {step.badge}
                </span>
              </div>

              <p className="relative text-[#1A202C]/70 text-sm leading-relaxed">
                {step.description}
              </p>

              <div
                className="h-[3px] w-10 rounded-full mt-5 group-hover:w-16 transition-all duration-500"
                style={{ background: step.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
