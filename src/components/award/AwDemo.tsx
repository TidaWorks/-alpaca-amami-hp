"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 「頼むと、こう動きます」: 社長がチャットで頼む → ALPACA が返事 → 右の画面が直っていく、を3つの仕事で繰り返す。
 * 写真の代わりに、何が起きるかを動きで見せる。中身は例（山田商店は架空）。
 * 画面に入っている間だけ進み、動きを減らす設定の人には1つ目の「直った後」を止めて見せる。
 */

type Scene = {
  key: "web" | "system" | "ai";
  tab: string;
  ask: string;
  reply: string;
  done: string;
};

const SCENES: Scene[] = [
  {
    key: "web",
    tab: "ホームページ",
    ask: "年末の休み、ホームページに出しておいてもらえますか",
    reply: "12月29日から1月3日まで休み、で入れます。一番上に出しますね",
    done: "直しました。スマホで見て、気になる所があれば言ってください",
  },
  {
    key: "system",
    tab: "システム",
    ask: "見積書を毎回Excelで作るのが大変で",
    reply: "今の見積書の形のまま、スマホで作れるようにします",
    done: "できました。品名を選ぶと金額が入って、そのまま送れます",
  },
  {
    key: "ai",
    tab: "AI",
    ask: "毎月の売上のまとめ、AIにやってもらえないかな",
    reply: "毎月1日に、先月の売上をまとめて届くようにします",
    done: "設定しました。来月から、朝このチャットに届きます",
  },
];

// 1つの仕事の中の段。0:空 1:社長が打つ 2:社長の言葉 3:ALPACAが打つ 4:返事 5:画面を直す 6:直った+完了の言葉
const STEP_MS = [500, 900, 1300, 900, 1500, 1700, 3200];
const LAST = STEP_MS.length - 1;

export default function AwDemo() {
  const [s, setS] = useState(0);
  const [k, setK] = useState(0);
  const [still, setStill] = useState(false);
  const [beat, setBeat] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setK(LAST);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (still) return;
    const id = window.setTimeout(() => {
      // 画面の外では進めない（戻ってきた所から続ける）
      if (!visible.current) {
        setBeat((b) => b + 1);
        return;
      }
      if (k < LAST) setK(k + 1);
      else {
        setS((s + 1) % SCENES.length);
        setK(0);
      }
    }, STEP_MS[k]);
    return () => window.clearTimeout(id);
  }, [s, k, still, beat]);

  const sc = SCENES[s];
  const pick = (i: number) => {
    setS(i);
    setK(0);
  };

  return (
    <div className="aw-demo" ref={rootRef}>
      <div className="aw-demo__tabs" role="tablist" aria-label="例を切り替える">
        {SCENES.map((x, i) => (
          <button
            key={x.key}
            type="button"
            role="tab"
            aria-selected={i === s}
            className={`aw-demo__tab ${i === s ? "is-on" : ""}`}
            onClick={() => pick(i)}
          >
            <span className="aw-demo__tab-n">{i + 1}</span>
            {x.tab}
            <span className="aw-demo__bar" aria-hidden="true">
              <span
                key={`${s}-${i === s ? "on" : "off"}`}
                className="aw-demo__bar-in"
                style={{ animationDuration: `${STEP_MS.reduce((a, b) => a + b, 0)}ms`, animationPlayState: still ? "paused" : undefined }}
              />
            </span>
          </button>
        ))}
      </div>

      {/* 読み上げ用: 動く画面の中身を文で渡す */}
      <p className="aw-sr">
        {sc.tab}の例。社長「{sc.ask}」。ALPACA「{sc.reply}」。{sc.done}
      </p>

      <div className="aw-demo__stage" aria-hidden="true">
        {/* 左: チャット */}
        <div className="aw-demo__chat">
          <p className="aw-demo__chat-h">
            <span>山田商店 × ALPACA</span>
            <span className="aw-demo__ex">例</span>
          </p>
          <div className="aw-demo__log" key={s}>
            {k >= 1 && (
              <Bubble who="me" typing={k === 1}>
                {sc.ask}
              </Bubble>
            )}
            {k >= 3 && (
              <Bubble who="al" typing={k === 3}>
                {sc.reply}
              </Bubble>
            )}
            {k >= LAST && <Bubble who="al">{sc.done}</Bubble>}
          </div>
        </div>

        {/* 右: 直っていく画面 */}
        <div className={`aw-demo__screen is-${sc.key} ${k >= 5 ? "is-work" : ""} ${k >= LAST ? "is-done" : ""}`} key={`scr-${s}`}>
          <div className="aw-demo__chrome">
            <span />
            <span />
            <span />
            <em>{sc.key === "web" ? "yamada-shoten.jp" : sc.key === "system" ? "見積書をつくる" : "チャット"}</em>
          </div>
          <div className="aw-demo__body">{screenBody(sc.key)}</div>
          <span className="aw-demo__scan" />
        </div>
      </div>
    </div>
  );
}

function Bubble({ who, typing, children }: { who: "me" | "al"; typing?: boolean; children: React.ReactNode }) {
  return (
    <div className={`aw-demo__msg is-${who}`}>
      <span className="aw-demo__who">{who === "me" ? "社長" : "ALPACA"}</span>
      <p className="aw-demo__txt">
        {typing ? (
          <span className="aw-demo__dots">
            <i />
            <i />
            <i />
          </span>
        ) : (
          children
        )}
      </p>
    </div>
  );
}

function screenBody(key: Scene["key"]) {
  if (key === "web")
    return (
      <div className="aw-sc-web">
        <div className="aw-sc-web__news">
          <b>お知らせ</b>年末年始は 12月29日〜1月3日 お休みです
        </div>
        <p className="aw-sc-web__logo">山田商店</p>
        <p className="aw-sc-web__h">島の暮らしの道具と、修理の店。</p>
        <dl className="aw-sc-web__hours">
          <dt>営業時間</dt>
          <dd>9:00〜18:00</dd>
          <dt>定休日</dt>
          <dd>日曜</dd>
        </dl>
      </div>
    );
  if (key === "system")
    return (
      <div className="aw-sc-sys">
        <p className="aw-sc-sys__h">
          見積書<span>No. 0128</span>
        </p>
        <ul className="aw-sc-sys__rows">
          <li>
            <span>網戸の張り替え</span>
            <span>2</span>
            <span>8,800</span>
          </li>
          <li>
            <span>出張費</span>
            <span>1</span>
            <span>3,000</span>
          </li>
          <li>
            <span>部品代</span>
            <span>1</span>
            <span>1,650</span>
          </li>
        </ul>
        <p className="aw-sc-sys__sum">
          合計（税込）<b>15,345円</b>
        </p>
        <p className="aw-sc-sys__btn">このまま送る</p>
      </div>
    );
  return (
    <div className="aw-sc-ai">
      <p className="aw-sc-ai__from">ALPACA の AI</p>
      <p className="aw-sc-ai__h">9月の売上のまとめ</p>
      <div className="aw-sc-ai__bars">
        {[46, 58, 52, 71].map((h, i) => (
          <span key={i} style={{ height: `${h}%` }}>
            <em>{["6月", "7月", "8月", "9月"][i]}</em>
          </span>
        ))}
      </div>
      <p className="aw-sc-ai__note">一番多かったのは修理の仕事。網戸の張り替えが先月の2倍でした。</p>
    </div>
  );
}
