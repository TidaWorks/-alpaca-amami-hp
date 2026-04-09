import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "南風建設 | 奄美大島の建設・リフォーム",
  description:
    "奄美大島で創業20年。新築住宅、リフォーム、店舗内装、公共工事まで、地域に根ざした確かな施工で島の暮らしと未来をつくります。",
};

export default function ConstructionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
