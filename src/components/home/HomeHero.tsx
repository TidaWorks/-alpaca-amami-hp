"use client";

import { ArrowRight, Bell, ChevronDown } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Hero (Section 1) — SmartHR系の人物切り抜き + 大ヘッドライン構造（V34ベース）
 * ・ミントグラデ背景
 * ・上部にダークグリーンタグピル
 * ・中央に人物（漁師/農家風）の透過写真
 * ・写真に被るように大ヘッドライン
 * ・黄色トッパー付き2CTA縦並び
 * ・下部にダッシュボードUIモック（CSS）
 */
export default function HomeHero() {
  const { ref, revealed } = useReveal<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      aria-label="ALPACA ヒーロー"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 20% 0%, #6CF0CC 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 80% 30%, #14E0AC 0%, transparent 55%), radial-gradient(ellipse 80% 80% at 50% 100%, #075E4A 0%, transparent 70%), linear-gradient(180deg, #12C998 0%, #0FA67D 70%, #0B8C6E 100%)",
      }}
    >
      {/* 装飾レイヤー：ソフトブロブ（光の塊で奥行き） */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 65%)",
          filter: "blur(20px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 60% 50%, rgba(108,240,204,0.55) 0%, rgba(108,240,204,0) 65%)",
          filter: "blur(24px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/3 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,238,17,0.18) 0%, rgba(255,238,17,0) 70%)",
          filter: "blur(28px)",
        }}
      />

      {/* 装飾レイヤー：ノイズテクスチャ（紙の質感、上質感） */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.12]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='5'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
          backgroundSize: "180px 180px",
        }}
      />

      {/* 装飾：浮遊する小さなドット（控えめ） */}
      <span
        aria-hidden="true"
        className="absolute top-32 left-8 w-2 h-2 rounded-full bg-white/40 pointer-events-none"
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 right-10 w-1.5 h-1.5 rounded-full bg-[#FFEE11]/50 pointer-events-none"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-1/3 left-12 w-3 h-3 rounded-full bg-white/30 pointer-events-none"
      />
      <span
        aria-hidden="true"
        className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-[#6CF0CC] pointer-events-none"
      />

      <div
        className="relative max-w-[1184px] mx-auto px-6 md:px-8 pt-20 md:pt-28 transition-all duration-700"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(16px)",
        }}
      >
        {/* 上部：ダークグリーンタグピル */}
        <div className="flex justify-center mb-6 md:mb-8">
          <span
            className="inline-flex items-center text-[13px] md:text-base font-bold px-5 py-2.5 md:px-7 md:py-3 rounded-2xl text-white"
            style={{ background: "#075E4A" }}
          >
            業務改善 <span className="mx-2 opacity-70">×</span> AI標準装備{" "}
            <span className="ml-1">で時間を取り戻す</span>
          </span>
        </div>

        {/* 中央：人物切り抜き写真＋大ヘッドラインオーバーレイ */}
        <div className="relative">
          {/* 人物画像 */}
          <div className="relative mx-auto w-full max-w-[520px] aspect-[4/5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home-v3/fisherman-portrait.png"
              alt="ALPACAを使う奄美の事業者（40代男性、漁師・農家風）"
              className="w-full h-full object-contain object-bottom"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* 大ヘッドライン（写真下部に被るように） */}
          <h1
            className="absolute left-1/2 -translate-x-1/2 bottom-[8%] md:bottom-[12%] text-white font-extrabold text-center w-[95%] whitespace-nowrap"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
              lineHeight: 1.1,
              letterSpacing: "0.01em",
              textShadow: "0 6px 24px rgba(7,94,74,0.5)",
            }}
          >
            <span className="block">あなただけの、</span>
            <span className="block">業務改善システム</span>
          </h1>
        </div>

        {/* 2つのCTAボタン縦並び（黄色トッパー付き） */}
        <div className="relative -mt-2 md:-mt-4 flex flex-col items-center gap-5 md:gap-6 pb-12 md:pb-16">
          {/* CTA 1：無料相談 */}
          <div className="relative w-full max-w-[440px]">
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center text-[12px] md:text-[13px] font-bold px-4 py-1 rounded-full whitespace-nowrap z-10"
              style={{ background: "#FFEE11", color: "#075E4A" }}
            >
              いつでも相談OK！
            </span>
            <a
              href="#contact"
              className="block w-full text-center text-white font-bold text-lg md:text-xl px-8 py-5 md:py-6 rounded-full transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "#075E4A" }}
            >
              無料相談 <ArrowRight className="inline w-5 h-5 ml-1 -mt-0.5" strokeWidth={2.5} />
            </a>
          </div>

          {/* CTA 2：サービスを見る */}
          <div className="relative w-full max-w-[440px]">
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center text-[12px] md:text-[13px] font-bold px-4 py-1 rounded-full whitespace-nowrap z-10"
              style={{ background: "#FFEE11", color: "#075E4A" }}
            >
              デモ見れます！
            </span>
            <a
              href="#service"
              className="block w-full text-center text-[#075E4A] font-bold text-lg md:text-xl px-8 py-5 md:py-6 rounded-full bg-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg"
            >
              サービスを見る <ArrowRight className="inline w-5 h-5 ml-1 -mt-0.5" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      {/* 下部：ダッシュボードUIモック（チラ見せ） */}
      <div className="relative max-w-[1184px] mx-auto px-4 md:px-8">
        <div
          className="bg-white rounded-t-2xl md:rounded-t-3xl shadow-2xl overflow-hidden mx-auto max-w-[1024px]"
          style={{
            transform: "translateY(2%)",
          }}
        >
          {/* ダッシュボードヘッダー */}
          <div className="flex items-center justify-between bg-[#F8FAFA] px-4 md:px-6 py-3 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-sm md:text-base text-[#0B8C6E]">
                ALPACA
              </span>
              <span className="hidden md:inline text-xs text-[#4C4C4C]">
                / ダッシュボード
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Bell className="w-4 h-4 text-[#4C4C4C]" strokeWidth={2} />
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-[#12C998]" />
                <span className="hidden md:inline text-xs text-[#23221F] font-medium">
                  山田 太郎
                </span>
                <ChevronDown className="w-3 h-3 text-[#4C4C4C]" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* KPIカード3枚 */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-6">
            {[
              { label: "今月の売上", value: "¥8,742,000", delta: "+18.6%" },
              { label: "今月の案件数", value: "128件", delta: "+12.5%" },
              { label: "タスク完了率", value: "87%", delta: "+9.3%" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="bg-white border border-[#E5E7EB] rounded-lg md:rounded-xl p-2 md:p-4"
              >
                <p className="text-[9px] md:text-xs text-[#4C4C4C] mb-1 md:mb-1.5">
                  {kpi.label}
                </p>
                <p className="text-[11px] md:text-lg font-extrabold text-[#23221F] tabular-nums leading-tight">
                  {kpi.value}
                </p>
                <p className="text-[8px] md:text-[11px] text-[#0B8C6E] font-bold mt-0.5">
                  前月比 ▲ {kpi.delta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
