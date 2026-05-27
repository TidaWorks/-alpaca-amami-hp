import Link from "next/link";
import HomeHeader from "@/components/home/HomeHeader";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "ALPACAの特定商取引法に基づく表記。販売事業者・所在地・料金・支払方法・解約条件などを明示しています。",
  robots: { index: true, follow: true },
};

export default function TokushohoPage() {
  return (
    <>
      <HomeHeader />
      <main className="bg-white text-[#1A202C] pt-28 md:pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A] mb-3">
              SPECIFIED COMMERCIAL TRANSACTIONS ACT
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              特定商取引法に基づく表記
            </h1>
            <p className="text-sm text-[#1A202C]/65">
              最終更新日: 2026年5月26日
            </p>
          </div>

          <div className="space-y-10 text-[15px] leading-[1.9]">
            <Row label="販売事業者名">ALPACA（アルパカ）</Row>

            <Row label="運営責任者">作田 大地</Row>

            <Row label="所在地">{SITE.address}</Row>

            <Row label="電話番号">
              <a
                href={SITE.contact.telHref}
                className="text-[#635BFF] underline-offset-4 hover:underline"
                suppressHydrationWarning
              >
                {SITE.contact.tel}
              </a>
              <br />
              <span className="text-xs text-[#1A202C]/60">
                ※ お問い合わせは原則メールにて承っております。
              </span>
            </Row>

            <Row label="メールアドレス">
              <a
                href={SITE.contact.emailHref}
                className="text-[#635BFF] underline-offset-4 hover:underline"
              >
                {SITE.contact.email}
              </a>
            </Row>

            <Row label="販売価格">
              <ul className="space-y-1.5">
                <li>ランディングページ制作：¥70,000〜¥120,000（税別）</li>
                <li>ホームページ制作：¥250,000〜¥400,000（税別）</li>
                <li>業務システム開発：¥300,000〜（要見積もり、税別）</li>
                <li>
                  アルパカスマート（月額AIサポート）：月額¥30,000（税別）
                </li>
                <li>スポットMTG：¥5,000（税別）</li>
              </ul>
              <p className="text-xs text-[#1A202C]/60 mt-2">
                ※ 具体的な金額は、要件ヒアリング後のお見積もりにて確定します。
              </p>
            </Row>

            <Row label="商品代金以外の必要料金">
              <ul className="space-y-1.5">
                <li>消費税</li>
                <li>銀行振込手数料（お客様負担）</li>
                <li>
                  AIサービスのAPI利用料実費（アルパカスマートで該当ツールを利用する場合、月¥1,500〜¥7,500目安）
                </li>
              </ul>
            </Row>

            <Row label="支払方法">
              <ul className="space-y-1.5">
                <li>銀行振込</li>
                <li>クレジットカード決済（Stripe）</li>
              </ul>
            </Row>

            <Row label="支払時期">
              <ul className="space-y-1.5">
                <li>
                  スポット案件（HP・LP・システム開発）：契約時に着手金として50%、納品時に残金50%
                </li>
                <li>
                  アルパカスマート（月額サブスク）：月額前払い。毎月1日に当月分を請求し、月末までにお支払いいただきます。
                </li>
              </ul>
            </Row>

            <Row label="役務の提供時期">
              <ul className="space-y-1.5">
                <li>スポット案件：契約後、合意した納期に応じて提供します。</li>
                <li>
                  アルパカスマート：契約成立後、即時に提供を開始します。
                </li>
              </ul>
            </Row>

            <Row label="キャンセル・解約・返金">
              <p className="mb-3 font-bold">アルパカスマート（月額サブスク）</p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>最低契約期間はなく、いつでも月単位で解約可能です。</li>
                <li>解約は前月末までにチャット経由でご連絡ください。</li>
                <li>既にお支払い済みの月額料金は返金できません。</li>
              </ul>
              <p className="mb-3 font-bold">スポット案件</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  作業着手前の解約は、着手金を全額返金いたします（振込手数料を除く）。
                </li>
                <li>
                  作業着手後の解約は、進捗に応じたキャンセル料を申し受けます（要相談）。
                </li>
              </ul>
            </Row>

            <Row label="不具合・瑕疵への対応">
              納品物に不具合があった場合、納品後30日以内のご連絡で無償対応いたします。30日を超えるご連絡は、内容に応じて別途お見積もりにて対応します。
            </Row>

            <Row label="個人情報の取り扱い">
              <Link
                href="/privacy"
                className="text-[#635BFF] underline-offset-4 hover:underline"
              >
                プライバシーポリシー
              </Link>
              に準じます。
            </Row>
          </div>

          <div className="mt-16 pt-8 border-t border-[#E5E7EB] flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/"
              className="text-sm font-bold text-[#635BFF] hover:underline underline-offset-4"
            >
              ← トップページへ戻る
            </Link>
            <p className="text-xs text-[#1A202C]/40">
              &copy; 2026 ALPACA. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-6 pb-6 border-b border-[#E5E7EB] last:border-0">
      <h2 className="text-sm md:text-base font-extrabold text-[#1A202C]">
        {label}
      </h2>
      <div className="text-[#1A202C]/85">{children}</div>
    </section>
  );
}
