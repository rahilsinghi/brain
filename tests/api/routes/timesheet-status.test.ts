import { describe, it, expect, beforeEach, afterEach } from "vitest";
import Fastify from "fastify";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { TimesheetDB } from "../../../src/timesheet/db.js";
import { timesheetStatusRoute } from "../../../src/api/routes/timesheet-status.js";

const TEST_DIR = join(
  import.meta.dirname,
  "__fixtures__/timesheet-status-test"
);

function buildApp(db: TimesheetDB) {
  const app = Fastify();
  app.decorate("timesheetDb", db);
  app.register(timesheetStatusRoute);
  return app;
}

function seedData(db: TimesheetDB): void {
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
}

describe("GET /timesheet/status", () => {
  let db: TimesheetDB;

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
    db = new TimesheetDB(join(TEST_DIR, "test.db"));
    seedData(db);
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("returns weekly summary", async () => {
    const app = buildApp(db);
    await app.ready();

    const res = await app.inject({
      method: "GET",
      url: "/timesheet/status",
      query: {
        week_start: "2026-04-13",
        week_end: "2026-04-19",
      },
    });

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.maison).toBeDefined();
    expect(body.maison.hours).toBe(7);
    expect(body.maison.revenue).toBe(350);
    expect(body.wilbo).toBeDefined();
    expect(body.wilbo.hours).toBe(2);

    await app.close();
  });

  it("returns 400 when week_start or week_end missing", async () => {
    const app = buildApp(db);
    await app.ready();

    const res = await app.inject({
      method: "GET",
      url: "/timesheet/status",
      query: { week_start: "2026-04-13" },
    });

    expect(res.statusCode).toBe(400);

    await app.close();
  });
});

describe("GET /timesheet/status/today", () => {
  let db: TimesheetDB;

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
    db = new TimesheetDB(join(TEST_DIR, "test.db"));
    seedData(db);
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("returns day breakdown for specified date", async () => {
    const app = buildApp(db);
    await app.ready();

    const res = await app.inject({
      method: "GET",
      url: "/timesheet/status/today",
      query: { date: "2026-04-14" },
    });

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.date).toBe("2026-04-14");
    expect(body.entries).toHaveLength(2);
    expect(body.total_hours).toBe(6);
    expect(body.by_employer).toEqual({ maison: 4, wilbo: 2 });

    await app.close();
  });

  it("defaults to today when no date provided", async () => {
    const app = buildApp(db);
    await app.ready();

    const res = await app.inject({
      method: "GET",
      url: "/timesheet/status/today",
    });

    expect(res.statusCode).toBe(200);
    const body = res.json();
    // date should be today's date
    const today = new Date().toISOString().slice(0, 10);
    expect(body.date).toBe(today);

    await app.close();
  });
});

describe("GET /timesheet/status/week", () => {
  let db: TimesheetDB;

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
    db = new TimesheetDB(join(TEST_DIR, "test.db"));
    seedData(db);
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("returns week matrix", async () => {
    const app = buildApp(db);
    await app.ready();

    const res = await app.inject({
      method: "GET",
      url: "/timesheet/status/week",
      query: {
        week_start: "2026-04-13",
        week_end: "2026-04-19",
      },
    });

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.maison).toBeDefined();
    expect(body.maison["2026-04-13"]).toBe(3);
    expect(body.maison["2026-04-14"]).toBe(4);
    expect(body.maison["2026-04-15"]).toBe(0);
    expect(body.wilbo["2026-04-14"]).toBe(2);

    await app.close();
  });

  it("returns 400 when week_start or week_end missing", async () => {
    const app = buildApp(db);
    await app.ready();

    const res = await app.inject({
      method: "GET",
      url: "/timesheet/status/week",
      query: { week_end: "2026-04-19" },
    });

    expect(res.statusCode).toBe(400);

    await app.close();
  });
});
