# Brain Explorer — Daemon Endpoints Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add graph export and push endpoints to the brain daemon so the explorer frontend can consume precomputed graph data.

**Architecture:** New `src/graph/` module handles UMAP dimensionality reduction (768→3) offline, caches results to `wiki/.graph-cache.json`. Two new Fastify routes serve and trigger the cache. The nightly cron regenerates the cache after lint/heal.

**Tech Stack:** umap-js (pure JS UMAP), existing LanceDB VectorStore, existing Fastify server, existing frontmatter utilities.

**Spec:** `docs/specs/2026-04-10-brain-explorer-design.md` — Sections 3.1-3.4, 7

---

### Task 1: Install umap-js dependency

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install umap-js**

```bash
pnpm add umap-js
```

- [ ] **Step 2: Verify it imports**

```bash
bun -e "import { UMAP } from 'umap-js'; console.log('UMAP loaded:', typeof UMAP);"
```

Expected: `UMAP loaded: function`

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add umap-js for graph position computation"
```

---

### Task 2: Graph types and config

**Files:**
- Modify: `src/types.ts`
- Modify: `src/config.ts`

- [ ] **Step 1: Add graph types to `src/types.ts`**

Add at the end of the file:

```typescript
export interface GraphNode {
  id: string;
  title: string;
  tags: string[];
  category: string;
  source_type: string;
  created_at: string;
  connection_count: number;
  x: number;
  y: number;
  z: number;
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface GraphCache {
  generated_at: string;
  node_count: number;
  nodes: GraphNode[];
  links: GraphLink[];
}
```

- [ ] **Step 2: Add graph config to `src/config.ts`**

Add to the `DEFAULTS` object:

```typescript
graph: {
  explorer_repo_path: "",
  umap_seed: 42,
  cache_path: "wiki/.graph-cache.json",
},
```

Add to the `BrainConfig` interface in `src/types.ts`:

```typescript
graph: {
  explorer_repo_path: string;
  umap_seed: number;
  cache_path: string;
};
```

- [ ] **Step 3: Run existing tests to verify no breakage**

```bash
pnpm vitest run
```

Expected: 323 passing

- [ ] **Step 4: Commit**

```bash
git add src/types.ts src/config.ts
git commit -m "feat(graph): add GraphCache types and graph config section"
```

---

### Task 3: Graph export module — wiki scanner

**Files:**
- Create: `src/graph/scan-wiki.ts`
- Create: `tests/graph/scan-wiki.test.ts`

This module reads all wiki articles, extracts frontmatter metadata, and parses `[[wiki links]]` from content to build node + link data (without positions — those come from UMAP in the next task).

- [ ] **Step 1: Write the failing test**

Create `tests/graph/scan-wiki.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { writeFrontmatter } from "../../src/frontmatter.js";
import { scanWiki } from "../../src/graph/scan-wiki.js";

const TEST_VAULT = join(import.meta.dirname, "__fixtures__/scan-wiki-test");

function writeArticle(subdir: string, slug: string, title: string, tags: string[], content: string) {
  const dir = join(TEST_VAULT, "wiki", subdir);
  mkdirSync(dir, { recursive: true });
  const fm = {
    title,
    author: "ai",
    created_at: "2026-04-10T00:00:00Z",
    last_ai_edit: "2026-04-10T00:00:00Z",
    last_human_edit: null,
    last_embedded_hash: null,
    sources: [],
    tags,
  };
  writeFrontmatter(join(dir, `${slug}.md`), fm, content);
}

describe("scanWiki", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_VAULT, "wiki"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_VAULT, { recursive: true, force: true });
  });

  it("returns nodes with category derived from subdirectory", () => {
    writeArticle("projects", "karen", "Karen", ["escalation"], "# Karen\n\nA project.");
    writeArticle("skills", "typescript", "TypeScript", ["lang"], "# TypeScript\n\nA skill.");

    const result = scanWiki(TEST_VAULT);
    expect(result.nodes).toHaveLength(2);

    const karen = result.nodes.find((n) => n.id === "projects/karen.md");
    expect(karen).toBeDefined();
    expect(karen!.category).toBe("projects");
    expect(karen!.title).toBe("Karen");
    expect(karen!.tags).toEqual(["escalation"]);

    const ts = result.nodes.find((n) => n.id === "skills/typescript.md");
    expect(ts).toBeDefined();
    expect(ts!.category).toBe("skills");
  });

  it("extracts wiki links as edges", () => {
    writeArticle("projects", "karen", "Karen", [], "# Karen\n\nUses [[skills/typescript.md|TypeScript]].");
    writeArticle("skills", "typescript", "TypeScript", [], "# TypeScript\n\nUsed by [[projects/karen.md|Karen]].");

    const result = scanWiki(TEST_VAULT);
    expect(result.links).toContainEqual({
      source: "projects/karen.md",
      target: "skills/typescript.md",
    });
  });

  it("counts connections per node", () => {
    writeArticle("projects", "karen", "Karen", [], "# Karen\n\nUses [[skills/typescript.md]] and [[skills/react.md]].");
    writeArticle("skills", "typescript", "TypeScript", [], "# TypeScript\n\nA skill.");
    writeArticle("skills", "react", "React", [], "# React\n\nA skill.");

    const result = scanWiki(TEST_VAULT);
    const karen = result.nodes.find((n) => n.id === "projects/karen.md");
    expect(karen!.connection_count).toBe(2);
  });

  it("returns empty for vault with no wiki articles", () => {
    const result = scanWiki(TEST_VAULT);
    expect(result.nodes).toEqual([]);
    expect(result.links).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run tests/graph/scan-wiki.test.ts
```

Expected: FAIL — cannot find module `../../src/graph/scan-wiki.js`

- [ ] **Step 3: Implement `src/graph/scan-wiki.ts`**

```typescript
import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { readFrontmatter } from "../frontmatter.js";
import type { WikiFrontmatter } from "../types.js";

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

const WIKILINK_RE = /\[\[([^\]|#]+?)(?:#[^\]|]*)?(?:\|[^\]]+?)?\]\]/g;

function walkDir(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(full));
    } else if (entry.name.endsWith(".md") && entry.name !== "index.md") {
      files.push(full);
    }
  }
  return files;
}

export function scanWiki(vaultRoot: string): ScanResult {
  const wikiDir = join(vaultRoot, "wiki");
  try {
    statSync(wikiDir);
  } catch {
    return { nodes: [], links: [] };
  }

  const files = walkDir(wikiDir);
  const nodes: ScanNode[] = [];
  const links: { source: string; target: string }[] = [];
  const connectionCounts = new Map<string, number>();

  for (const filePath of files) {
    const relPath = relative(join(vaultRoot, "wiki"), filePath);
    const category = relPath.split("/")[0] ?? "uncategorized";

    const { data, content } = readFrontmatter<WikiFrontmatter>(filePath);

    nodes.push({
      id: relPath,
      title: data.title ?? relPath.replace(/\.md$/, ""),
      tags: data.tags ?? [],
      category,
      source_type: data.author ?? "ai",
      created_at: data.created_at ?? "",
      connection_count: 0,
    });

    // Extract outgoing wiki links
    let match: RegExpExecArray | null;
    const re = new RegExp(WIKILINK_RE.source, WIKILINK_RE.flags);
    while ((match = re.exec(content)) !== null) {
      let target = match[1].trim();
      // Normalize: strip wiki/ prefix if present
      target = target.replace(/^wiki\//, "");
      // Ensure .md extension
      if (!target.endsWith(".md")) target += ".md";

      links.push({ source: relPath, target });
      connectionCounts.set(relPath, (connectionCounts.get(relPath) ?? 0) + 1);
      connectionCounts.set(target, (connectionCounts.get(target) ?? 0) + 1);
    }
  }

  // Deduplicate links (A→B and B→A → keep one)
  const seen = new Set<string>();
  const dedupedLinks = links.filter((link) => {
    const key = [link.source, link.target].sort().join("||");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Set connection counts
  for (const node of nodes) {
    node.connection_count = connectionCounts.get(node.id) ?? 0;
  }

  return { nodes, links: dedupedLinks };
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run tests/graph/scan-wiki.test.ts
```

Expected: 4 passing

- [ ] **Step 5: Commit**

```bash
git add src/graph/scan-wiki.ts tests/graph/scan-wiki.test.ts
git commit -m "feat(graph): wiki scanner extracts nodes, links, and connection counts"
```

---

### Task 4: Graph export module — UMAP positions + cache

**Files:**
- Create: `src/graph/export.ts`
- Create: `tests/graph/export.test.ts`

This module orchestrates: scan wiki → get embeddings from LanceDB → UMAP 768→3 → write cache.

- [ ] **Step 1: Write the failing test**

Create `tests/graph/export.test.ts`:

```typescript
import { describe, it, expect, vi } from "vitest";
import { generateGraphCache } from "../../src/graph/export.js";

describe("generateGraphCache", () => {
  it("produces a GraphCache with UMAP positions", async () => {
    const mockScanResult = {
      nodes: [
        { id: "projects/a.md", title: "A", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-01", connection_count: 1 },
        { id: "projects/b.md", title: "B", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-02", connection_count: 1 },
        { id: "skills/c.md", title: "C", tags: [], category: "skills", source_type: "ai", created_at: "2026-01-03", connection_count: 0 },
      ],
      links: [{ source: "projects/a.md", target: "projects/b.md" }],
    };

    // Mock embeddings: 3 articles, each with a fake 10-dim vector
    const mockEmbeddings = new Map<string, number[]>([
      ["projects/a.md", [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      ["projects/b.md", [0.9, 0.1, 0, 0, 0, 0, 0, 0, 0, 0]],
      ["skills/c.md", [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]],
    ]);

    const cache = await generateGraphCache(mockScanResult, mockEmbeddings, 42);

    expect(cache.node_count).toBe(3);
    expect(cache.nodes).toHaveLength(3);
    expect(cache.links).toEqual(mockScanResult.links);
    expect(cache.generated_at).toBeTruthy();

    // Every node should have numeric x, y, z
    for (const node of cache.nodes) {
      expect(typeof node.x).toBe("number");
      expect(typeof node.y).toBe("number");
      expect(typeof node.z).toBe("number");
      expect(Number.isFinite(node.x)).toBe(true);
    }

    // Projects a and b should be closer together than a and c
    const nodeA = cache.nodes.find((n) => n.id === "projects/a.md")!;
    const nodeB = cache.nodes.find((n) => n.id === "projects/b.md")!;
    const nodeC = cache.nodes.find((n) => n.id === "skills/c.md")!;
    const distAB = Math.sqrt((nodeA.x - nodeB.x) ** 2 + (nodeA.y - nodeB.y) ** 2 + (nodeA.z - nodeB.z) ** 2);
    const distAC = Math.sqrt((nodeA.x - nodeC.x) ** 2 + (nodeA.y - nodeC.y) ** 2 + (nodeA.z - nodeC.z) ** 2);
    expect(distAB).toBeLessThan(distAC);
  });

  it("excludes nodes with no embeddings", async () => {
    const mockScanResult = {
      nodes: [
        { id: "projects/a.md", title: "A", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-01", connection_count: 0 },
        { id: "projects/noembeds.md", title: "No Embeds", tags: [], category: "projects", source_type: "ai", created_at: "2026-01-01", connection_count: 0 },
      ],
      links: [],
    };

    const mockEmbeddings = new Map<string, number[]>([
      ["projects/a.md", [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      // projects/noembeds.md intentionally missing
    ]);

    const cache = await generateGraphCache(mockScanResult, mockEmbeddings, 42);
    expect(cache.node_count).toBe(1);
    expect(cache.nodes[0].id).toBe("projects/a.md");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run tests/graph/export.test.ts
```

Expected: FAIL — cannot find module

- [ ] **Step 3: Implement `src/graph/export.ts`**

```typescript
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

export async function generateGraphCache(
  scan: ScanResult,
  embeddings: Map<string, number[]>,
  seed: number,
): Promise<GraphCache> {
  // Filter to nodes that have embeddings
  const nodesWithEmbeddings = scan.nodes.filter((n) => embeddings.has(n.id));
  const vectors = nodesWithEmbeddings.map((n) => embeddings.get(n.id)!);

  let positions: number[][];

  if (nodesWithEmbeddings.length < 2) {
    // UMAP needs at least 2 points
    positions = nodesWithEmbeddings.map(() => [0, 0, 0]);
  } else {
    const nNeighbors = Math.min(15, Math.max(2, Math.floor(nodesWithEmbeddings.length / 3)));
    const umap = new UMAP({
      nComponents: 3,
      nNeighbors,
      minDist: 0.1,
      spread: 1.0,
      random: seedRandom(seed),
    });
    positions = umap.fit(vectors);
  }

  // Filter links to only include nodes that have embeddings
  const nodeIds = new Set(nodesWithEmbeddings.map((n) => n.id));
  const filteredLinks = scan.links.filter(
    (l) => nodeIds.has(l.source) && nodeIds.has(l.target),
  );

  const nodes: GraphNode[] = nodesWithEmbeddings.map((n, i) => ({
    ...n,
    x: positions[i][0],
    y: positions[i][1],
    z: positions[i][2],
  }));

  return {
    generated_at: new Date().toISOString(),
    node_count: nodes.length,
    nodes,
    links: filteredLinks,
  };
}

function seedRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run tests/graph/export.test.ts
```

Expected: 2 passing

- [ ] **Step 5: Commit**

```bash
git add src/graph/export.ts tests/graph/export.test.ts
git commit -m "feat(graph): UMAP dimensionality reduction with deterministic seed"
```

---

### Task 5: Embedding aggregation — per-article centroid from LanceDB chunks

**Files:**
- Create: `src/graph/embeddings.ts`
- Create: `tests/graph/embeddings.test.ts`

LanceDB stores embeddings per-chunk (multiple per article). This module queries all chunks, averages vectors per article into a single centroid.

- [ ] **Step 1: Write the failing test**

Create `tests/graph/embeddings.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { aggregateEmbeddings } from "../../src/graph/embeddings.js";

describe("aggregateEmbeddings", () => {
  it("averages multiple chunk vectors per file into one centroid", () => {
    const chunks = [
      { filePath: "projects/karen.md", vector: [1, 0, 0] },
      { filePath: "projects/karen.md", vector: [0, 1, 0] },
      { filePath: "skills/ts.md", vector: [0, 0, 1] },
    ];

    const result = aggregateEmbeddings(chunks);
    expect(result.size).toBe(2);

    const karen = result.get("projects/karen.md")!;
    expect(karen).toHaveLength(3);
    expect(karen[0]).toBeCloseTo(0.5);
    expect(karen[1]).toBeCloseTo(0.5);
    expect(karen[2]).toBeCloseTo(0);

    const ts = result.get("skills/ts.md")!;
    expect(ts).toEqual([0, 0, 1]);
  });

  it("returns empty map for no chunks", () => {
    expect(aggregateEmbeddings([]).size).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run tests/graph/embeddings.test.ts
```

Expected: FAIL

- [ ] **Step 3: Implement `src/graph/embeddings.ts`**

```typescript
interface ChunkWithVector {
  filePath: string;
  vector: number[];
}

export function aggregateEmbeddings(
  chunks: ChunkWithVector[],
): Map<string, number[]> {
  const byFile = new Map<string, number[][]>();

  for (const chunk of chunks) {
    if (!chunk.vector || chunk.vector.length === 0) continue;
    const existing = byFile.get(chunk.filePath) ?? [];
    existing.push(chunk.vector);
    byFile.set(chunk.filePath, existing);
  }

  const result = new Map<string, number[]>();
  for (const [filePath, vectors] of byFile) {
    const dim = vectors[0].length;
    const centroid = new Array(dim).fill(0);
    for (const vec of vectors) {
      for (let i = 0; i < dim; i++) {
        centroid[i] += vec[i];
      }
    }
    for (let i = 0; i < dim; i++) {
      centroid[i] /= vectors.length;
    }
    result.set(filePath, centroid);
  }

  return result;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run tests/graph/embeddings.test.ts
```

Expected: 2 passing

- [ ] **Step 5: Commit**

```bash
git add src/graph/embeddings.ts tests/graph/embeddings.test.ts
git commit -m "feat(graph): aggregate chunk embeddings into per-article centroids"
```

---

### Task 6: Graph cache orchestrator — ties scan + embeddings + UMAP + file write

**Files:**
- Create: `src/graph/cache.ts`
- Create: `tests/graph/cache.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/graph/cache.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { writeFrontmatter } from "../../src/frontmatter.js";
import { rebuildGraphCache, readGraphCache } from "../../src/graph/cache.js";

const TEST_VAULT = join(import.meta.dirname, "__fixtures__/cache-test");

function writeArticle(slug: string, title: string, content: string) {
  const dir = join(TEST_VAULT, "wiki", "projects");
  mkdirSync(dir, { recursive: true });
  writeFrontmatter(join(dir, `${slug}.md`), {
    title,
    author: "ai",
    created_at: "2026-04-10T00:00:00Z",
    last_ai_edit: "2026-04-10T00:00:00Z",
    last_human_edit: null,
    last_embedded_hash: null,
    sources: [],
    tags: ["test"],
  }, content);
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

    // Mock embeddings — in real usage comes from LanceDB
    const mockEmbeddings = new Map<string, number[]>([
      ["projects/a.md", Array(10).fill(0.1)],
      ["projects/b.md", Array(10).fill(0.2)],
    ]);

    const cachePath = join(TEST_VAULT, "wiki", ".graph-cache.json");
    const cache = await rebuildGraphCache(TEST_VAULT, cachePath, mockEmbeddings, 42);

    expect(cache.node_count).toBe(2);
    expect(existsSync(cachePath)).toBe(true);

    const fromDisk = readGraphCache(cachePath);
    expect(fromDisk).not.toBeNull();
    expect(fromDisk!.node_count).toBe(2);
  });

  it("readGraphCache returns null for missing file", () => {
    expect(readGraphCache(join(TEST_VAULT, "nonexistent.json"))).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run tests/graph/cache.test.ts
```

Expected: FAIL

- [ ] **Step 3: Implement `src/graph/cache.ts`**

```typescript
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { scanWiki } from "./scan-wiki.js";
import { generateGraphCache } from "./export.js";
import type { GraphCache } from "../types.js";

export async function rebuildGraphCache(
  vaultRoot: string,
  cachePath: string,
  embeddings: Map<string, number[]>,
  seed: number,
): Promise<GraphCache> {
  const scan = scanWiki(vaultRoot);
  const cache = await generateGraphCache(scan, embeddings, seed);
  writeFileSync(cachePath, JSON.stringify(cache), "utf-8");
  console.log(`[graph] Cache written: ${cache.node_count} nodes → ${cachePath}`);
  return cache;
}

export function readGraphCache(cachePath: string): GraphCache | null {
  if (!existsSync(cachePath)) return null;
  try {
    const raw = readFileSync(cachePath, "utf-8");
    return JSON.parse(raw) as GraphCache;
  } catch {
    return null;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run tests/graph/cache.test.ts
```

Expected: 2 passing

- [ ] **Step 5: Commit**

```bash
git add src/graph/cache.ts tests/graph/cache.test.ts
git commit -m "feat(graph): cache orchestrator ties scan + UMAP + file write"
```

---

### Task 7: GET /graph-export route

**Files:**
- Create: `src/api/routes/graph-export.ts`
- Create: `tests/api/routes/graph-export.test.ts`
- Modify: `src/api/server.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/api/routes/graph-export.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import Fastify from "fastify";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graphExportRoute } from "../../../src/api/routes/graph-export.js";
import type { GraphCache } from "../../../src/types.js";

const TEST_VAULT = join(import.meta.dirname, "__fixtures__/graph-export-test");

const mockCache: GraphCache = {
  generated_at: "2026-04-10T00:00:00Z",
  node_count: 2,
  nodes: [
    { id: "projects/a.md", title: "A", tags: [], category: "projects", source_type: "ai", created_at: "2026-04-10", connection_count: 1, x: 0, y: 0, z: 0 },
    { id: "skills/b.md", title: "B", tags: [], category: "skills", source_type: "ai", created_at: "2026-04-10", connection_count: 1, x: 1, y: 1, z: 1 },
  ],
  links: [{ source: "projects/a.md", target: "skills/b.md" }],
};

function buildApp() {
  const app = Fastify();
  app.decorate("vaultRoot", TEST_VAULT);
  app.decorate("config", { graph: { cache_path: "wiki/.graph-cache.json" } });
  app.register(graphExportRoute);
  return app;
}

describe("GET /graph-export", () => {
  beforeEach(() => {
    const cacheDir = join(TEST_VAULT, "wiki");
    mkdirSync(cacheDir, { recursive: true });
    writeFileSync(join(cacheDir, ".graph-cache.json"), JSON.stringify(mockCache));
  });

  afterEach(() => {
    rmSync(TEST_VAULT, { recursive: true, force: true });
  });

  it("returns cached graph data", async () => {
    const app = buildApp();
    await app.ready();

    const res = await app.inject({ method: "GET", url: "/graph-export" });
    expect(res.statusCode).toBe(200);

    const body = res.json();
    expect(body.node_count).toBe(2);
    expect(body.nodes).toHaveLength(2);
    expect(body.links).toHaveLength(1);

    await app.close();
  });

  it("returns 404 when cache does not exist", async () => {
    rmSync(TEST_VAULT, { recursive: true, force: true });
    mkdirSync(TEST_VAULT, { recursive: true });

    const app = buildApp();
    await app.ready();

    const res = await app.inject({ method: "GET", url: "/graph-export" });
    expect(res.statusCode).toBe(404);

    await app.close();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run tests/api/routes/graph-export.test.ts
```

Expected: FAIL

- [ ] **Step 3: Implement `src/api/routes/graph-export.ts`**

```typescript
import { join } from "node:path";
import type { FastifyInstance } from "fastify";
import { readGraphCache } from "../../graph/cache.js";

export async function graphExportRoute(app: FastifyInstance): Promise<void> {
  app.get("/graph-export", async (_request, reply) => {
    const cachePath = join(app.vaultRoot, app.config.graph.cache_path);
    const cache = readGraphCache(cachePath);

    if (!cache) {
      return reply.status(404).send({
        error: "cache_not_found",
        message: "Graph cache not found. Run POST /graph-push to generate it.",
      });
    }

    return cache;
  });
}
```

- [ ] **Step 4: Register route in `src/api/server.ts`**

Add import:

```typescript
import { graphExportRoute } from "./routes/graph-export.js";
```

Add registration after `saveRoute`:

```typescript
app.register(graphExportRoute);
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm vitest run tests/api/routes/graph-export.test.ts
```

Expected: 2 passing

- [ ] **Step 6: Run full test suite**

```bash
pnpm vitest run
```

Expected: all passing (323 + new tests)

- [ ] **Step 7: Commit**

```bash
git add src/api/routes/graph-export.ts tests/api/routes/graph-export.test.ts src/api/server.ts
git commit -m "feat(api): GET /graph-export serves cached graph data"
```

---

### Task 8: POST /graph-push route

**Files:**
- Create: `src/graph/push.ts`
- Create: `src/api/routes/graph-push.ts`
- Create: `tests/graph/push.test.ts`
- Create: `tests/api/routes/graph-push.test.ts`
- Modify: `src/api/server.ts`

- [ ] **Step 1: Write the failing test for push logic**

Create `tests/graph/push.test.ts`:

```typescript
import { describe, it, expect, vi } from "vitest";
import { pushGraphToRepo } from "../../src/graph/push.js";

describe("pushGraphToRepo", () => {
  it("writes graph.json and runs git commands", async () => {
    const mockCache = {
      generated_at: "2026-04-10T00:00:00Z",
      node_count: 1,
      nodes: [{ id: "a.md", title: "A", tags: [], category: "projects", source_type: "ai", created_at: "2026-04-10", connection_count: 0, x: 0, y: 0, z: 0 }],
      links: [],
    };

    const commands: string[] = [];
    const mockExec = vi.fn().mockImplementation((cmd: string) => {
      commands.push(cmd);
      if (cmd.includes("rev-parse")) return "abc123\n";
      return "";
    });

    const result = await pushGraphToRepo(mockCache, "/tmp/test-repo", mockExec);

    expect(result.status).toBe("pushed");
    expect(result.node_count).toBe(1);
    expect(commands.some((c) => c.includes("git add"))).toBe(true);
    expect(commands.some((c) => c.includes("git commit"))).toBe(true);
    expect(commands.some((c) => c.includes("git push"))).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run tests/graph/push.test.ts
```

Expected: FAIL

- [ ] **Step 3: Implement `src/graph/push.ts`**

```typescript
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import type { GraphCache } from "../types.js";

type ExecFn = (cmd: string) => string;

function defaultExec(cmd: string): string {
  const result = Bun.spawnSync(cmd.split(" "), { cwd: undefined });
  if (result.exitCode !== 0) {
    throw new Error(`Command failed: ${cmd}\n${result.stderr.toString()}`);
  }
  return result.stdout.toString();
}

export interface PushResult {
  status: "pushed";
  commit_sha: string;
  node_count: number;
}

export async function pushGraphToRepo(
  cache: GraphCache,
  repoPath: string,
  exec: ExecFn = defaultExec,
): Promise<PushResult> {
  const jsonPath = join(repoPath, "public", "graph.json");
  writeFileSync(jsonPath, JSON.stringify(cache), "utf-8");

  const cwd = repoPath;
  const run = (cmd: string) => exec(`cd ${cwd} && ${cmd}`);

  run("git add public/graph.json");
  run(`git commit -m "chore: update graph data (${cache.node_count} nodes)"`);
  run("git push");

  const sha = run("git rev-parse HEAD").trim();

  console.log(`[graph] Pushed to ${repoPath}: ${cache.node_count} nodes, sha=${sha}`);

  return { status: "pushed", commit_sha: sha, node_count: cache.node_count };
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run tests/graph/push.test.ts
```

Expected: 1 passing

- [ ] **Step 5: Write the route test**

Create `tests/api/routes/graph-push.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import Fastify from "fastify";
import { graphPushRoute } from "../../../src/api/routes/graph-push.js";

function buildApp() {
  const app = Fastify();
  app.decorate("vaultRoot", "/tmp/test");
  app.decorate("store", { search: async () => [] });
  app.decorate("config", {
    graph: {
      explorer_repo_path: "",
      umap_seed: 42,
      cache_path: "wiki/.graph-cache.json",
    },
  });
  app.register(graphPushRoute);
  return app;
}

describe("POST /graph-push", () => {
  it("returns 400 when explorer_repo_path is not configured", async () => {
    const app = buildApp();
    await app.ready();

    const res = await app.inject({ method: "POST", url: "/graph-push" });
    expect(res.statusCode).toBe(400);
    expect(res.json().error).toBe("not_configured");

    await app.close();
  });
});
```

- [ ] **Step 6: Implement `src/api/routes/graph-push.ts`**

```typescript
import { join } from "node:path";
import type { FastifyInstance } from "fastify";
import { rebuildGraphCache } from "../../graph/cache.js";
import { pushGraphToRepo } from "../../graph/push.js";
import { aggregateEmbeddings } from "../../graph/embeddings.js";

export async function graphPushRoute(app: FastifyInstance): Promise<void> {
  app.post("/graph-push", async (_request, reply) => {
    const repoPath = app.config.graph.explorer_repo_path;
    if (!repoPath) {
      return reply.status(400).send({
        error: "not_configured",
        message: "graph.explorer_repo_path not set in config.yaml",
      });
    }

    try {
      // Get all chunks with vectors from LanceDB
      const store = app.store;
      const allChunks = await store.search(new Array(768).fill(0), 10000);

      // This is a hack — vector search with a zero vector returns all results ranked by distance.
      // In practice we need a method to dump all vectors. For now, we use scan-wiki
      // to get the node list and aggregate whatever embeddings we can retrieve.
      const embeddings = aggregateEmbeddings(
        allChunks.map((c) => ({ filePath: c.filePath, vector: (c as unknown as { vector: number[] }).vector ?? [] })),
      );

      const cachePath = join(app.vaultRoot, app.config.graph.cache_path);
      const cache = await rebuildGraphCache(
        app.vaultRoot,
        cachePath,
        embeddings,
        app.config.graph.umap_seed,
      );

      const result = await pushGraphToRepo(cache, repoPath);
      return reply.status(200).send(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[api] graph-push failed: ${message}`);
      return reply.status(500).send({ error: "push_failed", message });
    }
  });
}
```

- [ ] **Step 7: Register route in `src/api/server.ts`**

Add import:

```typescript
import { graphPushRoute } from "./routes/graph-push.js";
```

Add registration:

```typescript
app.register(graphPushRoute);
```

- [ ] **Step 8: Run tests**

```bash
pnpm vitest run tests/api/routes/graph-push.test.ts tests/graph/push.test.ts
```

Expected: 2 passing

- [ ] **Step 9: Run full test suite**

```bash
pnpm vitest run
```

Expected: all passing

- [ ] **Step 10: Commit**

```bash
git add src/graph/push.ts src/api/routes/graph-push.ts tests/graph/push.test.ts tests/api/routes/graph-push.test.ts src/api/server.ts
git commit -m "feat(api): POST /graph-push rebuilds cache and pushes to explorer repo"
```

---

### Task 9: Add VectorStore.allChunks() method for bulk embedding retrieval

**Files:**
- Modify: `src/embedder/vector-store.ts`
- Modify: `tests/` (existing vector store tests if they exist)

The `/graph-push` route needs to read all chunk embeddings from LanceDB. The current `search()` method requires a query vector. Add a `listAll()` method that returns all chunks with their vectors.

- [ ] **Step 1: Add `listAll` method to `VectorStore`**

Add to `src/embedder/vector-store.ts`:

```typescript
async listAll(): Promise<(WikiChunk & { vector: number[] })[]> {
  const table = await this.getTable();
  if (!table) return [];

  const results = await table.query().toArray();

  return results.map((r) => ({
    id: r.id as string,
    filePath: r.filePath as string,
    breadcrumb: r.breadcrumb as string,
    heading: r.heading as string,
    content: r.content as string,
    sectionHash: r.sectionHash as string,
    vector: Array.from(r.vector as Float32Array),
  }));
}
```

- [ ] **Step 2: Update `graph-push.ts` to use `listAll` instead of the zero-vector hack**

Replace the chunk retrieval section in `src/api/routes/graph-push.ts`:

```typescript
// Get all chunks with vectors from LanceDB
const allChunks = await app.store.listAll();
const embeddings = aggregateEmbeddings(allChunks);
```

- [ ] **Step 3: Run full test suite**

```bash
pnpm vitest run
```

Expected: all passing

- [ ] **Step 4: Commit**

```bash
git add src/embedder/vector-store.ts src/api/routes/graph-push.ts
git commit -m "feat(vector-store): add listAll() for bulk embedding retrieval"
```

---

### Task 10: Wire graph cache rebuild into nightly cron

**Files:**
- Modify: `src/index.ts`

- [ ] **Step 1: Add graph cache rebuild after lint/heal in the nightly cron**

In `src/index.ts`, inside the `config.cron.lint_heal` cron handler, after the existing lint/heal block, add:

```typescript
// Rebuild graph cache after lint/heal
try {
  const { rebuildGraphCache } = await import("./graph/cache.js");
  const { aggregateEmbeddings } = await import("./graph/embeddings.js");
  const allChunks = await store.listAll();
  const embeddings = aggregateEmbeddings(allChunks);
  const cachePath = join(vaultRoot, config.graph.cache_path);
  await rebuildGraphCache(vaultRoot, cachePath, embeddings, config.graph.umap_seed);
} catch (err) {
  console.error(`[cron] Graph cache rebuild failed: ${err instanceof Error ? err.message : String(err)}`);
}
```

- [ ] **Step 2: Run full test suite**

```bash
pnpm vitest run
```

Expected: all passing

- [ ] **Step 3: Commit**

```bash
git add src/index.ts
git commit -m "feat(cron): rebuild graph cache nightly after lint/heal cycle"
```

---

### Task 11: End-to-end verification

- [ ] **Step 1: Run full test suite**

```bash
pnpm vitest run
```

Expected: all passing (323 + ~12 new tests ≈ 335+)

- [ ] **Step 2: Manually test graph export with live daemon**

```bash
# Restart daemon
launchctl stop com.rahilsinghi.brain && launchctl start com.rahilsinghi.brain

# Wait for startup
sleep 3

# Test export (will 404 until cache is built)
curl -s http://localhost:3577/graph-export | python3 -m json.tool | head -5

# Build cache manually via push (without the git push part for now)
# Or run: bun -e "import { rebuildGraphCache } from './src/graph/cache.ts'; ..."
```

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: end-to-end graph export verification fixes"
```
