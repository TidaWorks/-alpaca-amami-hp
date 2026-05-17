# ALPACA HP（旧 TIDA WORKS）

## 概要
- 屋号: ALPACA（アルパカ）
- 代表: 作田 大地
- 拠点: 鹿児島県 奄美大島
- メール: alpaca.amami@gmail.com
- ドメイン: https://alpaca-amami.com （Vercel本番）
- 事業内容: 奄美島内の小規模事業者向け 業務システム構築・ホームページ制作・LP制作・保守運用

> ※ 旧屋号「TIDA WORKS」からALPACAへブランド移行済み（2026-04-12 旧tidaworks.com削除完了）。
> このリポジトリ内の旧名称表記が残っていたら順次ALPACAに置換する。

## 技術スタック
- Next.js 15（App Router）+ TypeScript
- Tailwind CSS v4（`@tailwindcss/postcss`）
- アニメーション: GSAP / Motion / Lenis
- アイコン: lucide-react
- お問い合わせメール送信: Resend API（`/api/contact`、Edge Runtime）
- ホスティング: Vercel
- ソース管理: GitHub

## 開発起動
- ポート: 3000（`next dev` デフォルト）
- 起動コマンド（ホームディレクトリから一発で叩く前提）:
  ```
  cd ~/Claud\ code/Projects/alpaca/alpaca-hp && npm run dev
  ```
- 同時に `alpaca/` 配下で他プロジェクトが3001等を使う場合は `next dev --port 3002` 等で逃がす

## ページ構成（4ページ体制：2026-05-17〜）
玄関ページ（トップ）から、サービス別LP 3本に分岐する構成。

| パス | 役割 | 主要セクション |
|------|------|----------------|
| `/` | 玄関ページ。ALPACAブランド全体像 | HomeHeader / HomeHero / HomeServices / HomeWorks / HomeAbout / HomeFlow / HomeFAQ / HomeContact |
| `/web` | ホームページ・LP制作専用LP | WebHeader / WebHero / WebPainPoints / WebFeatures / WebPricing / WebFlow / WebManifesto / WebFAQ / WebCTA |
| `/system` | 業務システム開発専用LP | SystemHeader / SystemHero / SystemPainPoints / SystemFeatures / SystemPricing / SystemFlow / SystemManifesto / SystemFAQ / SystemCTA |
| `/smart` | アルパカスマート（月額AIサポート）専用LP | AgentHeader / AgentHero / AgentAbout / AgentPainPoints / AgentFeatures / AgentUseCases / AgentPricing / AgentFlow / AgentFAQ / AgentCTA |

- `src/app/page.tsx` → トップ
- `src/app/web/page.tsx` → /web
- `src/app/system/page.tsx` → /system
- `src/app/smart/page.tsx` → /smart（旧 `/agent`、2026-05-17に改称。`/agent` は next.config の redirects で `/smart` へ301）
- `src/app/api/contact/route.ts` → Resend経由のメール送信API
- `src/components/{home,web,system,agent}/` → 各ページ専用コンポーネント（`agent/` ディレクトリ名は維持＝/smart で使用、後日リネーム検討）
- `src/components/ui/` → 共通UIプリミティブ

旧構成のフラットコンポーネント群（`Header.tsx` / `Hero.tsx` / `BusyPersonSection.tsx` / `Benefits.tsx` / `Services.tsx` / `Flow.tsx` / `FAQ.tsx` / `About.tsx` / `Contact.tsx` / `Footer.tsx`）は2026-04-27 にすべて削除済み。
旧仕様の Hero 3業種スマホモック切替・KeywordMarquee・Strengths・Services背景パララックスも全廃。

## サービスと料金体系（2026-05-17 更新）
4本柱で運用。**コピーでは「Web」のような抽象語を使わず、必ず「ホームページ」「ランディングページ」「システム」「アルパカスマート」と具体名で書く**。

| サービス | 料金 | 納期 | 保守 |
|----------|------|------|------|
| ランディングページ制作（1ページ） | ¥70,000〜120,000 | 3日〜1週間 | ¥5,000〜/月 |
| ホームページ制作（複数ページ） | ¥250,000〜400,000 | 2週間〜4週間 | ¥10,000〜/月 |
| 業務システム開発（予約・顧客・売上集計など） | ¥300,000〜（要見積） | 要相談 | ¥20,000〜/月 |
| アルパカスマート（月額AIサポート） | 月¥50,000〜（追加実装¥5,000/h） | 即日開始 | 月額に含む |

