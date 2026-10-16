"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from "@/app/lib/gsap";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => {
      ScrollTrigger.refresh();
    };

    // Refresh after Lenis + layout settle so reveal triggers measure correctly
    const raf1 = requestAnimationFrame(() => {
      refresh();
      requestAnimationFrame(refresh);
    });
    window.addEventListener("load", refresh);
    const t1 = window.setTimeout(refresh, 100);
    const t2 = window.setTimeout(refresh, 500);

    return () => {
      cancelAnimationFrame(raf1);
      window.removeEventListener("load", refresh);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  return children;
}
