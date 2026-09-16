"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * 旅するこどもの保育園（みどり保育園への提案LP）
 *
 * 2026-09-16: スクロール演出を追加。見た目（止まっている時）は演出追加前と同じ。
 *   位置とセクションの高さは vw を cqw に置き換えてあるが、幅の上限を付けて
 *   いないので cqw は vw と同じ値になる＝表示は変わらない。
 *   文字の大きさは元のまま（小さい文字は固定px＋md で切り替え、見出しと
 *   「あそぶ。」は clamp）。ここを cqw にすると PC で文字が膨張して
 *   砂浜の文が枠から溢れる不具合が出たので戻した。
 *
 * 【動き】POKKE のLP（大地さん提供の動画）から採った演出のうち、
 *   止まっている時の見た目を変えない3つ:
 *   ① 紙色の面が丸い境界でせり上がる（元からある白い楕円を動かす）
 *   ⑥ 見出しが1行ずつ遅れて出る
 *   ⑦ 写真が少し拡大しながら出る
 *   ⑤（横に流れ続ける帯）は新しい要素を足すことになるので入れていない。
 *
 * イージングは docs/research/css-motions-yui540/ のカタログより:
 *   転換 cubic-bezier(0.87,0.05,0.02,0.97) / カーテン cubic-bezier(0.96,0.01,0.01,1)
 *
 * 出現の判定に IntersectionObserver を使わないのは、一気にスクロールされた時に
 * 途中の要素が呼ばれず透明のまま残る（＝文章が消える）事故が起きたため。
 */

const imagePath = "/images/demo/nursery/";
const lineUrl = "#inquiry"; // 公開時に園の公式LINE URLへ置換

export default function NurseryPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const all = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

    // 動きを減らす設定の人には最初から全部見えている状態にする
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      all.forEach((el) => el.classList.add("is-shown"));
      return;
    }

    let pending = all;
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = window.innerHeight;
      pending = pending.filter((el) => {
        const r = el.getBoundingClientRect();
        // 画面に入った、もしくは既に通り過ぎたものは出す
        if (r.top < vh * 0.92) {
          el.classList.add("is-shown");
          return false;
        }
        return true;
      });
      if (pending.length === 0) detach();
    };
    const onMove = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    const detach = () => {
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
    };
    check();
    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);
    return () => {
      detach();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="nm-outer">
      <style>{css}</style>

      <main className="nm-stage">
        {/* ── 導入 ───────────────────────────────── */}
        <section className="nm-s1">
          <div className="nm-hero-photo-wrap">
            <div className="nm-hero-photo" data-reveal>
              <Image
                src={`${imagePath}hero-entry-v1.png`}
                alt="保育スタッフに迎えられるお子さま"
                fill
                priority
                sizes="100vw"
                className="nm-cover-hero"
              />
            </div>
            <div className="nm-hero-mask" />
            <div className="nm-hero-note" data-reveal style={{ ["--d" as string]: "120ms" }}>
              あまみで、
              <br />
              子どもも、旅をする。
              <span className="nm-rule" />
              旅のあいだ、
              <br />
              あずけられる、
              <br />
              もうひとつの居場所。
            </div>
          </div>

          {/* ① 紙色の面が丸い境界でせり上がる */}
          <div className="nm-ellipse" data-reveal />

          <h1 className="nm-title">
            <span data-reveal style={{ ["--d" as string]: "0ms" }}>旅する</span>
            <span data-reveal style={{ ["--d" as string]: "110ms" }}>こどもの</span>
            <span data-reveal style={{ ["--d" as string]: "220ms" }}>保育園</span>
          </h1>

          <p className="nm-sub" data-reveal style={{ ["--d" as string]: "260ms" }}>
            あまみの
            <br />
            やさしさに、
            <br />
            あずけてみる。
          </p>

          <p className="nm-hand-a" data-reveal style={{ ["--d" as string]: "320ms" }}>
            ここにも、
            <br />
            こんな時間がある。
          </p>

          <div className="nm-polaroid" data-reveal style={{ ["--d" as string]: "200ms" }}>
            <Image
              src={`${imagePath}amami-coast-v1.png`}
              alt="奄美の海"
              width={1536}
              height={1024}
              loading="eager"
              sizes="32vw"
              className="nm-polaroid-img"
            />
          </div>
        </section>

        {/* ── あそぶ。たべる。みつける。 ──────────────── */}
        <section className="nm-s2">
          <div className="nm-s2-photo" data-reveal>
            <Image
              src={`${imagePath}children-playing-v1.png`}
              alt="園で遊ぶ子どもたち"
              fill
              loading="eager"
              sizes="56vw"
              className="nm-cover"
            />
          </div>

          <p className="nm-s2-coral">
            <span data-reveal style={{ ["--d" as string]: "0ms" }}>あそぶ。</span>
            <span data-reveal style={{ ["--d" as string]: "110ms" }}>たべる。</span>
            <span data-reveal style={{ ["--d" as string]: "220ms" }}>みつける。</span>
          </p>

          <p className="nm-s2-body" data-reveal style={{ ["--d" as string]: "280ms" }}>
            島の自然のなかで、こどもたちは、旅人であり、まいにちが発見です。
          </p>

          <div className="nm-s2-hand" data-reveal style={{ ["--d" as string]: "340ms" }}>
            はじめての地も、
            <br />
            どうぞ気軽に。
          </div>

          <a href={lineUrl} className="nm-cta" data-reveal style={{ ["--d" as string]: "180ms" }}>
            LINEで気軽に問い合わせる <span className="nm-cta-arrow">→</span>
          </a>

          <div className="nm-hibiscus" data-reveal style={{ ["--d" as string]: "400ms" }}>
            <Hibiscus />
          </div>
        </section>

        {/* ── 締め ──────────────────────────────── */}
        <section id="inquiry" className="nm-s3">
          <Image
            src={`${imagePath}amami-beach-v1.png`}
            alt="奄美の砂浜と海"
            fill
            loading="eager"
            sizes="100vw"
            className="nm-cover-beach"
          />
          <div className="nm-s3-tint" />
          <div className="nm-s3-lead" data-reveal>
            あまみで出会う、
            <br />
            もうひとつの、家族のかたち。
            <span className="nm-rule nm-rule-s3" />
          </div>
          <p className="nm-s3-foot" data-reveal style={{ ["--d" as string]: "140ms" }}>
            こどもたちの、
            <br />
            やさしい旅の思い出を、ここから。
          </p>
        </section>
      </main>
    </div>
  );
}

