import { IBM_Plex_Mono, Permanent_Marker, Shippori_Mincho_B1, Zen_Kaku_Gothic_New, Zen_Maru_Gothic } from "next/font/google";

// 見出し: しっぽり明朝 B1（太字だけ）。日本語は分割ファイルが多いので先読みしない
export const mincho = Shippori_Mincho_B1({
  weight: ["600", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--aw-mincho",
  preload: false,
});

// 本文: Zen角ゴシック New
export const gothic = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--aw-gothic",
  preload: false,
});

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

// 一番上の大見出し（10/4 決定のファーストビュー「あなたの仕事の、ベストパートナー。」）: Zen丸ゴシック 極太
export const maru = Zen_Maru_Gothic({
  weight: ["700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--aw-maru",
  preload: false,
});
