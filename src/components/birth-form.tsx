import { useEffect, useState, type FormEvent } from "react";
import { PlaceSearch } from "@/components/place-search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CURATED_PLACES, guessCurrentPlace, samePlace, type Place } from "@/lib/geocode";
import type { BirthInput } from "@/lib/jyotish/chart";
import { cn } from "@/lib/utils";

const HERE_CHIPS = [
  "Toronto",
  "Vancouver",
  "Montreal",
  "Calgary",
  "New York",
  "London",
].flatMap((name) => {
  const place = CURATED_PLACES.find((p) => p.name === name);
  return place ? [place] : [];
});

type Props = {
  initial?: BirthInput | null;
  initialHere?: Place | null;
  onSubmit: (input: BirthInput, here: Place) => void;
};

export function BirthForm({ initial, initialHere, onSubmit }: Props) {
  const [date, setDate] = useState(initial?.date ?? "");
  const [time, setTime] = useState(initial?.time ?? "12:00");
  const [timeUnknown, setTimeUnknown] = useState(initial?.timeUnknown ?? false);
  const [place, setPlace] = useState<Place | null>(initial?.place ?? null);
  const [same, setSame] = useState(
    !initialHere || !initial?.place ? true : samePlace(initialHere, initial.place),
  );
  const [here, setHere] = useState<Place | null>(initialHere ?? null);
  const [errors, setErrors] = useState<{ date?: string; time?: string; place?: string; here?: string }>(
    {},
  );

  useEffect(() => {
    if (initialHere || !initial?.place) return;
    const guess = guessCurrentPlace(initial.place);
    if (!samePlace(guess, initial.place)) {
      setSame(false);
      setHere(guess);
    }
  }, [initial?.place, initialHere]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const living = same ? place : here;
    const next: typeof errors = {};
    if (!date) next.date = "Date of birth is required.";
    if (!timeUnknown && !time) next.time = "Time of birth is required.";
    if (!place) next.place = "Choose a place from the list.";
    if (!living) next.here = "Choose where you live now.";
    setErrors(next);
    if (next.date || next.time || next.place || next.here || !place || !living) return;
    onSubmit(
      {
        date,
        time: timeUnknown ? "12:00" : time,
        timeUnknown,
        place,
      },
      living,
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="dob">Date of birth</Label>
          <Input
            id="dob"
            type="date"
            required
            max="2099-12-31"
            min="1800-01-01"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date ? <p className="text-xs text-malefic">{errors.date}</p> : null}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tob">Time of birth</Label>
          <Input
            id="tob"
            type="time"
            value={time}
            disabled={timeUnknown}
            onChange={(e) => setTime(e.target.value)}
            className={cn(timeUnknown && "opacity-40")}
          />
          <label className="mt-1 flex min-h-11 items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              className="size-4 accent-accent"
              checked={timeUnknown}
              onChange={(e) => setTimeUnknown(e.target.checked)}
            />
            Time unknown — use noon at the birth place
          </label>
          {errors.time ? <p className="text-xs text-malefic">{errors.time}</p> : null}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pob">Place of birth</Label>
        <PlaceSearch value={place} onChange={setPlace} error={errors.place} />
        <p className="text-xs text-subtle">Used only to read the birth clock. It does not set transit times.</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="here">Where you live now</Label>
        <label className="flex min-h-11 items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            className="size-4 accent-accent"
            checked={same}
            onChange={(e) => {
              const next = e.target.checked;
              setSame(next);
              if (next) setHere(place);
              else if (!here) setHere(guessCurrentPlace(place));
            }}
          />
          Same as place of birth
        </label>
        {same ? null : (
          <PlaceSearch
            value={here}
            onChange={setHere}
            error={errors.here}
            placeholder="City you live in now"
            suggestions={HERE_CHIPS}
          />
        )}
        <p className="text-xs text-subtle">
          Sunrise and nakshatra change times use this place, in its local clock.
        </p>
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Read my nakshatra
      </Button>
    </form>
  );
}
