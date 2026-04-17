# Natural-Language Timesheet Entry — Design Spec

**Date:** 2026-04-17
**Status:** Approved, pending implementation
**Approach:** Thin Adapter (Approach A) — NL → `ReviewCommand[]` → existing `applyReviewCommands()`

## Overview

Add a natural-language path to log timesheet hours via Telegram text, Telegram voice, Claude Code MCP tool, and CLI. User speaks or types English; local Ollama (Qwen3 32B) parses into structured entries; existing `applyReviewCommands()` inserts them into the timesheet DB.

**Example:**
```
User: /ts worked on maison PoC 3-5pm yesterday, then 1h Fredrik 1:1
Bot:  ✓ Added 2 entries
      • 2h maison coding (3:00p–5:00p Apr 16) — maison.agent PoC work
      • 1h maison meeting (4:15p–5:15p Apr 16) — Fredrik 1:1
      Reply #N = Xh to edit, drop #N to remove.
```

**Philosophy:** Reuse every existing piece. No new DB writes, no new error formatting, no new retry logic — just a new NL → ReviewCommand translator.

## Goals

- Eliminate the rigid `+2h maison meeting desc 3:00p-5:00p` syntax in the common case
- Work over Telegram text, Telegram voice (spoken "timesheet" prefix), Claude Code MCP, and CLI
- Fail loudly on ambiguity (unknown employer, non-timesheet input) — never silently create billable data
- All-or-nothing on multi-entry messages (prevent partial writes)
- Zero cloud cost: runs entirely on local Qwen3 32B

## Non-Goals

- No confidence scoring per entry
- No smart intent detection (we use an explicit `/ts` prefix)
- No confirmation prompt (auto-insert; user corrects via existing `#N = Xh` / `drop #N`)
- No multilingual support (English only)
- No streaming responses
- No semantic search of past entries for context hints (maybe later)

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│ Entry points                                                  │
│ ├─ Telegram text:   /ts <natural language>                   │
│ ├─ Telegram voice:  "timesheet <...>" (whisper transcribes)  │
│ ├─ Claude Code MCP: brain_timesheet_add({text})              │
│ └─ CLI:             brain ts add "<text>"                    │
└──────────────────────────────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────────┐
│ handleTimesheetNL(text, ctx)  ← src/timesheet/nl-handler.ts  │
│  1. parseTimesheetNL(text, ctx)                              │
│  2. if error → return formatted error                        │
│  3. applyReviewCommands(db, cmds, [], inferredDate)          │
│  4. log to nl_parse_log table                                │
│  5. return formatted success                                 │
└──────────────────────────────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────────┐
│ parseTimesheetNL(text, ctx)  ← src/timesheet/nl-parser.ts    │
│  1. Build prompt with schema, employer list, category enum   │
│  2. generate({ prompt, json: true, model: "qwen3:32b" })     │
│  3. Validate JSON structure + semantic constraints           │
│  4. Convert entries → ReviewCommand[] ("add" type)           │
│  5. Return { commands, inferredDate, warnings, error? }      │
└──────────────────────────────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────────┐
│ applyReviewCommands(db, cmds, [], date)  ← existing, unchanged│
└──────────────────────────────────────────────────────────────┘
```

## Section 1: Core NL Parser (`src/timesheet/nl-parser.ts`)

Pure function, no I/O beyond calling the shared `generate()` LLM client.

### Interface

```typescript
export interface ParseContext {
  now: Date;                   // current time (for "now", "yesterday", etc.)
  timezone: string;            // "America/New_York"
  employers: string[];         // ["maison", "wilbo"] — from DB
}

export interface ParseResult {
  commands: ReviewCommand[];   // existing union from telegram-review.ts
  inferredDate: string;        // YYYY-MM-DD for applyReviewCommands
  warnings: string[];          // non-fatal notes
  error?: string;              // fatal error — commands array is empty
  llmResponseRaw?: string;     // stored for telemetry/replay
  durationMs?: number;
}

