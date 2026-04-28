# ALPACA HP

奄美大島を拠点に、業務システム開発・ホームページ制作・LP制作・保守運用を提供する **ALPACA（アルパカ）** の自社ホームページ。

- 本番URL: https://alpaca-amami.com
- 屋号: ALPACA（旧 TIDA WORKS）
- 代表: 作田 大地
- 連絡先: alpaca.amami@gmail.com

## 技術スタック

- [Next.js 15](https://nextjs.org/) (App Router)
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) / [Motion](https://motion.dev/) / [Lenis](https://lenis.studiofreight.com/)（アニメーション）
- [Resend](https://resend.com/)（お問い合わせメール送信）
- [Vercel](https://vercel.com/)（ホスティング）

## ディレクトリ構成

```
alpaca-hp/
├── src/
│   ├── app/
│   │   ├── page.tsx              # トップ（/）
│   │   ├── web/page.tsx          # Web制作LP（/web）
│   │   ├── system/page.tsx       # 業務システムLP（/system）
│   │   ├── api/contact/route.ts  # お問い合わせAPI（Resend）
│   │   ├── layout.tsx            # ルートレイアウト・SEOメタ・JSON-LD
│   │   └── globals.css           # Tailwindカスタムプロパティ
│   ├── components/
│   │   ├── home/                 # トップ専用コンポーネント
│   │   ├── web/                  # /web 専用コンポーネント（Memphisデザイン）
│   │   ├── system/               # /system 専用コンポーネント
│   │   └── ui/                   # 共通UIプリミティブ
│   ├── data/                     # 静的データ
│   ├── hooks/                    # カスタムフック
│   └── lib/                      # ユーティリティ
├── public/
│   └── images/                   # 採用画像（generated/ はGit管理外）
├── docs/
│   └── resend_setup_guide.md     # Resend設定手順
├── CLAUDE.md                     # Claude Code向け開発メモ
└── next.config.ts
```

## 開発環境セットアップ

### 必要環境
- Node.js 18.18 以上
- npm（または互換マネージャ）

### インストール
```bash
git clone https://github.com/<owner>/alpaca-hp.git
cd alpaca-hp
npm install
```

### 環境変数
お問い合わせフォーム（Resend）を動かす場合は `.env.local` を作成：

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM=ALPACA HP <noreply@alpaca-amami.com>
CONTACT_TO=alpaca.amami@gmail.com
```

| 変数 | 必須 | 説明 |
|------|------|------|
| `RESEND_API_KEY` | 必須 | Resend管理画面で発行したAPIキー |
| `RESEND_FROM` | 任意 | 送信元アドレス。未設定時は `ALPACA HP <onboarding@resend.dev>` |
| `CONTACT_TO` | 任意 | 通知先メール。未設定時は `alpaca.amami@gmail.com` |

詳細は `docs/resend_setup_guide.md` 参照。

### 開発サーバー起動
```bash
npm run dev
```
デフォルトで http://localhost:3000 で起動。

### その他コマンド
```bash
npm run build   # 本番ビルド
npm run start   # 本番ビルドの起動
npm run lint    # ESLint
```

## ページ構成

| パス | 役割 |
|------|------|
| `/` | 玄関ページ。ALPACAブランド全体像と3サービスへの導線 |
| `/web` | ホームページ制作・LP制作の専用LP（Memphisデザイン） |
| `/system` | 業務システム開発の専用LP |

## 料金体系

| サービス | 料金 | 納期 | 保守 |
|----------|------|------|------|
| LP制作（1ページ） | ¥70,000〜120,000 | 3日〜1週間 | ¥5,000〜/月 |
| ホームページ制作（複数ページ） | ¥250,000〜400,000 | 2週間〜4週間 | ¥10,000〜/月 |
| 業務システム開発 | ¥300,000〜（要見積） | 要相談 | ¥20,000〜/月 |

買い切り対応・LINE連携オプションあり。詳細は本サイト `/web` `/system` を参照。

## デプロイ（Vercel）

1. VercelダッシュボードでGitHubリポジトリを連携
2. Framework: **Next.js**（自動検出）
3. Environment Variables に `RESEND_API_KEY` / `RESEND_FROM` / `CONTACT_TO` を設定
4. Production Domain: `alpaca-amami.com`
5. `main` ブランチへのpushで自動デプロイ

ビルド設定はデフォルトのまま（Build: `next build` / Output: `.next/`）。

## ライセンス

Private. このリポジトリは ALPACA（作田 大地）の自社プロジェクトです。
無断転載・複製禁止。

## 連絡先

- メール: alpaca.amami@gmail.com
- サイト: https://alpaca-amami.com
- Instagram: [@alpaca_amami](https://www.instagram.com/alpaca_amami/)
