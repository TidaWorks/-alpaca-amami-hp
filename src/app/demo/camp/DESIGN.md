# DESIGN.md — キャンプ施設デモサイト（greenpark-santo.com参考）

## 1. Visual Theme & Atmosphere

**コンセプト:** 「自然 x わくわく x 親しみやすさ」
アウトドア施設の楽しさを、イラスト的なあしらいとアニメーションで表現。
プロフェッショナルだけど堅すぎず、ファミリーフレンドリーな印象。
写真だけに頼らず、装飾要素で温かみを出す。

**キーワード:**
- 自然を感じるティールグリーン × 暖色アクセント
- 角丸で統一された柔らかいUI
- 英語大見出し + 日本語の組み合わせ
- パララックスで奥行きのあるヒーロー
- スクロールで要素がふわっと現れるアニメーション

## 2. Color Palette & Roles

### Primary
| 名前 | HEX | 用途 |
|------|------|------|
| Teal Green | `#0B8388` | ブランドカラー、見出し装飾、ボタン、アクセント全般 |
| Teal Light | `#46BBC0` | ホバー、グラデーション中間 |
| Teal Pale | `#E4F9F9` | 背景アクセント、グラデーション終点 |

### Neutral
| 名前 | HEX | 用途 |
|------|------|------|
| Dark | `#292929` | メインボタン背景、テーブルヘッダー |
| Black | `#000000` | 本文テキスト |
| White | `#FFFFFF` | 背景、ボタン内テキスト |
| Light Gray | `#F5F5F5` | セクション背景 |
| Mid Gray | `#A9A9A9` | 補助テキスト |

### Accent（ポイント使い）
| 名前 | HEX | 用途 |
|------|------|------|
| Rose Pink | `#E86283` | カレンダー、イラスト、週末マーカー |
| Apricot | `#FA9D7B` | カード背景バリエーション |
| Gold | `#FEC352` | 装飾アクセント |
| Bright Yellow | `#F0F300` | 強調マーカー |
| Sky Blue | `#64B6F9` | 季節テーマ |

## 3. Typography Rules

### フォントファミリー
- **日本語本文:** system-ui, Hiragino Sans, メイリオ（Webフォント不要で高速）
- **英字見出し:** Jost (400, 700) — Google Fonts
- **手書き風装飾:** Caveat (700) — Google Fonts

### スケール
| 要素 | サイズ (mobile) | サイズ (desktop) | Weight | Font |
|------|----------------|-----------------|--------|------|
| 英語大見出し | 3.0rem | 5.5rem | 700 | Jost |
| セクション見出し | 1.8rem | 2.6rem | 700 | system |
| サブ見出し | 1.5rem | 1.8rem | 700 | system |
| 本文 | 1.4rem | 1.4rem | 400 | system |
| 補助テキスト | 1.1rem | 1.2rem | 400 | system |

### ルール
- 行間: `1.6`（標準）、`2.15`（ゆったり本文）
- 日本語の文字間: `0.1em`（デスクトップ）、`0.05em`（モバイル）
- 英語大見出しは行間タイト: `0.77〜0.9`
- 数字は Jost で表示

## 4. Component Stylings

### ボタン
```
Primary(大): bg-[#292929] text-white font-bold px-12 py-4 rounded-full min-h-[62px]
             hover: opacity-80
             transition: all 0.25s ease

Accent(中): bg-[#0B8388] text-white font-bold px-6 py-2 rounded-full min-h-[34px]
            hover: bg-[#46BBC0]
            transition: all 0.25s ease

Text Link:  text-sm underline-offset-4
            hover: 下線が左から伸びるアニメーション
```

### カード
```
Container: bg-white rounded-2xl overflow-hidden
           shadow: none（フラット）
           hover: scale-[1.02] shadow-md
           transition: all 0.3s ease

Image:     object-cover w-full aspect-[4/3]
           hover: scale-105
           transition: transform 0.6s ease

Title:     text-lg font-bold mt-4
Category:  text-xs text-[#0B8388] font-bold uppercase tracking-wider
```

### セクションヘッダー
```
英語見出し: text-[#0B8388] text-5xl md:text-7xl font-bold font-[Jost] leading-tight
日本語見出し: text-[#000] text-2xl font-bold mt-2
装飾ライン: w-12 h-0.5 bg-[#0B8388] mt-4
```

## 5. Layout Principles

### スペーシング
- セクション間: `py-20 md:py-32`
- コンテナ: `max-w-[1000px] mx-auto px-6`
- カード間: `gap-4 md:gap-6`

### グリッド
- メインコンテンツ: `grid-cols-1 md:grid-cols-3`
- 2カラム: `grid-cols-1 md:grid-cols-2`

### 原則
- 背景色を交互に切り替え（白 → #F5F5F5 → 白）でセクション区切り
- 余白は広めに。詰め込まない
- スクロールで要素がフェードインで現れる

## 6. Depth & Elevation

### シャドウ
ほぼ使わない。フラットデザイン基調。
```
hover: 0 4px 20px rgba(0,0,0,0.08)
modal: 0 0 0 rgba(0,0,0,0.3) （backdrop）
```

### 装飾的な奥行き
- パララックスで背景レイヤーに奥行き感
- イラスト要素を重ねて配置

## 7. Do's and Don'ts

### Do
- 英語大見出し（Jost Bold）+ 日本語で見出しを構成
- ティールグリーンをアクセントに一貫して使う
- 角丸は大きめ（ボタンは完全ピル型）
- 写真は明るく自然光を感じるもの
- セクションの区切りに背景色を変える
- スクロールアニメーションでふわっと登場

### Don't
- 角張ったデザインにしない
- ダークテーマにしない（明るく開放的に）
- テキストを詰め込まない
- ドロップシャドウを多用しない
- ストック写真っぽい硬い写真は避ける

## 8. Responsive Behavior

### ブレークポイント
- Mobile: `< 768px`
- Desktop: `>= 768px`

### モバイル対応
- フォントサイズを60-80%に縮小
- グリッドは1カラムに
- スペーシングを40-50%縮小
- ボタンは幅いっぱいに
- ナビはハンバーガーメニュー

## 9. Agent Prompt Guide

### クイックリファレンス
```
ブランドカラー: #0B8388（ティールグリーン）
ダーク: #292929
テキスト: #000000
背景(白): #FFFFFF
背景(グレー): #F5F5F5
アクセント: #E86283(ピンク), #FEC352(ゴールド), #FA9D7B(アプリコット)
英字: Jost (Google Fonts)
手書き: Caveat (Google Fonts)
角丸: rounded-2xl (カード), rounded-full (ボタン)
```
