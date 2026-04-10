# Wikilink Resolution & Graph Density Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve 0-edge graph by adding title-based wikilink resolution, enhancing the compile prompt with existing article titles, and backfilling broken links across ~1,000 wiki articles.

**Architecture:** Three independent changes: (1) extend scan-wiki.ts resolution chain with titleToId + slugToId maps, (2) inject top-500 article titles into the compile prompt so the LLM links to real articles, (3) one-time backfill script that rewrites broken `[[Title]]` links to match actual article titles.

**Tech Stack:** TypeScript (strict), Vitest, Bun runtime, existing frontmatter/scan-wiki utilities.

**Spec:** `docs/superpowers/specs/2026-04-10-wikilink-resolution-design.md`

---

## File Structure

| File | Role |
|------|------|
| `src/graph/scan-wiki.ts` | Modify: add titleToId + slugToId maps, extend resolution chain |
| `src/compiler/compile.ts` | Modify: add `getExistingTitles()`, inject into LLM prompt |
| `src/graph/backfill-links.ts` | Create: one-time wikilink rewriter with --dry-run |
| `package.json` | Modify: add `backfill-links` script |
| `tests/graph/scan-wiki.test.ts` | Modify: add title/slug resolution + case insensitivity tests |
| `tests/compiler/compile.test.ts` | Modify: add title list injection test |
| `tests/graph/backfill-links.test.ts` | Create: backfill script tests |

---

### Task 1: Title-based resolution in scan-wiki.ts — failing tests

**Files:**
- Modify: `tests/graph/scan-wiki.test.ts`

- [ ] **Step 1: Write failing test — title-based resolution**

Add to the existing `describe("scanWiki")` block in `tests/graph/scan-wiki.test.ts`:

```typescript
it("resolves wikilinks by article title (case-insensitive)", () => {
  writeArticle(
    "concepts",
    "zustand-graph-state-store",
    "Zustand Graph State Store",
    [],
    "# Zustand\n\nA state library.",
  );
  writeArticle(
    "projects",
    "brain-explorer",
    "Brain Explorer",
    [],
    '# Brain Explorer\n\nUses [[Zustand Graph State Store]].',
  );

  const result = scanWiki(TEST_VAULT);
  expect(result.links).toContainEqual({
    source: "projects/brain-explorer.md",
    target: "concepts/zustand-graph-state-store.md",
  });
});
```

- [ ] **Step 2: Write failing test — case-insensitive title resolution**

```typescript
it("resolves wikilinks case-insensitively", () => {
  writeArticle(
    "projects",
    "karen",
    "Karen Project",
    [],
    "# Karen\n\nA project.",
  );
  writeArticle(
    "concepts",
    "escalation",
    "Escalation Ladder",
    [],
    "# Escalation\n\nUsed by [[karen project]].",
  );

  const result = scanWiki(TEST_VAULT);
  expect(result.links).toContainEqual({
    source: "concepts/escalation.md",
    target: "projects/karen.md",
  });
});
```

- [ ] **Step 3: Write failing test — slug-based fallback**

```typescript
it("resolves wikilinks via slugified title fallback", () => {
  writeArticle(
    "concepts",
    "zustand-graph-state-store",
    "Zustand Graph State Store",
    [],
    "# Zustand\n\nA state library.",
  );
  writeArticle(
    "projects",
    "brain-explorer",
    "Brain Explorer",
    [],
    "# Brain Explorer\n\nUses [[zustand-graph-state-store]].",
  );

  const result = scanWiki(TEST_VAULT);
  expect(result.links).toContainEqual({
    source: "projects/brain-explorer.md",
    target: "concepts/zustand-graph-state-store.md",
  });
});
```

- [ ] **Step 4: Write failing test — duplicate title first-match-wins**

