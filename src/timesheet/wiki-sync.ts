import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import type { TimesheetDB } from "./db.js";
import type { TimesheetConfig, TimesheetEntry } from "./types.js";

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

function isoWeekNumber(dateStr: string): number {
  const d = new Date(dateStr + "T12:00:00");
  const dayOfYear = Math.floor(
    (d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / 86_400_000,
  ) + 1;
  const wday = d.getDay() || 7;
  return Math.floor((dayOfYear - wday + 10) / 7);
}

function formatWeeklyArticle(
  employerId: string,
  entries: TimesheetEntry[],
  rate: number,
  weekStart: string,
  weekEnd: string,
): string {
  const weekNum = isoWeekNumber(weekStart);
  const year = weekStart.slice(0, 4);
  const totalHours = Math.round(entries.reduce((s, e) => s + e.hours, 0) * 100) / 100;
  const revenue = Math.round(totalHours * rate * 100) / 100;

  // Group by date
  const byDate = new Map<string, TimesheetEntry[]>();
  for (const e of entries) {
    const list = byDate.get(e.date) ?? [];
    list.push(e);
    byDate.set(e.date, list);
  }

  // Category breakdown
  const byCategory = new Map<string, number>();
  for (const e of entries) {
    byCategory.set(e.category, (byCategory.get(e.category) ?? 0) + e.hours);
  }

  const lines: string[] = [];
  lines.push("<!-- AUTO-GENERATED FROM TIMESHEET DB — DO NOT EDIT -->");
  lines.push("<!-- To correct entries: /eod or reply to Telegram report -->");
  lines.push("");
  lines.push(
    `# Timesheet — ${capitalize(employerId)} — Week ${weekNum} (${formatDateShort(weekStart)}–${formatDateShort(weekEnd)}, ${year})`,
  );
  lines.push("");
  lines.push(`**Summary:** ${totalHours}h logged | $${revenue} revenue`);
  lines.push("");

  // Day-by-day
  lines.push("## By Day");
  lines.push("");

  for (const [date, dayEntries] of [...byDate.entries()].sort()) {
    const dayName = new Date(date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" });
    lines.push(`### ${dayName} ${formatDateShort(date)}`);
    for (const e of dayEntries) {
      lines.push(`- ${e.hours}h — ${capitalize(e.category)} (${e.description}) [${e.confidence}]`);
    }
    lines.push("");
  }

  // Category table
  lines.push("## Category Breakdown");
  lines.push("");
  lines.push("| Category | Hours | Amount |");
  lines.push("|----------|-------|--------|");

  for (const [cat, hours] of [...byCategory.entries()].sort()) {
    const roundedHours = Math.round(hours * 100) / 100;
    const amt = Math.round(roundedHours * rate * 100) / 100;
    lines.push(`| ${cat} | ${roundedHours}h | $${amt} |`);
  }

  return lines.join("\n");
}

export function syncWeekToWiki(
  db: TimesheetDB,
  config: TimesheetConfig,
  vaultRoot: string,
  weekStart: string,
  weekEnd: string,
): string[] {
  const entries = db.getEntriesByDateRange(weekStart, weekEnd);
  if (entries.length === 0) return [];

  // Group by employer
  const byEmployer = new Map<string, TimesheetEntry[]>();
  for (const e of entries) {
    const list = byEmployer.get(e.employer_id) ?? [];
    list.push(e);
    byEmployer.set(e.employer_id, list);
  }

  const weekNum = isoWeekNumber(weekStart);
  const year = weekStart.slice(0, 4);
  const paths: string[] = [];

  for (const [employerId, empEntries] of byEmployer) {
    const employer = db.getEmployer(employerId);
    const rate = employer?.rate_hourly ?? 0;

    const relPath = `wiki/timesheet/${employerId}/${year}-W${String(weekNum).padStart(2, "0")}.md`;
    const absPath = join(vaultRoot, relPath);
    mkdirSync(dirname(absPath), { recursive: true });

    const content = formatWeeklyArticle(employerId, empEntries, rate, weekStart, weekEnd);
    writeFileSync(absPath, content, "utf-8");
    paths.push(relPath);
  }

  return paths;
}
