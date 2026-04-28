"use client";

import { useEffect, useRef } from "react";

const scenarios = [
  {
    id: "01",
    label: "予約バラバラ問題",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    problem: "予約は電話・LINE・店頭でバラバラ。ノートに書いたメモを見落として、ダブルブッキングが起きてしまう…",
    solutionLabel: "システムを入れると",
    solutionText: "全ての予約を1画面で管理。スタッフ全員がリアルタイムで状況を共有でき、空き状況も自動更新されます。",
    accent: "予約を一元管理",
  },
  {
    id: "02",
    label: "売上が見えない問題",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    problem: "毎月の売上集計、レジから手書きの帳簿に転記して計算するのに丸1日…。気づけば月末も終わってる。",
    solutionLabel: "ダッシュボードで",
    solutionText: "売上・客単価・人気メニューが瞬時にグラフ化。経営判断のスピードが変わります。",
    accent: "経営をリアルタイム可視化",
  },
  {
    id: "03",
    label: "顧客情報共有問題",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    problem: "常連さんの好みやアレルギーをスタッフ間で共有できず、新人が来るたびにベテランが指導…。属人化が止まらない。",
    solutionLabel: "顧客台帳をデジタル化",
    solutionText: "来店履歴・好み・連絡先・対応メモが1画面に。誰が対応してもベテラン級のおもてなしが可能に。",
    accent: "顧客対応を標準化",
  },
];

export default function SystemPainPoints() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>(Array(scenarios.length).fill(null));
  const problemRefs = useRef<(HTMLDivElement | null)[]>(Array(scenarios.length).fill(null));
  const solutionRefs = useRef<(HTMLDivElement | null)[]>(Array(scenarios.length).fill(null));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    rowRefs.current.forEach((row, i) => {
      if (!row) return;

      const problem = problemRefs.current[i];
      const solution = solutionRefs.current[i];

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (problem) {
                setTimeout(() => {
                  problem.classList.remove("syspp-hidden");
                  problem.classList.add("syspp-visible");
                }, i * 250);
              }
              if (solution) {
                setTimeout(() => {
                  solution.classList.remove("syspp-hidden-right");
                  solution.classList.add("syspp-visible");
                }, i * 250 + 200);
              }
              observer.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );

      observer.observe(row);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white border-t border-[#E5E7EB]">
      <style>{`
        .syspp-hidden { opacity: 0; transform: translateX(-32px); }
        .syspp-hidden-right { opacity: 0; transform: translateX(32px); }
        .syspp-visible { opacity: 1; transform: translateX(0); }
        .syspp-transition {
          transition: opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                      transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes syspp-arrow-pulse {
          0%, 100% { transform: translateX(0); opacity: 0.7; }
          50% { transform: translateX(4px); opacity: 1; }
        }
      `}</style>

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="bg-[#635BFF] text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded">
              02
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#1A202C]">PROBLEMS</span>
          </div>
          <h2 className="text-[#1A202C] text-3xl md:text-5xl font-extrabold leading-tight">
            こんな業務、
            <br className="md:hidden" />
            <span className="text-[#635BFF]">放置していませんか？</span>
          </h2>
        </div>

        <div className="space-y-12 md:space-y-16">
          {scenarios.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
            >
              {/* Problem bubble */}
              <div
                ref={(el) => { problemRefs.current[i] = el; }}
                className="w-full md:w-1/2 syspp-hidden syspp-transition"
              >
                <div className="relative rounded-2xl px-6 py-5 bg-[#F8FAFC] border border-[#E5E7EB] shadow-sm">
                  <span
                    className="absolute top-1/2 -right-3 -translate-y-1/2 hidden md:block"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      borderLeft: "12px solid #F8FAFC",
                    }}
                  />
                  <div className="flex items-center gap-2 mb-2">
                    {s.icon}
                    <p className="text-xs font-semibold text-[#635BFF] tracking-wider">
                      {s.label}
                    </p>
                  </div>
                  <p className="text-[#1A202C] text-base leading-relaxed">{s.problem}</p>
                </div>

                <div className="flex justify-center mt-4 md:hidden">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 4v16M5 14l7 7 7-7" stroke="#635BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex flex-col items-center shrink-0">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  aria-hidden="true"
                  style={{ animation: `syspp-arrow-pulse 2.4s ease-in-out ${i * 0.4}s infinite` }}
                >
                  <path d="M4 14h20M16 7l8 7-8 7" stroke="#635BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Solution */}
              <div
                ref={(el) => { solutionRefs.current[i] = el; }}
                className="w-full md:w-1/2 syspp-hidden-right syspp-transition group/sol"
              >
                <div className="rounded-2xl bg-white px-6 py-5 shadow-sm border-l-4 border-[#635BFF] border-y border-r border-[#DBEAFE] hover:shadow-lg hover:-translate-y-1 hover:border-l-[6px] transition-all duration-300">
                  <p className="text-[#635BFF] text-xs font-semibold uppercase tracking-widest mb-2 group-hover/sol:tracking-[0.18em] transition-all duration-300">
                    {s.solutionLabel}
                  </p>
                  <p className="text-[#1A202C] text-lg font-bold mb-2">{s.accent}</p>
                  <p className="text-[#1A202C]/65 text-sm leading-relaxed">{s.solutionText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
