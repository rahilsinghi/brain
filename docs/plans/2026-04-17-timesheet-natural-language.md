# Natural-Language Timesheet Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Log timesheet hours by speaking or typing plain English ("2h maison coding 3-5pm yesterday") via Telegram text, Telegram voice (spoken "timesheet" prefix), Claude Code MCP tool, or CLI.

**Architecture:** Thin Adapter — a local-LLM parser emits the existing `ReviewCommand[]` union, fed into the existing `applyReviewCommands()` pipeline. No new DB-write path; telemetry goes to a new `nl_parse_log` table. Four entry points converge on one shared handler.

**Tech Stack:** Bun + TypeScript (strict), Vitest, Fastify, SQLite (bun:sqlite / better-sqlite3), Ollama (Qwen3 32B) via the shared `generate()` client in `src/llm/provider.ts`, Zod for the MCP tool input schema.

**Spec:** `docs/specs/2026-04-17-timesheet-natural-language-design.md`

---

## File Structure

### New files

| File | Responsibility |
|------|---------------|
| `src/timesheet/nl-parser.ts` | Pure function: English text → `{ commands: ReviewCommand[], inferredDate, warnings, error?, llmResponseRaw, durationMs }`. Calls shared `generate()`. |
| `src/timesheet/nl-handler.ts` | Shared entry-point logic: parse → log → apply → format response string. |
| `src/api/routes/timesheet-nl.ts` | Fastify route `POST /timesheet/nl` wrapping `handleTimesheetNL`. |
| `src/cli/timesheet-add.ts` | CLI wrapper: `brain ts add "<text>"` → POST `/timesheet/nl` → print response. |
| `tests/timesheet/nl-parser.test.ts` | Unit tests for `parseTimesheetNL` with mocked `generate()`. |
| `tests/timesheet/nl-handler.test.ts` | Integration tests: real SQLite, mocked `generate()`, assert DB state + telemetry row. |

### Modified files

| File | Change |
|------|--------|
| `src/timesheet/db.ts` | Add `nl_parse_log` table to `SCHEMA_SQL`. Add `logNLParse()`, `getNLParseLog()`, `getEmployerIds()` methods. |
| `src/timesheet/telegram-review.ts` | Export `parseTimeToISO` (already defined, currently private) so the handler can use it for display formatting. |
| `src/relay/sync.ts` | Add `timesheet_nl` case to `processItem` switch. |
| `src/voice/voice-parser.ts` | Detect leading "timesheet" / "ts" / "log time" prefix. If matched, route to `handleTimesheetNL` via an injectable hook and return; otherwise fall through to cluster classifier (unchanged). |
| `src/api/server.ts` | Register `timesheetNLRoute` when `timesheetDb` is provided. |
| `package.json` | Add `"ts:add": "bun run src/cli/timesheet-add.ts"` to scripts. |
| `~/.claude/mcp/brain/index.ts` | Add `brain_timesheet_add` tool calling `POST /timesheet/nl`. |

---

## Phase 1: Core NL Parser + Telemetry Table

Build the pure logic with thorough unit tests before wiring entry points. Everything in this phase is self-contained — no network, no external daemons.

### Task 1: Add `nl_parse_log` table and DB accessors

**Files:**
- Modify: `src/timesheet/db.ts`
- Test: `tests/timesheet/nl-parse-log.test.ts` (new)

- [ ] **Step 1: Write the failing test**

Create `tests/timesheet/nl-parse-log.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { TimesheetDB } from "../../src/timesheet/db.js";

describe("nl_parse_log table", () => {
  let dir: string;
  let db: TimesheetDB;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "brain-ts-nl-"));
    db = new TimesheetDB(join(dir, "ts.db"));
  });

  afterEach(() => {
    db.close();
    rmSync(dir, { recursive: true, force: true });
  });

  it("creates the nl_parse_log table", () => {
    expect(db.listTables()).toContain("nl_parse_log");
  });

  it("logNLParse inserts a row returning the id", () => {
    const id = db.logNLParse({
      timestamp: "2026-04-17T10:00:00Z",
      source: "mcp",
      input_text: "2h maison coding",
      llm_response: '{"entries":[{"hours":2}]}',
      entries_created: 1,
      error: null,
      duration_ms: 1800,
      llm_tokens: 234,
    });
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
  });

  it("logNLParse persists error rows too", () => {
    const id = db.logNLParse({
      timestamp: "2026-04-17T10:00:00Z",
      source: "telegram_text",
      input_text: "/ts asdfjkl",
      llm_response: null,
      entries_created: 0,
      error: "not a timesheet entry",
      duration_ms: 900,
      llm_tokens: null,
    });
    const row = db.getNLParseLog(id);
    expect(row).not.toBeNull();
    expect(row?.error).toBe("not a timesheet entry");
    expect(row?.entries_created).toBe(0);
  });

  it("getEmployerIds returns inserted employer ids", () => {
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });
    db.upsertEmployer({ id: "wilbo", rate_hourly: 0, weekly_cap_hours: null, monthly_bonus: null, currency: "USD" });
    expect(db.getEmployerIds().sort()).toEqual(["maison", "wilbo"]);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/timesheet/nl-parse-log.test.ts`
Expected: FAIL — `logNLParse`/`getNLParseLog`/`getEmployerIds` don't exist, `nl_parse_log` table not present.

- [ ] **Step 3: Add schema SQL and accessor methods**

In `src/timesheet/db.ts`, append to the `SCHEMA_SQL` constant (inside the template string, before the closing backtick):

```typescript
  CREATE TABLE IF NOT EXISTS nl_parse_log (
    id TEXT PRIMARY KEY,
    timestamp TEXT NOT NULL,
    source TEXT NOT NULL,
    input_text TEXT NOT NULL,
    llm_response TEXT,
    entries_created INTEGER NOT NULL DEFAULT 0,
    error TEXT,
    duration_ms INTEGER,
    llm_tokens INTEGER
  );
  CREATE INDEX IF NOT EXISTS idx_nl_parse_log_timestamp ON nl_parse_log(timestamp);
```

Then add these methods inside `class TimesheetDB` (place near the other methods, grouped at the end of the class before `close()`):

```typescript
  // ── NL parse log ──

  logNLParse(input: {
    timestamp: string;
    source: string;
    input_text: string;
    llm_response: string | null;
    entries_created: number;
    error: string | null;
    duration_ms: number | null;
    llm_tokens: number | null;
  }): string {
    const id = randomUUID();
    this.db
      .prepare(
        `INSERT INTO nl_parse_log
          (id, timestamp, source, input_text, llm_response, entries_created, error, duration_ms, llm_tokens)
         VALUES
          ($id, $timestamp, $source, $input_text, $llm_response, $entries_created, $error, $duration_ms, $llm_tokens)`
      )
      .run({
        $id: id,
        $timestamp: input.timestamp,
        $source: input.source,
        $input_text: input.input_text,
        $llm_response: input.llm_response,
        $entries_created: input.entries_created,
        $error: input.error,
        $duration_ms: input.duration_ms,
        $llm_tokens: input.llm_tokens,
      });
    return id;
  }

  getNLParseLog(id: string): {
    id: string;
    timestamp: string;
    source: string;
    input_text: string;
    llm_response: string | null;
    entries_created: number;
    error: string | null;
    duration_ms: number | null;
    llm_tokens: number | null;
  } | null {
    const row = this.db
      .prepare("SELECT * FROM nl_parse_log WHERE id = ?")
      .get(id) as Record<string, unknown> | undefined;
    if (!row) return null;
    return row as never;
  }

  getEmployerIds(): string[] {
    const rows = this.db
      .prepare("SELECT id FROM employers ORDER BY id")
      .all() as Array<{ id: string }>;
    return rows.map((r) => r.id);
  }
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/timesheet/nl-parse-log.test.ts`
Expected: PASS (4/4).

