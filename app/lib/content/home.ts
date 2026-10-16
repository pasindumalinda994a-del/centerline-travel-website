export const brand = {
  name: "Centreline Tours",
  tagline: "Discover Sri Lanka beyond the usual route.",
} as const;

export const navLinks = [
  { href: "#destinations", label: "Destinations" },
  { href: "#experiences", label: "Experiences" },
  { href: "#guides", label: "Guides" },
  { href: "#journal", label: "Journal" },
  { href: "#about", label: "About" },
] as const;

export const hero = {
  basedIn: "Based in: Sri Lanka",
  eyebrow: "Sri Lanka — Est. Beyond",
  title: "Go Beyond the\n*Places You Know*",
  description:
    "Guided discovery across misty hills, hidden coasts, ancient kingdoms, and wild forests few travelers reach.",
  chips: ["Coast", "Hills", "Wildlife", "Culture"] as const,
} as const;

export const search = {
  categories: ["All Categories", "Hotel", "Vehicle", "Guide"] as const,
  locations: [
    "All Locations",
    "Colombo",
    "Kandy",
    "Ella",
    "Galle",
    "Nuwara Eliya",
  ] as const,
} as const;

export const destinations = {
  eyebrow: "Destinations",
  title: "A Small Island With\n*Endless Places* to Discover",
  description:
    "Follow the coast, climb into the hills, wander through ancient cities, or disappear into the wild.",
  cta: { href: "#destinations", label: "Explore All" },
  items: [
    {
      title: "Southern Coast",
      description: "Golden beaches, surf towns, seafood, and unforgettable sunsets.",
      image: "/images/home/figma/dest-extra-05.jpg",
      tag: "Coast",
      meta: "12 routes",
    },
    {
      title: "Hill Country",
      description: "Misty mountains, tea country, waterfalls, and winding roads.",
      image: "/images/home/figma/dest-extra-04.jpg",
      tag: "Hills",
      meta: "9 routes",
    },
    {
      title: "Cultural Triangle",
      description: "Ancient cities, sacred temples, and rock fortresses.",
      image: "/images/home/figma/dest-hills.jpg",
      tag: "Culture",
      meta: "7 routes",
    },
    {
      title: "Wildlife & Nature",
      description: "National parks, rainforests, elephants, and leopards.",
      image: "/images/home/figma/dest-wildlife.jpg",
      tag: "Wildlife",
      meta: "8 routes",
    },
    {
      title: "Northern Sri Lanka",
      description: "History, culture, lagoons, and quiet coastal roads.",
      image: "/images/home/figma/dest-northern.jpg",
      tag: "North",
      meta: "5 routes",
    },
    {
      title: "Beaches",
      description: "From famous shores to secluded stretches few travelers ever find.",
      image: "/images/home/figma/dest-cultural.jpg",
      tag: "Coast",
      meta: "14 routes",
    },
  ],
} as const;

export const about = {
  eyebrow: "Who We Are",
  title: "Discover the Sri Lanka\n*You Don't Find* on a Map",
  description:
    "Centreline Tours brings together destinations, hidden places, experiences, stays, guides, and rentals — so you can explore the island your way.",
  cta: { href: "#about", label: "Our Story" },
  image: "/images/home/figma/about.jpg",
  stats: [
    { label: "Regions to Explore", value: "25+" },
    { label: "Places & Experiences", value: "100+" },
    { label: "Guides & Hosts", value: "Local" },
  ],
  statsStrip: [
    { value: "8+", label: "Years on the road" },
    { value: "25+", label: "Regions to explore" },
    { value: "1k+", label: "Travelers guided" },
    { value: "4.9", label: "Average rating" },
  ],
  card: {
    title: "Every trip, a new story",
    description: "From summit to shore — every path has something to say.",
    thumbs: [
      "/images/home/figma/dest-extra-05.jpg",
      "/images/home/figma/dest-extra-04.jpg",
      "/images/home/figma/dest-wildlife.jpg",
    ],
  },
} as const;

