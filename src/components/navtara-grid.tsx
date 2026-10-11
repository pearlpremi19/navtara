import { NatureBadge } from "@/components/nakshatra-hero";
import { NAKSHATRAS } from "@/lib/jyotish/nakshatra";
import { nakshatrasForTara, TARAS, type Tara } from "@/lib/jyotish/navtara";
import type { DayMoon } from "@/lib/jyotish/calendar";
import { cn } from "@/lib/utils";

type Props = {
  janmaIndex: number;
  byTara: { tara: Tara; days: DayMoon[] }[];
  activeTaraId?: number;
  onSelectTara?: (id: number) => void;
};

export function NavtaraGrid({ janmaIndex, byTara, activeTaraId, onSelectTara }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {TARAS.map((tara) => {
        const stars = nakshatrasForTara(janmaIndex, tara.id).map((i) => NAKSHATRAS[i]!);
        const count = byTara.find((b) => b.tara.id === tara.id)?.days.length ?? 0;
        const active = activeTaraId === tara.id;
        return (
          <article
            key={tara.key}
            className={cn(
              "rounded-lg bg-surface p-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)]",
              active && "shadow-[var(--shadow-border-hover)]",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">
                  {String(tara.id + 1).padStart(2, "0")} · {tara.sanskrit}
                </p>
                <h3 className="font-display mt-1 text-xl text-fg">{tara.name}</h3>
                <p className="text-xs text-muted">{tara.meaning}</p>
              </div>
              <NatureBadge nature={tara.nature} />
            </div>
            <ul className="mt-3 flex flex-col gap-1 text-sm text-fg">
              {stars.map((star, i) => (
                <li key={star.index} className="flex items-baseline justify-between gap-2">
                  <span>{star.name}</span>
                  <span className="text-[11px] text-subtle">{tara.cycleLabels[i]}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">{tara.summary}</p>
            <p className="mt-3 text-xs text-subtle">
              {count} {count === 1 ? "day" : "days"} this month
            </p>
            {onSelectTara ? (
              <button
                type="button"
                className="mt-2 text-xs text-accent underline-offset-2 hover:underline"
                onClick={() => onSelectTara(tara.id)}
              >
                Show days
              </button>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
