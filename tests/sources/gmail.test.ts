import { describe, it, expect } from "vitest";
import { extractBody, createGmailSource } from "../../src/sources/gmail.js";
import type { SourceSyncState } from "../../src/sources/types.js";

// Helper: encode string as base64url (Gmail's encoding)
function b64url(text: string): string {
  return Buffer.from(text).toString("base64url");
}

const PLAIN_BODY_WITH_SIG =
  "Hey, let's meet tomorrow at 3pm.\n\n-- \nAlice\nSent from Gmail";
const PLAIN_BODY_CLEAN = "Hey, let's meet tomorrow at 3pm.";

const HTML_BODY = "<h1>Hello</h1><p>This is <b>rich</b> content.</p>";

function makePlainMessage(body: string) {
  return {
    id: "msg-1",
    threadId: "thread-1",
    payload: {
      mimeType: "text/plain",
      headers: [
        { name: "Subject", value: "Meeting Tomorrow" },
        { name: "From", value: "Alice <alice@example.com>" },
        { name: "Date", value: "Sun, 6 Apr 2026 12:00:00 +0000" },
      ],
      body: { data: b64url(body) },
      parts: [],
    },
  };
}

function makeMultipartMessage() {
  return {
    id: "msg-2",
    threadId: "thread-2",
    payload: {
      mimeType: "multipart/alternative",
      headers: [
        { name: "Subject", value: "Project Update" },
        { name: "From", value: "Bob <bob@example.com>" },
        { name: "Date", value: "Sun, 6 Apr 2026 14:00:00 +0000" },
      ],
      body: { data: "" },
      parts: [
        {
          mimeType: "text/plain",
          body: { data: b64url("Plain text version of the update.") },
          parts: [],
        },
        {
          mimeType: "text/html",
          body: { data: b64url(HTML_BODY) },
          parts: [],
        },
      ],
    },
  };
}

describe("extractBody", () => {
  it("extracts text/plain and strips signature", () => {
    const msg = makePlainMessage(PLAIN_BODY_WITH_SIG);
    const body = extractBody(msg.payload);
    expect(body).toBe(PLAIN_BODY_CLEAN);
  });

  it("prefers text/plain from multipart", () => {
    const msg = makeMultipartMessage();
    const body = extractBody(msg.payload);
    expect(body).toBe("Plain text version of the update.");
  });

  it("strips 'Sent from iPhone' footer", () => {
    const text = "Quick note about tomorrow.\n\nSent from my iPhone";
    const msg = makePlainMessage(text);
    const body = extractBody(msg.payload);
    expect(body).toBe("Quick note about tomorrow.");
  });

  it("strips 'Sent from Outlook' footer", () => {
    const text = "Meeting confirmed.\n\nSent from Outlook";
    const msg = makePlainMessage(text);
    const body = extractBody(msg.payload);
    expect(body).toBe("Meeting confirmed.");
  });

  it("falls back to text/html when no text/plain", () => {
    const msg = {
      mimeType: "text/html",
      headers: [
        { name: "Subject", value: "HTML Only" },
        { name: "From", value: "carol@example.com" },
        { name: "Date", value: "Sun, 6 Apr 2026 15:00:00 +0000" },
      ],
      body: { data: b64url(HTML_BODY) },
      parts: [],
    };
    const body = extractBody(msg);
    expect(body).toContain("Hello");
    expect(body).toContain("rich");
    // Should be markdown, not raw HTML
    expect(body).not.toContain("<h1>");
  });
});

describe("createGmailSource", () => {
  const msg1 = makePlainMessage(PLAIN_BODY_WITH_SIG);
  const msg2 = makeMultipartMessage();

  function makeDeps(messageMap: Record<string, unknown>) {
    return {
      searchMessages: async () => ({
        messages: Object.keys(messageMap).map((id) => ({
          id,
          threadId: `thread-${id}`,
          snippet: "...",
        })),
      }),
      readMessage: async (id: string) => messageMap[id],
    };
  }

  it("returns new messages not in processed_ids", async () => {
    const deps = makeDeps({ "msg-1": msg1, "msg-2": msg2 });
    const source = createGmailSource(deps);
    const state: SourceSyncState = { last_poll: null, processed_ids: [] };

    const result = await source.poll(state);
    expect(result.newItems.length).toBe(2);
    expect(result.processedIds).toContain("msg-1");
    expect(result.processedIds).toContain("msg-2");
  });

  it("skips messages already in processed_ids", async () => {
    const deps = makeDeps({ "msg-1": msg1, "msg-2": msg2 });
    const source = createGmailSource(deps);
    const state: SourceSyncState = {
      last_poll: "2026-04-06T10:00:00Z",
      processed_ids: ["msg-1"],
    };

    const result = await source.poll(state);
    expect(result.newItems.length).toBe(1);
    expect(result.newItems[0].sourceId).toBe("msg-2");
  });

  it("generates correct filenames with hash suffix", async () => {
    const deps = makeDeps({ "msg-1": msg1 });
    const source = createGmailSource(deps);
    const state: SourceSyncState = { last_poll: null, processed_ids: [] };

    const result = await source.poll(state);
    expect(result.newItems[0].filename).toMatch(
      /^gmail\/emails\/meeting-tomorrow-[a-f0-9]{6}\.md$/,
    );
  });

  it("includes subject, sender, and date in content", async () => {
    const deps = makeDeps({ "msg-1": msg1 });
    const source = createGmailSource(deps);
    const state: SourceSyncState = { last_poll: null, processed_ids: [] };

    const result = await source.poll(state);
    const content = result.newItems[0].content;
    expect(content).toContain("# Meeting Tomorrow");
    expect(content).toContain("**From:** Alice <alice@example.com>");
    expect(content).toContain("**Date:** Sun, 6 Apr 2026 12:00:00 +0000");
    expect(content).toContain(PLAIN_BODY_CLEAN);
  });

  it("returns empty result when no messages found", async () => {
    const deps = {
      searchMessages: async () => ({ messages: [] }),
      readMessage: async () => ({}),
    };
    const source = createGmailSource(deps);
    const state: SourceSyncState = { last_poll: null, processed_ids: [] };

    const result = await source.poll(state);
    expect(result.newItems).toEqual([]);
    expect(result.processedIds).toEqual([]);
  });
});
