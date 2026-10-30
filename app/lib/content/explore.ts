export type ExploreCategory = "guides" | "stays" | "vehicles";

export type SortOption = "relevance" | "price-asc" | "price-desc" | "rating" | "seats";

export type StayType = "Hotel" | "Villa" | "Boutique" | "Homestay" | "Eco lodge";

export type VehicleType =
  | "Car"
  | "Van"
  | "SUV"
  | "Motorbike"
  | "Tuk Tuk"
  | "4×4";

export type Stay = {
  id: string;
  slug: string;
  title: string;
  location: string;
  region: string;
  type: StayType;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  amenities: string[];
  images: string[];
  description: string;
  highlights: string[];
};

export type Guide = {
  id: string;
  slug: string;
  name: string;
  role: string;
  region: string;
  specialties: string[];
  languages: string[];
  years: number;
  rating: number;
  quote: string;
  bio: string;
  image: string;
  priceFrom: number;
};

export type Vehicle = {
  id: string;
  slug: string;
  title: string;
  type: VehicleType;
  location: string;
  region: string;
  transmission: "Automatic" | "Manual";
  seats: number;
  withDriver: boolean;
  pricePerDay: number;
  features: string[];
  images: string[];
  description: string;
};

export type ExploreSearchParams = {
  category: ExploreCategory;
  q?: string;
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  interest?: string;
  pickup?: string;
  sort?: SortOption;
  priceMin?: number;
  priceMax?: number;
  types?: string[];
  ratingMin?: number;
  amenities?: string[];
  regions?: string[];
  specialties?: string[];
  languages?: string[];
  transmission?: string;
  seatsMin?: number;
  withDriver?: boolean;
};

export const exploreCategories = [
  { id: "guides" as const, label: "Guides" },
  { id: "stays" as const, label: "Stays" },
  { id: "vehicles" as const, label: "Vehicles" },
];

export const exploreLocations = [
  "All Locations",
  "Colombo",
  "Kandy",
  "Ella",
  "Galle",
  "Nuwara Eliya",
  "Southern Coast",
  "Hill Country",
  "Cultural Triangle",
] as const;

export const guideInterests = ["Coast", "Hills", "Wildlife", "Culture"] as const;

export const stayAmenities = [
  "Pool",
  "Breakfast",
  "Wi‑Fi",
  "AC",
  "Parking",
  "Ocean view",
  "Garden",
  "Airport transfer",
] as const;

export const stayTypes: StayType[] = [
  "Hotel",
  "Villa",
  "Boutique",
  "Homestay",
  "Eco lodge",
];

export const vehicleTypes: VehicleType[] = [
  "Car",
  "Van",
  "SUV",
  "Motorbike",
  "Tuk Tuk",
  "4×4",
];

export const guideSpecialties = [
  "Hiking",
  "Wildlife",
  "Culture",
  "Food",
  "Surf",
  "Photography",
] as const;

export const guideLanguages = [
  "English",
  "Sinhala",
  "Tamil",
  "German",
  "French",
] as const;

export const exploreRegions = [
  "Southern Coast",
  "Hill Country",
  "Cultural Triangle",
  "Colombo & West",
  "East Coast",
  "North",
] as const;

const img = (name: string) => `/images/home/figma/${name}`;