- [ ] **Step 5: Commit**

```bash
cd /Users/rahilsinghi/Desktop/brain
git add src/timesheet/db.ts tests/timesheet/nl-parse-log.test.ts
git commit -m "feat(timesheet): add nl_parse_log table + getEmployerIds accessor"
```

---

### Task 2: Build `parseTimesheetNL` (pure, mocked LLM)

**Files:**
- Create: `src/timesheet/nl-parser.ts`
- Test: `tests/timesheet/nl-parser.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/timesheet/nl-parser.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the generate() client before importing the parser
const mockGenerate = vi.fn();
vi.mock("../../src/llm/provider.js", () => ({
  generate: (...args: unknown[]) => mockGenerate(...args),
}));

import { parseTimesheetNL } from "../../src/timesheet/nl-parser.js";

const ctx = {
  now: new Date("2026-04-17T10:00:00-04:00"),
  timezone: "America/New_York",
  employers: ["maison", "wilbo"],
};

beforeEach(() => {
  mockGenerate.mockReset();
});

function mockLLM(jsonString: string): void {
  mockGenerate.mockResolvedValue({
    text: jsonString,
    provider: "ollama",
    model: "qwen3:32b",
    inputTokens: 100,
    outputTokens: 50,
  });
}

describe("parseTimesheetNL — happy paths", () => {
  it("single entry with explicit times", async () => {
    mockLLM(JSON.stringify({
      entries: [{
        hours: 2,
        employer: "maison",
        category: "coding",
        description: "PoC implementation",
        date: "2026-04-16",
        start_time: "3:00p",
        end_time: "5:00p",
      }],
    }));
    const result = await parseTimesheetNL("worked on maison PoC 3-5pm yesterday", ctx);
    expect(result.error).toBeUndefined();
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0]).toEqual({
      type: "add",
      hours: 2,
      employerId: "maison",
      category: "coding",
      description: "PoC implementation",
      startTime: "3:00p",
      endTime: "5:00p",
    });
    expect(result.inferredDate).toBe("2026-04-16");
  });

  it("single entry with duration only (no times)", async () => {
    mockLLM(JSON.stringify({
      entries: [{
        hours: 2,
        employer: "maison",
        category: "coding",
        description: "debugging",
      }],
    }));
    const result = await parseTimesheetNL("2h maison debugging", ctx);
    expect(result.error).toBeUndefined();
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0]).toMatchObject({
      type: "add",
      hours: 2,
      employerId: "maison",
      category: "coding",
      description: "debugging",
    });
    // start/end omitted → applyReviewCommands will back-calculate from now
    expect((result.commands[0] as { startTime?: string }).startTime).toBeUndefined();
    // inferredDate falls back to today (in context's tz)
    expect(result.inferredDate).toBe("2026-04-17");
  });

  it("multiple entries in one message", async () => {
    mockLLM(JSON.stringify({
      entries: [
        { hours: 2, employer: "maison", category: "coding", description: "coding" },
        { hours: 1, employer: "maison", category: "meeting", description: "Fredrik 1:1" },
      ],
    }));
    const result = await parseTimesheetNL("2h coding then 1h Fredrik 1:1", ctx);
    expect(result.error).toBeUndefined();
    expect(result.commands).toHaveLength(2);
    expect(result.commands[0]).toMatchObject({ hours: 2, category: "coding" });
    expect(result.commands[1]).toMatchObject({ hours: 1, category: "meeting" });
  });

  it("uses earliest entry's date as inferredDate when explicit dates present", async () => {
    mockLLM(JSON.stringify({
      entries: [
        { hours: 1, employer: "maison", category: "coding", description: "x", date: "2026-04-16" },
        { hours: 2, employer: "maison", category: "coding", description: "y", date: "2026-04-15" },
      ],
    }));
    const result = await parseTimesheetNL("...", ctx);
    expect(result.inferredDate).toBe("2026-04-15");
  });

  it("records llmResponseRaw and durationMs for telemetry", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 1, employer: "maison", category: "coding", description: "x" }],
    }));
    const result = await parseTimesheetNL("1h maison coding", ctx);
    expect(result.llmResponseRaw).toContain("entries");
    expect(typeof result.durationMs).toBe("number");
    expect(result.durationMs!).toBeGreaterThanOrEqual(0);
  });
});

describe("parseTimesheetNL — validation failures", () => {
  it("rejects unknown employer from LLM", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 2, employer: "asknyc", category: "coding", description: "x" }],
    }));
    const result = await parseTimesheetNL("2h asknyc work", ctx);
    expect(result.error).toContain("unknown employer");
    expect(result.commands).toHaveLength(0);
  });

  it("rejects invalid category", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 2, employer: "maison", category: "strategy", description: "x" }],
    }));
    const result = await parseTimesheetNL("2h maison strategy", ctx);
    expect(result.error).toContain("invalid category");
    expect(result.commands).toHaveLength(0);
  });

  it("rejects hours <= 0", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 0, employer: "maison", category: "coding", description: "x" }],
    }));
    const result = await parseTimesheetNL("0h maison", ctx);
    expect(result.error).toMatch(/hours/i);
    expect(result.commands).toHaveLength(0);
  });

  it("rejects hours > 12", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 20, employer: "maison", category: "coding", description: "x" }],
    }));
    const result = await parseTimesheetNL("20h maison", ctx);
    expect(result.error).toMatch(/hours/i);
    expect(result.commands).toHaveLength(0);
  });

  it("rejects malformed date", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 2, employer: "maison", category: "coding", description: "x", date: "not-a-date" }],
    }));
    const result = await parseTimesheetNL("...", ctx);
    expect(result.error).toMatch(/date/i);
    expect(result.commands).toHaveLength(0);
  });

  it("rejects malformed time", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 2, employer: "maison", category: "coding", description: "x", start_time: "noon" }],
    }));
    const result = await parseTimesheetNL("...", ctx);
    expect(result.error).toMatch(/time/i);
    expect(result.commands).toHaveLength(0);
  });

  it("all-or-nothing: one bad entry kills the batch", async () => {
    mockLLM(JSON.stringify({
      entries: [
        { hours: 2, employer: "maison", category: "coding", description: "ok" },
        { hours: 1, employer: "asknyc", category: "meeting", description: "bad" },
      ],
    }));
    const result = await parseTimesheetNL("...", ctx);
    expect(result.error).toContain("unknown employer");
    expect(result.commands).toHaveLength(0);
  });
});

describe("parseTimesheetNL — LLM output handling", () => {
  it("passes through LLM-signalled error (not a timesheet)", async () => {
    mockLLM(JSON.stringify({ error: "not a timesheet entry", entries: [] }));
    const result = await parseTimesheetNL("what time is it", ctx);
    expect(result.error).toBe("not a timesheet entry");
    expect(result.commands).toHaveLength(0);
  });

  it("rejects non-JSON response", async () => {
    mockLLM("<html>server error</html>");
    const result = await parseTimesheetNL("...", ctx);
    expect(result.error).toMatch(/not valid JSON/i);
    expect(result.commands).toHaveLength(0);
  });

  it("rejects JSON missing entries field", async () => {
    mockLLM(JSON.stringify({ foo: "bar" }));
    const result = await parseTimesheetNL("...", ctx);
    expect(result.error).toMatch(/entries/i);
    expect(result.commands).toHaveLength(0);
  });

  it("employer match is case-insensitive", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 1, employer: "Maison", category: "coding", description: "x" }],
    }));
    const result = await parseTimesheetNL("1h Maison coding", ctx);
    expect(result.error).toBeUndefined();
    expect(result.commands[0]).toMatchObject({ employerId: "maison" });
  });

  it("strips markdown code fences if model adds them", async () => {
    mockLLM('```json\n{"entries":[{"hours":1,"employer":"maison","category":"coding","description":"x"}]}\n```');
    const result = await parseTimesheetNL("...", ctx);
    expect(result.error).toBeUndefined();
    expect(result.commands).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/timesheet/nl-parser.test.ts`
