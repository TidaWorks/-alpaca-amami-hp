"use client";

import { SITE } from "@/lib/site";

export default function AgentCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-[#1A1B3F] via-[#3B2C73] to-[#635BFF]"
    >
      {/* 装飾光 */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#12C998]/25 blur-[120px]" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-32 w-[520px] h-[520px] rounded-full bg-[#FF3D7F]/25 blur-[140px]" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center gap-3 mb-6">
          <p className="text-[11px] font-bold tracking-[0.4em] text-[#FF6B35]">
            CHAPTER 07
          </p>
          <span className="w-8 h-[1px] bg-white/30" />
          <p className="text-[11px] font-bold tracking-[0.3em] text-white/70">
            CONTACT
          </p>
        </div>

        <h2 className="font-memphis-mincho text-white text-3xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.3] mb-7 drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
          まずは無料で、
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">お話を聞かせて</span>
            <span className="absolute inset-x-0 bottom-1 h-[35%] bg-[#12C998]/60 -z-0" aria-hidden="true" />
          </span>
          ください。
        </h2>

        <p className="font-memphis-mincho text-white/85 text-sm md:text-base leading-[2] mb-10 max-w-xl mx-auto">
          30分のオンライン or 対面ヒアリングから始まります。
          <br className="hidden md:block" />
          営業電話は一切しません、安心してお問い合わせください🌺
        </p>

        {/* CTAボタン */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <a
            href={`${SITE.contact.emailHref}?subject=AIエージェント（LINE自動応答）の相談`}
            className="inline-flex items-center gap-2 bg-[#FF6B35] text-white font-black text-sm md:text-base px-7 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all hover:bg-[#15296B]"
          >
            メールで相談する
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="/"
            className="inline-flex items-center text-sm font-black text-white underline decoration-[#12C998] decoration-[3px] underline-offset-[6px] hover:decoration-white transition-colors"
          >
            ALPACAについて知る →
          </a>
        </div>

        {/* 連絡先 */}
        <div className="inline-flex flex-col sm:flex-row gap-3 sm:gap-6 text-white/80 text-xs md:text-sm font-bold">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#12C998]" />
            {SITE.contact.email}
          </span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#12C998]" />
            返信は1〜2営業日以内
          </span>
        </div>

        {/* フッター */}
        <footer className="mt-20 pt-8 border-t border-white/15 text-white/50 text-[11px] font-bold tracking-wider">
          © 2026 ALPACA · 鹿児島県奄美大島 · alpaca-amami.com
        </footer>
      </div>
    </section>
  );
}
