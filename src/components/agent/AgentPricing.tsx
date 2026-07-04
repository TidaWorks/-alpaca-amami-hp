"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const INITIAL_INCLUDED = [
  "初期セットアップ（Codex Desktopインストール＋カスタム指示＋プロジェクト設計）",
  "業務に合わせた連携3つの初期構築（認証フローまで）",
  "90分の使い方レクチャー（実演5本＋カンペお渡し）",
  "30日間のフォロー（メール／LINEで質問対応）",
];

const MONTHLY_INCLUDED = [
  "月1回30分の運用相談（チャット or 通話）",
  "プロンプト改善提案 月1〜2件",
  "営業日24時間以内の質問対応",
  "新MCP・新サービス情報の提供",
  "誤動作の簡易監視（自動レポート）",
];

const OPTION = [
  { label: "連携追加", price: "¥10,000〜", unit: "／連携" },
  { label: "5連携セット", price: "¥50,000", unit: "／一括" },
];

const HEAVY_OPTION = [
  {
    label: "高度なAction開発",
    normal: "カスタムSaaS連携・API実装",
    discount: "¥50,000〜お見積もり",
  },
  {
    label: "大量データ移行・業務フロー再設計",
    normal: "過去メール一括取り込み等",
    discount: "¥30,000〜お見積もり",
  },
];

/**
 * 主要数字のカウントアップ（SystemHero.tsx のローカル rAF ticker と同じパターンをこのファイル内に複製）。
 * prefers-reduced-motion: reduce の場合は即座に最終値を表示する。
 */
function NumberTicker({ to, suffix = "", duration = 1200, start = false }: { to: number; suffix?: string; duration?: number; start?: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(to);
      return;
    }
    let rafId: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const progress = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(to * eased));
      if (progress < 1) rafId = requestAnimationFrame(tick);
      else setValue(to);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [to, duration, start]);
  return <span className="tabular-nums">{value.toLocaleString("ja-JP")}{suffix}</span>;
}

