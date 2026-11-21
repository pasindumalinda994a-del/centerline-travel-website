"use client";

import Image from "next/image";
import { useRef } from "react";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { experiencesPage } from "@/app/lib/content/experiences";
import {
  CARD_FADE,
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function ExperienceFieldNotes() {
  const rootRef = useRef<HTMLElement>(null);
  const { fieldNotes } = experiencesPage;

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      const image = root.querySelector("[data-notes-image]");
      if (image) {
        gsap.fromTo(
          image,
          { yPercent: -8, scale: 1.15 },
          {
            yPercent: 8,
            scale: 1.05,
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

      const cards = root.querySelectorAll("[data-note-card]");
      if (cards.length) {
        gsap.from(cards, {
          ...CARD_FADE,
          scrollTrigger: {
            trigger: root.querySelector("[data-notes-panel]"),
            start: "top 60%",
            once: true,
          },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeader
        className="mb-10 lg:mb-14"
        eyebrow={fieldNotes.eyebrow}
        title={fieldNotes.title}
        description={fieldNotes.description}
      />

      <div data-notes-panel className="relative overflow-hidden rounded-2xl">
        <div className="relative min-h-[480px] lg:min-h-[640px]">
          <Image
            data-notes-image
            src={fieldNotes.image}
            alt={fieldNotes.imageAlt}
            fill
            className="object-cover will-change-transform"
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate/55 via-transparent to-transparent" />
        </div>

        <div className="relative -mt-24 grid gap-3 px-4 pb-4 sm:px-6 sm:pb-6 lg:absolute lg:inset-x-6 lg:bottom-6 lg:mt-0 lg:grid-cols-4 lg:gap-4 lg:p-0">
          {fieldNotes.items.map((item, i) => {
            const isLast = i === fieldNotes.items.length - 1;
            return (
              <div
                key={item.title}
                data-note-card
                className={`rounded-xl bg-surface/95 p-5 backdrop-blur-sm sm:p-6 ${
                  isLast ? "border border-brand/25" : ""
                }`}
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-brand/10">
                  <Image
                    src={item.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="size-[18px] brightness-0 opacity-55"
                  />
                </span>
                <h3 className="text-h3 mt-4 font-medium tracking-tight sm:mt-5">
                  {item.title}
                </h3>
                <p className="text-body mt-1.5 leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
