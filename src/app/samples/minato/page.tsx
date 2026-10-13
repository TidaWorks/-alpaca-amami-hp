import type { Metadata } from "next";
import "./minato.css";
import SampleNote from "../SampleNote";
import Reveal from "../Reveal";
import MinatoMenu from "./MinatoMenu";

// 見本サイト：奄美の港町の税理士事務所（架空）。お手本は Olion（大きな欧文セリフ・1色の面と写真の切り替えを物差しにした。文・写真・色は全部こちらで作った）
export const metadata: Metadata = {
  title: "みなと税理士事務所（見本）",
  description: "ALPACA が作ったホームページの見本。奄美大島にある架空の税理士事務所のサイトです。",
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500;600;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap";

const IMG = "/samples/minato";

function Pic({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`mn-pic ${className}`} data-rv>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${IMG}/${src}.webp`} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

// 大きな英字の見出し。下から押し上げるマスクで現す（動きは minato.css の .mn-big）
function Big({ children, className = "" }: { children: string; className?: string }) {
  return (
    <p className={`mn-big ${className}`} aria-hidden="true" data-rv>
      <span>{children}</span>
    </p>
  );
}

const NAV = [
  { href: "#story", en: "Story" },
  { href: "#service", en: "Service" },
  { href: "#fee", en: "Fee" },
  { href: "#flow", en: "Flow" },
  { href: "#office", en: "Office" },
  { href: "#contact", en: "Contact" },
];

const SERVICES = [
  {
    no: "01",
    ja: "記帳の代行",
    text: "領収書と通帳の写しを月に一度お預かりして、帳簿をつけます。箱や封筒にまとめたままで受け取ります。",
  },
  {
    no: "02",
    ja: "確定申告",
    text: "個人で商売をしている方、不動産の収入がある方の申告書をつくります。毎年1月に、そろえる書類の一覧をお送りします。",
  },
  {
    no: "03",
    ja: "法人の決算と申告",
    text: "小さな会社の決算書と申告書をつくります。決算の三か月前に一度お会いして、その年の数字を一緒に見ます。",
  },
  {
    no: "04",
    ja: "相続のご相談",
    text: "親の家や畑をどうするか、だれが何を引き継ぐか。決める前の、話の整理から聞きます。登記は司法書士と組んで進めます。",
  },
  {
    no: "05",
    ja: "融資の書類づくり",
    text: "銀行や公庫に出す事業計画書と資金繰りの表を、一緒につくります。数字の根っこを、銀行の人にご自身で説明できる形にします。",
  },
];

const FEES: { ja: string; en: string; price: string; sub?: string }[] = [
  { ja: "記帳の代行", en: "Bookkeeping", price: "月 15,000円〜" },
  { ja: "個人の確定申告", en: "Tax return", price: "50,000円〜" },
  { ja: "法人の決算と申告", en: "Corporate", price: "180,000円〜" },
  {
    ja: "相続のご相談",
    en: "Inheritance",
    price: "初回 30分 無料",
    sub: "その後は、話をうかがってから見積り",
  },
  { ja: "融資の書類づくり", en: "Loan papers", price: "40,000円〜" },
];

const FLOW = [
  {
    no: "01",
    ja: "お電話かメール",
    text: "何について聞きたいか、ひとことで大丈夫です。平日の昼間につながります。",
  },
  {
    no: "02",
    ja: "はじめの面談",
    text: "事務所か、島の中ならご自宅や店に伺います。手元の書類をそのまま見せてください。",
  },
  {
    no: "03",
    ja: "見積りをお渡し",
    text: "やることと金額を紙に書いてお渡しします。持ち帰って考えてから決めてください。",
  },
  {
    no: "04",
    ja: "お預かり",
    text: "決まったら、毎月、書類を受け渡す日を一日決めて始めます。",
  },
];

const NEWS = [
  {
    date: "2026-10-01",
    label: "2026.10.01",
    text: "年末調整の書類の受け付けを、11月10日から始めます。",
  },
  {
    date: "2026-09-16",
    label: "2026.09.16",
    text: "インボイスについての小さな勉強会を、事務所で開きました。",
  },
  {
    date: "2026-08-20",
    label: "2026.08.20",
    text: "8月の旧盆の三日間は、事務所をお休みします。",
  },
];

export default function MinatoPage() {
  return (
    <div className="mn" id="top">
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <SampleNote bg="#1C4253" fg="#E9E2D6" font="'Noto Sans JP', sans-serif" />

      <MinatoMenu />

      <main>
        {/* 一番上：港の写真に大きな店名 */}
        <section className="mn-hero" aria-label="みなと税理士事務所">
          <div className="mn-hero__img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/hero-port.webp`} alt="朝の港。岸壁に小さな漁船が並び、うしろに緑の山" fetchPriority="high" />
          </div>
          <h1 className="mn-hero__name">
            <span className="mn-hero__en" aria-hidden="true">
              Minato
            </span>
            <span className="mn-sr">みなと税理士事務所</span>
          </h1>
          <p className="mn-hero__sub">
            みなと税理士事務所
            <span>MINATO Tax Office ／ 奄美市</span>
          </p>
        </section>

        {/* Story：深い海の青の面 */}
        <section className="mn-story" id="story" aria-labelledby="mn-story-h">
          <div className="mn-story__in">
            <Big className="mn-big--light">Story</Big>
            <h2 id="mn-story-h" className="mn-story__h" data-rv>
              領収書は、
              <br />
              箱のまま持ってきてください。
            </h2>
            <div className="mn-story__body" data-rv>
              <p>島で店や船の仕事をしていると、帳簿のことをすぐ聞ける人が、近くにいないことがあります。</p>
              <p>
                この事務所は、名瀬の港から歩いて五分のところにあります。記帳、申告、決算、相続のご相談まで、税理士ひとりと事務ひとりの、二人で受けています。
              </p>
              <p>
                「これは経費になりますか」と電話で聞くだけでもかまいません。わからないことは調べて、確かめてから返事をします。
              </p>
              <p>龍郷町や瀬戸内町など、島の中ならこちらから伺います。</p>
            </div>
          </div>
          <div className="mn-story__foot">
            <div className="mn-story__aside" data-rv>
              <p>聞きたいことが一つだけでも、電話で受けています。</p>
              <a href="tel:0997000000">Tel : 0997-00-0000</a>
              <small>平日 9:00〜17:30</small>
            </div>
            <Pic src="story-window" alt="事務所の窓から見える海と、窓辺のマグカップ" className="mn-story__pic" />
          </div>
        </section>

        {/* 決めごと */}
        <section className="mn-policy" aria-labelledby="mn-policy-h">
          <Big className="mn-policy__big">Policy</Big>
          <h2 id="mn-policy-h" className="mn-sr">
            事務所の決めごと
          </h2>
          <Pic src="hands" alt="木の机で領収書を小さな山に分けている手元" className="mn-policy__pic" />
          <ol className="mn-policy__list">
            <li data-rv>
              <span className="mn-no">01.</span>
              <div>
                <h3>数字は、ふだんの言葉で説明します。</h3>
                <p>
                  決算書を渡して終わりにはしません。去年と比べて何が増えて何が減ったのか、帳簿を一緒にめくりながら話します。専門の言葉は、使ったらすぐ言いかえます。
                </p>
              </div>
            </li>
            <li data-rv>
              <span className="mn-no">02.</span>
              <div>
                <h3>決める前に、選べる道を並べます。</h3>
                <p>
                  税金の額は、商売の中身や家族の事情で変わります。こちらで一つに決めず、いくつかの道と、それぞれの手間や費用を並べて、選んでいただきます。
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* できること */}
        <section className="mn-service" id="service" aria-labelledby="mn-service-h">
          <div className="mn-service__head">
            <Big>Service</Big>
            <h2 id="mn-service-h" className="mn-service__ja" data-rv>
              できること
            </h2>
          </div>
          <div className="mn-service__grid">
            <div className="mn-service__pics">
              <Pic src="svc-books" alt="白いノートと、クリップで留めた領収書の束" className="mn-service__p1" />
              <Pic src="svc-house" alt="石垣と庭木に囲まれた、瓦屋根の古い平屋" className="mn-service__p2" />
            </div>
            <ul className="mn-service__list">
              {SERVICES.map((s) => (
                <li key={s.no} data-rv>
                  <span className="mn-no">{s.no}.</span>
                  <div>
                    <h3>{s.ja}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 料金の目安：青の面 */}
        <section className="mn-fee" id="fee" aria-labelledby="mn-fee-h">
          <div className="mn-fee__in">
            <Big className="mn-big--light">Fee</Big>
            <div className="mn-fee__body">
              <h2 id="mn-fee-h" className="mn-fee__h" data-rv>
                料金の目安
              </h2>
              <p className="mn-fee__lead" data-rv>
                売上の規模や帳簿の量で変わるので、はじめの面談のあとに見積りをお渡しします。
              </p>
              <dl className="mn-fee__list" data-rv>
                {FEES.map((f) => (
                  <div key={f.ja}>
                    <dt>
                      {f.ja}
                      <span aria-hidden="true">{f.en}</span>
                    </dt>
                    <dd>
                      {f.price}
                      {f.sub && <small>{f.sub}</small>}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mn-fee__note" data-rv>
                ※ 見本のため、金額はすべて例です。税別。
              </p>
            </div>
          </div>
          <Pic src="svc-season" alt="封筒と白い紙、万年筆と朱肉" className="mn-fee__pic" />
        </section>

        {/* 相談の流れ */}
        <section className="mn-flow" id="flow" aria-labelledby="mn-flow-h">
          <div className="mn-flow__head">
            <Big>Flow</Big>
            <h2 id="mn-flow-h" className="mn-flow__ja" data-rv>
              ご相談の流れ
            </h2>
          </div>
          <ol className="mn-flow__list">
            {FLOW.map((f) => (
              <li key={f.no} data-rv>
                <span className="mn-flow__no">{f.no}</span>
                <h3>{f.ja}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ol>
          <Pic src="story-road" alt="海ぞいの静かな道。片側に低い堤防、反対側に緑の山" className="mn-flow__pic" />
        </section>

        {/* 事務所の様子 */}
        <section className="mn-office" id="office" aria-labelledby="mn-office-h">
          <Big className="mn-office__big">Office</Big>
          <div className="mn-office__wide">
            <Pic src="office-table" alt="海の見える窓の前の、丸い木のテーブルと二脚の椅子" />
            <div className="mn-office__over" data-rv>
              <h2 id="mn-office-h">窓から港が見える、小さな事務所です。</h2>
              <p>相談の席は一つだけ。ほかのお客さんと顔を合わせずに話せます。</p>
            </div>
          </div>
          <div className="mn-office__row">
            <Pic src="office-entry" alt="木枠のガラス戸と、鉢植えのある入口" className="mn-office__a" />
            <div className="mn-office__text" data-rv>
              <h3>事務所のこと</h3>
              <p>
                入口は通りに面したガラス戸で、段差は一段だけです。建物の横に、車を二台とめられます。お子さん連れでも、気にせずお入りください。
              </p>
              <p>帳簿や申告書の控えは、お客さんごとの綴りにして、鍵のかかる書庫で保管しています。</p>
            </div>
            <Pic src="office-shelf" alt="紺と灰色の綴りが並ぶ木の棚" className="mn-office__b" />
          </div>
          <Pic src="desk" alt="帳簿の綴りと電卓、鉛筆が置かれた木の机" className="mn-office__desk" />
        </section>

        {/* お知らせ */}
        <section className="mn-news" aria-labelledby="mn-news-h">
          <div className="mn-news__head">
            <Big>News</Big>
            <h2 id="mn-news-h" className="mn-sr">
              お知らせ
            </h2>
          </div>
          <ul className="mn-news__list">
            {NEWS.map((n) => (
              <li key={n.date} data-rv>
                <time dateTime={n.date}>{n.label}</time>
                <p>{n.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 案内 */}
        <section className="mn-access" aria-labelledby="mn-access-h">
          <Pic src="foot-sea" alt="夕方の港の防波堤から見た、静かな海と岬" className="mn-access__pic" />
          <div className="mn-access__info" data-rv>
            <h2 id="mn-access-h">案内</h2>
            <dl>
              <div>
                <dt>事務所</dt>
                <dd>みなと税理士事務所</dd>
              </div>
              <div>
                <dt>住所</dt>
                <dd>
                  鹿児島県奄美市（住所は架空）
                  <br />
                  <a
                    className="mn-link"
                    href="https://www.google.com/maps/search/?api=1&query=%E5%A5%84%E7%BE%8E%E5%B8%82%E5%90%8D%E7%80%AC"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    地図を開く（見本）
                  </a>
                </dd>
              </div>
              <div>
                <dt>受付</dt>
                <dd>平日 9:00〜17:30（土日祝・旧盆はお休み）</dd>
              </div>
              <div>
                <dt>駐車場</dt>
                <dd>建物の横に2台</dd>
              </div>
              <div>
                <dt>電話</dt>
                <dd>
                  <a className="mn-link" href="tel:0997000000">
                    0997-00-0000
                  </a>
                </dd>
              </div>
              <div>
                <dt>SNS</dt>
                <dd>Instagram（準備中）</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="mn-foot" id="contact">
        <div className="mn-arch">
          <Big className="mn-big--light mn-arch__big">Contact</Big>
          <p className="mn-arch__lead" data-rv>
            はじめてのご相談も、まずはお電話でひとこと。
          </p>
          <div className="mn-arch__links" data-rv>
            <a href="tel:0997000000">Tel : 0997-00-0000</a>
            <a href="mailto:info@example.com">Mail : info@example.com</a>
          </div>
        </div>
        <div className="mn-foot__bottom">
          <p className="mn-foot__logo" aria-hidden="true">
            Minato
          </p>
          <nav className="mn-foot__nav" aria-label="フッターの案内">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.en}
              </a>
            ))}
          </nav>
          <div className="mn-foot__end">
            <p>(c) 2026 MINATO Tax Office / sample site by ALPACA</p>
            <a href="#top">Back to top</a>
          </div>
        </div>
      </footer>
      <Reveal />
    </div>
  );
}
