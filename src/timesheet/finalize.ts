import type { TimesheetDB } from "./db.js";
import type { TimesheetConfig, TimesheetEntry } from "./types.js";

export interface EmployerFinalizeSummary {
  hours: number;
  revenue: number;
  entries: number;
}

export interface FinalizeResult {
  finalized: number;
  autoFinalized: number;
  alreadyFinalized: number;
  employers: Record<string, EmployerFinalizeSummary>;
  message: string;
}

export function finalizeWeek(
  db: TimesheetDB,
  config: TimesheetConfig,
  weekStart: string,
  weekEnd: string,
): FinalizeResult {
  const entries = db.getEntriesByDateRange(weekStart, weekEnd);

  let finalized = 0;
  let autoFinalized = 0;
  let alreadyFinalized = 0;
  const employers: Record<string, EmployerFinalizeSummary> = {};

  for (const entry of entries) {
    // Track per-employer totals (including already-finalized)
    if (!employers[entry.employer_id]) {
      const emp = db.getEmployer(entry.employer_id);
      employers[entry.employer_id] = { hours: 0, revenue: 0, entries: 0 };
      // Store rate for calculation — cleaned up below
      (employers[entry.employer_id] as { _rate?: number })._rate = emp?.rate_hourly ?? 0;
    }

    const summary = employers[entry.employer_id] as EmployerFinalizeSummary & { _rate?: number };
    summary.hours += entry.hours;
    summary.entries++;

    if (entry.status === "finalized" || entry.status === "invoiced" || entry.status === "paid") {
      alreadyFinalized++;
      continue;
    }

    // Finalize reviewed and draft entries
    if (entry.status === "draft") {
      autoFinalized++;
    }

    db.updateEntryStatus(entry.id, "finalized");
    finalized++;
  }

  // Compute revenue and clean up internal fields
  for (const eid of Object.keys(employers)) {
    const s = employers[eid] as EmployerFinalizeSummary & { _rate?: number };
    s.hours = Math.round(s.hours * 100) / 100;
    s.revenue = Math.round(s.hours * (s._rate ?? 0) * 100) / 100;
    delete s._rate;
  }

  // Format message
  const lines: string[] = [];
  lines.push(`✅ Finalized week ${weekStart} → ${weekEnd}`);

  if (autoFinalized > 0) {
    lines.push(`⚠️ ${autoFinalized} draft entries auto-finalized (were not reviewed)`);
  }

  for (const [eid, s] of Object.entries(employers)) {
    const capStr = config.employers[eid]?.weekly_cap != null
      ? ` / ${config.employers[eid].weekly_cap}h cap`
      : "";
    lines.push(`${eid.toUpperCase()}: ${s.hours}h → $${s.revenue}${capStr}`);
  }

  lines.push(`Total: ${finalized} finalized, ${alreadyFinalized} already done.`);

  return {
    finalized,
    autoFinalized,
    alreadyFinalized,
    employers,
    message: lines.join("\n"),
  };
}
