import { Body, EclipticGeoMoon, MakeTime, Observer, SearchRiseSet } from "astronomy-engine";
import { NAKSHATRA_SPAN, nakshatraFromSidereal, normalizeDeg } from "./nakshatra";
import { zonedCivilToUtc } from "./timezone";

export function julianDayTt(date: Date): number {
  return 2451545.0 + MakeTime(date).tt;
}

/** Mean Lahiri (Chitrapaksha) ayanamsa in degrees. */
export function lahiriAyanamsa(date: Date): number {
  const t = (julianDayTt(date) - 2451545.0) / 36525;
  return 23.853471 + 1.396971 * t + 0.000308 * t * t;
}

export function moonTropicalLon(date: Date): number {
  return normalizeDeg(EclipticGeoMoon(date).lon);
}

export function moonSiderealLon(date: Date): number {
  return normalizeDeg(moonTropicalLon(date) - lahiriAyanamsa(date));
}

export function moonAt(date: Date) {
  const tropical = moonTropicalLon(date);
  const ayanamsa = lahiriAyanamsa(date);
  const sidereal = normalizeDeg(tropical - ayanamsa);
  return { tropical, ayanamsa, sidereal, ...nakshatraFromSidereal(sidereal) };
}

export function localSunrise(
  year: number,
  month: number,
  day: number,
  latitude: number,
  longitude: number,
  timeZone: string,
): Date {
  const midnight = zonedCivilToUtc(year, month, day, 0, 0, timeZone);
  const observer = new Observer(latitude, longitude, 0);
  const rise = SearchRiseSet(Body.Sun, observer, +1, midnight, 1.4);
  if (rise) return rise.date;
  return zonedCivilToUtc(year, month, day, 6, 0, timeZone);
}

function unwrapForward(origin: number, lon: number): number {
  let d = lon - origin;
  while (d < -180) d += 360;
  while (d > 180) d -= 360;
  return origin + d;
}

export function searchSiderealCrossing(start: Date, end: Date, target: number): Date {
  const origin = moonSiderealLon(start);
  const want = origin + ((target - origin + 360) % 360);
  let lo = start.getTime();
  let hi = end.getTime();
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    const u = unwrapForward(origin, moonSiderealLon(new Date(mid)));
    if (u < want) lo = mid;
    else hi = mid;
  }
  return new Date((lo + hi) / 2);
}

export type Ingress = {
  at: Date;
  toIndex: number;
  fromIndex: number;
  target: number;
};

export function moonIngresses(rangeStart: Date, rangeEnd: Date): Ingress[] {
  const stepMs = 3 * 60 * 60 * 1000;
  const samples: { t: number; lon: number }[] = [];
  let t = rangeStart.getTime();
  const end = rangeEnd.getTime();
  while (t <= end) {
    samples.push({ t, lon: moonSiderealLon(new Date(t)) });
    t += stepMs;
  }
  if (samples.length === 0) return [];
  if (samples[samples.length - 1]!.t !== end) {
    samples.push({ t: end, lon: moonSiderealLon(rangeEnd) });
  }

  const unwrapped: number[] = [samples[0]!.lon];
  for (let i = 1; i < samples.length; i++) {
    unwrapped.push(unwrapForward(unwrapped[i - 1]!, samples[i]!.lon));
  }

  const firstBoundary = Math.ceil(unwrapped[0]! / NAKSHATRA_SPAN + 1e-9) * NAKSHATRA_SPAN;
  const lastBoundary = Math.floor(unwrapped[unwrapped.length - 1]! / NAKSHATRA_SPAN + 1e-9) * NAKSHATRA_SPAN;
  const ingresses: Ingress[] = [];

  for (let boundary = firstBoundary; boundary <= lastBoundary + 1e-9; boundary += NAKSHATRA_SPAN) {
    let bracket = -1;
    for (let i = 0; i < unwrapped.length - 1; i++) {
      if (unwrapped[i]! < boundary && unwrapped[i + 1]! >= boundary) {
        bracket = i;
        break;
      }
    }
    if (bracket < 0) continue;
    const startDate = new Date(samples[bracket]!.t);
    const endDate = new Date(samples[bracket + 1]!.t);
    const target = normalizeDeg(boundary);
    const at = searchSiderealCrossing(startDate, endDate, target);
    const toIndex = Math.round(normalizeDeg(boundary) / NAKSHATRA_SPAN) % 27;
    const fromIndex = (toIndex + 26) % 27;
    ingresses.push({ at, toIndex, fromIndex, target });
  }
  return ingresses;
}
