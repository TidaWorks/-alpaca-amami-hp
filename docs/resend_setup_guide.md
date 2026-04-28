# Resend × Vercel お問い合わせフォーム本番反映ガイド 🦙

> このドキュメントは、ALPACA HP の `/web` ページ（WebCTA セクション）にあるお問い合わせフォームを、本番ドメイン `alpaca-amami.com/web` で動作させるための手順書です。
>
> 実装はすでに完了しています（`src/app/api/contact/route.ts` で Resend API を直接叩く構成）。あとは **Resend のセットアップと Vercel への環境変数登録だけ** で稼働します。
>
> 所要時間の目安：DNS の伝播待ちを除けば **20〜30 分** で終わります。

---

## ゴール

- フォームから送信 → `alpaca.amami@gmail.com` に届く状態にする
- 送信元アドレスは `noreply@alpaca-amami.com`（独自ドメイン）にする
- 迷惑メールに入らないよう、SPF / DKIM / DMARC を整える

---

## 必要な環境変数（おさらい）

`src/app/api/contact/route.ts` が参照しているのは下記 3 つです。

| 変数名 | 役割 | 推奨値 |
|---|---|---|
| `RESEND_API_KEY` | Resend の API キー | `re_xxxxxxxxxxxxxxxxxxxx`（後で発行） |
| `RESEND_FROM` | 送信元アドレス（差出人） | `ALPACA <noreply@alpaca-amami.com>` |
| `CONTACT_TO` | 受信先アドレス | `alpaca.amami@gmail.com` |

未設定だと API は `503 not_configured` を返し、フォーム上に「送信機能の準備中です」とユーザー向けエラーが出ます（フェイルセーフ済み）。

---

## STEP 1. Resend アカウント作成・API キー取得

### 1-1. アカウント確認

まず大地さん、**Resend のアカウント既に持ってましたっけ？** もし作ってあれば 1-3 までスキップして OK です。なければ下記から進めてください。

### 1-2. サインアップ

1. ブラウザで <https://resend.com> を開く
2. 右上「Sign Up」→ GitHub 連携 or メアド + パスワードで登録
   - **推奨：`alpaca.amami@gmail.com` で登録**（事業用メールに統一）
3. メール認証リンクをクリック
4. ダッシュボード（<https://resend.com/overview>）に着地すれば OK

> 💡 無料枠について
> - **月 3,000 通まで無料**（1 日 100 通上限）
> - クレカ登録不要
> - ALPACA の現状の問い合わせ量なら永久に無料枠で足りる想定

### 1-3. API キー発行

1. ダッシュボード左メニュー「**API Keys**」を開く
2. 右上「**Create API Key**」をクリック
3. 入力内容：
   - **Name**: `alpaca-hp-production`（識別用、何でも OK）
   - **Permission**: `Sending access`（送信専用、推奨）
   - **Domain**: `All domains`（あとでドメイン認証する `alpaca-amami.com` にも自動適用される）
4. 「Add」を押すと `re_` から始まる文字列が表示される
5. **このキーは今しか表示されない** ので、必ずコピーして安全な場所（1Password など）に保管
   - メモ帳に貼って一旦置いておくでも可、ただし **GitHub には絶対あげない**

> ⚠️ 流出したら即無効化
> もし誤って公開してしまったら、API Keys 画面で当該キーの右側「Revoke」を押せば即無効化できます。

---

## STEP 2. ドメイン認証（SPF / DKIM / DMARC）

> 🦙 ここが一番ハマるポイント。落ち着いていきましょう。
>
> **SPF / DKIM / DMARC ってなに？**
> - **SPF**：このドメインから送るメールは、この IP / サービスからしか出ない、という宣言
> - **DKIM**：メールに電子署名を付けて改ざんされてないことを証明
> - **DMARC**：SPF/DKIM が失敗したらどう扱うかのルール（迷惑メール判定の精度向上）
>
> この 3 つを Resend が指示する DNS レコードで設定すれば、Gmail にもちゃんと「正規メール」と認識される。

### 2-1. Resend にドメインを追加

1. Resend ダッシュボード左メニュー「**Domains**」を開く
2. 右上「**Add Domain**」をクリック
3. 入力：
   - **Domain**: `alpaca-amami.com`
   - **Region**: `Tokyo (ap-northeast-1)`（日本リージョン推奨、配信速度のため）
