"use client";

import { useEffect, useRef } from "react";
import { setupGsap, gsap, EASE, isReduced } from "./motion";
import { createHeroScene, type HeroScene } from "./heroScene";

const VISIT_KEY = "tp-visited";
const LOADING = "LOADING...";

function Copy({ veil }: { veil?: boolean }) {
  return (
    <div className={`tp-hero__copy ${veil ? "tp-hero__copy--veil" : ""}`}>
      <div className="tp-hero__copyin" data-copy>
        {veil ? (
          <p className="tp-catch" aria-hidden="true">
            <span>会社の仕事に、</span>
            <span className="tp-catch__mark">AIの手を。</span>
          </p>
        ) : (
          <h1 className="tp-catch">
            <span>会社の仕事に、</span>
            <span className="tp-catch__mark">AIの手を。</span>
          </h1>
        )}
        <p className="tp-hero__lead" aria-hidden={veil ? "true" : undefined}>
          <span>奄美・鹿児島の会社と一緒に、</span>
          <span>AIに任せられる仕事を</span>
          <span>毎月ひとつずつ増やしていく顧問です。</span>
        </p>
        {/* 幕の上の文字と写真の上の文字の位置をそろえるため、幕の側にも同じ大きさの見えないボタンを置く */}
        {veil ? (
          <span className="tp-hero__cta tp-hero__cta--ghost" aria-hidden="true">
            <span className="tp-btn tp-btn--main">
              <span>まずは30分、話してみる</span>
              <span className="tp-btn__sub">無料相談</span>
              <span className="tp-btn__arrow" />
            </span>
          </span>
        ) : (
          <span className="tp-hero__cta">
            <a href="#contact" className="tp-btn tp-btn--main" data-scroll>
              <span>まずは30分、話してみる</span>
              <span className="tp-btn__sub">無料相談</span>
              <span className="tp-btn__arrow" aria-hidden="true" />
            </a>
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * ローディング（#1 #2 #3）→ 白い幕に黒いコピー（#4）→ 丸い穴（#6）→ ヒーロー（コードで描く絵。heroScene.ts）
 */
export default function Hero() {
  const loadingRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // オープニング
  useEffect(() => {
    const loading = loadingRef.current;
    const veil = veilRef.current;
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!loading || !veil || !hero || !canvas || !stage) return;
    setupGsap();
    const html = document.documentElement;
    const revisit = html.classList.contains("tp-revisit");
    // ファーストビューの絵（全部コード）。動きを減らす設定では止まった1枚
    const scene: HeroScene = createHeroScene(canvas, stage, hero, isReduced());

    if (isReduced()) {
      loading.style.display = "none";
      veil.style.display = "none";
      try {
        localStorage.setItem(VISIT_KEY, String(Date.now()));
      } catch {}
      return () => scene.destroy();
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
        // 絵の登場: 丸い穴が開き切る少し前から A を描き始める（穴は後半に速く開くので、早く始めると線が幕に隠れる）
        tl.call(() => scene.play(), [], 1.95);
      } else {
        tl.set(veil, { display: "none" }, 0);
        tl.call(() => scene.play(), [], 0.2);
      }
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
      // 文字はキャッチと小見出しに使う字だけ待つ（fonts.ready は日本語の字の範囲ごとの全ファイルを待つので 2〜3秒遅れた）
      const catchEl = veil.querySelector<HTMLElement>(".tp-catch");
      const fontReady =
        document.fonts && catchEl
          ? document.fonts.load(`1em ${getComputedStyle(catchEl).fontFamily}`, veil.textContent || "").catch(() => undefined)
          : Promise.resolve();
      // ヒーローの絵はコードで描くので、待つのはキャッチの字だけ
      fontReady.then(startOnce);
    }
    return () => {
      fired = true;
      window.removeEventListener("load", startOnce);
      clearTimeout(fallback);
      lt.kill();
      tl?.kill();
      scene.destroy();
    };
  }, []);

  return (
    <>
      <section className="tp-hero" id="top" aria-label="ALPACA AI顧問" ref={heroRef}>
        <svg className="tp-hero__svg" width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="tp-wave" clipPathUnits="objectBoundingBox">
              <path d="M0,0 H1 V0.905 C0.94,0.95 0.88,0.975 0.8,0.955 C0.71,0.93 0.64,0.87 0.54,0.9 C0.44,0.93 0.4,0.99 0.29,0.985 C0.19,0.98 0.13,0.92 0.06,0.925 C0.035,0.927 0.015,0.94 0,0.95 Z" />
            </clipPath>
          </defs>
        </svg>
        <div className="tp-hero__media">
          {/* 絵を置く範囲（位置と大きさは CSS で決め、絵はここを基準に描く） */}
          <div className="tp-hero__stage" ref={stageRef} aria-hidden="true" />
          <canvas className="tp-hero__canvas" ref={canvasRef} aria-hidden="true" />
        </div>
        <Copy />
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
