"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/app/components/ui/Button";
import { CountUp } from "@/app/components/ui/CountUp";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { RevealHeading } from "@/app/components/ui/RevealHeading";
import { events } from "@/app/lib/content/home";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function Events() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const image = rootRef.current?.querySelector("[data-events-image]");
      const copy = rootRef.current?.querySelectorAll("[data-events-copy]");
      if (image) {
        gsap.fromTo(
          image,
          { yPercent: -8, scale: 1.1 },
          {
            yPercent: 8,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
      if (copy?.length) {
        gsap.from(copy, {
          y: 28,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            once: true,
          },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      id="events"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10 lg:py-16"
    >
      <div className="relative min-h-[70svh] overflow-hidden rounded-2xl">
        <Image
          data-events-image
          src={events.image}
          alt="Festival atmosphere in Sri Lanka"
          fill
          className="object-cover will-change-transform"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate/75 via-slate/30 to-slate/20" />

        <div
          data-events-copy
          className="absolute top-8 right-8 z-10 max-w-[240px] text-right sm:top-12 sm:right-12 lg:top-14 lg:right-14"
        >
          <CountUp
            value={events.stat.value}
            className="text-h1 block leading-none font-medium tracking-[-0.02em] text-white"
          />
          <p className="text-caption mt-2 leading-relaxed text-white/80">
            {events.stat.label}
          </p>
        </div>

        <div
          data-events-copy
          className="relative z-10 flex h-full min-h-[70svh] flex-col items-start justify-end gap-5 p-8 sm:p-12 lg:max-w-[560px] lg:p-16"
        >
          <Eyebrow light>{events.eyebrow}</Eyebrow>
          <RevealHeading
            as="h2"
            mutedClassName="text-white/50"
            className="text-h2 leading-[1.05] font-medium tracking-[-0.03em] text-white"
          >
            {events.title}
          </RevealHeading>
          <p className="text-body max-w-[40ch] leading-relaxed text-white/80">
            {events.description}
          </p>
          <Button href={events.cta.href} variant="inverse">
            {events.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
