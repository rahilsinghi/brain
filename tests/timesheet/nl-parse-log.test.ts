import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { TimesheetDB } from "../../src/timesheet/db.js";

describe("nl_parse_log table", () => {
  let dir: string;
  let db: TimesheetDB;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "brain-ts-nl-"));
    db = new TimesheetDB(join(dir, "ts.db"));
  });

  afterEach(() => {
    db.close();
    rmSync(dir, { recursive: true, force: true });
  });

  it("creates the nl_parse_log table", () => {
    expect(db.listTables()).toContain("nl_parse_log");
  });

  it("logNLParse inserts a row returning the id", () => {
    const id = db.logNLParse({
      timestamp: "2026-04-17T10:00:00Z",
      source: "mcp",
      input_text: "2h maison coding",
      llm_response: '{"entries":[{"hours":2}]}',
      entries_created: 1,
      error: null,
      duration_ms: 1800,
      llm_tokens: 234,
    });
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
  });

  it("logNLParse persists error rows too", () => {
    const id = db.logNLParse({
      timestamp: "2026-04-17T10:00:00Z",
      source: "telegram_text",
      input_text: "/ts asdfjkl",
      llm_response: null,
      entries_created: 0,
      error: "not a timesheet entry",
      duration_ms: 900,
      llm_tokens: null,
    });
    const row = db.getNLParseLog(id);
    expect(row).not.toBeNull();
    expect(row?.error).toBe("not a timesheet entry");
    expect(row?.entries_created).toBe(0);
  });

  it("getEmployerIds returns inserted employer ids", () => {
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });
    db.upsertEmployer({ id: "wilbo", rate_hourly: 0, weekly_cap_hours: null, monthly_bonus: null, currency: "USD" });
    expect(db.getEmployerIds().sort()).toEqual(["maison", "wilbo"]);
  });
});
