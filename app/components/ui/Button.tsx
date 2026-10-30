import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "dark"
  | "inverse"
  | "ghost"
  | "secondary";

export const buttonVariants = {
  primary: "bg-brand text-white hover:bg-brand/90",
  dark: "bg-slate text-white hover:bg-slate/90",
  inverse: "bg-white text-foreground hover:bg-white/90",
  secondary:
    "bg-surface text-foreground border border-line hover:border-brand/40",
  ghost:
    "bg-transparent text-foreground border border-foreground/15 hover:border-foreground/40",
} as const;

const baseClass =
  "text-body inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-medium transition-colors";

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children?: ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<"a">, "className" | "children"> & {
    as?: "a";
  };

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    as: "button";
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  variant = "primary",
  className = "",
  children,
  as = "a",
  ...props
}: ButtonProps) {
  const classes = `${baseClass} ${buttonVariants[variant]} ${className}`;

  if (as === "button") {
    return (
      <button
        className={classes}
        {...(props as ComponentProps<"button">)}
      >
        {children}
      </button>
    );
  }

  return (
    <a className={classes} {...(props as ComponentProps<"a">)}>
      {children}
    </a>
  );
}
