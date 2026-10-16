"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/app/components/ui/Button";
import { CountUp } from "@/app/components/ui/CountUp";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { RevealHeading } from "@/app/components/ui/RevealHeading";
import { about } from "@/app/lib/content/home";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function About() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      const cols = root.querySelectorAll("[data-about-col]");
      if (cols.length) {
        gsap.from(cols, {
          y: 40,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            once: true,
          },
        });
      }

      // Parallax on the tall portrait
      const portrait = root.querySelector("[data-about-image]");
      if (portrait) {
        gsap.fromTo(
          portrait,
          { yPercent: -7, scale: 1.12 },
          {
            yPercent: 7,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      // Thumbs fan out as the card enters
      const fans = root.querySelectorAll<HTMLElement>("[data-fan]");
      if (fans.length) {
        gsap.from(fans, {
          rotation: 0,
          x: (i) => (1 - i) * 36,
          duration: 1,
          ease: "back.out(1.6)",
          stagger: 0.06,
          scrollTrigger: {
            trigger: fans[0],
            start: "top 85%",
            once: true,
          },
        });
      }

      // Stats strip numbers slide in
      const strip = root.querySelectorAll("[data-strip-item]");
      if (strip.length) {
        gsap.from(strip, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: strip[0],
            start: "top 88%",
            once: true,
          },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      id="about"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 lg:items-stretch">
        <div data-about-col className="flex flex-col justify-between gap-10 lg:col-span-4">
          <div className="flex flex-col gap-4">
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <RevealHeading
              as="h2"
              className="text-h2 max-w-[16ch] leading-[1.05] font-medium tracking-[-0.03em]"
            >
              {about.title}
            </RevealHeading>
            <p className="text-body max-w-[36ch] leading-relaxed text-muted">
              {about.description}
            </p>
            <Button href={about.cta.href} className="w-fit">
              {about.cta.label}
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {about.card.thumbs.map((src) => (
                <span
                  key={src}
                  className="relative size-10 overflow-hidden rounded-full border-2 border-background"
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="40px" />
                </span>
              ))}
              <span className="text-caption flex size-10 items-center justify-center rounded-full bg-brand font-medium text-white">
                1k+
              </span>
            </div>
            <div>
              <p className="text-caption font-medium">4.9/5</p>
              <p className="text-caption text-muted">Travelers exploring with us</p>
            </div>
          </div>
        </div>

        <div
          data-about-col
          className="relative min-h-[420px] overflow-hidden rounded-xl lg:col-span-4 lg:min-h-full"
        >
          <Image
            data-about-image
            src={about.image}
            alt="Trail through Sri Lankan hills"
            fill
            className="object-cover will-change-transform"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>

        <div data-about-col className="flex flex-col gap-6 lg:col-span-4">
          <dl className="rounded-xl bg-surface px-5 py-2">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between border-b border-line py-5 last:border-b-0"
              >
                <dt className="text-body text-muted">{stat.label}</dt>
                <dd className="text-body font-medium tracking-tight">
                  <CountUp value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>

          <div className="rounded-xl bg-surface p-6">
            <h3 className="text-h3 font-medium tracking-tight">{about.card.title}</h3>
            <p className="text-body mt-2 leading-relaxed text-muted">
              {about.card.description}
            </p>
            <div className="mt-6 flex justify-center -space-x-5 pb-1">
              {about.card.thumbs.map((src, i) => (
                <span
                  key={`card-${src}`}
                  data-fan
                  className="relative size-20 overflow-hidden rounded-lg border-2 border-surface shadow-md"
                  style={{ transform: `rotate(${(i - 1) * 9}deg)` }}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-8 border-t border-line pt-12 lg:mt-24 lg:grid-cols-4 lg:pt-14">
        {about.statsStrip.map((stat) => (
          <div key={stat.label} data-strip-item className="text-center">
            <p className="text-h2 leading-none font-medium tracking-[-0.02em] text-foreground">
              <CountUp value={stat.value} />
            </p>
            <p className="text-caption mt-2 font-medium text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
