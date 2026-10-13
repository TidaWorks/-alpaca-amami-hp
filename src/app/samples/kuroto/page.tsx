import type { Metadata } from "next";
import "./kuroto.css";
import SampleNote from "../SampleNote";
import Reveal from "../Reveal";
import { Pill } from "./Pill";

// 見本サイト②：奄美の黒糖のパン屋（架空）。お手本は 北のはしベーカリー（並べ方と余白の物差しだけ・写真と絵と文は全部こちらで作った）
export const metadata: Metadata = {
  title: "黒糖のパン屋 くろと（見本）",
  description: "ALPACA が作ったホームページの見本。奄美大島にある架空のパン屋のサイトです。",
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700;900&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap";

const IMG = "/samples/kuroto";

function Pic({ src, alt, className = "", rv = true }: { src: string; alt: string; className?: string; rv?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`kt-pic ${className}`}
      src={`${IMG}/${src}.webp`}
      alt={alt}
      loading={rv ? "lazy" : "eager"}
      decoding="async"
      {...(rv ? { "data-rv": "" } : {})}
    />
  );
}

const MENU = [
  { src: "loaf", name: "黒糖食パン", note: "一斤", price: "480円" },
  { src: "roll", name: "黒糖ロール", note: "ひとつ", price: "220円" },
  {
    src: "tankan",
    name: "たんかんデニッシュ",
    note: "1月〜3月",
    price: "380円",
  },
  { src: "banana", name: "島バナナのマフィン", note: "ひとつ", price: "260円" },
  { src: "shio", name: "塩パン", note: "ひとつ", price: "160円" },
];