function Hibiscus() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M48 48C21 45 12 20 29 13c13-6 23 6 25 24C59 17 77 10 87 23c9 13-5 25-24 28 20 5 24 24 9 32-14 7-24-7-25-24-8 19-26 22-33 9-7-14 7-22 25-22Z" />
      <path d="M48 48c8 12 14 24 13 43M61 91l-6-5M61 91l5-6" />
      <circle cx="49" cy="48" r="4" />
    </svg>
  );
}

const css = `
.nm-outer{
  --paper:#fcfaf5;
  --ink:#092d55;
  --ink-hover:#154c7c;
  --coral:#d65f4d;
  min-height:100vh;
  background:var(--paper);
}
/* 幅の上限は付けない。元のページは clamp の上限（h1 は 6.4rem）で PC でも
   収まっていて崩れていなかった。上限を付けると左右が余って元より窮屈になる。
   container-type だけ残すのは cqw の指定を効かせるため（全幅なので cqw = vw）。 */
.nm-stage{
  container-type:inline-size;
  width:100%;
  background:var(--paper);
  color:var(--ink);
  font-family:var(--font-shippori-gothic),sans-serif;
  overflow:hidden;
  position:relative;
}
.nm-outer *{box-sizing:border-box;}

/* 出現（⑥⑦）。JS が動かない時は見えたままなので、文章が消える事故にならない */
.nm-stage [data-reveal]{
  opacity:0;
  transform:translateY(12px);
  transition:opacity .8s cubic-bezier(0.87,0.05,0.02,0.97) var(--d,0ms),
             transform .8s cubic-bezier(0.87,0.05,0.02,0.97) var(--d,0ms);
}
.nm-stage [data-reveal].is-shown{opacity:1;transform:none;}
/* ⑦ 写真は少し拡大しながら */
.nm-hero-photo[data-reveal],.nm-s2-photo[data-reveal],.nm-polaroid[data-reveal]{
  transform:translateY(12px) scale(1.04);
}
.nm-hero-photo[data-reveal].is-shown,.nm-s2-photo[data-reveal].is-shown{transform:none;}
.nm-polaroid[data-reveal].is-shown{transform:rotate(-5deg);}
@media (prefers-reduced-motion: reduce){
  .nm-stage [data-reveal]{opacity:1 !important;transform:none !important;transition:none !important;}
  .nm-polaroid[data-reveal]{transform:rotate(-5deg) !important;}
}

/* ── 導入 ── */
.nm-s1{position:relative;height:130cqw;overflow:hidden;}
.nm-hero-photo-wrap{position:absolute;left:0;right:0;top:0;height:96cqw;overflow:hidden;}
.nm-hero-photo{position:absolute;inset:0;}
.nm-cover-hero{object-fit:cover;object-position:58% 48%;}
.nm-cover{object-fit:cover;}
.nm-cover-beach{object-fit:cover;object-position:48% 60%;}
.nm-hero-mask{position:absolute;left:0;top:0;height:72%;width:24.5%;background:var(--paper);}
.nm-hero-note{
  position:absolute;left:4.5%;top:5%;width:16%;
  font-size:9px;font-weight:500;line-height:1.95;letter-spacing:.04em;color:var(--ink);
}
.nm-rule{display:block;height:1px;width:20px;background:var(--ink);margin:16px 0;}

/* ① 丸い境界の面。下からせり上がってくる */
.nm-ellipse{
  position:absolute;left:-62cqw;top:61cqw;height:83cqw;width:188cqw;
  border-radius:50%;background:var(--paper);
}
.nm-ellipse[data-reveal]{transform:translateY(7cqw);}
.nm-ellipse[data-reveal].is-shown{
  transform:translateY(0);
  transition:transform 1.05s cubic-bezier(0.96,0.01,0.01,1),opacity .3s linear;
}

.nm-title{
  position:absolute;left:3.5%;top:75cqw;margin:0;
  font-family:var(--font-shippori-mincho),serif;font-weight:400;
  font-size:clamp(3.2rem,13.8cqw,6.4rem);line-height:1.18;letter-spacing:-.13em;
}
.nm-title span{display:block;}
.nm-sub{
  position:absolute;left:52%;top:113cqw;width:15%;margin:0;
  font-family:var(--font-shippori-mincho),serif;font-weight:400;
  font-size:9px;line-height:1.85;letter-spacing:.07em;
}
.nm-hand-a{
  position:absolute;left:70%;top:102cqw;margin:0;transform:rotate(-9deg);
  font-family:var(--font-zen-kurenaido),serif;font-size:10px;line-height:1.55;color:var(--coral);
}
.nm-hand-a[data-reveal]{transform:rotate(-9deg) translateY(12px);}
.nm-hand-a[data-reveal].is-shown{transform:rotate(-9deg);}
.nm-polaroid{
  position:absolute;right:-1%;top:109cqw;width:31%;
  transform:rotate(-5deg);overflow:hidden;
  border:3px solid var(--paper);
  box-shadow:0 8px 18px rgba(9,45,85,.1);
}
.nm-polaroid-img{height:auto;width:100%;}

/* ── あそぶ。たべる。みつける。 ── */
.nm-s2{position:relative;height:48cqw;background:var(--paper);}
.nm-s2-photo{position:absolute;left:0;top:0;height:31cqw;width:56%;overflow:hidden;}
.nm-s2-coral{
  position:absolute;left:61%;top:2cqw;margin:0;
  font-family:var(--font-zen-kurenaido),serif;font-size:clamp(1.1rem,4cqw,2.1rem);
  line-height:1.45;color:var(--coral);
}
.nm-s2-coral span{display:block;}
.nm-s2-body{
  position:absolute;left:61%;top:23cqw;width:35%;margin:0;
  font-size:9px;font-weight:500;line-height:1.9;color:var(--ink);
}
.nm-s2-hand{
  position:absolute;left:79%;top:36cqw;width:19%;white-space:nowrap;transform:rotate(-6deg);
  font-family:var(--font-zen-kurenaido),serif;font-size:9px;line-height:1.55;
}
.nm-s2-hand[data-reveal]{transform:rotate(-6deg) translateY(12px);}
.nm-s2-hand[data-reveal].is-shown{transform:rotate(-6deg);}
.nm-cta{
  position:absolute;left:4.3%;top:35cqw;height:9.5cqw;width:55.5%;
  display:flex;align-items:center;justify-content:space-between;padding:0 5%;
  background:var(--ink);color:#fff;text-decoration:none;
  font-size:11px;font-weight:700;letter-spacing:.07em;
  transition:background .2s ease;
}
.nm-cta:hover{background:var(--ink-hover);}
.nm-cta-arrow{font-size:18px;font-weight:400;}
.nm-hibiscus{position:absolute;right:21%;top:36cqw;height:12cqw;width:12cqw;color:var(--ink);opacity:.9;}
.nm-hibiscus svg{width:100%;height:100%;}

/* ── 締め ── */
.nm-s3{position:relative;height:31cqw;min-height:121px;max-height:170px;overflow:hidden;color:var(--ink);}
.nm-s3-tint{position:absolute;inset:0;background:rgba(215,244,239,.15);}
.nm-s3-lead{
  position:absolute;left:5%;top:16%;
  font-family:var(--font-shippori-mincho),serif;font-weight:400;
  font-size:11px;line-height:1.85;letter-spacing:.07em;
}
.nm-rule-s3{width:24px;margin:12px 0 0;}
.nm-s3-foot{
  position:absolute;left:5%;bottom:10%;margin:0;
  font-family:var(--font-shippori-mincho),serif;font-weight:400;
  font-size:8px;line-height:1.8;
}

/* PC は元のページと同じ切り替え（Tailwind の md = 768px 以上） */
@media (min-width:768px){
  .nm-hero-note,.nm-sub{font-size:14px;}
  .nm-hand-a,.nm-s2-body,.nm-s2-hand,.nm-cta,.nm-s3-lead{font-size:16px;}
  .nm-s3-foot{font-size:12px;}
}
`;
