import type { Metadata } from "next";
import { JournalArchive } from "@/app/journal/_components/JournalArchive";
import { JournalFeatured } from "@/app/journal/_components/JournalFeatured";
import { JournalHero } from "@/app/journal/_components/JournalHero";
import { JournalHubCta } from "@/app/journal/_components/JournalHubCta";
import { JournalQuote } from "@/app/journal/_components/JournalQuote";
import { JournalSeries } from "@/app/journal/_components/JournalSeries";
import { JournalTrailNotes } from "@/app/journal/_components/JournalTrailNotes";

export const metadata: Metadata = {
  title: "Journal | Centreline Tours",
  description:
    "Stories, guides, and trail notes from Sri Lanka — hill country timing, quiet waterfalls, coastal roads, kitchens, and wildlife beyond the usual route.",
};

export default function JournalPage() {
  return (
    <main>
      <JournalHero />
      <JournalFeatured />
      <JournalArchive />
      <JournalSeries />
      <JournalTrailNotes />
      <JournalQuote />
      <JournalHubCta />
    </main>
  );
}
