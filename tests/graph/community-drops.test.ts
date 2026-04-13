import { describe, it, expect } from "vitest";
import {
  groupNodesByCommunity,
  generateCommunityDrop,
  generateAllDrops,
} from "../../src/graph/community-drops.js";
import type {
  GraphifyNode,
  GraphifyEdge,
  GraphifyGraphJson,
} from "../../src/graph/community-drops.js";

// ── fixtures ──────────────────────────────────────────────────────────────────

const nodeA: GraphifyNode = {
  id: "src/index.ts",
  label: "index.ts",
  community: 0,
  source_file: "src/index.ts",
  file_type: "module",
};
const nodeB: GraphifyNode = {
  id: "src/config.ts",
  label: "config.ts",
  community: 0,
  source_file: "src/config.ts",
};
const nodeC: GraphifyNode = {
  id: "src/utils.ts",
  label: "utils.ts",
  community: 1,
  source_file: "src/utils.ts",
};
const nodeD: GraphifyNode = {
  id: "src/orphan.ts",
  label: "orphan.ts",
  // no community field
};

// ── groupNodesByCommunity ─────────────────────────────────────────────────────

describe("groupNodesByCommunity", () => {
  it("groups nodes that share the same community id", () => {
    const result = groupNodesByCommunity([nodeA, nodeB, nodeC]);
    expect(result.get(0)).toHaveLength(2);
    expect(result.get(1)).toHaveLength(1);
    expect(result.get(1)?.[0].id).toBe("src/utils.ts");
  });

  it("places nodes with no community field under key -1", () => {
    const result = groupNodesByCommunity([nodeA, nodeD]);
    expect(result.get(-1)).toHaveLength(1);
    expect(result.get(-1)?.[0].id).toBe("src/orphan.ts");
    expect(result.get(0)).toHaveLength(1);
  });

  it("returns an empty map for an empty input", () => {
    const result = groupNodesByCommunity([]);
    expect(result.size).toBe(0);
  });
});

// ── generateCommunityDrop ─────────────────────────────────────────────────────

describe("generateCommunityDrop", () => {
  const edges: GraphifyEdge[] = [
    { source: "src/index.ts", target: "src/config.ts", relation: "imports" },
    { source: "src/index.ts", target: "src/utils.ts", relation: "calls" }, // crosses community
  ];

  it("includes required frontmatter fields", () => {
    const drop = generateCommunityDrop(
      "brain",
      0,
      [nodeA, nodeB],
      edges,
      [nodeA, nodeB, nodeC],
    );
    expect(drop).toContain("source_type: graphify-community");
    expect(drop).toContain("repo: brain");
    expect(drop).toContain("community_id: 0");
    expect(drop).toContain("status: pending");
  });

  it("includes the correct heading", () => {
    const drop = generateCommunityDrop(
      "myrepo",
      3,
      [nodeC],
      [],
      [nodeC],
    );
    expect(drop).toContain("# myrepo — Community 3");
  });

  it("lists files sorted by connection count (descending)", () => {
    const edgesForSort: GraphifyEdge[] = [
      { source: "src/index.ts", target: "src/config.ts" },
      { source: "src/index.ts", target: "src/utils.ts" },
      // index.ts has 2 connections, config.ts has 1
    ];
    const drop = generateCommunityDrop(
      "brain",
      0,
      [nodeA, nodeB],
      edgesForSort,
      [nodeA, nodeB, nodeC],
    );
    const filesSection = drop.split("## Files in this cluster")[1]?.split("##")[0] ?? "";
    const indexPos = filesSection.indexOf("index.ts");
    const configPos = filesSection.indexOf("config.ts");
    expect(indexPos).toBeGreaterThanOrEqual(0);
    expect(configPos).toBeGreaterThanOrEqual(0);
    // index.ts should appear before config.ts
    expect(indexPos).toBeLessThan(configPos);
  });

  it("lists internal relationships (both endpoints in community)", () => {
    const drop = generateCommunityDrop(
      "brain",
      0,
      [nodeA, nodeB],
      edges,
      [nodeA, nodeB, nodeC],
    );
    expect(drop).toContain("## Internal relationships");
    // index.ts → config.ts is internal
    expect(drop).toContain("src/index.ts");
    expect(drop).toContain("src/config.ts");
  });

  it("lists external dependencies with target community id", () => {
    const drop = generateCommunityDrop(
      "brain",
      0,
      [nodeA, nodeB],
      edges,
      [nodeA, nodeB, nodeC],
    );
    expect(drop).toContain("## External dependencies");
    // index.ts → utils.ts crosses into community 1
    expect(drop).toContain("src/utils.ts");
    expect(drop).toContain("community 1");
  });

  it("shows 'none' when there are no internal edges", () => {
    const drop = generateCommunityDrop(
      "brain",
      1,
      [nodeC],
      edges,
      [nodeA, nodeB, nodeC],
    );
    const internalsSection =
      drop.split("## Internal relationships")[1]?.split("##")[0] ?? "";
    expect(internalsSection.trim()).toBeTruthy();
    // community 1 has no internal edges among its own nodes
    expect(internalsSection).toMatch(/none/i);
  });

  it("shows 'none' when there are no external edges", () => {
    const isolatedNode: GraphifyNode = {
      id: "src/isolated.ts",
      label: "isolated.ts",
      community: 5,
    };
    const drop = generateCommunityDrop(
      "brain",
      5,
      [isolatedNode],
      [],
      [isolatedNode],
    );
    const externalSection =
      drop.split("## External dependencies")[1] ?? "";
    expect(externalSection).toMatch(/none/i);
  });
});

