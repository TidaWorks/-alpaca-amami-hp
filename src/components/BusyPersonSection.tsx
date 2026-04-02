"use client";

import { useState, useEffect } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";

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

export default function BusyPersonSection() {
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

          {/* 右: アニメーション */}
          <div className="md:w-1/2 flex justify-center">
            <div className="busy-person-scene">
              <svg viewBox="0 0 500 310" fill="none" className="w-full h-full">
                {/* デスク */}
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

                {/* キャラ */}
                <g style={{
                  transform: `translateX(${current.x}px)`,
                  transition: isWalking ? "transform 1.2s ease-in-out" : "transform 0.3s ease",
                }}>
                  <g style={{ animation: bounceAnim }}>
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

                    {isStressed && (
                      <g>
                        <text x="275" y="58" fill="#F5A623" fontSize="22" fontWeight="900" style={{ animation: "sweatPop 1.5s ease-out infinite" }}>！</text>
                      </g>
                    )}

                    {/* 頭 */}
                    <g style={{ animation: headAnim, transformOrigin: "250px 90px" }}>
                      <path d="M222 82 Q222 55 250 50 Q278 55 278 82 L275 88 Q270 80 250 78 Q230 80 225 88 Z"
                        fill="#222" stroke="#222" strokeWidth="2.5" />
                      <ellipse cx="250" cy="92" rx="26" ry="28" fill="white" stroke="#222" strokeWidth="3" />
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
                      <path d="M234 83 Q238 86 244 84" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <path d="M266 83 Q262 86 256 84" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <circle cx="250" cy="96" r="1" fill="#222" />
                      {isPhone ? (
                        <ellipse cx="250" cy="106" rx="5" ry="4" fill="#222" />
                      ) : isStressed ? (
                        <path d="M242 108 Q250 100 258 108" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
                      ) : (
                        <path d="M244 106 Q250 102 256 106" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
                      )}
                      <ellipse cx="224" cy="92" rx="4" ry="6" fill="white" stroke="#222" strokeWidth="2.5" />
                      <ellipse cx="276" cy="92" rx="4" ry="6" fill="white" stroke="#222" strokeWidth="2.5" />
                    </g>

                    {/* 首 */}
                    <rect x="244" y="118" width="12" height="8" rx="2" fill="white" stroke="#222" strokeWidth="2.5" />

                    {/* 体 */}
                    <path d="M222 132 Q222 126 234 126 L266 126 Q278 126 278 132 L280 195 Q280 200 274 200 L226 200 Q220 200 220 195 Z"
                      fill="#2E6EB5" stroke="#222" strokeWidth="3" />
                    <path d="M234 126 L240 126 L250 145 L240 145 Z" fill="#3A82CC" stroke="#222" strokeWidth="2" />
                    <path d="M266 126 L260 126 L250 145 L260 145 Z" fill="#3A82CC" stroke="#222" strokeWidth="2" />
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
