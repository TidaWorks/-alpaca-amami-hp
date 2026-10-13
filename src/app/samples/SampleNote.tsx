import Link from "next/link";

// 見本サイトの一番上に出す「架空のお店です」の帯。色は各サイトから渡す
// 「ALPACA トップへ」は見本欄（ギャラリー）に戻す（10/13 総チェック）
export default function SampleNote({
  bg,
  fg,
  font,
}: {
  bg: string;
  fg: string;
  font?: string;
}) {
  return (
    <div
      className="smp-note"
      style={{
        background: bg,
        color: fg,
        fontFamily: font,
        fontSize: 12,
        letterSpacing: "0.08em",
        lineHeight: 1.6,
        padding: "8px 16px",
        textAlign: "center",
        position: "relative",
        zIndex: 60,
      }}
    >
      <style>{`.smp-note{text-wrap:balance}.smp-note__sp{display:none}@media (max-width:640px){.smp-note{text-wrap:wrap;font-size:11px!important;letter-spacing:0.02em!important;padding:7px 12px!important}.smp-note__pc{display:none}.smp-note__sp{display:inline}}`}</style>
      <span className="smp-note__pc">
        本サイトは ALPACA が制作したホームページのデザイン見本です。掲載している店舗名・文章はすべて架空のもので、写真は AI により生成しています。実際の制作では、お客様にご用意いただいたお写真を加工・調整して使用いたします。
      </span>
      <span className="smp-note__sp">ALPACA 制作の見本です。店舗・文章は架空、写真は AI 生成（実際はお客様のお写真を使用）。</span>
      <Link href="/#samples" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3, marginLeft: 8, whiteSpace: "nowrap", display: "inline-block", padding: "13px 4px", margin: "-13px 0 -13px 4px" }}>
        ALPACA トップへ
      </Link>
    </div>
  );
}
