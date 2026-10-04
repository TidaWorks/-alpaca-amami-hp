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
  if (id === "system") return <AutoCalc />;
  return <Desk />;
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
        <p className="aw-gl__now" aria-hidden="true">
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

/* ───────── システム：入れると勝手に計算される ───────── */

// 見せる用のダミー。合計とグラフは下の計算で出す（手で書かない）
const CALC_ROWS = [
  { d: "10/1", who: "山田様", what: "外壁の補修", yen: 48000 },
  { d: "10/2", who: "佐藤様", what: "キッチンの交換", yen: 126500 },
  { d: "10/3", who: "鈴木様", what: "網戸の張り替え", yen: 12000 },
  { d: "10/4", who: "田中様", what: "屋根の点検", yen: 33000 },
];
const PAST_MONTHS = [
  { m: "7月", yen: 182000 },
  { m: "8月", yen: 236000 },
  { m: "9月", yen: 158000 },
];
const yen = (n: number) => n.toLocaleString("ja-JP");

function AutoCalc() {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box);
  const reduced = useReduced();
  // n = 入力が済んだ行の数。typing = 今打っている桁数
  const [n, setN] = useState(0);
  const [typing, setTyping] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduced) {
      setN(CALC_ROWS.length);
      return;
    }
    if (!inView) return;
    let alive = true;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((ok) => timers.push(window.setTimeout(ok, ms)));
    (async () => {
      while (alive) {
        setN(0);
        setTyping(0);
        await wait(700);
        for (let i = 0; i < CALC_ROWS.length && alive; i++) {
          const digits = String(CALC_ROWS[i].yen).length;
          for (let k = 1; k <= digits && alive; k++) {
            setTyping(k);
            await wait(90);
          }
          await wait(260);
          setN(i + 1);
          setTyping(0);
          await wait(900);
        }
        await wait(2800);
      }
    })();
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduced]);

  const total = CALC_ROWS.slice(0, n).reduce((a, r) => a + r.yen, 0);

  // 合計の数字は、目標の値へ少しずつ寄せて数え上がって見せる
  useEffect(() => {
    // 頭に戻った時は数え下げずに 0 から
    if (reduced || total === 0) {
      setShown(total);
      return;
    }
    let raf = 0;
    const tick = () => {
      setShown((v) => {
        const d = total - v;
        if (Math.abs(d) < 50) return total;
        return Math.round(v + d * 0.18);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total, reduced]);

  const months = [...PAST_MONTHS, { m: "10月", yen: total }];
  const max = 260000;

  return (
    <figure className="aw-stg aw-stg--calc" ref={box}>
      <div className="aw-stg__rail">
        <p className="aw-stg__k">見本　10月の売上</p>
        <p className="aw-stg__big aw-stg__big--yen" aria-hidden="true">
          <small>¥</small>
          {yen(shown)}
        </p>
        <p className="aw-stg__meta">
          <span>{n}件</span>
          <span className="aw-ac__live">
            <i />
            自動で集計
          </span>
        </p>
        <p className="aw-stg__note">金額を入れると、合計とグラフがその場で変わります。</p>
      </div>

      <div className="aw-stg__main aw-ac" aria-hidden="true">
        <div className="aw-ac__bar">
          <span>売上の記録</span>
          <span className="aw-ac__tabs">
            <i className="is-on">一覧</i>
            <i>グラフ</i>
            <i>請求</i>
          </span>
        </div>
        <div className="aw-ac__body">
          <div className="aw-ac__table">
            <div className="aw-ac__row aw-ac__row--h">
              <span>日付</span>
              <span>お客様</span>
              <span>内容</span>
              <span>金額</span>
            </div>
            {CALC_ROWS.map((r, i) => {
              const done = i < n;
              const now = i === n && typing > 0;
              const s = String(r.yen);
              return (
                <div key={r.d} className={`aw-ac__row ${done ? "is-done" : ""} ${now ? "is-now" : ""}`}>
                  <span>{done || now ? r.d : ""}</span>
                  <span>{done || now ? r.who : ""}</span>
                  <span>{done || now ? r.what : ""}</span>
                  <span className="aw-ac__yen">
                    {done ? yen(r.yen) : now ? s.slice(0, typing) : ""}
                    {now && <i className="aw-ac__caret" />}
                  </span>
                </div>
              );
            })}
            <div className="aw-ac__row aw-ac__row--sum">
              <span>合計</span>
              <span />
              <span />
              <span className="aw-ac__yen">{yen(total)}</span>
            </div>
          </div>
          <div className="aw-ac__side">
            <p className="aw-ac__k">月ごとの売上</p>
            <div className="aw-ac__chart">
              {months.map((m, i) => (
                <div key={m.m} className={`aw-ac__col ${i === months.length - 1 ? "is-now" : ""}`}>
                  <span className="aw-ac__barv" style={{ height: `${Math.max(1, (m.yen / max) * 100)}%` }} />
                  <span className="aw-ac__m">{m.m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

/* ───────── AI顧問：困りごとが窓口に集まる ───────── */

// 付箋の文と、散らばる位置（窓口から見た向き）。済んだ物は窓口の下に横一列で並ぶ
const NOTES = [
  { t: "HPの文字を直したい", x: -1, y: -0.75 },
  { t: "パソコンが重い", x: 1, y: -0.6 },
  { t: "AIって使える？", x: -1, y: 0.7 },
  { t: "メールが届かない", x: 1, y: 0.9 },
  { t: "見積書の型を作りたい", x: 0.45, y: -1.15 },
];

function Desk() {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box);
  const reduced = useReduced();
  // 各付箋の状態: 0=外 1=散らばって浮いている 2=窓口に重なった 3=済（下の列へ）
  const [st, setSt] = useState<number[]>(NOTES.map(() => 0));

  useEffect(() => {
    if (reduced) {
      setSt(NOTES.map(() => 3));
      return;
    }
    if (!inView) return;
    let alive = true;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((ok) => timers.push(window.setTimeout(ok, ms)));
    const set = (i: number, v: number) => setSt((a) => a.map((x, k) => (k === i ? v : x)));
    (async () => {
      while (alive) {
        setSt(NOTES.map(() => 0));
        await wait(500);
        // まず全部が散らばって現れる
        for (let i = 0; i < NOTES.length && alive; i++) {
          set(i, 1);
          await wait(220);
        }
        await wait(900);
        // 1枚ずつ窓口に集まり、判が押される
        for (let i = 0; i < NOTES.length && alive; i++) {
          set(i, 2);
          await wait(650);
          set(i, 3);
          await wait(550);
        }
        await wait(2800);
      }
    })();
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduced]);

  const doneCount = st.filter((v) => v === 3).length;

  return (
    <figure className="aw-stg aw-stg--desk" ref={box}>
      <div className="aw-stg__rail">
        <p className="aw-stg__k">見本　ある月の困りごと</p>
        <p className="aw-stg__big aw-stg__big--num" aria-hidden="true">
          <span key={doneCount} className="aw-stg__flip">
            {doneCount}
          </span>
          <small>/{NOTES.length} 済</small>
        </p>
        <p className="aw-stg__note">どこに頼めばいいか分からない事も、ALPACAがまとめて受けます。</p>
      </div>

      <div className="aw-stg__main aw-dk" aria-hidden="true">
        <div className="aw-dk__hub">
          <span className="aw-dk__role">IT担当</span>
          <b className="aw-dk__name">ALPACA</b>
        </div>
        {NOTES.map((nt, i) => {
          const s = st[i];
          const style = {
            "--fx": `${nt.x}`,
            "--fy": `${nt.y}`,
            "--i": `${i - 2}`,
            // スマホでは済んだ物を3枚・2枚の2段に並べる
            "--c": `${i < 3 ? i - 1 : i - 3.5}`,
            "--row": `${i < 3 ? 0 : 1}`,
            "--rot": `${((i * 37) % 11) - 5}deg`,
            zIndex: s >= 2 ? 10 + i : 1,
          } as React.CSSProperties;
          return (
            <div key={nt.t} className={`aw-dk__note is-s${s}`} style={style}>
              <small>#{String(i + 1).padStart(2, "0")}</small>
              <span>{nt.t}</span>
              <i className="aw-dk__stamp">済</i>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