```typescript
it("uses first-match-wins for duplicate titles", () => {
  writeArticle(
    "concepts",
    "aaa-zustand",
    "Zustand",
    [],
    "# Zustand\n\nFirst article.",
  );
  writeArticle(
    "projects",
    "zzz-zustand",
    "Zustand",
    [],
    "# Zustand\n\nSecond article.",
  );
  writeArticle(
    "projects",
    "brain-explorer",
    "Brain Explorer",
    [],
    "# Brain Explorer\n\nUses [[Zustand]].",
  );

  const result = scanWiki(TEST_VAULT);
  // "concepts" comes before "projects" alphabetically in directory walk
  expect(result.links).toContainEqual({
    source: "projects/brain-explorer.md",
    target: "concepts/aaa-zustand.md",
  });
});
```

- [ ] **Step 5: Write failing test — existing resolution still works**

```typescript
it("prefers path-based and filename-based resolution over title", () => {
  writeArticle(
    "skills",
    "typescript",
    "TypeScript Language",
    [],
    "# TypeScript",
  );
  writeArticle(
    "projects",
    "karen",
    "Karen",
    [],
    "# Karen\n\nUses [[skills/typescript.md]].",
  );

  const result = scanWiki(TEST_VAULT);
  // Path-based resolution should hit before title resolution
  expect(result.links).toContainEqual({
    source: "projects/karen.md",
    target: "skills/typescript.md",
  });
});
```

- [ ] **Step 6: Run tests to verify they fail**

Run: `pnpm test tests/graph/scan-wiki.test.ts`

Expected: 4 new tests FAIL (title resolution, case-insensitive, slug fallback, duplicate title). The "prefers path-based" test should PASS since it uses existing resolution.

---

### Task 2: Title-based resolution in scan-wiki.ts — implementation

**Files:**
- Modify: `src/graph/scan-wiki.ts`

- [ ] **Step 1: Add slugify function**

Add after the `normalizeTarget` function (after line 55):

```typescript
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
```

- [ ] **Step 2: Build titleToId and slugToId maps**

In the `scanWiki` function, after the `filenameToId` map population (after line 95), add:

```typescript
// Build title → node ID map (case-insensitive) for title-based resolution
const titleToId = new Map<string, string>();
const slugToId = new Map<string, string>();
for (const node of nodes) {
  const titleKey = node.title.toLowerCase();
  if (!titleToId.has(titleKey)) {
    titleToId.set(titleKey, node.id);
  }
  const slugKey = slugify(node.title);
  if (!slugToId.has(slugKey)) {
    slugToId.set(slugKey, node.id);
  }
}
```

- [ ] **Step 3: Extend the resolution chain**

Replace the resolution loop (lines 100-110) with:

```typescript
for (const link of rawLinks) {
  let target = link.target;
  if (!nodeIds.has(target)) {
    // Try resolving by bare filename
    const byFilename = filenameToId.get(target);
    if (byFilename) {
      target = byFilename;
    } else {
      // Try title-based resolution (case-insensitive)
      // Strip .md suffix that normalizeTarget added, then look up by title
      const titleKey = target.replace(/\.md$/, "").toLowerCase();
      const byTitle = titleToId.get(titleKey);
      if (byTitle) {
        target = byTitle;
      } else {
        // Try slug-based fallback
        const slugKey = slugify(target.replace(/\.md$/, ""));
        const bySlug = slugToId.get(slugKey);
        if (bySlug) {
          target = bySlug;
        } else {
          continue; // dangling link — drop
        }
      }
    }
  }
  if (target === link.source) continue; // self-link — drop
  resolvedLinks.push({ source: link.source, target });
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test tests/graph/scan-wiki.test.ts`

Expected: All 14 tests PASS (9 existing + 5 new).

- [ ] **Step 5: Run full test suite**

Run: `pnpm test`

Expected: All tests pass. No regressions.

- [ ] **Step 6: Commit**

```bash
git add src/graph/scan-wiki.ts tests/graph/scan-wiki.test.ts
git commit -m "feat(graph): title-based wikilink resolution in scan-wiki

Add titleToId and slugToId maps for case-insensitive title resolution.
Resolution chain: exact path → filename → title → slug → drop.
Handles duplicate titles via first-match-wins."
```

---

