import type { Metadata } from "next";
import Link from "next/link";
import "@/components/award/aw.css";
import { gothic, hand, maru, mincho, mono } from "@/components/award/fonts";
import { jp } from "@/components/award/jp";
import AwHeader from "@/components/award/AwHeader";
import AwMotion from "@/components/award/AwMotion";
import AwFaq from "@/components/award/AwFaq";
import AwForm from "@/components/award/AwForm";
import AwSlip from "@/components/award/AwSlip";
import AwServices, { type Service } from "@/components/award/AwServices";
import { ByWorry, Co, FirstTag, IfEngaged, IfNamed, WorkNo } from "@/components/award/AwYou";
import { SITE } from "@/lib/site";

/**
 * ALPACA トップ（2026-10 作り直し・award-p2）
 * 方向: 組織表の「IT担当」の空席に ALPACA の名前が入る。生成り・墨・朱の3色、明朝と罫線だけ。DIRECTION.md
 * 文言の正: /root/agents/alpaca-notes/facts/business.md と決定済みの COPY-APPLY-0926.md
 */

const DESC =
  "ホームページも、システムも、AIの相談も、窓口はひとつ。ホームページ制作（25万円から・税別）、業務システムの開発、会社のIT担当として中に入るAI顧問（月15万円・税別）。鹿児島県奄美市有屋町のALPACA。";

export const metadata: Metadata = {
  title: { absolute: "ALPACA | あなたの仕事の、ベストパートナー。" },
  description: DESC,
  openGraph: {
    title: "ALPACA | あなたの仕事の、ベストパートナー。",
    description: DESC,
    url: "https://alpaca-amami.com",
    siteName: "ALPACA",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "あなたの仕事の、ベストパートナー。ALPACA" }],
  },
};

// 一番上の一文。かたまりごとに折り返し、1つずつ下から出す（言い回しは決定済み・変えない）
const HERO_LINES = [
  ["社内に", "IT担当が", "いない会社の、"],
  ["IT担当に", "なります。"],
];

// 一番上の「□になります」で入れ替わる言葉。IT担当 は全部をまとめた言葉なので最後に止まる
const SWAP_WORDS = ["ホームページ担当", "システム担当", "AI担当", "IT担当"];

// 組織表（例）。最後の行の「空席」が消えて ALPACA が入る
const ROSTER = [
  { role: "社長", who: "あなた", note: "決める" },
  { role: "経理", who: "事務の方", note: "お金と書類" },
  { role: "現場", who: "社員の皆さん", note: "お客さんの前に立つ" },
];

const WORKS = [
  {
    n: "01",
    id: "web" as const,
    name: "ホームページ制作",
    lead: "会社の窓口になるページを作ります。1枚もののLPから、会社案内のサイトまで。",
    sub: "",
    scenes: ["ホームページが何年も前のままになっている", "そもそも会社のページがない", "新しいサービスを始めるので、1枚のページで知らせたい"],
    items: ["LP（1枚のページ）", "コーポレートサイト（会社案内）"],
    note: "WordPress、ネットショップ、ブログ機能は扱いません。",
    priceLabel: "料金",
    price: "25万円から",
    tax: true,
  },
  {
    n: "02",
    id: "system" as const,
    name: "システム開発",
    lead: "紙とExcelで続けてきた仕事を、その会社のやり方に合わせてシステムにします。",
    sub: "",
    items: ["顧客管理", "予約", "受発注", "在庫", "見積と請求", "勤怠", "売上の集計"],
    note: "業種に合わせた物も作ります。",
    priceLabel: "料金",
    price: "内容を聞いてお見積り",
    tax: false,
  },
  {
    n: "03",
    id: "komon" as const,
    name: "AI顧問",
    lead: "社内のIT担当として、ALPACAが中に入ります。ホームページ、業務の仕組み、AIの使い方、パソコンやソフトの困りごとまで、その時に要る事をやります。",
    sub: "月1回、顔を合わせて話します。チャットの相談はいつでも送れて、平日に返事します。",
    items: ["ホームページのこと", "業務の仕組み", "AIの使い方", "パソコンやソフトの相談"],
    note: "",
    priceLabel: "顧問料",
    price: "月15万円",
    tax: true,
  },
];

