"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/app/components/ui/Button";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { RevealHeading } from "@/app/components/ui/RevealHeading";
import { brand, finalCta, footer } from "@/app/lib/content/home";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      const image = root.querySelector("[data-cta-image]");
      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "top 20%",
              scrub: true,
            },
          },
        );
      }

      // Giant wordmark rises out of the bottom edge
      const watermark = root.querySelector("[data-watermark]");
      if (watermark) {
        gsap.fromTo(
          watermark,
          { yPercent: 60, opacity: 0.4 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 55%",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: rootRef },
  );

  return (
    <footer id="footer" ref={rootRef} className="w-full pb-4">
      <div className="relative mx-3 mb-4 overflow-hidden rounded-2xl sm:mx-4">
        <Image
          data-cta-image
          src={finalCta.image}
          alt=""
          fill
          className="object-cover object-[center_40%] will-change-transform"
          sizes="100vw"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,31,39,0.4)_0%,rgba(26,31,39,0.35)_40%,rgba(26,31,39,0.7)_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center px-5 pt-20 sm:px-10 lg:px-14 lg:pt-28">
          <Eyebrow light>{finalCta.eyebrow}</Eyebrow>
          <RevealHeading
            as="h2"
            mutedClassName="text-white/50"
            className="text-h2 mt-4 max-w-[16ch] text-center leading-[1.05] font-medium tracking-[-0.03em] text-white"
          >
            {finalCta.title}
          </RevealHeading>
          <p className="text-body mt-5 max-w-[42ch] text-center leading-relaxed text-white/80">
            {finalCta.description}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href={finalCta.primary.href} variant="inverse">
              {finalCta.primary.label}
            </Button>
            <Button
              href={finalCta.secondary.href}
              variant="ghost"
              className="border-white/35 text-white hover:border-white"
            >
              {finalCta.secondary.label}
            </Button>
          </div>

          <div className="mt-16 grid w-full gap-10 border-t border-white/15 pt-10 lg:mt-24 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo.png"
                  alt={brand.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover"
                />
                <span className="text-body font-medium text-white">
                  {brand.name}
                </span>
              </div>
              <p className="text-body mt-4 max-w-[34ch] leading-relaxed text-white/70">
                {footer.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
              {footer.columns.map((column) => (
                <div key={column.title}>
                  <Eyebrow light>{column.title}</Eyebrow>
                  <ul className="mt-4 space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a
                          href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-body text-white/85 transition-opacity hover:opacity-60"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <p
            data-watermark
            aria-hidden="true"
            className="text-display pointer-events-none mt-10 -mb-[0.22em] w-full text-center leading-[0.85] font-medium tracking-[-0.04em] text-white/15 select-none lg:mt-14"
          >
            {finalCta.watermark}
          </p>
        </div>
      </div>

      <div className="text-caption mx-3 flex flex-col gap-3 px-5 pt-2 pb-2 text-muted sm:mx-4 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
        <p>
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#privacy" className="transition-colors hover:text-foreground">
            Privacy Policy
          </a>
          <a href="#terms" className="transition-colors hover:text-foreground">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}
