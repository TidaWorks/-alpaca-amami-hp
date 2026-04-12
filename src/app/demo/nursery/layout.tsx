import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ひだまり保育園 | 奄美大島の認可保育園",
  description:
    "奄美大島の認可保育園「ひだまり保育園」。豊かな自然の中で子どもたちの個性を大切に育む、あたたかい保育を実践しています。",
};

export default function NurseryDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
