import type { CSSProperties } from "react";

/**
 * 「後で差し込む枠」。完成形の絵と同じ大きさ・位置・動きで置き、中に何の絵かを薄く書く。
 * 一覧: docs/research/hp-renew-2026-09-25/IMAGE-SLOTS.md（id で対応）
 * src を渡すとリポジトリにある絵で仮に埋める。
 */
type Props = {
  id: string;
  label: string;
  className?: string;
  tone?: "a" | "b" | "c" | "d";
  src?: string;
  alt?: string;
  /** 黄色い地面のような下敷きを敷く（イラスト枠） */
  ground?: boolean;
  /** 場面の絵は枠いっぱいに敷く（cover）。人物やパカ君の切り抜きは contain のまま */
  cover?: boolean;
  /** 切り抜き位置（object-position）。pos は PC、posSp はスマホ（767px 以下） */
  pos?: string;
  posSp?: string;
};

export default function Slot({ id, label, className = "", tone = "a", src, alt = "", ground, cover, pos, posSp }: Props) {
  const style = {
    ...(pos ? { "--tp-pos": pos } : {}),
    ...(posSp ? { "--tp-pos-sp": posSp } : {}),
  } as CSSProperties;
  return (
    <div
      className={`tp-slot tp-slot--${tone} ${src ? "is-filled" : ""} ${cover ? "is-cover" : ""} ${className}`}
      data-slot={id}
      style={pos || posSp ? style : undefined}
    >
      {ground && <span className="tp-slot__ground" aria-hidden="true" />}
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="tp-slot__img" src={src} alt={alt} loading="eager" decoding="async" />
      ) : (
        <span className="tp-slot__label" aria-hidden="true">
          <span className="tp-slot__id">{id}</span>
          画像: {label}
        </span>
      )}
    </div>
  );
}
