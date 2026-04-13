# Brain + Graphify Fusion — Design Spec

> Add a structural code-intelligence layer to the Brain knowledge graph.
> Graphify's AST analysis runs as a Brain source, producing wiki articles
> and a second graph layer that connects to existing wiki nodes via file-path matching.

**Date:** 2026-04-10
**Status:** Spec — ready for planning
**Depends on:** Brain Phase 5 (complete), Brain Explorer (daemon pipeline complete)

---

## 1. Overview

Brain today is a **semantic** knowledge graph — 315+ wiki articles connected by `[[wiki links]]`, positioned in 3D by embedding distance. It knows *about* repos (git-commits, GitHub events, repo profiles) but not *inside* them. When you ask "how does Karen's auth flow work?" it synthesizes from the wiki article about Karen, not from the actual code structure.

Graphify adds a **structural** layer — AST-extracted classes, functions, imports, call graphs, and community clusters. The fusion creates a two-layer knowledge graph:

```
Layer 1 (wiki):   articles ←── [[wiki links]] ──→ articles
                       ↕  cross-layer edges (file path matching)
Layer 2 (code):   classes ←── calls/imports ──→ functions ←── contains ──→ files
```

Combined with the temporal layer Brain already captures (git commits), this gives three dimensions of understanding:
- **Semantic** — what things mean (wiki synthesis)
- **Structural** — how things connect (AST + community detection)
- **Temporal** — how things change (git history)

**Killer use case:** "What changed in the last sprint and what does it touch?" Brain has the commits. Graphify has the dependency graph. Combined answer: "3 files changed, touching `AuthService` (used by 8 other modules) and the payment webhook handler."

## 2. Scope

### In Scope (v1)