// 社長の困りごと（決定済みの3行）
// 大きな字で読ませるので、句のかたまりを手で切る（スマホで「でも、」だけの行ができていた）
const VOICES = [
  ["「ホームページ、", "何年も", "触ってない」"],
  ["「パソコンの設定、", "毎回だれかに", "聞いてる」"],
  ["「AI、", "気にはなってる」"],
];

// ALPACAに頼む理由（決定済み）
const REASONS = [
  { n: "1", t: "うまく言えなくていい", d: "何に困っているか、まとまっていなくても大丈夫です。サーバーやドメインのような言葉も、分かる言葉に直して話します。" },
  { n: "2", t: "今のやり方に合わせる", d: "紙やExcelで回している流れを聞いて、そのやり方に合わせて作ります。" },
  { n: "3", t: "同じ島にいる", d: "奄美の会社なら、気軽に会えます。※", note: "※ 島外の会社とは、画面ごしでも進められます。島外へ伺う時は、交通費をご負担いただきます。" },
];

// AI顧問の毎月の流れ（決定済み）。困りごとを選んだ人には、先に頼む仕事の進め方に差し替える
const FLOW = [
  { n: "01", t: "書き出す", d: "どの作業に毎日何分かかっているか、一緒に書き出します" },
  { n: "02", t: "分ける", d: "AIに任せる作業と、人が続ける作業を分けます。全部をAIにはしません" },
  { n: "03", t: "作る", d: "会社専用のAIや、今使っているソフトとつながる仕組みを作ります" },
  { n: "04", t: "使えるようにする", d: "社員さんが自分で使えるまで付き合います。翌月、何分減ったかを見て、次の作業へ" },
];
const FLOW_DOCS = [
  { t: "聞く", d: "今の見積や書類を、だれがどの順で作っているか聞きます" },
  { t: "決める", d: "システムにする範囲を決めて、見積りを出します" },
  { t: "作る", d: "今のやり方に合わせて作ります。途中で画面を見てもらいます" },
  { t: "使えるようにする", d: "社員さんが自分で使えるまで付き合います" },
];
const FLOW_HP = [
  { t: "聞く", d: "どんなお客さんに、何を伝えたいかを聞きます" },
  { t: "組み立てる", d: "載せる中身と順番を決めて、見積りを出します" },
  { t: "作る", d: "文章と見た目を作ります。途中で画面を見てもらいます" },
  { t: "公開する", d: "公開した後も、直したい所があれば相談できます" },
];

// Our Services のタブの中身（10/4 Q8①）。進め方は紙芝居（Q7③）。AI顧問の流れは facts（会社のIT担当・月1回）に合わせた案
const SERVICES: Service[] = [
  { ...WORKS[0], tab: "ホームページ", en: "Websites", flowTitle: "進め方", flow: FLOW_HP },
  { ...WORKS[1], tab: "システム", en: "Systems", flowTitle: "進め方", flow: FLOW_DOCS },
  {
    ...WORKS[2],
    tab: "AI顧問",
    en: "Your IT team",
    flowTitle: "毎月の流れ",
    flow: [
      { t: "話す", d: "月に1回、顔を合わせて、いま困っている事を聞きます" },
      { t: "決める", d: "その月にやる事を一緒に決めます。大きい物は何か月かに分けます" },
      { t: "やる", d: "直す、作る、使い方を教える。チャットの相談には平日に返事します" },
      { t: "確かめる", d: "使われているかを見て、次の月にやる事を考えます" },
    ],
  },
];

