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
  const [sectionRef, visible] = useReveal<HTMLDivElement>({ threshold: 0.15 });
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative bg-[#FAFAF7] py-24 md:py-32 px-6 scroll-mt-20 overflow-hidden"
    >
      {/* 背景の控えめなペイントアクセント */}
      <svg
        className="absolute -bottom-20 -left-24 w-[460px] h-[460px] pointer-events-none opacity-[0.05]"
        viewBox="0 0 600 600"
        aria-hidden="true"
      >
        <path
          d="M 60 320 Q 220 180 400 280 T 560 200"
          stroke="#1D3A8A"
          strokeWidth="70"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="480" cy="380" r="12" fill="#FF6B35" />
      </svg>

      <div className="relative max-w-3xl mx-auto">
        {/* 章扉 */}
        <div
          className="mb-12 md:mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A] mb-3">
            CHAPTER 06
          </p>
          <p className="text-[11px] font-bold tracking-[0.4em] text-[#0A1228]/70 mb-5">
            FAQ
          </p>
          <h2 className="font-memphis-mincho text-[#0A1228] text-3xl md:text-5xl font-extrabold leading-[1.3] tracking-tight">
            よく
            <span className="relative inline-block">
              <span className="relative z-10">いただく質問</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[40%] bg-[#FF6B35]/30 -z-0 rounded-sm"
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
                className="bg-white border border-[#0A1228]/8 rounded-xl shadow-md hover:shadow-lg transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${100 + i * 80}ms`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-start gap-4 text-left px-5 md:px-6 py-4 md:py-5 group cursor-pointer hover:bg-[#FAFAF7] active:bg-[#FAFAF7] transition-colors rounded-xl"
                  aria-expanded={open}
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1D3A8A] flex items-center justify-center font-memphis-mincho font-extrabold text-sm text-white">
                    Q
                  </span>
                  <span className="flex-1 font-memphis-mincho text-[#0A1228] text-base md:text-lg font-bold leading-relaxed pt-1">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#FAFAF7] border border-[#0A1228]/10 flex items-center justify-center transition-transform ${
                      open ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D3A8A" strokeWidth="3" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: open ? 280 : 0 }}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 flex items-start gap-4 border-t border-dashed border-[#0A1228]/15 pt-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center font-memphis-mincho font-extrabold text-sm text-white">
                      A
                    </span>
                    <p className="flex-1 text-sm md:text-base text-[#0A1228]/80 leading-relaxed pt-1">
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