export const stays: Stay[] = [
  {
    id: "s1",
    slug: "ella-mist-lodge",
    title: "Ella Mist Lodge",
    location: "Ella",
    region: "Hill Country",
    type: "Boutique",
    rating: 9.2,
    reviewCount: 186,
    priceFrom: 95,
    amenities: ["Breakfast", "Wi‑Fi", "Garden", "Parking"],
    images: [img("stays-hero.jpg"), img("dest-hills.jpg"), img("dest-extra-04.jpg")],
    description:
      "A quiet hillside lodge overlooking tea country, with rooms that open to misty mornings and ridge walks minutes from the door.",
    highlights: ["Tea estate views", "Walk to Little Adam’s Peak", "Homemade breakfast"],
  },
  {
    id: "s2",
    slug: "galle-fort-house",
    title: "Galle Fort House",
    location: "Galle",
    region: "Southern Coast",
    type: "Villa",
    rating: 9.4,
    reviewCount: 142,
    priceFrom: 140,
    amenities: ["Pool", "Wi‑Fi", "AC", "Ocean view"],
    images: [img("dest-extra-05.jpg"), img("dest-southern.jpg"), img("dest-beaches.jpg")],
    description:
      "A restored colonial villa inside the fort walls — courtyard pool, sea breeze evenings, and the ramparts at your doorstep.",
    highlights: ["Inside Galle Fort", "Private courtyard pool", "Walking distance to cafés"],
  },
  {
    id: "s3",
    slug: "kandy-lake-retreat",
    title: "Kandy Lake Retreat",
    location: "Kandy",
    region: "Hill Country",
    type: "Hotel",
    rating: 8.9,
    reviewCount: 320,
    priceFrom: 78,
    amenities: ["Breakfast", "Wi‑Fi", "Parking", "AC"],
    images: [img("dest-cultural.jpg"), img("about.jpg"), img("stays-2.jpg")],
    description:
      "Calm rooms above the lake with temple views and easy access to the botanical gardens and hill-country trains.",
    highlights: ["Lake views", "Temple nearby", "Train station transfer"],
  },
  {
    id: "s4",
    slug: "mirissa-shore-villa",
    title: "Mirissa Shore Villa",
    location: "Southern Coast",
    region: "Southern Coast",
    type: "Villa",
    rating: 9.1,
    reviewCount: 98,
    priceFrom: 160,
    amenities: ["Pool", "Ocean view", "Wi‑Fi", "AC", "Breakfast"],
    images: [img("dest-beaches.jpg"), img("dest-extra-05.jpg"), img("experiences-hero.jpg")],
    description:
      "Open-plan villa steps from the sand — whale season sunrises, palm shade, and a pool facing the Indian Ocean.",
    highlights: ["Beach access", "Whale watching season", "Chef on request"],
  },
  {
    id: "s5",
    slug: "nuwara-eliya-tea-bungalow",
    title: "Tea Bungalow Nuwara Eliya",
    location: "Nuwara Eliya",
    region: "Hill Country",
    type: "Homestay",
    rating: 9.0,
    reviewCount: 74,
    priceFrom: 65,
    amenities: ["Breakfast", "Garden", "Parking", "Wi‑Fi"],
    images: [img("dest-extra-04.jpg"), img("dest-hills.jpg"), img("journal-1.jpg")],
    description:
      "A family bungalow among the tea rows — fireplaces on cool evenings and hosts who know every waterfall trail.",
    highlights: ["Tea plantation stay", "Home-cooked meals", "Cool climate"],
  },
  {
    id: "s6",
    slug: "yala-edge-camp",
    title: "Yala Edge Camp",
    location: "Cultural Triangle",
    region: "Cultural Triangle",
    type: "Eco lodge",
    rating: 8.8,
    reviewCount: 112,
    priceFrom: 110,
    amenities: ["Breakfast", "Parking", "Garden", "Airport transfer"],
    images: [img("dest-wildlife.jpg"), img("hidden-1.jpg"), img("rental-camp.jpg")],
    description:
      "Canvas and timber lodges on the park edge — dawn safaris, starry nights, and guides who wait for the leopard.",
    highlights: ["Near Yala", "Safari packages", "Low-impact design"],
  },
  {
    id: "s7",
    slug: "colombo-harbour-suites",
    title: "Harbour Suites Colombo",
    location: "Colombo",
    region: "Colombo & West",
    type: "Hotel",
    rating: 8.7,
    reviewCount: 410,
    priceFrom: 120,
    amenities: ["Pool", "Wi‑Fi", "AC", "Breakfast", "Airport transfer"],
    images: [img("about-2.jpg"), img("events.jpg"), img("journal-2.jpg")],
    description:
      "City suites with harbour light — ideal first or last night before the island opens up beyond the capital.",
    highlights: ["Harbour views", "Airport proximity", "Rooftop pool"],
  },
  {
    id: "s8",
    slug: "sigiriya-rock-garden",
    title: "Sigiriya Rock Garden",
    location: "Cultural Triangle",
    region: "Cultural Triangle",
    type: "Boutique",
    rating: 9.3,
    reviewCount: 156,
    priceFrom: 135,
    amenities: ["Pool", "Breakfast", "Wi‑Fi", "Garden", "Parking"],
    images: [img("dest-northern.jpg"), img("dest-cultural.jpg"), img("guide-culture.jpg")],
    description:
      "Garden villas with the rock fortress on the horizon — pool mornings and temple circuits by bicycle.",
    highlights: ["Sigiriya views", "Bicycle trails", "Ayurveda spa"],
  },
  {
    id: "s9",
    slug: "hiriketiya-surf-house",
    title: "Hiriketiya Surf House",
    location: "Southern Coast",
    region: "Southern Coast",
    type: "Homestay",
    rating: 8.6,
    reviewCount: 89,
    priceFrom: 55,
    amenities: ["Wi‑Fi", "Garden", "Parking", "Breakfast"],
    images: [img("rental-extra-06.jpg"), img("dest-southern.jpg"), img("journal-extra-02.jpg")],
    description:
      "A laid-back surf house a short walk from the bay — shared kitchen, hammocks, and board racks by the gate.",
    highlights: ["Near Hiriketiya bay", "Board storage", "Community vibe"],
  },
  {
    id: "s10",
    slug: "haputale-ridge-eco",
    title: "Haputale Ridge Eco",
    location: "Ella",
    region: "Hill Country",
    type: "Eco lodge",
    rating: 9.1,
    reviewCount: 67,
    priceFrom: 88,
    amenities: ["Breakfast", "Garden", "Wi‑Fi", "Parking"],
    images: [img("hidden-2.jpg"), img("dest-extra-04.jpg"), img("experiences-2.jpg")],
    description:
      "Off-grid comfort on a misty ridge — solar power, organic gardens, and cloud forests at walking pace.",
    highlights: ["Eco stay", "Ridge walks", "Organic kitchen"],
  },
];

