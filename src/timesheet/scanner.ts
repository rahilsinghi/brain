import { execSync } from "node:child_process";
import { basename } from "node:path";
import { minimatch } from "minimatch";
import type {
  GitCommitInfo,
  SessionCluster,
  ScannerConfig,
} from "./types.js";
import type { TimesheetDB } from "./db.js";

// ── Types ──

export interface NumstatEntry {
  file: string;
  additions: number;
  deletions: number;
}

export interface RepoMapping {
  pattern: string;
  employer_id: string;
  source: string;
}

export interface ScanRepoDeps {
  execGitLog: (repoPath: string, since: string, gitUser: string) => string;
  execGitRemote: (repoPath: string) => string;
}

export interface ScanRepoResult {
  sessions: SessionCluster[];
  filteredStats: { totalFiltered: number };
  unknownRepo: boolean;
}

// ── Default git exec implementations ──

function defaultExecGitLog(
  repoPath: string,
  since: string,
  gitUser: string,
): string {
  try {
    return execSync(
      `git -C "${repoPath}" log --since="${since}" --author="${gitUser}" --format="%H|%aI|%s" --numstat`,
      { encoding: "utf-8", timeout: 30_000 },
    );
  } catch {
    return "";
  }
}

function defaultExecGitRemote(repoPath: string): string {
  try {
    return execSync(`git -C "${repoPath}" remote get-url origin`, {
      encoding: "utf-8",
      timeout: 5_000,
    }).trim();
  } catch {
    return "";
  }
}

// ── parseGitNumstat ──

export function parseGitNumstat(raw: string): NumstatEntry[] {
  const entries: NumstatEntry[] = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const parts = trimmed.split("\t");
    if (parts.length < 3) continue;
    const [addStr, delStr, ...fileParts] = parts;
    const file = fileParts.join("\t"); // filenames can have tabs in rename notation
    entries.push({
      file,
      additions: addStr === "-" ? 0 : parseInt(addStr, 10),
      deletions: delStr === "-" ? 0 : parseInt(delStr, 10),
    });
  }
  return entries;
}

// ── filterExcludedPaths ──

export function filterExcludedPaths(
  files: NumstatEntry[],
  excludePatterns: string[],
): NumstatEntry[] {
  return files.filter(
    (f) =>
      !excludePatterns.some((pattern) =>
        minimatch(f.file, pattern, { matchBase: true }),
      ),
  );
}

// ── clusterCommitsIntoSessions ──

export function clusterCommitsIntoSessions(
  commits: GitCommitInfo[],
  repoPath: string,
  employerId: string,
  gapMinutes: number,
): SessionCluster[] {
  if (commits.length === 0) return [];

  const sorted = [...commits].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  const repoBase = basename(repoPath);
  const sessions: SessionCluster[] = [];
  let currentCommits: GitCommitInfo[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].timestamp).getTime();
    const curr = new Date(sorted[i].timestamp).getTime();
    const gapMs = curr - prev;

    if (gapMs > gapMinutes * 60 * 1000) {
      // Close current session
      sessions.push(buildCluster(currentCommits, repoBase, repoPath, employerId));
      currentCommits = [sorted[i]];
    } else {
      currentCommits.push(sorted[i]);
    }
  }

  // Close final session
  sessions.push(buildCluster(currentCommits, repoBase, repoPath, employerId));

  return sessions;
}

function buildCluster(
  commits: GitCommitInfo[],
  repoBase: string,
  repoPath: string,
  employerId: string,
): SessionCluster {
  return {
    session_id: `${repoBase}_${commits[0].sha.slice(0, 7)}`,
    repo_path: repoPath,
    employer_id: employerId,
    commits,
    start_time: commits[0].timestamp,
    end_time: commits[commits.length - 1].timestamp,
  };
}

// ── resolveEmployer ──

