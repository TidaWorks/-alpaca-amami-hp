/**
 * セクション境界の斜めカット（2026-06-10 デザイン底上げ③）。
 * 上のセクション背景色 `from` の三角形を、下のセクション背景色 `to` の帯に重ねて
 * 水平区切りの単調さを崩す。装飾なので aria-hidden。
 */
type SectionDividerProps = {
  /** 上のセクションの背景色 */
  from: string;
  /** 下のセクションの背景色 */
  to?: string;
  /** 斜めの向きを反転（既定: 左下がり） */
  flip?: boolean;
  /** 帯の高さ(px)。モバイルでは 60% に縮む */
  height?: number;
};

export default function SectionDivider({
  from,
  to = "#FFFFFF",
  flip = false,
  height = 72,
}: SectionDividerProps) {
  return (
    <div
      aria-hidden
      className="relative w-full [height:calc(var(--divider-h)*0.6)] md:[height:var(--divider-h)]"
      style={{ background: to, ["--divider-h" as string]: `${height}px` }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: from,
          clipPath: flip
            ? "polygon(0 0, 100% 0, 100% 100%)"
            : "polygon(0 0, 100% 0, 0 100%)",
        }}
      />
    </div>
  );
}
