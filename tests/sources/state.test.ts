import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { JsonSyncStateStore } from "../../src/sources/state.js";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/state-test");
const BRAIN_DIR = join(TEST_DIR, ".brain");

describe("JsonSyncStateStore", () => {
  let store: JsonSyncStateStore;

  beforeEach(() => {
    mkdirSync(BRAIN_DIR, { recursive: true });
    store = new JsonSyncStateStore(TEST_DIR);
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("returns empty state for unknown source", () => {
    const state = store.load("markpush");
    expect(state).toEqual({
      last_poll: null,
      processed_ids: [],
    });
  });

  it("persists state across save/load", () => {
    store.save("github", {
      last_poll: "2026-04-06T10:00:00Z",
      cursor: "2026-04-06T09:30:00Z",
      processed_ids: ["id1", "id2"],
    });

    const loaded = store.load("github");
    expect(loaded.last_poll).toBe("2026-04-06T10:00:00Z");
    expect(loaded.cursor).toBe("2026-04-06T09:30:00Z");
    expect(loaded.processed_ids).toEqual(["id1", "id2"]);
  });

  it("isolates state between sources", () => {
    store.save("github", {
      last_poll: "2026-04-06T10:00:00Z",
      processed_ids: ["gh1"],
    });
    store.save("gmail", {
      last_poll: "2026-04-06T11:00:00Z",
      processed_ids: ["gm1"],
    });

    expect(store.load("github").processed_ids).toEqual(["gh1"]);
    expect(store.load("gmail").processed_ids).toEqual(["gm1"]);
  });

  it("writes atomically via temp file", () => {
    store.save("markpush", {
      last_poll: "2026-04-06T10:00:00Z",
      processed_ids: [],
    });

    expect(existsSync(join(BRAIN_DIR, "sync-state.tmp.json"))).toBe(false);
    expect(existsSync(join(BRAIN_DIR, "sync-state.json"))).toBe(true);
  });

  it("prunes processed_ids to 500 on save", () => {
    const ids = Array.from({ length: 600 }, (_, i) => `id-${i}`);
    store.save("gmail", {
      last_poll: "2026-04-06T10:00:00Z",
      processed_ids: ids,
    });

    const loaded = store.load("gmail");
    expect(loaded.processed_ids.length).toBe(500);
    expect(loaded.processed_ids[0]).toBe("id-100");
    expect(loaded.processed_ids[499]).toBe("id-599");
  });
});
