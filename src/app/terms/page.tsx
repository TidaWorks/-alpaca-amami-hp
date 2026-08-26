import Link from "next/link";
import HomeHeader from "@/components/home/HomeHeader";

export const metadata = {
  title: "利用規約",
  description:
    "ALPACAの利用規約。各種サービス（ホームページ制作、業務システム開発、アルパカスマートAIエージェント秘書セットアップ）の契約条件・解約・知的財産権などを定めています。",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <HomeHeader />
      <main className="bg-white text-[#1A202C] pt-28 md:pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A] mb-3">
              TERMS OF SERVICE
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              利用規約
            </h1>
            <p className="text-sm text-[#1A202C]/65">
              制定日: 2026年5月26日 / 最終更新日: 2026年5月26日
            </p>
          </div>

          <div className="space-y-10 text-[15px] leading-[1.9]">
            <p>
              本規約は、ALPACA（以下「当事業者」）が提供する各種サービスの利用に関する条件を定めるものです。お客様には、本規約の内容に同意のうえ、サービスをご利用いただきます。
            </p>

            <Section title="第1条（適用範囲）">
              <p>
                本規約は、当事業者が提供する以下のサービス（以下「本サービス」）にすべて適用されます。
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>ランディングページ制作</li>
                <li>ホームページ制作</li>
                <li>業務システム開発</li>
                <li>アルパカスマート（AIエージェント秘書セットアップ）</li>
                <li>その他、当事業者が提供する付随サービス</li>
              </ul>
            </Section>

            <Section title="第2条（サービス内容）">
              <p>
                各サービスの具体的な内容・範囲・成果物は、お客様と当事業者との間で個別に取り交わす見積書または契約書において定めるものとします。当ウェブサイトの記載は、サービス概要としての参考情報です。
              </p>
            </Section>

            <Section title="第3条（契約の成立）">
              <p>
                お客様による本サービスの申し込みに対し、当事業者が承諾した時点で契約が成立します。承諾は、見積書のご返送、メール、チャット等、いずれの方法によることもあります。
              </p>
            </Section>

            <Section title="第4条（料金および支払方法）">
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  各サービスの料金は、当ウェブサイト掲載の標準価格および個別お見積もりに基づきます。
                </li>
                <li>
                  支払方法は、銀行振込またはクレジットカード決済（Stripe）といたします。
                </li>
                <li>
                  振込手数料はお客様のご負担となります。
                </li>
                <li>
                  支払期日を過ぎた場合、当事業者はサービスの提供を停止することがあります。
                </li>
              </ol>
            </Section>

            <Section title="第5条（契約期間および解約）">
              <p className="font-bold mb-2">
                アルパカスマート（月額サブスク）
              </p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>最低契約期間は設けておりません。いつでも月単位で解約できます。</li>
                <li>解約のお申し出は、前月末までにチャット経由でご連絡ください。</li>
                <li>既にお支払い済みの月額料金は返金できません。</li>
              </ol>
              <p className="font-bold mb-2">スポット案件</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  作業着手前の解約は、お支払い済みの着手金を全額返金します（振込手数料を除く）。
                </li>
                <li>
                  作業着手後の解約は、進捗に応じたキャンセル料を申し受けます。
                </li>
              </ol>
            </Section>

            <Section title="第6条（知的財産権）">
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  納品物の著作権その他の知的財産権は、納品完了かつ全額のお支払い完了をもって、お客様へ移転します。ただし、当事業者または第三者が従前から有していた著作物・ライブラリ・テンプレート等の権利は移転の対象外とします。
                </li>
                <li>
                  当事業者が業務遂行の過程で作成したプロンプト、スクリプト、設計テンプレート、ノウハウ等の知的財産権は、当事業者に帰属します。
                </li>
              </ol>
            </Section>

            <Section title="第7条（免責事項）">
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  当事業者は、本サービスの提供にあたり善良な管理者の注意義務を尽くしますが、AI関連サービスの提供する情報の正確性・完全性・有用性を保証するものではありません。
                </li>
                <li>
                  お客様の事業運営において生じた損害（売上減少、機会損失、第三者からのクレーム等）について、当事業者は責任を負いません。
                </li>
                <li>
                  自然災害、通信障害、第三者サービスの停止・仕様変更等、不可抗力に起因する損害については免責とさせていただきます。
                </li>
                <li>
                  当事業者の責任は、いかなる場合でも、当該事案の直近12ヶ月にお客様から受領した本サービス料金の総額を上限とします。
                </li>
              </ol>
            </Section>

            <Section title="第8条（サポート範囲外の業務）">
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  アルパカスマートの軽サポートには、本格的な自動応答ボット構築・新規ホームページ/LP制作・業務システム新規開発・大規模データ移行・SNS運用代行・広告運用は含まれません。
                </li>
                <li>
                  範囲外の業務をご希望の場合は、別途お見積もりにて対応いたします。
                </li>
              </ol>
            </Section>

            <Section title="第9条（秘密保持）">
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  当事業者は、業務上知り得たお客様の情報を、業務遂行の目的以外には使用しません。
                </li>
                <li>
                  お客様のID・パスワード等の認証情報は、原則としてOAuth等の公式認証連携経由で取得し、当事業者では保持しないことを原則とします。
                </li>
              </ol>
            </Section>

            <Section title="第10条（規約の変更）">
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  当事業者は、本規約を必要に応じて変更することができます。
                </li>
                <li>
                  重要な変更については、契約者へメールまたはチャットにて事前に通知します。変更後の規約は、通知に明記する効力発生日から適用されます。
                </li>
              </ol>
            </Section>

            <Section title="第11条（準拠法および管轄裁判所）">
              <ol className="list-decimal pl-5 space-y-2">
                <li>本規約は、日本法を準拠法とします。</li>
                <li>
                  本規約および本サービスに関連して紛争が生じた場合は、鹿児島地方裁判所を第一審の専属的合意管轄裁判所とします。
                </li>
              </ol>
            </Section>
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-extrabold mb-4 text-[#1A202C]">
        {title}
      </h2>
      <div className="text-[#1A202C]/85">{children}</div>
    </section>
  );
}
