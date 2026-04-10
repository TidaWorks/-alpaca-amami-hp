"use client";

import { PropsWithChildren, useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScrollProvider({ children }: PropsWithChildren) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // ScrollTriggerのリフレッシュをLenisのスクロールに同期
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis ref={lenisRef} root autoRaf={false} options={{ duration: 1.2, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}
