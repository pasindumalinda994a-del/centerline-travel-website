"use client";

import Image from "next/image";
import { useRef } from "react";
import { RevealHeading } from "@/app/components/ui/RevealHeading";
import { journalPage } from "@/app/lib/content/journal";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function JournalQuote() {
  const rootRef = useRef<HTMLElement>(null);
  const { quote } = journalPage;

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const figure = rootRef.current?.querySelector("[data-journal-quote]");
      if (!figure) return;
      gsap.from(figure, {
        y: 32,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: figure,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
    >
      <figure data-journal-quote className="mx-auto max-w-3xl text-center">
        <RevealHeading
          as="h3"
          className="text-h3 leading-snug font-medium tracking-[-0.02em]"
        >
          {quote.text}
        </RevealHeading>
        <figcaption className="mt-6 flex items-center justify-center gap-3">
          <span className="relative size-10 overflow-hidden rounded-full">
            <Image
              src={quote.avatar}
              alt=""
              fill
              className="object-cover"
              sizes="40px"
            />
          </span>
          <span className="text-left">
            <span className="text-body block font-medium text-foreground">
              {quote.name}
            </span>
            <span className="text-caption text-muted">{quote.role}</span>
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
