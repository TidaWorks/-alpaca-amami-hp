"use client";

import { useEffect, useRef } from "react";

const scenarios = [
  {
    id: "01",
    label: "検索しても出ない",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="#1D3A8A" strokeWidth="2" strokeLinecap="round" />
        <path d="M16.5 16.5L21 21" stroke="#1D3A8A" strokeWidth="2" strokeLinecap="round" />
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
        <rect x="1" y="1" width="16" height="22" rx="3" stroke="#1D3A8A" strokeWidth="2" />
        <circle cx="9" cy="19" r="1.2" fill="#1D3A8A" />
        <path d="M6 5h6" stroke="#1D3A8A" strokeWidth="2" strokeLinecap="round" />
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
        <circle cx="12" cy="12" r="9" stroke="#1D3A8A" strokeWidth="2" />
        <path d="M12 7v5l3 3" stroke="#1D3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#FAFAF7]">
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

      <div className="relative max-w-5xl mx-auto px-6">
        {/* 章扉 */}
        <div className="mb-14 md:mb-16">
          <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A] mb-3">
            CHAPTER 01 / WHY NOW
          </p>
          <h2 className="font-memphis-mincho text-[#0A1228] text-3xl md:text-5xl font-extrabold leading-[1.2] tracking-tight">
            こんな状態、<br className="md:hidden" />放置していませんか？
          </h2>
          <p className="font-hand text-[#0A1228]/70 text-base md:text-lg mt-5 max-w-xl leading-relaxed">
            こんな状態、放置していませんか？
          </p>
        </div>

        {/* シナリオ会話 */}
        <div className="space-y-16 md:space-y-20">
          {scenarios.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
            >
              {/* 問題ふきだし — 左から */}
              <div
                ref={(el) => { problemRefs.current[i] = el; }}
                className="bubble-problem w-full md:w-1/2 pp-hidden pp-transition"
              >
                <div
                  className="relative rounded-xl px-6 py-5 bg-[#FAFAF7] border border-[#0A1228]/10 shadow-[0_8px_30px_-10px_rgba(10,18,40,0.15)]"
                >
                  {/* テール — デスクトップのみ */}
                  <span
                    className="absolute top-1/2 -right-3 -translate-y-1/2 hidden md:block"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      borderLeft: "12px solid #FAFAF7",
                    }}
                  />
                  <div className="relative flex items-center gap-2 mb-2">
                    {s.icon}
                    <p className="text-xs font-semibold text-[#1D3A8A] tracking-wider">
                      {s.label}
                    </p>
                  </div>
                  <p className="relative text-[#0A1228] text-base leading-relaxed">
                    {s.problem}
                  </p>
                </div>

                {/* モバイル下向き矢印 */}
                <div className="flex justify-center mt-4 md:hidden">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 4v16M5 14l7 7 7-7" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* 矢印 — デスクトップのみ */}
              <div className="hidden md:flex flex-col items-center shrink-0">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M4 14h20M16 7l8 7-8 7" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* 解決カード — 右から */}
              <div
                ref={(el) => { solutionRefs.current[i] = el; }}
                className="bubble-solution w-full md:w-1/2 pp-hidden-right pp-transition"
              >
                <div className="rounded-xl bg-white px-6 py-5 border border-[#0A1228]/8 border-l-4 border-l-[#FF6B35] shadow-[0_8px_30px_-10px_rgba(10,18,40,0.15)]">
                  <p className="text-[#1D3A8A] text-xs font-semibold uppercase tracking-widest mb-2">
                    {s.solutionLabel}
                  </p>
                  <p className="font-memphis-mincho text-[#0A1228] text-lg font-extrabold mb-2">
                    {s.accent}
                  </p>
                  <p className="text-[#0A1228]/70 text-sm leading-relaxed">
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