export const hiddenPlaces = {
  eyebrow: "Hidden Places",
  title: "The Places Worth\n*Taking the Long Way* For",
  description:
    "Quiet waterfalls, forgotten ruins, hidden beaches, and trails waiting beyond the usual route.",
  cta: { href: "#hidden-places", label: "Explore Hidden Places" },
  items: [
    {
      name: "Daanigala",
      alt: "Wilderness climb",
      images: [
        "/images/home/figma/hidden-1.jpg",
        "/images/home/figma/journal-1.jpg",
        "/images/home/figma/dest-extra-04.jpg",
        "/images/home/figma/dest-wildlife.jpg",
      ],
    },
    {
      name: "Daraniyagala",
      alt: "Green hills & rivers",
      images: [
        "/images/home/figma/experiences-hero.jpg",
        "/images/home/figma/dest-hills.jpg",
        "/images/home/figma/about.jpg",
        "/images/home/figma/stays-hero.jpg",
      ],
    },
    {
      name: "Ibbankatuwa",
      alt: "Ancient landscapes",
      images: [
        "/images/home/figma/dest-northern.jpg",
        "/images/home/figma/dest-cultural.jpg",
        "/images/home/figma/dest-extra-05.jpg",
        "/images/home/figma/events.jpg",
      ],
    },
    {
      name: "Kuragala",
      alt: "Mountain sanctuary",
      images: [
        "/images/home/figma/guide-adventure.jpg",
        "/images/home/figma/guide-extra-02.jpg",
        "/images/home/figma/guide-extra-04.jpg",
        "/images/home/figma/guide-extra-03.jpg",
      ],
    },
    {
      name: "Galapitagala",
      alt: "Rock & forest",
      images: [
        "/images/home/figma/rental-bike.jpg",
        "/images/home/figma/rental-4x4.jpg",
        "/images/home/figma/rental-camp.jpg",
        "/images/home/figma/rental-extra-06.jpg",
      ],
    },
    {
      name: "Rajagala",
      alt: "Forgotten ancient world",
      images: [
        "/images/home/figma/testimonial-hero.jpg",
        "/images/home/figma/testimonial-avatar-1.jpg",
        "/images/home/figma/testimonial-extra-01.jpg",
        "/images/home/figma/journal-3.jpg",
      ],
    },
  ],
} as const;

export const experiences = {
  eyebrow: "Experiences",
  title: "What Makes the\n*Experience* Different",
  description:
    "Meet the people, taste the food, follow local trails, watch wildlife, and see the island through local eyes.",
  cta: { href: "#experiences", label: "Browse All" },
  items: [
    {
      kind: "icon",
      icon: "paw",
      title: "Wildlife",
      description: "Safaris, rainforests, and the wild side of the island.",
    },
    {
      kind: "icon",
      icon: "temple",
      title: "Culture",
      description: "Temples, history, and local stories brought to life.",
    },
    {
      kind: "image",
      title: "Adventure",
      description: "Hiking, climbing, rafting, camping.",
      image: "/images/home/figma/experiences-hero.jpg",
      stat: "40+",
      statLabel: "trails & routes mapped",
    },
    {
      kind: "image",
      title: "Photography",
      description: "Places worth waking up early for.",
      image: "/images/home/figma/journal-1.jpg",
      stat: "Golden",
      statLabel: "hours, found for you",
    },
    {
      kind: "icon",
      icon: "bowl",
      title: "Food",
      description: "Markets, kitchens, and dishes you'll chase forever.",
    },
    {
      kind: "icon",
      icon: "wave",
      title: "Surf",
      description: "Waves, beaches, and coastal energy year-round.",
    },
  ],
} as const;

export const stays = {
  eyebrow: "Stays",
  title: "Where You Stay Becomes\n*Part of the Journey*",
  description:
    "Wake up beside the ocean, among tea-covered hills, or in a home where the host knows the best places nearby.",
  cta: { href: "#stays", label: "Find Your Stay" },
  image: "/images/home/figma/stays-hero.jpg",
  features: [
    {
      icon: "compass",
      title: "Hand-picked stays",
      description: "Hotels, villas, and lodges chosen for place, not stars.",
    },
    {
      icon: "people",
      title: "Hosts who know the area",
      description: "Local hosts point you to what guidebooks miss.",
    },
    {
      icon: "leaf",
      title: "Closer to nature",
      description: "Eco lodges and homestays in the island's quietest corners.",
    },
  ],
} as const;

export const rentals = {
  eyebrow: "Rentals",
  title: "Your Journey.\n*Your Route.* Your Ride.",
  description:
    "Find the vehicles and gear you need for a coastal road trip, mountain adventure, or wild camping journey.",
  cta: { href: "#rentals", label: "See All Rentals" },
  items: [
    { title: "Cars", image: "/images/home/figma/rental-extra-02.jpg", label: "Island roads", price: "From $35/day" },
    { title: "Tuk Tuks", image: "/images/home/figma/rental-extra-05.jpg", label: "Local classic", price: "From $15/day" },
    { title: "Motorbikes", image: "/images/home/figma/rental-bike.jpg", label: "Scenic stops", price: "From $12/day" },
    { title: "4×4 Vehicles", image: "/images/home/figma/rental-4x4.jpg", label: "Off the map", price: "From $60/day" },
    { title: "Camping Gear", image: "/images/home/figma/rental-camp.jpg", label: "Under the sky", price: "From $8/day" },
    { title: "Surfboards", image: "/images/home/figma/rental-extra-06.jpg", label: "Catch waves", price: "From $10/day" },
  ],
} as const;