export const guides: Guide[] = [
  {
    id: "g1",
    slug: "nimal-perera",
    name: "Nimal Perera",
    role: "Hiking Guide",
    region: "Hill Country",
    specialties: ["Hiking", "Photography"],
    languages: ["English", "Sinhala"],
    years: 12,
    rating: 4.9,
    quote: "The best views are always one ridge past where most people stop.",
    bio: "Nimal has spent over a decade mapping quieter paths through the hill country — from Ella’s ridgelines to Knuckles trails few visitors ever hear about.",
    image: img("guide-adventure.jpg"),
    priceFrom: 45,
  },
  {
    id: "g2",
    slug: "amaya-fernando",
    name: "Amaya Fernando",
    role: "Cultural Guide",
    region: "Cultural Triangle",
    specialties: ["Culture", "Food"],
    languages: ["English", "Sinhala", "French"],
    years: 9,
    rating: 4.9,
    quote: "Every stone here has a story — you just need someone to read it.",
    bio: "Amaya brings temples, markets, and ancient cities to life with stories that sit between guidebook facts and lived tradition.",
    image: img("guide-extra-02.jpg"),
    priceFrom: 50,
  },
  {
    id: "g3",
    slug: "kasun-jayasuriya",
    name: "Kasun Jayasuriya",
    role: "Wildlife Guide",
    region: "Cultural Triangle",
    specialties: ["Wildlife", "Photography"],
    languages: ["English", "Sinhala"],
    years: 11,
    rating: 5.0,
    quote: "You don't find the leopard. You learn to wait where it walks.",
    bio: "Kasun specialises in patient park safaris across Yala and Wilpattu — early starts, quiet observation, and respect for the wild.",
    image: img("guide-extra-04.jpg"),
    priceFrom: 60,
  },
  {
    id: "g4",
    slug: "dilani-silva",
    name: "Dilani Silva",
    role: "Coastal Guide",
    region: "Southern Coast",
    specialties: ["Surf", "Food", "Culture"],
    languages: ["English", "Sinhala", "German"],
    years: 7,
    rating: 4.8,
    quote: "The south coast rewards people who slow down between the beaches.",
    bio: "Dilani connects surf towns, fishing harbours, and family kitchens along the southern coast — the island’s saltier side.",
    image: img("guide-travel.jpg"),
    priceFrom: 40,
  },
  {
    id: "g5",
    slug: "ruwan-bandara",
    name: "Ruwan Bandara",
    role: "Adventure Guide",
    region: "Hill Country",
    specialties: ["Hiking", "Wildlife"],
    languages: ["English", "Sinhala", "Tamil"],
    years: 10,
    rating: 4.8,
    quote: "The trail is never just the trail — it's who you share it with.",
    bio: "Ruwan leads small-group adventures through tea country and cloud forest, with a focus on safety and unhurried discovery.",
    image: img("guide-extra-01.jpg"),
    priceFrom: 48,
  },
  {
    id: "g6",
    slug: "meera-raj",
    name: "Meera Raj",
    role: "Food & Culture Guide",
    region: "Colombo & West",
    specialties: ["Food", "Culture"],
    languages: ["English", "Tamil", "Sinhala"],
    years: 6,
    rating: 4.7,
    quote: "Colombo tastes different when you follow the locals, not the hotels.",
    bio: "Meera’s walking tastings move through markets, short-eats stalls, and family kitchens across Colombo and the west coast.",
    image: img("guide-culture.jpg"),
    priceFrom: 35,
  },
  {
    id: "g7",
    slug: "thilina-fernando",
    name: "Thilina Fernando",
    role: "Photography Guide",
    region: "Southern Coast",
    specialties: ["Photography", "Surf"],
    languages: ["English", "Sinhala"],
    years: 8,
    rating: 4.9,
    quote: "Golden hour on this coast is worth waking up for — every time.",
    bio: "Thilina scouts light across beaches, lagoons, and fishing harbours — ideal for travelers who want more than phone snaps.",
    image: img("guide-extra-03.jpg"),
    priceFrom: 55,
  },
  {
    id: "g8",
    slug: "samanthi-perera",
    name: "Samanthi Perera",
    role: "Heritage Guide",
    region: "Cultural Triangle",
    specialties: ["Culture", "Hiking"],
    languages: ["English", "Sinhala", "French"],
    years: 14,
    rating: 5.0,
    quote: "History here isn't behind glass — it's still walking the paths.",
    bio: "Samanthi has guided the Cultural Triangle for fourteen years, with a soft spot for quieter ruins beyond the main circuits.",
    image: img("guide-extra-05.jpg"),
    priceFrom: 52,
  },
];

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    slug: "compact-island-car",
    title: "Compact Island Car",
    type: "Car",
    location: "Colombo",
    region: "Colombo & West",
    transmission: "Automatic",
    seats: 4,
    withDriver: false,
    pricePerDay: 35,
    features: ["AC", "Bluetooth", "Fuel efficient"],
    images: [img("rental-car.jpg"), img("rental-extra-02.jpg")],
    description:
      "A reliable automatic for coastal and city routes — easy parking and low fuel use for longer island loops.",
  },
  {
    id: "v2",
    slug: "scenic-motorbike",
    title: "Scenic Motorbike 150cc",
    type: "Motorbike",
    location: "Ella",
    region: "Hill Country",
    transmission: "Manual",
    seats: 2,
    withDriver: false,
    pricePerDay: 12,
    features: ["Helmets included", "Light luggage rack"],
    images: [img("rental-bike.jpg"), img("rental-extra-01.jpg")],
    description:
      "Perfect for tea-country switchbacks and short coastal hops when you want to stop wherever the view opens.",
  },
  {
    id: "v3",
    slug: "classic-tuk-tuk",
    title: "Classic Tuk Tuk",
    type: "Tuk Tuk",
    location: "Galle",
    region: "Southern Coast",
    transmission: "Manual",
    seats: 3,
    withDriver: true,
    pricePerDay: 28,
    features: ["Local driver", "Flexible day rate"],
    images: [img("rental-tuk.jpg"), img("rental-extra-05.jpg")],
    description:
      "The island classic — with a local driver who knows the shortcuts between beaches, markets, and viewpoints.",
  },
  {
    id: "v4",
    slug: "offroad-4x4",
    title: "Off-Road 4×4",
    type: "4×4",
    location: "Kandy",
    region: "Hill Country",
    transmission: "Manual",
    seats: 5,
    withDriver: false,
    pricePerDay: 65,
    features: ["High clearance", "Roof rack", "AC"],
    images: [img("rental-4x4.jpg"), img("rental-extra-03.jpg")],
    description:
      "Built for rough park approaches and mountain roads — when the paved route is only the beginning.",
  },
  {
    id: "v5",
    slug: "family-van",
    title: "Family Van",
    type: "Van",
    location: "Colombo",
    region: "Colombo & West",
    transmission: "Automatic",
    seats: 7,
    withDriver: true,
    pricePerDay: 75,
    features: ["AC", "Luggage space", "Driver included"],
    images: [img("rental-extra-04.jpg"), img("rental-extra-02.jpg")],
    description:
      "Spacious van with driver for group itineraries — airport runs, multi-stop days, and comfortable hill climbs.",
  },
  {
    id: "v6",
    slug: "coastal-suv",
    title: "Coastal SUV",
    type: "SUV",
    location: "Southern Coast",
    region: "Southern Coast",
    transmission: "Automatic",
    seats: 5,
    withDriver: false,
    pricePerDay: 55,
    features: ["AC", "Bluetooth", "High clearance"],
    images: [img("rental-extra-03.jpg"), img("rental-car.jpg")],
    description:
      "Comfortable SUV for mixed coast and inland routes — space for boards, bags, and weekend detours.",
  },
  {
    id: "v7",
    slug: "nuwara-eliya-car",
    title: "Hill Country Hatchback",
    type: "Car",
    location: "Nuwara Eliya",
    region: "Hill Country",
    transmission: "Manual",
    seats: 4,
    withDriver: false,
    pricePerDay: 30,
    features: ["Fuel efficient", "Heater"],
    images: [img("rental-extra-02.jpg"), img("rental-extra-01.jpg")],
    description:
      "A nimble hatchback for cool-climate drives between tea estates, waterfalls, and viewpoint pulls.",
  },
  {
    id: "v8",
    slug: "safari-ready-4x4",
    title: "Safari-Ready 4×4",
    type: "4×4",
    location: "Cultural Triangle",
    region: "Cultural Triangle",
    transmission: "Manual",
    seats: 6,
    withDriver: true,
    pricePerDay: 85,
    features: ["Driver-guide option", "Cooler box", "High clearance"],
    images: [img("rental-4x4.jpg"), img("dest-wildlife.jpg")],
    description:
      "Park-edge 4×4 with optional driver-guide — timed for dawn gates and dusty afternoon returns.",
  },
  {
    id: "v9",
    slug: "ella-scooter",
    title: "Ella Town Scooter",
    type: "Motorbike",
    location: "Ella",
    region: "Hill Country",
    transmission: "Automatic",
    seats: 2,
    withDriver: false,
    pricePerDay: 10,
    features: ["Helmets included", "Easy automatic"],
    images: [img("rental-bike.jpg"), img("rental-extra-06.jpg")],
    description:
      "Automatic scooter for short Ella hops — cafés, viewpoints, and waterfall pulls without the car park hunt.",
  },
  {
    id: "v10",
    slug: "airport-transfer-van",
    title: "Airport Transfer Van",
    type: "Van",
    location: "Colombo",
    region: "Colombo & West",
    transmission: "Automatic",
    seats: 6,
    withDriver: true,
    pricePerDay: 70,
    features: ["Meet & greet", "Flight tracking", "AC"],
    images: [img("rental-extra-04.jpg"), img("about-2.jpg")],
    description:
      "Reliable airport van with meet-and-greet — the calm start or end to any island itinerary.",
  },
];

