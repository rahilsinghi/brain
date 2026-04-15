import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TimesheetDB } from "../../src/timesheet/db.js";
import {
  parseReviewCommands,
  applyReviewCommands,
  type ReviewCommand,
} from "../../src/timesheet/telegram-review.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/telegram-review-test");

// ── Parser tests (pure function, no DB) ──

describe("parseReviewCommands", () => {
  it("parses 'ok' as approve-all", () => {
    const cmds = parseReviewCommands("ok");
    expect(cmds).toEqual([{ type: "approve_all" }]);
  });

  it("parses 'ok' case-insensitively", () => {
    expect(parseReviewCommands("OK")).toEqual([{ type: "approve_all" }]);
    expect(parseReviewCommands("Ok")).toEqual([{ type: "approve_all" }]);
  });

  it("parses '#N = Xh' as adjust-hours", () => {
    const cmds = parseReviewCommands("#2 = 1h");
    expect(cmds).toEqual([
      { type: "adjust", entryIndex: 2, hours: 1 },
    ]);
  });

  it("parses '#N = Xh with decimal", () => {
    const cmds = parseReviewCommands("#1 = 2.5h");
    expect(cmds).toEqual([
      { type: "adjust", entryIndex: 1, hours: 2.5 },
    ]);
  });

  it("parses '#N = Xh category description'", () => {
    const cmds = parseReviewCommands("#3 = 1.5h meeting standup with team");
    expect(cmds).toEqual([
      {
        type: "adjust",
        entryIndex: 3,
        hours: 1.5,
        category: "meeting",
        description: "standup with team",
      },
    ]);
  });

  it("parses 'drop #N'", () => {
    const cmds = parseReviewCommands("drop #3");
    expect(cmds).toEqual([{ type: "drop", entryIndex: 3 }]);
  });

  it("parses '+Xh employer category description'", () => {
    const cmds = parseReviewCommands("+1h maison meeting standup");
    expect(cmds).toEqual([
      {
        type: "add",
        hours: 1,
        employerId: "maison",
        category: "meeting",
        description: "standup",
      },
    ]);
  });

  it("parses '+Xh with explicit times'", () => {
    const cmds = parseReviewCommands(
      "+2h maison coding feature work 9:00a-11:00a",
    );
    expect(cmds).toEqual([
      {
        type: "add",
        hours: 2,
        employerId: "maison",
        category: "coding",
        description: "feature work",
        startTime: "9:00a",
        endTime: "11:00a",
      },
    ]);
  });

  it("parses 'repo <name> = <employer>'", () => {
    const cmds = parseReviewCommands("repo brain = maison");
    expect(cmds).toEqual([
      { type: "repo_map", repoPattern: "brain", employerId: "maison" },
    ]);
  });

  it("parses multiple commands (one per line)", () => {
    const input = "#2 = 1h\n+1h maison meeting standup\ndrop #3\nok";
    const cmds = parseReviewCommands(input);
    expect(cmds).toHaveLength(4);
    expect(cmds[0].type).toBe("adjust");
    expect(cmds[1].type).toBe("add");
    expect(cmds[2].type).toBe("drop");
    expect(cmds[3].type).toBe("approve_all");
  });

  it("ignores blank lines", () => {
    const cmds = parseReviewCommands("\n\n#1 = 2h\n\nok\n");
    expect(cmds).toHaveLength(2);
  });

  it("returns unknown for unrecognized lines", () => {
    const cmds = parseReviewCommands("what is this");
    expect(cmds).toEqual([{ type: "unknown", raw: "what is this" }]);
  });
});

// ── Apply tests (requires DB) ──

