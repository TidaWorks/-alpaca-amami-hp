"use client";

import { useState, useEffect, useRef } from "react";

/* ─── 型定義 ─── */
type PopupData = { title: string; rows: { label: string; value: string; color?: string }[]; accent: string } | null;

/* ─── 強み — IDE風コードタイピング演出 ─── */
export default function Strengths() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [typedCount, setTypedCount] = useState(0);
  const [buildStatus, setBuildStatus] = useState<"typing" | "compiling" | "done" | "preview">("typing");
  const [isVisible, setIsVisible] = useState(false);
  const [popup, setPopup] = useState<PopupData>(null);
  const [customerTab, setCustomerTab] = useState(0);
  const [inventoryTab, setInventoryTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const systems = [
    {
      label: "Web予約システム",
      desc: "24時間自動受付。お客様用の予約ページもセット",
      file: "booking.ts",
      lines: [
        "// 予約システム構築中...",
        "const booking = await create({",
        '  date: "2026-04-15",',
        '  time: "14:00",',
        "  guests: 2,",
        '  plan: "スタンダード"',
        "});",
        "await sendConfirmEmail(booking);",
      ],
      terminal: "✓ 予約受付 → 確認メール自動送信OK",
    },
    {
      label: "顧客管理・来店履歴",
      desc: "リピーターも一目でわかる",
      file: "customers.ts",
      lines: [
        "// 顧客データベース構築中...",
        "const customers = await db.query({",
        "  visits: { min: 3 },",
        '  sort: "lastVisit",',
        "  limit: 50",
        "});",
        "const report = analyze(customers);",
        "await exportDashboard(report);",
      ],
      terminal: "✓ リピーター分析レポート生成完了",
    },
    {
      label: "売上ダッシュボード",
      desc: "日別・月別・項目別をリアルタイム集計",
      file: "dashboard.ts",
      lines: [
        "// ダッシュボード構築中...",
        "const sales = await aggregate({",
        '  period: "monthly",',
        '  categories: ["宿泊", "飲食"],',
        '  compare: "前年同月"',
        "});",
        "const chart = renderChart(sales);",
        "return { chart, summary };",
      ],
      terminal: "✓ リアルタイム売上集計OK",
    },
    {
      label: "在庫・メニュー管理",
      desc: "商品やメニューの在庫をリアルタイムで更新",
      file: "inventory.ts",
      lines: [
        "// 在庫管理システム構築中...",
        "const inventory = await getStock({",
        '  category: "フード",',
        "  lowStockAlert: true,",
        "  autoReorder: false",
        "});",
        "await updateMenuStatus(inventory);",
        "await syncToWebsite(inventory);",
      ],
      terminal: "✓ 在庫・メニュー同期完了",
    },
    {
      label: "LINE連携",
      desc: "LINEからの予約をシステムに自動取り込み",
      file: "line-bot.ts",
      lines: [
        "// LINE Bot 構築中...",
        "webhook.onMessage(async (msg) => {",
        "  const intent = parse(msg.text);",
        '  if (intent === "予約") {',
        "    await startBooking(msg.userId);",
        "  }",
        "  await reply(msg, confirmation);",
        "});",
      ],
      terminal: "✓ LINE Webhook 接続完了",
    },
    {
      label: "スタッフ用 管理画面",
      desc: "スマホからでも操作できる管理ページ",
      file: "admin.tsx",
      lines: [
        "// 管理画面構築中...",
        "const admin = createPanel({",
        "  auth: staffLogin,",
        '  pages: ["予約一覧", "顧客"],',
        "  responsive: true,",
        '  roles: ["manager", "staff"]',
        "});",
        "export default admin;",
      ],
      terminal: "✓ スマホ対応の管理画面 デプロイ完了",
    },
  ];

  // IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // コードをタイプ
  useEffect(() => {
    if (!isVisible) return;
    const lines = systems[activeIdx].lines;
    if (typedCount >= lines.length) {
      setBuildStatus("compiling");
      const t = setTimeout(() => setBuildStatus("done"), 600);
      return () => clearTimeout(t);
    }
    setBuildStatus("typing");
    const t = setTimeout(() => setTypedCount((c) => c + 1), 300);
    return () => clearTimeout(t);
  }, [isVisible, typedCount, activeIdx]);

  // ビルド完了 → プレビュー表示
  useEffect(() => {
    if (buildStatus === "done") {
      const t = setTimeout(() => setBuildStatus("preview"), 800);
      return () => clearTimeout(t);
    }
  }, [buildStatus]);

  // クリックで項目を切り替え
  const handleSelect = (idx: number) => {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    setTypedCount(0);
    setBuildStatus("typing");
    setPopup(null);
    setCustomerTab(0);
    setInventoryTab(0);
  };

  // シンタックスハイライト
  const highlight = (line: string): React.ReactNode => {
    if (line.startsWith("//"))
      return <span style={{ color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>{line}</span>;

    const tokens: { text: string; color?: string }[] = [];
    const keywords = /\b(const|let|await|return|async|if|export|default)\b/;
    const strings = /(".*?"|'.*?')/;
    const numbers = /\b(\d+)\b/;
    const booleans = /\b(true|false|null)\b/;
    const tokenRegex = new RegExp(`(${keywords.source}|${strings.source}|${numbers.source}|${booleans.source})`);

    let remaining = line;
    while (remaining.length > 0) {
      const match = remaining.match(tokenRegex);
      if (!match || match.index === undefined) {
        tokens.push({ text: remaining });
        break;
      }
      if (match.index > 0) tokens.push({ text: remaining.slice(0, match.index) });
      const m = match[0];
      let color = "#e2e8f0";
      if (keywords.test(m)) color = "#c084fc";
      else if (strings.test(m)) color = "#34d399";
      else if (numbers.test(m) || booleans.test(m)) color = "#F5A623";
      tokens.push({ text: m, color });
      remaining = remaining.slice(match.index + m.length);
    }

    return (
      <>
        {tokens.map((t, i) =>
          t.color ? (
            <span key={i} style={{ color: t.color }}>{t.text}</span>
          ) : (
            <span key={i}>{t.text}</span>
          )
        )}
      </>
    );
  };

  const sys = systems[activeIdx];
  const progress = typedCount / sys.lines.length;
  const isPreview = buildStatus === "preview";

  // ポップアップオーバーレイ
  const PopupOverlay = () => {
    if (!popup) return null;
    return (
      <div className="absolute inset-0 z-30 flex items-center justify-center animate-fadeIn" onClick={() => setPopup(null)}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative bg-[#151c2c] border rounded-2xl p-5 w-[85%] max-w-sm shadow-2xl" style={{ borderColor: `${popup.accent}30` }}
          onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setPopup(null)} className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white/70 transition-all text-xs">✕</button>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${popup.accent}20` }}>
              <span className="text-sm font-bold" style={{ color: popup.accent }}>{popup.title[0]}</span>
            </div>
            <div>
              <h4 className="text-white/90 text-sm font-bold">{popup.title}</h4>
            </div>
          </div>
          <div className="space-y-2.5">
            {popup.rows.map((row, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                <span className="text-white/40 text-xs">{row.label}</span>
                <span className="text-sm font-bold" style={{ color: row.color || "rgba(255,255,255,0.8)" }}>{row.value}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button className="flex-1 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-80" style={{ background: `${popup.accent}20`, color: popup.accent }}>編集</button>
            <button onClick={() => setPopup(null)} className="flex-1 py-2 rounded-lg bg-white/5 text-white/40 text-xs font-bold hover:bg-white/10 transition-all">閉じる</button>
          </div>
        </div>
      </div>
    );
  };

  // システムごとのプレビューUI
  const pcScreenUI = (idx: number) => {
    switch (idx) {
      case 0: {
        const bookingDates = [
          { day: 3, name: "山田様", time: "10:00", plan: "スタンダード", guests: 2 },
          { day: 6, name: "佐藤様", time: "14:00", plan: "プレミアム", guests: 4 },
          { day: 9, name: "田中様", time: "11:00", plan: "スタンダード", guests: 1 },
          { day: 12, name: "鈴木様", time: "15:00", plan: "グループ", guests: 8 },
          { day: 15, name: "高橋様", time: "17:00", plan: "スタンダード", guests: 2 },
          { day: 16, name: "今日", time: "—", plan: "—", guests: 5 },
          { day: 18, name: "渡辺様", time: "13:00", plan: "スタンダード", guests: 3 },
          { day: 21, name: "伊藤様", time: "10:30", plan: "プレミアム", guests: 2 },
          { day: 24, name: "木村様", time: "16:00", plan: "スタンダード", guests: 1 },
          { day: 27, name: "松本様", time: "12:00", plan: "グループ", guests: 6 },
        ];
        return (
          <div className="w-full h-full flex flex-col gap-2.5 animate-fadeIn relative">
            <PopupOverlay />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#F5A623]/20 flex items-center justify-center"><span className="text-[#F5A623] text-[11px] font-bold">予</span></div>
                <div>
                  <span className="text-white/70 text-xs md:text-sm font-bold block leading-tight">予約管理</span>
                  <span className="text-white/25 text-[9px]">リアルタイム更新</span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="px-3 py-1.5 rounded-lg bg-white/5 text-white/40 text-xs cursor-pointer hover:bg-white/10 transition-colors">今月</div>
                <div className="px-3 py-1.5 rounded-lg bg-[#F5A623]/20 text-[#F5A623] text-xs font-bold">2026年4月</div>
              </div>
            </div>
            <div className="flex-1 flex gap-2.5">
              <div className="flex-1 bg-white/[0.02] rounded-xl p-3 border border-white/5">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["月","火","水","木","金","土","日"].map((d) => (
                    <div key={d} className="text-center text-[10px] text-white/30 font-medium">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const booking = bookingDates.find(b => b.day === day);
                    const isFull = [12, 15].includes(day);
                    const isToday = day === 16;
                    return (
                      <div key={i}
                        onClick={() => booking && setPopup({
                          title: isToday ? `4月${day}日（本日）` : `4月${day}日の予約`,
                          accent: isToday ? "#F5A623" : isFull ? "#ef4444" : "#34d399",
                          rows: isToday ? [
                            { label: "予約件数", value: "5件", color: "#F5A623" },
                            { label: "次の予約", value: "14:00 田中様", color: "#34d399" },
                            { label: "空き枠", value: "2枠", color: "#60a5fa" },
                            { label: "売上見込", value: "¥41,000", color: "#F5A623" },
                          ] : [
                            { label: "お客様", value: booking.name, color: "#F5A623" },
                            { label: "時間", value: booking.time },
                            { label: "プラン", value: booking.plan, color: "#34d399" },
                            { label: "人数", value: `${booking.guests}名` },
                            { label: "ステータス", value: isFull ? "満席" : "確定", color: isFull ? "#ef4444" : "#34d399" },
                          ],
                        })}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-0.5 text-[10px] transition-all
                        ${booking ? "cursor-pointer hover:scale-110 hover:shadow-lg active:scale-95" : ""}
                        ${isToday ? "bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] shadow-[0_0_12px_rgba(245,166,35,0.15)]" :
                          isFull ? "bg-red-500/10 border border-red-500/20 text-red-400/70 hover:bg-red-500/20" :
                          booking ? "bg-green-500/10 border border-green-500/20 text-white/50 hover:bg-green-500/20" :
                          "bg-white/[0.02] text-white/25"}`}>
                        <span className="font-bold">{day}</span>
                        {booking && <div className={`w-1 h-1 rounded-full ${isFull ? "bg-red-400" : isToday ? "bg-[#F5A623]" : "bg-green-400"}`} />}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-40 md:w-48 bg-white/[0.02] rounded-xl border border-white/5 p-3 hidden md:flex flex-col">
                <div className="text-[10px] text-white/30 font-medium mb-2">4月16日の予約</div>
                <div className="flex-1 space-y-1.5 overflow-hidden">
                  {[
                    { time: "10:00", name: "山田様", plan: "スタンダード", color: "#34d399" },
                    { time: "11:30", name: "佐藤様", plan: "プレミアム", color: "#F5A623" },
                    { time: "14:00", name: "田中様", plan: "スタンダード", color: "#34d399" },
                    { time: "15:30", name: "鈴木様", plan: "グループ", color: "#60a5fa" },
                    { time: "17:00", name: "高橋様", plan: "スタンダード", color: "#34d399" },
                  ].map((r, i) => (
                    <div key={i} onClick={() => setPopup({
                      title: `${r.name}の予約詳細`,
                      accent: r.color,
                      rows: [
                        { label: "時間", value: r.time, color: "#F5A623" },
                        { label: "プラン", value: r.plan, color: r.color },
                        { label: "ステータス", value: "確定", color: "#34d399" },
                        { label: "メール通知", value: "送信済み", color: "#60a5fa" },
                      ],
                    })} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] transition-colors cursor-pointer group active:scale-95">
                      <span className="text-[#F5A623] text-[10px] font-mono font-bold w-8 shrink-0">{r.time}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-white/60 text-[10px] font-medium truncate">{r.name}</div>
                        <div className="text-[8px] truncate" style={{ color: r.color }}>{r.plan}</div>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: r.color }} />
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-white/30 text-[9px]">合計</span>
                  <span className="text-[#F5A623] text-sm font-black">5件</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {[
                { label: "本日の予約", value: "5", color: "#34d399" },
                { label: "今月合計", value: "42", color: "#F5A623" },
                { label: "確認待ち", value: "3", color: "#60a5fa" },
                { label: "キャンセル", value: "1", color: "#ef4444" },
              ].map((s, i) => (
                <div key={i} onClick={() => setPopup({
                  title: s.label,
                  accent: s.color,
                  rows: i === 0 ? [
                    { label: "確定", value: "4件", color: "#34d399" },
                    { label: "仮予約", value: "1件", color: "#F5A623" },
                    { label: "次の予約", value: "14:00", color: "#60a5fa" },
                  ] : i === 1 ? [
                    { label: "前月比", value: "+8件", color: "#34d399" },
                    { label: "稼働率", value: "78%", color: "#F5A623" },
                  ] : i === 2 ? [
                    { label: "本日分", value: "1件", color: "#F5A623" },
                    { label: "明日分", value: "2件", color: "#60a5fa" },
                  ] : [
                    { label: "当日キャンセル", value: "0件", color: "#34d399" },
                    { label: "前日キャンセル", value: "1件", color: "#ef4444" },
                  ],
                })} className={`flex-1 rounded-lg px-2 md:px-3 py-1.5 md:py-2 flex items-center justify-between cursor-pointer hover:scale-[1.03] active:scale-95 transition-all ${i >= 2 ? "hidden md:flex" : ""}`}
                  style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}>
                  <span className="text-[10px] md:text-xs" style={{ color: `${s.color}90` }}>{s.label}</span>
                  <span className="text-base md:text-lg font-black" style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case 1: {
        const allCustomers = [
          { name: "山田 太郎", email: "yamada@...", visits: 12, last: "3/28", status: "VIP", color: "#F5A623", total: "¥98,400", phone: "090-xxxx-1234" },
          { name: "中村 裕子", email: "nakamu@...", visits: 15, last: "3/27", status: "VIP", color: "#F5A623", total: "¥123,000", phone: "090-xxxx-4567" },
          { name: "佐藤 花子", email: "sato@...", visits: 8, last: "3/25", status: "常連", color: "#34d399", total: "¥65,600", phone: "080-xxxx-5678" },
          { name: "田中 一郎", email: "tanaka@...", visits: 5, last: "3/20", status: "常連", color: "#34d399", total: "¥41,000", phone: "070-xxxx-9012" },
          { name: "鈴木 美咲", email: "suzuki@...", visits: 2, last: "3/15", status: "新規", color: "#60a5fa", total: "¥16,400", phone: "090-xxxx-3456" },
          { name: "高橋 健太", email: "takaha@...", visits: 1, last: "3/10", status: "新規", color: "#60a5fa", total: "¥8,200", phone: "080-xxxx-7890" },
        ];
        const tabLabels = ["全員", "VIP", "常連", "新規"];
        const tabFilters = ["", "VIP", "常連", "新規"];
        const filtered = customerTab === 0 ? allCustomers : allCustomers.filter(c => c.status === tabFilters[customerTab]);
        const tabCounts = [128, 18, 42, 68];
        return (
          <div className="w-full h-full flex flex-col gap-2.5 animate-fadeIn relative">
            <PopupOverlay />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center"><span className="text-blue-400 text-[11px] font-bold">顧</span></div>
                <div>
                  <span className="text-white/70 text-xs md:text-sm font-bold block leading-tight">顧客一覧</span>
                  <span className="text-white/25 text-[9px]">{tabCounts[customerTab]}件の顧客データ</span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-white/5 text-white/40 text-xs flex items-center gap-1.5 cursor-pointer hover:bg-white/10 transition-colors">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" /><path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  検索
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#F5A623]/20 text-[#F5A623] text-xs font-bold cursor-pointer hover:bg-[#F5A623]/30 transition-colors">+ 新規追加</div>
              </div>
            </div>
            <div className="flex gap-1.5">
              {tabLabels.map((label, i) => (
                <div key={i} onClick={() => { setCustomerTab(i); setPopup(null); }}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  customerTab === i ? "bg-white/10 text-white/70 shadow-sm" : "bg-white/[0.03] text-white/30 hover:bg-white/[0.06]"
                }`}>
                  {label} <span className="text-white/20 ml-0.5">{tabCounts[i]}</span>
                </div>
              ))}
            </div>
            <div className="flex-1 bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden">
              <div className="grid grid-cols-12 gap-2 px-4 py-2 border-b border-white/5 text-[10px] text-white/30 font-medium">
                <div className="col-span-3">お名前</div><div className="col-span-3 hidden md:block">メール</div><div className="col-span-2">来店回数</div><div className="col-span-2">最終来店</div><div className="col-span-2">ステータス</div>
              </div>
              {filtered.map((c, i) => (
                <div key={c.name} onClick={() => setPopup({
                  title: c.name,
                  accent: c.color,
                  rows: [
                    { label: "ステータス", value: c.status, color: c.color },
                    { label: "来店回数", value: `${c.visits}回`, color: "#F5A623" },
                    { label: "最終来店", value: c.last },
                    { label: "累計売上", value: c.total, color: "#34d399" },
                    { label: "電話番号", value: c.phone },
                    { label: "メール", value: c.email },
                  ],
                })} className="grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-white/[0.03] text-xs items-center cursor-pointer hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors group"
                  style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 transition-transform group-hover:scale-110" style={{ background: `${c.color}20`, color: c.color }}>{c.name[0]}</div>
                    <span className="text-white/70 font-medium truncate group-hover:text-white/90 transition-colors">{c.name}</span>
                  </div>
                  <div className="col-span-3 text-white/30 truncate hidden md:block">{c.email}</div>
                  <div className="col-span-2 text-white/50">{c.visits}回</div>
                  <div className="col-span-2 text-white/40">{c.last}</div>
                  <div className="col-span-2"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${c.color}15`, color: c.color }}>{c.status}</span></div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-white/20 text-xs">該当する顧客がありません</div>
              )}
            </div>
          </div>
        );
      }
      case 2:
        return (
          <div className="w-full h-full flex flex-col gap-2.5 animate-fadeIn relative">
            <PopupOverlay />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#F5A623]/20 flex items-center justify-center"><span className="text-[#F5A623] text-[11px] font-bold">売</span></div>
                <div>
                  <span className="text-white/70 text-xs md:text-sm font-bold block leading-tight">売上ダッシュボード</span>
                  <span className="text-white/25 text-[9px]">前年比 +12% 成長中</span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-white/5 text-white/40 text-xs cursor-pointer hover:bg-white/10 transition-colors">月次</div>
                <div className="px-3 py-1.5 rounded-lg bg-[#F5A623]/20 text-[#F5A623] text-xs font-bold">2026年3月</div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { label: "月間売上", value: "¥1,280,000", change: "+12%", color: "#F5A623", icon: "¥" },
                { label: "予約件数", value: "156件", change: "+8%", color: "#34d399", icon: "#" },
                { label: "客単価", value: "¥8,200", change: "+3%", color: "#60a5fa", icon: "~" },
                { label: "リピート率", value: "64%", change: "+5%", color: "#c084fc", icon: "%" },
              ].map((kpi, i) => (
                <div key={i} onClick={() => setPopup({
                  title: kpi.label,
                  accent: kpi.color,
                  rows: i === 0 ? [
                    { label: "今月", value: "¥1,280,000", color: "#F5A623" },
                    { label: "前月", value: "¥1,142,000" },
                    { label: "前年同月", value: "¥980,000" },
                    { label: "目標達成率", value: "107%", color: "#34d399" },
                  ] : i === 1 ? [
                    { label: "Web予約", value: "98件", color: "#34d399" },
                    { label: "LINE予約", value: "42件", color: "#06C755" },
                    { label: "電話予約", value: "16件" },
                    { label: "キャンセル", value: "4件", color: "#ef4444" },
                  ] : i === 2 ? [
                    { label: "スタンダード", value: "¥6,500" },
                    { label: "プレミアム", value: "¥12,800", color: "#F5A623" },
                    { label: "グループ", value: "¥5,200" },
                  ] : [
                    { label: "新規", value: "36%", color: "#60a5fa" },
                    { label: "2回目", value: "22%" },
                    { label: "3回以上", value: "42%", color: "#34d399" },
                  ],
                })} className="rounded-xl p-3 border cursor-pointer hover:scale-[1.03] active:scale-95 transition-all" style={{ background: `${kpi.color}08`, borderColor: `${kpi.color}20` }}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[10px]" style={{ color: `${kpi.color}80` }}>{kpi.label}</div>
                    <div className="text-green-400/70 text-[10px] font-bold bg-green-400/10 px-1.5 py-0.5 rounded">{kpi.change}</div>
                  </div>
                  <div className="text-base md:text-lg font-black" style={{ color: kpi.color }}>{kpi.value}</div>
                </div>
              ))}
            </div>
            <div className="flex-1 bg-white/[0.02] rounded-xl p-4 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-white/30">月別売上推移</span>
                <div className="flex gap-3">
                  <span className="text-[9px] text-white/20 flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#F5A623]/15 inline-block" />今年</span>
                </div>
              </div>
              <div className="flex items-end gap-1 md:gap-2 h-[calc(100%-24px)]">
                {[35, 55, 40, 70, 45, 65, 80, 50, 60, 75, 90, 68].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group cursor-pointer">
                    <div className="w-full rounded-t-md transition-all admin-bar-grow group-hover:opacity-100" style={{
                      height: `${h}%`,
                      background: i === 10 ? "#F5A623" : i >= 9 ? "rgba(245,166,35,0.4)" : "rgba(245,166,35,0.15)",
                      animationDelay: `${0.1 + i * 0.05}s`,
                    }} />
                    <span className="text-[8px] text-white/20 group-hover:text-white/50 transition-colors">{i + 1}月</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 3: {
        const allMenus = [
          { name: "島豚カレー", cat: "フード", stock: 85, status: "販売中", color: "#34d399", price: "¥1,200", orders: 14 },
          { name: "鶏飯セット", cat: "フード", stock: 45, status: "販売中", color: "#F5A623", price: "¥980", orders: 22 },
          { name: "パッションジュース", cat: "ドリンク", stock: 12, status: "残り少", color: "#ef4444", price: "¥550", orders: 8 },
          { name: "黒糖焼酎 れんと", cat: "ドリンク", stock: 8, status: "残り少", color: "#ef4444", price: "¥680", orders: 6 },
          { name: "刺身盛り合わせ", cat: "フード", stock: 70, status: "販売中", color: "#34d399", price: "¥1,800", orders: 11 },
          { name: "たんかんシャーベット", cat: "デザート", stock: 30, status: "販売中", color: "#F5A623", price: "¥450", orders: 18 },
        ];
        const invCats = ["すべて", "フード", "ドリンク", "デザート"];
        const filteredMenus = inventoryTab === 0 ? allMenus : allMenus.filter(m => m.cat === invCats[inventoryTab]);
        const lowStockCount = filteredMenus.filter(m => m.stock < 15).length;
        const activeCount = filteredMenus.filter(m => m.stock >= 15).length;
        return (
          <div className="w-full h-full flex flex-col gap-2.5 animate-fadeIn relative">
            <PopupOverlay />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center"><span className="text-green-400 text-[11px] font-bold">在</span></div>
                <div>
                  <span className="text-white/70 text-xs md:text-sm font-bold block leading-tight">在庫・メニュー管理</span>
                  <span className="text-white/25 text-[9px]">{filteredMenus.length}件表示</span>
                </div>
              </div>
              <div className="flex gap-2">
                {lowStockCount > 0 && (
                  <div className="px-2.5 py-1 rounded-lg bg-red-500/15 text-red-400 text-[10px] font-bold flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />残り少 {lowStockCount}件
                  </div>
                )}
                <div className="px-2.5 py-1 rounded-lg bg-green-500/15 text-green-400 text-[10px] font-bold hidden md:flex items-center gap-1">販売中 {activeCount}件</div>
              </div>
            </div>
            <div className="flex gap-1.5">
              {invCats.map((cat, i) => (
                <div key={cat} onClick={() => { setInventoryTab(i); setPopup(null); }}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  inventoryTab === i ? "bg-green-500/15 text-green-400 shadow-sm" : "bg-white/[0.03] text-white/30 hover:bg-white/[0.06]"
                }`}>{cat}</div>
              ))}
            </div>
            <div className="flex-1 bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden">
              <div className="grid grid-cols-12 gap-2 px-4 py-2 border-b border-white/5 text-[10px] text-white/30 font-medium">
                <div className="col-span-4">メニュー名</div><div className="col-span-2">カテゴリ</div><div className="col-span-3">在庫</div><div className="col-span-3">ステータス</div>
              </div>
              {filteredMenus.map((item, i) => (
                <div key={item.name} onClick={() => setPopup({
                  title: item.name,
                  accent: item.color,
                  rows: [
                    { label: "カテゴリ", value: item.cat },
                    { label: "在庫率", value: `${item.stock}%`, color: item.color },
                    { label: "ステータス", value: item.status, color: item.color },
                    { label: "価格", value: item.price, color: "#F5A623" },
                    { label: "本日の注文数", value: `${item.orders}件` },
                  ],
                })} className="grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-white/[0.03] text-xs items-center cursor-pointer hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors group">
                  <div className="col-span-4 text-white/70 font-medium group-hover:text-white/90 transition-colors">{item.name}</div>
                  <div className="col-span-2"><span className="text-white/30 text-[10px] bg-white/5 px-1.5 py-0.5 rounded">{item.cat}</span></div>
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full admin-bar-grow transition-all" style={{ width: `${item.stock}%`, background: item.color, animationDelay: `${0.2 + i * 0.08}s` }} />
                    </div>
                    <span className="text-white/40 text-[10px] w-8 text-right">{item.stock}%</span>
                  </div>
                  <div className="col-span-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${item.color}15`, color: item.color }}>{item.status}</span></div>
                </div>
              ))}
              {filteredMenus.length === 0 && (
                <div className="px-4 py-8 text-center text-white/20 text-xs">該当するメニューがありません</div>
              )}
            </div>
          </div>
        );
      }
      case 4:
        return (
          <div className="w-full h-full flex flex-col md:flex-row gap-2.5 animate-fadeIn relative">
            <PopupOverlay />
            <div className="flex-1 bg-[#06C755]/[0.03] rounded-xl border border-[#06C755]/10 p-3 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-[#06C755]/20 flex items-center justify-center"><span className="text-[#06C755] text-[11px] font-bold">L</span></div>
                <div>
                  <span className="text-white/70 text-xs md:text-sm font-bold block leading-tight">LINE Bot</span>
                  <span className="text-[#06C755]/50 text-[9px]">自動応答 稼働中</span>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#06C755] animate-pulse" />
                  <span className="text-[#06C755]/60 text-[10px]">LIVE</span>
                </div>
              </div>
              <div className="flex-1 space-y-2.5 overflow-hidden">
                <div className="flex gap-2"><div className="w-6 h-6 rounded-full bg-[#06C755]/20 shrink-0 mt-0.5 flex items-center justify-center text-[8px] text-[#06C755]/60">客</div><div className="bg-white/5 rounded-xl rounded-tl-none px-3 py-2 max-w-[75%]"><p className="text-white/50 text-[11px]">予約したいんですが</p><p className="text-white/20 text-[8px] mt-0.5">14:32</p></div></div>
                <div className="flex justify-end"><div className="bg-[#06C755]/15 rounded-xl rounded-tr-none px-3 py-2 max-w-[75%]"><p className="text-white/60 text-[11px]">ご予約ですね！日付を選んでください</p><div className="mt-1.5 grid grid-cols-3 gap-1">{["4/10","4/11","4/12"].map((d) => (<div key={d} className="text-center py-1 rounded-lg bg-[#06C755]/20 text-[#06C755] text-[9px] font-bold cursor-pointer hover:bg-[#06C755]/30 transition-colors">{d}</div>))}</div></div></div>
                <div className="flex gap-2"><div className="w-6 h-6 rounded-full bg-[#06C755]/20 shrink-0 mt-0.5 flex items-center justify-center text-[8px] text-[#06C755]/60">客</div><div className="bg-white/5 rounded-xl rounded-tl-none px-3 py-2"><p className="text-white/50 text-[11px]">4/11でお願いします</p><p className="text-white/20 text-[8px] mt-0.5">14:33</p></div></div>
                <div className="flex justify-end"><div className="bg-[#06C755]/15 rounded-xl rounded-tr-none px-3 py-2 max-w-[80%]"><p className="text-white/60 text-[11px]">4/11 14:00〜 で予約完了しました！</p><p className="text-[#06C755]/60 text-[10px] mt-0.5 flex items-center gap-1"><span>✓</span>確認メールをお送りしました</p></div></div>
              </div>
            </div>
            <div className="w-full md:w-48 space-y-2 shrink-0">
              {[
                { label: "今月の自動応答", value: "234", unit: "件", color: "#06C755" },
                { label: "予約成約率", value: "78", unit: "%", color: "#F5A623" },
                { label: "友だち数", value: "412", unit: "人", color: "#60a5fa" },
                { label: "応答速度", value: "0.8", unit: "秒", color: "#c084fc" },
              ].map((stat, i) => (
                <div key={i} onClick={() => setPopup({
                  title: stat.label,
                  accent: stat.color,
                  rows: i === 0 ? [
                    { label: "予約関連", value: "156件", color: "#06C755" },
                    { label: "問い合わせ", value: "52件" },
                    { label: "その他", value: "26件" },
                    { label: "前月比", value: "+18%", color: "#34d399" },
                  ] : i === 1 ? [
                    { label: "予約完了", value: "122件", color: "#34d399" },
                    { label: "途中離脱", value: "34件", color: "#ef4444" },
                    { label: "目標", value: "80%", color: "#F5A623" },
                  ] : i === 2 ? [
                    { label: "友だち合計", value: "412人", color: "#60a5fa" },
                    { label: "今月追加", value: "+28人", color: "#34d399" },
                    { label: "アクティブ", value: "389人" },
                    { label: "ブロック済み", value: "23人", color: "#ef4444" },
                  ] : [
                    { label: "平均", value: "0.8秒", color: "#c084fc" },
                    { label: "最速", value: "0.3秒", color: "#34d399" },
                    { label: "最遅", value: "2.1秒", color: "#F5A623" },
                  ],
                })} className="bg-white/[0.02] rounded-xl border border-white/5 p-3 cursor-pointer hover:bg-white/[0.04] active:scale-95 transition-all group">
                  <div className="text-[10px] text-white/30 mb-1 group-hover:text-white/50 transition-colors">{stat.label}</div>
                  <div className="text-xl font-black" style={{ color: stat.color }}>{stat.value}<span className="text-xs text-white/30 ml-1">{stat.unit}</span></div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex gap-2.5 animate-fadeIn relative">
            <PopupOverlay />
            <div className="w-36 md:w-44 bg-white/[0.02] rounded-xl border border-white/5 p-3 shrink-0 hidden md:flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#F5A623]/20 flex items-center justify-center text-[10px] text-[#F5A623] font-bold">TW</div>
                <span className="text-white/50 text-xs font-bold">管理パネル</span>
              </div>
              {[
                { label: "ダッシュボード", icon: "◉", active: true },
                { label: "予約一覧", icon: "◎" },
                { label: "顧客管理", icon: "◇" },
                { label: "売上レポート", icon: "◆" },
                { label: "設定", icon: "⚙" },
              ].map((item) => (
                <div key={item.label} className={`px-2 py-2 rounded-lg text-xs mb-0.5 flex items-center gap-2 cursor-pointer transition-all ${
                  item.active ? "bg-[#F5A623]/15 text-[#F5A623] font-bold" : "text-white/30 hover:text-white/50 hover:bg-white/[0.03]"
                }`}>
                  <span className="text-[10px]">{item.icon}</span>{item.label}
                </div>
              ))}
              <div className="mt-auto pt-3 border-t border-white/5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#F5A623]/20 flex items-center justify-center text-[9px] text-[#F5A623] font-bold">大</div>
                <div>
                  <div className="text-white/50 text-[10px] font-medium">作田 大地</div>
                  <div className="text-white/20 text-[8px]">管理者</div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white/70 text-sm font-bold block">ダッシュボード</span>
                  <span className="text-white/25 text-[9px]">最終更新 2分前</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-[#F5A623]/20 text-[#F5A623] text-[10px] font-bold cursor-pointer hover:bg-[#F5A623]/30 transition-colors">+ 新規予約</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "本日の予約", val: "8件", c: "#F5A623" },
                  { label: "未対応", val: "2件", c: "#ef4444" },
                  { label: "今月の売上", val: "¥890K", c: "#34d399" },
                ].map((k, i) => (
                  <div key={i} className="rounded-xl p-2.5 border cursor-pointer hover:scale-[1.02] transition-all" style={{ background: `${k.c}08`, borderColor: `${k.c}20` }}>
                    <div className="text-[9px]" style={{ color: `${k.c}80` }}>{k.label}</div>
                    <div className="text-sm font-black mt-0.5" style={{ color: k.c }}>{k.val}</div>
                  </div>
                ))}
              </div>
              <div className="flex-1 bg-white/[0.02] rounded-xl border border-white/5 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-white/30 font-medium">直近の予約</span>
                  <span className="text-[9px] text-[#F5A623]/50 cursor-pointer hover:text-[#F5A623]/80 transition-colors">すべて見る →</span>
                </div>
                {[
                  { time: "14:00", name: "山田様", type: "スタンダード", status: "confirmed" },
                  { time: "15:30", name: "佐藤様", type: "プレミアム", status: "confirmed" },
                  { time: "17:00", name: "田中様", type: "スタンダード", status: "pending" },
                ].map((r, i) => (
                  <div key={i} onClick={() => setPopup({
                    title: `${r.name}の予約`,
                    accent: r.status === "confirmed" ? "#34d399" : "#F5A623",
                    rows: [
                      { label: "時間", value: r.time, color: "#F5A623" },
                      { label: "プラン", value: r.type },
                      { label: "人数", value: `${i + 2}名` },
                      { label: "ステータス", value: r.status === "confirmed" ? "確定" : "仮予約", color: r.status === "confirmed" ? "#34d399" : "#F5A623" },
                      { label: "備考", value: i === 2 ? "アレルギーあり" : "なし" },
                    ],
                  })} className="flex items-center gap-3 py-2 border-b border-white/[0.03] last:border-0 cursor-pointer hover:bg-white/[0.03] active:bg-white/[0.06] rounded-lg transition-colors px-1 -mx-1 group">
                    <span className="text-[#F5A623] text-xs font-mono font-bold w-10">{r.time}</span>
                    <span className="text-white/60 text-xs flex-1 group-hover:text-white/80 transition-colors">{r.name}</span>
                    <span className="text-white/25 text-[10px]">{r.type}</span>
                    <span className={`w-2 h-2 rounded-full ${r.status === "confirmed" ? "bg-green-400" : "bg-yellow-400 animate-pulse"}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };


  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 bg-gradient-to-b from-[#070f0a] to-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-12">
          <p className="text-[#2ECC71] font-medium tracking-[0.3em] text-xs mb-4">WORKS</p>
          <h2 className="text-3xl md:text-6xl font-black leading-tight">
            こんな<span className="text-[#2ECC71]">アプリ</span>、<br /><span className="text-white">つくれます。</span>
          </h2>
        </div>

        <div className="relative">
          <div
            className="rounded-2xl overflow-hidden border shadow-2xl shadow-black/50 transition-all duration-700 ease-in-out"
            style={{
              borderColor: isPreview ? "rgba(46,204,113,0.3)" : "rgba(255,255,255,0.1)",
              background: isPreview ? "#0f172a" : "#0d1117",
            }}
          >
            <div className="flex items-center px-4 py-2 md:py-3 border-b border-white/10 transition-colors duration-500"
              style={{ background: isPreview ? "#1e293b" : "#161b22" }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              {isPreview ? (
                <div className="ml-3 flex-1 flex items-center gap-2">
                  <div className="flex items-center bg-white/5 rounded-lg px-3 py-1 flex-1 max-w-md">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="mr-2 shrink-0"><path d="M8 1L4 5h8L8 1z" fill="rgba(40,200,64,0.6)" /><rect x="2" y="6" width="12" height="8" rx="1" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" /></svg>
                    <span className="text-white/40 text-xs font-mono truncate">https://your-app.tidaworks.com/{sys.file.replace(/\.\w+$/, "")}</span>
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-white/40 text-xs ml-4 font-mono">{sys.file}</span>
                  <div className="ml-auto flex items-center gap-2">
                    {buildStatus === "done" ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-green-400/80 text-xs font-mono">ビルド成功</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse" />
                        <span className="text-[#2ECC71]/70 text-xs font-mono">開発中...</span>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="relative h-[360px] md:h-[420px]">
              <div className="absolute inset-0 transition-all duration-600"
                style={{ opacity: isPreview ? 0 : 1, transform: isPreview ? "scale(0.95)" : "scale(1)" }}>
                <div className="p-5 md:p-6 font-mono text-xs md:text-sm h-full">
                  {sys.lines.slice(0, typedCount).map((line, i) => (
                    <div key={`${activeIdx}-${i}`} className="code-line-anim flex leading-7">
                      <span className="text-white/20 w-6 md:w-8 text-right mr-3 md:mr-4 select-none text-xs">{i + 1}</span>
                      <span className="text-white/80">{highlight(line)}</span>
                    </div>
                  ))}
                  {typedCount < sys.lines.length && (
                    <div className="flex leading-7">
                      <span className="text-white/20 w-6 md:w-8 text-right mr-3 md:mr-4 text-xs">{typedCount + 1}</span>
                      <span className="text-[#2ECC71] animate-pulse font-bold">▌</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute inset-0 transition-all duration-600 overflow-y-auto"
                style={{ opacity: isPreview ? 1 : 0, transform: isPreview ? "scale(1)" : "scale(1.05)", pointerEvents: isPreview ? "auto" : "none" }}>
                <div className="p-4 md:p-6">
                  {pcScreenUI(activeIdx)}
                </div>
              </div>
            </div>

            {!isPreview && (
              <>
                <div className="h-[2px] bg-white/5">
                  <div className="h-full transition-all duration-300 ease-out" style={{
                    width: `${progress * 100}%`,
                    background: buildStatus === "done" ? "#28c840" : "linear-gradient(90deg, #2ECC71, #27ae60)",
                  }} />
                </div>
                <div className="px-5 md:px-6 py-4 bg-[#0a0e14] border-t border-white/5 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-white/25">$</span>
                    {buildStatus === "done" ? (
                      <span className="text-green-400/90 terminal-result-anim">{sys.terminal}</span>
                    ) : buildStatus === "compiling" ? (
                      <span className="text-[#2ECC71]/70 flex items-center gap-2">
                        <span className="inline-block animate-spin">⟳</span> コンパイル中...
                      </span>
                    ) : (
                      <span className="text-white/30">waiting...</span>
                    )}
                  </div>
                </div>
              </>
            )}
            {isPreview && (
              <div className="px-5 md:px-6 py-3 bg-[#0f172a] border-t border-green-500/10 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400/80 text-xs font-bold">{sys.label}</span>
                </div>
                <span className="text-white/25 text-xs">|</span>
                <span className="text-white/40 text-xs">{sys.desc}</span>
              </div>
            )}
          </div>
        </div>

        {/* システム選択カード */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {systems.map((s, i) => {
            const isActive = i === activeIdx;
            const isDone = isActive && ["done", "preview"].includes(buildStatus);
            const isBuilding = isActive && ["typing", "compiling"].includes(buildStatus);
            const iconColor = isActive ? "#2ECC71" : "rgba(255,255,255,0.35)";
            const iconColorLight = isActive ? "rgba(46,204,113,0.5)" : "rgba(255,255,255,0.15)";
            const systemIcons: React.ReactNode[] = [
              <svg key="ic0" width="22" height="22" viewBox="0 0 28 28" fill="none">
                <rect x="3" y="5" width="22" height="20" rx="3" stroke={iconColor} strokeWidth="1.5" />
                <path d="M3 11h22" stroke={iconColor} strokeWidth="1.5" />
                <path d="M9 3v4M19 3v4" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
                <rect x="7" y="14.5" width="3.5" height="3" rx="0.5" fill={iconColor} opacity="0.7" />
                <rect x="12.25" y="14.5" width="3.5" height="3" rx="0.5" fill={iconColorLight} />
                <rect x="17.5" y="14.5" width="3.5" height="3" rx="0.5" fill={iconColorLight} />
                <rect x="7" y="19.5" width="3.5" height="3" rx="0.5" fill={iconColorLight} />
              </svg>,
              <svg key="ic1" width="22" height="22" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="10" r="4" stroke={iconColor} strokeWidth="1.5" />
                <path d="M6 23c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="21" cy="8" r="2.5" stroke={iconColorLight} strokeWidth="1.2" />
                <path d="M24 16c0-1.5-1-3-2.8-3.5" stroke={iconColorLight} strokeWidth="1.2" strokeLinecap="round" />
              </svg>,
              <svg key="ic2" width="22" height="22" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="16" width="4" height="8" rx="1" fill={iconColorLight} />
                <rect x="10" y="12" width="4" height="12" rx="1" fill={iconColor} opacity="0.5" />
                <rect x="16" y="8" width="4" height="16" rx="1" fill={iconColor} opacity="0.7" />
                <rect x="22" y="4" width="4" height="20" rx="1" fill={iconColor} opacity="0.9" />
                <path d="M5 14L11 10l6 2 6-6" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>,
              <svg key="ic3" width="22" height="22" viewBox="0 0 28 28" fill="none">
                <path d="M4 9l10-5 10 5-10 5L4 9z" stroke={iconColor} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M4 9v10l10 5V14" stroke={iconColor} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M24 9v10l-10 5V14" stroke={iconColor} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M14 14v10" stroke={iconColorLight} strokeWidth="1.2" />
                <path d="M9 6.5l10 5" stroke={iconColorLight} strokeWidth="1.2" />
              </svg>,
              <svg key="ic4" width="22" height="22" viewBox="0 0 28 28" fill="none">
                <path d="M4 13c0-5.523 4.477-9 10-9s10 3.477 10 9-4.477 9-10 9c-1.2 0-2.35-.15-3.4-.43L6 24v-4.68C4.74 17.52 4 15.4 4 13z" stroke={iconColor} strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="10" cy="13" r="1.2" fill={iconColor} opacity="0.7" />
                <circle cx="14" cy="13" r="1.2" fill={iconColor} opacity="0.7" />
                <circle cx="18" cy="13" r="1.2" fill={iconColor} opacity="0.7" />
              </svg>,
              <svg key="ic5" width="22" height="22" viewBox="0 0 28 28" fill="none">
                <rect x="3" y="4" width="22" height="20" rx="3" stroke={iconColor} strokeWidth="1.5" />
                <path d="M3 9h22" stroke={iconColor} strokeWidth="1.2" opacity="0.6" />
                <circle cx="6" cy="6.5" r="1" fill={iconColor} opacity="0.5" />
                <circle cx="9" cy="6.5" r="1" fill={iconColor} opacity="0.5" />
                <rect x="5" y="11.5" width="7" height="4" rx="1" stroke={iconColorLight} strokeWidth="1" />
                <rect x="5" y="17.5" width="7" height="4" rx="1" stroke={iconColorLight} strokeWidth="1" />
                <rect x="14" y="11.5" width="9" height="10" rx="1" stroke={iconColorLight} strokeWidth="1" />
              </svg>,
            ];
            const cardProgress = isBuilding
              ? buildStatus === "typing"
                ? (typedCount / systems[activeIdx].lines.length) * 0.85
                : 0.85
              : isDone ? 1 : 0;
            return (
              <button
                key={s.label}
                onClick={() => handleSelect(i)}
                className={`relative rounded-2xl text-left transition-all duration-300 overflow-hidden group ${
                  isActive
                    ? "shadow-[0_0_32px_rgba(46,204,113,0.1)] scale-[1.02]"
                    : "hover:scale-[1.01]"
                }`}
                style={{ transform: isActive ? "scale(1.02)" : undefined }}
              >
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-br from-[#2ECC71]/[0.12] via-[#2ECC71]/[0.04] to-transparent"
                    : "bg-gradient-to-br from-white/[0.04] to-white/[0.01] group-hover:from-white/[0.07] group-hover:to-white/[0.02]"
                }`} />
                <div className={`absolute inset-0 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? isBuilding ? "border-[#2ECC71]/50 system-card-pulse" : "border-[#2ECC71]/40"
                    : "border-white/[0.06] group-hover:border-white/[0.12]"
                }`} />

                <div className="relative p-3 md:p-5">
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive
                        ? "bg-[#2ECC71]/20 shadow-[0_0_16px_rgba(46,204,113,0.15)]"
                        : "bg-white/[0.05] group-hover:bg-white/[0.08]"
                    }`}>
                      {systemIcons[i]}
                    </div>
                    <div className="shrink-0">
                      {isDone ? (
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      ) : isBuilding ? (
                        <div className="w-5 h-5 rounded-full bg-[#2ECC71]/20 flex items-center justify-center system-status-spin">
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1a5 5 0 014.33 2.5" stroke="#2ECC71" strokeWidth="1.5" strokeLinecap="round" /></svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors" />
                      )}
                    </div>
                  </div>
                  <p className={`text-[13px] md:text-sm font-bold leading-snug transition-colors ${
                    isActive ? "text-[#2ECC71]" : "text-white/70 group-hover:text-white/90"
                  }`}>
                    {s.label}
                  </p>
                  <p className={`text-[11px] mt-0.5 leading-relaxed transition-colors hidden md:block ${
                    isActive ? "text-white/50" : "text-white/25 group-hover:text-white/35"
                  }`}>
                    {s.desc}
                  </p>
                </div>

                <div className="relative h-[2px] bg-white/[0.03]">
                  <div
                    className={`absolute left-0 top-0 h-full rounded-r transition-all ${
                      isDone ? "bg-green-400/70 duration-300" : "bg-[#2ECC71]/60 duration-1000"
                    }`}
                    style={{ width: `${cardProgress * 100}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-white/40 text-sm">
            「うちの場合はどうなる？」と思ったら、お気軽に
            <a href="#contact" className="text-[#2ECC71]/60 hover:text-[#2ECC71] transition-colors ml-1">ご相談ください</a>
          </p>
        </div>
      </div>
    </section>
  );
}
