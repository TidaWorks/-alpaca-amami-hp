"use client";

import { useState, useEffect, useRef } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";

const notifications = [
  { icon: "📞", label: "不在着信", desc: "080-XXXX-XXXX（3回目）", color: "#E74C8B", iconSvg: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E74C8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )},
  { icon: "💬", label: "LINE", desc: "予約したいのですが空いてますか？", color: "#06C755", iconSvg: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06C755" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  )},
  { icon: "📊", label: "Excel", desc: "今月の売上まだ入力されていません", color: "#4A90D9", iconSvg: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A90D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>
    </svg>
  )},
  { icon: "✉️", label: "メール", desc: "見積り依頼の件について", color: "#F5A623", iconSvg: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/>
    </svg>
  )},
  { icon: "📞", label: "不在着信", desc: "090-XXXX-XXXX", color: "#E74C8B", iconSvg: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E74C8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )},
  { icon: "💬", label: "LINE", desc: "明日のキャンセルお願いします", color: "#06C755", iconSvg: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06C755" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  )},
  { icon: "📋", label: "予約表", desc: "14:00 ダブルブッキングの可能性", color: "#E74C8B", iconSvg: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E74C8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )},
  { icon: "📊", label: "帳簿", desc: "経費の領収書が溜まっています", color: "#4A90D9", iconSvg: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A90D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  )},
];

function NotificationStack() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let index = 0;

    const addNext = () => {
      if (index < notifications.length) {
        setVisibleItems(prev => [...prev, index]);
        index++;
        cycleRef.current = setTimeout(addNext, 800);
      } else {
        // 全部出たら少し待ってリセット
        cycleRef.current = setTimeout(() => {
          setVisibleItems([]);
          index = 0;
          cycleRef.current = setTimeout(addNext, 600);
        }, 3000);
      }
    };

    cycleRef.current = setTimeout(addNext, 500);
    return () => { if (cycleRef.current) clearTimeout(cycleRef.current); };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-[340px] md:max-w-[380px]">
      {/* スマホフレーム風 */}
      <div className="rounded-[24px] border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-4 md:p-5 min-h-[340px] md:min-h-[380px] overflow-hidden">
        {/* ステータスバー */}
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-white/20 text-[10px] font-medium tabular-nums">14:23</span>
          <span className="text-white/20 text-[10px]">月曜日</span>
        </div>

        {/* 通知リスト */}
        <div className="space-y-2.5">
          {notifications.map((notif, i) => (
            <div
              key={`${notif.label}-${i}`}
              className="transition-all duration-500"
              style={{
                opacity: visibleItems.includes(i) ? 1 : 0,
                transform: visibleItems.includes(i) ? "translateY(0) scale(1)" : "translateY(-12px) scale(0.97)",
                transitionDelay: "0ms",
              }}
            >
              {visibleItems.includes(i) && (
                <div className="flex items-start gap-3 rounded-xl bg-white/[0.05] border border-white/[0.06] px-3.5 py-3 backdrop-blur-sm hover:bg-white/[0.07] transition-colors">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${notif.color}15` }}
                  >
                    {notif.iconSvg}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white/70 text-xs font-semibold">{notif.label}</span>
                      <span className="text-white/20 text-[10px]">たった今</span>
                    </div>
                    <p className="text-white/40 text-[11px] mt-0.5 truncate">{notif.desc}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 件数バッジ（右上） */}
      <div className="absolute -top-2 -right-2 bg-[#E74C8B] text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg shadow-[#E74C8B]/30 transition-all duration-300" style={{ opacity: visibleItems.length > 0 ? 1 : 0, transform: visibleItems.length > 0 ? "scale(1)" : "scale(0)" }}>
        {visibleItems.length}
      </div>
    </div>
  );
}

export default function BusyPersonSection() {
  const fade = useFadeIn();

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
              <span className="text-[#F5A623]/60 mt-2 inline-block font-bold">——それ、システムで解決しませんか？</span>
            </p>
          </div>

          {/* 右: 通知が溢れるUI演出 */}
          <div className="md:w-1/2 flex justify-center">
            <NotificationStack />
          </div>
        </div>
      </div>
    </section>
  );
}
