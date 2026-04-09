# DESIGN.md — TIDA WORKS Web制作LP

## 1. Visual Theme & Atmosphere

**コンセプト:** 「動くポートフォリオ」
奄美の温かさとモダンなテック感の融合。静的なLPではなく、ギャラリーが生き物のように流れ、クリックで作品の中に吸い込まれるようなインタラクティブ体験。

**キーワード:**
- メリハリの効いたコントラスト（ダーク × ビビッドアクセント）
- パララックスと流動的なアニメーション
- ギャラリーが主役 — 実績で語る
- 余白を活かした洗練されたレイアウト
- 非デザイナーでも「かっこいい」と感じる直感的な美しさ

**ムード:** プロフェッショナルだけど親しみやすい。技術力を感じさせつつ、島の温かさがにじむ。

## 2. Color Palette & Roles

### Primary
| 名前 | HEX | 用途 |
|------|------|------|
| Orange Accent | `#F5A623` | CTA、ハイライト、アクセント |
| Orange Hover | `#E09510` | ボタンホバー、アクティブ状態 |
| Orange Glow | `rgba(245, 166, 35, 0.15)` | グロー効果、背景アクセント |

### Neutral
| 名前 | HEX | 用途 |
|------|------|------|
| Dark Base | `#0A0A0A` | メイン背景（ダークセクション） |
| Dark Surface | `#141414` | カード背景、セカンダリ背景 |
| Dark Elevated | `#1E1E1E` | ホバー状態、浮き上がり要素 |
| Gray 400 | `#9CA3AF` | サブテキスト、補足情報 |
| Gray 200 | `#E5E7EB` | 見出し、重要テキスト |
| White | `#FFFFFF` | メインテキスト（ダーク背景上） |

### Light Sections
| 名前 | HEX | 用途 |
|------|------|------|
| Warm White | `#FAFAF8` | ライトセクション背景 |
| Light Surface | `#F5F3F0` | カード背景（ライトモード） |
| Dark Text | `#1A1A1A` | テキスト（ライト背景上） |

### Semantic
| 名前 | HEX | 用途 |
|------|------|------|
| Success | `#22C55E` | 完了、ポジティブ表示 |
| Info | `#3B82F6` | 情報、リンク |

## 3. Typography Rules

### フォントファミリー
- **日本語本文:** Noto Sans JP (400, 500, 700, 900)
- **英字見出し:** Outfit (600, 700, 800, 900)

### スケール
| 要素 | サイズ (mobile) | サイズ (desktop) | Weight | Font |
|------|----------------|-----------------|--------|------|
| Hero見出し | 2.5rem | 4.5rem | 900 | Outfit |
| セクション見出し | 1.75rem | 3rem | 700 | Noto Sans JP |
| サブ見出し | 1.25rem | 1.5rem | 700 | Noto Sans JP |
| 本文 | 1rem | 1.125rem | 400 | Noto Sans JP |
| キャプション | 0.875rem | 0.875rem | 400 | Noto Sans JP |
| ラベル | 0.75rem | 0.75rem | 500 | Outfit |

### ルール
- 見出しのレタースペーシング: `-0.02em`（タイト）
- 本文の行間: `1.8`（日本語は広めに）
- 英字見出しは大文字（uppercase）を積極的に使用
- 数字（価格・統計）はOutfitで大きく表示

## 4. Component Stylings

### ボタン
```
Primary: bg-[#F5A623] text-black font-bold px-8 py-4 rounded-full
         hover: bg-[#E09510] scale-105 shadow-[0_0_30px_rgba(245,166,35,0.3)]
         transition: all 300ms ease

Ghost:   border border-white/20 text-white px-8 py-4 rounded-full
         hover: bg-white/10 border-white/40
         transition: all 300ms ease
```

### ギャラリーカード
```
Container: bg-[#141414] rounded-2xl overflow-hidden group cursor-pointer
           border: 1px solid rgba(255,255,255,0.05)
           hover: border-[rgba(245,166,35,0.3)] scale-[1.02]
           transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1)

Image:     object-cover w-full aspect-[4/3]
           group-hover: scale-110
           transition: transform 700ms cubic-bezier(0.4, 0, 0.2, 1)

Overlay:   absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
           opacity-0 group-hover: opacity-100
           transition: opacity 500ms ease

Title:     text-white font-bold text-xl
           translate-y-4 group-hover: translate-y-0
           transition: transform 500ms ease
```

### セクションヘッダー
```
Label:   text-[#F5A623] text-sm font-semibold uppercase tracking-[0.2em] font-display
Title:   text-white text-3xl md:text-5xl font-bold
Sub:     text-gray-400 text-lg max-w-2xl
```

## 5. Layout Principles

### スペーシング
- セクション間: `py-24 md:py-32`（大きく呼吸する余白）
- コンテナ: `max-w-7xl mx-auto px-6`
- カード間: `gap-6 md:gap-8`
- 要素間（縦）: `space-y-4` / `space-y-6`

### グリッド
- ギャラリー: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- 特徴カード: `grid-cols-1 md:grid-cols-3`
- 2カラムレイアウト: `grid-cols-1 lg:grid-cols-2`

### 原則
- 余白は惜しまない。詰め込まない
- 1セクション1メッセージ
- スクロールに合わせて要素が現れる（Intersection Observer）
- ギャラリーセクションは画面幅いっぱいに使う（コンテナブレイクアウト）

## 6. Depth & Elevation

### シャドウ
```
sm:   0 2px 8px rgba(0,0,0,0.3)
md:   0 8px 32px rgba(0,0,0,0.4)
lg:   0 16px 64px rgba(0,0,0,0.5)
glow: 0 0 40px rgba(245,166,35,0.2)
```

### サーフェス階層（ダーク背景）
1. 背景: `#0A0A0A`
2. カード: `#141414`（+ border white/5）
3. ホバー/浮き上がり: `#1E1E1E`（+ glow shadow）
4. モーダル/オーバーレイ: `#0A0A0A` @ 90% opacity + backdrop-blur

## 7. Do's and Don'ts

### Do
- パララックス効果を積極的に使う
- ギャラリー画像は高品質・フルブリードで見せる
- ダークとライトのセクションを交互に使ってメリハリをつける
- スクロールアニメーションは subtle から始めて目を引くところで大胆に
- 数字（価格・実績）は大きく強調
- CTAボタンにはグロー効果をつける

### Don't
- 絵文字は使わない
- テキストを詰め込まない
- 安っぽいグラデーションは避ける
- 3D表現・ドロップシャドウ多用は避ける
- ストック写真風のイメージは使わない
- アニメーションは0.5秒以上かけない（ギャラリー吸い込み効果を除く）

## 8. Responsive Behavior

### ブレークポイント
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

### モバイル対応
- ギャラリーは1カラム、スワイプ可能
- Hero見出しは`2.5rem`まで縮小
- ナビはハンバーガーメニュー
- タッチターゲット最小44px
- ギャラリーの「吸い込み」効果はモバイルではフェードトランジションに簡略化

## 9. Agent Prompt Guide

### クイックリファレンス
```
背景(dark): #0A0A0A
カード: #141414, border: white/5, rounded-2xl
アクセント: #F5A623
テキスト(dark上): #FFFFFF (見出し), #9CA3AF (本文)
テキスト(light上): #1A1A1A
日本語: Noto Sans JP
英語: Outfit
角丸: rounded-2xl (カード), rounded-full (ボタン)
```

### プロンプト例
「DESIGN.mdに従って、Web制作実績のギャラリーセクションを作成してください。ダーク背景に3カラムグリッド、ホバーでオレンジのグロー効果、画像はズームイン。」
