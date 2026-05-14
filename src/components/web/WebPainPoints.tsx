"use client";

import { useEffect, useRef } from "react";

const scenarios = [
  {
    id: "01",
    label: "見つからない",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
      <svg width="20" height="22" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="1" y="1" width="16" height="22" rx="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="9" cy="19" r="1.4" fill="currentColor" />
        <path d="M6 5h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    problem: "今のサイト、スマホで見るとボタンが小さくて押せないし、写真がはみ出してしまう。お客さんに申し訳ない…",
    solutionLabel: "スマホ対応にすると",
    solutionText: "どの端末でもきれいに表示され、予約やお問い合わせへスムーズに誘導できます。",
    accent: "どこでも読みやすい",
  },
  {
    id: "03",
    label: "更新が遅い",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    problem: "メニューの値段が変わったのに、業者に連絡→返信待ち→反映まで2週間…。その間もお客さんに古い情報を見せてしまう。",
    solutionLabel: "ALPACAの保守なら",
    solutionText: "価格変更も休業案内も、ご連絡いただければこちらですぐ反映します。基本当日対応で、業者に頼んで何週間も待たされることはありません。",
    accent: "いつでもすぐ反映",
  },
];

export default function WebPainPoints() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>(Array(scenarios.length).fill(null));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                row.classList.remove("pp-hidden");
                row.classList.add("pp-visible");
              }, i * 180);
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
    <section id="pain" className="relative py-32 md:py-40 overflow-hidden bg-[#303030] text-white">
      <style>{`
        .pp-hidden { opacity: 0; transform: translateY(40px); }
        .pp-visible { opacity: 1; transform: translateY(0); }
        .pp-transition {
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>

      {/* ゴースト英字（背景） */}
      <p
        className="absolute top-12 right-6 md:right-16 text-white/[0.04] text-[7rem] md:text-[14rem] leading-none pointer-events-none select-none"
        style={{ fontWeight: 400 }}
        aria-hidden="true"
      >
        Pickup
      </p>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 z-10">
        {/* 章タイトル：givee の Pickup 構造（左：巨大英文＋日本語ラベル / 右：GO） */}
        <div className="flex items-end justify-between mb-20 md:mb-28 flex-wrap gap-8">
          <div>
            <h2
              className="text-white text-[4rem] md:text-[8rem] lg:text-[10rem] leading-[0.95] tracking-[-0.02em]"
              style={{ fontWeight: 400 }}
            >
              Pickup
            </h2>
            <p className="text-sm tracking-[0.3em] text-white/70 mt-4">
              よくあるお悩み
            </p>
          </div>

          {/* GO 丸ボタン */}
          <a
            href="#features"
            className="group inline-flex items-center gap-3"
          >
            <span className="text-xs tracking-[0.3em] text-white/70 group-hover:text-white transition-colors">
              GO
            </span>
            <span className="w-14 h-14 border border-white/40 rounded-full flex items-center justify-center group-hover:bg-[#FFE900] group-hover:border-[#FFE900] group-hover:text-black transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>

        {/* 巨大JPサブ見出し */}
        <h3
          className="text-white text-[2.2rem] md:text-[3.4rem] lg:text-[4rem] leading-[1.2] tracking-[-0.01em] mb-20 md:mb-28 max-w-4xl"
          style={{ fontWeight: 500 }}
        >
          こんな状態、
          <br />
          放置していませんか？
        </h3>

        {/* シナリオカード（縦並びの大型カード） */}
        <div className="space-y-8 md:space-y-12">
          {scenarios.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="pp-hidden pp-transition"
            >
              <div className="grid md:grid-cols-[auto_1fr_1fr] gap-8 md:gap-12 items-stretch bg-[#1A1A1A] rounded-3xl p-8 md:p-12 border border-white/5">
                {/* 番号 */}
                <div className="flex md:flex-col md:items-start items-center gap-4">
                  <span className="text-[#FFE900] text-xs tracking-[0.3em]" style={{ fontWeight: 500 }}>
                    No.{s.id}
                  </span>
                  <span className="text-white text-[3.5rem] md:text-[5rem] leading-none" style={{ fontWeight: 400 }}>
                    0{i + 1}
                  </span>
                </div>

                {/* 左：問題 */}
                <div className="border-l border-white/10 pl-6 md:pl-8">
                  <div className="flex items-center gap-3 mb-5 text-white">
                    <span className="text-[#FFE900]">{s.icon}</span>
                    <p className="text-lg md:text-xl" style={{ fontWeight: 500 }}>
                      {s.label}
                    </p>
                  </div>
                  <p className="text-white/75 text-sm md:text-base leading-loose tracking-wide">
                    {s.problem}
                  </p>
                </div>

                {/* 右：解決 */}
                <div className="relative bg-[#FFE900] text-black rounded-2xl p-6 md:p-8">
                  <p className="text-xs tracking-[0.2em] text-black/70 mb-3">
                    {s.solutionLabel}
                  </p>
                  <p className="text-2xl md:text-3xl leading-[1.2] tracking-[-0.01em] mb-4" style={{ fontWeight: 500 }}>
                    {s.accent}
                  </p>
                  <p className="text-black/85 text-sm leading-loose">
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
