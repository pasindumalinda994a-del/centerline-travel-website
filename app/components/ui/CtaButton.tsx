"use client";

import type { ReactNode } from "react";
import { useId, useRef } from "react";
import {
  ArrowCircle,
  type ArrowTone,
} from "@/app/components/ui/ArrowCircle";
import { type ButtonVariant } from "@/app/components/ui/Button";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

type CtaButtonBase = {
  children: ReactNode;
  variant?: ButtonVariant;
  /** Soft glass arrow for photo / dark surfaces */
  arrowLight?: boolean;
  className?: string;
  buttonClassName?: string;
};

type CtaButtonAsLink = CtaButtonBase & {
  as?: "a";
  href: string;
};

type CtaButtonAsButton = CtaButtonBase & {
  as: "button";
  type?: "button" | "submit" | "reset";
  href?: never;
};

export type CtaButtonProps = CtaButtonAsLink | CtaButtonAsButton;

/** Content text / border — fills live on the gooey blob layer */
const ctaContentVariants: Record<
  ButtonVariant,
  { text: string; border: string }
> = {
  primary: { text: "text-white", border: "" },
  dark: { text: "text-white", border: "" },
  inverse: { text: "text-foreground", border: "" },
  secondary: {
    text: "text-foreground",
    border: "border border-line",
  },
  ghost: {
    text: "text-foreground",
    border: "border border-foreground/15",
  },
};

/** Solid blob fills for metaball merge (no hover color shift) */
const ctaBlobFills: Record<ButtonVariant, { pill: string; arrow: string }> = {
  primary: { pill: "bg-brand", arrow: "bg-brand" },
  dark: { pill: "bg-slate", arrow: "bg-slate" },
  inverse: { pill: "bg-white", arrow: "bg-white" },
  secondary: { pill: "bg-surface", arrow: "bg-slate" },
  ghost: { pill: "bg-foreground", arrow: "bg-foreground" },
};

const arrowTone: Record<ButtonVariant, ArrowTone> = {
  primary: "brand",
  dark: "slate",
  inverse: "white",
  secondary: "slate",
  ghost: "foreground",
};

/** Rest gap in px — keep layout + goo layer in sync */
const GAP_PX = 6;
/** How far each mass travels toward the other on merge */
const ATTRACT = 4;
/**
 * Optical bias so glyphs stay in the *perceived* center of each mass.
 * Goo necks pull visual mass toward the join; counter-shift content slightly away.
 */
const OPTICAL = 1.25;

function CtaLabel({ children }: { children: ReactNode }) {
  if (typeof children !== "string") {
    return <>{children}</>;
  }

  return (
    <span className="relative inline-block overflow-hidden leading-none [clip-path:inset(0)]">
      <span className="invisible whitespace-nowrap" aria-hidden>
        {children}
      </span>
      <span className="absolute inset-0 overflow-hidden">
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover/cta:-translate-y-1/2 motion-reduce:group-hover/cta:translate-y-0">
          <span className="block whitespace-nowrap">{children}</span>
          <span className="block whitespace-nowrap" aria-hidden>
            {children}
          </span>
        </span>
      </span>
    </span>
  );
}

