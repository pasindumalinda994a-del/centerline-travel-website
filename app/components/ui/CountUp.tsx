"use client";

import { useRef } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

type CountUpProps = {
  /** e.g. "25+", "4.9", "1k+", "100+", "Local" (non-numeric renders as-is) */
  value: string;
  className?: string;
  duration?: number;
};

const NUMBER_PATTERN = /^([^\d]*)([\d.]+)(.*)$/;

export function CountUp({ value, className = "", duration = 1.6 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(NUMBER_PATTERN);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el || !match || prefersReducedMotion()) return;

      const [, prefix, numberText, suffix] = match;
      const target = parseFloat(numberText);
      const decimals = numberText.includes(".")
        ? numberText.split(".")[1].length
        : 0;

      const counter = { n: 0 };
      gsap.to(counter, {
        n: target,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${counter.n.toFixed(decimals)}${suffix}`;
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
