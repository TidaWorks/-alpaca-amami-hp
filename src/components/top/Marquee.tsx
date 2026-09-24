"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { isReduced } from "./motion";

type Props = {
  children: ReactNode;
  /** 速さ px/秒（PC / スマホ）。お手本は 1px/フレーム＝60px/s */
  speedPC: number;
  speedSP: number;
  className?: string;
};

/**
 * 右から左へ一定速度で流れ続ける帯（#10）。中身を2回並べて translateX(0→-50%)。画面外では止める
 */
export default function Marquee({ children, speedPC, speedSP, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const tr = track.current;
    if (!el || !tr) return;
    if (isReduced()) {
      tr.style.animation = "none";
      return;
    }
    const mq = window.matchMedia("(min-width: 768px)");
    const setDur = () => {
      const half = tr.scrollWidth / 2;
      const speed = mq.matches ? speedPC : speedSP;
      tr.style.setProperty("--tp-dur", `${half / speed}s`);
    };
    setDur();
    const ro = new ResizeObserver(setDur);
    ro.observe(tr);
    const io = new IntersectionObserver(([e]) => {
      tr.style.animationPlayState = e.isIntersecting ? "running" : "paused";
    });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [speedPC, speedSP]);
  return (
    <div ref={ref} className={`tp-marquee ${className}`}>
      <div ref={track} className="tp-marquee__track">
        <div className="tp-marquee__set">{children}</div>
        <div className="tp-marquee__set" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
