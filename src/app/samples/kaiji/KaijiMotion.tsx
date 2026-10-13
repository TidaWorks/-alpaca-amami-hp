"use client";

import { useEffect, useState } from "react";

const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// 今日の海の日付（奄美の時刻で、開いた日の日付を出す。10/13 総チェック：直書きだと翌日から古い日付になる）
export function KaijiToday() {
  const [label, setLabel] = useState("");
  useEffect(() => {
    const now = new Date(Date.now() + 9 * 60 * 60 * 1000); // 日本時間
    const m = String(now.getUTCMonth() + 1).padStart(2, "0");
    const d = String(now.getUTCDate()).padStart(2, "0");
    setLabel(`${m}.${d} ${WEEK[now.getUTCDay()]}`);
  }, []);
  return (
    <p className="kj-today__date" aria-label="今日の日付">
      {label || " "}
    </p>
  );
}

// スクロールに合わせた動き（見本 KAIJI DIVE だけ）
// ・[data-drift] の写真を、それぞれ違う速さで少しだけ上下にずらす（PC のみ）
// ・青い面「1 GUIDE 4 GUESTS」を、四隅から全幅へ広げる（--p を 0→1）
export default function KaijiMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const block = document.querySelector<HTMLElement>(".kj-block");
    const drifts = Array.from(document.querySelectorAll<HTMLElement>(".kj [data-drift]"));
    const pc = window.matchMedia("(min-width: 761px)");
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      if (block) {
        const r = block.getBoundingClientRect();
        // 面の上が画面の下に来た時 0、面の真ん中が画面の真ん中に来た時 1
        const start = vh;
        const end = vh / 2 - r.height / 2;
        const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
        block.style.setProperty("--p", p.toFixed(3));
      }
      drifts.forEach((el) => {
        if (!pc.matches) {
          el.style.removeProperty("--drift");
          return;
        }
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const k = parseFloat(el.dataset.drift || "0.08");
        el.style.setProperty("--drift", `${(-(r.top + r.height / 2 - vh / 2) * k).toFixed(1)}px`);
      });
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    block?.classList.add("is-live");
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
