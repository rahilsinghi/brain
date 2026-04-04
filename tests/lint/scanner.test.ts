import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { scanForIssues } from "../../src/lint/scanner.js";
import { writeFrontmatter } from "../../src/frontmatter.js";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/lint-test");

describe("scanForIssues", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_DIR, "wiki/concepts"), { recursive: true });
    mkdirSync(join(TEST_DIR, "raw/articles"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("detects broken wiki links", () => {
    const file = join(TEST_DIR, "wiki/concepts/article-a.md");
    writeFrontmatter(file, {
      title: "Article A",
      author: "ai",
      created_at: "2026-04-03T00:00:00Z",
      last_ai_edit: "2026-04-03T00:00:00Z",
      last_human_edit: null,
      last_embedded_hash: null,
      sources: [],
      tags: [],
    }, "# Article A\n\nSee also [[Non Existent Article]].\n");

    const issues = scanForIssues(TEST_DIR);
    const brokenLinks = issues.filter((i) => i.type === "broken_link");

    expect(brokenLinks.length).toBeGreaterThan(0);
    expect(brokenLinks[0].description).toContain("Non Existent Article");
  });

  it("detects orphan articles with no inbound links", () => {
    const file1 = join(TEST_DIR, "wiki/concepts/linked.md");
    writeFrontmatter(file1, {
      title: "Linked",
      author: "ai",
      created_at: "2026-04-03T00:00:00Z",
      last_ai_edit: "2026-04-03T00:00:00Z",
      last_human_edit: null,
      last_embedded_hash: null,
      sources: [],
      tags: [],
    }, "# Linked\n\nThis is linked to.\n");

    const file2 = join(TEST_DIR, "wiki/concepts/orphan.md");
    writeFrontmatter(file2, {
      title: "Orphan",
      author: "ai",
      created_at: "2026-04-03T00:00:00Z",
      last_ai_edit: "2026-04-03T00:00:00Z",
      last_human_edit: null,
      last_embedded_hash: null,
      sources: [],
      tags: [],
    }, "# Orphan\n\nNo one links here.\n");

    const issues = scanForIssues(TEST_DIR);
    const orphans = issues.filter((i) => i.type === "orphan_article");

    expect(orphans.length).toBe(2);
  });

  it("detects format issues (missing required frontmatter fields)", () => {
    const file = join(TEST_DIR, "wiki/concepts/bad-fm.md");
    writeFileSync(file, "---\ntitle: Missing Fields\n---\n\n# Bad\n");

    const issues = scanForIssues(TEST_DIR);
    const formatIssues = issues.filter((i) => i.type === "format_issue");

    expect(formatIssues.length).toBeGreaterThan(0);
  });
});
