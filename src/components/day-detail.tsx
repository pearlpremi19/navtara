import { NatureBadge } from "@/components/nakshatra-hero";
import type { DayMoon } from "@/lib/jyotish/calendar";
import { formatChangeTime } from "@/lib/jyotish/format";
import { NAKSHATRAS } from "@/lib/jyotish/nakshatra";
import { formatCivilDate } from "@/lib/jyotish/timezone";

type Props = {
  day: DayMoon;
  timeZone: string;
};

export function DayDetail({ day, timeZone }: Props) {
  const nak = NAKSHATRAS[day.nakshatraIndex]!;
  const next = day.change ? NAKSHATRAS[day.change.toIndex] : null;

  return (
    <aside className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
      <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
        {formatCivilDate(day.year, day.month, day.day)}
      </p>
      <div className="mt-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl text-fg">{nak.name}</h3>
          <p className="text-sm text-muted">
            {nak.devanagari} · pada {day.pada} · lord {nak.lord}
          </p>
        </div>
        <NatureBadge nature={day.tara.nature} />
      </div>
      <p className="mt-3 text-sm text-fg">
        {day.tara.name} tara
        <span className="text-muted"> — {day.tara.meaning.toLowerCase()}</span>
      </p>
      <p className="mt-2 text-sm text-muted">{day.tara.summary}</p>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-[11px] tracking-wide text-subtle uppercase">Favours</p>
          <p className="mt-1 text-fg">{day.tara.suited.join(", ")}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-wide text-subtle uppercase">Hold back</p>
          <p className="mt-1 text-fg">{day.tara.avoid.join(", ")}</p>
        </div>
      </div>
      {day.change && next ? (
        <p className="mt-4 border-t border-border pt-3 text-sm text-muted">
          Moon enters {next.name} ({day.change.toTara.name}) at {formatChangeTime(day.change.at, timeZone, day)}.
        </p>
      ) : (
        <p className="mt-4 border-t border-border pt-3 text-sm text-muted">
          Moon stays in {nak.name} through this sunrise-to-sunrise day.
        </p>
      )}
    </aside>
  );
}
