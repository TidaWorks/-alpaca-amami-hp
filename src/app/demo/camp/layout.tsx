import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "AMAMI FOREST CAMP | 奄美大島のグランピング・キャンプ場",
  description: "奄美大島の自然の中でグランピング・キャンプを満喫。手ぶらBBQ、海まで徒歩5分。ファミリー・友達・団体利用OK。",
};
export default function CampDemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
