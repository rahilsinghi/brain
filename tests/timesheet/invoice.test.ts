import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TimesheetDB } from "../../src/timesheet/db.js";
import {
  generateInvoice,
  type InvoiceResult,
} from "../../src/timesheet/invoice.js";
import type { TimesheetConfig } from "../../src/timesheet/types.js";
import { mkdirSync, rmSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/invoice-test");
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

function seedAndFinalize(db: TimesheetDB): string[] {
  db.upsertEmployer({
    id: "maison",
    rate_hourly: 50,
    weekly_cap_hours: 20,
    monthly_bonus: null,
    currency: "USD",
  });

  const ids: string[] = [];
  ids.push(
    db.insertEntry({
      date: "2026-04-14",
      employer_id: "maison",
      hours: 5,
      start_time: "2026-04-14T09:00:00",
      end_time: "2026-04-14T14:00:00",
      category: "coding",
      description: "Auth middleware",
      source: "git_session",
    }),
  );
  ids.push(
    db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 4,
      start_time: "2026-04-15T09:00:00",
      end_time: "2026-04-15T13:00:00",
      category: "coding",
      description: "Travel search API",
      source: "git_session",
    }),
  );
  ids.push(
    db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 1,
      start_time: "2026-04-15T14:00:00",
      end_time: "2026-04-15T15:00:00",
      category: "meeting",
      description: "Standup",
      source: "manual",
    }),
  );

  // Finalize all
  for (const id of ids) {
    db.updateEntryStatus(id, "reviewed");
    db.updateEntryStatus(id, "finalized");
  }

  return ids;
}

describe("generateInvoice", () => {
  let db: TimesheetDB;

  beforeEach(() => {
    mkdirSync(join(VAULT_ROOT, "output", "invoices"), { recursive: true });
    db = new TimesheetDB(join(TEST_DIR, "test.db"));
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("generates markdown invoice file", () => {
    const entryIds = seedAndFinalize(db);

    const result = generateInvoice(db, BASE_CONFIG, VAULT_ROOT, {
      employerId: "maison",
      periodStart: "2026-04-14",
      periodEnd: "2026-04-20",
    });

    expect(result.success).toBe(true);
    expect(result.mdPath).toContain("maison");
    expect(existsSync(join(VAULT_ROOT, result.mdPath!))).toBe(true);

    const md = readFileSync(join(VAULT_ROOT, result.mdPath!), "utf-8");
    expect(md).toContain("Maison");
    expect(md).toContain("10"); // total hours
    expect(md).toContain("500"); // 10h * $50
  });

  it("generates CSV export file", () => {
    seedAndFinalize(db);

    const result = generateInvoice(db, BASE_CONFIG, VAULT_ROOT, {
      employerId: "maison",
      periodStart: "2026-04-14",
      periodEnd: "2026-04-20",
    });

    expect(result.csvPath).toBeDefined();
    expect(existsSync(join(VAULT_ROOT, result.csvPath!))).toBe(true);

    const csv = readFileSync(join(VAULT_ROOT, result.csvPath!), "utf-8");
    expect(csv).toContain("date,employer_id,hours,category,description");
    expect(csv).toContain("maison");
  });

  it("inserts invoice row into DB", () => {
    seedAndFinalize(db);

    const result = generateInvoice(db, BASE_CONFIG, VAULT_ROOT, {
      employerId: "maison",
      periodStart: "2026-04-14",
      periodEnd: "2026-04-20",
    });

    expect(result.invoiceId).toBeDefined();
    const invoice = db.getInvoice(result.invoiceId!);
    expect(invoice).not.toBeNull();
    expect(invoice!.employer_id).toBe("maison");
    expect(invoice!.total_hours).toBe(10);
    expect(invoice!.total_amount).toBe(500);
  });

  it("transitions entries to invoiced status", () => {
    const ids = seedAndFinalize(db);

    generateInvoice(db, BASE_CONFIG, VAULT_ROOT, {
      employerId: "maison",
      periodStart: "2026-04-14",
      periodEnd: "2026-04-20",
    });

    for (const id of ids) {
      const entry = db.getEntry(id)!;
      expect(entry.status).toBe("invoiced");
      expect(entry.invoice_id).not.toBeNull();
    }
  });

  it("includes category breakdown in markdown", () => {
    seedAndFinalize(db);

    const result = generateInvoice(db, BASE_CONFIG, VAULT_ROOT, {
      employerId: "maison",
      periodStart: "2026-04-14",
      periodEnd: "2026-04-20",
    });

    const md = readFileSync(join(VAULT_ROOT, result.mdPath!), "utf-8");
    expect(md).toContain("coding");
    expect(md).toContain("meeting");
  });

  it("fails for unknown employer", () => {
    const result = generateInvoice(db, BASE_CONFIG, VAULT_ROOT, {
      employerId: "unknown",
      periodStart: "2026-04-14",
      periodEnd: "2026-04-20",
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not found/i);
  });

  it("returns empty result when no finalized entries", () => {
    db.upsertEmployer({
      id: "maison",
      rate_hourly: 50,
      weekly_cap_hours: 20,
      monthly_bonus: null,
      currency: "USD",
    });

    const result = generateInvoice(db, BASE_CONFIG, VAULT_ROOT, {
      employerId: "maison",
      periodStart: "2026-04-14",
      periodEnd: "2026-04-20",
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/no finalized/i);
  });
});
