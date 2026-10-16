"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowCircle } from "@/app/components/ui/ArrowCircle";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { faq } from "@/app/lib/content/home";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
  useGSAP,
} from "@/app/lib/gsap";

export function Faq() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;

      let cancelled = false;
      let ctx: gsap.Context | undefined;

      // Measure after fonts load so bubble sizes are stable
      document.fonts.ready.then(() => {
        if (cancelled || !rootRef.current) return;

        ctx = gsap.context(() => {
          root
            .querySelectorAll<HTMLElement>("[data-faq-message]")
            .forEach((message) => {
              const row = message.parentElement as HTMLElement;
              const typing = message.querySelector<HTMLElement>("[data-typing]");
              const copy = message.querySelectorAll<HTMLElement>("[data-faq-copy]");

              const expandedWidth = message.offsetWidth;
              message.style.width = `${expandedWidth}px`;
              const expandedHeight = message.offsetHeight;
              row.style.minHeight = `${expandedHeight}px`;

              gsap.set(copy, { opacity: 0 });
              gsap.set(message, {
                width: 64,
                height: 64,
                borderRadius: "50%",
                padding: 0,
                scale: 0,
              });

              let collapseWhenDone = false;

              const enterTimeline = gsap.timeline({ paused: true });
              enterTimeline.to(message, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });

              const expandTimeline = gsap.timeline({
                paused: true,
                onReverseComplete: () => {
                  if (collapseWhenDone) {
                    collapseWhenDone = false;
                    enterTimeline.reverse();
                  }
                },
              });

              expandTimeline
                .to(typing, { autoAlpha: 0, duration: 0.2 })
                .to(message, {
                  width: expandedWidth,
                  borderRadius: "0.75rem",
                  paddingLeft: "1.75rem",
                  paddingRight: "1.75rem",
                  duration: 0.4,
                  ease: "power3.inOut",
                })
                .to(
                  message,
                  {
                    height: expandedHeight,
                    paddingTop: "1.5rem",
                    paddingBottom: "1.5rem",
                    duration: 0.4,
                    ease: "power3.inOut",
                  },
                  "-=0.2",
                )
                .to(
                  copy,
                  { opacity: 1, duration: 0.3, stagger: 0.05 },
                  "-=0.25",
                );

              ScrollTrigger.create({
                trigger: row,
                start: "top 85%",
                onEnter: () => {
                  collapseWhenDone = false;
                  enterTimeline.play();
                },
                onLeaveBack: () => {
                  if (expandTimeline.progress() > 0) {
                    collapseWhenDone = true;
                  } else {
                    enterTimeline.reverse();
                  }
                },
              });

              ScrollTrigger.create({
                trigger: row,
                start: "top 75%",
                onEnter: () => expandTimeline.play(),
                onLeaveBack: () => expandTimeline.reverse(),
              });
            });

          ScrollTrigger.refresh();
        }, root);
      });

      return () => {
        cancelled = true;
        ctx?.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      id="faq"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-8 lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeader
            stacked
            eyebrow={faq.eyebrow}
            title={faq.title}
            description={faq.description}
          />

          <a
            href={faq.sideCard.cta.href}
            className="group relative block min-h-[300px] overflow-hidden rounded-xl"
          >
            <Image
              src={faq.sideCard.image}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-slate/85 via-slate/20 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <span>
                <span className="text-h3 block font-medium text-white">
                  {faq.sideCard.title}
                </span>
                <span className="text-body mt-1.5 block max-w-[30ch] leading-relaxed text-white/80">
                  {faq.sideCard.description}
                </span>
              </span>
              <ArrowCircle as="span" light />
            </span>
          </a>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-7" aria-label="Frequently asked questions">
          {faq.items.map((item) => (
            <div key={item.question} className="contents">
              {/* Question bubble — traveler side */}
              <div className="flex justify-end">
                <div
                  data-faq-message
                  className="relative max-w-[440px] origin-bottom-right rounded-xl bg-brand px-7 py-6 text-white"
                >
                  <span data-typing className="typing-indicator" aria-hidden>
                    <span />
                    <span />
                    <span />
                  </span>
                  <p data-faq-copy className="text-body leading-relaxed font-medium">
                    {item.question}
                  </p>
                </div>
              </div>

              {/* Answer bubble — Centreline side */}
              <div className="flex justify-start">
                <div
                  data-faq-message
                  className="relative max-w-[520px] origin-bottom-left rounded-xl border border-line bg-surface px-7 py-6"
                >
                  <span data-typing className="typing-indicator text-slate" aria-hidden>
                    <span />
                    <span />
                    <span />
                  </span>
                  <p data-faq-copy className="text-body leading-relaxed text-foreground/90">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
