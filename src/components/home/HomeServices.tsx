"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    badge: "MAIN SERVICE",
    title: "業務システム開発",
    href: "/system",
    price: "¥300,000〜",
    note: "要見積 / 納期2週間〜",
    color: "#635BFF",
    desc: "予約管理・顧客台帳・売上集計・LINE Bot連携など、業務にあわせたオーダーメイドシステム。紙とExcelからの脱却を支援。",
    points: ["予約・顧客・売上の一元管理", "リアルタイム可視化", "LINE自動応答もオプション対応"],
    main: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    badge: "WEB DESIGN",
    title: "ホームページ制作",
    href: "/web",
    price: "¥250,000〜",
    note: "納期2〜4週間",
    color: "#12C998",
    desc: "店舗・コーポレートの本格ホームページ。スマホ完全対応・SEO初期設定込み。9業種のデモサイトも公開中。",
    points: ["複数ページ構成（5ページ目安）", "ブログ・お知らせ機能", "Google マップ・SNS 連携"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="2" y1="9" x2="22" y2="9" />
        <circle cx="5" cy="6.5" r="0.6" fill="currentColor" />
        <circle cx="7.5" cy="6.5" r="0.6" fill="currentColor" />
        <circle cx="10" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    badge: "LANDING PAGE",
    title: "LP制作",
    href: "/web#pricing",
    price: "¥70,000〜",
    note: "納期3日〜1週間",
    color: "#FFC400",
    desc: "イベント・キャンペーン・新サービス告知用の1ページ完結LP。最速3日で公開も可能。広告と組み合わせて即効果。",
    points: ["LP 1ページを丁寧に制作", "スマホ完全対応", "お問い合わせフォーム標準装備"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
];

export default function HomeServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      id="services"
      className="relative bg-white py-20 md:py-28 px-6 scroll-mt-20 overflow-hidden border-t border-[#E5E7EB]"
    >
      <div className="relative max-w-6xl mx-auto">
        <div
          className="mb-14 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="text-xs font-bold tracking-[0.3em] text-[#635BFF] mb-3">SERVICES</p>
          <h2 className="text-[#1A202C] text-3xl md:text-5xl font-extrabold leading-tight mb-3">
            事業をまるごと支える、
            <br className="md:hidden" />
            <span className="text-[#635BFF]">3つのサービス</span>
            。
          </h2>
          <p className="text-[#1A202C]/70 text-sm md:text-base">
            業務改善システムを軸に、ホームページ・LP制作・保守までワンストップ。
          </p>
        </div>

        {/* メインサービス（業務システム）— 大カード */}
        <div
          className="group relative bg-gradient-to-br from-[#635BFF]/8 via-white to-[#12C998]/5 border-2 border-[#635BFF]/20 rounded-3xl p-8 md:p-12 mb-6 shadow-md hover:shadow-2xl hover:border-[#635BFF]/40 transition-all duration-500 overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 150ms, transform 0.7s ease 150ms, box-shadow 0.4s ease, border-color 0.4s ease",
          }}
        >
          {/* ホバー時に走る光 */}
          <span
            aria-hidden="true"
            className="absolute -inset-x-12 -top-1/2 h-[200%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(110deg, transparent 35%, rgba(99,91,255,0.08) 50%, transparent 65%)",
            }}
          />
          <div className="absolute top-6 right-6 hidden md:block">
            <span
              className="inline-block bg-[#635BFF] text-white text-[10px] font-black tracking-widest rounded-full px-3 py-1.5 shadow"
              style={{ animation: "alpacaFloat 4s ease-in-out infinite" }}
            >
              ★ MAIN
            </span>
          </div>
          <style>{`
            @keyframes alpacaFloat {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-3px); }
            }
            @keyframes alpacaServicesShine {
              0% { transform: translateX(-120%) skewX(-12deg); }
              60%, 100% { transform: translateX(220%) skewX(-12deg); }
            }
          `}</style>

          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
            <div className="md:w-[42%]">
              <span className="inline-block text-[10px] font-black text-white bg-[#635BFF] rounded-full px-3 py-1 mb-4 tracking-[0.2em]">
                {services[0].badge}
              </span>
              <div className="w-14 h-14 rounded-2xl bg-[#635BFF] text-white flex items-center justify-center mb-4 shadow-md group-hover:rotate-[-6deg] group-hover:scale-110 transition-transform duration-300">
                {services[0].icon}
              </div>
              <h3 className="text-[#1A202C] text-2xl md:text-3xl font-extrabold mb-3">
                {services[0].title}
              </h3>
              <p className="text-3xl font-extrabold text-[#635BFF] tabular-nums mb-1">
                {services[0].price}
              </p>
              <p className="text-xs text-[#1A202C]/55 mb-5">{services[0].note}</p>

              <a
                href={services[0].href}
                className="group/btn relative inline-flex items-center gap-2 bg-[#635BFF] text-white font-black text-sm px-5 py-3 rounded-full shadow-md hover:shadow-xl hover:bg-[#5249E0] hover:scale-[1.04] active:scale-[0.96] transition-all duration-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#635BFF] focus-visible:ring-offset-2"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover/btn:opacity-100"
                  style={{
                    background: "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)",
                    animation: "alpacaServicesShine 1.4s ease-out",
                  }}
                />
                <span className="relative z-10">詳細を見る</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-200">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="md:w-[58%] md:pl-8 md:border-l md:border-[#635BFF]/20">
              <p className="text-sm md:text-base text-[#1A202C]/80 leading-relaxed mb-5">
                {services[0].desc}
              </p>
              <ul className="space-y-2.5">
                {services[0].points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <svg className="mt-[3px] flex-shrink-0 w-4 h-4 text-[#635BFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm text-[#1A202C] leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* サブサービス2つ：Web制作 / LP制作 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.slice(1).map((service, i) => (
            <a
              key={service.title}
              href={service.href}
              className="group relative bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-transparent block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.7s ease ${280 + i * 100}ms, transform 0.5s ease ${280 + i * 100}ms, box-shadow 0.4s ease, border-color 0.3s ease, translate 0.3s ease`,
                ...(({ "--tw-ring-color": service.color } as React.CSSProperties)),
              }}
            >
              {/* ホバー時の上端アクセントライン */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: service.color }}
              />

              <span
                className="inline-block text-[10px] font-black tracking-[0.2em] rounded-full px-3 py-1 mb-4 transition-all duration-300 group-hover:tracking-[0.25em]"
                style={{
                  background: `${service.color}1A`,
                  color: service.color,
                }}
              >
                {service.badge}
              </span>

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-[-4deg] transition-transform duration-300"
                style={{ background: service.color, color: service.color === "#FFC400" ? "#1A202C" : "#FFFFFF" }}
              >
                {service.icon}
              </div>

              <h3 className="text-[#1A202C] text-xl md:text-2xl font-extrabold mb-2">
                {service.title}
              </h3>
              <p className="text-2xl font-extrabold tabular-nums mb-0.5" style={{ color: service.color }}>
                {service.price}
              </p>
              <p className="text-xs text-[#1A202C]/55 mb-4">{service.note}</p>

              <p className="text-sm text-[#1A202C]/75 leading-relaxed mb-4">
                {service.desc}
              </p>

              <span className="inline-flex items-center gap-1 text-sm font-black" style={{ color: service.color }}>
                詳細を見る
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          ))}
        </div>

        {/* 保守の補足 */}
        <div
          className="group mt-8 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 md:p-8 hover:shadow-md hover:bg-white transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "500ms",
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-xl bg-[#0EA5E9]/15 text-[#0EA5E9] flex items-center justify-center group-hover:bg-[#0EA5E9]/25 group-hover:scale-105 transition-all duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <h4 className="font-extrabold text-[#1A202C] text-base md:text-lg">納品後の保守サポート</h4>
          </div>

          <div className="grid grid-cols-3 gap-2.5 md:gap-4 mb-4">
            {[
              { service: "LP", price: "¥5,000", color: "#FFC400" },
              { service: "HP", price: "¥10,000", color: "#12C998" },
              { service: "システム", price: "¥20,000", color: "#635BFF" },
            ].map((p) => (
              <div
                key={p.service}
                className="bg-white border border-[#E5E7EB] rounded-xl p-3 md:p-4 text-center hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300"
                style={{ borderTopWidth: "3px", borderTopColor: p.color }}
              >
                <p className="text-[11px] md:text-xs font-black tracking-wider text-[#1A202C]/70 mb-1">
                  {p.service}
                </p>
                <p className="flex items-baseline justify-center gap-0.5">
                  <span className="text-base md:text-xl font-extrabold text-[#1A202C] tabular-nums leading-none">
                    {p.price}
                  </span>
                  <span className="text-[10px] md:text-xs font-bold text-[#1A202C]/55">〜/月</span>
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs md:text-sm text-[#1A202C]/65 leading-relaxed text-center">
            サーバー管理・修正・運用までずっと伴走します。自主管理の場合は買い切りも可。
          </p>
        </div>
      </div>
    </section>
  );
}
