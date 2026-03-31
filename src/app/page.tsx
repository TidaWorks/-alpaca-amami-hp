"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── ピコピコ数字コンポーネント ─── */
function ScrambleDigit({ style, delay, className }: { style: React.CSSProperties; delay: number; className: string }) {
  const [char, setChar] = useState("0");
  const chars = "0123456789ABCDEF";

  useEffect(() => {
    const interval = setInterval(() => {
      setChar(chars[Math.floor(Math.random() * chars.length)]);
    }, 300 + Math.random() * 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={className}
      style={{ ...style, animationDelay: `${delay}s` }}
    >
      {char}
    </span>
  );
}

/* ─── マスコットSVGキャラ（フル作り込み版） ─── */
function MascotSVG({ isSlashing, isComplete }: { isSlashing: boolean; isComplete: boolean }) {
  const [blink, setBlink] = useState(false);

  // まばたき（ランダム間隔）
  useEffect(() => {
    const doBlink = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
      const next = 2000 + Math.random() * 4000;
      const timer = setTimeout(doBlink, next);
      return timer;
    };
    const timer = setTimeout(doBlink, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg viewBox="0 0 140 200" fill="none" className="w-full h-auto">
      <defs>
        {/* PC画面のグラデーション */}
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        {/* 影 */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
        </filter>
        {/* オレンジグロー */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── 足元の影 ── */}
      <ellipse cx="70" cy="192" rx="28" ry="5" fill="#000" opacity="0.2" className="mascot-shadow" />

      {/* ── 全体：呼吸アニメーション ── */}
      <g className={`mascot-breathe ${isComplete ? "mascot-celebrate" : ""}`}>

        {/* ── 左足 ── */}
        <g className={isSlashing ? "mascot-leg-brace" : ""}>
          <path d="M52 170 L49 184" stroke="#1a1a1a" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M52 170 L49 184" stroke="#4a4a5a" strokeWidth="7" fill="none" strokeLinecap="round" />
          {/* 靴 */}
          <path d="M39 180 Q43 178 49 178 Q55 178 57 180 L57 186 Q57 189 53 189 L39 189 Q36 189 36 186 Z"
            fill="#333" stroke="#1a1a1a" strokeWidth="2" />
          <path d="M39 183 L57 183" stroke="#444" strokeWidth="1" />
        </g>

        {/* ── 右足 ── */}
        <g className={isSlashing ? "mascot-leg-brace" : ""}>
          <path d="M82 170 L85 184" stroke="#1a1a1a" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M82 170 L85 184" stroke="#4a4a5a" strokeWidth="7" fill="none" strokeLinecap="round" />
          {/* 靴 */}
          <path d="M77 180 Q81 178 85 178 Q91 178 95 180 L95 186 Q95 189 91 189 L77 189 Q74 189 74 186 Z"
            fill="#333" stroke="#1a1a1a" strokeWidth="2" />
          <path d="M77 183 L95 183" stroke="#444" strokeWidth="1" />
        </g>

        {/* ── ズボン ── */}
        <path d="M46 148 L43 172 L61 172 L67 160 L73 172 L91 172 L88 148 Z"
          fill="#4a4a5a" stroke="#1a1a1a" strokeWidth="2.5" />
        <line x1="67" y1="150" x2="67" y2="172" stroke="#3a3a4a" strokeWidth="1.5" />

        {/* ── Tシャツ（胴体） ── */}
        <path d="M42 102 Q42 97 50 97 L84 97 Q92 97 92 102 L94 150 Q94 154 88 154 L46 154 Q40 154 40 150 Z"
          fill="#F5A623" stroke="#1a1a1a" strokeWidth="2.5" />
        {/* 襟元 */}
        <path d="M56 97 L62 105 L67 105 L73 97" fill="#E09510" stroke="#1a1a1a" strokeWidth="1.5" />
        {/* Tシャツテキスト */}
        <text x="67" y="126" textAnchor="middle" fill="#C07A10" fontSize="9" fontWeight="900" fontFamily="sans-serif">TIDA</text>
        <text x="67" y="139" textAnchor="middle" fill="#C07A10" fontSize="8" fontWeight="800" fontFamily="sans-serif">WORKS</text>
        {/* シワの線 */}
        <path d="M50 110 Q55 112 50 118" stroke="#E09510" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M84 115 Q80 117 83 122" stroke="#E09510" strokeWidth="1" fill="none" opacity="0.6" />

        {/* ── 左腕 ── */}
        <g className="mascot-arm-left">
          <path d="M42 104 Q30 120 28 138" stroke="#1a1a1a" strokeWidth="11" fill="none" strokeLinecap="round" />
          <path d="M42 104 Q30 120 28 138" stroke="#F5A623" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* 手 */}
          <circle cx="28" cy="140" r="6" fill="#D4956A" stroke="#1a1a1a" strokeWidth="2" />
          {/* 指 */}
          <line x1="23" y1="138" x2="21" y2="134" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="26" y1="136" x2="24" y2="132" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="135" x2="29" y2="131" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* ── 右腕（メインアニメーション） ── */}
        <g className={`mascot-arm-right ${isSlashing ? "mascot-arm-slash" : isComplete ? "mascot-arm-victory" : "mascot-arm-idle"}`}>
          <path d="M92 104 Q104 118 102 136" stroke="#1a1a1a" strokeWidth="11" fill="none" strokeLinecap="round" />
          <path d="M92 104 Q104 118 102 136" stroke="#F5A623" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* 手 */}
          <circle cx="102" cy="138" r="6" fill="#D4956A" stroke="#1a1a1a" strokeWidth="2" />

          {/* ── ノートPC ── */}
          <g filter="url(#shadow)">
            {/* 画面 */}
            <rect x="82" y="136" width="34" height="22" rx="3" fill="url(#screenGrad)" stroke="#555" strokeWidth="1.5" />
            {/* 画面の中身: コードライン（アニメーション） */}
            <g className="mascot-screen-code">
              <line x1="86" y1="142" x2="96" y2="142" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" className="mascot-code-line-1" />
              <line x1="86" y1="146" x2="108" y2="146" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" className="mascot-code-line-2" />
              <line x1="86" y1="150" x2="102" y2="150" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" className="mascot-code-line-3" />
              <line x1="86" y1="154" x2="98" y2="154" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" className="mascot-code-line-4" />
            </g>
            {/* カメラ */}
            <circle cx="99" cy="138" r="1" fill="#555" />
            {/* ベゼル下のロゴ */}
            <circle cx="99" cy="156" r="1.5" fill="#444" opacity="0.5" />
            {/* キーボード部分 */}
            <path d="M80 158 L118 158 L116 163 Q116 165 114 165 L84 165 Q82 165 82 163 Z"
              fill="#aaa" stroke="#888" strokeWidth="1" />
            <line x1="86" y1="160" x2="112" y2="160" stroke="#999" strokeWidth="0.5" />
            <line x1="86" y1="162" x2="112" y2="162" stroke="#999" strokeWidth="0.5" />
          </g>
        </g>

        {/* ── 首 ── */}
        <rect x="60" y="90" width="14" height="9" rx="3" fill="#D4956A" stroke="#1a1a1a" strokeWidth="2" />

        {/* ── 頭（まばたき・表情アニメーション） ── */}
        <g className="mascot-head">
          {/* 耳（顔の後ろ） */}
          <ellipse cx="42" cy="66" rx="5" ry="7" fill="#D4956A" stroke="#1a1a1a" strokeWidth="2.5" />
          <ellipse cx="42" cy="66" rx="2.5" ry="4" fill="#C0845A" opacity="0.5" />
          <ellipse cx="92" cy="66" rx="5" ry="7" fill="#D4956A" stroke="#1a1a1a" strokeWidth="2.5" />
          <ellipse cx="92" cy="66" rx="2.5" ry="4" fill="#C0845A" opacity="0.5" />

          {/* 顔 */}
          <ellipse cx="67" cy="64" rx="26" ry="28" fill="#D4956A" stroke="#1a1a1a" strokeWidth="2.5" />

          {/* 髪（メイン） */}
          <g className="mascot-hair">
            <path d="M41 58 Q41 32 67 26 Q93 32 93 58 L90 64 Q86 52 67 48 Q48 52 44 64 Z"
              fill="#2D2017" stroke="#1a1a1a" strokeWidth="2.5" />
            {/* 前髪のディテール（ツンツン） */}
            <path d="M48 48 Q50 38 54 44" fill="#2D2017" stroke="#2D2017" strokeWidth="1" />
            <path d="M56 44 Q59 34 62 42" fill="#2D2017" stroke="#2D2017" strokeWidth="1" />
            <path d="M66 42 Q70 32 74 40" fill="#2D2017" stroke="#2D2017" strokeWidth="1" />
            <path d="M76 44 Q80 36 82 46" fill="#2D2017" stroke="#2D2017" strokeWidth="1" />
            {/* ハイライト */}
            <path d="M55 40 Q60 36 65 38" stroke="#4A3525" strokeWidth="1.5" fill="none" opacity="0.4" />
          </g>

          {/* ほっぺ */}
          <ellipse cx="48" cy="72" rx="6" ry="4" fill="#E8845C" opacity="0.45" />
          <ellipse cx="86" cy="72" rx="6" ry="4" fill="#E8845C" opacity="0.45" />

          {/* 眉 */}
          <g className={isSlashing ? "mascot-brow-determined" : ""}>
            <path d={isSlashing ? "M52 52 Q56 49 60 51" : "M52 53 Q56 51 60 53"}
              stroke="#2D2017" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d={isSlashing ? "M74 51 Q78 49 82 52" : "M74 53 Q78 51 82 53"}
              stroke="#2D2017" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>

          {/* 目 */}
          <g>
            {isComplete ? (
              <>
                {/* にっこり目 */}
                <path d="M54 60 Q57 55 60 60" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M74 60 Q77 55 80 60" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </>
            ) : blink ? (
              <>
                {/* まばたき */}
                <line x1="53" y1="60" x2="61" y2="60" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="73" y1="60" x2="81" y2="60" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* 通常の目 */}
                <ellipse cx="57" cy="60" rx="4" ry="4.5" fill="white" stroke="#1a1a1a" strokeWidth="1.5" />
                <circle cx="58" cy="59" r="2.5" fill="#1a1a1a" />
                <circle cx="59" cy="58" r="1" fill="white" />
                <ellipse cx="77" cy="60" rx="4" ry="4.5" fill="white" stroke="#1a1a1a" strokeWidth="1.5" />
                <circle cx="78" cy="59" r="2.5" fill="#1a1a1a" />
                <circle cx="79" cy="58" r="1" fill="white" />
              </>
            )}
          </g>

          {/* 鼻 */}
          <ellipse cx="67" cy="68" rx="1.5" ry="1" fill="#B07850" />

          {/* 口 */}
          {isComplete ? (
            <g>
              <path d="M59 76 Q67 84 75 76" stroke="#1a1a1a" strokeWidth="2" fill="white" strokeLinecap="round" />
              <path d="M62 78 Q67 80 72 78" fill="#E85C5C" opacity="0.7" />
            </g>
          ) : isSlashing ? (
            <g>
              <ellipse cx="67" cy="77" rx="5" ry="4" fill="#1a1a1a" />
              <ellipse cx="67" cy="76" rx="3" ry="2" fill="#E85C5C" opacity="0.5" />
            </g>
          ) : (
            <path d="M60 76 Q67 80 74 76" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
          )}
        </g>

        {/* ── スラッシュ時のエフェクト（集中線的なやつ） ── */}
        {isSlashing && (
          <g className="mascot-slash-fx">
            <line x1="10" y1="80" x2="30" y2="90" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <line x1="8" y1="100" x2="25" y2="105" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1="12" y1="120" x2="28" y2="118" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          </g>
        )}

        {/* ── 完了時の星エフェクト ── */}
        {isComplete && (
          <g className="mascot-stars">
            <text x="20" y="50" fontSize="14" className="mascot-star-1">&#x2728;</text>
            <text x="110" y="45" fontSize="12" className="mascot-star-2">&#x2B50;</text>
            <text x="15" y="90" fontSize="10" className="mascot-star-3">&#x2728;</text>
            <text x="115" y="95" fontSize="11" className="mascot-star-4">&#x2728;</text>
          </g>
        )}
      </g>
    </svg>
  );
}

