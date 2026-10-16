"use client";

import Image from "next/image";
import type { SVGProps } from "react";
import { useRef } from "react";
import { ArrowCircle } from "@/app/components/ui/ArrowCircle";
import { Button } from "@/app/components/ui/Button";
import { EcoIcon, ExploreIcon, GroupsIcon } from "@/app/components/ui/icons";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { stays } from "@/app/lib/content/home";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

type IconProps = SVGProps<SVGSVGElement>;

const icons: Record<string, (props: IconProps) => React.ReactElement> = {
  compass: ExploreIcon,
  people: GroupsIcon,
  leaf: EcoIcon,
};

export function Stays() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      const image = root.querySelector("[data-stays-image]");
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

      const cards = root.querySelectorAll("[data-stays-card]");
      if (cards.length) {
        gsap.from(cards, {
          y: 64,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: root.querySelector("[data-stays-panel]"),
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
      id="stays"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeader
        className="mb-10 lg:mb-14"
        eyebrow={stays.eyebrow}
        title={stays.title}
        description={stays.description}
        cta={
          <>
            <Button href={stays.cta.href} variant="dark">
              {stays.cta.label}
            </Button>
            <ArrowCircle href={stays.cta.href} />
          </>
        }
      />

      <div
        data-stays-panel
        className="relative overflow-hidden rounded-2xl"
      >
        <div className="relative min-h-[520px] lg:min-h-[640px]">
          <Image
            data-stays-image
            src={stays.image}
            alt="Eco lodge stay in Sri Lanka"
            fill
            className="object-cover will-change-transform"
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate/50 via-transparent to-transparent" />
        </div>

        <div className="relative -mt-20 grid gap-3 px-4 pb-4 sm:px-6 sm:pb-6 lg:absolute lg:inset-x-6 lg:bottom-6 lg:mt-0 lg:grid-cols-3 lg:gap-4 lg:p-0">
          {stays.features.map((feature) => {
            const Icon = icons[feature.icon];
            return (
              <div
                key={feature.title}
                data-stays-card
                className="rounded-xl bg-surface/95 p-6 backdrop-blur-sm"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                  {Icon ? <Icon className="size-5" /> : null}
                </span>
                <h3 className="text-h3 mt-5 font-medium tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-body mt-1.5 leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
