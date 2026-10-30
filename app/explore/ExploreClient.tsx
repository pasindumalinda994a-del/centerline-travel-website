"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { EmptyResults } from "@/app/explore/components/EmptyResults";
import {
  ExploreSearchShell,
  type SearchDraft,
} from "@/app/explore/components/ExploreSearchShell";
import {
  countActiveFilters,
  emptyFilterState,
  FilterPanel,
  type FilterState,
} from "@/app/explore/components/FilterPanel";
import { FilterSheet } from "@/app/explore/components/FilterSheet";
import { GuideCard } from "@/app/explore/components/GuideCard";
import { ListingSkeleton } from "@/app/explore/components/ListingSkeleton";
import { ResultsToolbar } from "@/app/explore/components/ResultsToolbar";
import { StayCard } from "@/app/explore/components/StayCard";
import { VehicleCard } from "@/app/explore/components/VehicleCard";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import {
  filterGuides,
  filterStays,
  filterVehicles,
  parseCategory,
  resultCountLabel,
  type ExploreCategory,
  type SortOption,
} from "@/app/lib/content/explore";

function splitCsv(value: string | null): string[] {
  if (!value) return [];
  return value.split(",").filter(Boolean);
}

function draftFromParams(params: URLSearchParams): SearchDraft {
  const resolved = parseCategory(params.get("category") ?? "guides");

  return {
    category: resolved,
    q: params.get("q") ?? params.get("query") ?? "",
    location: params.get("location") ?? "All Locations",
    checkIn: params.get("checkIn") ?? params.get("from") ?? "",
    checkOut: params.get("checkOut") ?? params.get("to") ?? "",
    guests: Number(params.get("guests") ?? 2) || 2,
    interest: params.get("interest") ?? "",
    pickup: params.get("pickup") ?? params.get("location") ?? "All Locations",
  };
}

function filtersFromParams(params: URLSearchParams): FilterState {
  const withDriverRaw = params.get("withDriver");
  return {
    priceMin: params.get("priceMin") ? Number(params.get("priceMin")) : undefined,
    priceMax: params.get("priceMax") ? Number(params.get("priceMax")) : undefined,
    types: splitCsv(params.get("types")),
    ratingMin: params.get("ratingMin")
      ? Number(params.get("ratingMin"))
      : undefined,
    amenities: splitCsv(params.get("amenities")),
    regions: splitCsv(params.get("regions")),
    specialties: splitCsv(params.get("specialties")),
    languages: splitCsv(params.get("languages")),
    transmission: params.get("transmission") ?? undefined,
    seatsMin: params.get("seatsMin") ? Number(params.get("seatsMin")) : undefined,
    withDriver:
      withDriverRaw === "true" ? true : withDriverRaw === "false" ? false : undefined,
  };
}

function buildQuery(
  draft: SearchDraft,
  filters: FilterState,
  sort: SortOption,
): string {
  const p = new URLSearchParams();
  p.set("category", draft.category);
  if (draft.q) p.set("q", draft.q);
  if (draft.location && draft.location !== "All Locations")
    p.set("location", draft.location);
  if (draft.checkIn) p.set("checkIn", draft.checkIn);
  if (draft.checkOut) p.set("checkOut", draft.checkOut);
  if (draft.category === "stays" && draft.guests) p.set("guests", String(draft.guests));
  if (draft.interest) p.set("interest", draft.interest);
  if (draft.category === "vehicles" && draft.pickup && draft.pickup !== "All Locations")
    p.set("pickup", draft.pickup);
  if (sort !== "relevance") p.set("sort", sort);
  if (filters.priceMin != null) p.set("priceMin", String(filters.priceMin));
  if (filters.priceMax != null) p.set("priceMax", String(filters.priceMax));
  if (filters.types.length) p.set("types", filters.types.join(","));
  if (filters.ratingMin != null) p.set("ratingMin", String(filters.ratingMin));
  if (filters.amenities.length) p.set("amenities", filters.amenities.join(","));
  if (filters.regions.length) p.set("regions", filters.regions.join(","));
  if (filters.specialties.length) p.set("specialties", filters.specialties.join(","));
  if (filters.languages.length) p.set("languages", filters.languages.join(","));
  if (filters.transmission) p.set("transmission", filters.transmission);
  if (filters.seatsMin != null) p.set("seatsMin", String(filters.seatsMin));
  if (filters.withDriver != null) p.set("withDriver", String(filters.withDriver));
  return p.toString();
}

