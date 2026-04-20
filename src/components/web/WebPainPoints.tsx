"use client";

import { useEffect, useRef } from "react";

const scenarios = [
  {
    id: "01",
    label: "検索しても出ない",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
        <path d="M16.5 16.5L21 21" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    problem: "「お店の名前」でGoogle検索しても、何も出てこない。お客さんが来る前に、どこか別のお店に行ってしまう…",
    solutionLabel: "ホームページを作ると",
    solutionText: "検索結果に表示されるようになり、営業時間・アクセス・メニューをまとめて伝えられます。",
    accent: "見つけてもらえる",
  },
  {
    id: "02",
    label: "スマホで崩れる",
    icon: (
      <svg width="18" height="20" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="1" y="1" width="16" height="22" rx="3" stroke="#F5A623" strokeWidth="2" />
        <circle cx="9" cy="19" r="1.2" fill="#F5A623" />
        <path d="M6 5h6" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    problem: "今のサイト、スマホで見るとボタンが小さくて押せないし、写真がはみ出してしまう。お客さんに申し訳ない…",
    solutionLabel: "スマホ対応にすると",
    solutionText: "どの端末でもきれいに表示され、予約やお問い合わせへスムーズに誘導できます。",
    accent: "どこでも読みやすい",
  },
  {
    id: "03",
    label: "更新に時間とお金",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#F5A623" strokeWidth="2" />
        <path d="M12 7v5l3 3" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    problem: "メニューの値段が変わったのに、業者に連絡→返信待ち→反映まで2週間…。その間もお客さんに古い情報を見せてしまう。",
    solutionLabel: "自分で更新できると",
    solutionText: "価格変更も休業案内も、スマホから5分で反映。業者に頼む費用も時間も不要になります。",
    accent: "すぐ反映できる",
  },
];

export default function WebPainPoints() {
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
                  problem.classList.remove("pp-hidden");
                  problem.classList.add("pp-visible");
                }, i * 300);
              }
              if (solution) {
                setTimeout(() => {
                  solution.classList.remove("pp-hidden-right");
                  solution.classList.add("pp-visible");
                }, i * 300 + 250);
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
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#FAFAF8" }}>
      <style>{`
        .pp-hidden {
          opacity: 0;
          transform: translateX(-32px);
        }
        .pp-hidden-right {
          opacity: 0;
          transform: translateX(32px);
        }
        .pp-visible {
          opacity: 1;
          transform: translateX(0);
        }
        .pp-transition {
          transition: opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                      transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      {/* Wave texture background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="wave-bg" x="0" y="0" width="120" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M0 20 C20 5, 40 5, 60 20 S100 35, 120 20"
              fill="none"
              stroke="#B45309"
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wave-bg)" />
      </svg>

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section heading */}
        <div className="mb-16 flex items-center gap-4 md:gap-8">
          <div className="flex-1 min-w-0">
            <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              PROBLEMS
            </p>
            <h2 className="text-[#1A1A1A] text-3xl md:text-5xl font-bold leading-tight">
              こんな状態、<br className="md:hidden" />放置していませんか？
            </h2>
          </div>
          <img
            src="/images/alpaca/alpaca-sad.png"
            alt="うなだれて悩んでいるアルパカ"
            aria-hidden="true"
            className="w-36 md:w-52 h-auto flex-shrink-0 pointer-events-none select-none"
          />
        </div>

        {/* Conversation rows */}
        <div className="space-y-16 md:space-y-20">
          {scenarios.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
            >
              {/* Problem bubble — slides in from left */}
              <div
                ref={(el) => { problemRefs.current[i] = el; }}
                className="bubble-problem w-full md:w-1/2 pp-hidden pp-transition"
              >
                <div
                  className="relative rounded-2xl px-6 py-5 shadow-sm"
                  style={{ backgroundColor: "#EDEDED" }}
                >
                  {/* Subtle dot pattern on problem side */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(circle, #C0C0C0 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                      opacity: 0.18,
                    }}
                  />
                  {/* Tail pointing right — desktop only */}
                  <span
                    className="absolute top-1/2 -right-3 -translate-y-1/2 hidden md:block"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      borderLeft: "12px solid #EDEDED",
                    }}
                  />
                  <div className="relative flex items-center gap-2 mb-2">
                    {s.icon}
                    <p className="text-xs font-semibold text-[#F5A623] tracking-wider">
                      {s.label}
                    </p>
                  </div>
                  <p className="relative text-[#1A1A1A] text-base leading-relaxed">
                    {s.problem}
                  </p>
                </div>

                {/* Mobile downward arrow — visible only when tail is hidden */}
                <div className="flex justify-center mt-4 md:hidden">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 4v16M5 14l7 7 7-7" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Arrow connector — desktop only */}
              <div className="hidden md:flex flex-col items-center shrink-0">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M4 14h20M16 7l8 7-8 7" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Solution card — slides in from right */}
              <div
                ref={(el) => { solutionRefs.current[i] = el; }}
                className="bubble-solution w-full md:w-1/2 pp-hidden-right pp-transition"
              >
                <div
                  className="rounded-2xl bg-white px-6 py-5 shadow-sm"
                  style={{
                    borderTop: "1px solid #F5D89A",
                    borderRight: "1px solid #F5D89A",
                    borderBottom: "1px solid #F5D89A",
                    borderLeft: "3px solid #F5A623",
                  }}
                >
                  <p className="text-[#F5A623] text-xs font-semibold uppercase tracking-widest mb-2">
                    {s.solutionLabel}
                  </p>
                  <p className="text-[#1A1A1A] text-lg font-bold mb-2">
                    {s.accent}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {s.solutionText}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
