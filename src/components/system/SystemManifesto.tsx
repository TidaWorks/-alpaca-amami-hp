"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock, MapPin } from "lucide-react";

export default function SystemManifesto() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-white py-28 md:py-36 px-6 overflow-hidden"
    >
      <div className="relative max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          {/* 左：見出しブロック */}
          <div>
            <p
              className="inline-block text-[10px] tracking-[0.4em] text-[#2860E1] font-bold mb-5 px-3 py-1 rounded-full bg-[#2860E1]/10 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
              }}
            >
              ALPACAについて
            </p>
            <h2
              className="text-[#1D2A6E] text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.25] tracking-tight transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "0.15s",
              }}
            >
              仕組みで、
              <br />
              <span className="text-[#2860E1]">変える。</span>
            </h2>
            <p
              className="text-[#2A2E45] text-base md:text-lg leading-loose mt-8 max-w-md transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "0.3s",
              }}
            >
              業種・規模に合わせて、必要な機能だけのシステムを設計します。
              島内なら直接伺えるので、現場の業務を聞いてから図面に起こす、そんな仕事の進め方ができます。
            </p>
          </div>

          {/* 右：実績カード＋CTA */}
          <div className="space-y-8">
            <h3
              className="text-[#1D2A6E] text-2xl md:text-3xl font-bold leading-[1.3] transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "0.25s",
              }}
            >
              奄美大島で、
              <br />
              業務システムをつくっています。
            </h3>

            <div
              className="grid grid-cols-2 gap-4 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "0.45s",
              }}
            >
              <div className="bg-[#F4F6FF] border border-[#E5E9F5] rounded-3xl p-7">
                <Clock className="w-7 h-7 text-[#2860E1] mb-5" strokeWidth={2} aria-hidden="true" />
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[#1D2A6E] text-5xl md:text-6xl font-bold tabular-nums leading-none">
                    2
                  </span>
                  <span className="text-[#2860E1] text-base font-bold">週間〜</span>
                </div>
                <p className="text-[#5A6280] text-xs font-bold tracking-wide mt-3">
                  最短納品
                </p>
              </div>

              <div className="bg-[#F4F6FF] border border-[#E5E9F5] rounded-3xl p-7">
                <MapPin className="w-7 h-7 text-[#2860E1] mb-5" strokeWidth={2} aria-hidden="true" />
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[#1D2A6E] text-4xl md:text-5xl font-bold leading-none">
                    対面
                  </span>
                  <span className="text-[#2860E1] text-base font-bold">OK</span>
                </div>
                <p className="text-[#5A6280] text-xs font-bold tracking-wide mt-3">
                  奄美島内ヒアリング可
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "0.65s",
              }}
            >
              <span className="inline-flex items-center gap-2 bg-[#2860E1] text-white font-bold text-sm md:text-base rounded-full px-7 py-3.5 hover:bg-[#1D4FCE] transition-all duration-300 shadow-[0_4px_16px_rgba(40,96,225,0.3)] hover:shadow-[0_8px_24px_rgba(40,96,225,0.4)]">
                ALPACAに相談する
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
