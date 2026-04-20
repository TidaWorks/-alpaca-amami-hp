"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Zen_Maru_Gothic } from "next/font/google";

const zenMaru = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

const demos = [
  { name: "Hair Salon kukuru", category: "美容室", url: "/demo/salon", image: "/images/demo-screenshots/salon.png" },
  { name: "Bistro ADAN", category: "ビストロ", url: "/demo/restaurant", image: "/images/demo-screenshots/restaurant.png" },
  { name: "珊瑚の宿 いそかぜ", category: "民泊", url: "/demo/guesthouse", image: "/images/demo-screenshots/guesthouse.png" },
  { name: "南風建設", category: "建設業", url: "/demo/construction", image: "/images/demo-screenshots/construction.png" },
  { name: "BLUE AMAMI", category: "ダイビング", url: "/demo/diving", image: "/images/demo-screenshots/diving.png" },
  { name: "Pâtisserie Soleil", category: "パティスリー", url: "/demo/patisserie", image: "/images/demo-screenshots/patisserie.png" },
  { name: "AMAMI FOREST CAMP", category: "キャンプ場", url: "/demo/camp", image: "/images/demo-screenshots/camp.png" },
  { name: "島つむぎ整骨院", category: "整骨院", url: "/demo/osteopathic", image: "/images/demo-screenshots/osteopathic.png" },
  { name: "あまみ果樹園 太陽のしずく", category: "農園・直売", url: "/demo/farm", image: "/images/demo-screenshots/farm.png?v=2" },
];

const stats = [
  { value: "9", unit: "業種", label: "デモサイト公開中" },
  { value: "¥70,000", unit: "〜", label: "LP制作プラン" },
  { value: "対面", unit: "OK", label: "島内打ち合わせ" },
];

type Transition = {
  name: string;
  cx: number;
  cy: number;
};

