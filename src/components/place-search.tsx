import { useEffect, useId, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { CURATED_PLACES, placeLabel, searchPlaces, type Place } from "@/lib/geocode";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CHIPS = CURATED_PLACES.slice(0, 5);

type Props = {
  value: Place | null;
  onChange: (place: Place) => void;
  error?: string;
  placeholder?: string;
  suggestions?: Place[];
};

export function PlaceSearch({
  value,
  onChange,
  error,
  placeholder = "City or town of birth",
  suggestions = CHIPS,
}: Props) {
  const id = useId();
  const listId = `${id}-list`;
  const [query, setQuery] = useState(value ? placeLabel(value) : "");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Place[]>(CURATED_PLACES.slice(0, 8));
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) setQuery(placeLabel(value));
  }, [value]);

  useEffect(() => {
    const q = query.trim();
    if (value && q === placeLabel(value)) return;
    let cancelled = false;
    const t = window.setTimeout(() => {
      void searchPlaces(q).then((places) => {
        if (!cancelled) {
          setResults(places);
          setActive(0);
        }
      });
    }, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [query, value]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function choose(place: Place) {
    onChange(place);
    setQuery(placeLabel(place));
    setOpen(false);
  }

  return (
    <div ref={boxRef} className="relative">
      <div className="relative">
        <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
        <Input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder={placeholder}
          value={query}
          className="pl-9"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!open) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((i) => Math.min(i + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter") {
              e.preventDefault();
              const pick = results[active];
              if (pick) choose(pick);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
        />
      </div>
      {error ? <p className="mt-1.5 text-xs text-malefic">{error}</p> : null}
      {open && results.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-lg bg-surface-2 p-1 shadow-[var(--shadow-border)]"
        >
          {results.map((place, i) => (
            <li key={`${place.name}-${place.latitude}-${place.longitude}`}>
              <button
                type="button"
                role="option"
                aria-selected={i === active}
                className={cn(
                  "flex w-full flex-col items-start rounded-md px-3 py-2 text-left text-sm transition-colors duration-[var(--motion-quick)]",
                  i === active ? "bg-surface text-fg" : "text-muted hover:bg-surface hover:text-fg",
                )}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(place)}
              >
                <span className="font-medium text-fg">{place.name}</span>
                <span className="text-xs text-subtle">
                  {[place.admin1, place.country].filter(Boolean).join(", ")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {suggestions.map((place) => (
          <button
            key={place.name}
            type="button"
            onClick={() => choose(place)}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs text-muted shadow-[var(--shadow-border)] transition-[color,background-color,box-shadow] duration-[var(--motion-quick)] hover:bg-surface-2 hover:text-fg",
              value?.name === place.name && "bg-surface-2 text-fg",
            )}
          >
            {place.name}
          </button>
        ))}
      </div>
    </div>
  );
}
