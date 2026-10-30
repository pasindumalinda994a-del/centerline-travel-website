import type { ReactNode } from "react";
import {
  ArrowCircle,
  type ArrowTone,
} from "@/app/components/ui/ArrowCircle";
import { Button, type ButtonVariant } from "@/app/components/ui/Button";

type CtaButtonBase = {
  children: ReactNode;
  variant?: ButtonVariant;
  /** Soft glass arrow for photo / dark surfaces */
  arrowLight?: boolean;
  className?: string;
  buttonClassName?: string;
};

type CtaButtonAsLink = CtaButtonBase & {
  as?: "a";
  href: string;
};

type CtaButtonAsButton = CtaButtonBase & {
  as: "button";
  type?: "button" | "submit" | "reset";
  href?: never;
};

export type CtaButtonProps = CtaButtonAsLink | CtaButtonAsButton;

/** Keep the arrow disc matched to the pill so CTA pairs read as one control */
const arrowTone: Record<ButtonVariant, ArrowTone> = {
  primary: "brand",
  dark: "slate",
  inverse: "white",
  secondary: "slate",
  ghost: "foreground",
};

/** Canonical text-pill + arrow-circle CTA used across the site */
export function CtaButton(props: CtaButtonProps) {
  const {
    children,
    variant = "primary",
    arrowLight = false,
    className = "",
    buttonClassName = "",
  } = props;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {props.as === "button" ? (
        <>
          <Button
            as="button"
            type={props.type ?? "submit"}
            variant={variant}
            className={buttonClassName}
          >
            {children}
          </Button>
          <ArrowCircle
            as="button"
            type={props.type ?? "submit"}
            light={arrowLight}
            tone={arrowTone[variant]}
            aria-label="Submit"
          />
        </>
      ) : (
        <>
          <Button
            href={props.href}
            variant={variant}
            className={buttonClassName}
          >
            {children}
          </Button>
          <ArrowCircle
            href={props.href}
            light={arrowLight}
            tone={arrowTone[variant]}
          />
        </>
      )}
    </div>
  );
}