// ── generateAllDrops ──────────────────────────────────────────────────────────

describe("generateAllDrops", () => {
  const graphJson: GraphifyGraphJson = {
    nodes: [nodeA, nodeB, nodeC, nodeD],
    links: [
      { source: "src/index.ts", target: "src/config.ts" },
      { source: "src/index.ts", target: "src/utils.ts" },
    ],
  };
  const archMd = "# brain architecture\n\nSome architecture notes.";

  it("returns one community drop per community group", () => {
    const result = generateAllDrops("brain", graphJson, archMd);
    // communities: 0, 1, -1 → 3 community drops
    expect(result.communityDrops).toHaveLength(3);
  });

  it("sentinel total_drops equals communities + 1 (architecture drop)", () => {
    const result = generateAllDrops("brain", graphJson, archMd);
    // 3 community drops + 1 architecture = 4
    expect(result.sentinel.total_drops).toBe(4);
  });

  it("sentinel contains correct repo name", () => {
    const result = generateAllDrops("brain", graphJson, archMd);
    expect(result.sentinel.repo).toBe("brain");
  });

  it("sentinel created_at is a valid ISO timestamp", () => {
    const result = generateAllDrops("brain", graphJson, archMd);
    expect(() => new Date(result.sentinel.created_at)).not.toThrow();
    expect(new Date(result.sentinel.created_at).toISOString()).toBe(
      result.sentinel.created_at,
    );
  });

  it("architecture drop wraps archMd with graphify-architecture frontmatter", () => {
    const result = generateAllDrops("brain", graphJson, archMd);
    expect(result.architectureDrop).toContain(
      "source_type: graphify-architecture",
    );
    expect(result.architectureDrop).toContain("repo: brain");
    expect(result.architectureDrop).toContain("# brain architecture");
  });

  it("community drop filenames are kebab-case slugs", () => {
    const result = generateAllDrops("brain", graphJson, archMd);
    for (const { filename } of result.communityDrops) {
      expect(filename).toMatch(/^[a-z0-9-]+\.md$/);
    }
  });

  it("returns one drop for a graph with a single community", () => {
    const simple: GraphifyGraphJson = {
      nodes: [nodeA, nodeB],
      links: [],
    };
    const result = generateAllDrops("simple", simple, "arch");
    expect(result.communityDrops).toHaveLength(1);
    expect(result.sentinel.total_drops).toBe(2);
  });
});
