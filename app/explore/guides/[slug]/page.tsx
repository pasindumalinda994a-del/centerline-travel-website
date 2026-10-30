import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExploreFooter } from "@/app/components/layout/ExploreFooter";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { EnquiryPanel } from "@/app/explore/components/EnquiryPanel";
import { GuideCard } from "@/app/explore/components/GuideCard";
import {
  formatPrice,
  getGuideBySlug,
  guides,
  relatedGuides,
} from "@/app/lib/content/explore";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide | Centreline Tours" };
  return {
    title: `${guide.name} | Centreline Tours`,
    description: guide.bio,
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const related = relatedGuides(guide);

  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader active="explore" />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <Link
          href="/explore?category=guides"
          className="text-caption font-medium text-brand transition-opacity hover:opacity-70"
        >
          ← Back to guides
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={guide.image}
                alt={guide.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </div>

          <div className="lg:col-span-4">
            <Eyebrow>{guide.role}</Eyebrow>
            <h1 className="text-h2 mt-3 leading-[1.05] font-medium tracking-[-0.03em] text-foreground">
              {guide.name}
            </h1>
            <p className="text-body mt-2 text-muted">
              {guide.region} · {guide.years} years guiding · {guide.rating.toFixed(1)} rating
            </p>

            <blockquote className="text-h3 mt-6 font-medium tracking-tight text-foreground/90">
              “{guide.quote.replace(/^"|"$/g, "")}”
            </blockquote>

            <p className="text-body mt-6 max-w-[48ch] leading-relaxed text-foreground/90">
              {guide.bio}
            </p>

            <h2 className="text-h3 mt-10 font-medium tracking-tight">Specialties</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {guide.specialties.map((s) => (
                <li
                  key={s}
                  className="text-caption rounded-full border border-line bg-surface px-3 py-1.5 font-medium text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>

            <h2 className="text-h3 mt-8 font-medium tracking-tight">Languages</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {guide.languages.map((l) => (
                <li
                  key={l}
                  className="text-caption rounded-full border border-line bg-surface px-3 py-1.5 font-medium text-muted"
                >
                  {l}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <EnquiryPanel
                priceLabel={`${formatPrice(guide.priceFrom)} / day`}
                meta={`Private ${guide.role.toLowerCase()}`}
                ctaLabel="Enquire with guide"
              />
            </div>
          </div>
        </div>

        {related.length ? (
          <section className="mt-16 lg:mt-20">
            <h2 className="text-h3 font-medium tracking-tight">Related guides</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {related.map((g) => (
                <GuideCard key={g.id} guide={g} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <ExploreFooter />
    </div>
  );
}
