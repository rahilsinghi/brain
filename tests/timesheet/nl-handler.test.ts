import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const mockGenerate = vi.fn();
vi.mock("../../src/llm/provider.js", () => ({
  generate: (...args: unknown[]) => mockGenerate(...args),
}));

import { TimesheetDB } from "../../src/timesheet/db.js";
import { handleTimesheetNL } from "../../src/timesheet/nl-handler.js";

function mockLLM(obj: unknown): void {
  mockGenerate.mockResolvedValue({
    text: JSON.stringify(obj),
    provider: "ollama",
    model: "qwen3:32b",
    inputTokens: 100,
    outputTokens: 50,
  });
}

describe("handleTimesheetNL", () => {
  let dir: string;
  let db: TimesheetDB;

  beforeEach(() => {
    mockGenerate.mockReset();
    dir = mkdtempSync(join(tmpdir(), "brain-ts-nl-h-"));
    db = new TimesheetDB(join(dir, "ts.db"));
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });
    db.upsertEmployer({ id: "wilbo", rate_hourly: 0, weekly_cap_hours: null, monthly_bonus: null, currency: "USD" });
  });

  afterEach(() => {
    db.close();
    rmSync(dir, { recursive: true, force: true });
  });

  it("parses, applies, and returns success summary for single entry", async () => {
    mockLLM({
      entries: [{ hours: 2, employer: "maison", category: "coding", description: "PoC", date: "2026-04-16", start_time: "3:00p", end_time: "5:00p" }],
    });

    const response = await handleTimesheetNL("2h maison PoC 3-5pm yesterday", {
      now: new Date("2026-04-17T10:00:00-04:00"),
      timezone: "America/New_York",
      db,
      source: "mcp",
    });

    expect(response).toContain("✓");
    expect(response).toContain("Added");
    expect(response).toContain("maison");

    const entries = db.getEntriesByDateRange("2026-04-16", "2026-04-16");
    expect(entries).toHaveLength(1);
    expect(entries[0].hours).toBe(2);
    expect(entries[0].employer_id).toBe("maison");
    expect(entries[0].description).toBe("PoC");
  });

  it("creates multiple DB entries for multi-entry input", async () => {
    mockLLM({
      entries: [
        { hours: 2, employer: "maison", category: "coding", description: "coding", date: "2026-04-16" },
        { hours: 1, employer: "maison", category: "meeting", description: "1:1", date: "2026-04-16" },
      ],
    });

    await handleTimesheetNL("2h coding then 1h 1:1", {
      now: new Date("2026-04-17T10:00:00-04:00"),
      timezone: "America/New_York",
      db,
      source: "telegram_text",
    });

    const entries = db.getEntriesByDateRange("2026-04-16", "2026-04-16");
    expect(entries).toHaveLength(2);
  });

  it("writes a telemetry row on success", async () => {
    mockLLM({
      entries: [{ hours: 1, employer: "maison", category: "coding", description: "x" }],
    });

    await handleTimesheetNL("1h maison coding", {
      now: new Date("2026-04-17T10:00:00-04:00"),
      timezone: "America/New_York",
      db,
      source: "cli",
    });

    const rows = (db as unknown as { db: { prepare(s: string): { all(): unknown[] } } }).db
      .prepare("SELECT * FROM nl_parse_log")
      .all() as Array<{ source: string; entries_created: number; error: string | null }>;
    expect(rows).toHaveLength(1);
    expect(rows[0].source).toBe("cli");
    expect(rows[0].entries_created).toBe(1);
    expect(rows[0].error).toBeNull();
  });

  it("writes a telemetry row on failure and does NOT write to entries table", async () => {
    mockLLM({ error: "not a timesheet entry", entries: [] });

    const response = await handleTimesheetNL("what time is it", {
      now: new Date("2026-04-17T10:00:00-04:00"),
      timezone: "America/New_York",
      db,
      source: "mcp",
    });

    expect(response).toContain("✗");
    expect(response.toLowerCase()).toContain("not a timesheet");

    const entries = db.getEntriesByDateRange("2026-04-16", "2026-04-18");
    expect(entries).toHaveLength(0);

    const rows = (db as unknown as { db: { prepare(s: string): { all(): unknown[] } } }).db
      .prepare("SELECT * FROM nl_parse_log")
      .all() as Array<{ source: string; entries_created: number; error: string | null }>;
    expect(rows).toHaveLength(1);
    expect(rows[0].entries_created).toBe(0);
    expect(rows[0].error).toBe("not a timesheet entry");
  });

  it("unknown employer produces actionable error listing known employers", async () => {
    mockLLM({
      entries: [{ hours: 2, employer: "asknyc", category: "coding", description: "x" }],
    });

    const response = await handleTimesheetNL("2h asknyc coding", {
      now: new Date("2026-04-17T10:00:00-04:00"),
      timezone: "America/New_York",
      db,
      source: "mcp",
    });

    expect(response).toContain("✗");
    expect(response).toContain("asknyc");
    expect(response).toContain("maison");
    expect(response).toContain("wilbo");
  });
});
