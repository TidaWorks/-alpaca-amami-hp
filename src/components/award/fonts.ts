/**
 * 新トップの書体。全部ブラウザが Google Fonts から読む（page.tsx の link）。
 * next/font で持つとビルドの時に取りに行き、Vercel で時間切れが続いて本番の書き出しが落ちた（2026-10-06）。
 * 書体の名前は .aw-jpf（aw.css）で --aw-mincho / --aw-gothic / --aw-maru / --aw-mono / --aw-hand に入れる。
 */
export const JP_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@600;800&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=M+PLUS+Rounded+1c:wght@800;900&family=IBM+Plex+Mono:wght@400;500&family=Permanent+Marker&display=swap";

// 見出し: しっぽり明朝 B1／本文: Zen角ゴシック New／一番上の大見出し: M PLUS Rounded 1c／数字: IBM Plex Mono／英語の手書き: Permanent Marker
export const mincho = { variable: "aw-jpf" };
export const gothic = { variable: "aw-jpf" };
export const maru = { variable: "aw-jpf" };
export const mono = { variable: "aw-jpf" };
export const hand = { variable: "aw-jpf" };
