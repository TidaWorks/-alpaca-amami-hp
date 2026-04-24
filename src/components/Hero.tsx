"use client";

import { useEffect, useRef, useState } from "react";

const revenueBars = [
  { m: "1月", v: 52 },
  { m: "2月", v: 78 },
  { m: "3月", v: 85 },
  { m: "4月", v: 90 },
  { m: "5月", v: 105 },
  { m: "6月", v: 92 },
  { m: "7月", v: 128 },
  { m: "8月", v: 135 },
  { m: "9月", v: 148 },
  { m: "10月", v: 142 },
  { m: "11月", v: 155 },
  { m: "12月", v: 180 },
];

const sparkPaths = [
  "M0 18 L10 14 L20 16 L30 10 L40 12 L50 6",
  "M0 16 L10 12 L20 14 L30 8 L40 10 L50 4",
  "M0 20 L10 15 L20 17 L30 11 L40 9 L50 5",
  "M0 15 L10 18 L20 12 L30 14 L40 8 L50 6",
];

function Sidebar() {
  const items = [
    { label: "ホーム", active: true, d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" },
    { label: "予約管理", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "顧客管理", d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    { label: "売上管理", d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" },
    { label: "分析", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { label: "設定", d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  ];
  return (
    <aside className="relative w-[110px] flex-shrink-0 bg-[#0A1620] text-white flex flex-col">
      {/* ロゴ */}
      <div className="px-3 py-3.5 flex items-center gap-1.5 relative z-10">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-[8px] font-black">A</div>
        <div className="leading-none">
          <div className="text-[9px] font-black tracking-wider">ALPACA</div>
          <div className="text-[5px] text-emerald-300 tracking-[0.3em] mt-0.5">AMAMI</div>
        </div>
      </div>
      {/* メニュー */}
      <nav className="px-2 py-2 space-y-0.5 relative z-10 flex-1">
        {items.map((it) => (
          <div
            key={it.label}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[8px] ${
              it.active
                ? "bg-gradient-to-r from-emerald-500/30 to-transparent text-emerald-300 border-l-2 border-emerald-400 font-bold"
                : "text-slate-400"
            }`}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={it.d} />
            </svg>
            {it.label}
          </div>
        ))}
      </nav>
      {/* オーロラ背景 */}
      <svg className="absolute bottom-0 left-0 w-full h-[140px] pointer-events-none" viewBox="0 0 110 140" preserveAspectRatio="none">
        <defs>
          <linearGradient id="aurora" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
            <stop offset="40%" stopColor="#34D399" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#065F46" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="aurora2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0E7490" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-10 60 Q 30 30 60 50 T 120 45 L 120 140 L -10 140 Z" fill="url(#aurora)" />
        <path d="M-10 80 Q 40 55 70 75 T 120 65 L 120 140 L -10 140 Z" fill="url(#aurora2)" />
        {/* 山のシルエット */}
        <path d="M-10 115 L 20 95 L 40 105 L 65 88 L 85 100 L 110 92 L 120 98 L 120 140 L -10 140 Z" fill="#030712" opacity="0.9" />
      </svg>
      {/* プロフィール */}
      <div className="relative z-10 px-2.5 py-2 border-t border-white/5 flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-300 to-orange-300 flex items-center justify-center text-[7px] font-bold text-rose-900 flex-shrink-0">山</div>
        <div className="leading-tight min-w-0">
          <div className="text-[7px] font-semibold truncate">山田 花子</div>
          <div className="text-[5px] text-slate-400">オーナー</div>
        </div>
      </div>
    </aside>
  );
}

function KpiCard({ icon, iconBg, label, value, unit, delta, gradient, sparkIdx }: { icon: string; iconBg: string; label: string; value: string; unit?: string; delta: string; gradient: string; sparkIdx: number }) {
  return (
    <div className="relative rounded-lg bg-slate-900/80 border border-slate-700/50 p-2 overflow-hidden">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${iconBg}`}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d={icon} />
          </svg>
        </div>
        <span className="text-[7px] text-slate-400 font-medium">{label}</span>
      </div>
      <div className="flex items-baseline gap-0.5 mb-1">
        <span className="text-[13px] font-black text-white tabular-nums tracking-tight">{value}</span>
        {unit && <span className="text-[7px] text-slate-400">{unit}</span>}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-[6px] font-bold text-emerald-400 tabular-nums">{delta}</span>
          <span className="text-[5px] text-slate-500">前月比</span>
        </div>
        <svg width="50" height="22" viewBox="0 0 50 22" fill="none">
          <defs>
            <linearGradient id={`spark${sparkIdx}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradient} stopOpacity="0.6" />
              <stop offset="100%" stopColor={gradient} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${sparkPaths[sparkIdx]} L50 22 L0 22 Z`} fill={`url(#spark${sparkIdx})`} />
          <path d={sparkPaths[sparkIdx]} stroke={gradient} strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function RevenueChart() {
  return (
    <div className="rounded-lg bg-slate-900/80 border border-slate-700/50 p-2.5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold text-white">売上推移</span>
          <span className="text-[6px] text-slate-500">(2025年)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[6px] text-slate-300"><span className="w-1.5 h-1.5 rounded-sm bg-emerald-400" />売上（万円）</span>
          <span className="flex items-center gap-1 text-[6px] text-slate-500"><span className="w-2 h-[1px] border-t border-dashed border-slate-500" />前年売上（万円）</span>
          <span className="px-1 py-0.5 rounded bg-slate-800 text-[6px] text-slate-300 border border-slate-700">月次 ▾</span>
        </div>
      </div>
      <div className="relative h-[90px] overflow-hidden">
        {/* グリッド */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[200, 160, 120, 80, 40, 0].map((v) => (
            <div key={v} className="flex items-center gap-1">
              <span className="text-[5px] text-slate-500 w-5 text-right">{v}</span>
              <div className="flex-1 border-t border-slate-800" />
            </div>
          ))}
        </div>
        {/* バー */}
        <div className="absolute inset-0 pl-6 flex items-end gap-[2px]">
          {revenueBars.map((b, i) => (
            <div key={b.m} className="flex-1 flex flex-col items-center justify-end h-full">
              {i === 4 && (
                <div className="mb-1 px-1 py-0.5 rounded bg-slate-950 border border-slate-700 text-center shadow-lg">
                  <div className="text-[5px] text-slate-400">5月</div>
                  <div className="text-[6px] font-bold text-emerald-400">¥{b.v}万円</div>
                </div>
              )}
              <div
                className={`w-full rounded-t ${i === 4 ? "bg-emerald-400 ring-1 ring-emerald-300" : "bg-gradient-to-t from-emerald-700 to-emerald-500"}`}
                style={{ height: `${(b.v / 200) * 70}px` }}
              />
            </div>
          ))}
        </div>
        {/* 折れ線（前年） */}
        <svg className="absolute inset-0 pl-6" viewBox="0 0 120 90" preserveAspectRatio="none">
          <polyline
            points="5,60 15,50 25,55 35,45 45,56 55,52 65,40 75,44 85,35 95,42 105,36 115,32"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="0.6"
            strokeDasharray="2 1.5"
          />
          {[
            [5, 60], [15, 50], [25, 55], [35, 45], [45, 56], [55, 52], [65, 40], [75, 44], [85, 35], [95, 42], [105, 36], [115, 32],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="0.8" fill="#94A3B8" />
          ))}
        </svg>
      </div>
      {/* 月ラベル */}
      <div className="pl-6 flex gap-[2px] mt-1">
        {revenueBars.map((b) => (
          <span key={b.m} className="flex-1 text-center text-[5px] text-slate-400">{b.m}</span>
        ))}
      </div>
    </div>
  );
}

function TodayReservations() {
  const items = [
    { time: "10:00", menu: "カット", name: "佐藤様", status: "確定", statusClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
    { time: "13:30", menu: "カラー", name: "田中様", status: "確定", statusClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
    { time: "16:00", menu: "パーマ", name: "高橋様", status: "対応中", statusClass: "bg-sky-500/20 text-sky-300 border-sky-500/40" },
  ];
  return (
    <div className="rounded-lg bg-slate-900/80 border border-slate-700/50 p-2.5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-bold text-white">本日の予約</span>
        <span className="text-[6px] text-slate-400 flex items-center gap-0.5">すべて見る <span>›</span></span>
      </div>
      <div className="space-y-1.5">
        {items.map((it) => (
          <div key={it.time} className="flex items-center gap-2 rounded bg-slate-800/50 border border-slate-700/40 px-1.5 py-1">
            <span className="text-[7px] font-bold text-emerald-300 tabular-nums w-7">{it.time}</span>
            <span className="text-[6px] text-slate-200 w-7">{it.menu}</span>
            <span className="text-[6px] text-slate-300 flex-1">{it.name}</span>
            <span className={`text-[5px] px-1 py-0.5 rounded border ${it.statusClass}`}>{it.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Donut({ segments, centerLabel, centerValue }: { segments: { label: string; v: number; amount?: string; color: string }[]; centerLabel: string; centerValue: string }) {
  const total = segments.reduce((a, b) => a + b.v, 0);
  let offset = 0;
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-2">
      <svg width="70" height="70" viewBox="0 0 70 70">
        <circle cx="35" cy="35" r={r} fill="none" stroke="#1E293B" strokeWidth="9" />
        {segments.map((s, i) => {
          const frac = s.v / total;
          const dash = c * frac;
          const el = (
            <circle
              key={s.label}
              cx="35"
              cy="35"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="9"
              strokeDasharray={`${dash} ${c}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 35 35)"
            />
          );
          offset += dash;
          return el;
        })}
        <text x="35" y="34" textAnchor="middle" className="fill-slate-400" fontSize="5">{centerLabel}</text>
        <text x="35" y="42" textAnchor="middle" className="fill-white" fontSize="7" fontWeight="800">{centerValue}</text>
      </svg>
      <div className="flex-1 space-y-0.5">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1 text-[6px]">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
            <span className="text-slate-300 flex-1">{s.label}</span>
            <span className="text-slate-400 tabular-nums">{Math.round((s.v / total) * 100)}%</span>
            {s.amount && <span className="text-slate-500 tabular-nums">{s.amount}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryTable() {
  const rows = [
    { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1", label: "売上合計", v: "¥320,000", d: "+12.5%" },
    { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "予約件数", v: "32件", d: "+14.3%" },
    { icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", label: "新規顧客", v: "12人", d: "+20.0%" },
    { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", label: "リピート率", v: "68%", d: "+5.2%" },
  ];
  return (
    <div className="rounded-lg bg-slate-900/80 border border-slate-700/50 p-2.5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-bold text-white">今週のサマリー</span>
        <svg width="32" height="14" viewBox="0 0 32 14" fill="none"><rect x="0" y="8" width="3" height="6" fill="#10B981" opacity="0.5"/><rect x="5" y="5" width="3" height="9" fill="#10B981" opacity="0.7"/><rect x="10" y="6" width="3" height="8" fill="#10B981" opacity="0.6"/><rect x="15" y="2" width="3" height="12" fill="#10B981"/><rect x="20" y="4" width="3" height="10" fill="#10B981" opacity="0.8"/><rect x="25" y="6" width="3" height="8" fill="#10B981" opacity="0.6"/></svg>
      </div>
      <div className="space-y-1.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-1.5">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 flex-shrink-0">
              <path d={r.icon} />
            </svg>
            <span className="text-[6px] text-slate-300 flex-1">{r.label}</span>
            <span className="text-[7px] font-bold text-white tabular-nums">{r.v}</span>
            <span className="text-[5px] font-bold text-emerald-400 tabular-nums w-8 text-right">{r.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden bg-slate-950 shadow-2xl ring-1 ring-slate-800">
      {/* タイトルバー */}
      <div className="bg-slate-900 px-3 py-2 flex items-center gap-3 border-b border-slate-800">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex gap-1 text-slate-500">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="6" width="16" height="2"/><rect x="4" y="14" width="8" height="2"/></svg>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-slate-800 rounded-md px-2.5 py-0.5 text-[8px] text-slate-400 flex items-center gap-1.5 max-w-[240px] w-full justify-center">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            app.alpaca-amami.com
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5 5 5M12 5v12"/></svg>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14m-7-7h14"/></svg>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16"/></svg>
        </div>
      </div>
      {children}
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="flex bg-slate-950 text-white">
      <Sidebar />
      <main className="flex-1 p-3 min-w-0 relative">
        {/* ヘッダー */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-[15px] font-black tracking-tight">業務ダッシュボード</h3>
            <p className="text-[7px] text-slate-400 mt-0.5">本日の業務状況をリアルタイムで確認できます。</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-slate-400">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 text-[5px] font-bold flex items-center justify-center">3</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 py-1 rounded-md border border-slate-700 bg-slate-900 text-[7px] text-slate-300">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="5" width="16" height="16" rx="1"/><path d="M16 3v4M8 3v4M4 11h16"/></svg>
              2025年5月26日（月）
            </div>
          </div>
        </div>

        {/* KPIカード */}
        <div className="grid grid-cols-4 gap-2 mb-2.5">
          <KpiCard
            icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            iconBg="bg-emerald-500/90"
            label="月間売上"
            value="¥1,280,000"
            delta="+15.2%"
            gradient="#10B981"
            sparkIdx={0}
          />
          <KpiCard
            icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            iconBg="bg-sky-500/90"
            label="予約件数"
            value="128"
            unit="件"
            delta="+18.7%"
            gradient="#38BDF8"
            sparkIdx={1}
          />
          <KpiCard
            icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            iconBg="bg-violet-500/90"
            label="新規顧客"
            value="42"
            unit="人"
            delta="+20.0%"
            gradient="#A78BFA"
            sparkIdx={2}
          />
          <KpiCard
            icon="M12 6V4m0 16v-2m-6-8H4m16 0h-2M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            iconBg="bg-teal-500/90"
            label="稼働率"
            value="87"
            unit="%"
            delta="+6.3%"
            gradient="#2DD4BF"
            sparkIdx={3}
          />
        </div>

        {/* 売上推移 + 本日の予約 */}
        <div className="grid grid-cols-[1.8fr_1fr] gap-2 mb-2.5">
          <RevenueChart />
          <TodayReservations />
        </div>

        {/* 下段 */}
        <div className="grid grid-cols-3 gap-2 mb-2.5">
          <div className="rounded-lg bg-slate-900/80 border border-slate-700/50 p-2.5">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[8px] font-bold text-white">売上構成比</span>
              <span className="text-[6px] text-slate-500">(施術メニュー別)</span>
            </div>
            <Donut
              centerLabel="合計"
              centerValue="¥1,280,000"
              segments={[
                { label: "カット", v: 40, amount: "¥512,000", color: "#10B981" },
                { label: "カラー", v: 30, amount: "¥384,000", color: "#06B6D4" },
                { label: "パーマ", v: 20, amount: "¥256,000", color: "#8B5CF6" },
                { label: "トリートメント", v: 10, amount: "¥128,000", color: "#F472B6" },
              ]}
            />
          </div>
          <div className="rounded-lg bg-slate-900/80 border border-slate-700/50 p-2.5">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[8px] font-bold text-white">顧客属性</span>
              <span className="text-[6px] text-slate-500">(年代別)</span>
            </div>
            <Donut
              centerLabel="合計"
              centerValue="1,246人"
              segments={[
                { label: "10代", v: 5, color: "#22D3EE" },
                { label: "20代", v: 25, color: "#10B981" },
                { label: "30代", v: 35, color: "#F59E0B" },
                { label: "40代", v: 25, color: "#8B5CF6" },
                { label: "50代以上", v: 10, color: "#EC4899" },
              ]}
            />
          </div>
          <SummaryTable />
        </div>

        {/* 最近のアクティビティ */}
        <div className="flex items-center gap-4 pt-2 border-t border-slate-800">
          <span className="text-[7px] font-bold text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            最近のアクティビティ
          </span>
          <div className="flex items-center gap-1.5 text-[6px] text-slate-400">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="5" width="16" height="16" rx="1"/></svg>
            田中様が次回予約を登録しました
            <span className="text-slate-600">2分前</span>
          </div>
          <div className="flex items-center gap-1.5 text-[6px] text-slate-400">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            新規顧客 山本様が登録されました
            <span className="text-slate-600">15分前</span>
          </div>
          <div className="flex items-center gap-1.5 text-[6px] text-slate-400">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
            本日の売上目標 80%を達成しました
            <span className="text-slate-600">1時間前</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-44 md:pb-32 bg-[#FAFAFA] overflow-hidden">
      {/* 背景ロゴ — 見出しの真後ろに堂々と */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] pointer-events-none">
        <img src="/images/alpaca-logo.png" alt="" className="w-[280px] md:w-[380px] h-auto opacity-[0.07]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* テキスト */}
        <div className="text-center mb-14 md:mb-16">
          <p className="text-xs font-semibold tracking-[0.12em] text-[#0D9488] mb-4">奄美大島の業務システム開発</p>
          <h1 className="text-[1.85rem] sm:text-4xl md:text-[3.5rem] font-black leading-[1.15] text-gray-900 tracking-tight mb-5 [word-break:keep-all] [line-break:strict] [overflow-wrap:break-word]">
            業務を、<wbr />仕組みで変える。
          </h1>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto mb-8">
            予約・顧客・売上管理をひとつに。あなたの業務に合わせた専用システムを構築します。
          </p>
          <div className="flex items-center justify-center gap-5 mb-8">
            <a href="#contact" className="inline-block bg-[#0D9488] text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-[#0F766E] transition-all">
              無料で相談する
            </a>
            <a href="#services" className="inline-block text-gray-400 text-sm hover:text-gray-600 transition-colors">
              詳しく見る →
            </a>
          </div>
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            {["予約管理", "顧客管理", "売上集計", "在庫管理", "スタッフ管理", "HP制作"].map((tag) => (
              <span key={tag} className="text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1 text-center">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ダッシュボード（HTML実装） */}
        <ScalableDashboard />
      </div>
    </section>
  );
}

function ScalableDashboard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    const compute = () => {
      const wrap = wrapRef.current;
      const inner = innerRef.current;
      if (!wrap || !inner) return;
      const wrapW = wrap.getBoundingClientRect().width;
      const innerW = 1000;
      const innerH = inner.scrollHeight;
      if (wrapW >= 1024) {
        // PCサイズ以上では等倍表示
        setScale(1);
        setHeight("auto");
      } else {
        const s = wrapW / innerW;
        setScale(s);
        setHeight(innerH * s);
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <div ref={wrapRef} className="relative mx-auto max-w-5xl overflow-hidden" style={{ height }}>
      <div
        ref={innerRef}
        className="origin-top-left"
        style={{
          width: scale === 1 ? "100%" : "1000px",
          transform: scale === 1 ? "none" : `scale(${scale})`,
        }}
      >
        <BrowserFrame>
          <DashboardContent />
        </BrowserFrame>
      </div>
    </div>
  );
}

