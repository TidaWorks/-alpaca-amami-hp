import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck, CircleHelp, Mail, MessageCircle, Phone, Route, Building2 } from "lucide-react";
import "@/components/top/top.css";
import Hero from "@/components/top/Hero";
import Header from "@/components/top/Header";
import SideCta from "@/components/top/SideCta";
import Marquee from "@/components/top/Marquee";
import PopSwap from "@/components/top/PopSwap";
import GalleryRow from "@/components/top/GalleryRow";
import BounceTitle from "@/components/top/BounceTitle";
import Reveal from "@/components/top/Reveal";
import ReasonCards from "@/components/top/ReasonCards";
import Slot from "@/components/top/Slot";
import Faq from "@/components/top/Faq";
import ContactForm from "@/components/top/ContactForm";
import { SITE } from "@/lib/site";

/**
 * ALPACA 新トップ（2026-09 作り直し）
 * お手本 e-chubu.jp の15セクションの流れと動きを ALPACA の中身に当てはめた物。
 * 対応表: docs/research/hp-renew-2026-09-25/MAPPING.md ／ 絵の枠: IMAGE-SLOTS.md
 */

export const metadata: Metadata = {
  title: { absolute: "ALPACA | 奄美・鹿児島の会社のAI顧問" },
  description: "奄美・鹿児島の会社と一緒に、AIに任せられる仕事を毎月ひとつずつ増やしていく顧問です。AI顧問 月15万円〜（定例の打ち合わせ月1回）。期間の縛りなし。",
  openGraph: {
    title: "ALPACA | 奄美・鹿児島の会社のAI顧問",
    description: "奄美・鹿児島の会社と一緒に、AIに任せられる仕事を毎月ひとつずつ増やしていく顧問です。",
    url: "https://alpaca-amami.com",
    siteName: "ALPACA",
    locale: "ja_JP",
    type: "website",
  },
};

const PAKA = ["/images/top/paka-run-1.webp", "/images/top/paka-run-2.webp", "/images/top/paka-run-3.webp", "/images/top/paka-run-4.webp"];

// 初回訪問の判定（7日以内に来ていたらオープニングの白い幕を出さない）。描画前に実行してちらつきを防ぐ
// あわせてローディングの絵を開くたびに4種から選ぶ（お手本も開くたびに絵が変わる）
const REVISIT_SCRIPT = `document.documentElement.dataset.tpLoad=String(Math.floor(Math.random()*4)+1);try{var t=+localStorage.getItem('tp-visited');if(t&&Date.now()-t<6048e5)document.documentElement.classList.add('tp-revisit')}catch(e){}`;

const WORRIES = [
  { id: "P01", q: "「AIが便利なのは分かる。でも、うちの仕事のどこに使えばいいのか分からない」", img: "腕を組んで考え込む社長（フラット・横長。スマホは正方形に切り抜く）" },
  { id: "P02", q: "「ツールを入れたけど、結局だれも使っていない」", img: "ほこりをかぶったパソコンと、目をそらす社員たち（フラット・横長。スマホは正方形に切り抜く）" },
  { id: "P03", q: "「人が足りない。新しく雇うより先に、今いる人の手を空けたい」", img: "書類の山に囲まれて手が足りない事務所（フラット・横長。スマホは正方形に切り抜く）" },
];

const WHAT_ROWS = [
  { k: "料金", v: "月15万円〜（定例の打ち合わせ月1回）〜 月25万円（月2回）" },
  { k: "期間", v: "期間の縛りなし" },
  { k: "打ち合わせ", v: "オンライン。奄美の会社は訪問も" },
];

const GALLERY = [
  { id: "G01", label: "定例の打ち合わせで、社長と仕事を書き出している手元", tone: "a" as const },
  { id: "G02", label: "奄美の海が見える事務所", tone: "b" as const },
  { id: "G03", label: "社員がスマホでAIに話しかけている", tone: "c" as const },
  { id: "G04", label: "代表 作田 大地が画面を見ながら説明している", tone: "d" as const },
  { id: "G05", label: "片付いた机と、定時に帰る社員", tone: "a" as const },
  { id: "G06", label: "有屋町の街並み", tone: "b" as const },
];

