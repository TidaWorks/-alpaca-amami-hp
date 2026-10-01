"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * トップの動きをまとめて付ける（DIRECTION.md の1〜5）。
 * prefers-reduced-motion の人には何もしない。CSS は動かない時の最後の形が既定。
 */
export default function AwMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    if (reduced) {
      root.classList.remove("aw-anim");
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    // 動きの仕組みが起きた印（page.tsx の安全装置が、これが無い時だけ隠した形を解く）
    root.classList.add("aw-js-ok");

    // なめらかなスクロール（ページ内リンクはヘッダーの高さ分ずらして止める）
    const lenis = new Lenis({ duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 4), anchors: { offset: -72 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const q = <T extends Element = HTMLElement>(s: string) => gsap.utils.toArray<T>(s);
      const ease = "expo.out";

      // 1. 一番上: 一文 → 組織表の罫線 → 空席に朱の線 → ALPACA
      const tl = gsap.timeline({ defaults: { ease } });
      // CSS（html.aw-anim）で隠した最初の形と同じ値を from に書く。終わったら CSS の最後の形に戻す
      tl.fromTo(q('[data-hero="meta"]'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.1)
        .fromTo(q('[data-hero="chunk"]'), { yPercent: 112, y: 0 }, { yPercent: 0, duration: 1.3, stagger: 0.09 }, 0.15)
        .fromTo(q('[data-hero="lead"]'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, 0.8)
;
      // 組織表はスマホだと一番上の画面の外にある。画面に入った時に始める（PC は最初から見えているのですぐ始まる）
      const roster = gsap.timeline({
        defaults: { ease },
        paused: true,
      });
      roster
        .fromTo(q('[data-hero="cap"]'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0)
        .fromTo(q('[data-hero="rule"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.08, ease: "power3.inOut" }, 0.05)
        .fromTo(q('[data-hero="row"]'), { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.08 }, 0.1)
        .fromTo(q('[data-hero="strike"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power2.in" }, 0.95)
        .fromTo(q('[data-hero="empty"]'), { opacity: 1 }, { opacity: 0.4, duration: 0.3 }, 1.35)
        .fromTo(
          q('[data-hero="name"]'),
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "steps(6)" },
          1.45
        )
        .fromTo(q('[data-hero="itnote"]'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.95);
      const rosterEl = document.querySelector(".aw-roster");
      if (rosterEl) {
        ScrollTrigger.create({
          trigger: rosterEl,
          start: "top 80%",
          once: true,
          onEnter: () => gsap.delayedCall(Math.max(0, 0.95 - tl.time()), () => roster.play()),
        });
      }

      // 2. 見出しや本文: 画面に入ったら下から
      q("[data-rise]").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 1.1,
          ease,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // 3. 罫線: 左から引く
      q("[data-line]").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      // 4. 社長の言葉: 画面の真ん中に来た1つだけ墨にする
      q("[data-voice]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 62%",
          end: "bottom 38%",
          toggleClass: { targets: el, className: "is-on" },
        });
      });

      // 5. 毎月の流れ: 線がスクロールに合わせて朱で伸びる。通った段の点を朱に
      const track = document.querySelector<HTMLElement>("[data-flow]");
      const bar = document.querySelector<HTMLElement>("[data-flow-bar]");
      if (track && bar) {
        const vertical = () => window.matchMedia("(max-width: 899px)").matches;
        gsap.fromTo(
          bar,
          { scaleX: () => (vertical() ? 1 : 0), scaleY: () => (vertical() ? 0 : 1) },
          {
            scaleX: 1,
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: track, start: "top 70%", end: "bottom 60%", scrub: 0.6, invalidateOnRefresh: true },
          }
        );
        q("[data-flow-step]").forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: () => (vertical() ? "top 62%" : "top 70%"),
            toggleClass: { targets: el, className: "is-on" },
            invalidateOnRefresh: true,
          });
        });
      }

      // 7. 足もとの屋号: 下からせり上がる
      const word = document.querySelector("[data-word]");
      if (word) {
        gsap.from(word, {
          yPercent: 70,
          duration: 1.6,
          ease,
          scrollTrigger: { trigger: word, start: "top 95%", once: true },
        });
      }

      // 6. ロゴの A: ゆっくり上へずらす（奥行き）
      const mark = document.querySelector("[data-mark]");
      if (mark) {
        gsap.fromTo(
          mark,
          { yPercent: 8 },
          { yPercent: -8, ease: "none", scrollTrigger: { trigger: mark, start: "top bottom", end: "bottom top", scrub: true } }
        );
      }
    });

    // 字の読み込みで高さが変わったら測り直す
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
