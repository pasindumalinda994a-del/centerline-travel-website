import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationDetailHero } from "@/app/destinations/[slug]/_components/DestinationDetailHero";
import { DestinationExploreBridge } from "@/app/destinations/[slug]/_components/DestinationExploreBridge";
import { DestinationGuides } from "@/app/destinations/[slug]/_components/DestinationGuides";
import { DestinationHighlights } from "@/app/destinations/[slug]/_components/DestinationHighlights";
import { DestinationLayers } from "@/app/destinations/[slug]/_components/DestinationLayers";
import { DestinationQuote } from "@/app/destinations/[slug]/_components/DestinationQuote";
import { DestinationTravelHere } from "@/app/destinations/[slug]/_components/DestinationTravelHere";
import {
  getAllDestinationSlugs,
  getDestination,
} from "@/app/lib/content/destinations";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) {
    return { title: "Destination | Centreline Tours" };
  }
  return {
    title: `${destination.title} | Centreline Tours`,
    description: destination.shortDescription,
  };
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  return (
    <main>
      <DestinationDetailHero destination={destination} />
      <DestinationLayers destination={destination} />
      <DestinationTravelHere destination={destination} />
      <DestinationHighlights destination={destination} />
      <DestinationGuides destination={destination} />
      <DestinationQuote destination={destination} />
      <DestinationExploreBridge destination={destination} />
    </main>
  );
}
