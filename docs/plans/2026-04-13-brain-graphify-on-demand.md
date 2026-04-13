# Graphify On-Demand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** One command (`brain graphify .` or MCP tool) maps any repo into the brain knowledge graph with community-level wiki articles and N-degree neighborhood visualization.

**Architecture:** Thin Shell — CLI + MCP tool POST to daemon's `/graphify` route. Daemon spawns graphify Python CLI, generates community-level raw drops, and lets the existing watcher pipeline handle compilation, embedding, and graph rebuild. Sentinel file triggers graph rebuild when all articles are processed.

**Tech Stack:** Bun + TypeScript (daemon, CLI, MCP), Python (graphify_cli.py), Fastify (API), React Three Fiber (explorer), Vitest (tests)

**Spec:** `docs/specs/2026-04-13-brain-graphify-on-demand-design.md`

---

## File Structure

### New files (brain repo):
| File | Responsibility |
|------|---------------|
| `src/api/routes/graphify.ts` | POST /graphify route — validate, respond, spawn background work |
| `src/graph/community-drops.ts` | Parse graph JSON, generate community-level raw drops + sentinel |
| `src/cli/graphify.ts` | CLI entry point — resolve path, POST to daemon, print result |
| `tests/api/routes/graphify.test.ts` | Route validation tests |
| `tests/graph/community-drops.test.ts` | Community drop generation tests |

### Modified files (brain repo):
| File | Change |
|------|--------|
| `src/api/server.ts` | Register graphify route |
| `src/compiler/compile.ts` | Prompt branch for `source_type: graphify-community` |
| `src/compiler/queue.ts` | Sentinel completion check after each compile |
| `package.json` | Add `"graphify"` script |

### New files (MCP server):
| File | Change |
|------|--------|
| `~/.claude/mcp/brain/index.ts` | Add `brain_graphify` tool |

### Modified files (explorer repo):
| File | Change |
|------|--------|
| `src/lib/url-params.ts` | Add `readDepthParam()`, extend `readFocusParam()` for `project:` prefix |
| `src/lib/graph-data.ts` | Add `filterByNeighborhood()` BFS function |
| `src/components/GraphView.tsx` | Wire neighborhood filter on `?focus=project:X&depth=N` |

### New files (explorer repo):
| File | Responsibility |
|------|---------------|
| `src/lib/graph-data.test.ts` | Tests for `filterByNeighborhood()` |

### Slash command:
| File | Responsibility |
|------|---------------|
| `~/.claude/commands/graphify.md` | Claude Code slash command instructions |

---

## Task 1: Community Drop Generator (`src/graph/community-drops.ts`)

The pure function that parses a graphify graph JSON and produces community-level markdown drops. No I/O — takes parsed data, returns strings. This is the core logic everything else depends on.

**Files:**
- Create: `src/graph/community-drops.ts`
- Create: `tests/graph/community-drops.test.ts`

- [ ] **Step 1: Write failing test for `groupNodesByCommunity`**

```typescript
// tests/graph/community-drops.test.ts
import { describe, it, expect } from "vitest";
import { groupNodesByCommunity } from "../../src/graph/community-drops.js";

describe("groupNodesByCommunity", () => {
  it("groups nodes by community field", () => {
    const nodes = [
      { id: "a", label: "fileA.ts", community: 0, source_file: "src/a.ts" },
      { id: "b", label: "fileB.ts", community: 0, source_file: "src/b.ts" },
      { id: "c", label: "fileC.ts", community: 1, source_file: "src/c.ts" },
    ];
    const groups = groupNodesByCommunity(nodes);
    expect(groups.size).toBe(2);
    expect(groups.get(0)!.length).toBe(2);
    expect(groups.get(1)!.length).toBe(1);
  });

  it("handles nodes without community field", () => {
    const nodes = [
      { id: "a", label: "fileA.ts", source_file: "src/a.ts" },
    ];
    const groups = groupNodesByCommunity(nodes);
    expect(groups.get(-1)!.length).toBe(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/graph/community-drops.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `groupNodesByCommunity`**

```typescript
// src/graph/community-drops.ts

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

