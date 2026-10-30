import { Suspense } from "react";
import { ExploreFooter } from "@/app/components/layout/ExploreFooter";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { ExploreClient } from "@/app/explore/ExploreClient";
import { ListingSkeleton } from "@/app/explore/components/ListingSkeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Sri Lanka | Centreline Tours",
  description:
    "Search guides, stays, and vehicles across Sri Lanka — curated discovery beyond the usual trail.",
};

function ExploreFallback() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <div className="mb-8 h-24 animate-pulse rounded-xl bg-line/60" />
      <div className="mb-6 h-40 animate-pulse rounded-2xl bg-line/60" />
      <ListingSkeleton category="stays" count={4} />
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader active="explore" />
      <main className="flex-1">
        <Suspense fallback={<ExploreFallback />}>
          <ExploreClient />
        </Suspense>
      </main>
      <ExploreFooter />
    </div>
  );
}
