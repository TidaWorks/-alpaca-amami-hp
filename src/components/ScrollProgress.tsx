"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none"
    >
      <div
        className="h-full origin-left"
        style={{
          width: `${width}%`,
          background: "linear-gradient(90deg, #12C998 0%, #635BFF 100%)",
          boxShadow: "0 0 8px rgba(99, 91, 255, 0.45)",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}
