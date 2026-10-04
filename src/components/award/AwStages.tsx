"use client";

import { useEffect, useRef, useState } from "react";

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

/* ───────── ホームページ：組み上がるページ ───────── */

const WEB_STEPS = ["骨組み", "写真と見出し", "文章", "ボタン"];

function BuildPage() {
  // 進み具合は見本の画面の位置で測る（スマホではレールが上に乗るので、図全体だと早く進みすぎる）
  const box = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) {
      setStep(4);
      return;
    }
    const onScroll = () => {
      const el = box.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 画面の頭が下80%に来た所から、上25%に来るまでで4段を進める（最初の段＝骨組みは入った時から）
      const p = (vh * 0.8 - r.top) / (vh * 0.55);
      setStep(Math.max(0, Math.min(4, 1 + Math.floor(p * 3.3))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const shownStep = Math.max(1, step);

  return (
    <figure className="aw-stg aw-stg--web" data-step={step}>
      <div className="aw-stg__rail">
        <p className="aw-stg__k">見本　ページができるまで</p>
        <p className="aw-stg__big aw-stg__big--num" aria-hidden="true">
          <span key={shownStep} className="aw-stg__flip">
            0{shownStep}
          </span>
          <small>/04</small>
        </p>
        <p className="aw-stg__now" aria-hidden="true">{WEB_STEPS[shownStep - 1]}</p>
        <ol className="aw-bp__steps">
          {WEB_STEPS.map((t, k) => (
            <li key={t} className={k < shownStep ? "is-on" : ""} aria-current={k === shownStep - 1 ? "step" : undefined}>
              <span>0{k + 1}</span>
              {t}
            </li>
          ))}
        </ol>
        <p className={`aw-stg__done ${step >= 4 ? "is-on" : ""}`} aria-hidden="true">
          Done!
        </p>
      </div>

      <div className="aw-stg__main aw-bp" aria-hidden="true" ref={box}>
        <div className="aw-bp__bar">
          <i />
          <i />
          <i />
          <span className="aw-bp__url">your-company.jp</span>
        </div>
        <div className="aw-bp__page">
          <div className="aw-bp__nav">
            <span className="aw-bp__logo">
              <b>宿 あおば</b>
            </span>
            <span className="aw-bp__links">
              <i>お部屋</i>
              <i>過ごし方</i>
              <i>ご予約</i>
            </span>
          </div>
          <div className="aw-bp__hero">
            <div className="aw-bp__img">
              <img src="/images/scene/s5-window.webp" alt="" loading="lazy" />
            </div>
            <div className="aw-bp__copy">
              <p className="aw-bp__h">
                <b>海が見える部屋で、</b>
                <b>何もしない休日を。</b>
              </p>
              <p className="aw-bp__t">
                <b>一日三組まで。朝ごはんは、島の野菜で。</b>
              </p>
              <span className="aw-bp__btn">
                <b>空いている日を見る</b>
              </span>
            </div>
          </div>
          <div className="aw-bp__cards">
            {[
              ["海まで歩いて3分", "s1-sea"],
              ["夕方は縁側で", "s6-dusk"],
              ["仕事もできる机", "s2-desk"],
            ].map(([c, img]) => (
              <div className="aw-bp__card" key={c}>
                <span className="aw-bp__cimg">
                  <img src={`/images/scene/${img}.webp`} alt="" loading="lazy" />
                </span>
                <b>{c}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
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
