import type { ComponentProps } from "react";

type EyebrowProps = Omit<ComponentProps<"p">, "children"> & {
  children: string;
  light?: boolean;
};

export function Eyebrow({
  children,
  light = false,
  className = "",
  ...props
}: EyebrowProps) {
  const label = children.replace(/^>\s*/, "");

  return (
    <p className={`inline-flex items-center gap-2.5 ${className}`} {...props}>
      <span
        aria-hidden="true"
        className={`h-px w-6 shrink-0 ${light ? "bg-white/80" : "bg-brand"}`}
      />
      <span
        className={`text-eyebrow leading-none font-medium tracking-[0.18em] uppercase ${light ? "text-white/90" : "text-brand"}`}
      >
        {label}
      </span>
    </p>
  );
}
