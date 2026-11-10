"use client";

import Image from "next/image";
import { useRef } from "react";
import { CtaButton } from "@/app/components/ui/CtaButton";
import { CountUp } from "@/app/components/ui/CountUp";
import { CheckIcon, StarIcon } from "@/app/components/ui/icons";
import { Marquee } from "@/app/components/ui/Marquee";
import { RevealHeading } from "@/app/components/ui/RevealHeading";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { testimonials } from "@/app/lib/content/home";
import {
  CARD_FADE,
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

type Review = (typeof testimonials.reviews)[number];

function Stars() {
  return (
    <span className="flex gap-0.5 text-brand" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="size-3.5" />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure
      data-tst-review
      className="flex shrink-0 flex-col overflow-hidden rounded-xl border border-line bg-surface p-5 lg:p-6"
    >
      <Stars />
      <blockquote className="text-body mt-3 line-clamp-3 flex-1 leading-relaxed text-muted">
        {review.copy}
      </blockquote>
      <figcaption className="mt-3 flex items-center gap-3">
        <span className="relative size-9 shrink-0 overflow-hidden rounded-full">
          <Image src={review.avatar} alt="" fill className="object-cover" sizes="36px" />
        </span>
        <span className="min-w-0">
          <span className="text-caption block truncate font-medium">{review.name}</span>
          <span className="text-caption block truncate text-muted">{review.place}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;

      const reduced = prefersReducedMotion();

      if (!reduced) {
        const cols = root.querySelectorAll("[data-tst-col]");
        if (cols.length) {
          gsap.from(cols, {
            ...CARD_FADE,
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
            ...CARD_FADE,
            scrollTrigger: {
              trigger: founder,
              start: "top 85%",
              once: true,
            },
          });
        }
      }

      const viewport = root.querySelector<HTMLElement>("[data-review-marquee]");
      const track = root.querySelector<HTMLElement>("[data-review-marquee-track]");
      const firstCopy = root.querySelector<HTMLElement>("[data-review-marquee-copy]");
      if (!viewport || !track || !firstCopy) return;

      let tween: gsap.core.Tween | undefined;

      const layoutMarquee = () => {
        const cards = root.querySelectorAll<HTMLElement>("[data-tst-review]");
        if (!cards.length) return;

        const styles = getComputedStyle(firstCopy);
        const gap =
          parseFloat(styles.rowGap || styles.gap) ||
          (window.matchMedia("(min-width: 1024px)").matches ? 16 : 12);
        const viewportH = viewport.clientHeight;
        if (viewportH <= 0) return;

        const cardH = (viewportH - gap * 2) / 3;
        gsap.set(cards, { height: cardH });

        if (reduced) {
          gsap.set(track, { y: 0, clearProps: "transform" });
          tween?.kill();
          tween = undefined;
          return;
        }

        // Force layout so offsetHeight reflects new card heights
        const loopDistance = firstCopy.offsetHeight;
        if (loopDistance <= 0) return;

        tween?.kill();
        gsap.set(track, { y: 0 });
        tween = gsap.to(track, {
          y: -loopDistance,
          duration: 28,
          ease: "none",
          repeat: -1,
        });
      };

      layoutMarquee();

      const ro = new ResizeObserver(() => {
        layoutMarquee();
      });
      ro.observe(viewport);

      return () => {
        ro.disconnect();
        tween?.kill();
      };
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

        <div className="grid gap-3 lg:grid-cols-12 lg:gap-4 lg:items-stretch">
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
              <CtaButton
                href={testimonials.rating.cta.href}
                variant="dark"
                className="mt-3"
              >
                {testimonials.rating.cta.label}
              </CtaButton>
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

          {/* Vertical review marquee */}
          <div className="relative min-h-[480px] lg:col-span-4">
            <div
              data-review-marquee
              className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
            >
              <div data-review-marquee-track className="flex flex-col will-change-transform">
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    data-review-marquee-copy={copy === 0 ? true : undefined}
                    className={`flex flex-col gap-3 pb-3 lg:gap-4 lg:pb-4${copy === 1 ? " motion-reduce:hidden" : " motion-reduce:pb-0"}`}
                    aria-hidden={copy === 1 ? true : undefined}
                  >
                    {testimonials.reviews.map((review) => (
                      <ReviewCard
                        key={`${copy}-${review.name}`}
                        review={review}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
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
