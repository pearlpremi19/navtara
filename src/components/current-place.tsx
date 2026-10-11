import { useState } from "react";
import { PlaceSearch } from "@/components/place-search";
import { CURATED_PLACES, type Place } from "@/lib/geocode";

const HERE_CHIPS = ["Toronto", "Vancouver", "Montreal", "Calgary", "New York", "London"].flatMap(
  (name) => {
    const place = CURATED_PLACES.find((p) => p.name === name);
    return place ? [place] : [];
  },
);

type Props = {
  value: Place;
  zone: string;
  differs: boolean;
  onChange: (place: Place) => void;
};

export function CurrentPlace({ value, zone, differs, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const label = [value.name, value.country].filter(Boolean).join(", ");

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <p className="text-sm text-fg">
        Transit times in {label}
        <span className="text-muted"> · {zone}</span>
      </p>
      <button
        type="button"
        className="text-xs text-accent underline-offset-2 hover:underline"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close" : differs ? "Change current city" : "I live somewhere else"}
      </button>
      {open ? (
        <div className="w-full rounded-lg bg-surface p-3 shadow-[var(--shadow-border)] sm:w-80">
          <PlaceSearch
            value={value}
            onChange={(place) => {
              onChange(place);
              setOpen(false);
            }}
            placeholder="City you live in now"
            suggestions={HERE_CHIPS}
          />
        </div>
      ) : (
        <p className="max-w-xs text-xs text-subtle sm:text-right">
          Birth place does not set this clock. Change the city if you have moved.
        </p>
      )}
    </div>
  );
}
