import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { determineHealAction, appendContradictionWarning, writeProposal, appendAISynthesis } from "../../src/lint/healer.js";
import { writeFrontmatter, readFrontmatter } from "../../src/frontmatter.js";
import { readFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
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

describe("writeProposal", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_DIR, "proposals"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("creates a proposal file with correct structure", () => {
    const proposalsDir = join(TEST_DIR, "proposals");
    const path = writeProposal(
      proposalsDir,
      "wiki/concepts/test.md",
      "Add missing backlinks",
      "Scanner found orphan references"
    );

    expect(existsSync(path)).toBe(true);
    const content = readFileSync(path, "utf-8");
    expect(content).toContain("# Proposed Change");
    expect(content).toContain("**Target:** wiki/concepts/test.md");
    expect(content).toContain("## Suggestion");
    expect(content).toContain("Add missing backlinks");
    expect(content).toContain("## Reasoning");
    expect(content).toContain("Scanner found orphan references");
  });

  it("returns the path to the created proposal", () => {
    const proposalsDir = join(TEST_DIR, "proposals");
    const path = writeProposal(proposalsDir, "wiki/concepts/foo.md", "Fix", "Reason");
    expect(path).toContain("proposals/");
    expect(path).toContain("foo.md");
  });
});

describe("appendAISynthesis", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_DIR, "wiki/concepts"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("appends an AI Synthesis section without touching original content", () => {
    const file = join(TEST_DIR, "wiki/concepts/synth.md");
    writeFrontmatter(file, {
      title: "Synth Test",
      author: "ai",
      created_at: "2026-04-03T00:00:00Z",
      last_ai_edit: "2026-04-03T00:00:00Z",
      last_human_edit: null,
      last_embedded_hash: null,
      sources: [],
      tags: [],
    }, "# Synth Test\n\nOriginal human content.\n");

    appendAISynthesis(file, "New synthesized insight about the topic.");

    const raw = readFileSync(file, "utf-8");
    expect(raw).toContain("Original human content.");
    expect(raw).toContain("## AI Synthesis");
    expect(raw).toContain("New synthesized insight about the topic.");
  });

  it("preserves frontmatter when appending", () => {
    const file = join(TEST_DIR, "wiki/concepts/fm.md");
    writeFrontmatter(file, {
      title: "FM Test",
      author: "human",
      created_at: "2026-04-03T00:00:00Z",
      last_ai_edit: null,
      last_human_edit: "2026-04-03T12:00:00Z",
      last_embedded_hash: null,
      sources: [],
      tags: ["important"],
    }, "# FM Test\n\nBody.\n");

    appendAISynthesis(file, "Appended content.");

    const { data } = readFrontmatter(file);
    expect(data.title).toBe("FM Test");
    expect(data.author).toBe("human");
    expect(data.tags).toContain("important");
  });
});