const quickChips: Record<ExploreCategory, string[]> = {
  stays: ["Pool", "Boutique", "Hill Country", "Southern Coast"],
  guides: ["Hiking", "Wildlife", "Culture", "English"],
  vehicles: ["Automatic", "With driver", "4×4", "Motorbike"],
};

function toggle(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export function ExploreClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const paramsKey = searchParams.toString();
  const applied = useMemo(
    () => draftFromParams(new URLSearchParams(paramsKey)),
    [paramsKey],
  );
  const filters = useMemo(
    () => filtersFromParams(new URLSearchParams(paramsKey)),
    [paramsKey],
  );
  const sort: SortOption =
    (searchParams.get("sort") as SortOption) || "relevance";

  const [draft, setDraft] = useState(() => draftFromParams(searchParams));
  const [draftParamsKey, setDraftParamsKey] = useState(paramsKey);
  if (paramsKey !== draftParamsKey) {
    setDraftParamsKey(paramsKey);
    setDraft(draftFromParams(new URLSearchParams(paramsKey)));
  }

  const [loading, setLoading] = useState(false);
  const [stickyCompact, setStickyCompact] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const compact = window.scrollY > 220;
      setStickyCompact(compact);
      if (!compact) setSearchExpanded(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pushState = useCallback(
    (nextDraft: SearchDraft, nextFilters: FilterState, nextSort: SortOption) => {
      const qs = buildQuery(nextDraft, nextFilters, nextSort);
      setLoading(true);
      startTransition(() => {
        router.replace(qs ? `/explore?${qs}` : "/explore", { scroll: false });
      });
      window.setTimeout(() => setLoading(false), 280);
    },
    [router],
  );

  const applySearch = useCallback(() => {
    pushState(draft, filters, sort);
    setSearchExpanded(false);
  }, [draft, filters, sort, pushState]);

  const updateFilters = useCallback(
    (next: FilterState) => {
      pushState(applied, next, sort);
    },
    [applied, sort, pushState],
  );

  const clearFilters = useCallback(() => {
    pushState(applied, emptyFilterState(), sort);
  }, [applied, sort, pushState]);

  const updateSort = useCallback(
    (next: SortOption) => {
      pushState(applied, filters, next);
    },
    [applied, filters, pushState],
  );

  const results = useMemo(() => {
    const params = {
      category: applied.category,
      q: applied.q,
      location: applied.location,
      checkIn: applied.checkIn,
      checkOut: applied.checkOut,
      guests: applied.guests,
      interest: applied.interest,
      pickup: applied.pickup,
      sort,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      types: filters.types,
      ratingMin: filters.ratingMin,
      amenities: filters.amenities,
      regions: filters.regions,
      specialties: filters.specialties,
      languages: filters.languages,
      transmission: filters.transmission,
      seatsMin: filters.seatsMin,
      withDriver: filters.withDriver,
    };

    if (applied.category === "stays") return filterStays(params);
    if (applied.category === "vehicles") return filterVehicles(params);
    return filterGuides(params);
  }, [applied, filters, sort]);

  const filterCount = countActiveFilters(filters);
  const countLabel = resultCountLabel(
    applied.category,
    results.length,
    applied.category === "vehicles" ? applied.pickup : applied.location,
  );

  const applyQuickChip = (chip: string) => {
    const next = { ...filters };
    if (applied.category === "stays") {
      if (chip === "Pool") next.amenities = toggle(next.amenities, "Pool");
      else if (chip === "Boutique") next.types = toggle(next.types, "Boutique");
      else next.regions = toggle(next.regions, chip);
    } else if (applied.category === "guides") {
      if (chip === "English") next.languages = toggle(next.languages, "English");
      else next.specialties = toggle(next.specialties, chip);
    } else if (chip === "Automatic") {
      next.transmission =
        next.transmission === "Automatic" ? undefined : "Automatic";
    } else if (chip === "With driver") {
      next.withDriver = next.withDriver === true ? undefined : true;
    } else {
      next.types = toggle(next.types, chip);
    }
    updateFilters(next);
  };

  const showCompactBar = stickyCompact && !searchExpanded;
  const showSkeleton = loading || isPending;

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <div className="mb-8 max-w-[40ch] lg:mb-10">
        <Eyebrow>Explore</Eyebrow>
        <h1 className="text-h2 mt-3 leading-[1.05] font-medium tracking-[-0.03em] text-foreground">
          Discover Sri Lanka <span className="text-stone">your way</span>
        </h1>
        <p className="text-body mt-3 leading-relaxed text-muted">
          Search guides, stays, and vehicles across the island — curated for routes beyond the usual trail.
        </p>
      </div>

      <div className={`z-30 ${showCompactBar ? "sticky top-[4.25rem] mb-4" : "relative mb-6"}`}>
        <ExploreSearchShell
          value={draft}
          onChange={setDraft}
          onSubmit={applySearch}
          compact={showCompactBar}
          onExpand={() => setSearchExpanded(true)}
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {quickChips[applied.category].map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => applyQuickChip(chip)}
            className="text-caption rounded-full border border-line bg-surface px-3 py-1.5 font-medium text-foreground transition-colors hover:border-brand/40"
          >
            {chip}
          </button>
        ))}
      </div>

      {filterCount > 0 ? (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-caption text-muted">Active</span>
          {filters.types.map((t) => (
            <span
              key={`t-${t}`}
              className="text-caption rounded-full border border-line bg-surface px-3 py-1 font-medium text-foreground"
            >
              {t}
            </span>
          ))}
          {filters.amenities.map((a) => (
            <span
              key={`a-${a}`}
              className="text-caption rounded-full border border-line bg-surface px-3 py-1 font-medium text-foreground"
            >
              {a}
            </span>
          ))}
          {filters.regions.map((r) => (
            <span
              key={`r-${r}`}
              className="text-caption rounded-full border border-line bg-surface px-3 py-1 font-medium text-foreground"
            >
              {r}
            </span>
          ))}
          {filters.specialties.map((s) => (
            <span
              key={`s-${s}`}
              className="text-caption rounded-full border border-line bg-surface px-3 py-1 font-medium text-foreground"
            >
              {s}
            </span>
          ))}
          {filters.languages.map((l) => (
            <span
              key={`l-${l}`}
              className="text-caption rounded-full border border-line bg-surface px-3 py-1 font-medium text-foreground"
            >
              {l}
            </span>
          ))}
          {filters.transmission ? (
            <span className="text-caption rounded-full border border-line bg-surface px-3 py-1 font-medium text-foreground">
              {filters.transmission}
            </span>
          ) : null}
          {filters.withDriver === true ? (
            <span className="text-caption rounded-full border border-line bg-surface px-3 py-1 font-medium text-foreground">
              With driver
            </span>
          ) : null}
          {filters.withDriver === false ? (
            <span className="text-caption rounded-full border border-line bg-surface px-3 py-1 font-medium text-foreground">
              Self-drive
            </span>
          ) : null}
          {filters.ratingMin != null ? (
            <span className="text-caption rounded-full border border-line bg-surface px-3 py-1 font-medium text-foreground">
              {filters.ratingMin}+ rating
            </span>
          ) : null}
          <button
            type="button"
            onClick={clearFilters}
            className="text-caption font-medium text-brand hover:opacity-70"
          >
            Clear all
          </button>
        </div>
      ) : null}

      <ResultsToolbar
        category={applied.category}
        countLabel={countLabel}
        sort={sort}
        onSortChange={updateSort}
        filterCount={filterCount}
        onOpenFilters={() => setFiltersOpen(true)}
      />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <FilterPanel
              category={applied.category}
              value={filters}
              onChange={updateFilters}
              onClear={clearFilters}
            />
          </div>
        </div>

        <div
          className={`min-w-0 transition-opacity duration-300 motion-reduce:transition-none ${
            showSkeleton ? "opacity-70" : "opacity-100"
          }`}
        >
          {showSkeleton ? (
            <ListingSkeleton category={applied.category} />
          ) : results.length === 0 ? (
            <EmptyResults
              category={applied.category}
              onClear={clearFilters}
              onSuggestion={(loc) => {
                const next = { ...applied, location: loc, pickup: loc };
                setDraft(next);
                pushState(next, emptyFilterState(), sort);
              }}
            />
          ) : applied.category === "stays" ? (
            <div className="flex flex-col gap-3 lg:gap-4">
              {(results as ReturnType<typeof filterStays>).map((stay) => (
                <StayCard key={stay.id} stay={stay} />
              ))}
            </div>
          ) : applied.category === "guides" ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {(results as ReturnType<typeof filterGuides>).map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {(results as ReturnType<typeof filterVehicles>).map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </div>
      </div>

      <FilterSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        category={applied.category}
        value={filters}
        onChange={updateFilters}
        onClear={clearFilters}
      />
    </div>
  );
}
