"use client";

const monthlyData = [
  { month: "1月", value: 180000 },
  { month: "2月", value: 220000 },
  { month: "3月", value: 350000 },
  { month: "4月", value: 310000 },
  { month: "5月", value: 280000 },
  { month: "6月", value: 420000 },
  { month: "7月", value: 480000 },
  { month: "8月", value: 520000 },
  { month: "9月", value: 390000 },
  { month: "10月", value: 450000 },
  { month: "11月", value: 410000 },
  { month: "12月", value: 380000 },
];

const maxValue = 600000;

const todayBookings = [
  { time: "10:00", menu: "Cut", customer: "佐藤様", staff: "山田" },
  { time: "14:00", menu: "Color", customer: "田中様", staff: "佐々木" },
  { time: "17:00", menu: "Perm", customer: "高橋様", staff: "高橋" },
];

function Sidebar() {
  return (
    <div className="w-[180px] bg-[#0D9488] text-white flex flex-col flex-shrink-0 min-h-screen">
      <div className="px-5 py-5 flex items-center gap-2.5">
        <img src="/images/alpaca-logo.svg" alt="" className="w-8 h-8 brightness-0 invert" />
        <span className="font-black text-lg tracking-wide">ALPACA</span>
      </div>
      <nav className="flex-1 px-3 py-2">
        {[
          { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4", label: "ホーム", active: true },
          { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "予約管理", active: false },
          { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", label: "顧客管理", active: false },
          { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "売上管理", active: false },
          { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", label: "設定", active: false },
        ].map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${
              item.active ? "bg-white/20 font-semibold" : "hover:bg-white/10 text-white/80"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.icon} />
            </svg>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default function DashboardDemo() {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-[var(--font-noto-sans-jp)]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* トップバー */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-end px-6 gap-3">
          <button className="text-gray-400 hover:text-gray-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-black text-gray-900 mb-6">業務ダッシュボード</h1>

          {/* 月間売上グラフ */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-5">
            <h2 className="text-sm font-bold text-gray-800 mb-4">月間売上</h2>
            <div className="flex items-end gap-[6px] h-[200px]">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-gray-400 tabular-nums">¥{(d.value / 1000).toFixed(0)}k</span>
                  <div
                    className="w-full rounded-t bg-[#0D9488] min-h-[4px] transition-all"
                    style={{ height: `${(d.value / maxValue) * 170}px` }}
                  />
                  <span className="text-[10px] text-gray-500 mt-1">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* 本日の予約 */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-800 mb-4">本日の予約（3件）</h2>
              <div className="divide-y divide-gray-100">
                {todayBookings.map((b, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 tabular-nums">{`(${i + 1})`}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{b.time} {b.menu}</p>
                        <p className="text-xs text-gray-400">{b.customer}, {b.staff}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 tabular-nums">{b.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 顧客数 + 売上 */}
            <div className="space-y-5">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="text-sm font-bold text-gray-800 mb-2">顧客数</h2>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-gray-900 tabular-nums">520</span>
                  <span className="text-lg text-gray-500">人</span>
                </div>
                <span className="inline-block mt-2 text-xs font-semibold text-[#0D9488] bg-[#0D9488]/10 px-2 py-0.5 rounded">+5% 前月比</span>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="text-sm font-bold text-gray-800 mb-2">売上</h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-gray-900 tabular-nums">¥850,000</span>
                </div>
                <span className="inline-block mt-2 text-xs font-semibold text-[#0D9488] bg-[#0D9488]/10 px-2 py-0.5 rounded">+8% 前月比</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
