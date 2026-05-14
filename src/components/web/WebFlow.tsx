"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "相談・ヒアリング",
    badge: "無料",
    color: "#FFE900",
    textOnBg: "#000000",
    description: "お店のこだわりや想いを聞かせてください。島内なら直接お伺いします。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "制作・確認",
    badge: "約2〜4週間",
    color: "#EC6C00",
    textOnBg: "#FFFFFF",
    description: "デザイン提案→制作→実機確認。気になる点はすべて修正します。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "公開・サポート",
    badge: "ずっと安心",
    color: "#004097",
    textOnBg: "#FFFFFF",
    description: "いよいよ公開。使い方もしっかりお教えします。保守サポートもスタート。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function WebFlow() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = timelineRef.current;
    if (!node) return;

    if (typeof window !== "undefined" && window.matchMedia) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="flow"
      className="relative bg-[#F8F8F8] py-32 md:py-40 px-6 md:px-10 scroll-mt-20 overflow-hidden"
    >
      {/* ゴースト英字 */}
      <p
        className="absolute top-16 right-6 md:right-16 text-black/[0.04] text-[6rem] md:text-[14rem] leading-none pointer-events-none select-none"
        style={{ fontWeight: 400 }}
        aria-hidden="true"
      >
        Flow
      </p>

      <div className="relative max-w-[1400px] mx-auto">
        {/* 章扉 */}
        <div
          className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-16 mb-20 md:mb-28 items-end transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div>
            <h2
              className="text-black text-[4rem] md:text-[8rem] lg:text-[10rem] leading-[0.95] tracking-[-0.02em]"
              style={{ fontWeight: 400 }}
            >
              Flow
            </h2>
            <p className="text-sm tracking-[0.3em] text-black/70 mt-4">制作の流れ</p>
          </div>
          <div>
            <h3 className="text-black text-2xl md:text-4xl leading-[1.3] tracking-[-0.01em]" style={{ fontWeight: 500 }}>
              ホームページができるまで。
            </h3>
          </div>
        </div>

        {/* 縦タイムライン */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* 縦線（背景） */}
          <div
            className="absolute left-[36px] md:left-[60px] top-0 bottom-0 w-px bg-black/15"
            aria-hidden="true"
          />
          {/* 動く縦線（黄色、ツーッと引かれる） */}
          <div
            className="absolute left-[36px] md:left-[60px] top-0 w-[3px] bg-[#FFE900] origin-top"
            style={{
              height: "100%",
              transform: visible ? "scaleY(1)" : "scaleY(0)",
              transition: "transform 1.2s cubic-bezier(0.65, 0, 0.35, 1) 0.2s",
            }}
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              // 円が膨らむタイミング：縦線がそのstepに到達した瞬間
              // 縦線drawing: 200ms delay + 1200ms duration = 1400ms total
              // step circle expand: 400 + i*200 ms
              const circleDelay = 400 + i * 200;
              const iconDelay = circleDelay + 250;
              const textDelay = circleDelay + 150;
              const pulseColor = step.color;
              return (
                <div
                  key={step.number}
                  className="relative grid grid-cols-[72px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-10 items-start"
                >
                  {/* 番号アイコン円（左カラム） */}
                  <div className="relative">
                    <div
                      className="flow-circle w-[72px] h-[72px] md:w-[120px] md:h-[120px] rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
                      style={{
                        background: step.color,
                        color: step.textOnBg,
                        transformOrigin: "center",
                        transform: visible ? "scale(1)" : "scale(0)",
                        opacity: visible ? 1 : 0,
                        transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${circleDelay}ms, opacity 0.4s ease ${circleDelay}ms`,
                        // @ts-expect-error - CSS custom property
                        "--pulse-color": pulseColor,
                        animationDelay: `${circleDelay + 700}ms`,
                      }}
                    >
                      <div
                        style={{
                          transformOrigin: "center",
                          transform: visible ? "scale(1)" : "scale(0)",
                          opacity: visible ? 1 : 0,
                          transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${iconDelay}ms, opacity 0.3s ease ${iconDelay}ms`,
                        }}
                      >
                        {step.icon}
                      </div>
                    </div>
                    <span
                      className="absolute -top-2 -right-2 text-xs tracking-[0.2em] bg-black text-white rounded-full px-2.5 py-1"
                      style={{
                        fontWeight: 500,
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(-8px)",
                        transition: `opacity 0.4s ease ${iconDelay + 100}ms, transform 0.4s ease ${iconDelay + 100}ms`,
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* 本文 */}
                  <div
                    className="pt-2 md:pt-4"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(-24px)",
                      transition: `opacity 0.6s ease ${textDelay}ms, transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) ${textDelay}ms`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <h3 className="text-black text-xl md:text-3xl" style={{ fontWeight: 500 }}>
                        {step.title}
                      </h3>
                      <span
                        className="text-[10px] tracking-[0.2em] rounded-full px-3 py-1"
                        style={{ background: "#000000", color: "#FFFFFF", fontWeight: 500 }}
                      >
                        {step.badge}
                      </span>
                    </div>
                    <p className="text-black/75 text-sm md:text-base leading-loose tracking-wide max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flow-breathe {
          0%, 100% { box-shadow: 0 0 0 0 var(--pulse-color, transparent); }
          50% { box-shadow: 0 0 0 18px transparent; }
        }
        .flow-circle {
          animation: flow-breathe 2.4s ease-in-out infinite;
          animation-delay: var(--pulse-delay, 1500ms);
        }
        @media (prefers-reduced-motion: reduce) {
          .flow-circle { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
