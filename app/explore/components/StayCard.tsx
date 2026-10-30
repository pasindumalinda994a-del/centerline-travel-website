import Image from "next/image";
import Link from "next/link";
import { ArrowCircle } from "@/app/components/ui/ArrowCircle";
import { MetaPill } from "@/app/components/ui/MetaPill";
import { formatPrice, type Stay } from "@/app/lib/content/explore";

type StayCardProps = {
  stay: Stay;
};

export function StayCard({ stay }: StayCardProps) {
  return (
    <Link
      href={`/explore/stays/${stay.slug}`}
      className="group grid overflow-hidden rounded-xl bg-surface transition-shadow duration-300 hover:shadow-[0_12px_40px_-20px_rgba(42,49,59,0.35)] md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]"
    >
      <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[200px]">
        <Image
          src={stay.images[0]}
          alt={stay.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 260px"
        />
        <span className="absolute top-3 left-3">
          <MetaPill variant="earth">{stay.type}</MetaPill>
        </span>
      </div>

      <div className="flex flex-col justify-between gap-4 p-5 sm:p-6">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-h3 font-medium tracking-tight text-foreground">
                {stay.title}
              </h3>
              <p className="text-caption mt-1 text-muted">
                {stay.location} · {stay.region}
              </p>
            </div>
            <div className="text-right">
              <p className="text-body font-medium text-foreground">
                {stay.rating.toFixed(1)}
              </p>
              <p className="text-caption text-muted">{stay.reviewCount} reviews</p>
            </div>
          </div>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {stay.amenities.slice(0, 3).map((amenity) => (
              <li
                key={amenity}
                className="text-caption rounded-full border border-line bg-background px-2.5 py-1 text-muted"
              >
                {amenity}
              </li>
            ))}
            {stay.amenities.length > 3 ? (
              <li className="text-caption rounded-full border border-line bg-background px-2.5 py-1 text-muted">
                +{stay.amenities.length - 3}
              </li>
            ) : null}
          </ul>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-caption text-muted">From</p>
            <p className="text-body font-medium text-foreground">
              {formatPrice(stay.priceFrom)}
              <span className="text-muted"> / night</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-body font-medium text-foreground">
            View stay
            <ArrowCircle as="span" tone="brand" />
          </span>
        </div>
      </div>
    </Link>
  );
}
