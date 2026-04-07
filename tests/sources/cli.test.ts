import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { runSync, formatReport } from "../../src/sources/cli.js";
import { mkdirSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { SyncSource, SyncRunReport } from "../../src/sources/types.js";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/cli-test");

describe("runSync", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_DIR, ".brain"), { recursive: true });
    mkdirSync(join(TEST_DIR, "raw/markpush/articles"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("returns a report with ingested items", async () => {
    const mockSource: SyncSource = {
      name: "markpush",
      poll: async () => ({
        newItems: [{
          filename: "markpush/articles/test-abc123.md",
          content: "# Test\n\nContent.\n",
          sourceId: "https://example.com/test",
        }],
        processedIds: ["https://example.com/test"],
      }),
    };

    const report = await runSync([mockSource], TEST_DIR);
    expect(report.results.markpush.itemsIngested).toBe(1);
    expect(existsSync(join(TEST_DIR, "raw/markpush/articles/test-abc123.md"))).toBe(true);
  });
});

describe("formatReport", () => {
  it("in quiet mode, suppresses zero-item sources", () => {
    const report: SyncRunReport = {
      timestamp: "2026-04-06T22:00:00Z",
      results: {
        markpush: { itemsIngested: 0, itemsSkipped: 0, errors: [] },
        gmail: { itemsIngested: 3, itemsSkipped: 1, errors: [] },
      },
    };

    const output = formatReport(report, true);
    expect(output).not.toContain("markpush");
    expect(output).toContain("gmail");
    expect(output).toContain("3 new");
  });

  it("always surfaces errors even in quiet mode", () => {
    const report: SyncRunReport = {
      timestamp: "2026-04-06T22:00:00Z",
      results: {
        markpush: { itemsIngested: 0, itemsSkipped: 0, errors: ["Connection failed"] },
      },
    };

    const output = formatReport(report, true);
    expect(output).toContain("markpush");
    expect(output).toContain("Connection failed");
  });

  it("in normal mode, shows all sources", () => {
    const report: SyncRunReport = {
      timestamp: "2026-04-06T22:00:00Z",
      results: {
        markpush: { itemsIngested: 0, itemsSkipped: 0, errors: [] },
        gmail: { itemsIngested: 2, itemsSkipped: 0, errors: [] },
      },
    };

    const output = formatReport(report, false);
    expect(output).toContain("markpush");
    expect(output).toContain("gmail");
  });
});
