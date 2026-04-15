import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadTimesheetConfig } from "../../src/timesheet/config.js";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/timesheet-config-test");

describe("loadTimesheetConfig", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_DIR, ".brain"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("returns empty employers + defaults when no config file exists", () => {
    const config = loadTimesheetConfig(TEST_DIR);

    expect(config.employers).toEqual({});
    expect(config.scanner.poll_interval_minutes).toBe(15);
    expect(config.scanner.session_gap_minutes).toBe(30);
    expect(config.scanner.buffer_minutes).toBe(15);
    expect(config.scanner.git_user).toBe("");
    expect(config.scanner.exclude_paths).toContain("node_modules/**");
    expect(config.scanner.exclude_paths).toContain(".lancedb/**");
    expect(config.alerts.cap_thresholds).toEqual([0.75, 0.9, 1.0]);
    expect(config.review.report_hour).toBe(9);
    expect(config.review.finalize_day).toBe("sunday");
    expect(config.review.finalize_hour).toBe(18);
    expect(config.review.gap_threshold_minutes).toBe(45);
    expect(config.review.gap_auto_resolve_days).toBe(3);
  });

  it("loads employers from YAML correctly", () => {
    writeFileSync(
      join(TEST_DIR, ".brain/timesheet-config.yaml"),
      `employers:
  maison:
    rate_hourly: 50
    weekly_cap: 20
    currency: USD
    repos: ["maison/*"]
    email_domains: [maison.cx]
    contacts: [fredrik@maison.cx, sandeep@maison.cx]
  wilbo:
    rate_hourly: 0
    monthly_bonus: 1800
    currency: USD
    repos: ["wilbo-*"]
    contacts: [brentonandersen@hotmail.com]
`
    );

    const config = loadTimesheetConfig(TEST_DIR);

    expect(Object.keys(config.employers)).toEqual(["maison", "wilbo"]);

    const maison = config.employers["maison"];
    expect(maison.rate_hourly).toBe(50);
    expect(maison.weekly_cap).toBe(20);
    expect(maison.monthly_bonus).toBeNull();
    expect(maison.currency).toBe("USD");
    expect(maison.repos).toEqual(["maison/*"]);
    expect(maison.email_domains).toEqual(["maison.cx"]);
    expect(maison.contacts).toEqual(["fredrik@maison.cx", "sandeep@maison.cx"]);

    const wilbo = config.employers["wilbo"];
    expect(wilbo.rate_hourly).toBe(0);
    expect(wilbo.weekly_cap).toBeNull();
    expect(wilbo.monthly_bonus).toBe(1800);
    expect(wilbo.currency).toBe("USD");
    expect(wilbo.repos).toEqual(["wilbo-*"]);
    expect(wilbo.email_domains).toEqual([]);
    expect(wilbo.contacts).toEqual(["brentonandersen@hotmail.com"]);
  });

  it("applies defaults for missing scanner fields", () => {
    writeFileSync(
      join(TEST_DIR, ".brain/timesheet-config.yaml"),
      `scanner:
  git_user: "Rahil Singhi"
  exclude_paths: [custom-lock.json]
`
    );

    const config = loadTimesheetConfig(TEST_DIR);

    expect(config.scanner.git_user).toBe("Rahil Singhi");
    expect(config.scanner.exclude_paths).toEqual(["custom-lock.json"]);
    expect(config.scanner.poll_interval_minutes).toBe(15);
    expect(config.scanner.session_gap_minutes).toBe(30);
    expect(config.scanner.buffer_minutes).toBe(15);
  });

  it("merges partial config with defaults", () => {
    writeFileSync(
      join(TEST_DIR, ".brain/timesheet-config.yaml"),
      `alerts:
  cap_thresholds: [0.8, 0.95]
review:
  report_hour: 10
`
    );

    const config = loadTimesheetConfig(TEST_DIR);

    expect(config.alerts.cap_thresholds).toEqual([0.8, 0.95]);
    expect(config.review.report_hour).toBe(10);
    expect(config.review.finalize_day).toBe("sunday");
    expect(config.review.gap_threshold_minutes).toBe(45);
  });
});
