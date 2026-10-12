/* eslint-disable @next/next/no-img-element */
import { jp } from "./jp";

// 制作の見本（架空のお店のホームページ3つ）。押すと実際に動く見本のページが開く（10/13 大地さん「3業種でデモを作ろう」）
const SAMPLES = [
  { href: "/samples/isago", slug: "isago", k: "宿", name: "isago", d: "浜から歩いて一分、六室だけの宿。写真を大きく見せ、字は少なく。" },
  { href: "/samples/kuroto", slug: "kuroto", k: "パン屋", name: "黒糖のパン屋 くろと", d: "白い地に黒い線の絵。パンの写真を切り抜いて、親しみやすく。" },
  { href: "/samples/yuigi", slug: "yuigi", k: "工務店", name: "結木工務店", d: "木の家の写真と細い字。施工例と問い合わせまでを一続きに。" },
  { href: "/samples/soyo", slug: "soyo", k: "美容室", name: "hair room soyo", d: "生成りの地に小さな文字。手元の写真で、店の静けさを見せる。" },
  { href: "/samples/kamado", slug: "kamado", k: "食堂", name: "島の食堂 かまど", d: "料理の写真を額のように置く。昼と夜の品書きを分けて読みやすく。" },
  { href: "/samples/kaiji", slug: "kaiji", k: "ダイビング", name: "KAIJI DIVE", d: "白い地に海の青を1色。今日の水温と波を一番上に。" },
  { href: "/samples/yururi", slug: "yururi", k: "整骨院", name: "ゆるり整骨院", d: "淡い色と丸い写真。受付時間と料金をすぐ見つけられるように。" },
  { href: "/samples/minato", slug: "minato", k: "税理士事務所", name: "みなと税理士事務所", d: "大きな欧文の名前と深い青の面。料金の目安と相談の流れまで。" },
  { href: "/samples/hinata", slug: "hinata", k: "農園", name: "ひなた農園", d: "白い地に橙の丸。注文の時期と箱の大きさを分かりやすく。" },
  { href: "/samples/amairo", slug: "amairo", k: "工房", name: "泥染め工房 あまいろ", d: "大きな写真と縦書きの明朝。染めの体験と小物の販売を一枚に。" },
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
