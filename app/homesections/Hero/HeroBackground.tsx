"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HERO_IMAGE = "/images/home/figma/hero-bg.jpg";
const HERO_VIDEO =
  "/videos/WhatsApp Video 2026-10-21 at 23.51.50.mp4";

export function HeroBackground() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        className="object-cover object-[center_40%]"
        sizes="100vw"
        aria-hidden="true"
      />
      {!reduceMotion ? (
        <video
          className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          poster={HERO_IMAGE}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      ) : null}
    </>
  );
}
