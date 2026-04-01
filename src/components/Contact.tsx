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
      const res = await fetch("https://formspree.io/f/xaqljdkw", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-32 bg-[#0a0a0a] text-white overflow-hidden">
      {/* 背景グロー */}
      <div className="absolute top-[30%] left-[40%] w-[500px] h-[500px] bg-[#F5A623]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* 左: 大きなコピー */}
          <div ref={fade.ref} className={`md:w-1/2 transition-all duration-700 ${fade.className}`}>
            <p className="text-[#F5A623] font-medium tracking-[0.3em] text-xs mb-4">CONTACT</p>
            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              気軽に
              <br />
              <span className="text-[#F5A623]">聞いて</span>ください。
            </h2>
            <p className="text-white/50 text-base leading-relaxed">
              「こんなアプリ、作れる？」で大丈夫。
              <br />
              相談もお見積りも無料です。
            </p>
          </div>

          {/* 右: フォーム */}
          <div className="md:w-1/2">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[#2ECC71]/20 flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#2ECC71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">送信完了しました！</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  お問い合わせありがとうございます。
                  <br />
                  内容を確認の上、折り返しご連絡いたします。
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-[#F5A623] text-sm font-medium hover:underline"
                >
                  もう一度送信する
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2 tracking-wider">NAME</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder-white/20 focus:outline-none focus:border-[#F5A623] transition-colors text-base"
                    placeholder="山田 太郎"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2 tracking-wider">EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder-white/20 focus:outline-none focus:border-[#F5A623] transition-colors text-base"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2 tracking-wider">SERVICE</label>
                  <select
                    name="service"
                    required
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white focus:outline-none focus:border-[#F5A623] transition-colors text-base"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-gray-800">選択してください</option>
                    <option value="website" className="text-gray-800">ホームページ制作の相談</option>
                    <option value="system" className="text-gray-800">システム開発の相談</option>
                    <option value="line" className="text-gray-800">LINE構築・予約システムの相談</option>
                    <option value="maintenance" className="text-gray-800">保守・運用サポートの相談</option>
                    <option value="other" className="text-gray-800">まずは話を聞きたい</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2 tracking-wider">MESSAGE</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder-white/20 focus:outline-none focus:border-[#F5A623] resize-none transition-colors text-base"
                    placeholder="ご相談内容をお聞かせください"
                  />
                </div>

                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    <p className="text-red-400 text-sm">送信に失敗しました。もう一度お試しください。</p>
                  </div>
                )}

                <div className="text-center md:text-left">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={`btn-cta bg-[#F5A623] text-black font-bold px-10 py-4 rounded-full text-base transition-all mt-4 ${
                      status === "sending"
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-[#FFD700] hover:scale-105"
                    }`}
                  >
                    {status === "sending" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                          <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        送信中...
                      </span>
                    ) : (
                      "送信する"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
