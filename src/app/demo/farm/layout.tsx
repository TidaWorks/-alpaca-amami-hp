import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "あまみ果樹園 太陽のしずく | 奄美大島の直売農園",
  description:
    "奄美大島の直売農園「あまみ果樹園 太陽のしずく」。完熟マンゴーやパッションフルーツなど、南国の恵みを農園から直接お届けします。",
};

export default function FarmDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
