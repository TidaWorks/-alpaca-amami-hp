import type { Metadata } from "next";

// 見本サイト（架空のお店）。検索に出さない
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SamplesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
