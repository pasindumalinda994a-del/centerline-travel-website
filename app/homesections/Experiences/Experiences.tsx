"use client";

import Image from "next/image";
import type { SVGProps } from "react";
import { useRef } from "react";
import { ArrowCircle } from "@/app/components/ui/ArrowCircle";
import { Button } from "@/app/components/ui/Button";
import {
  PetsIcon,
  RestaurantIcon,
  TempleHinduIcon,
  WavesIcon,
} from "@/app/components/ui/icons";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { experiences } from "@/app/lib/content/home";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

type IconProps = SVGProps<SVGSVGElement>;

const icons: Record<string, (props: IconProps) => React.ReactElement> = {
  paw: PetsIcon,
  temple: TempleHinduIcon,
  bowl: RestaurantIcon,
  wave: WavesIcon,
};

export function Experiences() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      const tiles = root.querySelectorAll("[data-exp-tile]");
      if (tiles.length) {
        gsap.from(tiles, {
          y: 36,
          opacity: 0,
          scale: 0.95,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            once: true,
          },
        });
      }

      const badges = root.querySelectorAll("[data-exp-icon]");
      if (badges.length) {
        gsap.from(badges, {
          scale: 0,
          rotation: -30,
          duration: 0.7,
          ease: "back.out(2)",
          stagger: 0.08,
          delay: 0.25,
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            once: true,
          },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      id="experiences"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeader
        className="mb-10 lg:mb-12"
        eyebrow={experiences.eyebrow}
        title={experiences.title}
        description={experiences.description}
        cta={
          <>
            <Button href={experiences.cta.href} variant="dark">
              {experiences.cta.label}
            </Button>
            <ArrowCircle href={experiences.cta.href} />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {experiences.items.map((item) => {
          if (item.kind === "image") {
            return (
              <a
                key={item.title}
                href="#experiences"
                data-exp-tile
                className="group relative min-h-[240px] overflow-hidden rounded-xl sm:col-span-2 lg:min-h-[260px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-slate/85 via-slate/20 to-transparent" />
                <span className="absolute top-5 right-5">
                  <ArrowCircle
                    as="span"
                    light
                    className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </span>
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6">
                  <span>
                    <span className="text-h3 block font-medium text-white">
                      {item.title}
                    </span>
                    <span className="text-body mt-1 block max-w-[32ch] text-white/80">
                      {item.description}
                    </span>
                  </span>
                  <span className="hidden text-right sm:block">
                    <span className="text-h2 block leading-none font-medium text-white">
                      {item.stat}
                    </span>
                    <span className="text-caption mt-1 block text-white/70">
                      {item.statLabel}
                    </span>
                  </span>
                </span>
              </a>
            );
          }

          const Icon = item.icon ? icons[item.icon] : undefined;
          return (
            <a
              key={item.title}
              href="#experiences"
              data-exp-tile
              className="group flex min-h-[240px] flex-col justify-between rounded-xl border border-line bg-surface p-6 transition-colors hover:border-brand/30 lg:min-h-[260px]"
            >
              <span
                data-exp-icon
                className="flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white"
              >
                {Icon ? <Icon className="size-5" /> : null}
              </span>
              <span>
                <span className="text-h3 block font-medium tracking-tight">
                  {item.title}
                </span>
                <span className="text-body mt-2 block max-w-[26ch] leading-relaxed text-muted">
                  {item.description}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
