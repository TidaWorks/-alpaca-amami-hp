"use client";

import { useEffect } from "react";

export default function ScrollResetOnReload() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const navEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (navEntry?.type === "reload") {
      window.scrollTo(0, 0);
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
  }, []);

  return null;
}
