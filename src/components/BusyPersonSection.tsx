"use client";

import { useState, useEffect } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";

/* ─── SVGラインアイコン ─── */
function IconPhone() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function IconPencil() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

function IconTable() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  );
}

const busyTasks = [
  { icon: IconPhone, label: "電話対応", desc: "予約の電話が鳴りっぱなし", color: "#E74C8B" },
  { icon: IconPencil, label: "手書きメモ", desc: "紙に書いて、またPC入力", color: "#F5A623" },
  { icon: IconTable, label: "Excel管理", desc: "売上の転記でミスが出る", color: "#4A90D9" },
  { icon: IconClipboard, label: "紙の予約表", desc: "ダブルブッキングに気づけない", color: "#2ECC71" },
];

export default function BusyPersonSection() {
  const fade = useFadeIn();
  const [phase, setPhase] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [crossedOut, setCrossedOut] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    if (phase === 0 && visibleCount < busyTasks.length) {
      const timer = setTimeout(() => setVisibleCount((prev) => prev + 1), 600);
      return () => clearTimeout(timer);
    }
    if (phase === 0 && visibleCount === busyTasks.length) {
      const timer = setTimeout(() => setPhase(1), 1200);
      return () => clearTimeout(timer);
    }
    if (phase === 1 && !crossedOut) {
      const timer = setTimeout(() => setCrossedOut(true), 300);
      return () => clearTimeout(timer);
    }
    if (phase === 1 && crossedOut) {
      const timer = setTimeout(() => { setPhase(2); setShowSolution(true); }, 800);
      return () => clearTimeout(timer);
    }
    if (phase === 2) {
      const timer = setTimeout(() => {
        setPhase(0);
        setVisibleCount(0);
        setCrossedOut(false);
        setShowSolution(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [phase, visibleCount, crossedOut]);

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#0a0a0a] to-[#0f0a14] text-white overflow-hidden noise-overlay">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div ref={fade.ref} className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 transition-all duration-1000 ${fade.className}`}>
          {/* 左: テキスト */}
          <div className="md:w-1/2 text-center md:text-left">
            <p className="font-display text-[#E74C8B]/60 text-xs tracking-[0.4em] mb-4 font-semibold">BEFORE</p>
            <h3 className="text-2xl md:text-4xl font-black leading-tight mb-4">
              毎日、<span className="text-[#E74C8B]">バタバタ</span>
              <br />
              <span className="text-white/50">してませんか？</span>
            </h3>
            <p className="text-white/50 text-sm md:text-base leading-relaxed">
              電話が鳴って、メモして、またパソコンに入力。
              <br />
              紙の予約表とExcelとLINEを行ったり来たり。
              <br />
              気づいたら1日が終わってる。
              <br />
              <span className="text-[#F5A623]/60 mt-2 inline-block font-bold">——それ、アプリで解決しませんか？</span>
            </p>
          </div>

          {/* 右: タスク → 解決 */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-[320px] md:w-[400px] min-h-[280px] md:min-h-[320px]">
              {/* タスクカード */}
              <div className={`grid grid-cols-2 gap-3 md:gap-4 transition-all duration-700 ${showSolution ? "opacity-0 scale-90 blur-sm" : "opacity-100"}`}>
                {busyTasks.map((task, i) => {
                  const Icon = task.icon;
                  return (
                    <div
                      key={task.label}
                      className={`relative rounded-2xl border p-5 md:p-6 transition-all duration-500 ${
                        i < visibleCount ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      } ${
                        crossedOut
                          ? "border-red-500/20 bg-red-500/[0.03]"
                          : "border-white/[0.08] bg-white/[0.02]"
                      }`}
                    >
                      {/* アイコン */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                          crossedOut ? "opacity-20" : "opacity-100"
                        }`}
                        style={{ background: `${task.color}12`, color: task.color }}
                      >
                        <Icon />
                      </div>

                      <p className={`text-sm font-bold mb-1 transition-colors duration-300 ${crossedOut ? "text-white/15" : "text-white/80"}`}>
                        {task.label}
                      </p>
                      <p className={`text-[11px] leading-relaxed transition-colors duration-300 ${crossedOut ? "text-white/8" : "text-white/35"}`}>
                        {task.desc}
                      </p>

                      {/* × 打ち消し */}
                      {crossedOut && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="15" y1="15" x2="85" y2="85" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" className="busy-cross-line" />
                            <line x1="85" y1="15" x2="15" y2="85" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" className="busy-cross-line" style={{ animationDelay: "0.15s" }} />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 解決: スマホ */}
              <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                showSolution ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
              }`}>
                <div className="relative">
                  <div className="absolute -inset-10 rounded-full bg-[#F5A623]/8 blur-3xl" />

                  <div className="relative w-24 h-40 md:w-28 md:h-44 rounded-[20px] border border-[#F5A623]/20 bg-gradient-to-b from-[#1a1a2e] to-[#0d0d1a] flex flex-col items-center justify-center shadow-[0_0_60px_rgba(245,166,35,0.1)]">
                    <div className="absolute top-2 w-8 h-1 bg-white/10 rounded-full" />
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-[#F5A623] busy-check-pop" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <div className="absolute bottom-2.5 w-8 h-1 bg-white/10 rounded-full" />
                  </div>
                </div>

                <p className="mt-6 text-lg md:text-xl font-black text-white/90">
                  全部、<span className="text-[#F5A623]">これひとつ</span>で。
                </p>
                <p className="mt-1.5 text-xs md:text-sm text-white/30">
                  予約も、顧客情報も、売上も。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
