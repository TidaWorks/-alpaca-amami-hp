import Link from "next/link";

// 見本サイトの一番上に出す「架空のお店です」の帯。色は各サイトから渡す
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
      これは ALPACA が作ったホームページの見本です。お店・写真・文章はすべて架空です。
      <Link href="/#work" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3, marginLeft: 8, whiteSpace: "nowrap", display: "inline-block", padding: "13px 4px", margin: "-13px 0 -13px 4px" }}>
        ALPACA に戻る
      </Link>
    </div>
  );
}