### Task 3: Compile prompt enhancement — failing test

**Files:**
- Modify: `tests/compiler/compile.test.ts`

- [ ] **Step 1: Write failing test — title list injected into prompt**

Add a new `describe` block in `tests/compiler/compile.test.ts`. The existing test mocks `generate` globally via `vi.mock`, so we need to capture the prompt that gets passed to it.

Add after the existing `describe("compileSinglePass")` block:

```typescript
describe("compileSinglePass with existing articles", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_DIR, "raw/articles"), { recursive: true });
    mkdirSync(WIKI_DIR, { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("injects existing article titles into the compile prompt", async () => {
    const { generate } = await import("../../src/llm/provider.js");
    const mockGenerate = vi.mocked(generate);

    // Create existing wiki articles that should appear in the prompt
    writeFrontmatter(
      join(TEST_DIR, "wiki/concepts/zustand-store.md"),
      {
        title: "Zustand State Store",
        author: "ai",
        created_at: "2026-04-10T00:00:00Z",
        last_ai_edit: "2026-04-10T00:00:00Z",
        last_human_edit: null,
        last_embedded_hash: null,
        sources: [],
        tags: ["state"],
      },
      "# Zustand State Store\n\nContent.",
    );

    const rawFile = join(TEST_DIR, "raw/articles/test-article.md");
    writeFrontmatter(
      rawFile,
      {
        status: "pending",
        source_type: "file_drop",
        ingested_at: "2026-04-10T00:00:00Z",
        parsed_at: "2026-04-10T00:00:01Z",
        compiled_to: null,
        processed_at: null,
        retry_count: 0,
        last_error: null,
        compile_progress: null,
      },
      "# Test Article\n\nSome content.",
    );

    const { compileSinglePass } = await import("../../src/compiler/compile.js");
    await compileSinglePass(rawFile, TEST_DIR);

    // Verify the prompt contains the existing article title
    const callArgs = mockGenerate.mock.calls[mockGenerate.mock.calls.length - 1][0];
    expect(callArgs.prompt).toContain("Zustand State Store");
    expect(callArgs.prompt).toContain("existing articles");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test tests/compiler/compile.test.ts`

Expected: The new test FAILS — the current prompt doesn't contain "existing articles" or any title list.

---

### Task 4: Compile prompt enhancement — implementation

**Files:**
- Modify: `src/compiler/compile.ts`

- [ ] **Step 1: Add imports**

Add to the top of `src/compiler/compile.ts`:

```typescript
import { readdirSync, statSync } from "node:fs";
import { extname, basename, relative } from "node:path";
```

Note: `join` and `mkdirSync` are already imported. `readFrontmatter` is already imported.

- [ ] **Step 2: Add getExistingTitles helper**

Add after the `slugify` function (after line 28):

```typescript
interface TitleCache {
  titles: string[];
  timestamp: number;
}

const TITLE_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
let titleCache: TitleCache | null = null;

function walkWikiDir(dir: string): string[] {
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
      results.push(...walkWikiDir(full));
    } else if (extname(entry) === ".md" && basename(entry) !== "index.md") {
      results.push(full);
    }
  }
  return results;
}

function getExistingTitles(vaultRoot: string): string[] {
  const now = Date.now();
  if (titleCache && now - titleCache.timestamp < TITLE_CACHE_TTL_MS) {
    return titleCache.titles;
  }

  const wikiDir = join(vaultRoot, "wiki");
  const files = walkWikiDir(wikiDir);

  const titleCounts = new Map<string, number>();
  const allTitles: string[] = [];

  for (const file of files) {
    const { data } = readFrontmatter(file);
    const title = (data as Record<string, unknown>).title as string | undefined;
    if (title) {
      allTitles.push(title);
      // connection_count is not available here; use occurrence as proxy
      titleCounts.set(title, (titleCounts.get(title) ?? 0) + 1);
    }
  }

  // Cap at 500 titles, sorted alphabetically for determinism
  // (connection_count not available at compile time — alphabetical is stable)
  const capped = allTitles
    .sort((a, b) => a.localeCompare(b))
    .slice(0, 500);

  titleCache = { titles: capped, timestamp: now };
  return capped;
}

// Exported for testing
export { getExistingTitles as _getExistingTitles, titleCache as _titleCache };

export function _clearTitleCache(): void {
  titleCache = null;
}
```

