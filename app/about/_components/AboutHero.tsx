"use client";

import Image from "next/image";
import { useRef } from "react";
import { CountUp } from "@/app/components/ui/CountUp";
import { CtaButton } from "@/app/components/ui/CtaButton";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { RevealHeading } from "@/app/components/ui/RevealHeading";
import { aboutPage } from "@/app/lib/content/about";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function AboutHero() {
  const rootRef = useRef<HTMLElement>(null);
  const { hero } = aboutPage;

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      const fades = root.querySelectorAll("[data-hero-fade]");
      if (fades.length) {
        gsap.from(fades, {
          y: 24,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.1,
        });
      }

      const image = root.querySelector("[data-about-hero-image]");
      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 1.6,
            ease: "power2.out",
            delay: 0.2,
          },
        );
        gsap.fromTo(
          image,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: root.querySelector("[data-about-hero-media]"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      const proof = root.querySelectorAll("[data-hero-proof]");
      if (proof.length) {
        gsap.from(proof, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: proof[0],
            start: "top 90%",
            once: true,
          },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="w-full">
      <div className="mx-auto w-full max-w-[1400px] px-4 pt-16 sm:px-6 lg:px-10 lg:pt-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div data-hero-fade className="flex flex-col gap-3">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <RevealHeading
              as="h1"
              trigger="load"
              className="text-h1 max-w-[14ch] leading-[1.02] font-medium tracking-[-0.035em]"
            >
              {hero.title}
            </RevealHeading>
          </div>

          <div
            data-hero-fade
            className="flex max-w-[40ch] flex-col items-start gap-5 lg:items-end lg:pb-1 lg:text-right"
          >
            <p className="text-body leading-relaxed text-muted">
              {hero.description}
            </p>
            <CtaButton href={hero.cta.href} variant="dark">
              {hero.cta.label}
            </CtaButton>
          </div>
        </div>
      </div>

      <div
        data-about-hero-media
        className="relative m-3 mt-10 aspect-[16/10] overflow-hidden rounded-2xl sm:m-4 sm:mt-14 sm:aspect-[21/9] lg:mt-16"
      >
        <Image
          data-about-hero-image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          className="object-cover will-change-transform"
          sizes="100vw"
        />
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-[1400px] grid-cols-2 gap-8 border-t border-line px-4 pt-10 sm:px-6 lg:mt-14 lg:grid-cols-4 lg:px-10 lg:pt-12">
        {hero.proof.map((stat) => (
          <div key={stat.label} data-hero-proof className="text-center lg:text-left">
            <p className="display-accent display-accent--md text-foreground">
              <CountUp value={stat.value} />
            </p>
            <p className="text-caption mt-3 font-medium tracking-[0.04em] text-muted uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
