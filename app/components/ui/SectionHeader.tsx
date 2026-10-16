import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { RevealHeading } from "./RevealHeading";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: ReactNode;
  light?: boolean;
  className?: string;
  titleClassName?: string;
  stacked?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  cta,
  light = false,
  className = "",
  titleClassName = "",
  stacked = false,
}: SectionHeaderProps) {
  const mutedClassName = light ? "text-white/50" : "text-stone";

  if (stacked) {
    return (
      <div className={`flex flex-col items-start gap-4 ${className}`}>
        {eyebrow ? <Eyebrow light={light}>{eyebrow}</Eyebrow> : null}
        <RevealHeading
          as="h2"
          mutedClassName={mutedClassName}
          className={`text-h2 max-w-[18ch] leading-[1.05] font-medium tracking-[-0.03em] ${light ? "text-white" : "text-foreground"} ${titleClassName}`}
        >
          {title}
        </RevealHeading>
        {description ? (
          <p
            className={`text-body max-w-[40ch] leading-relaxed ${light ? "text-white/80" : "text-muted"}`}
          >
            {description}
          </p>
        ) : null}
        {cta}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 ${className}`}
    >
      <div className="flex flex-col gap-3">
        {eyebrow ? <Eyebrow light={light}>{eyebrow}</Eyebrow> : null}
        <RevealHeading
          as="h2"
          mutedClassName={mutedClassName}
          className={`text-h2 max-w-[18ch] leading-[1.05] font-medium tracking-[-0.03em] ${light ? "text-white" : "text-foreground"} ${titleClassName}`}
        >
          {title}
        </RevealHeading>
      </div>
      <div className="flex max-w-[40ch] flex-col items-start gap-5 lg:items-end lg:text-right">
        {description ? (
          <p
            className={`text-body leading-relaxed ${light ? "text-white/80" : "text-muted"} ${cta ? "" : "lg:pb-1"}`}
          >
            {description}
          </p>
        ) : null}
        {cta ? <div className="flex items-center gap-2">{cta}</div> : null}
      </div>
    </div>
  );
}