4. 「Add」を押すと、設定すべき DNS レコード一覧が表示される

### 2-2. 表示されるレコード（参考）

ざっくりこんな感じのレコードが出ます（実際の値は Resend ダッシュボードに表示されたものを使ってください、ホスト名・トークンは案件ごとに違う）。

```
Type   Name                              Value
─────────────────────────────────────────────────────────────────────────
MX     send.alpaca-amami.com             feedback-smtp.ap-northeast-1.amazonses.com  (Priority 10)
TXT    send.alpaca-amami.com             "v=spf1 include:amazonses.com ~all"
TXT    resend._domainkey.alpaca-amami.com  "p=MIGfMA0GCSqGSIb3DQEBAQUAA..."（DKIM 公開鍵、長い）
TXT    _dmarc.alpaca-amami.com           "v=DMARC1; p=none;"
```

> 💡 DMARC は「`p=none`」（監視のみ）でまず始めて OK。あとから `quarantine` / `reject` に強化できる。

### 2-3. DNS プロバイダで設定

ここで一旦確認です。**`alpaca-amami.com` の DNS どこで管理してましたっけ？**
（お名前.com / Cloudflare / Vercel / Route53 など）

代表的なところごとの操作を書いておきます。

#### パターン A：Vercel で DNS 管理してる場合

1. Vercel ダッシュボード → 該当プロジェクト → **Settings** → **Domains**
2. `alpaca-amami.com` の「**Edit DNS Records**」（または DNS タブ）
3. Resend が表示した 4 レコード（MX 1 件 + TXT 3 件）を 1 件ずつ追加
   - **Name** 欄は「サブドメイン部分のみ」で OK（例：`send`、`resend._domainkey`、`_dmarc`）
   - Vercel は自動で `.alpaca-amami.com` を補完してくれる

#### パターン B：Cloudflare で DNS 管理してる場合

1. Cloudflare ダッシュボード → ドメイン選択 → **DNS / Records**
2. 「**Add record**」を 4 回繰り返し（MX × 1、TXT × 3）
3. **重要：Proxy（オレンジ雲）は OFF（DNS only / グレー雲）に！**
   - メール系レコードは Cloudflare のプロキシ通すと壊れる

#### パターン C：お名前.com の場合

1. <https://www.onamae.com> ログイン → ドメイン設定 → DNS 関連機能の設定
2. `alpaca-amami.com` を選択 → DNS レコード設定を利用する
3. レコードを 4 件追加して「確認画面へ進む」→「設定する」

### 2-4. 認証ステータス確認

1. Resend ダッシュボード → Domains → `alpaca-amami.com` を開く
2. しばらくすると各レコードのステータスが **`Verified`**（緑）に変わる
   - 早ければ 5 分、遅ければ 24〜48 時間（DNS 伝播待ち）
3. 全部 Verified になったら、ドメインのステータスも **`Verified`** になり、送信に使える状態

> 💡 待ってる間に STEP 3（Vercel 環境変数）まで進めて OK。送信テストだけ Verified 後に。

---

## STEP 3. Vercel 環境変数設定

### 3-1. Vercel ダッシュボードへアクセス

1. <https://vercel.com> にログイン（GitHub 連携アカウント）
2. 該当プロジェクト（おそらく `alpaca-hp` という名前）を選択
3. 上部タブ「**Settings**」をクリック
4. 左サイドバー「**Environment Variables**」をクリック

### 3-2. 環境変数を 3 つ追加

それぞれ「**Add New**」→ Name/Value/Environment を入力 → Save。

#### 変数 1: `RESEND_API_KEY`

| 項目 | 値 |
|---|---|
| Key | `RESEND_API_KEY` |
| Value | `re_xxxxxxxxxxxxxxxxxxxx`（STEP 1-3 で取得したキー） |
| Environment | **Production** ✅ / **Preview** ✅ / Development ⬜ |

> Preview にも入れておくと、PR プレビューデプロイでもフォームが動くので便利。
> Development（ローカル開発）はローカルの `.env.local` で管理するため、ここではチェック不要。

#### 変数 2: `RESEND_FROM`

