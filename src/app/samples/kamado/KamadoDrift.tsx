"use client";

import { useEffect } from "react";

// [data-drift="0.1"] の付いた写真を、スクロールに合わせて少しだけ上下にずらす（散らした小さな写真用）
export default function KamadoDrift() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-drift]"));
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const k = parseFloat(el.dataset.drift || "0.1");
        const d = (r.top + r.height / 2 - vh / 2) * k;
        el.style.setProperty("--drift", `${(-d).toFixed(1)}px`);
      });
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
