"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

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
    a: "ライトプラン（ランディングページ1ページ）は3日〜1週間、スタンダードプラン（複数ページHP）は2週間〜4週間が目安です。素材のご準備状況によって前後します。",
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
  const [sectionRef, visible] = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative bg-[#F8F8F8] py-32 md:py-40 px-6 md:px-10 scroll-mt-20 overflow-hidden"
    >
      {/* 装飾シェイプ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute -bottom-10 -left-10 w-[320px] h-[320px] hidden md:block"
          viewBox="0 0 300 300"
        >
          <path
            d="M60,140 C40,60 180,30 240,80 C300,130 280,240 220,260 C160,280 60,260 60,140 Z"
            fill="#FFE900"
            opacity="0.55"
          />
        </svg>
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        {/* 章扉 */}
        <div
          className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-16 mb-16 md:mb-20 items-end transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div>
            <h2
              className="text-black text-[4rem] md:text-[8rem] lg:text-[10rem] leading-[0.95] tracking-[-0.02em]"
              style={{ fontWeight: 400 }}
            >
              FAQ
            </h2>
            <p className="text-sm tracking-[0.3em] text-black/70 mt-4">よくある質問</p>
          </div>
          <div>
            <h3 className="text-black text-2xl md:text-4xl leading-[1.3] tracking-[-0.01em]" style={{ fontWeight: 500 }}>
              よくいただく質問。
            </h3>
          </div>
        </div>

        {/* FAQ アコーディオン */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => {
            const open = openIdx === i;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl transition-all duration-700 border border-black/5"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${120 + i * 80}ms`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-start gap-5 text-left px-6 md:px-8 py-5 md:py-6 group cursor-pointer hover:bg-[#FFE900]/20 transition-colors rounded-2xl"
                  aria-expanded={open}
                >
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#FFE900] flex items-center justify-center text-black text-sm" style={{ fontWeight: 500 }}>
                    Q
                  </span>
                  <span className="flex-1 text-black text-base md:text-lg leading-relaxed pt-1.5" style={{ fontWeight: 500 }}>
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-full border border-black flex items-center justify-center transition-transform ${
                      open ? "rotate-45 bg-black text-white" : "text-black"
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: open ? 320 : 0 }}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-7 flex items-start gap-5 border-t border-black/10 pt-5">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#EC6C00] flex items-center justify-center text-white text-sm" style={{ fontWeight: 500 }}>
                      A
                    </span>
                    <p className="flex-1 text-sm md:text-base text-black/80 leading-loose pt-1.5 tracking-wide">
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
