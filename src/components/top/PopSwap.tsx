"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { setupGsap, gsap, EASE, isReduced } from "./motion";

type Props = {
  children: ReactNode;
  /** 1枚を見せている時間（帯 2.4s／ギャラリー 3.0s） */
  hold: number;
  /** 始まりの遅れ（ギャラリーは奇数枠と偶数枠で 2.1s ずらす） */
  offset?: number;
  className?: string;
};

/**
 * イラストの「縮んで消える→弾んで出る」入れ替わり（#11 #14）
 */
export default function PopSwap({ children, hold, offset = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  useEffect(() => {
    const el = ref.current;
    if (!el || isReduced()) return;
    setupGsap();
    const nodes = Array.from(el.children) as HTMLElement[];
    if (nodes.length < 2) return;
    gsap.set(nodes.slice(1), { opacity: 0, scale: 0.8 });
    const tl = gsap.timeline({ repeat: -1, delay: offset });
    nodes.forEach((cur, i) => {
      const next = nodes[(i + 1) % nodes.length];
      tl.to(cur, { opacity: 0, scale: 0.8, duration: 0.15, ease: "none" }, `+=${hold}`);
      tl.to(next, { scale: 1, duration: 1.2, ease: EASE.popIn }, "<");
      tl.to(next, { opacity: 1, duration: 0.15, ease: "none" }, "<");
    });
    return () => {
      tl.kill();
    };
  }, [hold, offset]);
  return (
    <div ref={ref} className={`tp-pop ${className}`}>
      {items.map((c, i) => (
        <div key={i} className="tp-pop__item" style={i > 0 ? { opacity: 0 } : undefined}>
          {c}
        </div>
      ))}
    </div>
  );
}
