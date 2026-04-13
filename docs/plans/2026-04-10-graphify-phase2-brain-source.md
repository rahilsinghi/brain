# Graphify Phase 2 — Brain Source + Wiki Articles

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the forked Graphify CLI into Brain as a `SyncSource`, producing raw drops that compile into `wiki/code-architecture/` articles. Graphify joins the hourly cron alongside GitHub, git-commits, and Gmail.

**Architecture:** New `src/sources/graphify.ts` implements `SyncSource`. Shells out to `scripts/graphify/.venv/bin/python graphify_cli.py` via `execFileSync`. Output drops land in `raw/graphify/{repo}/`, flow through the existing chokidar watcher and compile pipeline, and emerge as wiki articles.

**Spec:** `docs/specs/2026-04-10-brain-graphify-fusion-design.md` — Sections 5.1-5.3, 10

**Assumes Phase 1 is complete:** The fork exists at `scripts/graphify/`, `graphify_cli.py` is runnable, `.venv` is set up.

**Important:** The spec's `poll()` returns `RawDrop[]` directly, but the actual `SyncSource` interface requires `poll(state: SourceSyncState): Promise<SyncResult>` returning `{ newItems: RawDrop[], processedIds: string[] }`. The implementation adapts to match the existing interface.

---

### Task 1: Add `GraphifyConfig` to types and config defaults

**Files:**
- Modify: `src/types.ts`

- [ ] **Step 1: Add `GraphifyConfig` interface to `src/types.ts`**

```typescript
export interface GraphifyConfig {
  repos: string[];
  semantic: boolean;
  cron_schedule: string;
  max_nodes_per_repo: number;
  output_dir: string;
}
```

Add `graphify?: GraphifyConfig` to the `BrainConfig` interface.

- [ ] **Step 2: Add `"graphify"` to `SourceType` union in `src/types.ts`**

```typescript
export type SourceType =
  | "file_drop" | "markpush" | "github" | "gmail"
  | "calendar" | "voice" | "conversation" | "auto_research"
  | "seed_yaml" | "seed_csv" | "api" | "git-commits"
  | "graphify";
```

- [ ] **Step 3: Verify — no config.ts changes needed**

`graphify` is optional on `BrainConfig`. The existing `deepMerge` + `parseYaml` in `loadConfig()` handles optional top-level keys from `.brain/config.yaml` automatically.

- [ ] **Step 4: Run existing tests**

```bash
pnpm vitest run tests/config.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/types.ts
git commit -m "feat(graphify): add GraphifyConfig type and graphify SourceType"
```

---

### Task 2: Write failing tests for graphify source (TDD)

**Files:**
- Create: `tests/sources/graphify.test.ts`

- [ ] **Step 1: Write the test file**

Tests should cover:
1. Returns empty drops when no repos configured
2. Returns empty drops when repo paths don't exist
3. Collects architecture report as a RawDrop (mock `execFileSync`, pre-create output)
4. Collects file-summary drops from summaries directory
5. Returns empty drops when CLI fails (mock throws)
6. Has name set to `"graphify"`

Use `vi.spyOn(cp, "execFileSync").mockImplementation(...)` to mock the subprocess. Pre-create output files to test the collection logic independently.

RawDrop fields should use `filename`, `content`, and `sourceId` (matching the actual `SyncSource` interface in `src/sources/types.ts`), NOT `slug`/`source_type`/`metadata` as shown in the spec.

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run tests/sources/graphify.test.ts
```

Expected: FAIL — cannot find module `../../src/sources/graphify.js`

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/sources/graphify.test.ts
git commit -m "test(graphify): add failing tests for graphify SyncSource"
```

---

### Task 3: Implement `src/sources/graphify.ts`

**Files:**
- Create: `src/sources/graphify.ts`

- [ ] **Step 1: Implement the source**

