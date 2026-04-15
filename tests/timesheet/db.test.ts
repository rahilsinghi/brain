import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TimesheetDB } from "../../src/timesheet/db.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/timesheet-db-test");

describe("TimesheetDB", () => {
  let db: TimesheetDB;

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
    db = new TimesheetDB(join(TEST_DIR, "test.db"));
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  describe("schema", () => {
    it("creates all expected tables on construction", () => {
      const tables = db.listTables();
      expect(tables).toContain("employers");
      expect(tables).toContain("repo_map");
      expect(tables).toContain("entries");
      expect(tables).toContain("proof_artifacts");
      expect(tables).toContain("invoices");
      expect(tables).toContain("alerts");
      expect(tables).toContain("meta");
    });

    it("is idempotent — second construction on same DB does not error", () => {
      db.close();
      const db2 = new TimesheetDB(join(TEST_DIR, "test.db"));
      expect(db2.listTables().length).toBeGreaterThanOrEqual(7);
      db2.close();
      // reopen for afterEach
      db = new TimesheetDB(join(TEST_DIR, "test.db"));
    });
  });

  describe("employers", () => {
    it("upserts and retrieves an employer", () => {
      db.upsertEmployer({
        id: "maison",
        rate_hourly: 50,
        weekly_cap_hours: 20,
        monthly_bonus: null,
        currency: "USD",
      });

      const emp = db.getEmployer("maison");
      expect(emp).not.toBeNull();
      expect(emp!.id).toBe("maison");
      expect(emp!.rate_hourly).toBe(50);
      expect(emp!.weekly_cap_hours).toBe(20);
      expect(emp!.monthly_bonus).toBeNull();
      expect(emp!.currency).toBe("USD");
    });

    it("upsert overwrites existing employer", () => {
      db.upsertEmployer({
        id: "maison",
        rate_hourly: 50,
        weekly_cap_hours: 20,
        monthly_bonus: null,
        currency: "USD",
      });
      db.upsertEmployer({
        id: "maison",
        rate_hourly: 65,
        weekly_cap_hours: 25,
        monthly_bonus: 500,
        currency: "EUR",
      });

      const emp = db.getEmployer("maison");
      expect(emp!.rate_hourly).toBe(65);
      expect(emp!.weekly_cap_hours).toBe(25);
      expect(emp!.monthly_bonus).toBe(500);
      expect(emp!.currency).toBe("EUR");
    });

    it("returns null for nonexistent employer", () => {
      expect(db.getEmployer("nope")).toBeNull();
    });
  });

  describe("entries", () => {
    beforeEach(() => {
      db.upsertEmployer({
        id: "maison",
        rate_hourly: 50,
        weekly_cap_hours: 20,
        monthly_bonus: null,
        currency: "USD",
      });
    });

    it("inserts entry with draft status and created_at, returns UUID", () => {
      const id = db.insertEntry({
        date: "2026-04-14",
        employer_id: "maison",
        hours: 2.5,
        start_time: "2026-04-14T09:00:00-04:00",
        end_time: "2026-04-14T11:30:00-04:00",
        description: "worked on feature X",
      });

      expect(id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
      );

      const entry = db.getEntry(id);
      expect(entry).not.toBeNull();
      expect(entry!.status).toBe("draft");
      expect(entry!.created_at).toBeTruthy();
      expect(entry!.reviewed_at).toBeNull();
      expect(entry!.finalized_at).toBeNull();
      expect(entry!.hours).toBe(2.5);
      expect(entry!.employer_id).toBe("maison");
      expect(entry!.confidence).toBe("medium");
      expect(entry!.category).toBe("coding");
      expect(entry!.source).toBe("manual");
      expect(entry!.timezone).toBe("America/New_York");
    });

    it("respects optional fields when provided", () => {
      const id = db.insertEntry({
        date: "2026-04-14",
        employer_id: "maison",
        hours: 1,
        start_time: "2026-04-14T14:00:00-04:00",
        end_time: "2026-04-14T15:00:00-04:00",
        description: "meeting",
        timezone: "America/Chicago",
        confidence: "high",
        category: "meeting",
        source: "calendar",
        session_id: "sess-abc",
      });

      const entry = db.getEntry(id);
      expect(entry!.timezone).toBe("America/Chicago");
      expect(entry!.confidence).toBe("high");
      expect(entry!.category).toBe("meeting");
      expect(entry!.source).toBe("calendar");
      expect(entry!.session_id).toBe("sess-abc");
    });

    it("returns null for nonexistent entry", () => {
      expect(db.getEntry("00000000-0000-0000-0000-000000000000")).toBeNull();
    });

    it("finds entry by session_id", () => {
      db.insertEntry({
        date: "2026-04-14",
        employer_id: "maison",
        hours: 1,
        start_time: "2026-04-14T09:00:00-04:00",
        end_time: "2026-04-14T10:00:00-04:00",
        description: "session work",
        session_id: "sess-123",
      });

      const entry = db.findBySessionId("sess-123");
      expect(entry).not.toBeNull();
      expect(entry!.session_id).toBe("sess-123");
      expect(entry!.description).toBe("session work");
    });

    it("returns null when session_id not found", () => {
      expect(db.findBySessionId("nonexistent")).toBeNull();
    });
  });

  describe("date range queries", () => {
    beforeEach(() => {
      db.upsertEmployer({
        id: "maison",
        rate_hourly: 50,
        weekly_cap_hours: null,
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

      // Three entries across two days and two employers
      db.insertEntry({
        date: "2026-04-14",
        employer_id: "maison",
        hours: 3,
        start_time: "2026-04-14T09:00:00-04:00",
        end_time: "2026-04-14T12:00:00-04:00",
        description: "morning maison",
      });
      db.insertEntry({
        date: "2026-04-14",
        employer_id: "wilbo",
        hours: 2,
        start_time: "2026-04-14T13:00:00-04:00",
        end_time: "2026-04-14T15:00:00-04:00",
        description: "afternoon wilbo",
      });
      db.insertEntry({
        date: "2026-04-15",
        employer_id: "maison",
        hours: 4,
        start_time: "2026-04-15T09:00:00-04:00",
        end_time: "2026-04-15T13:00:00-04:00",
        description: "next day maison",
      });
    });

    it("returns entries for a single day", () => {
      const entries = db.getEntriesByDateRange("2026-04-14", "2026-04-14");
      expect(entries).toHaveLength(2);
    });

    it("returns entries across multiple days", () => {
      const entries = db.getEntriesByDateRange("2026-04-14", "2026-04-15");
      expect(entries).toHaveLength(3);
    });

    it("filters by employer_id", () => {
      const entries = db.getEntriesByDateRange(
        "2026-04-14",
        "2026-04-15",
        "maison"
      );
      expect(entries).toHaveLength(2);
      expect(entries.every((e) => e.employer_id === "maison")).toBe(true);
    });

    it("excludes ignored entries", () => {
      const entries = db.getEntriesByDateRange("2026-04-14", "2026-04-14");
      const id = entries[0].id;
      db.updateEntryStatus(id, "ignored");

      const filtered = db.getEntriesByDateRange("2026-04-14", "2026-04-14");
      expect(filtered).toHaveLength(1);
    });

    it("returns empty array for range with no entries", () => {
      const entries = db.getEntriesByDateRange("2026-05-01", "2026-05-31");
      expect(entries).toEqual([]);
    });
  });

  describe("weekly hours", () => {
    beforeEach(() => {
      db.upsertEmployer({
        id: "maison",
        rate_hourly: 50,
        weekly_cap_hours: 20,
        monthly_bonus: null,
        currency: "USD",
      });

      db.insertEntry({
        date: "2026-04-13",
        employer_id: "maison",
        hours: 5,
        start_time: "2026-04-13T09:00:00-04:00",
        end_time: "2026-04-13T14:00:00-04:00",
        description: "monday",
      });
      db.insertEntry({
        date: "2026-04-14",
        employer_id: "maison",
        hours: 6,
        start_time: "2026-04-14T09:00:00-04:00",
        end_time: "2026-04-14T15:00:00-04:00",
        description: "tuesday",
      });
    });

    it("sums hours for employer within week range", () => {
      const hours = db.getWeeklyHours("maison", "2026-04-13", "2026-04-19");
      expect(hours).toBe(11);
    });

    it("returns 0 when no entries in range", () => {
      const hours = db.getWeeklyHours("maison", "2026-05-01", "2026-05-07");
      expect(hours).toBe(0);
    });

    it("excludes ignored entries from weekly sum", () => {
      const entries = db.getEntriesByDateRange("2026-04-13", "2026-04-13");
      db.updateEntryStatus(entries[0].id, "ignored");

      const hours = db.getWeeklyHours("maison", "2026-04-13", "2026-04-19");
      expect(hours).toBe(6);
    });
  });

  describe("entry status updates", () => {
    let entryId: string;

    beforeEach(() => {
      db.upsertEmployer({
        id: "maison",
        rate_hourly: 50,
        weekly_cap_hours: null,
        monthly_bonus: null,
        currency: "USD",
      });

      entryId = db.insertEntry({
        date: "2026-04-14",
        employer_id: "maison",
        hours: 2,
        start_time: "2026-04-14T09:00:00-04:00",
        end_time: "2026-04-14T11:00:00-04:00",
        description: "test entry",
      });
    });

    it("sets reviewed_at when status becomes reviewed", () => {
      db.updateEntryStatus(entryId, "reviewed");
      const entry = db.getEntry(entryId);
      expect(entry!.status).toBe("reviewed");
      expect(entry!.reviewed_at).toBeTruthy();
      expect(entry!.finalized_at).toBeNull();
    });

    it("sets finalized_at when status becomes finalized", () => {
      db.updateEntryStatus(entryId, "finalized");
      const entry = db.getEntry(entryId);
      expect(entry!.status).toBe("finalized");
      expect(entry!.finalized_at).toBeTruthy();
    });

    it("does not set timestamp fields for other status transitions", () => {
      db.updateEntryStatus(entryId, "ignored");
      const entry = db.getEntry(entryId);
      expect(entry!.status).toBe("ignored");
      expect(entry!.reviewed_at).toBeNull();
      expect(entry!.finalized_at).toBeNull();
    });
  });

  describe("entry field updates", () => {
    let entryId: string;

    beforeEach(() => {
      db.upsertEmployer({
        id: "maison",
        rate_hourly: 50,
        weekly_cap_hours: null,
        monthly_bonus: null,
        currency: "USD",
      });

      entryId = db.insertEntry({
        date: "2026-04-14",
        employer_id: "maison",
        hours: 2,
        start_time: "2026-04-14T09:00:00-04:00",
        end_time: "2026-04-14T11:00:00-04:00",
        description: "original desc",
      });
    });

    it("updates hours and end_time", () => {
      db.updateEntryHours(entryId, 3.5, "2026-04-14T12:30:00-04:00");
      const entry = db.getEntry(entryId);
      expect(entry!.hours).toBe(3.5);
      expect(entry!.end_time).toBe("2026-04-14T12:30:00-04:00");
    });

    it("updates description", () => {
      db.updateEntryDescription(entryId, "updated description");
      const entry = db.getEntry(entryId);
      expect(entry!.description).toBe("updated description");
    });
  });

  describe("proof artifacts", () => {
    let entryId: string;

    beforeEach(() => {
      db.upsertEmployer({
        id: "maison",
        rate_hourly: 50,
        weekly_cap_hours: null,
        monthly_bonus: null,
        currency: "USD",
      });

      entryId = db.insertEntry({
        date: "2026-04-14",
        employer_id: "maison",
        hours: 2,
        start_time: "2026-04-14T09:00:00-04:00",
        end_time: "2026-04-14T11:00:00-04:00",
        description: "with proof",
      });
    });

    it("inserts and retrieves proof artifacts", () => {
      const artifactId = db.insertProofArtifact({
        entry_id: entryId,
        type: "commit",
        reference: "abc123",
        timestamp: "2026-04-14T09:30:00-04:00",
        url: "https://github.com/org/repo/commit/abc123",
      });

      expect(artifactId).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
      );

      const artifacts = db.getProofArtifacts(entryId);
      expect(artifacts).toHaveLength(1);
      expect(artifacts[0].type).toBe("commit");
      expect(artifacts[0].reference).toBe("abc123");
      expect(artifacts[0].url).toBe(
        "https://github.com/org/repo/commit/abc123"
      );
      expect(artifacts[0].metadata).toBe("{}");
    });

    it("returns multiple artifacts for same entry", () => {
      db.insertProofArtifact({
        entry_id: entryId,
        type: "commit",
        reference: "abc123",
        timestamp: "2026-04-14T09:15:00-04:00",
      });
      db.insertProofArtifact({
        entry_id: entryId,
        type: "commit",
        reference: "def456",
        timestamp: "2026-04-14T10:00:00-04:00",
      });

      const artifacts = db.getProofArtifacts(entryId);
      expect(artifacts).toHaveLength(2);
    });

    it("returns empty array when no artifacts exist", () => {
      expect(db.getProofArtifacts(entryId)).toEqual([]);
    });
  });

  describe("repo mappings", () => {
    beforeEach(() => {
      db.upsertEmployer({
        id: "maison",
        rate_hourly: 50,
        weekly_cap_hours: null,
        monthly_bonus: null,
        currency: "USD",
      });
    });

    it("upserts and retrieves repo mappings", () => {
      db.upsertRepoMapping("maison/*", "maison", "config");

      const mappings = db.getRepoMappings();
      expect(mappings).toHaveLength(1);
      expect(mappings[0].pattern).toBe("maison/*");
      expect(mappings[0].employer_id).toBe("maison");
      expect(mappings[0].source).toBe("config");
    });

    it("overwrites existing mapping for same pattern", () => {
      db.upsertRepoMapping("maison/*", "maison", "config");
      db.upsertRepoMapping("maison/*", "maison", "manual");

      const mappings = db.getRepoMappings();
      expect(mappings).toHaveLength(1);
      expect(mappings[0].source).toBe("manual");
    });
  });

  describe("meta key-value store", () => {
    it("sets and gets a meta value", () => {
      db.setMeta("last_scan_time", "2026-04-14T09:00:00Z");
      expect(db.getMeta("last_scan_time")).toBe("2026-04-14T09:00:00Z");
    });

    it("returns null for nonexistent key", () => {
      expect(db.getMeta("nonexistent")).toBeNull();
    });

    it("overwrites existing meta value", () => {
      db.setMeta("last_scan_time", "2026-04-14T09:00:00Z");
      db.setMeta("last_scan_time", "2026-04-14T10:00:00Z");
      expect(db.getMeta("last_scan_time")).toBe("2026-04-14T10:00:00Z");
    });
  });
});
