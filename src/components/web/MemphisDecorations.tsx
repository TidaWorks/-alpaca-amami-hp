type SVGProps = React.SVGProps<SVGSVGElement>;

export function MemphisSquiggle({ color = "#FF2DA0", className = "", ...rest }: SVGProps & { color?: string }) {
  return (
    <svg viewBox="0 0 120 28" fill="none" className={className} aria-hidden="true" {...rest}>
      <path
        d="M2 14 C 14 2, 26 26, 38 14 S 62 2, 74 14 S 98 26, 110 14 L 118 14"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MemphisDots({ color = "#111111", className = "", ...rest }: SVGProps & { color?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill={color} className={className} aria-hidden="true" {...rest}>
      {[
        [10, 12], [28, 6], [46, 14], [64, 8],
        [16, 30], [38, 26], [58, 32], [72, 24],
        [8, 50], [26, 46], [44, 54], [62, 48],
        [18, 70], [38, 64], [56, 70], [70, 60],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={cx % 11 === 0 ? 3 : 2.2} />
      ))}
    </svg>
  );
}

export function MemphisBlob({ color = "#FFD600", className = "", ...rest }: SVGProps & { color?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill={color} className={className} aria-hidden="true" {...rest}>
      <path d="M60 6c22 0 50 18 52 44s-18 50-50 56-58-16-58-46S38 6 60 6Z" />
    </svg>
  );
}

export function MemphisTriangle({ color = "#00E0D1", className = "", ...rest }: SVGProps & { color?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill={color} className={className} aria-hidden="true" {...rest}>
      <polygon points="30,4 56,54 4,54" />
    </svg>
  );
}

export function MemphisRing({ color = "#FF2DA0", className = "", ...rest }: SVGProps & { color?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true" {...rest}>
      <circle cx="40" cy="40" r="34" stroke={color} strokeWidth="6" />
    </svg>
  );
}

export function MemphisWave({ color = "#00E0D1", className = "", ...rest }: SVGProps & { color?: string }) {
  return (
    <svg viewBox="0 0 160 40" fill="none" className={className} aria-hidden="true" {...rest}>
      <path
        d="M2 30 Q 22 4, 42 30 T 82 30 T 122 30 T 158 30"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MemphisPalm({ color = "#111111", className = "", ...rest }: SVGProps & { color?: string }) {
  return (
    <svg viewBox="0 0 120 140" fill={color} className={className} aria-hidden="true" {...rest}>
      <path d="M60 130 C 60 100, 56 70, 48 50 L 56 48 C 64 70, 64 100, 64 130 Z" />
      <path d="M60 50 C 30 40, 14 20, 8 6 C 22 8, 44 14, 60 30 Z" />
      <path d="M60 50 C 90 40, 106 20, 112 6 C 98 8, 76 14, 60 30 Z" />
      <path d="M60 50 C 28 56, 12 70, 6 86 C 22 78, 44 64, 60 60 Z" />
      <path d="M60 50 C 92 56, 108 70, 114 86 C 98 78, 76 64, 60 60 Z" />
    </svg>
  );
}

export function MemphisAlpacaIcon({ color = "#111111", className = "", ...rest }: SVGProps & { color?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true" {...rest}>
      <ellipse cx="40" cy="48" rx="18" ry="22" fill={color} />
      <circle cx="40" cy="22" r="14" fill={color} />
      <ellipse cx="34" cy="10" rx="4" ry="8" fill={color} />
      <ellipse cx="46" cy="10" rx="4" ry="8" fill={color} />
      <circle cx="35" cy="22" r="2" fill="#fff" />
      <circle cx="45" cy="22" r="2" fill="#fff" />
    </svg>
  );
}
