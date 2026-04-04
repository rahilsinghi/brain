import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { shouldReembed, computeContentHash } from "../../src/embedder/sync.js";
import { writeFrontmatter, readFrontmatter } from "../../src/frontmatter.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/sync-test");

describe("embedding sync", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_DIR, "wiki/concepts"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("computeContentHash returns consistent hash for same content", () => {
    const hash1 = computeContentHash("hello world");
    const hash2 = computeContentHash("hello world");
    expect(hash1).toBe(hash2);
  });

  it("computeContentHash returns different hash for different content", () => {
    const hash1 = computeContentHash("hello");
    const hash2 = computeContentHash("world");
    expect(hash1).not.toBe(hash2);
  });

  it("shouldReembed returns true when no last_embedded_hash", () => {
    const file = join(TEST_DIR, "wiki/concepts/new.md");
    writeFrontmatter(file, {
      title: "New Article",
      author: "ai",
      created_at: "2026-04-03T00:00:00Z",
      last_ai_edit: "2026-04-03T00:00:00Z",
      last_human_edit: null,
      last_embedded_hash: null,
      sources: [],
      tags: [],
    }, "# New Article\n\nContent here.\n");

    expect(shouldReembed(file)).toBe(true);
  });

  it("shouldReembed returns false when hash matches current content", () => {
    const content = "# Same Article\n\nSame content.\n";
    const hash = computeContentHash(content);
    const file = join(TEST_DIR, "wiki/concepts/same.md");
    writeFrontmatter(file, {
      title: "Same Article",
      author: "ai",
      created_at: "2026-04-03T00:00:00Z",
      last_ai_edit: "2026-04-03T00:00:00Z",
      last_human_edit: null,
      last_embedded_hash: hash,
      sources: [],
      tags: [],
    }, content);

    expect(shouldReembed(file)).toBe(false);
  });

  it("shouldReembed returns true when hash differs from current content", () => {
    const file = join(TEST_DIR, "wiki/concepts/changed.md");
    writeFrontmatter(file, {
      title: "Changed Article",
      author: "ai",
      created_at: "2026-04-03T00:00:00Z",
      last_ai_edit: "2026-04-03T00:00:00Z",
      last_human_edit: null,
      last_embedded_hash: "stale_hash_from_before",
      sources: [],
      tags: [],
    }, "# Changed Article\n\nUpdated content.\n");

    expect(shouldReembed(file)).toBe(true);
  });
});
