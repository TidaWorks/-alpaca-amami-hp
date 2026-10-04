"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Our Services の各タブに置く仕掛け（10/4 大地さん 10001・10003・10005）。
 * ホームページ＝スクロールでページが組み上がる／システム＝入れると勝手に計算される／AI顧問＝困りごとが窓口に集まる。
 * 左の細い列（レール）に今の状態を大きな字で出し、右に見本の画面を置く。スマホではレールが上に来る。
 * 色は生成り・墨・朱の3つだけ。影と角丸は使わない（10/4 10009 賞の水準まで）。
 * 動きを減らす設定の人には、できあがった姿だけを見せる。
 */

function useReduced() {
  const [r, setR] = useState(false);
  useEffect(() => setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return r;
}

/** 画面に入っている間だけ true */
function useInView<T extends Element>(ref: React.RefObject<T | null>, margin = "0px 0px -15% 0px") {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setV(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return v;
}

export default function AwStage({ id }: { id: "web" | "system" | "komon" }) {
  if (id === "web") return <BuildPage />;
  if (id === "system") return <BxSystem />;
  return <BxKomon />;
}

/* ───────── AI顧問・システム：BoostX 風の図解（10/4 大地さん「ブーストXのデザインの感じ好き」→「2」＝この2タブだけ） ─────────
   現状→理想の2つの箱（太い黒線のイラスト）＋具体的な一覧。色はページに合わせて生成り・墨・朱、箱は白と淡い朱。 */

function BxBefore({ now, ideal }: { now: { img: string; title: string; items: string[] }; ideal: { img: string; title: string; items: string[] } }) {
  return (
    <div className="bx-ba">
      <div className="bx-ba__box">
        <span className="bx-tag">今</span>
        <img src={now.img} alt="" loading="lazy" />
        <p className="bx-ba__t">{now.title}</p>
        <ul className="bx-ba__list">
          {now.items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <span className="bx-ba__arrow" aria-hidden="true" />
      <div className="bx-ba__box bx-ba__box--to">
        <span className="bx-tag bx-tag--fill">ALPACAが入ると</span>
        <img src={ideal.img} alt="" loading="lazy" />
        <p className="bx-ba__t">{ideal.title}</p>
        <ul className="bx-ba__list bx-ba__list--to">
          {ideal.items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BxHead({ k, t }: { k: string; t: string }) {
  return (
    <div className="bx-h">
      <p className="bx-h__k">
        <i />
        {k}
      </p>
      <h4 className="bx-h__t">{t}</h4>
    </div>
  );
}

const KOMON_MONTH = [
  { n: "01", t: "話す", d: "月に1回、顔を合わせて、いま困っている事を聞きます" },
  { n: "02", t: "決める", d: "その月にやる事を決めます。急ぎの物から先に" },
  { n: "03", t: "作る・直す", d: "ホームページ、仕組み、パソコンの設定など、決めた事をこちらで進めます" },
  { n: "04", t: "渡す", d: "使い方まで伝えて、社内で使える形にして渡します" },
];
const KOMON_KEEP = [
  { t: "直したホームページ", d: "文字・写真・お知らせの更新から、作り直しまで", tag: "必要な時に" },
  { t: "作った仕組み", d: "見積・予約・顧客の管理など、紙やExcelの代わりになる画面", tag: "決めた月に" },
  { t: "使い方の手順", d: "社員がひとりで使えるよう、手順をまとめて渡します", tag: "作るたびに" },
  { t: "ITまわりの一覧", d: "パソコン・アカウント・契約中のサービスを一つにまとめた表", tag: "最初に作り、更新" },
  { t: "AIの使い方", d: "その会社の仕事で使える、AIへの頼み方", tag: "必要な時に" },
  { t: "チャットのやりとり", d: "いつ何を相談して、どう片づいたかが残ります", tag: "いつでも（返事は平日）" },
];

function BxKomon() {
  return (
    <div className="bx">
      <BxHead k="AI顧問　どう変わるか" t="ITのことを、社長と事務の人が抱えなくてよくなります。" />
      <BxBefore
        now={{
          img: "/images/bx/komon-now.webp",
          title: "ITのことが、社長や事務の人に回ってくる",
          items: ["ホームページを何年も触っていない", "パソコンの設定を、毎回だれかに聞いている", "AIは気になるけれど、手が出ない"],
        }}
        ideal={{
          img: "/images/bx/komon-ideal.webp",
          title: "ALPACAが、会社のIT担当として中に入る",
          items: ["困ったら、チャットで一言送るだけ", "月に1回、顔を合わせて次にやる事を決める", "ホームページも仕組みもAIも、同じ窓口で"],
        }}
      />

      <BxHead k="ひと月の流れ" t="毎月、この順で進めます。" />
      <ol className="bx-flow">
        {KOMON_MONTH.map((m) => (
          <li key={m.n}>
            <span className="bx-flow__n">{m.n}</span>
            <b>{m.t}</b>
            <span className="bx-flow__d">{m.d}</span>
          </li>
        ))}
      </ol>
      <p className="bx-fine">チャットの相談は、流れとは別にいつでも送れます。返事は平日です。</p>

      <BxHead k="会社に残るもの（例）" t="作った物と決めた事は、全部ALPACAから会社へ渡します。" />
      <ul className="bx-keep">
        {KOMON_KEEP.map((x, i) => (
          <li key={x.t}>
            <span className={`bx-ico ${i % 3 === 0 ? "is-fill" : ""}`} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <div>
              <b>{x.t}</b>
              <p>{x.d}</p>
              <span className="bx-tag bx-tag--sm">{x.tag}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SYS_SPLIT = [
  { t: "今の仕事の流れを聞く", us: "紙やExcelの中身と、誰がいつ使うかを聞きます", you: "今使っている紙やファイルを見せてください" },
  { t: "画面の形を決める", us: "画面の見本を作って、一緒に直します", you: "見本を触って、使いにくい所を教えてください" },
  { t: "作る", us: "決めた形で作ります", you: "—" },
  { t: "試しに使う", us: "使ってみて出た直しを入れます", you: "実際の仕事で試してください" },
  { t: "使い始める", us: "使い方を教えて、社内に定着するまで見ます", you: "社員への声かけをお願いします" },
];
const SYS_EX = [
  { t: "予約の管理", d: "電話とノートの予約を、1つの画面に" },
  { t: "見積と請求", d: "見積から請求書まで、同じ数字で" },
  { t: "在庫", d: "入った・出たを入れると、残りが分かる" },
  { t: "顧客の管理", d: "お客さんごとの履歴を、すぐ引ける" },
  { t: "勤怠", d: "スマホで出勤・退勤、月末の集計まで" },
  { t: "売上の集計", d: "日・月・担当ごとの売上が、自動で" },
];

function BxSystem() {
  return (
    <div className="bx">
      <BxHead k="システム開発　どう変わるか" t="紙とExcelで続けてきた仕事を、その会社のやり方のまま画面にします。" />
      <BxBefore
        now={{
          img: "/images/bx/sys-now.webp",
          title: "紙とExcelで、同じ数字を何度も書き写す",
          items: ["手書きの台帳とExcelが二重になっている", "月末の集計に、毎回何時間もかかる", "担当の人しか、どこに何があるか分からない"],
        }}
        ideal={{
          img: "/images/bx/sys-ideal.webp",
          title: "1回入れれば、集計と書類までつながる",
          items: ["入れた数字が、そのまま一覧と書類になる", "集計はボタンひとつ", "スマホからでも、誰でも同じ画面を見られる"],
        }}
      />

      <BxHead k="進め方" t="こちらでやる事と、お願いする事を分けて進めます。" />
      <div className="bx-table" role="table">
        <div className="bx-table__row bx-table__row--h" role="row">
          <span role="columnheader">段階</span>
          <span role="columnheader">ALPACAがやる事</span>
          <span role="columnheader">お願いする事</span>
        </div>
        {SYS_SPLIT.map((r) => (
          <div className="bx-table__row" role="row" key={r.t}>
            <span role="cell">{r.t}</span>
            <span role="cell" className="bx-table__us">{r.us}</span>
            <span role="cell">{r.you}</span>
          </div>
        ))}
      </div>

      <BxHead k="例えばこんな仕組み" t="業種に合わせて、必要な物だけ作ります。" />
      <ul className="bx-ex">
        {SYS_EX.map((x, i) => (
          <li key={x.t}>
            <span className="bx-ex__n">{pad2(i + 1)}</span>
            <b>{x.t}</b>
            <p>{x.d}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── ホームページ：業種ごとのデザインの例（横に流れるギャラリー） ─────────
   10/4 大地さん「こういう画像を沢山生成して並べたらいい」→ 1枚に PC・スマホ・色・文字・部品までまとめた
   ブランドガイドの絵を業種ごとに並べる。どれも架空のお店（画像生成）。押すと大きく見られる。 */

const GUIDES = [
  { f: "g1-yado", k: "宿" },
  { f: "g2-salon", k: "美容室" },
  { f: "g3-koumuten", k: "工務店" },
  { f: "g4-bistro", k: "飲食店" },
  { f: "g5-hoikuen", k: "保育園" },
  { f: "g6-seikotsu", k: "整骨院" },
  { f: "g7-diving", k: "ダイビング" },
  { f: "g8-farm", k: "農園" },
  { f: "g9-bakery", k: "パン屋" },
  { f: "g10-zeirishi", k: "税理士事務所" },
];
const pad2 = (n: number) => String(n).padStart(2, "0");

function BuildPage() {
  const track = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLElement>(null);
  const inView = useInView(box);
  const reduced = useReduced();
  const [cur, setCur] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [held, setHeld] = useState(false); // 触っている間は自動で流さない

  // 今どれが一番左にあるかを、横の位置から測る
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.querySelector<HTMLElement>(".aw-gl__card");
      if (!card) return;
      const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
      setCur(Math.max(0, Math.min(GUIDES.length - 1, Math.round(el.scrollLeft / step))));
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const n = (i + GUIDES.length) % GUIDES.length;
    const card = el.querySelectorAll<HTMLElement>(".aw-gl__card")[n];
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: reduced ? "auto" : "smooth" });
  };

  // 画面に入っている間、3.6秒ごとに1枚ずつ流す（触っている間と、動きを減らす設定では止める）
  useEffect(() => {
    if (reduced || !inView || held || open !== null) return;
    const t = window.setInterval(() => go(cur + 1), 3600);
    return () => window.clearInterval(t);
  });

  // 大きく見ている時は Esc と左右キーで操作
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % GUIDES.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + GUIDES.length) % GUIDES.length));
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <figure className="aw-stg aw-stg--web" ref={box}>
      <div className="aw-stg__rail">
        <p className="aw-stg__k">見本　業種ごとのデザイン</p>
        <p className="aw-stg__big aw-stg__big--num" aria-hidden="true">
          <span key={cur} className="aw-stg__flip">
            {pad2(cur + 1)}
          </span>
          <small>/{GUIDES.length}</small>
        </p>
        <p className="aw-gl__now" aria-hidden="true" data-n={pad2(cur + 1)}>
          <span key={cur} className="aw-stg__flip">
            {GUIDES[cur].k}
          </span>
        </p>
        <p className="aw-stg__note">色・文字・画面まで、お店ごとに一式そろえて作ります。押すと大きく見られます。</p>
        <p className="aw-gl__fine">※ どれも架空のお店の見本です</p>
        <div className="aw-gl__nav">
          <button type="button" onClick={() => go(cur - 1)} aria-label="前の見本">
            ←
          </button>
          <button type="button" onClick={() => go(cur + 1)} aria-label="次の見本">
            →
          </button>
        </div>
      </div>

      <div
        className="aw-stg__main aw-gl"
        onPointerEnter={() => setHeld(true)}
        onPointerLeave={() => setHeld(false)}
        onTouchStart={() => setHeld(true)}
        onTouchEnd={() => window.setTimeout(() => setHeld(false), 4000)}
      >
        <div className="aw-gl__track" ref={track}>
          {GUIDES.map((g, i) => (
            <button
              type="button"
              key={g.f}
              className={`aw-gl__card ${i === cur ? "is-cur" : ""}`}
              onClick={() => setOpen(i)}
              aria-label={`${g.k}の見本を大きく見る`}
            >
              <img src={`/images/guides/${g.f}-s.webp`} alt={`${g.k}の架空のお店のデザイン見本`} loading="lazy" width={560} height={700} />
              <span className="aw-gl__cap">
                <span>{pad2(i + 1)}</span>
                {g.k}
              </span>
            </button>
          ))}
        </div>
      </div>

      {open !== null &&
        createPortal(
        <div className="aw-gl__lb" role="dialog" aria-modal="true" aria-label={`${GUIDES[open].k}の見本`} onClick={() => setOpen(null)}>
          <div className="aw-gl__lbin" onClick={(e) => e.stopPropagation()}>
            <img src={`/images/guides/${GUIDES[open].f}.webp`} alt={`${GUIDES[open].k}の架空のお店のデザイン見本`} />
            <div className="aw-gl__lbbar">
              <span>
                {pad2(open + 1)} / {GUIDES.length}　{GUIDES[open].k}（架空のお店）
              </span>
              <span className="aw-gl__lbbtns">
                <button type="button" onClick={() => setOpen((open - 1 + GUIDES.length) % GUIDES.length)} aria-label="前の見本">
                  ←
                </button>
                <button type="button" onClick={() => setOpen((open + 1) % GUIDES.length)} aria-label="次の見本">
                  →
                </button>
                <button type="button" onClick={() => setOpen(null)} aria-label="閉じる">
                  ×
                </button>
              </span>
            </div>
          </div>
        </div>,
          document.body,
        )}
    </figure>
  );
}
