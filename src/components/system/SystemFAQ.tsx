"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    q: "見積もりや相談に費用はかかりますか？",
    a: "ご相談・お見積りはすべて無料です。島内なら直接お伺いし、現場を見て・業務を聞いてから正式なお見積りをお渡しします。",
  },
  {
    q: "予算はどれくらいから？",
    a: "業務システム構築は¥300,000〜が目安です。要件のヒアリング後、機能を絞った正式お見積りをお渡しします。段階的な導入のご相談も歓迎です。",
  },
  {
    q: "システム開発と業務改善コンサルの違いは？",
    a: "ALPACAは「実際に動くもの」を作ります。コンサルだけで終わらず、データベースもUIも実装し、現場で運用してもらうところまで伴走します。",
  },
  {
    q: "サーバーやデータベースは自分で管理できますか？",
    a: "ご希望によります。標準ではマネージドクラウド構成（自動バックアップ・SSL対応）でご提供。ご自身で管理されたい場合は別構成にも対応可能です。",
  },
  {
    q: "保守なしで買い切りでお願いできますか？",
    a: "可能です。サーバー・データベース・APIを全てご自身で管理いただける前提で、買い切り対応も承ります。障害時のサポートは別途ご相談となります。",
  },
  {
    q: "島外でも依頼できますか？",
    a: "オンラインミーティング＋リモート開発で進められます。対面打ち合わせは奄美島内のみ可能ですが、進行管理は遠方の方も問題ありません。",
  },
];

export default function SystemFAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="faq"
      className="relative bg-[#F4F6FF] py-28 md:py-36 px-6 md:px-10 overflow-hidden"
    >
      {/* 雲SVG */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute top-[5%] right-[4%] w-[260px] h-auto opacity-30" viewBox="0 0 400 200" fill="none">
          <ellipse cx="120" cy="120" rx="80" ry="50" fill="#DCE5FF" />
          <ellipse cx="200" cy="100" rx="100" ry="60" fill="#DCE5FF" />
          <ellipse cx="290" cy="130" rx="70" ry="45" fill="#DCE5FF" />
        </svg>
      </div>

      <div className="relative max-w-[1080px] mx-auto">
        <div className="text-center mb-14 md:mb-16" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s, transform 0.7s",
        }}>
          <p className="inline-block text-[10px] tracking-[0.4em] text-[#2860E1] font-bold mb-5 px-3 py-1 rounded-full bg-white">
            よくあるご質問
          </p>
          <h2 className="text-[#1D2A6E] text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.3] tracking-tight">
            よくいただく
            <br className="md:hidden" />
            <span className="text-[#2860E1]">質問</span>
            。
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const open = openIdx === i;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-[#E5E9F5] shadow-[0_2px_12px_rgba(40,96,225,0.04)] overflow-hidden transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${0.1 + i * 0.07}s`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-start gap-5 text-left px-6 md:px-7 py-5 md:py-6 group cursor-pointer hover:bg-[#F8FAFF] transition-colors"
                  aria-expanded={open}
                >
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#2860E1] text-white flex items-center justify-center text-sm font-bold">
                    Q
                  </span>
                  <span className="flex-1 text-[#1D2A6E] text-base md:text-lg font-bold leading-snug pt-1">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      open ? "rotate-45 bg-[#2860E1] text-white" : "bg-[#F4F6FF] text-[#2860E1]"
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: open ? 320 : 0 }}
                >
                  <div className="px-6 md:px-7 pb-6 md:pb-7 flex items-start gap-5 border-t border-[#E5E9F5] pt-5">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#FCD34D] text-[#1D2A6E] flex items-center justify-center text-sm font-bold">
                      A
                    </span>
                    <p className="flex-1 text-sm md:text-base text-[#2A2E45] leading-loose pt-1">
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