Expected: FAIL — `parseTimesheetNL` module not found.

- [ ] **Step 3: Implement `parseTimesheetNL`**

Create `src/timesheet/nl-parser.ts`:

```typescript
import { generate } from "../llm/provider.js";
import type { ReviewCommand } from "./telegram-review.js";

const VALID_CATEGORIES = new Set([
  "coding",
  "refactoring",
  "testing",
  "docs",
  "devops",
  "design",
  "research",
  "meeting",
  "communication",
]);

const TIME_RE = /^\d{1,2}:\d{2}[ap]$/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export interface ParseContext {
  now: Date;
  timezone: string;
  employers: string[];
}

export interface ParseResult {
  commands: ReviewCommand[];
  inferredDate: string;
  warnings: string[];
  error?: string;
  llmResponseRaw?: string;
  durationMs?: number;
  llmTokens?: number;
}

interface RawEntry {
  hours?: number;
  employer?: string;
  category?: string;
  description?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
}

interface LLMJson {
  entries?: RawEntry[];
  error?: string;
}

/** YYYY-MM-DD in the context's timezone (approximate; uses ISO date part of `now`). */
function todayISODate(now: Date): string {
  return now.toISOString().slice(0, 10);
}

function stripCodeFences(text: string): string {
  return text
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();
}

function buildPrompt(text: string, ctx: ParseContext): string {
  const dayOfWeek = ctx.now.toLocaleDateString("en-US", { weekday: "short" });
  const employerList = ctx.employers.join(", ");
  const categoryList = [...VALID_CATEGORIES].join(", ");
  return `You extract timesheet entries from natural language. Return JSON only — no prose, no markdown fences.

CONTEXT:
Current time: ${ctx.now.toISOString()}  (${dayOfWeek}, ${ctx.timezone})
Known employers: ${employerList}
Valid categories: ${categoryList}

RULES:
1. Return {"entries": [...]} — array even if one entry.
2. Each entry: {hours: number, employer: string, category: string, description: string, date?: "YYYY-MM-DD", start_time?: "H:MMa|p", end_time?: "H:MMa|p"}
3. Employer MUST be from the known list. If user mentions an unknown employer, return {"error": "unknown employer: <X>. Known: <list>", "entries": []}.
4. Category MUST be from the valid list. Infer from verbs:
   - "coded", "built", "implemented", "debugged" → coding
   - "refactored", "cleaned up" → refactoring
   - "wrote tests", "added tests" → testing
   - "wrote spec", "docs", "readme" → docs
   - "deployed", "infra", "devops" → devops
   - "designed", "wireframed", "mockup" → design
   - "researched", "investigated" → research
   - "meeting", "call", "sync", "standup", "1:1" → meeting
   - "slack", "email", "discussion" → communication
5. Dates:
   - "yesterday" → yesterday's date
   - "this morning", "today" → today's date; omit the \`date\` field
   - "Monday" → most recent past Monday (if today isn't Monday)
   - Explicit "Apr 15" → that date
6. Times:
   - "3-5pm" → start_time: "3:00p", end_time: "5:00p"
   - "from 9:15 to 10:45 AM" → start_time: "9:15a", end_time: "10:45a"
   - If only duration given ("2h yesterday") → omit start/end; caller back-calculates.
7. Multiple activities → multiple entries. "2h coding then 1h meeting" → two entries.
8. Description: concise, under 100 chars. Preserve specifics (names, project names).
9. If input is not about work hours at all → return {"error": "not a timesheet entry", "entries": []}.
10. Hours: 0 < hours <= 12. Reject silly values.

INPUT:
${text}

Return ONLY valid JSON.`;
}

export async function parseTimesheetNL(
  text: string,
  ctx: ParseContext,
): Promise<ParseResult> {
  const warnings: string[] = [];
  const start = Date.now();

  let rawText = "";
  let llmTokens: number | undefined;
  try {
    const response = await generate({
      prompt: buildPrompt(text, ctx),
      json: true,
      maxTokens: 1024,
    });
    rawText = response.text;
    llmTokens = response.outputTokens;
  } catch (err) {
    return {
      commands: [],
      inferredDate: todayISODate(ctx.now),
      warnings,
      error: `LLM call failed: ${err instanceof Error ? err.message : String(err)}`,
      durationMs: Date.now() - start,
    };
  }

  const durationMs = Date.now() - start;
  const cleaned = stripCodeFences(rawText);

  let parsed: LLMJson;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    return {
      commands: [],
      inferredDate: todayISODate(ctx.now),
      warnings,
      error: "LLM output not valid JSON",
      llmResponseRaw: rawText,
      durationMs,
      llmTokens,
    };
  }

  // LLM-signalled error passes through
  if (typeof parsed.error === "string" && parsed.error.length > 0) {
    return {
      commands: [],
      inferredDate: todayISODate(ctx.now),
      warnings,
      error: parsed.error,
      llmResponseRaw: rawText,
      durationMs,
      llmTokens,
    };
  }

  if (!Array.isArray(parsed.entries)) {
    return {
      commands: [],
      inferredDate: todayISODate(ctx.now),
      warnings,
      error: "LLM output missing 'entries' array",
      llmResponseRaw: rawText,
      durationMs,
      llmTokens,
    };
  }

  if (parsed.entries.length === 0) {
    return {
      commands: [],
      inferredDate: todayISODate(ctx.now),
      warnings,
      error: "No entries produced",
      llmResponseRaw: rawText,
      durationMs,
      llmTokens,
    };
  }

  const knownEmployersLower = new Map<string, string>();
  for (const e of ctx.employers) knownEmployersLower.set(e.toLowerCase(), e);

  const commands: ReviewCommand[] = [];
  const dates: string[] = [];

  for (let i = 0; i < parsed.entries.length; i++) {
    const e = parsed.entries[i];
    const idx = i + 1;

    if (typeof e.hours !== "number" || !Number.isFinite(e.hours) || e.hours <= 0 || e.hours > 12) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: invalid hours (${e.hours}). Must be > 0 and <= 12.`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }

    if (typeof e.employer !== "string" || e.employer.length === 0) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: missing employer`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }
    const normalizedEmployer = knownEmployersLower.get(e.employer.toLowerCase());
    if (!normalizedEmployer) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: unknown employer "${e.employer}". Known: ${ctx.employers.join(", ")}`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }

    if (typeof e.category !== "string" || !VALID_CATEGORIES.has(e.category)) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: invalid category "${e.category}". Valid: ${[...VALID_CATEGORIES].join(", ")}`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }

    if (typeof e.description !== "string" || e.description.length === 0) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: missing description`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }

    if (e.date !== undefined && !DATE_RE.test(e.date)) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: invalid date "${e.date}". Expected YYYY-MM-DD.`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }

    if (e.start_time !== undefined && !TIME_RE.test(e.start_time)) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: invalid start_time "${e.start_time}". Expected "H:MMa" or "H:MMp".`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }
    if (e.end_time !== undefined && !TIME_RE.test(e.end_time)) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: invalid end_time "${e.end_time}". Expected "H:MMa" or "H:MMp".`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }

    const cmd: ReviewCommand = {
      type: "add",
      hours: e.hours,
      employerId: normalizedEmployer,
      category: e.category,
      description: e.description,
    };
    if (e.start_time) (cmd as { startTime?: string }).startTime = e.start_time;
    if (e.end_time) (cmd as { endTime?: string }).endTime = e.end_time;
    commands.push(cmd);
    dates.push(e.date ?? todayISODate(ctx.now));
  }

  const inferredDate = dates.slice().sort()[0];

  return {
    commands,
    inferredDate,
    warnings,
    llmResponseRaw: rawText,
    durationMs,
    llmTokens,
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/timesheet/nl-parser.test.ts`
Expected: PASS (all cases).

