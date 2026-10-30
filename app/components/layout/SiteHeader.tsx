"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CtaButton } from "@/app/components/ui/CtaButton";
import { MenuIcon } from "@/app/homesections/Hero/icons";

const navLinks = [
  { href: "/#destinations", label: "Destinations" },
  { href: "/#experiences", label: "Experiences" },
  { href: "/#guides", label: "Guides" },
  { href: "/#journal", label: "Journal" },
  { href: "/#about", label: "About" },
] as const;

type SiteHeaderProps = {
  active?: "explore" | "home";
};

export function SiteHeader({ active = "explore" }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-background/90 backdrop-blur-xl">
      <nav
        className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-3.5 sm:px-6 lg:px-10"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Centreline Tours home"
        >
          <Image
            src="/images/logo.png"
            alt="Centreline Tours"
            width={40}
            height={40}
            className="size-9 rounded-full object-cover sm:size-10"
          />
          <span className="text-body font-medium text-foreground">Centreline</span>
        </Link>

        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <ul className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-body font-medium text-foreground/80 transition-opacity hover:opacity-70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative lg:hidden">
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-full text-foreground"
              aria-expanded={open}
              aria-controls="site-mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <MenuIcon className="size-5" />
              <span className="sr-only">Open menu</span>
            </button>
            {open ? (
              <ul
                id="site-mobile-nav"
                className="absolute right-0 z-20 mt-2 min-w-44 rounded-xl bg-surface py-2 shadow-lg"
              >
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body block px-4 py-2 font-medium text-foreground hover:bg-background"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/explore"
                    className="text-body block px-4 py-2 font-medium text-brand hover:bg-background"
                    onClick={() => setOpen(false)}
                  >
                    Explore
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>

          <div className="hidden sm:block">
            <CtaButton
              href="/explore"
              variant={active === "explore" ? "primary" : "dark"}
            >
              Explore
            </CtaButton>
          </div>
        </div>
      </nav>
    </header>
  );
}
