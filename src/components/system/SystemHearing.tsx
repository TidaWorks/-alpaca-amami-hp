"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, MessageCircle, GitBranch } from "lucide-react";

const steps = [
  {
    Icon: Eye,
    title: "現場を、見に行く",
    description: "島内なら、ALPACAスタッフが直接お店や事務所に伺います。働く人の動き、紙の流れ、お客さんとのやり取り。現場でしか分からないことを観察します。",
  },
  {
    Icon: MessageCircle,
    title: "業務を、聞く",
    description: "「なんで毎日この紙を書いてるんですか？」を聞きます。長年の業務の中には、止めていい作業が必ず眠っています。それを一緒に棚卸しします。",
  },
  {
    Icon: GitBranch,
    title: "図にして、確認する",
    description: "聞いた業務を図解にしてお見せします。「こうなりますがOKですか？」を確認してから、初めてシステムをつくります。設計の前のすり合わせが大事です。",
  },
];

export default function SystemHearing() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hearing"
      className="relative bg-white py-28 md:py-36 px-6 md:px-10 overflow-hidden"
    >
      <div className="relative max-w-[1200px] mx-auto">
        {/* 章扉 */}
        <div
          className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 mb-16 md:mb-20 items-end transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div>
            <p className="inline-block text-[10px] tracking-[0.4em] text-[#2860E1] font-bold mb-5 px-3 py-1 rounded-full bg-[#2860E1]/10">
              ヒアリング — 設計の前にやること
            </p>
            <h2 className="text-[#1D2A6E] text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.25] tracking-tight">
              まず、
              <br />
              <span className="text-[#2860E1]">聞きに行きます。</span>
            </h2>
          </div>
          <div>
            <p className="text-[#2A2E45] text-base md:text-lg leading-loose max-w-md">
              現場を分かっている人だけが、業務に合うシステムをつくれます。だからALPACAの仕事は、ヒアリングから始まります。
            </p>
          </div>
        </div>

        {/* 3ステップカード */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-7">
          {steps.map(({ Icon, title, description }, i) => (
            <div
              key={title}
              className="relative bg-white rounded-3xl border border-[#E5E9F5] shadow-[0_4px_20px_rgba(40,96,225,0.06)] hover:shadow-[0_12px_36px_rgba(40,96,225,0.14)] hover:-translate-y-1 transition-all duration-300 p-7 md:p-8"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.8s ease ${0.2 + i * 0.12}s, transform 0.8s ease ${0.2 + i * 0.12}s, box-shadow 0.3s, translate 0.3s`,
              }}
            >
              {/* 番号 */}
              <p className="text-[10px] font-bold tracking-[0.3em] text-[#2860E1] mb-5">
                STEP {String(i + 1).padStart(2, "0")}
              </p>

              {/* アイコン円 */}
              <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2860E1] to-[#1D4FCE] items-center justify-center mb-6 shadow-[0_6px_18px_rgba(40,96,225,0.3)]">
                <Icon className="w-7 h-7 text-white" strokeWidth={2} aria-hidden="true" />
              </div>

              <h4 className="text-[#1D2A6E] text-xl md:text-2xl font-bold mb-4 leading-snug">
                {title}
              </h4>
              <p className="text-[#2A2E45] text-sm leading-loose">
                {description}
              </p>

              {/* 黄色アクセントドット */}
              <div className="mt-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FCD34D]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FCD34D]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FCD34D]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
