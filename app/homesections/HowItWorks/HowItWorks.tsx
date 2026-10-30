"use client";

import { useRef } from "react";
import { ArrowCircle } from "@/app/components/ui/ArrowCircle";
import { CtaButton } from "@/app/components/ui/CtaButton";
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
          scale: 1 - 0.1 * depth,
          y: -24 * depth,
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
              <CtaButton href={howItWorks.cta.href} variant="dark" className="mt-2">
                {howItWorks.cta.label}
              </CtaButton>
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
                className={`relative sticky top-24 h-[clamp(280px,42svh,420px)] overflow-hidden rounded-xl border shadow-[0_12px_40px_-28px_rgba(42,49,59,0.35)] will-change-transform lg:top-32 ${
                  isLast
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-surface"
                }`}
              >
                {/* Left accent rail */}
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-[3px] ${
                    isLast ? "bg-white/35" : "bg-brand"
                  }`}
                />

                <div
                  data-step-face
                  className="relative flex h-full flex-col justify-between p-7 pl-8 sm:p-8 sm:pl-9"
                >
                  <div className="relative z-10 max-w-[28ch]">
                    <p
                      className={`text-eyebrow mb-3 font-medium tracking-[0.18em] uppercase ${
                        isLast ? "text-white/55" : "text-muted"
                      }`}
                    >
                      Step {step.index}
                    </p>
                    <h3 className="text-h3 font-medium tracking-tight">
                      {step.title}
                    </h3>
                  </div>

                  <span
                    aria-hidden
                    className={`display-accent display-accent--lg absolute top-2 right-3 z-[1] -mt-[0.08em] sm:top-3 sm:right-5 ${
                      isLast ? "text-white/15" : "text-foreground/10"
                    }`}
                  >
                    {step.index}
                  </span>

                  <div className="relative z-10 flex items-end justify-between gap-6">
                    <p
                      className={`text-body max-w-[36ch] leading-relaxed ${
                        isLast ? "text-white/80" : "text-muted"
                      }`}
                    >
                      {step.description}
                    </p>
                    {isLast ? (
                      <ArrowCircle href={howItWorks.cta.href} light />
                    ) : null}
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
