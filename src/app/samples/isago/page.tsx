import type { Metadata } from "next";
import "./isago.css";
import SampleNote from "../SampleNote";
import Reveal from "../Reveal";
import IsagoMenu from "./IsagoMenu";

// 見本サイト①：奄美の浜の宿（架空）。お手本は MIZUYA（並べ方と余白の物差しだけ・写真と文は全部こちらで作った）
export const metadata: Metadata = {
  title: "isago 奄美・浜の宿（見本）",
  description: "ALPACA が作ったホームページの見本。奄美大島の浜にある架空の宿のサイトです。",
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600&family=DM+Serif+Display&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap";

const IMG = "/samples/isago";

function Img({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`ig-img ${className}`} data-rv>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${IMG}/${src}.webp`} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

function Head({ ja, en }: { ja: string; en: string }) {
  return (
    <div className="ig-head" data-rv>
      <h2 className="ig-head__ja">{ja}</h2>
      <p className="ig-head__en" aria-hidden="true">
        {en}
      </p>
      <span className="ig-head__line" aria-hidden="true" />
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`ig-logo ${className}`} aria-label="isago トップへ">
      <span className="ig-logo__en">isago</span>
      <span className="ig-logo__ja">砂子</span>
    </a>
  );
}

function Reserve() {
  return (
    <a className="ig-reserve" href="#access">
      <svg viewBox="0 0 200 14" aria-hidden="true">
        <path d="M0 9 C 20 2, 34 2, 52 8 S 86 14, 104 7 S 140 1, 160 7 S 188 12, 200 6" />
      </svg>
      reserve <span aria-hidden="true">›</span>
    </a>
  );
}

export default function IsagoPage() {
  return (
    <div className="ig" id="top">
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <SampleNote bg="#E4DCCD" fg="#5B534A" font="'Shippori Mincho', serif" />

      <header className="ig-bar">
        <Logo />
        <div className="ig-bar__r">
          <Reserve />
          <IsagoMenu />
        </div>
      </header>

      <main>
        {/* 一番上：浜の4枚 */}
        <section className="ig-hero" aria-label="isago の浜">
          <Img src="h1-beach" alt="朝の白い砂浜と、うすい水色の浅瀬" className="ig-sq" />
          <Img src="h2-adan" alt="しずくの付いたアダンの葉" className="ig-sq" />
          <Img src="h3-sky" alt="曇り空を横切るサギ" className="ig-sq" />
          <div className="ig-sq ig-stack">
            <Img src="h4-wave" alt="白い砂を洗う波" />
            <div className="ig-card" data-rv>
              <p>
                奄美大島の北の浜。満ち潮が白い砂を洗い、引き潮が珊瑚のかけらを残していきます。
              </p>
              <p>isago は、その浜から歩いて一分。六室だけの宿です。</p>
            </div>
          </div>
        </section>

        <section className="ig-news" aria-labelledby="ig-news-h">
          <h2 id="ig-news-h" className="ig-news__h">
            news
          </h2>
          <ul>
            <li>
              <time dateTime="2026-10-01">2026年10月1日</time>
              <a href="#table">冬の島料理のコースが始まりました。</a>
            </li>
            <li>
              <time dateTime="2026-09-12">2026年9月12日</time>
              <a href="#around">泥染めの工房をたずねる半日の案内を始めました。</a>
            </li>
          </ul>
        </section>

        {/* 宿泊 */}
        <section className="ig-row" id="stay">
          <Img src="room" alt="麻のカーテンと低い木のベッド、泥染めのクッション" className="ig-wide" />
          <div className="ig-text">
            <Head ja="宿泊" en="stay" />
            <div className="ig-body" data-rv>
              <p>
                どの部屋も、窓を開けると波の音が届く高さにつくりました。カーテンは麻、クッションは龍郷の泥染めです。
              </p>
              <p>全六室。二名から四名様まで、お泊まりいただけます。</p>
            </div>
          </div>
        </section>

        {/* 湯 */}
        <section className="ig-row ig-row--rev" id="bath">
          <div className="ig-text">
            <Head ja="湯" en="bath" />
            <div className="ig-body" data-rv>
              <p>デッキの先の湯船は、海の方を向いています。</p>
              <p>夕方は、浜を染める光を湯の中から見送れます。貸し切りで、ご予約制です。</p>
            </div>
          </div>
          <Img src="bath" alt="海に向いた木のデッキの丸い湯船" className="ig-wide" />
        </section>

        {/* 島のごはん */}
        <section className="ig-pair" id="table" aria-labelledby="ig-table-h">
          <Img src="dine-keihan" alt="鶏飯にスープを注ぐところ" className="ig-sq" />
          <div className="ig-sq ig-stack">
            <Img src="dine-kokuto" alt="黒糖のかけらとお茶" />
            <div className="ig-card ig-card--tall" data-rv>
              <h2 id="ig-table-h" className="ig-sr">
                島のごはん
              </h2>
              <p>
                朝は鶏飯。島の鶏でとったスープを、ご飯に好きなだけかけて召し上がってください。夜は、その日に揚がった魚と島の野菜を。食後には黒糖と、お茶をお出しします。
              </p>
              <ul className="ig-tate" aria-label="お食事">
                <li>島のごはん</li>
                <li className="ig-tate__gap" aria-hidden="true" />
                <li>朝　鶏飯</li>
                <li>夜　島の魚</li>
                <li>食後　黒糖と茶</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 島めぐり */}
        <section className="ig-row" id="around">
          <Img src="mangrove" alt="朝もやのマングローブの川" className="ig-wide" />
          <div className="ig-text">
            <Head ja="島めぐり" en="around the island" />
            <div className="ig-body" data-rv>
              <p>
                車で四十分のマングローブの川、泥染めの工房、夜の森。島で育ったスタッフが、その日の天気に合わせて道順をお話しします。
              </p>
            </div>
          </div>
        </section>

        <section className="ig-row ig-row--rev ig-row--tsumugi">
          <div className="ig-text">
            <Head ja="泥染め" en="tsumugi" />
            <div className="ig-body" data-rv>
              <p>
                テーチ木の煮汁と、田んぼの泥で、何十回も染める大島紬の糸。宿のクッションとのれんは、近くの工房に頼んだものです。
              </p>
            </div>
          </div>
          <Img src="tsumugi" alt="織り機に張られた泥染めの糸" className="ig-sq ig-sq--sm" />
        </section>
      </main>

      <footer className="ig-foot" id="access">
        <div className="ig-foot__bar">
          <Logo className="ig-logo--lg" />
          <Reserve />
        </div>
        <div className="ig-foot__grid">
          <Img src="footer-forest" alt="雲のかかる島の山" className="ig-sq" />
          <div className="ig-foot__info">
            <dl>
              <div>
                <dt>isago</dt>
                <dd>Instagram：@isago_amami（見本）</dd>
              </div>
            </dl>
            <p>
              鹿児島県奄美市（見本のため住所は架空です）
              <br />
              奄美空港から車で二十分
            </p>
            <p>tel：0997-00-0000　受付 9:00〜18:00</p>
            <p>チェックイン 15:00　チェックアウト 11:00</p>
            <ul className="ig-foot__links">
              <li>
                <a href="#top">よくあるご質問</a>
              </li>
              <li>
                <a href="#top">宿泊約款</a>
              </li>
              <li>
                <a href="#top">privacy policy</a>
              </li>
            </ul>
            <p className="ig-foot__c">(c) 2026 isago — sample site by ALPACA</p>
          </div>
        </div>
      </footer>
      <Reveal />
    </div>
  );
}
