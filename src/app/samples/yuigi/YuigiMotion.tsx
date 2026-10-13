"use client";

import { useEffect } from "react";

// 結木工務店の動き（10/13 総チェック）
// ・上の帯：一番上の写真を過ぎたら、地の色の細い帯になって画面に付いてくる
// ・背景の風の線：スクロールに合わせて左から引かれていく（clipPath の幅を伸ばす）
// ・平屋の左右の写真：少し違う速さで動く（±30px）／床の横長写真：ゆっくり横に流れる
export default function YuigiMotion() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(".yg-bar");
    const hero = document.querySelector<HTMLElement>(".yg-hero");
    const svg = document.querySelector<SVGSVGElement>(".yg-curve");
    const clips = Array.from(document.querySelectorAll<SVGRectElement>(".yg-curve__clip"));
    const sides = Array.from(document.querySelectorAll<HTMLElement>(".yg-brand__side"));
    const wide = document.querySelector<HTMLElement>(".yg-wide img");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 線の高さ（viewBox 0 0 1440 4200 の中の y）
    const LINE_Y = [900, 2350, 3500];
    const FULL = 1560;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      if (bar && hero) {
        const past = window.scrollY > hero.offsetTop + hero.offsetHeight - 90;
        bar.classList.toggle("is-solid", past);
      }
      if (svg && clips.length) {
        const r = svg.getBoundingClientRect();
        clips.forEach((c, i) => {
          if (reduce) {
            c.setAttribute("width", String(FULL));
            return;
          }
          const y = r.top + (LINE_Y[i] / 4200) * r.height;
          // 線が画面の下から入って、画面の3割の高さに来るまでに引き終える
          const p = Math.min(1, Math.max(0, (vh - y) / (vh * 0.7)));
          c.setAttribute("width", String(Math.round(FULL * p)));
        });
      }
      if (reduce) return;
      sides.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const mid = (r.top + r.height / 2 - vh / 2) / vh; // 画面の真ん中で0
        const d = Math.max(-1, Math.min(1, mid)) * 30 * (i === 0 ? 1 : -1);
        el.style.translate = `0 ${d.toFixed(1)}px`;
      });
      if (wide) {
        const r = wide.parentElement!.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        wide.style.translate = `${(-p * 8).toFixed(2)}% 0`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
