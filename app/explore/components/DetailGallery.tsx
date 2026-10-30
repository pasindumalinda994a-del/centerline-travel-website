"use client";

import Image from "next/image";
import { useState } from "react";

type DetailGalleryProps = {
  images: string[];
  alt: string;
};

export function DetailGallery({ images, alt }: DetailGalleryProps) {
  const [active, setActive] = useState(0);
  const list = images.length ? images : ["/images/home/figma/stays-hero.jpg"];

  return (
    <div className="grid gap-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:aspect-[16/9]">
        <Image
          src={list[active]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
        />
      </div>
      {list.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                active === i ? "border-brand" : "border-transparent opacity-80 hover:opacity-100"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