- [ ] **Step 3: Update the compile prompt**

Replace the prompt string in `compileSinglePass` (lines 39-53) with:

```typescript
    const existingTitles = getExistingTitles(vaultRoot);
    const titleListSection =
      existingTitles.length > 0
        ? `\n  IMPORTANT: Prefer linking to existing articles from this list:\n  ${existingTitles.join(", ")}\n  If a related topic is not in the list, still include it as a [[link]].`
        : "";

    const response = await generate({
      prompt: `You are a knowledge compiler. Given the following raw content, produce a structured wiki article.

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

Return ONLY valid JSON, no markdown code fences.`,
      maxTokens: 8192,
      json: true,
    });
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test tests/compiler/compile.test.ts`

Expected: All tests PASS including the new title injection test.

- [ ] **Step 5: Run full test suite**

Run: `pnpm test`

Expected: All tests pass. No regressions.

- [ ] **Step 6: Commit**

```bash
git add src/compiler/compile.ts tests/compiler/compile.test.ts
git commit -m "feat(compiler): inject existing article titles into compile prompt

LLM now receives top 500 existing article titles so it can link to real
articles instead of hallucinating topic names. 5-minute TTL cache keeps
prompt fresh within compile batches."
```

---

### Task 5: Backfill script — failing tests

**Files:**
- Create: `tests/graph/backfill-links.test.ts`

- [ ] **Step 1: Write test file with helpers and failing tests**

