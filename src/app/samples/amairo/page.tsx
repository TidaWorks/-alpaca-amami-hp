import type { Metadata } from "next";
import "./amairo.css";
import SampleNote from "../SampleNote";
import Reveal from "../Reveal";
import AmairoMenu from "./AmairoMenu";

// 見本サイト：奄美の泥染め工房（架空）。お手本は せきがはら人間村（並べ方と余白の物差しだけ・写真と文は全部こちらで作った）
export const metadata: Metadata = {
  title: "泥染め工房 あまいろ（見本）",
  description: "ALPACA が作ったホームページの見本。奄美大島にある架空の泥染め工房のサイトです。",
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400;500;600&family=Marcellus&display=swap";

const IMG = "/samples/amairo";

function Ph({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`am-ph ${className}`} data-rv>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${IMG}/${src}.webp`} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

// 工房の印：泥田に沈む糸の輪
function Mark({ className = "" }: { className?: string }) {
  return (
    <svg className={`am-mark ${className}`} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="15" />
      <path d="M7 18c3-3 6-3 9 0s6 3 9 0" />
      <path d="M9 12.5c2.4-2 4.6-2 7 0s4.6 2 7 0" />
    </svg>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`am-logo ${className}`} aria-label="泥染め工房 あまいろ トップ">
      <Mark />
      <span className="am-logo__s">泥染め工房</span>
      <span className="am-logo__b">あまいろ</span>
    </a>
  );
}

function Kicker({ ja }: { ja: string }) {
  return (
    <p className="am-kicker" data-rv>
      <Mark />
      {ja}
    </p>
  );
}

function Btn({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <a className={`am-btn ${light ? "am-btn--light" : ""}`} href={href}>
      <span>{children}</span>
      <i aria-hidden="true">▸</i>
    </a>
  );
}

const STEPS = [
  { n: "一", t: "テーチ木を割る", d: "山から切り出したテーチ木を、細かく割って、かごに集めます。", img: "chips", alt: "竹かごに盛った赤茶色のテーチ木のチップ" },
  { n: "二", t: "煮出して染める", d: "大きな釜で煮出した赤茶色の汁に、糸を浸けては揉みこみます。", img: "fire", alt: "薪の火で温める鉄の釜" },
  { n: "三", t: "泥田に浸ける", d: "煮汁で染めた糸を泥田に沈め、泥をなじませます。", img: "mudthread", alt: "泥の中から引き上げた焦げ茶の糸" },
  { n: "四", t: "洗って干す", d: "川の水で泥を落として干し、乾いたらまた煮汁に戻ります。", img: "threads", alt: "軒下に干された赤茶から黒までの糸の束" },
];

const ITEMS = [
  { name: "ハンカチ", price: "3,300円", img: "table", alt: "木の作業台にたたんだ焦げ茶のハンカチ" },
  { name: "巾着", price: "4,950円", img: "pouch", alt: "作業台に置いた泥染めの小さな巾着" },
  { name: "小銭入れ・しおり", price: "2,200円から", img: "smalls", alt: "麻の布の上に並べた泥染めの小物" },
];

const DAY = [
  { time: "6:30", t: "釜に火を入れる", d: "朝いちばんに薪をくべ、前の日に割ったテーチ木を煮はじめます。", img: "fire", alt: "釜の下で燃える薪の火" },
  { time: "10:00", t: "泥田に入る", d: "煮汁で染めた糸を泥田へ。手で揉んで、泥を糸の奥までなじませます。", img: "mudhands", alt: "泥田で糸の束を揉む両手" },
  { time: "14:00", t: "午後の体験", d: "庭の泥田で、旅の方とハンカチを染めます。雨の日は煮汁の染めだけにします。", img: "experience", alt: "白いハンカチを赤茶色の煮汁に浸ける手元" },
  { time: "17:30", t: "泥田を見回る", d: "糸を軒下に取りこみ、夕方の泥田の水かさを見て一日を終えます。", img: "dusk", alt: "夕暮れの空を映す泥田と森" },
];

const NEWS = [
  { date: "2026.10.01", tag: "体験", t: "秋からの体験は、10:00 と 14:00 の一日2回になりました。", img: "table", alt: "木の作業台にたたんだ焦げ茶のハンカチと糸" },
  { date: "2026.09.20", tag: "小物", t: "巾着に、焦げ茶と黒の2色がそろいました。", img: "pouch", alt: "泥染めの巾着" },
  { date: "2026.09.05", tag: "お知らせ", t: "台風の接近のため、9月6日の体験はお休みしました。", img: "chips", alt: "竹かごに盛ったテーチ木のチップ" },
];

export default function AmairoPage() {
  return (
    <div className="am" id="top">
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <SampleNote bg="#2a231e" fg="#e9e3d8" font="'Zen Old Mincho', serif" />
      <AmairoMenu />

      <main>
        {/* 一番上：大きな写真と、右に積んだ3枚 */}
        <section className="am-hero" aria-label="泥染め工房 あまいろ">
          <div className="am-hero__main">
            <div className="am-hero__img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/hero.webp`} alt="朝もやの中の泥田と、竹竿に掛けた焦げ茶の糸" fetchPriority="high" />
            </div>
            <header className="am-hero__bar">
              <Logo />
              <p className="am-hero__info">染めの体験　毎日 10:00・14:00</p>
            </header>
            <div className="am-hero__txt">
              <p className="am-hero__en" aria-hidden="true">( MUD DYEING STUDIO, AMAMI )</p>
              <h1 className="am-hero__copy">
                <span>泥に、</span>
                <span>なんども、</span>
                <span>くぐらせる。</span>
              </h1>
            </div>
          </div>
          <ul className="am-hero__side">
            <li>
              <a href="#dorozome" className="am-tile">
                <Ph src="mudfield" alt="泥田で糸を泥に浸ける人の後ろ姿" />
                <span className="am-tile__en">( DOROZOME )</span>
                <span className="am-tile__ja">泥染めのこと</span>
              </a>
            </li>
            <li>
              <a href="#taiken" className="am-tile">
                <Ph src="experience" alt="白いハンカチを赤茶色の煮汁に浸ける手元" />
                <span className="am-tile__en">( WORKSHOP )</span>
                <span className="am-tile__ja">染めの体験</span>
              </a>
            </li>
            <li>
              <a href="#shop" className="am-tile">
                <Ph src="smalls" alt="泥染めの小銭入れや巾着" />
                <span className="am-tile__en">( SHOP )</span>
                <span className="am-tile__ja">工房の小物</span>
              </a>
            </li>
          </ul>
        </section>

        {/* 泥染めのこと */}
        <section className="am-sec am-about" id="dorozome" aria-labelledby="am-about-h">
          <Kicker ja="泥染めのこと" />
          <div className="am-about__grid">
            <Ph src="mudhands" alt="泥田の中で糸の束を揉む両手" className="am-about__img" />
            <h2 id="am-about-h" className="am-tate am-about__tate" data-rv>
              <span>木の煮汁と、</span>
              <span>田んぼの泥で、</span>
              <span>糸を黒くする。</span>
              <small aria-hidden="true">( ABOUT )</small>
            </h2>
            <div className="am-about__r">
              <p className="am-big" aria-hidden="true">
                DOROZOME
              </p>
              <div className="am-body" data-rv>
                <p>
                  大島紬の泥染めは、テーチ木（シャリンバイ）を煮出した汁で糸を染め、田んぼの泥に浸ける。これを何十回も繰り返す染め方です。
                </p>
                <p>
                  煮汁にふくまれるタンニンと泥の鉄分が結びついて、糸は赤茶から焦げ茶へ、やがて深い黒に近づいていきます。
                </p>
                <p>あまいろは、泥田のそばにある小さな工房です。紬の糸を染めるかたわら、ハンカチやストールも染めています。</p>
              </div>
            </div>
          </div>

          <ol className="am-steps">
            {STEPS.map((s) => (
              <li key={s.n} data-rv>
                <Ph src={s.img} alt={s.alt} />
                <p className="am-steps__n" aria-hidden="true">
                  {s.n}
                </p>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 間の一枚 */}
        <section className="am-pause" aria-label="川で布を洗うところ">
          <Ph src="rinse" alt="澄んだ小川で、焦げ茶に染まった布を洗う人の手元" className="am-pause__img" />
          <p className="am-tate am-pause__tate" data-rv>
            <span>洗って、</span>
            <span>干して、</span>
            <span>また染める。</span>
            <small aria-hidden="true">( RINSE, DRY, REPEAT )</small>
          </p>
        </section>

        {/* 染めの体験：沈んだ色の写真の上に白い札 */}
        <section className="am-dark" id="taiken" aria-labelledby="am-taiken-h">
          <div className="am-dark__bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/experience.webp`} alt="" loading="lazy" decoding="async" />
          </div>
          <h2 id="am-taiken-h" className="am-tate am-dark__tate" data-rv>
            <span>染めの体験</span>
            <small aria-hidden="true">( WORKSHOP )</small>
          </h2>
          <div className="am-card" data-rv>
            <Ph src="mudfield" alt="泥田に入り、糸の束を泥に浸ける人の後ろ姿" className="am-card__img" />
            <div className="am-card__body">
              <p className="am-card__lead">
                白い綿のハンカチを、テーチ木の煮汁と泥田で染めます。煮汁で揉む、泥に浸ける、水で洗う。工房と同じ順番を、職人と一緒にたどります。
              </p>
              <dl className="am-dl">
                <div>
                  <dt>所要時間</dt>
                  <dd>約1時間30分（見本）</dd>
                </div>
                <div>
                  <dt>料金</dt>
                  <dd>お一人 3,850円・税込（見本）</dd>
                </div>
                <div>
                  <dt>時間</dt>
                  <dd>10:00 と 14:00 の一日2回／1回8名まで</dd>
                </div>
                <div>
                  <dt>持ち物</dt>
                  <dd>汚れてもよい服、タオル、はき替えの靴。泥田用の長靴はお貸しします。</dd>
                </div>
                <div>
                  <dt>ご予約</dt>
                  <dd>前日の17時まで、お電話で承ります。</dd>
                </div>
              </dl>
              <Btn href="tel:0997000000">電話で予約する</Btn>
            </div>
          </div>
        </section>

        {/* 工房の小物 */}
        <section className="am-sec am-shop" id="shop" aria-labelledby="am-shop-h">
          <div className="am-shop__l">
            <Kicker ja="工房の小物" />
            <p className="am-big am-big--l" aria-hidden="true">
              SHOP
            </p>
            <div className="am-shop__mid">
              <h2 id="am-shop-h" className="am-tate am-shop__tate" data-rv>
                <span>泥の色を、</span>
                <span>毎日の持ち物に。</span>
                <small aria-hidden="true">( GOODS )</small>
              </h2>
              <div className="am-body am-shop__body" data-rv>
                <p>工房で染めた布で、小さな物を作っています。同じ煮汁、同じ泥田でも、日によって色が少しずつ違います。</p>
                <p>工房の棚と、お電話での通信販売でお求めいただけます。価格は見本です。</p>
              </div>
            </div>
          </div>
          <ul className="am-shop__grid">
            {ITEMS.map((it) => (
              <li key={it.name} className="am-item">
                <Ph src={it.img} alt={it.alt} />
                <p className="am-item__cap">
                  <span>{it.name}</span>
                  <span>{it.price}</span>
                </p>
              </li>
            ))}
            <li className="am-item am-item--note" data-rv>
              <p className="am-item__en">( STOLE )</p>
              <p className="am-item__name">ストール</p>
              <p className="am-item__d">長さ180cm。一枚ずつ色の出方が違うので、工房の棚で選んでいただいています。</p>
              <p className="am-item__price">16,500円</p>
            </li>
          </ul>
        </section>

        {/* 工房の一日 */}
        <section className="am-sec am-day" id="day" aria-labelledby="am-day-h">
          <Kicker ja="工房の一日" />
          <div className="am-day__head">
            <p className="am-big am-big--l" aria-hidden="true">
              A DAY
            </p>
            <h2 id="am-day-h" className="am-day__h" data-rv>
              釜に火を入れてから、泥田を見回るまで。
            </h2>
          </div>
          <ol className="am-day__list">
            {DAY.map((d, i) => (
              <li key={d.time} className={`am-day__item am-day__item--${i}`} data-rv>
                <Ph src={d.img} alt={d.alt} />
                <p className="am-day__time">{d.time}</p>
                <h3>{d.t}</h3>
                <p>{d.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* お知らせ */}
        <section className="am-sec am-news" id="news" aria-labelledby="am-news-h">
          <Kicker ja="お知らせ" />
          <div className="am-news__grid">
            <div className="am-news__l">
              <h2 id="am-news-h" className="am-big am-big--l">
                NEWS
              </h2>
              <ul className="am-tags" aria-label="分類">
                <li>お知らせ</li>
                <li>体験</li>
                <li>小物</li>
              </ul>
            </div>
            <ul className="am-news__list">
              {NEWS.map((n) => (
                <li key={n.date} data-rv>
                  <Ph src={n.img} alt={n.alt} />
                  <p className="am-news__meta">
                    <time dateTime={n.date.replaceAll(".", "-")}>( {n.date} )</time>
                    <span>{n.tag}</span>
                  </p>
                  <p className="am-news__t">{n.t}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ご案内 */}
        <section className="am-sec am-guide" id="guide" aria-labelledby="am-guide-h">
          <Kicker ja="ご案内" />
          <div className="am-guide__grid">
            <div className="am-guide__l">
              <h2 id="am-guide-h" className="am-big am-big--l">
                GUIDE
              </h2>
              <p className="am-tate am-guide__tate" data-rv aria-hidden="true">
                <span>森の奥の、</span>
                <span>泥田のそばで。</span>
                <small>( ACCESS )</small>
              </p>
              <ul className="am-guide__nav">
                <li>
                  <a href="#taiken">染めの体験のご予約</a>
                </li>
                <li>
                  <a href="#shop">小物の通信販売</a>
                </li>
                <li>
                  <a href="#day">工房の一日</a>
                </li>
              </ul>
            </div>
            <div className="am-guide__r">
              <Ph src="garden" alt="緑に囲まれた木造の工房と、入口へ続く石の小道" className="am-guide__img" />
              <dl className="am-dl am-dl--guide" data-rv>
                <div>
                  <dt>営業</dt>
                  <dd>9:00〜17:00（体験は 10:00・14:00）</dd>
                </div>
                <div>
                  <dt>お休み</dt>
                  <dd>水曜日・台風の日</dd>
                </div>
                <div>
                  <dt>場所</dt>
                  <dd>鹿児島県奄美市（見本のため住所は架空です）</dd>
                </div>
                <div>
                  <dt>電話</dt>
                  <dd>
                    <a href="tel:0997000000">0997-00-0000</a>
                  </dd>
                </div>
                <div>
                  <dt>駐車場</dt>
                  <dd>6台</dd>
                </div>
                <div>
                  <dt>Instagram</dt>
                  <dd>@amairo_dorozome（見本）</dd>
                </div>
              </dl>
              <div className="am-guide__btns" data-rv>
                <Btn href="tel:0997000000">電話で予約する</Btn>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="am-foot">
        <Logo className="am-logo--lg" />
        <ul className="am-foot__links">
          <li>
            <a href="#taiken">体験のよくあるご質問</a>
          </li>
          <li>
            <a href="#shop">通信販売について</a>
          </li>
          <li>
            <a href="#top">privacy policy</a>
          </li>
        </ul>
        <p className="am-foot__c">(c) 2026 泥染め工房 あまいろ / sample site by ALPACA</p>
      </footer>
      <Reveal />
    </div>
  );
}
