"use client";

import Image from "next/image";
import { hero, navLinks } from "@/app/lib/content/home";
import { MenuIcon } from "./icons";

export function HeroNav() {
  return (
    <nav
      className="relative flex w-full min-w-0 items-center justify-between"
      aria-label="Primary"
    >
      <span className="text-caption pointer-events-none absolute left-1/2 hidden -translate-x-1/2 rounded-full bg-black/25 px-4 py-2 font-medium text-white/85 backdrop-blur-md xl:inline-flex">
        {hero.basedIn}
      </span>

      <a
        href="#top"
        className="flex shrink-0 items-center gap-2.5"
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
        <span className="text-body font-medium text-white">Centreline</span>
      </a>

      <div className="flex shrink-0 items-center gap-6">
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-body font-medium text-white/90 transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <details className="relative lg:hidden">
          <summary className="flex size-9 list-none items-center justify-center rounded-full text-white [&::-webkit-details-marker]:hidden">
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
          </ul>
        </details>

        <a
          href="#destinations"
          className="text-body hidden rounded-full bg-brand px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90 sm:inline-flex"
        >
          Explore
        </a>
      </div>
    </nav>
  );
}
