"use client";

import { useState, FormEvent } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Contact() {
  const fade = useFadeIn();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xpqkarwn", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) { setStatus("success"); form.reset(); } else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* ── 上段：CTA ── */}
        <div ref={fade.ref} className={`text-center mb-14 md:mb-20 transition-all duration-700 ${fade.className}`}>
          <img
            src="/images/alpaca/alpaca-wink.png"
            alt="ウインクしているアルパカ"
            aria-hidden="true"
            className="w-32 md:w-40 mx-auto mb-5 pointer-events-none select-none"
          />
          <p className="text-xs font-semibold tracking-[0.25em] text-[#0D9488] mb-3">CONTACT</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight mb-4">
            気軽に聞いてください。
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
            「こんなアプリ、作れる？」で大丈夫。
            <br />
            相談もお見積りも無料です。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="tel:080-2790-6757"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D9488] text-white text-sm font-semibold hover:bg-[#0F766E] transition-all w-full sm:w-auto justify-center"
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              080-2790-6757
            </a>
            <a
              href="mailto:alpaca.amami@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:border-[#0D9488] hover:text-[#0D9488] transition-all w-full sm:w-auto justify-center"
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/>
              </svg>
              メールで相談
            </a>
            <a
              href="https://instagram.com/alpaca_amami"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:border-[#0D9488] hover:text-[#0D9488] transition-all w-full sm:w-auto justify-center"
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              DMで相談
            </a>
          </div>
        </div>

        {/* ── 区切り ── */}
        <div className="flex items-center gap-4 mb-14 md:mb-20">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs font-medium tracking-[0.2em] text-gray-400">OR FROM FORM</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ── 下段：フォーム ── */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-2">フォームから相談する</h3>
          <p className="text-gray-500 text-sm text-center mb-8">必要事項を入力して送信してください</p>
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">送信完了しました！</h3>
                <p className="text-gray-500 text-sm">内容を確認の上、折り返しご連絡いたします。</p>
                <button onClick={() => setStatus("idle")} className="text-[#0D9488] text-sm font-medium hover:underline mt-4">もう一度送信する</button>
              </div>
            ) : (
              <form className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-gray-500 mb-1.5">お名前</label>
                  <input type="text" name="name" id="contact-name" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all" placeholder="山田 太郎" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-gray-500 mb-1.5">メールアドレス</label>
                  <input type="email" name="email" id="contact-email" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all" placeholder="example@email.com" />
                </div>
                <div>
                  <label htmlFor="contact-service" className="block text-xs font-medium text-gray-500 mb-1.5">ご相談内容</label>
                  <select name="service" id="contact-service" required defaultValue="" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all">
                    <option value="" disabled>選択してください</option>
                    <option value="system">システム開発の相談</option>
                    <option value="website">ホームページ制作の相談</option>
                    <option value="line">LINE構築・予約システムの相談</option>
                    <option value="maintenance">保守・運用サポートの相談</option>
                    <option value="other">まずは話を聞きたい</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-gray-500 mb-1.5">メッセージ</label>
                  <textarea name="message" id="contact-message" required rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] resize-y transition-all" placeholder="ご相談内容をお聞かせください" />
                </div>
                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    <p className="text-red-500 text-sm">送信に失敗しました。もう一度お試しください。</p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`w-full py-3 rounded-xl bg-gray-800 text-white text-sm font-semibold transition-all ${
                    status === "sending" ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-700"
                  }`}
                >
                  {status === "sending" ? "送信中..." : "送信する"}
                </button>
              </form>
            )}
        </div>
      </div>
    </section>
  );
}
