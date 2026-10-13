"use client";

import { useEffect } from "react";

// 日本語を言葉の切れ目でだけ折り返す（10/13 総チェック「水割｜り」「話せま｜す。」の直し）。
// 文を単語に分け、ひらがなだけの短い語（を・に・ます・です 等）は前の語にくっつけて文節にし、
// 文節の間にだけ折り返せる印（ゼロ幅スペース）を入れる。CSS の keep-all と組で効く。
// 一字の漢字は前の漢字にくっつける（「駐車｜場」を防ぐ）。text-wrap は -style だけ指定し、各所の nowrap を消さない。
// Intl.Segmenter は Chrome・Safari とも使える。使えないブラウザでは何もしない（ふつうの折り返しのまま）。
const ZW = "​";
const JA = /[぀-ヿ㐀-鿿]/;
const KANA_ONLY = /^[぀-ゟ]+$/;
const PUNCT = /^[、。，．・」』）)！？!?：:ー〜…％%]+$/;
const OPEN = /^[「『（(]+$/;
const PREFIX = /^[おご御]$/;
const KANJI1 = /^[\u3400-\u9fff]$/;
const ENDS_KANJI = /[\u3400-\u9fff]$/;

function phrases(text: string, seg: Intl.Segmenter): string {
  const out: string[] = [];
  let prevOpen = false;
  for (const { segment } of seg.segment(text)) {
    const attach =
      out.length > 0 &&
      (prevOpen ||
        PUNCT.test(segment) ||
        (KANJI1.test(segment) && ENDS_KANJI.test(out[out.length - 1])) || (KANA_ONLY.test(segment) && segment.length <= 3) || /^\s+$/.test(segment) || !JA.test(segment));
    if (attach) out[out.length - 1] += segment;
    else out.push(segment);
    // 「お｜電話」「ご｜予約」と切れないよう、お・ご は次の語にくっつける
    prevOpen = OPEN.test(segment) || PREFIX.test(segment);
  }
  return out.join(ZW);
}

export default function PhraseWrap() {
  useEffect(() => {
    if (typeof Intl === "undefined" || !("Segmenter" in Intl)) return;
    const seg = new Intl.Segmenter("ja", { granularity: "word" });
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        const p = n.parentElement;
        if (!p || p.closest("script,style,noscript,textarea,input,[data-nowrap]")) return NodeFilter.FILTER_REJECT;
        const t = n.textContent || "";
        return JA.test(t) && t.length > 4 && !t.includes(ZW) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    const nodes: Text[] = [];
    while (walk.nextNode()) nodes.push(walk.currentNode as Text);
    for (const n of nodes) n.textContent = phrases(n.textContent || "", seg);
    document.documentElement.classList.add("smp-phrased");
  }, []);
  return (
    <style>{`.smp-phrased body{word-break:keep-all;overflow-wrap:break-word;line-break:strict}.smp-phrased p,.smp-phrased li,.smp-phrased dd,.smp-phrased td{text-wrap-style:pretty}`}</style>
  );
}