describe("applyReviewCommands", () => {
  let db: TimesheetDB;

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
    db = new TimesheetDB(join(TEST_DIR, "test.db"));
    db.upsertEmployer({
      id: "maison",
      rate_hourly: 50,
      weekly_cap_hours: 20,
      monthly_bonus: null,
      currency: "USD",
    });
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("approve_all sets all entries for date to reviewed", () => {
    const id1 = db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 2,
      start_time: "2026-04-15T09:00:00",
      end_time: "2026-04-15T11:00:00",
      description: "Work 1",
      source: "git_session",
    });
    const id2 = db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 1,
      start_time: "2026-04-15T13:00:00",
      end_time: "2026-04-15T14:00:00",
      description: "Work 2",
      source: "git_session",
    });

    const results = applyReviewCommands(
      db,
      [{ type: "approve_all" }],
      [id1, id2],
      "2026-04-15",
    );

    expect(results).toHaveLength(1);
    expect(results[0].success).toBe(true);
    expect(db.getEntry(id1)!.status).toBe("reviewed");
    expect(db.getEntry(id2)!.status).toBe("reviewed");
  });

  it("adjust updates entry hours", () => {
    const id1 = db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 2,
      start_time: "2026-04-15T09:00:00",
      end_time: "2026-04-15T11:00:00",
      description: "Work",
      source: "git_session",
    });

    const results = applyReviewCommands(
      db,
      [{ type: "adjust", entryIndex: 1, hours: 3 }],
      [id1],
      "2026-04-15",
    );

    expect(results[0].success).toBe(true);
    const updated = db.getEntry(id1)!;
    expect(updated.hours).toBe(3);
  });

  it("adjust updates category and description when provided", () => {
    const id1 = db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 2,
      start_time: "2026-04-15T09:00:00",
      end_time: "2026-04-15T11:00:00",
      category: "coding",
      description: "Old description",
      source: "git_session",
    });

    applyReviewCommands(
      db,
      [
        {
          type: "adjust",
          entryIndex: 1,
          hours: 1.5,
          category: "meeting",
          description: "standup call",
        },
      ],
      [id1],
      "2026-04-15",
    );

    const updated = db.getEntry(id1)!;
    expect(updated.hours).toBe(1.5);
    expect(updated.category).toBe("meeting");
    expect(updated.description).toBe("standup call");
  });

  it("drop sets entry status to ignored", () => {
    const id1 = db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 1,
      start_time: "2026-04-15T09:00:00",
      end_time: "2026-04-15T10:00:00",
      description: "Junk",
      source: "git_session",
    });

    applyReviewCommands(
      db,
      [{ type: "drop", entryIndex: 1 }],
      [id1],
      "2026-04-15",
    );

    expect(db.getEntry(id1)!.status).toBe("ignored");
  });

  it("add creates a new manual entry", () => {
    const results = applyReviewCommands(
      db,
      [
        {
          type: "add",
          hours: 1,
          employerId: "maison",
          category: "meeting",
          description: "standup",
        },
      ],
      [],
      "2026-04-15",
    );

    expect(results[0].success).toBe(true);
    expect(results[0].newEntryId).toBeDefined();
    const entry = db.getEntry(results[0].newEntryId!)!;
    expect(entry.hours).toBe(1);
    expect(entry.employer_id).toBe("maison");
    expect(entry.category).toBe("meeting");
    expect(entry.description).toBe("standup");
    expect(entry.source).toBe("manual");
  });

  it("repo_map adds a new repo mapping", () => {
    applyReviewCommands(
      db,
      [{ type: "repo_map", repoPattern: "brain", employerId: "maison" }],
      [],
      "2026-04-15",
    );

    const mappings = db.getRepoMappings();
    const found = mappings.find((m) => m.pattern === "brain");
    expect(found).toBeDefined();
    expect(found!.employer_id).toBe("maison");
    expect(found!.source).toBe("telegram");
  });

  it("returns error for out-of-range entry index", () => {
    const id1 = db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 1,
      start_time: "2026-04-15T09:00:00",
      end_time: "2026-04-15T10:00:00",
      description: "Work",
      source: "git_session",
    });

    const results = applyReviewCommands(
      db,
      [{ type: "adjust", entryIndex: 5, hours: 2 }],
      [id1],
      "2026-04-15",
    );

    expect(results[0].success).toBe(false);
    expect(results[0].error).toMatch(/out of range/i);
  });
});
