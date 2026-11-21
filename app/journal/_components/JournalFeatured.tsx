"use client";

import Image from "next/image";
import { useRef } from "react";
import { CardCornerArrow } from "@/app/components/ui/CardCornerArrow";
import { CtaButton } from "@/app/components/ui/CtaButton";
import { MetaPill } from "@/app/components/ui/MetaPill";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { journalPage, journalStories } from "@/app/lib/content/journal";
import {
  CARD_FADE,
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function JournalFeatured() {
  const rootRef = useRef<HTMLElement>(null);
  const { featured } = journalPage;
  const story =
    journalStories.find((item) => item.slug === featured.storySlug) ??
    journalStories[0];

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      const copy = root.querySelector("[data-featured-copy]");
      if (copy) {
        gsap.from(copy, {
          ...CARD_FADE,
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
            once: true,
          },
        });
      }

      const media = root.querySelector("[data-featured-image]");
      if (media) {
        gsap.from(media, {
          opacity: 0,
          scale: 1.06,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
            once: true,
          },
        });
        gsap.fromTo(
          media,
          { yPercent: -5 },
          {
            yPercent: 5,
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
    },
    { scope: rootRef },
  );

  return (
    <section
      id="featured"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeader
        className="mb-12 lg:mb-16"
        eyebrow={featured.eyebrow}
        title={featured.title}
        description={featured.description}
        cta={
          <CtaButton href={featured.cta.href} variant="dark">
            {featured.cta.label}
          </CtaButton>
        }
      />

      <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <a
          href="#archive"
          className="group relative block min-h-[360px] overflow-hidden rounded-xl sm:min-h-[440px] lg:col-span-7 lg:min-h-[560px]"
        >
          <span className="absolute inset-0 overflow-hidden rounded-xl">
            <Image
              data-featured-image
              src={story.image}
              alt={story.imageAlt}
              fill
              className="object-cover will-change-transform transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-slate/55 via-transparent to-transparent" />
          </span>
          <CardCornerArrow />
          <span className="absolute top-5 left-5">
            <MetaPill variant="earth">{story.category}</MetaPill>
          </span>
          <span className="absolute right-5 bottom-5 hidden text-right sm:block">
            <span className="display-accent display-accent--md block text-white/90">
              01
            </span>
            <span className="text-caption mt-1.5 block tracking-[0.04em] text-white/65 uppercase">
              Lead story
            </span>
          </span>
        </a>

        <div
          data-featured-copy
          className="flex flex-col gap-5 lg:col-span-5 lg:pl-4"
        >
          <p className="text-eyebrow font-medium tracking-[0.18em] text-brand uppercase">
            {story.readTime}
          </p>
          <div>
            <h3 className="text-h2 max-w-[16ch] leading-[1.05] font-medium tracking-[-0.03em]">
              {story.title}
            </h3>
            <p className="text-body mt-4 max-w-[36ch] leading-relaxed text-muted">
              {story.excerpt}
            </p>
          </div>
          <CtaButton href="#archive" variant="dark">
            Continue reading
          </CtaButton>
        </div>
      </article>
    </section>
  );
}
