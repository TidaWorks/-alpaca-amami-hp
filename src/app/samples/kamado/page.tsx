import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./kamado.css";
import SampleNote from "../SampleNote";
import Reveal from "../Reveal";
import KamadoMenu from "./KamadoMenu";
import KamadoDrift from "./KamadoDrift";

// 見本サイト：奄美の島料理の食堂（架空）。お手本は Fujiya1935（並べ方・余白・文字の組み方の物差しだけ・写真と文は全部こちらで作った）
export const metadata: Metadata = {
  title: "島の食堂 かまど（見本）",
  description: "ALPACA が作ったホームページの見本。奄美大島にある架空の島料理の食堂のサイトです。",
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap";

const IMG = "/samples/kamado";

function Pic({
  src,
  alt,
  className = "",
  drift,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  drift?: number;
  eager?: boolean;
}) {
  return (
    <figure className={`km-pic ${className}`} data-rv data-drift={drift}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${IMG}/${src}.webp`} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
    </figure>
  );
}

function Title({ en, ja, id, light = false }: { en: string; ja: string; id?: string; light?: boolean }) {
  return (
    <div className={`km-title ${light ? "km-title--light" : ""}`} data-rv>
      <p className="km-title__en" aria-hidden="true">
        {en}
      </p>
      <h2 className="km-title__ja" id={id}>
        {ja}
      </h2>
    </div>
  );
}

const LUNCH = [
  { name: "鶏飯の定食", note: "鶏飯・香の物・黒糖", price: "1,200円" },
  { name: "油ぞうめんの定食", note: "油ぞうめん・ご飯・汁・小鉢", price: "1,000円" },
  { name: "島の魚の塩焼き定食", note: "その日の魚・ご飯・汁・小鉢", price: "1,300円" },
];

const DINNER = [
  { name: "夜光貝の刺身", price: "1,400円" },
  { name: "その日の島の魚の刺身", price: "1,200円から" },
  { name: "島らっきょうの塩漬け", price: "500円" },
  { name: "豚味噌", price: "450円" },
  { name: "油ぞうめん", price: "700円" },
  { name: "しめの鶏飯", price: "800円" },
];

const DISHES = [
  { src: "yakougai", name: "夜光貝の刺身", alt: "薄く切った夜光貝の刺身と、光る貝殻" },
  { src: "abura", name: "油ぞうめん", alt: "ねぎをたっぷり入れた油ぞうめん" },
  { src: "butamiso", name: "豚味噌", alt: "小鉢に盛った豚味噌と白いご飯" },
  { src: "rakkyo", name: "島らっきょう", alt: "かつお節をのせた島らっきょうの塩漬け" },
];

export default function KamadoPage() {
  return (
    <div className="km" id="top">
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <SampleNote bg="#2f2d26" fg="#ece8df" font="'Zen Old Mincho', serif" />
      <KamadoMenu />

      <main>
        {/* 一番上：島の庭と、額に入れた鶏飯 */}
        <section className="km-hero" aria-label="島の食堂 かまど">
          <div className="km-hero__bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <picture style={{ display: "contents" }}>
            {/* スマホは縦の写真（横長を引き伸ばすと粗いため・10/13 総チェック） */}
            <source media="(max-width: 700px)" srcSet={`${IMG}/hero-sp.webp`} />
            <img src={`${IMG}/hero-bg.webp`} alt="" />
          </picture>
          </div>
          <header className="km-head">
            <nav className="km-head__nav" aria-label="ページ内の案内">
              {/* ページの順にそろえる（10/13 総チェック） */}
              <a href="#concept">Concept</a>
              <a href="#menu">Menu</a>
              <a href="#shochu">Shochu</a>
              <a href="#room">Room</a>
              <a href="#news">News</a>
              <a href="#access">Access</a>
            </nav>
            <a className="km-btn" href="tel:0997000000">
              ご予約
            </a>
          </header>
          <div className="km-hero__in">
            <h1 className="km-logo">
              <small>島の食堂</small>
              <span>かまど</span>
            </h1>
            <p className="km-hero__copy">昼は定食、夜は島料理と黒糖焼酎</p>
            <div className="km-hero__frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${IMG}/hero-keihan.webp`}
                alt="手作りの器に盛った鶏飯と、鶏のスープの入った土鍋"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* 店の考え：ぼかした店内の上に文字、小さな写真を散らす */}
        <section className="km-concept" id="concept" aria-labelledby="km-concept-h">
          <div className="km-concept__bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/interior.webp`} alt="" loading="lazy" />
          </div>
          <div className="km-concept__in">
            <Title en="Concept" ja="店の考え" id="km-concept-h" light />
            <p className="km-concept__lead" data-rv>
              島でとれた物を、島のやり方で。
            </p>
            {/* 段落ごとに、画面に入ったら1つずつ出す */}
            <div className="km-concept__body">
              <p data-rv>
                朝、港に揚がった魚と、
                <br />
                近くの畑でとれた島らっきょう。
                <br />
                鶏飯のスープは、島の鶏の骨を
                <br className="km-sp" />
                朝から炊いてとります。
              </p>
              <p data-rv>
                味つけは、この島の台所で
                <br />
                昔から作られてきたやり方にならいました。
              </p>
              <p data-rv>
                店の奥のかまどで、毎朝ご飯を炊いています。
                <br />
                昼も夜も、そのご飯をお出しします。
              </p>
            </div>
          </div>
          <Pic src="leaf" alt="光に透けた芭蕉の葉" className="km-scat km-scat--1" drift={0.12} />
          <Pic src="kokuto" alt="木の板にのせた黒糖のかたまり" className="km-scat km-scat--2" drift={0.22} />
          <Pic src="hands" alt="かまどの前で、炊きあがったご飯を返す手" className="km-scat km-scat--3" drift={0.08} />
          <Pic src="wipe" alt="布巾で器を拭く手" className="km-scat km-scat--4" drift={0.18} />
        </section>

        {/* 昼と夜の品書き */}
        <section className="km-menu-sec" id="menu" aria-labelledby="km-menu-h">
          <div className="km-lunch">
            <Pic src="teishoku-shima" alt="木の盆にのせた昼の定食。島の魚の塩焼き" className="km-lunch__pic" />
            <Pic src="soup" alt="鶏飯のスープの土鍋と、ほぐした鶏・錦糸卵・椎茸" className="km-lunch__sub" drift={0.1} />
            <div className="km-lunch__txt">
              <Title en="Menu" ja="昼と夜の品書き" id="km-menu-h" />
              <div className="km-list" data-rv>
                <h3 className="km-list__h">
                  昼の定食<span>11:30〜14:00</span>
                </h3>
                <ul>
                  {LUNCH.map((m, i) => (
                    <li key={m.name} style={{ "--i": i } as CSSProperties}>
                      <span className="km-list__name">
                        {m.name}
                        <small>{m.note}</small>
                      </span>
                      <span className="km-list__price">{m.price}</span>
                    </li>
                  ))}
                </ul>
                <p className="km-list__note">ご飯はかまどで炊いています。おかわりできます。</p>
              </div>
            </div>
          </div>

          <div className="km-dinner">
            <div className="km-list" data-rv>
              <h3 className="km-list__h">
                夜の品書き<span>18:00〜22:00</span>
              </h3>
              <ul>
                {DINNER.map((m, i) => (
                  <li key={m.name} style={{ "--i": i } as CSSProperties}>
                    <span className="km-list__name">{m.name}</span>
                    <span className="km-list__price">{m.price}</span>
                  </li>
                ))}
              </ul>
              <p className="km-list__note">
                夜光貝は入らない日があります。
                <br />
                値段はすべて見本です。
              </p>
            </div>
            <ul className="km-dishes">
              {DISHES.map((d, i) => (
                <li key={d.src} className={`km-dish km-dish--${i + 1}`}>
                  <Pic src={d.src} alt={d.alt} drift={[0.06, 0.12, 0.09, 0.15][i]} />
                  <p data-rv>{d.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 黒糖焼酎 */}
        <section className="km-shochu" id="shochu" aria-labelledby="km-shochu-h">
          <div className="km-shochu__bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/shochu.webp`} alt="" loading="lazy" />
          </div>
          <div className="km-shochu__in">
            <div className="km-shochu__txt">
              <Title en="Kokuto Shochu" ja="黒糖焼酎のこと" id="km-shochu-h" light />
              <div className="km-shochu__body" data-rv>
                <p className="km-shochu__lead">
                  黒糖焼酎は、
                  <br />
                  奄美の島々だけで造られています。
                </p>
                <p>
                  黒糖と米こうじからできる焼酎で、造ってよいのは奄美群島の蔵だけと決められています。黒糖の香りがしますが、蒸留するので甘さは残りません。
                </p>
                <p>島のいくつかの蔵の物を置いています。ロック、水割り、お湯割りで。</p>
                <p className="km-shochu__price">一杯 600円から（見本）</p>
              </div>
            </div>
            <Pic src="shochu" alt="厚いグラスに注いだ黒糖焼酎と、黒糖の小皿" className="km-shochu__pic" drift={0.08} />
          </div>
        </section>

        {/* お店の様子 */}
        <section className="km-room" id="room" aria-labelledby="km-room-h">
          <div className="km-room__head">
            <Title en="Room" ja="お店の様子" id="km-room-h" />
            <p data-rv>
              カウンター六席と、卓が四つ。
              <br />
              昼は窓からの光だけで足りる、小さな店です。
            </p>
          </div>
          <div className="km-room__strip">
            <Pic src="interior" alt="昼の光が入る、木の卓が並んだ店内" className="km-room__a" />
            <Pic src="kamado" alt="店の奥のかまど" className="km-room__b" />
            <Pic src="shelf" alt="器を重ねた木の棚" className="km-room__c" />
            <Pic src="entrance2" alt="生成りののれんを掛けた店の入口" className="km-room__d" />
          </div>
        </section>

        {/* お知らせ */}
        <section className="km-news" id="news" aria-labelledby="km-news-h">
          <Title en="News" ja="お知らせ" id="km-news-h" />
          <ul data-rv>
            <li>
              <time dateTime="2026-10-01">2026.10.01</time>
              <a href="#menu">夜の品書きに、夜光貝の刺身が戻りました。</a>
            </li>
            <li>
              <time dateTime="2026-09-20">2026.09.20</time>
              <a href="#access">十月の定休日のお知らせ</a>
            </li>
            <li>
              <time dateTime="2026-09-05">2026.09.05</time>
              <a href="#menu">昼の定食に、島の魚の塩焼きを加えました。</a>
            </li>
          </ul>
        </section>
      </main>

      {/* ご案内 */}
      <footer className="km-foot" id="access" aria-labelledby="km-access-h">
        <div className="km-foot__grid">
          <Pic src="entrance" alt="赤瓦の屋根の下、のれんを掛けた店の入口と石段" className="km-foot__pic" />
          <div className="km-foot__info">
            <Title en="Access" ja="ご案内" id="km-access-h" />
            <dl data-rv>
              <div>
                <dt>店名</dt>
                <dd>島の食堂 かまど</dd>
              </div>
              <div>
                <dt>住所</dt>
                <dd>鹿児島県奄美市（見本のため架空）</dd>
              </div>
              <div>
                <dt>地図</dt>
                <dd>地図を開く（見本）</dd>
              </div>
              <div>
                <dt>駐車場</dt>
                <dd>店の横に2台（見本）</dd>
              </div>
              <div>
                <dt>電話</dt>
                <dd>
                  <a href="tel:0997000000">0997-00-0000</a>
                </dd>
              </div>
              <div>
                <dt>昼</dt>
                <dd>11:30〜14:00（ご注文は13:30まで）</dd>
              </div>
              <div>
                <dt>夜</dt>
                <dd>18:00〜22:00（ご注文は21:30まで）</dd>
              </div>
              <div>
                <dt>定休日</dt>
                <dd>
                  水曜日
                  <br />
                  十月は 10月19日（月）・20日（火）もお休みします
                </dd>
              </div>
              <div>
                <dt>席</dt>
                <dd>カウンター6席・テーブル4卓</dd>
              </div>
              <div>
                <dt>SNS</dt>
                <dd>Instagram（見本）</dd>
              </div>
            </dl>
            <p className="km-foot__note" data-rv>
              夜はお電話でのご予約をおすすめしています。
            </p>
            <a className="km-btn km-btn--line" href="tel:0997000000">
              電話で予約する
            </a>
          </div>
        </div>
        <div className="km-foot__end">
          <p className="km-logo km-logo--foot" aria-hidden="true">
            <small>島の食堂</small>
            <span>かまど</span>
          </p>
          <a className="km-foot__top" href="#top">
            Page top
          </a>
          <p className="km-foot__c">(c) 2026 kamado. sample site by ALPACA</p>
        </div>
      </footer>
      <KamadoDrift />
      <Reveal />
    </div>
  );
}
