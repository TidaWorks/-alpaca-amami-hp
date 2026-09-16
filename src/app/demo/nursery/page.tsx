"use client";

import Image from "next/image";

const imagePath = "/images/demo/nursery/";
const lineUrl = "#inquiry"; // 公開時に園の公式LINE URLへ置換

export default function NurseryPage() {
  return (
    <main className="nursery-page min-h-screen overflow-hidden bg-[#fcfaf5] font-[var(--font-shippori-gothic)] text-[#092d55]">
      <section className="relative h-[130vw] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[96vw] overflow-hidden">
          <Image src={`${imagePath}hero-entry-v1.png`} alt="保育スタッフに迎えられるお子さま" fill priority className="object-cover object-[58%_48%]" />
          <div className="absolute left-0 top-0 h-[72%] w-[24.5%] bg-[#fcfaf5]" />
          <div className="absolute left-[4.5%] top-[5%] w-[16%] text-[9px] font-medium leading-[1.95] tracking-[.04em] text-[#092d55] md:text-sm">
            あまみで、<br />子どもも、旅をする。<span className="my-4 block h-px w-5 bg-[#092d55]" />旅のあいだ、<br />あずけられる、<br />もうひとつの居場所。
          </div>
        </div>

        <div className="absolute -left-[62vw] top-[61vw] h-[83vw] w-[188vw] rounded-[50%] bg-[#fcfaf5]" />

        <h1 className="absolute left-[3.5%] top-[75vw] font-[var(--font-shippori-mincho)] text-[clamp(3.2rem,13.8vw,6.4rem)] font-normal leading-[1.18] tracking-[-.13em]">旅する<br />こどもの<br />保育園</h1>
        <p className="absolute left-[52%] top-[113vw] w-[15%] font-[var(--font-shippori-mincho)] text-[9px] font-normal leading-[1.85] tracking-[.07em] md:text-sm">あまみの<br />やさしさに、<br />あずけてみる。</p>
        <p className="absolute left-[70%] top-[102vw] rotate-[-9deg] font-[var(--font-zen-kurenaido)] text-[10px] leading-[1.55] text-[#d65f4d] md:text-base">ここにも、<br />こんな時間がある。</p>
        <div className="absolute right-[-1%] top-[109vw] w-[31%] rotate-[-5deg] overflow-hidden border-[3px] border-[#fcfaf5] shadow-[0_8px_18px_rgba(9,45,85,.1)]"><Image src={`${imagePath}amami-coast-v1.png`} alt="奄美の海" width={1536} height={1024} loading="eager" className="h-auto w-full" /></div>
      </section>

      <section className="relative h-[48vw] bg-[#fcfaf5]">
        <div className="absolute left-0 top-0 h-[31vw] w-[56%] overflow-hidden"><Image src={`${imagePath}children-playing-v1.png`} alt="園で遊ぶ子どもたち" fill loading="eager" className="object-cover" /></div>
        <p className="absolute left-[61%] top-[2vw] font-[var(--font-zen-kurenaido)] text-[clamp(1.1rem,4vw,2.1rem)] leading-[1.45] text-[#d65f4d]">あそぶ。<br />たべる。<br />みつける。</p>
        <p className="absolute left-[61%] top-[23vw] w-[35%] text-[9px] font-medium leading-[1.9] text-[#092d55] md:text-base">島の自然のなかで、こどもたちは、旅人であり、まいにちが発見です。</p>
        <div className="absolute left-[79%] top-[36vw] w-[19%] rotate-[-6deg] whitespace-nowrap font-[var(--font-zen-kurenaido)] text-[9px] leading-[1.55] md:text-base">はじめての地も、<br />どうぞ気軽に。</div>
        <a href={lineUrl} className="absolute left-[4.3%] top-[35vw] flex h-[9.5vw] w-[55.5%] items-center justify-between bg-[#092d55] px-[5%] text-[11px] font-bold tracking-[.07em] text-white transition hover:bg-[#154c7c] md:text-base">LINEで気軽に問い合わせる <span className="text-lg font-normal">→</span></a>
        <div className="absolute right-[21%] top-[36vw] h-[12vw] w-[12vw] text-[#092d55] opacity-90"><Hibiscus /></div>
      </section>

      <section id="inquiry" className="relative h-[31vw] min-h-[121px] max-h-[170px] overflow-hidden text-[#092d55]">
        <Image src={`${imagePath}amami-beach-v1.png`} alt="奄美の砂浜と海" fill loading="eager" className="object-cover object-[48%_60%]" />
        <div className="absolute inset-0 bg-[#d7f4ef]/15" />
        <div className="absolute left-[5%] top-[16%] font-[var(--font-shippori-mincho)] text-[11px] font-normal leading-[1.85] tracking-[.07em] md:text-base">あまみで出会う、<br />もうひとつの、家族のかたち。<span className="mt-3 block h-px w-6 bg-[#092d55]" /></div>
        <p className="absolute bottom-[10%] left-[5%] font-[var(--font-shippori-mincho)] text-[8px] font-normal leading-[1.8] md:text-xs">こどもたちの、<br />やさしい旅の思い出を、ここから。</p>
      </section>
    </main>
  );
}

function Hibiscus() {
  return <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M48 48C21 45 12 20 29 13c13-6 23 6 25 24C59 17 77 10 87 23c9 13-5 25-24 28 20 5 24 24 9 32-14 7-24-7-25-24-8 19-26 22-33 9-7-14 7-22 25-22Z" /><path d="M48 48c8 12 14 24 13 43M61 91l-6-5M61 91l5-6" /><circle cx="49" cy="48" r="4" /></svg>;
}
