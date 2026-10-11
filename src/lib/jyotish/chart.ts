import type { Place } from "@/lib/geocode";
import { moonAt, moonIngresses, moonSiderealLon } from "./ephemeris";
import { NAKSHATRAS, formatDms, nakshatraFromSidereal } from "./nakshatra";
import { taraForNakshatra, type Tara } from "./navtara";
import { parseIsoDate, zonedCivilToUtc } from "./timezone";

export type BirthInput = {
  date: string;
  time: string;
  timeUnknown: boolean;
  place: Place;
};

export type BirthChart = {
  instant: Date;
  timeUnknown: boolean;
  ayanamsa: number;
  moonTropical: number;
  moonSidereal: number;
  nakshatraIndex: number;
  pada: number;
  rashiIndex: number;
  rashiDegree: number;
  ambiguous: boolean;
  otherNakshatraIndex?: number;
  changeAt?: Date;
};

function parseTime(time: string): { hour: number; minute: number } {
  const [h, m] = time.split(":").map(Number);
  return { hour: h ?? 12, minute: m ?? 0 };
}

export function birthInstant(input: BirthInput): Date {
  const { year, month, day } = parseIsoDate(input.date);
  const { hour, minute } = parseTime(input.timeUnknown ? "12:00" : input.time);
  return zonedCivilToUtc(year, month, day, hour, minute, input.place.timezone);
}

export function computeBirthChart(input: BirthInput): BirthChart {
  const instant = birthInstant(input);
  const moon = moonAt(instant);
  const { year, month, day } = parseIsoDate(input.date);
  const start = zonedCivilToUtc(year, month, day, 0, 0, input.place.timezone);
  const end = zonedCivilToUtc(year, month, day, 23, 59, input.place.timezone);
  const startIdx = nakshatraFromSidereal(moonSiderealLon(start)).index;
  const endIdx = nakshatraFromSidereal(moonSiderealLon(end)).index;
  const changed = startIdx !== endIdx;
  const ingresses = changed ? moonIngresses(start, end) : [];
  const change = ingresses[0];

  return {
    instant,
    timeUnknown: input.timeUnknown,
    ayanamsa: moon.ayanamsa,
    moonTropical: moon.tropical,
    moonSidereal: moon.sidereal,
    nakshatraIndex: moon.index,
    pada: moon.pada,
    rashiIndex: moon.rashiIndex,
    rashiDegree: moon.rashiDegree,
    ambiguous: input.timeUnknown && changed,
    otherNakshatraIndex: input.timeUnknown && changed ? (moon.index === startIdx ? endIdx : startIdx) : undefined,
    changeAt: change?.at,
  };
}

export function chartSummary(chart: BirthChart, janmaTara: Tara) {
  const nak = NAKSHATRAS[chart.nakshatraIndex]!;
  return {
    nak,
    tara: janmaTara,
    padaLabel: `Pada ${chart.pada}`,
    ayanamsaLabel: formatDms(chart.ayanamsa),
  };
}

export function janmaTara(_chart: BirthChart): Tara {
  return taraForNakshatra(_chart.nakshatraIndex, _chart.nakshatraIndex);
}
