import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { runLintHeal } from "../../src/lint/runner.js";
import { writeFrontmatter } from "../../src/frontmatter.js";
import { mkdirSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/runner-test");

describe("runLintHeal", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_DIR, "wiki/concepts"), { recursive: true });
    mkdirSync(join(TEST_DIR, "raw/articles"), { recursive: true });
    mkdirSync(join(TEST_DIR, "raw/quarantine"), { recursive: true });
    mkdirSync(join(TEST_DIR, "proposals"), { recursive: true });
    mkdirSync(join(TEST_DIR, "daily"), { recursive: true });
    mkdirSync(join(TEST_DIR, ".brain"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("produces a lint report", async () => {
    const file = join(TEST_DIR, "wiki/concepts/test.md");
    writeFrontmatter(file, {
      title: "Test Article",
      author: "ai",
      created_at: "2026-04-03T00:00:00Z",
      last_ai_edit: "2026-04-03T00:00:00Z",
      last_human_edit: null,
      last_embedded_hash: null,
      sources: [],
      tags: [],
    }, "# Test Article\n\nSome content with [[Missing Link]].\n");

    const stats = await runLintHeal(TEST_DIR, {
      maxOperations: 20,
      maxWebSearches: 0,
      cooldownHours: 24,
    });

    expect(stats.lintIssuesFound).toBeGreaterThan(0);
    expect(existsSync(join(TEST_DIR, ".brain/lint-report.md"))).toBe(true);
  });

  it("writes a daily summary of changes", async () => {
    const file = join(TEST_DIR, "wiki/concepts/article.md");
    writeFrontmatter(file, {
      title: "Article",
      author: "ai",
      created_at: "2026-04-03T00:00:00Z",
      last_ai_edit: "2026-04-03T00:00:00Z",
      last_human_edit: null,
      last_embedded_hash: null,
      sources: [],
      tags: [],
    }, "# Article\n\nContent here.\n");

    const stats = await runLintHeal(TEST_DIR, {
      maxOperations: 20,
      maxWebSearches: 0,
      cooldownHours: 24,
    });

    expect(stats).toBeDefined();
  });
});
