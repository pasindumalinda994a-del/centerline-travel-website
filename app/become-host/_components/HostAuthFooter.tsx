import Link from "next/link";
import { brand } from "@/app/lib/content/home";

export function HostAuthFooter() {
  return (
    <footer className="text-caption mx-3 flex flex-col gap-2 px-4 py-3 text-muted sm:mx-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p>
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </p>
      <Link
        href="/"
        className="font-medium text-foreground/70 transition-colors hover:text-foreground"
      >
        Back to home
      </Link>
    </footer>
  );
}