| 項目 | 値 |
|---|---|
| Key | `RESEND_FROM` |
| Value | `ALPACA <noreply@alpaca-amami.com>` |
| Environment | **Production** ✅ / **Preview** ✅ / Development ⬜ |

> 表示名 + アドレス形式（`Name <email>`）で OK。引用符は不要。
> `noreply@` は実在しないメールアドレスでも問題なし（送信専用）。

#### 変数 3: `CONTACT_TO`

| 項目 | 値 |
|---|---|
| Key | `CONTACT_TO` |
| Value | `alpaca.amami@gmail.com` |
| Environment | **Production** ✅ / **Preview** ✅ / Development ⬜ |

### 3-3. 再デプロイで反映

Vercel の環境変数は **新しいデプロイから反映** されます。既存のデプロイには適用されないので、再デプロイが必要。

#### 方法 A：Deployments タブから手動再デプロイ（最速）

1. プロジェクトの「**Deployments**」タブを開く
2. 最新の Production デプロイの右側「⋯」→ **Redeploy**
3. 「Use existing Build Cache」のチェックは付いたままで OK
4. **Redeploy** ボタンを押す → 1〜2 分で反映

#### 方法 B：Git push でトリガー

何でもいいから main ブランチに 1 コミット push すれば自動デプロイされます。
（今回はわざわざコミット作るより A の方が早い）

---

## STEP 4. テスト送信

### 4-1. ドメイン認証完了を確認

Resend ダッシュボード → Domains → `alpaca-amami.com` が **Verified** になっているか再確認。
まだなら DNS 伝播待ち。<https://www.whatsmydns.net/> で TXT レコードを検索すると伝播状況が見える。

### 4-2. 本番フォームから送信

1. <https://alpaca-amami.com/web> にアクセス
2. 一番下までスクロール → 「フォームから送る」
3. 入力：
   - お名前：`テスト送信`
   - メール：自分が受信できるアドレス（Gmail でも可）
   - メッセージ：`Resend 連携テスト`
   - プライバシーポリシー同意チェック ✅
4. 「送信する →」をクリック
5. 「送信ありがとうございました！」が出れば API は成功

### 4-3. 受信確認

- `alpaca.amami@gmail.com` の受信トレイを確認
- 件名：`【ALPACA HP お問い合わせ】テスト送信 様`
- 差出人：`ALPACA <noreply@alpaca-amami.com>`
- **迷惑メールフォルダも必ずチェック**（初回はそっちに行きがち）
  - もし迷惑メール扱いされたら、メールを開いて「迷惑メールではない」を押すと以降は受信トレイに来るようになる

### 4-4. Resend ダッシュボードでログ確認

1. Resend ダッシュボード → 左メニュー「**Logs**」
2. 直近の送信レコードが見える
   - **Status: Delivered** → Gmail まで届いてる ✅
   - **Status: Sent** → Resend からは出た、Gmail 側のフィルタ確認
   - **Status: Bounced / Failed** → トラブルシューティング参照

---

## STEP 5. トラブルシューティング

### Q1. フォーム送信ボタン押したらエラー出る

#### 「送信機能の準備中です」と出る場合

- 原因：Vercel 環境変数 `RESEND_API_KEY` が未設定 or 再デプロイされてない
- 対処：
  1. Vercel → Settings → Environment Variables を再確認（タイポ無いか）
  2. Deployments タブで再デプロイ
  3. ブラウザで強制リロード（Cmd + Shift + R）

#### 「送信に失敗しました」と出る場合

ブラウザの **DevTools → Network タブ** を開いて `/api/contact` のレスポンスを確認：

| エラー値 | 意味 | 対処 |
|---|---|---|
| `resend_failed` | Resend API がエラーを返した | `detail` フィールドを確認。多くは「ドメイン未認証」or「FROM アドレス不正」 |
| `invalid_email` | メールアドレス形式が変 | フォーム入力ミス（普通はこれ起きない） |
| `missing_fields` | 名前/メール/メッセージが空 | UI 側で `required` 効いてるはずなので滅多に出ない |

### Q2. 送信は成功したのにメールが届かない

順番に確認：

