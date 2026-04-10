import { readdirSync, statSync } from "node:fs";
import { join, relative, extname, basename } from "node:path";
import { readFrontmatter } from "../frontmatter.js";
import type { WikiFrontmatter } from "../types.js";

export interface ScanNode {
  id: string;
  title: string;
  tags: string[];
  category: string;
  source_type: string;
  created_at: string;
  connection_count: number;
}

export interface ScanResult {
  nodes: ScanNode[];
  links: { source: string; target: string }[];
}

const WIKI_LINK_RE = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;

function walkDir(dir: string): string[] {
  const results: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return results;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full, { throwIfNoEntry: false });
    if (!stat) continue;
    if (stat.isDirectory()) {
      results.push(...walkDir(full));
    } else if (extname(entry) === ".md" && basename(entry) !== "index.md") {
      results.push(full);
    }
  }
  return results;
}

function normalizeTarget(raw: string): string {
  let target = raw.trim();
  // Strip wiki/ prefix
  if (target.startsWith("wiki/")) {
    target = target.slice(5);
  }
  // Append .md if missing
  if (!target.endsWith(".md")) {
    target = target + ".md";
  }
  return target;
}

export function scanWiki(vaultRoot: string): ScanResult {
  const wikiDir = join(vaultRoot, "wiki");
  const files = walkDir(wikiDir);

  const nodes: ScanNode[] = [];
  const rawLinks: { source: string; target: string }[] = [];

  for (const filePath of files) {
    const id = relative(wikiDir, filePath);
    const category = id.split("/")[0];

    const { data, content } = readFrontmatter<WikiFrontmatter>(filePath);

    const node: ScanNode = {
      id,
      title: data.title ?? basename(filePath, ".md"),
      tags: data.tags ?? [],
      category,
      source_type: data.author ?? "unknown",
      created_at: data.created_at ?? "",
      connection_count: 0,
    };
    nodes.push(node);

    // Extract wiki links
    let match: RegExpExecArray | null;
    while ((match = WIKI_LINK_RE.exec(content)) !== null) {
      const target = normalizeTarget(match[1]);
      rawLinks.push({ source: id, target });
    }
  }

  // Build filename → full node ID map for bare-name link resolution
  // e.g. "exp-kismet-tracking.md" → "experience/exp-kismet-tracking.md"
  const filenameToId = new Map<string, string>();
  for (const node of nodes) {
    const filename = node.id.split("/").pop()!;
    filenameToId.set(filename, node.id);
  }

  // Resolve rawLink targets: bare filename → full node ID, drop dangling/self links
  const nodeIds = new Set(nodes.map((n) => n.id));
  const resolvedLinks: { source: string; target: string }[] = [];
  for (const link of rawLinks) {
    let target = link.target;
    if (!nodeIds.has(target)) {
      // Try resolving by bare filename
      const resolved = filenameToId.get(target);
      if (!resolved) continue; // dangling link — drop
      target = resolved;
    }
    if (target === link.source) continue; // self-link — drop
    resolvedLinks.push({ source: link.source, target });
  }

  // Deduplicate bidirectional edges: keep the first seen direction
  const seen = new Set<string>();
  const links: { source: string; target: string }[] = [];

  for (const link of resolvedLinks) {
    const key = [link.source, link.target].sort().join("|||");
    if (!seen.has(key)) {
      seen.add(key);
      links.push(link);
    }
  }

  // Count connections per node (each deduplicated edge counts for both endpoints)
  const connectionCounts = new Map<string, number>();
  for (const link of links) {
    connectionCounts.set(link.source, (connectionCounts.get(link.source) ?? 0) + 1);
    connectionCounts.set(link.target, (connectionCounts.get(link.target) ?? 0) + 1);
  }

  for (const node of nodes) {
    node.connection_count = connectionCounts.get(node.id) ?? 0;
  }

  return { nodes, links };
}
