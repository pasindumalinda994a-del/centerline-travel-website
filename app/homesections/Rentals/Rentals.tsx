"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowCircle } from "@/app/components/ui/ArrowCircle";
import { Button } from "@/app/components/ui/Button";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { MetaPill } from "@/app/components/ui/MetaPill";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { rentals } from "@/app/lib/content/home";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function Rentals() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      const pinEl = root.querySelector<HTMLElement>("[data-rental-pin]");
      const track = root.querySelector<HTMLElement>("[data-rental-track]");
      const progress = root.querySelector<HTMLElement>("[data-rental-progress]");
      if (!pinEl || !track) return;

      const mm = gsap.matchMedia();

      // Desktop: pin the section and scrub the track sideways
      mm.add("(min-width: 1024px)", () => {
        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth + 80);

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinEl,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress) {
                gsap.set(progress, { scaleX: self.progress });
              }
            },
          },
        });
      });

      // Mobile / tablet: simple fade-up of the cards
      mm.add("(max-width: 1023px)", () => {
        const cards = root.querySelectorAll("[data-rental-card]");
        if (!cards.length) return;
        gsap.from(cards, {
          y: 32,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: track,
            start: "top 80%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section id="rentals" ref={rootRef}>
      <div
        data-rental-pin
        className="flex flex-col justify-center py-20 lg:h-svh lg:min-h-[720px] lg:py-0"
      >
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionHeader
            className="mb-10 lg:mb-12"
            eyebrow={rentals.eyebrow}
            title={rentals.title}
            description={rentals.description}
            cta={
              <>
                <Button href={rentals.cta.href} variant="dark">
                  {rentals.cta.label}
                </Button>
                <ArrowCircle href={rentals.cta.href} />
              </>
            }
          />
        </div>

        <div
          data-rental-track
          className="flex w-full snap-x gap-3 overflow-x-auto px-4 pb-4 will-change-transform sm:px-6 lg:w-max lg:gap-4 lg:overflow-visible lg:px-10 lg:pb-0"
        >
          {rentals.items.map((item) => (
            <a
              key={item.title}
              href="#rentals"
              data-rental-card
              className="group relative h-[400px] w-[280px] shrink-0 snap-start overflow-hidden rounded-xl sm:h-[440px] sm:w-[320px] lg:h-[48svh] lg:min-h-[400px] lg:w-[360px]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="360px"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-slate/80 via-transparent to-transparent" />
              <span className="absolute top-4 left-4">
                <MetaPill variant="earth">{item.price}</MetaPill>
              </span>
              <span className="absolute top-4 right-4">
                <ArrowCircle
                  as="span"
                  light
                  className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </span>
              <span className="absolute inset-x-0 bottom-0 block p-5">
                <span className="text-h3 block font-medium text-white">
                  {item.title}
                </span>
                <span className="text-caption mt-1 block text-white/70">
                  {item.label}
                </span>
              </span>
            </a>
          ))}

          <a
            href="#rentals"
            data-rental-card
            className="group relative flex h-[400px] w-[280px] shrink-0 snap-start flex-col items-start justify-between overflow-hidden rounded-xl bg-slate p-7 sm:h-[440px] sm:w-[320px] lg:h-[48svh] lg:min-h-[400px] lg:w-[360px]"
          >
            <Eyebrow light>All Rentals</Eyebrow>
            <span>
              <span className="text-h3 block max-w-[12ch] leading-tight font-medium tracking-tight text-white">
                Everything your route needs
              </span>
              <span className="text-body mt-4 inline-flex items-center gap-3 font-medium text-white">
                <ArrowCircle as="span" light />
                See all rentals
              </span>
            </span>
          </a>
        </div>

        <div className="mx-auto mt-8 hidden w-full max-w-[1400px] px-4 sm:px-6 lg:block lg:px-10">
          <div className="h-px w-full bg-line">
            <div
              data-rental-progress
              className="h-px w-full origin-left scale-x-0 bg-brand"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