export function groupNodesByCommunity(
  nodes: GraphifyNode[],
): Map<number, GraphifyNode[]> {
  const groups = new Map<number, GraphifyNode[]>();
  for (const node of nodes) {
    const community = node.community ?? -1;
    if (!groups.has(community)) groups.set(community, []);
    groups.get(community)!.push(node);
  }
  return groups;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/graph/community-drops.test.ts`
Expected: PASS

- [ ] **Step 5: Write failing test for `generateCommunityDrop`**

```typescript
// tests/graph/community-drops.test.ts (append)
import { generateCommunityDrop } from "../../src/graph/community-drops.js";

describe("generateCommunityDrop", () => {
  const nodes: GraphifyNode[] = [
    { id: "a", label: "orchestrator.ts", community: 0, source_file: "src/agents/orchestrator.ts" },
    { id: "b", label: "ask.ts", community: 0, source_file: "src/api/ask.ts" },
  ];

  const edges: GraphifyEdge[] = [
    { source: "a", target: "b", relation: "calls" },
    { source: "a", target: "c", relation: "imports_from" },
  ];

  const allNodes: GraphifyNode[] = [
    ...nodes,
    { id: "c", label: "db.ts", community: 1, source_file: "src/db.ts" },
  ];

  it("generates markdown with frontmatter", () => {
    const drop = generateCommunityDrop("asknyc", 0, nodes, edges, allNodes);
    expect(drop).toContain("source_type: graphify-community");
    expect(drop).toContain("repo: asknyc");
    expect(drop).toContain("community_id: 0");
  });

  it("includes internal relationships", () => {
    const drop = generateCommunityDrop("asknyc", 0, nodes, edges, allNodes);
    expect(drop).toContain("## Internal relationships");
    expect(drop).toContain("orchestrator.ts");
    expect(drop).toContain("calls");
    expect(drop).toContain("ask.ts");
  });

  it("includes external dependencies", () => {
    const drop = generateCommunityDrop("asknyc", 0, nodes, edges, allNodes);
    expect(drop).toContain("## External dependencies");
    expect(drop).toContain("db.ts");
    expect(drop).toContain("Community 1");
  });
});
```

Add the import for `GraphifyNode` at the top of the test file.

- [ ] **Step 6: Run test to verify it fails**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/graph/community-drops.test.ts`
Expected: FAIL — function not defined

- [ ] **Step 7: Implement `generateCommunityDrop`**

```typescript
// src/graph/community-drops.ts (append)

export function generateCommunityDrop(
  repoName: string,
  communityId: number,
  communityNodes: GraphifyNode[],
  allEdges: GraphifyEdge[],
  allNodes: GraphifyNode[],
): string {
  const nodeIds = new Set(communityNodes.map((n) => n.id));
  const nodeMap = new Map(allNodes.map((n) => [n.id, n]));

  // Partition edges into internal and external
  const internal: GraphifyEdge[] = [];
  const external: GraphifyEdge[] = [];
  for (const edge of allEdges) {
    const srcIn = nodeIds.has(edge.source);
    const tgtIn = nodeIds.has(edge.target);
    if (srcIn && tgtIn) internal.push(edge);
    else if (srcIn || tgtIn) external.push(edge);
  }

  const now = new Date().toISOString();
  const frontmatter = [
    "---",
    "status: pending",
    "source_type: graphify-community",
    `repo: ${repoName}`,
    `community_id: ${communityId}`,
    `ingested_at: ${now}`,
    `parsed_at: ${now}`,
    "compiled_to: null",
    "processed_at: null",
    "retry_count: 0",
    "last_error: null",
    "compile_progress: null",
    "---",
  ].join("\n");

  const lines: string[] = [
    frontmatter,
    "",
    `# ${repoName} — Community ${communityId}`,
    "",
    "## Files in this cluster",
  ];

  // Sort by connection count (edges touching this node)
  const connectionCounts = new Map<string, number>();
  for (const e of allEdges) {
    if (nodeIds.has(e.source)) connectionCounts.set(e.source, (connectionCounts.get(e.source) ?? 0) + 1);
    if (nodeIds.has(e.target)) connectionCounts.set(e.target, (connectionCounts.get(e.target) ?? 0) + 1);
  }
  const sorted = [...communityNodes].sort(
    (a, b) => (connectionCounts.get(b.id) ?? 0) - (connectionCounts.get(a.id) ?? 0),
  );

  for (const node of sorted) {
    const count = connectionCounts.get(node.id) ?? 0;
    const file = node.source_file ?? node.label;
    lines.push(`- ${file} (${count} connections)`);
  }

  if (internal.length > 0) {
    lines.push("", "## Internal relationships");
    for (const edge of internal) {
      const src = nodeMap.get(edge.source);
      const tgt = nodeMap.get(edge.target);
      if (src && tgt) {
        lines.push(`- ${src.label} ${edge.relation ?? "links"} ${tgt.label}`);
      }
    }
  }

  if (external.length > 0) {
    lines.push("", "## External dependencies");
    for (const edge of external) {
      const src = nodeMap.get(edge.source);
      const tgt = nodeMap.get(edge.target);
      if (src && tgt) {
        const externalNode = nodeIds.has(edge.source) ? tgt : src;
        const internalNode = nodeIds.has(edge.source) ? src : tgt;
        const extCommunity = externalNode.community ?? -1;
        lines.push(
          `- ${internalNode.label} (Community ${communityId}) ${edge.relation ?? "links"} ${externalNode.label} (Community ${extCommunity})`,
        );
      }
    }
  }

  return lines.join("\n") + "\n";
}
```

- [ ] **Step 8: Run tests to verify all pass**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/graph/community-drops.test.ts`
Expected: PASS (all tests)

- [ ] **Step 9: Write failing test for `generateAllDrops`**

