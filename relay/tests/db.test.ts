import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { randomUUID } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { RelayDB } from "../src/db.js";
import type { InboundType, OutboundCategory } from "../src/types.js";

function makeTmpDb(): { db: RelayDB; dir: string } {
  const dir = mkdtempSync(join(tmpdir(), "relay-test-"));
  const db = new RelayDB(join(dir, "relay.db"));
  return { db, dir };
}

describe("RelayDB", () => {
  let db: RelayDB;
  let dir: string;

  beforeEach(() => {
    ({ db, dir } = makeTmpDb());
  });

  afterEach(() => {
    db.close();
    rmSync(dir, { recursive: true, force: true });
  });

  // ── Schema ──

  describe("schema", () => {
    it("creates all 3 tables", () => {
      const tables = db.listTables();
      expect(tables).toContain("inbound_queue");
      expect(tables).toContain("outbound_queue");
      expect(tables).toContain("report_message_map");
    });
  });

  // ── Inbound Queue ──

  describe("inbound queue", () => {
    it("insert + get round-trips correctly", () => {
      const id = db.insertInbound({
        chat_id: 123456,
        telegram_message_id: 1001,
        type: "ingest",
        raw_text: "Remember this fact",
      });

      expect(id).toBeTruthy();
      const row = db.getInbound(id);
      expect(row).not.toBeNull();
      expect(row!.chat_id).toBe(123456);
      expect(row!.telegram_message_id).toBe(1001);
      expect(row!.type).toBe("ingest");
      expect(row!.raw_text).toBe("Remember this fact");
      expect(row!.status).toBe("pending");
      expect(row!.response).toBeNull();
      expect(row!.response_sent).toBe(0);
      expect(row!.retry_count).toBe(0);
      expect(row!.error).toBeNull();
      expect(row!.file_path).toBeNull();
      expect(row!.file_status).toBe("none");
      expect(row!.command).toBeNull();
      expect(row!.reply_to_queue_id).toBeNull();
    });

    it("insert with optional fields", () => {
      const id = db.insertInbound({
        chat_id: 123456,
        telegram_message_id: 1002,
        type: "timesheet_command",
        raw_text: "/hours maison 2.5",
        command: "/hours",
        reply_to_queue_id: "some-uuid",
      });

      const row = db.getInbound(id);
      expect(row!.command).toBe("/hours");
      expect(row!.reply_to_queue_id).toBe("some-uuid");
    });

    it("getPendingInbound returns FIFO order", () => {
      db.insertInbound({
        chat_id: 1,
        telegram_message_id: 1,
        type: "ingest",
        raw_text: "first",
      });
      db.insertInbound({
        chat_id: 1,
        telegram_message_id: 2,
        type: "query",
        raw_text: "second",
      });
      db.insertInbound({
        chat_id: 1,
        telegram_message_id: 3,
        type: "ingest",
        raw_text: "third",
      });

      const pending = db.getPendingInbound();
      expect(pending).toHaveLength(3);
      expect(pending[0].raw_text).toBe("first");
      expect(pending[1].raw_text).toBe("second");
      expect(pending[2].raw_text).toBe("third");
    });

    it("getPendingInbound excludes non-pending", () => {
      const id = db.insertInbound({
        chat_id: 1,
        telegram_message_id: 1,
        type: "ingest",
        raw_text: "will be completed",
      });
      db.setInboundResponse(id, "Done!", "completed");

      db.insertInbound({
        chat_id: 1,
        telegram_message_id: 2,
        type: "ingest",
        raw_text: "still pending",
      });

      const pending = db.getPendingInbound();
      expect(pending).toHaveLength(1);
      expect(pending[0].raw_text).toBe("still pending");
    });

    it("setInboundResponse updates status, response, and processed_at", () => {
      const id = db.insertInbound({
        chat_id: 1,
        telegram_message_id: 1,
        type: "query",
        raw_text: "?what is brain",
      });

      db.setInboundResponse(id, "Brain is a knowledge graph.", "completed");

      const row = db.getInbound(id);
      expect(row!.status).toBe("completed");
      expect(row!.response).toBe("Brain is a knowledge graph.");
      expect(row!.processed_at).toBeTruthy();
    });

    it("setInboundFailed increments retry_count and sets error", () => {
      const id = db.insertInbound({
        chat_id: 1,
        telegram_message_id: 1,
        type: "ingest",
        raw_text: "failing item",
      });

      db.setInboundFailed(id, "Connection refused");

      const row = db.getInbound(id);
      expect(row!.status).toBe("failed");
      expect(row!.error).toBe("Connection refused");
      expect(row!.retry_count).toBe(1);
    });

    it("setInboundFailed increments retry_count cumulatively", () => {
      const id = db.insertInbound({
        chat_id: 1,
        telegram_message_id: 1,
        type: "ingest",
        raw_text: "retried item",
      });

      db.setInboundFailed(id, "error 1");
      db.setInboundFailed(id, "error 2");
      db.setInboundFailed(id, "error 3");

      const row = db.getInbound(id);
      expect(row!.retry_count).toBe(3);
      expect(row!.error).toBe("error 3");
    });

    it("getUnsentResponses + markResponseSent", () => {
      const id1 = db.insertInbound({
        chat_id: 1,
        telegram_message_id: 1,
        type: "query",
        raw_text: "?q1",
      });
      const id2 = db.insertInbound({
        chat_id: 1,
        telegram_message_id: 2,
        type: "query",
        raw_text: "?q2",
      });

      db.setInboundResponse(id1, "Answer 1", "completed");
      db.setInboundResponse(id2, "Answer 2", "completed");

      let unsent = db.getUnsentResponses();
      expect(unsent).toHaveLength(2);

      db.markResponseSent(id1, 5001);

      unsent = db.getUnsentResponses();
      expect(unsent).toHaveLength(1);
      expect(unsent[0].id).toBe(id2);

      const sent = db.getInbound(id1);
      expect(sent!.response_sent).toBe(1);
      expect(sent!.telegram_message_id).toBe(5001);
    });

    it("markInboundByTelegramId updates status for dedup", () => {
      db.insertInbound({
        chat_id: 1,
        telegram_message_id: 9999,
        type: "ingest",
        raw_text: "dedup test",
      });

      db.markInboundByTelegramId(9999, "completed");

      const pending = db.getPendingInbound();
      expect(pending).toHaveLength(0);
    });

    it("getInbound returns null for nonexistent id", () => {
      expect(db.getInbound("nonexistent-uuid")).toBeNull();
    });
  });

  // ── Outbound Queue ──

  describe("outbound queue", () => {
    it("insert + get round-trips correctly", () => {
      const id = db.insertOutbound({
        chat_id: 123456,
        message: "Your daily report is ready.",
        category: "daily_report",
      });

      expect(id).toBeTruthy();
      const row = db.getOutbound(id);
      expect(row).not.toBeNull();
      expect(row!.chat_id).toBe(123456);
      expect(row!.message).toBe("Your daily report is ready.");
      expect(row!.category).toBe("daily_report");
      expect(row!.sent_at).toBeNull();
      expect(row!.telegram_message_id).toBeNull();
      expect(row!.retry_count).toBe(0);
      expect(row!.failed).toBe(0);
      expect(row!.deliver_at).toBeNull();
      expect(row!.report_date).toBeNull();
      expect(row!.entry_ids).toBeNull();
    });

    it("insert with deliver_at in the future", () => {
      const future = new Date(Date.now() + 3600_000).toISOString();
      const id = db.insertOutbound({
        chat_id: 1,
        message: "Scheduled message",
        category: "general",
        deliver_at: future,
      });

      const row = db.getOutbound(id);
      expect(row!.deliver_at).toBe(future);
    });

    it("getDueOutbound returns items with past deliver_at", () => {
      const past = new Date(Date.now() - 60_000).toISOString();
      const future = new Date(Date.now() + 3600_000).toISOString();

      db.insertOutbound({
        chat_id: 1,
        message: "Past due",
        category: "general",
        deliver_at: past,
      });
      db.insertOutbound({
        chat_id: 1,
        message: "Not yet due",
        category: "general",
        deliver_at: future,
      });
      db.insertOutbound({
        chat_id: 1,
        message: "No deliver_at (immediately due)",
        category: "general",
      });

      const due = db.getDueOutbound();
      expect(due).toHaveLength(2);
      const messages = due.map((d) => d.message);
      expect(messages).toContain("Past due");
      expect(messages).toContain("No deliver_at (immediately due)");
      expect(messages).not.toContain("Not yet due");
    });

    it("getDueOutbound excludes sent and failed", () => {
      const id1 = db.insertOutbound({
        chat_id: 1,
        message: "Already sent",
        category: "general",
      });
      db.markOutboundSent(id1, 7001);

      db.insertOutbound({
        chat_id: 1,
        message: "Still pending",
        category: "general",
      });

      const due = db.getDueOutbound();
      expect(due).toHaveLength(1);
      expect(due[0].message).toBe("Still pending");
    });

    it("markOutboundSent sets sent_at and telegram_message_id", () => {
      const id = db.insertOutbound({
        chat_id: 1,
        message: "To be sent",
        category: "general",
      });

      db.markOutboundSent(id, 8001);

      const row = db.getOutbound(id);
      expect(row!.sent_at).toBeTruthy();
      expect(row!.telegram_message_id).toBe(8001);
    });

    it("incrementOutboundRetry increments and marks failed after 5", () => {
      const id = db.insertOutbound({
        chat_id: 1,
        message: "Flaky message",
        category: "general",
      });

      for (let i = 0; i < 4; i++) {
        db.incrementOutboundRetry(id);
        const row = db.getOutbound(id);
        expect(row!.retry_count).toBe(i + 1);
        expect(row!.failed).toBe(0);
      }

      db.incrementOutboundRetry(id);
      const row = db.getOutbound(id);
      expect(row!.retry_count).toBe(5);
      expect(row!.failed).toBe(1);
    });

    it("replaceOutbound updates unsent message", () => {
      const id = db.insertOutbound({
        chat_id: 1,
        message: "Original",
        category: "daily_report",
      });

      const replaced = db.replaceOutbound(id, "Updated report");
      expect(replaced).toBe(true);

      const row = db.getOutbound(id);
      expect(row!.message).toBe("Updated report");
    });

    it("replaceOutbound rejects already-sent message", () => {
      const id = db.insertOutbound({
        chat_id: 1,
        message: "Sent already",
        category: "daily_report",
      });
      db.markOutboundSent(id, 9001);

      const replaced = db.replaceOutbound(id, "Too late");
      expect(replaced).toBe(false);

      const row = db.getOutbound(id);
      expect(row!.message).toBe("Sent already");
    });

    it("setOutboundReportMeta stores report_date and entry_ids", () => {
      const id = db.insertOutbound({
        chat_id: 1,
        message: "Report",
        category: "daily_report",
      });

      const entryIds = JSON.stringify(["entry-1", "entry-2"]);
      db.setOutboundReportMeta(id, "2026-04-15", entryIds);

      const row = db.getOutbound(id);
      expect(row!.report_date).toBe("2026-04-15");
      expect(row!.entry_ids).toBe(entryIds);
    });

    it("getOutbound returns null for nonexistent id", () => {
      expect(db.getOutbound("nonexistent-uuid")).toBeNull();
    });
  });

  // ── Report Message Map ──

  describe("report message map", () => {
    it("insert + get round-trips correctly", () => {
      const outboundId = randomUUID();
      const entryIds = JSON.stringify(["e1", "e2"]);

      db.insertReportMap(12345, outboundId, "2026-04-15", entryIds);

      const row = db.getReportMap(12345);
      expect(row).not.toBeNull();
      expect(row!.telegram_message_id).toBe(12345);
      expect(row!.outbound_queue_id).toBe(outboundId);
      expect(row!.date).toBe("2026-04-15");
      expect(row!.entry_ids).toBe(entryIds);
    });

    it("getReportMap returns null for nonexistent telegram_message_id", () => {
      expect(db.getReportMap(99999)).toBeNull();
    });
  });
});
