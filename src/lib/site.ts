/**
 * ALPACA サイト全体で参照する設定値（連絡先・URL・SNS）。
 * 連絡先や SNS ハンドルが変わったらこの1ファイルを編集すれば全ページに反映される。
 */
export const SITE = {
  name: "ALPACA",
  url: "https://alpaca-amami.com",
  contact: {
    tel: "080-2790-6757",
    telHref: "tel:08027906757",
    email: "alpaca.amami@gmail.com",
    emailHref: "mailto:alpaca.amami@gmail.com",
    instagramHandle: "@alpaca_amami",
    instagramUrl: "https://instagram.com/alpaca_amami",
  },
} as const;
