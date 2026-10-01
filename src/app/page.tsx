import type { Metadata } from "next";
import Link from "next/link";
import "@/components/award/aw.css";
import { gothic, mincho, mono } from "@/components/award/fonts";
import { jp } from "@/components/award/jp";
import AwHeader from "@/components/award/AwHeader";
import AwMotion from "@/components/award/AwMotion";
import AwFaq from "@/components/award/AwFaq";
import AwForm from "@/components/award/AwForm";
import AwAsk from "@/components/award/AwAsk";
import AwSlip from "@/components/award/AwSlip";
import { ByWorry, Co, FirstTag, IfEngaged, IfNamed, WorkNo } from "@/components/award/AwYou";
import { SITE } from "@/lib/site";

/**
 * ALPACA トップ（2026-10 作り直し・award-p2）
 * 方向: 組織表の「IT担当」の空席に ALPACA の名前が入る。生成り・墨・朱の3色、明朝と罫線だけ。DIRECTION.md
 * 文言の正: /root/agents/alpaca-notes/facts/business.md と決定済みの COPY-APPLY-0926.md
 */

const DESC =
  "社内にIT担当がいない会社の、IT担当になります。ホームページ制作（25万円から）、業務システムの開発、業務をAIに任せる仕組みを毎月一緒に作るAI顧問（月15万円から）。鹿児島県奄美市有屋町のALPACA。";

export const metadata: Metadata = {
  title: { absolute: "ALPACA | 社内にIT担当がいない会社の、IT担当になります。" },
  description: DESC,
  openGraph: {
    title: "ALPACA | 社内にIT担当がいない会社の、IT担当になります。",
    description: DESC,
    url: "https://alpaca-amami.com",
    siteName: "ALPACA",
    locale: "ja_JP",
    type: "website",
  },
};

// 一番上の一文。かたまりごとに折り返し、1つずつ下から出す（言い回しは決定済み・変えない）
const HERO_LINES = [
  ["社内に", "IT担当が", "いない会社の、"],
  ["IT担当に", "なります。"],
];

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
    lead: "会社の窓口になるページを作ります。一枚もののLPから、会社案内のサイトまで。",
    sub: "",
    items: ["LP", "コーポレートサイト", "Next.jsで作る本格的なサイト"],
    note: "WordPress、EC、ブログ機能は扱いません。",
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
    lead: "月に1〜2回、会社にうかがうか画面ごしに話して、AIに任せる仕事を1つずつ決めます。決めたら、動く仕組みまでこちらで作ります。",
    sub: "できあがったAIには、社員がスマホから話しかけるだけ。スタッフが1人増えた感覚で使えます。",
    items: ["会社専用のAI", "作業の自動化", "今使っているソフトとの連携", "社員への使い方の説明"],
    note: "",
    priceLabel: "顧問料",
    price: "月15万円から",
    tax: true,
  },
];

// 社長の困りごと（決定済みの3行）
// 大きな字で読ませるので、句のかたまりを手で切る（スマホで「でも、」だけの行ができていた）
const VOICES = [
  ["「AIがすごいのは", "知ってる。", "でも、うちの", "どの仕事に", "使えばいいのか", "分からない」"],
  ["「便利なアプリを", "入れたけど、", "結局だれも", "開いてない」"],
  ["「求人を出しても", "人が来ない。", "今いる人の手を", "少しでも", "空けたい」"],
];

// ALPACAに頼む理由（決定済み）
const REASONS = [
  { n: "一", t: "話を聞いて終わりにしない", d: "「こうすればいいですよ」と言うだけの顧問ではありません。仕組みはこちらで作って、置いていきます。" },
  { n: "二", t: "自分の仕事で先に試している", d: "予定表も台帳も、まず自分の仕事でシステムにして、毎日使っています。" },
  { n: "三", t: "奄美にいる", d: "奄美の会社なら、会って話せます。" },
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
  { t: "公開する", d: "公開して、問い合わせが届くかを一緒に確かめます" },
];

