import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { syncRelayInbound } from "../../src/relay/sync.js";
import type { SyncDeps } from "../../src/relay/sync.js";
import type { RelayClient } from "../../src/relay/client.js";
import type { RelayInboundItem } from "../../src/relay/types.js";

const VOICE_DIR = join(import.meta.dirname, "__fixtures__/relay-voice");

function makeItem(overrides: Partial<RelayInboundItem>): RelayInboundItem {
  return {
    id: "item-1",
    chat_id: 123,
    telegram_message_id: null,
    type: "ingest",
    command: null,
    raw_text: "Hello world",
    file_path: null,
    file_status: "none",
    reply_to_queue_id: null,
    created_at: "2026-04-15T00:00:00Z",
    ...overrides,
  };
}

function makeMockClient(items: RelayInboundItem[] = []) {
  return {
    fetchPending: vi.fn().mockResolvedValue(items),
    postResponse: vi.fn().mockResolvedValue(undefined),
    postFail: vi.fn().mockResolvedValue(undefined),
    pushOutbound: vi.fn().mockResolvedValue("out-1"),
    downloadFile: vi.fn().mockResolvedValue(new ArrayBuffer(16)),
  } as unknown as RelayClient & {
    fetchPending: ReturnType<typeof vi.fn>;
    postResponse: ReturnType<typeof vi.fn>;
    postFail: ReturnType<typeof vi.fn>;
    pushOutbound: ReturnType<typeof vi.fn>;
    downloadFile: ReturnType<typeof vi.fn>;
  };
}

function makeDeps(client: ReturnType<typeof makeMockClient>): SyncDeps {
  return {
    client,
    ingestFn: vi.fn().mockReturnValue({ source_id: "api/articles/test-123.md" }),
    synthesizeFn: vi
      .fn()
      .mockResolvedValue({ answer: "The answer is 42." }),
    store: {},
    topK: 8,
    vaultRoot: "/tmp/brain-test",
    voiceDir: VOICE_DIR,
  };
}

