# Telegram Relay Bot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy an always-on Telegram relay bot on Fly.io that queues messages 24/7, downloads voice/audio files before URLs expire, delivers scheduled reports on time, and syncs with the brain daemon when it's online.

**Architecture:** Relay (Fly.io) receives all Telegram messages via webhook, acks immediately, stores in SQLite + persistent volume. Daemon (laptop) polls relay REST API every 2 min, processes items, posts responses back. Relay delivers responses and scheduled messages independently.

**Tech Stack:** Bun, grammY (webhook), Fastify, SQLite (better-sqlite3), Fly.io free tier

**Spec:** `docs/specs/2026-04-15-telegram-relay-design.md`

---

## File Map

### Relay (new repo: `relay/` directory in brain, deployed to Fly.io)

| File | Responsibility |
|------|---------------|
| `relay/src/db.ts` | SQLite wrapper — inbound_queue, outbound_queue, report_message_map tables |
| `relay/src/webhook.ts` | grammY webhook handler — classify message type, download files, insert queue, ack |
| `relay/src/api.ts` | Fastify REST API — inbound poll, file serve, response post, outbound push, health |
| `relay/src/scheduler.ts` | Background loop — send scheduled outbound messages at deliver_at time |
| `relay/src/responder.ts` | Background loop — send inbound responses back to user via Telegram |
| `relay/src/cleanup.ts` | Daily cron — delete old files from volume |
| `relay/src/index.ts` | Entry point — wire webhook + API + background loops |
| `relay/src/types.ts` | Shared types for queue entries |
| `relay/fly.toml` | Fly.io deployment config |
| `relay/Dockerfile` | Bun container image |
| `relay/package.json` | Dependencies |
| `relay/tsconfig.json` | TypeScript config |

### Relay tests

| File | Responsibility |
|------|---------------|
| `relay/tests/db.test.ts` | Queue CRUD, schema creation |
| `relay/tests/webhook.test.ts` | Message classification, file download, ack |
| `relay/tests/api.test.ts` | REST API endpoints with auth |
| `relay/tests/scheduler.test.ts` | Scheduled delivery logic |
| `relay/tests/responder.test.ts` | Response relay logic |

### Daemon changes (existing brain repo)

| File | Responsibility |
|------|---------------|
| `src/relay/client.ts` | HTTP client for relay REST API (GET inbound, POST response, POST outbound) |
| `src/relay/sync.ts` | Poll cycle — fetch pending, process each, post response/fail |
| `src/relay/types.ts` | Shared types for relay communication |
| `src/index.ts` | Wire relay sync cron, disable local worker when relay enabled, pre-stage reports |
| `src/config.ts` | Add relay config section |
| `src/types.ts` | Add RelayConfig type |
| `tests/relay/client.test.ts` | HTTP client tests with mocked fetch |
| `tests/relay/sync.test.ts` | Sync cycle tests with mocked client |

---

## Task 1: Relay DB layer (`relay/src/db.ts`)

**Files:**
- Create: `relay/src/db.ts`
- Create: `relay/src/types.ts`
- Create: `relay/tests/db.test.ts`
- Create: `relay/package.json`
- Create: `relay/tsconfig.json`

- [ ] **Step 1: Scaffold relay project**

```bash
mkdir -p relay/src relay/tests
```

```json
// relay/package.json
{
  "name": "brain-relay",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "bun run src/index.ts",
    "test": "vitest run",
    "build": "bun build src/index.ts --outdir dist --target bun"
  },
  "dependencies": {
    "grammy": "^1.35.0",
    "fastify": "^5.3.3",
    "better-sqlite3": "^11.9.1"
  },
  "devDependencies": {
    "vitest": "^4.1.2",
    "@types/better-sqlite3": "^7.6.14",
    "typescript": "^5.8.3"
  }
}
```

```json
// relay/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist",
    "rootDir": "src",
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts", "tests/**/*.ts"]
}
```

- [ ] **Step 2: Write types**

```typescript
// relay/src/types.ts
export type InboundType =
  | "ingest"
  | "query"
  | "voice"
  | "audio"
  | "timesheet_entry"
  | "timesheet_command"
  | "timesheet_reply";

export type InboundStatus = "pending" | "processing" | "completed" | "failed";

export type FileStatus = "none" | "downloaded" | "download_failed";

export interface InboundQueueEntry {
  id: string;
  chat_id: number;
  telegram_message_id: number | null;
  type: InboundType;
  command: string | null;
  raw_text: string | null;
  file_path: string | null;
  file_status: FileStatus;
  reply_to_queue_id: string | null;
  status: InboundStatus;
  response: string | null;
  response_sent: number;
  created_at: string;
  processed_at: string | null;
  retry_count: number;
  error: string | null;
}

export type OutboundCategory =
  | "daily_report"
  | "weekly_finalize"
  | "cap_alert"
  | "general";

export interface OutboundQueueEntry {
  id: string;
  chat_id: number;
  message: string;
  category: OutboundCategory;
  deliver_at: string | null;
  sent_at: string | null;
  telegram_message_id: number | null;
  retry_count: number;
  failed: number;
  created_at: string;
}

export interface ReportMessageMap {
  telegram_message_id: number;
  outbound_queue_id: string;
  date: string;
  entry_ids: string;
}
```

- [ ] **Step 3: Write failing DB tests**