export function mapHeroCategory(raw: string | null | undefined): ExploreCategory {
  const value = (raw ?? "").toLowerCase();
  if (value.includes("hotel") || value.includes("stay")) return "stays";
  if (value.includes("vehicle") || value.includes("rental") || value.includes("car"))
    return "vehicles";
  if (value.includes("guide")) return "guides";
  return "guides";
}

export function parseCategory(raw: string | null | undefined): ExploreCategory {
  if (raw === "stays" || raw === "vehicles" || raw === "guides") return raw;
  return mapHeroCategory(raw);
}

function matchesLocation(
  itemLocation: string,
  itemRegion: string,
  location?: string,
): boolean {
  if (!location || location === "All Locations") return true;
  const needle = location.toLowerCase();
  return (
    itemLocation.toLowerCase().includes(needle) ||
    itemRegion.toLowerCase().includes(needle) ||
    needle.includes(itemLocation.toLowerCase()) ||
    needle.includes(itemRegion.toLowerCase())
  );
}

function matchesQuery(haystacks: string[], q?: string): boolean {
  if (!q?.trim()) return true;
  const needle = q.trim().toLowerCase();
  return haystacks.some((h) => h.toLowerCase().includes(needle));
}

export function filterStays(params: ExploreSearchParams): Stay[] {
  let list = stays.filter((item) => {
    if (!matchesLocation(item.location, item.region, params.location)) return false;
    if (
      !matchesQuery(
        [item.title, item.location, item.region, item.type, ...item.amenities],
        params.q,
      )
    )
      return false;
    if (params.priceMin != null && item.priceFrom < params.priceMin) return false;
    if (params.priceMax != null && item.priceFrom > params.priceMax) return false;
    if (params.ratingMin != null && item.rating < params.ratingMin) return false;
    if (params.types?.length && !params.types.includes(item.type)) return false;
    if (params.regions?.length && !params.regions.includes(item.region)) return false;
    if (
      params.amenities?.length &&
      !params.amenities.every((a) => item.amenities.includes(a))
    )
      return false;
    return true;
  });

  list = sortBy(list, params.sort, (s) => s.priceFrom, (s) => s.rating);
  return list;
}