/* ─── ぐにゃぐにゃタイトル（落下＋ホバー） ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function WobblyText({ text, className = "", lineDelay = 0 }: { text: string; className?: string; lineDelay?: number }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [landed, setLanded] = useState<Set<number>>(new Set());
  const seeds = text.split("").map((_, i) => ({
    delay: seededRandom(i * 3 + 1) * 0.5,
    rotate: (seededRandom(i * 3 + 2) - 0.5) * 25,
    dropDistance: -(80 + seededRandom(i * 3 + 3) * 60),
  }));

  const getNeighborStyle = useCallback((i: number): React.CSSProperties => {
    if (hoveredIdx === null) return {};
    const dist = Math.abs(i - hoveredIdx);
    if (dist === 0) {
      return {
        transform: "translateY(-12px) rotate(-6deg) scale(1.15)",
        color: "#F5A623",
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease",
      };
    }
    if (dist === 1) {
      const dir = i < hoveredIdx ? 1 : -1;
      return {
        transform: `translateY(-6px) rotate(${dir * 3}deg) scale(1.05)`,
        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s",
      };
    }
    if (dist === 2) {
      return {
        transform: "translateY(-2px)",
        transition: "transform 0.4s ease 0.1s",
      };
    }
    return {};
  }, [hoveredIdx]);

  return (
    <span className={className}>
      {text.split("").map((c, i) => (
        <span
          key={`${c}${i}`}
          className={`hero-char ${landed.has(i) ? "" : "hero-char-drop"}`}
          style={{
            ...getNeighborStyle(i),
            ...(landed.has(i) ? {} : {
              animationDelay: `${lineDelay + seeds[i].delay}s`,
              "--drop-rotate": `${seeds[i].rotate}deg`,
              "--drop-distance": `${seeds[i].dropDistance}px`,
            }),
          } as React.CSSProperties}
          onAnimationEnd={() => setLanded((prev) => new Set(prev).add(i))}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {c}
        </span>
      ))}
    </span>
  );
}

/* ─── LINE風チャットアニメーション ─── */

/* チャットの台本 */
type ChatEvent =
  | { type: "user"; text: string }
  | { type: "typing"; duration: number }
  | { type: "tida"; text: string }
  | { type: "app"; label: string; color: string; appIdx: number }
  | { type: "pause"; duration: number };

const chatScript: ChatEvent[] = [
  { type: "user", text: "予約ページって作れますか？" },
  { type: "typing", duration: 1200 },
  { type: "tida", text: "もちろん。" },
  { type: "app", label: "Web予約システム", color: "#F5A623", appIdx: 0 },
  { type: "pause", duration: 1000 },
  { type: "user", text: "顧客管理も楽にしたいんだけど" },
  { type: "typing", duration: 1000 },
  { type: "app", label: "顧客管理アプリ", color: "#4A90D9", appIdx: 1 },
  { type: "pause", duration: 1000 },
  { type: "user", text: "売上の集計、自動でできる？" },
  { type: "typing", duration: 1200 },
  { type: "tida", text: "お任せください。" },
  { type: "app", label: "売上ダッシュボード", color: "#2ECC71", appIdx: 2 },
  { type: "pause", duration: 1000 },
  { type: "user", text: "スマホからも見れるとうれしい" },
  { type: "typing", duration: 800 },
  { type: "tida", text: "対応してます。" },
  { type: "app", label: "スマホ対応", color: "#E74C8B", appIdx: 3 },
];

/* 表示用メッセージ */
type DisplayMsg =
  | { side: "user"; text: string; key: number }
  | { side: "tida"; text: string; key: number }
  | { side: "app"; label: string; color: string; appIdx: number; key: number };

/* ミニアプリカード */
function MiniAppCard({ label, color, appIdx }: { label: string; color: string; appIdx: number }) {
  const appUIs = [
    // 0: 予約 — カレンダー
    <div key="a0" className="space-y-1">
      <div className="flex gap-1">{["月","火","水","木","金"].map((d) => <span key={d} className="flex-1 text-center text-[6px] text-white/30">{d}</span>)}</div>
      <div className="grid grid-cols-5 gap-[2px]">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className={`h-3 rounded-sm ${[2, 7, 11].includes(i) ? "" : "bg-white/5"}`}
            style={[2, 7, 11].includes(i) ? { background: `${color}40` } : {}} />
        ))}
      </div>
      <div className="h-4 rounded mt-1" style={{ background: `${color}30` }}>
        <div className="h-full flex items-center justify-center">
          <span className="text-[6px] font-bold" style={{ color }}>予約する</span>
        </div>
      </div>
    </div>,
    // 1: 顧客管理 — リスト
    <div key="a1" className="space-y-1">
      {[0, 1, 2, 3].map((r) => (
        <div key={r} className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: `${color}30` }} />
          <div className="flex-1">
            <div className="h-1.5 rounded bg-white/10 mb-0.5" style={{ width: `${60 + r * 10}%` }} />
            <div className="h-1 rounded bg-white/5" style={{ width: `${40 + r * 8}%` }} />
          </div>
          <div className="w-6 h-3 rounded text-[5px] flex items-center justify-center" style={{ background: r < 2 ? `${color}25` : "rgba(255,255,255,0.05)", color: r < 2 ? color : "rgba(255,255,255,0.3)" }}>
            {r < 2 ? "VIP" : ""}
          </div>
        </div>
      ))}
    </div>,
    // 2: 売上ダッシュボード — グラフ
    <div key="a2" className="space-y-1">
      <div className="flex items-center gap-1 mb-1">
        <div className="h-1 rounded flex-1" style={{ background: `${color}30` }} />
        <span className="text-[6px]" style={{ color }}>+24%</span>
      </div>
      <div className="flex items-end gap-[3px] h-10">
        {[35, 50, 40, 65, 45, 55, 80, 60, 70, 90].map((h, i) => (
          <div key={i} className="flex-1 rounded-t transition-all" style={{
            height: `${h}%`,
            background: i >= 8 ? color : `${color}30`,
          }} />
        ))}
      </div>
    </div>,
    // 3: スマホ対応 — フォンフレーム
    <div key="a3" className="flex items-center justify-center py-1">
      <div className="w-12 border border-white/15 rounded-lg p-1 relative" style={{ aspectRatio: "9/16" }}>
        <div className="w-4 h-0.5 bg-white/20 rounded-full mx-auto mb-1" />
        <div className="space-y-0.5">
          <div className="h-1.5 rounded" style={{ background: `${color}30` }} />
          <div className="h-1 rounded bg-white/5" />
          <div className="h-1 rounded bg-white/5 w-3/4" />
          <div className="h-3 rounded mt-0.5" style={{ background: `${color}20` }} />
          <div className="h-1 rounded bg-white/5" />
        </div>
      </div>
    </div>,
  ];

  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{ borderColor: `${color}30`, background: `${color}08` }}
    >
      {/* ヘッダー */}
      <div className="px-3 py-1.5 flex items-center gap-2" style={{ background: `${color}15` }}>
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="text-[10px] font-bold" style={{ color }}>{label}</span>
      </div>
      {/* ミニUI */}
      <div className="p-2.5">
        {appUIs[appIdx] || appUIs[0]}
      </div>
    </div>
  );
}

