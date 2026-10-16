"use client";

import type { ComponentProps } from "react";
import { useRef } from "react";
import { ArrowOutwardIcon } from "@/app/components/ui/icons";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

type ArrowCircleProps = ComponentProps<"a"> & {
  light?: boolean;
  /** Render as a span when nested inside another link */
  as?: "a" | "span";
};

export function ArrowCircle({
  light = false,
  className = "",
  as: Tag = "a",
  ...props
}: ArrowCircleProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      if (!window.matchMedia("(hover: hover)").matches) return;

      let centerX = 0;
      let centerY = 0;
      const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

      const onEnter = () => {
        const rect = el.getBoundingClientRect();
        const currentX = Number(gsap.getProperty(el, "x"));
        const currentY = Number(gsap.getProperty(el, "y"));
        centerX = rect.left + rect.width / 2 - currentX;
        centerY = rect.top + rect.height / 2 - currentY;
      };

      const onMove = (event: MouseEvent) => {
        xTo((event.clientX - centerX) * 0.35);
        yTo((event.clientY - centerY) * 0.35);
      };

      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.45)",
          overwrite: "auto",
        });
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref },
  );

  const { href, ...rest } = props;
  return (
    <Tag
      ref={ref}
      href={Tag === "a" ? href : undefined}
      className={`group/arrow inline-flex size-11 shrink-0 items-center justify-center rounded-full will-change-transform ${
        light
          ? "bg-white/20 text-white backdrop-blur-md"
          : "bg-foreground text-white"
      } ${className}`}
      aria-label={Tag === "a" ? "Open" : undefined}
      aria-hidden={Tag === "span" ? true : undefined}
      {...rest}
    >
      <span className="relative size-4 overflow-hidden">
        <ArrowOutwardIcon className="absolute inset-0 size-4 transition-transform duration-300 ease-out group-hover/arrow:translate-x-[130%] group-hover/arrow:-translate-y-[130%]" />
        <ArrowOutwardIcon className="absolute inset-0 size-4 -translate-x-[130%] translate-y-[130%] transition-transform duration-300 ease-out group-hover/arrow:translate-x-0 group-hover/arrow:translate-y-0" />
      </span>
    </Tag>
  );
}
