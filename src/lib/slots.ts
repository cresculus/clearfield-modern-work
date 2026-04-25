import { fromZonedTime } from "date-fns-tz";

const TZ = "America/New_York";
const SESSION_MINUTES = 45;

function enumerateEtDates(days: number): string[] {
  const keys: string[] = [];
  const dtf = new Intl.DateTimeFormat("en-CA", { timeZone: TZ });
  const seen = new Set<string>();
  let t = Date.now();
  while (keys.length < days + 5) {
    const key = dtf.format(new Date(t));
    if (!seen.has(key)) {
      seen.add(key);
      keys.push(key);
    }
    t += 24 * 60 * 60 * 1000;
  }
  return keys.slice(0, days);
}

function isWeekendEt(ymd: string): boolean {
  const inst = fromZonedTime(`${ymd}T12:00:00`, TZ);
  const wd = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
  }).format(inst);
  return wd === "Sat" || wd === "Sun";
}

export function generateCandidateSlots(
  count: number,
  now: Date = new Date(),
): Date[] {
  const slots: Date[] = [];
  const dates = enumerateEtDates(50);

  for (const ymd of dates) {
    if (isWeekendEt(ymd)) continue;
    for (const hour of [9, 10, 11, 13, 14, 15, 16]) {
      const utc = fromZonedTime(
        `${ymd}T${hour.toString().padStart(2, "0")}:00:00`,
        TZ,
      );
      if (utc.getTime() <= now.getTime() + 15 * 60 * 1000) continue;
      slots.push(utc);
      if (slots.length >= count) return slots;
    }
  }

  return slots;
}

export function addSessionMinutes(start: Date): Date {
  return new Date(start.getTime() + SESSION_MINUTES * 60 * 1000);
}

export function formatSlotEt(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(d);
}