export function filterGuides(params: ExploreSearchParams): Guide[] {
  let list = guides.filter((item) => {
    if (!matchesLocation(item.region, item.region, params.location)) return false;
    if (
      !matchesQuery(
        [item.name, item.role, item.region, ...item.specialties, ...item.languages],
        params.q,
      )
    )
      return false;
    if (params.interest) {
      const interestMap: Record<string, string[]> = {
        Coast: ["Surf", "Food"],
        Hills: ["Hiking", "Photography"],
        Wildlife: ["Wildlife", "Photography"],
        Culture: ["Culture", "Food"],
      };
      const needed = interestMap[params.interest] ?? [];
      if (needed.length && !needed.some((s) => item.specialties.includes(s)))
        return false;
    }
    if (params.priceMin != null && item.priceFrom < params.priceMin) return false;
    if (params.priceMax != null && item.priceFrom > params.priceMax) return false;
    if (params.ratingMin != null && item.rating < params.ratingMin) return false;
    if (params.regions?.length && !params.regions.includes(item.region)) return false;
    if (
      params.specialties?.length &&
      !params.specialties.some((s) => item.specialties.includes(s))
    )
      return false;
    if (
      params.languages?.length &&
      !params.languages.some((l) => item.languages.includes(l))
    )
      return false;
    return true;
  });

  list = sortBy(list, params.sort, (g) => g.priceFrom, (g) => g.rating);
  return list;
}

