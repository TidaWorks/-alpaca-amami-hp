import type { Metadata } from "next";
import "./hinata.css";
import SampleNote from "../SampleNote";
import Reveal from "../Reveal";
import HinataNav from "./HinataNav";

// 見本サイト：奄美のたんかん農園（架空）。お手本は とかちフルーツビレッジ（並べ方・余白・文字の組み方の物差しだけ・写真と絵と文は全部こちらで作った）
export const metadata: Metadata = {
  title: "ひなた農園（見本）",
  description: "ALPACA が作ったホームページの見本。奄美大島にある架空のたんかん農園のサイトです。",
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&family=Quicksand:wght@500;600;700&display=swap";

const IMG = "/samples/hinata";

function Pic({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`hn-pic ${className}`} data-rv>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${IMG}/${src}.webp`} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

// たんかんの印（橙の丸に葉っぱ1枚）
function Mark({ className = "" }: { className?: string }) {
  return (
    <svg className={`hn-mark ${className}`} viewBox="0 0 64 72" aria-hidden="true">
      <path className="hn-mark__stem" d="M32 18 C 32 13, 33 10, 35 7" />
      <path className="hn-mark__leaf" d="M35 9 C 40 1, 52 0, 58 4 C 54 12, 43 15, 35 9 Z" />
      <circle className="hn-mark__fruit" cx="32" cy="44" r="26" />
      <circle className="hn-mark__hi" cx="22" cy="34" r="4.5" />
    </svg>
  );
}

// 区切りの波
function Wave({ className = "" }: { className?: string }) {
  return (
    <svg className={`hn-wave ${className}`} viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 22 C 60 8, 120 8, 180 22 S 300 36, 360 22 S 480 8, 540 22 S 660 36, 720 22 S 840 8, 900 22 S 1020 36, 1080 22 S 1200 8, 1260 22 S 1380 36, 1440 22 L 1440 40 L 0 40 Z" />
    </svg>
  );
}

// ふわふわ浮かぶ小さな丸（橙・葉の緑・黄）。位置は固定で、毎回同じ見え方にする
const DOTS: [number, number, number, string, number][] = [
  [8, 12, 7, "o", 0],
  [22, 64, 5, "g", 2],
  [36, 28, 6, "y", 4],
  [88, 18, 8, "o", 1],
  [94, 58, 5, "g", 3],
  [74, 82, 6, "y", 5],
  [14, 88, 5, "o", 6],
  [58, 6, 4, "g", 7],
];
function Dots({ className = "" }: { className?: string }) {
  return (
    <div className={`hn-dots ${className}`} aria-hidden="true">
      {DOTS.map(([x, y, s, c, d], i) => (
        <i
          key={i}
          className={`hn-dot hn-dot--${c}`}
          style={{ left: `${x}%`, top: `${y}%`, width: s * 1.6, height: s * 1.6, animationDelay: `${-d * 1.7}s` }}
        />
      ))}
    </div>
  );
}

const SEASONS = [
  { src: "spring", kigo: "春", month: "3〜5月ごろ", h: "白い花が咲く", t: "枝の先に小さな白い花がつき、畑に甘い香りがします。冬に切りそろえた枝から、新しい葉が伸びる時期です。", alt: "枝先に咲いた白い柑橘の花" },
  { src: "summer", kigo: "夏", month: "6〜8月ごろ", h: "実を間引く", t: "青い実がたくさんつくので、ひと枝に残す数を決めて摘みます。草刈りと、台風の前の支柱の見回りも夏の仕事です。", alt: "葉のあいだの小さな青い実" },
  { src: "autumn", kigo: "秋", month: "9〜12月ごろ", h: "少しずつ色づく", t: "秋の終わりから、緑の実が少しずつ橙に変わります。鳥に食べられないよう、網の傷みを直して回ります。", alt: "緑から橙に変わりはじめた実" },
  { src: "winter", kigo: "冬", month: "1〜3月ごろ", h: "摘んで、箱に詰める", t: "色づいた実から順に、はさみで一つずつ摘みます。家族みんなで箱に詰めて、その日のうちに送り出します。", alt: "かごに入った摘みたてのたんかんを持つ手" },
];

const BOXES = [
  { kg: "2", name: "ちいさい箱", note: "12〜16個ほど・ご自宅用に", price: "2,800" },
  { kg: "5", name: "なかの箱", note: "30〜40個ほど・ご家族で", price: "5,500" },
  { kg: "10", name: "おおきい箱", note: "60〜80個ほど・お裾分けに", price: "9,800" },
];

const NEWS = [
  { d: "2026-10-01", t: "2026.10.01", c: "ご注文", h: "今季のご予約の受付は12月1日から始めます。" },
  { d: "2026-09-18", t: "2026.09.18", c: "畑から", h: "台風のあと、畑の木はみんな無事でした。網を張り直しています。" },
  { d: "2026-08-02", t: "2026.08.02", c: "直売所", h: "直売所は1月の土曜日から開ける予定です。" },
];

export default function HinataPage() {
  return (
    <div className="hn" id="top">
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <SampleNote bg="#FFF4E8" fg="#8A4A12" font="'M PLUS Rounded 1c', sans-serif" />

      <header className="hn-bar">
        <a href="#top" className="hn-bar__logo" aria-label="ひなた農園 トップへ">
          <Mark />
          <span>ひなた農園</span>
        </a>
        <p className="hn-bar__place" aria-hidden="true">
          <span>KAGOSHIMA</span>
          <span>AMAMI OSHIMA</span>
          <span>TANKAN FARM</span>
        </p>
      </header>

      <main>
        {/* 一番上：白い地に印と縦書きの店名、その下に大きな写真 */}
        <section className="hn-hero" aria-labelledby="hn-h1">
          <Dots />
          <div className="hn-hero__logo">
            <Mark className="hn-mark--hero" />
            <h1 id="hn-h1" className="hn-hero__name">
              <span className="hn-hero__ja">ひなた農園</span>
              <span className="hn-hero__en" lang="en">
                HINATA TANKAN FARM
              </span>
            </h1>
          </div>
          <div className="hn-hero__photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/hero.webp`} alt="日の当たる窓辺のテーブルで、子どもの手がたんかんの皮をむいている" fetchPriority="high" />
          </div>
        </section>

        {/* 農園のこと */}
        <section className="hn-about" id="farm" aria-labelledby="hn-farm-h">
          <Dots className="hn-dots--soft" />
          <div className="hn-about__inner">
            <p className="hn-label" data-rv>
              農園のこと
            </p>
            <h2 id="hn-farm-h" className="hn-h2" data-rv>
              冬の畑から、
              <br />
              家族の手でお届けします
            </h2>
            <div className="hn-body" data-rv>
              <p>ひなた農園は、奄美大島の日当たりのいい斜面にある、家族でやっている小さなたんかん畑です。</p>
              <p>
                祖父が植えた木を、父と母が育て、いまは子どもたちも冬の収穫を手伝っています。摘む人と箱に詰める人の顔が見える距離で、ひと箱ずつ送り出しています。
              </p>
            </div>
          </div>
          <div className="hn-about__pics">
            <Pic src="child" alt="青空にたんかんをかかげる子どもの手" className="hn-pic--s" />
            <Pic src="peeled" alt="白い皿の上でむいたたんかん" className="hn-pic--m" />
          </div>
        </section>

        <section className="hn-work" aria-labelledby="hn-work-h">
          <Wave />
          <div className="hn-work__in">
            <div className="hn-work__head" data-rv>
              <Mark className="hn-mark--big" />
              <h2 id="hn-work-h" className="hn-tate">
                <span>育てて</span>
                <span>届ける</span>
              </h2>
            </div>
            <p className="hn-side hn-side--l" aria-hidden="true" lang="en">
              FROM OUR FAMILY FARM
            </p>
            <p className="hn-side hn-side--r hn-tate-s" aria-hidden="true">
              ひなたで育った、たんかん
            </p>
            <ol className="hn-cards">
              <li className="hn-card" data-rv>
                <span className="hn-card__no">01</span>
                <h3>畑で育てる</h3>
                <Pic src="harvest" alt="手袋をした手が、はさみでたんかんを枝から切っている" className="hn-card__pic" />
                <p>農薬はできるだけ控え、草は刈って畑に戻しています。実が木の上で色づくのを待ってから摘みます。</p>
                <a className="hn-card__more" href="#tankan">
                  たんかんのこと
                  <svg viewBox="0 0 12 8" aria-hidden="true">
                    <path d="M1 1.5 L6 6.5 L11 1.5" />
                  </svg>
                </a>
              </li>
              <li className="hn-card hn-card--r" data-rv>
                <span className="hn-card__no">02</span>
                <h3>箱に詰めて届ける</h3>
                <Pic src="box" alt="段ボールの箱にたんかんを並べて詰める手" className="hn-card__pic" />
                <p>摘んだ実は家の作業場でひとつずつ見て、傷のないものを箱に並べます。直売所でも同じ実を売っています。</p>
                <a className="hn-card__more" href="#order">
                  ご注文
                  <svg viewBox="0 0 12 8" aria-hidden="true">
                    <path d="M1 1.5 L6 6.5 L11 1.5" />
                  </svg>
                </a>
              </li>
            </ol>
          </div>
          <Wave className="hn-wave--down" />
        </section>

        {/* たんかんのこと */}
        <section className="hn-tankan" id="tankan" aria-labelledby="hn-tankan-h">
          <div className="hn-tankan__head">
            <h2 id="hn-tankan-h" className="hn-h2 hn-h2--wide" data-rv>
              たんかんのこと
            </h2>
            <div className="hn-round" data-rv>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/fruit.webp`} alt="葉のあいだに実った橙のたんかん" loading="lazy" decoding="async" />
              <svg className="hn-round__leaf" viewBox="0 0 60 40" aria-hidden="true">
                <path d="M4 34 C 10 10, 36 2, 56 6 C 50 28, 26 40, 4 34 Z" />
                <path className="hn-round__vein" d="M8 32 C 22 24, 38 14, 52 8" />
              </svg>
            </div>
          </div>
          <div className="hn-body hn-body--c" data-rv>
            <p>たんかんは、奄美の冬から春にかけて出回る柑橘です。収穫は1月から3月ごろ。</p>
            <p>皮は少しかためで、手でむけます。果汁が多いので、むく時はお皿の上がおすすめです。</p>
          </div>
          <ul className="hn-facts">
            <li data-rv>
              <h3>とれる時期</h3>
              <p className="hn-facts__big">
                1<small>月</small>〜3<small>月</small>
              </p>
              <p>木の上で色づいた実から順に摘みます。年によって前後します。</p>
            </li>
            <li data-rv>
              <h3>食べ方</h3>
              <p className="hn-facts__big">手でむく</p>
              <p>そのままひと房ずつ。半分に切って絞れば、朝のジュースになります。</p>
            </li>
            <li data-rv>
              <h3>しまい方</h3>
              <p className="hn-facts__big">涼しい所に</p>
              <p>届いたら箱のふたを開け、風通しのいい涼しい所に置いてください。</p>
            </li>
          </ul>
        </section>

        {/* 畑の1年 */}
        <section className="hn-year" id="year" aria-labelledby="hn-year-h">
          <Wave />
          <div className="hn-year__in">
            <div className="hn-year__head" data-rv>
              <p className="hn-en" lang="en">
                A YEAR ON THE FARM
              </p>
              <h2 id="hn-year-h" className="hn-h2">
                畑の1年
              </h2>
              <p className="hn-year__lead">たんかんの実を摘むのは冬の3か月。残りの季節は、次の冬のための仕事です。</p>
            </div>
            <ol className="hn-seasons" aria-label="季節ごとの仕事">
              {SEASONS.map((s) => (
                <li key={s.src} className="hn-season" data-rv>
                  <div className="hn-season__top">
                    <span className="hn-season__kigo">{s.kigo}</span>
                    <span className="hn-season__month">{s.month}</span>
                  </div>
                  <div className="hn-season__pic">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${IMG}/${s.src}.webp`} alt={s.alt} loading="lazy" decoding="async" />
                  </div>
                  <h3>{s.h}</h3>
                  <p>{s.t}</p>
                </li>
              ))}
            </ol>
          </div>
          <Wave className="hn-wave--down" />
        </section>

        {/* 写真の帯 */}
        <section className="hn-band" aria-label="冬の畑">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${IMG}/hill.webp`} alt="実のなった木のあいだを、木箱とかごを持って歩く家族の後ろ姿" loading="lazy" decoding="async" />
          <p className="hn-band__txt hn-tate-b" data-rv>
            <span>冬の畑が</span>
            <span>橙でいっぱいに</span>
            <span>なるころ</span>
          </p>
        </section>

        {/* ご注文 */}
        <section className="hn-order" id="order" aria-labelledby="hn-order-h">
          <Dots className="hn-dots--soft" />
          <div className="hn-order__head" data-rv>
            <p className="hn-label">ご注文</p>
            <h2 id="hn-order-h" className="hn-h2">
              ひと箱ずつ、
              <br />
              摘んだ順にお送りします
            </h2>
          </div>
          <div className="hn-ship" data-rv>
            <dl>
              <div>
                <dt>ご予約</dt>
                <dd>12月1日から受け付けます</dd>
              </div>
              <div>
                <dt>発送</dt>
                <dd>1月下旬から3月ごろ、ご予約の順に</dd>
              </div>
              <div>
                <dt>送料</dt>
                <dd>地域ごとに別でいただきます</dd>
              </div>
            </dl>
          </div>
          <ul className="hn-boxes">
            {BOXES.map((b, i) => (
              <li key={b.kg} className={`hn-box hn-box--${i}`} data-rv>
                <span className="hn-box__kg">
                  {b.kg}
                  <small>kg</small>
                </span>
                <h3>{b.name}</h3>
                <p className="hn-box__note">{b.note}</p>
                <p className="hn-box__price">
                  {b.price}
                  <small>円（税込）</small>
                </p>
              </li>
            ))}
          </ul>
          <p className="hn-order__memo" data-rv>
            ※ 箱の大きさと値段は見本です。見た目に小さな傷のあるご家庭用の箱もあります。
          </p>
          <div className="hn-order__btns" data-rv>
            <a className="hn-btn" href="#order">
              ご注文フォーム（見本）
            </a>
            <a className="hn-btn hn-btn--line" href="tel:0997000000">
              電話で注文する 0997-00-0000
            </a>
          </div>
        </section>

        {/* 直売所 */}
        <section className="hn-stand" id="stand" aria-labelledby="hn-stand-h">
          <div className="hn-stand__card" data-rv>
            <div className="hn-stand__txt">
              <p className="hn-label">直売所</p>
              <h2 id="hn-stand-h" className="hn-h3">
                畑の入り口の、小さな小屋
              </h2>
              <p>収穫の時期だけ、畑の入り口で直売所を開けています。その朝に摘んだ実を、かごに入れて並べます。</p>
              <dl className="hn-stand__dl">
                <div>
                  <dt>開いている日</dt>
                  <dd>1月〜3月の土曜・日曜</dd>
                </div>
                <div>
                  <dt>時間</dt>
                  <dd>9:00〜15:00（売り切れたら閉めます）</dd>
                </div>
                <div>
                  <dt>場所</dt>
                  <dd>鹿児島県奄美市（見本のため住所は架空です）</dd>
                </div>
              </dl>
            </div>
            <Pic src="stand" alt="かごに入ったたんかんが並ぶ、木の小さな直売所" className="hn-stand__pic" />
          </div>
        </section>

        {/* お知らせ */}
        <section className="hn-news" id="news" aria-labelledby="hn-news-h">
          <h2 id="hn-news-h" className="hn-h3 hn-news__h" data-rv>
            お知らせ
          </h2>
          <ul className="hn-news__list">
            {NEWS.map((n) => (
              <li key={n.d} data-rv>
                <time dateTime={n.d}>{n.t}</time>
                <span className="hn-news__cat">{n.c}</span>
                <p>{n.h}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* 案内 */}
      <footer className="hn-foot" id="access">
        <div className="hn-foot__blobs" aria-hidden="true">
          {["crate", "spring", "fruit", "harvest"].map((s, i) => (
            <div key={s} className={`hn-blob hn-blob--${i}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/${s}.webp`} alt="" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
        <div className="hn-foot__in">
          <div className="hn-foot__logo">
            <Mark className="hn-mark--foot" />
            <p className="hn-tate">
              <span>ひなた</span>
              <span>農園</span>
            </p>
            <p className="hn-foot__en" lang="en">
              HINATA TANKAN FARM
            </p>
          </div>
          <div className="hn-foot__info">
            <h2 className="hn-foot__h">案内</h2>
            <dl>
              <div>
                <dt>農園</dt>
                <dd>ひなた農園（家族経営のたんかん畑）</dd>
              </div>
              <div>
                <dt>場所</dt>
                <dd>鹿児島県奄美市（見本のため住所は架空です）</dd>
              </div>
              <div>
                <dt>電話</dt>
                <dd>
                  <a href="tel:0997000000">0997-00-0000</a>（8:00〜17:00）
                </dd>
              </div>
              <div>
                <dt>SNS</dt>
                <dd>Instagram（見本）</dd>
              </div>
            </dl>
          </div>
          <div className="hn-foot__contact">
            <h2 className="hn-foot__h">お問い合わせ</h2>
            <p>ご注文・直売所のこと・畑の見学は、お電話でお気軽に。</p>
            <a className="hn-foot__tel" href="tel:0997000000">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
              </svg>
              0997-00-0000
            </a>
          </div>
        </div>
      </footer>

      <section className="hn-end" aria-label="おわりに">
        <Dots />
        <p className="hn-tate hn-end__txt">
          <span>ひなたで</span>
          <span>そだった</span>
          <span>たんかん</span>
        </p>
        <div className="hn-end__marks" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <Mark key={i} className="hn-mark--row" />
          ))}
        </div>
        <p className="hn-end__c">© 2026 ひなた農園（見本） sample site by ALPACA</p>
      </section>

      <HinataNav />
      <Reveal />
    </div>
  );
}
