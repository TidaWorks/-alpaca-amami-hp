"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * 手書きの英語見出し（10/5 大地さん Q2「1と4」）
 * ① 朱色のペン先が左から書いていき、書き終わりに下線を「シュッ」と引く
 * ④ 書き終わった後、指やマウスを近づけると、その辺りがインクのようににじむ
 * 書き始めの合図は AwMotion が付ける is-in（画面に入った時）。動きを減らす設定の人には最初から書き上がった形を出す。
 */

const WRITE_MS = 1900; // 文字を書く時間
const LINE_MS = 380; // 下線の「シュッ」
const LIFT_MS = 450; // ペンを離して消える

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function AwHand({ text, w, fid }: { text: string; w: number; fid: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const txt = useRef<SVGTextElement>(null);
  const clip = useRef<SVGRectElement>(null);
  const pen = useRef<SVGGElement>(null);
  const line = useRef<SVGPathElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const blot = useRef<SVGCircleElement>(null);

  // 動く人だけ、描画前に文字を隠しておく（書き始めるまで白紙）
  useLayoutEffect(() => {
    const el = root.current;
    if (document.documentElement.classList.contains("aw-anim") && !el?.classList.contains("is-in")) {
      clip.current?.setAttribute("width", "0");
      line.current?.style.setProperty("stroke-dashoffset", "1");
    }
    el?.classList.add("is-ready");
  }, []);

  useEffect(() => {
    const el = root.current;
    const t = txt.current;
    if (!el || !t) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let done = false;
    let stop = false;

    // 文字の幅（書体の読み込み後に測る）。下線とペンの通り道に使う
    let box = { x: 8, y: 40, width: w - 16, height: 130 };
    const measure = () => {
      try {
        const b = t.getBBox();
        if (b.width > 0) box = { x: b.x, y: b.y, width: b.width, height: b.height };
      } catch {
        /* 測れない時は既定の幅のまま */
      }
      const ly = Math.min(196, box.y + box.height + 6);
      line.current?.setAttribute("d", `M ${box.x + 4} ${ly} Q ${box.x + box.width * 0.5} ${ly + 7} ${box.x + box.width - 6} ${ly - 4}`);
    };

    const showAll = () => {
      clip.current?.setAttribute("width", String(w + 40));
      line.current?.style.setProperty("stroke-dashoffset", "0");
      pen.current?.style.setProperty("opacity", "0");
      done = true;
    };

    const write = () => {
      measure();
      if (still) {
        showAll();
        return;
      }
      const t0 = performance.now();
      const p = pen.current;
      if (p) p.style.opacity = "1";
      const frame = (now: number) => {
        if (stop) return;
        const e = now - t0;
        const x0 = box.x - 6;
        if (e < WRITE_MS) {
          // 文字: 左から順に現れる。ペン先は書いている所を上下に揺れながら進む
          const k = ease(e / WRITE_MS);
          const x = x0 + (box.width + 12) * k;
          clip.current?.setAttribute("width", String(Math.max(0, x)));
          const wob = Math.sin(e / 38) * box.height * 0.26 + Math.sin(e / 91) * box.height * 0.1;
          p?.setAttribute("transform", `translate(${x} ${box.y + box.height * 0.55 + wob})`);
        } else if (e < WRITE_MS + LINE_MS) {
          // 下線を「シュッ」
          clip.current?.setAttribute("width", String(w + 40));
          const k = 1 - Math.pow(1 - (e - WRITE_MS) / LINE_MS, 3);
          line.current?.style.setProperty("stroke-dashoffset", String(1 - k));
          const ln = line.current;
          if (ln && p) {
            const pt = ln.getPointAtLength(ln.getTotalLength() * k);
            p.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
          }
        } else if (e < WRITE_MS + LINE_MS + LIFT_MS) {
          // ペンを離して、少し浮かせながら消す
          line.current?.style.setProperty("stroke-dashoffset", "0");
          const k = (e - WRITE_MS - LINE_MS) / LIFT_MS;
          if (p) {
            p.style.opacity = String(1 - k);
            const ln = line.current;
            const end = ln ? ln.getPointAtLength(ln.getTotalLength()) : { x: box.x + box.width, y: box.y + box.height };
            p.setAttribute("transform", `translate(${end.x + 30 * k} ${end.y - 40 * k})`);
          }
        } else {
          showAll();
          return;
        }
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    let started = false;
    const go = () => {
      if (started) return;
      started = true;
      const f = (document as Document & { fonts?: FontFaceSet }).fonts;
      if (f?.ready) f.ready.then(write);
      else write();
    };
    if (!document.documentElement.classList.contains("aw-anim")) {
      measure();
      showAll();
    } else if (el.classList.contains("is-in")) go();
    const mo = new MutationObserver(() => {
      if (el.classList.contains("is-in")) go();
    });
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });

    // ④ にじみ: 近づいた所に朱のインクがにじみ、文字のゆがみが強くなる。離れると元に戻る
    let near = 0;
    let target = 0;
    let bx = 0;
    let by = 0;
    let nraf = 0;
    const s = svg.current;
    const tick = () => {
      near += (target - near) * 0.12;
      disp.current?.setAttribute("scale", (7 + near * 30).toFixed(2));
      const b = blot.current;
      if (b) {
        b.setAttribute("cx", bx.toFixed(1));
        b.setAttribute("cy", by.toFixed(1));
        b.setAttribute("r", (20 + near * 90).toFixed(1));
        b.style.opacity = (near * 0.9).toFixed(3);
      }
      if (Math.abs(target - near) > 0.004) nraf = requestAnimationFrame(tick);
      else nraf = 0;
    };
    const kick = () => {
      if (!nraf) nraf = requestAnimationFrame(tick);
    };
    const onMove = (ev: PointerEvent) => {
      if (!done || still || !s) return;
      const r = s.getBoundingClientRect();
      const sc = w / r.width;
      const x = (ev.clientX - r.left) * sc;
      const y = (ev.clientY - r.top) * sc;
      // 文字の箱からの距離で強さを決める（中に入れば一番強い）
      const dx = Math.max(box.x - x, 0, x - (box.x + box.width));
      const dy = Math.max(box.y - y, 0, y - (box.y + box.height));
      const d = Math.hypot(dx, dy) / sc;
      target = Math.max(0, 1 - d / 140);
      bx = x;
      by = y;
      kick();
    };
    const onLeave = () => {
      target = 0;
      kick();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    const onUp = (ev: PointerEvent) => {
      if (ev.pointerType !== "mouse") onLeave();
    };
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onLeave, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      stop = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(nraf);
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onLeave);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [w]);

  return (
    <span className="aw-hand" data-hand ref={root}>
      <span className="aw-sr">{text}</span>
      <svg ref={svg} viewBox={`0 0 ${w} 200`} aria-hidden="true" className="aw-hand__svg" style={{ maxWidth: `${(w / 1000) * 920}px` }}>
        <defs>
          <filter id={fid} x="-5%" y="-10%" width="110%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="3" result="n">
              <animate attributeName="baseFrequency" dur="6s" values="0.012;0.02;0.012" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="7" />
          </filter>
          <filter id={`${fid}-ink`} x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="8" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="38" result="d" />
            <feGaussianBlur in="d" stdDeviation="6" />
          </filter>
          <radialGradient id={`${fid}-g`}>
            <stop offset="0" style={{ stopColor: "var(--aw-shu)", stopOpacity: 0.55 }} />
            <stop offset="0.6" style={{ stopColor: "var(--aw-shu)", stopOpacity: 0.22 }} />
            <stop offset="1" style={{ stopColor: "var(--aw-shu)", stopOpacity: 0 }} />
          </radialGradient>
          <clipPath id={`${fid}-c`}>
            <rect ref={clip} x="-20" y="-60" width={w + 40} height="320" />
          </clipPath>
        </defs>
        <circle ref={blot} className="aw-hand__blot" cx="0" cy="0" r="0" fill={`url(#${fid}-g)`} filter={`url(#${fid}-ink)`} />
        <g className="aw-hand__txt" clipPath={`url(#${fid}-c)`}>
          <text ref={txt} x="8" y="158" className="aw-hand__t" filter={`url(#${fid})`}>
            {text}
          </text>
        </g>
        <path ref={line} className="aw-hand__line" d={`M 12 182 Q ${w / 2} 189 ${w - 20} 178`} pathLength={1} />
        <g ref={pen} className="aw-hand__pen" style={{ opacity: 0 }}>
          {/* ペン: 右上に伸びる軸と、朱色のペン先 */}
          <line x1="0" y1="0" x2="46" y2="-78" className="aw-hand__pen-body" />
          <circle r="9" className="aw-hand__pen-tip" />
        </g>
      </svg>
    </span>
  );
}