export async function parseTimesheetNL(
  text: string,
  context: ParseContext,
): Promise<ParseResult>;
```

### Logic

1. **Build LLM prompt** (see Section 3) with current time, timezone, employer list, category enum, and explicit schema.
2. **Call** `generate({ prompt, json: true, model: process.env.OLLAMA_MODEL_DEFAULT, maxTokens: 1024 })`.
3. **Parse JSON response.** If parse fails → `{ error: "LLM output not valid JSON", commands: [] }`.
4. **Check for `error` field in response** (LLM signalled unknown employer or non-timesheet). Pass through.
5. **Validate each entry:**
   - `employer` in `context.employers` (case-insensitive)
   - `category` in `EntryCategory` enum
   - `hours > 0 && hours <= 12`
   - `date` (if present) parses to YYYY-MM-DD
   - `start_time` / `end_time` (if present) match `/^\d{1,2}:\d{2}[ap]$/i`
6. **If any entry fails validation** → `{ error: "Entry N: <specific reason>", commands: [] }` (all-or-nothing).
7. **Convert entries → `ReviewCommand[]`** of type `"add"`:
   ```typescript
   { type: "add", hours, employerId, category, description, startTime?, endTime? }
   ```
8. **inferredDate**: pick the earliest entry's date, or fall back to today (in the server's timezone).

### Line budget: ~200 lines. Unit-testable with a mocked `generate()`.

## Section 2: Entry Points

### 2a. Telegram text: `/ts <text>`

**Wire-up:** New case in `src/relay/sync.ts`:
```typescript
case "timesheet_nl": {
  if (!deps.timesheetDb) return "Timesheet not configured.";
  return await handleTimesheetNL(item.raw_text, {
    now: new Date(),
    timezone: deps.timesheetConfig.scanner.timezone,
    employers: listEmployers(deps.timesheetDb),
    db: deps.timesheetDb,
    source: "telegram_text",
  });
}
```

**Relay server change:** Detects `/ts ` prefix in inbound message and sets `type: "timesheet_nl"`. The existing `/ts-status`, `/ts-eod`, etc. commands (no space after `/ts`) continue to route to `timesheet_command`. Prefix detection: `text.match(/^\/ts\s+/i)`.

**Fallback for backwards compat:** If user still sends `+2h maison meeting desc 3:00p-5:00p`, the relay maps to `timesheet_entry` (existing behavior unchanged).

### 2b. Telegram voice: spoken "timesheet" prefix

**Wire-up:** Extend `src/voice/voice-parser.ts`:
- After `provider.transcribe(audioPath)`, check if the transcript begins with a timesheet prefix word: regex `/^\s*(timesheet|time sheet|ts|log time)\b[,.:]?\s*/i`.
- If matched: strip the prefix, call `handleTimesheetNL(remaining, ctx)`. Bypass the cluster classifier entirely.
- Post the bot reply back to Telegram via the relay's existing outbound queue.
- If no prefix: existing cluster-classify path (unchanged).

**Why bypass cluster classifier:** Prevents timesheet entries from also landing in the wiki as "work" cluster notes. They're billable data, not knowledge.

**Proof-of-life from transcript:** Logs `[voice→ts-nl] stripped prefix 'timesheet', routing N chars to parser`.

### 2c. MCP tool: `brain_timesheet_add`

**New tool in `~/.claude/mcp/brain/index.ts`:**
```typescript
server.tool("brain_timesheet_add", {
  description: "Log timesheet hours in natural language. Describe work, employer, duration, and when — e.g., '2h maison coding 3-5pm yesterday' or 'just finished 45min standup with Fredrik'. Creates draft entries reviewable via brain_timesheet.",
  inputSchema: { text: z.string() }
}, async ({ text }) => {
  const res = await fetch(`${BRAIN_API}/timesheet/nl`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, source: "mcp" }),
    signal: AbortSignal.timeout(30000),
  });
  const body = await res.text();
  return { content: [{ type: "text" as const, text: body }] };
});
```

**New daemon route `POST /timesheet/nl`** (`src/api/routes/timesheet-nl.ts`):
- Body: `{ text: string, source?: string }`
- Calls `handleTimesheetNL()` with `source: body.source ?? "api"`
- Returns formatted string (same as Telegram reply)

### 2d. CLI: `brain ts add "<text>"`

**New script** `src/cli/timesheet-add.ts`:
- Positional arg = text
- POST to `localhost:3577/timesheet/nl` with 30s timeout
- Print response to stdout
- Exit 0 on success, 1 on error

**Script entry in `package.json`:**
```json
"ts:add": "bun run src/cli/timesheet-add.ts"
```

### Shared handler: `src/timesheet/nl-handler.ts`

One function used by all four entry points:

```typescript
export async function handleTimesheetNL(
  text: string,
  deps: {
    now: Date;
    timezone: string;
    db: TimesheetDB;
    source: 'telegram_text' | 'telegram_voice' | 'mcp' | 'cli' | 'api';
  }
): Promise<string>;  // formatted response text
```

Responsibilities:
1. Build `ParseContext` from deps
2. Call `parseTimesheetNL()`
3. Log to `nl_parse_log` (always, regardless of outcome)
4. If error → format error message, return
5. If success → `applyReviewCommands(db, commands, [], inferredDate)`, format outcomes, return

## Section 3: LLM Prompt & Contract

### Prompt template

```
You extract timesheet entries from natural language. Return JSON only — no prose, no markdown fences.

CONTEXT:
Current time: {now_iso}  ({day_of_week}, {timezone})
Known employers: {employers_list}
Valid categories: coding, refactoring, testing, docs, devops, design, research, meeting, communication

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
   - "this morning", "today" → today's date; omit the `date` field
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
{user_text}

