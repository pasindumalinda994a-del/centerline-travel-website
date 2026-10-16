"use client";

import { Fragment, useLayoutEffect, useRef } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from "@/app/lib/gsap";

type RevealHeadingProps = {
  children: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Class applied to words wrapped in *asterisks* for two-tone headlines */
  mutedClassName?: string;
  trigger?: "load" | "scroll";
  delay?: number;
};

type Word = { text: string; muted: boolean };

/** Split a line on *muted* markers, then into words. */
function parseLine(line: string): Word[] {
  const words: Word[] = [];
  line.split("*").forEach((segment, i) => {
    const muted = i % 2 === 1;
    segment
      .split(" ")
      .filter(Boolean)
      .forEach((text) => words.push({ text, muted }));
  });
  return words;
}

export function RevealHeading({
  children,
  as: Tag = "h2",
  className = "",
  mutedClassName = "text-stone",
  trigger = "scroll",
  delay = 0,
}: RevealHeadingProps) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const lines = children.split("\n").filter(Boolean);

  useLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const inners = root.querySelectorAll<HTMLElement>("[data-reveal-inner]");
    if (!inners.length) return;

    if (prefersReducedMotion()) {
      gsap.set(inners, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 115, opacity: 0, filter: "blur(6px)" });

      const play = () => {
        gsap.to(inners, {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.045,
          delay,
          overwrite: true,
        });
      };

      if (trigger === "load") {
        play();
        return;
      }

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top 90%",
        once: true,
        onEnter: play,
      });

      // Already in (or near) the viewport on mount — play immediately
      const top = root.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.9) {
        play();
        st.kill();
      }
    }, root);

    // Safety: never leave headings permanently clipped
    const safetyId = window.setTimeout(() => {
      gsap.set(inners, { yPercent: 0, opacity: 1, filter: "blur(0px)" });
    }, 2500);

    return () => {
      window.clearTimeout(safetyId);
      ctx.revert();
    };
  }, [children, trigger, delay]);

  return (
    <Tag ref={rootRef} className={className}>
      {lines.map((line, lineIndex) => (
        <span key={`${line}-${lineIndex}`} className="block">
          {parseLine(line).map((word, wordIndex) => (
            <Fragment key={`${word.text}-${wordIndex}`}>
              <span
                className="inline-block overflow-hidden align-top"
                style={{ paddingBottom: "0.1em", marginBottom: "-0.1em" }}
              >
                <span
                  data-reveal-inner
                  className={`inline-block will-change-transform ${word.muted ? mutedClassName : ""}`}
                >
                  {word.text}
                </span>
              </span>{" "}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