```typescript
// tests/graph/community-drops.test.ts (append)
import { generateAllDrops } from "../../src/graph/community-drops.js";

describe("generateAllDrops", () => {
  it("returns one drop per community plus architecture overview", () => {
    const graphJson = {
      nodes: [
        { id: "a", label: "a.ts", community: 0, source_file: "src/a.ts" },
        { id: "b", label: "b.ts", community: 1, source_file: "src/b.ts" },
      ],
      links: [{ source: "a", target: "b", relation: "calls" }],
    };
    const archMd = "# Architecture\nSome report content";
    const drops = generateAllDrops("myrepo", graphJson, archMd);

    expect(drops.communityDrops.length).toBe(2);
    expect(drops.architectureDrop).toContain("source_type: graphify-architecture");
    expect(drops.architectureDrop).toContain("repo: myrepo");
    expect(drops.sentinel.total_drops).toBe(3); // 2 communities + 1 architecture
    expect(drops.sentinel.repo).toBe("myrepo");
  });
});
```

- [ ] **Step 10: Implement `generateAllDrops`**

```typescript
// src/graph/community-drops.ts (append)

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

export function generateAllDrops(
  repoName: string,
  graphJson: GraphifyGraphJson,
  architectureMd: string,
): AllDrops {
  const groups = groupNodesByCommunity(graphJson.nodes);
  const communityDrops: Array<{ filename: string; content: string }> = [];

  for (const [communityId, nodes] of groups) {
    const content = generateCommunityDrop(
      repoName,
      communityId,
      nodes,
      graphJson.links,
      graphJson.nodes,
    );
    communityDrops.push({
      filename: `community-${communityId}.md`,
      content,
    });
  }

  const now = new Date().toISOString();
  const archFrontmatter = [
    "---",
    "status: pending",
    "source_type: graphify-architecture",
    `repo: ${repoName}`,
    `ingested_at: ${now}`,
    `parsed_at: ${now}`,
    "compiled_to: null",
    "processed_at: null",
    "retry_count: 0",
    "last_error: null",
    "compile_progress: null",
    "---",
  ].join("\n");

  const architectureDrop = `${archFrontmatter}\n\n${architectureMd}`;

  return {
    communityDrops,
    architectureDrop,
    sentinel: {
      total_drops: communityDrops.length + 1, // communities + architecture
      repo: repoName,
      created_at: now,
    },
  };
}
```

- [ ] **Step 11: Run all tests, verify pass**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/graph/community-drops.test.ts`
Expected: PASS (all tests)

- [ ] **Step 12: Commit**

```bash
cd /Users/rahilsinghi/Desktop/brain
git add src/graph/community-drops.ts tests/graph/community-drops.test.ts
git commit -m "feat(graph): community drop generator for graphify on-demand"
```

---

## Task 2: POST `/graphify` API Route

The Fastify route that validates the request, responds immediately with the deep link, then spawns the background extraction + drop generation.

**Files:**
- Create: `src/api/routes/graphify.ts`
- Create: `tests/api/routes/graphify.test.ts`
- Modify: `src/api/server.ts`

- [ ] **Step 1: Write failing test for route validation**

```typescript
// tests/api/routes/graphify.test.ts
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import Fastify from "fastify";
import type { FastifyInstance } from "fastify";
import { graphifyRoute } from "../../../src/api/routes/graphify.js";

describe("POST /graphify", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = Fastify();
    app.decorate("vaultRoot", "/tmp/test-vault");
    app.decorate("config", {
      graph: { umap_seed: 42, cache_path: "wiki/.graph-cache.json" },
      graphify: { output_dir: "raw/graphify" },
    });
    app.decorate("store", { listAll: async () => [] });
    app.decorate("synthesizeFn", async () => ({}));
    await app.register(graphifyRoute);
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns 400 for missing repo_path", async () => {
    const res = await app.inject({ method: "POST", url: "/graphify", payload: {} });
    expect(res.statusCode).toBe(400);
  });

  it("returns 400 for non-existent path", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/graphify",
      payload: { repo_path: "/nonexistent/path" },
    });
    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body).error).toContain("does not exist");
  });

  it("returns 202 for valid repo path", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/graphify",
      payload: { repo_path: "/tmp" }, // exists, won't have .git but we test separately
    });
    // Will either 202 or 400 depending on .git check — test the shape
    const body = JSON.parse(res.body);
    if (res.statusCode === 202) {
      expect(body.status).toBe("accepted");
      expect(body.repo_name).toBe("tmp");
      expect(body.deep_link).toContain("focus=project:tmp");
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/api/routes/graphify.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Implement the route**

```typescript
// src/api/routes/graphify.ts
import { existsSync } from "node:fs";
import { basename, join } from "node:path";
import type { FastifyInstance } from "fastify";
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";

interface GraphifyBody {
  repo_path: string;
  force?: boolean;
  depth?: number;
}

const graphifySchema = {
  body: {
    type: "object" as const,
    required: ["repo_path"],
    properties: {
      repo_path: { type: "string" as const },
      force: { type: "boolean" as const },
      depth: { type: "number" as const },
    },
  },
};

export async function graphifyRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: GraphifyBody }>(
    "/graphify",
    { schema: graphifySchema },
    async (request, reply) => {
      const { repo_path, force = false, depth = 2 } = request.body;

      // Validation
      if (!existsSync(repo_path)) {
        return reply.status(400).send({ error: `Path does not exist: ${repo_path}` });
      }
      if (!existsSync(join(repo_path, ".git"))) {
        return reply.status(400).send({ error: `Not a git repository: ${repo_path}` });
      }

      const repoName = basename(repo_path);
      const deepLink = `https://brain.rahilsinghi.com/?focus=project:${encodeURIComponent(repoName)}&depth=${depth}`;

      // Respond immediately
      reply.status(202).send({
        status: "accepted",
        repo_name: repoName,
        message: "Graph extraction started in background.",
        deep_link: deepLink,
      });

      // Background work — don't await, runs after response
      setImmediate(() => {
        runGraphifyBackground(app.vaultRoot, repo_path, repoName, force, app).catch(
          (err) => console.error(`[graphify] Background error for ${repoName}: ${err instanceof Error ? err.message : String(err)}`),
        );
      });
    },
  );
}

