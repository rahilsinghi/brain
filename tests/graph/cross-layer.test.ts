import { describe, it, expect } from "vitest";
import { generateCrossLayerEdges } from "../../src/graph/cross-layer.js";
import type { GraphNode, GraphLink } from "../../src/types.js";

const makeWikiNode = (id: string): GraphNode => ({
  id,
  title: id,
  tags: [],
  category: "projects",
  source_type: "ai",
  created_at: "",
  connection_count: 0,
  x: 0,
  y: 0,
  z: 0,
  layer: "wiki",
});

const makeCodeNode = (
  id: string,
  repo: string,
  connectionCount: number,
): GraphNode => ({
  id,
  title: id,
  tags: [],
  category: repo,
  source_type: "graphify",
  created_at: "",
  connection_count: connectionCount,
  x: 0,
  y: 0,
  z: 0,
  layer: "code",
  repo,
});

describe("generateCrossLayerEdges", () => {
  it("connects wiki repo article to code nodes from same repo", () => {
    const wikiNodes = [makeWikiNode("wiki://projects/brain.md")];
    const codeScan = {
      nodes: [
        makeCodeNode("code://brain/src/index.ts", "brain", 5),
        makeCodeNode("code://brain/src/config.ts", "brain", 3),
        makeCodeNode("code://portfolio/src/app.tsx", "portfolio", 10),
      ],
      links: [],
    };

    const edges = generateCrossLayerEdges(wikiNodes, codeScan);

    expect(edges.length).toBe(2);
    expect(edges.every((e) => e.source === "wiki://projects/brain.md")).toBe(
      true,
    );
    expect(edges.map((e) => e.target)).toContain("code://brain/src/index.ts");
    expect(edges.map((e) => e.target)).toContain("code://brain/src/config.ts");
    expect(edges.map((e) => e.target)).not.toContain(
      "code://portfolio/src/app.tsx",
    );
  });

  it("caps at 20 edges per wiki node, sorted by centrality (connection_count desc)", () => {
    const wikiNodes = [makeWikiNode("wiki://projects/brain.md")];
    const codeNodes: GraphNode[] = Array.from({ length: 30 }, (_, i) =>
      makeCodeNode(`code://brain/src/file${i}.ts`, "brain", 30 - i),
    );
    const codeScan = { nodes: codeNodes, links: [] };

    const edges = generateCrossLayerEdges(wikiNodes, codeScan);

    expect(edges.length).toBe(20);
    // Should be sorted by connection_count desc — top 20 are files 0..19 with counts 30..11
    const targets = edges.map((e) => e.target);
    expect(targets).toContain("code://brain/src/file0.ts"); // connection_count: 30
    expect(targets).toContain("code://brain/src/file19.ts"); // connection_count: 11
    expect(targets).not.toContain("code://brain/src/file20.ts"); // connection_count: 10, excluded
  });

  it("skips symbol-level nodes (IDs containing #)", () => {
    const wikiNodes = [makeWikiNode("wiki://projects/brain.md")];
    const codeScan = {
      nodes: [
        makeCodeNode("code://brain/src/index.ts#MyClass", "brain", 50),
        makeCodeNode("code://brain/src/index.ts#myFunction", "brain", 40),
        makeCodeNode("code://brain/src/config.ts", "brain", 3),
      ],
      links: [],
    };

    const edges = generateCrossLayerEdges(wikiNodes, codeScan);

    expect(edges.length).toBe(1);
    expect(edges[0].target).toBe("code://brain/src/config.ts");
    expect(edges.map((e) => e.target)).not.toContain(
      "code://brain/src/index.ts#MyClass",
    );
  });

  it("matches code-architecture wiki articles too", () => {
    const wikiNodes = [
      makeWikiNode("wiki://code-architecture/brain-architecture.md"),
    ];
    const codeScan = {
      nodes: [
        makeCodeNode("code://brain/src/index.ts", "brain", 5),
        makeCodeNode("code://brain/src/config.ts", "brain", 3),
      ],
      links: [],
    };

    const edges = generateCrossLayerEdges(wikiNodes, codeScan);

    expect(edges.length).toBe(2);
    expect(
      edges.every(
        (e) => e.source === "wiki://code-architecture/brain-architecture.md",
      ),
    ).toBe(true);
    expect(edges.map((e) => e.target)).toContain("code://brain/src/index.ts");
  });

  it("returns empty when no repos match", () => {
    const wikiNodes = [makeWikiNode("wiki://skills/typescript.md")];
    const codeScan = {
      nodes: [
        makeCodeNode("code://brain/src/index.ts", "brain", 5),
        makeCodeNode("code://portfolio/src/app.tsx", "portfolio", 10),
      ],
      links: [],
    };

    const edges = generateCrossLayerEdges(wikiNodes, codeScan);

    expect(edges).toEqual([]);
  });

  it("returns empty when code scan is empty", () => {
    const wikiNodes = [makeWikiNode("wiki://projects/brain.md")];
    const codeScan = { nodes: [], links: [] };

    const edges = generateCrossLayerEdges(wikiNodes, codeScan);

    expect(edges).toEqual([]);
  });
});
