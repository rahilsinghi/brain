import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type {
  SyncSource,
  SourceSyncState,
  SyncResult,
  RawDrop,
} from "./types.js";

const execFileAsync = promisify(execFile);

export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: Record<string, unknown>;
}

export interface RepoInfo {
  stargazers_count: number;
  description: string;
  readme: string;
}

type FetchRepoInfo = (repoName: string) => Promise<RepoInfo | null>;

export interface GithubDeps {
  execGh: (args: string[]) => Promise<string>;
}

function repoSlug(repoName: string): string {
  return repoName.replace(/\//g, "-");
}

function eventTypeKey(type: string): string {
  return type.replace("Event", "").toLowerCase();
}

/**
 * Pure function that maps GitHub events to RawDrops.
 * Exported for direct testing without CLI dependency.
 */
export async function parseEvents(
  events: GitHubEvent[],
  state: SourceSyncState,
  fetchRepoInfo: FetchRepoInfo,
  minStarsForReadme: number,
): Promise<SyncResult> {
  const cursorTime = state.cursor
    ? new Date(state.cursor).getTime()
    : 0;

  const filtered = events.filter(
    (e) => new Date(e.created_at).getTime() > cursorTime,
  );

  const newItems: RawDrop[] = [];
  const processedIds: string[] = [];

  for (const event of filtered) {
    const slug = repoSlug(event.repo.name);
    const key = eventTypeKey(event.type);
    const sourceId = `${key}:${event.repo.name}:${event.id}`;

    switch (event.type) {
      case "PushEvent": {
        const payload = event.payload as {
          commits: { message: string }[];
        };
        const messages = payload.commits
          .map((c) => `- ${c.message}`)
          .join("\n");
        newItems.push({
          filename: `github/repos/${slug}.md`,
          content: `# Push to ${event.repo.name}\n\n## Commits\n\n${messages}\n`,
          sourceId,
        });
        processedIds.push(sourceId);
        break;
      }

      case "PullRequestEvent": {
        const payload = event.payload as {
          pull_request: { number: number; title: string; body: string };
        };
        const pr = payload.pull_request;
        newItems.push({
          filename: `github/conversations/${slug}-pr-${pr.number}.md`,
          content: `# PR #${pr.number}: ${pr.title}\n\n${pr.body}\n`,
          sourceId,
        });
        processedIds.push(sourceId);
        break;
      }

      case "IssuesEvent": {
        const payload = event.payload as {
          issue: { number: number; title: string; body: string };
        };
        const issue = payload.issue;
        newItems.push({
          filename: `github/conversations/${slug}-issue-${issue.number}.md`,
          content: `# Issue #${issue.number}: ${issue.title}\n\n${issue.body}\n`,
          sourceId,
        });
        processedIds.push(sourceId);
        break;
      }

      case "WatchEvent": {
        const info = await fetchRepoInfo(event.repo.name);
        if (!info || info.stargazers_count < minStarsForReadme) {
          break;
        }
        newItems.push({
          filename: `github/repos/${slug}.md`,
          content: `# ${event.repo.name}\n\n> ${info.description}\n\n${info.readme}\n`,
          sourceId,
        });
        processedIds.push(sourceId);
        break;
      }

      case "ForkEvent": {
        const info = await fetchRepoInfo(event.repo.name);
        if (!info) break;
        newItems.push({
          filename: `github/repos/${slug}.md`,
          content: `# ${event.repo.name}\n\n> ${info.description}\n\n${info.readme}\n`,
          sourceId,
        });
        processedIds.push(sourceId);
        break;
      }

      // CreateEvent, IssueCommentEvent, and others are intentionally skipped
      default:
        break;
    }
  }

  return { newItems, processedIds };
}

/**
 * Default execGh implementation using child_process.
 * gh CLI manages its own auth — no MCP DI needed here.
 * The CLI handles token refresh, SSO, and device flow natively.
 */
async function defaultExecGh(args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("gh", args);
  return stdout;
}

async function defaultFetchRepoInfo(
  execGh: (args: string[]) => Promise<string>,
  repoName: string,
): Promise<RepoInfo | null> {
  try {
    const repoJson = await execGh([
      "api",
      `/repos/${repoName}`,
      "--jq",
      "{stargazers_count, description}",
    ]);
    const repo = JSON.parse(repoJson) as {
      stargazers_count: number;
      description: string;
    };

    let readme = "";
    try {
      const readmeJson = await execGh([
        "api",
        `/repos/${repoName}/readme`,
        "--jq",
        ".content",
      ]);
      readme = Buffer.from(readmeJson.trim(), "base64").toString("utf-8");
    } catch {
      // README may not exist
    }

    return {
      stargazers_count: repo.stargazers_count,
      description: repo.description ?? "",
      readme,
    };
  } catch {
    return null;
  }
}

const DEFAULT_MIN_STARS = 50;

export function createGithubSource(
  deps?: Partial<GithubDeps>,
  minStarsForReadme: number = DEFAULT_MIN_STARS,
): SyncSource {
  const execGh = deps?.execGh ?? defaultExecGh;

  return {
    name: "github",
    async poll(state: SourceSyncState): Promise<SyncResult> {
      // Auth guard: verify gh CLI is authenticated before polling
      try {
        await execGh(["auth", "status"]);
      } catch {
        throw new Error(
          "gh CLI not authenticated — run 'gh auth login'",
        );
      }

      const raw = await execGh([
        "api",
        "/users/{owner}/received_events",
        "--paginate",
        "--jq",
        ".[].id, .[].type, .[].created_at, .[].repo.name, .[].payload",
      ]);

      // The paginated output is a JSON array of events
      let events: GitHubEvent[];
      try {
        events = JSON.parse(raw) as GitHubEvent[];
      } catch {
        // gh api with --paginate may return concatenated JSON arrays
        const cleaned = `[${raw.trim().replace(/\]\s*\[/g, ",")}]`;
        events = JSON.parse(cleaned) as GitHubEvent[];
      }

      const fetchRepo: FetchRepoInfo = (repoName) =>
        defaultFetchRepoInfo(execGh, repoName);

      return parseEvents(events, state, fetchRepo, minStarsForReadme);
    },
  };
}
