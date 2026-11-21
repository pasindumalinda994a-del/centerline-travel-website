"use client";

import Image from "next/image";
import { useRef } from "react";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import type { DestinationRegion } from "@/app/lib/content/destinations";
import {
  CARD_FADE,
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function DestinationHighlights({
  destination,
}: {
  destination: DestinationRegion;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const { highlights } = destination;

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const cards = rootRef.current?.querySelectorAll("[data-highlight]");
      if (!cards?.length) return;
      gsap.from(cards, {
        ...CARD_FADE,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeader
        className="mb-10 lg:mb-14"
        eyebrow={highlights.eyebrow}
        title={highlights.title}
        description={highlights.description}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {highlights.items.map((item, i) => (
          <article
            key={item.title}
            data-highlight
            className={`group relative overflow-hidden rounded-xl ${
              i === 0
                ? "min-h-[320px] sm:col-span-2 lg:col-span-2 lg:min-h-[420px]"
                : "min-h-[280px] lg:min-h-[420px]"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={
                i === 0
                  ? "(max-width: 640px) 100vw, 50vw"
                  : "(max-width: 1024px) 50vw, 25vw"
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate/85 via-slate/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
              <h3 className="text-h3 font-medium tracking-tight text-white">
                {item.title}
              </h3>
              <p className="text-body mt-1.5 max-w-[28ch] leading-snug text-white/80">
                {item.blurb}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