async function runGraphifyBackground(
  vaultRoot: string,
  repoPath: string,
  repoName: string,
  force: boolean,
  app: FastifyInstance,
): Promise<void> {
  const outputDir = join(vaultRoot, "raw", "graphify", repoName);
  mkdirSync(outputDir, { recursive: true });

  // Step 1: Run Python graphify CLI
  console.log(`[graphify] Extracting ${repoName}...`);
  const pythonPath = join(vaultRoot, "scripts/graphify/.venv/bin/python");
  const cliPath = join(vaultRoot, "scripts/graphify/graphify_cli.py");
  const args = [cliPath, "--repos", repoPath, "--output-dir", outputDir];
  if (!force) args.push("--incremental");

  const proc = Bun.spawn([pythonPath, ...args], {
    stdout: "pipe",
    stderr: "pipe",
    timeout: 300_000,
  });
  const exitCode = await proc.exited;
  if (exitCode !== 0) {
    const stderr = await new Response(proc.stderr).text();
    console.error(`[graphify] Python extraction failed for ${repoName}: ${stderr}`);
    return;
  }
  console.log(`[graphify] Extraction complete for ${repoName}.`);

  // Step 2: Parse graph JSON and generate community drops
  const graphJsonPath = join(outputDir, `${repoName}-graph.json`);
  const archMdPath = join(outputDir, `${repoName}-architecture.md`);

  if (!existsSync(graphJsonPath)) {
    console.error(`[graphify] No graph JSON found at ${graphJsonPath}`);
    return;
  }

  const { generateAllDrops } = await import("../../graph/community-drops.js");
  const graphJson = JSON.parse(readFileSync(graphJsonPath, "utf-8"));
  const archMd = existsSync(archMdPath) ? readFileSync(archMdPath, "utf-8") : `# ${repoName} Architecture\n\nNo architecture report generated.`;

  const drops = generateAllDrops(repoName, graphJson, archMd);

  // Step 3: Write community drops to raw/graphify/{repoName}/
  for (const drop of drops.communityDrops) {
    writeFileSync(join(outputDir, drop.filename), drop.content);
  }
  writeFileSync(join(outputDir, "architecture-overview.md"), drops.architectureDrop);
  writeFileSync(join(outputDir, ".sentinel"), JSON.stringify(drops.sentinel, null, 2));

  console.log(
    `[graphify] Wrote ${drops.communityDrops.length} community drops + architecture for ${repoName}. Sentinel: ${drops.sentinel.total_drops} total.`,
  );
}
```

- [ ] **Step 4: Register route in server.ts**

In `src/api/server.ts`, add:
```typescript
import { graphifyRoute } from "./routes/graphify.js";
```
and register it alongside the other routes:
```typescript
app.register(graphifyRoute);
```

- [ ] **Step 5: Run tests to verify pass**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/api/routes/graphify.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
cd /Users/rahilsinghi/Desktop/brain
git add src/api/routes/graphify.ts tests/api/routes/graphify.test.ts src/api/server.ts
git commit -m "feat(api): POST /graphify route with background extraction"
```

---

## Task 3: Compiler Prompt Branch for `graphify-community`

Add a conditional prompt in the compiler that gives Gemini special instructions for community articles — semantic naming and alias generation.

**Files:**
- Modify: `src/compiler/compile.ts`

- [ ] **Step 1: Read frontmatter source_type in compile.ts**

In `compileSinglePass`, after reading frontmatter, detect `source_type`:

```typescript
// In compileSinglePass, after reading frontmatter (around line where `content` is extracted)
const fm = readFrontmatter(rawFilePath);
const sourceType = fm.data?.source_type as string | undefined;
```

- [ ] **Step 2: Add prompt branch**

Replace the single prompt string with a conditional:

```typescript
const basePrompt = sourceType === "graphify-community"
  ? `You are synthesizing a code community cluster from the "${fm.data?.repo ?? "unknown"}" repository.

You MUST:
1. Invent a highly descriptive, semantic title based on the files and key symbols (e.g., "AskNYC Authentication Pipeline", NOT "AskNYC Community ${fm.data?.community_id ?? "??"}")
2. Include aliases: ["Community ${fm.data?.community_id ?? "??"}"] in your JSON output so cross-links from other articles resolve correctly
3. Reference external dependencies using [[Topic Name]] wikilink format
4. Set category to "projects"

