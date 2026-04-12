import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import type { GraphNode, GraphLink } from "../types.js";

interface NetworkXNode {
  id: string;
  label?: string;
  file_type?: string;
  source_file?: string;
  source_location?: string;
  community?: number;
}

interface NetworkXLink {
  source: string;
  target: string;
  relation?: string;
  confidence?: string;
  confidence_score?: number;
}

interface NetworkXGraph {
  nodes: NetworkXNode[];
  links: NetworkXLink[];
}

function stripFrontmatter(raw: string): string {
  if (!raw.startsWith("---")) return raw;
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return raw;
  return raw.slice(end + 4).trimStart();
}

export function loadGraphifyGraphs(graphifyOutputDir: string): {
  nodes: GraphNode[];
  links: GraphLink[];
} {
  let subdirs: string[];
  try {
    subdirs = readdirSync(graphifyOutputDir);
  } catch {
    return { nodes: [], links: [] };
  }

  const allNodes: GraphNode[] = [];
  const allLinks: GraphLink[] = [];

  for (const entry of subdirs) {
    const repoDir = join(graphifyOutputDir, entry);
    const stat = statSync(repoDir, { throwIfNoEntry: false });
    if (!stat?.isDirectory()) continue;

    const repoName = entry;
    const graphFile = join(repoDir, `${repoName}-graph.json`);

    try {
      const raw = readFileSync(graphFile, "utf-8");
      const cleaned = stripFrontmatter(raw);
      const graph = JSON.parse(cleaned) as NetworkXGraph;

      const prefix = `code://${repoName}/`;

      // Count connections per node from edge data
      const connectionCounts = new Map<string, number>();
      for (const link of graph.links ?? []) {
        connectionCounts.set(
          link.source,
          (connectionCounts.get(link.source) ?? 0) + 1,
        );
        connectionCounts.set(
          link.target,
          (connectionCounts.get(link.target) ?? 0) + 1,
        );
      }

      for (const nx of graph.nodes ?? []) {
        const node: GraphNode = {
          id: `${prefix}${nx.id}`,
          title: nx.label ?? nx.id,
          tags: [],
          category: repoName,
          source_type: "graphify",
          created_at: "",
          connection_count: connectionCounts.get(nx.id) ?? 0,
          x: 0,
          y: 0,
          z: 0,
          layer: "code",
          repo: repoName,
          file_type: nx.file_type as GraphNode["file_type"],
          source_file: nx.source_file,
          source_location: nx.source_location,
          community: nx.community,
        };
        allNodes.push(node);
      }

      for (const nx of graph.links ?? []) {
        const link: GraphLink = {
          source: `${prefix}${nx.source}`,
          target: `${prefix}${nx.target}`,
          relation: nx.relation,
          confidence: nx.confidence as GraphLink["confidence"],
          confidence_score: nx.confidence_score,
        };
        allLinks.push(link);
      }
    } catch (err) {
      console.error(
        `[loadGraphifyGraphs] Failed to parse ${graphFile}:`,
        err instanceof Error ? err.message : err,
      );
    }
  }

  return { nodes: allNodes, links: allLinks };
}
