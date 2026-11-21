"use client";

import Link from "next/link";
import { useRef } from "react";
import { CtaButton } from "@/app/components/ui/CtaButton";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { MetaPill } from "@/app/components/ui/MetaPill";
import { RevealHeading } from "@/app/components/ui/RevealHeading";
import type { DestinationRegion } from "@/app/lib/content/destinations";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function DestinationExploreBridge({
  destination,
}: {
  destination: DestinationRegion;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const { exploreBridge } = destination;

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const panel = rootRef.current?.querySelector("[data-explore-bridge]");
      if (!panel) return;
      gsap.from(panel, {
        y: 28,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28"
    >
      <div
        data-explore-bridge
        className="rounded-2xl border border-line bg-surface px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-3">
            <Eyebrow>{exploreBridge.eyebrow}</Eyebrow>
            <RevealHeading
              as="h2"
              className="text-h2 max-w-[16ch] leading-[1.05] font-medium tracking-[-0.03em]"
            >
              {exploreBridge.title}
            </RevealHeading>
            <p className="text-body mt-1 max-w-[40ch] leading-relaxed text-muted">
              {exploreBridge.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {exploreBridge.pills.map((pill) => (
                <MetaPill key={pill} variant="earth">
                  {pill}
                </MetaPill>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <CtaButton href={exploreBridge.primary.href} variant="dark">
              {exploreBridge.primary.label}
            </CtaButton>
            <Link
              href={exploreBridge.secondary.href}
              className="text-body font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              {exploreBridge.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
