export const aboutPage = {
  hero: {
    eyebrow: "About Us",
    title: "Centreline\n*Beyond the Map*",
    description:
      "We built a quieter way to travel Sri Lanka — guided by locals, shaped by the places most itineraries skip.",
    image: "/images/home/figma/about.jpg",
    imageAlt: "Trail through Sri Lankan hills at golden hour",
    cta: { href: "#team", label: "Meet the team" },
    proof: [
      { value: "8+", label: "Years on the road" },
      { value: "25+", label: "Regions to explore" },
      { value: "1k+", label: "Travelers guided" },
      { value: "4.9", label: "Average rating" },
    ],
  },
  story: {
    eyebrow: "How We Began",
    title: "One Island.\n*One Clear Path* Forward",
    intro:
      "A marketplace built from the road — for travelers who want more than a checklist, and locals who know the island better than any map.",
    chapters: [
      {
        index: "01",
        title: "On the road",
        body: "Centreline started between misty tea estates, quiet coasts, and trails that never made the guidebook. We kept meeting travelers hungry for the long way — and hosts ready to share it.",
      },
      {
        index: "02",
        title: "Local knowledge",
        body: "Every route begins with someone who belongs there. Guides, hosts, and rental partners who live the island — not just work it — shape what you find on Centreline.",
      },
      {
        index: "03",
        title: "One clear path",
        body: "Destinations, hidden places, stays, guides, and rentals — in one place. Not to package Sri Lanka tighter, but to open it wider, at your pace.",
      },
    ],
    chapterCta: { href: "/explore", label: "Start exploring" },
  },
  principles: {
    eyebrow: "What Guides Us",
    title: "Beliefs We Carry\n*On Every Route*",
    description:
      "Four ideas that shape how we curate places, people, and the journeys between them.",
    image: "/images/home/figma/about-2.jpg",
    imageAlt: "Quiet hillside path through Sri Lankan countryside",
    items: [
      {
        title: "Beyond the guidebook",
        description:
          "Famous sights matter — but the long way often holds the real story. We favor routes that reward curiosity.",
        icon: "/images/home/figma/icons/about-srilanka.svg",
      },
      {
        title: "Local first",
        description:
          "Hosts and guides who live the island, not just work it. Every stay and trail starts with someone who belongs there.",
        icon: "/images/home/figma/icons/about-profile.svg",
      },
      {
        title: "Small groups",
        description:
          "Never more than eight travelers per guide. Room for detours, conversation, and mornings that aren't on a schedule.",
        icon: "/images/home/figma/icons/about-region.svg",
      },
      {
        title: "Slow discovery",
        description:
          "Travel that leaves space to linger — tea on a veranda, an empty stretch of coast, a temple after the crowds leave.",
        icon: "/images/home/figma/icons/about-location.svg",
      },
    ],
  },
  team: {
    eyebrow: "The People",
    title: "Guides Who Know\n*the Long Way*",
    description:
      "The faces behind the routes — adventure leads, culture keepers, and travelers who turned the island into a life's work.",
    cta: { href: "/explore?category=guides", label: "Meet All Guides" },
    members: [
      {
        name: "Arun Perera",
        role: "Adventure Lead",
        focus: "Hill trails, summits, and the routes between tea country and the wild.",
        image: "/images/home/figma/guide-adventure.jpg",
      },
      {
        name: "Nimali Fernando",
        role: "Culture Guide",
        focus: "Temples, villages, and the stories that live in everyday Sri Lanka.",
        image: "/images/home/figma/guide-culture.jpg",
      },
      {
        name: "Kasun Jayawardena",
        role: "Travel Curator",
        focus: "Coast roads, quiet stays, and itineraries built around how you want to move.",
        image: "/images/home/figma/guide-travel.jpg",
      },
    ],
  },
  quote: {
    text: "\"Every traveler who joins us experiences Sri Lanka *through our eyes* — calm mornings, misty ridgelines, and endless coastlines *that stay in memory forever.*\"",
    name: "Centreline Team",
    role: "Founders & Lead Guides",
    avatar: "/images/home/figma/guide-adventure.jpg",
  },
} as const;
