"use client";

import { useEffect } from "react";

// ゆるり整骨院の動き（10/13 総チェック）
// ・受付時間の表：今日の曜日の列を淡く光らせる（日曜と祝日は「日・祝」の列）
// ・施術の流れ（スマホ）：縦の点線をスクロールに合わせて上から引く。PC は横の線を CSS で左から引く
// ・スマホの「電話する」ボタン：一番上を少し過ぎたら出す
export default function YururiMotion() {
  useEffect(() => {
    // 月=0 … 土=5、日=6（祝日はわからないので日曜だけ）
    const d = new Date().getDay();
    const col = d === 0 ? 6 : d - 1;
    document.querySelectorAll<HTMLElement>(`.yr-table [data-col="${col}"]`).forEach((el) => el.classList.add("is-today"));

    const list = document.querySelector<HTMLElement>(".yr-flow__list");
    const call = document.querySelector<HTMLElement>(".yr-call");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sp = window.matchMedia("(max-width: 760px)");

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      if (list) {
        if (reduce) list.style.setProperty("--p", "1");
        else if (sp.matches) {
          const r = list.getBoundingClientRect();
          // 線の先が、いつも画面の下から4割の所にあるように
          const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
          list.style.setProperty("--p", p.toFixed(3));
        } else list.style.removeProperty("--p");
      }
      if (call) call.classList.toggle("is-on", window.scrollY > 320);
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