```typescript
// relay/tests/db.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { RelayDB } from "../src/db.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/relay-db-test");

describe("RelayDB", () => {
  let db: RelayDB;

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
    db = new RelayDB(join(TEST_DIR, "test.db"));
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("creates all tables on construction", () => {
    const tables = db.listTables();
    expect(tables).toContain("inbound_queue");
    expect(tables).toContain("outbound_queue");
    expect(tables).toContain("report_message_map");
  });

  describe("inbound queue", () => {
    it("inserts and retrieves an inbound item", () => {
      const id = db.insertInbound({
        chat_id: 123,
        telegram_message_id: 456,
        type: "ingest",
        raw_text: "Hello brain",
      });
      const item = db.getInbound(id);
      expect(item).not.toBeNull();
      expect(item!.chat_id).toBe(123);
      expect(item!.type).toBe("ingest");
      expect(item!.status).toBe("pending");
    });

    it("lists pending items in FIFO order", () => {
      db.insertInbound({ chat_id: 1, type: "ingest", raw_text: "first" });
      db.insertInbound({ chat_id: 1, type: "query", raw_text: "?second" });
      const pending = db.getPendingInbound();
      expect(pending).toHaveLength(2);
      expect(pending[0].raw_text).toBe("first");
    });

    it("setInboundResponse sets response and processed_at", () => {
      const id = db.insertInbound({ chat_id: 1, type: "ingest", raw_text: "hi" });
      db.setInboundResponse(id, "Saved.", "completed");
      const item = db.getInbound(id);
      expect(item!.response).toBe("Saved.");
      expect(item!.status).toBe("completed");
      expect(item!.processed_at).not.toBeNull();
    });

    it("getUnsentResponses returns items with response but response_sent=0", () => {
      const id = db.insertInbound({ chat_id: 1, type: "ingest", raw_text: "hi" });
      db.setInboundResponse(id, "Saved.", "completed");
      const unsent = db.getUnsentResponses();
      expect(unsent).toHaveLength(1);
      db.markResponseSent(id, 789);
      expect(db.getUnsentResponses()).toHaveLength(0);
    });
  });

  describe("outbound queue", () => {
    it("inserts and retrieves outbound item", () => {
      const id = db.insertOutbound({
        chat_id: 123,
        message: "Daily report",
        category: "daily_report",
        deliver_at: "2026-04-16T09:00:00",
      });
      const item = db.getOutbound(id);
      expect(item!.category).toBe("daily_report");
      expect(item!.deliver_at).toBe("2026-04-16T09:00:00");
    });

    it("getDueOutbound returns items past deliver_at", () => {
      db.insertOutbound({
        chat_id: 1,
        message: "now",
        category: "general",
        deliver_at: "2020-01-01T00:00:00",
      });
      db.insertOutbound({
        chat_id: 1,
        message: "future",
        category: "general",
        deliver_at: "2099-01-01T00:00:00",
      });
      const due = db.getDueOutbound();
      expect(due).toHaveLength(1);
      expect(due[0].message).toBe("now");
    });

    it("replaceOutbound updates message if not yet sent", () => {
      const id = db.insertOutbound({
        chat_id: 1,
        message: "stale report",
        category: "daily_report",
        deliver_at: "2026-04-16T09:00:00",
      });
      const replaced = db.replaceOutbound(id, "fresh report");
      expect(replaced).toBe(true);
      expect(db.getOutbound(id)!.message).toBe("fresh report");
    });
  });

  describe("report message map", () => {
    it("stores and retrieves report mapping", () => {
      db.insertReportMap(100, "outbound-1", "2026-04-15", ["e1", "e2"]);
      const map = db.getReportMap(100);
      expect(map).not.toBeNull();
      expect(map!.date).toBe("2026-04-15");
      expect(JSON.parse(map!.entry_ids)).toEqual(["e1", "e2"]);
    });
  });
});
```

- [ ] **Step 4: Run tests, verify RED**

```bash
cd relay && npx vitest run tests/db.test.ts
```
Expected: FAIL — `RelayDB` not found

- [ ] **Step 5: Implement RelayDB**

```typescript
// relay/src/db.ts
import { randomUUID } from "node:crypto";
import Database from "better-sqlite3";
import type {
  InboundQueueEntry,
  InboundType,
  InboundStatus,
  OutboundQueueEntry,
  OutboundCategory,
  ReportMessageMap,
} from "./types.js";

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS inbound_queue (
    id TEXT PRIMARY KEY,
    chat_id INTEGER NOT NULL,
    telegram_message_id INTEGER,
    type TEXT NOT NULL,
    command TEXT,
    raw_text TEXT,
    file_path TEXT,
    file_status TEXT NOT NULL DEFAULT 'none',
    reply_to_queue_id TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    response TEXT,
    response_sent INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    processed_at TEXT,
    retry_count INTEGER NOT NULL DEFAULT 0,
    error TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_inbound_status ON inbound_queue(status);
  CREATE INDEX IF NOT EXISTS idx_inbound_response ON inbound_queue(response_sent, status);

  CREATE TABLE IF NOT EXISTS outbound_queue (
    id TEXT PRIMARY KEY,
    chat_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general',
    deliver_at TEXT,
    sent_at TEXT,
    telegram_message_id INTEGER,
    retry_count INTEGER NOT NULL DEFAULT 0,
    failed INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_outbound_pending ON outbound_queue(sent_at, failed);

  CREATE TABLE IF NOT EXISTS report_message_map (
    telegram_message_id INTEGER PRIMARY KEY,
    outbound_queue_id TEXT NOT NULL,
    date TEXT NOT NULL,
    entry_ids TEXT NOT NULL
  );
`;

export class RelayDB {
  private db: Database.Database;

  constructor(dbPath: string) {
    this.db = new Database(dbPath);
    this.db.pragma("journal_mode = WAL");
    this.db.pragma("foreign_keys = ON");
    this.db.exec(SCHEMA_SQL);
  }

  listTables(): string[] {
    return this.db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
      .all()
      .map((r: any) => r.name);
  }

  // ── Inbound ──

  insertInbound(input: {
    chat_id: number;
    telegram_message_id?: number | null;
    type: InboundType;
    command?: string | null;
    raw_text?: string | null;
    file_path?: string | null;
    file_status?: string;
    reply_to_queue_id?: string | null;
  }): string {
    const id = randomUUID();
    this.db.prepare(
      `INSERT INTO inbound_queue (id, chat_id, telegram_message_id, type, command, raw_text,
         file_path, file_status, reply_to_queue_id, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`
    ).run(
      id, input.chat_id, input.telegram_message_id ?? null,
      input.type, input.command ?? null, input.raw_text ?? null,
      input.file_path ?? null, input.file_status ?? "none",
      input.reply_to_queue_id ?? null, new Date().toISOString()
    );
    return id;
  }

  getInbound(id: string): InboundQueueEntry | null {
    return this.db.prepare("SELECT * FROM inbound_queue WHERE id = ?").get(id) as InboundQueueEntry | null;
  }

  getPendingInbound(): InboundQueueEntry[] {
    return this.db
      .prepare("SELECT * FROM inbound_queue WHERE status = 'pending' ORDER BY created_at ASC")
      .all() as InboundQueueEntry[];
  }

  setInboundResponse(id: string, response: string, status: InboundStatus): void {
    this.db.prepare(
      "UPDATE inbound_queue SET response = ?, status = ?, processed_at = ? WHERE id = ?"
    ).run(response, status, new Date().toISOString(), id);
  }

  setInboundFailed(id: string, error: string): void {
    this.db.prepare(
      "UPDATE inbound_queue SET status = 'failed', error = ?, processed_at = ? WHERE id = ?"
    ).run(error, new Date().toISOString(), id);
  }

