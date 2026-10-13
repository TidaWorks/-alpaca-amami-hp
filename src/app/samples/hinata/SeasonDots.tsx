"use client";

import { useEffect, useRef, useState } from "react";

// スマホの「畑の1年」：横にすべらせる季節カードの、今が何枚目かを示す点（PC は出さない）
export default function SeasonDots() {
  const ref = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const list = ref.current?.parentElement?.querySelector<HTMLElement>(".hn-seasons");
    if (!list) return;
    const on = () => {
      const cards = Array.from(list.children) as HTMLElement[];
      const left = list.scrollLeft;
      let best = 0;
      let dist = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - list.offsetLeft - 24 - left);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      // 一番右まで送った時は最後の点
      if (left + list.clientWidth >= list.scrollWidth - 4) best = cards.length - 1;
      setNow(best);
    };
    on();
    list.addEventListener("scroll", on, { passive: true });
    return () => list.removeEventListener("scroll", on);
  }, []);

  return (
    <div ref={ref} className="hn-sdots" aria-hidden="true">
      {["春", "夏", "秋", "冬"].map((k, i) => (
        <i key={k} className={i === now ? "is-now" : ""} />
      ))}
      <span>横にすべらせて見られます</span>
    </div>
  );
}