export default function AgentPricing() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      setRevealed(true);
      io.disconnect();
    }
    const failsafeId = window.setTimeout(() => setRevealed(true), 800);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafeId);
    };
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        {/* セクション見出し */}
        <div className="text-center mb-14 md:mb-20">
          <p
            className={`inline-block text-[10px] tracking-[0.4em] text-[#12C998] font-bold mb-6 ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.05s" }}
          >
            PRICING — 料金
          </p>
          <h2
            className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-7 ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.15s" }}
          >
            初期¥70,000
            <br className="md:hidden" />
            ＋月
            <span className="text-[#12C998]">¥15,000</span>
            。
          </h2>
          <p
            className={`text-[#5A6280] text-base md:text-lg leading-loose ${revealed ? "fade-in" : "pre"}`}
            style={{ animationDelay: "0.3s" }}
          >
            最初に「触れる状態」を作るための初期費。その後は運用サポート月額で安心して使い続けられます。
            <br className="hidden md:block" />
            別途 ChatGPT Plus ¥3,000/月のご契約をお願いします（お客様側）。
          </p>
        </div>

        {/* メインプラン：初期費 + 月額サポート 横並び */}
        <div className={`relative border border-[#E5E9F5] rounded-3xl overflow-hidden mb-12 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.4s" }}>
          <div className="grid md:grid-cols-2 gap-0">
            {/* 左：初期費 */}
            <div className="p-10 md:p-14 bg-white md:border-r border-[#E5E9F5]">
              <span className="inline-block text-[10px] font-bold tracking-[0.4em] text-[#5A6280] mb-6">
                初期費（一括）
              </span>
              <h3 className="text-[#1D2A6E] text-3xl md:text-4xl font-bold leading-tight mb-2">
                初期セットアップ
              </h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-bold text-[#1D2A6E] text-5xl md:text-6xl tracking-tight leading-none tabular-nums">
                  ¥<NumberTicker to={70000} start={revealed} />
                </span>
                <span className="text-[#5A6280] text-sm font-bold">／一括</span>
              </div>

              <p className="text-[10px] font-bold tracking-[0.4em] text-[#12C998] mb-5">
                含まれるもの
              </p>
              <ul className="space-y-3">
                {INITIAL_INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#1A1A1A] text-sm">
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#12C998] text-white flex items-center justify-center">
                      <Check className="w-3 h-3" strokeWidth={3.5} aria-hidden="true" />
                    </span>
                    <span className="font-bold leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 右：月額サポート — ミントベタ塗り */}
            <div className="relative p-10 md:p-14 bg-[#12C998] overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-[0.12]" aria-hidden="true" style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }} />
              <div className="relative">
                <span className="inline-block text-[10px] font-bold tracking-[0.4em] text-white/80 mb-6">
                  月額サポート
                </span>
                <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-2">
                  運用＋責任分界
                </h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="font-bold text-white text-5xl md:text-6xl tracking-tight leading-none tabular-nums">
                    ¥<NumberTicker to={15000} start={revealed} />
                  </span>
                  <span className="text-white/85 text-sm font-bold">／月</span>
                </div>

                <p className="text-[10px] font-bold tracking-[0.4em] text-white/80 mb-5">
                  含まれるもの
                </p>
                <ul className="space-y-3">
                  {MONTHLY_INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white text-sm">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-white text-[#12C998] flex items-center justify-center">
                        <Check className="w-3 h-3" strokeWidth={3.5} aria-hidden="true" />
                      </span>
                      <span className="font-bold leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* メインCTA */}
        <div className={`text-center mb-14 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.5s" }}>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-[#1D2A6E] text-white font-bold text-base md:text-lg pl-9 pr-2 py-2 rounded-full hover:bg-[#12C998] transition-colors duration-200 shadow-lg shadow-[#1D2A6E]/20"
          >
            まずは30分のヒアリングから
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#1D2A6E] group-hover:text-[#12C998] transition-transform duration-300 group-hover:rotate-[-45deg]">
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
            </span>
          </a>
          <p className="text-[#5A6280] text-xs font-bold mt-4">
            無料／オンライン or 訪問
          </p>
        </div>

        {/* オプション + 重めオプション */}
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          <div className={`bg-[#FAFAFA] border border-[#E5E9F5] rounded-2xl p-8 md:p-10 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.6s" }}>
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#5A6280] mb-6">
              連携追加オプション
            </p>
            <ul className="space-y-5">
              {OPTION.map(({ label, price, unit }) => (
                <li key={label} className="flex items-baseline justify-between gap-3 pb-5 border-b border-[#E5E9F5] last:border-0 last:pb-0">
                  <span className="text-[#1D2A6E] text-sm md:text-base font-bold leading-snug">
                    {label}
                  </span>
                  <span className="flex items-baseline gap-1 flex-shrink-0">
                    <span className="font-bold text-[#1D2A6E] text-2xl tabular-nums">
                      {price}
                    </span>
                    <span className="text-[#5A6280] text-xs font-bold">
                      {unit}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`bg-white border-2 border-[#12C998]/40 rounded-2xl p-8 md:p-10 ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.7s" }}>
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#12C998] mb-6">
              プロジェクトご相談
            </p>
            <ul className="space-y-5">
              {HEAVY_OPTION.map(({ label, normal, discount }) => (
                <li key={label} className="pb-5 border-b border-[#E5E9F5] last:border-0 last:pb-0">
                  <p className="text-[#1D2A6E] text-sm md:text-base font-bold leading-snug">
                    {label}
                  </p>
                  <p className="text-[#5A6280] text-xs font-bold mt-1">
                    {normal}
                  </p>
                  <p className="text-[#12C998] text-xs font-bold mt-1">
                    → {discount}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 最後のCTAボタン */}
        <div className="text-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-[#12C998] text-white font-bold text-base md:text-lg pl-9 pr-2 py-2 rounded-full hover:bg-[#0DA67D] transition-colors duration-200"
          >
            まずは相談してみる
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#12C998] transition-transform duration-300 group-hover:rotate-[-45deg]">
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>

      <style>{`
        .pre { opacity: 0; transform: translateY(32px); }
        @keyframes show-up { 0% { opacity: 0; transform: translateY(32px); } 100% { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: show-up 0.85s cubic-bezier(0.165, 0.84, 0.44, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .fade-in { animation: none !important; }
          .pre { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
