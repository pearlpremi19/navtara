import { NatureBadge } from "@/components/nakshatra-hero";
import type { DayMoon } from "@/lib/jyotish/calendar";
import { formatChangeTime } from "@/lib/jyotish/format";
import { NAKSHATRAS } from "@/lib/jyotish/nakshatra";
import { TARAS, nakshatrasForTara, type Tara } from "@/lib/jyotish/navtara";
import { formatCivilDate } from "@/lib/jyotish/timezone";
import { cn } from "@/lib/utils";

type Props = {
  janmaIndex: number;
  byTara: { tara: Tara; days: DayMoon[] }[];
  timeZone: string;
  selectedIso: string | null;
  onSelect: (iso: string) => void;
};

export function TaraDays({ janmaIndex, byTara, timeZone, selectedIso, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {TARAS.map((tara) => {
        const group = byTara.find((b) => b.tara.id === tara.id);
        const days = group?.days ?? [];
        const stars = nakshatrasForTara(janmaIndex, tara.id).map((i) => NAKSHATRAS[i]!);
        return (
          <section key={tara.key} className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">
                  {tara.sanskrit} · {stars.map((s) => s.name).join(" · ")}
                </p>
                <h3 className="font-display mt-1 text-2xl text-fg">
                  {tara.name}
                  <span className="text-lg text-muted"> · {tara.meaning}</span>
                </h3>
              </div>
              <NatureBadge nature={tara.nature} />
            </div>
            {days.length === 0 ? (
              <p className="mt-3 text-sm text-muted">No sunrise in this tara this month.</p>
            ) : (
              <ul className="mt-3 divide-y divide-border">
                {days.map((day) => {
                  const nak = NAKSHATRAS[day.nakshatraIndex]!;
                  return (
                    <li key={day.iso}>
                      <button
                        type="button"
                        onClick={() => onSelect(day.iso)}
                        className={cn(
                          "flex min-h-11 w-full items-center justify-between gap-3 py-2.5 text-left text-sm transition-colors duration-[var(--motion-quick)]",
                          selectedIso === day.iso ? "text-fg" : "text-muted hover:text-fg",
                        )}
                      >
                        <span>
                          <span className="tabular-nums text-fg">
                            {formatCivilDate(day.year, day.month, day.day)}
                          </span>
                          <span className="text-subtle"> · {nak.name}</span>
                        </span>
                        {day.change ? (
                          <span className="text-xs text-subtle">
                            to {NAKSHATRAS[day.change.toIndex]!.name}{" "}
                            {formatChangeTime(day.change.at, timeZone, day)}
                          </span>
                        ) : (
                          <span className="text-xs text-subtle">pada {day.pada}</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