- [ ] **Step 5: Commit**

```bash
cd /Users/rahilsinghi/Desktop/brain
git add src/timesheet/nl-parser.ts tests/timesheet/nl-parser.test.ts
git commit -m "feat(timesheet): NL parser — English text → ReviewCommand[]"
```

---

### Task 3: Build `handleTimesheetNL` (shared handler)

**Files:**
- Create: `src/timesheet/nl-handler.ts`
- Test: `tests/timesheet/nl-handler.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/timesheet/nl-handler.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const mockGenerate = vi.fn();
vi.mock("../../src/llm/provider.js", () => ({
  generate: (...args: unknown[]) => mockGenerate(...args),
}));

import { TimesheetDB } from "../../src/timesheet/db.js";
import { handleTimesheetNL } from "../../src/timesheet/nl-handler.js";

function mockLLM(obj: unknown): void {
  mockGenerate.mockResolvedValue({
    text: JSON.stringify(obj),
    provider: "ollama",
    model: "qwen3:32b",
    inputTokens: 100,
    outputTokens: 50,
  });
}

describe("handleTimesheetNL", () => {
  let dir: string;
  let db: TimesheetDB;

  beforeEach(() => {
    mockGenerate.mockReset();
    dir = mkdtempSync(join(tmpdir(), "brain-ts-nl-h-"));
    db = new TimesheetDB(join(dir, "ts.db"));
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });
    db.upsertEmployer({ id: "wilbo", rate_hourly: 0, weekly_cap_hours: null, monthly_bonus: null, currency: "USD" });
  });

  afterEach(() => {
    db.close();
    rmSync(dir, { recursive: true, force: true });
  });

  it("parses, applies, and returns success summary for single entry", async () => {
    mockLLM({
      entries: [{ hours: 2, employer: "maison", category: "coding", description: "PoC", date: "2026-04-16", start_time: "3:00p", end_time: "5:00p" }],
    });

    const response = await handleTimesheetNL("2h maison PoC 3-5pm yesterday", {
      now: new Date("2026-04-17T10:00:00-04:00"),
      timezone: "America/New_York",
      db,
      source: "mcp",
    });

    expect(response).toContain("✓");
    expect(response).toContain("Added");
    expect(response).toContain("maison");

    const entries = db.getEntriesByDateRange("2026-04-16", "2026-04-16");
    expect(entries).toHaveLength(1);
    expect(entries[0].hours).toBe(2);
    expect(entries[0].employer_id).toBe("maison");
    expect(entries[0].description).toBe("PoC");
  });

  it("creates multiple DB entries for multi-entry input", async () => {
    mockLLM({
      entries: [
        { hours: 2, employer: "maison", category: "coding", description: "coding", date: "2026-04-16" },
        { hours: 1, employer: "maison", category: "meeting", description: "1:1", date: "2026-04-16" },
      ],
    });

    await handleTimesheetNL("2h coding then 1h 1:1", {
      now: new Date("2026-04-17T10:00:00-04:00"),
      timezone: "America/New_York",
      db,
      source: "telegram_text",
    });

    const entries = db.getEntriesByDateRange("2026-04-16", "2026-04-16");
    expect(entries).toHaveLength(2);
  });

  it("writes a telemetry row on success", async () => {
    mockLLM({
      entries: [{ hours: 1, employer: "maison", category: "coding", description: "x" }],
    });

    await handleTimesheetNL("1h maison coding", {
      now: new Date("2026-04-17T10:00:00-04:00"),
      timezone: "America/New_York",
      db,
      source: "cli",
    });

    // Direct SQL to assert row exists (no accessor for "latest")
    const rows = (db as unknown as { db: { prepare(s: string): { all(): unknown[] } } }).db
      .prepare("SELECT * FROM nl_parse_log")
      .all() as Array<{ source: string; entries_created: number; error: string | null }>;
    expect(rows).toHaveLength(1);
    expect(rows[0].source).toBe("cli");
    expect(rows[0].entries_created).toBe(1);
    expect(rows[0].error).toBeNull();
  });

  it("writes a telemetry row on failure and does NOT write to entries table", async () => {
    mockLLM({ error: "not a timesheet entry", entries: [] });

    const response = await handleTimesheetNL("what time is it", {
      now: new Date("2026-04-17T10:00:00-04:00"),
      timezone: "America/New_York",
      db,
      source: "mcp",
    });

    expect(response).toContain("✗");
    expect(response.toLowerCase()).toContain("not a timesheet");

    const entries = db.getEntriesByDateRange("2026-04-16", "2026-04-18");
    expect(entries).toHaveLength(0);

    const rows = (db as unknown as { db: { prepare(s: string): { all(): unknown[] } } }).db
      .prepare("SELECT * FROM nl_parse_log")
      .all() as Array<{ source: string; entries_created: number; error: string | null }>;
    expect(rows).toHaveLength(1);
    expect(rows[0].entries_created).toBe(0);
    expect(rows[0].error).toBe("not a timesheet entry");
  });

  it("unknown employer produces actionable error listing known employers", async () => {
    mockLLM({
      entries: [{ hours: 2, employer: "asknyc", category: "coding", description: "x" }],
    });

    const response = await handleTimesheetNL("2h asknyc coding", {
      now: new Date("2026-04-17T10:00:00-04:00"),
      timezone: "America/New_York",
      db,
      source: "mcp",
    });

    expect(response).toContain("✗");
    expect(response).toContain("asknyc");
    expect(response).toContain("maison");
    expect(response).toContain("wilbo");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/timesheet/nl-handler.test.ts`
Expected: FAIL — `handleTimesheetNL` not found.

- [ ] **Step 3: Implement `handleTimesheetNL`**

Create `src/timesheet/nl-handler.ts`:

