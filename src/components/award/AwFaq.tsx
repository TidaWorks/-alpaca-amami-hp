"use client";

import { useRef, useState, type ReactNode } from "react";

function Item({ q, a, i }: { q: string; a: ReactNode; i: number }) {
  const [open, setOpen] = useState(false);
  const body = useRef<HTMLDivElement>(null);
  const anim = useRef<Animation | null>(null);

  const toggle = () => {
    const el = body.current;
    const next = !open;
    setOpen(next);
    if (!el) return;
    const fromH = el.getBoundingClientRect().height;
    anim.current?.cancel();
    const toH = next ? el.scrollHeight : 0;
    el.style.height = next ? "auto" : "0px";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    anim.current = el.animate([{ height: `${fromH}px` }, { height: `${toH}px` }], {
      duration: 380,
      easing: "cubic-bezier(.2,.7,.1,1)",
    });
  };

  return (
    <li className={`aw-faq__item ${open ? "is-open" : ""}`}>
      <span className="aw-rule" data-line aria-hidden="true" />
      <h3 className="aw-faq__h">
        <button type="button" className="aw-faq__q" aria-expanded={open} aria-controls={`aw-faq-${i}`} onClick={toggle}>
          <span className="aw-faq__mark" aria-hidden="true">
            Q{String(i + 1).padStart(2, "0")}
          </span>
          <span className="aw-faq__qtxt">{q}</span>
          <span className="aw-faq__pm" aria-hidden="true" />
        </button>
      </h3>
      <div className="aw-faq__a" id={`aw-faq-${i}`} ref={body} style={{ height: 0 }} role="region">
        <p className="aw-faq__atxt">{a}</p>
      </div>
    </li>
  );
}

/** 答えは文節に分けた物をサーバーから受け取る（jp.tsx） */
export default function AwFaq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <ul className="aw-faq">
      {items.map((f, i) => (
        <Item key={f.q} q={f.q} a={f.a} i={i} />
      ))}
    </ul>
  );
}
