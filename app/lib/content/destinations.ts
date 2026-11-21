export type DestinationTag =
  | "Coast"
  | "Hills"
  | "Culture"
  | "Wildlife"
  | "North";

export type DestinationRegion = {
  slug: string;
  title: string;
  tag: DestinationTag;
  meta: string;
  shortDescription: string;
  image: string;
  exploreHref: string;
  filterTags: DestinationTag[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    cta: { href: string; label: string };
    proof: { value: string; label: string }[];
  };
  layers: {
    eyebrow: string;
    title: string;
    intro: string;
    chapters: { index: string; title: string; body: string }[];
    chapterCta: { href: string; label: string };
  };
  travelHere: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    items: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  highlights: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; blurb: string; image: string }[];
  };
  guides: {
    eyebrow: string;
    title: string;
    description: string;
    cta: { href: string; label: string };
    members: {
      name: string;
      role: string;
      focus: string;
      image: string;
    }[];
  };
  quote: {
    text: string;
    name: string;
    role: string;
    avatar: string;
  };
  exploreBridge: {
    eyebrow: string;
    title: string;
    description: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
    pills: string[];
  };
};

const icons = {
  island: "/images/home/figma/icons/about-srilanka.svg",
  profile: "/images/home/figma/icons/about-profile.svg",
  region: "/images/home/figma/icons/about-region.svg",
  location: "/images/home/figma/icons/about-location.svg",
} as const;

export const destinationsPage = {
  hero: {
    eyebrow: "Destinations",
    title: "Sri Lanka\n*Beyond the Usual Route*",
    description:
      "Six ways into the island — coast roads, tea hills, ancient cities, wild parks, quiet north, and the beaches between.",
    image: "/images/home/figma/dest-southern.jpg",
    imageAlt: "Sri Lankan coastline stretching into soft morning light",
    cta: { href: "#regions", label: "Browse regions" },
    proof: [
      { value: "6", label: "Regions to explore" },
      { value: "55+", label: "Curated routes" },
      { value: "40+", label: "Local guides" },
      { value: "4.9", label: "Average rating" },
    ],
  },
  regions: {
    eyebrow: "The Island",
    title: "Choose a Direction.\n*Find Your Pace*",
    description:
      "Each region opens a different Sri Lanka. Pick a coast, climb into the hills, or disappear into the wild.",
    filters: ["All", "Coast", "Hills", "Culture", "Wildlife", "North"] as const,
  },
  atlas: {
    eyebrow: "How the Island Opens",
    title: "One Shoreline.\n*Many Ways In*",
    intro:
      "Sri Lanka is small enough to cross in a day — and deep enough to reward the traveler who stays longer than the checklist allows.",
    chapters: [
      {
        index: "01",
        title: "Follow the coast",
        body: "Surf towns, lagoon roads, and evening light that turns every bay gold. Start south or east — the sea sets the rhythm.",
      },
      {
        index: "02",
        title: "Climb into the hills",
        body: "Tea terraces, mist trains, and mornings cool enough for a jacket. The hill country is where the island breathes differently.",
      },
      {
        index: "03",
        title: "Go beyond the map",
        body: "Ancient cities, leopard country, and the quieter north. The best stories sit one turn past where most itineraries end.",
      },
    ],
    chapterCta: { href: "#regions", label: "See all regions" },
  },
  travelNotes: {
    eyebrow: "Travel Notes",
    title: "How We Move\n*Across the Island*",
    description:
      "A few principles for exploring Sri Lanka without rushing past the reason you came.",
    image: "/images/home/figma/about-2.jpg",
    imageAlt: "Quiet hillside path through Sri Lankan countryside",
    items: [
      {
        title: "Slow your pace",
        description:
          "Leave room between places. The best mornings are the ones without a hard checkout.",
        icon: icons.location,
      },
      {
        title: "Follow the seasons",
        description:
          "Two monsoons mean there's always a dry coast. We help you match the calendar to the map.",
        icon: icons.island,
      },
      {
        title: "Travel with locals",
        description:
          "Guides who live the routes — not just work them — open doors a guidebook never will.",
        icon: icons.profile,
      },
      {
        title: "Stay nearby",
        description:
          "Homestays, lodges, and quiet hotels close to the trail so the day ends where the place begins.",
        icon: icons.region,
      },
    ],
  },
  hubCta: {
    eyebrow: "Ready to Plan?",
    title: "Pick a Place.\n*Build the Journey*",
    description:
      "Browse stays, guides, and rentals across the island — or start with a region and let the rest follow.",
    primary: { href: "/explore", label: "Explore Sri Lanka" },
    secondary: { href: "/explore?category=guides", label: "Meet guides" },
    image: "/images/home/figma/hero-bg.jpg",
  },
} as const;