Return a JSON object with these fields:
- title: Descriptive semantic title (NOT "Community N")
- summary: 2-3 sentence summary of this module's purpose
- concepts: Key architectural concepts as a markdown bullet list
- details: Detailed content as markdown explaining the module
- backlinks: Related topics as markdown links using [[Topic Name]] format.${titleListSection}
- tags: Array of lowercase tags including "${fm.data?.repo ?? "unknown"}"
- category: "projects"
- aliases: Array of alias strings for this community

Raw content:
${content}

Return ONLY valid JSON, no markdown code fences.`
  : `You are a knowledge compiler. Given the following raw content, produce a structured wiki article.

Return a JSON object with these fields:
- title: A clear, concise title for the wiki article
- summary: 2-3 sentence summary
- concepts: Key concepts as a markdown bullet list
- details: Detailed content as markdown
- backlinks: Related topics as markdown links using [[Topic Name]] format.${titleListSection}
- tags: Array of lowercase tags
- category: One of "concepts", "projects", "people", or "decisions"

Raw content:
${content}

Return ONLY valid JSON, no markdown code fences.`;
```

- [ ] **Step 3: Handle `aliases` in LLM output**

After parsing the LLM JSON response, check for `aliases` and include them in the wiki frontmatter:

```typescript
// After parsing the LLM response JSON
const aliases = parsed.aliases as string[] | undefined;

// When writing wiki frontmatter, add aliases if present
const wikiFm: Record<string, unknown> = {
  title: parsed.title,
  author: "ai",
  created_at: now,
  // ... existing fields ...
};
if (aliases && aliases.length > 0) {
  wikiFm.aliases = aliases;
}
```

- [ ] **Step 4: Run existing compiler tests to verify no regression**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/compiler/`
Expected: PASS (all existing tests)

- [ ] **Step 5: Commit**

```bash
cd /Users/rahilsinghi/Desktop/brain
git add src/compiler/compile.ts
git commit -m "feat(compiler): prompt branch for graphify-community source type"
```

---

## Task 4: Sentinel Completion Check in Queue

After each compile or quarantine, check if a sentinel file exists for that repo and trigger graph rebuild when all drops are processed.

**Files:**
- Modify: `src/compiler/queue.ts`

- [ ] **Step 1: Add sentinel check function**

```typescript
// src/compiler/queue.ts — add near the top, after imports
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";

interface SentinelData {
  total_drops: number;
  repo: string;
  created_at: string;
}

function checkSentinelCompletion(
  rawFilePath: string,
  vaultRoot: string,
): SentinelData | null {
  // Only check for files in raw/graphify/{repoName}/
  const dir = dirname(rawFilePath);
  if (!dir.includes(join("raw", "graphify"))) return null;

  const sentinelPath = join(dir, ".sentinel");
  if (!existsSync(sentinelPath)) return null;

  const sentinel: SentinelData = JSON.parse(readFileSync(sentinelPath, "utf-8"));

  // Count processed files in this directory (compiled or quarantined)
  const files = readdirSync(dir).filter(
    (f) => f.endsWith(".md") && !f.startsWith("."),
  );
  let processedCount = 0;
  for (const file of files) {
    const filePath = join(dir, file);
    try {
      const content = readFileSync(filePath, "utf-8");
      const statusMatch = content.match(/^status:\s*(processed|failed)/m);
      if (statusMatch) processedCount++;
    } catch {
      // skip unreadable files
    }
  }

  if (processedCount >= sentinel.total_drops) return sentinel;
  return null;
}
```

- [ ] **Step 2: Call sentinel check after each compile in processQueue**

In the `processQueue` function, after updating `result.processed++` or `result.quarantined++`, add:

```typescript
// After processing each file (success or quarantine), check sentinel
const completedSentinel = checkSentinelCompletion(filePath, vaultRoot);
if (completedSentinel) {
  console.log(`[graphify] All ${completedSentinel.total_drops} drops processed for ${completedSentinel.repo}. Triggering graph rebuild...`);
  // Import and trigger rebuild asynchronously — don't block the queue
  setImmediate(async () => {
    try {
      const { rebuildGraphCache } = await import("../graph/cache.js");
      const { aggregateEmbeddings } = await import("../graph/embeddings.js");
      const { pushGraphToRepo } = await import("../graph/push.js");
      const { VectorStore } = await import("../embedder/vector-store.js");
      const { loadConfig } = await import("../config.js");

      const config = loadConfig(vaultRoot);
      const store = new VectorStore(join(vaultRoot, ".lancedb"));
      await store.init();
      const allChunks = await store.listAll();
      const embeddings = aggregateEmbeddings(allChunks);
      const cachePath = join(vaultRoot, config.graph.cache_path);
      const graphifyDir = join(vaultRoot, config.graphify?.output_dir ?? "raw/graphify");
      const cache = await rebuildGraphCache(vaultRoot, cachePath, embeddings, config.graph.umap_seed, graphifyDir);
      const repoPath = config.graph.explorer_repo_path.replace(/^~/, process.env.HOME ?? "");
      await pushGraphToRepo(cache, repoPath);
      console.log(`[graphify] Graph rebuilt and pushed for ${completedSentinel.repo}.`);
    } catch (err) {
      console.error(`[graphify] Graph rebuild failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  });
}
```

- [ ] **Step 3: Run existing queue tests to verify no regression**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/compiler/`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
cd /Users/rahilsinghi/Desktop/brain
git add src/compiler/queue.ts
git commit -m "feat(compiler): sentinel-based graph rebuild after graphify batch"
```

---

## Task 5: CLI Entry Point (`src/cli/graphify.ts`)

The thin shell CLI that resolves the path, POSTs to the daemon, and prints the result.

**Files:**
- Create: `src/cli/graphify.ts`
- Modify: `package.json`

- [ ] **Step 1: Write the CLI**

```typescript
// src/cli/graphify.ts
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const DAEMON_URL = "http://127.0.0.1:3577";
const TIMEOUT_MS = 2000;

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const pathArg = args.find((a) => !a.startsWith("--")) ?? ".";
  const repoPath = resolve(pathArg);

  // Validate git repo
  try {
    execSync(`git -C "${repoPath}" rev-parse --git-dir`, { stdio: "pipe" });
  } catch {
    console.error(`\u2716 Not a git repository: ${repoPath}`);
    process.exit(1);
  }

  // POST to daemon
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(`${DAEMON_URL}/graphify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo_path: repoPath, force }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: res.statusText }));
      console.error(`\u2716 ${(body as { error: string }).error}`);
      process.exit(1);
    }

    const data = (await res.json()) as {
      repo_name: string;
      deep_link: string;
      message: string;
    };
    console.log(`\u2713 Graph extraction started for ${data.repo_name}`);
    console.log(`  View: ${data.deep_link}`);

    // Open in browser on macOS
    try {
      execSync(`open "${data.deep_link}"`, { stdio: "pipe" });
    } catch {
      // Not on macOS or open failed — ignore
    }
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      console.error(
        "\u2716 Brain daemon is not responding on port 3577. Is it running?",
      );
      console.error(
        "  Try: launchctl start com.rahilsinghi.brain-daemon",
      );
    } else {
      console.error(
        `\u2716 Connection failed: ${err instanceof Error ? err.message : String(err)}`,
      );
      console.error(
        "  Try: launchctl start com.rahilsinghi.brain-daemon",
      );
    }
    process.exit(1);
  }
}

