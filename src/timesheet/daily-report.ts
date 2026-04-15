import type { TimesheetDB } from "./db.js";
import type { TimesheetConfig, TimesheetEntry } from "./types.js";

export interface DailyReportResult {
  message: string;
  entryIds: string[];
  date: string;
}

interface EmployerBlock {
  employerId: string;
  entries: TimesheetEntry[];
  weeklyHours: number;
  weeklyCapHours: number | null;
  rateHourly: number;
}

const CONFIDENCE_ICONS: Record<string, string> = {
  high: "⚡",
  medium: "⚡",
  low: "❓",
};

function formatTime(isoString: string): string {
  const d = new Date(isoString);
  const h = d.getHours();
  const m = d.getMinutes();
  const suffix = h >= 12 ? "p" : "a";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, "0")}${suffix}`;
}

function formatDateHeader(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`;
}

function getWeekBounds(dateStr: string): { start: string; end: string } {
  const d = new Date(dateStr + "T12:00:00");
  const day = d.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + mondayOffset);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return {
    start: monday.toISOString().slice(0, 10),
    end: sunday.toISOString().slice(0, 10),
  };
}

function detectGaps(
  entries: TimesheetEntry[],
  thresholdMinutes: number,
): Array<{ afterEntry: number; gapMinutes: number }> {
  const gaps: Array<{ afterEntry: number; gapMinutes: number }> = [];
  for (let i = 0; i < entries.length - 1; i++) {
    const endMs = new Date(entries[i].end_time).getTime();
    const startMs = new Date(entries[i + 1].start_time).getTime();
    const gapMs = startMs - endMs;
    const gapMinutes = gapMs / 60_000;
    if (gapMinutes > thresholdMinutes) {
      gaps.push({ afterEntry: i, gapMinutes });
    }
  }
  return gaps;
}

export function generateDailyReport(
  db: TimesheetDB,
  config: TimesheetConfig,
  date: string,
): DailyReportResult {
  const entries = db.getEntriesByDateRange(date, date);

  if (entries.length === 0) {
    return {
      message: `📋 Timesheet — ${formatDateHeader(date)}\n\nNo entries for this day.`,
      entryIds: [],
      date,
    };
  }

  const { start: weekStart, end: weekEnd } = getWeekBounds(date);

  // Group entries by employer, preserving global order for numbering
  const employerMap = new Map<string, TimesheetEntry[]>();
  for (const entry of entries) {
    const list = employerMap.get(entry.employer_id) ?? [];
    list.push(entry);
    employerMap.set(entry.employer_id, list);
  }

  // Build employer blocks with weekly context
  const blocks: EmployerBlock[] = [];
  for (const [employerId, empEntries] of employerMap) {
    const employer = db.getEmployer(employerId);
    const weeklyHours = db.getWeeklyHours(employerId, weekStart, weekEnd);
    blocks.push({
      employerId,
      entries: empEntries,
      weeklyHours,
      weeklyCapHours: employer?.weekly_cap_hours ?? null,
      rateHourly: employer?.rate_hourly ?? 0,
    });
  }

  // Build ordered entryIds (same order as numbered display)
  const allEntryIds: string[] = [];
  let entryNumber = 1;

  const lines: string[] = [];
  lines.push(`📋 Timesheet — ${formatDateHeader(date)}`);

  for (const block of blocks) {
    const dayHours = block.entries.reduce((s, e) => s + e.hours, 0);
    const capStr = block.weeklyCapHours != null
      ? ` / ${block.weeklyCapHours}h cap`
      : "";
    lines.push("");
    lines.push(`${block.employerId.toUpperCase()} (${dayHours}h${capStr})`);
    lines.push("━━━━━━━━━━━━━━━━━━━━━");

    for (const entry of block.entries) {
      allEntryIds.push(entry.id);
      const icon = CONFIDENCE_ICONS[entry.confidence] ?? "⚡";
      const proofs = db.getProofArtifacts(entry.id);
      const commitCount = proofs.filter((p) => p.type === "commit").length;
      const loc = proofs.reduce((sum, p) => {
        try {
          const meta = JSON.parse(p.metadata);
          return sum + (meta.additions ?? 0) + (meta.deletions ?? 0);
        } catch {
          return sum;
        }
      }, 0);

      lines.push(
        `#${entryNumber} ${icon} ${entry.hours}h ${entry.category} [${entry.confidence}]`,
      );
      lines.push(
        `${formatTime(entry.start_time)}–${formatTime(entry.end_time)} — ${entry.description}`,
      );
      if (commitCount > 0) {
        lines.push(`${commitCount} commit${commitCount !== 1 ? "s" : ""}, +${loc} LOC`);
      }
      entryNumber++;
    }

    // Detect gaps within this employer's entries
    const gaps = detectGaps(
      block.entries,
      config.review.gap_threshold_minutes,
    );
    for (const gap of gaps) {
      const afterEntry = block.entries[gap.afterEntry];
      const beforeEntry = block.entries[gap.afterEntry + 1];
      const gapH = Math.round(gap.gapMinutes / 60 * 10) / 10;
      lines.push("");
      lines.push(
        `⚠️ Gap: ${formatTime(afterEntry.end_time)}–${formatTime(beforeEntry.start_time)} (${gapH}h)`,
      );
    }

    // Weekly summary line
    if (block.rateHourly > 0 && block.weeklyCapHours != null) {
      const revenue = Math.round(block.weeklyHours * block.rateHourly * 100) / 100;
      const pct = Math.round((block.weeklyHours / block.weeklyCapHours) * 100);
      lines.push("");
      lines.push(
        `💰 Week: ${block.weeklyHours}h × $${block.rateHourly} = $${revenue.toFixed(2)} (${pct}% of cap)`,
      );
    }
  }

  lines.push("");
  lines.push("Reply: ok ✓ | #N = Xh | +Xh employer cat desc | drop #N");

  return {
    message: lines.join("\n"),
    entryIds: allEntryIds,
    date,
  };
}
