import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type {
  SyncSource,
  SourceSyncState,
  SyncResult,
  RawDrop,
} from "./types.js";
import { uniqueSlug } from "./slug.js";

const execFileAsync = promisify(execFile);

export interface GitCommit {
  sha: string;
  message: string;
  date: string;
  author: string;
  files_changed: number;
  additions: number;
  deletions: number;
}

export interface GitCommitsDeps {
  execGh: (args: string[]) => Promise<string>;
  getUsername: () => Promise<string>;
  listRepos: (since: string) => Promise<string[]>;
}

async function defaultExecGh(args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("gh", args);
  return stdout;
}

async function defaultGetUsername(
  execGh: (args: string[]) => Promise<string>,
): Promise<string> {
  const raw = await execGh(["api", "/user", "--jq", ".login"]);
  return raw.trim();
}

async function defaultListRepos(
  execGh: (args: string[]) => Promise<string>,
  since: string,
): Promise<string[]> {
  const raw = await execGh([
    "repo",
    "list",
    "--limit",
    "100",
    "--json",
    "nameWithOwner,pushedAt",
    "--jq",
    `.[] | select(.pushedAt > "${since}") | .nameWithOwner`,
  ]);
  return raw
    .trim()
    .split("\n")
    .filter((r) => r.length > 0);
}

export async function fetchCommitsForRepo(
  execGh: (args: string[]) => Promise<string>,
  repo: string,
  since: string,
  author: string,
  skipStats = false,
): Promise<GitCommit[]> {
  let raw: string;
  try {
    raw = await execGh([
      "api",
      `/repos/${repo}/commits?since=${encodeURIComponent(since)}&author=${encodeURIComponent(author)}&per_page=100`,
      "--paginate",
    ]);
  } catch {
    return [];
  }

  if (!raw.trim()) return [];

  let items: Array<{
    sha: string;
    commit: { message: string; author: { date: string; name: string } };
  }>;
  try {
    items = JSON.parse(raw) as typeof items;
  } catch {
    const cleaned = `[${raw.trim().replace(/\]\s*\[/g, ",")}]`;
    items = JSON.parse(cleaned) as typeof items;
  }

  const parsed = items.map((item) => ({
    sha: item.sha.slice(0, 7),
    full_sha: item.sha,
    message: item.commit.message,
    date: item.commit.author.date,
    author: item.commit.author.name,
  }));

  const commits: GitCommit[] = [];
  for (const c of parsed) {
    let filesChanged = 0;
    let additions = 0;
    let deletions = 0;

    if (!skipStats) {
      try {
        const statsRaw = await execGh([
          "api",
          `/repos/${repo}/commits/${c.full_sha}`,
          "--jq",
          "{files: (.files | length), additions: .stats.additions, deletions: .stats.deletions}",
        ]);
        const stats = JSON.parse(statsRaw) as {
          files: number;
          additions: number;
          deletions: number;
        };
        filesChanged = stats.files;
        additions = stats.additions;
        deletions = stats.deletions;
      } catch {
        // Stats unavailable — use zeros
      }
    }

    commits.push({
      sha: c.sha,
      message: c.message,
      date: c.date,
      author: c.author,
      files_changed: filesChanged,
      additions,
      deletions,
    });
  }

  return commits;
}

export function commitToRawDrop(repo: string, commit: GitCommit): RawDrop {
  const firstLine = commit.message.split("\n")[0];
  const body =
    commit.message.split("\n").length > 1
      ? commit.message.split("\n").slice(1).join("\n").trim()
      : "";

  const rawTitle = `${repo}-${firstLine}`.slice(0, 80);
  const slug = uniqueSlug(rawTitle, `${repo}:${commit.sha}`);

  const content = [
    `# ${firstLine}`,
    "",
    `- **Repo:** ${repo}`,
    `- **SHA:** ${commit.sha}`,
    `- **Date:** ${commit.date}`,
    `- **Author:** ${commit.author}`,
    `- **Files changed:** ${commit.files_changed}`,
    `- **Additions:** +${commit.additions}`,
    `- **Deletions:** -${commit.deletions}`,
    ...(body ? ["", body] : []),
    "",
  ].join("\n");

  return {
    filename: `github/commits/${slug}.md`,
    content,
    sourceId: `git-commit:${repo}:${commit.sha}`,
  };
}

export async function parseCommits(
  deps: GitCommitsDeps,
  state: SourceSyncState,
  skipStats = false,
): Promise<SyncResult> {
  const since =
    state.cursor ?? new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const username = await deps.getUsername();
  const repos = await deps.listRepos(since);

  const allDrops: RawDrop[] = [];
  const allIds: string[] = [];
  const processedSet = new Set(state.processed_ids);

  for (const repo of repos) {
    const commits = await fetchCommitsForRepo(
      deps.execGh,
      repo,
      since,
      username,
      skipStats,
    );
    for (const commit of commits) {
      const drop = commitToRawDrop(repo, commit);
      if (!processedSet.has(drop.sourceId)) {
        allDrops.push(drop);
        allIds.push(drop.sourceId);
      }
    }
  }

  return { newItems: allDrops, processedIds: allIds };
}

export function createGitCommitsSource(
  deps?: Partial<GitCommitsDeps>,
  skipStats = false,
): SyncSource {
  const execGh = deps?.execGh ?? defaultExecGh;
  const getUsername =
    deps?.getUsername ?? (() => defaultGetUsername(execGh));
  const listRepos =
    deps?.listRepos ?? ((since: string) => defaultListRepos(execGh, since));

  return {
    name: "git-commits",
    async poll(state: SourceSyncState): Promise<SyncResult> {
      try {
        await execGh(["auth", "status"]);
      } catch {
        throw new Error("gh CLI not authenticated — run 'gh auth login'");
      }

      return parseCommits({ execGh, getUsername, listRepos }, state, skipStats);
    },
  };
}

export async function backfillCommits(
  sinceDaysAgo: number,
  deps?: Partial<GitCommitsDeps>,
): Promise<RawDrop[]> {
  const execGh = deps?.execGh ?? defaultExecGh;
  const getUsername =
    deps?.getUsername ?? (() => defaultGetUsername(execGh));
  const listRepos =
    deps?.listRepos ?? ((since: string) => defaultListRepos(execGh, since));

  const since = new Date(
    Date.now() - sinceDaysAgo * 24 * 60 * 60 * 1000,
  ).toISOString();

  const username = await getUsername();
  const repos = await listRepos(since);

  const allDrops: RawDrop[] = [];
  for (const repo of repos) {
    const commits = await fetchCommitsForRepo(execGh, repo, since, username);
    for (const commit of commits) {
      allDrops.push(commitToRawDrop(repo, commit));
    }
  }

  return allDrops;
}