function HeroStoryAnimation() {
  const [messages, setMessages] = useState<DisplayMsg[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const timerIds = useRef<ReturnType<typeof setTimeout>[]>([]);
  const keyRef = useRef(0);
  const hasStarted = useRef(false);

  const clearTimers = () => { timerIds.current.forEach(clearTimeout); timerIds.current = []; };
  const addTimer = (fn: () => void, ms: number) => { timerIds.current.push(setTimeout(fn, ms)); };

  // チャット内だけ自動スクロール（ページ全体は動かさない）
  useEffect(() => {
    const chatContainer = chatEndRef.current?.parentElement;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, showTyping]);

  const startCycle = useCallback(() => {
    clearTimers();
    setMessages(() => []);
    setShowTyping(false);
    keyRef.current = 0;

    let t = 600;

    chatScript.forEach((event) => {
      switch (event.type) {
        case "user":
          addTimer(() => {
            const k = keyRef.current++;
            setMessages((prev) => [...prev, { side: "user", text: event.text, key: k }]);
          }, t);
          t += 600;
          break;
        case "typing":
          addTimer(() => setShowTyping(true), t);
          t += event.duration;
          addTimer(() => setShowTyping(false), t);
          break;
        case "tida":
          addTimer(() => {
            const k = keyRef.current++;
            setMessages((prev) => [...prev, { side: "tida", text: event.text, key: k }]);
          }, t);
          t += 400;
          break;
        case "app":
          addTimer(() => {
            const k = keyRef.current++;
            setMessages((prev) => [...prev, { side: "app", label: event.label, color: event.color, appIdx: event.appIdx, key: k }]);
          }, t);
          t += 600;
          break;
        case "pause":
          t += event.duration;
          break;
      }
    });

    // ループ
    t += 4000;
    addTimer(() => startCycle(), t);
  }, []);

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      startCycle();
    }
    return () => clearTimers();
  }, [startCycle]);

  return (
    <div ref={containerRef} className="w-full max-w-lg mx-auto">
      {/* チャットウィンドウ */}
      <div className="rounded-2xl border border-white/10 bg-[#111]/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/30">
        {/* ヘッダー */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="w-8 h-8 rounded-full bg-[#F5A623]/20 flex items-center justify-center">
            <span className="text-[#F5A623] text-[10px] font-black">T</span>
          </div>
          <div>
            <p className="text-white/80 text-xs font-bold">TIDA WORKS</p>
            <p className="text-[#2ECC71] text-[10px]">オンライン</p>
          </div>
        </div>

        {/* メッセージエリア */}
        <div className="h-[320px] md:h-[360px] overflow-y-auto px-4 py-4 space-y-3 chat-scroll">
          {messages.map((msg) => {
            if (msg.side === "user") {
              return (
                <div key={msg.key} className="flex justify-end" style={{ animation: "chatMsgIn 0.35s ease-out" }}>
                  <div className="bg-[#F5A623]/15 border border-[#F5A623]/20 rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[80%]">
                    <p className="text-white/80 text-sm">{msg.text}</p>
                  </div>
                </div>
              );
            }
            if (msg.side === "tida") {
              return (
                <div key={msg.key} className="flex justify-start" style={{ animation: "chatMsgIn 0.35s ease-out" }}>
                  <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[80%]">
                    <p className="text-white/70 text-sm">{msg.text}</p>
                  </div>
                </div>
              );
            }
            if (msg.side === "app") {
              return (
                <div key={msg.key} className="flex justify-start" style={{ animation: "chatAppPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                  <div className="max-w-[85%]">
                    <MiniAppCard label={msg.label} color={msg.color} appIdx={msg.appIdx} />
                  </div>
                </div>
              );
            }
            return null;
          })}

          {/* タイピングインジケーター */}
          {showTyping && (
            <div className="flex justify-start" style={{ animation: "chatMsgIn 0.25s ease-out" }}>
              <div className="bg-white/[0.06] rounded-2xl rounded-tl-md px-4 py-3 flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/30 typing-dot" style={{ animationDelay: "0s" }} />
                <span className="w-2 h-2 rounded-full bg-white/30 typing-dot" style={{ animationDelay: "0.15s" }} />
                <span className="w-2 h-2 rounded-full bg-white/30 typing-dot" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
}

/* ─── スクロールフェードインフック ─── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible, className: isVisible ? "visible" : "" };
}

/* ─── ビバップ風コラージュマーキー（ブランドカラー版） ─── */
function KeywordMarquee() {
  /* 背景テキスト：重ならないよう位置を明確に分離 */
  const bgWords = [
    { text: "SYSTEM", size: "text-[3rem] md:text-[9rem]", color: "text-white/[0.03]", top: "10%", left: "5%", rotate: "-3deg" },
    { text: "WORKS", size: "text-[2.5rem] md:text-[6rem]", color: "text-white/[0.03]", top: "55%", left: "50%", rotate: "2deg" },
  ];

  const topMarquee = [
    "予約管理", "顧客管理", "売上集計", "在庫管理", "シフト管理",
    "LINE連携", "ダッシュボード", "自動応答", "レポート", "データ分析",
  ];

  const bottomMarquee = [
    "24時間自動受付", "売上をリアルタイム把握", "顧客情報を一元管理",
    "ダブルブッキングゼロ", "ペーパーレス化", "スマホで完結",
    "データを活かす経営", "業務効率UP", "スタッフの負担軽減", "予約の取りこぼしゼロ",
  ];

  return (
    <section className="relative bg-[#080c16] overflow-hidden select-none" style={{ height: "clamp(200px, 40vw, 420px)" }}>
      {/* 薄いグリッド線 */}
      {[25, 50, 75].map((left) => (
        <div key={`v${left}`} className="absolute top-0 bottom-0 w-px bg-white/[0.03]" style={{ left: `${left}%` }} />
      ))}
      {[33, 66].map((top) => (
        <div key={`h${top}`} className="absolute left-0 right-0 h-px bg-white/[0.03]" style={{ top: `${top}%` }} />
      ))}

      {/* 背景の巨大テキスト（透過度を下げて背景に） */}
      {bgWords.map((w, i) => (
        <span
          key={i}
          className={`absolute font-black ${w.size} ${w.color} whitespace-nowrap leading-none pointer-events-none`}
          style={{ top: w.top, left: w.left, transform: `rotate(${w.rotate})` }}
        >
          {w.text}
        </span>
      ))}

      {/* 上部帯：白の薄い帯（できること一覧） */}
      <div className="absolute top-[12%] left-0 right-0 rotate-[1.5deg]">
        <div className="bg-white/[0.05] border-y border-white/[0.08] py-1.5 md:py-2 marquee-container">
          <div className="marquee-track marquee-left">
            {[...bottomMarquee, ...bottomMarquee, ...bottomMarquee, ...bottomMarquee].map((word, i) => (
              <span
                key={`m3-${i}`}
                className="inline-flex items-center gap-6 px-4 text-white/30 text-xs md:text-sm font-medium tracking-widest whitespace-nowrap"
              >
                {word}
                <span className="text-[#F5A623]/40">／</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* メイン帯：オレンジ（中央を横切る） */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 -rotate-[2deg]">
        <div className="relative">
          <div className="absolute inset-0 bg-[#F5A623]/20 blur-xl translate-y-1" />
          <div className="relative bg-[#F5A623] py-3 md:py-4 marquee-container shadow-[0_0_40px_rgba(245,166,35,0.25)]">
            <div className="marquee-track marquee-right-fast">
              {[...topMarquee, ...topMarquee, ...topMarquee, ...topMarquee].map((word, i) => (
                <span
                  key={`m-${i}`}
                  className="inline-flex items-center gap-4 md:gap-6 px-3 md:px-5 text-black text-sm md:text-2xl font-black tracking-wide whitespace-nowrap"
                >
                  <span className="text-black/20 text-xs">◆</span>
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 下部帯：グリーン（ポジティブな結果） */}
      <div className="absolute bottom-[14%] left-0 right-0 rotate-[1.5deg]">
        <div className="relative">
          <div className="absolute inset-0 bg-[#2ECC71]/10 blur-lg" />
          <div className="relative bg-[#2ECC71]/90 py-2 md:py-2.5 marquee-container">
            <div className="marquee-track marquee-left-fast">
              {[...bottomMarquee, ...bottomMarquee, ...bottomMarquee, ...bottomMarquee].map((word, i) => (
                <span
                  key={`m2-${i}`}
                  className="inline-flex items-center gap-6 px-4 text-black/80 text-xs md:text-sm font-bold tracking-widest whitespace-nowrap"
                >
                  {word}
                  <span className="text-black/20">→</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── セコセコ人間アニメーション ─── */
type BusyPhase = "walkToDesk" | "typing" | "walkToPapers" | "lookPapers" | "walkToPhone" | "phoneCall" | "walkToCenter" | "stressed";

const BUSY_PHASES: { phase: BusyPhase; duration: number; x: number }[] = [
  { phase: "walkToDesk",   duration: 1400, x: -90 },
  { phase: "typing",       duration: 2800, x: -90 },
  { phase: "walkToPapers", duration: 1200, x: -10 },
  { phase: "lookPapers",   duration: 2000, x: -10 },
  { phase: "walkToPhone",  duration: 1600, x: 120 },
  { phase: "phoneCall",    duration: 2500, x: 120 },
  { phase: "walkToCenter", duration: 1400, x: 0 },
  { phase: "stressed",     duration: 2200, x: 0 },
];

function BusyPersonSection() {
  const fade = useFadeIn();
  const [phaseIdx, setPhaseIdx] = useState(0);

  useEffect(() => {
    const current = BUSY_PHASES[phaseIdx];
    const timer = setTimeout(() => {
      setPhaseIdx((prev) => (prev + 1) % BUSY_PHASES.length);
    }, current.duration);
    return () => clearTimeout(timer);
  }, [phaseIdx]);

  const current = BUSY_PHASES[phaseIdx];
  const isWalking = current.phase.startsWith("walk");
  const isTyping = current.phase === "typing";
  const isPhone = current.phase === "phoneCall";
  const isLookPapers = current.phase === "lookPapers";
  const isStressed = current.phase === "stressed";

  const walkSpeed = "0.35s";
  const headAnim = isWalking ? `chibiHeadBob 0.6s ease-in-out infinite`
    : isTyping ? `chibiHeadTilt 2s ease-in-out infinite`
    : isStressed ? `chibiStressHead 0.8s ease-in-out infinite`
    : "none";

  const armLAnim = isWalking ? `chibiArmSwingL ${walkSpeed} ease-in-out infinite`
    : isTyping ? `chibiTypingL 0.4s ease-in-out infinite`
    : isPhone ? `chibiPhoneArm 1.5s ease-in-out infinite`
    : "none";

  const armRAnim = isWalking ? `chibiArmSwingR ${walkSpeed} ease-in-out infinite`
    : isTyping ? `chibiTypingR 0.4s ease-in-out infinite`
    : "none";

  const legLAnim = isWalking ? `chibiLegL ${walkSpeed} ease-in-out infinite` : "none";
  const legRAnim = isWalking ? `chibiLegR ${walkSpeed} ease-in-out infinite` : "none";
  const bounceAnim = isWalking ? `chibiBounce ${walkSpeed} ease-in-out infinite` : "none";

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#0a0a0a] to-[#0f0a14] text-white overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div ref={fade.ref} className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 transition-all duration-1000 ${fade.className}`}>
          {/* 左: テキスト */}
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-[#E74C8B]/60 text-xs tracking-[0.3em] mb-4 font-medium">BEFORE</p>
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

          {/* 右: アニメーション */}
          <div className="md:w-1/2 flex justify-center">
            <div className="busy-person-scene">
              <svg viewBox="0 0 500 310" fill="none" className="w-full h-full">
                {/* ─── 背景オブジェクト ─── */}

                {/* デスク（左） */}
                <rect x="25" y="240" width="120" height="7" rx="2" fill="#E0DDD8" stroke="#222" strokeWidth="2.5" />
                <rect x="38" y="247" width="6" height="45" rx="1" fill="#C8C4BE" stroke="#222" strokeWidth="2" />
                <rect x="135" y="247" width="6" height="45" rx="1" fill="#C8C4BE" stroke="#222" strokeWidth="2" />

                {/* PC */}
                <rect x="42" y="186" width="80" height="52" rx="5" fill="white" stroke="#222" strokeWidth="3" />
                <rect x="50" y="194" width="64" height="36" rx="2" fill="#D0D8E0" />
                <rect x="72" y="236" width="22" height="6" rx="1" fill="#C8C4BE" stroke="#222" strokeWidth="2" />
                <line x1="56" y1="205" x2="90" y2="205" stroke="#7A9BBE" strokeWidth="2" strokeLinecap="round" />
                <line x1="56" y1="212" x2="104" y2="212" stroke="#A0B0C0" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="56" y1="218" x2="98" y2="218" stroke="#B0BCC8" strokeWidth="1.5" strokeLinecap="round" />

                {/* 書類の山 */}
                <rect x="218" y="268" width="42" height="6" rx="2" fill="white" stroke="#222" strokeWidth="2" transform="rotate(-3 239 271)" />
                <rect x="216" y="261" width="44" height="6" rx="2" fill="white" stroke="#222" strokeWidth="2" transform="rotate(2 238 264)" />
                <rect x="219" y="254" width="40" height="6" rx="2" fill="white" stroke="#222" strokeWidth="2" transform="rotate(-1 239 257)" />

                {/* 電話 */}
                <g style={{ animation: isPhone ? "phoneRing 2s ease-in-out infinite" : "phoneRing 4s ease-in-out infinite", transformOrigin: "410px 255px" }}>
                  <rect x="393" y="248" width="34" height="20" rx="7" fill="#444" stroke="#222" strokeWidth="2.5" />
                  <rect x="400" y="253" width="20" height="10" rx="3" fill="#6BE0C8" stroke="#222" strokeWidth="1.5" />
                  {/* 電話の音波 — 電話フェーズで強調 */}
                  <path d="M431 244 Q437 256 431 268" stroke="#F5A623" strokeWidth="3" fill="none" strokeLinecap="round" opacity={isPhone ? "1" : "0.6"} />
                  <path d="M438 240 Q446 256 438 272" stroke="#F5A623" strokeWidth="2" fill="none" strokeLinecap="round" opacity={isPhone ? "0.7" : "0.3"} />
                </g>

                {/* コーヒー */}
                <path d="M355 250 L359 268 L373 268 L377 250 Z" fill="#A0704A" stroke="#222" strokeWidth="2.5" />
                <path d="M377 254 Q384 254 384 259 Q384 264 377 264" stroke="#222" strokeWidth="2.5" fill="none" />
                <path d="M363 246 Q365 238 363 230" stroke="#999" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
                <path d="M369 244 Q371 236 369 228" stroke="#999" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.35" />

                {/* 床 */}
                <line x1="0" y1="290" x2="500" y2="290" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                {/* ─── Givee風キャラ（フェーズ制） ─── */}
                <g style={{
                  transform: `translateX(${current.x}px)`,
                  transition: isWalking ? "transform 1.2s ease-in-out" : "transform 0.3s ease",
                }}>
                  <g style={{ animation: bounceAnim }}>

                    {/* 汗（ストレス時・歩行時に表示） */}
                    {(isWalking || isStressed) && (
                      <>
                        <g style={{ animation: "sweatPop 2s ease-out infinite", transformOrigin: "278px 68px" }}>
                          <path d="M278 62 L275 72 L278 72 L275 82" stroke="#5AC8FF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        </g>
                        <g style={{ animation: "sweatPop 2s ease-out infinite 1s", transformOrigin: "286px 75px" }}>
                          <path d="M286 72 L284 78 L286 78 L284 84" stroke="#5AC8FF" strokeWidth="2" fill="none" strokeLinecap="round" />
                        </g>
                      </>
                    )}

                    {/* ストレス時 — 「！」マーク */}
                    {isStressed && (
                      <g>
                        <text x="275" y="58" fill="#F5A623" fontSize="22" fontWeight="900" style={{ animation: "sweatPop 1.5s ease-out infinite" }}>！</text>
                      </g>
                    )}

                    {/* ── 頭 ── */}
                    <g style={{ animation: headAnim, transformOrigin: "250px 90px" }}>
                      {/* 髪 */}
                      <path d="M222 82 Q222 55 250 50 Q278 55 278 82 L275 88 Q270 80 250 78 Q230 80 225 88 Z"
                        fill="#222" stroke="#222" strokeWidth="2.5" />
                      {/* 顔 */}
                      <ellipse cx="250" cy="92" rx="26" ry="28" fill="white" stroke="#222" strokeWidth="3" />
                      {/* 目 */}
                      {isStressed ? (
                        <>
                          <text x="234" y="94" fill="#222" fontSize="10" fontWeight="900">×</text>
                          <text x="254" y="94" fill="#222" fontSize="10" fontWeight="900">×</text>
                        </>
                      ) : (
                        <>
                          <circle cx="240" cy="90" r="2.5" fill="#222" />
                          <circle cx="260" cy="90" r="2.5" fill="#222" />
                        </>
                      )}
                      {/* 眉 */}
                      <path d="M234 83 Q238 86 244 84" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <path d="M266 83 Q262 86 256 84" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      {/* 鼻 */}
                      <circle cx="250" cy="96" r="1" fill="#222" />
                      {/* 口 — フェーズで変化 */}
                      {isPhone ? (
                        <ellipse cx="250" cy="106" rx="5" ry="4" fill="#222" />
                      ) : isStressed ? (
                        <path d="M242 108 Q250 100 258 108" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
                      ) : (
                        <path d="M244 106 Q250 102 256 106" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
                      )}
                      {/* 耳 */}
                      <ellipse cx="224" cy="92" rx="4" ry="6" fill="white" stroke="#222" strokeWidth="2.5" />
                      <ellipse cx="276" cy="92" rx="4" ry="6" fill="white" stroke="#222" strokeWidth="2.5" />
                    </g>

                    {/* 首 */}
                    <rect x="244" y="118" width="12" height="8" rx="2" fill="white" stroke="#222" strokeWidth="2.5" />

                    {/* ── 体（スーツ） ── */}
                    <path d="M222 132 Q222 126 234 126 L266 126 Q278 126 278 132 L280 195 Q280 200 274 200 L226 200 Q220 200 220 195 Z"
                      fill="#2E6EB5" stroke="#222" strokeWidth="3" />
                    {/* ラペル左 */}
                    <path d="M234 126 L240 126 L250 145 L240 145 Z" fill="#3A82CC" stroke="#222" strokeWidth="2" />
                    {/* ラペル右 */}
                    <path d="M266 126 L260 126 L250 145 L260 145 Z" fill="#3A82CC" stroke="#222" strokeWidth="2" />
                    {/* ネクタイ */}
                    <path d="M246 140 L250 188 L254 140 Z" fill="#F0C830" stroke="#222" strokeWidth="2" />
                    <path d="M247 188 L250 196 L253 188 Z" fill="#E0B420" stroke="#222" strokeWidth="1.5" />

                    {/* 左腕 */}
                    <g style={{ animation: armLAnim, transformOrigin: "224px 134px" }}>
                      <path d="M222 134 Q210 155 208 175" stroke="#222" strokeWidth="12" fill="none" strokeLinecap="round" />
                      <path d="M222 134 Q210 155 208 175" stroke="#2E6EB5" strokeWidth="9" fill="none" strokeLinecap="round" />
                      <circle cx="208" cy="178" r="7" fill="white" stroke="#222" strokeWidth="2.5" />
                      <line x1="203" y1="175" x2="201" y2="172" stroke="#222" strokeWidth="2" strokeLinecap="round" />
                      <line x1="206" y1="173" x2="205" y2="169" stroke="#222" strokeWidth="2" strokeLinecap="round" />
                      <line x1="210" y1="172" x2="210" y2="168" stroke="#222" strokeWidth="2" strokeLinecap="round" />
                      <line x1="213" y1="174" x2="215" y2="170" stroke="#222" strokeWidth="2" strokeLinecap="round" />
                    </g>

                    {/* 右腕 */}
                    <g style={{ animation: armRAnim, transformOrigin: "276px 134px" }}>
                      <path d="M278 134 Q290 155 292 175" stroke="#222" strokeWidth="12" fill="none" strokeLinecap="round" />
                      <path d="M278 134 Q290 155 292 175" stroke="#2E6EB5" strokeWidth="9" fill="none" strokeLinecap="round" />
                      <circle cx="292" cy="178" r="7" fill="white" stroke="#222" strokeWidth="2.5" />
                      <line x1="287" y1="174" x2="285" y2="170" stroke="#222" strokeWidth="2" strokeLinecap="round" />
                      <line x1="290" y1="172" x2="290" y2="168" stroke="#222" strokeWidth="2" strokeLinecap="round" />
                      <line x1="294" y1="173" x2="295" y2="169" stroke="#222" strokeWidth="2" strokeLinecap="round" />
                      <line x1="297" y1="175" x2="299" y2="172" stroke="#222" strokeWidth="2" strokeLinecap="round" />
                    </g>

                    {/* ズボン */}
                    <path d="M224 198 L222 228 L244 228 L250 210 L256 228 L278 228 L276 198 Z"
                      fill="#444" stroke="#222" strokeWidth="3" />

                    {/* 左足 */}
                    <g style={{ animation: legLAnim, transformOrigin: "233px 228px" }}>
                      <path d="M233 228 L230 258" stroke="#222" strokeWidth="12" fill="none" strokeLinecap="round" />
                      <path d="M233 228 L230 258" stroke="#444" strokeWidth="9" fill="none" strokeLinecap="round" />
                      <path d="M220 254 L230 254 Q238 254 238 260 L238 264 L216 264 L216 260 Q216 256 220 254 Z"
                        fill="#333" stroke="#222" strokeWidth="2.5" />
                    </g>

                    {/* 右足 */}
                    <g style={{ animation: legRAnim, transformOrigin: "267px 228px" }}>
                      <path d="M267 228 L270 258" stroke="#222" strokeWidth="12" fill="none" strokeLinecap="round" />
                      <path d="M267 228 L270 258" stroke="#444" strokeWidth="9" fill="none" strokeLinecap="round" />
                      <path d="M260 254 L270 254 Q278 254 278 260 L278 264 L256 264 L256 260 Q256 256 260 254 Z"
                        fill="#333" stroke="#222" strokeWidth="2.5" />
                    </g>
                  </g>
                </g>

                {/* ひらひら書類 */}
                <g style={{ animation: "paperDrop 3.5s ease-out infinite", transformOrigin: "330px 200px" }}>
                  <rect x="324" y="195" width="20" height="26" rx="2" fill="white" stroke="#222" strokeWidth="2" transform="rotate(12 334 208)" />
                  <line x1="328" y1="204" x2="340" y2="204" stroke="#AAA" strokeWidth="2" strokeLinecap="round" />
                  <line x1="328" y1="210" x2="337" y2="210" stroke="#CCC" strokeWidth="1.5" strokeLinecap="round" />
                </g>
                <g style={{ animation: "paperDrop2 4s ease-out infinite 1.2s", transformOrigin: "170px 205px" }}>
                  <rect x="163" y="200" width="18" height="24" rx="2" fill="white" stroke="#222" strokeWidth="2" transform="rotate(-10 172 212)" />
                  <line x1="167" y1="208" x2="177" y2="208" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" />
                </g>
                <g style={{ animation: "paperDrop3 3s ease-out infinite 2.5s", transformOrigin: "300px 190px" }}>
                  <rect x="294" y="185" width="16" height="22" rx="2" fill="white" stroke="#222" strokeWidth="2" transform="rotate(18 302 196)" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ─── パララックス背景テキスト ─── */
function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * speed;
      ref.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return ref;
}

/* ─── ヘッダー ─── */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <img
            src="/images/名称未設定のデザイン (14).png"
            alt="TIDA WORKS ロゴ"
            className="h-12 w-auto"
          />
          <span>
            <span className="text-[#F5A623]">TIDA</span>{" "}
            <span className="text-white">WORKS</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { href: "#benefits", label: "選ばれる理由" },
            { href: "#services", label: "料金" },
            { href: "#flow", label: "ご利用の流れ" },
            { href: "#faq", label: "よくある質問" },
            { href: "#about", label: "会社概要" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white/70 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#F5A623] text-black font-bold px-5 py-2 rounded-full hover:bg-[#FFD700] transition-colors text-sm"
          >
            無料相談
          </a>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/5 px-6 pb-6 flex flex-col gap-4 text-sm">
          <a href="#benefits" onClick={() => setMenuOpen(false)} className="py-2 text-white/70">選ばれる理由</a>
          <a href="#services" onClick={() => setMenuOpen(false)} className="py-2 text-white/70">料金</a>
          <a href="#flow" onClick={() => setMenuOpen(false)} className="py-2 text-white/70">ご利用の流れ</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="py-2 text-white/70">よくある質問</a>
          <a href="#about" onClick={() => setMenuOpen(false)} className="py-2 text-white/70">会社概要</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="bg-[#F5A623] text-black font-bold text-center px-5 py-2 rounded-full">無料相談</a>
        </nav>
      )}
    </header>
  );
}

/* ─── ヒーロー ─── */
function Hero() {
  return (
    <section className="relative flex items-start pt-32 pb-16 md:pt-36 md:pb-24 bg-[#0a0a0a] text-white overflow-hidden">
      {/* 暖色グロー */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-40" style={{ background: "radial-gradient(circle, rgba(245,166,35,0.12), transparent 65%)" }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(245,166,35,0.06), transparent 65%)" }} />


      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:gap-12">
          {/* 左: テキスト */}
          <div className="md:w-full">
            {/* メインコピー */}
            <h1 className="text-[9.5vw] md:text-[8vw] font-black leading-[1.1] mb-8 md:mb-10 tracking-tight">
              <span className="text-white/80 whitespace-nowrap"><WobblyText text="「こんなアプリ、" lineDelay={0.2} /></span>
              <br />
              <span className="whitespace-nowrap"><WobblyText text="あったらいいな」" className="text-[#F5A623]" lineDelay={0.7} /><WobblyText text="を" className="text-white" lineDelay={1.1} /></span>
              <br />
              <span className="text-white whitespace-nowrap"><WobblyText text="カタチにします。" lineDelay={1.3} /></span>
            </h1>

            {/* サブコピー */}
            <p className="text-white/50 text-sm md:text-base max-w-lg leading-relaxed mb-6 animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
              予約・顧客・売上・在庫——バラバラだった業務をひとつに。
              <br />
              社内全体がつながる、あなた専用のシステム構築。
            </p>

            {/* CTA */}
            <div className="flex gap-3 md:gap-4 animate-[fadeInUp_0.8s_ease-out_0.6s_both] mt-5">
              <a
                href="#contact"
                className="bg-[#F5A623] text-black font-bold px-7 py-3.5 md:px-9 md:py-4 rounded-full text-sm md:text-base hover:bg-[#FFD700] transition-all hover:scale-105 shadow-lg shadow-[#F5A623]/20"
              >
                無料で相談する
              </a>
              <a
                href="#benefits"
                className="border border-white/20 text-white/70 hover:text-white hover:border-white/50 font-bold px-7 py-3.5 md:px-9 md:py-4 rounded-full text-sm md:text-base transition-all"
              >
                詳しく見る
              </a>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}

/* ─── 導入メリット — 横長カード・左右交互 ─── */
const benefits = [
  {
    number: "01",
    title: "あなた専用だから、使いやすい",
    description: "既製品のアプリじゃ痒いところに手が届かない。あなたのやりたいことに合わせてゼロから作るから、無駄な機能ゼロ、欲しい機能だけ。",
    keyword: "CUSTOM",
    accent: "#F5A623",
  },
  {
    number: "02",
    title: "業務が、まるごと見える化",
    description: "予約・顧客・売上・在庫——バラバラだった情報がひとつのシステムでつながります。今どうなってるか、いつでもすぐ確認できる。",
    keyword: "EFFICIENT",
    accent: "#4A90D9",
  },
  {
    number: "03",
    title: "ツライ作業から解放される",
    description: "電話対応、手書きの台帳、Excelの転記。毎日やってた作業をアプリに任せれば、あなたの時間がもっと自由になります。",
    keyword: "FREEDOM",
    accent: "#2ECC71",
  },
];

function Benefits() {
  return (
    <section id="benefits" className="relative py-16 md:py-32 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* セクションヘッダー — 左寄せ、大胆に */}
        <div className="mb-20">
          <p className="text-[#F5A623] font-medium tracking-[0.3em] text-xs mb-4">BENEFITS</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            選ばれる
            <br />
            <span className="text-white/50">3つの理由</span>
          </h2>
        </div>

        {/* カード — 左右交互レイアウト */}
        <div className="space-y-24 md:space-y-32">
          {benefits.map((b, i) => {
            const fade = useFadeIn();
            const isReversed = i % 2 === 1;
            return (
              <div
                key={b.number}
                ref={fade.ref}
                className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-start gap-8 md:gap-16`}
              >
                {/* 数字 + キーワード */}
                <div className={`md:w-1/3 flex-shrink-0 benefit-number ${fade.className}`}>
                  <span
                    className="text-[8rem] md:text-[10rem] font-black leading-none block"
                    style={{ color: b.accent, opacity: 0.15 }}
                  >
                    {b.number}
                  </span>
                  <p
                    className="text-xs font-bold tracking-[0.4em] -mt-8 ml-2"
                    style={{ color: b.accent, opacity: 0.6 }}
                  >
                    {b.keyword}
                  </p>
                </div>

                {/* テキスト */}
                <div className={`md:w-2/3 md:pt-12 ${isReversed ? "benefit-text-reverse" : "benefit-text"} ${fade.className}`}>
                  <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-snug">
                    {b.title}
                  </h3>
                  <div className={`w-16 h-[2px] mb-6 line-grow ${fade.className}`} style={{ background: b.accent }} />
                  <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-xl">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── パララックス背景テキストコンポーネント ─── */
function ParallaxText({ children }: { children: React.ReactNode }) {
  const ref = useParallax(0.15);
  return (
    <div ref={ref} className="absolute top-[10%] left-[-3%] text-[15vw] font-black text-white/[0.015] leading-none select-none tracking-tighter parallax-text">
      {children}
    </div>
  );
}

/* ─── 料金 ─── */
function Services() {
  const fade1 = useFadeIn();
  const fade2 = useFadeIn();
  const fade3 = useFadeIn();
  const fade4 = useFadeIn();

  return (
    <section id="services" className="relative py-16 md:py-32 bg-[#111] text-white overflow-hidden">
      <ParallaxText>
        PRI
        <br />
        CE
      </ParallaxText>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-20">
          <p className="text-[#F5A623] font-medium tracking-[0.3em] text-xs mb-4">PRICING</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            料金
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-xl leading-relaxed">
            ホームページ制作からシステム開発まで。規模やご要望に合わせて柔軟に対応します。
          </p>
        </div>

        {/* ホームページ制作 */}
        <div ref={fade1.ref} className={`border border-white/10 rounded-2xl p-8 md:p-12 mb-8 transition-all duration-700 ${fade1.className}`}>
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-1/2">
              <p className="text-[#4A90D9] text-xs tracking-[0.3em] font-medium mb-3">WEB DESIGN</p>
              <h3 className="text-3xl md:text-5xl font-black mb-4">ホームページ制作</h3>
              <p className="text-[#4A90D9] text-2xl md:text-3xl font-black">
                ¥150,000<span className="text-lg font-medium text-white/40">〜</span>
              </p>
            </div>
            <div className="md:w-1/2">
              <p className="text-white/60 text-base leading-relaxed mb-6">
                お店や会社の顔となるホームページを制作します。スマホ対応はもちろん、お問い合わせフォームやアクセスマップなど必要な機能をまとめて。
              </p>
              <div className="space-y-3">
                {[
                  "店舗サイト・コーポレートサイト・LP制作",
                  "スマホ・タブレット完全対応",
                  "お問い合わせフォーム・Googleマップ設置",
                  "基本的なSEO設定（タイトル・メタ情報）込み",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-[#4A90D9] mt-1 text-sm">&#10003;</span>
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* システム開発 */}
        <div ref={fade2.ref} className={`border border-[#F5A623]/20 rounded-2xl p-8 md:p-12 mb-8 transition-all duration-700 relative overflow-hidden ${fade2.className}`}>
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-1/2">
              <p className="text-[#F5A623] text-xs tracking-[0.3em] font-medium mb-3">SYSTEM DEVELOPMENT</p>
              <h3 className="text-3xl md:text-5xl font-black mb-4">オーダーメイド<br />システム開発</h3>
              <p className="text-[#F5A623] text-2xl md:text-3xl font-black">
                ¥300,000<span className="text-lg font-medium text-white/40">〜</span>
              </p>
            </div>
            <div className="md:w-1/2">
              <p className="text-white/60 text-base leading-relaxed mb-6">
                予約管理、顧客管理、売上集計、LINE予約・自動応答まで。業務を丸ごとシステム化して、あなたの時間を取り戻します。
              </p>
              <div className="space-y-3">
                {[
                  "ヒアリングからデザイン・開発・納品まで一貫対応",
                  "LINE予約システム・自動応答Bot構築",
                  "スマホ対応・管理画面・印刷機能など柔軟に",
                  "納品後の操作説明・導入サポート付き",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-[#F5A623] mt-1 text-sm">&#10003;</span>
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 保守サポート */}
        <div ref={fade3.ref} className={`border border-white/10 rounded-2xl p-8 md:p-12 mb-8 transition-all duration-700 ${fade3.className}`}>
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="md:w-1/2">
              <p className="text-[#2ECC71] text-xs tracking-[0.3em] font-medium mb-3">MAINTENANCE & SUPPORT</p>
              <h3 className="text-3xl md:text-4xl font-black mb-4">保守・運用サポート</h3>
              <p className="text-[#2ECC71] text-2xl md:text-3xl font-black">
                ¥12,000<span className="text-lg font-medium text-white/40">/月〜</span>
              </p>
            </div>
            <div className="md:w-1/2">
              <p className="text-white/60 text-base leading-relaxed mb-6">
                納品後も安心。サーバー・ドメイン管理からちょっとした修正まで、月額でまるごとお任せください。自社で運用できるなら不要です。
              </p>
              <div className="space-y-3">
                {[
                  "サーバー・ドメイン代込み",
                  "バグ修正・不具合対応",
                  "小さな変更・テキスト修正",
                  "電話・メールでの相談対応",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-[#2ECC71] mt-1 text-sm">&#10003;</span>
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/30 text-xs mt-6 leading-relaxed">
                ※ 大幅な仕様変更や機能実装がある場合は、別途お見積りとなります。
              </p>
            </div>
          </div>
        </div>

        {/* 注釈 */}
        <div ref={fade4.ref} className={`text-white/30 text-xs leading-relaxed mt-6 space-y-1 transition-all duration-700 ${fade4.className}`}>
          <p>※ 料金は案件の規模・機能数によって変動します。お見積りは無料です。</p>
          <p>※ 保守サポートは任意です。自社で運用される場合は不要です。</p>
          <p>※ 大規模な機能追加は別途お見積りとなります。</p>
        </div>
      </div>
    </section>
  );
}

/* ─── 強み — IDE風コードタイピング演出 ─── */
type PopupData = { title: string; rows: { label: string; value: string; color?: string }[]; accent: string } | null;

function Strengths() {
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

  // ビルド完了 → プレビュー表示（自動遷移なし、クリックで切り替え）
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

  // シンタックスハイライト（Reactエレメントで返す）
  const highlight = (line: string): React.ReactNode => {
    if (line.startsWith("//"))
      return <span style={{ color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>{line}</span>;

    // トークン分割
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
          {/* 閉じるボタン */}
          <button onClick={() => setPopup(null)} className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white/70 transition-all text-xs">✕</button>
          {/* タイトル */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${popup.accent}20` }}>
              <span className="text-sm font-bold" style={{ color: popup.accent }}>{popup.title[0]}</span>
            </div>
            <div>
              <h4 className="text-white/90 text-sm font-bold">{popup.title}</h4>
            </div>
          </div>
          {/* 詳細行 */}
          <div className="space-y-2.5">
            {popup.rows.map((row, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                <span className="text-white/40 text-xs">{row.label}</span>
                <span className="text-sm font-bold" style={{ color: row.color || "rgba(255,255,255,0.8)" }}>{row.value}</span>
              </div>
            ))}
          </div>
          {/* アクションボタン */}
          <div className="flex gap-2 mt-4">
            <button className="flex-1 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-80" style={{ background: `${popup.accent}20`, color: popup.accent }}>編集</button>
            <button onClick={() => setPopup(null)} className="flex-1 py-2 rounded-lg bg-white/5 text-white/40 text-xs font-bold hover:bg-white/10 transition-all">閉じる</button>
          </div>
        </div>
      </div>
    );
  };

  // システムごとのフルサイズ・ブラウザプレビューUI
  const pcScreenUI = (idx: number) => {
    switch (idx) {
      case 0: { // Web予約システム — カレンダー付き予約画面
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
            {/* ヘッダーバー */}
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
            {/* メイン：カレンダー＋サイドパネル */}
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
              {/* サイドパネル */}
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
            {/* 下部のサマリー */}
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
      case 1: { // 顧客管理 — テーブルUI
        const allCustomers = [
          { name: "山田 太郎", email: "yamada@...", visits: 12, last: "3/28", status: "VIP", color: "#F5A623", total: "¥98,400", phone: "090-xxxx-1234" },
          { name: "中村 裕子", email: "nakamu@...", visits: 15, last: "3/27", status: "VIP", color: "#F5A623", total: "¥123,000", phone: "090-xxxx-4567" },
          { name: "佐藤 花子", email: "sato@...", visits: 8, last: "3/25", status: "常連", color: "#34d399", total: "¥65,600", phone: "080-xxxx-5678" },
          { name: "田中 一郎", email: "tanaka@...", visits: 5, last: "3/20", status: "常連", color: "#34d399", total: "¥41,000", phone: "070-xxxx-9012" },
          { name: "鈴木 美咲", email: "suzuki@...", visits: 2, last: "3/15", status: "新規", color: "#60a5fa", total: "¥16,400", phone: "090-xxxx-3456" },
          { name: "高橋 健太", email: "takaha@...", visits: 1, last: "3/10", status: "新規", color: "#60a5fa", total: "¥8,200", phone: "080-xxxx-7890" },
        ];
        // タブ: 0=全員, 1=VIP, 2=常連, 3=新規
        const tabLabels = ["全員", "VIP", "常連", "新規"];
        const tabFilters = ["", "VIP", "常連", "新規"];
        const filtered = customerTab === 0 ? allCustomers : allCustomers.filter(c => c.status === tabFilters[customerTab]);
        // 件数: VIP=18, 常連=42, 新規=68 → 合計128
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
      case 2: // 売上ダッシュボード — グラフ＋KPI
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
            {/* KPIカード */}
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
            {/* 棒グラフ */}
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
      case 3: { // 在庫・メニュー管理
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
        // 整合性: フード3件, ドリンク2件, デザート1件 = 合計6件表示 / 全32メニュー中
        // 残り少 = stock < 15 → 2件（パッション12%, 焼酎8%）
        // 販売中 = 4件
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
            {/* カテゴリタブ */}
            <div className="flex gap-1.5">
              {invCats.map((cat, i) => (
                <div key={cat} onClick={() => { setInventoryTab(i); setPopup(null); }}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  inventoryTab === i ? "bg-green-500/15 text-green-400 shadow-sm" : "bg-white/[0.03] text-white/30 hover:bg-white/[0.06]"
                }`}>{cat}</div>
              ))}
            </div>
            {/* メニュー一覧 */}
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
      case 4: // LINE連携 — Bot管理画面風
        return (
          <div className="w-full h-full flex flex-col md:flex-row gap-2.5 animate-fadeIn relative">
            <PopupOverlay />
            {/* 左: チャットプレビュー */}
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
            {/* 右: Bot統計 */}
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
      default: // スタッフ用管理画面 — サイドバー＋コンテンツ
        return (
          <div className="w-full h-full flex gap-2.5 animate-fadeIn relative">
            <PopupOverlay />
            {/* サイドバー */}
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
              ].map((item, i) => (
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
            {/* メインコンテンツ */}
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
              {/* ミニKPI */}
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
              {/* 直近の予約リスト */}
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
        {/* ヘッダー */}
        <div className="mb-12">
          <p className="text-[#2ECC71] font-medium tracking-[0.3em] text-xs mb-4">WORKS</p>
          <h2 className="text-3xl md:text-6xl font-black leading-tight">
            こんな<span className="text-[#2ECC71]">アプリ</span>、<br /><span className="text-white">つくれます。</span>
          </h2>
        </div>

        {/* IDE ⇄ ブラウザプレビュー コンテナ */}
        <div className="relative">
          <div
            className="rounded-2xl overflow-hidden border shadow-2xl shadow-black/50 transition-all duration-700 ease-in-out"
            style={{
              borderColor: isPreview ? "rgba(46,204,113,0.3)" : "rgba(255,255,255,0.1)",
              background: isPreview ? "#0f172a" : "#0d1117",
            }}
          >
            {/* タイトルバー — IDE / ブラウザ切り替え */}
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

            {/* コンテンツエリア — コード or プレビュー */}
            <div className="relative h-[360px] md:h-[420px]">
              {/* IDE コードエリア */}
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

              {/* ブラウザプレビューエリア */}
              <div className="absolute inset-0 transition-all duration-600 overflow-y-auto"
                style={{ opacity: isPreview ? 1 : 0, transform: isPreview ? "scale(1)" : "scale(1.05)", pointerEvents: isPreview ? "auto" : "none" }}>
                <div className="p-4 md:p-6">
                  {pcScreenUI(activeIdx)}
                </div>
              </div>
            </div>

            {/* プログレスバー / ステータスバー */}
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
              // 0: Web予約システム — カレンダー
              <svg key="ic0" width="22" height="22" viewBox="0 0 28 28" fill="none">
                <rect x="3" y="5" width="22" height="20" rx="3" stroke={iconColor} strokeWidth="1.5" />
                <path d="M3 11h22" stroke={iconColor} strokeWidth="1.5" />
                <path d="M9 3v4M19 3v4" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
                <rect x="7" y="14.5" width="3.5" height="3" rx="0.5" fill={iconColor} opacity="0.7" />
                <rect x="12.25" y="14.5" width="3.5" height="3" rx="0.5" fill={iconColorLight} />
                <rect x="17.5" y="14.5" width="3.5" height="3" rx="0.5" fill={iconColorLight} />
                <rect x="7" y="19.5" width="3.5" height="3" rx="0.5" fill={iconColorLight} />
              </svg>,
              // 1: 顧客管理 — ユーザー
              <svg key="ic1" width="22" height="22" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="10" r="4" stroke={iconColor} strokeWidth="1.5" />
                <path d="M6 23c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="21" cy="8" r="2.5" stroke={iconColorLight} strokeWidth="1.2" />
                <path d="M24 16c0-1.5-1-3-2.8-3.5" stroke={iconColorLight} strokeWidth="1.2" strokeLinecap="round" />
              </svg>,
              // 2: 売上ダッシュボード — 棒グラフ
              <svg key="ic2" width="22" height="22" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="16" width="4" height="8" rx="1" fill={iconColorLight} />
                <rect x="10" y="12" width="4" height="12" rx="1" fill={iconColor} opacity="0.5" />
                <rect x="16" y="8" width="4" height="16" rx="1" fill={iconColor} opacity="0.7" />
                <rect x="22" y="4" width="4" height="20" rx="1" fill={iconColor} opacity="0.9" />
                <path d="M5 14L11 10l6 2 6-6" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>,
              // 3: 在庫・メニュー管理 — ボックス
              <svg key="ic3" width="22" height="22" viewBox="0 0 28 28" fill="none">
                <path d="M4 9l10-5 10 5-10 5L4 9z" stroke={iconColor} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M4 9v10l10 5V14" stroke={iconColor} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M24 9v10l-10 5V14" stroke={iconColor} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M14 14v10" stroke={iconColorLight} strokeWidth="1.2" />
                <path d="M9 6.5l10 5" stroke={iconColorLight} strokeWidth="1.2" />
              </svg>,
              // 4: LINE連携 — チャットバブル
              <svg key="ic4" width="22" height="22" viewBox="0 0 28 28" fill="none">
                <path d="M4 13c0-5.523 4.477-9 10-9s10 3.477 10 9-4.477 9-10 9c-1.2 0-2.35-.15-3.4-.43L6 24v-4.68C4.74 17.52 4 15.4 4 13z" stroke={iconColor} strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="10" cy="13" r="1.2" fill={iconColor} opacity="0.7" />
                <circle cx="14" cy="13" r="1.2" fill={iconColor} opacity="0.7" />
                <circle cx="18" cy="13" r="1.2" fill={iconColor} opacity="0.7" />
              </svg>,
              // 5: 管理画面 — レイアウト
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
            // プログレス計算（IDE側と同期）
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
                {/* 背景グラデーション */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-br from-[#2ECC71]/[0.12] via-[#2ECC71]/[0.04] to-transparent"
                    : "bg-gradient-to-br from-white/[0.04] to-white/[0.01] group-hover:from-white/[0.07] group-hover:to-white/[0.02]"
                }`} />
                {/* ボーダー */}
                <div className={`absolute inset-0 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? isBuilding ? "border-[#2ECC71]/50 system-card-pulse" : "border-[#2ECC71]/40"
                    : "border-white/[0.06] group-hover:border-white/[0.12]"
                }`} />

                {/* コンテンツ */}
                <div className="relative p-3 md:p-5">
                  {/* 上段: アイコン + ステータス */}
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
                  {/* 下段: テキスト */}
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

                {/* プログレスバー（下部） */}
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

        {/* 下のメッセージ */}
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

/* ─── ご利用の流れ ─── */
function Flow() {
  const steps = [
    {
      num: "01",
      title: "お問い合わせ",
      desc: "まずはお気軽にご相談ください。「こんなの作れる？」だけでOKです。メール・電話どちらでも。",
    },
    {
      num: "02",
      title: "ヒアリング・ご提案",
      desc: "現在の業務の流れやお困りごとを詳しくお聞きし、最適なプランをご提案します。お見積りも無料。",
    },
    {
      num: "03",
      title: "開発・制作",
      desc: "ご契約後、開発をスタート。進捗は随時共有しますので、途中での修正・変更もお気軽に。",
    },
    {
      num: "04",
      title: "納品・操作説明",
      desc: "完成したシステムを納品し、使い方を丁寧にご説明します。わからないことは何でも聞いてください。",
    },
    {
      num: "05",
      title: "保守・サポート開始",
      desc: "納品後も月額サポートで安心。修正対応・不具合対応・相談まで、ずっとお任せください。",
    },
  ];

  return (
    <section id="flow" className="relative py-16 md:py-32 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-20">
          <p className="text-[#F5A623] font-medium tracking-[0.3em] text-xs mb-4">FLOW</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            ご利用の<span className="text-[#F5A623]">流れ</span>
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-xl leading-relaxed">
            お問い合わせから納品、その後のサポートまでの流れをご紹介します。
          </p>
        </div>

        <div className="relative">
          {/* 縦線 */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const fade = useFadeIn();
              return (
                <div
                  key={step.num}
                  ref={fade.ref}
                  className={`flex gap-6 md:gap-10 items-start transition-all duration-700 ${fade.className}`}
                >
                  {/* ナンバー */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#F5A623]/30 bg-[#F5A623]/5 flex items-center justify-center">
                      <span className="text-[#F5A623] font-black text-sm md:text-base">{step.num}</span>
                    </div>
                    {/* ドット */}
                    {i < steps.length - 1 && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full h-12 md:h-16 w-px bg-gradient-to-b from-[#F5A623]/20 to-transparent hidden md:block" />
                    )}
                  </div>

                  {/* コンテンツ */}
                  <div className="flex-1 pb-2">
                    <div className="mb-2">
                      <h3 className="text-xl md:text-2xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-lg">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── よくある質問 ─── */
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: "本当に「こんなの作れる？」だけで相談していいんですか？",
      a: "はい、大歓迎です！漠然としたイメージでも大丈夫。お話を聞きながら、一緒に形にしていきます。",
    },
    {
      q: "制作期間はどのくらいですか？",
      a: "ホームページなら約2〜4週間、システム開発は規模によりますが2〜8週間が目安です。お急ぎの場合はご相談ください。",
    },
    {
      q: "途中で修正や変更はできますか？",
      a: "はい、開発中の修正・変更は随時対応します。進捗を共有しながら進めるので、「思ってたのと違う」を防げます。",
    },
    {
      q: "保守サポートは必須ですか？",
      a: "いいえ、任意です。ご自身で運用できる場合は不要です。ただ、サーバー管理や不具合対応を含むので、多くの方にご利用いただいています。",
    },
    {
      q: "島外からの依頼も受けていますか？",
      a: "現在は奄美大島内のお客様を中心に対応しています。島外の場合もオンラインで対応可能ですので、まずはご相談ください。",
    },
    {
      q: "支払い方法は？",
      a: "制作費用は納品時に銀行振込でお支払い。毎月の保守料金はクレジットカード決済または銀行振込に対応しています。",
    },
  ];

  return (
    <section id="faq" className="relative py-16 md:py-32 bg-[#111] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* 左: タイトル */}
          <div className="md:w-1/3">
            <p className="text-[#F5A623] font-medium tracking-[0.3em] text-xs mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              よくある
              <br />
              <span className="text-[#F5A623]">質問</span>
            </h2>
          </div>

          {/* 右: アコーディオン */}
          <div className="md:w-2/3">
            <div className="border-t border-white/10">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-white/10">
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
                  >
                    <span className="text-white/80 text-sm md:text-base font-medium pr-4 group-hover:text-white transition-colors">
                      {faq.q}
                    </span>
                    <span
                      className={`text-[#F5A623] text-xl flex-shrink-0 transition-transform duration-300 ${
                        openIdx === i ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIdx === i ? "max-h-40 pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 会社概要 ─── */
function About() {
  const fade = useFadeIn();
  return (
    <section id="about" className="relative py-16 md:py-32 bg-[#111] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* 左: タイトル */}
          <div className="md:w-1/3">
            <p className="text-[#F5A623] font-medium tracking-[0.3em] text-xs mb-4">ABOUT</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              会社
              <br />
              <span className="text-white/50">概要</span>
            </h2>
          </div>

          {/* 右: テーブル */}
          <div ref={fade.ref} className={`md:w-2/3 transition-all duration-700 ${fade.className}`}>
            <div className="border-t border-white/10">
              {[
                ["屋号", "TIDA WORKS（ティダ ワークス）"],
                ["代表者", "作田 大地"],
                ["事業内容", "Webアプリ開発 / LINE構築 / 業務システム構築 / 保守運用"],
                ["所在地", "鹿児島県 奄美大島"],
                ["メール", "tidaworks@gmail.com"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col md:flex-row border-b border-white/10 py-5 md:py-6">
                  <span className="text-[#F5A623]/50 text-sm font-medium md:w-1/4 mb-1 md:mb-0">{label}</span>
                  <span className="text-white/70 text-sm md:w-3/4">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── お問い合わせ — ミニマル ─── */
function Contact() {
  const fade = useFadeIn();
  return (
    <section id="contact" className="relative py-16 md:py-32 bg-[#0a0a0a] text-white overflow-hidden">
      {/* 背景グロー */}
      <div className="absolute top-[30%] left-[40%] w-[500px] h-[500px] bg-[#F5A623]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* 左: 大きなコピー */}
          <div ref={fade.ref} className={`md:w-1/2 transition-all duration-700 ${fade.className}`}>
            <p className="text-[#F5A623] font-medium tracking-[0.3em] text-xs mb-4">CONTACT</p>
            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              気軽に
              <br />
              <span className="text-[#F5A623]">聞いて</span>ください。
            </h2>
            <p className="text-white/50 text-base leading-relaxed">
              「こんなアプリ、作れる？」で大丈夫。
              <br />
              相談もお見積りも無料です。
            </p>
          </div>

          {/* 右: フォーム */}
          <div className="md:w-1/2">
            <form
              className="space-y-6"
              action="https://formspree.io/f/xaqljdkw"
              method="POST"
            >
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 tracking-wider">NAME</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder-white/20 focus:outline-none focus:border-[#F5A623] transition-colors text-base"
                  placeholder="山田 太郎"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 tracking-wider">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder-white/20 focus:outline-none focus:border-[#F5A623] transition-colors text-base"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 tracking-wider">SERVICE</label>
                <select
                  name="service"
                  required
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-white focus:outline-none focus:border-[#F5A623] transition-colors text-base"
                  defaultValue=""
                >
                  <option value="" disabled className="text-gray-800">選択してください</option>
                  <option value="website" className="text-gray-800">ホームページ制作の相談</option>
                  <option value="system" className="text-gray-800">システム開発の相談</option>
                  <option value="line" className="text-gray-800">LINE構築・予約システムの相談</option>
                  <option value="maintenance" className="text-gray-800">保守・運用サポートの相談</option>
                  <option value="other" className="text-gray-800">まずは話を聞きたい</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 tracking-wider">MESSAGE</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder-white/20 focus:outline-none focus:border-[#F5A623] resize-none transition-colors text-base"
                  placeholder="ご相談内容をお聞かせください"
                />
              </div>

              <div className="text-center md:text-left">
                <button
                  type="submit"
                  className="btn-cta bg-[#F5A623] text-black font-bold px-10 py-4 rounded-full text-base hover:bg-[#FFD700] transition-all hover:scale-105 mt-4"
                >
                  送信する
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── フッター ─── */
function Footer() {
  return (
    <footer className="bg-[#111] border-t border-white/20 text-white/60 py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} TIDA WORKS
        </p>
        <div className="flex gap-6 text-xs">
          <a href="#benefits" className="hover:text-white/80 transition-colors">選ばれる理由</a>
          <a href="#services" className="hover:text-white/80 transition-colors">料金</a>
          <a href="#flow" className="hover:text-white/80 transition-colors">流れ</a>
          <a href="#faq" className="hover:text-white/80 transition-colors">FAQ</a>
          <a href="#about" className="hover:text-white/80 transition-colors">会社概要</a>
          <a href="#contact" className="hover:text-white/80 transition-colors">お問い合わせ</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── メインページ ─── */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <KeywordMarquee />
        <BusyPersonSection />
        <Strengths />
        <Benefits />
        <Services />
        <Flow />
        <FAQ />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
