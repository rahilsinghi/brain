import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { determineHealAction, appendContradictionWarning } from "../../src/lint/healer.js";
import { writeFrontmatter, readFrontmatter } from "../../src/frontmatter.js";
import { readFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import type { LintIssue } from "../../src/types.js";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/healer-test");

describe("determineHealAction", () => {
  it("returns direct_edit for AI-authored files with no human edits", () => {
    const action = determineHealAction("ai", null, null);
    expect(action).toBe("direct_edit");
  });

  it("returns append_synthesis for AI-authored files with human edits > 24h ago", () => {
    const oldDate = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
    const action = determineHealAction("ai", oldDate, 24);
    expect(action).toBe("append_synthesis");
  });

  it("returns skip for files with human edits < 24h ago", () => {
    const recentDate = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    const action = determineHealAction("ai", recentDate, 24);
    expect(action).toBe("skip");
  });

  it("returns skip for human-authored files with recent edits", () => {
    const recentDate = new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString();
    const action = determineHealAction("human", recentDate, 24);
    expect(action).toBe("skip");
  });

  it("returns flag_contradiction for contradiction issues regardless of authorship", () => {
    const action = determineHealAction("ai", null, 24, "contradiction");
    expect(action).toBe("flag_contradiction");
  });
});

describe("appendContradictionWarning", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_DIR, "wiki/concepts"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("appends a warning callout to the file", () => {
    const file = join(TEST_DIR, "wiki/concepts/test.md");
    writeFrontmatter(file, {
      title: "Test",
      author: "ai",
      created_at: "2026-04-03T00:00:00Z",
      last_ai_edit: "2026-04-03T00:00:00Z",
      last_human_edit: null,
      last_embedded_hash: null,
      sources: [],
      tags: [],
    }, "# Test\n\nOriginal content.\n");

    appendContradictionWarning(file, "Contradicts [[Other Article]] on the definition of X.");

    const raw = readFileSync(file, "utf-8");
    expect(raw).toContain("> [!WARNING] Contradiction Detected");
    expect(raw).toContain("Contradicts [[Other Article]]");
    expect(raw).toContain("Original content");
  });
});
