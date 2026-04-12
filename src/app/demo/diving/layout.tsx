import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BLUE AMAMI | 奄美大島のダイビングショップ",
  description:
    "奄美大島のダイビングショップ BLUE AMAMI。体験ダイビングからファンダイビングまで、奄美の美しい海を満喫できるコースをご用意しています。",
};

export default function DivingDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
