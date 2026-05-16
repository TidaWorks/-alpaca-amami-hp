# DESIGN.md — ALPACA Web & System Studio

> **Last revised:** 2026-05-10
> 旧仕様（TIDA WORKS / ダーク×オレンジ単色）は廃止。
> 現行は「マジックアワー紫 × ミント × オレンジCTA」のブランド体系を、視認性ファーストで運用する。

---

## 0. 思想 — Why this design

ALPACAは奄美大島の小規模事業者向けに「業務システム / ホームページ・LP / LINE自動化ボット」を提供するスタジオ。
お客様の多くは40〜60代の事業者で、Webデザインに詳しいわけではない。
したがって**「読める」「分かる」「迷わない」**が、見た目より先に来る。

### 参考にした3社（2026-05-10 大地さん選定）

| 社 | 学ぶこと |
|----|----------|
| **任天堂** | 太く大きいタイポと余白。視認性ファースト。 |
| **ユニクロ** | グリッドの強さ、写真の大胆さ、色を絞る勇気。 |
| **サントリー** | スクロール演出の上品さ。動きで物語を進める。 |

### 共通項を ALPACA に翻訳した4軸
1. **視認性ファースト** — フォント太め・大きめ、行間ゆとり、1セクション1メッセージ
2. **色のヒエラルキー** — 紫 = 軸、ミント = 進行・アクセント、オレンジ = CTA一点突破
3. **写真の力で語る** — 装飾より実物。実績画像・現場写真をフルブリードで見せる
4. **動きで物語る（中間強度）** — フェードイン＋軽いパララックス＋テキスト遅延。やりすぎず、止まりすぎず。

---

## 1. ブランドカラー（運用ルール）

### Primary（マジックアワー）
| 名前 | HEX | 使う場所 |
|------|------|---------|
| Magic Indigo | `#1D3A8A` | セクション軸の見出し、章番号、強い文字 |
| Magic Indigo Deep | `#0A1228` | 背景パネル、強調コピーの下地 |
| Magic Violet | `#635BFF` | リンク、装飾線、強調アンダーライン、フォーカスリング |
| Magic Pink | `#FF6B9D` | サブアクセント（限定使用、強調文字の一部） |

### Accent（進行・装飾）
| 名前 | HEX | 使う場所 |
|------|------|---------|
| Mint | `#12C998` | 進行ドット、章をまたぐライン、アイコン地、グッドマーク |
| Mint Soft | `#ECFDF5` | 装飾の薄い帯、カード地（ライト時） |

### CTA（一点突破）
| 名前 | HEX | 使う場所 |
|------|------|---------|
| CTA Orange | `#FF6B35` | 主CTAボタン、最強強調 |
| CTA Hover Indigo | `#15296B` | CTAボタンのホバー（紫に沈める＝重み演出） |

### Neutral（読みやすさの土台）
| 名前 | HEX | 使う場所 |
|------|------|---------|
| Ink | `#1A202C` | 本文・見出しの基本色（ライト背景時） |
| Ink Soft | `#1A202C / 65%` | サブテキスト、補足 |
| Ink Whisper | `#1A202C / 40%` | キャプション、コピーライト |
| Hairline | `#E5E7EB` | 区切り線、カード境界 |
| Surface | `#F8FAFC` | フォーム入力欄の地 |
| Bg | `#FFFFFF` | ページ基本背景 |
| Bg Soft | `#FAFAF8` | 重厚セクションの暖色背景（任意） |

