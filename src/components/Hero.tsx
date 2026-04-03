"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── 現在時刻フック ─── */
function useCurrentTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`);
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

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
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <ellipse cx="70" cy="192" rx="28" ry="5" fill="#000" opacity="0.2" className="mascot-shadow" />

      <g className={`mascot-breathe ${isComplete ? "mascot-celebrate" : ""}`}>
        {/* 左足 */}
        <g className={isSlashing ? "mascot-leg-brace" : ""}>
          <path d="M52 170 L49 184" stroke="#1a1a1a" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M52 170 L49 184" stroke="#4a4a5a" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M39 180 Q43 178 49 178 Q55 178 57 180 L57 186 Q57 189 53 189 L39 189 Q36 189 36 186 Z"
            fill="#333" stroke="#1a1a1a" strokeWidth="2" />
          <path d="M39 183 L57 183" stroke="#444" strokeWidth="1" />
        </g>

        {/* 右足 */}
        <g className={isSlashing ? "mascot-leg-brace" : ""}>
          <path d="M82 170 L85 184" stroke="#1a1a1a" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M82 170 L85 184" stroke="#4a4a5a" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M77 180 Q81 178 85 178 Q91 178 95 180 L95 186 Q95 189 91 189 L77 189 Q74 189 74 186 Z"
            fill="#333" stroke="#1a1a1a" strokeWidth="2" />
          <path d="M77 183 L95 183" stroke="#444" strokeWidth="1" />
        </g>

        {/* ズボン */}
        <path d="M46 148 L43 172 L61 172 L67 160 L73 172 L91 172 L88 148 Z"
          fill="#4a4a5a" stroke="#1a1a1a" strokeWidth="2.5" />
        <line x1="67" y1="150" x2="67" y2="172" stroke="#3a3a4a" strokeWidth="1.5" />

        {/* Tシャツ */}
        <path d="M42 102 Q42 97 50 97 L84 97 Q92 97 92 102 L94 150 Q94 154 88 154 L46 154 Q40 154 40 150 Z"
          fill="#F5A623" stroke="#1a1a1a" strokeWidth="2.5" />
        <path d="M56 97 L62 105 L67 105 L73 97" fill="#E09510" stroke="#1a1a1a" strokeWidth="1.5" />
        <text x="67" y="126" textAnchor="middle" fill="#C07A10" fontSize="9" fontWeight="900" fontFamily="sans-serif">TIDA</text>
        <text x="67" y="139" textAnchor="middle" fill="#C07A10" fontSize="8" fontWeight="800" fontFamily="sans-serif">WORKS</text>
        <path d="M50 110 Q55 112 50 118" stroke="#E09510" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M84 115 Q80 117 83 122" stroke="#E09510" strokeWidth="1" fill="none" opacity="0.6" />

        {/* 左腕 */}
        <g className="mascot-arm-left">
          <path d="M42 104 Q30 120 28 138" stroke="#1a1a1a" strokeWidth="11" fill="none" strokeLinecap="round" />
          <path d="M42 104 Q30 120 28 138" stroke="#F5A623" strokeWidth="8" fill="none" strokeLinecap="round" />
          <circle cx="28" cy="140" r="6" fill="#D4956A" stroke="#1a1a1a" strokeWidth="2" />
          <line x1="23" y1="138" x2="21" y2="134" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="26" y1="136" x2="24" y2="132" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="135" x2="29" y2="131" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* 右腕 */}
        <g className={`mascot-arm-right ${isSlashing ? "mascot-arm-slash" : isComplete ? "mascot-arm-victory" : "mascot-arm-idle"}`}>
          <path d="M92 104 Q104 118 102 136" stroke="#1a1a1a" strokeWidth="11" fill="none" strokeLinecap="round" />
          <path d="M92 104 Q104 118 102 136" stroke="#F5A623" strokeWidth="8" fill="none" strokeLinecap="round" />
          <circle cx="102" cy="138" r="6" fill="#D4956A" stroke="#1a1a1a" strokeWidth="2" />

          {/* ノートPC */}
          <g filter="url(#shadow)">
            <rect x="82" y="136" width="34" height="22" rx="3" fill="url(#screenGrad)" stroke="#555" strokeWidth="1.5" />
            <g className="mascot-screen-code">
              <line x1="86" y1="142" x2="96" y2="142" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" className="mascot-code-line-1" />
              <line x1="86" y1="146" x2="108" y2="146" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" className="mascot-code-line-2" />
              <line x1="86" y1="150" x2="102" y2="150" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" className="mascot-code-line-3" />
              <line x1="86" y1="154" x2="98" y2="154" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" className="mascot-code-line-4" />
            </g>
            <circle cx="99" cy="138" r="1" fill="#555" />
            <circle cx="99" cy="156" r="1.5" fill="#444" opacity="0.5" />
            <path d="M80 158 L118 158 L116 163 Q116 165 114 165 L84 165 Q82 165 82 163 Z"
              fill="#aaa" stroke="#888" strokeWidth="1" />
            <line x1="86" y1="160" x2="112" y2="160" stroke="#999" strokeWidth="0.5" />
            <line x1="86" y1="162" x2="112" y2="162" stroke="#999" strokeWidth="0.5" />
          </g>
        </g>

        {/* 首 */}
        <rect x="60" y="90" width="14" height="9" rx="3" fill="#D4956A" stroke="#1a1a1a" strokeWidth="2" />

        {/* 頭 */}
        <g className="mascot-head">
          <ellipse cx="42" cy="66" rx="5" ry="7" fill="#D4956A" stroke="#1a1a1a" strokeWidth="2.5" />
          <ellipse cx="42" cy="66" rx="2.5" ry="4" fill="#C0845A" opacity="0.5" />
          <ellipse cx="92" cy="66" rx="5" ry="7" fill="#D4956A" stroke="#1a1a1a" strokeWidth="2.5" />
          <ellipse cx="92" cy="66" rx="2.5" ry="4" fill="#C0845A" opacity="0.5" />

          <ellipse cx="67" cy="64" rx="26" ry="28" fill="#D4956A" stroke="#1a1a1a" strokeWidth="2.5" />

          <g className="mascot-hair">
            <path d="M41 58 Q41 32 67 26 Q93 32 93 58 L90 64 Q86 52 67 48 Q48 52 44 64 Z"
              fill="#2D2017" stroke="#1a1a1a" strokeWidth="2.5" />
            <path d="M48 48 Q50 38 54 44" fill="#2D2017" stroke="#2D2017" strokeWidth="1" />
            <path d="M56 44 Q59 34 62 42" fill="#2D2017" stroke="#2D2017" strokeWidth="1" />
            <path d="M66 42 Q70 32 74 40" fill="#2D2017" stroke="#2D2017" strokeWidth="1" />
            <path d="M76 44 Q80 36 82 46" fill="#2D2017" stroke="#2D2017" strokeWidth="1" />
            <path d="M55 40 Q60 36 65 38" stroke="#4A3525" strokeWidth="1.5" fill="none" opacity="0.4" />
          </g>

          <ellipse cx="48" cy="72" rx="6" ry="4" fill="#E8845C" opacity="0.45" />
          <ellipse cx="86" cy="72" rx="6" ry="4" fill="#E8845C" opacity="0.45" />

          <g className={isSlashing ? "mascot-brow-determined" : ""}>
            <path d={isSlashing ? "M52 52 Q56 49 60 51" : "M52 53 Q56 51 60 53"}
              stroke="#2D2017" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d={isSlashing ? "M74 51 Q78 49 82 52" : "M74 53 Q78 51 82 53"}
              stroke="#2D2017" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>

          <g>
            {isComplete ? (
              <>
                <path d="M54 60 Q57 55 60 60" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M74 60 Q77 55 80 60" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </>
            ) : blink ? (
              <>
                <line x1="53" y1="60" x2="61" y2="60" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="73" y1="60" x2="81" y2="60" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <ellipse cx="57" cy="60" rx="4" ry="4.5" fill="white" stroke="#1a1a1a" strokeWidth="1.5" />
                <circle cx="58" cy="59" r="2.5" fill="#1a1a1a" />
                <circle cx="59" cy="58" r="1" fill="white" />
                <ellipse cx="77" cy="60" rx="4" ry="4.5" fill="white" stroke="#1a1a1a" strokeWidth="1.5" />
                <circle cx="78" cy="59" r="2.5" fill="#1a1a1a" />
                <circle cx="79" cy="58" r="1" fill="white" />
              </>
            )}
          </g>

          <ellipse cx="67" cy="68" rx="1.5" ry="1" fill="#B07850" />

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

        {isSlashing && (
          <g className="mascot-slash-fx">
            <line x1="10" y1="80" x2="30" y2="90" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <line x1="8" y1="100" x2="25" y2="105" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1="12" y1="120" x2="28" y2="118" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          </g>
        )}

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

/* ─── ぐにゃぐにゃタイトル ─── */
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
        transform: "translateY(-16px) rotate(-8deg) scale(1.2)",
        color: "#F5A623",
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease",
      };
    }
    if (dist === 1) {
      const dir = i < hoveredIdx ? 1 : -1;
      return {
        transform: `translateY(-10px) rotate(${dir * 5}deg) scale(1.1)`,
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.03s",
      };
    }
    if (dist === 2) {
      const dir = i < hoveredIdx ? 1 : -1;
      return {
        transform: `translateY(-4px) rotate(${dir * 2}deg)`,
        transition: "transform 0.35s ease 0.06s",
      };
    }
    if (dist === 3) {
      return {
        transform: "translateY(-1px)",
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

type DisplayMsg =
  | { side: "user"; text: string; key: number }
  | { side: "tida"; text: string; key: number }
  | { side: "app"; label: string; color: string; appIdx: number; key: number };

function MiniAppCard({ label, color, appIdx }: { label: string; color: string; appIdx: number }) {
  const appUIs = [
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
      <div className="px-3 py-1.5 flex items-center gap-2" style={{ background: `${color}15` }}>
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="text-[10px] font-bold" style={{ color }}>{label}</span>
      </div>
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
      <div className="rounded-2xl border border-white/10 bg-[#111]/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/30">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="w-8 h-8 rounded-full bg-[#F5A623]/20 flex items-center justify-center">
            <span className="text-[#F5A623] text-[10px] font-black">T</span>
          </div>
          <div>
            <p className="text-white/80 text-xs font-bold">TIDA WORKS</p>
            <p className="text-[#2ECC71] text-[10px]">オンライン</p>
          </div>
        </div>

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

/* ─── スマホ体験型モックアップ ─── */

// スマホ画面 Step1: LINE通知が届く
function PhoneScreenNotification({ visible, currentTime }: { visible: boolean; currentTime: string }) {
  const [tappedNotif, setTappedNotif] = useState<number | null>(null);

  useEffect(() => {
    if (!visible) setTappedNotif(null);
  }, [visible]);

  const notifDetails = [
    {
      title: "LINE 予約通知",
      customer: "田中 美咲",
      menu: "カット＆カラー",
      date: "4/5（土）14:00〜",
      source: "LINE",
      note: "初めてのご予約です。カラーはアッシュ系希望。",
      color: "#06C755",
    },
    {
      title: "TIDA システム",
      detail: "予約台帳に自動反映しました",
      actions: ["台帳を確認", "通知を閉じる"],
      color: "#F5A623",
    },
  ];

  return (
    <div className={`absolute inset-0 flex flex-col transition-all duration-500 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
      {/* ロック画面風の背景 */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        <p className="text-white/30 text-[10px] font-medium tracking-wider mb-1">3月28日 金曜日</p>
        <p className="text-white text-2xl font-bold tracking-tight mb-8">{currentTime || "00:00"}</p>

        {/* LINE通知 */}
        <div className="w-full phone-notif-slide cursor-pointer active:scale-[0.97] transition-transform" onClick={() => setTappedNotif(0)}>
          <div className="rounded-2xl p-3 border border-white/10 hover:bg-white/[0.12] transition-colors" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#06C755" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 5.82 2 10.5c0 2.95 1.96 5.55 4.88 7.06l-.84 3.05c-.08.29.25.52.49.34l3.56-2.59c.62.09 1.26.14 1.91.14 5.52 0 10-3.82 10-8.5S17.52 2 12 2z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white/90 text-[11px] font-bold">LINE 予約通知</span>
                  <span className="text-white/30 text-[9px]">たった今</span>
                </div>
                <p className="text-white/70 text-[11px] leading-relaxed">
                  <span className="text-[#06C755] font-semibold">新規予約</span>が入りました！<br/>
                  田中 美咲さん — カット＆カラー<br/>
                  4/5（土）14:00〜
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2つ目の通知（少し遅れて） */}
        <div className="w-full mt-2.5 phone-notif-slide-2 cursor-pointer active:scale-[0.97] transition-transform" onClick={() => setTappedNotif(1)}>
          <div className="rounded-2xl p-3 border border-white/10 hover:bg-white/[0.1] transition-colors" style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F5A623]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#F5A623] text-xs font-black">T</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white/90 text-[11px] font-bold">TIDA システム</span>
                  <span className="text-white/30 text-[9px]">たった今</span>
                </div>
                <p className="text-white/70 text-[11px]">
                  予約台帳に<span className="text-[#F5A623] font-semibold">自動反映</span>しました ✓
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 通知詳細ポップアップ */}
        {tappedNotif !== null && (
          <div className="absolute inset-0 z-10 flex items-center justify-center px-4" onClick={() => setTappedNotif(null)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div
              className="relative w-full rounded-2xl border p-4 phone-detail-pop"
              style={{ background: "#151c2c", borderColor: `${notifDetails[tappedNotif].color}30` }}
              onClick={(e) => e.stopPropagation()}
            >
              {tappedNotif === 0 ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#06C755" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 5.82 2 10.5c0 2.95 1.96 5.55 4.88 7.06l-.84 3.05c-.08.29.25.52.49.34l3.56-2.59c.62.09 1.26.14 1.91.14 5.52 0 10-3.82 10-8.5S17.52 2 12 2z"/></svg>
                      </div>
                      <p className="text-white/90 text-[11px] font-bold">LINE 新規予約</p>
                    </div>
                    <button onClick={() => setTappedNotif(null)} className="text-white/30 hover:text-white/60 text-sm">✕</button>
                  </div>
                  <div className="space-y-2">
                    {[
                      ["お客様", "田中 美咲"],
                      ["メニュー", "カット＆カラー"],
                      ["日時", "4/5（土）14:00〜"],
                      ["経由", "LINE予約"],
                      ["メモ", "初来店。カラーはアッシュ系希望。"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-start gap-2">
                        <span className="text-white/25 text-[9px] w-12 flex-shrink-0">{label}</span>
                        <span className="text-white/70 text-[10px]">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <div className="flex-1 text-center py-1.5 rounded-lg text-[9px] font-bold bg-[#06C755]/20 text-[#06C755] border border-[#06C755]/20">承認する</div>
                    <div className="flex-1 text-center py-1.5 rounded-lg text-[9px] font-bold bg-white/5 text-white/40 border border-white/10">詳細を見る</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#F5A623]/20 flex items-center justify-center">
                        <span className="text-[#F5A623] text-[9px] font-black">T</span>
                      </div>
                      <p className="text-white/90 text-[11px] font-bold">システム通知</p>
                    </div>
                    <button onClick={() => setTappedNotif(null)} className="text-white/30 hover:text-white/60 text-sm">✕</button>
                  </div>
                  <p className="text-white/60 text-[10px] leading-relaxed mb-3">
                    田中 美咲さんの予約（4/5 14:00〜 カット＆カラー）を予約台帳に自動反映しました。
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[9px]">
                      <span className="text-[#2ECC71]">✓</span>
                      <span className="text-white/50">予約台帳に追加済み</span>
                    </div>
                    <div className="flex items-center gap-2 text-[9px]">
                      <span className="text-[#2ECC71]">✓</span>
                      <span className="text-white/50">確認メール自動送信済み</span>
                    </div>
                    <div className="flex items-center gap-2 text-[9px]">
                      <span className="text-[#2ECC71]">✓</span>
                      <span className="text-white/50">スタッフに通知済み</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-center py-1.5 rounded-lg text-[9px] font-bold bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/20">台帳を確認する</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// スマホ画面 Step2: 飲食店の予約台帳
function PhoneScreenBooking({ visible }: { visible: boolean }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const bookings = [
    { time: "11:30", name: "山田様", detail: "テーブルA / 2名", menu: "ランチセットA ×2", status: "来店済", color: "#666", note: "窓側希望", tel: "090-XXXX-2345" },
    { time: "12:00", name: "佐藤様", detail: "座敷 / 6名", menu: "宴会コース ×6", status: "調理中", color: "#4A90D9", note: "アレルギー：エビ", tel: "090-XXXX-6789" },
    { time: "18:00", name: "中村様", detail: "カウンター / 2名", menu: "おまかせコース ×2", status: "予約確定", color: "#F5A623", note: "記念日・デザートプレート希望", tel: "090-XXXX-1122" },
    { time: "19:00", name: "高橋様", detail: "テーブルB / 4名", menu: "島料理コース ×4", status: "NEW!", color: "#06C755", note: "Web予約・子供1名あり", tel: "090-XXXX-3344" },
  ];

  useEffect(() => {
    if (!visible) setSelectedIdx(null);
  }, [visible]);

  const selected = selectedIdx !== null ? bookings[selectedIdx] : null;

  return (
    <div className={`absolute inset-0 flex flex-col transition-all duration-500 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
      {/* ヘッダー */}
      <div className="px-4 pt-2 pb-2">
        <div className="flex items-center justify-between">
          <p className="text-white text-sm font-bold">予約台帳</p>
          <p className="text-white/30 text-[10px]">4月5日（土）</p>
        </div>
        <div className="flex gap-2 mt-1.5">
          {[
            { label: "テーブル", count: "2/4", color: "#2ECC71" },
            { label: "座敷", count: "1/2", color: "#F5A623" },
            { label: "カウンター", count: "1/6", color: "#4A90D9" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1 text-[7px]">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
              <span className="text-white/30">{s.label}</span>
              <span className="text-white/50 font-bold tabular-nums">{s.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 予約リスト */}
      <div className="flex-1 px-3 space-y-1.5 overflow-hidden relative">
        {bookings.map((b, i) => (
          <div
            key={b.name}
            onClick={() => setSelectedIdx(i)}
            className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer active:scale-[0.97] ${
              i === bookings.length - 1
                ? "border-[#06C755]/30 bg-[#06C755]/[0.08] phone-booking-new"
                : "border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06]"
            }`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="text-center w-10 flex-shrink-0">
              <p className="text-white/80 text-[11px] font-bold tabular-nums">{b.time}</p>
            </div>
            <div className="h-8 w-[2px] rounded-full flex-shrink-0" style={{ background: b.color }} />
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-[11px] font-semibold truncate">{b.name}</p>
              <p className="text-white/30 text-[8px]">{b.detail}</p>
            </div>
            <span
              className="text-[7px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: `${b.color}20`,
                color: b.color,
                border: `1px solid ${b.color}30`,
              }}
            >
              {b.status}
            </span>
          </div>
        ))}

        {/* 詳細ポップアップ */}
        {selected && (
          <div className="absolute inset-0 z-10 flex items-center justify-center px-3" onClick={() => setSelectedIdx(null)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-xl" />
            <div
              className="relative w-full rounded-xl border p-4 phone-detail-pop"
              style={{ background: "#151c2c", borderColor: `${selected.color}30` }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: `${selected.color}20`, color: selected.color }}>
                    {selected.name[0]}
                  </div>
                  <div>
                    <p className="text-white/90 text-[11px] font-bold">{selected.name}</p>
                    <p className="text-white/30 text-[8px]">{selected.tel}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedIdx(null)} className="text-white/30 hover:text-white/60 text-sm leading-none">✕</button>
              </div>
              <div className="space-y-2">
                {[
                  ["席", selected.detail],
                  ["注文", selected.menu],
                  ["時間", `${selected.time}〜`],
                  ["メモ", selected.note],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-start gap-2">
                    <span className="text-white/25 text-[9px] w-8 flex-shrink-0">{label}</span>
                    <span className="text-white/70 text-[10px]">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[9px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${selected.color}20`, color: selected.color, border: `1px solid ${selected.color}30` }}>
                  {selected.status}
                </span>
                <span className="text-white/15 text-[8px]">タップで閉じる</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ボトム */}
      <div className="px-4 py-2 border-t border-white/[0.06] mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-white/30 text-[10px]">本日の予約</span>
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm font-bold tabular-nums">4<span className="text-white/30 text-[10px] font-normal">組</span></span>
            <span className="text-emerald-400 text-[9px] font-semibold phone-count-bump">+1 NEW</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// スマホ画面 Step3: 建設業の売上・案件管理
function PhoneScreenSales({ visible }: { visible: boolean }) {
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const [tab, setTab] = useState<"overview" | "menu" | "time">("overview");
  const bars = [30, 35, 42, 48, 52, 58, 60, 65, 72, 78, 85, 95];
  const months = ["4","5","6","7","8","9","10","11","12","1","2","3"];
  const salesData = [
    "¥2.8M", "¥3.2M", "¥3.8M", "¥4.3M", "¥4.8M", "¥5.2M",
    "¥5.5M", "¥5.9M", "¥6.5M", "¥7.1M", "¥7.8M", "¥8.6M",
  ];

  const menuRanking = [
    { name: "住宅リフォーム", count: 12, revenue: "¥3,200,000", ratio: 90 },
    { name: "外壁塗装", count: 8, revenue: "¥2,400,000", ratio: 65 },
    { name: "内装工事", count: 6, revenue: "¥1,500,000", ratio: 45 },
    { name: "水回り修繕", count: 10, revenue: "¥980,000", ratio: 35 },
    { name: "エクステリア", count: 3, revenue: "¥520,000", ratio: 18 },
  ];

  const timeSlots = [
    { time: "見積中", count: 5, ratio: 30 },
    { time: "契約済", count: 3, ratio: 55 },
    { time: "施工中", count: 4, ratio: 70 },
    { time: "検査待", count: 2, ratio: 40 },
    { time: "完了", count: 12, ratio: 95 },
  ];

  useEffect(() => {
    if (!visible) { setSelectedBar(null); setTab("overview"); }
  }, [visible]);

  return (
    <div className={`absolute inset-0 flex flex-col transition-all duration-500 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
      {/* ヘッダー */}
      <div className="px-4 pt-2 pb-1">
        <p className="text-white text-sm font-bold">案件ダッシュボード</p>
      </div>

      {/* 売上サマリー */}
      <div className="px-4 pb-2">
        <div className="flex items-end gap-2">
          <p className="text-white text-xl font-black tabular-nums phone-sales-count">¥8,600,000</p>
          <span className="text-emerald-400 text-[9px] font-bold mb-0.5 phone-sales-badge">+18.3%</span>
        </div>
        <p className="text-white/25 text-[8px]">2026年3月の売上（過去最高）</p>
      </div>

      {/* タブ切り替え */}
      <div className="px-4 mb-2">
        <div className="flex gap-1 bg-white/[0.03] rounded-lg p-0.5">
          {([["overview", "概要"], ["menu", "工事別"], ["time", "進捗"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 text-[8px] py-1 rounded-md font-semibold transition-all ${
                tab === key ? "bg-[#F5A623]/15 text-[#F5A623]" : "text-white/25 hover:text-white/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* タブコンテンツ */}
      <div className="flex-1 px-4 overflow-y-auto phone-scroll">
        {/* 概要タブ */}
        {tab === "overview" && (
          <div className="space-y-2">
            {/* 月次グラフ */}
            <div className="rounded-xl border border-white/[0.06] p-2.5" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white/40 text-[8px]">月次推移</span>
                <span className="text-[#F5A623] text-[8px] font-semibold">
                  {selectedBar !== null ? `${months[selectedBar]}月: ${salesData[selectedBar]}` : "過去最高 ↑"}
                </span>
              </div>
              <div className="flex items-end gap-[3px] h-14">
                {bars.map((h, i) => (
                  <div key={i} className="flex-1 flex items-end h-full cursor-pointer" onClick={() => setSelectedBar(selectedBar === i ? null : i)}>
                    <div
                      className={`w-full rounded-t-sm phone-bar-grow transition-all duration-200 ${selectedBar !== null && selectedBar !== i ? "opacity-25" : ""}`}
                      style={{
                        height: `${h}%`,
                        background: selectedBar === i
                          ? "linear-gradient(180deg, #FFD700, #F5A623)"
                          : i === bars.length - 1
                          ? "linear-gradient(180deg, #F5A623, #E09510)"
                          : i >= bars.length - 3
                          ? "linear-gradient(180deg, rgba(245,166,35,0.5), rgba(245,166,35,0.15))"
                          : "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))",
                        animationDelay: `${i * 0.06}s`,
                        transform: selectedBar === i ? "scaleX(1.3)" : "scaleX(1)",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {months.map((m, i) => (
                  <span key={i} className={`text-[5px] flex-1 text-center tabular-nums transition-colors ${selectedBar === i ? "text-[#F5A623] font-bold" : "text-white/15"}`}>{m}</span>
                ))}
              </div>
            </div>

            {/* KPIカード */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: "案件数", val: "26", sub: "+5", icon: "📋", prev: "21" },
                { label: "案件単価", val: "¥330K", sub: "+¥42K", icon: "💰", prev: "¥288K" },
                { label: "完了率", val: "92%", sub: "+8%", icon: "🔄", prev: "84%" },
              ].map((k) => (
                <div key={k.label} className="rounded-lg border border-white/[0.06] p-2 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <p className="text-white/20 text-[7px] mb-0.5">{k.label}</p>
                  <p className="text-white text-[11px] font-bold tabular-nums">{k.val}</p>
                  <p className="text-emerald-400/70 text-[7px] font-semibold">{k.sub}</p>
                  <p className="text-white/10 text-[6px] mt-0.5">前月 {k.prev}</p>
                </div>
              ))}
            </div>

            {/* 日別ミニグラフ */}
            <div className="rounded-xl border border-white/[0.06] p-2.5" style={{ background: "rgba(255,255,255,0.02)" }}>
              <p className="text-white/40 text-[8px] mb-1.5">直近7日間</p>
              <div className="flex items-end gap-[3px] h-8">
                {[45, 62, 38, 71, 55, 80, 68].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm" style={{
                    height: `${h}%`,
                    background: i === 5 ? "linear-gradient(180deg, #2ECC71, #1a9c58)" : "linear-gradient(180deg, rgba(46,204,113,0.3), rgba(46,204,113,0.08))",
                  }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {["月","火","水","木","金","土","日"].map((d, i) => (
                  <span key={d} className={`text-[5px] flex-1 text-center ${i === 5 ? "text-[#2ECC71]" : "text-white/15"}`}>{d}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* メニュータブ */}
        {tab === "menu" && (
          <div className="space-y-1.5">
            <p className="text-white/40 text-[8px] mb-1">工事種別 売上ランキング（3月）</p>
            {menuRanking.map((m, i) => (
              <div key={m.name} className="rounded-lg border border-white/[0.06] p-2" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-black w-4 text-center ${i === 0 ? "text-[#F5A623]" : i === 1 ? "text-white/50" : "text-white/25"}`}>
                      {i + 1}
                    </span>
                    <span className="text-white/80 text-[10px] font-semibold">{m.name}</span>
                  </div>
                  <span className="text-white/50 text-[9px] tabular-nums">{m.revenue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{
                      width: `${m.ratio}%`,
                      background: i === 0 ? "#F5A623" : i === 1 ? "#4A90D9" : "#2ECC71",
                      opacity: 0.6,
                    }} />
                  </div>
                  <span className="text-white/25 text-[8px] tabular-nums w-8 text-right">{m.count}件</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 時間帯タブ */}
        {tab === "time" && (
          <div className="space-y-1">
            <p className="text-white/40 text-[8px] mb-1">案件ステータス別（3月）</p>
            {timeSlots.map((s) => (
              <div key={s.time} className="flex items-center gap-2 py-0.5">
                <span className="text-white/25 text-[8px] tabular-nums w-10 flex-shrink-0">{s.time}</span>
                <div className="flex-1 h-2.5 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${s.ratio}%`,
                      background: s.ratio >= 60
                        ? "linear-gradient(90deg, #F5A623, #FFD700)"
                        : s.ratio >= 40
                        ? "linear-gradient(90deg, rgba(245,166,35,0.5), rgba(245,166,35,0.3))"
                        : "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                    }}
                  />
                </div>
                <span className="text-white/30 text-[8px] tabular-nums w-6 text-right">{s.count}</span>
              </div>
            ))}
            <div className="mt-2 rounded-lg border border-[#F5A623]/15 p-2 bg-[#F5A623]/[0.03]">
              <p className="text-[#F5A623] text-[8px] font-semibold">今月の進捗</p>
              <p className="text-white/60 text-[9px] font-bold">完了12件 / 施工中4件</p>
              <p className="text-white/25 text-[7px]">前月比 完了数+3件 ↑</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// メインのスマホモックアップ
function PhoneMockup() {
  const [step, setStep] = useState(0); // 0: 通知, 1: 予約台帳, 2: 売上
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const currentTime = useCurrentTime();

  useEffect(() => {
    const cycle = () => {
      timerRef.current.forEach(clearTimeout);
      timerRef.current = [];
      setStep(0);
      timerRef.current.push(setTimeout(() => setStep(1), 3500));
      timerRef.current.push(setTimeout(() => setStep(2), 7000));
      timerRef.current.push(setTimeout(() => cycle(), 11500));
    };
    cycle();
    return () => timerRef.current.forEach(clearTimeout);
  }, []);

  // ステップのラベル
  const steps = [
    { label: "美容室", icon: "💇" },
    { label: "飲食店", icon: "🍽️" },
    { label: "建設業", icon: "🏗️" },
  ];

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* スマホ本体 */}
      <div className="relative phone-float">
        {/* グロー効果（スマホの下） */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-16 rounded-full phone-glow" />
        {/* 横グロー */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-8 -right-8 h-[60%] phone-side-glow" />

        {/* iPhone風フレーム */}
        <div
          className="relative w-[260px] md:w-[280px] rounded-[36px] border-[3px] border-white/[0.15] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(245,166,35,0.1)]"
          style={{ background: "linear-gradient(160deg, #1a1a2e, #0d0d1a)", aspectRatio: "9/19.5" }}
        >
          {/* ノッチ */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[26px] bg-black rounded-b-2xl z-20" />
          {/* ステータスバー */}
          <div className="absolute top-[6px] left-4 right-4 flex items-center justify-between z-10">
            <span className="text-white/50 text-[9px] font-semibold tabular-nums">{currentTime || "00:00"}</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px]">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-[3px] rounded-sm bg-white/40" style={{ height: `${4 + i * 2}px` }} />
                ))}
              </div>
              <svg width="14" height="10" viewBox="0 0 20 14" className="text-white/40"><rect x="1" y="1" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><rect x="17" y="4" width="2" height="4" rx="0.5" fill="currentColor"/><rect x="3" y="3" width="8" height="6" rx="1" fill="currentColor"/></svg>
            </div>
          </div>

          {/* 画面コンテンツ */}
          <div className="absolute inset-[3px] top-[30px] bottom-[4px] rounded-[32px] overflow-hidden" style={{ background: "linear-gradient(180deg, #111118, #0a0a12)" }}>
            <PhoneScreenNotification visible={step === 0} currentTime={currentTime} />
            <PhoneScreenBooking visible={step === 1} />
            <PhoneScreenSales visible={step === 2} />
          </div>

          {/* ホームインジケーター */}
          <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[35%] h-[4px] bg-white/20 rounded-full" />
        </div>
      </div>

      {/* ステップインジケーター */}
      <div className="flex items-center gap-3 mt-8">
        {steps.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setStep(i)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all duration-300 cursor-pointer ${
              step === i
                ? "bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30 scale-105"
                : "bg-white/[0.04] text-white/30 border border-white/[0.06] hover:border-white/10"
            }`}
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* フローの矢印表示 */}
      <div className="flex items-center gap-2 mt-4 text-white/20 text-[10px]">
        <span className={`transition-colors ${step === 0 ? "text-[#06C755]" : ""}`}>LINE予約</span>
        <span>→</span>
        <span className={`transition-colors ${step === 1 ? "text-[#F5A623]" : ""}`}>予約管理</span>
        <span>→</span>
        <span className={`transition-colors ${step === 2 ? "text-[#F5A623]" : ""}`}>売上分析</span>
      </div>
    </div>
  );
}

/* ─── ヒーロー（エクスポート） ─── */
export default function Hero() {
  return (
    <section className="relative flex items-start pt-28 pb-16 md:pt-32 md:pb-28 bg-[#0a0a0a] text-white overflow-hidden noise-overlay">
      {/* 背景グラデーションメッシュ */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-50" style={{ background: "radial-gradient(circle, rgba(245,166,35,0.15), transparent 60%)" }} />
      <div className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(46,204,113,0.08), transparent 60%)" }} />

      {/* 装飾グリッドライン */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* 左: テキスト */}
          <div className="lg:w-1/2">
            <p className="font-display text-[#F5A623]/60 text-xs tracking-[0.4em] mb-6 animate-[fadeInUp_0.8s_ease-out_0.1s_both] font-semibold">TIDA WORKS — AMAMI OSHIMA</p>

            <h1 className="text-[8.5vw] md:text-[5.5vw] lg:text-[4vw] font-black leading-[1.12] mb-8 md:mb-10 tracking-tight">
              <span className="text-white/80 whitespace-nowrap"><WobblyText text="あなた専用に作る、" lineDelay={0.2} /></span>
              <br />
              <span className="whitespace-nowrap"><WobblyText text="業務アプリ" className="text-[#F5A623]" lineDelay={0.7} /><WobblyText text="。" className="text-white" lineDelay={1.1} /></span>
            </h1>

            <p className="text-white/45 text-sm md:text-base max-w-lg leading-[1.9] mb-8 animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
              予約・顧客・売上・在庫——バラバラだった業務をひとつに。
              <br />
              奄美の事業者に寄り添う、あなた専用のシステム構築。
            </p>

            <div className="flex gap-3 md:gap-4 animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
              <a
                href="#contact"
                className="btn-cta bg-[#F5A623] text-black font-bold px-7 py-3.5 md:px-9 md:py-4 rounded-full text-sm md:text-base hover:bg-[#FFD700] transition-all hover:scale-105 shadow-lg shadow-[#F5A623]/25"
              >
                無料で相談する
              </a>
              <a
                href="#benefits"
                className="border border-white/15 text-white/60 hover:text-white hover:border-[#F5A623]/40 hover:bg-[#F5A623]/5 font-bold px-7 py-3.5 md:px-9 md:py-4 rounded-full text-sm md:text-base transition-all"
              >
                詳しく見る
              </a>
            </div>
          </div>

          {/* 右: スマホ体験型UI */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 animate-[fadeInUp_1s_ease-out_0.8s_both]">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── エクスポート（他コンポーネントで再利用可能にする） ─── */
export { ScrambleDigit, MascotSVG, WobblyText, HeroStoryAnimation, MiniAppCard, PhoneMockup };
