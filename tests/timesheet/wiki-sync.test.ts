import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TimesheetDB } from "../../src/timesheet/db.js";
import { syncWeekToWiki } from "../../src/timesheet/wiki-sync.js";
import type { TimesheetConfig } from "../../src/timesheet/types.js";
import { mkdirSync, rmSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/wiki-sync-test");
const VAULT_ROOT = join(TEST_DIR, "vault");

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

function seedEntries(db: TimesheetDB): void {
  db.upsertEmployer({
    id: "maison",
    rate_hourly: 50,
    weekly_cap_hours: 20,
    monthly_bonus: null,
    currency: "USD",
  });

  const id1 = db.insertEntry({
    date: "2026-04-14",
    employer_id: "maison",
    hours: 5,
    start_time: "2026-04-14T09:00:00",
    end_time: "2026-04-14T14:00:00",
    category: "coding",
    description: "Auth middleware",
    source: "git_session",
  });
  db.updateEntryStatus(id1, "reviewed");
  db.updateEntryStatus(id1, "finalized");

  const id2 = db.insertEntry({
    date: "2026-04-15",
    employer_id: "maison",
    hours: 3,
    start_time: "2026-04-15T09:00:00",
    end_time: "2026-04-15T12:00:00",
    category: "meeting",
    description: "Sprint planning",
    source: "manual",
  });
  db.updateEntryStatus(id2, "reviewed");
  db.updateEntryStatus(id2, "finalized");
}

describe("syncWeekToWiki", () => {
  let db: TimesheetDB;

  beforeEach(() => {
    mkdirSync(VAULT_ROOT, { recursive: true });
    db = new TimesheetDB(join(TEST_DIR, "test.db"));
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("writes weekly wiki article for employer", () => {
    seedEntries(db);

    const paths = syncWeekToWiki(db, BASE_CONFIG, VAULT_ROOT, "2026-04-14", "2026-04-20");

    expect(paths).toHaveLength(1);
    expect(paths[0]).toContain("maison");
    expect(existsSync(join(VAULT_ROOT, paths[0]))).toBe(true);
  });

  it("includes auto-generated header", () => {
    seedEntries(db);

    const paths = syncWeekToWiki(db, BASE_CONFIG, VAULT_ROOT, "2026-04-14", "2026-04-20");
    const content = readFileSync(join(VAULT_ROOT, paths[0]), "utf-8");

    expect(content).toContain("AUTO-GENERATED");
  });

  it("includes summary with total hours and revenue", () => {
    seedEntries(db);

    const paths = syncWeekToWiki(db, BASE_CONFIG, VAULT_ROOT, "2026-04-14", "2026-04-20");
    const content = readFileSync(join(VAULT_ROOT, paths[0]), "utf-8");

    expect(content).toContain("8h"); // 5 + 3
    expect(content).toContain("$400"); // 8 * 50
  });

  it("includes day-by-day breakdown", () => {
    seedEntries(db);

    const paths = syncWeekToWiki(db, BASE_CONFIG, VAULT_ROOT, "2026-04-14", "2026-04-20");
    const content = readFileSync(join(VAULT_ROOT, paths[0]), "utf-8");

    expect(content).toContain("Apr 14");
    expect(content).toContain("Apr 15");
    expect(content).toContain("Auth middleware");
    expect(content).toContain("Sprint planning");
  });

  it("includes category breakdown table", () => {
    seedEntries(db);

    const paths = syncWeekToWiki(db, BASE_CONFIG, VAULT_ROOT, "2026-04-14", "2026-04-20");
    const content = readFileSync(join(VAULT_ROOT, paths[0]), "utf-8");

    expect(content).toContain("coding");
    expect(content).toContain("meeting");
    expect(content).toMatch(/Category.*Hours/);
  });

  it("returns empty array when no entries", () => {
    db.upsertEmployer({
      id: "maison",
      rate_hourly: 50,
      weekly_cap_hours: 20,
      monthly_bonus: null,
      currency: "USD",
    });

    const paths = syncWeekToWiki(db, BASE_CONFIG, VAULT_ROOT, "2026-04-14", "2026-04-20");
    expect(paths).toEqual([]);
  });
});
