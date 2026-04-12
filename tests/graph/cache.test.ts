import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync, existsSync, writeFileSync } from "node:fs";
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

  it("applies wiki:// prefix to all node IDs and link endpoints", async () => {
    writeArticle("a", "Project A", "# Project A\n\nLinks to [[Project B]].");
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

    for (const node of cache.nodes) {
      expect(node.id).toMatch(/^wiki:\/\//);
    }
    for (const link of cache.links) {
      expect(link.source).toMatch(/^wiki:\/\//);
      expect(link.target).toMatch(/^wiki:\/\//);
    }
  });

  it("sets layer: 'wiki' on all wiki nodes", async () => {
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

    for (const node of cache.nodes) {
      expect(node.layer).toBe("wiki");
    }
  });

  it("merges wiki + code layers with cross-layer edges", async () => {
    // Create wiki articles
    writeArticle("brain", "Brain", "# Brain\n\nKnowledge graph project.");
    writeArticle("other", "Other", "# Other\n\nAnother project.");

    // Create graphify fixture: {graphifyDir}/brain/brain-graph.json
    const graphifyDir = join(TEST_VAULT, "raw", "graphify");
    const repoDir = join(graphifyDir, "brain");
    mkdirSync(repoDir, { recursive: true });
    writeFileSync(
      join(repoDir, "brain-graph.json"),
      JSON.stringify({
        directed: false,
        multigraph: false,
        graph: {},
        nodes: [
          { id: "config", label: "config.ts", file_type: "code", community: 1 },
          { id: "types", label: "types.ts", file_type: "code", community: 1 },
        ],
        links: [
          {
            source: "config",
            target: "types",
            relation: "imports_from",
            confidence: "EXTRACTED",
            confidence_score: 1.0,
          },
        ],
      }),
      "utf8",
    );

    const mockEmbeddings = new Map<string, number[]>([
      ["projects/brain.md", Array(10).fill(0.1)],
      ["projects/other.md", Array(10).fill(0.2)],
    ]);

    const cachePath = join(TEST_VAULT, "wiki", ".graph-cache.json");
    const cache = await rebuildGraphCache(
      TEST_VAULT,
      cachePath,
      mockEmbeddings,
      42,
      graphifyDir,
    );

    // Should have wiki + code nodes
    const wikiNodes = cache.nodes.filter((n) => n.id.startsWith("wiki://"));
    const codeNodes = cache.nodes.filter((n) => n.id.startsWith("code://"));
    expect(wikiNodes.length).toBe(2);
    expect(codeNodes.length).toBe(2);
    expect(cache.node_count).toBe(4);

    // Should have cross-layer edges
    const crossLinks = cache.links.filter((l) => l.relation === "cross_layer");
    expect(crossLinks.length).toBeGreaterThan(0);

    // Cross-layer edges should connect wiki → code
    for (const link of crossLinks) {
      expect(link.source).toMatch(/^wiki:\/\//);
      expect(link.target).toMatch(/^code:\/\//);
    }

    // Should also have code-internal links
    const codeLinks = cache.links.filter((l) => l.relation === "imports_from");
    expect(codeLinks.length).toBe(1);
  });

  it("works without graphifyOutputDir (wiki-only, backward compat)", async () => {
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

    // All nodes should be wiki-only
    for (const node of cache.nodes) {
      expect(node.id).toMatch(/^wiki:\/\//);
    }
    // No code nodes
    const codeNodes = cache.nodes.filter((n) => n.id.startsWith("code://"));
    expect(codeNodes.length).toBe(0);
  });

  it("readGraphCache returns null for missing file", () => {
    expect(readGraphCache(join(TEST_VAULT, "nonexistent.json"))).toBeNull();
  });
});
