import type { ReactNode } from "react";

/**
 * 日本語の文を「文節」くらいのかたまりに分け、かたまりの途中では折り返さないようにする。
 * Safari は word-break: auto-phrase が効かず「しま／す。」のように切れていたため。
 * Intl.Segmenter で単語に分け、ひらがな・記号で始まる単語は前のかたまりにくっつける（助詞・送りがな・句読点）。
 * サーバーで1回だけ組む（クライアント部品には組んだ物を渡す。ICU の違いで描画がずれないように）
 */
const seg = typeof Intl !== "undefined" && "Segmenter" in Intl ? new Intl.Segmenter("ja", { granularity: "word" }) : null;
const HEAD = /^[\p{Script=Han}\p{Script=Katakana}A-Za-z0-9０-９「（]/u;
const OPEN = /[「（]$/;

export function phrases(text: string): string[] {
  if (!seg) return [text];
  const out: string[] = [];
  let cur = "";
  for (const { segment } of seg.segment(text)) {
    // 新しいかたまりを始めるのは「漢字・カタカナ・英数字・開きかっこ」で始まり、
    // 今のかたまりが、ひらがなか句読点で終わっている時（＝助詞や送りがなの後ろ）
    const afterStop = /[、。]$/.test(cur) && !/^[、。」）]/.test(segment);
    // 「その」「この」などは次の語にくっつける（「その／会社の」で切れていた）
    if (/^(その|この|あの|どの)$/.test(cur)) {
      cur += segment;
      continue;
    }
    const startsNew = cur !== "" && (afterStop || (HEAD.test(segment) && !OPEN.test(cur) && /[\p{Script=Hiragana}、。」）！？／]$/u.test(cur)));
    if (startsNew) {
      out.push(cur);
      cur = segment;
    } else {
      cur += segment;
    }
  }
  if (cur) out.push(cur);
  return out;
}

export function jp(text: string): ReactNode {
  const parts = phrases(text);
  if (parts.length < 2) return text;
  return parts.map((p, i) => (
    <span key={i} className="aw-ph">
      {p}
    </span>
  ));
}
