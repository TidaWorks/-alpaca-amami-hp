"use client";

import { useEffect, useRef, useState } from "react";
import { jp } from "./jp";
import AwStage from "./AwStages";

/**
 * Our Services: 3つの仕事をタブで切り替える（10/4 Q8①）。
 * 中身は「何をするか・内容・進め方（紙芝居）・料金」。進め方はスクロールで1段ずつめくれる（Q7③）。
 */

export type Service = {
  id: "web" | "system" | "komon";
  tab: string;
  name: string;
  lead: string;
  sub?: string;
  /** こんな時に（頼む場面）。無い仕事は出さない */
  scenes?: string[];
  items: string[];
  note?: string;
  priceLabel: string;
  price: string;
  tax: boolean;
  flowTitle: string;
  flow: { t: string; d: string }[];
};

export default function AwServices({ services }: { services: Service[] }) {
  const [cur, setCur] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const s = services[cur];

  const pick = (i: number) => {
    setCur(i);
    // タブを押したら、タブの頭が画面の上に来るように戻す（下まで読んでから切り替えた時）
    const el = tabsRef.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="aw-svc">
      <div className="aw-svc__tabs" role="tablist" aria-label="仕事を選ぶ" ref={tabsRef}>
        {services.map((x, i) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            id={`svc-tab-${x.id}`}
            aria-selected={i === cur}
            aria-controls={`svc-panel-${x.id}`}
            className={`aw-svc__tab ${i === cur ? "is-on" : ""}`}
            onClick={() => pick(i)}
          >
            <span className="aw-svc__tab-n">0{i + 1}</span>
            <span className="aw-svc__tab-t">{x.tab}</span>
          </button>
        ))}
      </div>

      <div className="aw-svc__panel" role="tabpanel" id={`svc-panel-${s.id}`} aria-labelledby={`svc-tab-${s.id}`} key={s.id}>
        <div className="aw-svc__head">
          <h3 className="aw-svc__name">{s.name}</h3>
          <dl className="aw-svc__price">
            <dt>{s.priceLabel}</dt>
            <dd>
              {s.price}
              {s.tax && <small>（税別）</small>}
            </dd>
          </dl>
        </div>
        <div className="aw-svc__body">
          <div className="aw-svc__txt">
            <p className="aw-svc__lead">{jp(s.lead)}</p>
            {s.sub && <p className="aw-svc__sub">{jp(s.sub)}</p>}
            {s.scenes && s.scenes.length > 0 && (
              <div className="aw-svc__scenes">
                <p className="aw-svc__k">こんな時に</p>
                <ul>
                  {s.scenes.map((x) => (
                    <li key={x}>{jp(x)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="aw-svc__detail">
            <p className="aw-svc__k">内容</p>
            <ul className="aw-svc__items">
              {s.items.map((it) => (
                <li key={it}>{jp(it)}</li>
              ))}
            </ul>
            {s.note && <p className="aw-svc__note">{s.note}</p>}
          </div>
        </div>
        <AwStage id={s.id} />
        <Kamishibai title={s.flowTitle} steps={s.flow} />
      </div>
    </div>
  );
}

/** 進め方の紙芝居: 外側の高さ＝段の数ぶん。中は画面に貼り付き、スクロール量で今の段が替わる */
function Kamishibai({ title, steps }: { title: string; steps: { t: string; d: string }[] }) {
  const outer = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }
    const onScroll = () => {
      const el = outer.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(0.999, Math.max(0, -r.top / span)) : 0;
      setI(Math.floor(p * steps.length));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps.length]);

  // 動きを減らす設定の人には、4段を縦にそのまま並べる
  if (still)
    return (
      <div className="aw-kami is-still">
        <p className="aw-kami__title">{title}</p>
        <ol className="aw-kami__list">
          {steps.map((st, k) => (
            <li key={st.t}>
              <span className="aw-kami__n">{String(k + 1).padStart(2, "0")}</span>
              <b>{st.t}</b>
              <span>{jp(st.d)}</span>
            </li>
          ))}
        </ol>
      </div>
    );

  return (
    <div className="aw-kami" ref={outer} style={{ height: `${steps.length * 70 + 30}vh` }}>
      <div className="aw-kami__stick">
        <p className="aw-kami__title">
          {title}
          <span className="aw-kami__dots" aria-hidden="true">
            {steps.map((_, k) => (
              <i key={k} className={k <= i ? "is-on" : ""} />
            ))}
          </span>
        </p>
        <ol className="aw-kami__cards">
          {steps.map((st, k) => (
            <li key={st.t} className={`aw-kami__card ${k === i ? "is-on" : k < i ? "is-past" : ""}`} aria-current={k === i ? "step" : undefined}>
              <span className="aw-kami__n">{String(k + 1).padStart(2, "0")}</span>
              <span className="aw-kami__t">{st.t}</span>
              <span className="aw-kami__d">{jp(st.d)}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
