import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DayMoon, MonthCalendar } from "@/lib/jyotish/calendar";
import { NAKSHATRAS } from "@/lib/jyotish/nakshatra";
import { formatMonthTitle } from "@/lib/jyotish/timezone";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Props = {
  calendar: MonthCalendar;
  todayIso: string;
  selectedIso: string | null;
  onSelect: (iso: string) => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
};

export function MoonCalendar({
  calendar,
  todayIso,
  selectedIso,
  onSelect,
  onPrev,
  onNext,
  onToday,
}: Props) {
  return (
    <div className="rounded-xl bg-surface p-3 shadow-[var(--shadow-border)] sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="font-display text-xl text-fg sm:text-2xl">
          {formatMonthTitle(calendar.year, calendar.month)}
        </h2>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="size-11" onClick={onPrev} aria-label="Previous month">
            <ChevronLeft className="size-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onToday}>
            Today
          </Button>
          <Button variant="ghost" size="icon" className="size-11" onClick={onNext} aria-label="Next month">
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-px">
        {WEEKDAYS.map((d) => (
          <div key={d} className="px-1 pb-2 text-center text-[11px] tracking-wide text-subtle uppercase">
            {d}
          </div>
        ))}
        {Array.from({ length: calendar.leadingBlanks }).map((_, i) => (
          <div key={`b-${i}`} />
        ))}
        {calendar.days.map((day) => (
          <DayCell
            key={day.iso}
            day={day}
            isToday={day.iso === todayIso}
            selected={day.iso === selectedIso}
            onSelect={onSelect}
          />
        ))}
      </div>
      <Legend />
    </div>
  );
}

function DayCell({
  day,
  isToday,
  selected,
  onSelect,
}: {
  day: DayMoon;
  isToday: boolean;
  selected: boolean;
  onSelect: (iso: string) => void;
}) {
  const nak = NAKSHATRAS[day.nakshatraIndex]!;
  const bar =
    day.tara.nature === "benefic"
      ? "bg-benefic"
      : day.tara.nature === "malefic"
        ? "bg-malefic"
        : "bg-mixed";

  return (
    <button
      type="button"
      onClick={() => onSelect(day.iso)}
      className={cn(
        "relative flex min-h-[4.5rem] min-w-0 flex-col items-start gap-0.5 rounded-md p-1.5 text-left transition-[background-color,box-shadow] duration-[var(--motion-quick)] sm:min-h-[5.25rem] sm:p-2",
        selected ? "bg-surface-2 shadow-[var(--shadow-border-hover)]" : "hover:bg-surface-2/70",
        isToday && !selected && "shadow-[var(--shadow-border)]",
      )}
    >
      <span className={cn("absolute top-1.5 bottom-1.5 left-0 w-0.5 rounded-full", bar)} />
      <span className={cn("pl-1.5 text-xs tabular-nums sm:text-sm", isToday ? "text-accent" : "text-muted")}>
        {day.day}
      </span>
      <span className="hidden w-full truncate pl-1.5 text-[11px] text-fg sm:block">{nak.name}</span>
      <span className="w-full truncate pl-1.5 text-[11px] text-fg sm:hidden">{nak.short}</span>
      <span className="hidden w-full truncate pl-1.5 text-[10px] text-subtle sm:block">{day.tara.name}</span>
    </button>
  );
}

function Legend() {
  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-subtle">
      <span className="inline-flex items-center gap-1.5">
        <i className="inline-block h-3 w-0.5 rounded-full bg-benefic" /> Auspicious
      </span>
      <span className="inline-flex items-center gap-1.5">
        <i className="inline-block h-3 w-0.5 rounded-full bg-mixed" /> Mixed
      </span>
      <span className="inline-flex items-center gap-1.5">
        <i className="inline-block h-3 w-0.5 rounded-full bg-malefic" /> Caution
      </span>
      <span>Nakshatra at sunrise where you live · tap a day for the local change time</span>
    </div>
  );
}