/** Canonical text-pill + arrow-circle CTA with liquid bubble merge on hover */
export function CtaButton(props: CtaButtonProps) {
  const {
    children,
    variant = "primary",
    arrowLight = false,
    className = "",
    buttonClassName = "",
  } = props;

  const reactId = useId();
  const gooId = `cta-goo-${reactId.replace(/:/g, "")}`;
  const rootRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const gooLayerRef = useRef<HTMLSpanElement>(null);
  const pillBlobRef = useRef<HTMLSpanElement>(null);
  const arrowBlobRef = useRef<HTMLSpanElement>(null);
  const pillContentRef = useRef<HTMLSpanElement>(null);
  const arrowHitRef = useRef<HTMLSpanElement>(null);

  const content = ctaContentVariants[variant];
  const blobs = arrowLight
    ? { pill: "bg-white", arrow: "bg-white" }
    : ctaBlobFills[variant];
  const iconTone = arrowLight ? "white" : arrowTone[variant];
  const lightArrowBlob =
    arrowLight || variant === "inverse" || iconTone === "white";
  const iconClass = lightArrowBlob ? "text-foreground" : "text-white";

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      const gooLayer = gooLayerRef.current;
      const pillBlob = pillBlobRef.current;
      const arrowBlob = arrowBlobRef.current;
      const pillContent = pillContentRef.current;
      const arrowHit = arrowHitRef.current;
      if (
        !root ||
        !gooLayer ||
        !pillBlob ||
        !arrowBlob ||
        !pillContent ||
        !arrowHit
      ) {
        return;
      }
      if (prefersReducedMotion()) return;
      if (!window.matchMedia("(hover: hover)").matches) return;

      const gooFilter = `url(#${gooId})`;
      const pillParts = [pillBlob, pillContent];
      const arrowParts = [arrowBlob, arrowHit];

      gsap.set([...pillParts, ...arrowParts], {
        transformOrigin: "50% 50%",
        force3D: true,
      });

      let merged = false;
      let centerX = 0;
      let centerY = 0;

      // Magnetic drives both blob + icon so the glyph stays locked to the mass
      const xBlob = gsap.quickTo(arrowBlob, "x", {
        duration: 0.45,
        ease: "power3.out",
      });
      const yBlob = gsap.quickTo(arrowBlob, "y", {
        duration: 0.45,
        ease: "power3.out",
      });
      const xHit = gsap.quickTo(arrowHit, "x", {
        duration: 0.45,
        ease: "power3.out",
      });
      const yHit = gsap.quickTo(arrowHit, "y", {
        duration: 0.45,
        ease: "power3.out",
      });

      const setArrowXY = (x: number, y: number) => {
        xBlob(x);
        yBlob(y);
        xHit(x);
        yHit(y);
      };

      const mergeIn = () => {
        merged = true;
        gooLayer.style.filter = gooFilter;

        // Blobs close the gap; content tracks with a tiny optical counter-bias
        gsap.to(pillBlob, {
          x: ATTRACT,
          scale: 1.015,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(pillContent, {
          x: ATTRACT + OPTICAL,
          scale: 1.015,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(arrowBlob, {
          x: -ATTRACT,
          y: 0,
          scale: 1.02,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
          delay: 0.02,
        });
        gsap.to(arrowHit, {
          x: -(ATTRACT + OPTICAL),
          y: 0,
          scale: 1.02,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
          delay: 0.02,
        });
      };

      const mergeOut = () => {
        merged = false;

        gsap.to(pillParts, {
          x: 0,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(arrowParts, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto",
          onComplete: () => {
            if (!merged) gooLayer.style.filter = "none";
          },
        });
      };

      const onRootEnter = () => mergeIn();
      const onRootLeave = () => mergeOut();

      const onArrowEnter = () => {
        const rect = arrowHit.getBoundingClientRect();
        const currentX = Number(gsap.getProperty(arrowHit, "x"));
        const currentY = Number(gsap.getProperty(arrowHit, "y"));
        centerX = rect.left + rect.width / 2 - currentX;
        centerY = rect.top + rect.height / 2 - currentY;
      };

      const onArrowMove = (event: MouseEvent) => {
        const pull = merged ? 0.18 : 0.28;
        const dx = (event.clientX - centerX) * pull;
        const dy = (event.clientY - centerY) * pull;
        if (merged) {
          xBlob(-ATTRACT + dx);
          yBlob(dy);
          xHit(-(ATTRACT + OPTICAL) + dx);
          yHit(dy);
        } else {
          setArrowXY(dx, dy);
        }
      };

      const onArrowLeave = () => {
        gsap.to(arrowBlob, {
          x: merged ? -ATTRACT : 0,
          y: 0,
          duration: 0.75,
          ease: "elastic.out(1, 0.55)",
          overwrite: "auto",
        });
        gsap.to(arrowHit, {
          x: merged ? -(ATTRACT + OPTICAL) : 0,
          y: 0,
          duration: 0.75,
          ease: "elastic.out(1, 0.55)",
          overwrite: "auto",
        });
      };

      root.addEventListener("mouseenter", onRootEnter);
      root.addEventListener("mouseleave", onRootLeave);
      arrowHit.addEventListener("mouseenter", onArrowEnter);
      arrowHit.addEventListener("mousemove", onArrowMove);
      arrowHit.addEventListener("mouseleave", onArrowLeave);

      return () => {
        root.removeEventListener("mouseenter", onRootEnter);
        root.removeEventListener("mouseleave", onRootLeave);
        arrowHit.removeEventListener("mouseenter", onArrowEnter);
        arrowHit.removeEventListener("mousemove", onArrowMove);
        arrowHit.removeEventListener("mouseleave", onArrowLeave);
      };
    },
    { scope: rootRef, dependencies: [gooId] },
  );

  const gapStyle = { gap: GAP_PX };
  const pillContentClass = `text-body relative z-10 inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-full bg-transparent px-5 font-medium will-change-transform ${content.text} ${content.border} ${buttonClassName}`;

  const inner = (
    <>
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
        <defs>
          <filter
            id={gooId}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="5"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
            />
          </filter>
        </defs>
      </svg>

      {/* Gooey masses — filter on hover only; transforms synced with content */}
      <span
        ref={gooLayerRef}
        className="pointer-events-none absolute inset-0 z-0 flex items-center overflow-visible"
        style={gapStyle}
        aria-hidden
      >
        <span
          ref={pillBlobRef}
          className={`h-11 min-w-0 flex-1 rounded-full will-change-transform ${blobs.pill}`}
        />
        <span
          ref={arrowBlobRef}
          className={`size-11 shrink-0 rounded-full will-change-transform ${blobs.arrow}`}
        />
      </span>

      {/* Sharp content — same x/scale as its blob so centers stay locked */}
      <span ref={pillContentRef} className={pillContentClass}>
        <CtaLabel>{children}</CtaLabel>
      </span>
      <span
        ref={arrowHitRef}
        className={`relative z-10 will-change-transform ${iconClass}`}
      >
        <ArrowCircle as="span" bare tone={iconTone} />
      </span>
    </>
  );

  const outerClass = `group/cta relative inline-flex items-center overflow-visible ${className}`;

  if (props.as === "button") {
    return (
      <button
        ref={rootRef as never}
        type={props.type ?? "submit"}
        className={outerClass}
        style={gapStyle}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      ref={rootRef as never}
      href={props.href}
      className={outerClass}
      style={gapStyle}
    >
      {inner}
    </a>
  );
}
