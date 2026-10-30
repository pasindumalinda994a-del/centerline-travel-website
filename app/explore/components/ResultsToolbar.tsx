import type { ExploreCategory, SortOption } from "@/app/lib/content/explore";

type ResultsToolbarProps = {
  category: ExploreCategory;
  countLabel: string;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  filterCount: number;
  onOpenFilters: () => void;
};

const sortOptions: { value: SortOption; label: string; categories?: ExploreCategory[] }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated", categories: ["stays", "guides"] },
  { value: "seats", label: "Most seats", categories: ["vehicles"] },
];

export function ResultsToolbar({
  category,
  countLabel,
  sort,
  onSortChange,
  filterCount,
  onOpenFilters,
}: ResultsToolbarProps) {
  const options = sortOptions.filter(
    (o) => !o.categories || o.categories.includes(category),
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-body font-medium text-foreground">{countLabel}</p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onOpenFilters}
          className="text-caption inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-medium text-foreground transition-colors hover:border-brand/40 lg:hidden"
        >
          Filters
          {filterCount > 0 ? (
            <span className="flex size-5 items-center justify-center rounded-full bg-brand text-[10px] text-white">
              {filterCount}
            </span>
          ) : null}
        </button>
        <label className="text-caption flex items-center gap-2 text-muted">
          Sort
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="text-body rounded-full border border-line bg-surface px-3 py-2 font-medium text-foreground outline-none focus:border-brand/40"
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