  getUnsentResponses(): InboundQueueEntry[] {
    return this.db
      .prepare("SELECT * FROM inbound_queue WHERE response IS NOT NULL AND response_sent = 0 ORDER BY processed_at ASC")
      .all() as InboundQueueEntry[];
  }

  markResponseSent(id: string, telegramMessageId: number): void {
    this.db.prepare("UPDATE inbound_queue SET response_sent = 1 WHERE id = ?").run(id);
  }

  markInboundByTelegramId(telegramMessageId: number, status: InboundStatus): void {
    this.db.prepare(
      "UPDATE inbound_queue SET status = ? WHERE telegram_message_id = ? AND status = 'pending'"
    ).run(status, telegramMessageId);
  }

  // ── Outbound ──

  insertOutbound(input: {
    chat_id: number;
    message: string;
    category: OutboundCategory;
    deliver_at?: string | null;
  }): string {
    const id = randomUUID();
    this.db.prepare(
      `INSERT INTO outbound_queue (id, chat_id, message, category, deliver_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(id, input.chat_id, input.message, input.category, input.deliver_at ?? null, new Date().toISOString());
    return id;
  }

  getOutbound(id: string): OutboundQueueEntry | null {
    return this.db.prepare("SELECT * FROM outbound_queue WHERE id = ?").get(id) as OutboundQueueEntry | null;
  }

  getDueOutbound(): OutboundQueueEntry[] {
    const now = new Date().toISOString();
    return this.db
      .prepare(
        `SELECT * FROM outbound_queue
         WHERE sent_at IS NULL AND failed = 0
         AND (deliver_at IS NULL OR deliver_at <= ?)
         ORDER BY created_at ASC`
      ).all(now) as OutboundQueueEntry[];
  }

  markOutboundSent(id: string, telegramMessageId: number): void {
    this.db.prepare(
      "UPDATE outbound_queue SET sent_at = ?, telegram_message_id = ? WHERE id = ?"
    ).run(new Date().toISOString(), telegramMessageId, id);
  }

  incrementOutboundRetry(id: string): void {
    const item = this.getOutbound(id);
    if (!item) return;
    const newRetry = item.retry_count + 1;
    const failed = newRetry >= 5 ? 1 : 0;
    this.db.prepare("UPDATE outbound_queue SET retry_count = ?, failed = ? WHERE id = ?").run(newRetry, failed, id);
  }

  replaceOutbound(id: string, newMessage: string): boolean {
    const item = this.getOutbound(id);
    if (!item || item.sent_at) return false;
    this.db.prepare("UPDATE outbound_queue SET message = ? WHERE id = ?").run(newMessage, id);
    return true;
  }

  // ── Report Message Map ──

  insertReportMap(telegramMessageId: number, outboundQueueId: string, date: string, entryIds: string[]): void {
    this.db.prepare(
      "INSERT OR REPLACE INTO report_message_map (telegram_message_id, outbound_queue_id, date, entry_ids) VALUES (?, ?, ?, ?)"
    ).run(telegramMessageId, outboundQueueId, date, JSON.stringify(entryIds));
  }

  getReportMap(telegramMessageId: number): ReportMessageMap | null {
    return this.db.prepare("SELECT * FROM report_message_map WHERE telegram_message_id = ?").get(telegramMessageId) as ReportMessageMap | null;
  }

  close(): void {
    this.db.close();
  }
}
```

- [ ] **Step 6: Run tests, verify GREEN**

```bash
cd relay && npx vitest run tests/db.test.ts
```
Expected: all pass

- [ ] **Step 7: Commit**

```bash
git add relay/
git commit -m "feat(relay): scaffold project + RelayDB with inbound/outbound queues"
```

---

## Task 2: Webhook handler (`relay/src/webhook.ts`)

**Files:**
- Create: `relay/src/webhook.ts`
- Create: `relay/tests/webhook.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// relay/tests/webhook.test.ts
import { describe, it, expect } from "vitest";
import { classifyMessage } from "../src/webhook.js";

describe("classifyMessage", () => {
  it("classifies ? prefix as query", () => {
    expect(classifyMessage("?what is Karen", null)).toEqual({ type: "query" });
  });

  it("classifies +Xh as timesheet_entry", () => {
    expect(classifyMessage("+2h maison coding fix", null)).toEqual({ type: "timesheet_entry" });
  });

  it("classifies +0.5h as timesheet_entry", () => {
    expect(classifyMessage("+0.5h maison meeting standup", null)).toEqual({ type: "timesheet_entry" });
  });

  it("classifies /ts as timesheet_command", () => {
    expect(classifyMessage("/ts", null)).toEqual({ type: "timesheet_command", command: "ts" });
  });

  it("classifies /ts today as timesheet_command", () => {
    expect(classifyMessage("/ts today", null)).toEqual({ type: "timesheet_command", command: "ts" });
  });

  it("classifies /eod as timesheet_command", () => {
    expect(classifyMessage("/eod", null)).toEqual({ type: "timesheet_command", command: "eod" });
  });

  it("classifies /finalize as timesheet_command", () => {
    expect(classifyMessage("/finalize", null)).toEqual({ type: "timesheet_command", command: "finalize" });
  });

  it("classifies /invoice as timesheet_command", () => {
    expect(classifyMessage("/invoice maison april", null)).toEqual({ type: "timesheet_command", command: "invoice" });
  });

  it("classifies /start as timesheet_command", () => {
    expect(classifyMessage("/start", null)).toEqual({ type: "timesheet_command", command: "start" });
  });

  it("classifies /help as timesheet_command", () => {
    expect(classifyMessage("/help", null)).toEqual({ type: "timesheet_command", command: "help" });
  });

  it("classifies /status as timesheet_command", () => {
    expect(classifyMessage("/status", null)).toEqual({ type: "timesheet_command", command: "status" });
  });

  it("classifies reply to report as timesheet_reply", () => {
    expect(classifyMessage("ok", "outbound-123")).toEqual({
      type: "timesheet_reply",
      reply_to_queue_id: "outbound-123",
    });
  });

  it("classifies plain text as ingest", () => {
    expect(classifyMessage("Remember this for later", null)).toEqual({ type: "ingest" });
  });
});
```

- [ ] **Step 2: Run tests, verify RED**

```bash
cd relay && npx vitest run tests/webhook.test.ts
```

- [ ] **Step 3: Implement classifier**

```typescript
// relay/src/webhook.ts
import type { InboundType } from "./types.js";

const RE_TIMESHEET_ENTRY = /^\+\d+(?:\.\d+)?h\s/;
const RE_COMMAND = /^\/(\w+)/;
const KNOWN_COMMANDS = new Set(["ts", "eod", "finalize", "invoice", "start", "help", "status", "slides", "plot"]);

export interface ClassifyResult {
  type: InboundType | "timesheet_command";
  command?: string;
  reply_to_queue_id?: string;
}

export function classifyMessage(
  text: string,
  replyToOutboundId: string | null,
): ClassifyResult {
  // Reply to a report takes priority
  if (replyToOutboundId) {
    return { type: "timesheet_reply", reply_to_queue_id: replyToOutboundId };
  }

  if (text.startsWith("?")) {
    return { type: "query" };
  }

  if (RE_TIMESHEET_ENTRY.test(text)) {
    return { type: "timesheet_entry" };
  }

  const cmdMatch = text.match(RE_COMMAND);
  if (cmdMatch && KNOWN_COMMANDS.has(cmdMatch[1])) {
    return { type: "timesheet_command", command: cmdMatch[1] };
  }

  return { type: "ingest" };
}

export function getAckMessage(type: string): string {
  switch (type) {
    case "ingest": return "⏳ Queued for ingestion";
    case "query": return "🔍 Queued — will answer when brain is online";
    case "voice":
    case "audio": return "🎤 Saved — will transcribe when brain is online";
    case "timesheet_entry":
    case "timesheet_command":
    case "timesheet_reply": return "⏱ Queued";
    default: return "⏳ Queued";
  }
}
```

- [ ] **Step 4: Run tests, verify GREEN**

- [ ] **Step 5: Commit**

```bash
git add relay/src/webhook.ts relay/tests/webhook.test.ts
git commit -m "feat(relay): message classifier + ack messages"
```

---

## Task 3: REST API (`relay/src/api.ts`)

**Files:**
- Create: `relay/src/api.ts`
- Create: `relay/tests/api.test.ts`

- [ ] **Step 1: Write failing tests**

Tests should cover: auth guard, GET /queue/inbound, POST /queue/inbound/:id/response, POST /queue/inbound/:id/fail, POST /queue/outbound, POST /queue/outbound/:id/replace, GET /health.

```typescript
// relay/tests/api.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { RelayDB } from "../src/db.js";
import { buildRelayApi } from "../src/api.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/api-test");
const SECRET = "test-secret";

describe("Relay API", () => {
  let db: RelayDB;
  let app: ReturnType<typeof buildRelayApi>;

  beforeEach(async () => {
    mkdirSync(TEST_DIR, { recursive: true });
    db = new RelayDB(join(TEST_DIR, "test.db"));
    app = buildRelayApi(db, SECRET, TEST_DIR);
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("rejects requests without auth", async () => {
    const res = await app.inject({ method: "GET", url: "/queue/inbound?status=pending" });
    expect(res.statusCode).toBe(401);
  });

  it("GET /queue/inbound returns pending items", async () => {
    db.insertInbound({ chat_id: 1, type: "ingest", raw_text: "hello" });
    const res = await app.inject({
      method: "GET",
      url: "/queue/inbound?status=pending",
      headers: { authorization: `Bearer ${SECRET}` },
    });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.items).toHaveLength(1);
  });

  it("POST /queue/inbound/:id/response marks item completed", async () => {
    const id = db.insertInbound({ chat_id: 1, type: "ingest", raw_text: "hello" });
    const res = await app.inject({
      method: "POST",
      url: `/queue/inbound/${id}/response`,
      headers: { authorization: `Bearer ${SECRET}`, "content-type": "application/json" },
      body: JSON.stringify({ response: "Saved.", status: "completed" }),
    });
    expect(res.statusCode).toBe(200);
    expect(db.getInbound(id)!.status).toBe("completed");
  });

  it("POST /queue/inbound/:id/fail marks item failed", async () => {
    const id = db.insertInbound({ chat_id: 1, type: "voice", file_status: "download_failed" });
    const res = await app.inject({
      method: "POST",
      url: `/queue/inbound/${id}/fail`,
      headers: { authorization: `Bearer ${SECRET}`, "content-type": "application/json" },
      body: JSON.stringify({ error: "File expired" }),
    });
    expect(res.statusCode).toBe(200);
    expect(db.getInbound(id)!.status).toBe("failed");
  });

  it("POST /queue/outbound inserts scheduled message", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/queue/outbound",
      headers: { authorization: `Bearer ${SECRET}`, "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: 123,
        message: "Daily report",
        category: "daily_report",
        deliver_at: "2026-04-16T09:00:00",
      }),
    });
    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body);
    expect(body.id).toBeDefined();
  });

  it("GET /health returns queue depths", async () => {
    db.insertInbound({ chat_id: 1, type: "ingest", raw_text: "hi" });
    const res = await app.inject({
      method: "GET",
      url: "/health",
      headers: { authorization: `Bearer ${SECRET}` },
    });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.inbound_pending).toBe(1);
  });
});
```

- [ ] **Step 2: Run tests, verify RED**

- [ ] **Step 3: Implement API**

```typescript
// relay/src/api.ts
import Fastify from "fastify";
import type { RelayDB } from "./db.js";
import type { InboundStatus, OutboundCategory } from "./types.js";

export function buildRelayApi(db: RelayDB, secret: string, filesDir: string) {
  const app = Fastify();

  // Auth hook
  app.addHook("onRequest", async (request, reply) => {
    if (request.url === "/webhook") return; // webhook has its own auth
    const auth = request.headers.authorization;
    if (auth !== `Bearer ${secret}`) {
      return reply.status(401).send({ error: "Unauthorized" });
    }
  });

  // GET /queue/inbound?status=pending
  app.get("/queue/inbound", async (request, reply) => {
    const items = db.getPendingInbound();
    return reply.send({ items });
  });

  // GET /files/:id (serve stored voice/audio files)
  app.get<{ Params: { id: string } }>("/files/:id", async (request, reply) => {
    const { id } = request.params;
    const { join } = await import("node:path");
    const { createReadStream, existsSync } = await import("node:fs");
    const filePath = join(filesDir, id);
    if (!existsSync(filePath)) return reply.status(404).send({ error: "File not found" });
    return reply.type("application/octet-stream").send(createReadStream(filePath));
  });

  // POST /queue/inbound/:id/response
  app.post<{ Params: { id: string }; Body: { response: string; status: InboundStatus } }>(
    "/queue/inbound/:id/response",
    async (request, reply) => {
      const { id } = request.params;
      const { response, status } = request.body;
      db.setInboundResponse(id, response, status);
      return reply.send({ ok: true });
    },
  );

  // POST /queue/inbound/:id/fail
  app.post<{ Params: { id: string }; Body: { error: string } }>(
    "/queue/inbound/:id/fail",
    async (request, reply) => {
      const { id } = request.params;
      db.setInboundFailed(id, request.body.error);
      return reply.send({ ok: true });
    },
  );

  // POST /queue/outbound
  app.post<{
    Body: {
      chat_id: number;
      message: string;
      category: OutboundCategory;
      deliver_at?: string;
      entry_ids?: string[];
      report_date?: string;
    };
  }>("/queue/outbound", async (request, reply) => {
    const { chat_id, message, category, deliver_at, entry_ids, report_date } = request.body;
    const id = db.insertOutbound({ chat_id, message, category, deliver_at });
    // entry_ids + report_date stored after outbound is sent (we need telegram_message_id)
    // Store them as metadata on the outbound entry for later
    if (entry_ids && report_date) {
      db.setOutboundReportMeta(id, report_date, entry_ids);
    }
    return reply.status(201).send({ id });
  });

  // POST /queue/outbound/:id/replace
  app.post<{ Params: { id: string }; Body: { message: string } }>(
    "/queue/outbound/:id/replace",
    async (request, reply) => {
      const ok = db.replaceOutbound(request.params.id, request.body.message);
      return reply.send({ ok });
    },
  );

  // GET /health
  app.get("/health", async (_request, reply) => {
    const pending = db.getPendingInbound();
    const dueOutbound = db.getDueOutbound();
    return reply.send({
      status: "ok",
      inbound_pending: pending.length,
      outbound_due: dueOutbound.length,
    });
  });

  return app;
}
```

Note: `setOutboundReportMeta` needs adding to `db.ts` — store `report_date` and `entry_ids` on the outbound row so when it's sent, we can populate `report_message_map`. Add a `report_date TEXT` and `entry_ids TEXT` column to `outbound_queue` or store as JSON in a new field. Simpler: add two nullable columns to `outbound_queue`.

Update `relay/src/db.ts` SCHEMA_SQL — add to outbound_queue:
```sql
    report_date TEXT,
    entry_ids TEXT,
```

Add to RelayDB:
```typescript
  setOutboundReportMeta(id: string, reportDate: string, entryIds: string[]): void {
    this.db.prepare(
      "UPDATE outbound_queue SET report_date = ?, entry_ids = ? WHERE id = ?"
    ).run(reportDate, JSON.stringify(entryIds), id);
  }
```

- [ ] **Step 4: Run tests, verify GREEN**

- [ ] **Step 5: Commit**

```bash
git add relay/src/api.ts relay/tests/api.test.ts relay/src/db.ts
git commit -m "feat(relay): REST API with auth, inbound/outbound endpoints, health"
```

---

## Task 4: Scheduler + responder background loops

**Files:**
- Create: `relay/src/scheduler.ts`
- Create: `relay/src/responder.ts`
- Create: `relay/tests/scheduler.test.ts`
- Create: `relay/tests/responder.test.ts`

- [ ] **Step 1: Write failing scheduler test**

```typescript
// relay/tests/scheduler.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { RelayDB } from "../src/db.js";
import { flushDueOutbound } from "../src/scheduler.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/scheduler-test");

describe("flushDueOutbound", () => {
  let db: RelayDB;

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
    db = new RelayDB(join(TEST_DIR, "test.db"));
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("sends due messages and marks sent", async () => {
    db.insertOutbound({
      chat_id: 123,
      message: "Report",
      category: "daily_report",
      deliver_at: "2020-01-01T00:00:00",
    });
    const sendFn = vi.fn().mockResolvedValue({ message_id: 999 });
    const sent = await flushDueOutbound(db, sendFn);
    expect(sent).toBe(1);
    expect(sendFn).toHaveBeenCalledWith(123, "Report");
  });

  it("increments retry on failure", async () => {
    const id = db.insertOutbound({
      chat_id: 123,
      message: "Fail",
      category: "general",
      deliver_at: "2020-01-01T00:00:00",
    });
    const sendFn = vi.fn().mockResolvedValue(null);
    await flushDueOutbound(db, sendFn);
    expect(db.getOutbound(id)!.retry_count).toBe(1);
  });

  it("populates report_message_map when entry_ids present", async () => {
    const id = db.insertOutbound({
      chat_id: 123,
      message: "Report",
      category: "daily_report",
      deliver_at: "2020-01-01T00:00:00",
    });
    db.setOutboundReportMeta(id, "2026-04-15", ["e1", "e2"]);
    const sendFn = vi.fn().mockResolvedValue({ message_id: 888 });
    await flushDueOutbound(db, sendFn);
    const map = db.getReportMap(888);
    expect(map).not.toBeNull();
    expect(map!.date).toBe("2026-04-15");
  });
});
```

- [ ] **Step 2: Write failing responder test**

```typescript
// relay/tests/responder.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { RelayDB } from "../src/db.js";
import { flushResponses } from "../src/responder.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/responder-test");

describe("flushResponses", () => {
  let db: RelayDB;

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
    db = new RelayDB(join(TEST_DIR, "test.db"));
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("sends responses and marks sent", async () => {
    const id = db.insertInbound({ chat_id: 123, telegram_message_id: 456, type: "ingest", raw_text: "hi" });
    db.setInboundResponse(id, "Saved.", "completed");
    const sendFn = vi.fn().mockResolvedValue({ message_id: 789 });
    const sent = await flushResponses(db, sendFn);
    expect(sent).toBe(1);
    expect(sendFn).toHaveBeenCalledWith(123, "Saved.", 456);
    expect(db.getUnsentResponses()).toHaveLength(0);
  });

  it("skips if send fails", async () => {
    const id = db.insertInbound({ chat_id: 123, telegram_message_id: 456, type: "query", raw_text: "?test" });
    db.setInboundResponse(id, "Answer", "completed");
    const sendFn = vi.fn().mockResolvedValue(null);
    const sent = await flushResponses(db, sendFn);
    expect(sent).toBe(0);
    expect(db.getUnsentResponses()).toHaveLength(1);
  });
});
```

- [ ] **Step 3: Run tests, verify RED**

- [ ] **Step 4: Implement scheduler**

```typescript
// relay/src/scheduler.ts
import type { RelayDB } from "./db.js";

export type OutboundSendFn = (chatId: number, message: string) => Promise<{ message_id: number } | null>;

export async function flushDueOutbound(db: RelayDB, sendFn: OutboundSendFn): Promise<number> {
  const due = db.getDueOutbound();
  let sent = 0;

  for (const item of due) {
    const result = await sendFn(item.chat_id, item.message);
    if (result) {
      db.markOutboundSent(item.id, result.message_id);
      sent++;
      // If this outbound has report metadata, populate report_message_map
      const outbound = db.getOutbound(item.id);
      if (outbound && (outbound as any).report_date && (outbound as any).entry_ids) {
        const entryIds = JSON.parse((outbound as any).entry_ids);
        db.insertReportMap(result.message_id, item.id, (outbound as any).report_date, entryIds);
      }
    } else {
      db.incrementOutboundRetry(item.id);
    }
  }

  return sent;
}
```

```typescript
// relay/src/responder.ts
import type { RelayDB } from "./db.js";

export type ResponseSendFn = (chatId: number, text: string, replyToMessageId: number | null) => Promise<{ message_id: number } | null>;

export async function flushResponses(db: RelayDB, sendFn: ResponseSendFn): Promise<number> {
  const unsent = db.getUnsentResponses();
  let sent = 0;

  for (const item of unsent) {
    const result = await sendFn(item.chat_id, item.response!, item.telegram_message_id);
    if (result) {
      db.markResponseSent(item.id, result.message_id);
      sent++;
    }
  }

  return sent;
}
```

- [ ] **Step 5: Run tests, verify GREEN**

- [ ] **Step 6: Commit**

```bash
git add relay/src/scheduler.ts relay/src/responder.ts relay/tests/scheduler.test.ts relay/tests/responder.test.ts
git commit -m "feat(relay): scheduler + responder background loops"
```

---

## Task 5: Relay entry point + Dockerfile

**Files:**
- Create: `relay/src/index.ts`
- Create: `relay/src/cleanup.ts`
- Create: `relay/fly.toml`
- Create: `relay/Dockerfile`

- [ ] **Step 1: Write cleanup module**

```typescript
// relay/src/cleanup.ts
import { unlinkSync, existsSync } from "node:fs";
import type { RelayDB } from "./db.js";

export function cleanupOldFiles(db: RelayDB, filesDir: string, maxAgeDays = 7): number {
  const cutoff = new Date(Date.now() - maxAgeDays * 86_400_000).toISOString();
  // Get completed/failed inbound items with files older than cutoff
  const items = (db as any).db
    .prepare(
      `SELECT id, file_path FROM inbound_queue
       WHERE file_path IS NOT NULL AND status IN ('completed', 'failed')
       AND processed_at IS NOT NULL AND processed_at < ?`
    ).all(cutoff) as Array<{ id: string; file_path: string }>;

  let cleaned = 0;
  for (const item of items) {
    const { join } = require("node:path");
    const fullPath = join(filesDir, item.file_path);
    if (existsSync(fullPath)) {
      unlinkSync(fullPath);
      cleaned++;
    }
  }
  return cleaned;
}
```

- [ ] **Step 2: Write entry point**

```typescript
// relay/src/index.ts
import { webhookCallback, Bot } from "grammy";
import { RelayDB } from "./db.js";
import { buildRelayApi } from "./api.js";
import { classifyMessage, getAckMessage } from "./webhook.js";
import { flushDueOutbound } from "./scheduler.js";
import { flushResponses } from "./responder.js";
import { cleanupOldFiles } from "./cleanup.js";
import { join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";

const DB_PATH = process.env.DB_PATH ?? "/data/relay.db";
const FILES_PATH = process.env.FILES_PATH ?? "/data/files";
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const RELAY_SECRET = process.env.RELAY_SECRET!;
const ALLOWED_IDS = (process.env.ALLOWED_USER_IDS ?? "")
  .split(",").map(Number).filter(Boolean);
const PORT = parseInt(process.env.PORT ?? "8080", 10);

mkdirSync(FILES_PATH, { recursive: true });

const db = new RelayDB(DB_PATH);
const bot = new Bot(BOT_TOKEN);

// ── Webhook: handle all incoming messages ──

bot.on("message:text", async (ctx) => {
  if (!ALLOWED_IDS.includes(ctx.from.id)) return;

  const text = ctx.message.text.trim();
  const replyToMsgId = ctx.message.reply_to_message?.message_id ?? null;
  const replyToOutboundId = replyToMsgId ? db.getReportMap(replyToMsgId)?.outbound_queue_id ?? null : null;

  const classified = classifyMessage(text, replyToOutboundId);

  db.insertInbound({
    chat_id: ctx.chat.id,
    telegram_message_id: ctx.message.message_id,
    type: classified.type === "timesheet_command" ? "timesheet_command" : classified.type,
    command: classified.command ?? null,
    raw_text: text,
    reply_to_queue_id: classified.reply_to_queue_id ?? null,
  });

  await ctx.reply(getAckMessage(classified.type));
});

bot.on("message:voice", async (ctx) => {
  if (!ALLOWED_IDS.includes(ctx.from.id)) return;
  const file = await ctx.getFile();
  let filePath: string | null = null;
  let fileStatus = "download_failed";

  if (file.file_path) {
    try {
      const url = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.arrayBuffer();
        const fileName = `${Date.now()}.ogg`;
        filePath = fileName;
        writeFileSync(join(FILES_PATH, fileName), Buffer.from(data));
        fileStatus = "downloaded";
      }
    } catch { /* retry logic omitted for brevity — add 3x backoff */ }
  }

  db.insertInbound({
    chat_id: ctx.chat.id,
    telegram_message_id: ctx.message.message_id,
    type: "voice",
    file_path: filePath,
    file_status: fileStatus,
  });

  await ctx.reply(fileStatus === "downloaded"
    ? "🎤 Saved — will transcribe when brain is online"
    : "🎤 Queued (file download issue — may need re-send)");
});

bot.on("message:audio", async (ctx) => {
  if (!ALLOWED_IDS.includes(ctx.from.id)) return;
  const file = await ctx.getFile();
  let filePath: string | null = null;
  let fileStatus = "download_failed";

  if (file.file_path) {
    try {
      const url = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.arrayBuffer();
        const ext = file.file_path.split(".").pop() ?? "m4a";
        const fileName = `${Date.now()}.${ext}`;
        filePath = fileName;
        writeFileSync(join(FILES_PATH, fileName), Buffer.from(data));
        fileStatus = "downloaded";
      }
    } catch { /* retry */ }
  }

  db.insertInbound({
    chat_id: ctx.chat.id,
    telegram_message_id: ctx.message.message_id,
    type: "audio",
    file_path: filePath,
    file_status: fileStatus,
  });

  await ctx.reply(fileStatus === "downloaded"
    ? "🎤 Saved — will transcribe when brain is online"
    : "🎤 Queued (file download issue — may need re-send)");
});

// ── Telegram send helpers ──

async function sendTelegram(chatId: number, text: string): Promise<{ message_id: number } | null> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) return null;
    const data = await res.json() as { result: { message_id: number } };
    return { message_id: data.result.message_id };
  } catch { return null; }
}

async function sendReply(chatId: number, text: string, replyTo: number | null): Promise<{ message_id: number } | null> {
  try {
    const body: Record<string, unknown> = { chat_id: chatId, text };
    if (replyTo) body.reply_to_message_id = replyTo;
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const data = await res.json() as { result: { message_id: number } };
    return { message_id: data.result.message_id };
  } catch { return null; }
}

// ── Background loops ──

setInterval(() => { flushDueOutbound(db, sendTelegram).catch(console.error); }, 30_000);
setInterval(() => { flushResponses(db, sendReply).catch(console.error); }, 10_000);
setInterval(() => { cleanupOldFiles(db, FILES_PATH); }, 86_400_000); // daily

// ── Start server ──

const api = buildRelayApi(db, RELAY_SECRET, FILES_PATH);

// Mount grammY webhook on /webhook path
api.post("/webhook", async (request, reply) => {
  const handler = webhookCallback(bot, "fastify");
  return handler(request, reply);
});

api.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
  console.log(`[relay] Listening on port ${PORT}`);
});
```

- [ ] **Step 3: Write fly.toml**

```toml
# relay/fly.toml
app = "brain-relay"
primary_region = "ewr"

[build]
  dockerfile = "Dockerfile"

[mounts]
  source = "brain_relay_data"
  destination = "/data"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = "stop"
  auto_start_machines = true
  min_machines_running = 1

[env]
  NODE_ENV = "production"
  DB_PATH = "/data/relay.db"
  FILES_PATH = "/data/files"
```

- [ ] **Step 4: Write Dockerfile**

```dockerfile
# relay/Dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile --production

COPY src/ src/
COPY tsconfig.json ./

EXPOSE 8080
CMD ["bun", "run", "src/index.ts"]
```

- [ ] **Step 5: Commit**

```bash
git add relay/src/index.ts relay/src/cleanup.ts relay/fly.toml relay/Dockerfile
git commit -m "feat(relay): entry point, cleanup cron, Fly.io deployment config"
```

---

## Task 6: Daemon relay sync client (`src/relay/client.ts`)

**Files:**
- Create: `src/relay/client.ts`
- Create: `src/relay/types.ts`
- Create: `tests/relay/client.test.ts`

- [ ] **Step 1: Write types**

```typescript
// src/relay/types.ts
export interface RelayConfig {
  enabled: boolean;
  url: string;
  secret: string;
  poll_interval_seconds: number;
}

export interface RelayInboundItem {
  id: string;
  chat_id: number;
  telegram_message_id: number | null;
  type: string;
  command: string | null;
  raw_text: string | null;
  file_path: string | null;
  file_status: string;
  reply_to_queue_id: string | null;
  created_at: string;
}
```

- [ ] **Step 2: Write failing client tests**

```typescript
// tests/relay/client.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { RelayClient } from "../../src/relay/client.js";

describe("RelayClient", () => {
  let client: RelayClient;
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    client = new RelayClient("https://relay.test", "secret123", mockFetch);
  });

  it("fetchPending calls GET /queue/inbound with auth", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ items: [] }),
    });
    const items = await client.fetchPending();
    expect(items).toEqual([]);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://relay.test/queue/inbound?status=pending",
      expect.objectContaining({
        headers: { authorization: "Bearer secret123" },
      }),
    );
  });

  it("postResponse sends response to relay", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    await client.postResponse("item-1", "Saved.", "completed");
    expect(mockFetch).toHaveBeenCalledWith(
      "https://relay.test/queue/inbound/item-1/response",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("postFail sends failure to relay", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    await client.postFail("item-1", "File expired");
    expect(mockFetch).toHaveBeenCalledWith(
      "https://relay.test/queue/inbound/item-1/fail",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("pushOutbound sends scheduled message", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ id: "out-1" }) });
    const id = await client.pushOutbound({
      chat_id: 123,
      message: "Report",
      category: "daily_report",
      deliver_at: "2026-04-16T09:00:00",
    });
    expect(id).toBe("out-1");
  });

  it("downloadFile fetches binary content", async () => {
    const fakeBuffer = new ArrayBuffer(4);
    mockFetch.mockResolvedValue({
      ok: true,
      arrayBuffer: async () => fakeBuffer,
    });
    const data = await client.downloadFile("voice-123.ogg");
    expect(data).toBe(fakeBuffer);
  });
});
```

- [ ] **Step 3: Run tests, verify RED**

- [ ] **Step 4: Implement RelayClient**

```typescript
// src/relay/client.ts
import type { RelayInboundItem } from "./types.js";

type FetchFn = typeof fetch;

export class RelayClient {
  constructor(
    private baseUrl: string,
    private secret: string,
    private fetchFn: FetchFn = fetch,
  ) {}

  private headers(): Record<string, string> {
    return { authorization: `Bearer ${this.secret}` };
  }

  private jsonHeaders(): Record<string, string> {
    return { ...this.headers(), "content-type": "application/json" };
  }

  async fetchPending(): Promise<RelayInboundItem[]> {
    const res = await this.fetchFn(`${this.baseUrl}/queue/inbound?status=pending`, {
      headers: this.headers(),
    });
    if (!res.ok) throw new Error(`Relay fetch failed: ${res.status}`);
    const data = (await res.json()) as { items: RelayInboundItem[] };
    return data.items;
  }

  async postResponse(id: string, response: string, status: string): Promise<void> {
    await this.fetchFn(`${this.baseUrl}/queue/inbound/${id}/response`, {
      method: "POST",
      headers: this.jsonHeaders(),
      body: JSON.stringify({ response, status }),
    });
  }

  async postFail(id: string, error: string): Promise<void> {
    await this.fetchFn(`${this.baseUrl}/queue/inbound/${id}/fail`, {
      method: "POST",
      headers: this.jsonHeaders(),
      body: JSON.stringify({ error }),
    });
  }

  async pushOutbound(input: {
    chat_id: number;
    message: string;
    category: string;
    deliver_at?: string | null;
    entry_ids?: string[];
    report_date?: string;
  }): Promise<string> {
    const res = await this.fetchFn(`${this.baseUrl}/queue/outbound`, {
      method: "POST",
      headers: this.jsonHeaders(),
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Relay push failed: ${res.status}`);
    const data = (await res.json()) as { id: string };
    return data.id;
  }

