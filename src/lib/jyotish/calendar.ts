import type { Place } from "@/lib/geocode";
import { localSunrise, moonAt, moonIngresses } from "./ephemeris";
import { NAKSHATRAS } from "./nakshatra";
import { TARAS, taraForNakshatra, type Tara } from "./navtara";
import {
  addMonths,
  civilInZone,
  daysInMonth,
  isoDate,
  weekdaySun0,
  zonedCivilToUtc,
} from "./timezone";

export type DayMoon = {
  iso: string;
  year: number;
  month: number;
  day: number;
  weekday: number;
  sunrise: Date;
  nakshatraIndex: number;
  pada: number;
  tara: Tara;
  change?: {
    at: Date;
    fromIndex: number;
    toIndex: number;
    toTara: Tara;
  };
};

export type MonthCalendar = {
  year: number;
  month: number;
  leadingBlanks: number;
  days: DayMoon[];
  byTara: { tara: Tara; days: DayMoon[] }[];
};

function nextCivilDay(year: number, month: number, day: number) {
  const n = daysInMonth(year, month);
  if (day < n) return { year, month, day: day + 1 };
  const next = addMonths(year, month, 1);
  return { year: next.year, month: next.month, day: 1 };
}

export function buildMonthCalendar(
  place: Place,
  janmaIndex: number,
  year: number,
  month: number,
): MonthCalendar {
  const n = daysInMonth(year, month);
  const start = zonedCivilToUtc(year, month, 1, 0, 0, place.timezone);
  const after = nextCivilDay(year, month, n);
  const end = zonedCivilToUtc(after.year, after.month, after.day, 12, 0, place.timezone);
  const ingresses = moonIngresses(start, end);

  const days: DayMoon[] = [];
  for (let day = 1; day <= n; day++) {
    const sunrise = localSunrise(year, month, day, place.latitude, place.longitude, place.timezone);
    const nxt = nextCivilDay(year, month, day);
    const nextSunrise = localSunrise(
      nxt.year,
      nxt.month,
      nxt.day,
      place.latitude,
      place.longitude,
      place.timezone,
    );
    const moon = moonAt(sunrise);
    const iso = isoDate(year, month, day);
    const weekday = weekdaySun0(year, month, day, place.timezone);
    const change = ingresses.find((g) => g.at >= sunrise && g.at < nextSunrise);
    days.push({
      iso,
      year,
      month,
      day,
      weekday,
      sunrise,
      nakshatraIndex: moon.index,
      pada: moon.pada,
      tara: taraForNakshatra(moon.index, janmaIndex),
      change: change
        ? {
            at: change.at,
            fromIndex: change.fromIndex,
            toIndex: change.toIndex,
            toTara: taraForNakshatra(change.toIndex, janmaIndex),
          }
        : undefined,
    });
  }

  const byTara = TARAS.map((tara) => ({
    tara,
    days: days.filter((d) => d.tara.id === tara.id),
  }));

  return {
    year,
    month,
    leadingBlanks: weekdaySun0(year, month, 1, place.timezone),
    days,
    byTara,
  };
}

export function nakshatraName(index: number): string {
  return NAKSHATRAS[index]?.name ?? "";
}

export function todayIso(place: Place, now = new Date()): string {
  const c = civilInZone(now, place.timezone);
  return isoDate(c.year, c.month, c.day);
}

export function todayCursor(place: Place, now = new Date()): { year: number; month: number } {
  const c = civilInZone(now, place.timezone);
  return { year: c.year, month: c.month };
}
