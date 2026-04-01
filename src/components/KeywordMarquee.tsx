"use client";

export default function KeywordMarquee() {
  const bgWords = [
    { text: "SYSTEM", size: "text-[3rem] md:text-[9rem]", color: "text-white/[0.03]", top: "10%", left: "5%", rotate: "-3deg" },
    { text: "WORKS", size: "text-[2.5rem] md:text-[6rem]", color: "text-white/[0.03]", top: "55%", left: "50%", rotate: "2deg" },
  ];

  const topMarquee = [
    "予約管理", "顧客管理", "売上集計", "在庫管理", "シフト管理",
    "LINE連携", "ダッシュボード", "自動応答", "レポート", "データ分析",
  ];

  const bottomMarquee = [
    "24時間自動受付", "売上をリアルタイム把握", "顧客情報を一元管理",
    "ダブルブッキングゼロ", "ペーパーレス化", "スマホで完結",
    "データを活かす経営", "業務効率UP", "スタッフの負担軽減", "予約の取りこぼしゼロ",
  ];

  return (
    <section className="relative bg-[#080c16] overflow-hidden select-none" style={{ height: "clamp(200px, 40vw, 420px)" }}>
      {[25, 50, 75].map((left) => (
        <div key={`v${left}`} className="absolute top-0 bottom-0 w-px bg-white/[0.03]" style={{ left: `${left}%` }} />
      ))}
      {[33, 66].map((top) => (
        <div key={`h${top}`} className="absolute left-0 right-0 h-px bg-white/[0.03]" style={{ top: `${top}%` }} />
      ))}

      {bgWords.map((w, i) => (
        <span
          key={i}
          className={`absolute font-black ${w.size} ${w.color} whitespace-nowrap leading-none pointer-events-none`}
          style={{ top: w.top, left: w.left, transform: `rotate(${w.rotate})` }}
        >
          {w.text}
        </span>
      ))}

      {/* 上部帯 */}
      <div className="absolute top-[12%] left-0 right-0 rotate-[1.5deg]">
        <div className="bg-white/[0.05] border-y border-white/[0.08] py-1.5 md:py-2 marquee-container">
          <div className="marquee-track marquee-left">
            {[...bottomMarquee, ...bottomMarquee, ...bottomMarquee, ...bottomMarquee].map((word, i) => (
              <span
                key={`m3-${i}`}
                className="inline-flex items-center gap-6 px-4 text-white/30 text-xs md:text-sm font-medium tracking-widest whitespace-nowrap"
              >
                {word}
                <span className="text-[#F5A623]/40">／</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* メイン帯 */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 -rotate-[2deg]">
        <div className="relative">
          <div className="absolute inset-0 bg-[#F5A623]/20 blur-xl translate-y-1" />
          <div className="relative bg-[#F5A623] py-3 md:py-4 marquee-container shadow-[0_0_40px_rgba(245,166,35,0.25)]">
            <div className="marquee-track marquee-right-fast">
              {[...topMarquee, ...topMarquee, ...topMarquee, ...topMarquee].map((word, i) => (
                <span
                  key={`m-${i}`}
                  className="inline-flex items-center gap-4 md:gap-6 px-3 md:px-5 text-black text-sm md:text-2xl font-black tracking-wide whitespace-nowrap"
                >
                  <span className="text-black/20 text-xs">◆</span>
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 下部帯 */}
      <div className="absolute bottom-[14%] left-0 right-0 rotate-[1.5deg]">
        <div className="relative">
          <div className="absolute inset-0 bg-[#2ECC71]/10 blur-lg" />
          <div className="relative bg-[#2ECC71]/90 py-2 md:py-2.5 marquee-container">
            <div className="marquee-track marquee-left-fast">
              {[...bottomMarquee, ...bottomMarquee, ...bottomMarquee, ...bottomMarquee].map((word, i) => (
                <span
                  key={`m2-${i}`}
                  className="inline-flex items-center gap-6 px-4 text-black/80 text-xs md:text-sm font-bold tracking-widest whitespace-nowrap"
                >
                  {word}
                  <span className="text-black/20">→</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
