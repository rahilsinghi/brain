import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TimesheetDB } from "../../src/timesheet/db.js";
import {
  getStatusSummary,
  getTodayBreakdown,
  getWeekMatrix,
} from "../../src/timesheet/status.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/timesheet-status-test");

describe("status queries", () => {
  let db: TimesheetDB;

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
    db = new TimesheetDB(join(TEST_DIR, "test.db"));

    // Two employers
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

    // Entries across Mon-Wed (2026-04-13 to 2026-04-15)
    db.insertEntry({
      date: "2026-04-13",
      employer_id: "maison",
      hours: 3,
      start_time: "2026-04-13T09:00:00-04:00",
      end_time: "2026-04-13T12:00:00-04:00",
      category: "coding",
      description: "morning coding",
    });
    db.insertEntry({
      date: "2026-04-13",
      employer_id: "maison",
      hours: 1.5,
      start_time: "2026-04-13T14:00:00-04:00",
      end_time: "2026-04-13T15:30:00-04:00",
      category: "meeting",
      description: "afternoon meeting",
    });
    db.insertEntry({
      date: "2026-04-14",
      employer_id: "maison",
      hours: 4,
      start_time: "2026-04-14T09:00:00-04:00",
      end_time: "2026-04-14T13:00:00-04:00",
      category: "coding",
      description: "full morning",
    });
    db.insertEntry({
      date: "2026-04-14",
      employer_id: "wilbo",
      hours: 2,
      start_time: "2026-04-14T14:00:00-04:00",
      end_time: "2026-04-14T16:00:00-04:00",
      category: "research",
      description: "wilbo research",
    });
    db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 3.5,
      start_time: "2026-04-15T10:00:00-04:00",
      end_time: "2026-04-15T13:30:00-04:00",
      category: "coding",
      description: "tuesday coding",
    });
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  describe("getStatusSummary", () => {
    it("returns per-employer totals with revenue and cap_percent", () => {
      const summary = getStatusSummary(db, "2026-04-13", "2026-04-19");

      // maison: 3 + 1.5 + 4 + 3.5 = 12 hours, $50/hr, 20hr cap
      expect(summary.maison).toBeDefined();
      expect(summary.maison.hours).toBe(12);
      expect(summary.maison.revenue).toBe(600);
      expect(summary.maison.cap_percent).toBe(60); // 12/20 * 100
      expect(summary.maison.days_worked).toBe(3);

      // wilbo: 2 hours, $0/hr, no cap
      expect(summary.wilbo).toBeDefined();
      expect(summary.wilbo.hours).toBe(2);
      expect(summary.wilbo.revenue).toBe(0);
      expect(summary.wilbo.cap_percent).toBeNull();
      expect(summary.wilbo.days_worked).toBe(1);
    });

    it("counts entries_by_status correctly", () => {
      const summary = getStatusSummary(db, "2026-04-13", "2026-04-19");

      // All entries default to "draft"
      expect(summary.maison.entries_by_status).toEqual({ draft: 4 });
      expect(summary.wilbo.entries_by_status).toEqual({ draft: 1 });
    });

    it("aggregates hours per category", () => {
      const summary = getStatusSummary(db, "2026-04-13", "2026-04-19");

      // maison: coding = 3 + 4 + 3.5 = 10.5, meeting = 1.5
      expect(summary.maison.categories).toEqual({
        coding: 10.5,
        meeting: 1.5,
      });
      expect(summary.wilbo.categories).toEqual({ research: 2 });
    });

    it("returns empty object for range with no entries", () => {
      const summary = getStatusSummary(db, "2026-05-01", "2026-05-07");
      expect(summary).toEqual({});
    });

    it("rounds hours to 2 decimals", () => {
      // Insert entry with fractional hours that could cause float issues
      db.insertEntry({
        date: "2026-04-16",
        employer_id: "wilbo",
        hours: 1.333,
        start_time: "2026-04-16T09:00:00-04:00",
        end_time: "2026-04-16T10:20:00-04:00",
        description: "fractional",
      });

      const summary = getStatusSummary(db, "2026-04-13", "2026-04-19");
      expect(summary.wilbo.hours).toBe(3.33); // 2 + 1.333 rounded
    });
  });

  describe("getTodayBreakdown", () => {
    it("returns entries for a single day with totals", () => {
      const breakdown = getTodayBreakdown(db, "2026-04-14");

      expect(breakdown.date).toBe("2026-04-14");
      expect(breakdown.entries).toHaveLength(2);
      expect(breakdown.total_hours).toBe(6); // 4 + 2
      expect(breakdown.by_employer).toEqual({ maison: 4, wilbo: 2 });
    });

    it("returns empty breakdown for day with no entries", () => {
      const breakdown = getTodayBreakdown(db, "2026-04-20");

      expect(breakdown.date).toBe("2026-04-20");
      expect(breakdown.entries).toHaveLength(0);
      expect(breakdown.total_hours).toBe(0);
      expect(breakdown.by_employer).toEqual({});
    });

    it("sums multiple entries for same employer on same day", () => {
      const breakdown = getTodayBreakdown(db, "2026-04-13");

      expect(breakdown.entries).toHaveLength(2);
      expect(breakdown.total_hours).toBe(4.5); // 3 + 1.5
      expect(breakdown.by_employer).toEqual({ maison: 4.5 });
    });
  });

  describe("getWeekMatrix", () => {
    it("returns hours per day per employer with zeros for empty days", () => {
      const matrix = getWeekMatrix(db, "2026-04-13", "2026-04-19");

      expect(matrix.maison).toBeDefined();
      expect(matrix.wilbo).toBeDefined();

      // maison: Mon=4.5, Tue=4, Wed=3.5, rest=0
      expect(matrix.maison["2026-04-13"]).toBe(4.5);
      expect(matrix.maison["2026-04-14"]).toBe(4);
      expect(matrix.maison["2026-04-15"]).toBe(3.5);
      expect(matrix.maison["2026-04-16"]).toBe(0);
      expect(matrix.maison["2026-04-17"]).toBe(0);
      expect(matrix.maison["2026-04-18"]).toBe(0);
      expect(matrix.maison["2026-04-19"]).toBe(0);

      // wilbo: only Tue=2
      expect(matrix.wilbo["2026-04-13"]).toBe(0);
      expect(matrix.wilbo["2026-04-14"]).toBe(2);
      expect(matrix.wilbo["2026-04-15"]).toBe(0);
    });

    it("returns empty object for range with no entries", () => {
      const matrix = getWeekMatrix(db, "2026-05-01", "2026-05-07");
      expect(matrix).toEqual({});
    });

    it("covers all dates in the range inclusively", () => {
      const matrix = getWeekMatrix(db, "2026-04-13", "2026-04-15");

      // Only 3 days in range
      const maisonDates = Object.keys(matrix.maison);
      expect(maisonDates).toHaveLength(3);
      expect(maisonDates).toEqual([
        "2026-04-13",
        "2026-04-14",
        "2026-04-15",
      ]);
    });
  });
});
