"use client";

import Image from "next/image";
import { useRef } from "react";
import { CtaButton } from "@/app/components/ui/CtaButton";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { RevealHeading } from "@/app/components/ui/RevealHeading";
import { destinationsPage } from "@/app/lib/content/destinations";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function DestinationHubCta() {
  const rootRef = useRef<HTMLElement>(null);
  const { hubCta } = destinationsPage;

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      const image = root.querySelector("[data-hub-cta-image]");
      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "top 20%",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="w-full px-3 pb-16 sm:px-4 lg:pb-24">
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          data-hub-cta-image
          src={hubCta.image}
          alt=""
          fill
          className="object-cover object-[center_40%] will-change-transform"
          sizes="100vw"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,31,39,0.45)_0%,rgba(26,31,39,0.4)_40%,rgba(26,31,39,0.72)_100%)]"
          aria-hidden
        />

        <div className="relative z-10 flex flex-col items-center px-5 py-20 sm:px-10 lg:px-14 lg:py-28">
          <Eyebrow light>{hubCta.eyebrow}</Eyebrow>
          <RevealHeading
            as="h2"
            mutedClassName="text-white/50"
            className="text-h2 mt-4 max-w-[16ch] text-center leading-[1.05] font-medium tracking-[-0.03em] text-white"
          >
            {hubCta.title}
          </RevealHeading>
          <p className="text-body mt-5 max-w-[42ch] text-center leading-relaxed text-white/80">
            {hubCta.description}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <CtaButton href={hubCta.primary.href} variant="inverse">
              {hubCta.primary.label}
            </CtaButton>
            <CtaButton href={hubCta.secondary.href} variant="secondary">
              {hubCta.secondary.label}
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
