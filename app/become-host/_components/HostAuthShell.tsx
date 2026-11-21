"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useRef } from "react";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { RevealHeading } from "@/app/components/ui/RevealHeading";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

type HostAuthShellProps = {
  eyebrow: string;
  panelTitle: string;
  panelDescription: string;
  benefits: readonly string[];
  image: string;
  watermark: string;
  formEyebrow: string;
  formTitle: string;
  formDescription: string;
  children: ReactNode;
};

export function HostAuthShell({
  eyebrow,
  panelTitle,
  panelDescription,
  benefits,
  image,
  watermark,
  formEyebrow,
  formTitle,
  formDescription,
  children,
}: HostAuthShellProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      const media = root.querySelector("[data-auth-media]");
      const formBlock = root.querySelector("[data-auth-form]");

      if (media) {
        gsap.fromTo(
          media,
          { scale: 1.06, opacity: 0.85 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
        );
      }

      if (formBlock) {
        const items = formBlock.querySelectorAll("[data-auth-fade]");
        gsap.from(items, {
          opacity: 0,
          y: 16,
          duration: 0.7,
          stagger: 0.08,
          delay: 0.15,
          ease: "power2.out",
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="flex flex-1 flex-col px-3 pb-3 pt-1.5 sm:px-4 sm:pb-4 sm:pt-2"
    >
      <div className="mx-auto grid w-full max-w-[1400px] flex-1 overflow-hidden rounded-2xl border border-line/80 bg-background lg:grid-cols-12 lg:min-h-[calc(100svh-7.5rem)]">
        {/* Media panel */}
        <div className="relative isolate min-h-[38svh] overflow-hidden lg:col-span-5 lg:min-h-0 xl:col-span-6">
          <Image
            data-auth-media
            src={image}
            alt=""
            fill
            priority
            className="object-cover will-change-transform"
            sizes="(max-width: 1024px) 100vw, 50vw"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,31,39,0.25)_0%,rgba(26,31,39,0.35)_45%,rgba(26,31,39,0.78)_100%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8 lg:p-10">
            <Eyebrow light>{eyebrow}</Eyebrow>
            <RevealHeading
              as="h1"
              trigger="load"
              mutedClassName="text-white/50"
              className="text-h2 mt-3 max-w-[14ch] leading-[1.05] font-medium tracking-[-0.03em] text-white"
            >
              {panelTitle}
            </RevealHeading>
            <p className="text-body mt-3 max-w-[34ch] leading-relaxed text-white/80">
              {panelDescription}
            </p>
            <ul className="mt-6 hidden space-y-2.5 border-t border-white/15 pt-5 lg:block">
              {benefits.map((item) => (
                <li
                  key={item}
                  className="text-body flex gap-2.5 leading-snug text-white/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-white/70"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form panel */}
        <div
          data-auth-form
          className="relative flex flex-col justify-center px-5 py-10 sm:px-8 sm:py-12 lg:col-span-7 lg:px-12 xl:col-span-6 xl:px-16"
        >
          <p
            aria-hidden="true"
            className="display-accent display-accent--md pointer-events-none absolute top-6 right-4 text-foreground/40 select-none sm:top-8 sm:right-8"
          >
            {watermark}
          </p>

          <div data-auth-fade>
            <Eyebrow>{formEyebrow}</Eyebrow>
            <RevealHeading
              as="h2"
              trigger="load"
              delay={0.12}
              mutedClassName="text-stone"
              className="text-h2 mt-3 max-w-[16ch] leading-[1.05] font-medium tracking-[-0.03em] text-foreground"
            >
              {formTitle}
            </RevealHeading>
            <p className="text-body mt-3 max-w-[38ch] leading-relaxed text-muted">
              {formDescription}
            </p>
          </div>

          <div data-auth-fade className="mt-8 w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
