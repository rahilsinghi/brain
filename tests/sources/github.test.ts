import { describe, it, expect, vi } from "vitest";
import { parseEvents, createGithubSource } from "../../src/sources/github.js";
import type { SourceSyncState } from "../../src/sources/types.js";

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: Record<string, unknown>;
}

const mockFetchRepoInfo = vi.fn(async (_repoName: string) => ({
  stargazers_count: 500,
  description: "A cool project",
  readme: "# Cool Project\n\nThis is the readme.",
}));

function makeEvent(
  overrides: Partial<GitHubEvent> & { type: string },
): GitHubEvent {
  return {
    id: "1",
    type: overrides.type,
    created_at: "2026-04-06T12:00:00Z",
    repo: { name: "owner/repo" },
    payload: {},
    ...overrides,
  };
}

describe("parseEvents", () => {
  it("filters events newer than cursor", async () => {
    const events: GitHubEvent[] = [
      makeEvent({
        id: "10",
        type: "PushEvent",
        created_at: "2026-04-06T14:00:00Z",
        payload: { commits: [{ message: "fix: typo" }] },
      }),
      makeEvent({
        id: "5",
        type: "PushEvent",
        created_at: "2026-04-06T10:00:00Z",
        payload: { commits: [{ message: "old commit" }] },
      }),
    ];

    const state: SourceSyncState = {
      last_poll: "2026-04-06T12:00:00Z",
      cursor: "2026-04-06T12:00:00Z",
      processed_ids: [],
    };

    const result = await parseEvents(events, state, mockFetchRepoInfo, 100);
    expect(result.newItems.length).toBe(1);
    expect(result.newItems[0].sourceId).toContain("10");
  });

  it("PushEvent produces drop with commit summary", async () => {
    const events: GitHubEvent[] = [
      makeEvent({
        id: "20",
        type: "PushEvent",
        repo: { name: "rahilsinghi/brain" },
        payload: {
          commits: [
            { message: "feat: add parser" },
            { message: "fix: handle null" },
          ],
        },
      }),
    ];

    const state: SourceSyncState = { last_poll: null, processed_ids: [] };
    const result = await parseEvents(events, state, mockFetchRepoInfo, 100);

    expect(result.newItems.length).toBe(1);
    const drop = result.newItems[0];
    expect(drop.filename).toBe("github/repos/rahilsinghi-brain.md");
    expect(drop.content).toContain("feat: add parser");
    expect(drop.content).toContain("fix: handle null");
    expect(drop.sourceId).toBe("push:rahilsinghi/brain:20");
  });

  it("PullRequestEvent produces drop", async () => {
    const events: GitHubEvent[] = [
      makeEvent({
        id: "30",
        type: "PullRequestEvent",
        repo: { name: "owner/repo" },
        payload: {
          pull_request: {
            number: 42,
            title: "Add feature X",
            body: "This PR adds feature X with tests.",
          },
        },
      }),
    ];

    const state: SourceSyncState = { last_poll: null, processed_ids: [] };
    const result = await parseEvents(events, state, mockFetchRepoInfo, 100);

    expect(result.newItems.length).toBe(1);
    const drop = result.newItems[0];
    expect(drop.filename).toBe("github/conversations/owner-repo-pr-42.md");
    expect(drop.content).toContain("Add feature X");
    expect(drop.content).toContain("This PR adds feature X with tests.");
    expect(drop.sourceId).toBe("pullrequest:owner/repo:30");
  });

  it("IssuesEvent produces drop", async () => {
    const events: GitHubEvent[] = [
      makeEvent({
        id: "40",
        type: "IssuesEvent",
        repo: { name: "owner/repo" },
        payload: {
          issue: {
            number: 7,
            title: "Bug report",
            body: "Something is broken.",
          },
        },
      }),
    ];

    const state: SourceSyncState = { last_poll: null, processed_ids: [] };
    const result = await parseEvents(events, state, mockFetchRepoInfo, 100);

    expect(result.newItems.length).toBe(1);
    const drop = result.newItems[0];
    expect(drop.filename).toBe("github/conversations/owner-repo-issue-7.md");
    expect(drop.content).toContain("Bug report");
    expect(drop.content).toContain("Something is broken.");
    expect(drop.sourceId).toBe("issues:owner/repo:40");
  });

  it("WatchEvent skips repos below star threshold", async () => {
    const lowStarFetch = vi.fn(async () => ({
      stargazers_count: 5,
      description: "Tiny project",
      readme: "# Tiny",
    }));

    const events: GitHubEvent[] = [
      makeEvent({
        id: "50",
        type: "WatchEvent",
        repo: { name: "someone/tiny-lib" },
      }),
    ];

    const state: SourceSyncState = { last_poll: null, processed_ids: [] };
    const result = await parseEvents(events, state, lowStarFetch, 100);

    expect(result.newItems.length).toBe(0);
    expect(lowStarFetch).toHaveBeenCalledWith("someone/tiny-lib");
  });

  it("WatchEvent includes repos above star threshold", async () => {
    const events: GitHubEvent[] = [
      makeEvent({
        id: "60",
        type: "WatchEvent",
        repo: { name: "big/popular-lib" },
      }),
    ];

    const state: SourceSyncState = { last_poll: null, processed_ids: [] };
    const result = await parseEvents(events, state, mockFetchRepoInfo, 100);

    expect(result.newItems.length).toBe(1);
    const drop = result.newItems[0];
    expect(drop.filename).toBe("github/repos/big-popular-lib.md");
    expect(drop.content).toContain("# Cool Project");
    expect(drop.content).toContain("A cool project");
    expect(drop.sourceId).toBe("watch:big/popular-lib:60");
  });

  it("ForkEvent always fetches README regardless of star count", async () => {
    const lowStarFetch = vi.fn(async () => ({
      stargazers_count: 2,
      description: "Forked repo",
      readme: "# Forked",
    }));

    const events: GitHubEvent[] = [
      makeEvent({
        id: "70",
        type: "ForkEvent",
        repo: { name: "someone/fork-target" },
      }),
    ];

    const state: SourceSyncState = { last_poll: null, processed_ids: [] };
    const result = await parseEvents(events, state, lowStarFetch, 100);

    expect(result.newItems.length).toBe(1);
    const drop = result.newItems[0];
    expect(drop.filename).toBe("github/repos/someone-fork-target.md");
    expect(drop.content).toContain("# Forked");
    expect(drop.sourceId).toBe("fork:someone/fork-target:70");
  });

  it("CreateEvent is skipped", async () => {
    const events: GitHubEvent[] = [
      makeEvent({
        id: "80",
        type: "CreateEvent",
        payload: { ref_type: "branch", ref: "feat/new" },
      }),
    ];

    const state: SourceSyncState = { last_poll: null, processed_ids: [] };
    const result = await parseEvents(events, state, mockFetchRepoInfo, 100);

    expect(result.newItems.length).toBe(0);
  });

  it("IssueCommentEvent is skipped", async () => {
    const events: GitHubEvent[] = [
      makeEvent({
        id: "85",
        type: "IssueCommentEvent",
        payload: { comment: { body: "looks good" } },
      }),
    ];

    const state: SourceSyncState = { last_poll: null, processed_ids: [] };
    const result = await parseEvents(events, state, mockFetchRepoInfo, 100);

    expect(result.newItems.length).toBe(0);
  });
});

describe("createGithubSource", () => {
  it("auth guard throws when gh not authenticated", async () => {
    const source = createGithubSource({
      execGh: async () => {
        throw new Error("not logged in");
      },
    });

    const state: SourceSyncState = { last_poll: null, processed_ids: [] };
    await expect(source.poll(state)).rejects.toThrow(
      "gh CLI not authenticated",
    );
  });
});
