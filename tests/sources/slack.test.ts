import { describe, it, expect } from "vitest";
import { createSlackSource } from "../../src/sources/slack.js";
import type { SourceSyncState } from "../../src/sources/types.js";
import type { SlackDeps, SlackMessage, SlackSourceConfig } from "../../src/sources/slack.js";

function makeMessage(overrides: Partial<SlackMessage> = {}): SlackMessage {
  return {
    ts: "1713200000.000100",
    channelId: "C12345",
    channelName: "general",
    text: "Hello from Slack!",
    userId: "U99999",
    userName: "rahil",
    permalink: "https://team.slack.com/archives/C12345/p1713200000000100",
    isoDate: "2026-04-15T20:00:00.000Z",
    ...overrides,
  };
}

const DEFAULT_CONFIG: SlackSourceConfig = {
  userId: "U99999",
  userName: "rahil",
  channelsExclude: [],
};

function emptyState(): SourceSyncState {
  return { last_poll: null, processed_ids: [] };
}

describe("createSlackSource", () => {
  it("polls messages sent by user and generates correct drops", async () => {
    const msg = makeMessage();
    const deps: SlackDeps = {
      searchMessages: async () => [msg],
    };
    const source = createSlackSource(deps, DEFAULT_CONFIG);
    const result = await source.poll(emptyState());

    expect(result.newItems.length).toBe(1);
    expect(result.processedIds).toContain("C12345-1713200000.000100");
  });

  it("polls mentions and includes them", async () => {
    const sentMsg = makeMessage({ ts: "1713200001.000100", text: "I sent this" });
    const mentionMsg = makeMessage({
      ts: "1713200002.000200",
      userId: "U_OTHER",
      userName: "alice",
      text: "<@U99999> check this out",
    });

    let callCount = 0;
    const deps: SlackDeps = {
      searchMessages: async () => {
        callCount++;
        // First call: user's own messages; second call: mentions
        if (callCount === 1) return [sentMsg];
        return [mentionMsg];
      },
    };
    const source = createSlackSource(deps, DEFAULT_CONFIG);
    const result = await source.poll(emptyState());

    expect(result.newItems.length).toBe(2);
    expect(result.processedIds).toHaveLength(2);
  });

  it("deduplicates when same message appears in both searches", async () => {
    const msg = makeMessage();
    const deps: SlackDeps = {
      searchMessages: async () => [msg],
    };
    const source = createSlackSource(deps, DEFAULT_CONFIG);
    const result = await source.poll(emptyState());

    // Same message returned by both sent + mention search, should dedup to 1
    expect(result.newItems.length).toBe(1);
  });

  it("excludes messages from channels in channelsExclude", async () => {
    const msg = makeMessage({ channelName: "random" });
    const deps: SlackDeps = {
      searchMessages: async () => [msg],
    };
    const config: SlackSourceConfig = {
      ...DEFAULT_CONFIG,
      channelsExclude: ["random"],
    };
    const source = createSlackSource(deps, config);
    const result = await source.poll(emptyState());

    expect(result.newItems.length).toBe(0);
    // Excluded messages still get their ID tracked
    expect(result.processedIds).toHaveLength(1);
  });

  it("handles empty search results", async () => {
    const deps: SlackDeps = {
      searchMessages: async () => [],
    };
    const source = createSlackSource(deps, DEFAULT_CONFIG);
    const result = await source.poll(emptyState());

    expect(result.newItems).toEqual([]);
    expect(result.processedIds).toEqual([]);
  });

  it("generates correct markdown format", async () => {
    const msg = makeMessage({
      channelName: "engineering",
      userName: "rahil",
      text: "Deployed the new feature",
      permalink: "https://team.slack.com/archives/C12345/p1713200000000100",
    });
    const deps: SlackDeps = {
      searchMessages: async () => [msg],
    };
    const source = createSlackSource(deps, DEFAULT_CONFIG);
    const result = await source.poll(emptyState());

    const content = result.newItems[0].content;
    expect(content).toContain("# Slack: #engineering");
    expect(content).toContain("rahil");
    expect(content).toContain("Deployed the new feature");
    expect(content).toContain("[View in Slack](https://team.slack.com/archives/C12345/p1713200000000100)");
  });

  it("sourceId includes channelId + ts", async () => {
    const msg = makeMessage({ channelId: "CABC123", ts: "1713200099.000300" });
    const deps: SlackDeps = {
      searchMessages: async () => [msg],
    };
    const source = createSlackSource(deps, DEFAULT_CONFIG);
    const result = await source.poll(emptyState());

    expect(result.newItems[0].sourceId).toBe("CABC123-1713200099.000300");
  });

  it("deduplicates via processed_ids", async () => {
    const msg1 = makeMessage({ ts: "1713200001.000100", channelId: "C111" });
    const msg2 = makeMessage({ ts: "1713200002.000200", channelId: "C222" });
    const deps: SlackDeps = {
      searchMessages: async () => [msg1, msg2],
    };
    const source = createSlackSource(deps, DEFAULT_CONFIG);
    const state: SourceSyncState = {
      last_poll: "2026-04-15T00:00:00Z",
      processed_ids: ["C111-1713200001.000100"],
    };
    const result = await source.poll(state);

    expect(result.newItems.length).toBe(1);
    expect(result.newItems[0].sourceId).toBe("C222-1713200002.000200");
  });

  it("generates filenames under slack/ directory with unique slug", async () => {
    const msg = makeMessage({ text: "Deploy v2.1 to production environment" });
    const deps: SlackDeps = {
      searchMessages: async () => [msg],
    };
    const source = createSlackSource(deps, DEFAULT_CONFIG);
    const result = await source.poll(emptyState());

    expect(result.newItems[0].filename).toMatch(
      /^slack\/general-[a-z0-9-]+-[a-f0-9]{6}\.md$/,
    );
  });

  it("has name 'slack'", () => {
    const deps: SlackDeps = {
      searchMessages: async () => [],
    };
    const source = createSlackSource(deps, DEFAULT_CONFIG);
    expect(source.name).toBe("slack");
  });
});
