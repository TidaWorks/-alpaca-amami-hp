"use client";

import { useEffect, useRef, useState } from "react";

const PAINS = [
  {
    img: "11-pain-chatgpt",
    title: "毎日メール・LINE・経理処理に追われて、本業が回らない",
    body: "店を回す、現場に出る、お客さんに集中する——その時間が事務作業に削られていく。手は2本しかないのに、やることが増え続ける。",
    follow: "Gmail / LINE / freee の対応をAI秘書に渡して、本業に戻る時間を取り戻します。",
  },
  {
    img: "13-pain-cost",
    title: "AIで自動化したいけど、何から手をつけたらいいか分からない",
    body: "「AIで業務改善」という言葉は聞くものの、自分の業種・自分の店で何ができるか、どの順で進めるかが見えない。",
    follow: "30分のヒアリングで業務に合う連携3つを決め、まず触れる状態を作ります。",
  },
  {
    img: "14-pain-news",
    title: "AIが暴走したら怖い、責任の所在がはっきりしないと使えない",
    body: "AIが間違ってお客さんに返信したら？ freeeに変な数字を入れたら？ 自動化に興味はあっても、事故が起きたときが想像できない。",
    follow: "「AIは下書き、確定は人」の承認ゲート設計＋責任分界契約で構造的に事故を防ぎます。",
  },
  {
    img: "15-pain-competitor",
    title: "設定や連携が複雑そう、自分でやるには手に余る",
    body: "ChatGPTやAIツールの設定、サービス間の連携、認証フロー——調べ始めると専門用語ばかりで挫折する。導入だけで疲れる。",
    follow: "初期セットアップ＋連携3つ構築＋90分レクチャーまで、奄美からまるっとお引き受けします。",
  },
];

export default function AgentPainPoints() {
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
      id="pain"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FAFAFA] py-12 md:py-32"
    >
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        {/* セクション見出し */}
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-end mb-14 md:mb-20">
          <div>
            <p
              className={`inline-block text-[10px] tracking-[0.4em] bg-[#12C998] text-white font-bold mb-6 rounded-full px-3 py-1 ${revealed ? "fade-in-x" : "pre-x"}`}
              style={{ animationDelay: "0.05s" }}
            >
              PAIN POINTS — 現場の声から
            </p>
            <h2
              className={`text-[#1D2A6E] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] ${revealed ? "fade-in-x" : "pre-x"}`}
              style={{ animationDelay: "0.15s" }}
            >
              こんな
              <br />
              <span className="text-[#12C998]">お悩み</span>、
              <br />
              ありませんか？
            </h2>
          </div>
          <p
            className={`text-[#5A6280] text-base md:text-lg leading-loose ${revealed ? "fade-in-x" : "pre-x"}`}
            style={{ animationDelay: "0.3s" }}
          >
            事業者さんからよく聞く、AIまわりの「分からない」をまとめました。
          </p>
        </div>

        {/* カード5枚 — 画像メイン */}
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {PAINS.map(({ img, title, body, follow }, i) => (
            <div
              key={title}
              className={`group relative bg-white border border-[#E5E9F5] rounded-2xl overflow-hidden hover:bg-[#12C998]/5 hover:border-[#12C998]/30 transition-all duration-300 ${revealed ? "fade-in" : "pre"}`}
              style={{ animationDelay: `${0.3 + i * 0.08}s` }}
            >
              <div className="aspect-square bg-[#F4F6F8] overflow-hidden">
                <img
                  src={`/images/agent-v3/${img}.png`}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={1080}
                  height={1080}
                  loading="lazy"
                />
              </div>
              <div className="p-7 md:p-8 flex flex-col">
                <h3 className="font-bold text-[#1D2A6E] text-base md:text-lg mb-4 leading-snug">
                  {title}
                </h3>
                <p className="text-[#5A6280] text-sm leading-loose mb-5 flex-1">
                  {body}
                </p>
                <div className="mt-auto pt-4 border-t border-[#E5E9F5]">
                  <p className="text-[#12C998] text-[13px] font-bold leading-relaxed">
                    → {follow}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 橋渡し */}
        <div className="text-center mt-20 md:mt-24">
          <p
            className={`text-[#1D2A6E] text-2xl md:text-4xl font-bold leading-relaxed ${revealed ? "fade-in-x" : "pre-x"}`}
            style={{ animationDelay: "0.8s" }}
          >
            AIまわりのことは、
            <span className="text-[#12C998]">ALPACA</span>
            に
            <br className="md:hidden" />
            気軽にご相談ください。
          </p>
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