export function filterVehicles(params: ExploreSearchParams): Vehicle[] {
  const loc = params.pickup || params.location;
  let list = vehicles.filter((item) => {
    if (!matchesLocation(item.location, item.region, loc)) return false;
    if (
      !matchesQuery(
        [item.title, item.type, item.location, item.region, ...item.features],
        params.q,
      )
    )
      return false;
    if (params.priceMin != null && item.pricePerDay < params.priceMin) return false;
    if (params.priceMax != null && item.pricePerDay > params.priceMax) return false;
    if (params.types?.length && !params.types.includes(item.type)) return false;
    if (params.transmission && item.transmission !== params.transmission) return false;
    if (params.seatsMin != null && item.seats < params.seatsMin) return false;
    if (params.withDriver === true && !item.withDriver) return false;
    if (params.withDriver === false && item.withDriver) return false;
    if (params.regions?.length && !params.regions.includes(item.region)) return false;
    return true;
  });

  if (params.sort === "seats") {
    list = [...list].sort((a, b) => b.seats - a.seats);
  } else {
    list = sortBy(list, params.sort, (v) => v.pricePerDay, () => 0);
  }
  return list;
}

function sortBy<T>(
  list: T[],
  sort: SortOption | undefined,
  price: (item: T) => number,
  rating: (item: T) => number,
): T[] {
  const next = [...list];
  switch (sort) {
    case "price-asc":
      return next.sort((a, b) => price(a) - price(b));
    case "price-desc":
      return next.sort((a, b) => price(b) - price(a));
    case "rating":
      return next.sort((a, b) => rating(b) - rating(a));
    default:
      return next;
  }
}

