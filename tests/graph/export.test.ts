import { describe, it, expect } from "vitest";
import { generateGraphCache } from "../../src/graph/export.js";

describe("generateGraphCache", () => {
  it("produces a GraphCache with UMAP positions", async () => {
    const mockScanResult = {
      nodes: [
        { id: "projects/a.md", title: "A", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-01", connection_count: 1 },
        { id: "projects/b.md", title: "B", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-02", connection_count: 1 },
        { id: "skills/c.md", title: "C", tags: [], category: "skills", source_type: "ai", created_at: "2026-01-03", connection_count: 0 },
      ],
      links: [{ source: "projects/a.md", target: "projects/b.md" }],
    };

    const mockEmbeddings = new Map<string, number[]>([
      ["projects/a.md", [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      ["projects/b.md", [0.9, 0.1, 0, 0, 0, 0, 0, 0, 0, 0]],
      ["skills/c.md", [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]],
    ]);

    const cache = await generateGraphCache(mockScanResult, mockEmbeddings, 42);

    expect(cache.node_count).toBe(3);
    expect(cache.nodes).toHaveLength(3);
    expect(cache.links).toEqual(mockScanResult.links);
    expect(cache.generated_at).toBeTruthy();

    for (const node of cache.nodes) {
      expect(typeof node.x).toBe("number");
      expect(typeof node.y).toBe("number");
      expect(typeof node.z).toBe("number");
      expect(Number.isFinite(node.x)).toBe(true);
    }
  });

  it("excludes nodes with no embeddings", async () => {
    const mockScanResult = {
      nodes: [
        { id: "projects/a.md", title: "A", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-01", connection_count: 0 },
        { id: "projects/noembeds.md", title: "No Embeds", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-01", connection_count: 0 },
      ],
      links: [],
    };

    const mockEmbeddings = new Map<string, number[]>([
      ["projects/a.md", [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    ]);

    const cache = await generateGraphCache(mockScanResult, mockEmbeddings, 42);
    expect(cache.node_count).toBe(1);
    expect(cache.nodes[0].id).toBe("projects/a.md");
  });

  it("handles single node gracefully", async () => {
    const mockScanResult = {
      nodes: [{ id: "a.md", title: "A", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-01", connection_count: 0 }],
      links: [],
    };
    const mockEmbeddings = new Map([["a.md", [1, 0, 0]]]);
    const cache = await generateGraphCache(mockScanResult, mockEmbeddings, 42);
    expect(cache.node_count).toBe(1);
    expect(cache.nodes[0].x).toBe(0);
    expect(cache.nodes[0].y).toBe(0);
    expect(cache.nodes[0].z).toBe(0);
  });

  it("is deterministic with the same seed", async () => {
    const mockScanResult = {
      nodes: [
        { id: "a.md", title: "A", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-01", connection_count: 1 },
        { id: "b.md", title: "B", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-02", connection_count: 1 },
        { id: "c.md", title: "C", tags: [], category: "skills", source_type: "ai", created_at: "2026-01-03", connection_count: 0 },
      ],
      links: [{ source: "a.md", target: "b.md" }],
    };

    const mockEmbeddings = new Map<string, number[]>([
      ["a.md", [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      ["b.md", [0.9, 0.1, 0, 0, 0, 0, 0, 0, 0, 0]],
      ["c.md", [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]],
    ]);

    const cache1 = await generateGraphCache(mockScanResult, mockEmbeddings, 42);
    const cache2 = await generateGraphCache(mockScanResult, mockEmbeddings, 42);

    for (let i = 0; i < cache1.nodes.length; i++) {
      expect(cache1.nodes[i].x).toBe(cache2.nodes[i].x);
      expect(cache1.nodes[i].y).toBe(cache2.nodes[i].y);
      expect(cache1.nodes[i].z).toBe(cache2.nodes[i].z);
    }
  });

  it("filters links to only include nodes with embeddings", async () => {
    const mockScanResult = {
      nodes: [
        { id: "a.md", title: "A", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-01", connection_count: 1 },
        { id: "b.md", title: "B", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-02", connection_count: 1 },
      ],
      links: [
        { source: "a.md", target: "b.md" },
        { source: "a.md", target: "missing.md" },
      ],
    };

    const mockEmbeddings = new Map<string, number[]>([
      ["a.md", [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      ["b.md", [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]],
    ]);

    const cache = await generateGraphCache(mockScanResult, mockEmbeddings, 42);
    expect(cache.links).toHaveLength(1);
    expect(cache.links[0]).toEqual({ source: "a.md", target: "b.md" });
  });
});
