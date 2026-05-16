"use client";

import { useEffect, useRef, useState } from "react";

type Metric = {
  label: string;
  before: string;
  after: string;
  afterNum: number | null;
  unit: string;
};

const metrics: Metric[] = [
  { label: "月次集計の時間", before: "3時間", after: "5", afterNum: 5, unit: "分" },
  { label: "シフト作成の時間", before: "半日", after: "10", afterNum: 10, unit: "分" },
  { label: "ダブルブッキング", before: "月3-5件", after: "0", afterNum: 0, unit: "件" },
  { label: "売上把握スピード", before: "翌月", after: "即時", afterNum: null, unit: "" },
];

function CountUp({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return <>{value}</>;
}

const bars = [42, 58, 70, 65, 88, 95];
const barLabels = ["1月", "2月", "3月", "4月", "5月", "6月"];

export default function SystemDashboard() {
  const ref = useRef<HTMLDivElement>(null);
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
      ref={ref}
      className="relative py-32 md:py-40 bg-[#FAFAF7] overflow-hidden border-t border-[#E5E7EB]"
    >
      <style>{`
        @keyframes dashBar {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes dashIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dashOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes dashPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>

      <svg
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-[420px] opacity-15 pointer-events-none"
        viewBox="0 0 600 600"
        fill="none"
        style={{ animation: "dashOrbit 40s linear infinite" }}
      >
        <ellipse cx="300" cy="300" rx="240" ry="240" stroke="#FF6B35" strokeWidth="2" strokeDasharray="2 10" />
      </svg>

      <div className="relative max-w-6xl mx-auto px-6">
        <div
          className="mb-16 md:mb-20 max-w-3xl transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-[#FF6B35] inline-block" />
            <p className="text-[11px] md:text-xs font-bold tracking-[0.3em] text-[#0A2540]">
              仕組み化の効果
            </p>
          </div>
          <h2
            className="text-[#0A2540] font-black leading-[1.05] mb-5"
            style={{ fontSize: "clamp(2rem, 7vw, 4.5rem)" }}
          >
            数字で、
            <br />
            <span className="text-[#FF6B35]">変わる</span>
            。
          </h2>
          <p className="text-[#0A2540]/70 text-sm md:text-base leading-[1.95] font-medium">
            導入後にお客様の現場で起きた変化です。データで業務を整えると、時間と判断の質が変わります。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* CSSダッシュボードモック */}
          <div
            className="relative"
            style={{
              opacity: 0,
              animation: visible ? "dashIn 0.7s cubic-bezier(0.34, 1.2, 0.64, 1) 0.2s forwards" : undefined,
            }}
          >
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl shadow-xl overflow-hidden">
              {/* ヘッダーバー */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E7EB] bg-[#FAFAF7]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                  <span className="text-[#0A2540] text-xs font-bold">ALPACA Dashboard</span>
                </div>
                <span className="text-[#0A2540]/40 text-[10px] font-mono">2026.05</span>
              </div>

              {/* 売上カード */}
              <div className="p-5 md:p-6">
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-[#FAFAF7] rounded-xl p-4">
                    <p className="text-[#0A2540]/55 text-[10px] font-bold mb-1.5">今月の売上</p>
                    <p className="text-[#0A2540] text-2xl font-black tabular-nums leading-none">
                      ¥{visible ? <CountUp target={1245} duration={1800} /> : 0},000
                    </p>
                    <p className="text-[#FF6B35] text-[10px] font-bold mt-1">↑ 前月比 +18.6%</p>
                  </div>
                  <div className="bg-[#FAFAF7] rounded-xl p-4">
                    <p className="text-[#0A2540]/55 text-[10px] font-bold mb-1.5">来店数</p>
                    <p className="text-[#0A2540] text-2xl font-black tabular-nums leading-none">
                      {visible ? <CountUp target={128} duration={1800} /> : 0}
                    </p>
                    <p className="text-[#FF6B35] text-[10px] font-bold mt-1">↑ 前月比 +12.3%</p>
                  </div>
                </div>

                {/* 棒グラフ */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[#0A2540] text-xs font-bold">売上推移</p>
                    <p className="text-[#0A2540]/40 text-[10px]">単位: 万円</p>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {bars.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex items-end" style={{ height: "100%" }}>
                          <div
                            className={`w-full rounded-t ${i === bars.length - 1 ? "bg-[#FF6B35]" : "bg-[#0A2540]"}`}
                            style={{
                              height: `${h}%`,
                              transformOrigin: "bottom",
                              transform: "scaleY(0)",
                              animation: visible ? `dashBar 0.8s cubic-bezier(0.34, 1.2, 0.64, 1) ${0.5 + i * 0.1}s forwards` : undefined,
                            }}
                          />
                        </div>
                        <span className="text-[#0A2540]/50 text-[9px] font-bold">{barLabels[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 装飾アクセント */}
            <div
              aria-hidden="true"
              className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-[#FF6B35] flex items-center justify-center shadow-lg"
              style={{ animation: visible ? "dashPulse 2.5s ease-in-out infinite" : undefined }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </div>
          </div>

          {/* 数値カード */}
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className="group relative bg-white border-2 border-[#0A2540] rounded-2xl p-5 md:p-6 hover:bg-[#0A2540] transition-all duration-300"
                style={{
                  opacity: 0,
                  animation: visible
                    ? `dashIn 0.6s cubic-bezier(0.34, 1.2, 0.64, 1) ${0.4 + i * 0.12}s forwards`
                    : undefined,
                }}
              >
                <p className="text-[#0A2540]/55 group-hover:text-white/55 text-xs mb-3 font-bold transition-colors">
                  {m.label}
                </p>
                <p className="text-[#0A2540]/40 group-hover:text-white/40 text-xs line-through tabular-nums mb-1 transition-colors">
                  {m.before}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[#FF6B35] text-4xl md:text-5xl font-black tabular-nums leading-none">
                    {m.afterNum !== null && visible ? <CountUp target={m.afterNum} duration={1400 + i * 200} /> : m.after}
                  </span>
                  <span className="text-[#0A2540] group-hover:text-white text-sm font-bold transition-colors">
                    {m.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