Create `tests/graph/backfill-links.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { readFrontmatter, writeFrontmatter } from "../../src/frontmatter.js";
import { backfillLinks } from "../../src/graph/backfill-links.js";

const TEST_VAULT = join(import.meta.dirname, "__fixtures__/backfill-test");

function writeArticle(
  subdir: string,
  slug: string,
  title: string,
  tags: string[],
  content: string,
): void {
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

describe("backfillLinks", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_VAULT, "wiki"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_VAULT, { recursive: true, force: true });
  });

  it("rewrites [[Title]] links to match actual article titles (case-insensitive)", () => {
    writeArticle(
      "concepts",
      "zustand-graph-state-store",
      "Zustand Graph State Store",
      [],
      "# Zustand\n\nA state library.",
    );
    writeArticle(
      "projects",
      "brain-explorer",
      "Brain Explorer",
      [],
      "# Brain Explorer\n\n## Related\n\n- [[zustand graph state store]]",
    );

    const result = backfillLinks(TEST_VAULT, { dryRun: false });

    const { content } = readFrontmatter(
      join(TEST_VAULT, "wiki/projects/brain-explorer.md"),
    );
    expect(content).toContain("[[Zustand Graph State Store]]");
    expect(result.resolved).toBe(1);
    expect(result.filesModified).toBe(1);
  });

  it("leaves already-correct path-style links unchanged", () => {
    writeArticle(
      "skills",
      "typescript",
      "TypeScript",
      [],
      "# TypeScript",
    );
    writeArticle(
      "projects",
      "karen",
      "Karen",
      [],
      "# Karen\n\nUses [[skills/typescript.md|TypeScript]].",
    );

    const result = backfillLinks(TEST_VAULT, { dryRun: false });

    const { content } = readFrontmatter(
      join(TEST_VAULT, "wiki/projects/karen.md"),
    );
    expect(content).toContain("[[skills/typescript.md|TypeScript]]");
    expect(result.filesModified).toBe(0);
  });

  it("leaves truly dangling links as-is", () => {
    writeArticle(
      "projects",
      "karen",
      "Karen",
      [],
      "# Karen\n\nUses [[Nonexistent Topic]].",
    );

    const result = backfillLinks(TEST_VAULT, { dryRun: false });

    const { content } = readFrontmatter(
      join(TEST_VAULT, "wiki/projects/karen.md"),
    );
    expect(content).toContain("[[Nonexistent Topic]]");
    expect(result.dangling).toBe(1);
    expect(result.filesModified).toBe(0);
  });

  it("dry run does not modify files", () => {
    writeArticle(
      "concepts",
      "zustand-store",
      "Zustand Store",
      [],
      "# Zustand\n\nA store.",
    );
    writeArticle(
      "projects",
      "explorer",
      "Explorer",
      [],
      "# Explorer\n\nUses [[zustand store]].",
    );

    const result = backfillLinks(TEST_VAULT, { dryRun: true });

    // Should report what would change
    expect(result.resolved).toBe(1);

    // File should NOT be modified
    const { content } = readFrontmatter(
      join(TEST_VAULT, "wiki/projects/explorer.md"),
    );
    expect(content).toContain("[[zustand store]]");
  });

  it("is idempotent — running twice produces same result", () => {
    writeArticle(
      "concepts",
      "zustand-store",
      "Zustand Store",
      [],
      "# Zustand\n\nA store.",
    );
    writeArticle(
      "projects",
      "explorer",
      "Explorer",
      [],
      "# Explorer\n\nUses [[zustand store]].",
    );

    backfillLinks(TEST_VAULT, { dryRun: false });
    const result2 = backfillLinks(TEST_VAULT, { dryRun: false });

    // Second run should find nothing to change
    expect(result2.resolved).toBe(0);
    expect(result2.filesModified).toBe(0);
  });

  it("rewrites links in all sections, not just Related", () => {
    writeArticle(
      "concepts",
      "react-three-fiber",
      "React Three Fiber",
      [],
      "# React Three Fiber\n\nA library.",
    );
    writeArticle(
      "projects",
      "explorer",
      "Explorer",
      [],
      "# Explorer\n\n## Details\n\nUses [[react three fiber]] for 3D.\n\n## Related\n\n- [[react three fiber]]",
    );

    const result = backfillLinks(TEST_VAULT, { dryRun: false });

    const { content } = readFrontmatter(
      join(TEST_VAULT, "wiki/projects/explorer.md"),
    );
    expect(content).toContain("## Details\n\nUses [[React Three Fiber]] for 3D.");
    expect(content).toContain("- [[React Three Fiber]]");
    expect(result.resolved).toBe(2);
  });

  it("skips index.md files", () => {
    writeFrontmatter(
      join(TEST_VAULT, "wiki/index.md"),
      { title: "Index", author: "ai", created_at: "2026-04-10T00:00:00Z", tags: [] },
      "# Index\n\n- [[Nonexistent]]",
    );

    const result = backfillLinks(TEST_VAULT, { dryRun: false });
    expect(result.filesModified).toBe(0);
  });

  it("skips code-architecture directory", () => {
    writeArticle(
      "code-architecture",
      "karen-repo",
      "Karen Repository Architecture",
      [],
      "# Karen\n\nUses [[AuthService]] and [[src/auth/service.ts]].",
    );

    const result = backfillLinks(TEST_VAULT, { dryRun: false });
    expect(result.filesModified).toBe(0);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test tests/graph/backfill-links.test.ts`

Expected: All tests FAIL — `src/graph/backfill-links.ts` doesn't exist yet.

---

### Task 6: Backfill script — implementation

**Files:**
- Create: `src/graph/backfill-links.ts`
- Modify: `package.json`

- [ ] **Step 1: Create backfill-links.ts**

Create `src/graph/backfill-links.ts`:

