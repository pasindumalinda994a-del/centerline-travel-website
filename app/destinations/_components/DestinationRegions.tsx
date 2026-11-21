"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { CardCornerArrow } from "@/app/components/ui/CardCornerArrow";
import { MetaPill } from "@/app/components/ui/MetaPill";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import {
  destinationRegions,
  destinationsPage,
  type DestinationTag,
} from "@/app/lib/content/destinations";
import {
  CARD_FADE,
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

type Filter = (typeof destinationsPage.regions.filters)[number];

export function DestinationRegions() {
  const rootRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const { regions } = destinationsPage;

  const filtered = useMemo(() => {
    if (filter === "All") return destinationRegions;
    return destinationRegions.filter((region) =>
      region.filterTags.includes(filter as DestinationTag),
    );
  }, [filter]);

  const featured = filtered.slice(0, 4);
  const rest = filtered.slice(4);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      const tiles = root.querySelectorAll("[data-tile]");
      if (tiles.length) {
        gsap.from(tiles, {
          ...CARD_FADE,
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            once: true,
          },
        });
      }

      const wide = root.querySelectorAll("[data-tile-wide]");
      if (wide.length) {
        gsap.from(wide, {
          ...CARD_FADE,
          scrollTrigger: {
            trigger: wide[0],
            start: "top 85%",
            once: true,
          },
        });
      }
    },
    { scope: rootRef, dependencies: [filter] },
  );

  return (
    <section
      id="regions"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeader
        className="mb-8 lg:mb-10"
        eyebrow={regions.eyebrow}
        title={regions.title}
        description={regions.description}
      />

      <div className="mb-8 flex flex-wrap gap-2 lg:mb-10">
        {regions.filters.map((chip) => {
          const active = filter === chip;
          return (
            <button
              key={chip}
              type="button"
              onClick={() => setFilter(chip)}
              className={`text-caption rounded-full border px-3.5 py-2 font-medium tracking-[0.04em] uppercase transition-colors ${
                active
                  ? "border-slate bg-slate text-white"
                  : "border-line bg-surface text-muted hover:border-slate/40 hover:text-foreground"
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {featured.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {featured.map((item) => (
            <Link
              key={item.slug}
              href={`/destinations/${item.slug}`}
              data-tile
              className="group relative h-[420px] rounded-xl lg:h-[480px]"
            >
              <span className="absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute inset-0 block will-change-transform">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </span>
                <span className="absolute inset-0 bg-gradient-to-t from-slate/80 via-slate/10 to-transparent" />
              </span>
              <span className="absolute top-4 left-4 z-10">
                <MetaPill variant="earth">{item.tag}</MetaPill>
              </span>
              <CardCornerArrow />
              <span className="absolute inset-x-0 bottom-0 block p-5">
                <span className="text-h3 block font-medium tracking-tight text-white">
                  {item.title}
                </span>
                <span className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr]">
                  <span className="overflow-hidden">
                    <span className="text-caption mt-1 block font-medium text-white/70">
                      {item.meta}
                    </span>
                    <span className="text-body mt-2 block max-w-[28ch] leading-snug text-white/80 lg:opacity-0 lg:transition-opacity lg:delay-100 lg:duration-400 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
                      {item.shortDescription}
                    </span>
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      ) : null}

      {rest.length > 0 ? (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-4 lg:gap-4">
          {rest.map((item) => (
            <Link
              key={item.slug}
              href={`/destinations/${item.slug}`}
              data-tile-wide
              className="group relative h-[240px] rounded-xl lg:h-[280px]"
            >
              <span className="absolute inset-0 overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-slate/75 via-transparent to-transparent" />
              </span>
              <span className="absolute top-4 left-4 z-10">
                <MetaPill variant="earth">{item.tag}</MetaPill>
              </span>
              <CardCornerArrow corner="bottom-right" />
              <span className="absolute inset-x-0 bottom-0 block p-5 pr-20">
                <span className="text-h3 block font-medium text-white">
                  {item.title}
                </span>
                <span className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr]">
                  <span className="overflow-hidden">
                    <span className="text-body mt-1 block max-w-[36ch] text-white/80 lg:opacity-0 lg:transition-opacity lg:delay-100 lg:duration-400 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
                      {item.shortDescription}
                    </span>
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="text-body text-muted">No regions match this filter.</p>
      ) : null}
    </section>
  );
}
