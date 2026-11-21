const icons = {
  island: "/images/home/figma/icons/about-srilanka.svg",
  profile: "/images/home/figma/icons/about-profile.svg",
  region: "/images/home/figma/icons/about-region.svg",
  location: "/images/home/figma/icons/about-location.svg",
} as const;

export const experiencesPage = {
  hero: {
    eyebrow: "Experiences",
    title: "Centreline\n*What You Do*",
    description:
      "Wildlife dawns, kitchen stories, ridge trails, and coast energy — curated moments led by people who live the island.",
    image: "/images/home/figma/experiences-hero.jpg",
    imageAlt: "Travelers on a misty Sri Lankan trail at golden hour",
    cta: { href: "#moments", label: "Browse moments" },
    proof: [
      { value: "6", label: "Experience paths" },
      { value: "40+", label: "Trails & routes" },
      { value: "80+", label: "Local hosts" },
      { value: "4.9", label: "Average rating" },
    ],
  },
  moments: {
    eyebrow: "The Moments",
    title: "Six Ways to\n*Feel the Island*",
    description:
      "Not a checklist — a set of ways in. Pick the energy you want and let a local host shape the day.",
    items: [
      {
        index: "01",
        title: "Wildlife",
        blurb:
          "Safaris at first light, rainforest quiet, and the wild edges of the island — paced for watching, not racing.",
        meta: "Half day · Dawn",
        image: "/images/home/exp-wildlife.jpg",
        imageAlt: "Elephant crossing a Sri Lankan scrubland at dawn",
        href: "/explore?category=experiences&tag=wildlife",
      },
      {
        index: "02",
        title: "Culture",
        blurb:
          "Temples after the crowds leave, village kitchens, and stories that live in everyday Sri Lanka.",
        meta: "Half day · Local",
        image: "/images/home/exp-culture.jpg",
        imageAlt: "Temple courtyard with soft afternoon light",
        href: "/explore?category=experiences&tag=culture",
      },
      {
        index: "03",
        title: "Adventure",
        blurb:
          "Ridge walks, rafting runs, camping under tea hills — routes mapped for the long way, not the shortcut.",
        meta: "Full day · Trails",
        image: "/images/home/exp-adventure.jpg",
        imageAlt: "Hiker on a misty hill-country trail",
        href: "/explore?category=experiences&tag=adventure",
        stat: "40+",
        statLabel: "trails mapped",
      },
      {
        index: "04",
        title: "Photography",
        blurb:
          "Golden-hour overlooks, quiet coasts, and places worth waking early for — timed with a host who knows the light.",
        meta: "Dawn · Golden hour",
        image: "/images/home/exp-photo.jpg",
        imageAlt: "Coastal overlook at golden hour",
        href: "/explore?category=experiences&tag=photography",
        stat: "Golden",
        statLabel: "hours found",
      },
      {
        index: "05",
        title: "Food",
        blurb:
          "Markets at opening, home kitchens, and dishes you'll chase long after the trip ends.",
        meta: "Half day · Taste",
        image: "/images/home/exp-food.jpg",
        imageAlt: "Sri Lankan dishes laid out on a wooden table",
        href: "/explore?category=experiences&tag=food",
      },
      {
        index: "06",
        title: "Surf",
        blurb:
          "Breaks, beach roads, and coastal energy year-round — with locals who read the swell before the forecast does.",
        meta: "Half day · Coast",
        image: "/images/home/exp-surf.jpg",
        imageAlt: "Surfer walking toward Sri Lankan ocean waves",
        href: "/explore?category=experiences&tag=surf",
      },
    ],
  },
  rhythm: {
    eyebrow: "How It Unfolds",
    title: "A Day That\n*Moves With You*",
    intro:
      "Every experience follows a quiet rhythm — meet a host, move at island pace, and leave with something that lasts longer than a photo.",
    chapters: [
      {
        index: "01",
        title: "Meet your host",
        body: "Someone who belongs there — not a scripted itinerary. You start with a face, a place, and a clear sense of the day ahead.",
      },
      {
        index: "02",
        title: "Move at island pace",
        body: "Small groups, room for detours, and mornings that aren't on a stopwatch. The best hours often aren't the ones on the map.",
      },
      {
        index: "03",
        title: "Leave with the story",
        body: "A trail, a kitchen, a quiet bay — and the local knowledge that turns a day into something you'll tell again.",
      },
    ],
    chapterCta: { href: "/explore?category=experiences", label: "Find an experience" },
  },
  fieldNotes: {
    eyebrow: "Field Notes",
    title: "What Helps a Day\n*Land Well*",
    description:
      "Four practical notes we share before every experience — so the day feels considered, not improvised.",
    image: "/images/home/figma/experiences-2.jpg",
    imageAlt: "Travelers pausing on a quiet hillside path",
    items: [
      {
        title: "Season & light",
        description:
          "Monsoon sides flip. We match wildlife, surf, and ridge walks to the months that reward them.",
        icon: icons.island,
      },
      {
        title: "Small by design",
        description:
          "Never more than eight travelers per host. Space for questions, silence, and the unexpected stop.",
        icon: icons.region,
      },
      {
        title: "What to bring",
        description:
          "Shoes that hold a trail, a light layer for mist, and curiosity — hosts cover the rest of the briefing.",
        icon: icons.location,
      },
      {
        title: "Travel with respect",
        description:
          "Temples, villages, and wild places have their own pace. We follow local cues before our own agenda.",
        icon: icons.profile,
      },
    ],
  },
  hosts: {
    eyebrow: "Who Leads",
    title: "Hosts Behind\n*the Moments*",
    description:
      "Adventure leads, culture keepers, and coast locals who turn a category into a day you'll remember.",
    cta: { href: "/explore?category=guides", label: "Meet all guides" },
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
        role: "Coast Curator",
        focus: "Surf towns, quiet bays, and days built around how the ocean is moving.",
        image: "/images/home/figma/guide-travel.jpg",
      },
    ],
  },
  quote: {
    text: "\"The best experiences aren't louder — they're *closer*. A host who knows when to stop, when to wait, and when the island *opens on its own.*\"",
    name: "Nimali Fernando",
    role: "Culture Guide",
    avatar: "/images/home/figma/guide-culture.jpg",
  },
  hubCta: {
    eyebrow: "Ready to Go?",
    title: "Pick a Moment.\n*Meet the Host*",
    description:
      "Browse experiences across wildlife, culture, food, trails, and coast — or start with a guide and build from there.",
    primary: { href: "/explore?category=experiences", label: "Explore experiences" },
    secondary: { href: "/explore?category=guides", label: "Meet guides" },
    image: "/images/home/figma/experiences-hero.jpg",
  },
} as const;