const PRICES = [
  {
    id: "C01",
    name: "AI顧問",
    price: "月15万円〜",
    detail: ["月15万円〜（定例 月1回）", "月25万円（定例 月2回）", "期間の縛りなし"],
    img: "定例の打ち合わせをしている社長と代表（横長）",
    href: "#flow",
  },
  {
    id: "C02",
    name: "システム開発",
    price: "要見積もり",
    detail: ["業務に合わせた受託開発", "実績: レンタカー会社の業務システム"],
    img: "業務システムの画面が映ったパソコン（横長）",
    href: "/system",
  },
  {
    id: "C03",
    name: "ホームページ制作",
    price: "25万円〜",
    detail: ["LP・コーポレートサイト", "WordPress・EC・ブログ機能はやりません"],
    img: "スマホとパソコンに映った会社のホームページ（横長）",
    href: "/web",
  },
];

const REASONS = [
  { id: "R01", n: "01", t: "期間の縛りなし", d: "契約の期間に縛りはありません。", img: "カレンダーをめくるパカ君（ほぼ正方形）" },
  { id: "R02", n: "02", t: "奄美の会社は訪問も", d: "打ち合わせはオンライン。奄美の会社は訪問もします。", img: "車で島の会社へ向かう代表（ほぼ正方形）" },
  {
    id: "R03",
    n: "03",
    t: "自社でもAIの秘書を毎日使っている",
    d: "自社でもAIの秘書を毎日使って仕事を回している（Telegramで話しかけると動く）",
    img: "スマホのTelegramでAIの秘書に話しかける画面（ほぼ正方形）",
  },
];

const FLOW = [
  { id: "F01", n: "01", lead: "どの作業に何時間かかっているか、一緒に書き出す", title: "仕事を洗い出す", img: "ホワイトボードに仕事を書き出す社長と代表" },
  { id: "F02", n: "02", lead: "AIに任せる／人が残す、を線引き", title: "任せる所を決める", img: "付箋を「AI」「人」の2列に分けている手元" },
  { id: "F03", n: "03", lead: "会社専用のAIエージェント・自動化・今のシステムとつなぐ", title: "仕組みを作る", img: "会社専用のAIエージェントの画面と、つながった今のシステム" },
  { id: "F04", n: "04", lead: "社員が自分で使えるまで教える。翌月に効き目を見て次へ", title: "根付かせる", img: "社員に使い方を教えている場面" },
];

const BAND1 = ["#AMAMI", "#AI", "#KAGOSHIMA", "#ALPACA"];
const BAND2 = ["#AI顧問", "#奄美大島", "#鹿児島", "#ALPACA"];

function Band({ words, id }: { words: string[]; id: string }) {
  return (
    <Marquee speedPC={60} speedSP={39} className={`tp-band tp-band--${id}`}>
      {words.map((w, i) => (
        <span key={w} className="tp-band__item">
          <span className={`tp-band__word tp-band__word--${i % 3}`}>{w}</span>
          {i % 2 === 1 && (
            <PopSwap hold={2.4} offset={i === 3 ? 1.2 : 0} className="tp-band__illust">
              <Slot id={`${id}-${i}a`} label="パカ君（フラット）" src={PAKA[i % 4]} ground />
              <Slot id={`${id}-${i}b`} label="パカ君（フラット）" src={PAKA[(i + 2) % 4]} ground />
            </PopSwap>
          )}
        </span>
      ))}
    </Marquee>
  );
}

function IconBtn({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} className="tp-ibtn">
      <span className="tp-ibtn__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="tp-ibtn__txt">{label}</span>
      <ArrowRight className="tp-ibtn__arrow" aria-hidden="true" />
    </a>
  );
}

// #22 コピーを文字のかたまり（最大20）に分けて 0.025s ずつ出す
const FOOT_COPY = [["会", "社", "の", "仕", "事", "に", "、"], ["AI", "の", "手", "を", "。"]];