main();
```

- [ ] **Step 2: Add package.json script**

In `package.json`, add to `"scripts"`:
```json
"graphify": "bun run src/cli/graphify.ts"
```

- [ ] **Step 3: Test manually**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm graphify .`
Expected: Either `✓ Graph extraction started for brain` (if daemon running) or `✖ Brain daemon is not responding` (if not)

- [ ] **Step 4: Commit**

```bash
cd /Users/rahilsinghi/Desktop/brain
git add src/cli/graphify.ts package.json
git commit -m "feat(cli): brain graphify command — thin shell to daemon"
```

---

## Task 6: MCP Tool (`brain_graphify`)

Add the `brain_graphify` tool to the existing MCP server.

**Files:**
- Modify: `~/.claude/mcp/brain/index.ts`

- [ ] **Step 1: Add the tool**

After the existing `brain_ingest` tool registration in `index.ts`, add:

```typescript
server.tool(
  "brain_graphify",
  "Map a code repository into the brain knowledge graph. Extracts AST-based code structure, generates community-level wiki articles, and connects to the 3D graph visualization. Returns a deep-link URL.",
  {
    repo_path: { type: "string", description: "Absolute path to the repository to graphify" },
    force: { type: "boolean", description: "Force full re-extraction, skip incremental cache" },
  },
  async ({ repo_path, force }) => {
    try {
      const res = await fetch(`${BRAIN_API}/graphify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo_path, force: force ?? false }),
        signal: AbortSignal.timeout(5000),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: res.statusText }));
        return {
          content: [{ type: "text" as const, text: `Error: ${(body as { error: string }).error}` }],
          isError: true,
        };
      }

      const data = (await res.json()) as {
        repo_name: string;
        deep_link: string;
        message: string;
      };

      return {
        content: [
          {
            type: "text" as const,
            text: `Graph extraction started for **${data.repo_name}**.\n\n${data.message}\n\nView: ${data.deep_link}`,
          },
        ],
      };
    } catch {
      return {
        content: [
          {
            type: "text" as const,
            text: "Brain daemon is not responding on port 3577. Is it running?\nTry: launchctl start com.rahilsinghi.brain-daemon",
          },
        ],
        isError: true,
      };
    }
  },
);
```

- [ ] **Step 2: Verify MCP server starts**

Run: `cd ~/.claude/mcp/brain && npx tsx index.ts` (should start without errors, Ctrl+C to stop)

- [ ] **Step 3: Commit**

```bash
cd ~/dotfiles/claude/mcp/brain
git add index.ts
git commit -m "feat(mcp): add brain_graphify tool"
```

---

## Task 7: Slash Command (`/graphify`)

Claude Code custom skill that invokes the MCP tool.

**Files:**
- Create: `~/.claude/commands/graphify.md`

- [ ] **Step 1: Write the slash command**

```markdown
# /graphify

