"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { CardCornerArrow } from "@/app/components/ui/CardCornerArrow";
import { CtaButton } from "@/app/components/ui/CtaButton";
import { MetaPill } from "@/app/components/ui/MetaPill";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { experiencesPage } from "@/app/lib/content/experiences";
import {
  CARD_FADE,
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function ExperienceMoments() {
  const rootRef = useRef<HTMLElement>(null);
  const { moments } = experiencesPage;

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      const rows = root.querySelectorAll("[data-moment-row]");
      rows.forEach((row) => {
        const media = row.querySelector("[data-moment-image]");
        const copy = row.querySelector("[data-moment-copy]");

        if (copy) {
          gsap.from(copy, {
            ...CARD_FADE,
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              once: true,
            },
          });
        }

        if (media) {
          gsap.from(media, {
            opacity: 0,
            scale: 1.06,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
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
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="moments"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeader
        className="mb-12 lg:mb-16"
        eyebrow={moments.eyebrow}
        title={moments.title}
        description={moments.description}
      />

      <div className="flex flex-col gap-16 lg:gap-24">
        {moments.items.map((item, i) => {
          const reverse = i % 2 === 1;
          return (
            <article
              key={item.index}
              data-moment-row
              className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${
                reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Link
                href={item.href}
                className="group relative block min-h-[320px] overflow-hidden rounded-xl sm:min-h-[400px] lg:col-span-7 lg:min-h-[480px]"
              >
                <span className="absolute inset-0 overflow-hidden rounded-xl">
                  <Image
                    data-moment-image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover will-change-transform transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-slate/50 via-transparent to-transparent" />
                </span>
                <CardCornerArrow />
                <span className="absolute top-5 left-5">
                  <MetaPill>{item.meta}</MetaPill>
                </span>
                {"stat" in item && item.stat ? (
                  <span className="absolute right-5 bottom-5 hidden text-right sm:block">
                    <span className="display-accent display-accent--md block text-white/90">
                      {item.stat}
                    </span>
                    <span className="text-caption mt-1.5 block tracking-[0.04em] text-white/65 uppercase">
                      {item.statLabel}
                    </span>
                  </span>
                ) : null}
              </Link>

              <div
                data-moment-copy
                className={`flex flex-col gap-5 lg:col-span-5 ${
                  reverse ? "lg:pr-4" : "lg:pl-4"
                }`}
              >
                <p className="display-accent display-accent--md text-foreground/15">
                  {item.index}
                </p>
                <div className="-mt-2">
                  <h3 className="text-h2 leading-[1.05] font-medium tracking-[-0.03em]">
                    {item.title}
                  </h3>
                  <p className="text-body mt-4 max-w-[36ch] leading-relaxed text-muted">
                    {item.blurb}
                  </p>
                </div>
                <CtaButton href={item.href} variant="dark">
                  Explore {item.title}
                </CtaButton>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
