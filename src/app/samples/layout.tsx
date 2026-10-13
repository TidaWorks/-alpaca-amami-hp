import type { Metadata } from "next";
import PhraseWrap from "./PhraseWrap";

// 見本サイト（架空のお店）。検索に出さない
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PhraseWrap />
      {children}
    </>
  );
}
