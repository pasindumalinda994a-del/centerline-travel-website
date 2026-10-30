import {
  exploreRegions,
  guideLanguages,
  guideSpecialties,
  stayAmenities,
  stayTypes,
  vehicleTypes,
  type ExploreCategory,
} from "@/app/lib/content/explore";

export type FilterState = {
  priceMin?: number;
  priceMax?: number;
  types: string[];
  ratingMin?: number;
  amenities: string[];
  regions: string[];
  specialties: string[];
  languages: string[];
  transmission?: string;
  seatsMin?: number;
  withDriver?: boolean;
};

type FilterPanelProps = {
  category: ExploreCategory;
  value: FilterState;
  onChange: (next: FilterState) => void;
  onClear: () => void;
  className?: string;
};

function toggleList(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-line py-4 last:border-b-0">
      <p className="text-caption mb-3 font-medium tracking-wide text-foreground uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="text-body flex cursor-pointer items-center gap-2.5 py-1 text-foreground/90">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 rounded border-line accent-brand"
      />
      {label}
    </label>
  );
}

export const emptyFilterState = (): FilterState => ({
  types: [],
  amenities: [],
  regions: [],
  specialties: [],
  languages: [],
});

export function countActiveFilters(f: FilterState): number {
  let n = 0;
  if (f.priceMin != null || f.priceMax != null) n += 1;
  if (f.types.length) n += f.types.length;
  if (f.ratingMin != null) n += 1;
  if (f.amenities.length) n += f.amenities.length;
  if (f.regions.length) n += f.regions.length;
  if (f.specialties.length) n += f.specialties.length;
  if (f.languages.length) n += f.languages.length;
  if (f.transmission) n += 1;
  if (f.seatsMin != null) n += 1;
  if (f.withDriver != null) n += 1;
  return n;
}

export function FilterPanel({
  category,
  value,
  onChange,
  onClear,
  className = "",
}: FilterPanelProps) {
  return (
    <aside className={`rounded-2xl border border-line bg-surface p-4 sm:p-5 ${className}`}>
      <div className="mb-1 flex items-center justify-between gap-3">
        <p className="text-body font-medium text-foreground">Filters</p>
        <button
          type="button"
          onClick={onClear}
          className="text-caption font-medium text-brand transition-opacity hover:opacity-70"
        >
          Clear all
        </button>
      </div>

      <Section title="Price">
        <div className="grid grid-cols-2 gap-2">
          <label className="text-caption text-muted">
            Min
            <input
              type="number"
              min={0}
              placeholder="0"
              value={value.priceMin ?? ""}
              onChange={(e) =>
                onChange({
                  ...value,
                  priceMin: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="text-body mt-1 w-full rounded-full border border-line bg-background px-3 py-2 text-foreground outline-none focus:border-brand/40"
            />
          </label>
          <label className="text-caption text-muted">
            Max
            <input
              type="number"
              min={0}
              placeholder="Any"
              value={value.priceMax ?? ""}
              onChange={(e) =>
                onChange({
                  ...value,
                  priceMax: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="text-body mt-1 w-full rounded-full border border-line bg-background px-3 py-2 text-foreground outline-none focus:border-brand/40"
            />
          </label>
        </div>
      </Section>

      <Section title="Region">
        <div className="max-h-40 space-y-0.5 overflow-y-auto">
          {exploreRegions.map((region) => (
            <CheckRow
              key={region}
              label={region}
              checked={value.regions.includes(region)}
              onChange={() =>
                onChange({ ...value, regions: toggleList(value.regions, region) })
              }
            />
          ))}
        </div>
      </Section>

      {category === "stays" ? (
        <>
          <Section title="Property type">
            {stayTypes.map((type) => (
              <CheckRow
                key={type}
                label={type}
                checked={value.types.includes(type)}
                onChange={() =>
                  onChange({ ...value, types: toggleList(value.types, type) })
                }
              />
            ))}
          </Section>
          <Section title="Guest rating">
            {[9, 8].map((r) => (
              <CheckRow
                key={r}
                label={`${r}+`}
                checked={value.ratingMin === r}
                onChange={() =>
                  onChange({
                    ...value,
                    ratingMin: value.ratingMin === r ? undefined : r,
                  })
                }
              />
            ))}
          </Section>
          <Section title="Amenities">
            {stayAmenities.map((a) => (
              <CheckRow
                key={a}
                label={a}
                checked={value.amenities.includes(a)}
                onChange={() =>
                  onChange({
                    ...value,
                    amenities: toggleList(value.amenities, a),
                  })
                }
              />
            ))}
          </Section>
        </>
      ) : null}

      {category === "guides" ? (
        <>
          <Section title="Specialty">
            {guideSpecialties.map((s) => (
              <CheckRow
                key={s}
                label={s}
                checked={value.specialties.includes(s)}
                onChange={() =>
                  onChange({
                    ...value,
                    specialties: toggleList(value.specialties, s),
                  })
                }
              />
            ))}
          </Section>
          <Section title="Languages">
            {guideLanguages.map((l) => (
              <CheckRow
                key={l}
                label={l}
                checked={value.languages.includes(l)}
                onChange={() =>
                  onChange({
                    ...value,
                    languages: toggleList(value.languages, l),
                  })
                }
              />
            ))}
          </Section>
          <Section title="Rating">
            {[4.8, 4.5].map((r) => (
              <CheckRow
                key={r}
                label={`${r}+`}
                checked={value.ratingMin === r}
                onChange={() =>
                  onChange({
                    ...value,
                    ratingMin: value.ratingMin === r ? undefined : r,
                  })
                }
              />
            ))}
          </Section>
        </>
      ) : null}

      {category === "vehicles" ? (
        <>
          <Section title="Vehicle type">
            {vehicleTypes.map((type) => (
              <CheckRow
                key={type}
                label={type}
                checked={value.types.includes(type)}
                onChange={() =>
                  onChange({ ...value, types: toggleList(value.types, type) })
                }
              />
            ))}
          </Section>
          <Section title="Transmission">
            {(["Automatic", "Manual"] as const).map((t) => (
              <CheckRow
                key={t}
                label={t}
                checked={value.transmission === t}
                onChange={() =>
                  onChange({
                    ...value,
                    transmission: value.transmission === t ? undefined : t,
                  })
                }
              />
            ))}
          </Section>
          <Section title="Seats">
            {[4, 5, 7].map((n) => (
              <CheckRow
                key={n}
                label={`${n}+`}
                checked={value.seatsMin === n}
                onChange={() =>
                  onChange({
                    ...value,
                    seatsMin: value.seatsMin === n ? undefined : n,
                  })
                }
              />
            ))}
          </Section>
          <Section title="Driver">
            <CheckRow
              label="With driver"
              checked={value.withDriver === true}
              onChange={() =>
                onChange({
                  ...value,
                  withDriver: value.withDriver === true ? undefined : true,
                })
              }
            />
            <CheckRow
              label="Self-drive"
              checked={value.withDriver === false}
              onChange={() =>
                onChange({
                  ...value,
                  withDriver: value.withDriver === false ? undefined : false,
                })
              }
            />
          </Section>
        </>
      ) : null}
    </aside>
  );
}
