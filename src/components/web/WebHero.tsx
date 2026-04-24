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
          background: linear-gradient(90deg, #FF2E88, #12C998, #E8A435, #FF2E88);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientFlow 5s ease-in-out infinite;
        }

        /* ③ アクティブフォンのグロー */
        @keyframes phoneGlow {
          0%, 100% { box-shadow: 0 20px 48px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.1); }
          50% { box-shadow: 0 26px 64px rgba(0,0,0,0.26), 0 6px 18px rgba(0,0,0,0.12); }
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
            className="fixed z-[9998] pointer-events-none rounded-full border-2 border-[#FF2E88]/30"
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
              background: "radial-gradient(circle, rgba(255,46,136,0.15) 0%, rgba(255,46,136,0.05) 40%, transparent 70%)",
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
              textShadow: "0 0 40px rgba(255,46,136,0.4)",
              animation: "diveLabelIn 0.4s cubic-bezier(0.16,1,0.3,1) 0.15s forwards, diveLabelOut 0.25s ease 0.7s forwards",
            }}
          >
            {transition.name}
          </div>
        </>
      )}

      <section ref={sectionRef} className="relative bg-[#0A0A0A] overflow-hidden pb-14 md:pb-20">
        {/* グリッドドットパターン */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ネオングロー */}
        <div
          className="absolute top-10 right-0 w-[60%] h-[55%] pointer-events-none blur-[120px]"
          aria-hidden="true"
          style={{ background: "radial-gradient(ellipse, rgba(0,255,133,0.18) 0%, transparent 60%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[55%] h-[45%] pointer-events-none blur-[120px]"
          aria-hidden="true"
          style={{ background: "radial-gradient(ellipse, rgba(255,46,136,0.22) 0%, transparent 60%)" }}
        />

        {/* ネオンストライプ帯（上部・右端斜め） */}
        <div
          className="absolute top-24 -right-10 w-[240px] h-7 rotate-[8deg] pointer-events-none hidden md:block"
          style={{ background: "#FFE500", boxShadow: "0 0 24px rgba(255,229,0,0.45)" }}
        >
          <p className="text-black font-black text-xs tracking-[0.3em] text-center leading-[28px]">AMAMI WEB DESIGN</p>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-24 md:pt-32 grid md:grid-cols-[1.05fr_1fr] gap-10 md:gap-14 items-center">
          {/* ── 左カラム: コピー + CTA + 数字 ── */}
          <div className="relative z-10">
            {/* スタンプ風バッジ */}
            <div className="hero-fade inline-flex items-center gap-2 mb-5 bg-[#FF2E88] text-white text-[10px] font-black tracking-[0.25em] px-3 py-1.5 rounded-sm rotate-[-2deg] shadow-[0_0_24px_rgba(255,46,136,0.5)]">
              <span>★</span>
              <span>WEB DESIGN / AMAMI</span>
            </div>

            <h1 className={`hero-fade text-white text-[2rem] md:text-[2.8rem] lg:text-[3.4rem] leading-[1.2] font-black mb-5 tracking-tight ${zenMaru.className}`} style={{ animationDelay: "0.1s" }}>
              奄美から、
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-[#0A0A0A]">全国へ届く。</span>
                <span className="absolute inset-x-0 bottom-1 h-full bg-[#00FF85] -z-0 rotate-[-1deg]" style={{ boxShadow: "0 0 32px rgba(0,255,133,0.6)" }} />
              </span>
            </h1>

            <div className="hero-fade flex items-center gap-2 mb-6" style={{ animationDelay: "0.2s" }}>
              <span className="h-[3px] w-12 bg-[#FF2E88]" style={{ boxShadow: "0 0 12px #FF2E88" }} />
              <span className="text-[#FFE500] text-xs font-black tracking-[0.3em]">HP / LP</span>
              <span className="h-[3px] w-6 bg-[#00FF85]" style={{ boxShadow: "0 0 12px #00FF85" }} />
            </div>

            <p className="hero-fade text-white/80 text-[0.95rem] md:text-base leading-[1.9] mb-8 max-w-md" style={{ animationDelay: "0.25s" }}>
              島で対面打ち合わせ。スマホ完全対応。納品後も<span className="text-[#00FF85] font-bold">ずっとサポート</span>。
              <br />
              まずはデモサイトを覗いて、空気感を感じて。
            </p>

            {/* CTA */}
            <div className="hero-fade flex flex-wrap items-center gap-4 mb-10" style={{ animationDelay: "0.3s" }}>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 bg-[#FF2E88] text-white font-black text-sm px-7 py-3.5 rounded-full hover:bg-white hover:text-[#FF2E88] active:scale-[0.97] transition-all duration-200 shadow-[0_0_30px_rgba(255,46,136,0.5)] hover:shadow-[0_0_50px_rgba(255,46,136,0.8)]"
              >
                無料で相談する
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                {/* スタンプ風装飾 */}
                <span className="absolute -top-2 -right-3 w-7 h-7 rounded-full bg-[#FFE500] text-black text-[9px] font-black flex items-center justify-center rotate-12 shadow-lg">FREE</span>
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center text-sm font-black text-white underline underline-offset-[6px] decoration-[#00FF85] decoration-[3px] hover:decoration-[#FF2E88] transition-colors"
              >
                料金を見る →
              </a>
            </div>

            {/* 数字バー（左寄せ） */}
            <div className="hero-fade grid grid-cols-3 gap-4 max-w-sm" style={{ animationDelay: "0.4s" }}>
              {stats.map((stat, i) => {
                const colors = ["#FF2E88", "#00FF85", "#FFE500"];
                const color = colors[i];
                return (
                  <div key={stat.label} className="border-l-2 pl-3" style={{ borderColor: color, boxShadow: `inset 2px 0 8px ${color}33` }}>
                    <p className="text-white">
                      <span className="text-xl md:text-2xl font-black font-display" style={{ color, textShadow: `0 0 12px ${color}77` }}>
                        {stat.value}
                      </span>
                      <span className="text-xs font-semibold ml-0.5 text-white/70">
                        {stat.unit}
                      </span>
                    </p>
                    <p className="text-[10px] text-white/60 mt-0.5">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── 右カラム: アルパカ + デモカルーセル ── */}
          <div className="relative flex flex-col items-center">
            {/* アルパカ（カルーセル背後、やや左）— デスクトップのみ */}
            <img
              src="/images/alpaca/alpaca-laptop-showcase.png"
              alt="ラップトップでホームページを見せるアルパカ"
              aria-hidden="true"
              className="hidden md:block absolute -left-12 lg:-left-16 top-8 md:w-44 lg:w-52 h-auto -rotate-[6deg] pointer-events-none select-none z-0 opacity-95"
            />

          {/* ── 3Dカルーセル ── */}
          <div
            className="relative z-10 w-full h-[460px] md:h-[500px] overflow-hidden"
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
                          isActive ? "ring-1 ring-white/[0.15]" : "ring-1 ring-white/[0.08]"
                        }`} />
                      </div>
                      {/* サイト名 + カテゴリー */}
                      <div className="text-center mt-3 md:mt-4">
                        <p className="text-sm font-bold text-white">{demo.name}</p>
                        <p className="text-[11px] text-[#00FF85] mt-0.5 font-semibold tracking-wider">{demo.category}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 矢印ボタン（デスクトップ） */}
            <button
              onClick={() => goTo(current - 1)}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/10 border border-white/30 hover:bg-[#FF2E88] hover:border-[#FF2E88] hover:shadow-[0_0_24px_rgba(255,46,136,0.6)] transition-all hover:scale-110"
              aria-label="前のデモ"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => goTo(current + 1)}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/10 border border-white/30 hover:bg-[#FF2E88] hover:border-[#FF2E88] hover:shadow-[0_0_24px_rgba(255,46,136,0.6)] transition-all hover:scale-110"
              aria-label="次のデモ"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

            {/* ドットナビ */}
            <div className="flex justify-center gap-1.5 mt-4">
              {demos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-[#FF2E88] w-6 shadow-[0_0_12px_rgba(255,46,136,0.7)]"
                      : "bg-white/20 w-2 hover:bg-white/50"
                  }`}
                  aria-label={`${demos[i].category}のデモに移動`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