### アルパカスマート（月¥50,000サブスク）の詳細
- **キャッチコピー**: 「業務を、スマートに。」／「いつでも相談できる、AI担当者。」
- **含まれるもの**:
  - チャットで相談無制限（営業日24時間以内返信、窓口ツール名は表記しない）
  - 月5時間以内の軽実装：お問い合わせの自動応答づくり／繰り返し作業をAIで肩代わり／文章作成・要約・翻訳のサポート／業務にAIを取り入れる初期設定／小さな業務改善のお手伝い（**LINE bot / Notion / Zapier / ChatGPT等の具体ツール名はLPに書かない**、シーン側で書く）
  - 最新のAI情報を随時お届け（旧「月1テキストレポート」は廃止）
  - 大型案件のスマート特典価格
- **最低契約期間**: 3ヶ月（4ヶ月目以降は月単位で解約可能）
- **スポット追加**: 定例MTG ¥10,000/30分、月5時間超過分 ¥5,000/時間
- **/system /web との被り解消ルール**: 単発の自動応答ボット構築・業務自動化は `/system` に統合、`/smart` は月額継続のみ。「単発で作る or 月額で伴走する」の違い

### 共通ルール
- サーバー・ドメインを自主管理する場合は保守なし買い切りも可
- SEOは初期設定のみ（継続SEO対策は範囲外）
- 写真・ロゴ等の素材はクライアント支給
- アルパカスマートではAPI実費（Claude APIなどAI関連サービス利用料、月¥1,500〜¥7,500目安）がクライアント負担で別途発生する場合あり
- アルパカスマートでは ID/パスワードは預からない（OAuth経由のみ）

## 営業ルール
- **レンタカー業界への営業はNG**（本業TukTuk社員のため利益相反）
- TukTuk実績は信頼材料として見せるのはOK
- 補助金ビジネスはやらない（スピード勝負）
- 広告運用代行はやらない
- AIは売り物にしない（裏の武器）

## 環境変数（Resend）
`/api/contact` のメール送信に必要。Vercelの環境変数に設定すること。

| 変数 | 用途 | 例 |
|------|------|----|
| `RESEND_API_KEY` | Resend APIキー（必須） | `re_xxxxxxxxxxxxxxxxxxxxxx` |
| `RESEND_FROM` | 送信元アドレス（任意） | `ALPACA HP <noreply@alpaca-amami.com>` |
| `CONTACT_TO` | 通知先（任意、未設定時 `alpaca.amami@gmail.com`） | `alpaca.amami@gmail.com` |

ローカル開発時は `.env.local` に設定（gitignore済）。設定手順詳細は `docs/resend_setup_guide.md` 参照。

## 画像差し替え運用
- `public/images/generated/` 配下は `.gitignore` 済（探索用バリエは120枚超になるためGit管理外）
- 採用画像は `public/images/` 直下に手動コピーしてコミット
- 画像生成は `image-gen` skill（Codex CLI + Image2）を使用、保存先は当プロジェクト配下なら `public/images/generated/`
- 4分割LP画像セットは `alpaca-lp-image-set` skill 利用

## ブランチ運用
- `main` → 本番（Vercel自動デプロイ）
- `feat/web-lp-memphis` → /web Memphis刷新＋トップ刷新＋/system新設の作業ブランチ
- 大きめの刷新は機能ブランチで進めて、画像差し替え完了後にmainマージ
- pushは必ず大地さんの許可を取ってから（commitとpushは別コマンド）

## デプロイ
- Vercelに `main` ブランチが連携済 → push即デプロイ
- 環境変数（Resend）はVercelダッシュボード側で設定
- カスタムドメイン: `alpaca-amami.com`

## メモ
- DESIGN.md は旧仕様のデザインメモ（参考値、現行Memphis仕様とは差分あり）
- `take-screenshots.mjs` / `remove-bg.mjs` は補助スクリプト
- 子CLAUDE.md（このファイル）が親CLAUDE.md（`../CLAUDE.md`）と矛盾した場合は親を優先
