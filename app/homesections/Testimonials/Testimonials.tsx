"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowCircle } from "@/app/components/ui/ArrowCircle";
import { Button } from "@/app/components/ui/Button";
import { CountUp } from "@/app/components/ui/CountUp";
import { CheckIcon, StarIcon } from "@/app/components/ui/icons";
import { Marquee } from "@/app/components/ui/Marquee";
import { RevealHeading } from "@/app/components/ui/RevealHeading";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { testimonials } from "@/app/lib/content/home";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

function Stars() {
  return (
    <span className="flex gap-0.5 text-brand" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="size-3.5" />
      ))}
    </span>
  );
}

export function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      const cols = root.querySelectorAll("[data-tst-col]");
      if (cols.length) {
        gsap.from(cols, {
          y: 44,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            once: true,
          },
        });
      }

      const reviews = root.querySelectorAll("[data-tst-review]");
      if (reviews.length) {
        gsap.from(reviews, {
          y: 32,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.14,
          delay: 0.2,
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            once: true,
          },
        });
      }

      const founder = root.querySelector("[data-tst-founder]");
      if (founder) {
        gsap.from(founder, {
          y: 36,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: founder,
            start: "top 85%",
            once: true,
          },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      id="testimonials"
      ref={rootRef}
      className="w-full py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHeader
          className="mb-10 lg:mb-14"
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          description={testimonials.description}
        />

        <div className="grid gap-3 lg:grid-cols-12 lg:gap-4">
          {/* Rating summary */}
          <div
            data-tst-col
            className="flex flex-col justify-between gap-10 rounded-xl bg-surface p-7 lg:col-span-4 lg:p-8"
          >
            <div>
              <p className="flex items-baseline gap-1">
                <CountUp
                  value={testimonials.rating.value}
                  className="text-h1 leading-none font-medium tracking-[-0.02em]"
                />
                <span className="text-body text-muted">
                  {testimonials.rating.scale}
                </span>
              </p>
              <p className="text-body mt-3 max-w-[24ch] font-medium">
                {testimonials.rating.basis}
              </p>
              <ul className="mt-6 space-y-3">
                {testimonials.rating.proofs.map((proof) => (
                  <li key={proof} className="text-body flex items-center gap-2.5 text-muted">
                    <CheckIcon className="size-4 shrink-0 text-brand" />
                    {proof}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-body text-muted">Ready to plan your own journey?</p>
              <div className="mt-3 flex items-center gap-2">
                <Button href={testimonials.rating.cta.href} variant="dark">
                  {testimonials.rating.cta.label}
                </Button>
                <ArrowCircle href={testimonials.rating.cta.href} />
              </div>
            </div>
          </div>

          {/* Featured quote over image */}
          <div
            data-tst-col
            className="relative min-h-[480px] overflow-hidden rounded-xl lg:col-span-4"
          >
            <Image
              src={testimonials.featured.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate/90 via-slate/25 to-transparent" />
            <figure className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
              <blockquote className="text-body leading-relaxed font-medium text-white">
                {testimonials.featured.quote}
              </blockquote>
              <figcaption className="mt-4">
                <p className="text-body font-medium text-white">
                  {testimonials.featured.name}
                </p>
                <p className="text-caption text-white/70">
                  {testimonials.featured.place}
                </p>
              </figcaption>
            </figure>
          </div>

          {/* Stacked reviews */}
          <div data-tst-col className="flex flex-col gap-3 lg:col-span-4 lg:gap-4">
            {testimonials.reviews.map((review) => (
              <figure
                key={review.name}
                data-tst-review
                className="flex-1 rounded-xl border border-line bg-surface p-6"
              >
                <Stars />
                <p className="text-body mt-3 font-medium tracking-tight">
                  {review.title}
                </p>
                <blockquote className="text-body mt-2 leading-relaxed text-muted">
                  {review.copy}
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="relative size-9 overflow-hidden rounded-full">
                    <Image src={review.avatar} alt="" fill className="object-cover" sizes="36px" />
                  </span>
                  <span>
                    <span className="text-caption block font-medium">{review.name}</span>
                    <span className="text-caption block text-muted">{review.place}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Founder quote */}
        <div data-tst-founder className="mt-20 lg:mt-28">
          <figure className="mx-auto max-w-3xl text-center">
            <RevealHeading
              as="h3"
              className="text-h3 leading-snug font-medium tracking-[-0.02em]"
            >
              {testimonials.founder.quote}
            </RevealHeading>
            <figcaption className="mt-6 flex items-center justify-center gap-3">
              <span className="relative size-10 overflow-hidden rounded-full">
                <Image
                  src={testimonials.founder.avatar}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </span>
              <span className="text-left">
                <span className="text-body block font-medium">
                  {testimonials.founder.name}
                </span>
                <span className="text-caption block text-muted">
                  {testimonials.founder.role}
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>

      <Marquee images={testimonials.filmstrip} className="mt-12 lg:mt-16" />
    </section>
  );
}