Key implementation details:
- Uses persistent venv: `scripts/graphify/.venv/bin/python` (not inline `uv run --with`)
- `poll(state: SourceSyncState): Promise<SyncResult>` — matches existing interface
- Returns `{ newItems: RawDrop[], processedIds: string[] }`
- `RawDrop` uses `filename`, `content`, `sourceId` fields
- Source IDs: `graphify:{repo}:architecture` and `graphify:{repo}:{file-slug}`
- Per-repo try-catch around output collection (one bad repo doesn't kill the batch)
- 5-minute timeout on subprocess

```typescript
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import type { SyncSource, SyncResult, RawDrop, SourceSyncState } from "./types.js";
import type { GraphifyConfig } from "../types.js";

export function createGraphifySource(
  vaultRoot: string,
  config: GraphifyConfig,
): SyncSource {
  return {
    name: "graphify",

    async poll(_state: SourceSyncState): Promise<SyncResult> {
      const outputDir = join(vaultRoot, config.output_dir);
      const graphifyCliPath = join(vaultRoot, "scripts", "graphify", "graphify_cli.py");
      const venvPython = join(vaultRoot, "scripts", "graphify", ".venv", "bin", "python");

      const repos = config.repos.map(r =>
        r.startsWith("~") ? r.replace("~", process.env.HOME ?? "") : r,
      );
      const validRepos = repos.filter(r => existsSync(r));
      if (validRepos.length === 0) return { newItems: [], processedIds: [] };

      const args = [graphifyCliPath, "--repos", ...validRepos, "--output-dir", outputDir, "--incremental"];
      if (config.semantic) args.push("--semantic");
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (config.semantic && apiKey) args.push("--anthropic-key", apiKey);

      try {
        execFileSync(venvPython, args, {
          timeout: 300_000,
          stdio: ["pipe", "pipe", "pipe"],
          env: { ...process.env },
        });
      } catch (err) {
        console.error(`[graphify] CLI failed: ${err instanceof Error ? err.message : String(err)}`);
        return { newItems: [], processedIds: [] };
      }

      const drops: RawDrop[] = [];
      const processedIds: string[] = [];

      for (const repoPath of validRepos) {
        const repoName = basename(repoPath);
        try {
          const repoOut = join(outputDir, repoName);
          if (!existsSync(repoOut)) continue;

          const reportPath = join(repoOut, `${repoName}-architecture.md`);
          if (existsSync(reportPath)) {
            const sourceId = `graphify:${repoName}:architecture`;
            drops.push({ filename: `graphify/${repoName}/${repoName}-architecture.md`, content: readFileSync(reportPath, "utf8"), sourceId });
            processedIds.push(sourceId);
          }

          const summariesDir = join(repoOut, "file-summaries");
          if (existsSync(summariesDir)) {
            for (const file of readdirSync(summariesDir)) {
              if (!file.endsWith(".md")) continue;
              const slug = basename(file, ".md");
              const sourceId = `graphify:${repoName}:${slug}`;
              drops.push({ filename: `graphify/${repoName}/file-summaries/${file}`, content: readFileSync(join(summariesDir, file), "utf8"), sourceId });
              processedIds.push(sourceId);
            }
          }
        } catch (err) {
          console.error(`[graphify] Failed to collect output for ${repoName}: ${err instanceof Error ? err.message : String(err)}`);
        }
      }

      return { newItems: drops, processedIds };
    },
  };
}
```

- [ ] **Step 2: Run the tests**

```bash
pnpm vitest run tests/sources/graphify.test.ts
```

- [ ] **Step 3: Run full test suite**

```bash
pnpm vitest run
```

- [ ] **Step 4: Commit**

```bash
git add src/sources/graphify.ts
git commit -m "feat(graphify): implement SyncSource that shells out to graphify CLI"
```

---

### Task 4: Wire graphify into hourly cron in `src/index.ts`

**Files:**
- Modify: `src/index.ts`

- [ ] **Step 1: Add the import**

```typescript
import { createGraphifySource } from "./sources/graphify.js";
```

- [ ] **Step 2: Add graphify to the `mcp_sources` cron handler**

After the `if (gmail) sources.push(gmail);` block:

```typescript
if (config.graphify?.repos?.length) {
  const graphifySource = createGraphifySource(vaultRoot, config.graphify);
  sources.push(graphifySource);
}
```

- [ ] **Step 3: Add graphify to log output**

Add `graphifyIngested` extraction and update the console.log and `appendDailyEntry` messages. Add graphify error logging.

- [ ] **Step 4: Run full test suite**

```bash
pnpm vitest run
```

- [ ] **Step 5: Commit**

```bash
git add src/index.ts
git commit -m "feat(graphify): wire graphify source into hourly cron"
```

---

### Task 5: Add graphify config to `.brain/config.yaml`

**Files:**
- Modify: `.brain/config.yaml`

- [ ] **Step 1: Add graphify section**

```yaml
graphify:
  repos:
    - ~/Desktop/karen
    - ~/Desktop/brain
    - ~/Desktop/portfolio
    - ~/Desktop/ouroboros
  semantic: false
  cron_schedule: "0 * * * *"
  max_nodes_per_repo: 2000
  output_dir: "raw/graphify"
```

- [ ] **Step 2: Verify config loads**

```bash
bun -e "
  import { loadConfig } from './src/config.js';
  import { resolve } from 'path';
  const config = loadConfig(resolve('.'));
  console.log('graphify config:', JSON.stringify(config.graphify, null, 2));
"
```

- [ ] **Step 3: Commit**

```bash
git add .brain/config.yaml
git commit -m "config: add graphify section with 4 personal repos"
```

---

### Task 6: Integration test — manual end-to-end verify

- [ ] **Step 1: Run graphify source standalone**

```bash
bun -e "
  import { createGraphifySource } from './src/sources/graphify.js';
  import { resolve } from 'path';
  const source = createGraphifySource(resolve('.'), {
    repos: ['~/Desktop/karen'], semantic: false,
    cron_schedule: '0 * * * *', max_nodes_per_repo: 2000, output_dir: 'raw/graphify',
  });
  const result = await source.poll({ last_poll: null, processed_ids: [] });
  console.log('Drops:', result.newItems.length);
  for (const d of result.newItems.slice(0, 3)) console.log(' -', d.filename, '(' + d.content.length + ' chars)');
"
```

- [ ] **Step 2: Verify chokidar picks up raw drops**

```bash
ls -la raw/graphify/karen/
```

- [ ] **Step 3: Verify compile pipeline processes architecture report**

After daemon processes the drop, check:

```bash
ls wiki/code-architecture/
```

Expected: `karen.md` or similar with wiki frontmatter.

- [ ] **Step 4: Run full test suite**

```bash
pnpm vitest run
```

---

## Summary

| Task | Files | Tests | Time Est. |
|------|-------|-------|-----------|
| 1. Types + config | `src/types.ts` | Existing | 3 min |
| 2. Failing tests (TDD) | `tests/sources/graphify.test.ts` | 6 new | 5 min |
| 3. Implement source | `src/sources/graphify.ts` | Pass | 5 min |
| 4. Cron wiring | `src/index.ts` | Runtime | 3 min |
| 5. Config YAML | `.brain/config.yaml` | Manual | 2 min |
| 6. Integration test | None | Manual E2E | 5 min |
| **Total** | **3 created, 3 modified** | **6 new** | **~23 min** |

**Next:** Phase 3 — Graph cache merge (URI node IDs, cross-layer edges, god-node detection).
