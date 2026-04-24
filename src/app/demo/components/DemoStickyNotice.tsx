"use client";

export function DemoStickyNotice() {
  return (
    <div
      role="complementary"
      aria-label="ALPACAのデモサイト案内"
      className="fixed bottom-0 left-0 right-0 z-[1000]"
      style={{
        background: "linear-gradient(135deg, #0DA87E 0%, #12C998 100%)",
        boxShadow: "0 -6px 24px rgba(0,0,0,0.12)",
        fontFamily: "var(--font-noto-sans-jp), system-ui, sans-serif",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 py-2.5 md:py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/15 text-white text-[11px] md:text-xs font-black tracking-wider">
            DEMO
          </span>
          <p className="text-white text-xs md:text-sm font-semibold truncate">
            このサイトはALPACAのデモサイトです
          </p>
        </div>
        <a
          href="/web"
          className="flex-shrink-0 inline-flex items-center gap-1 bg-white text-[#0DA87E] rounded-full px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-xs font-bold hover:bg-gray-50 active:scale-95 transition-all"
        >
          他のデモを見る
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
