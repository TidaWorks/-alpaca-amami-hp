// 手で描いたような、ゆがんだ丸の枠（ボタン・見出しの札）。形は seed で少しずつ変える
// 画面に入ったら線を描くように枠を引く（data-rv → is-in。動きは kuroto.css）
const SHAPES = [
  "M14 34 C 10 14, 40 5, 98 6 C 156 7, 192 12, 194 33 C 196 54, 160 62, 100 61 C 40 60, 17 55, 14 34 Z",
  "M8 30 C 9 11, 52 4, 104 5 C 158 6, 191 15, 192 36 C 193 56, 150 63, 96 60 C 42 58, 7 50, 8 30 Z",
  "M12 37 C 6 17, 46 7, 100 4 C 151 2, 194 14, 193 34 C 192 55, 155 61, 101 62 C 47 63, 16 56, 12 37 Z",
];

export function PillShape({ seed = 0, className = "" }: { seed?: number; className?: string }) {
  return (
    <svg className={`kt-pill__svg ${className}`} viewBox="0 0 200 66" preserveAspectRatio="none" aria-hidden="true" data-rv>
      <path d={SHAPES[seed % SHAPES.length]} />
    </svg>
  );
}

export function Pill({
  children,
  href,
  seed = 0,
  big = false,
}: {
  children: React.ReactNode;
  href?: string;
  seed?: number;
  big?: boolean;
}) {
  const cls = `kt-pill ${big ? "kt-pill--big" : ""}`;
  if (href)
    return (
      <a className={cls} href={href}>
        <PillShape seed={seed} />
        <span>{children}</span>
      </a>
    );
  return (
    <span className={cls}>
      <PillShape seed={seed} />
      <span>{children}</span>
    </span>
  );
}
