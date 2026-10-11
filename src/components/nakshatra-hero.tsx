import { Badge } from "@/components/ui/badge";
import { placeLabel } from "@/lib/geocode";
import type { BirthChart, BirthInput } from "@/lib/jyotish/chart";
import { NAKSHATRAS, RASHIS, formatDms } from "@/lib/jyotish/nakshatra";
import { natureLabel } from "@/lib/jyotish/navtara";
import { formatTime, formatZoned } from "@/lib/jyotish/timezone";
import { cn } from "@/lib/utils";

type Props = {
  birth: BirthInput;
  chart: BirthChart;
};

export function NakshatraHero({ birth, chart }: Props) {
  const nak = NAKSHATRAS[chart.nakshatraIndex]!;
  const rashi = RASHIS[chart.rashiIndex]!;
  const other = chart.otherNakshatraIndex != null ? NAKSHATRAS[chart.otherNakshatraIndex] : null;

  return (
    <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-7">
      <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Janma nakshatra</p>
      <div className="mt-3 flex flex-col gap-1">
        <h2 className="font-display text-4xl leading-none font-medium tracking-tight text-fg sm:text-5xl">
          {nak.name}
        </h2>
        <p className="text-lg text-muted">
          {nak.devanagari}
          <span className="mx-2 text-subtle">·</span>
          {nak.iast}
        </p>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Pada" value={String(chart.pada)} />
        <Stat label="Rashi" value={`${rashi.name} ${formatDms(chart.rashiDegree)}`} />
        <Stat label="Lord" value={nak.lord} />
        <Stat label="Deity" value={nak.deity} />
      </dl>
      <p className="mt-5 text-sm text-muted">
        Moon at {formatDms(chart.moonSidereal)} sidereal, Lahiri ayanamsa {formatDms(chart.ayanamsa)}.{" "}
        {birth.timeUnknown ? (
          <span>Time unknown — calculated at local noon.</span>
        ) : (
          <span>
            {formatZoned(chart.instant, birth.place.timezone, {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            · {formatTime(chart.instant, birth.place.timezone)} · {placeLabel(birth.place)}
          </span>
        )}
      </p>
      {chart.ambiguous && other ? (
        <p className="mt-3 rounded-md bg-mixed/10 px-3 py-2 text-sm text-mixed">
          The Moon moved from {other.name} during this civil day. Without a birth time, pada and even
          the star can shift. Noon is used below.
        </p>
      ) : null}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] tracking-wide text-subtle uppercase">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-fg">{value}</dd>
    </div>
  );
}

export function NatureBadge({ nature }: { nature: "benefic" | "malefic" | "mixed" }) {
  return (
    <Badge
      tone={nature}
      className={cn(nature === "malefic" && "tracking-wide")}
    >
      {natureLabel(nature)}
    </Badge>
  );
}