export default function Home() {
  return (
    <div className="tp">
      <script dangerouslySetInnerHTML={{ __html: REVISIT_SCRIPT }} />
      <Header />
      <SideCta />

      {/* 2 ヒーロー */}
      <Hero />
      {/* 2b 流れる帯 */}
      <Band words={BAND1} id="B1" />

      {/* 3 困りごと（お手本 Pick up） */}
      <section className="tp-wrap tp-2col tp-worry" id="voice" aria-labelledby="tp-worry-h">
        <div className="tp-sec-ttl">
          <p className="tp-sec-ttl__en" aria-hidden="true">
            Voice
          </p>
          <h2 className="tp-sec-ttl__ja" id="tp-worry-h">
            社長の困りごと
          </h2>
        </div>
        <ul className="tp-worry__list">
          {WORRIES.map((w) => (
            <li key={w.id} className="tp-worry__card">
              <div className="tp-worry__img">
                <Slot id={w.id} label={w.img} tone="d" />
              </div>
              <p className="tp-worry__q">{w.q}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 AI顧問とは（お手本 News） */}
      <section className="tp-wrap tp-2col tp-what" id="what" aria-labelledby="tp-what-h">
        <div className="tp-sec-ttl">
          <p className="tp-sec-ttl__en" aria-hidden="true">
            What
          </p>
          <h2 className="tp-sec-ttl__ja" id="tp-what-h">
            AI顧問とは
          </h2>
        </div>
        <div>
          <div className="tp-what__box">
            <p className="tp-what__label">
              <CalendarCheck aria-hidden="true" />
              <span>AI顧問</span>
            </p>
            <p className="tp-what__lead">奄美・鹿児島の会社と一緒に、AIに任せられる仕事を毎月ひとつずつ増やしていく顧問です。</p>
          </div>
          <div className="tp-what__rows">
            {WHAT_ROWS.map((r) => (
              <a key={r.k} href="#price" className="tp-row tp-what__row">
                <span className="tp-what__k">{r.k}</span>
                <span className="tp-what__v">{r.v}</span>
              </a>
            ))}
          </div>
          <p className="tp-more">
            <a href="#price" className="tp-more__link">
              <ArrowRight aria-hidden="true" />
              <span>料金を見る</span>
            </a>
          </p>
        </div>
      </section>

      {/* 5 ギャラリー（写真の列＋イラストの列） */}
      <section className="tp-gallery" aria-label="AI顧問の様子">
        <GalleryRow speedPC={1} speedSP={0.5} reveal draggable className="tp-gallery__photos">
          {GALLERY.map((g, i) => (
            <div key={g.id} className={`tp-gallery__ph ${i % 2 === 0 ? "is-odd" : "is-even"}`}>
              <div className="tp-gallery__in" data-reveal>
                <Slot id={g.id} label={g.label} tone={g.tone} />
              </div>
            </div>
          ))}
        </GalleryRow>
        <GalleryRow speedPC={1.25} speedSP={0.625} className="tp-gallery__illust">
          {[0, 1, 2, 3].map((k) => (
            <div key={k} className="tp-gallery__il">
              <PopSwap hold={3} offset={k % 2 === 1 ? 2.1 : 0}>
                {[0, 1, 2].map((j) => (
                  <Slot key={j} id={`I${k + 1}${j + 1}`} label="パカ君（フラット）" src={PAKA[(k + j) % 4]} ground />
                ))}
              </PopSwap>
            </div>
          ))}
        </GalleryRow>
      </section>

      {/* 6 料金（お手本 License の白い大パネル） */}
      <section className="tp-panel" id="price">
        <BounceTitle en="Price" ja="料金" className="tp-panel__title" />
        <ul className="tp-price">
          {PRICES.map((p) => (
            <li key={p.id}>
              <a href={p.href} className="tp-price__card">
                <div className="tp-price__img">
                  <Slot id={p.id} label={p.img} tone="c" />
                </div>
                <div className="tp-price__body">
                  <h3 className="tp-price__name">{p.name}</h3>
                  <p className="tp-price__yen">{p.price}</p>
                  <ul className="tp-price__detail">
                    {p.detail.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <span className="tp-price__go" aria-hidden="true">
                    <ArrowRight />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <div className="tp-ibtns">
          <IconBtn href="#flow" icon={<Route />} label="毎月の流れ" />
          <IconBtn href="#faq" icon={<CircleHelp />} label="よくある質問" />
          <IconBtn href="#contact" icon={<MessageCircle />} label="お問い合わせ" />
        </div>
      </section>

      {/* 7 特設バナー2枚 */}
      <section className="tp-special" aria-label="ご案内">
        <a href="#contact" className="tp-bnr tp-bnr--main">
          <span className="tp-bnr__txt">
            <span className="tp-bnr__small">無料相談</span>
            <span className="tp-bnr__big">まずは30分、話してみる</span>
          </span>
          <span className="tp-bnr__img">
            <Slot id="K01" label="パカ君（フラット）" src={PAKA[0]} />
          </span>
        </a>
        <a href={SITE.contact.instagramUrl} className="tp-bnr tp-bnr--sub" target="_blank" rel="noopener noreferrer">
          <span className="tp-bnr__txt">
            <span className="tp-bnr__small">Instagram</span>
            <span className="tp-bnr__big">{SITE.contact.instagramHandle}</span>
          </span>
          <span className="tp-bnr__img">
            <Slot id="K02" label="パカ君（フラット）" src={PAKA[2]} />
          </span>
        </a>
      </section>

      {/* 8 頼む理由（お手本 Reason） */}
      <section className="tp-reason" id="reason">
        <div className="tp-reason__bg">
          <Slot id="R00" label="奄美の空と海、手前に有屋町の街並み（横長・背景。下端の街並みが見える）" tone="b" />
        </div>
        <BounceTitle en="Reason" ja="ALPACAに頼む理由" className="tp-reason__title" />
        <ReasonCards count={REASONS.length}>
          {REASONS.map((r) => (
            <article key={r.id} className="tp-rcard">
              <div className="tp-rcard__img">
                <Slot id={r.id} label={r.img} tone="a" />
              </div>
              <div className="tp-rcard__body">
                <p className="tp-rcard__n">{r.n}</p>
                <h3 className="tp-rcard__t">{r.t}</h3>
                <p className="tp-rcard__d">{r.d}</p>
              </div>
            </article>
          ))}
        </ReasonCards>
        <div className="tp-ibtns tp-reason__btns">
          <IconBtn href="#flow" icon={<Route />} label="毎月の流れ" />
          <IconBtn href="#price" icon={<CalendarCheck />} label="料金" />
          <IconBtn href="#about" icon={<Building2 />} label="ALPACAについて" />
        </div>
      </section>

      {/* 9 毎月の流れ（お手本 About の番号ブロック） */}
      <section className="tp-flow" id="flow">
        <BounceTitle en="Flow" ja="毎月の流れ" className="tp-flow__title" />
        {FLOW.map((f, i) => (
          <Reveal key={f.id} className="tp-fblock">
            <div className="tp-fblock__ph">
              <Slot id={f.id} label={f.img} tone={(["a", "b", "c", "d"] as const)[i]} />
            </div>
            <div className="tp-fblock__txt">
              <div className="tp-fblock__num">
                <span className="tp-fblock__n">{f.n}</span>
                <span className="tp-fblock__il">
                  <Slot id={`${f.id}i`} label="パカ君（フラット）" src={PAKA[i]} />
                </span>
              </div>
              <p className="tp-fblock__lead">{f.lead}</p>
              <h3 className="tp-fblock__h">{f.title}</h3>
              {i === FLOW.length - 1 && (
                <a href="#contact" className="tp-btn tp-fblock__btn">
                  <span>まずは30分、話してみる</span>
                  <span className="tp-btn__arrow" aria-hidden="true" />
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </section>

      {/* 10 ALPACAについて（お手本 採用バナー） */}
      <section className="tp-about" id="about" aria-labelledby="tp-about-h">
        <div className="tp-about__card">
          <div className="tp-about__img">
            <Slot id="A01" label="代表 作田 大地の写真（正方形）" tone="d" />
          </div>
          <div className="tp-about__body">
            <p className="tp-about__en" aria-hidden="true">
              About
            </p>
            <h2 className="tp-about__h" id="tp-about-h">
              ALPACAについて
            </h2>
            <p className="tp-about__txt">
              奄美大島・有屋町の会社。代表 作田 大地。自社でもAIの秘書を毎日使って仕事を回している（Telegramで話しかけると動く）
            </p>
          </div>
        </div>
      </section>

      {/* 10b よくある質問（お手本 News の一覧の形） */}
      <section className="tp-wrap tp-2col tp-faqsec" id="faq" aria-labelledby="tp-faq-h">
        <div className="tp-sec-ttl">
          <p className="tp-sec-ttl__en" aria-hidden="true">
            FAQ
          </p>
          <h2 className="tp-sec-ttl__ja" id="tp-faq-h">
            よくある質問
          </h2>
        </div>
        <Faq />
      </section>

      {/* 11 フッター上の帯 */}
      <Band words={BAND2} id="B2" />

      {/* 12〜14 フッター */}
      <footer className="tp-footer" id="tp-footer">
        <div className="tp-fhero">
          <Slot id="H01" label="奄美の海辺と、打ち合わせを終えて笑う社長（横長）" tone="c" className="tp-fhero__slot" />
          <Reveal as="p" className="tp-fhero__copy">
            {FOOT_COPY.map((line, li) => (
              <span key={li} className="tp-fhero__line">
                {line.map((c, ci) => {
                  const i = FOOT_COPY.slice(0, li).reduce((n, l) => n + l.length, 0) + ci;
                  return (
                    <span key={ci} className="tp-fhero__part" style={{ transitionDelay: `${i * 0.025}s` }}>
                      {c}
                    </span>
                  );
                })}
              </span>
            ))}
          </Reveal>
        </div>

        <div className="tp-footer__in">
          <div className="tp-cta">
            <a href="#contact" className="tp-cta__btn tp-cta__btn--main">
              <span className="tp-cta__icon" aria-hidden="true">
                <MessageCircle />
              </span>
              <span className="tp-cta__small">無料相談</span>
              <span className="tp-cta__big">まずは30分、話してみる</span>
            </a>
            <a href={SITE.contact.emailHref} className="tp-cta__btn tp-cta__btn--ink">
              <span className="tp-cta__icon" aria-hidden="true">
                <Mail />
              </span>
              <span className="tp-cta__small">メール</span>
              <span className="tp-cta__mid">{SITE.contact.email}</span>
            </a>
            <a href={SITE.contact.telHref} className="tp-cta__btn tp-cta__btn--sub">
              <span className="tp-cta__icon" aria-hidden="true">
                <Phone />
              </span>
              <span className="tp-cta__small">電話</span>
              <span className="tp-cta__mid tp-cta__tel">{SITE.contact.tel}</span>
            </a>
          </div>

          <section className="tp-wrap tp-2col tp-contact" id="contact" aria-labelledby="tp-contact-h">
            <div className="tp-sec-ttl">
              <p className="tp-sec-ttl__en" aria-hidden="true">
                Contact
              </p>
              <h2 className="tp-sec-ttl__ja" id="tp-contact-h">
                お問い合わせ
              </h2>
            </div>
            <ContactForm />
          </section>

          <div className="tp-wrap tp-footer__info">
            <div className="tp-footer__brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/top/logo-mark.webp" alt="" className="tp-footer__mark" />
              <span className="tp-footer__name">ALPACA</span>
            </div>
            <dl className="tp-company">
              <div>
                <dt>屋号</dt>
                <dd>ALPACA</dd>
              </div>
              <div>
                <dt>代表</dt>
                <dd>作田 大地（さくだ だいち）</dd>
              </div>
              <div>
                <dt>事業内容</dt>
                <dd>AI導入支援・システム開発・HP制作</dd>
              </div>
              <div>
                <dt>所在地</dt>
                <dd>鹿児島県奄美市有屋町</dd>
              </div>
              <div>
                <dt>電話</dt>
                <dd>
                  <a href={SITE.contact.telHref}>080-2790-6757</a>
                </dd>
              </div>
              <div>
                <dt>メール</dt>
                <dd>
                  <a href={SITE.contact.emailHref}>alpaca.amami@gmail.com</a>
                </dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>
                  <a href={SITE.contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                    @alpaca_amami
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <nav className="tp-wrap tp-sitemap" aria-label="サイトマップ">
            <ul>
              <li>
                <a href="#what">AI顧問とは</a>
              </li>
              <li>
                <a href="#price">料金</a>
              </li>
              <li>
                <a href="#reason">頼む理由</a>
              </li>
              <li>
                <a href="#flow">毎月の流れ</a>
              </li>
              <li>
                <a href="#about">ALPACAについて</a>
              </li>
              <li>
                <a href="#faq">よくある質問</a>
              </li>
              <li>
                <Link href="/system">システム開発</Link>
              </li>
              <li>
                <Link href="/web">ホームページ制作</Link>
              </li>
            </ul>
            <ul className="tp-sitemap__sub">
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
            <p className="tp-copyright">&copy; ALPACA</p>
          </nav>
        </div>
      </footer>
    </div>
  );
}
