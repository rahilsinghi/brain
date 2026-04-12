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

  it("detects god nodes using mean+2sigma on connection_count", async () => {
    // Node "hub.md" has connection_count=100, others have 1
    // mean = (1+1+1+100)/4 = 25.75
    // variance = ((1-25.75)^2*3 + (100-25.75)^2) / 4 = (1830.1875 + 5511.5625) / 4 = 1835.4375
    // std = ~42.84, threshold = 25.75 + 2*42.84 = ~111.43 — wait, 100 < 111.43
    // Let's use a more extreme outlier: hub has 1000, others have 1
    // mean = (1+1+1+1000)/4 = 250.75
    // variance = ((1-250.75)^2*3 + (1000-250.75)^2) / 4
    //          = (62374.6875*3 + 561252.5625) / 4 = (187123.0625 + 561252.5625) / 4 = 187093.906
    // std = ~432.5, threshold = 250.75 + 2*432.5 = 1115.75 — hub(1000) < threshold
    // Use: others=1, hub=10000 → mean=2500.75, std huge, hub clearly > mean+2sigma
    // Actually let's keep it simple: 3 nodes with count=1, 1 node with count=1000
    // mean=250.75, std≈432.8, threshold≈1116.4 → 1000 < threshold → NOT a god node
    // So use: 3 nodes with count=1, 1 node with count=10000
    // mean=2500.75, variance=((1-2500.75)^2*3+(10000-2500.75)^2)/4
    //   = (2248500.5625*3 + 56238750.5625)/4 = (6745501.6875+56238750.5625)/4 = 15746063.0625
    // std ≈ 3968.1, threshold = 2500.75 + 2*3968.1 = 10437 → 10000 < 10437 → NOT god node
    // Use: others=1, hub=100000 → mean=25000.75, variance=..., will work.
    // Simpler: just use 2 nodes at count=1, 1 at count=1000 (3 total)
    // mean=(1+1+1000)/3=334, variance=((1-334)^2*2+(1000-334)^2)/3=(221778+443556)/3=221778, std≈471, threshold=334+942=1276 → 1000<1276 NOT god
    // Simplest that works: 1 node at 1, 1 node at 1000
    // mean=500.5, variance=((1-500.5)^2+(1000-500.5)^2)/2=(249500.25+249500.25)/2=249500.25, std≈499.5, threshold=500.5+999=1499.5 → 1000<1499.5 NOT god
    // Need count far from others. Use: [1, 1, 1, 500] → mean=125.75, std≈
    // (1-125.75)^2=15563, *3=46688, (500-125.75)^2=140130, sum=186818, /4=46704, std≈216.1, threshold=125.75+432.2=557.95 → 500 < 558 NOT god
    // Cleanest: [1, 1, 1, 10000] large enough gap
    // mean=2500.75, std from above ≈ 3968, threshold≈10437 → 10000 < 10437 NOT god node
    // We need std to be small relative to the outlier. Best approach: many nodes at 1, one at large value
    // With 10 nodes at 1 and 1 at 1000:
    // mean=(10+1000)/11=92.7, variance=((1-92.7)^2*10+(1000-92.7)^2)/11=(8410.89*10+823100.89)/11=(84108.9+823100.89)/11=82928.9, std≈287.9, threshold=92.7+575.8=668.5 → 1000>668.5 GOD NODE!
    const mockScanResult = {
      nodes: [
        { id: "a.md", title: "A", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-01", connection_count: 1 },
        { id: "b.md", title: "B", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-02", connection_count: 1 },
        { id: "c.md", title: "C", tags: [], category: "skills", source_type: "ai", created_at: "2026-01-03", connection_count: 1 },
        { id: "d.md", title: "D", tags: [], category: "skills", source_type: "ai", created_at: "2026-01-04", connection_count: 1 },
        { id: "e.md", title: "E", tags: [], category: "skills", source_type: "ai", created_at: "2026-01-05", connection_count: 1 },
        { id: "f.md", title: "F", tags: [], category: "skills", source_type: "ai", created_at: "2026-01-06", connection_count: 1 },
        { id: "g.md", title: "G", tags: [], category: "skills", source_type: "ai", created_at: "2026-01-07", connection_count: 1 },
        { id: "h.md", title: "H", tags: [], category: "skills", source_type: "ai", created_at: "2026-01-08", connection_count: 1 },
        { id: "i.md", title: "I", tags: [], category: "skills", source_type: "ai", created_at: "2026-01-09", connection_count: 1 },
        { id: "j.md", title: "J", tags: [], category: "skills", source_type: "ai", created_at: "2026-01-10", connection_count: 1 },
        { id: "hub.md", title: "Hub", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-11", connection_count: 1000 },
      ],
      links: [],
    };

    const makeEmbed = (i: number): number[] => {
      const v = new Array(10).fill(0);
      v[i % 10] = 1;
      return v;
    };

    const mockEmbeddings = new Map<string, number[]>([
      ["a.md", makeEmbed(0)],
      ["b.md", makeEmbed(1)],
      ["c.md", makeEmbed(2)],
      ["d.md", makeEmbed(3)],
      ["e.md", makeEmbed(4)],
      ["f.md", makeEmbed(5)],
      ["g.md", makeEmbed(6)],
      ["h.md", makeEmbed(7)],
      ["i.md", makeEmbed(8)],
      ["j.md", makeEmbed(9)],
      ["hub.md", makeEmbed(0)],
    ]);

    const cache = await generateGraphCache(mockScanResult, mockEmbeddings, 42);
    const hub = cache.nodes.find((n) => n.id === "hub.md");
    expect(hub).toBeDefined();
    expect(hub!.is_god_node).toBe(true);
    expect(hub!.z).toBe(-200);

    for (const node of cache.nodes.filter((n) => n.id !== "hub.md")) {
      expect(node.is_god_node).toBeUndefined();
    }
  });

  it("does not mark god nodes when all connection counts are similar", async () => {
    const mockScanResult = {
      nodes: [
        { id: "a.md", title: "A", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-01", connection_count: 5 },
        { id: "b.md", title: "B", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-02", connection_count: 6 },
        { id: "c.md", title: "C", tags: [], category: "skills", source_type: "ai", created_at: "2026-01-03", connection_count: 5 },
      ],
      links: [],
    };

    const mockEmbeddings = new Map<string, number[]>([
      ["a.md", [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      ["b.md", [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]],
      ["c.md", [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]],
    ]);

    const cache = await generateGraphCache(mockScanResult, mockEmbeddings, 42);
    for (const node of cache.nodes) {
      expect(node.is_god_node).toBeUndefined();
    }
  });
});
