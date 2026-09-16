import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "奄美旅行中の一時預かり | 保育園LPデモ",
  description:
    "奄美旅行中のお子さまをお預かりする、一時預かりサービスのランディングページデモです。",
};

export default function NurseryDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        body:has(.nursery-page) [aria-label="ALPACA制作のデモサイトです"],
        body:has(.nursery-page) [aria-label="ALPACAのデモサイト案内"] { display: none !important; }
        body:has(.nursery-page) main#main > div { padding-bottom: 0 !important; }
      `}</style>
      {children}
    </>
  );
}