```typescript
import type { TimesheetDB } from "./db.js";
import { applyReviewCommands } from "./telegram-review.js";
import { parseTimesheetNL, type ParseContext } from "./nl-parser.js";

export type NLSource =
  | "telegram_text"
  | "telegram_voice"
  | "mcp"
  | "cli"
  | "api";

export interface HandlerDeps {
  now: Date;
  timezone: string;
  db: TimesheetDB;
  source: NLSource;
}

export async function handleTimesheetNL(
  text: string,
  deps: HandlerDeps,
): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) {
    deps.db.logNLParse({
      timestamp: deps.now.toISOString(),
      source: deps.source,
      input_text: text,
      llm_response: null,
      entries_created: 0,
      error: "empty input",
      duration_ms: 0,
      llm_tokens: null,
    });
    return "✗ Empty input. Try: /ts 2h maison coding 3-5pm";
  }

  const ctx: ParseContext = {
    now: deps.now,
    timezone: deps.timezone,
    employers: deps.db.getEmployerIds(),
  };

  const parse = await parseTimesheetNL(trimmed, ctx);

  // Always log (pass or fail)
  deps.db.logNLParse({
    timestamp: deps.now.toISOString(),
    source: deps.source,
    input_text: trimmed,
    llm_response: parse.llmResponseRaw ?? null,
    entries_created: parse.commands.length,
    error: parse.error ?? null,
    duration_ms: parse.durationMs ?? null,
    llm_tokens: parse.llmTokens ?? null,
  });

  console.log(
    `[ts-nl] parse(${deps.source}, ${trimmed.length} chars) → ${
      parse.error ? `error: ${parse.error}` : `${parse.commands.length} entries`
    } in ${parse.durationMs ?? 0}ms${parse.llmTokens ? ` (${parse.llmTokens} tok)` : ""}`,
  );

  if (parse.error) {
    return `✗ ${parse.error}`;
  }

  const results = applyReviewCommands(
    deps.db,
    parse.commands,
    [],
    parse.inferredDate,
  );

  const lines: string[] = [];
  lines.push(`✓ Added ${results.filter((r) => r.success).length} entries`);
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    const cmd = parse.commands[i] as { hours: number; employerId: string; category: string; description: string; startTime?: string; endTime?: string };
    if (r.success) {
      const timeSuffix = cmd.startTime && cmd.endTime
        ? ` ${cmd.startTime}–${cmd.endTime}`
        : "";
      lines.push(
        `  • ${cmd.hours}h ${cmd.employerId} (${cmd.category}${timeSuffix}) — ${cmd.description}`,
      );
    } else {
      lines.push(`  ✗ ${r.error ?? r.message}`);
    }
  }
  lines.push("Reply with #N = Xh to edit or drop #N to remove.");
  return lines.join("\n");
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/timesheet/nl-handler.test.ts`
Expected: PASS (5/5).

- [ ] **Step 5: Commit**

```bash
cd /Users/rahilsinghi/Desktop/brain
git add src/timesheet/nl-handler.ts tests/timesheet/nl-handler.test.ts
git commit -m "feat(timesheet): NL handler — parse, log, apply, format response"
```

---

## Phase 2: Telegram text entry point (`/ts` prefix via relay)

### Task 4: Wire `timesheet_nl` case into relay sync

**Files:**
- Modify: `src/relay/sync.ts`
- Test: `tests/relay/sync.test.ts` (add new case)

- [ ] **Step 1: Write the failing test**

Append to `tests/relay/sync.test.ts` inside the `describe("syncRelayInbound", ...)` block:

```typescript
  it("processes timesheet_nl item when timesheetDb is provided", async () => {
    // Construct a real in-memory-ish DB using tmp dir (matches nl-handler test pattern)
    const { mkdtempSync, rmSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");
    const { TimesheetDB } = await import("../../src/timesheet/db.js");

    const dir = mkdtempSync(join((await import("node:os")).tmpdir(), "brain-relay-nl-"));
    const tdb = new TimesheetDB(join(dir, "ts.db"));
    tdb.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });

    // Mock generate() so no real LLM call fires
    vi.resetModules();
    vi.doMock("../../src/llm/provider.js", () => ({
      generate: vi.fn().mockResolvedValue({
        text: JSON.stringify({ entries: [{ hours: 1, employer: "maison", category: "coding", description: "x" }] }),
        provider: "ollama",
        model: "qwen3:32b",
        inputTokens: 10,
        outputTokens: 10,
      }),
    }));
    const { syncRelayInbound: sync } = await import("../../src/relay/sync.js");

    const item = makeItem({ id: "nl-1", type: "timesheet_nl", raw_text: "1h maison coding" });
    const client = makeMockClient([item]);
    const deps: SyncDeps = { ...makeDeps(client), timesheetDb: tdb };

    const result = await sync(deps);

    expect(client.postResponse).toHaveBeenCalledWith(
      "nl-1",
      expect.stringContaining("✓"),
      "completed",
    );
    expect(result.processed).toBe(1);

    tdb.close();
    rmSync(dir, { recursive: true, force: true });
    vi.doUnmock("../../src/llm/provider.js");
  });

  it("returns 'not configured' when timesheetDb missing for timesheet_nl", async () => {
    const item = makeItem({ id: "nl-2", type: "timesheet_nl", raw_text: "1h maison coding" });
    const client = makeMockClient([item]);
    const deps = makeDeps(client); // no timesheetDb

    const result = await syncRelayInbound(deps);

    expect(client.postResponse).toHaveBeenCalledWith(
      "nl-2",
      expect.stringContaining("Timesheet not configured"),
      "completed",
    );
    expect(result.processed).toBe(1);
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/relay/sync.test.ts`
Expected: FAIL — the `timesheet_nl` case returns `"Unknown type: timesheet_nl"`, assertion on `✓` fails.

- [ ] **Step 3: Add the `timesheet_nl` case to `processItem`**

In `src/relay/sync.ts`, locate the `switch (item.type)` block (around line 43) and add this case after the existing `timesheet_reply` case and before the `default:`:

```typescript
    case "timesheet_nl": {
      if (!deps.timesheetDb) return "Timesheet not configured.";
      const { handleTimesheetNL } = await import("../timesheet/nl-handler.js");
      return await handleTimesheetNL(item.raw_text ?? "", {
        now: new Date(),
        timezone: deps.timesheetConfig?.scanner.timezone ?? "America/New_York",
        db: deps.timesheetDb,
        source: "telegram_text",
      });
    }
```

