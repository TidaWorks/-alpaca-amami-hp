"use client";

import { useEffect, useRef, useState } from "react";

const rows = [
  {
    industry: "飲食店",
    features: ["予約一元管理", "売上集計", "シフト管理", "顧客台帳", "LINE自動応答"],
  },
  {
    industry: "宿泊業",
    features: ["予約管理", "客室管理", "チェックイン", "客台帳", "OTA連携"],
  },
  {
    industry: "建設・建築業",
    features: ["工程管理", "見積作成", "請求書発行", "在庫・資材管理", "顧客管理"],
  },
  {
    industry: "小売・商店",
    features: ["在庫管理", "売上集計", "POS連携", "顧客台帳", "発注管理"],
  },
  {
    industry: "観光・体験業",
    features: ["予約管理", "ツアー管理", "顧客台帳", "決済連携", "天候連動"],
  },
];

export default function SystemMatrix() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      className="relative py-28 md:py-36 bg-[#FAFAF7] overflow-hidden border-t border-[#E5E7EB]"
    >
      <style>{`
        @keyframes matRow {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        <div
          className="mb-12 md:mb-16 max-w-3xl transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-[#FF6B35] inline-block" />
            <p className="text-[11px] md:text-xs font-bold tracking-[0.3em] text-[#0A2540]">
              業種別 対応機能
            </p>
          </div>
          <h2
            className="text-[#0A2540] font-black leading-[1.05] mb-5"
            style={{ fontSize: "clamp(2rem, 7vw, 4.5rem)" }}
          >
            あなたの業務に、
            <br />
            <span className="text-[#FF6B35]">必要な機能</span>
            だけを。
          </h2>
          <p className="text-[#0A2540]/70 text-sm md:text-base leading-[1.9] font-medium">
            業種ごとに、現場で実装してきた代表的な機能。組み合わせ自由、要件で増減します。
          </p>
        </div>

        <div className="space-y-3">
          {rows.map((r, i) => (
            <div
              key={r.industry}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-5 md:p-6 hover:border-[#FF6B35] transition-colors duration-300"
              style={{
                opacity: 0,
                animation: visible ? `matRow 0.6s ease ${i * 0.1}s forwards` : undefined,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <div className="md:w-44 shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="text-[#FF6B35] text-xl md:text-2xl font-black tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[#0A2540] text-lg md:text-xl font-bold">
                      {r.industry}
                    </h3>
                  </div>
                </div>
                <div className="flex-1 flex flex-wrap gap-2">
                  {r.features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1.5 bg-[#0A2540]/5 border border-[#0A2540]/10 text-[#0A2540] text-xs md:text-sm font-bold rounded-full px-3 py-1.5 hover:bg-[#0A2540] hover:text-white hover:border-[#0A2540] transition-colors duration-200"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-10 text-center text-[#0A2540]/65 text-sm font-medium transition-opacity duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "800ms" }}
        >
          ※ 上記は代表例。実際はヒアリングで機能を組み合わせて、最小構成からスタートできます。
        </div>
      </div>
    </section>
  );
}
