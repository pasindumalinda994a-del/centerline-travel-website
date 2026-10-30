"use client";

import { Button } from "@/app/components/ui/Button";
import {
  FilterPanel,
  type FilterState,
} from "@/app/explore/components/FilterPanel";
import type { ExploreCategory } from "@/app/lib/content/explore";

type FilterSheetProps = {
  open: boolean;
  onClose: () => void;
  category: ExploreCategory;
  value: FilterState;
  onChange: (next: FilterState) => void;
  onClear: () => void;
};

export function FilterSheet({
  open,
  onClose,
  category,
  value,
  onChange,
  onClear,
}: FilterSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-slate/50"
        aria-label="Close filters"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 max-h-[85svh] overflow-y-auto rounded-t-2xl bg-background p-4 pb-6 shadow-xl">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />
        <FilterPanel
          category={category}
          value={value}
          onChange={onChange}
          onClear={onClear}
          className="border-0 bg-transparent p-0"
        />
        <div className="sticky bottom-0 mt-4 flex gap-2 bg-background pt-2">
          <Button as="button" type="button" variant="secondary" className="flex-1" onClick={onClear}>
            Reset
          </Button>
          <Button as="button" type="button" variant="dark" className="flex-1" onClick={onClose}>
            Show results
          </Button>
        </div>
      </div>
    </div>
  );
}
