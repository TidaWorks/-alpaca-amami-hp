"use client";

import { useEffect, useRef, useState } from "react";
import { Settings, Link2, GraduationCap, ShieldCheck } from "lucide-react";

const FEATURE_TEXT = [
  {
    no: "01",
    title: "初期セットアップ",
    body: "Codex Desktopのインストールから、ALPACA SMART用カスタム指示の設計、業務に合わせたプロジェクト構築まで。お客様のPC上で「あなた専用のAI秘書」が動く状態を作ります。",
    Icon: Settings,
  },
  {
    no: "02",
    title: "連携3つを業務に合わせて構築",
    body: "Gmail / LINE / Google カレンダー / freee / マネーフォワード / kintone 等の中から、業種・現場で本当に使うものを3つ選定。認証フローまでこちらで構築し、すぐ使える状態でお渡しします。",
    Icon: Link2,
  },
  {
    no: "03",
    title: "90分の使い方レクチャー",
    body: "「こう話しかけると、こう返ってくる」をオンラインまたは対面で実演5本。その場でお客様にも5本やっていただき、よく使う言い回しのカンペをお渡しします。AIに触ったことが無い方でも、その日から使えるように。",
    Icon: GraduationCap,
  },
  {
    no: "04",
    title: "承認ゲート設計＋責任分界契約",
    body: "AIエージェントは「下書き／提案／確認画面まで」担当し、送信・支払い・予約確定などの実行は必ず人が承認する設計。責任の所在も契約書で明文化することで、暴走や事故を構造的に防ぎます。",
    Icon: ShieldCheck,
  },
];

export default function AgentFeatures() {
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
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-white via-[#F5FBF9] to-[#E8F9F3]/40"
    >
      {/* 背景ドットパターン（浮き感解消：地に質感を与える） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(18,201,152,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* 抽象シェイプ：左上ミントブラー */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#12C998]/15 blur-3xl"
      />
      {/* 抽象シェイプ：右下ミントブラー */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-32 w-[520px] h-[520px] rounded-full bg-[#12C998]/10 blur-3xl"
      />

      {/* セクション中身：中央寄せ 1280px */}
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-24 md:pb-32">
        {/* 見出し（中央寄せ） */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <p
            className={`inline-block text-[10px] tracking-[0.4em] text-[#12C998] font-bold mb-6 ${revealed ? "fade-in-x" : "pre-x"}`}
            style={{ animationDelay: "0.05s" }}
          >
            SERVICE — サービスの中身
          </p>
          <h2
            className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-8 ${revealed ? "fade-in-x" : "pre-x"}`}
            style={{ animationDelay: "0.15s" }}
          >
            初期セットアップに
            <br />
            <span className="text-[#12C998]">含まれるもの</span>
          </h2>
          <p
            className={`text-[#5A6280] text-base md:text-lg leading-loose ${revealed ? "fade-in-x" : "pre-x"}`}
            style={{ animationDelay: "0.3s" }}
          >
            「触れる状態」になるまで、奄美からまるっとお引き受けします。
          </p>
        </div>


        {/* 4ポイント説明（数字バッジ + アイコン + 見出し + 説明、2カラム） */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-x-16 lg:gap-y-14">
          {FEATURE_TEXT.map(({ no, title, body, Icon }, i) => (
            <div
              key={title}
              className={`relative ${revealed ? "fade-in" : "pre"}`}
              style={{ animationDelay: `${0.45 + i * 0.1}s` }}
            >
              {/* 数字バッジ + アイコン */}
              <div className="flex items-center gap-4 mb-4">
                <span className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#12C998] to-[#0EA67D] text-white font-bold text-lg tabular-nums shadow-lg shadow-[#12C998]/30">
                  {no}
                </span>
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#12C998]/10 text-[#12C998]">
                  <Icon size={22} strokeWidth={2.2} />
                </span>
              </div>

              <h3 className="font-bold text-[#1D2A6E] text-xl md:text-2xl leading-snug mb-3">
                {title}
              </h3>
              <p className="text-[#5A6280] text-sm md:text-[15px] leading-loose">
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* 含まれないものの注記（中央寄せ） */}
        <div
          className={`mt-20 md:mt-24 mx-auto max-w-3xl ${revealed ? "fade-in" : "pre"}`}
          style={{ animationDelay: "0.9s" }}
        >
          <div className="relative bg-white/70 backdrop-blur-sm border border-[#E5E9F5] rounded-2xl p-8 md:p-10 shadow-lg shadow-[#1D2A6E]/[0.04]">
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#5A6280] mb-5">
              別途オプション（必要に応じて）
            </p>
            <ul className="space-y-3 text-[#1A1A1A] text-sm font-bold leading-loose">
              <li>※ 連携追加（¥10,000〜/連携、5連携セット ¥50,000）</li>
              <li>※ 高度なAction開発（カスタムSaaS連携・APIエンドポイント自作 ¥50,000〜）</li>
              <li>※ 過去メール一括取り込みなど大量データ移行（¥30,000〜）</li>
              <li>※ 業務フローの大幅再設計（¥50,000〜）</li>
              <li>※ お客様スタッフ2人目以降のレクチャー（¥30,000/人）</li>
              <li>※ ChatGPT Plus月額（¥3,000/月）はお客様側でご契約をお願いします</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .pre { opacity: 0; transform: translateY(32px); }
        @keyframes show-up { 0% { opacity: 0; transform: translateY(32px); } 100% { opacity: 1; transform: translateY(0); } }
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
