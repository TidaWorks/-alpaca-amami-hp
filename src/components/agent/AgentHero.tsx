"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Heart, Star, Check, Clock } from "lucide-react";

function NumberTicker({ to, suffix = "", prefix = "", duration = 1200, start = false }: { to: number; suffix?: string; prefix?: string; duration?: number; start?: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let rafId: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const progress = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(to * eased));
      if (progress < 1) rafId = requestAnimationFrame(tick);
      else setValue(to);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [to, duration, start]);
  return (
    <span className="tabular-nums">
      {prefix}
      {value.toLocaleString("ja-JP")}
      {suffix}
    </span>
  );
}

export default function AgentHero() {
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
    if (rect.top < window.innerHeight * 0.9) {
      setRevealed(true);
      io.disconnect();
    }
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="concept"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-[#F5FBF9] via-white to-[#E8F9F3]/40 pb-16 md:pb-24"
    >
      {/* ===== SP専用ヒーロー：案18 全幅画像 + 胸元ピンクCTA（md未満で表示） ===== */}
      <div className="relative md:hidden pt-[100px]">
        <img
          src="/images/agent-v3/06-hero-sp.png"
          alt="あなたの業務をガラッと変える！アルパカスマート"
          className="w-full h-auto block"
          width={1080}
          height={1920}
        />
        <a
          href="#about"
          className="absolute left-1/2 top-[82%] inline-block bg-[#FF3D8B] text-white font-bold text-base px-8 py-4 rounded-full shadow-xl shadow-[#FF3D8B]/40 active:bg-[#E03078] transition-colors duration-200 whitespace-nowrap agentCtaBob"
        >
          サービス内容を見る
        </a>
        {/* 画像下→白セクションへの繋ぎフェード（ミントから白へグラデ） */}
        <div
          aria-hidden="true"
          className="h-16 bg-gradient-to-b from-[#12C998]/0 via-[#E8F9F3]/60 to-white"
        />
      </div>

      {/* 装飾レイヤー：背景blur blob 3個＋控えめ星屑（PC専用） */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block" aria-hidden="true">
        {/* ドットパターン（左側テキスト背景の質感） */}
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(29,42,110,0.12) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse 38% 55% at 14% 35%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 38% 55% at 14% 35%, black 30%, transparent 75%)",
          }}
        />
        {/* 雲ブロブ1：左上のミント薄blur */}
        <div
          className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, #12C998 0%, transparent 70%)",
            animation: "agentBlobDrift 22s ease-in-out infinite",
          }}
        />
        {/* 雲ブロブ2：右下のピンク薄blur（CTA色との橋渡し） */}
        <div
          className="absolute -bottom-40 -right-20 w-[460px] h-[460px] rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, #FF6B9E 0%, transparent 70%)",
            animation: "agentBlobDrift 26s ease-in-out infinite reverse",
          }}
        />
        {/* 雲ブロブ3：中央右ミント（画像カードの後光） */}
        <div
          className="absolute top-[10%] right-[4%] w-[560px] h-[560px] rounded-full blur-3xl opacity-30 hidden md:block"
          style={{
            background: "radial-gradient(circle, #12C998 0%, transparent 65%)",
            animation: "agentBlobDrift 18s ease-in-out infinite",
          }}
        />

        {/* ===== 控えめ星屑：Sparkles / Heart / Star を opacity 0.12〜0.18 で ===== */}
        <Sparkles
          className="absolute top-[6%] right-[8%] w-7 h-7 text-[#12C998] hidden md:block agentFloat1"
          style={{ opacity: 0.15 }}
          strokeWidth={1.8}
        />
        <Heart
          className="absolute bottom-[8%] left-[12%] w-5 h-5 text-[#FF6B9E] hidden md:block agentFloat2"
          style={{ opacity: 0.18 }}
          strokeWidth={2}
        />
        <Star
          className="absolute top-[14%] left-[38%] w-4 h-4 text-[#12C998] hidden md:block agentFloat3"
          style={{ opacity: 0.12 }}
          strokeWidth={2}
        />

        {/* ===== 手書き風破線パス：1本だけ（テキスト→画像への流れる矢印） ===== */}
        <svg
          className="absolute top-[38%] left-[36%] w-[180px] h-[80px] hidden lg:block agentDashFlow"
          viewBox="0 0 180 80"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 60 Q 40 10, 80 40 T 165 25"
            stroke="#12C998"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 6"
            opacity="0.45"
          />
          <path
            d="M158 18 L168 25 L160 33"
            stroke="#12C998"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.45"
          />
        </svg>
      </div>

      {/* メインコンテンツ：2カラム grid（PC専用） */}
      <div className="relative z-10 pt-28 md:pt-36 hidden md:block">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-[1fr_1.25fr] gap-10 md:gap-12 lg:gap-14 items-center">

            {/* 左カラム：テキスト */}
            <div className="relative max-w-lg">
              {/* テキスト側装飾：ヘッドライン背後のミントハイライト面 */}
              <div
                aria-hidden="true"
                className="absolute -left-6 top-[3.5rem] w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#12C998]/10 blur-2xl pointer-events-none"
              />

              <p
                className={`relative inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[#12C998] font-bold mb-7 border border-[#12C998]/30 bg-[#E8F9F3]/90 backdrop-blur-sm rounded-full px-4 py-2 ${revealed ? "fade-in-x" : "pre-x"}`}
                style={{ animationDelay: "0.05s" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#12C998] animate-pulse" />
                ALPACA SMART · AMAMI
              </p>

              <h1
                className={`relative text-[#1D2A6E] text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] font-bold tracking-tight mb-6 md:mb-8 ${revealed ? "fade-in-x" : "pre-x"}`}
                style={{ animationDelay: "0.15s" }}
              >
                業務を、
                <br />
                <span className="relative inline-block">
                  {/* ヘッドラインのキーワード下に薄ミント面（維持） */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1 h-3 md:h-4 bg-[#12C998]/15 rounded-sm -z-10"
                  />
                  <span className="text-[#12C998]">スマートに</span>
                </span>
                。
              </h1>

              <p
                className={`text-[#1D2A6E] text-lg md:text-2xl font-bold leading-snug mb-8 max-w-xl ${revealed ? "fade-in-x" : "pre-x"}`}
                style={{ animationDelay: "0.22s" }}
              >
                いつでも相談できる、AI担当者。
              </p>

              <p
                className={`text-[#5A6280] text-base md:text-lg leading-loose mb-10 max-w-xl ${revealed ? "fade-in-x" : "pre-x"}`}
                style={{ animationDelay: "0.3s" }}
              >
                AIをどう使えばいいか分からない。
                <br className="hidden md:block" />
                そんな事業者さんへ、LINEで気軽に相談できる
                <br className="hidden md:block" />
                月額サポートをご用意しました。
              </p>

              <div
                className={`flex flex-wrap items-center gap-5 ${revealed ? "fade-in-x" : "pre-x"}`}
                style={{ animationDelay: "0.45s" }}
              >
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 bg-[#12C998] text-white font-bold text-sm pl-7 pr-2 py-2 rounded-full hover:bg-[#0DA67D] transition-colors duration-200 shadow-lg shadow-[#12C998]/20"
                >
                  無料で相談する
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#12C998] transition-transform duration-300 group-hover:rotate-[-45deg]">
                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                </a>
                <a
                  href="#features"
                  className="group inline-flex items-baseline gap-2 text-sm font-bold text-[#1D2A6E]"
                >
                  <span className="relative">
                    できることを見る
                    <span className="absolute left-0 -bottom-[3px] w-full h-[1.5px] bg-[#1D2A6E] scale-x-100 origin-left transition-transform duration-500 group-hover:scale-x-0" />
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* 右カラム：画像主役エリア */}
            <div
              className={`relative w-full ${revealed ? "fade-in-up" : "pre-up"}`}
              style={{ animationDelay: "0.35s" }}
            >
              {/* 画像カード背後の太いミントグロー（後光） */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -m-10 rounded-[2.5rem] bg-[#12C998]/15 blur-3xl pointer-events-none"
              />

              {/* ===== 浮遊バッジ：1個だけに統合（右上） ===== */}
              <div
                aria-hidden="true"
                className={`absolute -top-3 right-2 md:-top-4 md:right-6 z-30 bg-white rounded-2xl shadow-xl shadow-[#1D2A6E]/10 ring-1 ring-[#12C998]/20 px-3.5 py-2.5 flex items-center gap-2.5 ${revealed ? "badge-float-a" : "pre-up"}`}
                style={{ animationDelay: "0.7s" }}
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#E8F9F3] text-[#12C998]">
                  <Clock className="w-4 h-4" strokeWidth={2.5} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[9px] tracking-[0.18em] font-bold text-[#5A6280]">SUPPORT</span>
                  <span className="block text-[13px] font-bold text-[#1D2A6E]">24h以内返信／相談無制限</span>
                </span>
              </div>

              {/* ===== 画像本体（主役） ===== */}
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl shadow-[#12C998]/20 ring-1 ring-[#12C998]/10">
                <picture>
                  <source media="(max-width: 767px)" srcSet="/images/agent-v3/06-hero-sp.png" />
                  <img
                    src="/images/agent-v3/01-hero-pc.png"
                    alt="アルパカスマート — LINEで相談できるAI担当者"
                    className="w-full h-auto block"
                    width={1280}
                    height={1280}
                  />
                </picture>
              </div>

              {/* 画像下のストローク実績バッジ（細い帯）：維持 */}
              <div
                className={`relative z-20 mt-6 md:mt-8 grid grid-cols-3 gap-2 md:gap-3 ${revealed ? "fade-in-x" : "pre-x"}`}
                style={{ animationDelay: "1.6s" }}
              >
                <div className="bg-white/85 backdrop-blur-sm border border-[#12C998]/30 rounded-full px-3 py-2 text-center inline-flex items-center justify-center gap-1.5">
                  <Check className="w-3 h-3 text-[#12C998]" strokeWidth={3} />
                  <span className="text-[11px] font-bold text-[#1D2A6E] whitespace-nowrap">LINE公式</span>
                </div>
                <div className="bg-white/85 backdrop-blur-sm border border-[#12C998]/30 rounded-full px-3 py-2 text-center inline-flex items-center justify-center gap-1.5">
                  <Check className="w-3 h-3 text-[#12C998]" strokeWidth={3} />
                  <span className="text-[11px] font-bold text-[#1D2A6E] whitespace-nowrap">24時間以内返信</span>
                </div>
                <div className="bg-white/85 backdrop-blur-sm border border-[#12C998]/30 rounded-full px-3 py-2 text-center inline-flex items-center justify-center gap-1.5">
                  <Check className="w-3 h-3 text-[#12C998]" strokeWidth={3} />
                  <span className="text-[11px] font-bold text-[#1D2A6E] whitespace-nowrap">月1レポート</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 信頼ポイント帯 — Number Ticker付き（維持） */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 mt-16 md:mt-24">
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.6s" }}>
          <div className="bg-white border border-[#E5E9F5] rounded-2xl p-6 hover:border-[#12C998]/40 transition-colors duration-300 shadow-sm shadow-[#1D2A6E]/5">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#5A6280] mb-3">RESPONSE</p>
            <p className="text-3xl md:text-4xl font-bold text-[#1D2A6E] leading-none mb-2">
              <NumberTicker to={24} start={revealed} />
              <span className="text-base ml-1">時間以内</span>
            </p>
            <p className="text-[12px] text-[#5A6280] font-bold">営業日24時間以内に返信</p>
          </div>
          <div className="bg-white border border-[#E5E9F5] rounded-2xl p-6 hover:border-[#12C998]/40 transition-colors duration-300 shadow-sm shadow-[#1D2A6E]/5">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#5A6280] mb-3">IMPLEMENT</p>
            <p className="text-3xl md:text-4xl font-bold text-[#1D2A6E] leading-none mb-2">
              月<NumberTicker to={5} start={revealed} />
              <span className="text-base ml-1">時間まで</span>
            </p>
            <p className="text-[12px] text-[#5A6280] font-bold">追加見積もりなしの軽実装枠</p>
          </div>
          <div className="bg-white border border-[#E5E9F5] rounded-2xl p-6 hover:border-[#12C998]/40 transition-colors duration-300 shadow-sm shadow-[#1D2A6E]/5">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#5A6280] mb-3">CONTRACT</p>
            <p className="text-3xl md:text-4xl font-bold text-[#1D2A6E] leading-none mb-2">
              最低<NumberTicker to={3} start={revealed} />
              <span className="text-base ml-1">ヶ月から</span>
            </p>
            <p className="text-[12px] text-[#5A6280] font-bold">4ヶ月目以降は月単位で解約OK</p>
          </div>
        </div>
      </div>

      {/* Trust画像帯 — Powered by（維持） */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 mt-16 md:mt-20">
        <p className={`text-[10px] font-bold tracking-[0.4em] text-[#5A6280] mb-5 ${revealed ? "fade-in-x" : "pre-x"}`} style={{ animationDelay: "0.75s" }}>
          POWERED BY
        </p>
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/agent-v3/09-trust-sp.png" />
          <img
            src="/images/agent-v3/04-trust-pc.png"
            alt="アルパカスマートが活用する主要AIサービス"
            className={`w-full h-auto rounded-xl ${revealed ? "fade-in-x" : "pre-x"}`}
            style={{ animationDelay: "0.85s" }}
            width={1920}
            height={1080}
          />
        </picture>
      </div>

      <style>{`
        .pre-x { opacity: 0; transform: translate(0, 24px); }
        .pre-up { opacity: 0; transform: translateY(40px); }
        @keyframes fade-show-x { 0% { opacity: 0; transform: translate(0, 24px); } 100% { opacity: 1; transform: translate(0, 0); } }
        @keyframes fade-show-up { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        .fade-in-x { animation: fade-show-x 0.85s cubic-bezier(0.165, 0.84, 0.44, 1) both; }
        .fade-in-up { animation: fade-show-up 1s cubic-bezier(0.165, 0.84, 0.44, 1) both; }

        @keyframes agentBlobDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(18px, -12px) scale(1.05); }
          66% { transform: translate(-14px, 14px) scale(0.96); }
        }

        /* ===== 星屑のふわふわ揺れ 3パターン（控えめ） ===== */
        @keyframes agentFloatA {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(4px, -8px) rotate(6deg); }
        }
        @keyframes agentFloatB {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-6px, -6px) rotate(-5deg); }
        }
        @keyframes agentFloatC {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(3px, 6px) rotate(8deg); }
        }
        .agentFloat1 { animation: agentFloatA 7s ease-in-out infinite; }
        .agentFloat2 { animation: agentFloatB 9s ease-in-out infinite; }
        .agentFloat3 { animation: agentFloatC 6s ease-in-out infinite; }

        /* ===== 破線パスを流すアニメ ===== */
        @keyframes agentDashMove {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -24; }
        }
        .agentDashFlow path { animation: agentDashMove 2.4s linear infinite; }

        /* ===== バッジ浮遊：reveal → 着地 → ゆるい無限フロート ===== */
        @keyframes badge-pop { 0% { opacity: 0; transform: translateY(18px) scale(0.92); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes badge-bob-a { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .badge-float-a { animation: badge-pop 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) both, badge-bob-a 5.5s ease-in-out 0.7s infinite; }

        /* ===== SP CTAボタン浮遊（left-1/2との水平センタリングを保つため translateX(-50%) 込み） ===== */
        @keyframes agentCtaBob {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -7px); }
        }
        .agentCtaBob { transform: translate(-50%, 0); animation: agentCtaBob 3s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .fade-in-x, .fade-in-up { animation: none !important; }
          .pre-x, .pre-up { opacity: 1; transform: none; }
          .agentFloat1, .agentFloat2, .agentFloat3,
          .agentDashFlow path { animation: none !important; }
          [class*="badge-float-"] { animation: none !important; opacity: 1 !important; transform: none !important; }
          .agentCtaBob { animation: none !important; transform: translate(-50%, 0) !important; }
        }
      `}</style>
    </section>
  );
}
