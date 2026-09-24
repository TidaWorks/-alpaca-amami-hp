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
};

export default function Slot({ id, label, className = "", tone = "a", src, alt = "", ground }: Props) {
  return (
    <div className={`tp-slot tp-slot--${tone} ${src ? "is-filled" : ""} ${className}`} data-slot={id}>
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
