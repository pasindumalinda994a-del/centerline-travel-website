"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowCircle } from "@/app/components/ui/ArrowCircle";
import { Button } from "@/app/components/ui/Button";
import { MetaPill } from "@/app/components/ui/MetaPill";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { destinations } from "@/app/lib/content/home";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function Destinations() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      // Clip-wipe reveal for the main row, fade-up for the wide row
      const tiles = root.querySelectorAll("[data-tile]");
      if (tiles.length) {
        gsap.fromTo(
          tiles,
          { clipPath: "inset(100% 0% 0% 0% round 1.75rem)", y: 32 },
          {
            clipPath: "inset(0% 0% 0% 0% round 1.75rem)",
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: root,
              start: "top 72%",
              once: true,
            },
          },
        );
        gsap.fromTo(
          root.querySelectorAll("[data-tile-image]"),
          { scale: 1.25 },
          {
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: root,
              start: "top 72%",
              once: true,
            },
          },
        );
      }

      const wide = root.querySelectorAll("[data-tile-wide]");
      if (wide.length) {
        gsap.from(wide, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: wide[0],
            start: "top 85%",
            once: true,
          },
        });
      }
    },
    { scope: rootRef },
  );

  const featured = destinations.items.slice(0, 4);
  const rest = destinations.items.slice(4);

  return (
    <section
      id="destinations"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeader
        className="mb-10 lg:mb-14"
        eyebrow={destinations.eyebrow}
        title={destinations.title}
        description={destinations.description}
        cta={
          <>
            <Button href={destinations.cta.href} variant="dark">
              {destinations.cta.label}
            </Button>
            <ArrowCircle href={destinations.cta.href} />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {featured.map((item) => (
          <a
            key={item.title}
            href="#destinations"
            data-tile
            className="group relative h-[420px] overflow-hidden rounded-xl lg:h-[480px]"
          >
            <span data-tile-image className="absolute inset-0 block will-change-transform">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </span>
            <span className="absolute inset-0 bg-gradient-to-t from-slate/80 via-slate/10 to-transparent" />
            <span className="absolute top-4 left-4">
              <MetaPill>{item.tag}</MetaPill>
            </span>
            <span className="absolute top-4 right-4">
              <ArrowCircle
                as="span"
                light
                className="transition-colors duration-300 group-hover:bg-brand group-hover:backdrop-blur-none"
              />
            </span>
            <span className="absolute inset-x-0 bottom-0 block p-5">
              <span className="text-h3 block font-medium tracking-tight text-white">
                {item.title}
              </span>
              <span className="text-caption mt-1 block font-medium text-white/70">
                {item.meta}
              </span>
              <span className="text-body mt-2 block max-w-[28ch] leading-snug text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.description}
              </span>
            </span>
          </a>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-4 lg:gap-4">
        {rest.map((item) => (
          <a
            key={item.title}
            href="#destinations"
            data-tile-wide
            className="group relative h-[240px] overflow-hidden rounded-xl lg:h-[280px]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-slate/75 via-transparent to-transparent" />
            <span className="absolute top-4 left-4">
              <MetaPill>{item.tag}</MetaPill>
            </span>
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <span>
                <span className="text-h3 block font-medium text-white">
                  {item.title}
                </span>
                <span className="text-body mt-1 block max-w-[36ch] text-white/80">
                  {item.description}
                </span>
              </span>
              <ArrowCircle as="span" light />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
