"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getYou, subscribeYou } from "./store";

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

    const cleanups: (() => void)[] = [];
    const ctx = gsap.context(() => {
      const q = <T extends Element = HTMLElement>(s: string) => gsap.utils.toArray<T>(s);
      const ease = "expo.out";

      // 1. 一番上: 一文 → 組織表の罫線 → 空席に朱の線 → ALPACA
      const tl = gsap.timeline({ defaults: { ease } });
      // CSS（html.aw-anim）で隠した最初の形と同じ値を from に書く。終わったら CSS の最後の形に戻す
      tl.fromTo(q('[data-hero="meta"]'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.1)
        .fromTo(q('[data-hero="chunk"]'), { yPercent: 112, y: 0 }, { yPercent: 0, duration: 1.3, stagger: 0.09 }, 0.15)
        .fromTo(q('[data-hero="lead"]'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, 0.8)
        .fromTo(q('[data-hero="under"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, 1.5)
;
      // 組織表: 罫線と行は開いた時に引く。「空席に ALPACA が座る」は、名前を入れた時（aw:seat の合図）に起こす。
      // 何も入れずに読み進める人には、スクロールし始めた所で起こす
      const roster = gsap.timeline({ defaults: { ease }, paused: true });
      roster
        .fromTo(q('[data-hero="cap"]'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0)
        .fromTo(q('[data-hero="rule"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.08, ease: "power3.inOut" }, 0.05)
        .fromTo(q('[data-hero="row"]'), { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.08 }, 0.1);
      const nameEl = document.querySelector('[data-hero="name"]');
      const rosterEl = document.querySelector(".aw-roster");
      const seat = gsap.timeline({ defaults: { ease }, paused: true });
      seat
        .fromTo(q('[data-hero="strike"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: "power2.in" }, 0)
        .fromTo(q('[data-hero="empty"]'), { opacity: 1 }, { opacity: 0.5, duration: 0.3 }, 0.35)
        .call(() => nameEl?.classList.add("is-typing"), [], 0.4)
        .fromTo(q('[data-hero="letter"]'), { display: "none" }, { display: "inline", duration: 0.01, stagger: 0.1 }, 0.5)
        .fromTo(q('[data-hero="itnote"]'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.15)
        .call(() => nameEl?.classList.remove("is-typing"), [], 2.0);
      let seated = false;
      const playSeat = () => {
        seated = true;
        rosterEl?.classList.add("is-seated");
        // 行が出そろってから座る（開いてすぐ合図が来た時のため）
        gsap.delayedCall(Math.max(0, 0.9 - roster.time()), () => seat.restart());
      };
      window.addEventListener("aw:seat", playSeat);
      // 同じタブで前に入れた人: 合図はこの部品が起きる前に飛んでいるので、ここで拾う
      if (getYou().step === 1) playSeat();
      const onFirstScroll = () => {
        if (seated || window.scrollY < 40) return;
        // 入力中（スマホでキーボードが出て画面が動いた時）は起こさない
        if ((document.activeElement as HTMLElement | null)?.classList.contains("aw-ask__input")) return;
        playSeat();
      };
      window.addEventListener("scroll", onFirstScroll, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("aw:seat", playSeat);
        window.removeEventListener("scroll", onFirstScroll);
      });
      if (rosterEl) {
        ScrollTrigger.create({
          trigger: rosterEl,
          start: "top 90%",
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

      // 2b. 仕事の大きな名前: スクロールに合わせて右から定位置へ
      q("[data-slide]").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: 4, opacity: 0.2 },
          { xPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 98%", end: "top 62%", scrub: 0.6 } }
        );
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

      // 5. 毎月の流れ: 輪の朱の弧がスクロールに合わせて伸び、今の段だけ濃くする
      const flow = document.querySelector<HTMLElement>("[data-flow]");
      const prog = document.querySelector<SVGPathElement>("[data-flow-bar]");
      const list = document.querySelector<HTMLElement>(".aw-flow__list");
      if (flow && prog && list) {
        const steps = q("[data-flow-step]");
        const dots = q<SVGRectElement>("[data-flow-dot]");
        const setActive = (i: number | null) => {
          if (i === null) delete flow.dataset.active;
          else flow.dataset.active = String(i);
          steps.forEach((el, k) => el.classList.toggle("is-on", k === i));
          dots.forEach((el, k) => el.classList.toggle("is-on", i !== null && k <= i));
        };
        gsap.fromTo(
          prog,
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: list, start: "top 55%", end: "bottom 55%", scrub: 0.5 } }
        );
        steps.forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
            onLeaveBack: () => i === 0 && setActive(null),
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

      // 6. ロゴの A: 下の罫線の向こうからせり上がって、線の上に立つ
      const mark = document.querySelector("[data-mark]");
      if (mark) {
        gsap.from(mark, {
          yPercent: 40,
          duration: 1.8,
          ease,
          scrollTrigger: { trigger: mark, start: "top 80%", once: true },
        });
      }
    });

    // 字の読み込みで高さが変わったら測り直す
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    // 名前や困りごとで下の段の高さと並びが変わるので、そのたびに測り直す
    let raf = 0;
    cleanups.push(
      subscribeYou(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
      })
    );

    return () => {
      cleanups.forEach((f) => f());
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
