"use client";

import { useEffect, useRef, useState } from "react";

const stops = [
  {
    id: "hearing",
    title: "ヒアリング",
    description: "お店のこだわりや想いを聞かせてください。島内なら直接お伺いします。",
    duration: "3〜5日",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="6" y1="1" x2="6" y2="4" strokeLinecap="round" />
        <line x1="10" y1="1" x2="10" y2="4" strokeLinecap="round" />
        <line x1="14" y1="1" x2="14" y2="4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "design",
    title: "デザイン提案",
    description: "いくつかのデザイン案をお見せします。お好みに合うまで何度でも。",
    duration: "5〜7日",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M12 19l7-7 3 3-7 7-3-3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 2l7.586 7.586" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    id: "build",
    title: "制作・開発",
    description: "スマホ対応・SEO設定込みで丁寧に制作します。",
    duration: "7〜14日",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="8 6 2 12 8 18" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="2" x2="12" y2="22" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "review",
    title: "確認・修正",
    description: "実際に触って確認。気になる点はすべて修正します。",
    duration: "3〜5日",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "launch",
    title: "公開・納品",
    description: "いよいよ公開。使い方もしっかりお教えします。",
    duration: "1日",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// Desktop: winding SVG path across 5 stops
// viewBox: 0 0 1000 260
const PATH_D = "M 80,130 C 160,60 240,200 320,130 C 400,60 480,200 560,130 C 640,60 720,200 800,130 C 860,80 920,130 920,130";

// X positions of each stop along the path (approximate parametric positions)
const STOP_POSITIONS = [
  { x: 80, y: 130 },
  { x: 320, y: 130 },
  { x: 560, y: 130 },
  { x: 800, y: 130 },
  { x: 920, y: 130 },
];

// Card Y offset: alternate above/below the path
const CARD_OFFSETS = [-115, 95, -115, 95, -115];

export default function WebFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const measurePathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (measurePathRef.current) {
      setPathLength(measurePathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Start animating when section enters viewport, complete when it's scrolled past
      const start = windowH * 0.8;
      const end = -rect.height * 0.3;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // How many stops have been "reached"
  const stopsVisible = stops.map((_, i) => {
    const threshold = i / (stops.length - 1);
    return progress >= threshold - 0.05;
  });

  const dashOffset = pathLength > 0 ? pathLength * (1 - progress) : pathLength;

  return (
    <section ref={sectionRef} className="relative bg-[#0A0A0A] overflow-hidden">
      {/* Wave divider — transitions from Pricing (#FAFAF8) into this dark section */}
      <div className="relative w-full overflow-hidden leading-none -mt-1">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block w-full h-16 md:h-20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0,0 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,0 L0,0 Z"
            fill="#FAFAF8"
          />
        </svg>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(245,166,35,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-16 md:mb-20">
          <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            FLOW
          </p>
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-4">
            ホームページができるまで
          </h2>
          <p className="text-gray-400 text-lg">
            ヒアリングから公開まで、約3〜4週間。
          </p>
        </div>

        {/* ─── DESKTOP: Horizontal journey ─── */}
        <div className="hidden md:block relative">
          <svg
            viewBox="0 0 1000 260"
            className="w-full"
            style={{ overflow: "visible" }}
            aria-hidden="true"
          >
            {/* Glow trail (thicker, blurred orange) */}
            <path
              d={PATH_D}
              fill="none"
              stroke="#F5A623"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.18"
              style={{ filter: "blur(6px)" }}
            />

            {/* Track (faint base) */}
            <path
              d={PATH_D}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 8"
            />

            {/* Hidden path for length measurement — always rendered so ref is available */}
            <path ref={measurePathRef} d={PATH_D} fill="none" stroke="transparent" strokeWidth="2" />

            {/* Animated draw line */}
            {pathLength > 0 && (
              <path
                d={PATH_D}
                fill="none"
                stroke="#F5A623"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={pathLength}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 0.05s linear" }}
              />
            )}

            {/* Stops */}
            {stops.map((stop, i) => {
              const pos = STOP_POSITIONS[i];
              const cardOffsetY = CARD_OFFSETS[i];
              const above = cardOffsetY < 0;
              const visible = stopsVisible[i];

              return (
                <g key={stop.id}>
                  {/* Connector dotted line */}
                  <line
                    x1={pos.x}
                    y1={pos.y}
                    x2={pos.x}
                    y2={pos.y + cardOffsetY + (above ? 56 : -56)}
                    stroke="rgba(245,166,35,0.3)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity={visible ? 1 : 0}
                    style={{ transition: "opacity 0.4s ease" }}
                  />

                  {/* Node circle outer glow */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="22"
                    fill="rgba(245,166,35,0.1)"
                    opacity={visible ? 1 : 0}
                    style={{ transition: "opacity 0.4s ease 0.1s" }}
                  />

                  {/* Node circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="16"
                    fill="white"
                    stroke="#F5A623"
                    strokeWidth="2"
                    opacity={visible ? 1 : 0}
                    style={{
                      transition: "opacity 0.3s ease, r 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  />

                  {/* Icon inside node (foreignObject) */}
                  <foreignObject
                    x={pos.x - 10}
                    y={pos.y - 10}
                    width={20}
                    height={20}
                    opacity={visible ? 1 : 0}
                    style={{ transition: "opacity 0.4s ease 0.2s" }}
                  >
                    <div style={{ color: "#F5A623", width: 20, height: 20 }}>
                      {stop.icon}
                    </div>
                  </foreignObject>

                  {/* Card */}
                  <foreignObject
                    x={pos.x - 85}
                    y={pos.y + cardOffsetY + (above ? 0 : -112)}
                    width={170}
                    height={112}
                    opacity={visible ? 1 : 0}
                    style={{
                      transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s`,
                      transform: visible ? "translateY(0)" : above ? "translateY(10px)" : "translateY(-10px)",
                    }}
                  >
                    <div
                      style={{
                        background: "#141414",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12,
                        padding: "12px 14px",
                        height: "100%",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 6,
                        }}
                      >
                        <span
                          style={{
                            color: "white",
                            fontWeight: 700,
                            fontSize: 13,
                            lineHeight: 1.2,
                          }}
                        >
                          {stop.title}
                        </span>
                        <span
                          style={{
                            color: "#F5A623",
                            fontSize: 10,
                            background: "rgba(245,166,35,0.12)",
                            borderRadius: 9999,
                            padding: "2px 7px",
                            whiteSpace: "nowrap",
                            marginLeft: 6,
                          }}
                        >
                          {stop.duration}
                        </span>
                      </div>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: 11,
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {stop.description}
                      </p>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ─── MOBILE: Vertical winding path ─── */}
        <div className="md:hidden relative">
          <div className="relative pl-10">
            {/* Winding vertical line */}
            <div
              className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F5A623]/80 to-[#F5A623]/10"
              style={{
                transformOrigin: "top",
                transform: `scaleY(${progress})`,
                transition: "transform 0.1s linear",
              }}
            />
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/5" />

            <div className="space-y-10">
              {stops.map((stop, i) => {
                const visible = stopsVisible[i];
                return (
                  <div
                    key={stop.id}
                    className="relative"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(-16px)",
                      transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.1}s`,
                    }}
                  >
                    {/* Node */}
                    <div
                      className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#F5A623] flex items-center justify-center"
                      style={{ color: "#F5A623" }}
                    >
                      {stop.icon}
                    </div>

                    {/* Card */}
                    <div className="bg-[#141414] border border-white/[0.07] rounded-xl p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-white font-bold text-base">{stop.title}</h3>
                        <span className="text-[#F5A623] text-xs bg-[#F5A623]/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                          {stop.duration}
                        </span>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed">{stop.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
