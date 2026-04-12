import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "島つむぎ整骨院 | 奄美大島の整骨院",
  description:
    "奄美大島の整骨院「島つむぎ整骨院」。肩こり・腰痛・スポーツ障害など、一人ひとりに合わせた丁寧な施術で身体の不調を改善します。",
};

export default function OsteopathicDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
