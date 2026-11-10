"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);
  try {
    CustomEase.create("hop", "M0,0 C0.35,0.75 0,1 1,1");
  } catch {
    // Ease may already exist after HMR
  }
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Shared homepage card entrance: opacity-only cinematic fade */
export const CARD_FADE = {
  opacity: 0,
  duration: 1.6,
  ease: "sine.out",
  stagger: 0.18,
} as const;

export { gsap, useGSAP, ScrollTrigger };
