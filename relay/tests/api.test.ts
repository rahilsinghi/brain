import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { RelayDB } from "../src/db.js";
import { buildRelayApi } from "../src/api.js";
import type { FastifyInstance } from "fastify";

const SECRET = "test-secret-abc123";

function makeTmpEnv(): { db: RelayDB; filesDir: string; dir: string } {
  const dir = mkdtempSync(join(tmpdir(), "relay-api-test-"));
  const db = new RelayDB(join(dir, "relay.db"));
  const filesDir = join(dir, "files");
  mkdirSync(filesDir);
  return { db, filesDir, dir };
}

describe("buildRelayApi", () => {
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

  // ── Auth ──

  describe("auth", () => {
    it("rejects request without Authorization header (401)", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/queue/inbound",
      });
      expect(res.statusCode).toBe(401);
    });

    it("rejects request with wrong bearer token (401)", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/queue/inbound",
        headers: { Authorization: "Bearer wrong-token" },
      });
      expect(res.statusCode).toBe(401);
    });

    it("rejects malformed Authorization header (401)", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/queue/inbound",
        headers: { Authorization: "Basic somebase64stuff" },
      });
      expect(res.statusCode).toBe(401);
    });

    it("accepts request with correct bearer token (200)", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/queue/inbound",
        headers: { Authorization: `Bearer ${SECRET}` },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  // ── GET /queue/inbound ──

  describe("GET /queue/inbound", () => {
    it("returns empty items array when no pending inbound", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/queue/inbound",
        headers: { Authorization: `Bearer ${SECRET}` },
      });
      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body).toEqual({ items: [] });
    });

    it("returns pending inbound items", async () => {
      db.insertInbound({
        chat_id: 111,
        telegram_message_id: 1,
        type: "ingest",
        raw_text: "Hello brain",
      });
      db.insertInbound({
        chat_id: 111,
        telegram_message_id: 2,
        type: "query",
        raw_text: "?what is brain",
      });

      const res = await app.inject({
        method: "GET",
        url: "/queue/inbound",
        headers: { Authorization: `Bearer ${SECRET}` },
      });
      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.items).toHaveLength(2);
      expect(body.items[0].raw_text).toBe("Hello brain");
      expect(body.items[1].raw_text).toBe("?what is brain");
    });

    it("excludes completed items from pending list", async () => {
      const id = db.insertInbound({
        chat_id: 111,
        telegram_message_id: 1,
        type: "ingest",
        raw_text: "completed item",
      });
      db.setInboundResponse(id, "Done", "completed");

      db.insertInbound({
        chat_id: 111,
        telegram_message_id: 2,
        type: "ingest",
        raw_text: "still pending",
      });

      const res = await app.inject({
        method: "GET",
        url: "/queue/inbound",
        headers: { Authorization: `Bearer ${SECRET}` },
      });
      const body = res.json();
      expect(body.items).toHaveLength(1);
      expect(body.items[0].raw_text).toBe("still pending");
    });
  });

  // ── GET /files/:id ──

  describe("GET /files/:id", () => {
    it("serves file content as application/octet-stream", async () => {
      const content = "voice transcription data here";
      const fileId = "test-voice-file.ogg";
      writeFileSync(join(filesDir, fileId), content);

      const res = await app.inject({
        method: "GET",
        url: `/files/${fileId}`,
        headers: { Authorization: `Bearer ${SECRET}` },
      });
      expect(res.statusCode).toBe(200);
      expect(res.headers["content-type"]).toContain("application/octet-stream");
      expect(res.body).toBe(content);
    });

    it("returns 404 for missing file", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/files/nonexistent-file.ogg",
        headers: { Authorization: `Bearer ${SECRET}` },
      });
      expect(res.statusCode).toBe(404);
    });

    it("serves binary file content correctly", async () => {
      const binaryContent = Buffer.from([0x00, 0x01, 0x02, 0xff, 0xfe]);
      const fileId = "binary-file.bin";
      writeFileSync(join(filesDir, fileId), binaryContent);

      const res = await app.inject({
        method: "GET",
        url: `/files/${fileId}`,
        headers: { Authorization: `Bearer ${SECRET}` },
      });
      expect(res.statusCode).toBe(200);
      expect(res.rawPayload).toEqual(binaryContent);
    });
  });

  // ── POST /queue/inbound/:id/response ──

  describe("POST /queue/inbound/:id/response", () => {
    it("marks inbound item completed with response", async () => {
      const id = db.insertInbound({
        chat_id: 111,
        telegram_message_id: 1,
        type: "query",
        raw_text: "?what is brain",
      });

      const res = await app.inject({
        method: "POST",
        url: `/queue/inbound/${id}/response`,
        headers: {
          Authorization: `Bearer ${SECRET}`,
          "Content-Type": "application/json",
        },
        payload: { response: "Brain is a knowledge graph.", status: "completed" },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json()).toEqual({ ok: true });

      const row = db.getInbound(id);
      expect(row!.status).toBe("completed");
      expect(row!.response).toBe("Brain is a knowledge graph.");
    });

    it("marks inbound item with processing status", async () => {
      const id = db.insertInbound({
        chat_id: 111,
        telegram_message_id: 1,
        type: "ingest",
        raw_text: "Remember this",
      });

      const res = await app.inject({
        method: "POST",
        url: `/queue/inbound/${id}/response`,
        headers: {
          Authorization: `Bearer ${SECRET}`,
          "Content-Type": "application/json",
        },
        payload: { response: "Ingested", status: "processing" },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json()).toEqual({ ok: true });
    });
  });

  // ── POST /queue/inbound/:id/fail ──

  describe("POST /queue/inbound/:id/fail", () => {
    it("marks inbound item failed with error message", async () => {
      const id = db.insertInbound({
        chat_id: 111,
        telegram_message_id: 1,
        type: "ingest",
        raw_text: "failing item",
      });

      const res = await app.inject({
        method: "POST",
        url: `/queue/inbound/${id}/fail`,
        headers: {
          Authorization: `Bearer ${SECRET}`,
          "Content-Type": "application/json",
        },
        payload: { error: "LLM timeout" },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json()).toEqual({ ok: true });

      const row = db.getInbound(id);
      expect(row!.status).toBe("failed");
      expect(row!.error).toBe("LLM timeout");
      expect(row!.retry_count).toBe(1);
    });

    it("increments retry count on repeated failures", async () => {
      const id = db.insertInbound({
        chat_id: 111,
        telegram_message_id: 1,
        type: "ingest",
        raw_text: "retried item",
      });

      for (let i = 0; i < 3; i++) {
        await app.inject({
          method: "POST",
          url: `/queue/inbound/${id}/fail`,
          headers: {
            Authorization: `Bearer ${SECRET}`,
            "Content-Type": "application/json",
          },
          payload: { error: `error ${i + 1}` },
        });
      }

      const row = db.getInbound(id);
      expect(row!.retry_count).toBe(3);
    });
  });

  // ── POST /queue/outbound ──

  describe("POST /queue/outbound", () => {
    it("inserts outbound message and returns 201 with id", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/queue/outbound",
        headers: {
          Authorization: `Bearer ${SECRET}`,
          "Content-Type": "application/json",
        },
        payload: {
          chat_id: 111,
          message: "Your daily report is ready.",
          category: "daily_report",
        },
      });

      expect(res.statusCode).toBe(201);
      const body = res.json();
      expect(body.id).toBeTruthy();
      expect(typeof body.id).toBe("string");

      const row = db.getOutbound(body.id);
      expect(row).not.toBeNull();
      expect(row!.message).toBe("Your daily report is ready.");
      expect(row!.category).toBe("daily_report");
    });

    it("inserts outbound with deliver_at", async () => {
      const future = new Date(Date.now() + 3600_000).toISOString();

      const res = await app.inject({
        method: "POST",
        url: "/queue/outbound",
        headers: {
          Authorization: `Bearer ${SECRET}`,
          "Content-Type": "application/json",
        },
        payload: {
          chat_id: 111,
          message: "Scheduled alert",
          category: "cap_alert",
          deliver_at: future,
        },
      });

      expect(res.statusCode).toBe(201);
      const body = res.json();
      const row = db.getOutbound(body.id);
      expect(row!.deliver_at).toBe(future);
    });

    it("sets report_date and entry_ids when provided", async () => {
      const entryIds = ["entry-1", "entry-2"];

      const res = await app.inject({
        method: "POST",
        url: "/queue/outbound",
        headers: {
          Authorization: `Bearer ${SECRET}`,
          "Content-Type": "application/json",
        },
        payload: {
          chat_id: 111,
          message: "Report message",
          category: "daily_report",
          report_date: "2026-04-15",
          entry_ids: entryIds,
        },
      });

      expect(res.statusCode).toBe(201);
      const body = res.json();
      const row = db.getOutbound(body.id);
      expect(row!.report_date).toBe("2026-04-15");
      expect(JSON.parse(row!.entry_ids!)).toEqual(entryIds);
    });
  });

  // ── POST /queue/outbound/:id/replace ──

  describe("POST /queue/outbound/:id/replace", () => {
    it("replaces unsent outbound message", async () => {
      const id = db.insertOutbound({
        chat_id: 111,
        message: "Original message",
        category: "daily_report",
      });

      const res = await app.inject({
        method: "POST",
        url: `/queue/outbound/${id}/replace`,
        headers: {
          Authorization: `Bearer ${SECRET}`,
          "Content-Type": "application/json",
        },
        payload: { message: "Updated report" },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json()).toEqual({ ok: true });

      const row = db.getOutbound(id);
      expect(row!.message).toBe("Updated report");
    });

    it("returns ok: false when message already sent", async () => {
      const id = db.insertOutbound({
        chat_id: 111,
        message: "Already sent",
        category: "daily_report",
      });
      db.markOutboundSent(id, 9001);

      const res = await app.inject({
        method: "POST",
        url: `/queue/outbound/${id}/replace`,
        headers: {
          Authorization: `Bearer ${SECRET}`,
          "Content-Type": "application/json",
        },
        payload: { message: "Too late" },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json()).toEqual({ ok: false });
    });
  });

  // ── GET /health ──

  describe("GET /health", () => {
    it("returns status ok with zero queue depths", async () => {
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

    it("reports correct inbound_pending count", async () => {
      db.insertInbound({
        chat_id: 111,
        telegram_message_id: 1,
        type: "ingest",
        raw_text: "first",
      });
      db.insertInbound({
        chat_id: 111,
        telegram_message_id: 2,
        type: "query",
        raw_text: "second",
      });

      const res = await app.inject({
        method: "GET",
        url: "/health",
        headers: { Authorization: `Bearer ${SECRET}` },
      });
      const body = res.json();
      expect(body.inbound_pending).toBe(2);
    });

    it("reports correct outbound_due count", async () => {
      const past = new Date(Date.now() - 60_000).toISOString();
      db.insertOutbound({
        chat_id: 111,
        message: "Due message",
        category: "general",
        deliver_at: past,
      });
      db.insertOutbound({
        chat_id: 111,
        message: "Immediate message",
        category: "general",
      });

      const future = new Date(Date.now() + 3600_000).toISOString();
      db.insertOutbound({
        chat_id: 111,
        message: "Not yet due",
        category: "general",
        deliver_at: future,
      });

      const res = await app.inject({
        method: "GET",
        url: "/health",
        headers: { Authorization: `Bearer ${SECRET}` },
      });
      const body = res.json();
      expect(body.outbound_due).toBe(2);
    });
  });
});