```typescript
import { readdirSync, statSync } from "node:fs";
import { join, relative, extname, basename } from "node:path";
import { readFrontmatter, writeFrontmatter } from "../frontmatter.js";
import type { WikiFrontmatter } from "../types.js";

export interface BackfillOptions {
  dryRun: boolean;
}

export interface BackfillResult {
  resolved: number;
  dangling: number;
  filesModified: number;
  changes: Array<{ file: string; from: string; to: string }>;
}

const WIKILINK_RE = /\[\[([^\]|]+)(\|[^\]]+)?\]\]/g;

const SKIP_DIRS = new Set(["code-architecture"]);

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

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
      if (SKIP_DIRS.has(entry)) continue;
      results.push(...walkDir(full));
    } else if (extname(entry) === ".md" && basename(entry) !== "index.md") {
      results.push(full);
    }
  }
  return results;
}

export function backfillLinks(
  vaultRoot: string,
  options: BackfillOptions,
): BackfillResult {
  const wikiDir = join(vaultRoot, "wiki");
  const files = walkDir(wikiDir);

  // Build title → canonical title map (case-insensitive)
  const titleMap = new Map<string, string>(); // lowercase title → actual title
  const slugMap = new Map<string, string>(); // slug → actual title
  const nodeIds = new Set<string>(); // all valid node IDs (path-based)

  for (const file of files) {
    const id = relative(wikiDir, file);
    nodeIds.add(id);

    const { data } = readFrontmatter<WikiFrontmatter>(file);
    const title = data.title ?? basename(file, ".md");

    const titleKey = title.toLowerCase();
    if (!titleMap.has(titleKey)) {
      titleMap.set(titleKey, title);
    }

    const slugKey = slugify(title);
    if (!slugMap.has(slugKey)) {
      slugMap.set(slugKey, title);
    }
  }

  const result: BackfillResult = {
    resolved: 0,
    dangling: 0,
    filesModified: 0,
    changes: [],
  };

  for (const file of files) {
    const { data, content } = readFrontmatter<WikiFrontmatter>(file);
    const relPath = relative(wikiDir, file);
    let newContent = content;
    let fileChanged = false;

    newContent = newContent.replace(
      WIKILINK_RE,
      (fullMatch: string, target: string, pipePart?: string) => {
        // If it has a pipe part (display text), keep the original — it's already formatted
        if (pipePart) return fullMatch;

        const trimmed = target.trim();

        // If it contains a slash, it's a path-style link — skip
        if (trimmed.includes("/")) return fullMatch;

        // If it starts with absolute path — skip
        if (trimmed.startsWith("/")) return fullMatch;

        // Check if it's already a valid filename (with or without .md)
        const withMd = trimmed.endsWith(".md") ? trimmed : trimmed + ".md";
        // If bare filename resolves as a node ID component, skip
        for (const nodeId of nodeIds) {
          if (nodeId.endsWith("/" + withMd)) return fullMatch;
        }

        // Try title resolution (case-insensitive)
        const titleKey = trimmed.toLowerCase();
        const byTitle = titleMap.get(titleKey);
        if (byTitle) {
          // Already matches canonical title exactly? No change needed
          if (trimmed === byTitle) return fullMatch;

          result.resolved++;
          result.changes.push({ file: relPath, from: trimmed, to: byTitle });
          fileChanged = true;
          return `[[${byTitle}]]`;
        }

        // Try slug-based resolution
        const slugKey = slugify(trimmed);
        const bySlug = slugMap.get(slugKey);
        if (bySlug) {
          if (trimmed === bySlug) return fullMatch;

          result.resolved++;
          result.changes.push({ file: relPath, from: trimmed, to: bySlug });
          fileChanged = true;
          return `[[${bySlug}]]`;
        }

        // Truly dangling
        result.dangling++;
        return fullMatch;
      },
    );

    if (fileChanged && !options.dryRun) {
      writeFrontmatter(file, data as unknown as Record<string, unknown>, newContent);
      result.filesModified++;
    } else if (fileChanged) {
      result.filesModified++; // Count in dry run for reporting, but don't write
    }
  }

  return result;
}
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `pnpm test tests/graph/backfill-links.test.ts`

Expected: All 7 tests PASS.

- [ ] **Step 3: Add CLI entry point and package.json script**

Append to `src/graph/backfill-links.ts`:

```typescript
// CLI entry point
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/^.*\//, ""))) {
  const dryRun = process.argv.includes("--dry-run");
  const vaultRoot = process.argv[2] && !process.argv[2].startsWith("--")
    ? process.argv[2]
    : join(import.meta.dirname, "../..");

  console.log(dryRun ? "=== DRY RUN ===" : "=== BACKFILL ===");
  const result = backfillLinks(vaultRoot, { dryRun });

  for (const change of result.changes) {
    console.log(`  ${change.file}: [[${change.from}]] → [[${change.to}]]`);
  }

  console.log(`\nResolved: ${result.resolved}`);
  console.log(`Dangling: ${result.dangling}`);
  console.log(`Files modified: ${result.filesModified}`);
}
```

Add to `package.json` scripts:

```json
"backfill-links": "bun run src/graph/backfill-links.ts",
"backfill-links:dry": "bun run src/graph/backfill-links.ts --dry-run"
```

- [ ] **Step 4: Run full test suite**

Run: `pnpm test`

Expected: All tests pass. No regressions.

- [ ] **Step 5: Commit**

```bash
git add src/graph/backfill-links.ts tests/graph/backfill-links.test.ts package.json
git commit -m "feat(graph): backfill script to rewrite broken wikilinks