export const destinationRegions: DestinationRegion[] = [
  {
    slug: "southern-coast",
    title: "Southern Coast",
    tag: "Coast",
    meta: "12 routes",
    shortDescription:
      "Golden beaches, surf towns, seafood, and unforgettable sunsets.",
    image: "/images/home/figma/dest-extra-05.jpg",
    exploreHref: "/explore?regions=Southern%20Coast",
    filterTags: ["Coast"],
    hero: {
      eyebrow: "Southern Coast",
      title: "Where the Island\n*Meets the Sea*",
      description:
        "Galle's ramparts, Mirissa's bay light, and coastline roads that reward the traveler who slows down between stops.",
      image: "/images/home/figma/dest-extra-05.jpg",
      imageAlt: "Southern Sri Lankan beach at golden hour",
      cta: { href: "#guides", label: "Meet local guides" },
      proof: [
        { value: "12", label: "Curated routes" },
        { value: "18+", label: "Coastal stays" },
        { value: "9", label: "Local guides" },
        { value: "Dec–Apr", label: "Best months" },
      ],
    },
    layers: {
      eyebrow: "The Coast",
      title: "Surf Towns,\n*Quiet Bays*",
      intro:
        "The south opens in layers — fort towns, fishing harbors, and stretches of sand that empty out after the tour buses leave.",
      chapters: [
        {
          index: "01",
          title: "Terrain",
          body: "Palm-lined beaches, rocky headlands, and lagoon mouths. From Galle to Tangalle, the shoreline changes character every few kilometers.",
        },
        {
          index: "02",
          title: "Rhythm",
          body: "Mornings for swimming or surfing, afternoons for forts and cafés, evenings for seafood as the light drops over the Indian Ocean.",
        },
        {
          index: "03",
          title: "Hidden side",
          body: "Quiet coves past the famous beaches, village temples, and coastal roads few day-trippers ever take. Ask a local — they'll know the turn.",
        },
      ],
      chapterCta: {
        href: "/explore?regions=Southern%20Coast",
        label: "Explore the south",
      },
    },
    travelHere: {
      eyebrow: "Travel Here",
      title: "How to Do\n*the South Well*",
      description:
        "Four notes for coastal days that feel lived-in, not rushed.",
      image: "/images/home/figma/dest-beaches.jpg",
      imageAlt: "Soft waves along a southern Sri Lankan beach",
      items: [
        {
          title: "Base yourself",
          description:
            "Pick one stretch — Galle, Mirissa, or Tangalle — and day-trip outward instead of packing every night.",
          icon: icons.location,
        },
        {
          title: "Watch the swell",
          description:
            "December to April favors the south. Early mornings bring cleaner water and quieter shores.",
          icon: icons.island,
        },
        {
          title: "Hire a coast guide",
          description:
            "Locals know which bays empty after breakfast and which cafés still cook like home.",
          icon: icons.profile,
        },
        {
          title: "Leave buffer days",
          description:
            "The best southern memory is often an unplanned afternoon with nowhere else to be.",
          icon: icons.region,
        },
      ],
    },
    highlights: {
      eyebrow: "Highlights",
      title: "Places Worth\n*the Detour*",
      description: "A handful of stops that define the southern stretch.",
      items: [
        {
          title: "Galle Fort",
          blurb: "Ramparts, lanes, and golden-hour walls above the sea.",
          image: "/images/home/figma/dest-extra-01.jpg",
        },
        {
          title: "Mirissa Bay",
          blurb: "Soft sand, whale mornings, and sunset seafood.",
          image: "/images/home/figma/dest-beaches.jpg",
        },
        {
          title: "Hiriketiya",
          blurb: "A pocket cove loved by surfers and slow travelers.",
          image: "/images/home/figma/dest-extra-02.jpg",
        },
        {
          title: "Tangalle Coast",
          blurb: "Longer beaches, quieter nights, room to breathe.",
          image: "/images/home/figma/dest-extra-03.jpg",
        },
      ],
    },
    guides: {
      eyebrow: "Local Guides",
      title: "People Who Know\n*These Shores*",
      description:
        "Coastal hosts and guides who live between the fort walls and the fishing harbors.",
      cta: {
        href: "/explore?category=guides&regions=Southern%20Coast",
        label: "Meet All Guides",
      },
      members: [
        {
          name: "Kasun Jayawardena",
          role: "Coast Curator",
          focus: "Bay roads, quiet stays, and itineraries built around how you want to move along the shore.",
          image: "/images/home/figma/guide-travel.jpg",
        },
        {
          name: "Amaya Fernando",
          role: "Culture Guide",
          focus: "Forts, fishing villages, and the stories that live between the tourist map and the real coast.",
          image: "/images/home/figma/guide-extra-02.jpg",
        },
        {
          name: "Nimal Perera",
          role: "Trail Lead",
          focus: "Coastal walks, headland viewpoints, and the quieter paths above the surf line.",
          image: "/images/home/figma/guide-adventure.jpg",
        },
      ],
    },
    quote: {
      text: "\"The south isn't one beach — it's a *string of moods*. Stay long enough and the tide starts setting your schedule.\"",
      name: "Kasun Jayawardena",
      role: "Coast Curator",
      avatar: "/images/home/figma/guide-travel.jpg",
    },
    exploreBridge: {
      eyebrow: "Continue Exploring",
      title: "Stays & Guides\n*Along the Coast*",
      description:
        "Find coastal lodges, local guides, and vehicles for the southern road.",
      primary: {
        href: "/explore?regions=Southern%20Coast",
        label: "Explore Southern Coast",
      },
      secondary: {
        href: "/explore?category=guides&regions=Southern%20Coast",
        label: "Find a guide",
      },
      pills: ["Southern Coast", "Stays", "Guides"],
    },
  },
  {
    slug: "hill-country",
    title: "Hill Country",
    tag: "Hills",
    meta: "9 routes",
    shortDescription:
      "Misty mountains, tea country, waterfalls, and winding roads.",
    image: "/images/home/figma/dest-extra-04.jpg",
    exploreHref: "/explore?regions=Hill%20Country",
    filterTags: ["Hills"],
    hero: {
      eyebrow: "Hill Country",
      title: "Mist, Tea &\n*Winding Roads*",
      description:
        "Cool mornings above the tea line, trains through cloud forest, and ridgelines that ask you to linger one more night.",
      image: "/images/home/figma/dest-extra-04.jpg",
      imageAlt: "Tea terraces in the Sri Lankan hill country",
      cta: { href: "#guides", label: "Meet hill guides" },
      proof: [
        { value: "9", label: "Curated routes" },
        { value: "22+", label: "Hill stays" },
        { value: "11", label: "Local guides" },
        { value: "Year-round", label: "Best months" },
      ],
    },
    layers: {
      eyebrow: "The Hills",
      title: "Above the\n*Tea Line*",
      intro:
        "The hill country is Sri Lanka's quiet lungs — cooler air, slower trains, and views that appear only when the mist lifts.",
      chapters: [
        {
          index: "01",
          title: "Terrain",
          body: "Terraced estates, waterfall gorges, and peaks wrapped in cloud. Ella, Nuwara Eliya, and Haputale each hold a different altitude mood.",
        },
        {
          index: "02",
          title: "Rhythm",
          body: "Dawn walks before the fog burns off, tea tastings at noon, and evenings by a fire when the temperature drops.",
        },
        {
          index: "03",
          title: "Hidden side",
          body: "Estate paths locals still use, viewpoints without the crowds, and overnight stays where the only sound is wind in the leaves.",
        },
      ],
      chapterCta: {
        href: "/explore?regions=Hill%20Country",
        label: "Explore the hills",
      },
    },
    travelHere: {
      eyebrow: "Travel Here",
      title: "How to Do\n*the Hills Well*",
      description: "Four notes for highland travel that doesn't feel hurried.",
      image: "/images/home/figma/dest-hills.jpg",
      imageAlt: "Mist rolling over Sri Lankan tea hills",
      items: [
        {
          title: "Pack layers",
          description:
            "Mornings are cool, afternoons warm, and weather shifts fast above the tea line.",
          icon: icons.location,
        },
        {
          title: "Take the train",
          description:
            "The Kandy–Ella line is the journey — sit on the right side and leave the schedule loose.",
          icon: icons.island,
        },
        {
          title: "Walk with a guide",
          description:
            "Hill guides know which ridges clear first and which trails stay quiet after rain.",
          icon: icons.profile,
        },
        {
          title: "Stay two nights",
          description:
            "One night isn't enough for mist to lift and the place to settle into memory.",
          icon: icons.region,
        },
      ],
    },
    highlights: {
      eyebrow: "Highlights",
      title: "Ridges Worth\n*the Climb*",
      description: "Signature hill-country moments, without the checklist rush.",
      items: [
        {
          title: "Ella Gap",
          blurb: "A view that opens like a window to the lowlands.",
          image: "/images/home/figma/dest-hills.jpg",
        },
        {
          title: "Tea Estates",
          blurb: "Green steps, factory tours, and cups that taste of place.",
          image: "/images/home/figma/dest-extra-04.jpg",
        },
        {
          title: "Horton Plains",
          blurb: "High grassland walks and World's End on a clear morning.",
          image: "/images/home/figma/dest-extra-06.jpg",
        },
        {
          title: "Nuwara Eliya",
          blurb: "Cool air, colonial gardens, and evening fireplaces.",
          image: "/images/home/figma/dest-extra-01.jpg",
        },
      ],
    },
    guides: {
      eyebrow: "Local Guides",
      title: "People Who Know\n*Every Ridge*",
      description:
        "Trail leads and estate hosts who treat the hills as home, not a day trip.",
      cta: {
        href: "/explore?category=guides&regions=Hill%20Country",
        label: "Meet All Guides",
      },
      members: [
        {
          name: "Nimal Perera",
          role: "Hiking Guide",
          focus: "Mountain trails, viewpoints, and the quieter paths into the hills.",
          image: "/images/home/figma/guide-adventure.jpg",
        },
        {
          name: "Arun Perera",
          role: "Adventure Lead",
          focus: "Summits, cloud forest paths, and routes between tea country and the wild.",
          image: "/images/home/figma/guide-adventure.jpg",
        },
        {
          name: "Nimali Fernando",
          role: "Culture Guide",
          focus: "Estate villages, temple mornings, and highland stories few maps mention.",
          image: "/images/home/figma/guide-culture.jpg",
        },
      ],
    },
    quote: {
      text: "\"The best views are always *one ridge past* where most people stop — that's where the mist starts talking.\"",
      name: "Nimal Perera",
      role: "Hiking Guide",
      avatar: "/images/home/figma/guide-adventure.jpg",
    },
    exploreBridge: {
      eyebrow: "Continue Exploring",
      title: "Stays & Guides\n*in the Hills*",
      description:
        "Find misty lodges, trail guides, and vehicles for the highland roads.",
      primary: {
        href: "/explore?regions=Hill%20Country",
        label: "Explore Hill Country",
      },
      secondary: {
        href: "/explore?category=guides&regions=Hill%20Country",
        label: "Find a guide",
      },
      pills: ["Hill Country", "Stays", "Guides"],
    },
  },
  {
    slug: "cultural-triangle",
    title: "Cultural Triangle",
    tag: "Culture",
    meta: "7 routes",
    shortDescription: "Ancient cities, sacred temples, and rock fortresses.",
    image: "/images/home/figma/dest-hills.jpg",
    exploreHref: "/explore?regions=Cultural%20Triangle",
    filterTags: ["Culture"],
    hero: {
      eyebrow: "Cultural Triangle",
      title: "Stone, Story &\n*Sacred Ground*",
      description:
        "Sigiriya's rock, Anuradhapura's ruins, and temple mornings that ask for quiet attention more than a camera checklist.",
      image: "/images/home/figma/dest-cultural.jpg",
      imageAlt: "Ancient rock fortress rising above the Sri Lankan plains",
      cta: { href: "#guides", label: "Meet culture guides" },
      proof: [
        { value: "7", label: "Curated routes" },
        { value: "14+", label: "Heritage stays" },
        { value: "8", label: "Local guides" },
        { value: "Year-round", label: "Best months" },
      ],
    },
    layers: {
      eyebrow: "The Triangle",
      title: "Kingdoms That\n*Still Speak*",
      intro:
        "The cultural triangle holds Sri Lanka's deep time — rock fortresses, dagobas, and cave temples that reward slow looking.",
      chapters: [
        {
          index: "01",
          title: "Terrain",
          body: "Dry-zone plains, granite outcrops, and reservoir landscapes shaped by ancient engineering as much as nature.",
        },
        {
          index: "02",
          title: "Rhythm",
          body: "Dawn at the rock before the heat, midday shade in museum courtyards, dusk puja light at living temples.",
        },
        {
          index: "03",
          title: "Hidden side",
          body: "Village shrines, lesser-known caves, and guides who read inscriptions the way others read road signs.",
        },
      ],
      chapterCta: {
        href: "/explore?regions=Cultural%20Triangle",
        label: "Explore the triangle",
      },
    },
    travelHere: {
      eyebrow: "Travel Here",
      title: "How to Do\n*the Triangle Well*",
      description: "Four notes for heritage travel with room to feel the place.",
      image: "/images/home/figma/dest-cultural.jpg",
      imageAlt: "Temple architecture in Sri Lanka's cultural heartland",
      items: [
        {
          title: "Start early",
          description:
            "Sigiriya and Polonnaruwa are kinder before the heat — and before the crowds arrive.",
          icon: icons.location,
        },
        {
          title: "Dress for temples",
          description:
            "Covered shoulders and knees keep doors open. Carry a light wrap; leave shoes at the threshold.",
          icon: icons.island,
        },
        {
          title: "Hire a storyteller",
          description:
            "Culture guides turn stones into narrative — the difference between looking and understanding.",
          icon: icons.profile,
        },
        {
          title: "Space the sites",
          description:
            "Two major sites a day is plenty. Leave afternoon for shade, conversation, and recovery.",
          icon: icons.region,
        },
      ],
    },
    highlights: {
      eyebrow: "Highlights",
      title: "Sites That\n*Hold Time*",
      description: "The triangle's essential places, without the rush.",
      items: [
        {
          title: "Sigiriya",
          blurb: "A fortress in the sky and frescoes that still stop you mid-climb.",
          image: "/images/home/figma/dest-cultural.jpg",
        },
        {
          title: "Anuradhapura",
          blurb: "Dagobas, sacred trees, and a city that once ruled an island.",
          image: "/images/home/figma/dest-extra-01.jpg",
        },
        {
          title: "Polonnaruwa",
          blurb: "Stone kings, quiet galleries, and ruins in open light.",
          image: "/images/home/figma/dest-extra-02.jpg",
        },
        {
          title: "Dambulla",
          blurb: "Cave temples painted with centuries of devotion.",
          image: "/images/home/figma/dest-extra-03.jpg",
        },
      ],
    },
    guides: {
      eyebrow: "Local Guides",
      title: "People Who Read\n*the Stones*",
      description:
        "Culture keepers who open the triangle beyond the ticket booth narrative.",
      cta: {
        href: "/explore?category=guides&regions=Cultural%20Triangle",
        label: "Meet All Guides",
      },
      members: [
        {
          name: "Amaya Fernando",
          role: "Cultural Guide",
          focus: "Temples, traditions, and stories that bring ancient places to life.",
          image: "/images/home/figma/guide-extra-02.jpg",
        },
        {
          name: "Nimali Fernando",
          role: "Culture Guide",
          focus: "Villages, shrine mornings, and the everyday Sri Lanka around the monuments.",
          image: "/images/home/figma/guide-culture.jpg",
        },
        {
          name: "Kasun Jayawardena",
          role: "Travel Curator",
          focus: "Routes that connect sites without turning heritage into a race.",
          image: "/images/home/figma/guide-travel.jpg",
        },
      ],
    },
    quote: {
      text: "\"Every stone here has a story — you just need *someone to read it* before the midday heat rushes you onward.\"",
      name: "Amaya Fernando",
      role: "Cultural Guide",
      avatar: "/images/home/figma/guide-extra-02.jpg",
    },
    exploreBridge: {
      eyebrow: "Continue Exploring",
      title: "Stays & Guides\n*in the Triangle*",
      description:
        "Find heritage lodges, culture guides, and vehicles for the dry-zone roads.",
      primary: {
        href: "/explore?regions=Cultural%20Triangle",
        label: "Explore Cultural Triangle",
      },
      secondary: {
        href: "/explore?category=guides&regions=Cultural%20Triangle",
        label: "Find a guide",
      },
      pills: ["Cultural Triangle", "Stays", "Guides"],
    },
  },
  {
    slug: "wildlife-nature",
    title: "Wildlife & Nature",
    tag: "Wildlife",
    meta: "8 routes",
    shortDescription:
      "National parks, rainforests, elephants, and leopards.",
    image: "/images/home/figma/dest-wildlife.jpg",
    exploreHref: "/explore?regions=East%20Coast",
    filterTags: ["Wildlife"],
    hero: {
      eyebrow: "Wildlife & Nature",
      title: "Parks, Forests &\n*Patient Waiting*",
      description:
        "Safari tracks at first light, rainforest canopies after rain, and the kind of silence that only arrives when you stop chasing the sighting.",
      image: "/images/home/figma/dest-wildlife.jpg",
      imageAlt: "Wildlife landscape in a Sri Lankan national park",
      cta: { href: "#guides", label: "Meet wildlife guides" },
      proof: [
        { value: "8", label: "Curated routes" },
        { value: "12+", label: "Nature stays" },
        { value: "10", label: "Local guides" },
        { value: "May–Sep", label: "Best months" },
      ],
    },
    layers: {
      eyebrow: "The Wild",
      title: "Where Patience\n*Pays Off*",
      intro:
        "Wildlife travel in Sri Lanka is less about guarantees and more about presence — parks, forests, and guides who know how to wait.",
      chapters: [
        {
          index: "01",
          title: "Terrain",
          body: "Dry scrub and grassland parks, wet-zone rainforest, and lagoon edges where birds gather at low tide.",
        },
        {
          index: "02",
          title: "Rhythm",
          body: "Pre-dawn jeep starts, midday rest in shade, and evening drives when the light turns soft and animals move.",
        },
        {
          index: "03",
          title: "Hidden side",
          body: "Lesser-known parks, bird hides, and rainforest trails that reward quiet feet over loud itineraries.",
        },
      ],
      chapterCta: {
        href: "/explore?regions=East%20Coast",
        label: "Explore wildlife stays",
      },
    },
    travelHere: {
      eyebrow: "Travel Here",
      title: "How to Do\n*the Wild Well*",
      description: "Four notes for park days that feel respectful and real.",
      image: "/images/home/figma/dest-wildlife.jpg",
      imageAlt: "Forest canopy and open parkland in Sri Lanka",
      items: [
        {
          title: "Book dawn slots",
          description:
            "First light is when parks open and wildlife is most active — late morning is already a different story.",
          icon: icons.location,
        },
        {
          title: "Match the season",
          description:
            "Yala and the east favor May–September; rainforest edges stay green year-round with different moods.",
          icon: icons.island,
        },
        {
          title: "Trust a tracker",
          description:
            "Wildlife guides know where to wait — and when to leave an animal alone.",
          icon: icons.profile,
        },
        {
          title: "Stay near the gate",
          description:
            "A lodge close to the park means more sleep and fewer wasted hours on the road.",
          icon: icons.region,
        },
      ],
    },
    highlights: {
      eyebrow: "Highlights",
      title: "Wild Places\n*Worth Waiting For*",
      description: "Parks and forests that define the island's natural side.",
      items: [
        {
          title: "Yala",
          blurb: "Leopard country, open plains, and first-light tracks.",
          image: "/images/home/figma/dest-wildlife.jpg",
        },
        {
          title: "Wilpattu",
          blurb: "Quieter lakes, longer waits, fewer jeeps.",
          image: "/images/home/figma/dest-extra-06.jpg",
        },
        {
          title: "Sinharaja",
          blurb: "Rainforest canopy, endemic birds, and wet-zone green.",
          image: "/images/home/figma/dest-extra-04.jpg",
        },
        {
          title: "Udawalawe",
          blurb: "Elephants in open country and wide horizon light.",
          image: "/images/home/figma/dest-extra-03.jpg",
        },
      ],
    },
    guides: {
      eyebrow: "Local Guides",
      title: "People Who Know\n*How to Wait*",
      description:
        "Trackers and nature hosts who treat wildlife with patience, not performance.",
      cta: {
        href: "/explore?category=guides",
        label: "Meet All Guides",
      },
      members: [
        {
          name: "Kasun Jayasuriya",
          role: "Wildlife Guide",
          focus: "Parks, forests, and the wild side of the island — patiently.",
          image: "/images/home/figma/guide-extra-04.jpg",
        },
        {
          name: "Arun Perera",
          role: "Adventure Lead",
          focus: "Rainforest trails and the routes that connect parks to quiet stays.",
          image: "/images/home/figma/guide-adventure.jpg",
        },
        {
          name: "Nimal Perera",
          role: "Hiking Guide",
          focus: "Forest edges, viewpoints, and walks that sit beside the safari day.",
          image: "/images/home/figma/guide-adventure.jpg",
        },
      ],
    },
    quote: {
      text: "\"You don't find the leopard. You learn to *wait where it walks* — and leave quietly when it does.\"",
      name: "Kasun Jayasuriya",
      role: "Wildlife Guide",
      avatar: "/images/home/figma/guide-extra-04.jpg",
    },
    exploreBridge: {
      eyebrow: "Continue Exploring",
      title: "Stays & Guides\n*Near the Wild*",
      description:
        "Find nature lodges, wildlife guides, and vehicles for park roads.",
      primary: {
        href: "/explore?regions=East%20Coast",
        label: "Explore nearby stays",
      },
      secondary: {
        href: "/explore?category=guides",
        label: "Find a guide",
      },
      pills: ["Wildlife", "Stays", "Guides"],
    },
  },
  {
    slug: "northern-sri-lanka",
    title: "Northern Sri Lanka",
    tag: "North",
    meta: "5 routes",
    shortDescription: "History, culture, lagoons, and quiet coastal roads.",
    image: "/images/home/figma/dest-northern.jpg",
    exploreHref: "/explore?regions=North",
    filterTags: ["North"],
    hero: {
      eyebrow: "Northern Sri Lanka",
      title: "Quiet Roads &\n*Deep History*",
      description:
        "Jaffna's lagoon light, temple towns, and a coastline that still feels like a discovery for travelers who leave the south behind.",
      image: "/images/home/figma/dest-northern.jpg",
      imageAlt: "Northern Sri Lankan coastal landscape",
      cta: { href: "#guides", label: "Meet northern guides" },
      proof: [
        { value: "5", label: "Curated routes" },
        { value: "8+", label: "Quiet stays" },
        { value: "6", label: "Local guides" },
        { value: "May–Sep", label: "Best months" },
      ],
    },
    layers: {
      eyebrow: "The North",
      title: "A Different\n*Sri Lanka*",
      intro:
        "The north moves at its own pace — lagoon roads, Tamil culture, and landscapes that reward curiosity over speed.",
      chapters: [
        {
          index: "01",
          title: "Terrain",
          body: "Flat coastal plains, lagoon networks, limestone islands, and a light that feels sharper than the south.",
        },
        {
          index: "02",
          title: "Rhythm",
          body: "Temple mornings, market afternoons, and long coastal drives where the scenery changes slowly and honestly.",
        },
        {
          index: "03",
          title: "Hidden side",
          body: "Islands few tourists reach, family kitchens, and stories that sit outside the standard island loop.",
        },
      ],
      chapterCta: {
        href: "/explore?regions=North",
        label: "Explore the north",
      },
    },
    travelHere: {
      eyebrow: "Travel Here",
      title: "How to Do\n*the North Well*",
      description: "Four notes for northern travel with respect and space.",
      image: "/images/home/figma/dest-northern.jpg",
      imageAlt: "Open northern roads and lagoon edges",
      items: [
        {
          title: "Give it days",
          description:
            "The north isn't a side trip. Plan enough time for the drive and the settling-in.",
          icon: icons.location,
        },
        {
          title: "Mind the season",
          description:
            "May to September favors the north and east — drier roads and clearer lagoon mornings.",
          icon: icons.island,
        },
        {
          title: "Travel with locals",
          description:
            "Northern guides open culture, food, and places that don't appear on southern itineraries.",
          icon: icons.profile,
        },
        {
          title: "Stay curious",
          description:
            "Ask questions, accept invitations, and leave room for unplanned stops along the lagoon.",
          icon: icons.region,
        },
      ],
    },
    highlights: {
      eyebrow: "Highlights",
      title: "Northern Places\n*Worth the Journey*",
      description: "A short list that still leaves room to wander.",
      items: [
        {
          title: "Jaffna",
          blurb: "Temples, cuisine, and a city with its own cultural gravity.",
          image: "/images/home/figma/dest-northern.jpg",
        },
        {
          title: "Nainativu",
          blurb: "Island temples reached by ferry across lagoon water.",
          image: "/images/home/figma/dest-extra-02.jpg",
        },
        {
          title: "Keerimalai",
          blurb: "Sacred springs and coastal quiet north of the city.",
          image: "/images/home/figma/dest-extra-01.jpg",
        },
        {
          title: "Casuarina Beach",
          blurb: "Long sand, shallow water, and evenings without hurry.",
          image: "/images/home/figma/dest-beaches.jpg",
        },
      ],
    },
    guides: {
      eyebrow: "Local Guides",
      title: "People Who Know\n*the Quiet North*",
      description:
        "Hosts and guides who open Jaffna and the lagoons beyond the surface route.",
      cta: {
        href: "/explore?category=guides&regions=North",
        label: "Meet All Guides",
      },
      members: [
        {
          name: "Nimali Fernando",
          role: "Culture Guide",
          focus: "Temples, villages, and the stories that live in everyday northern life.",
          image: "/images/home/figma/guide-culture.jpg",
        },
        {
          name: "Kasun Jayawardena",
          role: "Travel Curator",
          focus: "Lagoon roads, quiet stays, and itineraries that give the north enough time.",
          image: "/images/home/figma/guide-travel.jpg",
        },
        {
          name: "Amaya Fernando",
          role: "Cultural Guide",
          focus: "Food, festivals, and the living culture around Jaffna's landmarks.",
          image: "/images/home/figma/guide-extra-02.jpg",
        },
      ],
    },
    quote: {
      text: "\"Come north when you're ready to *slow the map down* — this coast doesn't perform for hurried travelers.\"",
      name: "Nimali Fernando",
      role: "Culture Guide",
      avatar: "/images/home/figma/guide-culture.jpg",
    },
    exploreBridge: {
      eyebrow: "Continue Exploring",
      title: "Stays & Guides\n*in the North*",
      description:
        "Find quiet lodges, local guides, and vehicles for northern roads.",
      primary: {
        href: "/explore?regions=North",
        label: "Explore the North",
      },
      secondary: {
        href: "/explore?category=guides&regions=North",
        label: "Find a guide",
      },
      pills: ["North", "Stays", "Guides"],
    },
  },
  {
    slug: "beaches",
    title: "Beaches",
    tag: "Coast",
    meta: "14 routes",
    shortDescription:
      "From famous shores to secluded stretches few travelers ever find.",
    image: "/images/home/figma/dest-cultural.jpg",
    exploreHref:
      "/explore?regions=Southern%20Coast&regions=East%20Coast",
    filterTags: ["Coast"],
    hero: {
      eyebrow: "Beaches",
      title: "Famous Shores &\n*Secret Stretches*",
      description:
        "From postcard bays to empty sand between fishing villages — the island's beaches reward whoever leaves time between the famous names.",
      image: "/images/home/figma/dest-beaches.jpg",
      imageAlt: "Open Sri Lankan beach with soft evening light",
      cta: { href: "#guides", label: "Meet beach guides" },
      proof: [
        { value: "14", label: "Curated routes" },
        { value: "30+", label: "Beach stays" },
        { value: "12", label: "Local guides" },
        { value: "Seasonal", label: "Best months" },
      ],
    },
    layers: {
      eyebrow: "The Shore",
      title: "More Than\n*One Coast*",
      intro:
        "Sri Lanka's beaches aren't a single strip — south, east, and quiet pockets each have their own season, swell, and mood.",
      chapters: [
        {
          index: "01",
          title: "Terrain",
          body: "Crescent coves, long open strands, reef edges, and lagoon mouths. The shoreline changes personality every few towns.",
        },
        {
          index: "02",
          title: "Rhythm",
          body: "Swim early, rest through the heat, and watch the light soften the water at the end of the day.",
        },
        {
          index: "03",
          title: "Hidden side",
          body: "Access tracks locals use, empty beaches after the buses leave, and stays that sit just beyond the famous names.",
        },
      ],
      chapterCta: {
        href: "/explore?regions=Southern%20Coast",
        label: "Explore beach stays",
      },
    },
    travelHere: {
      eyebrow: "Travel Here",
      title: "How to Do\n*the Beaches Well*",
      description: "Four notes for coastal days that aren't just checklist swims.",
      image: "/images/home/figma/dest-beaches.jpg",
      imageAlt: "Secluded stretch of Sri Lankan coastline",
      items: [
        {
          title: "Follow the dry side",
          description:
            "South and west shine December–April; east and north favor May–September.",
          icon: icons.location,
        },
        {
          title: "Mix famous and quiet",
          description:
            "One known bay for energy, one quieter stretch for the days you want empty sand.",
          icon: icons.island,
        },
        {
          title: "Ask a local",
          description:
            "Guides know which beaches fill by noon and which stay calm after breakfast.",
          icon: icons.profile,
        },
        {
          title: "Stay on the sand",
          description:
            "Beachfront or near-shore lodges beat long transfers when the light is best at dawn and dusk.",
          icon: icons.region,
        },
      ],
    },
    highlights: {
      eyebrow: "Highlights",
      title: "Shores Worth\n*Finding*",
      description: "A mix of known names and quieter alternatives.",
      items: [
        {
          title: "Unawatuna",
          blurb: "Easy swimming and a bay that still feels welcoming.",
          image: "/images/home/figma/dest-beaches.jpg",
        },
        {
          title: "Arugam Bay",
          blurb: "East coast surf energy and long evening light.",
          image: "/images/home/figma/dest-extra-05.jpg",
        },
        {
          title: "Pasikudah",
          blurb: "Shallow water, soft sand, and calmer east-coast days.",
          image: "/images/home/figma/dest-extra-02.jpg",
        },
        {
          title: "Secret coves",
          blurb: "Ask your guide — the best stretches rarely make the brochure.",
          image: "/images/home/figma/dest-extra-03.jpg",
        },
      ],
    },
    guides: {
      eyebrow: "Local Guides",
      title: "People Who Know\n*the Shoreline*",
      description:
        "Coastal hosts who balance the famous beaches with the quiet ones.",
      cta: {
        href: "/explore?category=guides&regions=Southern%20Coast",
        label: "Meet All Guides",
      },
      members: [
        {
          name: "Kasun Jayawardena",
          role: "Coast Curator",
          focus: "Bay-hopping itineraries and stays that sit close to the best light.",
          image: "/images/home/figma/guide-travel.jpg",
        },
        {
          name: "Nimal Perera",
          role: "Trail Lead",
          focus: "Coastal walks, headlands, and the paths between one cove and the next.",
          image: "/images/home/figma/guide-adventure.jpg",
        },
        {
          name: "Amaya Fernando",
          role: "Culture Guide",
          focus: "Fishing villages and shoreline culture beyond the beach clubs.",
          image: "/images/home/figma/guide-extra-02.jpg",
        },
      ],
    },
    quote: {
      text: "\"The postcard beaches are beautiful — the ones *nobody posts* are the ones you'll remember.\"",
      name: "Kasun Jayawardena",
      role: "Coast Curator",
      avatar: "/images/home/figma/guide-travel.jpg",
    },
    exploreBridge: {
      eyebrow: "Continue Exploring",
      title: "Stays & Guides\n*by the Water*",
      description:
        "Find beach lodges, coastal guides, and vehicles for shore-hopping.",
      primary: {
        href: "/explore?regions=Southern%20Coast",
        label: "Explore beach stays",
      },
      secondary: {
        href: "/explore?category=guides&regions=Southern%20Coast",
        label: "Find a guide",
      },
      pills: ["Coast", "Stays", "Guides"],
    },
  },
];

export function getDestination(slug: string): DestinationRegion | undefined {
  return destinationRegions.find((region) => region.slug === slug);
}

export function getAllDestinationSlugs(): string[] {
  return destinationRegions.map((region) => region.slug);
}

/** Card fields for home Destinations section — single source of truth. */
export const destinationCards = destinationRegions.map((region) => ({
  slug: region.slug,
  title: region.title,
  description: region.shortDescription,
  image: region.image,
  tag: region.tag,
  meta: region.meta,
}));
