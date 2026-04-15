import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TimesheetDB } from "../../src/timesheet/db.js";
import {
  finalizeWeek,
  type FinalizeResult,
} from "../../src/timesheet/finalize.js";
import type { TimesheetConfig } from "../../src/timesheet/types.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/finalize-test");

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
    finalize_hour: 20,
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

describe("finalizeWeek", () => {
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

  it("transitions reviewed entries to finalized", () => {
    const id1 = db.insertEntry({
      date: "2026-04-14",
      employer_id: "maison",
      hours: 3,
      start_time: "2026-04-14T09:00:00",
      end_time: "2026-04-14T12:00:00",
      description: "work",
      source: "git_session",
    });
    db.updateEntryStatus(id1, "reviewed");

    const result = finalizeWeek(db, BASE_CONFIG, "2026-04-14", "2026-04-20");

    expect(result.finalized).toBe(1);
    expect(db.getEntry(id1)!.status).toBe("finalized");
    expect(db.getEntry(id1)!.finalized_at).not.toBeNull();
  });

  it("auto-finalizes draft entries with warning", () => {
    const id1 = db.insertEntry({
      date: "2026-04-14",
      employer_id: "maison",
      hours: 2,
      start_time: "2026-04-14T09:00:00",
      end_time: "2026-04-14T11:00:00",
      description: "unreviewed work",
      source: "git_session",
    });
    // Leave as draft (not reviewed)

    const result = finalizeWeek(db, BASE_CONFIG, "2026-04-14", "2026-04-20");

    expect(result.finalized).toBe(1);
    expect(result.autoFinalized).toBe(1);
    expect(db.getEntry(id1)!.status).toBe("finalized");
  });

  it("skips already finalized entries", () => {
    const id1 = db.insertEntry({
      date: "2026-04-14",
      employer_id: "maison",
      hours: 3,
      start_time: "2026-04-14T09:00:00",
      end_time: "2026-04-14T12:00:00",
      description: "already done",
      source: "git_session",
    });
    db.updateEntryStatus(id1, "reviewed");
    db.updateEntryStatus(id1, "finalized");

    const result = finalizeWeek(db, BASE_CONFIG, "2026-04-14", "2026-04-20");

    expect(result.finalized).toBe(0);
    expect(result.alreadyFinalized).toBe(1);
  });

  it("skips ignored entries", () => {
    const id1 = db.insertEntry({
      date: "2026-04-14",
      employer_id: "maison",
      hours: 1,
      start_time: "2026-04-14T09:00:00",
      end_time: "2026-04-14T10:00:00",
      description: "dropped",
      source: "git_session",
    });
    db.updateEntryStatus(id1, "ignored");

    const result = finalizeWeek(db, BASE_CONFIG, "2026-04-14", "2026-04-20");

    // ignored entries excluded by getEntriesByDateRange
    expect(result.finalized).toBe(0);
  });

  it("returns per-employer summary", () => {
    db.insertEntry({
      date: "2026-04-14",
      employer_id: "maison",
      hours: 5,
      start_time: "2026-04-14T09:00:00",
      end_time: "2026-04-14T14:00:00",
      description: "work",
      source: "git_session",
    });
    db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 4,
      start_time: "2026-04-15T09:00:00",
      end_time: "2026-04-15T13:00:00",
      description: "more work",
      source: "git_session",
    });

    const result = finalizeWeek(db, BASE_CONFIG, "2026-04-14", "2026-04-20");

    expect(result.employers.maison).toBeDefined();
    expect(result.employers.maison.hours).toBe(9);
    expect(result.employers.maison.revenue).toBe(450);
  });

  it("returns formatted Telegram message", () => {
    db.insertEntry({
      date: "2026-04-14",
      employer_id: "maison",
      hours: 5,
      start_time: "2026-04-14T09:00:00",
      end_time: "2026-04-14T14:00:00",
      description: "work",
      source: "git_session",
    });

    const result = finalizeWeek(db, BASE_CONFIG, "2026-04-14", "2026-04-20");

    expect(result.message).toContain("Finalized");
    expect(result.message).toContain("MAISON");
    expect(result.message).toContain("5h");
  });
});