describe("syncRelayInbound", () => {
  beforeEach(() => {
    mkdirSync(VOICE_DIR, { recursive: true });
  });

  afterEach(() => {
    rmSync(VOICE_DIR, { recursive: true, force: true });
  });

  it("handles empty pending list (no-op)", async () => {
    const client = makeMockClient([]);
    const deps = makeDeps(client);

    const result = await syncRelayInbound(deps);

    expect(result).toEqual({ processed: 0, failed: 0 });
    expect(client.postResponse).not.toHaveBeenCalled();
    expect(client.postFail).not.toHaveBeenCalled();
  });

  it("processes ingest item", async () => {
    const item = makeItem({ type: "ingest", raw_text: "Remember this fact" });
    const client = makeMockClient([item]);
    const deps = makeDeps(client);

    const result = await syncRelayInbound(deps);

    expect(deps.ingestFn).toHaveBeenCalledWith({
      content: "Remember this fact",
      source: "telegram",
      vaultRoot: "/tmp/brain-test",
    });
    expect(client.postResponse).toHaveBeenCalledWith(
      "item-1",
      expect.stringContaining("Saved"),
      "completed",
    );
    expect(result.processed).toBe(1);
    expect(result.failed).toBe(0);
  });

  it("processes query item", async () => {
    const item = makeItem({
      id: "q-1",
      type: "query",
      raw_text: "?What do I know about React",
    });
    const client = makeMockClient([item]);
    const deps = makeDeps(client);

    const result = await syncRelayInbound(deps);

    expect(deps.synthesizeFn).toHaveBeenCalledWith(
      "What do I know about React",
      deps.store,
      8,
    );
    expect(client.postResponse).toHaveBeenCalledWith(
      "q-1",
      "The answer is 42.",
      "completed",
    );
    expect(result.processed).toBe(1);
  });

  it("truncates query response to 4096 chars", async () => {
    const longAnswer = "x".repeat(5000);
    const item = makeItem({ id: "q-2", type: "query", raw_text: "?long" });
    const client = makeMockClient([item]);
    const deps = makeDeps(client);
    (deps.synthesizeFn as ReturnType<typeof vi.fn>).mockResolvedValue({
      answer: longAnswer,
    });

    await syncRelayInbound(deps);

    const responseArg = (client.postResponse as ReturnType<typeof vi.fn>).mock
      .calls[0][1] as string;
    expect(responseArg.length).toBeLessThanOrEqual(4096);
  });

  it("processes voice item with downloaded file", async () => {
    const fileData = new Uint8Array([0x01, 0x02, 0x03]);
    const item = makeItem({
      id: "v-1",
      type: "voice",
      raw_text: null,
      file_path: "voice-123.ogg",
      file_status: "downloaded",
    });
    const client = makeMockClient([item]);
    client.downloadFile = vi
      .fn()
      .mockResolvedValue(fileData.buffer) as unknown as typeof client.downloadFile;
    const deps = makeDeps(client);

    const result = await syncRelayInbound(deps);

    expect(client.downloadFile).toHaveBeenCalledWith("voice-123.ogg");
    expect(client.postResponse).toHaveBeenCalledWith(
      "v-1",
      expect.stringContaining("Transcribed"),
      "completed",
    );
    // Check file was written to voiceDir
    const files = require("node:fs").readdirSync(VOICE_DIR);
    const voiceFile = files.find((f: string) => f.endsWith(".ogg"));
    expect(voiceFile).toBeDefined();
    expect(result.processed).toBe(1);
  });

  it("processes audio item with downloaded file", async () => {
    const item = makeItem({
      id: "a-1",
      type: "audio",
      raw_text: null,
      file_path: "audio-456.m4a",
      file_status: "downloaded",
    });
    const client = makeMockClient([item]);
    const deps = makeDeps(client);

    const result = await syncRelayInbound(deps);

    expect(client.downloadFile).toHaveBeenCalledWith("audio-456.m4a");
    expect(client.postResponse).toHaveBeenCalledWith(
      "a-1",
      expect.stringContaining("Transcribed"),
      "completed",
    );
    expect(result.processed).toBe(1);
  });

  it("handles voice with download_failed status", async () => {
    const item = makeItem({
      id: "v-fail",
      type: "voice",
      raw_text: null,
      file_path: "voice-bad.ogg",
      file_status: "download_failed",
    });
    const client = makeMockClient([item]);
    const deps = makeDeps(client);

    const result = await syncRelayInbound(deps);

    expect(client.downloadFile).not.toHaveBeenCalled();
    expect(client.postFail).toHaveBeenCalledWith(
      "v-fail",
      expect.stringContaining("download"),
    );
    expect(result.failed).toBe(1);
  });

  it("handles processing error with retry then fail", async () => {
    const item = makeItem({ id: "err-1", type: "ingest", raw_text: "text" });
    const client = makeMockClient([item]);
    const deps = makeDeps(client);
    (deps.ingestFn as ReturnType<typeof vi.fn>).mockImplementation(() => {
      throw new Error("Disk full");
    });

    const result = await syncRelayInbound(deps);

    // Should have retried 3 times then called postFail
    expect(deps.ingestFn).toHaveBeenCalledTimes(3);
    expect(client.postFail).toHaveBeenCalledWith(
      "err-1",
      expect.stringContaining("Disk full"),
    );
    expect(result.failed).toBe(1);
    expect(result.processed).toBe(0);
  });

  it("returns correct processed/failed counts", async () => {
    const good = makeItem({ id: "ok-1", type: "ingest", raw_text: "good" });
    const bad = makeItem({ id: "bad-1", type: "ingest", raw_text: "bad" });
    const client = makeMockClient([good, bad]);
    const deps = makeDeps(client);

    let callCount = 0;
    (deps.ingestFn as ReturnType<typeof vi.fn>).mockImplementation(() => {
      callCount++;
      // First call succeeds (for "good"), subsequent 3 calls fail (for "bad" x3 retries)
      if (callCount === 1) return { source_id: "api/articles/ok.md" };
      throw new Error("fail");
    });

    const result = await syncRelayInbound(deps);

    expect(result.processed).toBe(1);
    expect(result.failed).toBe(1);
  });

  it("processes timesheet_entry item (returns 'not configured' when DB not provided)", async () => {
    const item = makeItem({ id: "ts-1", type: "timesheet_entry", raw_text: "2h maison" });
    const client = makeMockClient([item]);
    const deps = makeDeps(client);

    const result = await syncRelayInbound(deps);

    expect(client.postResponse).toHaveBeenCalledWith(
      "ts-1",
      expect.stringContaining("Timesheet not configured"),
      "completed",
    );
    expect(result.processed).toBe(1);
  });

  it("processes timesheet_command item (returns 'not configured' when DB not provided)", async () => {
    const item = makeItem({ id: "ts-2", type: "timesheet_command", raw_text: "/hours" });
    const client = makeMockClient([item]);
    const deps = makeDeps(client);

    const result = await syncRelayInbound(deps);

    expect(client.postResponse).toHaveBeenCalledWith(
      "ts-2",
      expect.stringContaining("Timesheet not configured"),
      "completed",
    );
    expect(result.processed).toBe(1);
  });

  it("processes timesheet_reply item (returns 'not configured' when DB not provided)", async () => {
    const item = makeItem({ id: "ts-3", type: "timesheet_reply", raw_text: "approve" });
    const client = makeMockClient([item]);
    const deps = makeDeps(client);

    const result = await syncRelayInbound(deps);

    expect(client.postResponse).toHaveBeenCalledWith(
      "ts-3",
      expect.stringContaining("Timesheet not configured"),
      "completed",
    );
    expect(result.processed).toBe(1);
  });

  it("processes timesheet_nl item when timesheetDb is provided", async () => {
    const { mkdtempSync, rmSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");
    const { TimesheetDB } = await import("../../src/timesheet/db.js");

    const dir = mkdtempSync(join(tmpdir(), "brain-relay-nl-"));
    const tdb = new TimesheetDB(join(dir, "ts.db"));
    tdb.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });

    // Mock generate() so no real LLM call fires
    vi.resetModules();
    vi.doMock("../../src/llm/provider.js", () => ({
      generate: vi.fn().mockResolvedValue({
        text: JSON.stringify({ entries: [{ hours: 1, employer: "maison", category: "coding", description: "x" }] }),
        provider: "ollama",
        model: "qwen3:32b",
        inputTokens: 10,
        outputTokens: 10,
      }),
    }));
    const { syncRelayInbound: sync } = await import("../../src/relay/sync.js");

    const item = makeItem({ id: "nl-1", type: "timesheet_nl", raw_text: "1h maison coding" });
    const client = makeMockClient([item]);
    const deps: SyncDeps = { ...makeDeps(client), timesheetDb: tdb };

    const result = await sync(deps);

    expect(client.postResponse).toHaveBeenCalledWith(
      "nl-1",
      expect.stringContaining("✓"),
      "completed",
    );
    expect(result.processed).toBe(1);

    tdb.close();
    rmSync(dir, { recursive: true, force: true });
    vi.doUnmock("../../src/llm/provider.js");
  });

  it("returns 'not configured' when timesheetDb missing for timesheet_nl", async () => {
    const item = makeItem({ id: "nl-2", type: "timesheet_nl", raw_text: "1h maison coding" });
    const client = makeMockClient([item]);
    const deps = makeDeps(client); // no timesheetDb

    const result = await syncRelayInbound(deps);

    expect(client.postResponse).toHaveBeenCalledWith(
      "nl-2",
      expect.stringContaining("Timesheet not configured"),
      "completed",
    );
    expect(result.processed).toBe(1);
  });
});
