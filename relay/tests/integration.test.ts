import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, rmSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { RelayDB } from "../src/db.js";
import { buildRelayApi } from "../src/api.js";
import type { FastifyInstance } from "fastify";

// ── Helpers ──

const SECRET = "integration-test-secret";

function makeTmpEnv(): { db: RelayDB; filesDir: string; dir: string } {
  const dir = mkdtempSync(join(tmpdir(), "relay-integ-"));
  const db = new RelayDB(join(dir, "relay.db"));
  const filesDir = join(dir, "files");
  mkdirSync(filesDir);
  return { db, filesDir, dir };
}

// ══════════════════════════════════════════════════════════════════════
// Integration Tests — Full Flows
// ══════════════════════════════════════════════════════════════════════

describe("Integration flows", () => {
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

  const headers = {
    Authorization: `Bearer ${SECRET}`,
    "Content-Type": "application/json",
  };

  // ── Flow 1: Text ingest round-trip ──

  describe("Flow 1: Text ingest round-trip", () => {
    it("completes full ingest cycle: insert → fetch → respond → send → verify", async () => {
      // 1. Insert inbound
      const inboundId = db.insertInbound({
        chat_id: 111,
        telegram_message_id: 2001,
        type: "ingest",
        raw_text: "Remember this",
      });

      // 2. Verify it appears in GET /queue/inbound
      let res = await app.inject({
        method: "GET",
        url: "/queue/inbound",
        headers,
      });
      expect(res.statusCode).toBe(200);
      let items = res.json().items;
      expect(items).toHaveLength(1);
      expect(items[0].id).toBe(inboundId);
      expect(items[0].raw_text).toBe("Remember this");

      // 3. POST response with "Saved."
      res = await app.inject({
        method: "POST",
        url: `/queue/inbound/${inboundId}/response`,
        headers,
        payload: { response: "Saved.", status: "completed" },
      });
      expect(res.statusCode).toBe(200);

      // 4. Verify getUnsentResponses returns it
      let unsent = db.getUnsentResponses();
      expect(unsent).toHaveLength(1);
      expect(unsent[0].id).toBe(inboundId);
      expect(unsent[0].response).toBe("Saved.");

      // 5. After markResponseSent, verify getUnsentResponses is empty
      db.markResponseSent(inboundId, 3001);
      unsent = db.getUnsentResponses();
      expect(unsent).toHaveLength(0);

      // 6. Verify it no longer appears in GET /queue/inbound (status changed to completed)
      res = await app.inject({
        method: "GET",
        url: "/queue/inbound",
        headers,
      });
      items = res.json().items;
      expect(items).toHaveLength(0);
    });
  });

  // ── Flow 2: Query round-trip ──

  describe("Flow 2: Query round-trip", () => {
    it("completes full query cycle: insert → fetch → respond → ready to send", async () => {
      // 1. Insert inbound query
      const inboundId = db.insertInbound({
        chat_id: 111,
        telegram_message_id: 2002,
        type: "query",
        raw_text: "?what is Karen",
      });

      // 2. Fetch pending via API
      let res = await app.inject({
        method: "GET",
        url: "/queue/inbound",
        headers,
      });
      expect(res.json().items).toHaveLength(1);
      expect(res.json().items[0].type).toBe("query");

      // 3. Post response
      res = await app.inject({
        method: "POST",
        url: `/queue/inbound/${inboundId}/response`,
        headers,
        payload: {
          response: "Karen is a recipe app built with SwiftUI and CloudKit.",
          status: "completed",
        },
      });
      expect(res.statusCode).toBe(200);

      // 4. Verify response is ready to send
      const unsent = db.getUnsentResponses();
      expect(unsent).toHaveLength(1);
      expect(unsent[0].response).toBe(
        "Karen is a recipe app built with SwiftUI and CloudKit.",
      );
      expect(unsent[0].response_sent).toBe(0);
    });
  });

  // ── Flow 3: Scheduled outbound delivery ──

  describe("Flow 3: Scheduled outbound delivery", () => {
    it("completes scheduled delivery: insert past → due → send → verify sent", async () => {
      const past = new Date(Date.now() - 60_000).toISOString();

      // 1. Insert outbound with deliver_at in the past
      const outId = db.insertOutbound({
        chat_id: 111,
        message: "Daily report for April 15",
        category: "daily_report",
        deliver_at: past,
      });

      // Set report metadata
      const entryIds = JSON.stringify(["entry-1", "entry-2"]);
      db.setOutboundReportMeta(outId, "2026-04-15", entryIds);

      // 2. Verify getDueOutbound returns it
      let due = db.getDueOutbound();
      expect(due).toHaveLength(1);
      expect(due[0].id).toBe(outId);

      // 3. After markOutboundSent, verify it no longer appears
      db.markOutboundSent(outId, 4001);
      due = db.getDueOutbound();
      expect(due).toHaveLength(0);

      // 4. Verify the outbound record is updated
      const row = db.getOutbound(outId);
      expect(row!.sent_at).toBeTruthy();
      expect(row!.telegram_message_id).toBe(4001);
      expect(row!.report_date).toBe("2026-04-15");
      expect(row!.entry_ids).toBe(entryIds);
    });
  });

  // ── Flow 4: Report reply chain ──

  describe("Flow 4: Report reply chain", () => {
    it("resolves full chain: inbound → outbound → report_message_map → entry_ids", async () => {
      // 1. Insert outbound (daily_report) with entry_ids
      const outId = db.insertOutbound({
        chat_id: 111,
        message: "Daily report:\n- 2h maison coding\n- 1h wilbo meeting",
        category: "daily_report",
      });
      const entryIds = JSON.stringify(["entry-abc", "entry-def"]);
      db.setOutboundReportMeta(outId, "2026-04-15", entryIds);

      // 2. Simulate sending (markOutboundSent with telegram_message_id=100)
      db.markOutboundSent(outId, 100);

      // 3. Insert report_message_map for that telegram_message_id
      db.insertReportMap(100, outId, "2026-04-15", entryIds);

      // 4. Insert inbound (timesheet_reply) with reply_to_queue_id pointing to the outbound
      const replyId = db.insertInbound({
        chat_id: 111,
        telegram_message_id: 2003,
        type: "timesheet_reply",
        raw_text: "Correct the first entry to 2.5h",
        reply_to_queue_id: outId,
      });

      // 5. Verify the full chain resolves
      const inbound = db.getInbound(replyId);
      expect(inbound).not.toBeNull();
      expect(inbound!.reply_to_queue_id).toBe(outId);

      // Follow the chain: inbound → outbound
      const outbound = db.getOutbound(inbound!.reply_to_queue_id!);
      expect(outbound).not.toBeNull();
      expect(outbound!.telegram_message_id).toBe(100);

      // Follow: outbound telegram_message_id → report_message_map
      const reportMap = db.getReportMap(outbound!.telegram_message_id!);
      expect(reportMap).not.toBeNull();
      expect(reportMap!.outbound_queue_id).toBe(outId);
      expect(reportMap!.date).toBe("2026-04-15");

      // Follow: report_message_map → entry_ids
      const resolvedEntryIds = JSON.parse(reportMap!.entry_ids);
      expect(resolvedEntryIds).toEqual(["entry-abc", "entry-def"]);
    });
  });

  // ── Flow 5: Pre-stage and replace ──

  describe("Flow 5: Pre-stage and replace", () => {
    it("stages future outbound, replaces message, fails replace after send", async () => {
      const tomorrow9am = new Date(
        Date.now() + 24 * 60 * 60_000,
      ).toISOString();

      // 1. Insert outbound with deliver_at tomorrow 9 AM
      const outId = db.insertOutbound({
        chat_id: 111,
        message: "Original report content",
        category: "daily_report",
        deliver_at: tomorrow9am,
      });

      // 2. Verify it's NOT in getDueOutbound (future)
      let due = db.getDueOutbound();
      expect(due.find((d) => d.id === outId)).toBeUndefined();

      // 3. Replace its message with fresh content
      const replaced = db.replaceOutbound(outId, "Updated report with new data");
      expect(replaced).toBe(true);

      // 4. Verify message updated
      let row = db.getOutbound(outId);
      expect(row!.message).toBe("Updated report with new data");

      // 5. Mark as sent, then try to replace — returns false
      db.markOutboundSent(outId, 5001);
      const replacedAfterSend = db.replaceOutbound(outId, "Should not work");
      expect(replacedAfterSend).toBe(false);

      row = db.getOutbound(outId);
      expect(row!.message).toBe("Updated report with new data");
    });
  });

  // ── Flow 6: Retry exhaustion ──

  describe("Flow 6: Retry exhaustion", () => {
    it("exhausts retries: 5 increments → failed=1 → no longer due", async () => {
      const past = new Date(Date.now() - 60_000).toISOString();

      // 1. Insert outbound with past deliver_at
      const outId = db.insertOutbound({
        chat_id: 111,
        message: "Flaky delivery",
        category: "general",
        deliver_at: past,
      });

      // Verify it starts as due
      expect(db.getDueOutbound().find((d) => d.id === outId)).toBeDefined();

      // 2. Call incrementOutboundRetry 5 times
      for (let i = 0; i < 5; i++) {
        db.incrementOutboundRetry(outId);
      }

      // 3. Verify failed=1
      const row = db.getOutbound(outId);
      expect(row!.retry_count).toBe(5);
      expect(row!.failed).toBe(1);

      // 4. Verify getDueOutbound no longer returns it
      const due = db.getDueOutbound();
      expect(due.find((d) => d.id === outId)).toBeUndefined();
    });
  });

  // ── Flow 7: Multi-item API interaction ──

  describe("Flow 7: Mixed queue interaction via API", () => {
    it("processes multiple inbound types and verifies health counts", async () => {
      // Insert several inbound items of different types
      db.insertInbound({
        chat_id: 111,
        telegram_message_id: 3001,
        type: "ingest",
        raw_text: "Remember fact A",
      });
      db.insertInbound({
        chat_id: 111,
        telegram_message_id: 3002,
        type: "query",
        raw_text: "?what is brain",
      });
      db.insertInbound({
        chat_id: 111,
        telegram_message_id: 3003,
        type: "timesheet_entry",
        raw_text: "+2h maison coding",
      });

      // Insert outbound items
      db.insertOutbound({
        chat_id: 111,
        message: "Due now",
        category: "general",
      });
      const future = new Date(Date.now() + 3600_000).toISOString();
      db.insertOutbound({
        chat_id: 111,
        message: "Due later",
        category: "general",
        deliver_at: future,
      });

      // Check health
      const res = await app.inject({
        method: "GET",
        url: "/health",
        headers,
      });
      const body = res.json();
      expect(body.inbound_pending).toBe(3);
      expect(body.outbound_due).toBe(1); // only the one with no deliver_at / past deliver_at

      // Process one inbound via API
      const inboundRes = await app.inject({
        method: "GET",
        url: "/queue/inbound",
        headers,
      });
      const firstItem = inboundRes.json().items[0];
      await app.inject({
        method: "POST",
        url: `/queue/inbound/${firstItem.id}/response`,
        headers,
        payload: { response: "Ingested", status: "completed" },
      });

      // Health should now show 2 pending
      const healthRes = await app.inject({
        method: "GET",
        url: "/health",
        headers,
      });
      expect(healthRes.json().inbound_pending).toBe(2);
    });
  });

  // ── Flow 8: Outbound via API with report metadata ──

  describe("Flow 8: Outbound creation via API with full metadata", () => {
    it("creates outbound via API, sets metadata, replaces, then sends", async () => {
      // 1. Create outbound via API with report metadata
      let res = await app.inject({
        method: "POST",
        url: "/queue/outbound",
        headers,
        payload: {
          chat_id: 111,
          message: "Initial daily report",
          category: "daily_report",
          report_date: "2026-04-15",
          entry_ids: ["e1", "e2"],
        },
      });
      expect(res.statusCode).toBe(201);
      const { id: outId } = res.json();

      // 2. Verify metadata stored
      let row = db.getOutbound(outId);
      expect(row!.report_date).toBe("2026-04-15");
      expect(JSON.parse(row!.entry_ids!)).toEqual(["e1", "e2"]);

      // 3. Replace via API
      res = await app.inject({
        method: "POST",
        url: `/queue/outbound/${outId}/replace`,
        headers,
        payload: { message: "Updated daily report" },
      });
      expect(res.json()).toEqual({ ok: true });

      // 4. Verify message updated but metadata preserved
      row = db.getOutbound(outId);
      expect(row!.message).toBe("Updated daily report");
      expect(row!.report_date).toBe("2026-04-15");

      // 5. Mark sent
      db.markOutboundSent(outId, 6001);

      // 6. Replace after send fails
      res = await app.inject({
        method: "POST",
        url: `/queue/outbound/${outId}/replace`,
        headers,
        payload: { message: "Too late" },
      });
      expect(res.json()).toEqual({ ok: false });
    });
  });

  // ── Flow 9: Inbound failure and retry ──

  describe("Flow 9: Inbound failure and retry via API", () => {
    it("fails an item, retries, then eventually succeeds", async () => {
      const inboundId = db.insertInbound({
        chat_id: 111,
        telegram_message_id: 4001,
        type: "ingest",
        raw_text: "Flaky ingest",
      });

      // Fail twice
      for (let i = 0; i < 2; i++) {
        await app.inject({
          method: "POST",
          url: `/queue/inbound/${inboundId}/fail`,
          headers,
          payload: { error: `attempt ${i + 1} failed` },
        });
      }

      // Verify retry count
      let row = db.getInbound(inboundId);
      expect(row!.retry_count).toBe(2);
      expect(row!.status).toBe("failed");

      // Item is failed, not pending — so it won't show in getPendingInbound
      const res = await app.inject({
        method: "GET",
        url: "/queue/inbound",
        headers,
      });
      expect(res.json().items).toHaveLength(0);

      // Simulate daemon re-processing: set response to succeed
      db.setInboundResponse(inboundId, "Finally ingested", "completed");
      row = db.getInbound(inboundId);
      expect(row!.status).toBe("completed");
      expect(row!.response).toBe("Finally ingested");

      // Unsent response is available
      const unsent = db.getUnsentResponses();
      expect(unsent).toHaveLength(1);
    });
  });
});
