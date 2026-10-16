import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"a"> & {
  variant?: "primary" | "dark" | "inverse" | "ghost" | "secondary";
};

const variants = {
  primary: "bg-brand text-white hover:bg-brand/90",
  dark: "bg-slate text-white hover:bg-slate/90",
  inverse: "bg-white text-foreground hover:bg-white/90",
  secondary:
    "bg-surface text-foreground border border-line hover:border-brand/40",
  ghost:
    "bg-transparent text-foreground border border-foreground/15 hover:border-foreground/40",
} as const;

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={`text-body inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