export function getStayBySlug(slug: string): Stay | undefined {
  return stays.find((s) => s.slug === slug);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function relatedStays(stay: Stay, limit = 3): Stay[] {
  return stays
    .filter((s) => s.id !== stay.id && (s.region === stay.region || s.location === stay.location))
    .slice(0, limit);
}

export function relatedGuides(guide: Guide, limit = 3): Guide[] {
  return guides
    .filter(
      (g) =>
        g.id !== guide.id &&
        (g.region === guide.region ||
          g.specialties.some((s) => guide.specialties.includes(s))),
    )
    .slice(0, limit);
}

export function relatedVehicles(vehicle: Vehicle, limit = 3): Vehicle[] {
  return vehicles
    .filter(
      (v) =>
        v.id !== vehicle.id &&
        (v.region === vehicle.region || v.type === vehicle.type),
    )
    .slice(0, limit);
}

export function formatPrice(amount: number, suffix = ""): string {
  return `$${amount}${suffix}`;
}

export function categoryLabel(category: ExploreCategory): string {
  switch (category) {
    case "stays":
      return "stays";
    case "vehicles":
      return "vehicles";
    case "guides":
      return "guides";
  }
}

export function resultCountLabel(
  category: ExploreCategory,
  count: number,
  location?: string,
): string {
  const place =
    location && location !== "All Locations" ? ` in ${location}` : " across Sri Lanka";
  const noun =
    category === "stays"
      ? count === 1
        ? "stay"
        : "stays"
      : category === "vehicles"
        ? count === 1
          ? "vehicle"
          : "vehicles"
        : count === 1
          ? "guide"
          : "guides";
  return `${count} ${noun}${place}`;
}
