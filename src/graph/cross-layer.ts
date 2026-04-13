import type { GraphNode, GraphLink } from "../types.js";

/**
 * Match a wiki node ID to a code repo name by checking if the
 * filename segment starts with or contains a known repo name.
 *
 * Examples that match "karen":
 *   wiki://projects/karen-git-activity.md
 *   wiki://projects/karen-project-multi-channel-escalation-engine.md
 *   wiki://code-architecture/karen-architecture.md
 *
 * Only matches in projects/ and code-architecture/ paths.
 */
function matchRepoName(
  wikiId: string,
  knownRepos: Set<string>,
): string | null {
  const pathMatch = wikiId.match(
    /^wiki:\/\/(?:projects|code-architecture)\/(.+)\.md$/,
  );
  if (!pathMatch) return null;

  const filename = pathMatch[1];

  // Check if filename starts with a known repo name (followed by - or end)
  for (const repo of knownRepos) {
    if (filename === repo || filename.startsWith(`${repo}-`)) {
      return repo;
    }
  }

  return null;
}

export function generateCrossLayerEdges(
  wikiNodes: GraphNode[],
  codeScan: { nodes: GraphNode[]; links: GraphLink[] },
): GraphLink[] {
  // Index file-level code nodes by repo (exclude symbol-level nodes with #)
  const codeNodesByRepo = new Map<string, GraphNode[]>();
  for (const node of codeScan.nodes) {
    if (node.id.includes("#")) continue;
    if (!node.repo) continue;
    const existing = codeNodesByRepo.get(node.repo) ?? [];
    existing.push(node);
    codeNodesByRepo.set(node.repo, existing);
  }

  const knownRepos = new Set(codeNodesByRepo.keys());
  const edges: GraphLink[] = [];

  for (const wikiNode of wikiNodes) {
    const repoName = matchRepoName(wikiNode.id, knownRepos);
    if (repoName === null) continue;

    const matchingNodes = codeNodesByRepo.get(repoName);
    if (!matchingNodes || matchingNodes.length === 0) continue;

    const sorted = [...matchingNodes].sort(
      (a, b) => b.connection_count - a.connection_count,
    );
    const top20 = sorted.slice(0, 20);

    for (const codeNode of top20) {
      edges.push({
        source: wikiNode.id,
        target: codeNode.id,
        relation: "cross_layer",
        confidence: "EXTRACTED",
        confidence_score: 1.0,
      });
    }
  }

  return edges;
}
