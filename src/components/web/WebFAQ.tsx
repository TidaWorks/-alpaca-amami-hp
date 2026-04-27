"use client";

import { useEffect, useRef, useState } from "react";
import { MemphisDots, MemphisRing, MemphisSquiggle, MemphisTriangle } from "./MemphisDecorations";

const faqs = [
  {
    q: "見積もりや相談に費用はかかりますか？",
    a: "ご相談・お見積りはすべて無料です。島内なら直接お伺いし、内容を伺った上で正式なお見積りをお渡しします。",
  },
  {
    q: "写真やロゴは用意が必要ですか？",
    a: "原則お客様にご用意いただきます。手元にない場合は、写真撮影やロゴ制作も別途ご相談可能です。",
  },
  {
    q: "納期はどれくらいですか？",
    a: "ライトプラン（LP1ページ）は3日〜1週間、スタンダードプラン（複数ページHP）は2週間〜4週間が目安です。素材のご準備状況によって前後します。",
  },
  {
    q: "公開後の修正はお願いできますか？",
    a: "保守サポート（月額）にご加入いただいた場合、テキスト・画像の修正は基本当日対応します。買い切りの場合は都度お見積りでも承ります。",
  },
  {
    q: "サーバーやドメインは自分で管理できますか？",
    a: "もちろん可能です。すべてご自身で管理される場合は、保守なしの買い切りプランでも対応しています。",
  },
  {
    q: "島外でも依頼できますか？",
    a: "オンラインミーティングで対応可能です。対面打ち合わせは奄美島内のみとなりますが、それ以外の進行は遠方の方も問題ありません。",
  },
];

export default function WebFAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative bg-[#F7F7F7] py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden border-t-2 border-[#111111]"
    >
      <div className="absolute inset-0 bg-memphis-speckle opacity-[0.06] pointer-events-none" aria-hidden="true" />

      {/* Memphis装飾 */}
      <MemphisDots color="#111111" className="absolute top-12 right-12 w-20 md:w-28 opacity-50 pointer-events-none" />
      <MemphisRing color="#00E0D1" className="absolute bottom-16 left-8 w-20 md:w-28 pointer-events-none hidden md:block" />
      <MemphisSquiggle color="#FF2DA0" className="absolute top-24 left-1/3 w-32 md:w-40 pointer-events-none hidden md:block" />
      <MemphisTriangle color="#FFD600" className="absolute bottom-20 right-1/4 w-12 md:w-14 -rotate-12 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        {/* 見出し */}
        <div
          className="mb-12 md:mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="bg-[#FF2DA0] text-white font-black text-[11px] tracking-widest px-2.5 py-1 border-2 border-[#111111]">
              06
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#111111]">FAQ</span>
          </div>
          <h2 className="font-memphis-mincho text-[#111111] text-3xl md:text-5xl font-extrabold leading-[1.3] tracking-tight">
            よく
            <span className="relative inline-block">
              <span className="relative z-10">いただく質問</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[40%] bg-[#FFD600] -z-0"
                aria-hidden="true"
              />
            </span>
            。
          </h2>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const open = openIdx === i;
            return (
              <div
                key={faq.q}
                className="bg-white border-2 border-[#111111] shadow-[5px_5px_0_0_#111111] transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${100 + i * 80}ms`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-start gap-4 text-left px-5 md:px-6 py-4 md:py-5 group"
                  aria-expanded={open}
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFD600] border-2 border-[#111111] flex items-center justify-center font-memphis-mincho font-extrabold text-sm text-[#111111]">
                    Q
                  </span>
                  <span className="flex-1 font-memphis-mincho text-[#111111] text-base md:text-lg font-bold leading-relaxed pt-1">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#F7F7F7] border-2 border-[#111111] flex items-center justify-center transition-transform ${
                      open ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: open ? 280 : 0 }}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 flex items-start gap-4 border-t-2 border-dashed border-[#111111]/30 pt-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF2DA0] border-2 border-[#111111] flex items-center justify-center font-memphis-mincho font-extrabold text-sm text-white">
                      A
                    </span>
                    <p className="flex-1 text-sm md:text-base text-[#111111]/80 leading-relaxed pt-1">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
