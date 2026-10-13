import type { Metadata } from "next";
import "./yururi.css";
import SampleNote from "../SampleNote";
import Reveal from "../Reveal";
import YururiMenu from "./YururiMenu";
import { YR_LINKS } from "./links";
import YururiMotion from "./YururiMotion";

// 見本サイト：奄美市の町の整骨院（架空）。お手本は 桔梗が丘整骨院（並べ方・余白・写真の散らし方の物差しだけ・写真と文は全部こちらで作った）
// 医療の広告の決まりに合わせて、効果・体験談・比較・順位は書かない
export const metadata: Metadata = {
  title: "ゆるり整骨院（見本）",
  description: "ALPACA が作ったホームページの見本。奄美大島にある架空の整骨院のサイトです。",
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400;500&family=Zen+Kaku+Gothic+New:wght@300;400;500&family=Jost:wght@300;400&display=swap";

const IMG = "/samples/yururi";

function Pic({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`yr-pic ${className}`} data-rv>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${IMG}/${src}.webp`} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

function Head({ en, ja, id, center = false }: { en: string; ja: string; id: string; center?: boolean }) {
  return (
    <div className={`yr-head ${center ? "yr-head--c" : ""}`} data-rv>
      <p className="yr-head__en" aria-hidden="true">
        {en}
      </p>
      <h2 id={id} className="yr-head__ja">
        {ja}
      </h2>
    </div>
  );
}

// 水彩のにじみのような淡い色の点（飾り）
function Wash({ className }: { className: string }) {
  return <span className={`yr-wash ${className}`} aria-hidden="true" />;
}

// 色の面の上下の、ゆるい波の縁
function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <svg className={`yr-wave ${flip ? "yr-wave--b" : ""}`} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 52 C 240 8, 520 4, 760 30 S 1220 70, 1440 22 L1440 80 L0 80 Z" />
    </svg>
  );
}

const NEWS = [
  { date: "2026-10-06", label: "2026.10.06", text: "10月24日（土）は院内の研修のため、休診とします。" },
  { date: "2026-10-02", label: "2026.10.02", text: "11月3日（火・文化の日）は休診です。" },
  { date: "2026-09-10", label: "2026.09.10", text: "待合の椅子を、座面の高いものに替えました。" },
];

const CASES = [
  {
    src: "hands-back",
    alt: "うつぶせの方の腰に、タオルの上から手を当てているところ",
    tag: "腰のこと",
    lines: ["朝、靴下をはく時に腰が重い", "草取りや荷物の積み下ろしのあとに、腰が張る"],
  },
  {
    src: "hands-shoulder-c",
    alt: "座っている方の両肩に、後ろから手を添えているところ",
    tag: "肩のこと",
    lines: ["パソコンや針仕事のあと、肩がこわばる", "腕を上げると、肩の奥がつっぱる"],
  },
  {
    src: "hands-neck",
    alt: "首のつけ根に、手を軽く当てているところ",
    tag: "首のこと",
    lines: ["寝違えて、うしろを振り向きにくい", "長い運転のあと、首から背中が重い"],
  },
  {
    src: "hands-ankle",
    alt: "足首とかかとを、両手で支えているところ",
    tag: "足首・手首のこと",
    lines: ["段差で足首をひねった", "部活や散歩の途中でくじいた"],
  },
];

const FLOW = [
  { n: "01", h: "受付", t: "保険証をお持ちの方は、受付でお出しください。はじめての方には、問診票を書いていただきます。" },
  { n: "02", h: "お話を聞く", t: "いつから、どんな時に痛むのか。座ったまま話を聞き、動かしにくい向きを一緒に確かめます。" },
  { n: "03", h: "施術", t: "何をするかを先にお話しし、うなずいてもらってから始めます。途中で痛い時は、すぐに止めます。" },
  { n: "04", h: "お会計と次の相談", t: "次に来る目安と、家での過ごし方を一つだけお伝えします。次の予約はその場でも電話でも取れます。" },
];

const PRICE = [
  {
    h: "保険での施術",
    note: "けがによる痛み（ねんざ・打撲・肉ばなれなど）。はじめての方も、こちらの料金です",
    rows: [["自己負担", "保険証の割合による"]],
  },
  {
    h: "保険外：はじめての方の問診と施術",
    note: "保険の対象にならない痛みやこわばりで、はじめて来られた方。お話と確認に時間をとります",
    rows: [["約60分", "4,400円"]],
  },
  { h: "保険外：ほぐし整体", note: "保険の対象にならない肩や腰のこわばりに", rows: [["30分", "3,300円"], ["60分", "5,500円"]] },
  { h: "テーピング", note: "施術のあと、ご希望があれば", rows: [["1か所", "550円"]] },
];

const DAYS = ["月", "火", "水", "木", "金", "土", "日・祝"];
const AM = ["○", "○", "○", "○", "○", "○", "休"];
const PM = ["○", "○", "○", "休", "○", "休", "休"];

export default function YururiPage() {
  return (
    <div className="yr" id="top">
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <SampleNote bg="#efe9f1" fg="#6d6274" font="'Zen Kaku Gothic New', sans-serif" />
      <YururiMenu />

      {/* 一番上：明るい施術室の写真と、左上の添え書き */}
      <header className="yr-hero">
        <div className="yr-hero__img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${IMG}/hero.webp`} alt="白いカーテンから朝の光が入る、明るい施術室" fetchPriority="high" />
        </div>
        <div className="yr-hero__copy">
          <p className="yr-hero__lead">
            奄美市の住宅地にある
            <br />
            ちいさな整骨院
          </p>
          <p>
            ベッドは三台。
            <br />
            ひとりずつ、時間をとって
            <br />
            お話を聞きます。
          </p>
          <p>
            仕事帰りに寄れるよう、
            <br />
            月・火・水・金は夜七時半まで
            <br />
            受け付けています。
          </p>
        </div>
        <h1 className="yr-hero__logo">
          <span className="yr-hero__name">ゆるり整骨院</span>
          <span className="yr-hero__sub">yururi seikotsuin</span>
        </h1>
      </header>

      <nav className="yr-nav" aria-label="ページ内の案内（大きな画面）">
        <ul>
          {YR_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>
                <small>{l.en}</small>
                <span>{l.ja}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        {/* お知らせ */}
        <section className="yr-news" id="yr-news" aria-labelledby="yr-news-h">
          <h2 id="yr-news-h" className="yr-grad" data-rv>
            当院からのお知らせ
          </h2>
          <ul data-rv>
            {NEWS.map((n) => (
              <li key={n.date}>
                <span className="yr-arrow" aria-hidden="true" />
                <time dateTime={n.date}>{n.label}</time>
                <p>{n.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* はじめに：小さな写真を散らして、まん中に縦書き */}
        <section className="yr-intro" aria-labelledby="yr-intro-h">
          <div className="yr-float" aria-hidden="true">
            <Pic src="exterior" alt="" className="yr-f yr-f1" />
            <Pic src="leaves" alt="" className="yr-f yr-f3" />
            <Pic src="taping" alt="" className="yr-f yr-f6" />
          </div>
          <div className="yr-intro__tate" data-rv>
            <h2 id="yr-intro-h">
              <span>どこが、いつから、</span>
              <span>どんなふうに。</span>
              <span>まずはそこから</span>
              <span>聞かせてください。</span>
            </h2>
          </div>
          <span className="yr-intro__line" aria-hidden="true" />
          <p className="yr-intro__body" data-rv>
            ゆるり整骨院は、柔道整復師が二人で営む整骨院です。
            <br className="yr-pc" />
            畑仕事の帰りの方も、部活帰りの学生さんも、普段着のまま来られます。
          </p>
          <Wash className="yr-wash--a" />
          <Wash className="yr-wash--b" />
        </section>

        {/* こんな時に */}
        <section className="yr-case" id="yr-case" aria-labelledby="yr-case-h">
          <Wave />
          <div className="yr-case__in">
            <Head en="Case" ja="こんな時に、ご相談ください" id="yr-case-h" center />
            <ul className="yr-case__list">
              {CASES.map((c, i) => (
                <li key={c.src} className={`yr-case__item yr-case__item--${i + 1}`}>
                  <Pic src={c.src} alt={c.alt} className="yr-cap" />
                  <div className="yr-case__txt" data-rv>
                    <h3 className="yr-chip">{c.tag}</h3>
                    <ul>
                      {c.lines.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
            <p className="yr-case__note" data-rv>
              けがの程度や痛みの出方によっては、整形外科などの受診をおすすめすることがあります。
              <br className="yr-pc" />
              その時は、近くの医療機関をご案内します。
            </p>
          </div>
          <Wash className="yr-wash--c" />
          <Wave flip />
        </section>

        {/* 当院の施術 */}
        <section className="yr-about" aria-labelledby="yr-about-h">
          <Pic src="hands-wrist" alt="タオルの上で、手首と腕を両手で支えているところ" className="yr-cap yr-about__l" />
          <div className="yr-about__c" data-rv>
            <p className="yr-grad yr-about__lead">
              強く押したり、
              <br />
              勢いをつけてひねったり
              <br />
              はしません。
            </p>
            <h2 id="yr-about-h" className="yr-sr">
              ゆるり整骨院の施術
            </h2>
            <p>
              まず、痛む場所と、動かしにくい向きを一緒に確かめます。
              <br />
              そのうえで、手でほぐす、温める、テーピングで支えるなど、その日のからだの様子に合わせて組み合わせます。
            </p>
            <p>
              わからないことは、施術の途中でも聞いてください。
              <br />
              いま何をしているのかを、そのつどお話しします。
            </p>
          </div>
          <Pic src="hands-shoulder" alt="肩に手を当てて、こわばりを確かめているところ" className="yr-cap yr-about__r" />
          <Wash className="yr-wash--d" />
        </section>

        {/* 施術の流れ */}
        <section className="yr-flow" id="yr-flow" aria-labelledby="yr-flow-h">
          <Head en="Flow" ja="施術の流れ" id="yr-flow-h" />
          {/* 点線を左から（スマホは上から）引き、01〜04 を順に出す */}
          <ol className="yr-flow__list" data-rv>
            {FLOW.map((f, i) => (
              <li key={f.n} data-rv style={{ "--i": i } as React.CSSProperties}>
                <span className="yr-num" aria-hidden="true">
                  <svg viewBox="0 0 60 60">
                    <path pathLength={1} d="M31 4 C 47 4, 57 15, 56 31 C 55 47, 44 57, 29 56 C 13 55, 4 45, 5 29 C 6 14, 16 4, 31 4 Z" />
                  </svg>
                  {f.n}
                </span>
                <h3>{f.h}</h3>
                <p>{f.t}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 料金 */}
        <section className="yr-price" id="yr-price" aria-labelledby="yr-price-h">
          <div className="yr-price__main">
            <Head en="Price" ja="料金について" id="yr-price-h" />
            <dl className="yr-price__list" data-rv>
              {PRICE.map((p) => (
                <div key={p.h} className="yr-price__row">
                  <dt>
                    {p.h}
                    <small>{p.note}</small>
                  </dt>
                  <dd>
                    {p.rows.map(([a, b]) => (
                      <span key={a}>
                        <em>{a}</em>
                        {b}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="yr-price__memo" data-rv>
              料金は税込です。いずれも見本のための架空の料金です。
              <br />
              保険が使えるかどうかは、お話を聞いたうえで、施術の前にお伝えします。
            </p>
          </div>
          <aside className="yr-price__card" data-rv aria-labelledby="yr-ins-h">
            <span className="yr-price__mark" aria-hidden="true">
              sample
            </span>
            <h3 id="yr-ins-h">保険の取り扱いについて（見本）</h3>
            <p>
              ねんざ・打撲・挫傷（肉ばなれ）など、けがによる痛みには健康保険が使える場合があります。骨折・脱臼は、応急の手当てのあと医師の同意が必要です。
            </p>
            <p>
              毎日の疲れや、はっきりした原因のない肩こりは、保険の対象になりません。どちらに当たるかは、お話を聞いたうえで受付でご説明します。
            </p>
          </aside>
        </section>

        {/* 院内の様子 */}
        <section className="yr-room" id="yr-room" aria-labelledby="yr-room-h">
          <div className="yr-room__wide">
            <Pic src="waiting" alt="木のベンチと大きな観葉植物のある、明るい待合" className="yr-room__big" />
            <div className="yr-room__tate" data-rv>
              <h2 id="yr-room-h">院内の様子</h2>
              <p>窓の大きな、明るい待合です</p>
            </div>
          </div>
          <ul className="yr-room__grid">
            <li>
              <Pic src="entrance" alt="入口ののれんと、白いスリッパの並ぶ靴棚" className="yr-room__p" />
              <p data-rv>入口で、スリッパに履きかえます。</p>
            </li>
            <li>
              <Pic src="reception" alt="木の受付台" className="yr-room__p" />
              <p data-rv>受付。予約の電話もここで受けます。</p>
            </li>
            <li>
              <Pic src="room-bed" alt="カーテンで仕切った、三台の施術ベッド" className="yr-room__p" />
              <p data-rv>施術室。ベッドの間は、カーテンで仕切っています。</p>
            </li>
            <li>
              <Pic src="leaves" alt="白い壁に映る、大きな葉の影" className="yr-room__p" />
              <p data-rv>午前は、窓から葉の影が入ります。</p>
            </li>
          </ul>
        </section>

        {/* スタッフ */}
        <section className="yr-staff" id="yr-staff" aria-labelledby="yr-staff-h">
          <Wave />
          <div className="yr-staff__in">
            <Pic src="staff-back" alt="窓辺でタオルをたたむスタッフの後ろ姿" className="yr-cap yr-staff__pic" />
            <div className="yr-staff__txt">
              <Head en="Staff" ja="スタッフ" id="yr-staff-h" />
              <p className="yr-staff__lead" data-rv>
                柔道整復師が二人。
                <br />
                どちらも、奄美で育ちました。
              </p>
              <dl className="yr-staff__list" data-rv>
                <div>
                  <dt>
                    <span className="yr-chip">院長</span>柔道整復師
                  </dt>
                  <dd>高校まで陸上部。休みの日は、子どもと浜を歩いています。</dd>
                </div>
                <div>
                  <dt>
                    <span className="yr-chip">スタッフ</span>柔道整復師
                  </dt>
                  <dd>話しやすいと言われるのが、いちばんうれしいそうです。</dd>
                </div>
              </dl>
              <p className="yr-staff__memo" data-rv>
                施術はどちらかが担当します。ご希望があれば、予約の時にお伝えください。
              </p>
            </div>
          </div>
          <Wave flip />
        </section>

        {/* ご案内 */}
        <section className="yr-info" id="yr-info" aria-labelledby="yr-info-h">
          <div className="yr-info__hours">
            <Head en="Access" ja="ご案内" id="yr-info-h" />
            <div className="yr-table" data-rv>
              <table>
                <caption className="yr-sr">受付時間</caption>
                <thead>
                  <tr>
                    <th scope="col">受付時間</th>
                    {DAYS.map((d, i) => (
                      <th scope="col" key={d} data-col={i}>
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      9:00<span>〜</span>12:30
                    </th>
                    {AM.map((m, i) => (
                      <td key={i} data-col={i} className={m === "休" ? "is-off" : ""}>
                        {m === "休" ? (
                          "休"
                        ) : i === 5 ? (
                          <>
                            <span className="yr-dot" aria-label="受付（13:00まで）" />
                            <sup className="yr-kome" aria-hidden="true">
                              ※
                            </sup>
                          </>
                        ) : (
                          <span className="yr-dot" aria-label="受付" />
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">
                      15:00<span>〜</span>19:30
                    </th>
                    {PM.map((m, i) => (
                      <td key={i} data-col={i} className={m === "休" ? "is-off" : ""}>
                        {m === "休" ? "休" : <span className="yr-dot" aria-label="受付" />}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="yr-info__notes" data-rv>
              <li>※土曜日の午前は 9:00〜13:00 の受付です。</li>
              <li>休み　木曜の午後・土曜の午後・日曜・祝日</li>
              <li>
                予約なしでも受け付けます。電話をいただくと、
                <span className="yr-nw" data-nowrap>
                  お待たせせずに
                </span>
                ご案内できます。
              </li>
            </ul>
          </div>

          <div className="yr-info__panel">
            <div className="yr-map" data-rv>
              {/* 地図の代わりの、道と目印の簡単な図（見本） */}
              <svg viewBox="0 0 800 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <path className="yr-map__road yr-map__road--main" d="M-20 250 C 180 230, 320 280, 520 240 S 760 190, 820 210" />
                <path className="yr-map__road" d="M300 -20 C 310 90, 280 180, 330 400" />
                <path className="yr-map__road" d="M560 -20 C 540 80, 600 160, 590 400" />
                <path className="yr-map__road yr-map__road--thin" d="M-20 110 C 120 120, 220 90, 300 100" />
                <path className="yr-map__road yr-map__road--thin" d="M590 120 C 660 130, 740 100, 820 110" />
                <circle className="yr-map__pin-ring" cx="430" cy="206" r="26" />
                <path className="yr-map__pin" d="M430 168 c -14 0 -24 10 -24 23 c 0 17 24 37 24 37 s 24 -20 24 -37 c 0 -13 -10 -23 -24 -23 z" />
                <circle cx="430" cy="191" r="7" fill="#fff" />
              </svg>
              <a
                className="yr-map__link"
                href="https://www.google.com/maps/search/?api=1&query=%E5%A5%84%E7%BE%8E%E5%B8%82"
                target="_blank"
                rel="noopener noreferrer"
              >
                地図を開く（見本）
              </a>
            </div>
            <div className="yr-info__card" data-rv>
              <p className="yr-info__name">ゆるり整骨院</p>
              <p className="yr-info__sub">yururi seikotsuin</p>
              <p>
                鹿児島県奄美市
                <br />
                （見本のため住所は架空です）
              </p>
              <p>院の前に駐車場が2台分あります。</p>
              <p>受付 9:00〜12:30／15:00〜19:30</p>
              <a className="yr-tel" href="tel:0997000000">
                <small>tel</small>0997-00-0000
              </a>
              <p className="yr-info__sns">Instagram（見本）</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="yr-foot">
        <a href="#top" className="yr-foot__logo">
          ゆるり整骨院
        </a>
        <p>
          当サイトの文章と写真は見本のために作ったものです。
          <br className="yr-sp" />
          施術の内容は、からだの状態によって変わります。
        </p>
        <p className="yr-foot__c">(c) 2026 yururi seikotsuin / sample site by ALPACA</p>
      </footer>
      {/* スマホで画面の下に付いてくる電話ボタン */}
      <a className="yr-call" href="tel:0997000000">
        <span className="yr-call__ic" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
          </svg>
        </span>
        電話で予約する
        <small>0997-00-0000</small>
      </a>
      <Reveal />
      <YururiMotion />
    </div>
  );
}
