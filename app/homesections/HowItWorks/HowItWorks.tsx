"use client";

import { useRef } from "react";
import { ArrowCircle } from "@/app/components/ui/ArrowCircle";
import { Button } from "@/app/components/ui/Button";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { howItWorks } from "@/app/lib/content/home";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function HowItWorks() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      // Discovermarket-style stacked sticky cards: as each card pins,
      // the previous ones scale down, shift up, and their face fades out.
      const cards = gsap.utils.toArray<HTMLElement>("[data-step-card]", root);
      if (cards.length < 2) return;

      const pin = () => getComputedStyle(cards[0]).top;

      cards.forEach((card, i) => {
        const depth = cards.length - 1 - i;
        if (!depth) return;

        const st = {
          trigger: card,
          start: () => `top ${pin()}`,
          endTrigger: cards[cards.length - 1],
          end: () => `top ${pin()}`,
          scrub: true,
          invalidateOnRefresh: true,
        };

        gsap.to(card, {
          scale: 1 - 0.07 * depth,
          y: -18 * depth,
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: { ...st },
        });

        const face = card.querySelector("[data-step-face]");
        if (face) {
          gsap.to(face, {
            opacity: 0,
            ease: "none",
            scrollTrigger: { ...st },
          });
        }
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="how-it-works"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeader
            stacked
            eyebrow={howItWorks.eyebrow}
            title={howItWorks.title}
            description={howItWorks.description}
            cta={
              <div className="mt-2 flex items-center gap-2">
                <Button href={howItWorks.cta.href}>{howItWorks.cta.label}</Button>
                <ArrowCircle href={howItWorks.cta.href} />
              </div>
            }
          />
        </div>

        <div className="flex flex-col gap-3 lg:col-span-7 lg:gap-4">
          {howItWorks.steps.map((step, i) => {
            const isLast = i === howItWorks.steps.length - 1;
            return (
              <article
                key={step.index}
                data-step-card
                className={`sticky top-24 h-[clamp(240px,36svh,360px)] overflow-hidden rounded-xl border will-change-transform lg:top-32 ${
                  isLast
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-surface"
                }`}
              >
                <div
                  data-step-face
                  className="flex h-full flex-col justify-between p-7 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="text-h3 font-medium tracking-tight">
                      {step.title}
                    </h3>
                    <span
                      className={`text-stat leading-none font-medium tracking-tight ${
                        isLast ? "text-white/60" : "text-accent"
                      }`}
                    >
                      {step.index}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-6">
                    <p
                      className={`text-body max-w-[44ch] leading-relaxed ${
                        isLast ? "text-white/80" : "text-muted"
                      }`}
                    >
                      {step.description}
                    </p>
                    {isLast ? <ArrowCircle href={howItWorks.cta.href} light /> : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
