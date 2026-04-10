import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { writeFrontmatter } from "../../src/frontmatter.js";
import { rebuildGraphCache, readGraphCache } from "../../src/graph/cache.js";

const TEST_VAULT = join(import.meta.dirname, "__fixtures__/cache-test");

function writeArticle(slug: string, title: string, content: string) {
  const dir = join(TEST_VAULT, "wiki", "projects");
  mkdirSync(dir, { recursive: true });
  writeFrontmatter(
    join(dir, `${slug}.md`),
    {
      title,
      author: "ai",
      created_at: "2026-04-10T00:00:00Z",
      last_ai_edit: "2026-04-10T00:00:00Z",
      last_human_edit: null,
      last_embedded_hash: null,
      sources: [],
      tags: ["test"],
    },
    content,
  );
}

describe("graph cache", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_VAULT, "wiki"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_VAULT, { recursive: true, force: true });
  });

  it("rebuilds cache and writes to disk", async () => {
    writeArticle("a", "Project A", "# Project A\n\nContent A.");
    writeArticle("b", "Project B", "# Project B\n\nContent B.");

    const mockEmbeddings = new Map<string, number[]>([
      ["projects/a.md", Array(10).fill(0.1)],
      ["projects/b.md", Array(10).fill(0.2)],
    ]);

    const cachePath = join(TEST_VAULT, "wiki", ".graph-cache.json");
    const cache = await rebuildGraphCache(
      TEST_VAULT,
      cachePath,
      mockEmbeddings,
      42,
    );

    expect(cache.node_count).toBe(2);
    expect(existsSync(cachePath)).toBe(true);

    const fromDisk = readGraphCache(cachePath);
    expect(fromDisk).not.toBeNull();
    expect(fromDisk!.node_count).toBe(2);
  });

  it("readGraphCache returns null for missing file", () => {
    expect(readGraphCache(join(TEST_VAULT, "nonexistent.json"))).toBeNull();
  });
});
