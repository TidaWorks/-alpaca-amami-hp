import Link from "next/link";
import HomeHeader from "@/components/home/HomeHeader";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "プライバシーポリシー",
  description:
    "ALPACAのプライバシーポリシー。個人情報の取得・利用目的・保管期間・第三者提供・お問い合わせ窓口を定めています。",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <HomeHeader />
      <main className="bg-white text-[#1A202C] pt-28 md:pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A] mb-3">
              PRIVACY POLICY
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              プライバシーポリシー
            </h1>
            <p className="text-sm text-[#1A202C]/65">
              制定日: 2026年5月10日 / 最終更新日: 2026年5月10日
            </p>
          </div>

          <div className="space-y-10 text-[15px] leading-[1.9]">
            <p>
              ALPACA（以下「当事業者」）は、お客様の個人情報の保護を重要な責務と認識し、個人情報保護法その他の関連法令を遵守するとともに、以下の方針に基づき個人情報を適切に取り扱います。
            </p>

            <Section title="1. 事業者情報">
              <ul className="space-y-1">
                <li>屋号: ALPACA（アルパカ）</li>
                <li>代表: 作田 大地</li>
                <li>所在地: 鹿児島県奄美大島</li>
                <li>
                  連絡先: {SITE.contact.email} / {SITE.contact.tel}
                </li>
              </ul>
            </Section>

            <Section title="2. 取得する個人情報">
              <p className="mb-3">当事業者は、以下の場面で個人情報を取得します。</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>お問い合わせフォーム送信時: お名前、メールアドレス、ご相談内容</li>
                <li>
                  電話・メール・Instagram DM等でのお問い合わせ時:
                  お客様が任意でご提供される情報
                </li>
                <li>
                  業務委託契約締結後: 契約遂行に必要な範囲での担当者情報、業務関連情報
                </li>
              </ul>
            </Section>

            <Section title="3. 利用目的">
              <p className="mb-3">取得した個人情報は、以下の目的でのみ利用します。</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>お問い合わせ・ご相談への回答およびご連絡</li>
                <li>業務委託契約に基づくサービス提供および進行管理</li>
                <li>業務に関連するご案内・告知（お客様の同意がある場合のみ）</li>
                <li>業務に必要な範囲での社内記録および統計利用</li>
              </ul>
              <p className="mt-3">
                上記以外の目的で利用する場合は、事前にご本人の同意を得ます。
              </p>
            </Section>

            <Section title="4. 第三者提供">
              <p>
                当事業者は、法令に基づく場合または人の生命・身体・財産の保護のために必要な場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
              </p>
            </Section>

            <Section title="5. 業務委託">
              <p className="mb-3">
                サービス提供に必要な範囲で、以下の事業者に個人情報の取扱いを委託する場合があります。委託先には、適切な安全管理措置を講じることを契約等で求めています。
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>メール送信サービス: Resend (Resend, Inc.)</li>
                <li>ホスティング: Vercel Inc.</li>
                <li>ドメイン・DNS: Cloudflare, Inc. 等</li>
                <li>
                  業務利用するクラウドサービス: Google Workspace、GitHub 等
                </li>
              </ul>
              <p className="mt-3">
                これらの委託先の一部は海外に所在するため、個人情報が国外に移転される場合があります。
              </p>
            </Section>

            <Section title="6. 保管期間">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  お問い合わせ情報: 最終のご連絡から原則3年間保管し、利用目的達成後は遅滞なく削除します
                </li>
                <li>
                  契約関連情報: 法令で定められた保存期間（税務関係書類は7年間など）に従って保管します
                </li>
              </ul>
            </Section>

            <Section title="7. 安全管理措置">
              <p>
                個人情報への不正アクセス、紛失、破壊、改ざん、漏えいを防止するため、技術的・組織的に適切な安全管理措置を講じます。具体的には、通信のSSL暗号化、アクセス権限の最小化、利用機器のパスワード管理、業務委託先の選定基準の明確化などを実施しています。
              </p>
            </Section>

            <Section title="8. ご本人の権利（開示・訂正・削除）">
              <p>
                ご本人からの個人情報の開示・訂正・追加・削除・利用停止等のご請求には、本人確認のうえ、法令に従い遅滞なく対応します。下記「お問い合わせ窓口」までご連絡ください。
              </p>
            </Section>

            <Section title="9. Cookie・アクセス解析の利用">
              <p>
                当サイトでは、サイト改善およびユーザー体験の向上を目的として、Cookieやアクセス解析ツール（例: Google Search Console、Vercel Analytics 等）を利用する場合があります。これらは個人を特定する情報を含まない統計データの取得に限られます。Cookieの利用はブラウザ設定により拒否することができます。
              </p>
            </Section>

            <Section title="10. お問い合わせ窓口">
              <p className="mb-3">個人情報の取扱いに関するお問い合わせは、下記までご連絡ください。</p>
              <ul className="space-y-1">
                <li>
                  メール:{" "}
                  <a
                    href={SITE.contact.emailHref}
                    className="text-[#635BFF] underline-offset-4 hover:underline"
                  >
                    {SITE.contact.email}
                  </a>
                </li>
                <li>
                  電話:{" "}
                  <a
                    href={SITE.contact.telHref}
                    className="text-[#635BFF] underline-offset-4 hover:underline"
                  >
                    {SITE.contact.tel}
                  </a>{" "}
                  （平日 9:00-18:00）
                </li>
              </ul>
            </Section>

            <Section title="11. ポリシーの改定">
              <p>
                本ポリシーは、法令の改定や運用方針の変更等に応じて改定することがあります。重要な変更がある場合は、当サイト上で告知します。
              </p>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-extrabold mb-4 text-[#1A202C]">
        {title}
      </h2>
      <div className="text-[#1A202C]/85">{children}</div>
    </section>
  );
}
