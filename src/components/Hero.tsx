"use client";

const barData = [180,220,350,310,280,420,480,520,390,450,410,380];
const barLabels = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

const calDots: Record<number, number> = {1:2,2:1,3:3,4:2,5:3,6:1,7:1,8:2,9:2,10:3,11:1,12:2,13:1,14:3,15:4,16:3,17:2,18:2,22:2,23:3,24:1,25:2,26:1,27:1,28:2,29:2,30:2,31:2};

function Sidebar({ active }: { active: string }) {
  const items = [
    { label: "ホーム", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" },
    { label: "予約管理", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "顧客管理", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    { label: "売上管理", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { label: "設定", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  ];
  return (
    <div className="w-[100px] bg-[#0D9488] text-white flex-shrink-0">
      <div className="px-2.5 py-3 flex items-center gap-1.5 border-b border-white/10">
        <img src="/images/alpaca-logo.svg" alt="" className="w-5 h-5 brightness-0 invert" />
        <span className="font-black text-[8px] tracking-wide">ALPACA</span>
      </div>
      <nav className="px-1.5 py-2">
        {items.map((item) => (
          <div key={item.label} className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[7px] mb-0.5 ${item.label === active ? "bg-white/20 font-bold" : "text-white/70"}`}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon}/></svg>
            {item.label}
          </div>
        ))}
      </nav>
    </div>
  );
}

function BrowserFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-300 bg-white shadow-lg">
      <div className="bg-gradient-to-b from-gray-200 to-gray-100 px-2.5 py-1.5 flex items-center gap-4">
        <div className="flex gap-1">
          <span className="w-[7px] h-[7px] rounded-full bg-[#FF5F57]" />
          <span className="w-[7px] h-[7px] rounded-full bg-[#FFBD2E]" />
          <span className="w-[7px] h-[7px] rounded-full bg-[#28C840]" />
        </div>
        <div className="text-[7px] text-gray-500 font-medium">{title}</div>
        <div className="flex-1" />
      </div>
      <div className="bg-gray-100 px-2.5 py-1 flex items-center gap-1.5">
        <div className="flex gap-1 text-gray-400">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </div>
        <div className="flex-1 bg-white rounded px-2 py-0.5 text-[7px] text-gray-400 flex items-center gap-1">
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          app.alpaca-amami.com
        </div>
      </div>
      {children}
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="flex min-h-[280px]">
      <Sidebar active="ホーム" />
      <div className="flex-1 bg-white p-3">
        <h2 className="text-[10px] font-black text-gray-900 mb-3">業務ダッシュボード</h2>

        {/* 月間売上グラフ */}
        <div className="border border-gray-200 rounded-lg p-2.5 mb-2.5">
          <p className="text-[7px] font-bold text-gray-800 mb-2">月間売上</p>
          <div className="flex items-end gap-[2px] h-[70px] mb-1">
            {barData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <span className="text-[4px] text-gray-400 mb-0.5">¥{v}k</span>
                <div className="w-full rounded-t bg-[#0D9488]" style={{ height: `${(v/600)*58}px` }} />
              </div>
            ))}
          </div>
          <div className="flex">
            {barLabels.map((l) => (
              <span key={l} className="flex-1 text-center text-[5px] text-gray-400">{l}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* 本日の予約 */}
          <div className="border border-gray-200 rounded-lg p-2.5">
            <p className="text-[7px] font-bold text-gray-800 mb-1.5">本日の予約（3件）</p>
            {[
              { n: "(1)", time: "10:00", menu: "Cut", who: "佐藤様, 山田" },
              { n: "(2)", time: "14:00", menu: "Color", who: "田中様, 佐々木" },
              { n: "(3)", time: "17:00", menu: "Perm", who: "高橋様, 高橋" },
            ].map((b) => (
              <div key={b.n} className="flex items-center py-1 border-b border-gray-50 last:border-0">
                <span className="text-[6px] text-gray-400 w-3">{b.n}</span>
                <div className="flex-1">
                  <p className="text-[6px] font-semibold text-gray-800">{b.time} {b.menu}</p>
                  <p className="text-[5px] text-gray-400">{b.who}</p>
                </div>
                <span className="text-[6px] text-gray-400 tabular-nums">{b.time}</span>
              </div>
            ))}
          </div>

          {/* KPI */}
          <div className="space-y-2">
            <div className="border border-gray-200 rounded-lg p-2.5">
              <p className="text-[6px] font-bold text-gray-800">顧客数</p>
              <p className="text-xl font-black text-gray-900 tabular-nums leading-tight">520<span className="text-[8px] font-normal text-gray-400">人</span></p>
              <span className="inline-block text-[5px] font-bold text-white bg-[#0D9488] px-1 py-0.5 rounded mt-1">+5% 前月比</span>
            </div>
            <div className="border border-gray-200 rounded-lg p-2.5">
              <p className="text-[6px] font-bold text-gray-800">売上</p>
              <p className="text-xl font-black text-gray-900 tabular-nums leading-tight">¥850,000</p>
              <span className="inline-block text-[5px] font-bold text-white bg-[#0D9488] px-1 py-0.5 rounded mt-1">+8% 前月比</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarScreen() {
  const days = ["日","月","火","水","木","金","土"];
  const cells: (number|null)[] = [];
  for (let i = 0; i < 1; i++) cells.push(null); // 2024年7月1日 = 月曜（日曜始まりなので1つ空ける）
  for (let d = 1; d <= 31; d++) cells.push(d);

  return (
    <div className="flex min-h-[280px]">
      <Sidebar active="予約管理" />
      <div className="flex-1 bg-white p-3 flex gap-2">
        {/* カレンダー */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[10px] font-black text-gray-900">予約管理カレンダー</h2>
          </div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-bold text-gray-800">2024年7月</p>
            <div className="flex gap-1">
              <span className="text-[8px] text-gray-400 cursor-pointer">◀</span>
              <span className="text-[8px] text-gray-400 cursor-pointer">▶</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-0">
            {days.map((d) => (
              <div key={d} className="text-center text-[6px] font-bold text-gray-500 py-0.5">{d}</div>
            ))}
            {cells.map((day, i) => {
              if (day === null) return <div key={`e${i}`} />;
              const dots = calDots[day] || 0;
              const isToday = day === 15;
              return (
                <div key={day} className={`text-center py-1 relative ${isToday ? "bg-[#0D9488]/10 rounded" : ""}`}>
                  <span className={`text-[7px] ${isToday ? "font-bold text-[#0D9488]" : "text-gray-700"}`}>{day}</span>
                  {dots > 0 && (
                    <div className="flex justify-center gap-[1px] mt-0.5">
                      {Array.from({length: Math.min(dots, 4)}).map((_, j) => (
                        <span key={j} className="w-[3px] h-[3px] rounded-full bg-[#0D9488]" />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* タイムライン */}
        <div className="w-[120px] border-l border-gray-100 pl-2">
          <p className="text-[7px] font-bold text-gray-800 mb-2">2024年7月15日(月)</p>
          {[
            { time: "10:00 - 11:00", menu: "Cut", who: "佐藤様, 山田", color: "#0D9488" },
            { time: "14:00 - 15:30", menu: "Color", who: "田中様, 佐々木", color: "#F59E0B" },
            { time: "17:00 - 18:00", menu: "Perm", who: "高橋様, 高橋", color: "#6366F1" },
          ].map((b) => (
            <div key={b.time} className="mb-2 border-l-2 pl-1.5 py-0.5" style={{ borderColor: b.color }}>
              <p className="text-[5px] text-gray-400">{b.time}</p>
              <p className="text-[7px] font-bold text-gray-800">{b.menu}</p>
              <p className="text-[5px] text-gray-400">{b.who}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-32 bg-[#FAFAFA] overflow-hidden">
      {/* 背景ロゴ — 見出しの真後ろに堂々と */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] pointer-events-none">
        <img src="/images/alpaca-logo.svg" alt="" className="w-[280px] md:w-[380px] h-auto opacity-[0.07]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* テキスト */}
        <div className="text-center mb-14 md:mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#0D9488] mb-5">奄美大島の業務システム開発</p>
          <h1 className="text-4xl md:text-[3.5rem] font-black leading-[1.15] text-gray-900 tracking-tight mb-5">
            業務を、仕組みで変える。
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-8">
            予約・顧客・売上管理をひとつに。<br />
            あなたの業務に合わせた専用システムを構築します。
          </p>
          <div className="flex items-center justify-center gap-5 mb-8">
            <a href="#contact" className="inline-block bg-[#0D9488] text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-[#0F766E] transition-all">
              無料で相談する
            </a>
            <a href="#services" className="inline-block text-gray-400 text-sm hover:text-gray-600 transition-colors">
              詳しく見る →
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["予約管理", "顧客管理", "売上集計", "在庫管理", "スタッフ管理", "ホームページ制作"].map((tag) => (
              <span key={tag} className="text-[11px] text-gray-400 border border-gray-200 rounded-full px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 2画面並び */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BrowserFrame title="業務ダッシュボード">
            <DashboardScreen />
          </BrowserFrame>
          <BrowserFrame title="予約管理カレンダー">
            <CalendarScreen />
          </BrowserFrame>
        </div>
      </div>
    </section>
  );
}
