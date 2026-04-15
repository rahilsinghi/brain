import { describe, it, expect, beforeEach, afterEach } from "vitest";
import Fastify from "fastify";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { TimesheetDB } from "../../../src/timesheet/db.js";
import { timesheetLogRoute } from "../../../src/api/routes/timesheet-log.js";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/timesheet-log-test");

function buildApp(db: TimesheetDB) {
  const app = Fastify();
  app.decorate("timesheetDb", db);
  app.register(timesheetLogRoute);
  return app;
}

describe("POST /timesheet/log", () => {
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

  it("creates manual entry with explicit times (201, confidence='high')", async () => {
    const app = buildApp(db);
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/timesheet/log",
      payload: {
        employer_id: "maison",
        hours: 3,
        description: "morning coding session",
        category: "coding",
        start_time: "2026-04-14T09:00:00-04:00",
        end_time: "2026-04-14T12:00:00-04:00",
      },
    });

    expect(res.statusCode).toBe(201);
    const body = res.json();
    expect(body.entry).toBeDefined();
    expect(body.entry.employer_id).toBe("maison");
    expect(body.entry.hours).toBe(3);
    expect(body.entry.confidence).toBe("high");
    expect(body.entry.source).toBe("manual");
    expect(body.entry.status).toBe("draft");
    expect(body.entry.start_time).toBe("2026-04-14T09:00:00-04:00");
    expect(body.entry.end_time).toBe("2026-04-14T12:00:00-04:00");
    expect(body.entry.description).toBe("morning coding session");
    expect(body.entry.category).toBe("coding");
    expect(body.entry.id).toBeTruthy();

    await app.close();
  });

  it("creates entry with only hours (201, confidence='medium', start/end backfilled)", async () => {
    const app = buildApp(db);
    await app.ready();

    const before = new Date();

    const res = await app.inject({
      method: "POST",
      url: "/timesheet/log",
      payload: {
        employer_id: "maison",
        hours: 2.5,
        description: "afternoon research",
        category: "research",
      },
    });

    const after = new Date();

    expect(res.statusCode).toBe(201);
    const body = res.json();
    expect(body.entry.confidence).toBe("medium");
    expect(body.entry.hours).toBe(2.5);

    // end_time should be approximately now
    const endTime = new Date(body.entry.end_time);
    expect(endTime.getTime()).toBeGreaterThanOrEqual(before.getTime() - 1000);
    expect(endTime.getTime()).toBeLessThanOrEqual(after.getTime() + 1000);

    // start_time should be approximately now - 2.5 hours
    const startTime = new Date(body.entry.start_time);
    const expectedStart = new Date(endTime.getTime() - 2.5 * 60 * 60 * 1000);
    expect(Math.abs(startTime.getTime() - expectedStart.getTime())).toBeLessThan(
      2000
    );

    await app.close();
  });

  it("rejects unknown employer (400)", async () => {
    const app = buildApp(db);
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/timesheet/log",
      payload: {
        employer_id: "nonexistent",
        hours: 1,
        description: "test",
        category: "coding",
      },
    });

    expect(res.statusCode).toBe(400);
    const body = res.json();
    expect(body.error).toMatch(/employer/i);

    await app.close();
  });

  it("uses provided timezone", async () => {
    const app = buildApp(db);
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/timesheet/log",
      payload: {
        employer_id: "maison",
        hours: 1,
        description: "west coast work",
        category: "coding",
        timezone: "America/Los_Angeles",
        start_time: "2026-04-14T09:00:00-07:00",
        end_time: "2026-04-14T10:00:00-07:00",
      },
    });

    expect(res.statusCode).toBe(201);
    expect(res.json().entry.timezone).toBe("America/Los_Angeles");

    await app.close();
  });

  it("returns 400 for missing required fields", async () => {
    const app = buildApp(db);
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/timesheet/log",
      payload: {
        employer_id: "maison",
        // missing hours, description, category
      },
    });

    expect(res.statusCode).toBe(400);

    await app.close();
  });
});