Walks all wiki articles, resolves [[Title]] links against actual article
titles (case-insensitive), rewrites to canonical casing. Supports
--dry-run mode. Skips index.md and code-architecture/ directory."
```

---

### Task 7: Integration test — end-to-end graph rebuild

**Files:**
- No new files — this is a manual verification task

- [ ] **Step 1: Run backfill in dry-run mode**

Run: `pnpm backfill-links:dry`

Review the output. Verify:
- Resolved count is > 0
- Changes show reasonable rewrites (e.g., `[[Zustand]] → [[Zustand Graph State Store in Brain Explorer]]`)
- No unexpected files being modified

- [ ] **Step 2: Run backfill for real**

Run: `pnpm backfill-links`

Verify the summary matches the dry run.

- [ ] **Step 3: Run the scanner to check edge count**

```bash
bun -e "
import { scanWiki } from './src/graph/scan-wiki.js';
const result = scanWiki('.');
console.log('Nodes:', result.nodes.length);
console.log('Links:', result.links.length);
const withConnections = result.nodes.filter(n => n.connection_count > 0);
console.log('Nodes with connections:', withConnections.length);
const top10 = result.nodes.sort((a, b) => b.connection_count - a.connection_count).slice(0, 10);
console.log('Top 10 most connected:');
for (const n of top10) console.log('  ', n.connection_count, n.title);
"
```

Expected: Links > 0 (target: 200-500). If still 0, investigate which resolution step is missing.

- [ ] **Step 4: Trigger graph rebuild and verify**

```bash
curl -s -X POST http://localhost:3577/graph-push | jq
```

Then pull the updated graph in brain-explorer and check edge count:

```bash
cd ~/Desktop/brain-explorer && git pull origin main
node -e "const g = require('./public/graph.json'); console.log('Nodes:', g.node_count, 'Links:', g.links.length);"
```

Expected: Links > 0 in the deployed graph.

- [ ] **Step 5: Commit backfilled wiki articles**

```bash
git add wiki/
git commit -m "chore(wiki): backfill wikilinks to canonical article titles

Resolved N broken [[Title]] links across M files using title-based
matching. Dangling links (no matching article) left as-is."
```

(Replace N and M with actual numbers from the backfill output.)

- [ ] **Step 6: Visual verification**

Open `http://localhost:3001` (brain-explorer dev server) and verify:
- Edges are visible between nodes
- Edge particles animate
- Clicking a node highlights its connected edges
- Graph looks denser than before

---

### Task 8: Update CLAUDE.md with new script

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Add backfill-links to the running section**

In the `## Running` section of `CLAUDE.md`, after the `pnpm gmail:auth` line, add:

```markdown
pnpm backfill-links     # One-time: rewrite broken [[Title]] wikilinks
pnpm backfill-links:dry # Dry run: show what would change
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add backfill-links script to CLAUDE.md"
```
