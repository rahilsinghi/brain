import { UMAP } from "umap-js";
import type { GraphCache, GraphNode } from "../types.js";

interface ScanNode {
  id: string;
  title: string;
  tags: string[];
  category: string;
  source_type: string;
  created_at: string;
  connection_count: number;
}

interface ScanResult {
  nodes: ScanNode[];
  links: { source: string; target: string }[];
}

function seedRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

export async function generateGraphCache(
  scan: ScanResult,
  embeddings: Map<string, number[]>,
  seed: number,
): Promise<GraphCache> {
  // 1. Filter to nodes with embeddings
  const filteredNodes = scan.nodes.filter((n) => embeddings.has(n.id));
  const nodeCount = filteredNodes.length;

  // 2. Handle edge cases
  let positions: number[][];

  if (nodeCount < 2) {
    positions = filteredNodes.map(() => [0, 0, 0]);
  } else {
    // 3. Extract vectors in node order
    const vectors = filteredNodes.map((n) => embeddings.get(n.id)!);

    // 4. Configure and run UMAP
    const nNeighbors = Math.min(
      15,
      Math.max(2, Math.floor(nodeCount / 3)),
      nodeCount - 1,
    );

    const umap = new UMAP({
      nComponents: 3,
      nNeighbors,
      minDist: 0.1,
      spread: 1.0,
      random: seedRandom(seed),
    });

    positions = umap.fit(vectors);
  }

  // 5. Filter links to only include nodes with embeddings
  const nodeIds = new Set(filteredNodes.map((n) => n.id));
  const filteredLinks = scan.links.filter(
    (l) => nodeIds.has(l.source) && nodeIds.has(l.target),
  );

  // 6. Build GraphCache
  const nodes: GraphNode[] = filteredNodes.map((n, i) => ({
    id: n.id,
    title: n.title,
    tags: n.tags,
    category: n.category,
    source_type: n.source_type,
    created_at: n.created_at,
    connection_count: n.connection_count,
    x: positions[i][0],
    y: positions[i][1],
    z: positions[i][2],
  }));

  return {
    generated_at: new Date().toISOString(),
    node_count: nodeCount,
    nodes,
    links: filteredLinks,
  };
}
