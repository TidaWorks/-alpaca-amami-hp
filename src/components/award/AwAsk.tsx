"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Co } from "./AwYou";
import { cleanName, getYou, restoreYou, setYou, subscribeYou, useYou, WORRIES } from "./store";

// 選んだ瞬間に、その場で見せる要約（下の段と同じ中身。料金は facts/business.md の通り）
const SUM = {
  docs: { job: "システム開発", flow: "聞く → 決める → 作る → 使えるようにする", money: "内容を聞いてお見積り" },
  hp: { job: "ホームページ制作", flow: "聞く → 組み立てる → 作る → 公開する", money: "25万円から（税別）" },
  ai: { job: "AI顧問", flow: "書き出す → 分ける → 作る → 使えるようにする", money: "月15万円（税別）" },
} as const;

/** 組織表の「空席に座る」動きを起こす合図（AwMotion が聞く） */
const seat = () => window.dispatchEvent(new Event("aw:seat"));

/**
 * 一番上の入力: 会社の名前 → 困りごとを3つから選ぶ。
 * 名前はこの画面の中だけで使う（store.ts。どこにも送らない）。入れなくても進める。
 */
export default function AwAsk({ lead }: { lead: ReactNode }) {
  const you = useYou();
  const [val, setVal] = useState("");
  const composing = useRef(false);
  const input = useRef<HTMLInputElement>(null);
  const question = useRef<HTMLParagraphElement>(null);

  // 開いた時: 同じタブで前に入れた物を戻す。ページ全体に「名前あり／困りごと」の印を付ける（並べ替えの CSS が見る）
  useEffect(() => {
    const sync = () => {
      const y = getYou();
      const root = document.querySelector<HTMLElement>(".aw");
      if (!root) return;
      if (y.worry) root.dataset.worry = y.worry;
      else delete root.dataset.worry;
      root.toggleAttribute("data-named", !!y.name);
      root.toggleAttribute("data-engaged", y.step === 1);
    };
    restoreYou();
    const y = getYou();
    setVal(y.name);
    sync();
    if (y.step === 1) seat();
    return subscribeYou(sync);
  }, []);

  const commit = (skip = false) => {
    if (composing.current) return;
    const name = skip ? "" : cleanName(val);
    setVal(name);
    setYou({ name, step: 1 });
    input.current?.blur();
    seat();
    // キーボードで進めた人は、そのまま3択へ
    requestAnimationFrame(() => question.current?.focus({ preventScroll: true }));
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    // 日本語の変換を確定する Enter では進めない（Safari は keyCode 229 で届く）
    if (composing.current || e.nativeEvent.isComposing || e.keyCode === 229) return;
    e.preventDefault();
    commit();
  };

  if (you.step === 1) {
    return (
      <div className="aw-ask aw-ask--pick">
        <p className="aw-ask__q" id="aw-ask-q" ref={question} tabIndex={-1}>
          <span className="aw-nb">
            <Co after="で、" />
          </span>
          <span className="aw-nb">いま一番</span>
          <span className="aw-nb">困っているのは？</span>
        </p>
        <ul className="aw-ask__list" aria-labelledby="aw-ask-q">
          {WORRIES.map((w) => (
            <li key={w.id}>
              <button
                type="button"
                className={`aw-ask__pick ${you.worry === w.id ? "is-on" : ""}`}
                aria-pressed={you.worry === w.id}
                onClick={() => setYou({ worry: w.id })}
              >
                <span className="aw-ask__box" aria-hidden="true" />
                <span className="aw-ask__picktxt">{w.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="aw-ask__foot">
          <div className="aw-ask__done" role="status">
            {you.worry && (
              <dl className="aw-ask__sum" key={you.worry}>
                <div className="aw-swap">
                  <dt>頼む仕事</dt>
                  <dd>{SUM[you.worry].job}</dd>
                </div>
                <div className="aw-swap">
                  <dt>進め方</dt>
                  <dd>
                    {SUM[you.worry].flow.split(" → ").map((t, i) => (
                      <span key={t} className="aw-nb">
                        {i > 0 && <span className="aw-ask__to">→</span>}
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="aw-swap">
                  <dt>お金</dt>
                  <dd>{SUM[you.worry].money}</dd>
                </div>
              </dl>
            )}
          </div>
          <div className="aw-ask__acts">
            {you.worry && (
              <a href="#work" className="aw-btn aw-ask__next">
                <span>続きを読む</span>
                <svg className="aw-arrow aw-arrow--down" viewBox="0 0 20 12" aria-hidden="true">
                  <path d="M0 6h18M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </a>
            )}
            <button
              type="button"
              className="aw-ask__back"
              onClick={() => {
                setYou({ step: 0 });
                requestAnimationFrame(() => input.current?.focus());
              }}
            >
              名前を直す
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aw-ask">
      <div className="aw-ask__lead">{lead}</div>
      <label className="aw-ask__label" htmlFor="aw-ask-name">
        会社の名前を入れてください
      </label>
      <div className="aw-ask__field">
        <input
          id="aw-ask-name"
          ref={input}
          className="aw-ask__input"
          type="text"
          inputMode="text"
          enterKeyHint="done"
          autoComplete="organization"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          maxLength={60}
          placeholder="山田商店"
          aria-describedby="aw-ask-note"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            if (!composing.current) setYou({ name: e.target.value });
          }}
          onCompositionStart={() => {
            composing.current = true;
          }}
          onCompositionEnd={(e) => {
            composing.current = false;
            setYou({ name: e.currentTarget.value });
          }}
          onKeyDown={onKey}
          onFocus={(e) => {
            // スマホ: キーボードが出ても入力欄が隠れないよう、出きった頃に画面の中ほどへ
            if (!window.matchMedia("(hover: none)").matches) return;
            const el = e.currentTarget;
            window.setTimeout(() => el.scrollIntoView({ block: "center", behavior: "smooth" }), 350);
          }}
          onBlur={() => {
            if (cleanName(val)) commit();
          }}
        />
        <button type="button" className="aw-ask__go" aria-label="この名前で進む" onMouseDown={(e) => e.preventDefault()} onClick={() => commit()}>
          <svg className="aw-arrow" viewBox="0 0 20 12" aria-hidden="true">
            <path d="M0 6h18M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>
      <p className="aw-ask__note" id="aw-ask-note">
        <span className="aw-nb">名前はこの画面の中だけで使います。</span>
        <span className="aw-nb">どこにも送りません。</span>
      </p>
      <button type="button" className="aw-ask__skip" onClick={() => commit(true)}>
        入れずに進む
      </button>
    </div>
  );
}
