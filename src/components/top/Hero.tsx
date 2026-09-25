"use client";

import { useEffect, useRef, useState } from "react";
import { setupGsap, gsap, EASE, isReduced } from "./motion";
import Slot from "./Slot";

const SLIDES = [
  { id: "S01", label: "奄美の会社の事務所で、社長と代表が打ち合わせをしている場面（横長）", tone: "a" as const, src: "/images/top/hero-s01.webp", srcSp: "/images/top/hero-s01-sp.webp", alt: "海の見える事務所で、社長とALPACAの顧問が打ち合わせをしているイラスト" },
  { id: "S02", label: "社員がスマホでAIに話しかけ、仕事を頼んでいる場面（横長）", tone: "b" as const, src: "/images/top/hero-s02.webp", srcSp: "/images/top/hero-s02-sp.webp", alt: "事務の社員がスマホのAIに仕事を頼み、現場の社員が自分のスマホで受け取っているイラスト" },
  { id: "S03", label: "奄美大島の海と、有屋町の街並み（横長）", tone: "c" as const, src: "/images/top/hero-s03.webp", srcSp: "/images/top/hero-s03-sp.webp", alt: "奄美大島の海と、坂の上から見た町並みのイラスト" },
];

const VISIT_KEY = "tp-visited";
const LOADING = "LOADING...";

function Copy({ veil }: { veil?: boolean }) {
  return (
    <div className={`tp-hero__copy ${veil ? "tp-hero__copy--veil" : ""}`}>
      <div className="tp-hero__copyin" data-copy>
        {veil ? (
          <p className="tp-catch" aria-hidden="true">
            <span>会社の仕事に、</span>
            <span>AIの手を。</span>
          </p>
        ) : (
          <h1 className="tp-catch">
            <span>会社の仕事に、</span>
            <span>AIの手を。</span>
          </h1>
        )}
        <p className="tp-hero__lead" aria-hidden={veil ? "true" : undefined}>
          <span>奄美・鹿児島の会社と一緒に、</span>
          <span>AIに任せられる仕事を</span>
          <span>毎月ひとつずつ増やしていく顧問です。</span>
        </p>
      </div>
    </div>
  );
}

/**
 * ローディング（#1 #2 #3）→ 白い幕に黒いコピー（#4）→ 丸い穴（#6）→ ヒーロー（#7 #8 #9）
 */
