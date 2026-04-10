import { describe, it, expect } from "vitest";
import { aggregateEmbeddings } from "../../src/graph/embeddings.js";

describe("aggregateEmbeddings", () => {
  it("averages multiple chunk vectors per file into one centroid", () => {
    const chunks = [
      { filePath: "projects/karen.md", vector: [1, 0, 0] },
      { filePath: "projects/karen.md", vector: [0, 1, 0] },
      { filePath: "skills/ts.md", vector: [0, 0, 1] },
    ];

    const result = aggregateEmbeddings(chunks);
    expect(result.size).toBe(2);

    const karen = result.get("projects/karen.md")!;
    expect(karen).toHaveLength(3);
    expect(karen[0]).toBeCloseTo(0.5);
    expect(karen[1]).toBeCloseTo(0.5);
    expect(karen[2]).toBeCloseTo(0);

    const ts = result.get("skills/ts.md")!;
    expect(ts).toEqual([0, 0, 1]);
  });

  it("returns empty map for no chunks", () => {
    expect(aggregateEmbeddings([]).size).toBe(0);
  });

  it("skips chunks with empty vectors", () => {
    const chunks = [
      { filePath: "a.md", vector: [1, 0] },
      { filePath: "b.md", vector: [] },
    ];
    const result = aggregateEmbeddings(chunks);
    expect(result.size).toBe(1);
    expect(result.has("a.md")).toBe(true);
  });
});
