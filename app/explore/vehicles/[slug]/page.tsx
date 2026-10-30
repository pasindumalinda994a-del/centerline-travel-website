import Link from "next/link";
import { notFound } from "next/navigation";
import { ExploreFooter } from "@/app/components/layout/ExploreFooter";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { MetaPill } from "@/app/components/ui/MetaPill";
import { DetailGallery } from "@/app/explore/components/DetailGallery";
import { EnquiryPanel } from "@/app/explore/components/EnquiryPanel";
import { VehicleCard } from "@/app/explore/components/VehicleCard";
import {
  formatPrice,
  getVehicleBySlug,
  relatedVehicles,
  vehicles,
} from "@/app/lib/content/explore";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle | Centreline Tours" };
  return {
    title: `${vehicle.title} | Centreline Tours`,
    description: vehicle.description,
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const related = relatedVehicles(vehicle);

  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader active="explore" />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <Link
          href="/explore?category=vehicles"
          className="text-caption font-medium text-brand transition-opacity hover:opacity-70"
        >
          ← Back to vehicles
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <DetailGallery images={vehicle.images} alt={vehicle.title} />

            <div className="mt-8">
              <MetaPill variant="brand">{vehicle.type}</MetaPill>
              <h1 className="text-h2 mt-3 leading-[1.05] font-medium tracking-[-0.03em] text-foreground">
                {vehicle.title}
              </h1>
              <p className="text-body mt-2 text-muted">
                {vehicle.location} · {vehicle.region}
              </p>

              <p className="text-body mt-6 max-w-[58ch] leading-relaxed text-foreground/90">
                {vehicle.description}
              </p>

              <h2 className="text-h3 mt-10 font-medium tracking-tight">Specs</h2>
              <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Transmission", vehicle.transmission],
                  ["Seats", String(vehicle.seats)],
                  ["Driver", vehicle.withDriver ? "Included" : "Self-drive"],
                  ["Pick-up", vehicle.location],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-line bg-surface px-4 py-3"
                  >
                    <dt className="text-caption text-muted">{label}</dt>
                    <dd className="text-body mt-1 font-medium text-foreground">{val}</dd>
                  </div>
                ))}
              </dl>

              <h2 className="text-h3 mt-10 font-medium tracking-tight">Features</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {vehicle.features.map((f) => (
                  <li
                    key={f}
                    className="text-caption rounded-full border border-line bg-surface px-3 py-1.5 font-medium text-muted"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <EnquiryPanel
                priceLabel={`${formatPrice(vehicle.pricePerDay)} / day`}
                meta={`${vehicle.type} · ${vehicle.seats} seats`}
                ctaLabel="Request rental"
              />
            </div>
          </div>
        </div>

        {related.length ? (
          <section className="mt-16 lg:mt-20">
            <h2 className="text-h3 font-medium tracking-tight">Similar vehicles</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {related.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <ExploreFooter />
    </div>
  );
}
