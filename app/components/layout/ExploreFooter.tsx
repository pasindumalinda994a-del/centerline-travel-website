import Link from "next/link";
import { brand } from "@/app/lib/content/home";

export function ExploreFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <div>
          <p className="text-body font-medium text-foreground">{brand.name}</p>
          <p className="text-caption mt-1 text-muted">{brand.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/explore?category=guides"
            className="text-caption font-medium text-foreground/80 transition-opacity hover:opacity-70"
          >
            Guides
          </Link>
          <Link
            href="/explore?category=stays"
            className="text-caption font-medium text-foreground/80 transition-opacity hover:opacity-70"
          >
            Stays
          </Link>
          <Link
            href="/explore?category=vehicles"
            className="text-caption font-medium text-foreground/80 transition-opacity hover:opacity-70"
          >
            Vehicles
          </Link>
          <Link
            href="/#footer"
            className="text-caption font-medium text-foreground/80 transition-opacity hover:opacity-70"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
