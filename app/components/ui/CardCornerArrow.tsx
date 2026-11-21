"use client";

import {
  ArrowCircle,
  type ArrowTone,
} from "@/app/components/ui/ArrowCircle";

type Corner = "top-right" | "bottom-right";

type CardCornerArrowProps = {
  corner?: Corner;
  tone?: ArrowTone;
  className?: string;
};

const cornerPosition: Record<Corner, string> = {
  "top-right": "absolute top-4 right-4 z-10",
  "bottom-right": "absolute right-4 bottom-4 z-10",
};

/** Corner-placed card arrow — no bubble merge. */
export function CardCornerArrow({
  corner = "top-right",
  tone = "background",
  className = "",
}: CardCornerArrowProps) {
  return (
    <ArrowCircle
      as="span"
      tone={tone}
      className={`${cornerPosition[corner]} ${className}`.trim()}
    />
  );
}
