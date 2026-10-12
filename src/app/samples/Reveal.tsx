"use client";

import { useEffect } from "react";

// [data-rv] の付いた物が画面に入ったら is-in を付ける（見本サイト共通）。動きは各サイトの CSS で決める
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-rv]"));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    // 読み込み直後に見えている物は先に出す（スクショ・遅い端末で白いまま残らないように）
    const t = window.setTimeout(() => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-in");
      });
    }, 60);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);
  return null;
}
