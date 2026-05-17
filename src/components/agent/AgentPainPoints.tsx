"use client";

import { useEffect, useRef, useState } from "react";

const PAINS = [
  {
    img: "11-pain-chatgpt",
    title: "ChatGPTは触ったけど、業務にどう活かせばいいか分からない",
    body: "話題のAIツールを試してはみたけれど、自分の会社の業務にどう組み込めばいいかが見えてこない。",
    follow: "アルパカスマートなら、チャットで気軽に「これに使えますか？」と聞けます。",
  },
  {
    img: "12-pain-isolation",
    title: "AI導入を相談できる相手が、島内にいない",
    body: "東京のコンサルに頼むほどでもないけれど、奄美にはAIに詳しい顧問もエンジニアもほぼいない。",
    follow: "島の事業者さんに伴走する、AI専門の月額契約です。",
  },
  {
    img: "13-pain-cost",
    title: "自動応答ボットや自動化に興味あるけど、初期費用が読めない",
    body: "見積もりを取るたびに金額がバラバラ。何にいくらかかるのか、相場感がそもそも分からない。",
    follow: "月¥50,000の固定費。軽い実装なら追加料金なしで対応します。",
  },
  {
    img: "14-pain-news",
    title: "AI最新情報のキャッチアップが追いつかない",
    body: "毎週新しいツール・新しいモデルが出てくる。どれが本物で、どれが自社に関係あるのか判断できない。",
    follow: "最新のAI情報を、御社向けに不定期でちょくちょくお届けします。",
  },
  {
    img: "15-pain-competitor",
    title: "競合他社が始めたら焦るけど、何から始めればいいか分からない",
    body: "「うちもAIやらないとマズい」とは思うけれど、第一歩が踏み出せないまま時間だけが過ぎていく。",
    follow: "まずはチャットで現状をお聞かせください。優先順位から一緒に整理します。",
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
      className="relative overflow-hidden bg-[#FAFAFA] py-24 md:py-32"
    >
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        {/* セクション見出し */}
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-end mb-14 md:mb-20">
          <div>
            <p
              className={`inline-block text-[10px] tracking-[0.4em] text-[#12C998] font-bold mb-6 ${revealed ? "fade-in-x" : "pre-x"}`}
              style={{ animationDelay: "0.05s" }}
            >
              PAIN POINTS — 奄美の現場から
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
            奄美の事業者さんからよく聞く、AIまわりの「分からない」をまとめました。
          </p>
        </div>

        {/* カード5枚 — 画像メイン */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PAINS.map(({ img, title, body, follow }, i) => (
            <div
              key={title}
              className={`group relative bg-white border border-[#E5E9F5] rounded-2xl overflow-hidden hover:border-[#12C998]/50 hover:-translate-y-1 transition-all duration-300 ${revealed ? "fade-in" : "pre"}`}
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
            <span className="text-[#12C998]">アルパカスマート</span>
            に
            <br className="md:hidden" />
            気軽に相談してください。
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
