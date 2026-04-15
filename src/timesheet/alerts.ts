import { randomUUID } from "node:crypto";
import type { TimesheetDB } from "./db.js";
import type { TimesheetConfig } from "./types.js";

export interface CapAlert {
  employerId: string;
  threshold: number;
  weeklyHours: number;
  capHours: number;
  message: string;
}

function getWeekBounds(dateStr: string): { start: string; end: string; weekKey: string } {
  const d = new Date(dateStr + "T12:00:00");
  const day = d.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + mondayOffset);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const start = monday.toISOString().slice(0, 10);
  const end = sunday.toISOString().slice(0, 10);
  return { start, end, weekKey: start };
}

function formatAlertMessage(
  employerId: string,
  threshold: number,
  weeklyHours: number,
  capHours: number,
): string {
  const remaining = Math.round((capHours - weeklyHours) * 10) / 10;
  const pct = Math.round(threshold * 100);

  if (threshold >= 1.0) {
    return `🛑 ${employerId}: Weekly cap reached (${weeklyHours}h / ${capHours}h).`;
  }
  if (threshold >= 0.9) {
    return `⚠️ ${employerId}: ${weeklyHours}h logged (${pct}% of ${capHours}h cap). ${remaining}h remaining before cap.`;
  }
  return `${employerId}: ${weeklyHours}h logged (${pct}% of ${capHours}h cap). ${remaining}h remaining.`;
}

function isAlertAlreadySent(
  db: TimesheetDB,
  employerId: string,
  weekKey: string,
  threshold: number,
): boolean {
  return db.findAlert(employerId, weekKey, `cap_${threshold}`);
}

function recordAlert(
  db: TimesheetDB,
  employerId: string,
  weekKey: string,
  threshold: number,
  message: string,
): void {
  db.insertAlert(
    randomUUID(),
    employerId,
    weekKey,
    `cap_${threshold}`,
    message,
    new Date().toISOString(),
  );
}

export function checkCapAlerts(
  db: TimesheetDB,
  config: TimesheetConfig,
  date: string,
): CapAlert[] {
  const { start, end, weekKey } = getWeekBounds(date);
  const alerts: CapAlert[] = [];

  for (const [employerId, empConfig] of Object.entries(config.employers)) {
    if (empConfig.weekly_cap == null) continue;

    const capHours = empConfig.weekly_cap;
    const weeklyHours = db.getWeeklyHours(employerId, start, end);
    const ratio = weeklyHours / capHours;

    // Check each threshold in ascending order
    for (const threshold of [...config.alerts.cap_thresholds].sort()) {
      if (ratio >= threshold) {
        if (!isAlertAlreadySent(db, employerId, weekKey, threshold)) {
          const message = formatAlertMessage(employerId, threshold, weeklyHours, capHours);
          recordAlert(db, employerId, weekKey, threshold, message);
          alerts.push({ employerId, threshold, weeklyHours, capHours, message });
        }
      }
    }
  }

  return alerts;
}
