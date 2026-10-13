"use client";

import { useEffect } from "react";

// [data-drift] の区画が画面を通る間、--drift を -1〜1 で渡す。写真をゆっくり縦にずらすのに使う（動きは CSS 側）
export default function Drift() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-drift]"));
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const p = (vh - r.top) / (vh + r.height);
        const d = Math.max(-1, Math.min(1, p * 2 - 1));
        el.style.setProperty("--drift", d.toFixed(3));
      }
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
