import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { SyncOrchestrator } from "../../src/sources/orchestrator.js";
import { JsonSyncStateStore } from "../../src/sources/state.js";
import { readFrontmatter } from "../../src/frontmatter.js";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import type { SyncSource, SourceSyncState } from "../../src/sources/types.js";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/orchestrator-test");

function mockSource(name: string, items: { filename: string; content: string; sourceId: string }[]): SyncSource {
  return {
    name: name as never,
    poll: async () => ({
      newItems: items.map((i) => ({
        filename: i.filename,
        content: i.content,
        sourceId: i.sourceId,
      })),
      processedIds: items.map((i) => i.sourceId),
    }),
  };
}

function failingSource(name: string): SyncSource {
  return {
    name: name as never,
    poll: async () => { throw new Error("Source poll failed"); },
  };
}

describe("SyncOrchestrator", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_DIR, ".brain"), { recursive: true });
    mkdirSync(join(TEST_DIR, "raw/github/repos"), { recursive: true });
    mkdirSync(join(TEST_DIR, "raw/markpush/articles"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("writes RawDrops to raw/ with correct frontmatter", async () => {
    const store = new JsonSyncStateStore(TEST_DIR);
    const orchestrator = new SyncOrchestrator(TEST_DIR, store);

    const source = mockSource("github", [{
      filename: "github/repos/test-repo.md",
      content: "# Test Repo\n\nA great repo.\n",
      sourceId: "https://github.com/user/test-repo",
    }]);

    const report = await orchestrator.run([source]);

    const filePath = join(TEST_DIR, "raw/github/repos/test-repo.md");
    expect(existsSync(filePath)).toBe(true);

    const { data } = readFrontmatter(filePath);
    expect(data.status).toBe("pending");
    expect(data.source_type).toBe("github");
    expect(data.source_id).toBe("https://github.com/user/test-repo");
    expect(data.ingested_at).toBeDefined();
    expect(report.results.github.itemsIngested).toBe(1);
  });

  it("skips items already in processed_ids (dedup)", async () => {
    const store = new JsonSyncStateStore(TEST_DIR);
    store.save("markpush", {
      last_poll: "2026-04-06T10:00:00Z",
      processed_ids: ["already-seen-url"],
    });

    const orchestrator = new SyncOrchestrator(TEST_DIR, store);
    const source = mockSource("markpush", [{
      filename: "markpush/articles/old.md",
      content: "# Old\n\nAlready processed.\n",
      sourceId: "already-seen-url",
    }]);

    const report = await orchestrator.run([source]);

    expect(existsSync(join(TEST_DIR, "raw/markpush/articles/old.md"))).toBe(false);
    expect(report.results.markpush.itemsIngested).toBe(0);
    expect(report.results.markpush.itemsSkipped).toBe(1);
  });

  it("updates sync state after each source", async () => {
    const store = new JsonSyncStateStore(TEST_DIR);
    const orchestrator = new SyncOrchestrator(TEST_DIR, store);

    const source = mockSource("github", [{
      filename: "github/repos/new.md",
      content: "# New\n\nContent.\n",
      sourceId: "new-id",
    }]);

    await orchestrator.run([source]);

    const state = store.load("github");
    expect(state.processed_ids).toContain("new-id");
    expect(state.last_poll).toBeDefined();
  });

  it("isolates errors — one source failure does not stop others", async () => {
    const store = new JsonSyncStateStore(TEST_DIR);
    const orchestrator = new SyncOrchestrator(TEST_DIR, store);

    const failing = failingSource("markpush");
    const working = mockSource("github", [{
      filename: "github/repos/works.md",
      content: "# Works\n\nStill runs.\n",
      sourceId: "works-id",
    }]);

    const report = await orchestrator.run([failing, working]);

    expect(report.results.markpush.errors.length).toBe(1);
    expect(report.results.markpush.errors[0]).toContain("Source poll failed");
    expect(report.results.github.itemsIngested).toBe(1);
    expect(existsSync(join(TEST_DIR, "raw/github/repos/works.md"))).toBe(true);
  });

  it("creates parent directories for drops if they don't exist", async () => {
    rmSync(join(TEST_DIR, "raw"), { recursive: true, force: true });
    mkdirSync(join(TEST_DIR, "raw"), { recursive: true });

    const store = new JsonSyncStateStore(TEST_DIR);
    const orchestrator = new SyncOrchestrator(TEST_DIR, store);

    const source = mockSource("github", [{
      filename: "github/repos/deep/nested.md",
      content: "# Nested\n\nContent.\n",
      sourceId: "nested-id",
    }]);

    const report = await orchestrator.run([source]);
    expect(existsSync(join(TEST_DIR, "raw/github/repos/deep/nested.md"))).toBe(true);
    expect(report.results.github.itemsIngested).toBe(1);
  });
});
