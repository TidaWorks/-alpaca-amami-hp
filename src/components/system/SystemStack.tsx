"use client";

import { useEffect, useRef, useState } from "react";

const stack = [
  {
    name: "Next.js",
    desc: "高速で堅牢なフロントエンド基盤",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.99 16.485l-7.97-9.42v9.42h-1.34V7.515h1.66l8.04 9.518V7.515h1.34v8.97h-1.73z" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    desc: "セキュアなデータベース・認証",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M21.362 9.354H12.0V.396c0-.31-.377-.464-.595-.243L2.638 9.107c-.243.245-.07.66.276.66h9.087V18.6c0 .31.377.464.595.243l8.767-8.954c.243-.245.07-.66-.276-.535z" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    desc: "高速デプロイ＆稼働率99.99%",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M24 22.525H0l12-21.05 12 21.05z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    desc: "型安全で長期保守に強い",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    desc: "保守しやすいUI設計",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    ),
  },
  {
    name: "LINE Messaging API",
    desc: "島の生活に近いLINE連携",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.345.28-.63.626-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
      </svg>
    ),
  },
];

export default function SystemStack() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-36 bg-white overflow-hidden border-t border-[#E5E7EB]"
    >
      <style>{`
        @keyframes stackIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        <div
          className="mb-12 md:mb-16 max-w-3xl transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-[#FF6B35] inline-block" />
            <p className="text-[11px] md:text-xs font-bold tracking-[0.3em] text-[#0A2540]">
              使用技術
            </p>
          </div>
          <h2
            className="text-[#0A2540] font-black leading-[1.05] mb-5"
            style={{ fontSize: "clamp(2rem, 7vw, 4.5rem)" }}
          >
            最新の技術で、
            <br />
            <span className="text-[#FF6B35]">長く使える</span>
            仕組みに。
          </h2>
          <p className="text-[#0A2540]/70 text-sm md:text-base leading-[1.9] font-medium">
            業界標準のモダンスタックで構築。スピード・セキュリティ・保守性を担保します。
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {stack.map((s, i) => (
            <div
              key={s.name}
              className="group relative bg-white border border-[#E5E7EB] rounded-xl p-5 md:p-6 hover:border-[#0A2540] hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              style={{
                opacity: 0,
                animation: visible ? `stackIn 0.6s ease ${i * 0.07}s forwards` : undefined,
              }}
            >
              <div className="text-[#0A2540] group-hover:text-[#FF6B35] mb-3 transition-colors duration-300">
                {s.icon}
              </div>
              <p className="text-[#0A2540] text-sm md:text-base font-bold mb-1">{s.name}</p>
              <p className="text-[#0A2540]/60 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