const PRICES = [
  { id: "komon" as const, name: "AI顧問", pre: "月", num: "15", post: "万円", rows: ["月1回、顔を合わせて話します", "お受けするのは3社までです"], tax: true },
  { id: "system" as const, name: "システム開発", pre: "", num: "", post: "お見積り", rows: ["内容を聞いてから金額を出します"], tax: false },
  { id: "web" as const, name: "ホームページ制作", pre: "", num: "25", post: "万円から", rows: ["LP、コーポレートサイト"], tax: true },
];

const PRICE_NOTES = [
  "AI顧問に最低契約期間はありません。",
  "AI顧問の保守は月額に含みます。別の保守料はかかりません。",
  "AIの利用料が実費でかかる場合があります。",
  "打ち合わせはオンラインが基本です。奄美の会社には訪問もします。",
];

// 答えは今のトップの文言のまま（facts/business.md と合わせた物）
const FAQS = [
  {
    q: "何から始めればいい？",
    a: "まずは話を聞かせてください。相談は無料です。AI顧問が始まったら、最初の月は仕事の書き出しから入ります。",
  },
  { q: "ホームページやシステムだけでも頼める？", a: "頼めます。AI顧問の契約がなくても、ホームページ制作やシステム開発だけで受けます。" },
  { q: "パソコンが苦手な社員でも使える？", a: "大丈夫です。社員が自分で使えるまで教えます。" },
  { q: "途中でやめられる？", a: "やめられます。AI顧問に最低契約期間はありません。" },
  { q: "奄美以外の会社でも頼める？", a: "頼めます。打ち合わせはオンラインです。奄美の会社には訪問もします。" },
  { q: "顧問料のほかにかかる費用は？", a: "AIの利用料が実費でかかる場合があります。保守料は月額に含みます。" },
];

const COMPANY: [string, React.ReactNode][] = [
  ["屋号", "ALPACA"],
  ["代表", "作田 大地（さくだ だいち）"],
  ["事業内容", "AI導入支援／システム開発／HP制作"],
  ["所在地", "鹿児島県奄美市有屋町"],
  ["電話", <a key="t" href={SITE.contact.telHref}>{SITE.contact.tel}</a>],
  ["メール", <a key="m" href={SITE.contact.emailHref}>{SITE.contact.email}</a>],
  [
    "Instagram",
    <a key="i" href={SITE.contact.instagramUrl} target="_blank" rel="noopener noreferrer">
      {SITE.contact.instagramHandle}
    </a>,
  ],
];

function SecHead({ n, title, id }: { n: string; title: React.ReactNode; id: string }) {
  return (
    <header className="aw-sechead">
      <p className="aw-sechead__n" aria-hidden="true">
        ({n})
      </p>
      <h2 className="aw-sechead__t" id={id} data-rise>
        {title}
      </h2>
    </header>
  );
}

function HandTitle({ text, w, fid }: { text: string; w: number; fid: string }) {
  // 手書きの英語見出し。画面に入ると一筆ずつ書かれ、そのあと少しぐにゃっと揺れ続ける（AwMotion が is-in を付ける）
  return (
    <span className="aw-hand" data-hand>
      <span className="aw-sr">{text}</span>
      <svg viewBox={`0 0 ${w} 200`} aria-hidden="true" className="aw-hand__svg" style={{ maxWidth: `${(w / 1000) * 920}px` }}>
        <defs>
          <filter id={fid} x="-5%" y="-10%" width="110%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="3" result="n">
              <animate attributeName="baseFrequency" dur="6s" values="0.012;0.02;0.012" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="7" />
          </filter>
        </defs>
        <text x="8" y="158" className="aw-hand__t" filter={`url(#${fid})`}>
          {text}
        </text>
      </svg>
    </span>
  );
}