Return ONLY valid JSON.
```

### Response contract

**Success:**
```json
{
  "entries": [
    {"hours": 2, "employer": "maison", "category": "coding", "description": "PoC implementation", "date": "2026-04-16", "start_time": "3:00p", "end_time": "5:00p"}
  ]
}
```

**Failure:**
```json
{"error": "unknown employer: asknyc. Known: maison, wilbo", "entries": []}
```

### Model

- **Primary:** `qwen3:32b` with `/no_think` prefix (already wired via provider).
- **Fallback via `generate()` auto-fallback chain:** Gemini → Anthropic if Ollama down.
- `maxTokens: 1024`. Even 5 entries fits in ~300 output tokens.

## Section 4: Error Handling, Observability, Testing

### Error classes

| Class | Trigger | User response |
|-------|---------|---------------|
| LLM output invalid | Not JSON, missing `entries`, wrong shape | `✗ Couldn't parse response. Try the +Xh format or re-phrase.` |
| Semantic validation | Unknown employer, bad category, hours > 12 | `✗ Entry 2: unknown employer "asknyc". Known: maison, wilbo. Nothing saved.` |
| Not a timesheet | LLM returns `{"error": "not a timesheet"}` | `✗ That doesn't look like hours. Try: /ts 2h maison coding 3-5pm` |

### All-or-nothing on multi-entry

If any entry in a batch fails validation, the entire request is rejected with a specific error pointing to the bad entry. Prevents confusion where only some entries landed.

### Telemetry: `nl_parse_log` table

```sql
CREATE TABLE nl_parse_log (
  id TEXT PRIMARY KEY,
  timestamp TEXT NOT NULL,
  source TEXT NOT NULL,        -- 'telegram_text' | 'telegram_voice' | 'mcp' | 'cli' | 'api'
  input_text TEXT NOT NULL,
  llm_response TEXT,           -- raw JSON string
  entries_created INTEGER NOT NULL DEFAULT 0,
  error TEXT,
  duration_ms INTEGER,
  llm_tokens INTEGER
);
CREATE INDEX idx_nl_parse_log_timestamp ON nl_parse_log(timestamp);
```

Every `handleTimesheetNL()` call writes a row regardless of outcome. Enables:
- Debug: grep for `error IS NOT NULL` to see failed parses with their input
- Replay: re-run old inputs against an updated parser
- Audit: proves what user said → what landed (billable accuracy)
- Metrics: success rate over time

Retention: prune rows older than 90 days via a cron job.

### Daemon stdout logs

```
[ts-nl] parse(telegram_text, 42 chars) → 2 entries in 1.8s (234 tok)
[ts-nl] parse(telegram_voice, 78 chars) → error: unknown employer 'asknyc'
```

### Testing

**Unit tests** (`tests/timesheet/nl-parser.test.ts`) — mocked `generate()`:
1. Single entry with explicit times
2. Single entry with duration only ("2h yesterday")
3. "Just finished 45min standup" → end = now
4. Multiple entries ("2h coding then 1h meeting")
5. Unknown employer → error, no commands
6. Invalid category → error
7. Hours > 12 → error
8. LLM returns malformed JSON → error
9. LLM returns `{error: "not a timesheet"}` → passed through
10. Empty text → error

**Integration tests** (`tests/timesheet/nl-handler.test.ts`) — real SQLite + mocked LLM:
- Parse → apply → verify DB state
- Assert `nl_parse_log` row created
- Multi-entry: all three entries present after apply

**Acceptance test** (manual or scripted against real daemon):
- Run 20 representative phrasings, assert success rate > 95%
- Categories fall within expected enum 100% of the time

## Files Created / Modified

### New files
- `src/timesheet/nl-parser.ts` — LLM → ReviewCommand[] translator (pure)
- `src/timesheet/nl-handler.ts` — Shared entry-point logic (parse + apply + log)
- `src/api/routes/timesheet-nl.ts` — `POST /timesheet/nl` route
- `src/cli/timesheet-add.ts` — CLI wrapper
- `tests/timesheet/nl-parser.test.ts`
- `tests/timesheet/nl-handler.test.ts`

### Modified files
- `src/relay/sync.ts` — new `timesheet_nl` case (alongside existing `timesheet_entry`)
- `src/voice/voice-parser.ts` — prefix detection + bypass to NL parser
- `src/timesheet/db.ts` — `logNLParse()` method + schema migration for `nl_parse_log`
- `src/api/server.ts` — register `timesheet-nl` route
- `package.json` — add `"ts:add"` script
- `~/.claude/mcp/brain/index.ts` — add `brain_timesheet_add` tool

### Relay server (external repo)
- Detect `/ts ` prefix, set `type: "timesheet_nl"`, forward to daemon

## Rollback

If the NL parser ever misbehaves (e.g., after a model update):
- The existing `+Xh employer cat desc` syntax still works unchanged (routes to `timesheet_entry`, not `timesheet_nl`)
- Can disable `/ts` handling in relay with one-line change
- No data migration needed — `nl_parse_log` is additive; existing `entries` table untouched

## Open Questions (none blocking implementation)

- Whether to pre-load Qwen3 32B on daemon startup to avoid cold-start latency on first NL call. (Currently: Ollama keeps loaded models in memory, but first call after idle may pay a penalty.)
- Whether to add a `/ts-show` command to display recent `nl_parse_log` entries for debugging.
