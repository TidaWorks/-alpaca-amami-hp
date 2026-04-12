"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

const problems = [
  {
    title: "紙の書類が、どんどん増えていく",
    desc: "伝票、申請書、日報、顧客リスト。棚はいっぱい、探すだけで時間が消えていく。",
  },
  {
    title: "同じ情報を、何度も書いている",
    desc: "紙に書いて、Excelに打ち直して、また別の書類にも。手間も増えるし、ミスも増える。",
  },
  {
    title: "今月の数字を、すぐに出せない",
    desc: "売上、経費、件数。聞かれてもすぐ答えられない。月末にまとめて集計するのが精一杯。",
  },
  {
    title: "事務作業に追われて、本業が後回し",
    desc: "お客様のために使いたい時間が、書類整理や入力作業で消えていく。",
  },
];

function ProblemCard({ problem, index }: { problem: typeof problems[number]; index: number }) {
  const fade = useFadeIn();
  return (
    <div ref={fade.ref} className={`transition-all duration-700 ${fade.className}`}>
      <div className="flex items-start gap-4">
        <span className="text-2xl font-black text-[#0D9488]/20 leading-none mt-0.5">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h4 className="text-base font-bold text-gray-800 mb-1.5">{problem.title}</h4>
          <p className="text-sm text-gray-500 leading-relaxed">{problem.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function BusyPersonSection() {
  const fade = useFadeIn();

  return (
    <section className="relative py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div ref={fade.ref} className={`mb-14 transition-all duration-700 ${fade.className}`}>
          <p className="text-xs font-semibold tracking-[0.25em] text-[#0D9488] mb-3">PROBLEMS</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight">
            こんなこと、起きていませんか？
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl">
          {problems.map((p, i) => (
            <ProblemCard key={p.title} problem={p} index={i} />
          ))}
        </div>

        <div className="mt-14 max-w-4xl">
          <div className="border-t border-gray-200 pt-8">
            <p className="text-lg font-bold text-gray-800">
              その手間、仕組みでぐっと減らせます。
            </p>
            <p className="text-sm text-gray-500 mt-2">
              あなたの業務に合わせた専用システムで、日々の事務作業を大幅に削減します。
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="inline-block px-8 py-3 bg-gray-800 text-white text-sm font-semibold rounded-full hover:bg-gray-700 transition-colors">
            無料で相談する
          </a>
        </div>
      </div>
    </section>
  );
}
