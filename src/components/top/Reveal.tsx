"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";
import { setupGsap, ScrollTrigger, startPos, isReduced } from "./motion";

type Props = {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  id?: string;
  style?: CSSProperties;
  /** 開始位置を上書き（例 "top 75%"） */
  start?: string;
};

/**
 * スクロール出現のきっかけ。ScrollTrigger で一度だけ data-inview を付け、動きは CSS transition（お手本と同じ型）
 */
export default function Reveal({ as: Tag = "div", className, children, id, style, start }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isReduced()) {
      el.dataset.inview = "true";
      return;
    }
    setupGsap();
    const st = ScrollTrigger.create({
      trigger: el,
      start: start ?? startPos(),
      once: true,
      onEnter: () => {
        el.dataset.inview = "true";
      },
    });
    // キーボードで中のボタンにフォーカスが来たら、きっかけの位置より手前でも出す（3周目: 見えないボタンにフォーカスが乗っていた）
    const onFocus = () => {
      el.dataset.inview = "true";
    };
    el.addEventListener("focusin", onFocus);
    return () => {
      st.kill();
      el.removeEventListener("focusin", onFocus);
    };
  }, [start]);
  return (
    <Tag ref={ref} className={className} id={id} style={style}>
      {children}
    </Tag>
  );
}
