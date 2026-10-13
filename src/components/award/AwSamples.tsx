/* eslint-disable @next/next/no-img-element */
import type React from "react";
import { jp } from "./jp";
import AwShowcase from "./AwShowcase";
import { FlowBoxes } from "./AwServices";

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

export default function AwSamples({ flow, head }: { flow: { t: string; d: string }[]; head: React.ReactNode }) {
  return (
    <>
      <AwShowcase
        head={
          <>
            {head}
            <p className="aw-smp__lead">{jp("奄美のお店を想定して作った、ホームページの見本10本です。")}</p>
          </>
        }
      />
      <p className="aw-smp__fine">※ 掲載している店舗名・文章はすべて架空のもので、写真は AI により生成しています。実際の制作では、お客様にご用意いただいたお写真を加工・調整して使用いたします。</p>
      {/* 見本を見た流れで、頼んだ時の進め方まで読めるように（10/13 大地さん「1」でサービス欄のボタンから移した） */}
      <div className="aw-smp__flow">
        <FlowBoxes title="進め方" steps={flow} />
      </div>
    </>
  );
}
