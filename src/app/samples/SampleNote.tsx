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
      <style>{`.smp-note__sp{display:none}@media (max-width:640px){.smp-note__pc{display:none}.smp-note__sp{display:inline}}`}</style>
      <span className="smp-note__pc">
        これは ALPACA が作ったホームページの見本です。お店と文章は架空で、写真は AI で作りました。実際の制作では、お店で用意していただいた写真を整えて使います。
      </span>
      <span className="smp-note__sp">ALPACA の見本です。店と文章は架空、写真は AI。実際はお店の写真を整えて使います。</span>
      <Link href="/#work" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3, marginLeft: 8, whiteSpace: "nowrap", display: "inline-block", padding: "13px 4px", margin: "-13px 0 -13px 4px" }}>
        ALPACA に戻る
      </Link>
    </div>
  );
}
