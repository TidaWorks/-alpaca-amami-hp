"use client";

import { ArrowRight, Globe, Database, Bot, Check } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Section 6: Service (SmartHR top-service) — 最重要セクション
 * ALPACA 3商品紹介。各商品に実画像プレビュー＋機能リストピル。
 */

type Service = {
  badge: string;
  title: string;
  price: string;
  note: string;
  href: string;
  desc: string;
  icon: typeof Globe;
  features: string[];
  image: { src: string; alt: string; caption?: string };
};

const services: Service[] = [
  {
    badge: "WEB",
    title: "ホームページ・ランディングページ制作",
    price: "¥70,000〜",
    note: "ランディングページ最短3日 / ホームページ2〜4週間",
    href: "/web",
    desc: "デザイン性とSEO初期設定込み。スマホ完全対応。9業種のデモも公開中。",
    icon: Globe,
    features: ["LP 1ページ", "複数ページHP", "ブログ機能", "SEO初期設定", "お問い合わせフォーム", "Googleマップ連携", "SNS連携", "スマホ最適化"],
    image: {
      src: "/images/demo-screenshots/restaurant.png",
      alt: "ALPACAが制作した飲食店向けホームページのデモ画面。写真とメニュー、予約ボタンが配置されたモバイル対応のデザイン",
      caption: "飲食店・サロン・ガイドハウスなど、9業種のデモを公開中",
    },
  },
  {
    badge: "SYSTEM",
    title: "業務システム開発",
    price: "¥300,000〜",
    note: "要見積 / 納期2週間〜",
    href: "/system",
    desc: "予約管理・顧客台帳・売上集計・LINE連携など、現場に合わせたオーダーメイド。",
    icon: Database,
    features: ["予約管理", "顧客台帳", "売上集計", "在庫管理", "ダッシュボード", "権限管理", "LINE連携", "CSV出力"],
    image: {
      src: "/images/system/sections/05-dashboard-mockup.png",
      alt: "予約・顧客・売上を一元管理する業務システムのダッシュボード画面。グラフと数値、テーブルで現場の数字を一望できる",
      caption: "予約・顧客・売上を一元管理。ブラウザだけで現場の数字を一望",
    },
  },
  {
    badge: "AGENT",
    title: "アルパカスマート（月額AIサポート）",
    price: "月¥50,000〜",
    note: "最低3ヶ月 / 追加実装¥5,000/h",
    href: "/smart",
    desc: "LINE相談無制限。月5時間の軽実装込み。AI最新情報レポート配信。",
    icon: Bot,
    features: ["LINE相談無制限", "月5h軽実装", "AI最新情報レポート", "LINE Bot構築", "顧問特典価格"],
    image: {
      src: "/images/agent-v3/01-hero-pc.png",
      alt: "アルパカスマートのイメージビジュアル。LINEとAIを組み合わせた自動応対のフロー",
      caption: "LINE×AIで自動応対。窓口の取りこぼしを減らす",
    },
  },
];

export default function HomeService() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section
      ref={ref}
      id="service"
      className="relative py-24 md:py-32 px-6 bg-white border-t border-[#DADADA]/40"
      aria-label="ALPACAのサービス"
    >
      <div className="max-w-[1184px] mx-auto">
        <div
          className="text-center mb-16 md:mb-20 transition-all duration-700"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <h2
            className="font-bold text-[#23221F] mb-5"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", lineHeight: 1.4 }}
          >
            ALPACAのサービス
          </h2>
          <p className="text-base text-[#4C4C4C] leading-[1.8] max-w-2xl mx-auto">
            ホームページ・業務システム・AIエージェント。
            3つの主軸で、奄美の事業をまるごと支えます。
          </p>
        </div>

        {/* 3商品大カード */}
        <div className="flex flex-col gap-16 md:gap-24">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-700"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              {/* 偶数番目は画像を左に */}
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="inline-flex items-center justify-center w-12 h-12 rounded-2xl"
                    style={{ background: "#F2FBF7", color: "#0B8C6E" }}
                  >
                    <s.icon className="w-6 h-6" strokeWidth={2} />
                  </span>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em]"
                    style={{ background: "#0B8C6E", color: "#FFFFFF" }}
                  >
                    {s.badge}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#23221F] mb-3 leading-tight">
                  {s.title}
                </h3>
                <p
                  className="text-2xl md:text-3xl font-extrabold tabular-nums mb-1"
                  style={{ color: "#0B8C6E" }}
                >
                  {s.price}
                </p>
                <p className="text-xs text-[#4C4C4C] mb-5">{s.note}</p>
                <p className="text-sm md:text-base text-[#23221F] leading-[1.8] mb-6">
                  {s.desc}
                </p>

                {/* 機能ピル群 */}
                <ul className="flex flex-wrap gap-2 mb-6">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                      style={{ background: "#F2FBF7", color: "#0B8C6E" }}
                    >
                      <Check className="w-3 h-3" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={s.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all duration-150 hover:-translate-y-0.5"
                  style={{ background: "#075E4A" }}
                >
                  詳細を見る
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </a>
              </div>

              {/* 実画像プレビュー */}
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <figure className="flex flex-col gap-3">
                  <div
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ring-1 ring-[#12C998]/15 bg-[#F2FBF7]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image.src}
                      alt={s.image.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {s.image.caption && (
                    <figcaption className="text-xs md:text-sm text-[#4C4C4C] leading-[1.7] text-center px-2">
                      {s.image.caption}
                    </figcaption>
                  )}
                </figure>
              </div>
            </div>
          ))}
        </div>

        {/* サブ：従業員ポータル相当（ALPACA版＝関連メニュー） */}
        <div
          className="mt-24 md:mt-32 rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          style={{ background: "#F2FBF7" }}
        >
          <div>
            <h3
              className="text-xl md:text-2xl font-bold mb-3"
              style={{ color: "#0FA67D" }}
            >
              すべてLINEから相談OK
            </h3>
            <p className="text-sm md:text-base text-[#23221F] leading-[1.8] mb-4">
              「これってALPACAに頼めるの？」も気軽に。
              <br />
              業種・規模・予算に合わせて、最適な組み合わせをご提案します。
            </p>
            <ul className="space-y-2">
              {["LINE公式アカウント窓口", "営業日24時間以内返信", "見積もり無料", "島内なら対面ヒアリング"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-[#23221F]">
                  <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#0B8C6E" }} strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-[4/3] max-w-[320px] mx-auto md:max-w-none">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-[#12C998]/15 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/agent-v3/01-hero-pc.png"
                alt="LINEから相談できるアルパカスマートの窓口イメージ"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
