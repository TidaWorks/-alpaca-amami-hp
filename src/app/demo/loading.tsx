export default function DemoLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0A0A]">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,166,35,0.06)_0%,transparent_60%)]" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Spinner ring */}
        <div className="relative w-12 h-12">
          <div
            className="absolute inset-0 rounded-full border-2 border-white/5"
          />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#F5A623]"
            style={{ animation: "demoSpin 0.8s linear infinite" }}
          />
        </div>

        {/* Text */}
        <p
          className="text-white/40 text-sm tracking-widest uppercase"
          style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
        >
          Loading
        </p>
      </div>

      <style>{`
        @keyframes demoSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
