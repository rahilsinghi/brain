export interface GraphifyNode {
  id: string;
  label: string;
  community?: number;
  source_file?: string;
  source_location?: string;
  file_type?: string;
}

export interface GraphifyEdge {
  source: string;
  target: string;
  relation?: string;
}

export interface GraphifyGraphJson {
  nodes: GraphifyNode[];
  links: GraphifyEdge[];
}

export interface SentinelData {
  total_drops: number;
  repo: string;
  created_at: string;
}

export interface AllDrops {
  communityDrops: Array<{ filename: string; content: string }>;
  architectureDrop: string;
  sentinel: SentinelData;
}

// ── helpers ───────────────────────────────────────────────────────────────────

function connectionCounts(
  nodeIds: Set<string>,
  edges: GraphifyEdge[],
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const id of nodeIds) counts.set(id, 0);
  for (const e of edges) {
    if (nodeIds.has(e.source))
      counts.set(e.source, (counts.get(e.source) ?? 0) + 1);
    if (nodeIds.has(e.target))
      counts.set(e.target, (counts.get(e.target) ?? 0) + 1);
  }
  return counts;
}

function communityOf(nodeId: string, allNodes: GraphifyNode[]): number {
  const n = allNodes.find((x) => x.id === nodeId);
  return n?.community ?? -1;
}

function slugify(repoName: string, communityId: number): string {
  const id = communityId === -1 ? "ungrouped" : String(communityId);
  const repo = repoName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${repo}-community-${id}.md`;
}

// ── public API ────────────────────────────────────────────────────────────────

/**
 * Groups nodes by their `community` field.
 * Nodes with no community go to key -1.
 */
export function groupNodesByCommunity(
  nodes: GraphifyNode[],
): Map<number, GraphifyNode[]> {
  const map = new Map<number, GraphifyNode[]>();
  for (const node of nodes) {
    const key = node.community ?? -1;
    const bucket = map.get(key);
    if (bucket) {
      bucket.push(node);
    } else {
      map.set(key, [node]);
    }
  }
  return map;
}

/**
 * Generates a single community markdown drop string.
 */
export function generateCommunityDrop(
  repoName: string,
  communityId: number,
  communityNodes: GraphifyNode[],
  allEdges: GraphifyEdge[],
  allNodes: GraphifyNode[],
): string {
  const now = new Date().toISOString();
  const communityNodeIds = new Set(communityNodes.map((n) => n.id));

  // Connection counts across ALL edges (not just internal)
  const counts = connectionCounts(communityNodeIds, allEdges);

  // Sort nodes by descending connection count, then alphabetically
  const sortedNodes = [...communityNodes].sort((a, b) => {
    const diff = (counts.get(b.id) ?? 0) - (counts.get(a.id) ?? 0);
    return diff !== 0 ? diff : a.id.localeCompare(b.id);
  });

  // Split edges into internal (both endpoints in community) and external
  const internalEdges = allEdges.filter(
    (e) => communityNodeIds.has(e.source) && communityNodeIds.has(e.target),
  );
  const externalEdges = allEdges.filter(
    (e) =>
      (communityNodeIds.has(e.source) && !communityNodeIds.has(e.target)) ||
      (!communityNodeIds.has(e.source) && communityNodeIds.has(e.target)),
  );

  // ── frontmatter ────────────────────────────────────────────────────────────
  const lines: string[] = [
    "---",
    "status: pending",
    "source_type: graphify-community",
    `repo: ${repoName}`,
    `community_id: ${communityId}`,
    `ingested_at: "${now}"`,
    `parsed_at: "${now}"`,
    "compiled_to: null",
    "processed_at: null",
    "retry_count: 0",
    "last_error: null",
    "compile_progress: null",
    "---",
    "",
    `# ${repoName} — Community ${communityId}`,
    "",
    "## Files in this cluster",
    "",
  ];

  for (const node of sortedNodes) {
    const conns = counts.get(node.id) ?? 0;
    const loc = node.source_file ?? node.id;
    lines.push(`- \`${loc}\` — ${conns} connection${conns !== 1 ? "s" : ""}`);
  }

  // ── internal relationships ─────────────────────────────────────────────────
  lines.push("", "## Internal relationships", "");
  if (internalEdges.length === 0) {
    lines.push("_none_");
  } else {
    for (const e of internalEdges) {
      const rel = e.relation ? ` (${e.relation})` : "";
      lines.push(`- \`${e.source}\` → \`${e.target}\`${rel}`);
    }
  }

  // ── external dependencies ──────────────────────────────────────────────────
  lines.push("", "## External dependencies", "");
  if (externalEdges.length === 0) {
    lines.push("_none_");
  } else {
    for (const e of externalEdges) {
      const externalId = communityNodeIds.has(e.source)
        ? e.target
        : e.source;
      const externalCommunity = communityOf(externalId, allNodes);
      const communityLabel =
        externalCommunity === -1 ? "ungrouped" : `community ${externalCommunity}`;
      const rel = e.relation ? ` (${e.relation})` : "";
      lines.push(
        `- \`${e.source}\` → \`${e.target}\`${rel} [${communityLabel}]`,
      );
    }
  }

  return lines.join("\n");
}

/**
 * Orchestrates drop generation for every community + architecture doc.
 */
export function generateAllDrops(
  repoName: string,
  graphJson: GraphifyGraphJson,
  architectureMd: string,
): AllDrops {
  const now = new Date().toISOString();
  const grouped = groupNodesByCommunity(graphJson.nodes);

  const communityDrops: Array<{ filename: string; content: string }> = [];
  for (const [communityId, nodes] of grouped) {
    communityDrops.push({
      filename: slugify(repoName, communityId),
      content: generateCommunityDrop(
        repoName,
        communityId,
        nodes,
        graphJson.links,
        graphJson.nodes,
      ),
    });
  }

  // ── architecture drop ──────────────────────────────────────────────────────
  const architectureDrop = [
    "---",
    "status: pending",
    "source_type: graphify-architecture",
    `repo: ${repoName}`,
    `ingested_at: "${now}"`,
    `parsed_at: "${now}"`,
    "compiled_to: null",
    "processed_at: null",
    "retry_count: 0",
    "last_error: null",
    "compile_progress: null",
    "---",
    "",
    architectureMd,
  ].join("\n");

  const sentinel: SentinelData = {
    total_drops: communityDrops.length + 1,
    repo: repoName,
    created_at: now,
  };

  return { communityDrops, architectureDrop, sentinel };
}
