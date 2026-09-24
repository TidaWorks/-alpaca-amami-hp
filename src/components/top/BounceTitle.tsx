"use client";

import { useEffect, useRef } from "react";
import { setupGsap, gsap, SplitText, EASE, startPos, isReduced } from "./motion";

type Props = {
  en: string;
  ja?: string;
  className?: string;
  /** 読み込み直後に動かす（スクロールを待たない） */
  onLoad?: boolean;
};

/**
 * 英字の大見出し。1文字ずつ下端を軸に縦0.4倍→1倍で弾む（#17）
 */
export default function BounceTitle({ en, ja, className = "", onLoad }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isReduced()) {
      el.style.visibility = "visible";
      return;
    }
    setupGsap();
    let split: SplitText | null = null;
    let tween: gsap.core.Tween | null = null;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      split = new SplitText(el, { type: "chars", charsClass: "tp-char" });
      gsap.set(split.chars, { transformOrigin: "50% 100%", display: "inline-block" });
      gsap.set(el, { visibility: "visible" });
      tween = gsap.from(split.chars, {
        scaleY: 0.4,
        yPercent: 10,
        autoAlpha: 0,
        duration: 0.8,
        ease: EASE.bounceText,
        stagger: 0.025,
        scrollTrigger: onLoad ? undefined : { trigger: el, start: startPos(), once: true },
        onComplete: () => split?.revert(),
      });
    });
    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, [onLoad]);
  return (
    <div className={`tp-title ${className}`}>
      <h2 className="tp-title__h">
        <span ref={ref} className="tp-title__en" aria-hidden="true">
          {en}
        </span>
        {ja && <span className="tp-title__ja">{ja}</span>}
      </h2>
    </div>
  );
}
