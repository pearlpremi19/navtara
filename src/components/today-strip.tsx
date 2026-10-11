import { NatureBadge } from "@/components/nakshatra-hero";
import type { DayMoon } from "@/lib/jyotish/calendar";
import { formatChangeTime } from "@/lib/jyotish/format";
import { NAKSHATRAS } from "@/lib/jyotish/nakshatra";

type Props = {
  day: DayMoon;
  timeZone: string;
};

export function TodayStrip({ day, timeZone }: Props) {
  const nak = NAKSHATRAS[day.nakshatraIndex]!;
  return (
    <section className="rounded-xl bg-surface px-5 py-4 shadow-[var(--shadow-border)] sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">Today</p>
          <p className="mt-1 font-display text-2xl leading-tight text-fg">
            Moon in {nak.name}
            <span className="text-muted"> · {day.tara.name} tara</span>
          </p>
          <p className="mt-1 max-w-xl text-sm text-muted">{day.tara.summary}</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
          <NatureBadge nature={day.tara.nature} />
          {day.change ? (
            <p className="text-xs text-subtle">
              Changes to {NAKSHATRAS[day.change.toIndex]!.name} at {formatChangeTime(day.change.at, timeZone, day)}
            </p>
          ) : (
            <p className="text-xs text-subtle">Pada {day.pada} at sunrise</p>
          )}
        </div>
      </div>
    </section>
  );
}