Map the current repository into the brain knowledge graph.

When the user invokes /graphify:

1. Run `git rev-parse --show-toplevel` to find the repo root (use Bash tool)
2. Call the `brain_graphify` MCP tool with the absolute repo root path
3. Print the deep-link URL returned by the tool
4. Give a one-sentence summary of what to expect based on the repo name
```

- [ ] **Step 2: Commit**

```bash
cd ~/dotfiles/claude
git add commands/graphify.md
git commit -m "feat: /graphify slash command for Claude Code"
```

---

## Task 8: Explorer — N-Degree Neighborhood Filter

Add BFS-based neighborhood filtering to the brain-explorer frontend, driven by URL params.

**Files:**
- Modify: `~/Desktop/brain-explorer/src/lib/url-params.ts`
- Modify: `~/Desktop/brain-explorer/src/lib/graph-data.ts`
- Create: `~/Desktop/brain-explorer/src/lib/graph-data.test.ts`
- Modify: `~/Desktop/brain-explorer/src/components/GraphView.tsx`

- [ ] **Step 1: Write failing test for `filterByNeighborhood`**

```typescript
// src/lib/graph-data.test.ts
import { describe, it, expect } from "vitest";
import { filterByNeighborhood } from "./graph-data";
import type { GraphNode, GraphLink } from "./types";

function makeNode(id: string, repo?: string): GraphNode {
  return {
    id, title: id, tags: [], category: "projects", source_type: "test",
    created_at: "", connection_count: 1, x: 0, y: 0, z: 0, repo,
  };
}

