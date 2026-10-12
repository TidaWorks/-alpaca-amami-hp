/* eslint-disable @next/next/no-img-element */
import { jp } from "./jp";

// 制作の見本（架空のお店のホームページ3つ）。押すと実際に動く見本のページが開く（10/13 大地さん「3業種でデモを作ろう」）
const SAMPLES = [
  {
    href: "/samples/isago",
    slug: "isago",
    k: "宿",
    name: "isago",
    d: "浜から歩いて一分、六室だけの宿。写真を大きく見せ、字は少なく。",
  },
  {
    href: "/samples/kuroto",
    slug: "kuroto",
    k: "パン屋",
    name: "黒糖のパン屋 くろと",
    d: "白い地に黒い線の絵。パンの写真を切り抜いて、親しみやすく。",
  },
  {
    href: "/samples/yuigi",
    slug: "yuigi",
    k: "工務店",
    name: "結木工務店",
    d: "木の家の写真と細い字。施工例と問い合わせまでを一続きに。",
  },
];

export default function AwSamples() {
  return (
    <>
      <p className="aw-smp__lead" data-rise>
        {jp("架空のお店で作った、ホームページの見本です。押すと、実際に動くページが開きます。")}
      </p>
      <ul className="aw-smp">
        {SAMPLES.map((s, i) => (
          <li key={s.slug} className="aw-smp__item" data-rise>
            <a href={s.href} className="aw-smp__a" target="_blank" rel="noopener">
              <span className="aw-smp__shots">
                <span className="aw-smp__pc">
                  <img src={`/images/samples/${s.slug}-pc.webp`} alt="" loading="lazy" width={1200} height={750} />
                </span>
                <span className="aw-smp__sp">
                  <img src={`/images/samples/${s.slug}-sp.webp`} alt="" loading="lazy" width={390} height={780} />
                </span>
              </span>
              <span className="aw-smp__meta">
                <span className="aw-smp__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="aw-smp__k">{s.k}</span>
              </span>
              <span className="aw-smp__name">
                {s.name}
                <span className="aw-smp__open" aria-hidden="true">
                  ↗
                </span>
              </span>
              <span className="aw-smp__d">{jp(s.d)}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="aw-smp__fine">※ お店の名前・写真・文章はすべて架空です。写真は画像生成で作りました。</p>
    </>
  );
}
