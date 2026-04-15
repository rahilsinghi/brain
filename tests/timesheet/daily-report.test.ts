import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TimesheetDB } from "../../src/timesheet/db.js";
import {
  generateDailyReport,
  type DailyReportResult,
} from "../../src/timesheet/daily-report.js";
import type { TimesheetConfig } from "../../src/timesheet/types.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/daily-report-test");

const BASE_CONFIG: TimesheetConfig = {
  employers: {
    maison: {
      rate_hourly: 50,
      weekly_cap: 20,
      monthly_bonus: null,
      currency: "USD",
      repos: [],
      email_domains: [],
      contacts: [],
    },
    wilbo: {
      rate_hourly: 0,
      monthly_bonus: 1800,
      currency: "USD",
      repos: [],
      email_domains: [],
      contacts: [],
    },
  },
  scanner: {
    poll_interval_minutes: 15,
    session_gap_minutes: 30,
    buffer_minutes: 15,
    git_user: "Test User",
    exclude_paths: [],
  },
  alerts: { cap_thresholds: [0.75, 0.9, 1.0] },
  review: {
    report_hour: 9,
    finalize_day: "sunday",
    finalize_hour: 18,
    gap_threshold_minutes: 45,
    gap_auto_resolve_days: 3,
  },
};

function seedEmployers(db: TimesheetDB): void {
  db.upsertEmployer({
    id: "maison",
    rate_hourly: 50,
    weekly_cap_hours: 20,
    monthly_bonus: null,
    currency: "USD",
  });
  db.upsertEmployer({
    id: "wilbo",
    rate_hourly: 0,
    weekly_cap_hours: null,
    monthly_bonus: 1800,
    currency: "USD",
  });
}

describe("generateDailyReport", () => {
  let db: TimesheetDB;

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
    db = new TimesheetDB(join(TEST_DIR, "test.db"));
    seedEmployers(db);
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("returns empty report when no entries exist", () => {
    const result = generateDailyReport(db, BASE_CONFIG, "2026-04-15");
    expect(result.message).toContain("No entries");
    expect(result.entryIds).toEqual([]);
  });

  it("formats a single entry with numbered index", () => {
    db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 3.25,
      start_time: "2026-04-15T13:00:00-04:00",
      end_time: "2026-04-15T16:15:00-04:00",
      category: "devops",
      confidence: "high",
      description: "Day 1 infrastructure setup",
      source: "git_session",
    });

    const result = generateDailyReport(db, BASE_CONFIG, "2026-04-15");

    expect(result.entryIds).toHaveLength(1);
    expect(result.message).toContain("MAISON");
    expect(result.message).toContain("#1");
    expect(result.message).toContain("3.25h");
    expect(result.message).toContain("devops");
    expect(result.message).toContain("Day 1 infrastructure setup");
  });

  it("groups entries by employer", () => {
    db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 2,
      start_time: "2026-04-15T09:00:00-04:00",
      end_time: "2026-04-15T11:00:00-04:00",
      category: "coding",
      description: "API work",
      source: "git_session",
    });
    db.insertEntry({
      date: "2026-04-15",
      employer_id: "wilbo",
      hours: 1.5,
      start_time: "2026-04-15T14:00:00-04:00",
      end_time: "2026-04-15T15:30:00-04:00",
      category: "coding",
      description: "Script update",
      source: "git_session",
    });

    const result = generateDailyReport(db, BASE_CONFIG, "2026-04-15");

    expect(result.entryIds).toHaveLength(2);
    expect(result.message).toContain("MAISON");
    expect(result.message).toContain("WILBO");
    expect(result.message).toContain("#1");
    expect(result.message).toContain("#2");
  });

  it("shows weekly revenue for capped employers", () => {
    db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 3.75,
      start_time: "2026-04-15T10:00:00-04:00",
      end_time: "2026-04-15T13:45:00-04:00",
      category: "coding",
      description: "Feature work",
      source: "git_session",
    });

    const result = generateDailyReport(db, BASE_CONFIG, "2026-04-15");

    // 3.75h * $50 = $187.50
    expect(result.message).toContain("$187.50");
    expect(result.message).toMatch(/\d+%.*cap/i);
  });

  it("includes confidence indicator in entry line", () => {
    db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 1,
      start_time: "2026-04-15T09:00:00-04:00",
      end_time: "2026-04-15T10:00:00-04:00",
      confidence: "high",
      category: "coding",
      description: "Precise entry",
      source: "manual",
    });

    const result = generateDailyReport(db, BASE_CONFIG, "2026-04-15");
    // High confidence shown as ⚡
    expect(result.message).toMatch(/⚡/);
  });

  it("detects gaps between entries exceeding threshold", () => {
    db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 2,
      start_time: "2026-04-15T09:00:00-04:00",
      end_time: "2026-04-15T11:00:00-04:00",
      category: "coding",
      description: "Morning work",
      source: "git_session",
    });
    // 2-hour gap (11:00 to 13:00) — exceeds 45 min threshold
    db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 2,
      start_time: "2026-04-15T13:00:00-04:00",
      end_time: "2026-04-15T15:00:00-04:00",
      category: "coding",
      description: "Afternoon work",
      source: "git_session",
    });

    const result = generateDailyReport(db, BASE_CONFIG, "2026-04-15");
    expect(result.message).toMatch(/gap/i);
  });

  it("entryIds are ordered same as numbered entries in message", () => {
    const id1 = db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 1,
      start_time: "2026-04-15T09:00:00-04:00",
      end_time: "2026-04-15T10:00:00-04:00",
      category: "coding",
      description: "First",
      source: "git_session",
    });
    const id2 = db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 1,
      start_time: "2026-04-15T11:00:00-04:00",
      end_time: "2026-04-15T12:00:00-04:00",
      category: "coding",
      description: "Second",
      source: "git_session",
    });

    const result = generateDailyReport(db, BASE_CONFIG, "2026-04-15");
    expect(result.entryIds[0]).toBe(id1);
    expect(result.entryIds[1]).toBe(id2);
  });

  it("returns the target date in result", () => {
    const result = generateDailyReport(db, BASE_CONFIG, "2026-04-15");
    expect(result.date).toBe("2026-04-15");
  });
});
