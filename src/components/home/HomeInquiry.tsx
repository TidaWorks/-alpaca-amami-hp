"use client";

import { ArrowRight, MessageCircle, Mail } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { SITE } from "@/lib/site";

/**
 * Section 13: Inquiry CTA (SmartHR inquiry-three-piece-set)
 * 上にミント帯CTAボックス＋下に3枚カード（資料DL／無料相談／お問い合わせ）。
 */
export default function HomeInquiry() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  const cards = [
    { icon: MessageCircle, label: "Instagramで相談", body: "DMで気軽にご相談ください。", href: SITE.contact.instagramUrl },
    { icon: Mail, label: "メールで相談", body: "詳しい内容はメールでお送りください。", href: SITE.contact.emailHref },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="relative pt-20 md:pt-28 pb-20 md:pb-28 px-6"
      style={{ background: "#F8F8F8" }}
      aria-label="お問い合わせ"
    >
      <div
        className="max-w-[1184px] mx-auto transition-all duration-700"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(16px)",
        }}
      >
        {/* ミント帯CTAボックス */}
        <div
          className="rounded-3xl p-8 md:p-14 text-center mb-12 md:mb-16"
          style={{
            background: "linear-gradient(135deg, #075E4A 0%, #0B8C6E 60%, #12C998 100%)",
          }}
        >
          <h2
            className="text-white font-bold mb-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 1.75rem)", lineHeight: 1.4 }}
          >
            お気軽にお問い合わせください
          </h2>
          <p className="text-white/95 text-base leading-[1.8] mb-8 max-w-2xl mx-auto">
            ホームページ・業務システム・AIエージェント、何でもご相談ください。
            <br />
            島内なら直接お伺い、島外はオンラインで対応します。
          </p>
          <a
            href={SITE.contact.emailHref}
            className="inline-flex items-center gap-2 bg-white text-[#075E4A] font-bold px-10 py-4 rounded-full text-base hover:-translate-y-0.5 transition-all duration-150"
            style={{ padding: "16px 48px" }}
          >
            お問い合わせ
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </a>
        </div>

        {/* 2枚カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-3xl mx-auto">
          {cards.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group bg-white border border-[#DADADA]/70 rounded-2xl p-6 md:p-7 hover:border-[#12C998] hover:-translate-y-1 transition-all duration-300"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                style={{ background: "#F2FBF7", color: "#0B8C6E" }}
              >
                <c.icon className="w-6 h-6" strokeWidth={2} />
              </div>
              <h3 className="text-base md:text-lg font-bold text-[#23221F] mb-2">
                {c.label}
              </h3>
              <p className="text-sm text-[#4C4C4C] leading-[1.7] mb-3">{c.body}</p>
              <span
                className="inline-flex items-center gap-1 text-sm font-bold"
                style={{ color: "#0B8C6E" }}
              >
                詳しく見る
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
              </span>
            </a>
          ))}
        </div>

        {/* フッター */}
        <footer className="border-t border-[#DADADA]/60 mt-16 pt-8 text-center">
          <p className="text-xl font-extrabold mb-2 text-[#23221F]">
            ALPACA
            <span className="text-xs tracking-[0.3em] ml-2 align-middle" style={{ color: "#0B8C6E" }}>
              AMAMI WEB & SYSTEM STUDIO
            </span>
          </p>
          <p className="text-[#4C4C4C] text-sm mb-3">
            奄美大島を拠点に、Web制作・システム開発・保守運用を承ります。
          </p>
          <p className="text-[#4C4C4C] text-xs mb-3 flex items-center justify-center gap-3 flex-wrap">
            <a href="/web" className="hover:text-[#0B8C6E] transition-colors">ホームページ・ランディングページ制作</a>
            <span>/</span>
            <a href="/system" className="hover:text-[#0B8C6E] transition-colors">システム開発</a>
            <span>/</span>
            <a href="/smart" className="hover:text-[#0B8C6E] transition-colors">アルパカスマート</a>
            <span>/</span>
            <a href={SITE.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#0B8C6E] transition-colors">
              Instagram
            </a>
          </p>
          <p className="text-[#4C4C4C] text-xs mb-3">
            <a href="/privacy" className="hover:text-[#0B8C6E] transition-colors underline-offset-4 hover:underline">
              プライバシーポリシー
            </a>
          </p>
          <p className="text-[#8D8D8D] text-xs">
            &copy; 2026 ALPACA. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
}
