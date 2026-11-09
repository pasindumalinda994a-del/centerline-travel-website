"use client";

import Image from "next/image";
import { CtaButton } from "@/app/components/ui/CtaButton";
import { navLinks } from "@/app/lib/content/home";
import { MenuIcon } from "./icons";

export function HeroNav() {
  return (
    <nav
      className="relative grid w-full min-w-0 grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-line/80 bg-white px-3 py-2 shadow-[0_8px_28px_rgba(42,49,59,0.08)] sm:px-4"
      aria-label="Primary"
    >
      <a
        href="#top"
        className="col-start-1 flex shrink-0 items-center justify-self-start gap-2.5"
        aria-label="Centreline Tours home"
      >
        <Image
          src="/images/logo.png"
          alt="Centreline Tours"
          width={40}
          height={40}
          className="size-9 rounded-full object-cover sm:size-10"
          priority
        />
        <span className="text-body font-medium text-foreground">Centreline</span>
      </a>

      <ul className="col-start-2 hidden items-center justify-self-center gap-6 lg:flex">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-body font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="col-start-3 flex shrink-0 items-center justify-self-end gap-6">
        <details className="relative lg:hidden">
          <summary className="flex size-9 list-none items-center justify-center rounded-full text-foreground [&::-webkit-details-marker]:hidden">
            <MenuIcon className="size-5" />
            <span className="sr-only">Open menu</span>
          </summary>
          <ul className="absolute right-0 z-20 mt-2 min-w-44 rounded-xl bg-surface py-2 shadow-lg">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-body block px-4 py-2 font-medium text-foreground hover:bg-background"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/#become-a-host"
                className="text-body block px-4 py-2 font-medium text-foreground hover:bg-background"
              >
                Become a Host
              </a>
            </li>
          </ul>
        </details>

        <a
          href="/#become-a-host"
          className="text-body hidden font-medium text-foreground/75 transition-colors hover:text-foreground xl:inline"
        >
          Become a Host
        </a>
        <div className="hidden sm:block">
          <CtaButton href="/explore">
            Explore
          </CtaButton>
        </div>
      </div>
    </nav>
  );
}
