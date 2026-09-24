"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { setupGsap, gsap, ScrollTrigger, EASE, isReduced, isPC } from "./motion";

type Props = {
  children: ReactNode;
  /** px/フレーム（60fps 換算）PC / スマホ */
  speedPC: number;
  speedSP: number;
  /** 登場の動き（#16）を付けてから流す */
  reveal?: boolean;
  /** ドラッグで動かせる（#41） */
  draggable?: boolean;
  className?: string;
};

/**
 * ギャラリーの流れる列（#12 #13）。GSAP の ticker で左へ流し、端まで行ったら半分戻す。
 * reveal=true なら写真を下から出して（#16）から流し始める。画面外では止まる。
 */
export default function GalleryRow({ children, speedPC, speedSP, reveal, draggable, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const tr = track.current;
    if (!el || !tr) return;
    const reduced = isReduced();
    setupGsap();
    let x = 0;
    let visible = false;
    let flowing = !reveal;
    let dragging = false;
    let lastX = 0;
    const half = () => tr.scrollWidth / 2;
    const setX = gsap.quickSetter(tr, "x", "px");

    const tick = (_t: number, dt: number) => {
      if (!visible || !flowing || dragging || reduced) return;
      const perFrame = isPC() ? speedPC : speedSP;
      x -= perFrame * (dt / (1000 / 60));
      const h = half();
      if (x <= -h) x += h;
      setX(x);
    };
    gsap.ticker.add(tick);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);

    let st: ScrollTrigger | undefined;
    const items = tr.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reveal && !reduced) {
      gsap.set(items, { autoAlpha: 0, yPercent: 10 });
      const tw = gsap.to(items, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1.6,
        ease: EASE.softIn,
        stagger: 0.1,
        paused: true,
        onComplete: () => {
          flowing = true;
        },
      });
      // お手本は列の上端が画面の 75% で開始
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 75%",
        once: true,
        onEnter: () => tw.play(),
      });
    } else {
      flowing = true;
    }

    const onDown = (e: PointerEvent) => {
      if (!draggable) return;
      dragging = true;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-grabbing");
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      x += e.clientX - lastX;
      lastX = e.clientX;
      const h = half();
      if (x <= -h) x += h;
      if (x > 0) x -= h;
      setX(x);
    };
    const onUp = () => {
      dragging = false;
      el.classList.remove("is-grabbing");
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      st?.kill();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [speedPC, speedSP, reveal, draggable]);

  return (
    <div ref={ref} className={`tp-grow ${draggable ? "is-draggable" : ""} ${className}`}>
      <div ref={track} className="tp-grow__track">
        <div className="tp-grow__set">{children}</div>
        <div className="tp-grow__set" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
