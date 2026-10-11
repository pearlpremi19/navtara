type Civil = {
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
  second?: number;
};

function partNumber(parts: Intl.DateTimeFormatPart[], type: string): number {
  const value = parts.find((p) => p.type === type)?.value;
  if (value == null) throw new Error(`Missing date part: ${type}`);
  return Number(value);
}

function zonedFormatter(timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    weekday: "short",
  });
}

function partsToUtcMs(parts: Intl.DateTimeFormatPart[]): number {
  return Date.UTC(
    partNumber(parts, "year"),
    partNumber(parts, "month") - 1,
    partNumber(parts, "day"),
    partNumber(parts, "hour"),
    partNumber(parts, "minute"),
    partNumber(parts, "second"),
  );
}

export function zonedCivilToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const targetAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
  const fmt = zonedFormatter(timeZone);
  const offset = partsToUtcMs(fmt.formatToParts(new Date(targetAsUtc))) - targetAsUtc;
  let utc = targetAsUtc - offset;
  const drift = partsToUtcMs(fmt.formatToParts(new Date(utc))) - targetAsUtc;
  utc -= drift;
  return new Date(utc);
}

export function civilInZone(date: Date, timeZone: string): Required<Civil> & { weekday: string } {
  const parts = zonedFormatter(timeZone).formatToParts(date);
  return {
    year: partNumber(parts, "year"),
    month: partNumber(parts, "month"),
    day: partNumber(parts, "day"),
    hour: partNumber(parts, "hour"),
    minute: partNumber(parts, "minute"),
    second: partNumber(parts, "second"),
    weekday: parts.find((p) => p.type === "weekday")?.value ?? "",
  };
}

export function weekdaySun0(year: number, month: number, day: number, timeZone: string): number {
  const instant = zonedCivilToUtc(year, month, day, 12, 0, timeZone);
  const wd = civilInZone(instant, timeZone).weekday;
  const i = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
  return i < 0 ? 0 : i;
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function isoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseIsoDate(iso: string): { year: number; month: number; day: number } {
  const [year, month, day] = iso.split("-").map(Number);
  return { year: year!, month: month!, day: day! };
}

export function addMonths(year: number, month: number, delta: number): { year: number; month: number } {
  const index = year * 12 + (month - 1) + delta;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}

export function formatZoned(
  date: Date,
  timeZone: string,
  options: Intl.DateTimeFormatOptions,
  locale = "en-IN",
): string {
  return new Intl.DateTimeFormat(locale, { timeZone, ...options }).format(date);
}

export function formatTime(date: Date, timeZone: string): string {
  return formatZoned(date, timeZone, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatCivilDate(year: number, month: number, day: number): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}

export function formatMonthTitle(year: number, month: number): string {
  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1, 12)));
}