function Photo({ src, cap }: { src: string; cap?: string }) {
  // 区切りの写真（AIで作った場面写真。人の顔は出さない）。スクロールで少しずれて奥行きを出す
  return (
    <figure className="aw-photo" aria-hidden="true">
      <div className="aw-photo__in" data-photo>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={1920} height={1080} loading="lazy" decoding="async" />
      </div>
      {cap && <figcaption className="aw-photo__cap">{cap}</figcaption>}
    </figure>
  );
}

function Arrow() {
  return (
    <svg className="aw-arrow" viewBox="0 0 20 12" aria-hidden="true">
      <path d="M0 6h18M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className={`aw ${mincho.variable} ${gothic.variable} ${mono.variable} ${hand.variable} ${maru.variable}`}>
      {/* 動きを許す人だけ、最初の形（隠した状態）を描画前に入れる。ちらつき防止 */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var c=document.documentElement.classList;c.add('aw-anim');setTimeout(function(){if(!c.contains('aw-js-ok'))c.remove('aw-anim')},6000)}}catch(e){}`,
        }}
      />
      {/* JavaScript が動かない時は、動かない入力欄を出さない（説明文と組織表はそのまま読める） */}
      <noscript>
        <style>{`.aw-ask__label,.aw-ask__field,.aw-ask__note,.aw-ask__skip{display:none}`}</style>
      </noscript>
      <a href="#work" className="aw-skip">
        本文へ
      </a>
      <AwHeader />

      {/* 一番上（10/4 大地さん決定のファーストビュー A）: 画像生成の決定版をそのまま使う（大地さん「やっぱ画像生成そのまま使うわ」）。
          文字は画像に入っているので、検索・読み上げ用の同じ文を見えない形で置き、黄色のボタンの所に押せるリンクを重ねる */}
      <section className="fvimg" aria-labelledby="fv-h">
        <h1 className="aw-sr" id="fv-h">
          あなたの仕事の、ベストパートナー。
        </h1>
        <p className="aw-sr">ホームページも、システムも、AIの相談も、窓口はひとつ。</p>
        <picture className="fvimg__pic">
          <source media="(max-width: 900px) and (orientation: portrait)" srcSet="/images/fv-sp.webp" width={941} height={1672} />
          <img src="/images/fv-pc.webp" width={1672} height={941} alt="ノートパソコンを抱えて歩く女性と、「あなたの仕事の、ベストパートナー。」の文字" fetchPriority="high" />
        </picture>
        <a href="#contact" className="fvimg__cta">
          <span className="aw-sr">まずは無料で相談する</span>
        </a>
      </section>


      {/* 仕事3つ */}
      <section className="aw-sec aw-work" id="work" aria-labelledby="aw-work-h">
        <div className="aw-wrap">
          <SecHead
            n="01"
            id="aw-work-h"
            title={<HandTitle text="Our Services" w={1000} fid="aw-hand-w1" />}
          />
          <ByWorry
            as="p"
            className="aw-work__you"
            d={null}
            docs={<>{jp("見積や書類づくりに時間がかかるなら、先に頼むのはシステム開発です。")}<Co after="が" />{jp("今使っている紙やExcelの流れを聞いて、そのやり方のままシステムにします。")}</>}
            hp={<>{jp("ホームページから問い合わせが来ないなら、先に頼むのはホームページ制作です。")}<Co after="が" />{jp("何をしている所か、開いてすぐ分かるページに作り直します。")}</>}
            ai={<>{jp("AIを何に使えばいいか分からないなら、先に頼むのはAI顧問です。")}<Co after="の" />{jp("仕事を一緒に書き出して、AIに任せる作業を1つずつ決めます。")}</>}
          />
          <AwServices services={SERVICES} />
        </div>
      </section>

      <Photo src="/images/scene/s4-meeting.webp" />

      {/* よく聞く話（社長の言葉） */}
      <section className="aw-sec aw-voice" id="voice" aria-labelledby="aw-voice-h">
        <div className="aw-wrap">
          <SecHead n="02" id="aw-voice-h" title={<HandTitle text="Sound familiar?" w={1180} fid="aw-hand-w2" />} />
          <ul className="aw-voice__list">
            {VOICES.map((v, i) => (
              <li key={i} className="aw-voice__q" data-voice>
                {v.map((c) => (
                  <span key={c} className="aw-ph">
                    {c}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 頼む理由 */}
      <section className="aw-sec aw-reason" id="reason" aria-labelledby="aw-reason-h">
        <div className="aw-wrap">
          <SecHead n="03" id="aw-reason-h" title="ALPACAに頼む理由" />
          <ul className="aw-reason__list">
            {REASONS.map((r) => (
              <li key={r.n} className="aw-reason__item">
                <span className="aw-rule" data-line aria-hidden="true" />
                <div className="aw-reason__in" data-rise>
                  <p className="aw-reason__n" aria-hidden="true">
                    {r.n}
                  </p>
                  <h3 className="aw-reason__t">{jp(r.t)}</h3>
                  <p className="aw-reason__d">{jp(r.d)}</p>
                  {"note" in r && r.note && <p className="aw-reason__note">{jp(r.note)}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>



      {/* 料金 */}
      <section className="aw-sec aw-price" id="price" aria-labelledby="aw-price-h">
        <div className="aw-wrap">
          <SecHead
            n="05"
            id="aw-price-h"
            title={
              <ByWorry
                d="料金"
                docs={<><span className="aw-nb"><Co after="に、" /></span><span className="aw-nb">かかるお金</span></>}
                hp={<><span className="aw-nb"><Co after="に、" /></span><span className="aw-nb">かかるお金</span></>}
                ai={<><span className="aw-nb"><Co after="に、" /></span><span className="aw-nb">かかるお金</span></>}
              />
            }
          />
          <ByWorry
            as="p"
            className="aw-price__you"
            d={null}
            docs={jp("システム開発は、内容を聞いてから金額を出します。")}
            hp={jp("ホームページ制作は、25万円から（税別）です。")}
            ai={jp("AI顧問は、月15万円（税別）です。最低契約期間はありません。")}
          />
          <ul className="aw-price__list">
            {PRICES.map((p) => (
              <li key={p.name} className="aw-price__row" id={`price-${p.id}`}>
                <span className="aw-rule" data-line aria-hidden="true" />
                <h3 className="aw-price__name" data-rise>
                  {p.name}
                  <FirstTag id={p.id}>
                    <Co after="は、まずここ" />
                  </FirstTag>
                </h3>
                <p className="aw-price__main" data-rise>
                  {p.pre && <span className="aw-price__unit">{p.pre}</span>}
                  {p.num && <span className="aw-price__num">{p.num}</span>}
                  <span className={p.num ? "aw-price__unit" : "aw-price__word"}>{p.post}</span>
                  {p.tax && <small>（税別）</small>}
                </p>
                <ul className="aw-price__rows" data-rise>
                  {p.rows.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <ul className="aw-price__notes" data-rise>
            {PRICE_NOTES.map((n) => (
              <li key={n}>{jp(n)}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ALPACAについて */}
      <section className="aw-sec aw-about" id="about" aria-labelledby="aw-about-h">
        <div className="aw-wrap aw-about__in">
          <div className="aw-about__markbox" aria-hidden="true">
            <div className="aw-about__mark" data-mark />
          </div>
          <div className="aw-about__body">
            <SecHead n="06" id="aw-about-h" title="ALPACAについて" />
            <p className="aw-about__txt" data-rise>
              {jp("奄美大島の有屋町を拠点にしています。代表は作田 大地。AI顧問のほか、業務システムやホームページも作ります。")}
            </p>
            <dl className="aw-company">
              {COMPANY.map(([k, v]) => (
                <div key={k} className="aw-company__row">
                  <span className="aw-rule" data-line aria-hidden="true" />
                  <dt>{k}</dt>
                  <dd>{typeof v === "string" ? jp(v) : v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="aw-sec aw-faqsec" id="faq" aria-labelledby="aw-faq-h">
        <div className="aw-wrap aw-faqsec__in">
          <SecHead n="07" id="aw-faq-h" title="よくある質問" />
          <AwFaq items={FAQS.map((f) => ({ key: f.q, q: jp(f.q), a: jp(f.a) }))} />
        </div>
      </section>


      {/* 問い合わせ */}
      <section className="aw-contact" id="contact" aria-labelledby="aw-contact-h">
        <div className="aw-wrap">
          <p className="aw-contact__n" aria-hidden="true">
            (08)
          </p>
          <h2 className="aw-contact__h" id="aw-contact-h">
            <span className="aw-nb" data-rise>
              <IfNamed no="まずは話を" yes={<><Co after="の話を、" /></>} />
            </span>
            {/* 散らばった字が集まって一文になる（funtech の締めの一文から） */}
            <span className="aw-nb aw-gather">
              <span className="aw-sr">聞かせてください。</span>
              {"聞かせてください。".split("").map((ch, i) => (
                <span key={i} className="aw-gather__c" data-gather aria-hidden="true">
                  {ch}
                </span>
              ))}
            </span>
          </h2>
          <IfEngaged>
            <p className="aw-contact__left">
              <span className="aw-nb">
                <Co after="のIT担当の仕事は、" />
              </span>
              <span className="aw-nb">あと1つ。</span>
              <span className="aw-nb aw-contact__left-t">話をする</span>
            </p>
          </IfEngaged>
          <p className="aw-contact__lead" data-rise>
            {jp("どの仕事で困っているか、短くても大丈夫です。相談は無料です。")}
          </p>
          <div className="aw-contact__grid">
            <div className="aw-contact__direct" data-rise>
              <a href={SITE.contact.emailHref} className="aw-contact__big">
                <span className="aw-contact__k">メール</span>
                <span className="aw-contact__v">
                  {SITE.contact.email.split("@")[0]}
                  <wbr />@{SITE.contact.email.split("@")[1]}
                </span>
                <Arrow />
              </a>
              <a href={SITE.contact.telHref} className="aw-contact__big">
                <span className="aw-contact__k">電話</span>
                <span className="aw-contact__v">{SITE.contact.tel}</span>
                <Arrow />
              </a>
              <a href={SITE.contact.instagramUrl} className="aw-contact__big" target="_blank" rel="noopener noreferrer">
                <span className="aw-contact__k">Instagram</span>
                <span className="aw-contact__v">{SITE.contact.instagramHandle}</span>
                <Arrow />
              </a>
            </div>
            <AwForm />
          </div>
        </div>
      </section>

      <footer className="aw-foot">
        {/* 屋号を幅いっぱいに。文字の幅は SVG の textLength で枠にぴったり合わせる */}
        <div className="aw-wrap">
          <div className="aw-foot__word" aria-hidden="true">
            <svg viewBox="0 0 1000 178" data-word>
              <text x="0" y="160" textLength="1000" lengthAdjust="spacing">
                ALPACA
              </text>
            </svg>
          </div>
        </div>
        <div className="aw-wrap aw-foot__in">
          <p className="aw-foot__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/top/logo-mark.webp" alt="" width={240} height={204} className="aw-foot__mark" />
            <span>ALPACA</span>
          </p>
          <ul className="aw-foot__links">
            <li>
              <Link href="/privacy">プライバシーポリシー</Link>
            </li>
            <li>
              <Link href="/terms">利用規約</Link>
            </li>
            <li>
              <Link href="/tokushoho">特定商取引法に基づく表記</Link>
            </li>
          </ul>
          <p className="aw-foot__c">&copy; ALPACA</p>
        </div>
      </footer>

      <AwSlip />
      <AwMotion />
    </div>
  );
}