Note the dynamic `import` — avoids a hard dep at module-load time so the existing tests that don't provide `timesheetDb` won't inadvertently load the NL parser.

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/relay/sync.test.ts`
Expected: PASS — the new cases pass and all prior cases still pass.

- [ ] **Step 5: Commit**

```bash
cd /Users/rahilsinghi/Desktop/brain
git add src/relay/sync.ts tests/relay/sync.test.ts
git commit -m "feat(relay): route timesheet_nl items to NL handler"
```

---

## Phase 3: Voice prefix detection

### Task 5: Add voice-prefix detection to `voice-parser.ts`

**Files:**
- Modify: `src/voice/voice-parser.ts`
- Test: `tests/voice/voice-parser.test.ts` (extend existing)

- [ ] **Step 1: Write the failing test**

Append to `tests/voice/voice-parser.test.ts` inside the existing `describe("parseVoice", ...)` block. If the test file doesn't exist yet, create it with this scaffolding:

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseVoice } from "../../src/voice/voice-parser.js";
import type { TranscriptionProvider } from "../../src/voice/transcribe.js";
import type { ClassifyResult } from "../../src/voice/classify.js";

describe("parseVoice — timesheet prefix detection", () => {
  let vaultRoot: string;
  let audioPath: string;

  beforeEach(() => {
    vaultRoot = mkdtempSync(join(tmpdir(), "brain-voice-ts-"));
    audioPath = join(vaultRoot, "raw/voice/test.wav");
    require("node:fs").mkdirSync(join(vaultRoot, "raw/voice"), { recursive: true });
    writeFileSync(audioPath, "fake wav bytes");
  });

  afterEach(() => {
    rmSync(vaultRoot, { recursive: true, force: true });
  });

  it("routes transcripts starting with 'timesheet' to the nl hook and does NOT write a voice drop", async () => {
    const provider: TranscriptionProvider = {
      transcribe: async () => ({ text: "timesheet 2 hours maison coding from 3 to 5 PM yesterday" }),
    };
    const classifyFn = vi.fn<(t: string) => Promise<ClassifyResult>>();

    const nlHook = vi.fn<(stripped: string) => Promise<void>>().mockResolvedValue(undefined);

    await parseVoice(audioPath, vaultRoot, provider, classifyFn, { onTimesheetNL: nlHook });

    expect(nlHook).toHaveBeenCalledOnce();
    expect(nlHook.mock.calls[0][0]).toBe("2 hours maison coding from 3 to 5 PM yesterday");
    expect(classifyFn).not.toHaveBeenCalled();
    // No cluster drop written
    const workDir = join(vaultRoot, "raw/work");
    expect(existsSync(workDir)).toBe(false);
    // Sidecar IS written so we don't re-process
    expect(existsSync(audioPath + ".processed")).toBe(true);
  });

  it("routes 'log time' prefix the same way", async () => {
    const provider: TranscriptionProvider = {
      transcribe: async () => ({ text: "log time: 1 hour wilbo meeting" }),
    };
    const classifyFn = vi.fn<(t: string) => Promise<ClassifyResult>>();
    const nlHook = vi.fn().mockResolvedValue(undefined);

    await parseVoice(audioPath, vaultRoot, provider, classifyFn, { onTimesheetNL: nlHook });

    expect(nlHook).toHaveBeenCalledOnce();
    expect(nlHook.mock.calls[0][0]).toBe("1 hour wilbo meeting");
  });

  it("falls through to cluster classifier when no prefix", async () => {
    const provider: TranscriptionProvider = {
      transcribe: async () => ({ text: "just brainstorming some product ideas" }),
    };
    const classifyFn = vi.fn<(t: string) => Promise<ClassifyResult>>().mockResolvedValue({
      cluster: "work",
      text: "just brainstorming some product ideas",
      fallback: false,
    });
    const nlHook = vi.fn().mockResolvedValue(undefined);

    await parseVoice(audioPath, vaultRoot, provider, classifyFn, { onTimesheetNL: nlHook });

    expect(nlHook).not.toHaveBeenCalled();
    expect(classifyFn).toHaveBeenCalledOnce();
    // A drop WAS written under raw/work/
    const workDir = join(vaultRoot, "raw/work");
    expect(existsSync(workDir)).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/voice/voice-parser.test.ts`
Expected: FAIL — `parseVoice` signature doesn't accept an options arg with `onTimesheetNL`.

- [ ] **Step 3: Update `parseVoice` to detect the prefix and call the hook**

Replace the contents of `src/voice/voice-parser.ts` with:

```typescript
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { writeFrontmatter } from "../frontmatter.js";
import { appendDailyEntry } from "../daily/log.js";
import type { TranscriptionProvider } from "./transcribe.js";
import type { ClassifyResult } from "./classify.js";

type ClassifyFn = (text: string) => Promise<ClassifyResult>;

export interface VoiceParserOptions {
  /**
   * If the transcript begins with "timesheet", "time sheet", "ts", or
   * "log time" (case-insensitive, optional trailing punctuation), the prefix
   * is stripped and this hook is invoked with the remainder. When this hook
   * is provided AND matches, the cluster classifier is bypassed and no wiki
   * drop is written. The sidecar is still written to prevent re-processing.
   */
  onTimesheetNL?: (strippedText: string) => Promise<void>;
}

const TIMESHEET_PREFIX_RE = /^\s*(timesheet|time sheet|ts|log time)\b[,.:!-]?\s*/i;

export async function parseVoice(
  audioPath: string,
  vaultRoot: string,
  provider: TranscriptionProvider,
  classifyFn: ClassifyFn,
  opts: VoiceParserOptions = {},
): Promise<void> {
  const sidecarPath = audioPath + ".processed";

  if (existsSync(sidecarPath)) {
    console.log(`[voice-parser] skipping already-processed: ${basename(audioPath)}`);
    return;
  }

  const transcription = await provider.transcribe(audioPath);
  const raw = transcription.text;

  // Check for timesheet prefix — bypass cluster classifier if matched
  const match = raw.match(TIMESHEET_PREFIX_RE);
  if (match && opts.onTimesheetNL) {
    const stripped = raw.slice(match[0].length).trim();
    console.log(`[voice-parser] ${basename(audioPath)} → timesheet NL (stripped ${match[0].length} chars)`);
    try {
      await opts.onTimesheetNL(stripped);
    } catch (err) {
      console.error(
        `[voice-parser] onTimesheetNL hook failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
    // Always write the sidecar so we don't re-process
    writeFileSync(sidecarPath, "", "utf-8");
    return;
  }

  // Fall through: cluster classify and write a wiki drop
  const classification = await classifyFn(raw);

  const { cluster, text, fallback } = classification;
  const now = new Date().toISOString();
  const timestamp = now.replace(/[:.]/g, "-").replace("Z", "");
  const audioBasename = basename(audioPath);

  const clusterDir = join(vaultRoot, "raw", cluster);
  mkdirSync(clusterDir, { recursive: true });

  const dropFilename = `voice-${timestamp}.md`;
  const dropPath = join(clusterDir, dropFilename);

  const frontmatter: Record<string, unknown> = {
    status: "pending",
    source_type: "voice",
    cluster,
    audio_file: `raw/voice/${audioBasename}`,
    transcription_duration_s: transcription.duration_s ?? null,
    language: transcription.language ?? null,
    classification_fallback: fallback,
    source_id: `voice/${audioBasename}`,
    ingested_at: now,
    parsed_at: now,
    compiled_to: null,
    processed_at: null,
    retry_count: 0,
    last_error: null,
    compile_progress: null,
  };

  writeFrontmatter(dropPath, frontmatter, text);
  writeFileSync(sidecarPath, "", "utf-8");

  const preview = text.length > 80 ? `${text.slice(0, 80)}...` : text;
  appendDailyEntry(vaultRoot, cluster, `Voice: "${preview}" (transcribed)`);

  console.log(
    `[voice-parser] ${audioBasename} → raw/${cluster}/${dropFilename} (cluster: ${cluster}, fallback: ${fallback})`,
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/voice/voice-parser.test.ts`
Expected: PASS (3/3 new cases; any pre-existing cases unaffected because `opts` is optional).

- [ ] **Step 5: Wire the hook into the daemon's voice pipeline**

Look for where `parseVoice` is called today. Run:

```bash
grep -n "parseVoice" /Users/rahilsinghi/Desktop/brain/src/*.ts /Users/rahilsinghi/Desktop/brain/src/**/*.ts
```

At each call site, add the `onTimesheetNL` option that invokes the shared handler and posts the result back to Telegram via the existing relay outbound path. Example wiring (exact path depends on the grep result; the implementer should adapt):

```typescript
await parseVoice(audioPath, vaultRoot, transcriptionProvider, classifyFn, {
  onTimesheetNL: async (stripped) => {
    if (!timesheetDb) return;
    const response = await handleTimesheetNL(stripped, {
      now: new Date(),
      timezone: timesheetConfig.scanner.timezone ?? "America/New_York",
      db: timesheetDb,
      source: "telegram_voice",
    });
    // Enqueue response via existing Telegram outbound path
    enqueueTelegramMessage(timesheetDb, response, "timesheet_nl_response");
  },
});
```

If the exact call site already has the bot-reply helper imported, use it. If not, add an import. Do not invent a new helper — use whatever the existing text path (e.g. `relayClient.postResponse` or `enqueueTelegramMessage`) uses.

- [ ] **Step 6: Commit**

```bash
cd /Users/rahilsinghi/Desktop/brain
git add src/voice/voice-parser.ts tests/voice/voice-parser.test.ts
# Include the call-site change from Step 5 in this commit as well
git commit -m "feat(voice): detect 'timesheet' prefix and route to NL handler"
```

---

## Phase 4: HTTP route + MCP tool

### Task 6: Add `POST /timesheet/nl` route

**Files:**
- Create: `src/api/routes/timesheet-nl.ts`
- Modify: `src/api/server.ts`
- Test: `tests/api/routes/timesheet-nl.test.ts` (new)

- [ ] **Step 1: Write the failing test**

Create `tests/api/routes/timesheet-nl.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Fastify from "fastify";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const mockGenerate = vi.fn();
vi.mock("../../../src/llm/provider.js", () => ({
  generate: (...args: unknown[]) => mockGenerate(...args),
}));

import { TimesheetDB } from "../../../src/timesheet/db.js";
import { timesheetNLRoute } from "../../../src/api/routes/timesheet-nl.js";

describe("POST /timesheet/nl", () => {
  let dir: string;
  let db: TimesheetDB;

  beforeEach(() => {
    mockGenerate.mockReset();
    dir = mkdtempSync(join(tmpdir(), "brain-ts-nl-api-"));
    db = new TimesheetDB(join(dir, "ts.db"));
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });
  });

  afterEach(() => {
    db.close();
    rmSync(dir, { recursive: true, force: true });
  });

  async function buildApp() {
    const app = Fastify();
    app.decorate("timesheetDb", db);
    app.decorate("config", {
      timesheet: { scanner: { timezone: "America/New_York" } },
    } as never);
    await app.register(timesheetNLRoute);
    return app;
  }

  it("returns 200 with formatted response on success", async () => {
    mockGenerate.mockResolvedValue({
      text: JSON.stringify({ entries: [{ hours: 1, employer: "maison", category: "coding", description: "x" }] }),
      provider: "ollama",
      model: "qwen3:32b",
      inputTokens: 10,
      outputTokens: 10,
    });

    const app = await buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/timesheet/nl",
      payload: { text: "1h maison coding", source: "mcp" },
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("✓");
    expect(res.body).toContain("maison");
    await app.close();
  });

  it("returns 400 on empty text", async () => {
    const app = await buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/timesheet/nl",
      payload: { text: "" },
    });

    expect(res.statusCode).toBe(400);
    await app.close();
  });

  it("returns 200 with error body on LLM failure (not 500)", async () => {
    mockGenerate.mockResolvedValue({
      text: JSON.stringify({ error: "not a timesheet entry", entries: [] }),
      provider: "ollama",
      model: "qwen3:32b",
      inputTokens: 10,
      outputTokens: 10,
    });

    const app = await buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/timesheet/nl",
      payload: { text: "what time is it" },
    });

    // User-visible error, but HTTP call itself is fine
    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("✗");
    await app.close();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/api/routes/timesheet-nl.test.ts`
Expected: FAIL — `timesheetNLRoute` not found.

- [ ] **Step 3: Implement the route**

Create `src/api/routes/timesheet-nl.ts`:

```typescript
import type { FastifyInstance } from "fastify";
import { handleTimesheetNL, type NLSource } from "../../timesheet/nl-handler.js";

