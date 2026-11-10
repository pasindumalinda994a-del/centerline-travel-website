import Image from "next/image";
import Link from "next/link";
import { ArrowCircle } from "@/app/components/ui/ArrowCircle";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { formatPrice, type Guide } from "@/app/lib/content/explore";

type GuideCardProps = {
  guide: Guide;
};

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link
      href={`/explore/guides/${guide.slug}`}
      className="group relative overflow-hidden rounded-xl"
    >
      <div className="relative aspect-[3/4] sm:aspect-[4/5]">
        <Image
          src={guide.image}
          alt={guide.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate/90 via-slate/25 to-transparent" />
        <span className="absolute top-4 right-4 z-10">
          <ArrowCircle as="span" tone="white" />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <Eyebrow light>{guide.role}</Eyebrow>
        <h3 className="text-h3 mt-2 font-medium tracking-tight text-white">
          {guide.name}
        </h3>
        <p className="text-caption mt-2 text-white/70">
          {guide.specialties.slice(0, 2).join(" · ")} · {guide.region}
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-caption font-medium text-white/85">
            {guide.rating.toFixed(1)} · {guide.years} yrs
          </p>
          <p className="text-caption font-medium text-white">
            From {formatPrice(guide.priceFrom)}/day
          </p>
        </div>
      </div>
    </Link>
  );
}
