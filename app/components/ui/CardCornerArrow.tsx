"use client";

import { useId, useRef } from "react";
import {
  ArrowCircle,
  type ArrowTone,
} from "@/app/components/ui/ArrowCircle";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

type Corner = "top-right" | "bottom-right";

type CardCornerArrowProps = {
  corner?: Corner;
  tone?: ArrowTone;
  className?: string;
};

const blobFills: Record<ArrowTone, string> = {
  brand: "bg-brand",
  slate: "bg-slate",
  foreground: "bg-foreground",
  white: "bg-white",
  background: "bg-background",
};

const iconClasses: Record<ArrowTone, string> = {
  brand: "text-white",
  slate: "text-white",
  foreground: "text-white",
  white: "text-foreground",
  background: "text-foreground",
};

/**
 * Stage peeks past the card corner so a section-bg source mass can
 * sit outside (blends with the page) and liquid-flow into the arrow.
 */
const STAGE = 120;
const OVERHANG_X = 6;
const OVERHANG_Y = 28;
const ARROW_INSET = 16;
const ARROW_SIZE = 44;
/** Source mass — large enough to hold a goo bridge into the arrow */
const SOURCE_BLOB = 64;
/** Rest: source centered on the true corner (half in section, half on card) */
const REST_SCALE = 0.85;
/** How far the source travels inward toward the arrow */
const INWARD = 28;
/** Arrow pulls toward the source on merge */
const ATTRACT = 12;

const stageClass: Record<Corner, string> = {
  "top-right": "absolute -top-7 -right-1.5 z-10 h-[120px] w-[120px]",
  "bottom-right": "absolute -right-1.5 -bottom-7 z-10 h-[120px] w-[120px]",
};

/**
 * Section-bg source at the card corner goo-merges into the arrow fill
 * as one continuous liquid mass (filter on for the whole hover).
 */
