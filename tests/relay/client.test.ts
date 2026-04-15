import { describe, it, expect, vi } from "vitest";
import { RelayClient } from "../../src/relay/client.js";
import type { RelayInboundItem } from "../../src/relay/types.js";

function mockFetch(response: unknown, status = 200) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(response),
    arrayBuffer: () =>
      Promise.resolve(
        response instanceof ArrayBuffer
          ? response
          : new ArrayBuffer(0),
      ),
  });
}

describe("RelayClient", () => {
  const BASE_URL = "https://brain-relay.fly.dev";
  const SECRET = "test-secret";

  describe("fetchPending", () => {
    it("calls correct URL with auth header", async () => {
      const items: RelayInboundItem[] = [
        {
          id: "abc",
          chat_id: 123,
          telegram_message_id: null,
          type: "ingest",
          command: null,
          raw_text: "hello",
          file_path: null,
          file_status: "none",
          reply_to_queue_id: null,
          created_at: "2026-04-15T00:00:00Z",
        },
      ];
      const fetchFn = mockFetch({ items });
      const client = new RelayClient(BASE_URL, SECRET, fetchFn);

      const result = await client.fetchPending();

      expect(fetchFn).toHaveBeenCalledWith(
        `${BASE_URL}/queue/inbound?status=pending`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${SECRET}` },
        },
      );
      expect(result).toEqual(items);
    });

    it("throws on non-ok response", async () => {
      const fetchFn = mockFetch({ error: "Unauthorized" }, 401);
      const client = new RelayClient(BASE_URL, SECRET, fetchFn);

      await expect(client.fetchPending()).rejects.toThrow(
        "Relay API error: 401",
      );
    });
  });

  describe("postResponse", () => {
    it("sends correct body", async () => {
      const fetchFn = mockFetch({ ok: true });
      const client = new RelayClient(BASE_URL, SECRET, fetchFn);

      await client.postResponse("item-1", "Done!", "completed");

      expect(fetchFn).toHaveBeenCalledWith(
        `${BASE_URL}/queue/inbound/item-1/response`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${SECRET}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ response: "Done!", status: "completed" }),
        },
      );
    });

    it("throws on non-ok response", async () => {
      const fetchFn = mockFetch({ error: "Not found" }, 404);
      const client = new RelayClient(BASE_URL, SECRET, fetchFn);

      await expect(
        client.postResponse("bad-id", "resp", "completed"),
      ).rejects.toThrow("Relay API error: 404");
    });
  });

  describe("postFail", () => {
    it("sends correct body", async () => {
      const fetchFn = mockFetch({ ok: true });
      const client = new RelayClient(BASE_URL, SECRET, fetchFn);

      await client.postFail("item-2", "Processing failed");

      expect(fetchFn).toHaveBeenCalledWith(
        `${BASE_URL}/queue/inbound/item-2/fail`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${SECRET}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ error: "Processing failed" }),
        },
      );
    });

    it("throws on non-ok response", async () => {
      const fetchFn = mockFetch({ error: "Server error" }, 500);
      const client = new RelayClient(BASE_URL, SECRET, fetchFn);

      await expect(
        client.postFail("item-2", "err"),
      ).rejects.toThrow("Relay API error: 500");
    });
  });

  describe("pushOutbound", () => {
    it("returns id from response", async () => {
      const fetchFn = mockFetch({ id: "out-1" }, 201);
      const client = new RelayClient(BASE_URL, SECRET, fetchFn);

      const id = await client.pushOutbound({
        chat_id: 123,
        message: "Daily report",
        category: "daily_report",
      });

      expect(id).toBe("out-1");
      expect(fetchFn).toHaveBeenCalledWith(
        `${BASE_URL}/queue/outbound`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${SECRET}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: 123,
            message: "Daily report",
            category: "daily_report",
          }),
        },
      );
    });

    it("includes optional fields when provided", async () => {
      const fetchFn = mockFetch({ id: "out-2" }, 201);
      const client = new RelayClient(BASE_URL, SECRET, fetchFn);

      await client.pushOutbound({
        chat_id: 123,
        message: "Report",
        category: "daily_report",
        deliver_at: "2026-04-16T09:00:00Z",
        entry_ids: ["e1", "e2"],
        report_date: "2026-04-15",
      });

      const callArgs = fetchFn.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body.deliver_at).toBe("2026-04-16T09:00:00Z");
      expect(body.entry_ids).toEqual(["e1", "e2"]);
      expect(body.report_date).toBe("2026-04-15");
    });

    it("throws on non-ok response", async () => {
      const fetchFn = mockFetch({ error: "Bad request" }, 400);
      const client = new RelayClient(BASE_URL, SECRET, fetchFn);

      await expect(
        client.pushOutbound({
          chat_id: 123,
          message: "msg",
          category: "general",
        }),
      ).rejects.toThrow("Relay API error: 400");
    });
  });

  describe("downloadFile", () => {
    it("returns ArrayBuffer", async () => {
      const buf = new ArrayBuffer(16);
      const fetchFn = mockFetch(buf);
      const client = new RelayClient(BASE_URL, SECRET, fetchFn);

      const result = await client.downloadFile("voice-abc.ogg");

      expect(fetchFn).toHaveBeenCalledWith(
        `${BASE_URL}/files/voice-abc.ogg`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${SECRET}` },
        },
      );
      expect(result).toBeInstanceOf(ArrayBuffer);
    });

    it("throws on non-ok response", async () => {
      const fetchFn = mockFetch({}, 404);
      const client = new RelayClient(BASE_URL, SECRET, fetchFn);

      await expect(
        client.downloadFile("missing.ogg"),
      ).rejects.toThrow("Relay API error: 404");
    });
  });
});
