import type { Metadata } from "next";
import { AboutHero } from "@/app/about/_components/AboutHero";
import { AboutPrinciples } from "@/app/about/_components/AboutPrinciples";
import { AboutQuote } from "@/app/about/_components/AboutQuote";
import { AboutStory } from "@/app/about/_components/AboutStory";
import { AboutTeam } from "@/app/about/_components/AboutTeam";

export const metadata: Metadata = {
  title: "About | Centreline Tours",
  description:
    "Discover the story behind Centreline Tours — a quieter way to explore Sri Lanka through local guides, hidden places, stays, and experiences beyond the usual route.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <AboutPrinciples />
      <AboutTeam />
      <AboutQuote />
    </main>
  );
}
