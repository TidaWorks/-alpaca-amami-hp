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
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14a9 3 0 0 0 18 0V5" />
        <path d="M3 12a9 3 0 0 0 18 0" />
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
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
          className="relative bg-gradient-to-br from-[#635BFF]/8 via-white to-[#12C998]/5 border-2 border-[#635BFF]/20 rounded-3xl p-8 md:p-12 mb-6 shadow-md hover:shadow-lg transition-all duration-700 overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "150ms",
          }}
        >
          <div className="absolute top-6 right-6 hidden md:block">
            <span className="bg-[#635BFF] text-white text-[10px] font-black tracking-widest rounded-full px-3 py-1.5 shadow">
              ★ MAIN
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
            <div className="md:w-[42%]">
              <span className="inline-block text-[10px] font-black text-white bg-[#635BFF] rounded-full px-3 py-1 mb-4 tracking-[0.2em]">
                {services[0].badge}
              </span>
              <div className="w-14 h-14 rounded-2xl bg-[#635BFF] text-white flex items-center justify-center mb-4 shadow-md">
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
                className="inline-flex items-center gap-2 bg-[#635BFF] text-white font-black text-sm px-5 py-3 rounded-full shadow-md hover:shadow-lg hover:bg-[#5249E0] transition-all"
              >
                詳細を見る
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
              className="group relative bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-700 block"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${280 + i * 100}ms`,
              }}
            >
              <span
                className="inline-block text-[10px] font-black tracking-[0.2em] rounded-full px-3 py-1 mb-4"
                style={{
                  background: `${service.color}1A`,
                  color: service.color,
                }}
              >
                {service.badge}
              </span>

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
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
          className="mt-8 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 md:p-7 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "500ms",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="w-10 h-10 rounded-xl bg-[#0EA5E9]/15 text-[#0EA5E9] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <h4 className="font-extrabold text-[#1A202C] text-base md:text-lg">納品後の保守サポート</h4>
            </div>
            <p className="text-sm text-[#1A202C]/70 leading-relaxed flex-1">
              LP <span className="font-bold">¥5,000〜/月</span> / HP <span className="font-bold">¥10,000〜/月</span> / システム <span className="font-bold">¥20,000〜/月</span>
              　— サーバー管理・修正・運用までずっと伴走します。自主管理の場合は買い切りも可。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
