import { DemoBanner } from "./components/DemoBanner";
import { DemoStickyNotice } from "./components/DemoStickyNotice";

// 書体はブラウザが読む（変数名は globals.css の .gf-demo）。next/font はビルドの時に取りに行き Vercel で時間切れになった（2026-10-06）
const DEMO_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;800;900&family=Noto+Serif+JP:wght@300;400;500;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Jost:wght@300;400;500;600;700;800;900&family=Caveat:wght@400;500;600;700&family=M+PLUS+Rounded+1c:wght@400;500;700;800&display=swap";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="gf-demo"
      style={{ paddingBottom: "64px" }}
    >
      <link rel="stylesheet" href={DEMO_FONTS_HREF} precedence="default" />
      {children}
      <DemoBanner tone="brand" />
      <DemoStickyNotice />
    </div>
  );
}
