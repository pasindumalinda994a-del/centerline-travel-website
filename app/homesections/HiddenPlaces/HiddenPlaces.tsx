"use client";

import { useRef } from "react";
import { ArrowCircle } from "@/app/components/ui/ArrowCircle";
import { Button } from "@/app/components/ui/Button";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { hiddenPlaces } from "@/app/lib/content/home";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

const CARD_X_RANGE = 520;
const CARD_Y_JITTER = 90;
const CARD_ROTATION_JITTER = 16;
const CARD_CLEARANCE_GAP = 48;
const HOVER_GROWTH = 40;
const HEIGHT_HEADROOM = 8;

export function HiddenPlaces() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;
      if (!window.matchMedia("(min-width: 768px)").matches) return;

      const items = Array.from(
        root.querySelectorAll<HTMLElement>("[data-spotlight-item]"),
      );
      const list = root.querySelector<HTMLElement>("[data-spotlight-list]");
      const cards = Array.from(
        root.querySelectorAll<HTMLImageElement>("[data-preview-card]"),
      );
      if (!list || !items.length) return;

      let baseItemHeight = 0;

      const calculateBaseItemHeight = () => {
        items.forEach((item) => {
          item.style.height = "";
        });
        baseItemHeight =
          Math.round(Math.max(...items.map((item) => item.offsetHeight)) + HEIGHT_HEADROOM);
        gsap.set(items, { height: baseItemHeight });
      };

      calculateBaseItemHeight();
      window.addEventListener("resize", calculateBaseItemHeight);

      cards.forEach((card, cardIndex) => {
        const rotation = Number(card.dataset.rotation ?? 0);
        card.dataset.baseRotation = String(rotation);
        gsap.set(card, { rotation, scale: 0 });
      });

      const animateLabel = (
        label: Element | null,
        opts: { opacity: number; scaleX: number; scaleY: number; blur: number },
      ) => {
        if (!label) return;
        gsap.to(label, {
          opacity: opts.opacity,
          duration: 0.1,
          delay: 0.025,
          ease: "hop",
          overwrite: "auto",
        });
        gsap.to(label, {
          scaleX: opts.scaleX,
          scaleY: opts.scaleY,
          duration: 0.25,
          ease: "back.out(1.75)",
          overwrite: "auto",
        });
        gsap.to(label, {
          filter: `blur(${opts.blur}px)`,
          duration: 0.25,
          ease: "hop",
          overwrite: "auto",
        });
      };

      const positionCards = (hoveredItem: HTMLElement, itemIndex: number) => {
        const listRect = list.getBoundingClientRect();
        const itemRect = hoveredItem.getBoundingClientRect();
        const followY =
          (itemRect.top + itemRect.height / 2 - listRect.top - listRect.height / 2) *
          0.75;
        const place = hiddenPlaces.items[itemIndex];
        const cardWidth = cards[0]?.offsetWidth || 220;
        const minClearance =
          listRect.width / 2 + cardWidth / 2 + CARD_CLEARANCE_GAP;
        // Fan cards left/right, clamped so they never overlap place names
        const sideOffsets = [
          -CARD_X_RANGE,
          CARD_X_RANGE,
          -CARD_X_RANGE * 0.75,
          CARD_X_RANGE * 0.75,
        ].map((x) => Math.sign(x) * Math.max(Math.abs(x), minClearance));

        cards.forEach((card, cardIndex) => {
          const src = place?.images[cardIndex];
          if (src) card.src = src;
          const baseRotation = Number(card.dataset.baseRotation ?? 0);
          const side = sideOffsets[cardIndex] ?? 0;
          gsap.to(card, {
            x: side + gsap.utils.random(-16, 16),
            y: followY + gsap.utils.random(-CARD_Y_JITTER, CARD_Y_JITTER),
            rotation: baseRotation + gsap.utils.random(-CARD_ROTATION_JITTER, CARD_ROTATION_JITTER),
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto",
          });
        });
      };

      const onListEnter = () => {
        gsap.to(cards, {
          scale: 1,
          duration: 0.75,
          ease: "elastic.out(1, 0.6)",
          overwrite: "auto",
        });
      };

      const onListLeave = () => {
        gsap.to(cards, {
          scale: 0,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(items, {
          height: baseItemHeight,
          duration: 0.35,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      list.addEventListener("mouseenter", onListEnter);
      list.addEventListener("mouseleave", onListLeave);

      const cleanups: Array<() => void> = [];

      items.forEach((item, itemIndex) => {
        const defaultLabel = item.querySelector("[data-label-default]");
        const altLabel = item.querySelector("[data-label-alt]");

        const onEnter = () => {
          animateLabel(defaultLabel, {
            opacity: 0,
            scaleX: 0.75,
            scaleY: 1.25,
            blur: 1,
          });
          animateLabel(altLabel, { opacity: 1, scaleX: 1, scaleY: 1, blur: 0 });
          positionCards(item, itemIndex);

          const proximityWeights = items.map((_, i) =>
            i === itemIndex ? 0 : 1 / Math.abs(i - itemIndex),
          );
          const totalWeight = proximityWeights.reduce((sum, w) => sum + w, 0);

          items.forEach((otherItem, i) => {
            const targetHeight =
              i === itemIndex
                ? baseItemHeight + HOVER_GROWTH
                : Math.round(
                    baseItemHeight -
                      (HOVER_GROWTH * proximityWeights[i]) / totalWeight,
                  );
            gsap.to(otherItem, {
              height: targetHeight,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
        };

        const onLeave = () => {
          animateLabel(defaultLabel, {
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            blur: 0,
          });
          animateLabel(altLabel, {
            opacity: 0,
            scaleX: 0.75,
            scaleY: 1.25,
            blur: 1,
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => {
        window.removeEventListener("resize", calculateBaseItemHeight);
        list.removeEventListener("mouseenter", onListEnter);
        list.removeEventListener("mouseleave", onListLeave);
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      id="hidden-places"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeader
        className="mb-10 lg:mb-12"
        eyebrow={hiddenPlaces.eyebrow}
        title={hiddenPlaces.title}
        description={hiddenPlaces.description}
        cta={
          <>
            <Button href={hiddenPlaces.cta.href}>{hiddenPlaces.cta.label}</Button>
            <ArrowCircle href={hiddenPlaces.cta.href} />
          </>
        }
      />

      <div className="relative px-5 py-10 text-center text-foreground sm:px-10 lg:px-14 lg:py-14">
        <div className="relative hidden items-center justify-center md:flex">
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            {[
              { rotation: -10, className: "card-1" },
              { rotation: 10, className: "card-2" },
              { rotation: 8, className: "card-3" },
              { rotation: -8, className: "card-4" },
            ].map((card, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={card.className}
                data-preview-card
                data-rotation={card.rotation}
                src={hiddenPlaces.items[0].images[index]}
                alt=""
                className="absolute h-[min(42vw,280px)] w-[min(32vw,220px)] rounded-lg object-cover shadow-2xl"
              />
            ))}
          </div>

          <ul
            data-spotlight-list
            className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center"
          >
            {hiddenPlaces.items.map((place) => (
              <li
                key={place.name}
                data-spotlight-item
                className="relative flex w-full cursor-pointer items-center justify-center py-1 will-change-[height]"
              >
                <span className="relative grid place-items-center">
                  <h3
                    data-label-default
                    className="text-h1 col-start-1 row-start-1 leading-none font-medium tracking-[-0.03em] will-change-[transform,opacity,filter]"
                  >
                    {place.name}
                  </h3>
                  <h3
                    data-label-alt
                    className="text-h1 col-start-1 row-start-1 leading-none font-medium tracking-[-0.03em] text-brand-soft opacity-0 will-change-[transform,opacity,filter]"
                  >
                    {place.alt}
                  </h3>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-3 md:hidden">
          {hiddenPlaces.items.map((place) => (
            <div
              key={`mobile-${place.name}`}
              className="flex items-center justify-between rounded-lg border border-line px-4 py-3 text-left"
            >
              <span className="text-h3 font-medium">{place.name}</span>
              <span className="text-caption text-muted">{place.alt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