describe("filterByNeighborhood", () => {
  const nodes: GraphNode[] = [
    makeNode("a", "myrepo"),
    makeNode("b", "myrepo"),
    makeNode("c"),          // neighbor of b
    makeNode("d"),          // neighbor of c (depth 2)
    makeNode("e"),          // disconnected
  ];

  const links: GraphLink[] = [
    { source: "a", target: "b" },
    { source: "b", target: "c" },
    { source: "c", target: "d" },
  ];

  it("filters to project seed nodes at depth 0", () => {
    const result = filterByNeighborhood(nodes, links, "project:myrepo", 0);
    expect(result.nodes.map(n => n.id).sort()).toEqual(["a", "b"]);
    expect(result.links.length).toBe(1); // a-b only
  });

  it("includes depth-1 neighbors", () => {
    const result = filterByNeighborhood(nodes, links, "project:myrepo", 1);
    expect(result.nodes.map(n => n.id).sort()).toEqual(["a", "b", "c"]);
    expect(result.links.length).toBe(2); // a-b, b-c
  });

  it("includes depth-2 neighbors", () => {
    const result = filterByNeighborhood(nodes, links, "project:myrepo", 2);
    expect(result.nodes.map(n => n.id).sort()).toEqual(["a", "b", "c", "d"]);
    expect(result.links.length).toBe(3);
  });

  it("excludes disconnected nodes", () => {
    const result = filterByNeighborhood(nodes, links, "project:myrepo", 10);
    expect(result.nodes.map(n => n.id)).not.toContain("e");
  });

  it("filters edges to only valid endpoints", () => {
    const result = filterByNeighborhood(nodes, links, "project:myrepo", 0);
    for (const link of result.links) {
      const ids = result.nodes.map(n => n.id);
      expect(ids).toContain(link.source);
      expect(ids).toContain(link.target);
    }
  });

  it("returns all nodes when focus is unknown", () => {
    const result = filterByNeighborhood(nodes, links, "project:nonexistent", 2);
    expect(result.nodes.length).toBe(nodes.length);
  });

  it("handles direct node ID focus", () => {
    const result = filterByNeighborhood(nodes, links, "c", 1);
    expect(result.nodes.map(n => n.id).sort()).toEqual(["b", "c", "d"]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd ~/Desktop/brain-explorer && pnpm vitest run src/lib/graph-data.test.ts`
Expected: FAIL — function not exported

- [ ] **Step 3: Implement `filterByNeighborhood`**

```typescript
// src/lib/graph-data.ts (append to existing file)

export function filterByNeighborhood(
  nodes: GraphNode[],
  links: GraphLink[],
  focus: string,
  depth: number,
): { nodes: GraphNode[]; links: GraphLink[] } {
  // Find seed nodes
  let seedIds: Set<string>;

  if (focus.startsWith("project:")) {
    const projectName = focus.slice("project:".length);
    seedIds = new Set(
      nodes.filter((n) => n.repo === projectName).map((n) => n.id),
    );
  } else {
    // Direct node ID
    seedIds = new Set(
      nodes.filter((n) => n.id === focus).map((n) => n.id),
    );
  }

  // If no seeds found, return everything (graceful degradation)
  if (seedIds.size === 0) {
    return { nodes, links };
  }

  // BFS traversal
  const neighborMap = buildNeighborMap(links);
  const visited = new Set<string>(seedIds);
  let frontier = new Set<string>(seedIds);

  for (let d = 0; d < depth; d++) {
    const nextFrontier = new Set<string>();
    for (const nodeId of frontier) {
      const neighbors = neighborMap.get(nodeId);
      if (!neighbors) continue;
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          nextFrontier.add(neighbor);
        }
      }
    }
    frontier = nextFrontier;
    if (frontier.size === 0) break;
  }

  // Filter nodes and edges
  const filteredNodes = nodes.filter((n) => visited.has(n.id));
  const filteredLinks = links.filter(
    (l) => visited.has(l.source) && visited.has(l.target),
  );

  return { nodes: filteredNodes, links: filteredLinks };
}
```

- [ ] **Step 4: Run tests to verify pass**

Run: `cd ~/Desktop/brain-explorer && pnpm vitest run src/lib/graph-data.test.ts`
Expected: PASS

- [ ] **Step 5: Add `readDepthParam` to url-params.ts**

```typescript
// src/lib/url-params.ts (append)

export function readDepthParam(): number {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("depth");
  if (raw === null) return 2; // default
  const num = parseInt(raw, 10);
  return Number.isNaN(num) || num < 0 ? 2 : num;
}
```

- [ ] **Step 6: Wire neighborhood filter in GraphView.tsx**

In `GraphView.tsx`, after the existing `filterByLayer` call, add the neighborhood filter:

```typescript
// After filterByLayer produces { nodes: layerNodes, links: layerLinks }
import { filterByNeighborhood } from "../lib/graph-data";
import { readDepthParam } from "../lib/url-params";

// Inside the component, after layer filtering:
const focusParam = readFocusParam();
const depthParam = readDepthParam();

let displayNodes = layerNodes;
let displayLinks = layerLinks;

if (focusParam && focusParam.startsWith("project:")) {
  const neighborhood = filterByNeighborhood(layerNodes, layerLinks, focusParam, depthParam);
  displayNodes = neighborhood.nodes;
  displayLinks = neighborhood.links;
}

// Pass displayNodes and displayLinks to SphereConsumer instead of layerNodes/layerLinks
```

- [ ] **Step 7: Add camera auto-focus for neighborhood view**

In the camera controller or GraphView, after the graph settles with the filtered neighborhood:

```typescript
// When focus is a project neighborhood, auto-zoom to fit filtered nodes
useEffect(() => {
  if (!focusParam?.startsWith("project:")) return;
  // Wait for sphere layout to settle, then zoom to fit
  const timer = setTimeout(() => {
    // Compute bounding sphere of filtered nodes and animate camera
    if (displayNodes.length > 0) {
      // Camera animation to center of filtered nodes
      const cx = displayNodes.reduce((s, n) => s + n.x, 0) / displayNodes.length;
      const cy = displayNodes.reduce((s, n) => s + n.y, 0) / displayNodes.length;
      const cz = displayNodes.reduce((s, n) => s + n.z, 0) / displayNodes.length;
      // Use existing camera animation hook to fly to this center
    }
  }, 1000);
  return () => clearTimeout(timer);
}, [focusParam, displayNodes]);
```

- [ ] **Step 8: Run all explorer tests**

Run: `cd ~/Desktop/brain-explorer && pnpm vitest run`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/lib/graph-data.ts src/lib/graph-data.test.ts src/lib/url-params.ts src/components/GraphView.tsx
git commit -m "feat: N-degree neighborhood filtering via URL params"
```

---

## Task 9: Integration Test — End to End

Manual integration test to verify the full pipeline works.

**Files:** None (manual testing)

- [ ] **Step 1: Ensure daemon is running**

Run: `launchctl list com.rahilsinghi.brain-daemon | grep PID`
Expected: PID present

- [ ] **Step 2: Test CLI against a small repo**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm graphify ~/Desktop/portfolio`
Expected: `✓ Graph extraction started for portfolio` + deep link printed + browser opens

- [ ] **Step 3: Monitor daemon logs for extraction**

Run: `tail -f /tmp/brain-daemon.stdout.log`
Expected: See `[graphify] Extracting portfolio...` → `[graphify] Extraction complete` → `[graphify] Wrote N community drops`

- [ ] **Step 4: Wait for compilation (~5-10 min) and verify graph rebuild**

Watch logs for: `[graphify] All N drops processed for portfolio. Triggering graph rebuild...` → `[graphify] Graph rebuilt and pushed for portfolio.`

- [ ] **Step 5: Verify deep link works**

Open: `https://brain.rahilsinghi.com/?focus=project:portfolio&depth=2`
Expected: 3D graph showing only portfolio-related nodes and their neighbors

- [ ] **Step 6: Test MCP tool**

In a Claude Code session, type: `graphify the portfolio repo at ~/Desktop/portfolio`
Expected: Claude calls `brain_graphify`, returns deep link

- [ ] **Step 7: Verify wiki articles in Obsidian**

Open Obsidian vault at `~/Desktop/brain/wiki/`
Expected: New articles under `wiki/projects/` with semantic titles like "Portfolio Component Architecture" (not "Portfolio Community 0")
