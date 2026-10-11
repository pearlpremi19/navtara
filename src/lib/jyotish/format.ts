import type { DayMoon } from "./calendar";
import { civilInZone, formatTime } from "./timezone";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

export function formatChangeTime(at: Date, timeZone: string, day: DayMoon): string {
  const time = formatTime(at, timeZone);
  const civil = civilInZone(at, timeZone);
  if (civil.year === day.year && civil.month === day.month && civil.day === day.day) return time;
  return `${time}, ${civil.day} ${MONTHS[civil.month - 1]}`;
}
