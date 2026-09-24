"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { MessageCircle, Phone } from "lucide-react";

/**
 * 常に見える導線（1b）。フッターが画面に入っている間は隠れる（#23）
 */
export default function SideCta() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const foot = document.getElementById("tp-footer");
    if (!foot) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting));
    io.observe(foot);
    return () => io.disconnect();
  }, []);
  return (
    <div className={`tp-side ${hidden ? "is-hidden" : ""}`}>
      <a href="#contact" className="tp-side__btn tp-side__btn--main">
        <span className="tp-side__icon" aria-hidden="true"><MessageCircle /></span>
        <span className="tp-side__txt">無料相談</span>
      </a>
      <a href={SITE.contact.telHref} className="tp-side__btn tp-side__btn--sub">
        <span className="tp-side__icon" aria-hidden="true"><Phone /></span>
        <span className="tp-side__txt">電話する</span>
      </a>
    </div>
  );
}
