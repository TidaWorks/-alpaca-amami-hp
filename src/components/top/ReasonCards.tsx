"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

/**
 * 理由カード3枚。PC は横に3枚並べる。スマホはお手本と同じく、真ん中に1枚・左右に隣がのぞくスライダー（矢印と点付き）
 * 出てくる動き（#18）は Reveal + CSS
 */
export default function ReasonCards({ children, count }: { children: ReactNode; count: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const list = () => wrap.current?.querySelector<HTMLElement>(".tp-reason__cards") ?? null;

  useEffect(() => {
    const el = list();
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      cards.forEach((c, i) => {
        if (Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid) < Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - mid)) best = i;
      });
      setIdx(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const el = list();
    if (!el) return;
    const n = (i + count) % count;
    const c = el.children[n] as HTMLElement;
    el.scrollTo({ left: c.offsetLeft + c.offsetWidth / 2 - el.clientWidth / 2, behavior: "smooth" });
  };

  return (
    <div ref={wrap} className="tp-reason__slider">
      <Reveal className="tp-reason__cards">{children}</Reveal>
      <div className="tp-reason__ctrl">
        <button type="button" className="tp-reason__arrow" aria-label="前のカード" onClick={() => go(idx - 1)}>
          <ArrowLeft aria-hidden="true" />
        </button>
        <span className="tp-reason__dots" aria-hidden="true">
          {Array.from({ length: count }, (_, i) => (
            <span key={i} className={i === idx ? "is-active" : ""} />
          ))}
        </span>
        <button type="button" className="tp-reason__arrow" aria-label="次のカード" onClick={() => go(idx + 1)}>
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