export default function WebHero() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);
  const [transition, setTransition] = useState<Transition | null>(null);
  const touchStartX = useRef(0);
  const touchStartTime = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const total = demos.length;

  // Auto-advance
  useEffect(() => {
    if (!isAuto) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3200);
    return () => clearInterval(timer);
  }, [isAuto, total]);

  // touchmoveをnon-passiveで登録（preventDefaultのため）
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const dx = e.touches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 10) e.preventDefault();
      setDragOffset(dx);
    };
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, []);

  // ⑥ スクロール連動パララックス
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
      setIsAuto(false);
      const timer = setTimeout(() => setIsAuto(true), 8000);
      return () => clearTimeout(timer);
    },
    [total]
  );

  // ⑤ 指追従スワイプ + 慣性
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
    isDragging.current = true;
    setIsAuto(false);
    setDragOffset(0);
  };


  const handleTouchEnd = (e: React.TouchEvent) => {
    isDragging.current = false;
    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - endX;
    const elapsed = Date.now() - touchStartTime.current;
    const velocity = Math.abs(diff / Math.max(elapsed, 1));

    setDragOffset(0);

    if (Math.abs(diff) > 30) {
      const direction = diff > 0 ? 1 : -1;
      const slides = velocity > 1.5 ? 3 : velocity > 0.7 ? 2 : 1;
      goTo(current + direction * slides);
    } else {
      // 戻す（スナップバック）
      const timer = setTimeout(() => setIsAuto(true), 8000);
      return () => clearTimeout(timer);
    }
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (transition) return;
    const demo = demos[index];
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    setIsAuto(false);
    setTransition({ name: demo.name, cx, cy });

    setTimeout(() => {
      router.push(demo.url);
    }, 900);
  };

  const getItemStyle = (index: number): React.CSSProperties => {
    let diff = index - current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    const abs = Math.abs(diff);

    // アクティブ以外は完全非表示（左右見切れを排除、1枚集中表示）
    if (abs > 0 && dragOffset === 0) {
      return { opacity: 0, visibility: "hidden", pointerEvents: "none", transform: `translateX(${diff * 20}%) scale(0.9)` };
    }

    // ドラッグ中は指の動きに追従（次／前のカードがふわっと見える）
    const dragPercent = dragOffset / 2;

    return {
      transform: `translateX(calc(${diff * 100}% + ${dragPercent}px)) scale(${1 - abs * 0.08})`,
      zIndex: 10 - abs,
      opacity: abs === 0 ? 1 : Math.max(0, 0.5 - abs * 0.2),
      pointerEvents: abs === 0 && dragOffset === 0 ? "auto" : "none",
      transition: isDragging.current ? "none" : undefined,
    };
  };

  return (
    <>
      {/* ── スタイル定義 ── */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-fade {
          animation: heroFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* ① グラデーションテキスト */
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .gradient-text {
          background: linear-gradient(90deg, #F5A623, #0D9488, #E8A435, #F5A623);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientFlow 5s ease-in-out infinite;
        }

        /* ③ アクティブフォンのグロー */
        @keyframes phoneGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(245,166,35,0.15), 0 16px 48px rgba(0,0,0,0.12); }
          50% { box-shadow: 0 0 50px rgba(245,166,35,0.25), 0 20px 60px rgba(0,0,0,0.15); }
        }
        .phone-glow {
          animation: phoneGlow 3s ease-in-out infinite;
        }

        /* 遷移アニメーション */
        @keyframes diveRipple {
          from { width: 0; height: 0; opacity: 0.6; }
          to   { width: 300vmax; height: 300vmax; opacity: 0; }
        }
        @keyframes diveAura {
          from { width: 0; height: 0; opacity: 0; }
          to   { width: 250vmax; height: 250vmax; opacity: 1; }
        }
        @keyframes diveOverlay {
          from { backdrop-filter: blur(0px); background: rgba(10,10,10,0); }
          to   { backdrop-filter: blur(24px); background: rgba(10,10,10,0.95); }
        }
        @keyframes diveLabelIn {
          from { opacity: 0; transform: translate(-50%,-50%) scale(0.85); }
          to   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }
        @keyframes diveLabelOut {
          from { opacity: 1; transform: translate(-50%,-50%) scale(1); }
          to   { opacity: 0; transform: translate(-50%,-50%) scale(1.1); }
        }
      `}</style>

      {/* ── 画面遷移オーバーレイ ── */}
      {transition && (
        <>
          <div
            className="fixed z-[9998] pointer-events-none rounded-full border-2 border-[#F5A623]/30"
            style={{
              left: transition.cx,
              top: transition.cy,
              transform: "translate(-50%,-50%)",
              animation: "diveRipple 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
            }}
          />
          <div
            className="fixed z-[9997] pointer-events-none rounded-full"
            style={{
              left: transition.cx,
              top: transition.cy,
              transform: "translate(-50%,-50%)",
              background: "radial-gradient(circle, rgba(245,166,35,0.15) 0%, rgba(245,166,35,0.05) 40%, transparent 70%)",
              animation: "diveAura 1s cubic-bezier(0.16,1,0.3,1) forwards",
            }}
          />
          <div
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{ animation: "diveOverlay 0.8s cubic-bezier(0.4,0,0.2,1) forwards" }}
          />
          <div
            className="fixed z-[10000] pointer-events-none text-white text-2xl md:text-4xl font-bold tracking-widest"
            style={{
              left: "50%",
              top: "50%",
              opacity: 0,
              textShadow: "0 0 40px rgba(245,166,35,0.4)",
              animation: "diveLabelIn 0.4s cubic-bezier(0.16,1,0.3,1) 0.15s forwards, diveLabelOut 0.25s ease 0.7s forwards",
            }}
          >
            {transition.name}
          </div>
        </>
      )}

      <section ref={sectionRef} className="relative bg-[#FFFBF5] overflow-hidden pb-14 md:pb-20">
        {/* 背景パターン */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(circle, #B8A080 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ⑥ 背景グラデーション（スクロール連動パララックス） */}
        <div
          className="absolute top-0 right-0 w-[70%] h-[60%] pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse at 80% 20%, rgba(245,166,35,0.07) 0%, transparent 60%)",
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[50%] h-[40%] pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse at 20% 80%, rgba(13,148,136,0.04) 0%, transparent 60%)",
            transform: `translateY(${-scrollY * 0.03}px)`,
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 pt-24 md:pt-32">
          {/* デコレーション: ラップトップでホームページを見せるアルパカ */}
          <img
            src="/images/alpaca/alpaca-laptop-showcase.png"
            alt="ラップトップでホームページを見せるアルパカ"
            aria-hidden="true"
            className="hidden lg:block absolute top-20 right-4 xl:right-12 w-40 xl:w-52 h-auto -rotate-[6deg] pointer-events-none select-none z-0"
          />

          {/* ラベル */}
          <p className="hero-fade text-[#F5A623] text-[11px] font-semibold tracking-[0.3em] uppercase mb-5 font-display">
            WEB DESIGN
          </p>

          {/* ① 見出し（グラデーションテキスト） */}
          <h1 className={`hero-fade text-[#2D2418] text-[1.5rem] md:text-[2.8rem] lg:text-[3.4rem] leading-[1.4] mb-5 ${zenMaru.className}`} style={{ animationDelay: "0.1s" }}>
            奄美から、全国へ届く
            <br />
            ホームページ。
          </h1>

          {/* アクセントバー */}
          <div className="hero-fade h-[3px] w-16 md:w-20 bg-[#F5A623] rounded-full mb-6" style={{ animationDelay: "0.2s" }} />

          <p className="hero-fade text-[#8A7D6B] text-[0.95rem] md:text-base leading-relaxed mb-14 md:mb-18 max-w-md" style={{ animationDelay: "0.25s" }}>
            島で対面打ち合わせ。スマホ対応。納品後もサポート。
            <br />
            まずはデモサイトをご覧ください。
          </p>

          {/* ── 3Dカルーセル ── */}
          <div
            className="relative h-[500px] md:h-[600px] -mx-6 md:mx-0 overflow-hidden"
            style={{ perspective: "1000px" }}
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
              {demos.map((demo, i) => {
                const style = getItemStyle(i);
                const isActive = i === current;
                return (
                  <div
                    key={demo.category}
                    className={`absolute ${isDragging.current ? "" : "transition-all duration-[500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"}`}
                    style={style}
                  >
                    <div
                      role="link"
                      tabIndex={isActive ? 0 : -1}
                      aria-label={`${demo.name}のデモサイトを見る`}
                      className="block group cursor-pointer"
                      onClick={(e) => isActive && handleCardClick(e, i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && isActive) handleCardClick(e as unknown as React.MouseEvent<HTMLDivElement>, i);
                      }}
                    >
                      {/* ③ Phone frame（アクティブ時グロー） */}
                      <div
                        data-phone-idx={i}
                        className={`relative w-[185px] h-[380px] md:w-[235px] md:h-[480px] bg-[#1A1A1A] rounded-[36px] md:rounded-[44px] p-[5px] md:p-[7px] transition-shadow duration-500 ${
                          isActive ? "phone-glow" : "shadow-[0_16px_48px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)]"
                        }`}
                      >
                        {/* Dynamic island */}
                        <div className="absolute top-[12px] md:top-[14px] left-1/2 -translate-x-1/2 w-[60px] md:w-[76px] h-[20px] md:h-[24px] bg-black rounded-full z-20" />
                        {/* Screen */}
                        <div className="relative w-full h-full rounded-[31px] md:rounded-[37px] overflow-hidden bg-white">
                          <Image
                            src={demo.image}
                            alt={demo.name}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 185px, 235px"
                            priority={Math.abs((() => { let d = i - current; if (d > total / 2) d -= total; if (d < -total / 2) d += total; return d; })()) <= 1}
                          />
                        </div>
                        {/* 側面ハイライト */}
                        <div className={`absolute inset-0 rounded-[36px] md:rounded-[44px] pointer-events-none transition-all duration-500 ${
                          isActive ? "ring-2 ring-[#F5A623]/30" : "ring-1 ring-white/[0.08]"
                        }`} />
                      </div>
                      {/* サイト名 + カテゴリー */}
                      <div className="text-center mt-3 md:mt-4">
                        <p className="text-sm font-semibold text-[#2D2418]">{demo.name}</p>
                        <p className="text-[11px] text-[#8A7D6B] mt-0.5">{demo.category}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 矢印ボタン（デスクトップ） */}
            <button
              onClick={() => goTo(current - 1)}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all hover:scale-110"
              aria-label="前のデモ"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D2418" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => goTo(current + 1)}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all hover:scale-110"
              aria-label="次のデモ"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D2418" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* ドットナビ */}
          <div className="flex justify-center gap-1.5 mt-5">
            {demos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-[#F5A623] w-5" : "bg-[#D4CEC5] w-2 hover:bg-[#B0A898]"
                }`}
                aria-label={`${demos[i].category}のデモに移動`}
              />
            ))}
          </div>

          {/* ② 数字バー */}
          <div className="hero-fade grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto" style={{ animationDelay: "0.4s" }}>
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p className="text-[#2D2418]">
                  <span
                    className="text-2xl md:text-3xl font-black font-display"
                    style={{ color: i === 1 ? "#0D9488" : "#2D2418" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-sm font-semibold ml-0.5"
                    style={{ color: i === 1 ? "#0D9488" : "#F5A623" }}
                  >
                    {stat.unit}
                  </span>
                </p>
                <p className="text-[11px] text-[#8A7D6B] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#F5A623] text-[#2D2418] font-bold text-sm px-7 py-3 rounded-full hover:bg-[#E09510] active:scale-[0.97] transition-all duration-200 shadow-[0_4px_16px_rgba(245,166,35,0.25)] hover:shadow-[0_6px_24px_rgba(245,166,35,0.35)]"
            >
              無料で相談する
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
