"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
  useGSAP,
} from "@/app/lib/gsap";

type MarqueeProps = {
  images: readonly string[];
  className?: string;
  /** Seconds for one full loop */
  duration?: number;
};

export function Marquee({ images, className = "", duration = 36 }: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;
      const track = root.querySelector<HTMLElement>("[data-marquee-track]");
      if (!track) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        duration,
        ease: "none",
        repeat: -1,
      });

      // Scroll velocity nudges the marquee faster, then it eases back
      const settle = gsap.to(tween, {
        timeScale: 1,
        duration: 1.4,
        delay: 0.15,
        ease: "power2.out",
        paused: true,
      });

      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(
            1,
            3.5,
            1 + Math.abs(self.getVelocity()) / 1200,
          );
          if (boost > tween.timeScale()) {
            tween.timeScale(boost);
            settle.invalidate().restart(true);
          }
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={`w-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div data-marquee-track className="flex w-max gap-3 lg:gap-4">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-3 lg:gap-4">
            {images.map((src, i) => (
              <span
                key={`${copy}-${src}-${i}`}
                className="relative block size-32 shrink-0 overflow-hidden rounded-lg sm:size-40"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