export const howItWorks = {
  eyebrow: "How It Works",
  title: "From Inspiration to\n*Your Next Adventure*",
  description:
    "Discover places, plan your route, connect with locals, and go — without the usual tourist trail.",
  cta: { href: "#destinations", label: "Plan Your Trip" },
  steps: [
    {
      index: "01",
      title: "Discover",
      description: "Browse destinations, hidden places, experiences, stays, guides, and rentals across Sri Lanka.",
    },
    {
      index: "02",
      title: "Plan",
      description: "Save places, compare options, discover routes, and create the trip that fits you.",
    },
    {
      index: "03",
      title: "Connect",
      description: "Find local guides, hosts, rental partners, and experiences worth remembering.",
    },
    {
      index: "04",
      title: "Go",
      description: "Leave the planning behind and enjoy the places, people, and moments that brought you here.",
    },
  ],
} as const;

export const localGuides = {
  eyebrow: "Local Guides",
  title: "Experts Who Know\n*Every Path*",
  description:
    "Go beyond guidebooks with people who know the trails, villages, wildlife, food, and hidden corners of Sri Lanka.",
  cta: { href: "#guides", label: "Find a Guide" },
  items: [
    {
      role: "Hiking Guide",
      name: "Nimal Perera",
      years: "12 years in the hill country",
      blurb: "Mountain trails, viewpoints, and the quieter paths into the hills.",
      quote: "\"The best views are always one ridge past where most people stop.\"",
      image: "/images/home/figma/guide-adventure.jpg",
      tag: "Expert",
    },
    {
      role: "Cultural Guide",
      name: "Amaya Fernando",
      years: "9 years around the ancient cities",
      blurb: "Temples, traditions, and stories that bring ancient places to life.",
      quote: "\"Every stone here has a story — you just need someone to read it.\"",
      image: "/images/home/figma/guide-extra-02.jpg",
      tag: "Local",
    },
    {
      role: "Wildlife Guide",
      name: "Kasun Jayasuriya",
      years: "11 years in the national parks",
      blurb: "Parks, forests, and the wild side of the island — patiently.",
      quote: "\"You don't find the leopard. You learn to wait where it walks.\"",
      image: "/images/home/figma/guide-extra-04.jpg",
      tag: "Pro",
    },
  ],
} as const;

export const testimonials = {
  eyebrow: "Testimonials",
  title: "The Memories Speak\n*for Themselves*",
  description:
    "Honest reflections from travelers who explored the island with us and came home with stories.",
  rating: {
    value: "4.9",
    scale: "/5",
    basis: "Based on 280+ verified traveler reviews",
    proofs: [
      "56+ guided trips delivered",
      "100% local certified guides",
      "8+ years of island experience",
    ],
    cta: { href: "#destinations", label: "Plan Your Trip" },
  },
  featured: {
    quote:
      "\"I came for the beaches, but I left with memories I'll never forget. Every trail, every viewpoint, and every conversation made this journey feel truly special.\"",
    name: "Emily Carter",
    place: "Hill Country Trek",
    image: "/images/home/figma/testimonial-featured.jpg",
  },
  reviews: [
    {
      title: "Every step felt worth it",
      copy: "The route was stunning, the guide knew every hidden viewpoint, and the small group made it feel less like a tour and more like an adventure with friends.",
      name: "Sofia Williams",
      place: "Southern Coast Loop",
      avatar: "/images/home/figma/testimonial-avatar-1.jpg",
    },
    {
      title: "Memories that stayed with me",
      copy: "Watching the sunrise from the summit was unforgettable, but what made the trip special was the people. Even solo travelers felt part of the group from day one.",
      name: "Liam Carter",
      place: "Knuckles Range",
      avatar: "/images/home/figma/testimonial-avatar-3.jpg",
    },
    {
      title: "Smooth from start to finish",
      copy: "From pickup to the last sunset — organized, safe, and full of places we would never have found on our own. Already planning the next trip.",
      name: "Daniel K.",
      place: "Cultural Triangle",
      avatar: "/images/home/figma/testimonial-avatar-4.jpg",
    },
  ],
  founder: {
    quote:
      "\"Every traveler who joins us experiences Sri Lanka *through our eyes* — calm mornings, misty ridgelines, and endless coastlines *that stay in memory forever.*\"",
    name: "Centreline Team",
    role: "Founders & Lead Guides",
    avatar: "/images/home/figma/guide-adventure.jpg",
  },
  filmstrip: [
    "/images/home/figma/hidden-1.jpg",
    "/images/home/figma/dest-extra-04.jpg",
    "/images/home/figma/dest-hills.jpg",
    "/images/home/figma/dest-wildlife.jpg",
    "/images/home/figma/dest-cultural.jpg",
    "/images/home/figma/dest-northern.jpg",
    "/images/home/figma/dest-extra-05.jpg",
    "/images/home/figma/experiences-hero.jpg",
    "/images/home/figma/stays-hero.jpg",
  ],
} as const;

