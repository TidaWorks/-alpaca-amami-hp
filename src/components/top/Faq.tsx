"use client";

import { useRef, useState } from "react";
import { isReduced } from "./motion";
import { ph } from "./phrase";

export const FAQS = [
  {
    q: "何から始める？",
    a: "まずは30分、話してみるところから。無料相談で今の仕事の話を聞かせてください。AI顧問が始まったら、最初の月は仕事の洗い出しから入ります。",
  },
  { q: "パソコンが苦手な社員でも？", a: "社員が自分で使えるまで教えます。" },
  { q: "途中でやめられる？", a: "やめられます。期間の縛りはありません。" },
  { q: "奄美以外でも？", a: "できます。打ち合わせはオンラインです。奄美の会社には訪問もします。" },
  { q: "顧問料のほかにかかる費用は？", a: "AIの利用料が実費でかかる場合があります。" },
];

/** アコーディオン: 高さ 0 ↔ 中身の高さ＋不透明度 0.25s ease（#39） */
function Item({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  const body = useRef<HTMLDivElement>(null);
  const anim = useRef<Animation | null>(null);
  const toggle = () => {
    const el = body.current;
    const next = !open;
    setOpen(next);
    if (!el) return;
    // 3周目: 開く途中でもう一度押すと、開く動きの onfinish が閉じた後に height: auto を書き、aria は閉じたのに開いたままになっていた。
    // 終わりの形を先に書いてから、今の高さ→終わりの高さを動かす。途中の動きは止めてから次を始める
    const fromH = el.getBoundingClientRect().height;
    const fromO = Number(getComputedStyle(el).opacity);
    anim.current?.cancel();
    const toH = next ? el.scrollHeight : 0;
    el.style.height = next ? "auto" : "0px";
    el.style.opacity = next ? "1" : "0";
    if (isReduced()) return;
    anim.current = el.animate(
      [
        { height: `${fromH}px`, opacity: fromO },
        { height: `${toH}px`, opacity: next ? 1 : 0 },
      ],
      { duration: 250, easing: "ease" }
    );
  };
  return (
    <li className={`tp-faq__item ${open ? "is-open" : ""}`}>
      <button type="button" className="tp-faq__q tp-row" aria-expanded={open} aria-controls={`tp-faq-${i}`} onClick={toggle}>
        <span className="tp-faq__mark">Q</span>
        <span className="tp-faq__qtxt">{q}</span>
        <span className="tp-faq__plus" aria-hidden="true" />
      </button>
      <div className="tp-faq__a" id={`tp-faq-${i}`} ref={body} style={{ height: 0, opacity: 0 }}>
        <p className="tp-faq__atxt">{ph(a)}</p>
      </div>
    </li>
  );
}

export default function Faq() {
  return (
    <ul className="tp-faq">
      {FAQS.map((f, i) => (
        <Item key={f.q} q={f.q} a={f.a} i={i} />
      ))}
    </ul>
  );
}
