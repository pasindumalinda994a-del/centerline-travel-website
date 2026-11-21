"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { CardCornerArrow } from "@/app/components/ui/CardCornerArrow";
import { MetaPill } from "@/app/components/ui/MetaPill";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import {
  journalPage,
  journalStories,
  type JournalCategory,
} from "@/app/lib/content/journal";
import {
  CARD_FADE,
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

type Filter = (typeof journalPage.archive.filters)[number];

export function JournalArchive() {
  const rootRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const { archive } = journalPage;

  const filtered = useMemo(() => {
    if (filter === "All") return journalStories;
    return journalStories.filter(
      (story) => story.category === (filter as JournalCategory),
    );
  }, [filter]);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const cards = rootRef.current?.querySelectorAll("[data-journal-card]");
      if (!cards?.length) return;
      gsap.from(cards, {
        ...CARD_FADE,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: rootRef, dependencies: [filter] },
  );

  return (
    <section
      id="archive"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeader
        className="mb-8 lg:mb-10"
        eyebrow={archive.eyebrow}
        title={archive.title}
        description={archive.description}
      />

      <div className="mb-8 flex flex-wrap gap-2 lg:mb-10">
        {archive.filters.map((chip) => {
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

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {filtered.map((story, index) => {
          const featured = index === 0 && filter === "All";
          return (
            <a
              key={story.slug}
              href={`#${story.slug}`}
              data-journal-card
              className={`group relative min-h-[340px] rounded-xl lg:min-h-[420px] ${
                featured ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <span className="absolute inset-0 overflow-hidden rounded-xl">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={
                    featured
                      ? "(max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 1024px) 100vw, 33vw"
                  }
                />
                <span className="absolute inset-0 bg-gradient-to-t from-slate/85 via-slate/20 to-transparent" />
              </span>
              <span className="absolute top-4 left-4 z-10">
                <MetaPill variant="earth">{story.category}</MetaPill>
              </span>
              <CardCornerArrow />
              <span className="absolute inset-x-0 bottom-0 block p-6">
                <span className="text-h3 inline bg-gradient-to-r from-white to-white bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-1 leading-snug font-medium text-white transition-[background-size] duration-500 group-hover:bg-[length:100%_1.5px]">
                  {story.title}
                </span>
                <span className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr]">
                  <span className="overflow-hidden">
                    <span className="text-caption mt-2 block font-medium text-white/70 lg:opacity-0 lg:transition-opacity lg:delay-100 lg:duration-400 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
                      {story.readTime}
                    </span>
                  </span>
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
