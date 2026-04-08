import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getHealthStats } from "../../src/api/health-core.js";

const TEST_VAULT = join(import.meta.dirname, "__fixtures__/health-core-test");

describe("getHealthStats", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_VAULT, "wiki"), { recursive: true });
    mkdirSync(join(TEST_VAULT, "raw"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_VAULT, { recursive: true, force: true });
  });

  it("returns correct shape with all fields", () => {
    const stats = getHealthStats({
      store: { search: async () => [] } as never,
      vaultRoot: TEST_VAULT,
      startTime: Date.now() - 5000,
    });

    expect(stats.status).toBe("ok");
    expect(typeof stats.uptime_s).toBe("number");
    expect(typeof stats.lancedb_ready).toBe("boolean");
    expect(typeof stats.wiki_article_count).toBe("number");
    expect(typeof stats.raw_pending_count).toBe("number");
  });

  it("calculates uptime within reasonable range", () => {
    const fiveSecondsAgo = Date.now() - 5000;
    const stats = getHealthStats({
      store: null,
      vaultRoot: TEST_VAULT,
      startTime: fiveSecondsAgo,
    });

    expect(stats.uptime_s).toBeGreaterThanOrEqual(4);
    expect(stats.uptime_s).toBeLessThanOrEqual(10);
  });

  it("reports lancedb_ready false when store is null", () => {
    const stats = getHealthStats({
      store: null,
      vaultRoot: TEST_VAULT,
      startTime: Date.now(),
    });

    expect(stats.lancedb_ready).toBe(false);
  });

  it("reports lancedb_ready true when store is provided", () => {
    const stats = getHealthStats({
      store: { search: async () => [] } as never,
      vaultRoot: TEST_VAULT,
      startTime: Date.now(),
    });

    expect(stats.lancedb_ready).toBe(true);
  });

  it("counts wiki .md files recursively", () => {
    mkdirSync(join(TEST_VAULT, "wiki/sub"), { recursive: true });
    writeFileSync(join(TEST_VAULT, "wiki/a.md"), "# A");
    writeFileSync(join(TEST_VAULT, "wiki/sub/b.md"), "# B");
    writeFileSync(join(TEST_VAULT, "wiki/not-md.txt"), "ignored");

    const stats = getHealthStats({
      store: null,
      vaultRoot: TEST_VAULT,
      startTime: Date.now(),
    });

    expect(stats.wiki_article_count).toBe(2);
  });

  it("counts raw pending files, excluding quarantine/", () => {
    mkdirSync(join(TEST_VAULT, "raw/articles"), { recursive: true });
    mkdirSync(join(TEST_VAULT, "raw/quarantine"), { recursive: true });
    writeFileSync(join(TEST_VAULT, "raw/articles/a.md"), "pending");
    writeFileSync(join(TEST_VAULT, "raw/quarantine/b.md"), "quarantined");

    const stats = getHealthStats({
      store: null,
      vaultRoot: TEST_VAULT,
      startTime: Date.now(),
    });

    expect(stats.raw_pending_count).toBe(1);
  });
});