export function CardCornerArrow({
  corner = "top-right",
  tone = "background",
  className = "",
}: CardCornerArrowProps) {
  const reactId = useId();
  const gooId = `card-goo-${reactId.replace(/:/g, "")}`;
  const rootRef = useRef<HTMLSpanElement>(null);
  const gooLayerRef = useRef<HTMLSpanElement>(null);
  const sourceBlobRef = useRef<HTMLSpanElement>(null);
  const arrowBlobRef = useRef<HTMLSpanElement>(null);
  const arrowHitRef = useRef<HTMLSpanElement>(null);

  const fill = blobFills[tone];
  const iconClass = iconClasses[tone];
  const isTopRight = corner === "top-right";

  const cardCornerX = STAGE - OVERHANG_X;
  const cardCornerY = isTopRight ? OVERHANG_Y : STAGE - OVERHANG_Y;

  const arrowLeft = STAGE - OVERHANG_X - ARROW_INSET - ARROW_SIZE;
  const arrowTop = isTopRight
    ? OVERHANG_Y + ARROW_INSET
    : STAGE - OVERHANG_Y - ARROW_INSET - ARROW_SIZE;
  const arrowCenterX = arrowLeft + ARROW_SIZE / 2;
  const arrowCenterY = arrowTop + ARROW_SIZE / 2;

  // Source sits on the true corner — outside portion blends with section bg
  const sourceLeft = cardCornerX - SOURCE_BLOB / 2;
  const sourceTop = cardCornerY - SOURCE_BLOB / 2;

  const diag = Math.SQRT1_2;
  const inwardX = -diag * INWARD;
  const inwardY = (isTopRight ? 1 : -1) * diag * INWARD;

  // Final: source center close enough to arrow for a thick goo neck
  const mergeSourceX = inwardX;
  const mergeSourceY = inwardY;
  const mergeArrowX = ATTRACT * diag;
  const mergeArrowY = (isTopRight ? -1 : 1) * ATTRACT * diag;

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      const gooLayer = gooLayerRef.current;
      const sourceBlob = sourceBlobRef.current;
      const arrowBlob = arrowBlobRef.current;
      const arrowHit = arrowHitRef.current;
      if (!root || !gooLayer || !sourceBlob || !arrowBlob || !arrowHit) return;
      if (prefersReducedMotion()) return;
      if (!window.matchMedia("(hover: hover)").matches) return;

      const card = root.closest(".group");
      if (!card) return;

      const gooFilter = `url(#${gooId})`;
      const arrowParts = [arrowBlob, arrowHit];

      gsap.set(sourceBlob, {
        x: 0,
        y: 0,
        scale: REST_SCALE,
        transformOrigin: "50% 50%",
        force3D: true,
      });
      gsap.set(arrowParts, {
        x: 0,
        y: 0,
        scale: 1,
        transformOrigin: "50% 50%",
        force3D: true,
      });
      gooLayer.style.filter = "none";

      let merged = false;
      let centerX = 0;
      let centerY = 0;
      let activeTl: gsap.core.Timeline | null = null;

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

      const killActive = () => {
        if (activeTl) {
          activeTl.kill();
          activeTl = null;
        }
      };

      const mergeIn = () => {
        merged = true;
        killActive();

        // Goo on for the entire hover so section bg flows continuously
        gooLayer.style.filter = gooFilter;

        activeTl = gsap.timeline({
          defaults: { overwrite: "auto" },
          onComplete: () => {
            activeTl = null;
          },
        });

        // One continuous pour: source blooms inward while arrow meets it
        activeTl.to(
          sourceBlob,
          {
            x: mergeSourceX,
            y: mergeSourceY,
            scale: 1.15,
            duration: 0.7,
            ease: "power3.inOut",
          },
          0,
        );
        activeTl.to(
          arrowBlob,
          {
            x: mergeArrowX,
            y: mergeArrowY,
            scale: 1.08,
            duration: 0.7,
            ease: "power3.inOut",
          },
          0.06,
        );
        activeTl.to(
          arrowHit,
          {
            x: mergeArrowX,
            y: mergeArrowY,
            scale: 1.08,
            duration: 0.7,
            ease: "power3.inOut",
          },
          0.06,
        );
        // Soft settle into one mass
        activeTl.to(
          sourceBlob,
          {
            scale: 1.05,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.15",
        );
      };

      const mergeOut = () => {
        merged = false;
        killActive();

        activeTl = gsap.timeline({
          defaults: { overwrite: "auto" },
          onComplete: () => {
            if (!merged) gooLayer.style.filter = "none";
            activeTl = null;
          },
        });

        activeTl.to(
          arrowParts,
          {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "power3.inOut",
          },
          0,
        );
        activeTl.to(
          sourceBlob,
          {
            x: 0,
            y: 0,
            scale: REST_SCALE,
            duration: 0.55,
            ease: "power3.inOut",
          },
          0.05,
        );
        activeTl.add(() => {
          if (!merged) gooLayer.style.filter = "none";
        });
      };

      const onCardEnter = () => mergeIn();
      const onCardLeave = () => mergeOut();

      const onArrowEnter = () => {
        const rect = arrowHit.getBoundingClientRect();
        const currentX = Number(gsap.getProperty(arrowHit, "x"));
        const currentY = Number(gsap.getProperty(arrowHit, "y"));
        centerX = rect.left + rect.width / 2 - currentX;
        centerY = rect.top + rect.height / 2 - currentY;
      };

      const onArrowMove = (event: MouseEvent) => {
        const pull = merged ? 0.14 : 0.26;
        const dx = (event.clientX - centerX) * pull;
        const dy = (event.clientY - centerY) * pull;
        if (merged) {
          xBlob(mergeArrowX + dx);
          yBlob(mergeArrowY + dy);
          xHit(mergeArrowX + dx);
          yHit(mergeArrowY + dy);
        } else {
          xBlob(dx);
          yBlob(dy);
          xHit(dx);
          yHit(dy);
        }
      };

      const onArrowLeave = () => {
        gsap.to(arrowBlob, {
          x: merged ? mergeArrowX : 0,
          y: merged ? mergeArrowY : 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          overwrite: "auto",
        });
        gsap.to(arrowHit, {
          x: merged ? mergeArrowX : 0,
          y: merged ? mergeArrowY : 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          overwrite: "auto",
        });
      };

      card.addEventListener("mouseenter", onCardEnter);
      card.addEventListener("mouseleave", onCardLeave);
      arrowHit.addEventListener("mouseenter", onArrowEnter);
      arrowHit.addEventListener("mousemove", onArrowMove);
      arrowHit.addEventListener("mouseleave", onArrowLeave);

      return () => {
        killActive();
        card.removeEventListener("mouseenter", onCardEnter);
        card.removeEventListener("mouseleave", onCardLeave);
        arrowHit.removeEventListener("mouseenter", onArrowEnter);
        arrowHit.removeEventListener("mousemove", onArrowMove);
        arrowHit.removeEventListener("mouseleave", onArrowLeave);
      };
    },
    { scope: rootRef, dependencies: [gooId, corner] },
  );

  return (
    <span
      ref={rootRef}
      className={`pointer-events-none ${stageClass[corner]} ${className}`}
      aria-hidden
    >
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
        <defs>
          <filter
            id={gooId}
            x="-120%"
            y="-120%"
            width="340%"
            height="340%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -12"
            />
          </filter>
        </defs>
      </svg>

      <span
        ref={gooLayerRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-visible"
        aria-hidden
      >
        {/* Source: straddles card corner — outside blends with section bg */}
        <span
          ref={sourceBlobRef}
          className={`absolute rounded-full will-change-transform ${fill}`}
          style={{
            width: SOURCE_BLOB,
            height: SOURCE_BLOB,
            left: sourceLeft,
            top: sourceTop,
            backgroundColor: "var(--background)",
          }}
        />
        <span
          ref={arrowBlobRef}
          className={`absolute rounded-full will-change-transform ${fill}`}
          style={{
            width: ARROW_SIZE,
            height: ARROW_SIZE,
            left: arrowLeft,
            top: arrowTop,
            backgroundColor: "var(--background)",
          }}
        />
      </span>

      <span
        ref={arrowHitRef}
        className={`pointer-events-auto absolute z-10 inline-flex will-change-transform ${iconClass}`}
        style={{
          left: arrowLeft,
          top: arrowTop,
          width: ARROW_SIZE,
          height: ARROW_SIZE,
        }}
      >
        <ArrowCircle as="span" bare tone={tone} />
      </span>
    </span>
  );
}
