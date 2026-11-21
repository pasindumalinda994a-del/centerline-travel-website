"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/app/homesections/Footer/Footer";

/** Marketing footer — hidden on host auth routes. */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/become-host")) return null;
  return <Footer />;
}
