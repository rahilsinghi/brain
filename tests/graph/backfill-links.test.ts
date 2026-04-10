import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { readFrontmatter, writeFrontmatter } from "../../src/frontmatter.js";
import { backfillLinks } from "../../src/graph/backfill-links.js";

const TEST_VAULT = join(import.meta.dirname, "__fixtures__/backfill-test");

function writeArticle(
  subdir: string,
  slug: string,
  title: string,
  tags: string[],
  content: string,
): void {
  const dir = join(TEST_VAULT, "wiki", subdir);
  mkdirSync(dir, { recursive: true });
  const fm = {
    title,
    author: "ai",
    created_at: "2026-04-10T00:00:00Z",
    last_ai_edit: "2026-04-10T00:00:00Z",
    last_human_edit: null,
    last_embedded_hash: null,
    sources: [],
    tags,
  };
  writeFrontmatter(join(dir, `${slug}.md`), fm, content);
}

describe("backfillLinks", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_VAULT, "wiki"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_VAULT, { recursive: true, force: true });
  });

  it("rewrites [[Title]] links to match actual article titles (case-insensitive)", () => {
    writeArticle("concepts", "zustand-graph-state-store", "Zustand Graph State Store", [], "# Zustand\n\nA state library.");
    writeArticle("projects", "brain-explorer", "Brain Explorer", [], "# Brain Explorer\n\n## Related\n\n- [[zustand graph state store]]");
    const result = backfillLinks(TEST_VAULT, { dryRun: false });
    const { content } = readFrontmatter(join(TEST_VAULT, "wiki/projects/brain-explorer.md"));
    expect(content).toContain("[[Zustand Graph State Store]]");
    expect(result.resolved).toBe(1);
    expect(result.filesModified).toBe(1);
  });

  it("leaves path-style links with pipe syntax unchanged", () => {
    writeArticle("skills", "typescript", "TypeScript", [], "# TypeScript");
    writeArticle("projects", "karen", "Karen", [], "# Karen\n\nUses [[skills/typescript.md|TypeScript]].");
    const result = backfillLinks(TEST_VAULT, { dryRun: false });
    const { content } = readFrontmatter(join(TEST_VAULT, "wiki/projects/karen.md"));
    expect(content).toContain("[[skills/typescript.md|TypeScript]]");
    expect(result.filesModified).toBe(0);
  });

  it("leaves plain path-style links unchanged", () => {
    writeArticle("skills", "typescript", "TypeScript", [], "# TypeScript");
    writeArticle("projects", "karen", "Karen", [], "# Karen\n\nUses [[skills/typescript]].");
    const result = backfillLinks(TEST_VAULT, { dryRun: false });
    const { content } = readFrontmatter(join(TEST_VAULT, "wiki/projects/karen.md"));
    expect(content).toContain("[[skills/typescript]]");
    expect(result.filesModified).toBe(0);
  });

  it("leaves truly dangling links as-is", () => {
    writeArticle("projects", "karen", "Karen", [], "# Karen\n\nUses [[Nonexistent Topic]].");
    const result = backfillLinks(TEST_VAULT, { dryRun: false });
    const { content } = readFrontmatter(join(TEST_VAULT, "wiki/projects/karen.md"));
    expect(content).toContain("[[Nonexistent Topic]]");
    expect(result.dangling).toBe(1);
    expect(result.filesModified).toBe(0);
  });

  it("dry run reports changes but does not modify files", () => {
    writeArticle("concepts", "zustand-store", "Zustand Store", [], "# Zustand\n\nA store.");
    writeArticle("projects", "explorer", "Explorer", [], "# Explorer\n\nUses [[zustand store]].");
    const result = backfillLinks(TEST_VAULT, { dryRun: true });
    expect(result.resolved).toBe(1);
    expect(result.filesModified).toBe(1);
    const { content } = readFrontmatter(join(TEST_VAULT, "wiki/projects/explorer.md"));
    expect(content).toContain("[[zustand store]]");
  });

  it("is idempotent — running twice produces same result", () => {
    writeArticle("concepts", "zustand-store", "Zustand Store", [], "# Zustand\n\nA store.");
    writeArticle("projects", "explorer", "Explorer", [], "# Explorer\n\nUses [[zustand store]].");
    backfillLinks(TEST_VAULT, { dryRun: false });
    const result2 = backfillLinks(TEST_VAULT, { dryRun: false });
    expect(result2.resolved).toBe(0);
    expect(result2.filesModified).toBe(0);
  });

  it("rewrites links in all sections, not just Related", () => {
    writeArticle("concepts", "react-three-fiber", "React Three Fiber", [], "# React Three Fiber\n\nA library.");
    writeArticle("projects", "explorer", "Explorer", [], "# Explorer\n\n## Details\n\nUses [[react three fiber]] for 3D.\n\n## Related\n\n- [[react three fiber]]");
    const result = backfillLinks(TEST_VAULT, { dryRun: false });
    const { content } = readFrontmatter(join(TEST_VAULT, "wiki/projects/explorer.md"));
    expect(content).toContain("## Details\n\nUses [[React Three Fiber]] for 3D.");
    expect(content).toContain("- [[React Three Fiber]]");
    expect(result.resolved).toBe(2);
  });

  it("skips index.md files", () => {
    writeFrontmatter(join(TEST_VAULT, "wiki/index.md"), { title: "Index", author: "ai", created_at: "2026-04-10T00:00:00Z", tags: [] }, "# Index\n\n- [[Nonexistent]]");
    const result = backfillLinks(TEST_VAULT, { dryRun: false });
    expect(result.filesModified).toBe(0);
  });

  it("skips code-architecture directory", () => {
    writeArticle("code-architecture", "karen-repo", "Karen Repository Architecture", [], "# Karen\n\nUses [[AuthService]] and [[src/auth/service.ts]].");
    const result = backfillLinks(TEST_VAULT, { dryRun: false });
    expect(result.filesModified).toBe(0);
  });
});