const PRICES = [
  { id: "komon" as const, name: "AI顧問", pre: "月", num: "15", post: "万円から", rows: ["月15万円　定例の打ち合わせ 月1回", "月25万円　定例の打ち合わせ 月2回"], tax: true },
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

function Arrow() {
  return (
    <svg className="aw-arrow" viewBox="0 0 20 12" aria-hidden="true">
      <path d="M0 6h18M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className={`aw ${mincho.variable} ${gothic.variable} ${mono.variable}`}>
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

      {/* 一番上: 一文と余白、組織表 */}
      <section className="aw-hero" aria-labelledby="aw-hero-h">
        <div className="aw-wrap aw-hero__in">
          <p className="aw-hero__meta" data-hero="meta">
            <span>奄美大島　有屋町</span>
            <span className="aw-hero__meta-r">ホームページ制作／システム開発／AI顧問</span>
          </p>
          <h1 className="aw-hero__h" id="aw-hero-h">
            {HERO_LINES.map((line, li) => (
              <span key={li} className="aw-hero__line">
                {line.map((c) => (
                  <span key={c} className="aw-hero__chunk">
                    <span className="aw-hero__chunk-in" data-hero="chunk">
                      {/* 2回目の「IT担当」にだけ朱の線を引く（空席が埋まる所。文言は変えない） */}
                      {c === "IT担当に" ? (
                        <>
                          <span className="aw-hero__mark">
                            IT担当
                            <span className="aw-hero__under" data-hero="under" aria-hidden="true" />
                          </span>
                          に
                        </>
                      ) : (
                        c
                      )}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div className="aw-hero__foot">
            <figure className="aw-roster" aria-label="会社の組織表（例）。IT担当の空席に ALPACA が入ります">
              <figcaption className="aw-roster__cap" data-hero="cap">
                <span className="aw-roster__capname">
                  <Co after="の組織表" />
                </span>
                <span className="aw-roster__ex">例</span>
              </figcaption>
              <ul className="aw-roster__list">
                {ROSTER.map((r) => (
                  <li key={r.role} className="aw-roster__row" data-hero="row">
                    <span className="aw-roster__role">{r.role}</span>
                    <span className="aw-roster__who">{r.who}</span>
                    <span className="aw-roster__note">{r.note}</span>
                    <span className="aw-roster__rule" data-hero="rule" aria-hidden="true" />
                  </li>
                ))}
                <li className="aw-roster__row aw-roster__row--it" data-hero="row">
                  <span className="aw-roster__role">IT担当</span>
                  <span className="aw-roster__who aw-roster__seat">
                    <span className="aw-roster__empty">
                      <span className="aw-roster__emptytxt" data-hero="empty">
                        空席
                      </span>
                      <span className="aw-roster__strike" data-hero="strike" aria-hidden="true" />
                    </span>
                    {/* 1文字ずつ打ち込む。読み上げには aria-label の屋号を1回だけ渡す */}
                    <span className="aw-roster__name" data-hero="name" role="img" aria-label="ALPACA">
                      {"ALPACA".split("").map((ch, i) => (
                        <span key={i} data-hero="letter" aria-hidden="true">
                          {ch}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="aw-roster__note" data-hero="itnote">
                    <ByWorry
                      d="ホームページ、システム、AI"
                      docs="最初の仕事は、システム開発"
                      hp="最初の仕事は、ホームページ制作"
                      ai="最初の仕事は、AI顧問"
                    />
                  </span>
                  <span className="aw-roster__rule" data-hero="rule" aria-hidden="true" />
                </li>
              </ul>
            </figure>

            <div className="aw-hero__lead" data-hero="lead">
              <AwAsk
                lead={
                  <p className="aw-hero__txt">
                    {jp("ホームページ、業務のシステム、AIに任せる仕組み。IT担当がやるはずだった仕事を、社長と話しながら一つずつ片づけます。")}
                  </p>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* 仕事3つ */}
      <section className="aw-sec aw-work" id="work" aria-labelledby="aw-work-h">
        <div className="aw-wrap">
          <SecHead
            n="01"
            id="aw-work-h"
            title={
              <ByWorry
                d="仕事は3つです"
                docs={<><span className="aw-nb"><Co after="なら、" /></span><span className="aw-nb">システム</span><span className="aw-nb">開発から。</span></>}
                hp={<><span className="aw-nb"><Co after="なら、" /></span><span className="aw-nb">ホームページ</span><span className="aw-nb">制作から。</span></>}
                ai={<><span className="aw-nb"><Co after="なら、" /></span><span className="aw-nb">AI顧問から。</span></>}
              />
            }
          />
          <ByWorry
            as="p"
            className="aw-work__you"
            d={null}
            docs={<>{jp("見積や書類づくりに時間がかかるなら、先に頼むのはシステム開発です。")}<Co after="が" />{jp("今使っている紙やExcelの流れを聞いて、そのやり方のままシステムにします。")}</>}
            hp={<>{jp("ホームページから問い合わせが来ないなら、先に頼むのはホームページ制作です。")}<Co after="が" />{jp("何をしている所か、開いてすぐ分かるページに作り直します。")}</>}
            ai={<>{jp("AIを何に使えばいいか分からないなら、先に頼むのはAI顧問です。")}<Co after="の" />{jp("仕事を一緒に書き出して、AIに任せる作業を1つずつ決めます。")}</>}
          />
          <ol className="aw-work__list">
            {WORKS.map((w) => (
              <li key={w.id} className="aw-work__item" id={`work-${w.id}`}>
                <span className="aw-rule" data-line aria-hidden="true" />
                <div className="aw-work__head">
                  <span className="aw-work__n">
                    <WorkNo id={w.id} />
                    <FirstTag id={w.id}>
                      <Co after="は、ここから" />
                    </FirstTag>
                  </span>
                  <h3 className="aw-work__name" data-slide>
                    {w.name}
                  </h3>
                  <dl className="aw-work__price" data-rise>
                    <dt>{w.priceLabel}</dt>
                    <dd>
                      {w.price}
                      {w.tax && <small>（税別）</small>}
                    </dd>
                  </dl>
                </div>
                <div className="aw-work__body" data-rise>
                  <div className="aw-work__txt">
                    <p className="aw-work__lead">{jp(w.lead)}</p>
                    {w.sub && <p className="aw-work__sub">{jp(w.sub)}</p>}
                  </div>
                  <div className="aw-work__detail">
                    <p className="aw-work__k">内容</p>
                    <ul className="aw-work__items">
                      {w.items.map((it) => (
                        <li key={it}>{jp(it)}</li>
                      ))}
                    </ul>
                    {w.note && <p className="aw-work__note">{w.note}</p>}
                    {w.id === "komon" && (
                      <a href="#flow" className="aw-link">
                        <span>毎月の流れを見る</span>
                        <Arrow />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* よく聞く話（社長の言葉） */}
      <section className="aw-sec aw-voice" id="voice" aria-labelledby="aw-voice-h">
        <div className="aw-wrap">
          <SecHead n="02" id="aw-voice-h" title="社長から、よく聞く話" />
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
          <p className="aw-voice__ans" data-rise>
            <span className="aw-voice__ans-s">
              <span className="aw-nb">どれも、社内にIT担当が</span>
              <span className="aw-nb">いれば話が早い仕事です。</span>
            </span>
            <span className="aw-voice__ans-l">
              <span className="aw-nb">
                <IfNamed no="その席に、" yes={<><Co after="のその席に、" /></>} />
              </span>
              <span className="aw-nb">ALPACAが座ります。</span>
            </span>
          </p>
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AI顧問の毎月の流れ */}
      <section className="aw-sec aw-flow" id="flow" aria-labelledby="aw-flow-h">
        <div className="aw-wrap">
          <SecHead
            n="04"
            id="aw-flow-h"
            title={
              <ByWorry
                d="AI顧問の、毎月の流れ"
                docs={<><span className="aw-nb"><Co after="の、" /></span><span className="aw-nb">システムの</span><span className="aw-nb">進め方</span></>}
                hp={<><span className="aw-nb"><Co after="の、" /></span><span className="aw-nb">ホームページの</span><span className="aw-nb">進め方</span></>}
                ai={<><span className="aw-nb"><Co after="の、" /></span><span className="aw-nb">毎月の流れ</span></>}
              />
            }
          />
          <p className="aw-flow__intro" data-rise>
            <ByWorry
              d={jp("毎月これを1周します。1周ごとに、AIに任せる仕事が1つ増えます。")}
              docs={<><Co after="の" />{jp("見積や書類は、この順でシステムにします。")}</>}
              hp={<><Co after="の" />{jp("ホームページは、この順で作ります。")}</>}
              ai={<><Co after="でも、" />{jp("毎月これを1周します。1周ごとに、AIに任せる仕事が1つ増えます。")}</>}
            />
          </p>
          <div className="aw-flow__grid" data-flow>
            {/* 毎月の1周を輪で見せる。読み進めると朱の弧が伸び、今の段の名前が真ん中に出る */}
            <div className="aw-flow__ringbox" aria-hidden="true">
              <div className="aw-flow__ring">
                <svg viewBox="0 0 400 400">
                  <circle className="aw-flow__base" cx="200" cy="200" r="170" />
                  {/* 12時の位置から時計回りに1周する弧 */}
                  <path className="aw-flow__prog" data-flow-bar d="M200 30 A170 170 0 1 1 199.9 30" pathLength={100} />
                  {[
                    [200, 30],
                    [370, 200],
                    [200, 370],
                    [30, 200],
                  ].map(([x, y], i) => (
                    <rect key={i} className="aw-flow__dot" data-flow-dot x={x - 7} y={y - 7} width="14" height="14" />
                  ))}
                </svg>
                <div className="aw-flow__center">
                  <p className="aw-flow__lap">
                    <span>
                      <ByWorry d="毎月" docs="進め方" hp="進め方" ai="毎月" />
                    </span>
                    <span>
                      <ByWorry d="1周" docs="4つ" hp="4つ" ai="1周" />
                    </span>
                  </p>
                  {FLOW.map((f, i) => (
                    <p key={f.n} className="aw-flow__cur" data-i={i}>
                      <span className="aw-flow__cur-n">{f.n}</span>
                      <span className="aw-flow__cur-t">
                        <ByWorry d={f.t} docs={FLOW_DOCS[i].t} hp={FLOW_HP[i].t} ai={f.t} />
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <ol className="aw-flow__list">
              {FLOW.map((f, i) => (
                <li key={f.n} className="aw-flow__step" data-flow-step>
                  <p className="aw-flow__n">{f.n}</p>
                  <h3 className="aw-flow__t">
                    <ByWorry d={f.t} docs={FLOW_DOCS[i].t} hp={FLOW_HP[i].t} ai={f.t} />
                  </h3>
                  <p className="aw-flow__d">
                    <ByWorry d={jp(f.d)} docs={jp(FLOW_DOCS[i].d)} hp={jp(FLOW_HP[i].d)} ai={jp(f.d)} />
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <p className="aw-flow__first" data-rise>
            <span className="aw-flow__first-k">はじめに</span>
            <span>{jp("最初の相談は無料です。今の仕事の話を聞かせてください。")}</span>
          </p>
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
            ai={jp("AI顧問は、月15万円から（税別）です。最低契約期間はありません。")}
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
          <h2 className="aw-contact__h" id="aw-contact-h" data-rise>
            <span className="aw-nb">
              <IfNamed no="まずは話を" yes={<><Co after="の話を、" /></>} />
            </span>
            <span className="aw-nb">聞かせてください。</span>
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
