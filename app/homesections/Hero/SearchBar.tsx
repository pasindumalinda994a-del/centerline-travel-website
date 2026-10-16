import { search } from "@/app/lib/content/home";
import { ChevronDownIcon } from "./icons";

const fieldClass =
  "text-body h-11 w-full appearance-none rounded-full border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 focus:border-white/40";

/** Glassmorphic search card docked inside the hero */
export function SearchBar() {
  return (
    <form
      id="explore"
      data-hero-search
      className="w-full max-w-[460px] rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl"
      action="#destinations"
      role="search"
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 flex flex-col gap-1.5">
          <label htmlFor="hero-query" className="text-caption px-1 text-white/70">
            What are you looking for
          </label>
          <input
            id="hero-query"
            name="query"
            type="search"
            placeholder="Hotel, vehicle, guide…"
            className={fieldClass}
          />
        </div>

        <div className="relative flex flex-col gap-1.5">
          <label htmlFor="hero-category" className="text-caption px-1 text-white/70">
            Category
          </label>
          <select
            id="hero-category"
            name="category"
            className={`${fieldClass} pr-9 [&>option]:text-foreground`}
          >
            {search.categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3.5 bottom-3.5 size-4 text-white/60" />
        </div>

        <div className="relative flex flex-col gap-1.5">
          <label htmlFor="hero-location" className="text-caption px-1 text-white/70">
            Location
          </label>
          <select
            id="hero-location"
            name="location"
            className={`${fieldClass} pr-9 [&>option]:text-foreground`}
          >
            {search.locations.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3.5 bottom-3.5 size-4 text-white/60" />
        </div>

        <button
          type="submit"
          className="text-body col-span-2 h-11 rounded-full bg-brand font-medium text-white transition-colors hover:bg-brand/90"
        >
          Explore Now
        </button>
      </div>
    </form>
  );
}
