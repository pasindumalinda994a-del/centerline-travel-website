const icons = {
  island: "/images/home/figma/icons/about-srilanka.svg",
  profile: "/images/home/figma/icons/about-profile.svg",
  region: "/images/home/figma/icons/about-region.svg",
  location: "/images/home/figma/icons/about-location.svg",
} as const;

export type JournalCategory =
  | "Travel Guides"
  | "Hidden Places"
  | "Itineraries"
  | "Food & Culture"
  | "Wildlife";

export type JournalStory = {
  slug: string;
  category: JournalCategory;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const journalStories: JournalStory[] = [
  {
    slug: "hill-country-timing",
    category: "Travel Guides",
    title: "The Best Time to Visit Sri Lanka's Hill Country",
    excerpt:
      "Mist seasons, bloom windows, and the months when tea hills feel quiet enough to hear the wind move.",
    readTime: "8 min read",
    image: "/images/home/figma/journal-1.jpg",
    imageAlt: "Misty tea plantations rolling across Sri Lankan hill country",
    featured: true,
  },
  {
    slug: "quiet-waterfalls",
    category: "Hidden Places",
    title: "Quiet Waterfalls Beyond the Tourist Trail",
    excerpt:
      "Pools and drops that reward an early start — and hosts who know which paths stay empty after rain.",
    readTime: "6 min read",
    image: "/images/home/figma/journal-3.jpg",
    imageAlt: "Hidden waterfall cascading through dense green forest",
  },
  {
    slug: "coastal-road-trip",
    category: "Itineraries",
    title: "A Coastal Road Trip Worth Taking Slowly",
    excerpt:
      "Bay to bay along the south — surf towns, lagoon light, and evenings that refuse a fixed schedule.",
    readTime: "10 min read",
    image: "/images/home/figma/journal-extra-02.jpg",
    imageAlt: "Coastal road curving along the Sri Lankan shoreline",
  },
  {
    slug: "southern-coast-eats",
    category: "Food & Culture",
    title: "Where Locals Eat Along the Southern Coast",
    excerpt:
      "Markets at opening, roadside hoppers, and kitchens that don't need a sign to fill every table.",
    readTime: "5 min read",
    image: "/images/home/figma/journal-2.jpg",
    imageAlt: "Local coastal eatery with fresh Sri Lankan dishes",
  },
  {
    slug: "yala-dawn-safaris",
    category: "Wildlife",
    title: "Dawn Safaris in Yala Without the Crowds",
    excerpt:
      "Gate timing, quieter tracks, and why the first light hour still belongs to those who wake for it.",
    readTime: "7 min read",
    image: "/images/home/figma/journal-extra-01.jpg",
    imageAlt: "Wildlife at dawn across open Sri Lankan scrubland",
  },
  {
    slug: "ridge-walk-notes",
    category: "Travel Guides",
    title: "Ridge Walks That Reward an Early Bus",
    excerpt:
      "How to catch the hill country before the heat — routes, layers, and the views worth the climb.",
    readTime: "9 min read",
    image: "/images/home/figma/journal-extra-03.jpg",
    imageAlt: "Hiking trail along a misty Sri Lankan ridgeline",
  },
];

export const journalPage = {
  hero: {
    eyebrow: "Journal",
    title: "Stories from\n*the Long Way*",
    description:
      "Guides, quiet corners, and trail notes from the island — written for travelers who prefer the scenic route.",
    image: "/images/home/figma/journal-1.jpg",
    imageAlt: "Tea hills and soft morning mist across Sri Lanka",
    cta: { href: "#archive", label: "Browse stories" },
    proof: [
      { value: "24+", label: "Stories published" },
      { value: "5", label: "Reading paths" },
      { value: "12+", label: "Regions covered" },
      { value: "7", label: "Avg. minutes" },
    ],
  },
  featured: {
    eyebrow: "Lead Story",
    title: "This Week's\n*Trail Read*",
    description:
      "One deeper piece to open the journal — season, light, and the hill country timing most itineraries get wrong.",
    cta: { href: "#archive", label: "More stories" },
    storySlug: "hill-country-timing",
  },
  archive: {
    eyebrow: "The Archive",
    title: "Browse by\n*Curiosity*",
    description:
      "Travel guides, hidden places, itineraries, kitchens, and wildlife — pick a path and keep reading.",
    filters: [
      "All",
      "Travel Guides",
      "Hidden Places",
      "Itineraries",
      "Food & Culture",
      "Wildlife",
    ] as const,
  },
  series: {
    eyebrow: "How We Write",
    title: "Four Ways Into\n*a Story*",
    intro:
      "Every piece starts on the road — with a host, a season, and a question worth answering before you pack.",
    chapters: [
      {
        index: "01",
        title: "Start with place",
        body: "A coast, a ridge, a park gate at dawn. We ground every story in somewhere you can stand — then widen the map from there.",
      },
      {
        index: "02",
        title: "Ask a local",
        body: "Guides and hosts shape what we publish. Timing, tables, and trails that don't show up until someone who lives there points the way.",
      },
      {
        index: "03",
        title: "Leave room to linger",
        body: "Practical enough to use — open enough to wander. Read times stay honest; the best detours are the ones we leave for you.",
      },
      {
        index: "04",
        title: "Send you onward",
        body: "Every story points somewhere real — a destination, an experience, a stay. Inspiration that ends in a route, not a bookmark.",
      },
    ],
    chapterCta: { href: "/destinations", label: "Explore destinations" },
  },
  trailNotes: {
    eyebrow: "Trail Notes",
    title: "What Helps a Story\n*Travel Well*",
    description:
      "Four field habits we use before every piece goes live — so the advice holds when you are actually on the road.",
    image: "/images/home/figma/journal-extra-02.jpg",
    imageAlt: "Open coastal road at soft afternoon light",
    items: [
      {
        title: "Season first",
        description:
          "Monsoon sides flip. We match hills, wildlife, and coast light to the months that reward them.",
        icon: icons.island,
      },
      {
        title: "Local timing",
        description:
          "Opening hours, gate queues, and kitchen rush — checked with hosts who live the rhythm, not the brochure.",
        icon: icons.profile,
      },
      {
        title: "Honest length",
        description:
          "Read times reflect the piece. Short when a tip is enough; longer when the route deserves a full map.",
        icon: icons.region,
      },
      {
        title: "Leave space",
        description:
          "We never script every hour. The best journals leave room for the stop that wasn't planned.",
        icon: icons.location,
      },
    ],
  },
  quote: {
    text: "\"A good travel story doesn't shout — it *points*. Toward a quieter hour, a longer road, and the island *you almost missed.*\"",
    name: "Kasun Jayawardena",
    role: "Travel Curator",
    avatar: "/images/home/figma/guide-travel.jpg",
  },
  hubCta: {
    eyebrow: "Keep Going",
    title: "Turn a Story\n*Into a Route*",
    description:
      "Browse destinations and experiences shaped by the same local knowledge that fills these pages.",
    primary: { href: "/destinations", label: "Explore destinations" },
    secondary: { href: "/experiences", label: "Browse experiences" },
    image: "/images/home/figma/journal-3.jpg",
  },
} as const;

/** Home section teaser — derived from journal stories for a single source of truth. */
export const journal = {
  eyebrow: "Journal",
  title: "Stories, Tips &\n*Trail Inspiration*",
  description:
    "Places worth visiting, hidden corners worth finding, and ideas for your next journey.",
  cta: { href: "/journal", label: "View Journal" },
  items: journalStories.slice(0, 5).map((story) => ({
    category: story.category,
    title: story.title,
    date: story.readTime,
    image: story.image,
    href: `/journal#archive`,
    ...(story.featured ? { featured: true as const } : {}),
  })),
} as const;
