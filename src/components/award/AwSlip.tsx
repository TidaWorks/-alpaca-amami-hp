"use client";

import { useEffect, useState } from "react";
import { Co } from "./AwYou";
import { useYou } from "./store";

const TASKS = ["困りごとを聞く", "頼む仕事を決める", "進め方を決める", "お金を確かめる", "話をする"];

/**
 * IT担当（ALPACA）の仕事の札。名前か困りごとを入れた人にだけ出る。
 * 読み進めるたびに、済んだ仕事に朱の線が入り、次の仕事に印が移る。
 */
export default function AwSlip() {
  const { step, worry } = useYou();
  const [done, setDone] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const top = (id: string) => document.getElementById(id)?.getBoundingClientRect().top ?? Infinity;
    const onScroll = () => {
      const vh = window.innerHeight;
      const line = vh * 0.5;
      let n = worry || top("work") <= line ? 1 : 0;
      if (n === 1 && top("voice") <= line) n = 2;
      if (n === 2 && top("price") <= line) n = 3;
      if (n === 3 && top("about") <= line) n = 4;
      setDone(n);
      setShow(step === 1 && top("work") <= vh * 0.85 && top("contact") > vh * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [step, worry]);

  return (
    <aside className={`aw-slip ${show ? "is-on" : ""}`} aria-hidden={!show} aria-label="IT担当の仕事の進み具合">
      <p className="aw-slip__h">
        <span className="aw-slip__co">
          <Co />
        </span>
        <span className="aw-slip__role">のIT担当　ALPACA</span>
      </p>
      <ol className="aw-slip__list">
        {TASKS.map((t, i) => (
          <li key={t} className={i < done ? "is-done" : i === done ? "is-now" : ""} data-prev={i === done - 1 || undefined}>
            <span className="aw-slip__n">{String(i + 1).padStart(2, "0")}</span>
            <span className="aw-slip__t">
              {t}
              <span className="aw-slip__strike" />
            </span>
          </li>
        ))}
      </ol>
      <p className="aw-slip__count">
        {Math.min(done + 1, TASKS.length)}/{TASKS.length}
      </p>
    </aside>
  );
}
