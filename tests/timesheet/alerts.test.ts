import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TimesheetDB } from "../../src/timesheet/db.js";
import { checkCapAlerts, type CapAlert } from "../../src/timesheet/alerts.js";
import type { TimesheetConfig } from "../../src/timesheet/types.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/alerts-test");

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

function seedEmployer(db: TimesheetDB): void {
  db.upsertEmployer({
    id: "maison",
    rate_hourly: 50,
    weekly_cap_hours: 20,
    monthly_bonus: null,
    currency: "USD",
  });
}

describe("checkCapAlerts", () => {
  let db: TimesheetDB;

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
    db = new TimesheetDB(join(TEST_DIR, "test.db"));
    seedEmployer(db);
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("returns no alerts when hours are below first threshold", () => {
    // 10h out of 20h = 50%, below 75% threshold
    db.insertEntry({
      date: "2026-04-14",
      employer_id: "maison",
      hours: 10,
      start_time: "2026-04-14T09:00:00",
      end_time: "2026-04-14T19:00:00",
      description: "work",
      source: "git_session",
    });

    const alerts = checkCapAlerts(db, BASE_CONFIG, "2026-04-14");
    expect(alerts).toEqual([]);
  });

  it("returns 75% alert when threshold crossed", () => {
    // 15h / 20h = 75%
    db.insertEntry({
      date: "2026-04-14",
      employer_id: "maison",
      hours: 15,
      start_time: "2026-04-14T09:00:00",
      end_time: "2026-04-15T00:00:00",
      description: "work",
      source: "git_session",
    });

    const alerts = checkCapAlerts(db, BASE_CONFIG, "2026-04-14");
    expect(alerts).toHaveLength(1);
    expect(alerts[0].employerId).toBe("maison");
    expect(alerts[0].threshold).toBe(0.75);
    expect(alerts[0].message).toContain("15h");
    expect(alerts[0].message).toContain("75%");
    expect(alerts[0].message).toContain("5h remaining");
  });

  it("returns 90% alert when threshold crossed", () => {
    // 18h / 20h = 90%
    db.insertEntry({
      date: "2026-04-14",
      employer_id: "maison",
      hours: 18,
      start_time: "2026-04-14T09:00:00",
      end_time: "2026-04-15T03:00:00",
      description: "work",
      source: "git_session",
    });

    const alerts = checkCapAlerts(db, BASE_CONFIG, "2026-04-14");
    // Should return both 75% and 90% alerts
    expect(alerts.length).toBeGreaterThanOrEqual(1);
    const alert90 = alerts.find((a) => a.threshold === 0.9);
    expect(alert90).toBeDefined();
    expect(alert90!.message).toContain("⚠️");
    expect(alert90!.message).toContain("2h remaining");
  });

  it("returns 100% alert when cap reached", () => {
    db.insertEntry({
      date: "2026-04-14",
      employer_id: "maison",
      hours: 20,
      start_time: "2026-04-14T09:00:00",
      end_time: "2026-04-15T05:00:00",
      description: "work",
      source: "git_session",
    });

    const alerts = checkCapAlerts(db, BASE_CONFIG, "2026-04-14");
    const alert100 = alerts.find((a) => a.threshold === 1.0);
    expect(alert100).toBeDefined();
    expect(alert100!.message).toContain("🛑");
  });

  it("deduplicates — same alert not returned twice in same week", () => {
    db.insertEntry({
      date: "2026-04-14",
      employer_id: "maison",
      hours: 15,
      start_time: "2026-04-14T09:00:00",
      end_time: "2026-04-15T00:00:00",
      description: "work",
      source: "git_session",
    });

    // First check — should return alert
    const first = checkCapAlerts(db, BASE_CONFIG, "2026-04-14");
    expect(first).toHaveLength(1);

    // Second check — same week, should be deduped
    const second = checkCapAlerts(db, BASE_CONFIG, "2026-04-14");
    expect(second).toHaveLength(0);
  });

  it("skips employers without a weekly cap", () => {
    db.upsertEmployer({
      id: "wilbo",
      rate_hourly: 0,
      weekly_cap_hours: null,
      monthly_bonus: 1800,
      currency: "USD",
    });
    db.insertEntry({
      date: "2026-04-14",
      employer_id: "wilbo",
      hours: 100,
      start_time: "2026-04-14T09:00:00",
      end_time: "2026-04-14T19:00:00",
      description: "work",
      source: "git_session",
    });

    const configWithWilbo: TimesheetConfig = {
      ...BASE_CONFIG,
      employers: {
        ...BASE_CONFIG.employers,
        wilbo: {
          rate_hourly: 0,
          weekly_cap: null,
          monthly_bonus: 1800,
          currency: "USD",
          repos: [],
          email_domains: [],
          contacts: [],
        },
      },
    };

    const alerts = checkCapAlerts(db, configWithWilbo, "2026-04-14");
    const wilboAlerts = alerts.filter((a) => a.employerId === "wilbo");
    expect(wilboAlerts).toHaveLength(0);
  });
});
