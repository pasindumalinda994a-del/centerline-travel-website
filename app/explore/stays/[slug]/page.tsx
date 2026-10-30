import Link from "next/link";
import { notFound } from "next/navigation";
import { ExploreFooter } from "@/app/components/layout/ExploreFooter";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { MetaPill } from "@/app/components/ui/MetaPill";
import { DetailGallery } from "@/app/explore/components/DetailGallery";
import { EnquiryPanel } from "@/app/explore/components/EnquiryPanel";
import { StayCard } from "@/app/explore/components/StayCard";
import {
  formatPrice,
  getStayBySlug,
  relatedStays,
  stays,
} from "@/app/lib/content/explore";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stays.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const stay = getStayBySlug(slug);
  if (!stay) return { title: "Stay | Centreline Tours" };
  return {
    title: `${stay.title} | Centreline Tours`,
    description: stay.description,
  };
}

export default async function StayDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const stay = getStayBySlug(slug);
  if (!stay) notFound();

  const related = relatedStays(stay);

  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader active="explore" />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <Link
          href="/explore?category=stays"
          className="text-caption font-medium text-brand transition-opacity hover:opacity-70"
        >
          ← Back to stays
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <DetailGallery images={stay.images} alt={stay.title} />

            <div className="mt-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <MetaPill variant="brand">{stay.type}</MetaPill>
                  <h1 className="text-h2 mt-3 leading-[1.05] font-medium tracking-[-0.03em] text-foreground">
                    {stay.title}
                  </h1>
                  <p className="text-body mt-2 text-muted">
                    {stay.location} · {stay.region}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-h3 font-medium text-foreground">
                    {stay.rating.toFixed(1)}
                  </p>
                  <p className="text-caption text-muted">
                    {stay.reviewCount} traveler reviews
                  </p>
                </div>
              </div>

              <p className="text-body mt-6 max-w-[58ch] leading-relaxed text-foreground/90">
                {stay.description}
              </p>

              <h2 className="text-h3 mt-10 font-medium tracking-tight">Highlights</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {stay.highlights.map((h) => (
                  <li
                    key={h}
                    className="text-body rounded-xl border border-line bg-surface px-4 py-3 text-foreground/90"
                  >
                    {h}
                  </li>
                ))}
              </ul>

              <h2 className="text-h3 mt-10 font-medium tracking-tight">Amenities</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {stay.amenities.map((a) => (
                  <li
                    key={a}
                    className="text-caption rounded-full border border-line bg-surface px-3 py-1.5 font-medium text-muted"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <EnquiryPanel
                priceLabel={`${formatPrice(stay.priceFrom)} / night`}
                meta={`${stay.type} in ${stay.location}`}
                ctaLabel="Request booking"
              />
            </div>
          </div>
        </div>

        {related.length ? (
          <section className="mt-16 lg:mt-20">
            <h2 className="text-h3 font-medium tracking-tight">More stays nearby</h2>
            <div className="mt-6 flex flex-col gap-3 lg:gap-4">
              {related.map((s) => (
                <StayCard key={s.id} stay={s} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <ExploreFooter />
    </div>
  );
}
