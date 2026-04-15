import type { TimesheetDB } from "./db.js";
import type { TimesheetEntry } from "./types.js";

// ── Types ──

export interface EmployerSummary {
  hours: number;
  revenue: number;
  cap_percent: number | null;
  days_worked: number;
  entries_by_status: Record<string, number>;
  categories: Record<string, number>;
}

export interface StatusSummary {
  [employerId: string]: EmployerSummary;
}

export interface DayBreakdown {
  date: string;
  entries: TimesheetEntry[];
  total_hours: number;
  by_employer: Record<string, number>;
}

export interface WeekMatrix {
  [employerId: string]: Record<string, number>;
}

// ── Helpers ──

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Generate all date strings (YYYY-MM-DD) from start to end inclusive. */
function dateRange(start: string, end: string): string[] {
  const dates: string[] = [];
  const current = new Date(start + "T00:00:00");
  const last = new Date(end + "T00:00:00");
  while (current <= last) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

// ── Query Functions ──

export function getStatusSummary(
  db: TimesheetDB,
  weekStart: string,
  weekEnd: string
): StatusSummary {
  const entries = db.getEntriesByDateRange(weekStart, weekEnd);
  if (entries.length === 0) return {};

  const result: StatusSummary = {};

  for (const entry of entries) {
    const eid = entry.employer_id;

    if (!result[eid]) {
      const employer = db.getEmployer(eid);
      const rate = employer?.rate_hourly ?? 0;
      const cap = employer?.weekly_cap_hours ?? null;

      result[eid] = {
        hours: 0,
        revenue: 0,
        cap_percent: null,
        days_worked: 0,
        entries_by_status: {},
        categories: {},
        // stash rate/cap for computation — deleted before return
        ...({ _rate: rate, _cap: cap } as Record<string, unknown>),
      } as EmployerSummary & { _rate: number; _cap: number | null };
    }

    const summary = result[eid] as EmployerSummary & {
      _rate: number;
      _cap: number | null;
      _dates?: Set<string>;
    };

    summary.hours += entry.hours;

    // Track distinct dates
    if (!summary._dates) summary._dates = new Set();
    summary._dates.add(entry.date);

    // Count by status
    summary.entries_by_status[entry.status] =
      (summary.entries_by_status[entry.status] ?? 0) + 1;

    // Count by category
    summary.categories[entry.category] =
      (summary.categories[entry.category] ?? 0) + entry.hours;
  }

  // Finalize computed fields and clean up internal props
  for (const eid of Object.keys(result)) {
    const s = result[eid] as EmployerSummary & {
      _rate: number;
      _cap: number | null;
      _dates: Set<string>;
    };

    s.hours = round2(s.hours);
    s.revenue = round2(s.hours * s._rate);
    s.cap_percent = s._cap != null ? round2((s.hours / s._cap) * 100) : null;
    s.days_worked = s._dates.size;

    // Round category hours
    for (const cat of Object.keys(s.categories)) {
      s.categories[cat] = round2(s.categories[cat]);
    }

    // Remove internal properties
    delete (s as Record<string, unknown>)._rate;
    delete (s as Record<string, unknown>)._cap;
    delete (s as Record<string, unknown>)._dates;
  }

  return result;
}

export function getTodayBreakdown(
  db: TimesheetDB,
  date: string
): DayBreakdown {
  const entries = db.getEntriesByDateRange(date, date);

  const by_employer: Record<string, number> = {};
  let total_hours = 0;

  for (const entry of entries) {
    total_hours += entry.hours;
    by_employer[entry.employer_id] =
      (by_employer[entry.employer_id] ?? 0) + entry.hours;
  }

  return {
    date,
    entries,
    total_hours: round2(total_hours),
    by_employer,
  };
}

export function getWeekMatrix(
  db: TimesheetDB,
  weekStart: string,
  weekEnd: string
): WeekMatrix {
  const entries = db.getEntriesByDateRange(weekStart, weekEnd);
  if (entries.length === 0) return {};

  const dates = dateRange(weekStart, weekEnd);
  const result: WeekMatrix = {};

  // Collect all employer IDs from entries
  const employerIds = new Set(entries.map((e) => e.employer_id));

  // Initialize all employers x dates to 0
  for (const eid of employerIds) {
    result[eid] = {};
    for (const d of dates) {
      result[eid][d] = 0;
    }
  }

  // Sum hours
  for (const entry of entries) {
    result[entry.employer_id][entry.date] += entry.hours;
  }

  return result;
}
