import type { Metadata } from "next";
import { DestinationAtlas } from "@/app/destinations/_components/DestinationAtlas";
import { DestinationHubCta } from "@/app/destinations/_components/DestinationHubCta";
import { DestinationRegions } from "@/app/destinations/_components/DestinationRegions";
import { DestinationTravelNotes } from "@/app/destinations/_components/DestinationTravelNotes";
import { DestinationsHero } from "@/app/destinations/_components/DestinationsHero";

export const metadata: Metadata = {
  title: "Destinations | Centreline Tours",
  description:
    "Explore Sri Lanka beyond the usual route — southern coast, hill country, cultural triangle, wildlife, northern roads, and quiet beaches.",
};

export default function DestinationsPage() {
  return (
    <main>
      <DestinationsHero />
      <DestinationRegions />
      <DestinationAtlas />
      <DestinationTravelNotes />
      <DestinationHubCta />
    </main>
  );
}
