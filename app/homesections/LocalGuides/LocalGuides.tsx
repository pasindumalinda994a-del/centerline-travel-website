"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowCircle } from "@/app/components/ui/ArrowCircle";
import { Button } from "@/app/components/ui/Button";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { localGuides } from "@/app/lib/content/home";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function LocalGuides() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const cards = rootRef.current?.querySelectorAll("[data-guide-card]");
      if (!cards?.length) return;
      gsap.from(cards, {
        y: 48,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="guides"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeader
        className="mb-10 lg:mb-14"
        eyebrow={localGuides.eyebrow}
        title={localGuides.title}
        description={localGuides.description}
        cta={
          <>
            <Button href={localGuides.cta.href} variant="dark">
              {localGuides.cta.label}
            </Button>
            <ArrowCircle href={localGuides.cta.href} />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">
        {localGuides.items.map((guide) => (
          <article
            key={guide.name}
            data-guide-card
            className="group relative overflow-hidden rounded-xl"
          >
            <div className="relative aspect-[3/4] sm:aspect-[4/5]">
              <Image
                src={guide.image}
                alt={guide.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate/90 via-slate/20 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6">
              <Eyebrow light>{guide.role}</Eyebrow>
              <h3 className="text-h3 mt-2 font-medium tracking-tight text-white">
                {guide.name}
              </h3>

              <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="text-caption mt-3 font-medium text-white/70">
                    {guide.years}
                  </p>
                  <p className="text-body mt-2 leading-relaxed text-white/80 lg:opacity-0 lg:transition-opacity lg:delay-100 lg:duration-400 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
                    {guide.quote}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