  async downloadFile(fileName: string): Promise<ArrayBuffer> {
    const res = await this.fetchFn(`${this.baseUrl}/files/${fileName}`, {
      headers: this.headers(),
    });
    if (!res.ok) throw new Error(`File download failed: ${res.status}`);
    return res.arrayBuffer();
  }
}
```

- [ ] **Step 5: Run tests, verify GREEN**

- [ ] **Step 6: Commit**

```bash
git add src/relay/ tests/relay/
git commit -m "feat(relay): daemon-side HTTP client for relay API"
```

---

## Task 7: Daemon relay sync loop (`src/relay/sync.ts`)

**Files:**
- Create: `src/relay/sync.ts`
- Create: `tests/relay/sync.test.ts`
- Modify: `src/config.ts` — add relay config
- Modify: `src/types.ts` — add RelayConfig type
- Modify: `src/index.ts` — wire relay sync cron, disable local worker, pre-stage reports

- [ ] **Step 1: Write failing sync tests**

Test that the sync loop fetches pending items, dispatches each by type (ingest, query, voice, timesheet), posts responses, and handles errors.

- [ ] **Step 2: Run tests, verify RED**

- [ ] **Step 3: Implement sync loop**

The sync loop should:
1. Call `client.fetchPending()`
2. For each item, dispatch by `type`:
   - `ingest` → `ingestContent({ content: item.raw_text, source: "telegram", vaultRoot })`
   - `query` → `synthesize(item.raw_text.slice(1), store, topK)` → format response
   - `voice`/`audio` → `client.downloadFile(item.file_path)` → save to `raw/voice/` → ack (voice pipeline picks up via watcher)
   - `timesheet_entry` → `parseReviewCommands(item.raw_text)` → `applyReviewCommands()`
   - `timesheet_command` → dispatch to appropriate handler based on `item.command`
   - `timesheet_reply` → `parseReviewCommands(item.raw_text)` → `applyReviewCommands()` (need entry_ids from report map on relay)
3. Call `client.postResponse(id, result, "completed")` or `client.postFail(id, error)`

- [ ] **Step 4: Run tests, verify GREEN**

- [ ] **Step 5: Wire into daemon index.ts**

Add to `src/index.ts`:
- Load relay config from `.brain/config.yaml`
- If `relay.enabled`:
  - Do NOT spawn Telegram worker (disable local polling)
  - Create `RelayClient` instance
  - Add relay sync cron every `relay.poll_interval_seconds`
  - On boot: immediate sync poll
  - After scanner cron: pre-stage next morning's report via `client.pushOutbound()`
  - After finalization cron: push summary via `client.pushOutbound()`
  - After cap alert: push immediately via `client.pushOutbound()`

- [ ] **Step 6: Commit**

```bash
git add src/relay/sync.ts tests/relay/sync.test.ts src/index.ts src/config.ts src/types.ts
git commit -m "feat(relay): daemon sync loop + config wiring + pre-stage scheduled messages"
```

---

## Task 8: Deploy and integration test

**Files:**
- Modify: `.brain/config.yaml` — add relay section
- Modify: `.brain/.env` — add RELAY_SECRET

- [ ] **Step 1: Install relay dependencies**

```bash
cd relay && bun install
```

- [ ] **Step 2: Run relay tests**

```bash
cd relay && npx vitest run
```
Expected: all pass

- [ ] **Step 3: Run daemon tests**

```bash
npx vitest run
```
Expected: all pass (same pre-existing voice failures only)

- [ ] **Step 4: Deploy relay to Fly.io**

```bash
cd relay
fly launch --name brain-relay --region ewr --no-deploy
fly volumes create brain_relay_data --region ewr --size 1
fly secrets set TELEGRAM_BOT_TOKEN="..." RELAY_SECRET="..." ALLOWED_USER_IDS="..."
fly deploy
```

- [ ] **Step 5: Register webhook**

```bash
curl "https://api.telegram.org/bot${TOKEN}/setWebhook?url=https://brain-relay.fly.dev/webhook"
```

- [ ] **Step 6: Integration test — offline queue**

1. Stop daemon: `launchctl stop com.rahilsinghi.brain-daemon`
2. Send text message to bot → verify "⏳ Queued" ack
3. Send voice note → verify "🎤 Saved" ack
4. Send `?what is Karen` → verify "🔍 Queued" ack
5. Check relay health: `curl -H "Authorization: Bearer $SECRET" https://brain-relay.fly.dev/health`
6. Verify `inbound_pending >= 3`

