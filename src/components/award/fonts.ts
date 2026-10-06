import { IBM_Plex_Mono, Permanent_Marker } from "next/font/google";

/**
 * 日本語の3書体（しっぽり明朝 B1・Zen角ゴシック New・M PLUS Rounded 1c）は、ブラウザが Google Fonts から読む。
 * next/font で持つとビルドの時に分割ファイルを数百本取りに行き、Vercel で時間切れになって本番の書き出しが落ちた（2026-10-06）。
 * 書体の名前は .aw-jpf（aw.css）で --aw-mincho / --aw-gothic / --aw-maru に入れる。
 */
export const JP_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@600;800&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=M+PLUS+Rounded+1c:wght@800;900&display=swap";

// 見出し: しっぽり明朝 B1（太字だけ）。日本語は分割ファイルが多いので先読みしない
export const mincho = { variable: "aw-jpf" };

// 本文: Zen角ゴシック New
export const gothic = { variable: "aw-jpf" };

// 数字と小さな印: IBM Plex Mono（英数字だけ）
export const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--aw-mono",
});

// 英語の手書きの見出し（Our Services など）: Permanent Marker
export const hand = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--aw-hand",
});

// 一番上の大見出し（10/4 決定のファーストビュー「あなたの仕事の、ベストパートナー。」）: M PLUS Rounded 1c 極太（見本の画像の字に寄せる）
export const maru = { variable: "aw-jpf" };