function extractRemotePath(remoteUrl: string): string | null {
  // SSH: git@github.com:org/repo.git -> org/repo
  const sshMatch = remoteUrl.match(/:([^/].+?)(?:\.git)?$/);
  if (sshMatch) return sshMatch[1];

  // HTTPS: https://github.com/org/repo.git -> org/repo
  try {
    const url = new URL(remoteUrl);
    return url.pathname.replace(/^\//, "").replace(/\.git$/, "");
  } catch {
    return null;
  }
}

export function resolveEmployer(
  repoPath: string,
  remoteUrl: string | null,
  mappings: RepoMapping[],
): string | null {
  // 1. Exact local path match
  for (const m of mappings) {
    if (m.pattern === repoPath) return m.employer_id;
  }

  // 2. Glob on remote URL path
  if (remoteUrl) {
    const remotePath = extractRemotePath(remoteUrl);
    if (remotePath) {
      for (const m of mappings) {
        if (minimatch(remotePath, m.pattern)) return m.employer_id;
      }
    }
  }

  // 3. Glob on directory basename
  const dirBase = basename(repoPath);
  for (const m of mappings) {
    if (minimatch(dirBase, m.pattern)) return m.employer_id;
  }

  return null;
}

// ── scanRepo ──

export async function scanRepo(
  repoPath: string,
  since: string,
  config: ScannerConfig,
  mappings: RepoMapping[],
  deps?: Partial<ScanRepoDeps>,
): Promise<ScanRepoResult> {
  const execGitRemote = deps?.execGitRemote ?? defaultExecGitRemote;
  const execGitLog = deps?.execGitLog ?? defaultExecGitLog;

  // 1. Get remote URL
  const remoteUrl = execGitRemote(repoPath) || null;

  // 2. Resolve employer
  const employerId = resolveEmployer(repoPath, remoteUrl, mappings);
  if (!employerId) {
    return { sessions: [], filteredStats: { totalFiltered: 0 }, unknownRepo: true };
  }

  // 3. Run git log
  const rawLog = execGitLog(repoPath, since, config.git_user);
  if (!rawLog.trim()) {
    return { sessions: [], filteredStats: { totalFiltered: 0 }, unknownRepo: false };
  }

  // 4. Parse commits with numstat
  const commits = parseGitLogOutput(rawLog, config.exclude_paths);

  // Count total filtered files across all commits
  let totalFiltered = 0;
  for (const line of rawLog.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const parts = trimmed.split("\t");
    if (parts.length >= 3 && !parts[0].includes("|")) {
      const file = parts.slice(2).join("\t");
      const excluded = config.exclude_paths.some((p) =>
        minimatch(file, p, { matchBase: true }),
      );
      if (excluded) totalFiltered++;
    }
  }

  // 5. Cluster into sessions
  const sessions = clusterCommitsIntoSessions(
    commits,
    repoPath,
    employerId,
    config.session_gap_minutes,
  );

  return { sessions, filteredStats: { totalFiltered }, unknownRepo: false };
}

// ── Parse full git log output into commits ──

function parseGitLogOutput(
  raw: string,
  excludePatterns: string[],
): GitCommitInfo[] {
  const commits: GitCommitInfo[] = [];
  const lines = raw.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    // Try to parse as commit header: SHA|ISO_DATE|MESSAGE
    const headerParts = line.split("|");
    if (headerParts.length >= 3 && headerParts[0].length >= 7) {
      const sha = headerParts[0];
      const timestamp = headerParts[1];
      const message = headerParts.slice(2).join("|"); // message might contain |

      // Collect numstat lines until next empty line or commit header
      i++;
      const numstatLines: string[] = [];
      while (i < lines.length) {
        const numLine = lines[i].trim();
        if (!numLine) {
          i++;
          break;
        }
        // Check if this is another commit header
        const parts = numLine.split("|");
        if (parts.length >= 3 && parts[0].length >= 7 && /^[a-f0-9]+$/.test(parts[0])) {
          break;
        }
        numstatLines.push(numLine);
        i++;
      }

      const allFiles = parseGitNumstat(numstatLines.join("\n"));
      const filtered = filterExcludedPaths(allFiles, excludePatterns);

      commits.push({
        sha,
        timestamp,
        message,
        files_changed: filtered.length,
        additions: filtered.reduce((sum, f) => sum + f.additions, 0),
        deletions: filtered.reduce((sum, f) => sum + f.deletions, 0),
      });
    } else {
      i++;
    }
  }

  return commits;
}

// ── upsertSession ──

function roundToQuarterHour(hours: number): number {
  return Math.round(hours * 4) / 4;
}

export function upsertSession(
  db: TimesheetDB,
  session: SessionCluster,
  bufferMinutes: number,
): void {
  const startDate = new Date(session.start_time);
  startDate.setMinutes(startDate.getMinutes() - bufferMinutes);
  const endDate = new Date(session.end_time);
  endDate.setMinutes(endDate.getMinutes() + bufferMinutes);

  const durationMs = endDate.getTime() - startDate.getTime();
  const hours = roundToQuarterHour(durationMs / 3_600_000);
  const confidence = session.commits.length >= 3 ? "medium" : "low";
  const description = session.commits.map((c) => c.message).join("; ");
  const dateStr = session.start_time.slice(0, 10); // YYYY-MM-DD

  const existing = db.findBySessionId(session.session_id);

  if (existing) {
    // UPDATE existing entry
    db.updateEntryHours(existing.id, hours, endDate.toISOString());
    db.updateEntryDescription(existing.id, description);

    // Add proof artifacts for new commits
    const existingArtifacts = db.getProofArtifacts(existing.id);
    const existingRefs = new Set(existingArtifacts.map((a) => a.reference));

    for (const commit of session.commits) {
      if (!existingRefs.has(commit.sha)) {
        db.insertProofArtifact({
          entry_id: existing.id,
          type: "commit",
          reference: commit.sha,
          timestamp: commit.timestamp,
          metadata: JSON.stringify({
            message: commit.message,
            files_changed: commit.files_changed,
            additions: commit.additions,
            deletions: commit.deletions,
          }),
        });
      }
    }
  } else {
    // INSERT new entry
    const entryId = db.insertEntry({
      date: dateStr,
      employer_id: session.employer_id,
      hours,
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      confidence,
      category: "coding",
      description,
      source: "git_session",
      session_id: session.session_id,
    });

    // Create proof artifacts for all commits
    for (const commit of session.commits) {
      db.insertProofArtifact({
        entry_id: entryId,
        type: "commit",
        reference: commit.sha,
        timestamp: commit.timestamp,
        metadata: JSON.stringify({
          message: commit.message,
          files_changed: commit.files_changed,
          additions: commit.additions,
          deletions: commit.deletions,
        }),
      });
    }
  }
}