export default function KurotoPage() {
  return (
    <div className="kt" id="top">
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <SampleNote bg="#1b1b1b" fg="#f4f1ea" font="'Zen Kaku Gothic New', sans-serif" />

      <header className="kt-bar">
        <a href="#top" className="kt-bar__logo">
          <span>黒糖のパン屋</span>
          <b>く ろ と</b>
        </a>
        <nav aria-label="ページ内の案内" className="kt-bar__nav">
          <a href="#menu">パン</a>
          <a href="#news">お知らせ</a>
          <a href="#shop">お店</a>
        </nav>
      </header>

      <main>
        {/* 一番上：パン2つと「く ろ と」 */}
        <section className="kt-hero" aria-label="くろと">
          <p className="kt-hero__lead">奄美の黒糖のパン屋</p>
          <div className="kt-hero__item kt-hero__item--a">
            <Pic src="roll" alt="黒糖ロール" rv={false} />
            <span className="kt-hero__ch" aria-hidden="true">
              く
            </span>
          </div>
          <div className="kt-hero__item kt-hero__item--b">
            <Pic src="tankan" alt="たんかんデニッシュ" rv={false} />
            <span className="kt-hero__ch" aria-hidden="true">
              ろ
            </span>
          </div>
          <div className="kt-hero__item kt-hero__item--c">
            <Pic src="shio" alt="塩パン" rv={false} />
            <span className="kt-hero__ch" aria-hidden="true">
              と
            </span>
          </div>
          <h1 className="kt-sr">黒糖のパン屋 くろと</h1>
        </section>

        {/* はじめに */}
        <section className="kt-intro" aria-labelledby="kt-intro-h">
          <div className="kt-intro__copy">
            <div className="kt-tate" data-rv>
              <h2 id="kt-intro-h" className="kt-tate__h">
                島の黒糖で、
                <br />
                毎朝やく。
              </h2>
              <p className="kt-tate__p">
                サトウキビを煮つめた奄美の黒糖を、
                <br />
                生地に練りこんでいます。
                <br />
                焼くと、ふちは香ばしく、中はしっとり。
                <br />
                朝七時に、いちばん目の食パンが
                <br />
                焼きあがります。
              </p>
            </div>
            <div className="kt-intro__btn">
              <Pill href="#shop" seed={0} big>
                お店のこと
              </Pill>
            </div>
          </div>
          <figure className="kt-intro__fig" data-rv>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/sugarcane.webp`} alt="サトウキビをしぼる絵" loading="lazy" />
          </figure>
        </section>

        {/* 黒糖食パン */}
        <section className="kt-feature" aria-labelledby="kt-feature-h">
          <div className="kt-feature__tag" data-rv>
            <span className="kt-dot">おすすめ</span>
            <Pill seed={1}>
              <span id="kt-feature-h">黒糖食パン</span>
            </Pill>
          </div>
          <p className="kt-big" data-rv>
            <span>あまいのに、</span>
            <span>くどくない。</span>
          </p>
          <figure className="kt-feature__baker" data-rv>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/baker.webp`} alt="生地をこねるパン屋の絵" loading="lazy" />
          </figure>
          <div className="kt-feature__loaf">
            <Pic src="loaf" alt="黒糖食パン" />
          </div>
          <div className="kt-feature__text" data-rv>
            <p>
              黒糖食パンは、奄美の黒糖と国産の小麦、塩と酵母だけで焼いています。そのままちぎっても、軽くトーストしても。二日目は薄く切って、バターをのせるのがおすすめです。
            </p>
            <ul className="kt-points">
              <li>黒糖は奄美産</li>
              <li>小麦は国産</li>
              <li>朝七時に焼きあがり</li>
            </ul>
          </div>
        </section>

        {/* パンの一覧 */}
        <section className="kt-menu" id="menu" aria-labelledby="kt-menu-h">
          <div className="kt-menu__h">
            <Pill seed={2}>
              <span id="kt-menu-h">きょうのパン</span>
            </Pill>
          </div>
          <ul className="kt-menu__list">
            {MENU.map((m, i) => (
              <li key={m.src} className={`kt-menu__item kt-menu__item--${i}`} data-rv>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${IMG}/${m.src}.webp`} alt="" loading="lazy" />
                <p className="kt-menu__name">{m.name}</p>
                <p className="kt-menu__meta">
                  <span>{m.note}</span>
                  <span>{m.price}</span>
                </p>
              </li>
            ))}
          </ul>
          <p className="kt-menu__note">値段は見本です。売り切れの時はごめんなさい。</p>
        </section>

        {/* お知らせ */}
        <section className="kt-news" id="news" aria-labelledby="kt-news-h">
          <figure className="kt-news__fig" data-rv>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/pancharacter.webp`} alt="考えごとをしている食パンの絵" loading="lazy" />
          </figure>
          <div className="kt-news__body">
            <Pill seed={0}>
              <span id="kt-news-h">お知らせ</span>
            </Pill>
            <ul>
              <li>
                <time dateTime="2026-10-08">2026.10.08</time>
                <span>日曜日は朝八時からの営業になりました。</span>
              </li>
              <li>
                <time dateTime="2026-09-20">2026.09.20</time>
                <span>お取り置きを電話で受け付けています。</span>
              </li>
              <li>
                <time dateTime="2026-09-01">2026.09.01</time>
                <span>島バナナのマフィンが今年も始まりました。</span>
              </li>
            </ul>
          </div>
        </section>

        {/* お店 */}
        <section className="kt-shop" id="shop" aria-labelledby="kt-shop-h">
          <figure className="kt-shop__fig" data-rv>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/shop.webp`} alt="島の通りの小さなパン屋の絵" loading="lazy" />
          </figure>
          <div className="kt-shop__info" data-rv>
            <h2 id="kt-shop-h" className="kt-shop__h">
              お店
            </h2>
            <dl>
              <div>
                <dt>営業</dt>
                <dd>
                  7:00〜16:00（日曜は8:00から）
                  <br />
                  売り切れたら閉めます
                </dd>
              </div>
              <div>
                <dt>お休み</dt>
                <dd>火曜・水曜</dd>
              </div>
              <div>
                <dt>場所</dt>
                <dd>
                  鹿児島県奄美市（住所は架空）
                  <br />
                  <a
                    className="kt-link"
                    href="https://www.google.com/maps/search/?api=1&query=%E5%A5%84%E7%BE%8E%E5%B8%82%E5%90%8D%E7%80%AC"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    地図を開く（見本）
                  </a>
                </dd>
              </div>
              <div>
                <dt>駐車場</dt>
                <dd>店の前に2台</dd>
              </div>
              <div>
                <dt>お支払い</dt>
                <dd>現金・QRコード決済</dd>
              </div>
              <div>
                <dt>お取り置き</dt>
                <dd>前の日の16時までに、お電話で</dd>
              </div>
              <div>
                <dt>電話</dt>
                <dd>
                  <a className="kt-link" href="tel:0997000000">
                    0997-00-0000
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="kt-foot">
        <div className="kt-foot__pills">
          <div className="kt-foot__pill">
            <span className="kt-foot__small">お取り置きは</span>
            <Pill href="tel:0997000000" seed={1} big>
              電話で
            </Pill>
          </div>
          <div className="kt-foot__pill">
            <span className="kt-foot__small">焼きあがりの写真は</span>
            <Pill seed={2} big>
              Instagram
              <small className="kt-pill__sub">準備中</small>
            </Pill>
          </div>
        </div>
        <p className="kt-foot__logo">
          黒糖のパン屋 <b>く ろ と</b>
        </p>
        <p className="kt-foot__c">© 2026 kuroto — sample site by ALPACA</p>
      </footer>
      <a className="kt-call" href="tel:0997000000">
        <span>お取り置きの電話</span>
        <b>0997-00-0000</b>
      </a>
      <Reveal />
    </div>
  );
}
