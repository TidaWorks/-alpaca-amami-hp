import type { Metadata } from "next";
import "./kaiji.css";
import SampleNote from "../SampleNote";
import Reveal from "../Reveal";
import KaijiMenu from "./KaijiMenu";

// 見本サイト：奄美の少人数ダイビングショップ（架空）。お手本は NU:KUJU（白い地・欧文ロゴ1色・写真を大きさを変えて散らす並べ方だけを物差しに。写真と文は全部こちらで作った）
export const metadata: Metadata = {
  title: "KAIJI DIVE（見本）",
  description: "ALPACA が作ったホームページの見本。奄美大島にある架空のダイビングショップのサイトです。",
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=Outfit:wght@500;600&family=Barlow:wght@400;500&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap";

const IMG = "/samples/kaiji";

function Ph({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`kj-ph ${className}`} data-rv>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${IMG}/${src}.webp`} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

function Label({ en, ja, id }: { en: string; ja: string; id?: string }) {
  return (
    <div className="kj-label" data-rv>
      <p className="kj-label__en" aria-hidden="true">
        {en}
      </p>
      <h2 className="kj-label__ja" id={id}>
        {ja}
      </h2>
    </div>
  );
}

// 波の小さな印（今日の海の表示用）
function WaveIcon() {
  return (
    <svg className="kj-wave" viewBox="0 0 64 22" aria-hidden="true">
      <path d="M1 8 C 9 2, 15 2, 22 8 S 36 14, 43 8 S 56 2, 63 8" />
      <path d="M1 18 C 9 12, 15 12, 22 18 S 36 24, 43 18 S 56 12, 63 18" />
    </svg>
  );
}

const MENUS = [
  {
    id: "trial",
    en: "TRIAL DIVE",
    ja: "体験ダイビング",
    img: "diver",
    alt: "白い砂の上をサンゴの方へ泳いでいくダイバーの後ろ姿",
    text: "免許がなくても潜れます。浅い砂地で呼吸の練習をしてから、ガイドと手をつなげる距離で海の中を進みます。",
    rows: [
      ["半日（1本）", "15,000円"],
      ["対象", "10歳から"],
    ],
  },
  {
    id: "fun",
    en: "FUN DIVE",
    ja: "ファンダイブ",
    img: "boat",
    alt: "タンクが並ぶ小さなボートのデッキと、緑の島の海岸",
    text: "Cカードをお持ちの方向け。その日の風と潮を見て、ボートで出る場所を朝に決めます。",
    rows: [
      ["ボート2本", "14,000円"],
      ["器材一式", "4,000円"],
    ],
  },
  {
    id: "snorkel",
    en: "SNORKEL",
    ja: "シュノーケル",
    img: "gear",
    alt: "水滴の付いたマスクとシュノーケルが、海の見える木のデッキに置かれている",
    text: "泳ぎに自信がなくても大丈夫です。ライフジャケットを着て、足のつく浜から始めます。",
    rows: [
      ["半日", "7,000円"],
      ["対象", "6歳から"],
    ],
  },
];

const SEA = [
  {
    img: "turtle",
    alt: "海草の生えた砂地の上を泳ぐアオウミガメ",
    ja: "ウミガメ",
    en: "sea turtle",
    text: "砂地の海草を食べに来るアオウミガメに、出会えることがあります。近づきすぎず、少し離れて見守ります。",
  },
  {
    img: "coral",
    alt: "光の差しこむ浅瀬のテーブルサンゴ",
    ja: "サンゴ",
    en: "coral",
    text: "浅い所にもテーブルサンゴや枝サンゴが広がります。フィンで触れないよう、潜る前に泳ぎ方をお伝えします。",
  },
  {
    img: "clown",
    alt: "イソギンチャクから顔を出すクマノミ",
    ja: "クマノミの仲間",
    en: "anemonefish",
    text: "イソギンチャクのまわりを離れないので、ゆっくり見られます。体験ダイビングでも会いやすい魚です。",
  },
  {
    img: "fish",
    alt: "枝サンゴの上を泳ぐ小魚の群れ",
    ja: "小魚の群れ",
    en: "damselfish",
    text: "枝サンゴの上を、小さな魚の群れが行き来します。光が当たると、体が銀色に光ります。",
  },
];

const FLOW = [
  ["8:30", "店に集合", "申込書と体調の確認。着替えはここで"],
  ["9:00", "海の説明", "今日の場所と、水の中での合図を練習"],
  ["9:30", "出発", "浜まで車、またはボートで十分ほど"],
  ["10:00", "1本目", "四十分ほど。ガイドが前と横につきます"],
  ["11:00", "休憩", "水分をとって、体を温めます"],
  ["11:30", "2本目", "ファンダイブのみ。体験は浜で過ごします"],
  ["13:00", "店に戻る", "シャワーのあと、撮った写真をお渡し"],
];

const SAFE = [
  ["少人数で", "ガイド1人につき、お客様は4人まで（見本）。目が届く人数に決めています。"],
  ["ガイドが付く", "体験ダイビングは、水に入ってから上がるまでガイドが横を離れません。"],
  ["朝に決める", "風・波・潮を見て、行く場所を毎朝変えます。危ないと判断した日は中止にします。"],
  ["体のこと", "持病や服薬がある方は、申し込みの時にお知らせください。医師の確認が要る場合があります。"],
];

const NEWS = [
  ["2026-10-08", "10.08", "THU", "11月の営業日をお知らせします。"],
  ["2026-09-20", "09.20", "SUN", "ウェットスーツを新しくしました。子ども用のサイズも増えています。"],
  ["2026-09-01", "09.01", "TUE", "冬のあいだも営業します。水温が下がる時期はフードベストをお貸しします。"],
];

export default function KaijiPage() {
  return (
    <div className="kj" id="top">
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <SampleNote bg="#0B5C92" fg="#FFFFFF" font="'Zen Kaku Gothic New', sans-serif" />

      <header className="kj-top">
        <div className="kj-top__l">
          <a href="#top" className="kj-logo" aria-label="KAIJI DIVE トップへ">
            KAIJI<span>DIVE</span>
          </a>
          <nav className="kj-nav" aria-label="ページ内の案内">
            <ul>
              <li>
                <a href="#menu">MENU</a>
              </li>
              <li>
                <a href="#sea">SEA</a>
              </li>
              <li>
                <a href="#day">A DAY</a>
              </li>
              <li>
                <a href="#safety">SAFETY</a>
              </li>
              <li>
                <a href="#access">ACCESS</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="kj-today" aria-label="今日の海（見本の値）">
          <p className="kj-today__date">10.13 TUE</p>
          <dl>
            <div>
              <dt>水温</dt>
              <dd>
                26<small>°C</small>
              </dd>
            </div>
            <div>
              <dt>波</dt>
              <dd>
                0.5<small>m</small>
              </dd>
            </div>
          </dl>
          <WaveIcon />
          <p className="kj-today__note">今日の海（見本の値）</p>
        </div>
        <KaijiMenu />
      </header>

      <main>
        {/* 一番上：大きな海 */}
        <section className="kj-hero" aria-label="KAIJI DIVE の海">
          <div className="kj-hero__img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <picture>
              <source media="(min-width: 900px)" srcSet={`${IMG}/hero-wide.webp`} />
              <img src={`${IMG}/snorkel.webp`} alt="透きとおった浅い海と、遠くの島の山" />
            </picture>
          </div>
          <a className="kj-hero__card" href="#access">
            <span className="kj-hero__card-en">RESERVE</span>
            <span className="kj-hero__card-ja">前日18時まで受付</span>
            <span aria-hidden="true">→</span>
          </a>
        </section>

        <section className="kj-news" aria-labelledby="kj-news-h">
          <div className="kj-news__h">
            <h2 id="kj-news-h">NEWS</h2>
            <a href="#top">一覧を見る →</a>
          </div>
          <ul>
            {NEWS.map(([dt, d, w, t]) => (
              <li key={dt}>
                <a href="#top">
                  <time dateTime={dt}>
                    {d} <small>{w}</small>
                  </time>
                  <span>{t}</span>
                  <i aria-hidden="true">→</i>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* 写真を散らす：店の考え */}
        <section className="kj-scatter" aria-label="KAIJI DIVE について">
          <Ph src="surface" alt="水の中から見上げた、光の揺れる海面" className="kj-sc1" />
          <Ph src="entry" alt="足あとの残る白い砂浜と、透きとおった浅瀬" className="kj-sc2" />
          <div className="kj-poem kj-sc3" data-rv>
            <p>
              朝いちばんに浜へ出て、風と波を見る。
              <br />
              行き先は、それから決めます。
              <br />
              一度に案内するのは、多くて四人まで。
              <br />
              水の中で、ひとりずつの顔色が見える人数です。
            </p>
            <p className="kj-poem__en" lang="en">
              We read the wind and waves every morning
              <br />
              before choosing where to go.
              <br />
              Small groups, one guide, the clear sea of Amami.
            </p>
          </div>
          <Ph src="coast" alt="緑の崖に囲まれた、白い砂浜と青緑の入り江" className="kj-sc4" />
        </section>

        {/* メニューと料金 */}
        <section className="kj-menu" id="menu" aria-labelledby="kj-menu-h">
          <Label en="MENU & PRICE" ja="メニューと料金" id="kj-menu-h" />
          <div className="kj-menu__list">
            {MENUS.map((m, i) => (
              <article key={m.id} className={`kj-mcard kj-mcard--${i + 1}`}>
                <Ph src={m.img} alt={m.alt} className="kj-mcard__ph" />
                <div className="kj-mcard__body" data-rv>
                  <p className="kj-mcard__en" aria-hidden="true">
                    {m.en}
                  </p>
                  <h3>{m.ja}</h3>
                  <p className="kj-mcard__text">{m.text}</p>
                  <dl className="kj-mcard__rows">
                    {m.rows.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
          <p className="kj-menu__note" data-rv>
            料金は見本です（税込・保険料込み）。写真データのお渡しは、どのメニューにも含まれます。
          </p>
        </section>

        {/* 潜れる海 */}
        <section className="kj-sea" id="sea" aria-labelledby="kj-sea-h">
          <Label en="THE SEA" ja="潜れる海" id="kj-sea-h" />
          <p className="kj-sea__lead" data-rv>
            奄美大島のまわりの、浅くて明るい海に潜ります。生きものは季節と海の様子で変わるので、会えない日もあります。
          </p>
          <div className="kj-sea__grid">
            {SEA.map((s, i) => (
              <figure key={s.img} className={`kj-sea__item kj-sea__item--${i + 1}`}>
                <Ph src={s.img} alt={s.alt} />
                <figcaption data-rv>
                  <span className="kj-sea__en" aria-hidden="true">
                    {s.en}
                  </span>
                  <strong>{s.ja}</strong>
                  <span className="kj-sea__text">{s.text}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 1日の流れ */}
        <section className="kj-day" id="day" aria-labelledby="kj-day-h">
          <div className="kj-day__side">
            <Label en="A DAY" ja="1日の流れ" id="kj-day-h" />
            <Ph src="wetsuit" alt="白い壁の前で日に干されたウェットスーツとフィン" className="kj-day__ph" />
          </div>
          <ol className="kj-day__list">
            {FLOW.map(([t, h, d]) => (
              <li key={t} data-rv>
                <time>{t}</time>
                <strong>{h}</strong>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 色の面：少人数のこと */}
        <section className="kj-block" aria-label="少人数の案内">
          <div className="kj-block__in" data-rv>
            <p className="kj-block__en" aria-hidden="true">
              1 GUIDE
              <br />4 GUESTS
            </p>
            <p className="kj-block__ja">ガイド1人に、お客様は4人まで（見本）</p>
          </div>
        </section>

        {/* 安全のこと */}
        <section className="kj-safe" id="safety" aria-labelledby="kj-safe-h">
          <Label en="SAFETY" ja="安全のこと" id="kj-safe-h" />
          <ul className="kj-safe__list">
            {SAFE.map(([h, d], i) => (
              <li key={h} data-rv>
                <span className="kj-safe__no" aria-hidden="true">
                  0{i + 1}
                </span>
                <strong>{h}</strong>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </section>

      </main>

      <footer className="kj-foot" id="access">
        <div className="kj-foot__grid">
          <div className="kj-foot__l">
            <a href="#top" className="kj-logo kj-logo--lg" aria-label="KAIJI DIVE トップへ">
              KAIJI<span>DIVE</span>
            </a>
            <p className="kj-foot__ja">かいじ ダイブ</p>
          </div>
          <div className="kj-foot__info" data-rv>
            <h2 className="kj-label__en">ACCESS</h2>
            <dl>
              <div>
                <dt>住所</dt>
                <dd>鹿児島県奄美市（見本のため住所は架空です）</dd>
              </div>
              <div>
                <dt>電話</dt>
                <dd>
                  <a href="tel:0997000000">0997-00-0000</a>　8:00〜18:00
                </dd>
              </div>
              <div>
                <dt>予約</dt>
                <dd>前日18時まで、電話かInstagramのメッセージで</dd>
              </div>
              <div>
                <dt>SNS</dt>
                <dd>Instagram（見本）</dd>
              </div>
              <div>
                <dt>持ち物</dt>
                <dd>水着・タオル。器材とウェットスーツはお貸しします</dd>
              </div>
            </dl>
            <a className="kj-call" href="tel:0997000000">
              電話で予約する <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <p className="kj-foot__c">(c) 2026 KAIJI DIVE / sample site by ALPACA</p>
      </footer>
      <Reveal />
    </div>
  );
}
