import type { Metadata } from "next";
import "./nagi.css";
import SampleNote from "../SampleNote";
import Reveal from "../Reveal";
import NagiMenu from "./NagiMenu";

// 見本サイト：奄美市名瀬の路地にある三席の美容室（架空）。お手本は longleage（地の色・小さな文字・余白の物差しだけ。写真と文は全部こちらで作った）
export const metadata: Metadata = {
  title: "hair room soyo（見本）",
  description: "ALPACA が作ったホームページの見本。奄美大島にある架空の美容室のサイトです。",
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Zen+Kaku+Gothic+New:wght@300;400;500&display=swap";

const IMG = "/samples/soyo";

function Img({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <div className={`ng-img ${className}`} data-rv>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${IMG}/${src}.webp`} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

function Label({ children, id }: { children: string; id?: string }) {
  return (
    <h2 className="ng-label" id={id} data-rv>
      <span aria-hidden="true">(</span> {children} <span aria-hidden="true">)</span>
    </h2>
  );
}

function Pill({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <a className={`ng-pill ${dark ? "ng-pill--dark" : ""}`} href={href}>
      {children} <span aria-hidden="true">→</span>
    </a>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`ng-logo ${className}`} aria-label="hair room soyo 一番上に戻る">
      hair room <b>soyo</b>
    </a>
  );
}

const MENU = [
  {
    en: "Cut",
    ja: "カット",
    img: "tools",
    alt: "生成りの布の上に置いた鋏と木の櫛",
    note: "伸ばしたい長さ、結ぶかどうか、朝にかけられる時間。最初にそこを聞いてから鋏を入れます。",
    items: [
      ["カット（シャンプー・乾かすまで）", "5,500円"],
      ["前髪のカット", "1,100円"],
      ["小学生までのカット", "3,300円"],
    ],
  },
  {
    en: "Color",
    ja: "カラー",
    img: "color",
    alt: "刷毛で髪に明るい茶色のカラーを塗る手元",
    note: "日ざしで色が抜けやすい島の髪に合わせて、少し深めに入れることが多いです。白髪を隠す色にも対応します。",
    items: [
      ["カラー（根元から毛先まで）", "7,700円〜"],
      ["根元だけのカラー", "5,500円"],
      ["カット＋カラー", "12,100円〜"],
    ],
  },
  {
    en: "Hair Care",
    ja: "髪の手入れ",
    img: "oil",
    alt: "手のひらで髪用のオイルをなじませる手元",
    note: "潮風と日ざしで乾いた毛先に、水分と油分を順に入れていきます。カットやカラーと一緒にも受けられます。",
    items: [
      ["髪の手入れ（30分）", "4,400円"],
      ["髪の手入れ（60分・頭皮のマッサージ付き）", "7,700円"],
    ],
  },
  {
    en: "Head Spa",
    ja: "頭皮の手入れ",
    img: "wash",
    alt: "白い洗面台で長い髪をぬるま湯で流す手元",
    note: "ぬるめのお湯で、頭皮をゆっくり洗います。横になったまま眠ってしまう方もいます。",
    items: [["頭皮の手入れ（30分）", "4,400円"]],
  },
];

const FLOW = [
  ["01", "ご予約", "電話か Instagram のメッセージで。希望の日と、カットやカラーなどのメニューを教えてください。"],
  ["02", "髪の話を聞く", "席に座ったら、まず鏡の前で今の髪の困りごとを聞きます。決まっていなくても大丈夫です。"],
  ["03", "施術", "その時間は、店にいるお客さまはお一人だけ。途中で休みたい時は、いつでも言ってください。"],
  ["04", "家での手入れ", "帰る前に、乾かし方と、次の来店までの手入れの仕方をお伝えします。"],
];

const NEWS = [
  ["2026-10-08", "2026.10.08", "お知らせ", "11月の定休日を更新しました。"],
  ["2026-09-20", "2026.09.20", "メニュー", "髪の手入れ（60分）に、頭皮のマッサージが付くようになりました。"],
  ["2026-08-30", "2026.08.30", "お知らせ", "台風の接近する日は、前日にお電話で予約の確認をします。"],
];

export default function NagiPage() {
  return (
    <div className="ng" id="top">
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <SampleNote bg="#E4DED5" fg="#5A534B" font="'Zen Kaku Gothic New', sans-serif" />

      <header className="ng-bar">
        <nav className="ng-bar__nav" aria-label="ページ内の案内">
          <a href="#concept">Concept</a>
          <a href="#menu">Menu</a>
          <a href="#stylist">Stylist</a>
          <a href="#reserve">Reserve</a>
          <a href="#news">News</a>
          <a href="#info">Information</a>
        </nav>
        <Logo />
        <div className="ng-bar__r">
          <a className="ng-bar__ig" href="#info" aria-label="Instagram（見本）">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="0.9" className="ng-dot" />
            </svg>
          </a>
          <a className="ng-bar__rsv" href="#reserve">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="5.5" width="16" height="14" rx="1" />
              <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
            </svg>
            ご予約
          </a>
          <NagiMenu />
        </div>
      </header>

      <main>
        {/* 一番上：大きな写真と短い一文 */}
        <section className="ng-hero" aria-label="hair room soyo">
          <Img src="hero" alt="窓辺の椅子に座る長い髪の人の後ろ姿。朝の光が麻のカーテン越しに入る" className="ng-hero__img" eager />
          <div className="ng-hero__txt" data-rv>
            <p className="ng-hero__en">hair room soyo — Naze, Amami</p>
            <h1 className="ng-hero__ja">
              一人ずつ、
              <br />
              ゆっくり。
            </h1>
            <p className="ng-hero__sub">奄美市名瀬の路地にある、席が三つだけの美容室です。</p>
          </div>
        </section>

        {/* 今月のおすすめ（お手本の細い枠の帯） */}
        <section className="ng-strip" aria-label="今月のおすすめ">
          <div className="ng-strip__in">
            <div className="ng-strip__h">
              <p className="ng-strip__en">This Month</p>
              <p className="ng-strip__en ng-strip__en--b">Seasonal Care</p>
              <p className="ng-strip__ja">10月のおすすめ</p>
            </div>
            <div className="ng-strip__b">
              <p>
                夏の日ざしで乾いた毛先に
                <br />
                髪の手入れ（60分） 7,700円
              </p>
              <a href="#menu">メニューを見る ↗</a>
            </div>
            <div className="ng-strip__thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/oil.webp`} alt="髪用のオイルの瓶" loading="lazy" decoding="async" />
            </div>
          </div>
        </section>

        {/* コンセプト */}
        <section className="ng-con" id="concept" aria-labelledby="ng-con-h">
          <div className="ng-con__a">
            <Img src="comb" alt="濡れた長い髪を木の櫛でとかす手元" className="ng-con__p1" />
            <div className="ng-con__t1">
              <Label id="ng-con-h">Concept</Label>
              <div className="ng-txt" data-rv>
                <p>soyo は、奄美市名瀬の路地にある、席が三つだけの美容室です。</p>
                <p>ご予約は、同じ時間にお一人だけ。</p>
                <p>となりの席を気にせずに、髪のことをゆっくり話せます。</p>
              </div>
            </div>
          </div>

          <div className="ng-con__b">
            <Img src="tea" alt="椅子の横の小さな台に置いたお茶とたたんだタオル" className="ng-con__p2" />
            <div className="ng-txt ng-con__t2" data-rv>
              <p>奄美の日ざしは強く、海からの風には塩が混じります。</p>
              <p>毛先が乾く、色が早く抜ける、まとまらない。</p>
              <p>島で暮らす人の髪の困りごとを、</p>
              <p>鋏を入れる前に、まず聞くところから始めます。</p>
            </div>
            <Img src="leaf" alt="白い壁に落ちるバナナの葉の影と、棚の上の茶色い瓶" className="ng-con__p3" />
          </div>

        </section>

        {/* 写真いっぱいの帯：島の髪の手入れ */}
        <section className="ng-band" aria-labelledby="ng-band-h">
          <Img src="breeze" alt="夕方の逆光で、海風にゆれる長い髪の後ろ姿" className="ng-band__img" />
          <div className="ng-band__t" data-rv>
            <p className="ng-band__en">Care for island hair</p>
            <h2 id="ng-band-h" className="ng-band__h">
              日ざしと潮風の
              <br />
              あとの髪に
            </h2>
            <span className="ng-band__lines" aria-hidden="true">
              <i />
              <i />
            </span>
            <ul className="ng-band__pts">
              <li>
                <span>Dry</span>
                根元から、
                <br />
                時間をかけて
                <br />
                乾かす
              </li>
              <li>
                <span>Home care</span>
                次に来るまでの
                <br />
                手入れを
                <br />
                お伝えする
              </li>
            </ul>
            <Pill href="#reserve">予約の流れ</Pill>
          </div>
        </section>

        {/* 店 */}
        <section className="ng-salon" aria-labelledby="ng-salon-h">
          <div className="ng-salon__t">
            <Label id="ng-salon-h">Salon</Label>
            <p className="ng-salon__lead" data-rv>
              路地の奥の、
              <br />
              椅子が三つの部屋
            </p>
            <div className="ng-txt ng-txt--sm" data-rv>
              <p>
                しっくいの白い壁と、木の床。窓には麻のカーテンを掛けて、昼の光をやわらげています。
              </p>
              <p>
                席は三つありますが、同じ時間にお迎えするのはお一人だけ。残りの二つは、カラーを置く時間やお茶を飲む時に使います。
              </p>
            </div>
          </div>
          <Img src="room" alt="木の床にならぶ三つの椅子と、しっくいの壁の小さな美容室" className="ng-salon__img" />
        </section>

        {/* メニューと料金 */}
        <section className="ng-menu-sec" id="menu" aria-labelledby="ng-menu-h">
          <div className="ng-sec-h">
            <Label id="ng-menu-h">Menu</Label>
            <p className="ng-sec-h__note">料金は見本です（税込）</p>
          </div>
          <ul className="ng-mlist">
            {MENU.map((m) => (
              <li key={m.en} className="ng-mrow">
                <div className="ng-mrow__h" data-rv>
                  <h3>{m.en}</h3>
                  <p>{m.ja}</p>
                </div>
                <div className="ng-mrow__b" data-rv>
                  <p className="ng-mrow__note">{m.note}</p>
                  <dl>
                    {m.items.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <Img src={m.img} alt={m.alt} className="ng-mrow__img" />
              </li>
            ))}
          </ul>
        </section>

        {/* 店の人 */}
        <section className="ng-st" id="stylist" aria-labelledby="ng-st-h">
          <div className="ng-st__t">
            <Label id="ng-st-h">Stylist</Label>
            <div className="ng-txt ng-txt--sm" data-rv>
              <p>店に立つのは、店主ひとりです。</p>
              <p>
                島の外の美容室で十年ほど働いてから、生まれ育った名瀬に戻ってきました。戻ってまず気になったのは、日ざしと潮風で毛先が白っぽくなった、友人たちの髪でした。
              </p>
              <p>
                流行の形より、朝に自分で整えやすいことを先に考えます。長さを決めかねている時は、切らずに相談だけでも受けています。
              </p>
            </div>
            <Img src="hands" alt="麻のエプロンの前で鋏と櫛を持つ手元" className="ng-st__small" />
          </div>
          <Img src="staff" alt="窓辺に立つ、麻のエプロンを着けた店主の後ろ姿" className="ng-st__img" />
        </section>
        <div className="ng-st-strip">
          <div className="ng-st-strip__in">
            <p className="ng-st-strip__name">
              店主 <span>Owner / Stylist</span>
            </p>
            <p className="ng-st-strip__txt">
              美容師。カットと髪の手入れを担当。日ざしと潮風で傷んだ髪の相談を、いちばん多く受けています。
            </p>
          </div>
        </div>

        {/* 予約の流れ */}
        <section className="ng-flow" id="reserve" aria-labelledby="ng-flow-h">
          <div className="ng-sec-h">
            <Label id="ng-flow-h">Reserve</Label>
            <p className="ng-sec-h__note">ご予約から、お帰りまで</p>
          </div>
          <ol className="ng-flow__list">
            {FLOW.map(([n, h, t], i) => (
              <li key={n} data-rv style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="ng-flow__n">{n}</span>
                <h3>{h}</h3>
                <p>{t}</p>
              </li>
            ))}
          </ol>
          <div className="ng-flow__cta" data-rv>
            <p>
              当日の空きは、お電話でお問い合わせください。
              <br />
              施術中は電話に出られないことがあります。折り返しご連絡します。
            </p>
            <div className="ng-flow__btns">
              <Pill href="tel:0997000000" dark>
                電話で予約する　0997-00-0000
              </Pill>
              <Pill href="#info">Instagram（見本）</Pill>
            </div>
          </div>
        </section>

        {/* お知らせ */}
        <section className="ng-news" id="news" aria-labelledby="ng-news-h">
          <Label id="ng-news-h">News</Label>
          <ul className="ng-news__list">
            {NEWS.map(([dt, d, tag, t]) => (
              <li key={dt} data-rv>
                <time dateTime={dt}>{d}</time>
                <span className="ng-tag">{tag}</span>
                <a href="#news">{t}</a>
              </li>
            ))}
          </ul>
        </section>

        {/* 店の案内 */}
        <section className="ng-info" id="info" aria-labelledby="ng-info-h">
          <Img src="alley" alt="午後の光が差す、植木鉢の並んだ細い路地と木の扉" className="ng-info__img" />
          <div className="ng-info__t">
            <Label id="ng-info-h">Information</Label>
            <dl className="ng-info__dl" data-rv>
              <div>
                <dt>営業時間</dt>
                <dd>
                  10:00〜19:00
                  <br />
                  <small>最終受付　カット 18:00／カラー 17:00</small>
                </dd>
              </div>
              <div>
                <dt>定休日</dt>
                <dd>火曜日・第3月曜日</dd>
              </div>
              <div>
                <dt>住所</dt>
                <dd>鹿児島県奄美市（見本のため住所は架空です）</dd>
              </div>
              <div>
                <dt>電話</dt>
                <dd>
                  <a href="tel:0997000000">0997-00-0000</a>
                </dd>
              </div>
              <div>
                <dt>席</dt>
                <dd>3席（同じ時間のご予約はお一人）</dd>
              </div>
              <div>
                <dt>駐車場</dt>
                <dd>店の前にはありません。近くの有料駐車場をご利用ください。</dd>
              </div>
              <div>
                <dt>SNS</dt>
                <dd>Instagram（見本）</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="ng-foot">
        <div className="ng-foot__in">
          <Logo className="ng-logo--lg" />
          <ul className="ng-foot__nav">
            <li><a href="#concept">Concept</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#stylist">Stylist</a></li>
            <li><a href="#reserve">Reserve</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#info">Information</a></li>
          </ul>
        </div>
        <div className="ng-foot__bot">
          <a href="#top">Privacy Policy</a>
          <p>(c) 2026 hair room soyo — sample site by ALPACA</p>
        </div>
      </footer>
      <Reveal />
    </div>
  );
}
