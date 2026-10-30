"use client";

import { CtaButton } from "@/app/components/ui/CtaButton";
import {
  exploreCategories,
  exploreLocations,
  guideInterests,
  type ExploreCategory,
} from "@/app/lib/content/explore";

export type SearchDraft = {
  category: ExploreCategory;
  q: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  interest: string;
  pickup: string;
};

type ExploreSearchShellProps = {
  value: SearchDraft;
  onChange: (next: SearchDraft) => void;
  onSubmit: () => void;
  compact?: boolean;
  onExpand?: () => void;
};

const fieldClass =
  "text-body h-11 w-full appearance-none rounded-full border border-line bg-background px-4 text-foreground outline-none placeholder:text-muted focus:border-brand/40";

const labelClass = "text-caption px-1 text-muted";

function ctaLabel(category: ExploreCategory): string {
  switch (category) {
    case "stays":
      return "Show stays";
    case "vehicles":
      return "Find a vehicle";
    case "guides":
      return "Find a guide";
  }
}

export function ExploreSearchShell({
  value,
  onChange,
  onSubmit,
  compact = false,
  onExpand,
}: ExploreSearchShellProps) {
  if (compact) {
    const parts = [
      value.location && value.location !== "All Locations" ? value.location : null,
      value.checkIn && value.checkOut
        ? `${value.checkIn} – ${value.checkOut}`
        : null,
      value.q || null,
    ].filter(Boolean);

    return (
      <button
        type="button"
        onClick={onExpand}
        className="flex w-full items-center justify-between gap-3 rounded-full border border-line bg-surface px-4 py-2.5 text-left shadow-sm transition-colors hover:border-brand/30"
      >
        <span className="text-caption truncate font-medium text-foreground">
          {parts.length ? parts.join(" · ") : "Edit search"}
        </span>
        <span className="text-caption shrink-0 rounded-full bg-brand px-3 py-1 font-medium text-white">
          Edit
        </span>
      </button>
    );
  }

  return (
    <form
      className="rounded-2xl border border-line bg-surface p-4 sm:p-5"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div
        className="mb-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Explore category"
      >
        {exploreCategories.map((cat) => {
          const active = value.category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange({ ...value, category: cat.id })}
              className={`text-caption rounded-full px-4 py-2 font-medium transition-colors ${
                active
                  ? "bg-brand text-white"
                  : "border border-line bg-background text-foreground hover:border-brand/40"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
        <div className="flex flex-col gap-1.5 lg:col-span-4">
          <label htmlFor="explore-q" className={labelClass}>
            What are you looking for
          </label>
          <input
            id="explore-q"
            type="search"
            value={value.q}
            onChange={(e) => onChange({ ...value, q: e.target.value })}
            placeholder={
              value.category === "stays"
                ? "Hotel, villa, lodge…"
                : value.category === "vehicles"
                  ? "Car, tuk tuk, 4×4…"
                  : "Guide name or specialty…"
            }
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-1.5 lg:col-span-3">
          <label htmlFor="explore-location" className={labelClass}>
            {value.category === "vehicles" ? "Pick-up location" : "Location"}
          </label>
          <select
            id="explore-location"
            value={
              value.category === "vehicles"
                ? value.pickup || value.location
                : value.location
            }
            onChange={(e) => {
              const loc = e.target.value;
              if (value.category === "vehicles") {
                onChange({ ...value, pickup: loc, location: loc });
              } else {
                onChange({ ...value, location: loc });
              }
            }}
            className={fieldClass}
          >
            {exploreLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {value.category === "stays" || value.category === "vehicles" ? (
          <>
            <div className="flex flex-col gap-1.5 lg:col-span-2">
              <label htmlFor="explore-checkin" className={labelClass}>
                {value.category === "vehicles" ? "Pick-up" : "Check-in"}
              </label>
              <input
                id="explore-checkin"
                type="date"
                value={value.checkIn}
                onChange={(e) => onChange({ ...value, checkIn: e.target.value })}
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-1.5 lg:col-span-2">
              <label htmlFor="explore-checkout" className={labelClass}>
                {value.category === "vehicles" ? "Return" : "Check-out"}
              </label>
              <input
                id="explore-checkout"
                type="date"
                value={value.checkOut}
                onChange={(e) => onChange({ ...value, checkOut: e.target.value })}
                className={fieldClass}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-1.5 lg:col-span-4">
            <span className={labelClass}>Interest</span>
            <div className="flex flex-wrap gap-1.5">
              {guideInterests.map((interest) => {
                const active = value.interest === interest;
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...value,
                        interest: active ? "" : interest,
                      })
                    }
                    className={`text-caption rounded-full px-3 py-2 font-medium transition-colors ${
                      active
                        ? "bg-slate text-white"
                        : "border border-line bg-background text-foreground hover:border-brand/40"
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {value.category === "stays" ? (
          <div className="flex flex-col gap-1.5 lg:col-span-1">
            <label htmlFor="explore-guests" className={labelClass}>
              Guests
            </label>
            <input
              id="explore-guests"
              type="number"
              min={1}
              max={12}
              value={value.guests}
              onChange={(e) =>
                onChange({ ...value, guests: Number(e.target.value) || 1 })
              }
              className={fieldClass}
            />
          </div>
        ) : null}

        <div
          className={`flex items-end ${
            value.category === "guides" ? "lg:col-span-1" : "sm:col-span-2 lg:col-span-12"
          }`}
        >
          <CtaButton as="button" type="submit" className="w-full sm:w-auto" buttonClassName="min-w-0 flex-1">
            {ctaLabel(value.category)}
          </CtaButton>
        </div>
      </div>
    </form>
  );
}
