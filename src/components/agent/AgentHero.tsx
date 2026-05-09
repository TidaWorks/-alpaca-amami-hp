"use client";

export default function AgentHero() {
  return (
    <section
      id="concept"
      className="relative overflow-hidden pt-28 md:pt-36 pb-24 md:pb-32"
    >
      {/* マジックアワー風グラデ背景 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1B3F] via-[#3B2C73] to-[#635BFF]" />
        {/* ミントの光のアクセント */}
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#12C998]/25 blur-[120px]" />
        <div className="absolute -bottom-40 -left-32 w-[520px] h-[520px] rounded-full bg-[#FF3D7F]/20 blur-[140px]" />
        {/* 下端フェード */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#F5F3FF] to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-14 items-center">
        {/* ── 左カラム ── */}
        <div className="relative">
          {/* セクション番号タグ */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="bg-white/15 backdrop-blur-sm text-white font-black text-[11px] tracking-widest px-2.5 py-1 rounded-full">
              01
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-white/80">
              AI AGENT FOR LINE
            </span>
          </div>

          {/* メインヘッドライン */}
          <h1 className="font-memphis-mincho text-white text-[2.2rem] md:text-[3.2rem] lg:text-[3.8rem] leading-[1.25] font-extrabold mb-7 tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
            営業時間外も、
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">24時間返事する</span>
              <span
                className="absolute inset-x-0 bottom-1 h-[35%] bg-[#12C998]/60 -z-0"
                aria-hidden="true"
              />
            </span>
            <br />
            お店のAIスタッフ。
          </h1>

          {/* サブコピー */}
          <p className="font-memphis-mincho text-white/85 text-[0.95rem] md:text-base leading-[2] mb-9 max-w-md">
            営業時間外の問い合わせ、もう取り逃しません。
            <br className="hidden md:block" />
            お店のLINE公式アカウントに、
            <br />
            予約・FAQ・営業案内を24時間こなす
            <br className="hidden md:block" />
            AIスタッフを設置します。
          </p>

          {/* CTAボタン群 */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#FF3D7F] text-white font-black text-sm px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all"
            >
              無料で相談する
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#features"
              className="inline-flex items-center text-sm font-black text-white underline decoration-[#12C998] decoration-[3px] underline-offset-[6px] hover:decoration-white transition-colors"
            >
              できることを見る →
            </a>
          </div>

          {/* 信頼ポイント */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12C998]" />
              LINE公式API使用（規約クリア）
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12C998]" />
              構築費 ¥50,000〜
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12C998]" />
              月額 ¥8,000〜
            </span>
          </div>
        </div>

        {/* ── 右カラム: LINEモック ── */}
        <div className="relative flex justify-center md:justify-end">
          {/* 装飾バッジ */}
          <span className="absolute top-2 left-2 md:left-0 z-30 bg-white/85 backdrop-blur text-[#1A202C] font-bold text-[10px] tracking-[0.18em] px-3 py-1.5 rounded-full ring-1 ring-white/40 shadow-sm">
            LINE × AI DEMO
          </span>

          {/* Phone Mock */}
          <div className="relative w-[260px] h-[520px] md:w-[290px] md:h-[580px] bg-[#1A202C] rounded-[40px] md:rounded-[44px] p-[6px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.55)]">
            {/* notch */}
            <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[80px] h-[22px] bg-black rounded-full z-20" />
            {/* screen */}
            <div className="relative w-full h-full rounded-[35px] md:rounded-[39px] overflow-hidden bg-[#7494C0]">
              {/* LINE上部バー */}
              <div className="absolute top-0 inset-x-0 h-12 bg-[#5A7DA6] flex items-center px-4 pt-3">
                <div className="w-7 h-7 rounded-full bg-[#12C998] flex items-center justify-center text-white font-black text-xs">
                  A
                </div>
                <div className="ml-2 text-white font-bold text-[13px]">
                  Bistro ADAN
                </div>
                <div className="ml-auto text-white/70 text-[10px]">14:23</div>
              </div>

              {/* チャット本体 */}
              <div className="absolute top-12 inset-x-0 bottom-12 px-3 py-4 flex flex-col gap-2.5 overflow-hidden">
                {/* お客さんメッセージ */}
                <div className="self-end max-w-[78%] bg-[#06C755] text-white text-[12px] px-3 py-2 rounded-2xl rounded-br-sm leading-snug shadow-sm">
                  今日19時に2名で予約できますか？
                </div>

                {/* AI返信 */}
                <div className="self-start max-w-[80%] bg-white text-[#1A202C] text-[12px] px-3 py-2 rounded-2xl rounded-bl-sm leading-snug shadow-sm">
                  ご予約ありがとうございます🌺
                  <br />
                  本日19時、2名様で空席ございます。
                  <br />
                  お名前を教えてください。
                </div>

                <div className="self-end max-w-[78%] bg-[#06C755] text-white text-[12px] px-3 py-2 rounded-2xl rounded-br-sm leading-snug shadow-sm">
                  作田です
                </div>

                <div className="self-start max-w-[80%] bg-white text-[#1A202C] text-[12px] px-3 py-2 rounded-2xl rounded-bl-sm leading-snug shadow-sm">
                  作田様、19時2名でご予約承りました。
                  <br />
                  ご来店お待ちしております🍷
                </div>

                <div className="self-start text-[9px] text-white/70 font-bold tracking-wider mt-1 px-1">
                  ✨ AIスタッフが自動応答中
                </div>
              </div>

              {/* 入力欄 */}
              <div className="absolute bottom-0 inset-x-0 h-12 bg-white/95 flex items-center px-3 gap-2">
                <div className="flex-1 h-7 rounded-full bg-[#F1F1F1] flex items-center px-3 text-[10px] text-[#999]">
                  メッセージを入力...
                </div>
                <div className="w-7 h-7 rounded-full bg-[#06C755] flex items-center justify-center text-white text-[10px] font-bold">
                  →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
