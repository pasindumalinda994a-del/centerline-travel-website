import type { Metadata } from "next";
import { ExperienceFieldNotes } from "@/app/experiences/_components/ExperienceFieldNotes";
import { ExperienceHosts } from "@/app/experiences/_components/ExperienceHosts";
import { ExperienceMoments } from "@/app/experiences/_components/ExperienceMoments";
import { ExperienceQuote } from "@/app/experiences/_components/ExperienceQuote";
import { ExperienceRhythm } from "@/app/experiences/_components/ExperienceRhythm";
import { ExperiencesHero } from "@/app/experiences/_components/ExperiencesHero";
import { ExperiencesHubCta } from "@/app/experiences/_components/ExperiencesHubCta";

export const metadata: Metadata = {
  title: "Experiences | Centreline Tours",
  description:
    "Wildlife dawns, kitchen stories, ridge trails, and coast energy — curated Sri Lanka experiences led by local hosts.",
};

export default function ExperiencesPage() {
  return (
    <main>
      <ExperiencesHero />
      <ExperienceMoments />
      <ExperienceRhythm />
      <ExperienceFieldNotes />
      <ExperienceHosts />
      <ExperienceQuote />
      <ExperiencesHubCta />
    </main>
  );
}
