// 実績データ
export type Work = {
  slug: string;
  title: string;
  category: string;
  description: string;
  thumbnail: {
    bg: string;
    accent: string;
    text: string;
    icon: string;
  };
  tags: string[];
  demoUrl?: string;
  url?: string;
  year: string;
  client: string;
  challenge: string;
  solution: string;
  features: string[];
};

export const works: Work[] = [
  {
    slug: "salon-kukuru",
    title: "Hair Salon kukuru",
    category: "美容室",
    description:
      "奄美大島の美容室。ナチュラルで落ち着いた雰囲気のLP。メニュー・スタッフ紹介・予約導線をコンパクトにまとめた。",
    thumbnail: {
      bg: "from-amber-50 to-orange-50",
      accent: "#8B6914",
      text: "kukuru",
      icon: "scissors",
    },
    tags: ["Next.js", "LP", "レスポンシブ"],
    demoUrl: "/demo/salon",
    year: "2026",
    client: "Hair Salon kukuru（架空）",
    challenge:
      "電話予約のみで新規客の取りこぼしが多い。お店の雰囲気が伝わるWebサイトがない。",
    solution:
      "温かみのあるデザインで店内の雰囲気を表現。メニューを写真付きで掲載し、予約ボタンを常時表示で取りこぼしを防止。",
    features: [
      "スタイリスト紹介セクション",
      "メニュー・料金一覧",
      "予約ボタン常時表示",
      "Googleマップ埋め込み",
      "Instagram連携",
    ],
  },
  {
    slug: "restaurant-adan",
    title: "Bistro ADAN",
    category: "ビストロ",
    description:
      "奄美の食材をフレンチの技法で仕立てるビストロ。洗練されたダークトーンのデザイン。",
    thumbnail: {
      bg: "from-stone-900 to-stone-800",
      accent: "#D4A373",
      text: "ADAN",
      icon: "utensils",
    },
    tags: ["Next.js", "LP", "レスポンシブ"],
    demoUrl: "/demo/restaurant",
    year: "2026",
    client: "Bistro ADAN（架空）",
    challenge:
      "観光客にお店の存在を知ってもらえない。Google検索で上位表示されず、口コミ頼み。",
    solution:
      "料理写真をフルスクリーンで見せるダイナミックなデザイン。SEO対策で「奄美 居酒屋」検索に対応。営業情報をフローティング表示で常にアクセス可能に。",
    features: [
      "フルスクリーン料理写真",
      "おすすめメニューカード",
      "営業情報フローティング表示",
      "アクセス・駐車場案内",
      "SEO初期設定済み",
    ],
  },
  {
    slug: "construction-hae",
    title: "南風建設",
    category: "建設業",
    description:
      "奄美の工務店。施工実績と信頼感を重視した企業サイト。問い合わせ導線を明確に設計。",
    thumbnail: {
      bg: "from-slate-800 to-slate-700",
      accent: "#3B82F6",
      text: "南風建設",
      icon: "building",
    },
    tags: ["Next.js", "コーポレート", "レスポンシブ"],
    demoUrl: "/demo/construction",
    year: "2026",
    client: "南風建設（架空）",
    challenge:
      "会社の信頼性を伝える手段がない。施工実績を見せたいが紙のパンフレットしかない。",
    solution:
      "施工実績をギャラリー形式で掲載。会社概要・代表挨拶で信頼感を演出。問い合わせフォームで見積もり依頼を簡単に。",
    features: [
      "施工実績ギャラリー",
      "会社概要・代表挨拶",
      "対応エリアマップ",
      "お見積もりフォーム",
      "資格・許認可情報",
    ],
  },
  {
    slug: "camp-amami",
    title: "AMAMI FOREST CAMP",
    category: "キャンプ施設",
    description:
      "奄美大島のグランピング・キャンプ場。自然を感じるティールグリーン基調のデザインで、宿泊・食事・アクティビティの情報を網羅。",
    thumbnail: {
      bg: "from-teal-700 to-teal-500",
      accent: "#0B8388",
      text: "FOREST",
      icon: "tent",
    },
    tags: ["Next.js", "LP", "レスポンシブ"],
    demoUrl: "/demo/camp",
    year: "2026",
    client: "AMAMI FOREST CAMP（架空）",
    challenge:
      "紙のパンフレットしかなく、Web予約ができない。施設の魅力がオンラインで伝わっていない。",
    solution:
      "自然を感じるティールグリーン基調のデザインで、写真を大きく使い施設の雰囲気を伝達。宿泊プラン・BBQ・アクティビティの情報を整理し、予約導線を明確化。",
    features: [
      "パララックス風ヒーローセクション",
      "宿泊プラン比較カード",
      "BBQメニュー・アクティビティ紹介",
      "フォトギャラリー（マソンリーレイアウト）",
      "アクセス情報・予約導線",
    ],
  },
  {
    slug: "diving-blue",
    title: "BLUE AMAMI",
    category: "ダイビングショップ",
    description:
      "奄美のダイビングショップ。海の美しさを全面に押し出した爽やかなデザイン。コース予約までスムーズに導線設計。",
    thumbnail: {
      bg: "from-cyan-600 to-blue-700",
      accent: "#22D3EE",
      text: "BLUE",
      icon: "waves",
    },
    tags: ["Next.js", "LP", "レスポンシブ"],
    demoUrl: "/demo/diving",
    year: "2026",
    client: "BLUE AMAMI（架空）",
    challenge:
      "予約は電話のみで、観光客が営業時間外に予約できない。海の魅力を伝える情報発信ができていない。",
    solution:
      "海中写真を大胆に使ったビジュアル重視のLP。コース一覧から予約フォームへの導線を最短化。24時間Web予約に対応。",
    features: [
      "海中写真フルスクリーンヒーロー",
      "コース一覧・料金表",
      "Web予約フォーム",
      "スタッフ・インストラクター紹介",
      "アクセス・集合場所案内",
    ],
  },
  {
    slug: "tida-works-hp",
    title: "TIDA WORKS",
    category: "コーポレートサイト",
    description:
      "自社の公式ホームページ。アニメーションを多用したインタラクティブなデザインで、業務改善サービスの価値を直感的に伝える。",
    thumbnail: {
      bg: "from-gray-900 to-gray-800",
      accent: "#F5A623",
      text: "TIDA",
      icon: "code",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    url: "/",
    year: "2026",
    client: "TIDA WORKS（自社）",
    challenge:
      "奄美の小規模事業者に「ITって難しそう」というイメージを払拭し、親しみやすさと技術力を両立させる必要があった。",
    solution:
      "パララックス効果やキャラクターアニメーションを活用し、スクロールするだけで楽しめる体験型サイトに。料金プランもわかりやすく可視化。",
    features: [
      "スマホモックアップによる3業種デモ切替",
      "インタラクティブなキャラクターアニメーション",
      "業種別の悩みに寄り添うストーリー構成",
      "レスポンシブ完全対応",
    ],
  },
  {
    slug: "nursery-hidamari",
    title: "ひだまり保育園",
    category: "保育園",
    description:
      "奄美大島の保育園。温かみのあるクリーム×オレンジの配色で、保護者に安心感を届けるサイト。",
    thumbnail: {
      bg: "from-orange-100 to-amber-50",
      accent: "#F59E42",
      text: "ひだまり",
      icon: "sun",
    },
    tags: ["Next.js", "LP", "レスポンシブ"],
    demoUrl: "/demo/nursery",
    year: "2026",
    client: "ひだまり保育園（架空）",
    challenge:
      "園の雰囲気がWebで伝わらず、見学予約が電話のみで保護者に不便。",
    solution:
      "温かみのあるデザインで園の日常を表現。一日の流れや先生紹介で安心感を演出し、見学予約をWebから可能に。",
    features: [
      "保育理念・3つの柱",
      "一日の流れタイムライン",
      "先生紹介セクション",
      "入園案内・料金",
      "お問い合わせフォーム",
    ],
  },
  {
    slug: "osteopathic-shimatsumugi",
    title: "島つむぎ整骨院",
    category: "整骨院",
    description:
      "奄美大島の整骨院。清潔感あるブルー基調で信頼感と専門性を表現。予約導線を重視。",
    thumbnail: {
      bg: "from-blue-100 to-cyan-50",
      accent: "#2E86AB",
      text: "島つむぎ",
      icon: "heart",
    },
    tags: ["Next.js", "LP", "レスポンシブ"],
    demoUrl: "/demo/osteopathic",
    year: "2026",
    client: "島つむぎ整骨院（架空）",
    challenge:
      "口コミ頼みの集客で新規患者が増えない。施術内容や料金がわかりにくい。",
    solution:
      "症状別の悩みに寄り添う構成で患者の共感を獲得。施術メニューと料金を明確化し、電話・Web両方の予約導線を設計。",
    features: [
      "お悩み症状グリッド",
      "施術メニュー・料金表",
      "施術の流れ4ステップ",
      "院長紹介・資格情報",
      "診療時間テーブル",
    ],
  },
  {
    slug: "guesthouse-isokaze",
    title: "珊瑚の宿 いそかぜ",
    category: "民泊",
    description:
      "奄美大島の民泊。リゾート感あるネイビー×コーラルのデザインで、旅行者の予約意欲を高める。",
    thumbnail: {
      bg: "from-sky-200 to-blue-100",
      accent: "#E8A87C",
      text: "いそかぜ",
      icon: "home",
    },
    tags: ["Next.js", "LP", "レスポンシブ"],
    demoUrl: "/demo/guesthouse",
    year: "2026",
    client: "珊瑚の宿 いそかぜ（架空）",
    challenge:
      "予約サイト頼みで手数料が高い。宿の魅力や周辺情報を自分で発信できていない。",
    solution:
      "パララックス効果で海や宿の雰囲気を臨場感たっぷりに。お部屋紹介・周辺ガイド・予約情報を1ページで完結。直予約の導線を確保。",
    features: [
      "パララックスヒーロー",
      "お部屋3タイプ紹介",
      "フォトギャラリー",
      "周辺観光ガイド",
      "予約フォーム",
    ],
  },
  {
    slug: "farm-taiyo",
    title: "あまみ果樹園 太陽のしずく",
    category: "農園・直売",
    description:
      "奄美大島の果樹園。たんかん・パッションフルーツなど島の恵みを全国に届ける直販サイト。",
    thumbnail: {
      bg: "from-green-100 to-yellow-50",
      accent: "#E07B39",
      text: "太陽のしずく",
      icon: "leaf",
    },
    tags: ["Next.js", "LP", "レスポンシブ"],
    demoUrl: "/demo/farm",
    year: "2026",
    client: "あまみ果樹園 太陽のしずく（架空）",
    challenge:
      "島外への販路がなく、旬の時期に在庫が余る。農園の魅力を伝える手段がない。",
    solution:
      "商品カタログで旬のフルーツを写真付きで紹介。旬カレンダーで収穫時期を可視化。全国配送の仕組みをわかりやすく案内。",
    features: [
      "商品カタログ6品",
      "旬のカレンダー",
      "農園体験メニュー",
      "全国配送ガイド",
      "注文・問い合わせフォーム",
    ],
  },
  {
    slug: "patisserie-soleil",
    title: "Pâtisserie Soleil",
    category: "パティスリー",
    description:
      "奄美大島のパティスリー。フランス菓子の技法と島のフルーツを融合させた洗練されたケーキ屋さんのサイト。",
    thumbnail: {
      bg: "from-pink-100 to-orange-50",
      accent: "#C9736B",
      text: "Soleil",
      icon: "cake",
    },
    tags: ["Next.js", "LP", "レスポンシブ"],
    demoUrl: "/demo/patisserie",
    year: "2026",
    client: "Pâtisserie Soleil（架空）",
    challenge:
      "SNSでの認知はあるが、メニューや世界観をまとめて伝える場所がない。ギフト需要の取りこぼしも。",
    solution:
      "ガラスショーケース風の商品陳列やケーキ断面アニメーションで世界観を表現。ギフトセット専用セクションで贈り物需要にも対応。",
    features: [
      "ショーケース風商品陳列",
      "ケーキ断面ビルドアニメーション",
      "季節のケーキ特集",
      "ギフトボックス演出",
      "パティシエ紹介",
    ],
  },
];
