import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { VectorStore } from "../../src/embedder/vector-store.js";
import { rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DB = join(import.meta.dirname, "__fixtures__/test-lancedb");

describe("VectorStore", () => {
  let store: VectorStore;

  beforeEach(async () => {
    store = new VectorStore(TEST_DB);
    await store.init();
  });

  afterEach(() => {
    rmSync(TEST_DB, { recursive: true, force: true });
  });

  it("inserts chunks and retrieves them by search", async () => {
    await store.upsertChunks([
      {
        id: "file1::Section A",
        filePath: "wiki/concepts/test.md",
        breadcrumb: "Test → Section A",
        heading: "Section A",
        content: "Machine learning is a subset of artificial intelligence.",
        sectionHash: "abc123",
        vector: new Array(768).fill(0.1),
      },
    ]);

    const results = await store.search(new Array(768).fill(0.1), 5);

    expect(results.length).toBe(1);
    expect(results[0].id).toBe("file1::Section A");
    expect(results[0].content).toContain("Machine learning");
  });

  it("deletes chunks by filePath", async () => {
    await store.upsertChunks([
      {
        id: "file1::A",
        filePath: "wiki/concepts/old.md",
        breadcrumb: "Old → A",
        heading: "A",
        content: "Old content",
        sectionHash: "old1",
        vector: new Array(768).fill(0.2),
      },
      {
        id: "file2::B",
        filePath: "wiki/concepts/keep.md",
        breadcrumb: "Keep → B",
        heading: "B",
        content: "Keep this",
        sectionHash: "keep1",
        vector: new Array(768).fill(0.3),
      },
    ]);

    await store.deleteByFilePath("wiki/concepts/old.md");

    const results = await store.search(new Array(768).fill(0.25), 10);
    expect(results.length).toBe(1);
    expect(results[0].filePath).toBe("wiki/concepts/keep.md");
  });

  it("returns empty array when table does not exist", async () => {
    const results = await store.search(new Array(768).fill(0.1), 5);
    expect(results).toEqual([]);
  });
});
