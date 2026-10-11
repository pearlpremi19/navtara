import { Pencil } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { BirthForm } from "@/components/birth-form";
import { CurrentPlace } from "@/components/current-place";
import { DayDetail } from "@/components/day-detail";
import { Mark } from "@/components/mark";
import { MoonCalendar } from "@/components/moon-calendar";
import { NakshatraHero } from "@/components/nakshatra-hero";
import { NavtaraGrid } from "@/components/navtara-grid";
import { TaraDays } from "@/components/tara-days";
import { TodayStrip } from "@/components/today-strip";
import { Button } from "@/components/ui/button";
import { guessCurrentPlace, placeLabel, samePlace, zoneAbbrev, type Place } from "@/lib/geocode";
import { buildMonthCalendar, todayCursor, todayIso } from "@/lib/jyotish/calendar";
import { computeBirthChart, type BirthInput } from "@/lib/jyotish/chart";
import { moonAt } from "@/lib/jyotish/ephemeris";
import { NAKSHATRAS } from "@/lib/jyotish/nakshatra";
import { addMonths, formatZoned } from "@/lib/jyotish/timezone";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function App() {
  const birth = useAppStore((s) => s.birth);
  const here = useAppStore((s) => s.here);
  const editing = useAppStore((s) => s.editing);
  const monthCursor = useAppStore((s) => s.monthCursor);
  const selectedIso = useAppStore((s) => s.selectedIso);
  const view = useAppStore((s) => s.view);
  const setBirth = useAppStore((s) => s.setBirth);
  const setHere = useAppStore((s) => s.setHere);
  const setEditing = useAppStore((s) => s.setEditing);
  const setMonthCursor = useAppStore((s) => s.setMonthCursor);
  const selectDay = useAppStore((s) => s.selectDay);
  const setView = useAppStore((s) => s.setView);

  const chart = useMemo(() => (birth ? computeBirthChart(birth) : null), [birth]);
  const living = here ?? birth?.place ?? null;

  useEffect(() => {
    if (!birth || here) return;
    setHere(guessCurrentPlace(birth.place));
  }, [birth, here, setHere]);

  useEffect(() => {
    if (!living || monthCursor) return;
    setMonthCursor(todayCursor(living));
  }, [living, monthCursor, setMonthCursor]);

  const cursor = monthCursor ?? (living ? todayCursor(living) : null);

  const calendar = useMemo(() => {
    if (!living || !chart || !cursor) return null;
    return buildMonthCalendar(living, chart.nakshatraIndex, cursor.year, cursor.month);
  }, [living, chart, cursor]);

  const today = living ? todayIso(living) : null;
  const todayMonth = living ? todayCursor(living) : null;
  const todayCalendar = useMemo(() => {
    if (!living || !chart || !todayMonth) return null;
    if (cursor && cursor.year === todayMonth.year && cursor.month === todayMonth.month)
      return calendar;
    return buildMonthCalendar(living, chart.nakshatraIndex, todayMonth.year, todayMonth.month);
  }, [living, chart, todayMonth, cursor, calendar]);

  const todayDay =
    todayCalendar && today ? todayCalendar.days.find((d) => d.iso === today) : undefined;
  const selectedDay =
    calendar && selectedIso ? calendar.days.find((d) => d.iso === selectedIso) : undefined;

  function handleBirth(input: BirthInput, nextHere: Place) {
    setBirth(input);
    setHere(nextHere);
    setMonthCursor(todayCursor(nextHere));
  }

  function handleHere(place: Place) {
    setHere(place);
    setMonthCursor(todayCursor(place));
  }

  const showForm = !birth || editing;
  const moved =
    birth && living
      ? !samePlace(birth.place, living) || birth.place.timezone !== living.timezone
      : false;

  return (
    <div className="starfield min-h-dvh">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <div className="flex items-center gap-2.5 text-fg">
          <Mark className="size-8 text-accent" />
          <div>
            <p className="font-display text-xl leading-none tracking-tight">Navtara</p>
            <p className="mt-0.5 text-[11px] tracking-[0.14em] text-subtle uppercase">नव तारा</p>
          </div>
        </div>
        {birth && !editing ? (
          <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
            <Pencil className="size-3.5" />
            Edit birth
          </Button>
        ) : null}
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-16 sm:px-6">
        {showForm ? (
          <section className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="pt-2">
              <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
                Navtara Padhati
              </p>
              <h1 className="font-display mt-3 max-w-xl text-4xl leading-[1.05] font-medium tracking-tight text-fg sm:text-5xl">
                Your birth star, and the nine days of the Moon.
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
                Enter date, time and place of birth. We find the nakshatra the Moon occupied, then
                classify every sunrise where you live now by the nine taras counted from that star.
              </p>
              <NowSky />
            </div>
            <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-7">
              <h2 className="font-display text-2xl text-fg">Birth details</h2>
              <p className="mt-1 mb-5 text-sm text-muted">
                Birth place and where you live now can differ. Lahiri ayanamsa, geocentric Moon.
              </p>
              <BirthForm initial={birth} initialHere={here} onSubmit={handleBirth} />
              {birth ? (
                <Button variant="ghost" className="mt-3" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              ) : null}
            </div>
          </section>
        ) : null}

        {birth && chart && living && !editing ? (
          <>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <p className="text-sm text-muted">
                Born{" "}
                {formatZoned(chart.instant, birth.place.timezone, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                {birth.timeUnknown ? " · noon" : ""} · {placeLabel(birth.place)}
              </p>
              <CurrentPlace
                value={living}
                zone={zoneAbbrev(living.timezone)}
                differs={moved}
                onChange={handleHere}
              />
            </div>
            <NakshatraHero birth={birth} chart={chart} />
            {todayDay ? <TodayStrip day={todayDay} timeZone={living.timezone} /> : null}

            <NavtaraGrid janmaIndex={chart.nakshatraIndex} byTara={calendar?.byTara ?? []} />

            {calendar && cursor ? (
              <section className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-2xl text-fg">Moon this month</h2>
                  <div className="flex rounded-md bg-surface p-1 shadow-[var(--shadow-border)]">
                    <ViewTab active={view === "calendar"} onClick={() => setView("calendar")}>
                      Calendar
                    </ViewTab>
                    <ViewTab active={view === "taras"} onClick={() => setView("taras")}>
                      Nine taras
                    </ViewTab>
                  </div>
                </div>
                {view === "calendar" ? (
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
                    <MoonCalendar
                      calendar={calendar}
                      todayIso={today ?? ""}
                      selectedIso={selectedIso}
                      onSelect={selectDay}
                      onPrev={() => setMonthCursor(addMonths(cursor.year, cursor.month, -1))}
                      onNext={() => setMonthCursor(addMonths(cursor.year, cursor.month, 1))}
                      onToday={() => setMonthCursor(todayCursor(living))}
                    />
                    {selectedDay ? (
                      <div className="lg:sticky lg:top-4">
                        <DayDetail day={selectedDay} timeZone={living.timezone} />
                      </div>
                    ) : (
                      <p className="rounded-xl bg-surface p-5 text-sm text-muted shadow-[var(--shadow-border)] lg:sticky lg:top-4">
                        Select a day to see the tara, what it favours, and when the Moon changes
                        nakshatra — in {placeLabel(living)} time.
                      </p>
                    )}
                  </div>
                ) : (
                  <TaraDays
                    janmaIndex={chart.nakshatraIndex}
                    byTara={calendar.byTara}
                    timeZone={living.timezone}
                    selectedIso={selectedIso}
                    onSelect={selectDay}
                  />
                )}
              </section>
            ) : null}
          </>
        ) : null}

        <footer className="mt-8 border-t border-border pt-6 text-sm text-subtle">
          <p>
            Counting starts at janma nakshatra as 1, then Sampat, Vipat, Kshema, Pratyari, Sadhaka,
            Naidhana, Mitra, Ati Mitra — three cycles cover all twenty-seven stars. The birth star
            uses the birth place clock. Daily mapping uses sunrise where you live now, and change
            times are shown in that local time. This is a classical timing aid, not medical or legal
            advice.
          </p>
        </footer>
      </main>
    </div>
  );
}

function ViewTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-sm px-3 text-sm transition-[background-color,color] duration-[var(--motion-quick)]",
        active ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function NowSky() {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const moon = moonAt(new Date());
    setLabel(`Moon now in ${NAKSHATRAS[moon.index]!.name}, pada ${moon.pada}`);
  }, []);
  if (!label) return <div className="mt-8 h-5" />;
  return <p className="mt-8 text-sm text-subtle">{label}</p>;
}
