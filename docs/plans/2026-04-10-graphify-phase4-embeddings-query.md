# Graphify Phase 4 — Embeddings + Query

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire Graphify file-summary drops through the existing embed pipeline, add a confidentiality filter to synthesis, and update all query consumers (Telegram, HTTP API, MCP) to pass the appropriate mode.

**Architecture:** File-summary markdown flows through the existing raw/ → wiki/ → LanceDB pipeline unchanged. The `confidential` metadata field is read from wiki frontmatter during `syncFile` and stored on each LanceDB vector record. `synthesize.ts` gains a `mode` parameter (`"local"` | `"remote"`) that filters out confidential chunks post-retrieval.

**Spec:** `docs/specs/2026-04-10-brain-graphify-fusion-design.md` — Sections 8, 9

**Assumes Phases 1-3 complete.** Graphify file summaries exist in `raw/graphify/{repo}/file-summaries/`. Architecture articles in `wiki/code-architecture/`. Graph cache has two layers.

---

### Task 1: Add `confidential` field to WikiChunk and VectorStore

**Files:**
- Modify: `src/types.ts`
- Modify: `src/embedder/vector-store.ts`

- [ ] **Step 1: Add `confidential` to WikiChunk**

```typescript
export interface WikiChunk {
  // ... existing fields ...
  confidential?: boolean;
}
```

- [ ] **Step 2: Update `VectorStore.upsertChunks` to persist `confidential`**

Add `confidential: c.confidential ?? false` to the records mapping.

- [ ] **Step 3: Update `VectorStore.search` to read `confidential` from results**

Add `confidential: (r.confidential as boolean) ?? false` to returned objects.

- [ ] **Step 4: Update `VectorStore.listAll` similarly**

- [ ] **Step 5: Run existing tests**

```bash
pnpm vitest run
```

- [ ] **Step 6: Commit**

```bash
git add src/types.ts src/embedder/vector-store.ts
git commit -m "feat(embedder): add confidential field to WikiChunk and LanceDB schema"
```

---

### Task 2: Read `confidential` from frontmatter during embedding sync

**Files:**
- Create: `tests/embedder/sync-confidential.test.ts`
- Modify: `src/embedder/sync.ts`

- [ ] **Step 1: Write failing tests**

Two tests:
1. Passes `confidential: true` to upsertChunks when frontmatter has `confidential: true`
2. Passes `confidential: false` when frontmatter lacks the field

- [ ] **Step 2: Run test to verify failure**

```bash
pnpm vitest run tests/embedder/sync-confidential.test.ts
```

- [ ] **Step 3: Implement — read `confidential` from frontmatter in `syncFile`**

In `src/embedder/sync.ts`, after reading frontmatter:

```typescript
const confidential = (data as Record<string, unknown>).confidential === true;
```

Propagate onto each chunk: `{ ...chunk, vector, confidential }`.

- [ ] **Step 4: Run tests**

```bash
pnpm vitest run tests/embedder/sync-confidential.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/embedder/sync.ts tests/embedder/sync-confidential.test.ts
git commit -m "feat(embedder): read confidential flag from frontmatter and store in LanceDB"
```

---

### Task 3: Add `SynthesisMode` and confidentiality filter to `synthesize.ts`

**Files:**
- Modify: `src/query/synthesize.ts`
- Modify: `tests/query/synthesize.test.ts`

- [ ] **Step 1: Write failing tests**

Three tests:
1. Local mode includes all chunks including confidential
2. Remote mode excludes confidential chunks
3. Remote mode returns no-knowledge answer when all chunks are confidential

- [ ] **Step 2: Run test to verify failure**

```bash
pnpm vitest run tests/query/synthesize.test.ts
```

- [ ] **Step 3: Implement the mode parameter and filter**

```typescript
export type SynthesisMode = "local" | "remote";

export async function synthesize(
  question: string,
  store: ...,
  topK: number = 8,
  mode: SynthesisMode = "local",
): Promise<SynthesisResult> {
  // ... embed question, search ...
  if (mode === "remote") {
    chunks = chunks.filter(c => !c.confidential);
  }
  if (chunks.length === 0) {
    return { answer: "I don't have any knowledge about that topic yet...", ... };
  }
  // ... rest unchanged ...
}
```

- [ ] **Step 4: Run tests**

```bash
pnpm vitest run tests/query/synthesize.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/query/synthesize.ts tests/query/synthesize.test.ts
git commit -m "feat(query): add SynthesisMode with confidentiality filter for remote mode"
```

---

### Task 4: Telegram bot passes `mode: "remote"`

**Files:**
- Modify: `src/telegram/bot.ts`
- Modify: `tests/telegram/bot.test.ts`

- [ ] **Step 1: Write failing test**

