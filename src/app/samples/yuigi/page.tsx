import type { Metadata } from "next";
import "./yuigi.css";
import SampleNote from "../SampleNote";
import Reveal from "../Reveal";
import YuigiMotion from "./YuigiMotion";

// 見本サイト③：奄美の工務店（架空）。お手本は はだしの家（並べ方と余白の物差しだけ・写真と文は全部こちらで作った）
export const metadata: Metadata = {
  title: "結木工務店 奄美の木の家（見本）",
  description: "ALPACA が作ったホームページの見本。奄美大島にある架空の工務店のサイトです。",
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Zen+Kaku+Gothic+New:wght@300;400;500&display=swap";

const IMG = "/samples/yuigi";

function Ph({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`yg-ph ${className}`} data-rv>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${IMG}/${src}.webp`} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

function Label({ en, ja }: { en: string; ja?: string }) {
  return (
    <p className="yg-label">
      <span>{en}</span>
      {ja && <small>{ja}</small>}
    </p>
  );
}

function More({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="yg-more" href={href}>
      {children}
      <span aria-hidden="true" className="yg-more__arrow" />
    </a>
  );
}

const POINTS = [
  {
    n: "01",
    t: "台風の風を受け流す、低い屋根",
    d: "屋根の勾配と軒の出を、奄美の風に合わせて決めます。屋根材は下地から金物で留め、風であおられないようにします。",
  },
  {
    n: "02",
    t: "湿気をためない、風の通り道",
    d: "南から北へ、風が抜ける窓の位置を先に決めてから間取りを描きます。床下にも風を通します。",
  },
  {
    n: "03",
    t: "潮と白蟻に強い材料",
    d: "海の近くでは、さびにくい金物と、白蟻に強い木を選びます。建てたあとの点検も、毎年うかがいます。",
  },
];

const CASES = [
  { src: "case4", t: "軒の深い平屋", p: "龍郷町" },
  { src: "case2", t: "吹き抜けのある家", p: "奄美市名瀬" },
  { src: "case3", t: "通りに面した店と住まい", p: "奄美市笠利町" },
  { src: "case1", t: "白い壁と格子の家", p: "奄美市名瀬" },
  { src: "case5", t: "海を向いた家", p: "瀬戸内町" },
  { src: "case6", t: "朝の光が入る食卓", p: "大和村" },
];

export default function YuigiPage() {
  return (
    <div className="yg" id="top">
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <SampleNote bg="#2f2b27" fg="#efe9df" font="'Zen Kaku Gothic New', sans-serif" />

      {/* 背景を横切る細い線 */}
      {/* スクロールに合わせて、左から風の線が引かれていく（幅は YuigiMotion が伸ばす） */}
      <svg className="yg-curve" viewBox="0 0 1440 4200" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <clipPath id="yg-c1" clipPathUnits="userSpaceOnUse">
            <rect className="yg-curve__clip" x="-60" y="600" width="0" height="600" />
          </clipPath>
          <clipPath id="yg-c2" clipPathUnits="userSpaceOnUse">
            <rect className="yg-curve__clip" x="-60" y="2000" width="0" height="760" />
          </clipPath>
          <clipPath id="yg-c3" clipPathUnits="userSpaceOnUse">
            <rect className="yg-curve__clip" x="-60" y="3250" width="0" height="560" />
          </clipPath>
        </defs>
        <path clipPath="url(#yg-c1)" d="M-40 900 C 380 760, 760 1080, 1480 820" />
        <path clipPath="url(#yg-c2)" d="M-40 2350 C 420 2140, 900 2620, 1480 2300" />
        <path clipPath="url(#yg-c3)" d="M-40 3500 C 500 3380, 980 3700, 1480 3460" />
      </svg>

      <header className="yg-bar">
        <a href="#top" className="yg-logo">
          <span className="yg-logo__mark" aria-hidden="true" />
          <span>結木工務店</span>
        </a>
        <nav aria-label="ページ内の案内" className="yg-nav">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#case">Case</a>
          <a href="#news">News</a>
          <a href="#contact" className="yg-nav__cta">
            Contact
          </a>
        </nav>
      </header>

      <main>
        <section className="yg-hero" aria-label="結木工務店">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${IMG}/hero.webp`} alt="山を背にした、軒の深い木の平屋" className="yg-hero__img" />
          <div className="yg-hero__copy">
            <p className="yg-hero__en">Live with the wind.</p>
            <h1 className="yg-hero__ja">風と暮らす、奄美の木の家。</h1>
          </div>
        </section>

        <section className="yg-about" id="about" aria-labelledby="yg-about-h">
          <div className="yg-about__head" data-rv>
            <Label en="About" />
            <h2 id="yg-about-h" className="yg-h2">
              A house that holds
              <br />
              through the typhoon.
            </h2>
            <p className="yg-sub">台風の夜も、いつもどおりに眠れる家を。</p>
          </div>
          <Ph src="eaves" alt="深い軒の裏と太い垂木" className="yg-about__p1" />
          <Ph src="hands" alt="かんなで木を削る大工の手" className="yg-about__p2" />
          <div className="yg-about__text" data-rv>
            <p>
              結木工務店は、奄美大島で木の家を建てている小さな工務店です。大工が三人、設計が一人。夏の湿気と秋の台風を知っている者どうしで、一棟ずつ図面を描き、自分たちの手で建てています。
            </p>
            <More href="#case">施工例を見る</More>
          </div>
        </section>

        <section className="yg-points" id="features" aria-labelledby="yg-points-h">
          <div className="yg-points__head" data-rv>
            <Label en="Features" />
            <h2 id="yg-points-h" className="yg-h2 yg-h2--sm">
              Our Commitments
            </h2>
            <p className="yg-sub">3つのこだわり</p>
          </div>
          <Ph src="window" alt="風で揺れるカーテンと木の格子窓" className="yg-points__ph" />
          <ol className="yg-points__list">
            {POINTS.map((p) => (
              <li key={p.n} data-rv>
                <span className="yg-points__n">{p.n}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="yg-brand" aria-labelledby="yg-brand-h">
          <div className="yg-brand__head" data-rv>
            <p className="yg-brand__en">HIRAYA</p>
            <h2 id="yg-brand-h" className="yg-brand__ja">
              島の平屋
            </h2>
          </div>
          <div className="yg-brand__collage">
            <Ph src="stone" alt="" className="yg-brand__side" />
            <div className="yg-brand__card" data-rv>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/living.webp`} alt="庭に向けて引き戸を開けはなした居間" loading="lazy" />
              <p>
                屋根を低く、軒を深く。強い日ざしと雨をよけながら、引き戸を開ければ庭まで
                <span className="yg-nw" data-nowrap>
                  ひと続きになる
                </span>
                平屋です。三十坪前後から、
                <span className="yg-nw" data-nowrap>
                  暮らし方に
                </span>
                合わせて間取りをご提案します。
              </p>
              <More href="#contact">平屋の相談をする</More>
            </div>
            <Ph src="hero" alt="" className="yg-brand__side yg-brand__side--r" />
          </div>
        </section>

        <section className="yg-case" id="case" aria-labelledby="yg-case-h">
          <div className="yg-case__head" data-rv>
            <Label en="Case" ja="施工例" />
            <p className="yg-case__lead" id="yg-case-h">
              Houses we built,
              <br />
              and the families living there.
            </p>
          </div>
          <ul className="yg-case__grid">
            {CASES.map((c) => (
              <li key={c.src} data-rv>
                <div className="yg-case__a">
                  <span className="yg-case__img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${IMG}/${c.src}.webp`} alt="" loading="lazy" />
                  </span>
                  <span className="yg-case__meta">
                    <span>{c.p}</span>
                    <span>新築</span>
                  </span>
                  <span className="yg-case__t">{c.t}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="yg-case__more">ほかの施工例は、見学会や打ち合わせの時に写真でお見せしています。</p>
        </section>

        <div className="yg-wide" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${IMG}/floor.webp`} alt="" loading="lazy" data-rv />
        </div>

        <section className="yg-news" id="news" aria-labelledby="yg-news-h">
          <div data-rv>
            <Label en="News" />
            <h2 id="yg-news-h" className="yg-sr">
              お知らせ
            </h2>
          </div>
          <ul>
            <li data-rv>
              <div className="yg-news__row">
                <span>龍郷町「軒の深い平屋」の施工例を載せました</span>
                <time dateTime="2026-10-02">2026.10.02</time>
              </div>
            </li>
            <li data-rv>
              <div className="yg-news__row">
                <span>台風のあとの無料点検を受け付けています</span>
                <time dateTime="2026-09-18">2026.09.18</time>
              </div>
            </li>
            <li data-rv>
              <div className="yg-news__row">
                <span>11月の土日に、完成見学会をひらきます</span>
                <time dateTime="2026-09-05">2026.09.05</time>
              </div>
            </li>
          </ul>
        </section>

        <section className="yg-contact" id="contact" aria-labelledby="yg-contact-h">
          <p className="yg-contact__small">Call us</p>
          <a href="tel:0997000000" className="yg-contact__big" id="yg-contact-h">
            Get in Touch
            <span aria-hidden="true" className="yg-contact__ring">
              <span className="yg-contact__arrow">↗</span>
            </span>
          </a>
          <p className="yg-contact__ja">家づくりのご相談、見学会のお申し込みは、お電話で承ります。</p>
          <a href="tel:0997000000" className="yg-contact__tel">
            <small>tel</small>0997-00-0000
          </a>
          <p className="yg-contact__hours">受付 8:00〜17:00（日曜休み）</p>
        </section>
      </main>

      <footer className="yg-foot">
        <div className="yg-foot__l">
          <a href="#top" className="yg-logo">
            <span className="yg-logo__mark" aria-hidden="true" />
            <span>結木工務店</span>
          </a>
          <p>
            鹿児島県奄美市（見本のため住所は架空です）
            <br />
            <a
              className="yg-foot__map"
              href="https://www.google.com/maps/search/?api=1&query=%E5%A5%84%E7%BE%8E%E5%B8%82"
              target="_blank"
              rel="noopener noreferrer"
            >
              地図を開く（見本）
            </a>
            <br />
            <a href="tel:0997000000" className="yg-foot__tel">tel 0997-00-0000</a> ／ 8:00〜17:00（日曜休み）
          </p>
        </div>
        <ul className="yg-foot__nav">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#case">Case</a>
          </li>
          <li>
            <a href="#news">News</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <p className="yg-foot__c">© 2026 Yuigi Komuten — sample site by ALPACA</p>
      </footer>
      <Reveal />
      <YuigiMotion />
    </div>
  );
}
