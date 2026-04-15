import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { RelayDB } from "../src/db.js";
import { flushResponses } from "../src/responder.js";
import type { ResponseSendFn } from "../src/responder.js";

function makeTmpDb(): { db: RelayDB; dir: string } {
  const dir = mkdtempSync(join(tmpdir(), "relay-responder-test-"));
  const db = new RelayDB(join(dir, "relay.db"));
  return { db, dir };
}

describe("flushResponses", () => {
  let db: RelayDB;
  let dir: string;

  beforeEach(() => {
    ({ db, dir } = makeTmpDb());
  });

  afterEach(() => {
    db.close();
    rmSync(dir, { recursive: true, force: true });
  });

  it("sends responses and marks them sent", async () => {
    const id = db.insertInbound({
      chat_id: 100,
      telegram_message_id: 1001,
      type: "query",
      raw_text: "?what is brain",
    });
    db.setInboundResponse(id, "Brain is a knowledge graph.", "completed");

    const sendFn: ResponseSendFn = vi.fn().mockResolvedValue({ message_id: 2001 });

    const count = await flushResponses(db, sendFn);

    expect(count).toBe(1);
    expect(sendFn).toHaveBeenCalledOnce();
    expect(sendFn).toHaveBeenCalledWith(100, "Brain is a knowledge graph.", 1001);

    const row = db.getInbound(id);
    expect(row!.response_sent).toBe(1);
    expect(row!.telegram_message_id).toBe(2001);
  });

  it("replies to original telegram_message_id", async () => {
    const id = db.insertInbound({
      chat_id: 200,
      telegram_message_id: 3333,
      type: "ingest",
      raw_text: "Remember this",
    });
    db.setInboundResponse(id, "Noted.", "completed");

    const sendFn: ResponseSendFn = vi.fn().mockResolvedValue({ message_id: 4444 });

    await flushResponses(db, sendFn);

    // The reply_to arg must be the original telegram_message_id
    expect(sendFn).toHaveBeenCalledWith(200, "Noted.", 3333);
  });

  it("skips if send fails (stays in unsent queue)", async () => {
    const id = db.insertInbound({
      chat_id: 300,
      telegram_message_id: 5555,
      type: "query",
      raw_text: "?query",
    });
    db.setInboundResponse(id, "An answer.", "completed");

    const sendFn: ResponseSendFn = vi.fn().mockResolvedValue(null);

    const count = await flushResponses(db, sendFn);

    expect(count).toBe(0);

    // Should remain unsent
    const row = db.getInbound(id);
    expect(row!.response_sent).toBe(0);

    // Should still appear in unsent responses
    const unsent = db.getUnsentResponses();
    expect(unsent).toHaveLength(1);
    expect(unsent[0].id).toBe(id);
  });

  it("handles multiple unsent responses in order", async () => {
    const id1 = db.insertInbound({
      chat_id: 400,
      telegram_message_id: 1,
      type: "ingest",
      raw_text: "first",
    });
    const id2 = db.insertInbound({
      chat_id: 400,
      telegram_message_id: 2,
      type: "query",
      raw_text: "second",
    });
    const id3 = db.insertInbound({
      chat_id: 400,
      telegram_message_id: 3,
      type: "ingest",
      raw_text: "third",
    });

    db.setInboundResponse(id1, "Response 1", "completed");
    db.setInboundResponse(id2, "Response 2", "completed");
    db.setInboundResponse(id3, "Response 3", "completed");

    const calls: Array<[number, string, number | null]> = [];
    const sendFn: ResponseSendFn = vi.fn().mockImplementation(
      async (chatId: number, text: string, replyTo: number | null) => {
        calls.push([chatId, text, replyTo]);
        return { message_id: 9000 + calls.length };
      },
    );

    const count = await flushResponses(db, sendFn);

    expect(count).toBe(3);
    expect(sendFn).toHaveBeenCalledTimes(3);

    // Responses delivered in FIFO order
    expect(calls[0]).toEqual([400, "Response 1", 1]);
    expect(calls[1]).toEqual([400, "Response 2", 2]);
    expect(calls[2]).toEqual([400, "Response 3", 3]);

    // All marked sent
    expect(db.getInbound(id1)!.response_sent).toBe(1);
    expect(db.getInbound(id2)!.response_sent).toBe(1);
    expect(db.getInbound(id3)!.response_sent).toBe(1);
  });

  it("returns 0 when no unsent responses exist", async () => {
    const sendFn: ResponseSendFn = vi.fn();
    const count = await flushResponses(db, sendFn);
    expect(count).toBe(0);
    expect(sendFn).not.toHaveBeenCalled();
  });

  it("skips responses with no response text (response is null)", async () => {
    // Insert a pending item that has no response yet
    db.insertInbound({
      chat_id: 500,
      telegram_message_id: 7777,
      type: "query",
      raw_text: "?pending",
    });

    const sendFn: ResponseSendFn = vi.fn();
    const count = await flushResponses(db, sendFn);

    expect(count).toBe(0);
    expect(sendFn).not.toHaveBeenCalled();
  });

  it("handles mixed success and failure in same batch", async () => {
    const id1 = db.insertInbound({
      chat_id: 600,
      telegram_message_id: 10,
      type: "query",
      raw_text: "?q1",
    });
    const id2 = db.insertInbound({
      chat_id: 600,
      telegram_message_id: 11,
      type: "query",
      raw_text: "?q2",
    });
    const id3 = db.insertInbound({
      chat_id: 600,
      telegram_message_id: 12,
      type: "query",
      raw_text: "?q3",
    });

    db.setInboundResponse(id1, "Answer 1", "completed");
    db.setInboundResponse(id2, "Answer 2", "completed");
    db.setInboundResponse(id3, "Answer 3", "completed");

    let callCount = 0;
    const sendFn: ResponseSendFn = vi.fn().mockImplementation(async () => {
      callCount++;
      if (callCount === 2) return null; // second call fails
      return { message_id: 8000 + callCount };
    });

    const count = await flushResponses(db, sendFn);

    expect(count).toBe(2);

    expect(db.getInbound(id1)!.response_sent).toBe(1);
    expect(db.getInbound(id2)!.response_sent).toBe(0); // failed, stays unsent
    expect(db.getInbound(id3)!.response_sent).toBe(1);
  });
});
