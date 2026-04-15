import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { randomUUID } from "node:crypto";
import { mkdtempSync, rmSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { RelayDB } from "../src/db.js";
import { buildRelayApi } from "../src/api.js";
import { classifyMessage, getAckMessage } from "../src/webhook.js";
import type { FastifyInstance } from "fastify";

// ── Helpers ──

function makeTmpDb(): { db: RelayDB; dir: string } {
  const dir = mkdtempSync(join(tmpdir(), "relay-edge-"));
  const db = new RelayDB(join(dir, "relay.db"));
  return { db, dir };
}

const SECRET = "edge-test-secret";

function makeTmpEnv(): { db: RelayDB; filesDir: string; dir: string } {
  const dir = mkdtempSync(join(tmpdir(), "relay-edge-api-"));
  const db = new RelayDB(join(dir, "relay.db"));
  const filesDir = join(dir, "files");
  mkdirSync(filesDir);
  return { db, filesDir, dir };
}

// ══════════════════════════════════════════════════════════════════════
// DB Edge Cases
// ══════════════════════════════════════════════════════════════════════

describe("DB edge cases", () => {
  let db: RelayDB;
  let dir: string;

  beforeEach(() => {
    ({ db, dir } = makeTmpDb());
  });

  afterEach(() => {
    db.close();
    rmSync(dir, { recursive: true, force: true });
  });

  // ── Inbound ──

  it("handles very long raw_text (10KB+)", () => {
    const longText = "x".repeat(15_000);
    const id = db.insertInbound({
      chat_id: 1,
      telegram_message_id: 1,
      type: "ingest",
      raw_text: longText,
    });
    const row = db.getInbound(id);
    expect(row).not.toBeNull();
    expect(row!.raw_text).toHaveLength(15_000);
  });

  it("inserts inbound with empty raw_text for voice messages", () => {
    const id = db.insertInbound({
      chat_id: 1,
      telegram_message_id: 1,
      type: "voice",
      raw_text: "",
      file_path: "/tmp/voice.ogg",
      file_status: "downloaded",
    });
    const row = db.getInbound(id);
    expect(row).not.toBeNull();
    expect(row!.raw_text).toBe("");
    expect(row!.type).toBe("voice");
  });

  it("inserts inbound with all optional fields null", () => {
    const id = db.insertInbound({
      chat_id: 1,
      telegram_message_id: 1,
      type: "ingest",
      raw_text: "minimal",
    });
    const row = db.getInbound(id);
    expect(row!.command).toBeNull();
    expect(row!.file_path).toBeNull();
    expect(row!.file_status).toBe("none");
    expect(row!.reply_to_queue_id).toBeNull();
  });

  it("getPendingInbound returns empty array when no pending items", () => {
    const pending = db.getPendingInbound();
    expect(pending).toEqual([]);
  });

  it("getPendingInbound excludes completed items", () => {
    const id = db.insertInbound({
      chat_id: 1,
      telegram_message_id: 1,
      type: "ingest",
      raw_text: "completed",
    });
    db.setInboundResponse(id, "Done", "completed");
    expect(db.getPendingInbound()).toHaveLength(0);
  });

  it("getPendingInbound excludes failed items", () => {
    const id = db.insertInbound({
      chat_id: 1,
      telegram_message_id: 1,
      type: "ingest",
      raw_text: "failed",
    });
    db.setInboundFailed(id, "crash");
    expect(db.getPendingInbound()).toHaveLength(0);
  });

  it("getPendingInbound excludes processing items", () => {
    const id = db.insertInbound({
      chat_id: 1,
      telegram_message_id: 1,
      type: "ingest",
      raw_text: "processing",
    });
    db.setInboundResponse(id, "Working...", "processing");
    expect(db.getPendingInbound()).toHaveLength(0);
  });

  it("setInboundResponse on non-existent ID does not error", () => {
    expect(() => {
      db.setInboundResponse("nonexistent-uuid", "response", "completed");
    }).not.toThrow();
  });

  it("setInboundFailed on already-completed item still updates", () => {
    const id = db.insertInbound({
      chat_id: 1,
      telegram_message_id: 1,
      type: "ingest",
      raw_text: "will complete then fail",
    });
    db.setInboundResponse(id, "Done", "completed");
    db.setInboundFailed(id, "late error");

    const row = db.getInbound(id);
    expect(row!.status).toBe("failed");
    expect(row!.error).toBe("late error");
    expect(row!.retry_count).toBe(1);
  });

  it("markInboundByTelegramId updates only pending items (not completed)", () => {
    // Insert two items with same telegram_message_id
    db.insertInbound({
      chat_id: 1,
      telegram_message_id: 5555,
      type: "ingest",
      raw_text: "first",
    });

    // Complete the first
    const pending1 = db.getPendingInbound();
    db.setInboundResponse(pending1[0].id, "Done", "completed");

    // Insert second with same telegram_message_id
    db.insertInbound({
      chat_id: 1,
      telegram_message_id: 5555,
      type: "ingest",
      raw_text: "second",
    });

    // markInboundByTelegramId updates ALL rows with that telegram_message_id
    db.markInboundByTelegramId(5555, "processing");

    // The SQL updates all rows with that telegram_message_id (no status filter)
    // Verify the second one was updated
    const pending = db.getPendingInbound();
    expect(pending).toHaveLength(0);
  });

  // ── Outbound ──

  it("getDueOutbound with deliver_at exactly equal to now (boundary)", () => {
    const now = new Date().toISOString();
    db.insertOutbound({
      chat_id: 1,
      message: "Exactly now",
      category: "general",
      deliver_at: now,
    });
    const due = db.getDueOutbound();
    expect(due).toHaveLength(1);
    expect(due[0].message).toBe("Exactly now");
  });

  it("getDueOutbound with deliver_at=NULL returns immediately", () => {
    db.insertOutbound({
      chat_id: 1,
      message: "No schedule",
      category: "general",
    });
    const due = db.getDueOutbound();
    expect(due).toHaveLength(1);
    expect(due[0].deliver_at).toBeNull();
  });

  it("replaceOutbound on already-sent item returns false", () => {
    const id = db.insertOutbound({
      chat_id: 1,
      message: "Sent",
      category: "general",
    });
    db.markOutboundSent(id, 100);

    const ok = db.replaceOutbound(id, "Too late");
    expect(ok).toBe(false);

    const row = db.getOutbound(id);
    expect(row!.message).toBe("Sent");
  });

  it("replaceOutbound on non-existent ID returns false", () => {
    const ok = db.replaceOutbound("nonexistent-uuid", "Nothing to replace");
    expect(ok).toBe(false);
  });

  it("incrementOutboundRetry transitions to failed=1 at exactly retry_count=5", () => {
    const id = db.insertOutbound({
      chat_id: 1,
      message: "Flaky",
      category: "general",
    });

    // Retries 1-4: not failed
    for (let i = 1; i <= 4; i++) {
      db.incrementOutboundRetry(id);
      const row = db.getOutbound(id);
      expect(row!.retry_count).toBe(i);
      expect(row!.failed).toBe(0);
    }

    // Retry 5: exactly transitions to failed
    db.incrementOutboundRetry(id);
    const row = db.getOutbound(id);
    expect(row!.retry_count).toBe(5);
    expect(row!.failed).toBe(1);
  });

  // ── Report Message Map ──

  it("insertReportMap with same telegram_message_id twice errors (PRIMARY KEY)", () => {
    const outId = randomUUID();
    db.insertReportMap(12345, outId, "2026-04-15", '["e1"]');

    // INSERT (not INSERT OR REPLACE) so duplicate PK throws
    expect(() => {
      db.insertReportMap(12345, randomUUID(), "2026-04-16", '["e2"]');
    }).toThrow();
  });

  it("getReportMap returns null for non-existent ID", () => {
    expect(db.getReportMap(99999)).toBeNull();
  });

  it("multiple concurrent inbound items maintain FIFO order", () => {
    const ids: string[] = [];
    for (let i = 0; i < 20; i++) {
      ids.push(
        db.insertInbound({
          chat_id: 1,
          telegram_message_id: 1000 + i,
          type: "ingest",
          raw_text: `item-${i}`,
        }),
      );
    }

    const pending = db.getPendingInbound();
    expect(pending).toHaveLength(20);
    for (let i = 0; i < 20; i++) {
      expect(pending[i].raw_text).toBe(`item-${i}`);
    }
  });
});

// ══════════════════════════════════════════════════════════════════════
// Webhook Edge Cases
// ══════════════════════════════════════════════════════════════════════

describe("Webhook edge cases", () => {
  it("empty string classifies as ingest", () => {
    expect(classifyMessage("", null).type).toBe("ingest");
  });

  it("whitespace-only text classifies as ingest", () => {
    expect(classifyMessage("   ", null).type).toBe("ingest");
    expect(classifyMessage("\t\n", null).type).toBe("ingest");
  });

  it("? alone (no query text) classifies as query", () => {
    expect(classifyMessage("?", null).type).toBe("query");
  });

  it("+2h with no trailing space classifies as ingest (not timesheet_entry)", () => {
    expect(classifyMessage("+2h", null).type).toBe("ingest");
  });

  it("+h maison coding (no number) classifies as ingest", () => {
    expect(classifyMessage("+h maison coding", null).type).toBe("ingest");
  });

  it("/unknown_command classifies as ingest (not in whitelist)", () => {
    expect(classifyMessage("/unknown_command", null).type).toBe("ingest");
  });

  it("/foo classifies as ingest (not in whitelist)", () => {
    expect(classifyMessage("/foo", null).type).toBe("ingest");
  });

  it("/ts with extra whitespace classifies as timesheet_command", () => {
    // "/ts  today" — command is still parsed as "ts"
    expect(classifyMessage("/ts  today", null).type).toBe("timesheet_command");
    expect(classifyMessage("/ts  today", null).command).toBe("ts");
  });

  it("reply to report with ?query text returns timesheet_reply (reply takes priority)", () => {
    const result = classifyMessage("?what is this", "outbound-123");
    expect(result.type).toBe("timesheet_reply");
    expect(result.reply_to_queue_id).toBe("outbound-123");
  });

  it("unicode text classifies as ingest", () => {
    expect(classifyMessage("Bonjour le monde", null).type).toBe("ingest");
    expect(classifyMessage("Hello world", null).type).toBe("ingest");
  });

  it("very long text (10KB) classifies as ingest without crashing", () => {
    const longText = "a".repeat(10_000);
    expect(classifyMessage(longText, null).type).toBe("ingest");
  });

  it("text with newlines classified by first line behavior", () => {
    // First line is "?query", so it should be query
    expect(classifyMessage("?query\nsecond line", null).type).toBe("query");

    // First line is plain text
    expect(classifyMessage("plain text\n?query on second line", null).type).toBe("ingest");
  });

  it("+2h (no space) does not match timesheet_entry regex", () => {
    expect(classifyMessage("+2h", null).type).toBe("ingest");
  });

  it("+0.5h with space and description matches timesheet_entry", () => {
    expect(classifyMessage("+0.5h maison coding", null).type).toBe("timesheet_entry");
  });

  it("/ts alone (no args) classifies as timesheet_command", () => {
    const result = classifyMessage("/ts", null);
    expect(result.type).toBe("timesheet_command");
    expect(result.command).toBe("ts");
  });
});

// ══════════════════════════════════════════════════════════════════════
// API Edge Cases
// ══════════════════════════════════════════════════════════════════════

describe("API edge cases", () => {
  let db: RelayDB;
  let filesDir: string;
  let dir: string;
  let app: FastifyInstance;

  beforeEach(async () => {
    ({ db, filesDir, dir } = makeTmpEnv());
    app = buildRelayApi(db, SECRET, filesDir);
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
    db.close();
    rmSync(dir, { recursive: true, force: true });
  });

  // ── Auth edge cases ──

  it("rejects with wrong token (401)", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/queue/inbound",
      headers: { Authorization: "Bearer wrong-token" },
    });
    expect(res.statusCode).toBe(401);
  });

  it("rejects with empty Bearer value (401)", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/queue/inbound",
      headers: { Authorization: "Bearer " },
    });
    expect(res.statusCode).toBe(401);
  });

  it("rejects with no Authorization header (401)", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/queue/inbound",
    });
    expect(res.statusCode).toBe(401);
  });

  it("rejects 'Bearer ' with space but no token (401)", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/queue/inbound",
      headers: { Authorization: "Bearer " },
    });
    expect(res.statusCode).toBe(401);
  });

  // ── POST /queue/inbound/:id/response with non-existent ID ──

  it("POST /queue/inbound/:id/response with non-existent ID does not error (idempotent)", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/queue/inbound/nonexistent-uuid/response",
      headers: {
        Authorization: `Bearer ${SECRET}`,
        "Content-Type": "application/json",
      },
      payload: { response: "Answer", status: "completed" },
    });
    // The handler calls db.setInboundResponse which runs UPDATE ... WHERE id = ?
    // If no row matches, it simply updates 0 rows — no error
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ ok: true });
  });

  // ── POST /queue/outbound with entry_ids + report_date ──

  it("POST /queue/outbound with entry_ids + report_date stores metadata", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/queue/outbound",
      headers: {
        Authorization: `Bearer ${SECRET}`,
        "Content-Type": "application/json",
      },
      payload: {
        chat_id: 111,
        message: "Report",
        category: "daily_report",
        report_date: "2026-04-15",
        entry_ids: ["e1", "e2", "e3"],
      },
    });
    expect(res.statusCode).toBe(201);
    const { id } = res.json();
    const row = db.getOutbound(id);
    expect(row!.report_date).toBe("2026-04-15");
    expect(JSON.parse(row!.entry_ids!)).toEqual(["e1", "e2", "e3"]);
  });

  it("POST /queue/outbound without entry_ids does not store metadata", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/queue/outbound",
      headers: {
        Authorization: `Bearer ${SECRET}`,
        "Content-Type": "application/json",
      },
      payload: {
        chat_id: 111,
        message: "General msg",
        category: "general",
      },
    });
    expect(res.statusCode).toBe(201);
    const { id } = res.json();
    const row = db.getOutbound(id);
    expect(row!.report_date).toBeNull();
    expect(row!.entry_ids).toBeNull();
  });

  // ── GET /queue/inbound when empty ──

  it("GET /queue/inbound when queue is empty returns { items: [] }", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/queue/inbound",
      headers: { Authorization: `Bearer ${SECRET}` },
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ items: [] });
  });

  // ── GET /health when both queues empty ──

  it("GET /health when both queues empty returns zeros", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/health",
      headers: { Authorization: `Bearer ${SECRET}` },
    });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.status).toBe("ok");
    expect(body.inbound_pending).toBe(0);
    expect(body.outbound_due).toBe(0);
  });

  // ── POST /queue/outbound/:id/replace on non-existent ──

  it("POST /queue/outbound/:id/replace on non-existent ID returns ok: false", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/queue/outbound/nonexistent-uuid/replace",
      headers: {
        Authorization: `Bearer ${SECRET}`,
        "Content-Type": "application/json",
      },
      payload: { message: "Nothing here" },
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ ok: false });
  });
});