### 色のヒエラルキー（重要）
- **紫(#1D3A8A) は1セクションに1〜3箇所まで**。乱用すると軸が見えなくなる。
- **ミント(#12C998) はライン・ドット・小アイコンに限定**。面で使うと軽く見える。
- **オレンジ(#FF6B35) はページに1〜2個のCTAだけ**。複数あると視線が割れる。
- **ピンク(#FF6B9D) は強調文字の一部だけ**。タイトル全体には使わない。

---

## 2. タイポグラフィ（視認性ファースト）

### フォント
- **本文（日本語）:** Noto Sans JP / 400・500・700・900
- **見出し補助（英字）:** Outfit / 600・700
- **重厚見出し（任意）:** Shippori Mincho / 700・800（紫×ミントの世界観に合うとき）
- **手書き風:** Klee One / 400・600（極限定）

### スケール（モバイル → デスクトップ）
| 役割 | mobile | desktop | weight | family |
|------|--------|---------|--------|--------|
| Hero見出し（H1） | `2.75rem` | `5.25rem` | 900 | Noto Sans JP |
| セクション見出し（H2） | `2rem` | `3.5rem` | 800 | Noto Sans JP |
| サブ見出し（H3） | `1.25rem` | `1.75rem` | 700 | Noto Sans JP |
| 本文 | `1.0625rem` | `1.1875rem` | 400 | Noto Sans JP |
| 本文（強調） | `1.0625rem` | `1.1875rem` | 700 | Noto Sans JP |
| キャプション | `0.875rem` | `0.9375rem` | 400 | Noto Sans JP |
| ラベル（章番号等） | `0.6875rem` | `0.6875rem` | 700 | Outfit / uppercase / tracking-[0.4em] |

### ルール
- **見出しの行間は 1.15〜1.25**（タイト）
- **本文の行間は 1.85〜1.95**（広め、日本語の可読性最優先）
- **見出しのレタースペーシング は -0.01〜-0.02em**（強さを出すため）
- **章番号は uppercase / tracking-[0.4em]** （CHAPTER 03 / WHY US 等の英字ラベル）
- **数字（価格・統計）は Outfit で大きく**

### NG
- フォントを5種以上ページに混ぜない
- 本文サイズを 14px 以下にしない（小さい文字で詰め込まない）
- 全部大文字の長い英文を見出しに使わない（読めない）

---

## 3. レイアウト原則

### スペーシング
- セクション間: `py-24 md:py-32 lg:py-40`（大きく呼吸する）
- コンテナ: `max-w-6xl mx-auto px-6 md:px-8`
- カード間: `gap-6 md:gap-8`
- 要素間（縦）: `space-y-5` / `space-y-8`

### グリッド
- 特徴カード: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- 価格カード: `grid-cols-1 md:grid-cols-3`（中央を強調）
- 2カラム説明: `grid-cols-1 lg:grid-cols-2`
- 実績ギャラリー: `grid-cols-1 md:grid-cols-2`（フルブリード可）

### 原則（任天堂・ユニクロ式）
1. **1セクション1メッセージ。詰めない。**
2. **タイトルは画面の40〜60%幅で大胆に。** 中央揃えはイベント時のみ。
3. **写真は「商品（=実績）」を主役に。** イラスト・装飾は脇役。
4. **章扉（CHAPTER 0X + 章タイトル + ミントライン）でリズムを作る。**

---

## 4. アニメーション（中間強度・サントリー式）

### 強度の方針
- **強すぎ（サントリー級こってり）はNG** — 軽快さが失われる
- **弱すぎ（静的）もNG** — 重み・物語性が出ない
- **中間（B寄りC）** — フェードイン＋軽いパララックス＋テキスト遅延、CTAは目立つ動き

### 標準パターン
- **要素の登場:** `opacity 0 → 1`、`translateY(20px) → 0`、duration `700ms`、easing `ease-out`
- **テキストの遅延（リズム読み）:** 同じセクション内の要素を `120〜250ms` 刻みで遅延
- **画像のパララックス:** スクロール量の `0.1〜0.2倍` で背景がゆっくり動く（やりすぎ厳禁）
- **CTAの反応:** ホバーで `scale-[1.03]` + シマー（光の帯が走る）
- **章扉の進行ライン:** ミントの `1px` 横線が左→右に伸びる（duration `500ms`）

### 既存フック（再利用）
- `useReveal<T>({ threshold })` — IntersectionObserver でセクション登場
- `useParallax(speed)` — スクロールで背景画像移動

### NG
- 0.5秒以上の長いアニメ（CTAクリック反応・特殊演出を除く）
- 視差量の大きいパララックス（読みづらくなる）
- 要素が回転・反転して登場するなどの派手演出（軽薄に見える）
- 全要素を一斉に動かす（リズムが死ぬ）

---

## 5. コンポーネント標準

### 章扉（セクション冒頭）
```tsx
<div className="inline-flex items-center gap-3 mb-3">
  <p className="text-[11px] font-bold tracking-[0.4em] text-[#1D3A8A]">
    CHAPTER 03
  </p>
  <span className="w-8 h-[1px] bg-[#1D3A8A]/30" />
  <p className="text-[11px] font-bold tracking-[0.3em] text-[#0A1228]/60">
    FEATURES
  </p>
</div>
<h2 className="text-[#1A202C] text-3xl md:text-5xl font-extrabold mb-4 leading-[1.2]">
  ALPACA が<span className="text-[#635BFF]">えらばれる理由</span>
</h2>
```

### CTAボタン（主）
```tsx
<button className="inline-flex items-center justify-center
  bg-[#FF6B35] hover:bg-[#15296B] text-white font-black
  text-sm tracking-widest px-8 py-3.5 rounded-full
  shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-[0.97]
  transition-all duration-200 cursor-pointer
  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2">
  無料で30分相談 →
</button>
```

### Ghostリンク（副）
```tsx
<a className="group inline-flex items-baseline gap-2 text-sm font-black text-[#635BFF]">
  <span className="relative">
    詳しく見る
    <span className="absolute left-0 -bottom-[3px] w-full h-[1.5px] bg-[#635BFF]
      scale-x-100 group-hover:scale-x-0 origin-right transition-transform duration-300" />
  </span>
</a>
```

### カード（基本）
```tsx
<div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm
  hover:shadow-xl hover:-translate-y-1 hover:border-transparent
  transition-all duration-300 p-7 md:p-10 overflow-hidden relative">
  {/* 上端アクセントライン（hoverで現れる） */}
  <span className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0
    group-hover:scale-x-100 transition-transform duration-500 bg-[#12C998]" />
  {/* content */}
</div>
```

### フォーム入力（基本）
```tsx
<input className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg
  px-4 py-3 text-sm text-[#1A202C] placeholder:text-[#1A202C]/40
  focus:outline-none focus:bg-white focus:border-[#635BFF]
  focus:ring-2 focus:ring-[#635BFF]/20 transition-colors" />
```

---

## 6. 写真・画像の扱い（ユニクロ式）

### 原則
- **実績画像はサイトの主役**。装飾より大きく見せる。
- **フルブリード可** — コンテナ幅を超えて、画面端までいく構図を恐れない
- **ストック写真は使わない** — 必ず実物・実例
- **画像比率の標準:** `aspect-[16/10]`（横長）/ `aspect-[4/5]`（縦寄せ）/ `aspect-square`（正方）

### 表現
- ホバーで `scale-[1.02]` 程度の軽いズーム
- 角丸 `rounded-2xl` または `rounded-3xl`（重厚感）
- 上端アクセントライン（ミント or 紫）でブランドを差し込む
- キャプションは画像下にコンパクトに（ラベル+業種+一言）

### NG
- 画像内に大きな日本語テキストを焼き込まない（CMS変更不可になる）
- 透過PNGの装飾オブジェクトをページに散りばめない（軽薄に見える）

---

## 7. セクション標準構成（任天堂式リズム）

ページ全体は「章扉 → 大見出し → 中見出し → 説明 → 視覚 → CTA」のリズムを繰り返す。
1セクションあたりの構成：

1. 章扉（CHAPTER 0X / 英字ラベル / ミントライン）
2. 大見出し（H2 / 紫アクセント1〜2語）
3. 補足コピー（1〜2文、~80字）
4. 視覚要素（カード × 3 / 写真 / 図解 / フォーム）
5. CTA or 次章への導線（任意）

> **詰め込まない。1セクションは画面1〜2スクロールで読める分量に絞る。**

---

## 8. ページ別テーマ（4ページ体制）

| パス | キーワード | 主色アクセント |
|------|-----------|--------------|
| `/` | 玄関・全体像・温かみ | 紫＋ミント＋オレンジCTA、ライト基調 |
| `/web` | 制作実績で語る・写真主役 | 紫メイン、ミント装飾、暖色背景アクセント |
| `/system` | 業務効率・信頼・先進 | 紫メイン、ミント進行ライン、白基調 |
| `/agent` | LINE・親しみ・即応 | ダーク基調＋ミントアクセント、写真は控えめ |

ページごとに「色のメリハリ」と「テーマ濃度」を変えてOK。ただしブランドカラー4色（紫・ミント・オレンジCTA・ピンク）の枠は出ない。

---

## 9. アクセシビリティ（最低基準）

- コントラスト比 4.5:1 以上（本文）/ 3:1 以上（大見出し）
- フォーカスリング必須（`focus-visible:ring-2`）
- タッチターゲット 44px 以上
- 画像には `alt` 必須（実績画像は業種＋特徴を入れる）
- アニメーションは `prefers-reduced-motion` 尊重（過度な動きは控える）

---

## 10. Do's and Don'ts（要点）

### Do
- 視認性ファースト（フォント太め・余白ゆとり・1セクション1メッセージ）
- ブランドカラーは「使う場所を絞る」（紫=軸、ミント=進行、オレンジ=CTA）
- 章扉でリズムを作る（CHAPTER 0X + ライン）
- 実績画像は大胆に大きく、フルブリードも歓迎
- アニメは中間強度（フェード＋遅延＋軽パララックス）

### Don't
- 装飾絵文字・マーカー帯演出（feedback_no_decoration_emojis / no_marker_decoration）
- 「Web」のような抽象語コピー（feedback_concrete_terms — 必ず「ホームページ」「LP」「システム」「LINEボット」と書く）
- 既視感あるテンプレ風（Canva的構成、フリー素材イラスト）
- 文字サイズ14px以下、行間1.5以下（読めない）
- 派手アニメ・回転・ぐにゃ系（軽薄）
- 1ページにCTA色のボタン3つ以上（視線が割れる）

---

## 11. クイックリファレンス（Agent用）

```
背景: #FFFFFF / 暖色アクセント時 #FAFAF8
本文: #1A202C  / サブ #1A202C/65 / 補足 #1A202C/40
区切り: #E5E7EB / カード地: #F8FAFC

紫(軸): #1D3A8A  深紫: #0A1228  紫リンク: #635BFF
ミント(進行): #12C998  ミント薄: #ECFDF5
CTA: #FF6B35  CTAホバー: #15296B
ピンク(限定): #FF6B9D

日本語: Noto Sans JP / 重厚補助: Shippori Mincho
英語: Outfit (uppercase / tracking-[0.4em])

角丸: rounded-2xl(カード) / rounded-full(CTA) / rounded-lg(入力)
セクション余白: py-24 md:py-32 lg:py-40
コンテナ: max-w-6xl mx-auto px-6 md:px-8

登場: opacity+translateY(20px), duration 700ms ease-out
遅延: 120〜250ms 刻み
```

### プロンプト例
> 「DESIGN.md に従って、/web の Features セクションを書き直してください。視認性ファースト、章扉あり、3カラムカード、ミントの上端アクセントライン、写真より文字+アイコンで強さを出す構成。CTA は1個だけ。」
