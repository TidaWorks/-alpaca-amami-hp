"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Wrench, FileText, Sparkles } from "lucide-react";

const FEATURE_TEXT = [
  {
    no: "01",
    title: "チャットで相談無制限",
    body: "AIの活用方法、ツール選び、運用の悩み、なんでも気軽にチャットで送ってください。営業日24時間以内に返信します。定例MTGなし、思いついた時に気軽に。",
    Icon: MessageCircle,
  },
  {
    no: "02",
    title: "月5時間以内の軽実装",
    body: "お問い合わせの自動応答づくり、繰り返し作業をAIで肩代わり、文章作成・要約・翻訳のサポート、業務にAIを取り入れる初期設定など、小さな業務改善のお手伝いをお引き受けします。",
    Icon: Wrench,
  },
  {
    no: "03",
    title: "最新のAI情報を随時お届け",
    body: "業界のAI最新情報を、御社の業務に関係しそうなものに絞って随時お届けします。新しいツール・モデル・活用事例の中から、本当に使えるものだけを選んでお伝えします。",
    Icon: FileText,
  },
  {
    no: "04",
    title: "大型実装のスマート特典価格",
    body: "本格的な自動応答ボット構築・ホームページ制作・業務システム開発が必要になった時は、月額契約特典の割引価格でお見積もりします。",
    Icon: Sparkles,
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
            PRICING — 月額の中身
          </p>
          <h2
            className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-8 ${revealed ? "fade-in-x" : "pre-x"}`}
            style={{ animationDelay: "0.15s" }}
          >
            月¥50,000に
            <br />
            <span className="text-[#12C998]">含まれるもの</span>
          </h2>
          <p
            className={`text-[#5A6280] text-base md:text-lg leading-loose ${revealed ? "fade-in-x" : "pre-x"}`}
            style={{ animationDelay: "0.3s" }}
          >
            「相談すること」と「軽い実装」を、定額でまるっとお引き受けします。
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
              含まれないもの
            </p>
            <ul className="space-y-3 text-[#1A1A1A] text-sm font-bold leading-loose">
              <li>※ 定例MTG（必要時のみスポット ¥10,000/30分）</li>
              <li>※ 月5時間を超える実装作業（¥5,000/時間、繰り越しなし）</li>
              <li>
                ※ 本格的なホームページ・業務システム・自動応答ボット本構築（スマート特典価格にて別途お見積もり）
              </li>
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
