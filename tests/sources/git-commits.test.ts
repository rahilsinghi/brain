import { describe, it, expect } from "vitest";
import {
  commitToRawDrop,
  parseCommits,
  type GitCommit,
  type GitCommitsDeps,
} from "../../src/sources/git-commits.js";
import type { SourceSyncState } from "../../src/sources/types.js";

const sampleCommit: GitCommit = {
  sha: "36aca24",
  message:
    "feat(telegram): add Telegram bot for knowledge ingest and queries\n\ngrammY-based bot with prefix routing.",
  date: "2026-04-08T19:40:58Z",
  author: "Rahil Singhi",
  files_changed: 5,
  additions: 320,
  deletions: 12,
};

describe("commitToRawDrop", () => {
  it("produces a RawDrop with correct filename, content, and sourceId", () => {
    const drop = commitToRawDrop("rahilsinghi/brain", sampleCommit);

    expect(drop.sourceId).toBe("git-commit:rahilsinghi/brain:36aca24");
    expect(drop.filename).toMatch(/^github\/commits\/.*\.md$/);
    expect(drop.content).toContain(
      "# feat(telegram): add Telegram bot for knowledge ingest and queries",
    );
    expect(drop.content).toContain("**Repo:** rahilsinghi/brain");
    expect(drop.content).toContain("**SHA:** 36aca24");
    expect(drop.content).toContain("**Date:** 2026-04-08T19:40:58Z");
    expect(drop.content).toContain("**Author:** Rahil Singhi");
    expect(drop.content).toContain("**Files changed:** 5");
    expect(drop.content).toContain("**Additions:** +320");
    expect(drop.content).toContain("**Deletions:** -12");
  });

  it("includes multi-line commit body", () => {
    const drop = commitToRawDrop("rahilsinghi/brain", sampleCommit);
    expect(drop.content).toContain(
      "grammY-based bot with prefix routing.",
    );
  });

  it("handles single-line commit messages without body", () => {
    const simple: GitCommit = {
      ...sampleCommit,
      message: "fix: typo in readme",
    };
    const drop = commitToRawDrop("rahilsinghi/brain", simple);
    expect(drop.content).toContain("# fix: typo in readme");
    expect(drop.content).not.toContain("\n\n\n");
  });

  it("generates unique slugs for different commits", () => {
    const commit2: GitCommit = {
      ...sampleCommit,
      sha: "abc1234",
      message: "fix: another commit",
    };
    const drop1 = commitToRawDrop("rahilsinghi/brain", sampleCommit);
    const drop2 = commitToRawDrop("rahilsinghi/brain", commit2);
    expect(drop1.filename).not.toBe(drop2.filename);
  });
});

describe("parseCommits", () => {
  const makeDeps = (
    commits: GitCommit[],
    repos: string[] = ["rahilsinghi/brain"],
  ): GitCommitsDeps => ({
    execGh: async () => "",
    getUsername: async () => "rahilsinghi",
    listRepos: async () => repos,
  });

  it("returns empty when no repos have activity", async () => {
    const deps: GitCommitsDeps = {
      execGh: async () => "",
      getUsername: async () => "rahilsinghi",
      listRepos: async () => [],
    };
    const state: SourceSyncState = {
      last_poll: null,
      processed_ids: [],
    };
    const result = await parseCommits(deps, state);
    expect(result.newItems).toEqual([]);
    expect(result.processedIds).toEqual([]);
  });

  it("skips already-processed commits", async () => {
    const commit: GitCommit = {
      sha: "abc1234",
      message: "test commit",
      date: "2026-04-08T10:00:00Z",
      author: "Rahil Singhi",
      files_changed: 1,
      additions: 5,
      deletions: 0,
    };

    const commitJson = JSON.stringify([
      {
        sha: "abc1234fullhash",
        commit: {
          message: "test commit",
          author: { date: "2026-04-08T10:00:00Z", name: "Rahil Singhi" },
        },
      },
    ]);

    const deps: GitCommitsDeps = {
      execGh: async (args: string[]) => {
        if (args[1]?.includes("/commits") && !args[1]?.includes("abc1234fullhash"))
          return commitJson;
        if (args[1]?.includes("abc1234fullhash"))
          return JSON.stringify({
            files: 1,
            additions: 5,
            deletions: 0,
          });
        return "";
      },
      getUsername: async () => "rahilsinghi",
      listRepos: async () => ["rahilsinghi/brain"],
    };

    const state: SourceSyncState = {
      last_poll: "2026-04-07T00:00:00Z",
      cursor: "2026-04-07T00:00:00Z",
      processed_ids: ["git-commit:rahilsinghi/brain:abc1234"],
    };
    // sha "abc1234fullhash" gets sliced to "abc1234" matching the processed_id

    const result = await parseCommits(deps, state);
    expect(result.newItems).toHaveLength(0);
    expect(result.processedIds).toHaveLength(0);
  });

  it("uses cursor as since date when available", async () => {
    let capturedUrl = "";
    const deps: GitCommitsDeps = {
      execGh: async (args: string[]) => {
        if (args[0] === "api" && args[1]?.includes("/commits")) {
          capturedUrl = args[1];
        }
        return "[]";
      },
      getUsername: async () => "rahilsinghi",
      listRepos: async () => ["rahilsinghi/brain"],
    };

    const state: SourceSyncState = {
      last_poll: null,
      cursor: "2026-04-01T00:00:00Z",
      processed_ids: [],
    };

    await parseCommits(deps, state);
    expect(capturedUrl).toContain("since=2026-04-01T00%3A00%3A00Z");
  });
});