1. **迷惑メールフォルダ** を確認（初回はほぼここ）
2. Resend ダッシュボード Logs で `Delivered` か確認
   - `Bounced` なら受信先 Gmail で何かブロックされた可能性
3. `RESEND_FROM` のドメイン部分が **認証済みドメインと一致してるか**
   - `noreply@alpaca-amami.com` ← OK
   - `noreply@gmail.com` ← NG（gmail.com は認証してない）
4. DKIM 認証が通ってるか
   - Gmail 受信トレイで該当メールを開く → 「⋮」→「メッセージのソースを表示」
   - `dkim=pass` `spf=pass` `dmarc=pass` が並んでいれば OK

### Q3. ドメイン認証が Verified にならない

- DNS 伝播は最大 48 時間かかることがある（通常は数分〜数時間）
- <https://www.whatsmydns.net/> で `_dmarc.alpaca-amami.com` の TXT レコードが世界中で見えてるか確認
- Cloudflare 使ってる場合：**Proxy が OFF（グレー雲）になってるか** 再確認
- レコードの **Name** に `.alpaca-amami.com` まで含めてしまってないか
  - 多くの DNS 管理画面は サブドメイン部分のみ書く（自動で末尾が補完される）
  - 例：`send.alpaca-amami.com.alpaca-amami.com` になってるとアウト

### Q4. API キーをうっかり Git に上げてしまった

1. **即 Resend ダッシュボードで該当キーを Revoke**
2. 新しいキーを発行
3. Vercel 環境変数を更新 → 再デプロイ
4. Git 履歴から削除（`git filter-branch` or BFG Repo-Cleaner）
   - 公開リポジトリの場合は必須、プライベートでもやっておくと安心

### Q5. ローカル開発時もメール送りたい

ローカルでテストする場合は `.env.local` を作る（**`.gitignore` に `.env*` が入ってることを必ず確認**）。

```bash
# .env.local（プロジェクトルートに作成、Git 管理外）
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM=ALPACA <noreply@alpaca-amami.com>
CONTACT_TO=alpaca.amami@gmail.com
```

`npx next dev --port 3001` で再起動すれば反映されます。

> ⚠️ `.env.local` は **絶対に commit しない**。Next.js のテンプレなら `.gitignore` に最初から `.env*` 入ってるはずだけど、`git status` で念のため確認。

---

## チェックリスト（完了確認用）

設定完了したら、上から順にチェックしていってください。

- [ ] Resend アカウント作成済み（`alpaca.amami@gmail.com` で登録）
- [ ] API キー（`re_...`）発行 & 安全な場所に保管
- [ ] Resend に `alpaca-amami.com` をドメイン追加
- [ ] DNS プロバイダで MX × 1 + TXT × 3 のレコード追加
- [ ] Resend ダッシュボードで `Verified` 表示を確認
- [ ] Vercel に `RESEND_API_KEY` を Production + Preview に登録
- [ ] Vercel に `RESEND_FROM` を Production + Preview に登録
- [ ] Vercel に `CONTACT_TO` を Production + Preview に登録
- [ ] Vercel で本番デプロイを Redeploy
- [ ] <https://alpaca-amami.com/web> のフォームから自分宛てにテスト送信
- [ ] `alpaca.amami@gmail.com` に届いたことを確認（迷惑メールも見る）
- [ ] Resend Logs で Delivered 表示を確認

全部チェック付いたら本番運用開始 OK 🦙

---

## 補足：今後の運用 Tips

- **送信ログは Resend Logs から 30 日間遡れる**（無料枠）
- **問い合わせ通知を Slack 等に分岐したくなったら**、Resend Webhooks か、`/api/contact` 内で Slack Webhook 呼び出しを追加すればいい
- **スパム対策**：将来的に問い合わせ量が増えてスパムが来るようになったら、reCAPTCHA v3 か Cloudflare Turnstile を導入。今はまだ不要
- **送信元を `alpaca.amami@gmail.com` に変えたい場合**：Gmail は Resend の認証ドメインに使えないので、`noreply@alpaca-amami.com` のままで OK。`reply_to` がフォーム入力者のメアドになっているので、Gmail 側で「返信」を押せばそのまま相手に返信できる仕組みになってる

---

何か詰まったら、エラーメッセージごと教えてください。一緒に解決します🦙