- Fork Graphify → `github.com/rahilsinghi/graphify` with CLI entry point
- New Brain source: `src/sources/graphify.ts` (SyncSource interface)
- AST-only extraction by default (free, deterministic, fast)
- `--semantic` flag for LLM-enriched extraction (cached, one-time cost)
- Hourly cron (incremental via Graphify's SHA256 file cache)
- Wiki articles from GRAPH_REPORT.md → `wiki/code-architecture/{repo-slug}.md`
- File-level LanceDB embeddings (one chunk per source file)
- Unified graph cache with `layer` field (wiki + code)
- URI-style node IDs (`wiki://`, `code://`)
- Cross-layer edges via file path matching (git-commit paths → Graphify source_file)
- God-node detection and background-plane positioning
- `confidential: true` frontmatter support + Telegram exclusion
- Config: `graphify` section in `.brain/config.yaml`

### Out of Scope (v2+)

- Deep cross-layer linking (class name NLP matching in wiki text)
- Semantic extraction as default (v1 is AST-only default)
- Work repos (v1 validates on personal repos only)
- Explorer frontend changes (separate spec addendum)
- Real-time file watching (hourly cron is sufficient)
- Graphify MCP server (Brain's own MCP is the interface)

## 3. Repos to Graphify (v1)

Personal repos only. Paths listed in `.brain/config.yaml`:

```yaml
graphify:
  repos:
    - ~/Desktop/karen
    - ~/Desktop/brain
    - ~/Desktop/portfolio
    - ~/Desktop/ouroboros
  semantic: false          # AST-only by default
  cron_schedule: "0 * * * *"  # hourly, same as git-commits
  max_nodes_per_repo: 2000    # safety cap
  output_dir: "raw/graphify"  # drops land here
```

No "register repo" command. Edit the YAML to add repos.

## 4. Fork Scope

### 4.1 What to Keep

The entire Python library — these are well-factored pure functions:

| Module | Keep | Purpose |
|--------|------|---------|
| `extract.py` | Full | AST extraction for 20 languages via tree-sitter |
| `build.py` | Full | `build_from_json()` → NetworkX graph construction |
| `cluster.py` | Full | Leiden/Louvain community detection |
| `analyze.py` | Full | `god_nodes()`, `surprising_connections()`, `suggest_questions()` |
| `report.py` | Full | GRAPH_REPORT.md generation |
| `detect.py` | Full | File discovery, classification, `.graphifyignore` |
| `cache.py` | Full | SHA256 per-file extraction caching |
| `export.py` | `to_json` only | JSON export (strip HTML/SVG/Neo4j/Canvas) |
| `validate.py` | Full | JSON schema validation |
| `security.py` | Full | Label sanitization |
| `wiki.py` | Full | Per-community wiki article generation |

### 4.2 What to Strip

| Module | Action | Why |
|--------|--------|-----|
| `skill.md` | Remove | Brain orchestrates, not a Claude Code skill |
| `__main__.py` | Replace | Installer logic not needed; replace with CLI entry point |
| `serve.py` | Remove | Brain's own API/MCP is the query interface |
| `watch.py` | Remove | Brain's cron handles scheduling |
| `transcribe.py` | Remove | Brain has its own whisper pipeline |
| `export.py` (HTML/SVG/Canvas/Neo4j) | Remove functions | Only `to_json()` needed |

### 4.3 CLI Entry Point — `graphify_cli.py`

New file, ~120 lines. Chains the pipeline into a single callable.

**Known v1 limitation:** The `--semantic` flag only returns previously cached semantic extraction results. Fresh semantic inference on uncached doc files is deferred — the flag silently skips uncached files with a log warning. This means `--semantic` is useful only after a manual semantic extraction pass has populated the cache. Full semantic inference is a v2 feature.

```python
#!/usr/bin/env python3
"""Brain-integrated Graphify CLI.

Usage:
    graphify_cli.py --repos ~/Desktop/karen ~/Desktop/brain \
                    --output-dir /path/to/brain/raw/graphify/ \
                    --incremental \
                    [--semantic] \
                    [--anthropic-key $KEY]
"""
import argparse
import json
import sys
from pathlib import Path

from graphify import extract, collect_files, build_from_json, cluster
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.report import generate as generate_report
from graphify.cluster import score_all
from graphify.detect import detect, detect_incremental
from graphify.cache import load_cached, save_cached, check_semantic_cache, save_semantic_cache
from graphify.export import to_json


def main():
    parser = argparse.ArgumentParser(description="Brain-integrated Graphify CLI")
    parser.add_argument("--repos", nargs="+", required=True, type=Path)
    parser.add_argument("--output-dir", required=True, type=Path)
    parser.add_argument("--incremental", action="store_true")
    parser.add_argument("--semantic", action="store_true")
    parser.add_argument("--anthropic-key", type=str, default=None)
    args = parser.parse_args()

    args.output_dir.mkdir(parents=True, exist_ok=True)

    for repo_path in args.repos:
        repo_name = repo_path.name
        repo_out = args.output_dir / repo_name
        repo_out.mkdir(parents=True, exist_ok=True)

        # 1. Detect files
        if args.incremental:
            detection = detect_incremental(repo_path)
        else:
            detection = detect(repo_path)

        code_files = detection["files"].get("code", [])
        if not code_files:
            print(f"[graphify] {repo_name}: no code files found, skipping")
            continue

        # 2. AST extraction (deterministic, cached per-file SHA256)
        paths = [Path(f) for f in code_files]
        ast_extraction = extract(paths)

        # 3. Build graph
        extractions = [ast_extraction]

        # 4. Optional: semantic extraction via Anthropic SDK
        if args.semantic and args.anthropic_key:
            # Semantic pass uses Anthropic directly (same key as Brain)
            # Implementation: call Claude for inferred edges on doc files
            doc_files = detection["files"].get("document", [])
            if doc_files:
                # Check semantic cache first
                cached_nodes, cached_edges, cached_hyper, uncached = \
                    check_semantic_cache([str(f) for f in doc_files], root=repo_path)
                if uncached:
                    # v1: semantic inference on uncached files is deferred.
                    # Log and skip — only cached results are used.
                    print(f"[graphify] {repo_name}: {len(uncached)} uncached doc files "
                          f"skipped (semantic inference deferred to v2)")
                    pass
                if cached_nodes:
                    extractions.append({
                        "nodes": cached_nodes,
                        "edges": cached_edges,
                        "input_tokens": 0,
                        "output_tokens": 0,
                    })

        G = build_from_json(extractions[0]) if len(extractions) == 1 \
            else __import__("graphify").build(extractions)

        # 5. Community detection
        communities = cluster(G)
        cohesion = score_all(G, communities)

        # Placeholder community labels (community_id → description)
        community_labels = {cid: f"Community {cid}" for cid in communities}

        # 6. Analysis
        gods = god_nodes(G)
        surprises = surprising_connections(G, communities)
        questions = suggest_questions(G, communities, community_labels)

        # 7. Report → markdown drop for Brain's compile pipeline
        report_md = generate_report(
            G, communities, cohesion, community_labels,
            gods, surprises, detection,
            {"input_tokens": 0, "output_tokens": 0},
            root=str(repo_path),
            suggested_questions=questions,
        )

        report_path = repo_out / f"{repo_name}-architecture.md"
        report_path.write_text(report_md, encoding="utf-8")

        # 8. Graph JSON → separate file for Brain's graph merge
        graph_json_path = repo_out / f"{repo_name}-graph.json"
        to_json(G, communities, str(graph_json_path))

        # 9. File-level summaries → one markdown per source file for LanceDB embedding
        summaries_dir = repo_out / "file-summaries"
        summaries_dir.mkdir(exist_ok=True)
        for node_id in G.nodes():
            node = G.nodes[node_id]
            if node.get("file_type") != "code":
                continue
            source_file = node.get("source_file", "")
            if not source_file:
                continue

            # Gather this file's symbols
            neighbors = list(G.neighbors(node_id))
            imports = [n for n in neighbors
                       if G.edges[node_id, n].get("relation") in ("imports", "imports_from")]
            contains = [n for n in neighbors
                        if G.edges[node_id, n].get("relation") == "contains"]
            calls_out = [n for n in neighbors
                         if G.edges[node_id, n].get("relation") == "calls"]

            summary = f"""---
title: "{node.get('label', node_id)}"
source_file: "{source_file}"
repo: "{repo_name}"
community: {node.get('community', -1)}
file_type: code
author: ai
tags: [code-architecture, {repo_name}]
---

# {node.get('label', node_id)}

**Repository:** {repo_name}
**File:** `{source_file}`
**Community:** {node.get('community', -1)}

## Imports
{chr(10).join(f'- `{i}`' for i in imports) or '- (none)'}

## Contains
{chr(10).join(f'- `{c}`' for c in contains) or '- (none)'}

## Calls
{chr(10).join(f'- `{c}`' for c in calls_out) or '- (none)'}
"""
            slug = f"{repo_name}_{source_file.replace('/', '_').replace('.', '_')}"
            (summaries_dir / f"{slug}.md").write_text(summary, encoding="utf-8")

        node_count = G.number_of_nodes()
        edge_count = G.number_of_edges()
        community_count = len(communities)
        print(f"[graphify] {repo_name}: {node_count} nodes, {edge_count} edges, "
              f"{community_count} communities → {repo_out}")

    print("[graphify] Done.")


if __name__ == "__main__":
    main()
```

### 4.4 Python Dependencies — `requirements-graphify.txt`

```
networkx>=3.0
tree-sitter>=0.23
tree-sitter-python>=0.23
tree-sitter-javascript>=0.23
tree-sitter-typescript>=0.23
tree-sitter-go>=0.23
tree-sitter-rust>=0.23
tree-sitter-java>=0.23
tree-sitter-c>=0.23
tree-sitter-cpp>=0.23
tree-sitter-ruby>=0.23
tree-sitter-c-sharp>=0.23
graspologic>=3.0
```

Installed via `uv`: `uv pip install -r requirements-graphify.txt`

## 5. New SyncSource — `src/sources/graphify.ts`

Implements the existing `SyncSource` interface. Shells out to the forked Graphify CLI via `child_process.execFileSync`.

### 5.1 Interface

```typescript
// src/sources/graphify.ts

import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import type { SyncSource, RawDrop } from "./types.js";

interface GraphifyConfig {
  repos: string[];
  semantic: boolean;
  output_dir: string;     // relative to vaultRoot
  max_nodes_per_repo: number;
}

export function createGraphifySource(
  vaultRoot: string,
  config: GraphifyConfig,
): SyncSource {
  return {
    name: "graphify",

    async poll(): Promise<RawDrop[]> {
      const outputDir = join(vaultRoot, config.output_dir);
      const graphifyCliPath = join(vaultRoot, "scripts", "graphify", "graphify_cli.py");

      // Resolve ~ in repo paths
      const repos = config.repos.map(r =>
        r.startsWith("~") ? r.replace("~", process.env.HOME ?? "") : r,
      );

      // Filter to repos that actually exist
      const validRepos = repos.filter(r => existsSync(r));
      if (validRepos.length === 0) return [];

      // Use persistent venv (created once via setup script, not inline --with).
      // Setup: uv venv scripts/graphify/.venv && uv pip install -r requirements-graphify.txt
      const venvPython = join(vaultRoot, "scripts", "graphify", ".venv", "bin", "python");

      const args = [
        graphifyCliPath,
        "--repos", ...validRepos,
        "--output-dir", outputDir,
        "--incremental",
      ];
      if (config.semantic) args.push("--semantic");

      // Add API key for semantic mode
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (config.semantic && apiKey) {
        args.push("--anthropic-key", apiKey);
      }

      try {
        execFileSync(venvPython, args, {
          timeout: 300_000,  // 5 min max
          stdio: ["pipe", "pipe", "pipe"],
          env: { ...process.env },
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`[graphify] CLI failed: ${msg}`);
        return [];
      }

      // Collect output drops — wrapped in try-catch per repo to handle
      // malformed JSON or partial CLI output without crashing the orchestrator.
      const drops: RawDrop[] = [];

      for (const repoName of validRepos.map(r => basename(r))) {
        try {
          const repoOut = join(outputDir, repoName);
          if (!existsSync(repoOut)) continue;

          // 1. Architecture report → raw drop for compile pipeline
          const reportPath = join(repoOut, `${repoName}-architecture.md`);
          if (existsSync(reportPath)) {
            drops.push({
              slug: `graphify-${repoName}-architecture`,
              content: readFileSync(reportPath, "utf8"),
              source_type: "graphify",
              metadata: { repo: repoName, type: "architecture-report" },
            });
          }

          // 2. File-level summaries → raw drops for embedding
          const summariesDir = join(repoOut, "file-summaries");
          if (existsSync(summariesDir)) {
            for (const file of readdirSync(summariesDir)) {
              if (!file.endsWith(".md")) continue;
              drops.push({
                slug: `graphify-${repoName}-${basename(file, ".md")}`,
                content: readFileSync(join(summariesDir, file), "utf8"),
                source_type: "graphify",
                metadata: { repo: repoName, type: "file-summary" },
              });
            }
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`[graphify] Failed to collect output for ${repoName}: ${msg}`);
          // Continue to next repo — one bad output doesn't kill the batch
        }
      }

      return drops;
    },
  };
}
```

### 5.2 Source Type Addition

Add `"graphify"` to the `SourceType` union in `src/types.ts`:

```typescript
export type SourceType =
  | "file_drop" | "markpush" | "github" | "gmail"
  | "calendar" | "voice" | "conversation" | "auto_research"
  | "seed_yaml" | "seed_csv" | "api" | "git-commits"
  | "graphify";  // NEW
```

### 5.3 Cron Wiring

In `src/index.ts`, add Graphify to the hourly cron alongside git-commits and GitHub:

```typescript
// Inside the mcp_sources cron handler:
if (config.graphify?.repos?.length) {
  const graphifySource = createGraphifySource(vaultRoot, config.graphify);
  sources.push(graphifySource);
}
```

## 6. Graph Cache Merge — Unified Schema

### 6.1 URI-Style Node IDs

All nodes get namespaced URIs to prevent collisions:

```
wiki://experience/kismet-ai-data.md        ← wiki layer
code://karen/src/auth/service.ts            ← file-level code node
code://karen/src/auth/service.ts#AuthService ← symbol-level code node
```

Symbol name is omitted for file-level nodes. This enables deep-linking: `brain.rahilsinghi.com?focus=code://karen/src/auth/service.ts`.

**Migration:** Existing wiki node IDs change from `experience/kismet-ai-data.md` to `wiki://experience/kismet-ai-data.md`. The explorer frontend and `/graph-export` endpoint must handle both formats during transition.

**Important:** `scanWiki()` in `src/graph/scan-wiki.ts` continues to use path-based IDs internally (e.g., `experience/kismet-ai-data.md`). The `wiki://` prefix is applied only at the `cache.ts` merge boundary when writing the unified `GraphCache`. This keeps the wikilink resolution logic (titleToId, slugToId lookup maps) unchanged — those maps are keyed on path-based IDs and must not see URI prefixes.

### 6.2 Unified GraphNode

Extends the existing `GraphNode` in `src/types.ts`:

```typescript
export interface GraphNode {
  id: string;                     // URI: "wiki://..." or "code://..."
  title: string;
  tags: string[];
  category: string;               // wiki: subdirectory. code: repo name
  source_type: string;
  created_at: string;
  connection_count: number;
  x: number;
  y: number;
  z: number;
  // --- new fields ---
  layer: "wiki" | "code";
  file_type?: "code" | "document" | "rationale";
  source_file?: string;           // absolute path for cross-layer matching
  source_location?: string;       // line range: "42-87"
  community?: number;             // Leiden community ID
  is_god_node?: boolean;          // degree centrality > mu + 2*sigma
  confidential?: boolean;         // exclude from remote synthesis
  repo?: string;                  // repo name for code-layer nodes
}
```

### 6.3 Unified GraphLink

Extends the existing `GraphLink` in `src/types.ts`:

```typescript
export interface GraphLink {
  source: string;
  target: string;
  // --- new fields ---
  relation?: string;              // "imports" | "calls" | "contains" | "wiki_link" | "cross_layer"
  confidence?: "EXTRACTED" | "INFERRED" | "AMBIGUOUS";
  confidence_score?: number;      // 0.0-1.0
}
```

Existing wiki `[[links]]` become `{ relation: "wiki_link", confidence: "EXTRACTED", confidence_score: 1.0 }`.
AST edges keep their original relation and confidence.
Cross-layer edges get `{ relation: "cross_layer", confidence: "EXTRACTED", confidence_score: 1.0 }`.

### 6.4 God-Node Detection

Computed during graph cache rebuild in `src/graph/export.ts`, not at runtime:

```typescript
// After building all nodes:
const counts = nodes.map(n => n.connection_count);
const mean = counts.reduce((a, b) => a + b, 0) / counts.length;
const variance = counts.reduce((a, b) => a + (b - mean) ** 2, 0) / counts.length;
const std = Math.sqrt(variance);

for (const node of nodes) {
  node.is_god_node = node.connection_count > mean + 2 * std;
  if (node.is_god_node) {
    node.z = -200;  // push to background plane
  }
}
```

God nodes render at 30% opacity in the explorer, pulsing to 100% when a directly connected node is focused.

### 6.5 Graph Cache Merge Implementation

In `src/graph/cache.ts`, the `rebuildGraphCache()` function gains a second input — Graphify graph JSONs:

```typescript
export async function rebuildGraphCache(
  vaultRoot: string,
  cachePath: string,
  embeddings: Map<string, number[]>,
  seed: number,
  graphifyOutputDir?: string,  // NEW: path to raw/graphify/
): Promise<GraphCache> {
  // 1. Scan wiki layer (existing)
  const wikiScan = scanWiki(vaultRoot);

  // 2. Load Graphify graphs (NEW)
  const codeScan = graphifyOutputDir
    ? loadGraphifyGraphs(graphifyOutputDir)
    : { nodes: [], links: [] };

  // 3. Generate cross-layer edges (NEW)
  const crossLinks = generateCrossLayerEdges(wikiScan, codeScan);

  // 4. Merge into unified scan
  const mergedScan = {
    nodes: [...wikiScan.nodes, ...codeScan.nodes],
    links: [...wikiScan.links, ...codeScan.links, ...crossLinks],
  };

  // 5. UMAP + cache write (existing, now on merged data)
  const cache = await generateGraphCache(mergedScan, embeddings, seed);
  writeFileSync(cachePath, JSON.stringify(cache), "utf8");
  return cache;
}
```

### 6.6 Cross-Layer Edge Generation

```typescript
function generateCrossLayerEdges(
  wikiScan: ScanResult,
  codeScan: ScanResult,
): GraphLink[] {
  const links: GraphLink[] = [];

  // Find wiki nodes that are repo articles (wiki/projects/{repo}.md)
  const repoWikiNodes = wikiScan.nodes.filter(n =>
    n.category === "projects" || n.category === "code-architecture"
  );

  // For each repo wiki article, find code nodes from that repo
  for (const wikiNode of repoWikiNodes) {
    const repoName = extractRepoName(wikiNode.id); // e.g., "karen" from "projects/karen.md"
    if (!repoName) continue;

    const codeNodesForRepo = codeScan.nodes.filter(n => n.repo === repoName);

    // Connect wiki article to top-level code nodes (files, not symbols).
    // Cap at 20 (matches explorer summon animation cap) to prevent hairball.
    const fileNodes = codeNodesForRepo
      .filter(n => !n.id.includes("#"))
      .sort((a, b) => (b.connection_count ?? 0) - (a.connection_count ?? 0));
    for (const codeNode of fileNodes.slice(0, 20)) {  // top 20 by centrality
      links.push({
        source: wikiNode.id,
        target: codeNode.id,
        relation: "cross_layer",
        confidence: "EXTRACTED",
        confidence_score: 1.0,
      });
    }
  }

  return links;
}
```

## 7. Wiki Article Generation

Graphify's `GRAPH_REPORT.md` output per repo is dropped into `raw/graphify/{repo}-architecture.md`. The existing Brain compile pipeline picks it up via the chokidar watcher on `raw/`, compiles it through Claude/Gemini, and writes the result to `wiki/code-architecture/{repo-slug}.md`.

### 7.1 Frontmatter for Architecture Articles

```yaml
---
title: "Karen — Code Architecture"
author: ai
created_at: "2026-04-10T15:30:00Z"
last_ai_edit: "2026-04-10T15:30:00Z"
last_human_edit: null
last_embedded_hash: null
sources:
  - "raw/graphify/karen/karen-architecture.md"
tags:
  - code-architecture
  - karen
  - graphify
---
```

### 7.2 What the Wiki Article Contains

The compiled article distills Graphify's GRAPH_REPORT.md into Brain's wiki format:

- **Overview** — node/edge/community counts, extraction method (AST vs semantic)
- **God Nodes** — most-connected entities with `[[wiki links]]` to related articles
- **Communities** — cluster summaries with cohesion scores
- **Surprising Connections** — non-obvious cross-module relationships
- **Knowledge Gaps** — orphan nodes, thin communities
- **Suggested Questions** — graph-specific queries

This article is what makes `brain_query("how does auth work in Karen?")` powerful — the synthesis layer can pull both the project wiki article AND the architecture analysis.

## 8. File-Level LanceDB Embeddings

### 8.1 Strategy

Embed one chunk per source file, not per function/class. This prevents flooding synthesis with low-value code snippets while still making code structure queryable.

Each file-summary markdown (generated by the CLI) flows through Brain's existing pipeline:
1. Dropped to `raw/graphify/{repo}/file-summaries/` by the CLI
2. Chokidar watcher picks it up
3. Parser middleware routes it (passthrough — it's already markdown)
4. Compiler enriches it (or passes through if already well-structured)
5. Written to `wiki/code-files/{repo}/{slug}.md`
6. Wiki watcher triggers re-embed via `sync.ts`
7. Chunker splits at `##` headings → LanceDB vectors

### 8.2 Embedding Content

Each file-summary chunk contains:
- File path and repo name
- Import list (what it depends on)
- Export list (what depends on it)
- Key classes/functions (contained symbols)
- Community assignment
- Connection count (degree centrality)

This is enough for `brain_query("what uses the auth module in Karen?")` to return relevant file-level context without drowning in individual method signatures.

### 8.3 Scale Control

With `max_nodes_per_repo: 2000` in config and ~4 repos, worst case is ~8000 file-summary chunks. In practice, file-level nodes (not symbol-level) will be 100-300 per repo. This is well within LanceDB's capabilities and won't overwhelm existing wiki chunks (~315 articles × ~3 chunks each ≈ 945 wiki chunks).

## 9. Confidentiality Filter

### 9.1 Frontmatter Flag

Work repos (when added in v2) get `confidential: true` in all generated frontmatter:

```yaml
---
title: "WorkRepo — Auth Service"
confidential: true
tags: [code-architecture, work-repo]
---
```

The `graphify` config section controls this:

```yaml
graphify:
  repos:
    - path: ~/Desktop/karen
      confidential: false
    - path: ~/work/startup-repo
      confidential: true
```

v1 uses the simple string list (all personal, all non-confidential). The object format is reserved for v2 when work repos are added.

### 9.2 Two Synthesis Modes

In `src/query/synthesize.ts`, add a `mode` parameter:

```typescript
type SynthesisMode = "local" | "remote";

// "local" — include all chunks (Claude Code, local API)
// "remote" — exclude confidential: true chunks (Telegram, external)
```

The Telegram bot always passes `mode: "remote"`. The HTTP API defaults to `mode: "local"` but accepts a query parameter. The MCP server (`brain_query`) uses `mode: "local"` since Claude Code sessions are local.

### 9.3 Implementation

In the vector search step of `synthesize.ts`, after retrieving top-K chunks:

```typescript
if (mode === "remote") {
  chunks = chunks.filter(c => !c.confidential);
}
```

The `confidential` flag is read from wiki frontmatter during the embedding sync step and stored as a metadata field on the LanceDB vector.

## 10. Config Schema

Add to `BrainConfig` in `src/types.ts`:

```typescript
export interface GraphifyConfig {
  repos: string[];                // absolute paths (~ expanded at runtime)
  semantic: boolean;              // default: false (AST-only)
  cron_schedule: string;          // default: "0 * * * *" (hourly)
  max_nodes_per_repo: number;     // default: 2000
  output_dir: string;             // default: "raw/graphify"
}

export interface BrainConfig {
  // ... existing fields ...
  graphify?: GraphifyConfig;      // optional — disabled if missing
}
```

Defaults in `src/config.ts`:

```typescript
graphify: {
  repos: [],
  semantic: false,
  cron_schedule: "0 * * * *",
  max_nodes_per_repo: 2000,
  output_dir: "raw/graphify",
},
```

## 11. Explorer Changes (Addendum)

These are additive to the existing explorer spec. Detailed implementation belongs in the explorer frontend plan, but the data-layer changes are defined here.

### 11.1 Layer Toggle

The explorer renders two modes:
- **Wiki mode** (default) — existing 315+ wiki nodes, current behavior
- **Code mode** — Graphify code nodes, community-colored, file-level
- **Combined mode** — both layers visible, cross-layer edges shown

Toggle via URL param: `brain.rahilsinghi.com?layer=wiki|code|combined`

### 11.2 Drill-In UX

When a wiki node representing a repo (e.g., `wiki://projects/karen.md`) is focused:
1. A "Drill In" button appears in the detail panel
2. Clicking it reveals that repo's code subgraph (Graphify nodes where `repo === "karen"`)
3. Code nodes animate in from the wiki node's position
4. **Centrality cap:** Top 20 code neighbors by `connection_count` fly in with arc animation. Remaining nodes fade in statically after 1.2s delay

```typescript
const sorted = codeNeighbors.sort((a, b) => b.connection_count - a.connection_count);
const animated = sorted.slice(0, 20);   // fly in with arc animation
const rest = sorted.slice(20);          // fade in at opacity 0→1 after 1.2s
```

### 11.3 God-Node Background Plane

God nodes (computed in `src/graph/export.ts`) are pushed to `z = -200` and rendered at 30% opacity. They pulse to full opacity only when a directly connected node is focused. No physics engine — just a flag and a conditional render.

### 11.4 Code Node Visual Style

| Property | Value |
|----------|-------|
| Color | `#00FF41` (terminal green) with community-based hue shift |
| Size | Proportional to `connection_count`, capped |
| Shape | Cube (vs sphere for wiki nodes) — instant layer identification |
| Label | File basename (e.g., `service.ts`) not full path |
| Hover | Full path + community + imports/exports count |

## 12. UMAP Considerations

### 12.1 The Problem

Brain uses nomic-embed-text (768-dim) for wiki nodes. Graphify has no embeddings — it uses graph topology (Leiden) for clustering. Running UMAP on the merged graph requires vectors for all nodes.

### 12.2 Solution: Embed Code Nodes Through Brain's Pipeline

Code-layer file-summary articles flow through Brain's existing embedding pipeline (section 8). This means every code node that has a file-summary wiki article also has a 768-dim nomic-embed-text vector in LanceDB. UMAP runs on the full set — wiki + code vectors — producing unified 3D positions.

Code nodes without wiki articles (symbol-level nodes like individual functions) get positioned relative to their parent file node using a small offset based on the `contains` edge structure. This is computed in `generateGraphCache()` after UMAP.

### 12.3 Separate UMAP Runs (Fallback)

If mixing 315 wiki vectors with 500+ code vectors produces poor UMAP layouts (semantic distance between code and wiki is meaningless), fall back to:
- Run UMAP separately per layer
- Position wiki layer at `z ∈ [-50, 50]`
- Position code layer at `z ∈ [100, 200]`
- Cross-layer edges bridge the gap visually

This is a runtime decision based on testing. The unified approach is attempted first.

## 13. Data Flow Summary

```
.brain/config.yaml (graphify.repos)
            │
            ▼
hourly cron ──→ src/sources/graphify.ts
            │
            ▼
    uv run graphify_cli.py --repos [...] --output-dir raw/graphify/ --incremental
            │
            ├──→ raw/graphify/{repo}/{repo}-architecture.md     (GRAPH_REPORT)
            ├──→ raw/graphify/{repo}/{repo}-graph.json          (NetworkX JSON)
            └──→ raw/graphify/{repo}/file-summaries/*.md        (per-file summaries)
            │
            ▼
    chokidar watcher (raw/) picks up .md drops
            │
            ├──→ compile pipeline ──→ wiki/code-architecture/{repo}.md
            └──→ file summaries  ──→ wiki/code-files/{repo}/*.md
            │
            ▼
    chokidar watcher (wiki/) triggers re-embed
            │
            ▼
    LanceDB vectors (file-level code chunks + architecture articles)
            │
            ▼
    nightly cron ──→ rebuildGraphCache()
            │
            ├──→ scanWiki() ──→ wiki layer nodes + links
            ├──→ loadGraphifyGraphs() ──→ code layer nodes + links
            ├──→ generateCrossLayerEdges() ──→ cross-layer edges
            ├──→ god-node detection ──→ is_god_node flag + z-offset
            └──→ UMAP (merged vectors) ──→ 3D positions
            │
            ▼
    wiki/.graph-cache.json (unified two-layer graph)
            │
            ▼
    GET /graph-export ──→ explorer frontend
    POST /graph-push  ──→ brain-explorer repo ──→ Vercel deploy
```

## 14. Test Plan

| Area | Tests | Location |
|------|-------|----------|
| GraphifySource poll() | Mock execFileSync, verify drops | `tests/sources/graphify.test.ts` |
| Graph cache merge | Wiki + code nodes, cross-layer edges | `tests/graph/cache.test.ts` |
| URI node IDs | `wiki://` and `code://` generation | `tests/graph/scan-wiki.test.ts` |
| God-node detection | Mean + 2*sigma threshold | `tests/graph/export.test.ts` |
| Cross-layer edges | File path matching accuracy | `tests/graph/cross-layer.test.ts` |
| Confidentiality filter | Remote mode excludes confidential chunks | `tests/query/synthesize.test.ts` |
| Config loading | graphify section parsing + defaults | `tests/config.test.ts` |
| Unified GraphNode | New fields backward compatible | `tests/types.test.ts` |

Target: ~30-40 new tests on top of existing 346.

## 15. Migration & Rollout

### Phase 1: Fork + CLI (1 session)
1. Fork Graphify to `github.com/rahilsinghi/graphify`
2. Build `graphify_cli.py` entry point
3. Add `requirements-graphify.txt` to brain repo
4. Test: `uv run graphify_cli.py --repos ~/Desktop/karen --output-dir /tmp/test`

### Phase 2: Brain Source + Wiki Articles (1 session)
1. Add `GraphifyConfig` to types + config
2. Implement `src/sources/graphify.ts`
3. Wire into hourly cron
4. Verify architecture articles compile to `wiki/code-architecture/`

### Phase 3: Graph Cache Merge (1 session)
1. URI node IDs in `scan-wiki.ts`
2. `loadGraphifyGraphs()` in `cache.ts`
3. `generateCrossLayerEdges()` in new `src/graph/cross-layer.ts`
4. God-node detection in `export.ts`
5. Unified `GraphNode`/`GraphLink` types
6. Test: `rebuildGraphCache()` produces two-layer JSON

### Phase 4: Embeddings + Query (1 session)
1. File-summary drops flowing through embed pipeline
2. Confidentiality filter in `synthesize.ts`
3. Test: `brain_query("how does auth work in Karen?")` returns code architecture context

### Phase 5: Explorer Integration (separate spec)
1. Layer toggle UI
2. Drill-in UX
3. God-node background plane
4. Code node visual style
5. Centrality cap on summon animation

---

**Estimated total:** 4 sessions for backend (Phases 1-4) + 1 session for explorer (Phase 5).
**Risk:** Scope creep. Nail AST-only on personal repos first. Validate that file-level code structure in synthesis is actually useful day-to-day before adding semantic enrichment.
