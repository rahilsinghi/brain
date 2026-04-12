import type { GraphNode, GraphLink } from "../types.js";

function extractRepoName(wikiId: string): string | null {
  // wiki://projects/brain.md → "brain"
  const projectsMatch = wikiId.match(/^wiki:\/\/projects\/(.+)\.md$/);
  if (projectsMatch) {
    return projectsMatch[1];
  }

  // wiki://code-architecture/brain-architecture.md → "brain"
  const archMatch = wikiId.match(
    /^wiki:\/\/code-architecture\/(.+)-architecture\.md$/,
  );
  if (archMatch) {
    return archMatch[1];
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

  const edges: GraphLink[] = [];

  for (const wikiNode of wikiNodes) {
    const repoName = extractRepoName(wikiNode.id);
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