- [ ] **Step 7: Integration test — daemon catch-up**

1. Add relay config to `.brain/config.yaml`
2. Start daemon: `launchctl start com.rahilsinghi.brain-daemon`
3. Watch logs: `tail -f /tmp/brain-daemon.stdout.log`
4. Verify: daemon polls relay, processes items, posts responses
5. Check Telegram: user receives delayed responses

- [ ] **Step 8: Integration test — scheduled message**

1. Verify scanner cron pre-stages tomorrow's 9 AM report
2. Check relay: `curl -H "Authorization: Bearer $SECRET" https://brain-relay.fly.dev/health`
3. Verify outbound item with `deliver_at` = tomorrow 9 AM

- [ ] **Step 9: Commit config**

```bash
git add .brain/config.yaml
git commit -m "feat(relay): enable relay sync in daemon config"
```

---

## Summary

| Task | Files | Tests | Description |
|------|-------|-------|-------------|
| 1 | relay/src/db.ts, types.ts | relay/tests/db.test.ts | SQLite queue layer |
| 2 | relay/src/webhook.ts | relay/tests/webhook.test.ts | Message classifier |
| 3 | relay/src/api.ts | relay/tests/api.test.ts | REST API for daemon |
| 4 | relay/src/scheduler.ts, responder.ts | relay/tests/scheduler.test.ts, responder.test.ts | Background loops |
| 5 | relay/src/index.ts, cleanup.ts, fly.toml, Dockerfile | — | Entry point + deployment |
| 6 | src/relay/client.ts, types.ts | tests/relay/client.test.ts | Daemon HTTP client |
| 7 | src/relay/sync.ts, index.ts, config.ts | tests/relay/sync.test.ts | Daemon sync loop + wiring |
| 8 | .brain/config.yaml | — | Deploy + integration test |
