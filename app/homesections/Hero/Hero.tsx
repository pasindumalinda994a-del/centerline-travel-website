"use client";

import { useRef } from "react";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { RevealHeading } from "@/app/components/ui/RevealHeading";
import { hero } from "@/app/lib/content/home";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";
import { HeroBackground } from "./HeroBackground";
import { HeroNav } from "./HeroNav";
import {
  LandscapeIcon,
  PetsIcon,
  TempleHinduIcon,
  WavesIcon,
} from "./icons";
import { SearchBar } from "./SearchBar";

const chipIcons = {
  Coast: WavesIcon,
  Hills: LandscapeIcon,
  Wildlife: PetsIcon,
  Culture: TempleHinduIcon,
} as const;

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      const media = root.querySelector("[data-hero-media]");
      const bits = root.querySelectorAll("[data-hero-fade]");
      const searchCard = root.querySelector("[data-hero-search]");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (media) {
        tl.fromTo(
          media,
          { scale: 1.08 },
          { scale: 1, duration: 1.6, ease: "power2.out" },
          0,
        );
      }
      if (bits.length) {
        tl.from(
          bits,
          { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 },
          0.55,
        );
      }
      if (searchCard) {
        tl.from(
          searchCard,
          { y: 32, opacity: 0, duration: 0.9 },
          0.8,
        );
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      id="top"
      ref={rootRef}
      className="m-3 h-[calc(100svh-24px)] min-h-[720px] overflow-hidden rounded-2xl sm:m-4 sm:h-[calc(100svh-32px)]"
    >
      <div className="relative isolate h-full w-full overflow-hidden rounded-2xl">
        <div data-hero-media className="absolute inset-0 will-change-transform">
          <HeroBackground />
        </div>
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,31,39,0.4)_0%,rgba(26,31,39,0.08)_40%,rgba(26,31,39,0.6)_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full min-w-0 flex-col justify-between px-5 pt-3 pb-5 md:px-10 lg:px-14 lg:pt-5 lg:pb-8">
          <HeroNav />

          <div className="grid grid-cols-1 items-end gap-8 pb-2 lg:grid-cols-12 lg:gap-10">
            <div className="@container flex min-w-0 flex-col items-start gap-5 lg:col-span-7">
              <Eyebrow light data-hero-fade>
                {hero.eyebrow}
              </Eyebrow>
              <RevealHeading
                as="h1"
                trigger="load"
                delay={0.12}
                mutedClassName="text-white/55"
                className="max-w-[14ch] text-[length:min(var(--text-display),13.8cqi)] leading-[0.96] font-normal tracking-[-0.04em] text-white"
              >
                {hero.title}
              </RevealHeading>
              <p
                data-hero-fade
                className="text-body max-w-[32ch] text-left leading-relaxed text-white/90"
              >
                {hero.description}
              </p>
              <ul
                data-hero-fade
                className="flex flex-wrap gap-2"
                aria-label="Explore by landscape"
              >
                {hero.chips.map((chip) => {
                  const Icon = chipIcons[chip];
                  return (
                    <li key={chip}>
                      <a
                        href="#destinations"
                        className="text-caption inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-medium text-white backdrop-blur-xl transition-colors hover:bg-white/20"
                      >
                        <Icon className="size-4 shrink-0 opacity-90" />
                        {chip}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex min-w-0 flex-col items-start lg:col-span-5 lg:items-end">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
