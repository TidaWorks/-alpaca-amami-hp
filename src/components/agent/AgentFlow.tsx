"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    no: "01",
    title: "無料相談（30分のオンラインヒアリング）",
    body: "現状の業務・連携したいサービス・困りごとをお聞きします。お客様の業種に合った3連携の候補もこの場で絞り込みます。オンライン／対面どちらでもOK。",
    duration: "無料",
  },
  {
    no: "02",
    title: "責任分界契約の締結",
    body: "AI動作の責任範囲（最終承認は人）・連携サービスの管理・解約条件などを明文化した契約書にサインいただきます。初期費のご請求もこのタイミングで。",
    duration: "最短当日",
  },
  {
    no: "03",
    title: "初期セットアップ（約1.5時間）",
    body: "ChatGPT Plus契約のご案内、Codex Desktopインストール、ALPACA SMART用カスタム指示の設計、業種に合わせたプロジェクト構築までを実施します。",
    duration: "1〜2営業日",
  },
  {
    no: "04",
    title: "連携3つ構築＋90分レクチャー",
    body: "業務聞き取りで選定した3連携を実装、認証フローまで完了。続けて90分の使い方レクチャーで「こう話しかけると返ってくる」を実演5本＋お客様にも5本やっていただきます。",
    duration: "1日",
  },
  {
    no: "05",
    title: "30日フォロー → 月額サポートへ",
    body: "30日間はメール／LINEで質問対応。30日経過後、月額¥15,000の運用サポートに移行（または終了選択）。承認ゲート設計で誤動作の不安なく使い続けられます。",
    duration: "運用中",
  },
];

export default function AgentFlow() {
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
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FAFAFA] py-24 md:py-32"
    >
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        {/* セクション見出し */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-end mb-14 md:mb-16">
          <div>
            <p
              className={`inline-block text-[10px] tracking-[0.4em] text-[#12C998] font-bold mb-6 ${revealed ? "fade-in-x" : "pre-x"}`}
              style={{ animationDelay: "0.05s" }}
            >
              FLOW — ご相談から運用開始まで
            </p>
            <h2
              className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] ${revealed ? "fade-in-x" : "pre-x"}`}
              style={{ animationDelay: "0.15s" }}
            >
              ご相談から
              <br />
              <span className="text-[#12C998]">運用開始まで</span>
            </h2>
          </div>
          <p
            className={`text-[#5A6280] text-base md:text-lg leading-loose ${revealed ? "fade-in-x" : "pre-x"}`}
            style={{ animationDelay: "0.3s" }}
          >
            最短で<span className="text-[#1D2A6E] font-bold">当日中</span>に契約、翌営業日から相談スタートできます。
          </p>
        </div>

        {/* タイムライン画像（PC/SP切替） */}
        <div className={`mb-12 md:mb-16 bg-white border border-[#E5E9F5] rounded-3xl overflow-hidden ${revealed ? "fade-in" : "pre"}`} style={{ animationDelay: "0.3s" }}>
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/agent-v3/08-flow-sp.png" />
            <img
              src="/images/agent-v3/03-flow-pc.png"
              alt="ご相談から運用開始までの5ステップ"
              className="w-full h-auto"
              width={1920}
              height={1080}
            />
          </picture>
        </div>

        {/* 詳細タイムライン */}
        <div className="relative max-w-4xl mx-auto bg-white border border-[#E5E9F5] rounded-2xl overflow-hidden">
          {STEPS.map((step, i) => (
            <div
              key={step.no}
              className={`group relative grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start py-8 md:py-10 px-6 md:px-10 border-b border-[#E5E9F5] last:border-0 hover:bg-[#FAFAFA] transition-colors duration-200 ${revealed ? "fade-in" : "pre"}`}
              style={{ animationDelay: `${0.5 + i * 0.08}s` }}
            >
              <span className="relative font-bold text-[#1D2A6E] text-4xl md:text-5xl tracking-tight leading-none tabular-nums z-10 inline-flex items-center justify-center w-14 h-14 rounded-full bg-white ring-2 ring-[#12C998]/40">
                <span className="text-[#12C998] text-base">{step.no}</span>
              </span>
              <div>
                <h3 className="font-bold text-[#1D2A6E] text-xl md:text-2xl mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[#5A6280] text-sm md:text-[15px] leading-loose">
                  {step.body}
                </p>
              </div>
              <span className="self-start md:self-center inline-flex items-center text-xs font-bold tracking-widest text-[#12C998] bg-[#E8F9F3] ring-1 ring-[#12C998]/30 px-4 py-2 rounded-full whitespace-nowrap">
                {step.duration}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pre { opacity: 0; transform: translateY(28px); }
        @keyframes show-up { 0% { opacity: 0; transform: translateY(28px); } 100% { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: show-up 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) both; }

        .pre-x { opacity: 0; transform: translate(0, 24px); }
        @keyframes show-x { 0% { opacity: 0; transform: translate(0, 24px); } 100% { opacity: 1; transform: translate(0, 0); } }
        .fade-in-x { animation: show-x 0.85s cubic-bezier(0.165, 0.84, 0.44, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .fade-in, .fade-in-x { animation: none !important; }
          .pre, .pre-x { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
