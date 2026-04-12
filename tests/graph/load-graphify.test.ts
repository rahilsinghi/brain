import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadGraphifyGraphs } from "../../src/graph/load-graphify.js";

const FIXTURES_DIR = join(import.meta.dirname, "__fixtures__/load-graphify-test");

function writeRepoGraph(repoName: string, data: unknown): void {
  const repoDir = join(FIXTURES_DIR, repoName);
  mkdirSync(repoDir, { recursive: true });
  writeFileSync(
    join(repoDir, `${repoName}-graph.json`),
    JSON.stringify(data),
    "utf-8",
  );
}

const BRAIN_GRAPH = {
  directed: false,
  multigraph: false,
  graph: {},
  nodes: [
    {
      label: "vitest.config.ts",
      file_type: "code",
      source_file: "/Users/rahilsinghi/Desktop/brain/vitest.config.ts",
      source_location: "L1",
      id: "vitest_config",
      community: 17,
    },
    {
      label: "config.ts",
      file_type: "code",
      source_file: "/Users/rahilsinghi/Desktop/brain/src/config.ts",
      source_location: "L1",
      id: "config",
      community: 3,
    },
  ],
  links: [
    {
      relation: "imports_from",
      confidence: "EXTRACTED",
      source_file: "/Users/rahilsinghi/Desktop/brain/vitest.config.ts",
      source_location: "L1",
      weight: 1.0,
      _src: "vitest_config",
      _tgt: "config",
      source: "vitest_config",
      target: "config",
      confidence_score: 1.0,
    },
  ],
};

describe("loadGraphifyGraphs", () => {
  beforeEach(() => {
    mkdirSync(FIXTURES_DIR, { recursive: true });
  });

  afterEach(() => {
    rmSync(FIXTURES_DIR, { recursive: true, force: true });
  });

  it("parses NetworkX JSON into nodes/links with code:// prefix", () => {
    writeRepoGraph("brain", BRAIN_GRAPH);

    const result = loadGraphifyGraphs(FIXTURES_DIR);

    expect(result.nodes).toHaveLength(2);
    expect(result.links).toHaveLength(1);

    const vitestNode = result.nodes.find((n) => n.id === "code://brain/vitest_config");
    expect(vitestNode).toBeDefined();
    expect(vitestNode!.title).toBe("vitest.config.ts");
    expect(vitestNode!.layer).toBe("code");
    expect(vitestNode!.repo).toBe("brain");
    expect(vitestNode!.category).toBe("brain");
    expect(vitestNode!.source_type).toBe("graphify");
    expect(vitestNode!.file_type).toBe("code");
    expect(vitestNode!.source_file).toBe(
      "/Users/rahilsinghi/Desktop/brain/vitest.config.ts",
    );
    expect(vitestNode!.source_location).toBe("L1");
    expect(vitestNode!.community).toBe(17);
    expect(vitestNode!.tags).toEqual([]);
    expect(vitestNode!.created_at).toBe("");
    expect(vitestNode!.x).toBe(0);
    expect(vitestNode!.y).toBe(0);
    expect(vitestNode!.z).toBe(0);

    const link = result.links[0];
    expect(link.source).toBe("code://brain/vitest_config");
    expect(link.target).toBe("code://brain/config");
    expect(link.relation).toBe("imports_from");
    expect(link.confidence).toBe("EXTRACTED");
    expect(link.confidence_score).toBe(1.0);
  });

  it("loads multiple repos from multiple subdirectories", () => {
    const portfolioGraph = {
      directed: false,
      multigraph: false,
      graph: {},
      nodes: [
        {
          label: "index.ts",
          file_type: "code",
          source_file: "/Users/rahilsinghi/Desktop/portfolio/src/index.ts",
          source_location: "L1",
          id: "index",
          community: 1,
        },
      ],
      links: [],
    };

    writeRepoGraph("brain", BRAIN_GRAPH);
    writeRepoGraph("portfolio", portfolioGraph);

    const result = loadGraphifyGraphs(FIXTURES_DIR);

    const brainNodes = result.nodes.filter((n) => n.repo === "brain");
    const portfolioNodes = result.nodes.filter((n) => n.repo === "portfolio");

    expect(brainNodes).toHaveLength(2);
    expect(portfolioNodes).toHaveLength(1);
    expect(result.nodes).toHaveLength(3);

    expect(portfolioNodes[0]!.id).toBe("code://portfolio/index");
    expect(portfolioNodes[0]!.category).toBe("portfolio");
  });

  it("returns empty for nonexistent directory", () => {
    const result = loadGraphifyGraphs("/nonexistent/path/that/does/not/exist");

    expect(result.nodes).toEqual([]);
    expect(result.links).toEqual([]);
  });

  it("skips repos with malformed JSON", () => {
    const badDir = join(FIXTURES_DIR, "bad-repo");
    mkdirSync(badDir, { recursive: true });
    writeFileSync(join(badDir, "bad-repo-graph.json"), "{ not valid json !!", "utf-8");

    writeRepoGraph("brain", BRAIN_GRAPH);

    const result = loadGraphifyGraphs(FIXTURES_DIR);

    // bad-repo should be skipped, brain should still load
    expect(result.nodes).toHaveLength(2);
    const brainNode = result.nodes.find((n) => n.id === "code://brain/vitest_config");
    expect(brainNode).toBeDefined();
  });

  it("preserves symbol-level node IDs with # fragment", () => {
    const symbolGraph = {
      directed: false,
      multigraph: false,
      graph: {},
      nodes: [
        {
          label: "loadConfig",
          file_type: "code",
          source_file: "/Users/rahilsinghi/Desktop/brain/src/config.ts",
          source_location: "L42",
          id: "config#loadConfig",
          community: 3,
        },
        {
          label: "BrainConfig",
          file_type: "code",
          source_file: "/Users/rahilsinghi/Desktop/brain/src/types.ts",
          source_location: "L98",
          id: "types#BrainConfig",
          community: 5,
        },
      ],
      links: [
        {
          relation: "uses",
          confidence: "INFERRED",
          source_file: "/Users/rahilsinghi/Desktop/brain/src/config.ts",
          source_location: "L42",
          weight: 0.8,
          _src: "config#loadConfig",
          _tgt: "types#BrainConfig",
          source: "config#loadConfig",
          target: "types#BrainConfig",
          confidence_score: 0.8,
        },
      ],
    };

    writeRepoGraph("brain", symbolGraph);

    const result = loadGraphifyGraphs(FIXTURES_DIR);

    const loadConfigNode = result.nodes.find(
      (n) => n.id === "code://brain/config#loadConfig",
    );
    expect(loadConfigNode).toBeDefined();
    expect(loadConfigNode!.id).toBe("code://brain/config#loadConfig");

    const brainConfigNode = result.nodes.find(
      (n) => n.id === "code://brain/types#BrainConfig",
    );
    expect(brainConfigNode).toBeDefined();

    expect(result.links[0]!.source).toBe("code://brain/config#loadConfig");
    expect(result.links[0]!.target).toBe("code://brain/types#BrainConfig");
  });
});