export const journal = {
  eyebrow: "Journal",
  title: "Stories, Tips &\n*Trail Inspiration*",
  description:
    "Places worth visiting, hidden corners worth finding, and ideas for your next journey.",
  cta: { href: "#journal", label: "View Journal" },
  items: [
    {
      category: "Travel Guides",
      title: "The Best Time to Visit Sri Lanka's Hill Country",
      date: "8 min read",
      image: "/images/home/figma/journal-1.jpg",
      featured: true,
    },
    {
      category: "Hidden Places",
      title: "Quiet Waterfalls Beyond the Tourist Trail",
      date: "6 min read",
      image: "/images/home/figma/journal-3.jpg",
    },
    {
      category: "Itineraries",
      title: "A Coastal Road Trip Worth Taking Slowly",
      date: "10 min read",
      image: "/images/home/figma/journal-extra-02.jpg",
    },
    {
      category: "Food & Culture",
      title: "Where Locals Eat Along the Southern Coast",
      date: "5 min read",
      image: "/images/home/figma/journal-2.jpg",
    },
    {
      category: "Wildlife",
      title: "Dawn Safaris in Yala Without the Crowds",
      date: "7 min read",
      image: "/images/home/figma/journal-extra-01.jpg",
    },
  ],
} as const;

export const events = {
  eyebrow: "Events",
  title: "Experience Sri Lanka\n*When It Comes Alive*",
  description:
    "From cultural celebrations and traditional festivals to food events, surf gatherings, and outdoor markets.",
  cta: { href: "#events", label: "Upcoming Events" },
  image: "/images/home/figma/events.jpg",
  stat: {
    value: "120+",
    label: "Festivals & gatherings across the island every year",
  },
} as const;

export const faq = {
  eyebrow: "FAQ",
  title: "Everything You Need to Know\n*Before Your Journey*",
  description:
    "From booking to what to pack — the questions travelers ask us most, answered.",
  sideCard: {
    title: "Didn't see your question?",
    description: "Our team is here to help — just reach out and we'll reply shortly.",
    image: "/images/home/figma/faq-side.jpg",
    cta: { href: "#footer", label: "Contact Us" },
  },
  items: [
    {
      question: "What's the best time of year to visit Sri Lanka?",
      answer:
        "The island has two monsoons, so there's always a dry coast. December to April is best for the south and west; May to September favors the east and north. The hill country is beautiful year-round.",
    },
    {
      question: "Is pickup and drop-off included?",
      answer:
        "Yes — all guided trips include pickup and drop-off within the main towns. Private transfers from the airport or your hotel can be arranged on request.",
    },
    {
      question: "How big are the groups?",
      answer:
        "Never more than 8 travelers per guide. Small groups mean real attention on the trail, flexible pacing, and room for the detours that make a trip memorable.",
    },
    {
      question: "What should I pack for the hill country?",
      answer:
        "Light layers, a rain shell, and good walking shoes. Mornings are cool, afternoons are warm, and the weather changes fast above the tea line — we send a full packing list before every trip.",
    },
    {
      question: "How can I book or cancel a trip?",
      answer:
        "Book directly through the site or message us — a deposit holds your spot. Cancellations up to 14 days before departure are fully refunded, no questions asked.",
    },
  ],
} as const;

export const finalCta = {
  eyebrow: "Your Story Starts Here",
  title: "Go Somewhere\n*Worth Remembering*",
  description:
    "Find the places, people, and experiences that make Sri Lanka more than a destination.",
  primary: { href: "#destinations", label: "Explore Sri Lanka" },
  secondary: { href: "#about", label: "Our Story" },
  image: "/images/home/figma/hero-bg.jpg",
  watermark: "Centreline",
} as const;

export const footer = {
  description:
    "Discover Sri Lanka beyond the usual route. Destinations, hidden places, experiences, stays, guides, and inspiration — in one place.",
  columns: [
    {
      title: "Explore",
      links: ["Destinations", "Hidden Places", "Experiences", "Journal", "Events"],
    },
    {
      title: "Services",
      links: ["Stays", "Local Guides", "Rentals", "Packages"],
    },
    {
      title: "Plan",
      links: ["Trip Planner", "Itineraries", "Travel Tips", "FAQs"],
    },
    {
      title: "Partners",
      links: ["Become a Host", "Become a Guide", "Rental Partner"],
    },
  ],
} as const;