Capture the `mode` arg passed to `synthesizeFn` — expect `"remote"`.

- [ ] **Step 2: Run test to verify failure**

- [ ] **Step 3: Update the query branch in `handleTextMessage`**

```typescript
const result = await deps.synthesizeFn(query, deps.store, deps.config.api.default_top_k, "remote");
```

- [ ] **Step 4: Run tests**

```bash
pnpm vitest run tests/telegram/bot.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/telegram/bot.ts tests/telegram/bot.test.ts
git commit -m "feat(telegram): pass mode 'remote' to synthesis for confidentiality filtering"
```

---

### Task 5: HTTP API accepts `mode` parameter

**Files:**
- Modify: `src/api/routes/synthesise.ts`
- Modify: `tests/api/routes/synthesise.test.ts`

- [ ] **Step 1: Write failing tests**

Three tests:
1. Passes `mode: "local"` by default
2. Passes mode from request body
3. Rejects invalid mode values (400)

- [ ] **Step 2: Run test to verify failure**

- [ ] **Step 3: Update the synthesise route**

Add `mode` to the JSON schema:

```typescript
mode: { type: "string", enum: ["local", "remote"] }
```

Pass through: `synthesizeFn(query, store, topK, body.mode ?? "local")`

- [ ] **Step 4: Run tests**

```bash
pnpm vitest run tests/api/routes/synthesise.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/api/routes/synthesise.ts tests/api/routes/synthesise.test.ts
git commit -m "feat(api): accept mode parameter on /synthesise, default to local"
```

---

### Task 6: MCP server passes `mode: "local"`

**Files:**
- Modify: `~/.claude/mcp/brain/index.ts`

- [ ] **Step 1: Update brain_query tool's fetch body**

```typescript
body: JSON.stringify({ query, top_k: top_k ?? 8, mode: "local" })
```

- [ ] **Step 2: Verify MCP server starts**

- [ ] **Step 3: Commit** (in dotfiles repo)

```bash
cd ~/dotfiles && git add claude/mcp/brain/index.ts
git commit -m "feat(mcp): explicitly pass mode 'local' to brain synthesis API"
```

---

### Task 7: File-summary embed pipeline validation

**Files:**
- Create: `tests/embedder/file-summary-pipeline.test.ts`

- [ ] **Step 1: Write validation tests**

Three tests verifying a Graphify file-summary markdown:
1. Chunks at `##` headings into sections (Imports, Exports, Key Symbols, Community)
2. Produces chunks with correct filePath
3. Produces non-empty sectionHash per chunk

- [ ] **Step 2: Run tests**

```bash
pnpm vitest run tests/embedder/file-summary-pipeline.test.ts
```

Expected: 3 passing — existing chunker handles this format already.

- [ ] **Step 3: Commit**

```bash
git add tests/embedder/file-summary-pipeline.test.ts
git commit -m "test(embedder): validate file-summary markdown flows through chunk pipeline"
```

---

### Task 8: End-to-end verification

- [ ] **Step 1: Run full test suite**

```bash
pnpm vitest run
```

- [ ] **Step 2: Force re-embed to populate `confidential` column**

Clear all `last_embedded_hash` in wiki frontmatter, restart daemon.

- [ ] **Step 3: Verify code architecture context in synthesis**

```bash
curl -s -X POST http://localhost:3577/synthesise \
  -H "Content-Type: application/json" \
  -d '{"query": "how does auth work in Karen?", "mode": "local"}'
```

Expected: sources include both wiki articles AND code architecture files.

- [ ] **Step 4: Verify remote mode**

```bash
curl -s -X POST http://localhost:3577/synthesise \
  -H "Content-Type: application/json" \
  -d '{"query": "how does auth work in Karen?", "mode": "remote"}'
```

Expected: no `confidential: true` files in sources.

- [ ] **Step 5: Verify Telegram uses remote mode**

Send `?how does auth work in Karen?` to `@rahil_brain_bot`.

---

## Summary

| Task | Files | Tests | Time Est. |
|------|-------|-------|-----------|
| 1. WikiChunk + VectorStore | 2 modified | Existing | 3 min |
| 2. Sync confidential | 1 modified, 1 created | 2 new | 4 min |
| 3. SynthesisMode | 1 modified | 3 new | 5 min |
| 4. Telegram remote | 1 modified | 1 new | 3 min |
| 5. API mode param | 1 modified | 3 new | 4 min |
| 6. MCP local | 1 modified | — | 2 min |
| 7. Pipeline validation | 1 created | 3 new | 3 min |
| 8. E2E verify | — | Manual | 5 min |
| **Total** | **2 created, 6 modified** | **12 new** | **~29 min** |

**Next:** Phase 5 — Explorer integration (layer toggle, drill-in, god-node rendering, code cubes).