interface NLBody {
  text: string;
  source?: NLSource;
}

const nlSchema = {
  body: {
    type: "object" as const,
    required: ["text"],
    properties: {
      text: { type: "string" },
      source: { type: "string" },
    },
  },
};

export async function timesheetNLRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: NLBody }>(
    "/timesheet/nl",
    { schema: nlSchema },
    async (request, reply) => {
      const { text, source } = request.body;
      if (!text || text.trim().length === 0) {
        return reply.status(400).send({ error: "Empty text" });
      }

      const db = app.timesheetDb;
      const timezone =
        (app.config as { timesheet?: { scanner?: { timezone?: string } } }).timesheet?.scanner
          ?.timezone ?? "America/New_York";

      const response = await handleTimesheetNL(text, {
        now: new Date(),
        timezone,
        db,
        source: source ?? "api",
      });

      return reply
        .type("text/plain; charset=utf-8")
        .status(200)
        .send(response);
    },
  );
}
```

- [ ] **Step 4: Register the route in `server.ts`**

In `src/api/server.ts`, add the import next to the other route imports:

```typescript
import { timesheetNLRoute } from "./routes/timesheet-nl.js";
```

Inside the `if (opts.timesheetDb) { ... }` block (currently registers `timesheetLogRoute` and `timesheetStatusRoute`), add:

```typescript
    app.register(timesheetNLRoute);
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd /Users/rahilsinghi/Desktop/brain && pnpm vitest run tests/api/routes/timesheet-nl.test.ts`
Expected: PASS (3/3).

Also run: `pnpm vitest run tests/api/` to confirm no regressions in existing route tests.

- [ ] **Step 6: Commit**

```bash
cd /Users/rahilsinghi/Desktop/brain
git add src/api/routes/timesheet-nl.ts src/api/server.ts tests/api/routes/timesheet-nl.test.ts
git commit -m "feat(api): POST /timesheet/nl for natural-language entries"
```

---

### Task 7: Add `brain_timesheet_add` MCP tool

**Files:**
- Modify: `~/.claude/mcp/brain/index.ts`

- [ ] **Step 1: Inspect the existing tool registration pattern**

Run:

```bash
grep -n "server.tool" ~/.claude/mcp/brain/index.ts | head -20
```

Identify the pattern (3-arg `server.tool(name, description, schema, handler)` based on existing `brain_query` and `brain_graphify` tools).

- [ ] **Step 2: Add the tool**

Before the `async function main()` block at the bottom of `~/.claude/mcp/brain/index.ts`, insert:

```typescript
server.tool(
  "brain_timesheet_add",
  "Log timesheet hours in natural language. Describe work, employer, duration, and when — e.g., '2h maison coding 3-5pm yesterday' or 'just finished 45min standup with Fredrik'. Creates draft entries (status: draft) reviewable via the existing daily review message.",
  {
    text: z
      .string()
      .min(1)
      .describe("Natural-language description of work hours to log."),
  },
  async ({ text }) => {
    try {
      const res = await fetch(`${BRAIN_API}/timesheet/nl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, source: "mcp" }),
        signal: AbortSignal.timeout(60_000),
      });
      const body = await res.text();
      if (!res.ok) {
        return {
          content: [{ type: "text" as const, text: `Brain API error (${res.status}): ${body}` }],
          isError: true,
        };
      }
      return { content: [{ type: "text" as const, text: body }] };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text" as const, text: `Brain daemon unreachable: ${msg}` }],
        isError: true,
      };
    }
  },
);
```

- [ ] **Step 3: Start the MCP server locally and verify it loads**

Run:

```bash
cd ~/.claude/mcp/brain
timeout 3 npx tsx index.ts 2>&1 | head -5 || true
```

Expected: Output contains `[brain-mcp] Connected via stdio` (or similar success line). No TypeScript/Zod errors.

- [ ] **Step 4: Smoke-test the tool against a running daemon**

With the daemon running (`launchctl list com.rahilsinghi.brain-daemon` shows a PID):

```bash
curl -s -X POST http://127.0.0.1:3577/timesheet/nl \
  -H "Content-Type: application/json" \
  -d '{"text":"test 0.1h maison coding smoke test","source":"mcp"}'
```

Expected: A `✓ Added 1 entries` string. (You can delete the test entry afterwards via the existing `drop #N` command in Telegram, or leave it — it's 6 minutes.)

- [ ] **Step 5: Commit**

```bash
cd ~/dotfiles  # MCP server lives under dotfiles
git add claude/mcp/brain/index.ts
git commit -m "feat(mcp): add brain_timesheet_add tool"
```

---

## Phase 5: CLI entry point

### Task 8: `brain ts add "<text>"` CLI wrapper

**Files:**
- Create: `src/cli/timesheet-add.ts`
- Modify: `package.json`

- [ ] **Step 1: Implement the CLI script**

Create `src/cli/timesheet-add.ts`:

```typescript
/**
 * brain ts add "<natural language>"
 *
 * Thin HTTP client: posts the text to the local daemon at
 * http://127.0.0.1:3577/timesheet/nl and prints the response.
 *
 * Usage: bun run src/cli/timesheet-add.ts "2h maison coding 3-5pm yesterday"
 */

const TIMEOUT_MS = 60_000;
const DAEMON = process.env.BRAIN_API_URL ?? "http://127.0.0.1:3577";

async function main(): Promise<void> {
  const text = process.argv.slice(2).join(" ").trim();
  if (!text) {
    console.error("Usage: brain ts add \"<natural language>\"");
    console.error("Example: brain ts add \"2h maison coding 3-5pm yesterday\"");
    process.exit(2);
  }

  let response: Response;
  try {
    response = await fetch(`${DAEMON}/timesheet/nl`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, source: "cli" }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`✗ Daemon unreachable at ${DAEMON}: ${msg}`);
    process.exit(1);
  }

  const body = await response.text();
  if (!response.ok) {
    console.error(`✗ Daemon error (${response.status}): ${body}`);
    process.exit(1);
  }

  console.log(body);
  // Exit non-zero if the response itself reports a user-visible failure,
  // so shell pipelines can detect it.
  if (body.trim().startsWith("✗")) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`✗ Unexpected error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
```

- [ ] **Step 2: Add the npm script**

In `/Users/rahilsinghi/Desktop/brain/package.json`, add inside the `"scripts"` object (keep alphabetical order if the file uses it; otherwise append):

```json
    "ts:add": "bun run src/cli/timesheet-add.ts"
```

- [ ] **Step 3: Smoke-test the CLI**

With the daemon running:

```bash
cd /Users/rahilsinghi/Desktop/brain
pnpm ts:add "0.1h maison coding cli smoke test"
```

Expected: Output starts with `✓ Added 1 entries`.

If the daemon is not running:

```bash
launchctl stop com.rahilsinghi.brain-daemon
sleep 2
pnpm ts:add "0.1h maison coding cli smoke test"
```

Expected: Output starts with `✗ Daemon unreachable at http://127.0.0.1:3577`.
After testing, restart the daemon: `launchctl start com.rahilsinghi.brain-daemon`.

- [ ] **Step 4: Commit**

```bash
cd /Users/rahilsinghi/Desktop/brain
git add src/cli/timesheet-add.ts package.json
git commit -m "feat(cli): brain ts add — NL timesheet entry from shell"
```

---

## Phase 6: Cross-checks & cleanup

### Task 9: End-to-end integration smoke test (manual)

**Files:** None (manual verification)

- [ ] **Step 1: Restart the daemon with the new code**

```bash
launchctl stop com.rahilsinghi.brain-daemon
sleep 2
launchctl start com.rahilsinghi.brain-daemon
sleep 8
curl -s http://127.0.0.1:3577/health
```

Expected: JSON showing `"status":"ok"`.

- [ ] **Step 2: Try all four entry points in order**

1. **CLI:**

```bash
pnpm --silent ts:add "0.25h maison meeting cli path test"
```

Expected: `✓ Added 1 entries` with a `meeting` line.

2. **HTTP directly (stands in for MCP):**

```bash
curl -s -X POST http://127.0.0.1:3577/timesheet/nl \
  -H "Content-Type: application/json" \
  -d '{"text":"0.25h maison coding http path test","source":"mcp"}'
```

Expected: `✓ Added 1 entries` response.

3. **Telegram text:** From your phone, send `/ts 0.25h maison coding telegram text test` to the bot. Expect a reply `✓ Added 1 entries` with details.

4. **Telegram voice:** Record a short voice note starting with "timesheet" — e.g. "timesheet, fifteen minutes maison coding voice test". Expect the same `✓ Added` reply.

- [ ] **Step 3: Check the telemetry**

```bash
sqlite3 /Users/rahilsinghi/Desktop/brain/.brain/timesheet.db \
  "SELECT source, entries_created, error, duration_ms FROM nl_parse_log ORDER BY timestamp DESC LIMIT 8;"
```

Expected: Four rows (one per entry point) with `entries_created=1` and `error=NULL`.

- [ ] **Step 4: Clean up the smoke-test entries**

In Telegram, reply to the most recent timesheet review with `drop #N` for each of the test entries (or leave them — they're each < 30 minutes).

- [ ] **Step 5: Commit nothing (this task is verification only)**

---

### Task 10: Full test suite + push

**Files:** None (runs the whole suite)

- [ ] **Step 1: Run the full test suite**

```bash
cd /Users/rahilsinghi/Desktop/brain
pnpm vitest run
```

Expected: All tests pass, including:
- `tests/timesheet/nl-parse-log.test.ts` (4)
- `tests/timesheet/nl-parser.test.ts` (~15)
- `tests/timesheet/nl-handler.test.ts` (5)
- `tests/voice/voice-parser.test.ts` (3 new + any pre-existing)
- `tests/relay/sync.test.ts` (2 new + any pre-existing)
- `tests/api/routes/timesheet-nl.test.ts` (3)

If any pre-existing tests fail, debug — do not skip. They should have been green before the work started.

- [ ] **Step 2: Push the branch**

```bash
cd /Users/rahilsinghi/Desktop/brain
git push
```

Push the dotfiles change separately:

```bash
cd ~/dotfiles
git push
```

- [ ] **Step 3: Done**

The NL timesheet feature is live across four entry points, reusing the existing `applyReviewCommands` pipeline. The `nl_parse_log` table gives you a full audit trail.

---

## Implementation Notes

1. **Prompt stability:** The prompt in Task 2 is copied verbatim from the spec. Don't paraphrase — the exact wording has been tuned. Changes belong in a follow-up task with regression tests.

2. **Dynamic import in relay sync:** Task 4 uses a dynamic `import` to avoid loading the NL parser at module-load time, which would otherwise break existing tests that don't configure `timesheetDb`. Keep it dynamic.

3. **Why `logNLParse` is always called:** Even failures produce a row, enabling replay. Don't add `if (!error) logNLParse(...)` optimization.

4. **All-or-nothing invariant:** The parser returns either (a) a full `commands` array and no error, or (b) empty `commands` and an `error`. Never partial. The handler relies on this.

5. **Voice sidecar on NL path:** Task 5 writes the `.processed` sidecar even when the NL hook runs, so the file is not re-processed on daemon restart. This also prevents the classifier from running on the same audio.

6. **MCP URL override:** The CLI reads `BRAIN_API_URL` env var so the same script works from the Mac Studio (localhost) and from the MacBook (via Tailscale MagicDNS). No change needed from users — default is localhost.

7. **Deferred — 90-day retention of `nl_parse_log`:** The spec mentions pruning rows older than 90 days. This plan does not add a retention cron because the table is trivially small (≈ 1 KB/row → ~1 MB/year of heavy use). When it matters, add a nightly cron that runs:
   ```sql
   DELETE FROM nl_parse_log WHERE timestamp < datetime('now','-90 days');
   ```
   alongside the existing lint/heal cron in `src/index.ts`. Not worth the test surface in v1.
