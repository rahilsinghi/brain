import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { shouldReembed, computeContentHash, syncFile } from "../../src/embedder/sync.js";
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

  describe("syncFile partial failure", () => {
    it("does not update last_embedded_hash when embed() fails mid-batch", async () => {
      const file = join(TEST_DIR, "wiki/concepts/partial.md");
      const body = "# Partial\n\n## Section A\n\nContent A.\n\n## Section B\n\nContent B.\n";
      writeFrontmatter(file, {
        title: "Partial",
        author: "ai",
        created_at: "2026-04-03T00:00:00Z",
        last_ai_edit: "2026-04-03T00:00:00Z",
        last_human_edit: null,
        last_embedded_hash: null,
        sources: [],
        tags: [],
      }, body);

      let callCount = 0;
      vi.doMock("../../src/embedder/embedder.js", () => ({
        embed: async () => {
          callCount++;
          if (callCount >= 2) throw new Error("Embedding failed");
          return new Array(768).fill(0.1);
        },
      }));

      const deletedPaths: string[] = [];
      const upsertedChunks: unknown[] = [];
      const mockStore = {
        deleteByFilePath: async (fp: string) => { deletedPaths.push(fp); },
        upsertChunks: async (chunks: unknown[]) => { upsertedChunks.push(...chunks); },
      };

      // syncFile should throw (propagate the embed error)
      await expect(
        syncFile(file, TEST_DIR, mockStore as never)
      ).rejects.toThrow("Embedding failed");

      // Hash should NOT have been updated
      const { data } = readFrontmatter(file);
      expect(data.last_embedded_hash).toBeNull();

      vi.doUnmock("../../src/embedder/embedder.js");
    });

    it("cleans up partial chunks from store on embed failure", async () => {
      const file = join(TEST_DIR, "wiki/concepts/cleanup.md");
      const body = "# Cleanup\n\n## Section A\n\nContent A.\n\n## Section B\n\nContent B.\n";
      writeFrontmatter(file, {
        title: "Cleanup",
        author: "ai",
        created_at: "2026-04-03T00:00:00Z",
        last_ai_edit: "2026-04-03T00:00:00Z",
        last_human_edit: null,
        last_embedded_hash: null,
        sources: [],
        tags: [],
      }, body);

      let callCount = 0;
      vi.doMock("../../src/embedder/embedder.js", () => ({
        embed: async () => {
          callCount++;
          if (callCount >= 2) throw new Error("Embedding failed");
          return new Array(768).fill(0.1);
        },
      }));

      const deleteCalls: string[] = [];
      const mockStore = {
        deleteByFilePath: async (fp: string) => { deleteCalls.push(fp); },
        upsertChunks: async () => {},
      };

      await expect(
        syncFile(file, TEST_DIR, mockStore as never)
      ).rejects.toThrow("Embedding failed");

      // Should have called deleteByFilePath twice: once at start, once to clean up
      const relPath = "wiki/concepts/cleanup.md";
      expect(deleteCalls.filter((p) => p === relPath).length).toBe(2);

      vi.doUnmock("../../src/embedder/embedder.js");
    });
  });
});
