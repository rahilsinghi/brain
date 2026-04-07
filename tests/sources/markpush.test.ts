import { describe, it, expect } from "vitest";
import { createMarkpushSource } from "../../src/sources/markpush.js";
import type { SourceSyncState } from "../../src/sources/types.js";

const MOCK_HISTORY = [
  {
    timestamp: "2026-04-06T12:00:00Z",
    url: "https://example.com/article-1",
    title: "TypeScript 6.0 Guide",
    content: "# TypeScript 6.0\n\nNew features include...\n",
  },
  {
    timestamp: "2026-04-06T11:00:00Z",
    url: "https://example.com/article-2",
    title: "Bun Runtime Deep Dive",
    content: "# Bun Runtime\n\nFast JavaScript runtime...\n",
  },
  {
    timestamp: "2026-04-06T09:00:00Z",
    url: "https://example.com/old-article",
    title: "Old Article",
    content: "# Old\n\nThis was already processed.\n",
  },
];

describe("createMarkpushSource", () => {
  it("returns new items since cursor", async () => {
    const source = createMarkpushSource({
      pushHistory: async () => MOCK_HISTORY,
    });

    const state: SourceSyncState = {
      last_poll: "2026-04-06T10:00:00Z",
      cursor: "2026-04-06T10:00:00Z",
      processed_ids: [],
    };

    const result = await source.poll(state);
    expect(result.newItems.length).toBe(2);
    expect(result.newItems[0].sourceId).toBe("https://example.com/article-1");
    expect(result.newItems[1].sourceId).toBe("https://example.com/article-2");
  });

  it("generates unique filenames with hash suffix", async () => {
    const source = createMarkpushSource({
      pushHistory: async () => MOCK_HISTORY.slice(0, 1),
    });

    const state: SourceSyncState = { last_poll: null, processed_ids: [] };
    const result = await source.poll(state);
    expect(result.newItems[0].filename).toMatch(/^markpush\/articles\/typescript-60-guide-[a-f0-9]{6}\.md$/);
  });

  it("includes markdown content in drop", async () => {
    const source = createMarkpushSource({
      pushHistory: async () => MOCK_HISTORY.slice(0, 1),
    });

    const state: SourceSyncState = { last_poll: null, processed_ids: [] };
    const result = await source.poll(state);
    expect(result.newItems[0].content).toContain("# TypeScript 6.0");
    expect(result.newItems[0].content).toContain("New features include");
  });

  it("returns all items when no cursor (first run)", async () => {
    const source = createMarkpushSource({
      pushHistory: async () => MOCK_HISTORY,
    });

    const state: SourceSyncState = { last_poll: null, processed_ids: [] };
    const result = await source.poll(state);
    expect(result.newItems.length).toBe(3);
  });

  it("returns processedIds matching sourceIds", async () => {
    const source = createMarkpushSource({
      pushHistory: async () => MOCK_HISTORY.slice(0, 1),
    });

    const state: SourceSyncState = { last_poll: null, processed_ids: [] };
    const result = await source.poll(state);
    expect(result.processedIds).toEqual(["https://example.com/article-1"]);
  });
});
