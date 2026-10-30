import type { ExploreCategory } from "@/app/lib/content/explore";

type ListingSkeletonProps = {
  category: ExploreCategory;
  count?: number;
};

function StaySkeleton() {
  return (
    <div className="grid overflow-hidden rounded-xl bg-surface md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
      <div className="aspect-[4/3] animate-pulse bg-line/70 motion-reduce:animate-none md:aspect-auto md:min-h-[200px]" />
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="h-6 w-2/3 animate-pulse rounded bg-line/70 motion-reduce:animate-none" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-line/60 motion-reduce:animate-none" />
        <div className="flex gap-2">
          <div className="h-7 w-16 animate-pulse rounded-full bg-line/60 motion-reduce:animate-none" />
          <div className="h-7 w-16 animate-pulse rounded-full bg-line/60 motion-reduce:animate-none" />
          <div className="h-7 w-16 animate-pulse rounded-full bg-line/60 motion-reduce:animate-none" />
        </div>
        <div className="mt-auto h-5 w-24 animate-pulse rounded bg-line/70 motion-reduce:animate-none" />
      </div>
    </div>
  );
}

function GuideSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl">
      <div className="aspect-[3/4] animate-pulse bg-line/70 motion-reduce:animate-none sm:aspect-[4/5]" />
    </div>
  );
}

function VehicleSkeleton() {
  return (
    <div className="h-[360px] animate-pulse rounded-xl bg-line/70 motion-reduce:animate-none sm:h-[400px]" />
  );
}

export function ListingSkeleton({ category, count = 6 }: ListingSkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (category === "stays") {
    return (
      <div className="flex flex-col gap-3 lg:gap-4">
        {items.map((i) => (
          <StaySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (category === "guides") {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {items.map((i) => (
          <GuideSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
      {items.map((i) => (
        <VehicleSkeleton key={i} />
      ))}
    </div>
  );
}
