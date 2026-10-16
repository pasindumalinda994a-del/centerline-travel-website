"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowCircle } from "@/app/components/ui/ArrowCircle";
import { Button } from "@/app/components/ui/Button";
import { MetaPill } from "@/app/components/ui/MetaPill";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { journal } from "@/app/lib/content/home";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function Journal() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const cards = rootRef.current?.querySelectorAll("[data-journal]");
      if (!cards?.length) return;
      gsap.from(cards, {
        y: 44,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="journal"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeader
        className="mb-10 lg:mb-12"
        eyebrow={journal.eyebrow}
        title={journal.title}
        description={journal.description}
        cta={
          <>
            <Button href={journal.cta.href} variant="dark">
              {journal.cta.label}
            </Button>
            <ArrowCircle href={journal.cta.href} />
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {journal.items.map((item) => {
          const featured = "featured" in item && item.featured;
          return (
            <a
              key={item.title}
              href="#journal"
              data-journal
              className={`group relative min-h-[380px] overflow-hidden rounded-xl lg:min-h-[440px] ${
                featured ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-slate/85 via-slate/20 to-transparent" />
              <span className="absolute top-4 left-4 flex gap-2">
                <MetaPill variant="earth">{item.category}</MetaPill>
                <MetaPill>{item.date}</MetaPill>
              </span>
              <span className="absolute inset-x-0 bottom-0 block p-6">
                <span
                  className="text-h3 inline bg-gradient-to-r from-white to-white bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-1 leading-snug font-medium text-white transition-[background-size] duration-500 group-hover:bg-[length:100%_1.5px]"
                >
                  {item.title}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
