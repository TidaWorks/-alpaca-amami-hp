"use client";

import { useState, useMemo } from "react";

/* ─── 型定義 ─── */
type Reservation = {
  id: number;
  name: string;
  phone: string;
  staff: string;
  menu: string;
  date: string; // "YYYY-MM-DD"
  startHour: number; // 9〜19
  duration: number; // 時間（1 or 1.5 or 2）
  note: string;
};

/* ─── 定数 ─── */
const STAFF = ["佐藤", "田中", "山本"];
const STAFF_COLORS: Record<string, string> = {
  "佐藤": "#8B5CF6",
  "田中": "#F59E0B",
  "山本": "#10B981",
};
const MENUS = ["カット", "カット + カラー", "カット + パーマ", "カラーのみ", "トリートメント", "ヘッドスパ"];
const HOURS = Array.from({ length: 11 }, (_, i) => i + 9); // 9〜19

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return `${d.getMonth() + 1}/${d.getDate()}（${days[d.getDay()]}）`;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

/* ─── ダミーデータ生成 ─── */
function generateDummyData(): Reservation[] {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const daysInMonth = getDaysInMonth(y, m);
  const names = ["鈴木さま", "高橋さま", "伊藤さま", "渡辺さま", "中村さま", "小林さま", "加藤さま", "吉田さま", "山田さま", "佐々木さま", "松本さま", "井上さま", "木村さま", "清水さま", "林さま"];
  const phones = ["080-1234-5678", "090-2345-6789", "070-3456-7890", "080-4567-8901", "090-5678-9012"];
  const data: Reservation[] = [];
  let id = 1;

  for (let day = 1; day <= daysInMonth; day++) {
    const dow = new Date(y, m, day).getDay();
    if (dow === 2) continue; // 火曜定休
    const count = Math.floor(Math.random() * 4) + 1; // 1〜4件/日
    for (let i = 0; i < count; i++) {
      const staff = STAFF[Math.floor(Math.random() * STAFF.length)];
      const menu = MENUS[Math.floor(Math.random() * MENUS.length)];
      const startHour = 9 + Math.floor(Math.random() * 9); // 9〜17
      const duration = menu.includes("+") ? 2 : menu === "トリートメント" || menu === "ヘッドスパ" ? 1 : 1;
      data.push({
        id: id++,
        name: names[Math.floor(Math.random() * names.length)],
        phone: phones[Math.floor(Math.random() * phones.length)],
        staff,
        menu,
        date: `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        startHour,
        duration,
        note: "",
      });
    }
  }
  return data;
}

/* ─── カレンダーコンポーネント ─── */
function Calendar({
  year, month, selectedDate, reservations, onSelect, onMonthChange,
}: {
  year: number;
  month: number;
  selectedDate: string;
  reservations: Reservation[];
  onSelect: (date: string) => void;
  onMonthChange: (delta: number) => void;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const days = ["日", "月", "火", "水", "木", "金", "土"];

  const countByDate = useMemo(() => {
    const map: Record<string, number> = {};
    reservations.forEach(r => { map[r.date] = (map[r.date] || 0) + 1; });
    return map;
  }, [reservations]);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => onMonthChange(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h3 className="text-sm font-semibold text-gray-700">{year}年 {month + 1}月</h3>
        <button onClick={() => onMonthChange(1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {days.map(d => (
          <div key={d} className="text-center text-[10px] font-medium text-gray-400 py-1">{d}</div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const count = countByDate[dateStr] || 0;
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === today();
          const dow = new Date(year, month, day).getDay();
          const isClosed = dow === 2; // 火曜定休

          return (
            <button
              key={day}
              onClick={() => !isClosed && onSelect(dateStr)}
              className={`relative p-1.5 rounded-lg text-xs transition-all ${
                isClosed
                  ? "text-gray-300 cursor-default"
                  : isSelected
                  ? "bg-violet-500 text-white shadow-sm shadow-violet-200"
                  : isToday
                  ? "bg-violet-50 text-violet-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>{day}</span>
              {count > 0 && !isClosed && (
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-[2px]`}>
                  {Array.from({ length: Math.min(count, 4) }).map((_, j) => (
                    <span key={j} className={`w-1 h-1 rounded-full ${isSelected ? "bg-white/70" : "bg-violet-300"}`} />
                  ))}
                </span>
              )}
              {isClosed && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] text-gray-300">休</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── 新規予約モーダル ─── */
function NewReservationModal({
  date, onClose, onAdd,
}: {
  date: string;
  onClose: () => void;
  onAdd: (r: Omit<Reservation, "id">) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [staff, setStaff] = useState(STAFF[0]);
  const [menu, setMenu] = useState(MENUS[0]);
  const [hour, setHour] = useState(10);
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!name) return;
    onAdd({
      name: name + "さま",
      phone: phone || "未登録",
      staff,
      menu,
      date,
      startHour: hour,
      duration: menu.includes("+") ? 2 : 1,
      note,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-gray-800">新規予約 — {formatDate(date)}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[11px] text-gray-500 mb-1">お名前</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="山田" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400" />
          </div>
          <div>
            <label className="block text-[11px] text-gray-500 mb-1">電話番号</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="080-XXXX-XXXX" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">担当</label>
              <select value={staff} onChange={e => setStaff(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400">
                {STAFF.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">時間</label>
              <select value={hour} onChange={e => setHour(Number(e.target.value))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400">
                {HOURS.map(h => <option key={h} value={h}>{h}:00</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[11px] text-gray-500 mb-1">メニュー</label>
            <select value={menu} onChange={e => setMenu(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400">
              {MENUS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] text-gray-500 mb-1">メモ</label>
            <input value={note} onChange={e => setNote(e.target.value)} placeholder="（任意）" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400" />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            キャンセル
          </button>
          <button onClick={handleSubmit} disabled={!name} className="flex-1 py-2.5 rounded-lg bg-violet-500 text-white text-sm font-semibold hover:bg-violet-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-violet-200">
            予約を追加
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── タイムラインコンポーネント ─── */
function Timeline({
  reservations, selectedDate, onDelete,
}: {
  reservations: Reservation[];
  selectedDate: string;
  onDelete: (id: number) => void;
}) {
  const dayReservations = reservations
    .filter(r => r.date === selectedDate)
    .sort((a, b) => a.startHour - b.startHour);

  return (
    <div className="relative">
      <div className="space-y-0">
        {HOURS.map(hour => {
          const slotReservations = dayReservations.filter(r => r.startHour === hour);
          return (
            <div key={hour} className="flex gap-3 group">
              <div className="w-12 text-right text-[11px] text-gray-400 py-2.5 flex-shrink-0 tabular-nums">
                {hour}:00
              </div>
              <div className="flex-1 border-t border-gray-100 min-h-[48px] py-1.5">
                {slotReservations.map(r => (
                  <div
                    key={r.id}
                    className="group/card relative rounded-lg px-3 py-2 mb-1 border-l-[3px] transition-all hover:shadow-md cursor-default"
                    style={{
                      borderLeftColor: STAFF_COLORS[r.staff] || "#8B5CF6",
                      backgroundColor: `${STAFF_COLORS[r.staff] || "#8B5CF6"}08`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700">{r.name}</span>
                        <span className="text-[10px] text-gray-400">{r.menu}</span>
                      </div>
                      <button
                        onClick={() => onDelete(r.id)}
                        className="opacity-0 group-hover/card:opacity-100 text-gray-300 hover:text-red-400 transition-all p-0.5"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[10px] text-gray-400">担当: {r.staff}</span>
                      <span className="text-[10px] text-gray-400">{r.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── メインページ ─── */
export default function ReservationDemo() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState(today());
  const [reservations, setReservations] = useState<Reservation[]>(() => generateDummyData());
  const [showModal, setShowModal] = useState(false);

  const dayCount = reservations.filter(r => r.date === selectedDate).length;
  const monthCount = reservations.filter(r => r.date.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)).length;

  const handleMonthChange = (delta: number) => {
    let m = month + delta;
    let y = year;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setMonth(m);
    setYear(y);
  };

  const handleAdd = (r: Omit<Reservation, "id">) => {
    setReservations(prev => [...prev, { ...r, id: Date.now() }]);
  };

  const handleDelete = (id: number) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-[var(--font-noto-sans-jp)]">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-800">予約管理</h1>
              <p className="text-[10px] text-gray-400">Hair Salon Demo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">今月 {monthCount}件</span>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左カラム: カレンダー + サマリー */}
          <div className="lg:w-[300px] flex-shrink-0 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100/80">
              <Calendar
                year={year}
                month={month}
                selectedDate={selectedDate}
                reservations={reservations}
                onSelect={setSelectedDate}
                onMonthChange={handleMonthChange}
              />
            </div>

            {/* スタッフ凡例 */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100/80">
              <p className="text-[11px] text-gray-400 font-medium mb-3">スタッフ</p>
              <div className="space-y-2">
                {STAFF.map(s => {
                  const count = reservations.filter(r => r.date === selectedDate && r.staff === s).length;
                  return (
                    <div key={s} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: STAFF_COLORS[s] }} />
                        <span className="text-xs text-gray-600">{s}</span>
                      </div>
                      <span className="text-[10px] text-gray-400">{count}件</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 新規予約ボタン */}
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-3 rounded-xl bg-violet-500 text-white text-sm font-semibold hover:bg-violet-600 transition-colors shadow-sm shadow-violet-200 flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              新規予約
            </button>
          </div>

          {/* 右カラム: タイムライン */}
          <div className="flex-1">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-gray-800">{formatDate(selectedDate)}</h2>
                  <p className="text-[11px] text-gray-400 mt-0.5">{dayCount}件の予約</p>
                </div>
              </div>

              {dayCount === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-gray-300 text-sm">この日の予約はありません</p>
                  <button onClick={() => setShowModal(true)} className="mt-3 text-violet-400 text-xs hover:text-violet-600 transition-colors">
                    + 予約を追加する
                  </button>
                </div>
              ) : (
                <Timeline reservations={reservations} selectedDate={selectedDate} onDelete={handleDelete} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* モーダル */}
      {showModal && (
        <NewReservationModal
          date={selectedDate}
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}
