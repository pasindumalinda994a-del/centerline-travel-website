"use client";

import Image from "next/image";
import { useRef } from "react";
import { RevealHeading } from "@/app/components/ui/RevealHeading";
import { aboutPage } from "@/app/lib/content/about";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function AboutQuote() {
  const rootRef = useRef<HTMLElement>(null);
  const { quote } = aboutPage;

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const figure = rootRef.current?.querySelector("[data-about-quote]");
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
      <figure
        data-about-quote
        className="mx-auto max-w-3xl text-center"
      >
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
            <span className="text-body block font-medium">{quote.name}</span>
            <span className="text-caption block text-muted">{quote.role}</span>
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
