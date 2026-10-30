import { Button } from "@/app/components/ui/Button";
import type { ExploreCategory } from "@/app/lib/content/explore";

type EmptyResultsProps = {
  category: ExploreCategory;
  onClear: () => void;
  suggestions?: string[];
  onSuggestion?: (value: string) => void;
};

export function EmptyResults({
  category,
  onClear,
  suggestions = ["Ella", "Galle", "Hill Country"],
  onSuggestion,
}: EmptyResultsProps) {
  const noun =
    category === "stays"
      ? "stays"
      : category === "vehicles"
        ? "vehicles"
        : "guides";

  return (
    <div className="rounded-2xl border border-line bg-surface px-6 py-14 text-center sm:px-10">
      <h3 className="text-h3 font-medium tracking-tight text-foreground">
        No {noun} match these filters
      </h3>
      <p className="text-body mx-auto mt-2 max-w-[36ch] text-muted">
        Try widening your search, clearing filters, or exploring a nearby region.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Button as="button" type="button" variant="dark" onClick={onClear}>
          Clear filters
        </Button>
        {suggestions.map((s) => (
          <Button
            key={s}
            as="button"
            type="button"
            variant="secondary"
            onClick={() => onSuggestion?.(s)}
          >
            Try {s}
          </Button>
        ))}
      </div>
    </div>
  );
}