export default function Hero() {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const loadingRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  // オープニング
  useEffect(() => {
    const loading = loadingRef.current;
    const veil = veilRef.current;
    const zoom = zoomRef.current;
    if (!loading || !veil || !zoom) return;
    setupGsap();
    const html = document.documentElement;
    const revisit = html.classList.contains("tp-revisit");

    if (isReduced()) {
      loading.style.display = "none";
      veil.style.display = "none";
      setStarted(true);
      try {
        localStorage.setItem(VISIT_KEY, String(Date.now()));
      } catch {}
      return;
    }

    // LOADING... の文字（#1 → #2）
    const chars = Array.from(loading.querySelectorAll<HTMLElement>(".tp-loading__char"));
    gsap.set(chars, { transformOrigin: "50% 100%" });
    // #1 は CSS の keyframes（JS を待たず表示直後から動く）。ここでは #2 の波だけ
    const lt = gsap.timeline({ delay: 1.025 });
    const wave = gsap.timeline({ repeat: -1, repeatDelay: 0.65 });
    const logo = loading.querySelector<HTMLElement>(".tp-loading__logo");
    if (logo) {
      gsap.set(logo, { transformOrigin: "50% 100%" });
      // 英字の波の少し前に、ロゴが縦に伸びて上がって戻る
      wave.to(logo, { keyframes: { "0%": { scaleY: 1, y: 0 }, "50%": { scaleY: 1.08, y: -8 }, "100%": { scaleY: 1, y: 0 } }, duration: 0.4, ease: "none" }, 0);
    }
    wave.to(chars, {
      keyframes: { "0%": { scaleY: 1, y: 0 }, "50%": { scaleY: 1.15, y: -2 }, "100%": { scaleY: 1, y: 0 } },
      duration: 0.4,
      ease: "none",
      stagger: 0.025,
    }, 0.1);
    lt.add(wave);

    const copy = veil.querySelector<HTMLElement>("[data-copy]");
    let tl: gsap.core.Timeline | null = null;
    const start = () => {
      // お手本は load から 0.1〜0.3秒遅れて動き出す（連続写真の実測）。間を取って 0.15秒
      tl = gsap.timeline({ delay: 0.15 });
      // #3 ローディングの幕
      tl.to(loading, { opacity: 0, duration: 0.4, ease: "tpEase" }, 0);
      tl.set(loading, { display: "none" }, 0.4);
      tl.call(() => {
        lt.kill();
      }, [], 0.4);
      if (!revisit && copy) {
        // #4 キャッチが弾んで出る
        tl.fromTo(
          copy,
          { opacity: 0, scale: 1.35, rotate: 1.5 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: EASE.copyIn },
          0.4
        );
        // #6 白い幕に丸い穴
        tl.to(veil, { "--tp-mi": "100%", "--tp-mo": "150%", duration: 0.8, ease: "tpVeil" }, 1.4);
        tl.set(veil, { display: "none" }, 2.2);
      } else {
        tl.set(veil, { display: "none" }, 0);
      }
      // #7 ヒーロー写真 1.4倍 → 1倍
      tl.fromTo(zoom, { scale: 1.4 }, { scale: 1, duration: 3, ease: "tpInOut" }, 0.6);
      // #5 自動切替の開始
      tl.call(() => setStarted(true), [], 1.4);
      try {
        localStorage.setItem(VISIT_KEY, String(Date.now()));
      } catch {}
    };
    // 始まりの合図: load か「ヒーローの1枚目と文字が揃った」の早い方（3周目）。
    // load だけを待つと、画面の近くにある遅延読み込みの絵まで待つことになり、4G 相当で 11〜20秒ローディングのままだった
    let fired = false;
    const startOnce = () => {
      if (fired) return;
      fired = true;
      window.removeEventListener("load", startOnce);
      clearTimeout(fallback);
      start();
    };
    let fallback = 0;
    if (document.readyState === "complete") startOnce();
    else {
      window.addEventListener("load", startOnce, { once: true });
      fallback = window.setTimeout(startOnce, 8000);
      const first = zoom.querySelector<HTMLImageElement>("img");
      const imgReady = new Promise<void>((res) => {
        if (!first || first.complete) return res();
        first.addEventListener("load", () => res(), { once: true });
        first.addEventListener("error", () => res(), { once: true });
      });
      // 文字はキャッチと小見出しに使う字だけ待つ（fonts.ready は日本語の字の範囲ごとの全ファイルを待つので 2〜3秒遅れた）
      const catchEl = veil.querySelector<HTMLElement>(".tp-catch");
      const fontReady =
        document.fonts && catchEl
          ? document.fonts.load(`1em ${getComputedStyle(catchEl).fontFamily}`, veil.textContent || "").catch(() => undefined)
          : Promise.resolve();
      Promise.all([imgReady, fontReady]).then(startOnce);
    }
    return () => {
      fired = true;
      window.removeEventListener("load", startOnce);
      clearTimeout(fallback);
      lt.kill();
      tl?.kill();
    };
  }, []);

  // #8 写真の自動切替（1枚 5秒）
  useEffect(() => {
    // 動きを減らす設定の時は写真を切り替えない（1枚目のまま）
    if (!started || isReduced()) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [started]);

  return (
    <>
      <section className="tp-hero" id="top" aria-label="ALPACA AI顧問">
        <svg className="tp-hero__svg" width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="tp-wave" clipPathUnits="objectBoundingBox">
              <path d="M0,0 H1 V0.905 C0.94,0.95 0.88,0.975 0.8,0.955 C0.71,0.93 0.64,0.87 0.54,0.9 C0.44,0.93 0.4,0.99 0.29,0.985 C0.19,0.98 0.13,0.92 0.06,0.925 C0.035,0.927 0.015,0.94 0,0.95 Z" />
            </clipPath>
          </defs>
        </svg>
        <div className="tp-hero__media">
          <div className="tp-hero__zoom" ref={zoomRef}>
            {SLIDES.map((s, i) => (
              <div
                key={s.id}
                className={`tp-hero__slide ${i === active ? "is-shown" : ""} ${started && i === active ? "is-active" : ""}`}
              >
                <div className="tp-hero__kb">
                  {/* 2・3枚目は切り替えが始まってから読む（最初の読み込みを 1枚目だけにする。1枚目が見えている 5秒の間に届く） */}
                  <Slot id={s.id} label={s.label} tone={s.tone} src={i === 0 || started ? s.src : undefined} srcSp={s.srcSp} spMedia="(max-width: 767px), (max-width: 1023px) and (orientation: portrait)" alt={s.alt} cover className="tp-hero__slot" eager={i === 0} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Copy />
        <div className="tp-hero__cta">
          <a href="#contact" className="tp-btn tp-btn--main" data-scroll>
            <span>まずは30分、話してみる</span>
            <span className="tp-btn__sub">無料相談</span>
            <span className="tp-btn__arrow" aria-hidden="true" />
          </a>
        </div>
        <ul className="tp-hero__dots" aria-hidden="true">
          {SLIDES.map((s, i) => (
            <li key={s.id} className={i === active ? "is-active" : ""} />
          ))}
        </ul>
      </section>

      {/* 白い幕（初回訪問だけ）。幕の上の黒いコピーと、写真の上の白いコピーを重ねてある */}
      <div className="tp-veil" ref={veilRef} aria-hidden="true">
        <div className="tp-veil__box">
          <Copy veil />
        </div>
      </div>

      {/* ローディング */}
      <div className="tp-loading" ref={loadingRef} aria-hidden="true">
        {/* ロゴ（ALPACA の A のマーク）。英字と同じく、下端を軸に弾んで出て（#1）、波に合わせて弾み続ける（#2） */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="tp-loading__logo" data-slot="L01" src="/images/top/logo-mark-lg.webp" alt="" width={557} height={552} decoding="async" />
        <p className="tp-loading__txt">
          {LOADING.split("").map((c, i) => (
            <span key={i} className="tp-loading__char" style={{ animationDelay: `${i * 0.025}s` }}>
              {c}
            </span>
          ))}
        </p>
      </div>
    </>
  );
}
