import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { TimesheetDB } from "../../src/timesheet/db.js";
import type { GitCommitInfo, SessionCluster } from "../../src/timesheet/types.js";
import {
  parseGitNumstat,
  filterExcludedPaths,
  clusterCommitsIntoSessions,
  resolveEmployer,
  scanRepo,
  upsertSession,
} from "../../src/timesheet/scanner.js";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/scanner-test");

// ── parseGitNumstat ──

describe("parseGitNumstat", () => {
  it("parses normal numstat output", () => {
    const raw = "10\t5\tsrc/index.ts\n3\t1\tREADME.md\n";
    const result = parseGitNumstat(raw);
    expect(result).toEqual([
      { file: "src/index.ts", additions: 10, deletions: 5 },
      { file: "README.md", additions: 3, deletions: 1 },
    ]);
  });

  it("handles binary files (- - notation) as 0/0", () => {
    const raw = "-\t-\timage.png\n5\t2\tsrc/app.ts\n";
    const result = parseGitNumstat(raw);
    expect(result).toEqual([
      { file: "image.png", additions: 0, deletions: 0 },
      { file: "src/app.ts", additions: 5, deletions: 2 },
    ]);
  });

  it("handles empty input", () => {
    expect(parseGitNumstat("")).toEqual([]);
    expect(parseGitNumstat("\n")).toEqual([]);
  });
});

// ── filterExcludedPaths ──

describe("filterExcludedPaths", () => {
  it("excludes lockfiles and build dirs", () => {
    const files = [
      { file: "src/index.ts", additions: 10, deletions: 5 },
      { file: "pnpm-lock.yaml", additions: 100, deletions: 50 },
      { file: "dist/bundle.js", additions: 500, deletions: 0 },
      { file: "node_modules/foo/index.js", additions: 1, deletions: 0 },
      { file: "src/utils.ts", additions: 3, deletions: 1 },
    ];
    const patterns = [
      "pnpm-lock.yaml",
      "dist/**",
      "node_modules/**",
    ];
    const result = filterExcludedPaths(files, patterns);
    expect(result).toEqual([
      { file: "src/index.ts", additions: 10, deletions: 5 },
      { file: "src/utils.ts", additions: 3, deletions: 1 },
    ]);
  });

  it("handles glob patterns like *.min.js", () => {
    const files = [
      { file: "vendor/jquery.min.js", additions: 1, deletions: 0 },
      { file: "src/app.ts", additions: 5, deletions: 2 },
    ];
    const result = filterExcludedPaths(files, ["*.min.js"]);
    expect(result).toEqual([
      { file: "src/app.ts", additions: 5, deletions: 2 },
    ]);
  });
});

// ── clusterCommitsIntoSessions ──

describe("clusterCommitsIntoSessions", () => {
  const makeCommit = (sha: string, isoTime: string, msg: string): GitCommitInfo => ({
    sha,
    timestamp: isoTime,
    message: msg,
    files_changed: 1,
    additions: 10,
    deletions: 5,
  });

  it("groups commits within 30min gap into one session", () => {
    const commits: GitCommitInfo[] = [
      makeCommit("aaa1111", "2026-04-14T10:00:00-04:00", "feat: add login"),
      makeCommit("bbb2222", "2026-04-14T10:15:00-04:00", "fix: login bug"),
      makeCommit("ccc3333", "2026-04-14T10:25:00-04:00", "test: login tests"),
    ];
    const sessions = clusterCommitsIntoSessions(commits, "/Users/me/projects/myapp", "acme", 30);
    expect(sessions).toHaveLength(1);
    expect(sessions[0].commits).toHaveLength(3);
    expect(sessions[0].start_time).toBe("2026-04-14T10:00:00-04:00");
    expect(sessions[0].end_time).toBe("2026-04-14T10:25:00-04:00");
  });

  it("splits on >30min gap", () => {
    const commits: GitCommitInfo[] = [
      makeCommit("aaa1111", "2026-04-14T10:00:00-04:00", "feat: morning work"),
      makeCommit("bbb2222", "2026-04-14T10:20:00-04:00", "fix: morning fix"),
      makeCommit("ccc3333", "2026-04-14T14:00:00-04:00", "feat: afternoon work"),
      makeCommit("ddd4444", "2026-04-14T14:10:00-04:00", "fix: afternoon fix"),
    ];
    const sessions = clusterCommitsIntoSessions(commits, "/Users/me/projects/myapp", "acme", 30);
    expect(sessions).toHaveLength(2);
    expect(sessions[0].commits).toHaveLength(2);
    expect(sessions[1].commits).toHaveLength(2);
  });

  it("uses repo basename for session_id prefix", () => {
    const commits: GitCommitInfo[] = [
      makeCommit("abc1234def", "2026-04-14T10:00:00-04:00", "feat: something"),
    ];
    const sessions = clusterCommitsIntoSessions(commits, "/Users/me/projects/cool-app", "acme", 30);
    expect(sessions[0].session_id).toBe("cool-app_abc1234");
  });

  it("returns empty array for empty commits", () => {
    const sessions = clusterCommitsIntoSessions([], "/tmp/repo", "acme", 30);
    expect(sessions).toEqual([]);
  });

  it("sorts unsorted commits before clustering", () => {
    const commits: GitCommitInfo[] = [
      makeCommit("ccc3333", "2026-04-14T10:25:00-04:00", "third"),
      makeCommit("aaa1111", "2026-04-14T10:00:00-04:00", "first"),
      makeCommit("bbb2222", "2026-04-14T10:15:00-04:00", "second"),
    ];
    const sessions = clusterCommitsIntoSessions(commits, "/tmp/repo", "acme", 30);
    expect(sessions).toHaveLength(1);
    // session_id uses first commit sha after sorting
    expect(sessions[0].session_id).toBe("repo_aaa1111");
    expect(sessions[0].commits[0].sha).toBe("aaa1111");
  });
});

// ── resolveEmployer ──

describe("resolveEmployer", () => {
  const mappings = [
    { pattern: "/Users/me/projects/acme-app", employer_id: "acme", source: "config" },
    { pattern: "maison/*", employer_id: "maison", source: "config" },
    { pattern: "wilbo-*", employer_id: "wilbo", source: "config" },
  ];

  it("matches exact local paths", () => {
    const result = resolveEmployer("/Users/me/projects/acme-app", null, mappings);
    expect(result).toBe("acme");
  });

  it("matches glob patterns on remote URL path", () => {
    const result = resolveEmployer(
      "/some/path",
      "git@github.com:maison/backend-api.git",
      mappings,
    );
    expect(result).toBe("maison");
  });

  it("matches glob on directory basename", () => {
    const result = resolveEmployer(
      "/Users/me/projects/wilbo-frontend",
      null,
      mappings,
    );
    expect(result).toBe("wilbo");
  });

  it("returns null for unknown repos", () => {
    const result = resolveEmployer("/Users/me/projects/personal-blog", null, mappings);
    expect(result).toBeNull();
  });

  it("matches HTTPS remote URLs too", () => {
    const result = resolveEmployer(
      "/some/path",
      "https://github.com/maison/frontend.git",
      mappings,
    );
    expect(result).toBe("maison");
  });
});

// ── scanRepo ──

describe("scanRepo", () => {
  it("orchestrates scan with injected git deps", async () => {
    const gitLogOutput = [
      "abc1234|2026-04-14T10:00:00-04:00|feat: add feature",
      "10\t5\tsrc/index.ts",
      "100\t50\tpnpm-lock.yaml",
      "",
      "def5678|2026-04-14T10:15:00-04:00|fix: bug fix",
      "3\t1\tsrc/utils.ts",
      "",
    ].join("\n");

    const result = await scanRepo(
      "/Users/me/projects/myapp",
      "2026-04-13",
      {
        poll_interval_minutes: 15,
        session_gap_minutes: 30,
        buffer_minutes: 15,
        git_user: "me",
        exclude_paths: ["pnpm-lock.yaml"],
      },
      [{ pattern: "/Users/me/projects/myapp", employer_id: "acme", source: "config" }],
      {
        execGitLog: () => gitLogOutput,
        execGitRemote: () => "git@github.com:me/myapp.git",
      },
    );

    expect(result.unknownRepo).toBe(false);
    expect(result.sessions).toHaveLength(1);
    expect(result.sessions[0].employer_id).toBe("acme");
    expect(result.sessions[0].commits).toHaveLength(2);
    // lockfile should be filtered from stats
    expect(result.sessions[0].commits[0].additions).toBe(10);
    expect(result.sessions[0].commits[0].deletions).toBe(5);
    expect(result.sessions[0].commits[0].files_changed).toBe(1);
  });

  it("flags unknown repos", async () => {
    const result = await scanRepo(
      "/Users/me/projects/unknown",
      "2026-04-13",
      {
        poll_interval_minutes: 15,
        session_gap_minutes: 30,
        buffer_minutes: 15,
        git_user: "me",
        exclude_paths: [],
      },
      [],
      {
        execGitLog: () => "",
        execGitRemote: () => "",
      },
    );
    expect(result.unknownRepo).toBe(true);
    expect(result.sessions).toEqual([]);
  });
});

// ── upsertSession ──

describe("upsertSession", () => {
  let db: TimesheetDB;

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
    db = new TimesheetDB(join(TEST_DIR, "test.db"));
    db.upsertEmployer({
      id: "acme",
      rate_hourly: 50,
      weekly_cap_hours: 20,
      monthly_bonus: null,
      currency: "USD",
    });
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  const makeSession = (overrides?: Partial<SessionCluster>): SessionCluster => ({
    session_id: "myapp_abc1234",
    repo_path: "/Users/me/projects/myapp",
    employer_id: "acme",
    commits: [
      {
        sha: "abc1234",
        timestamp: "2026-04-14T10:00:00-04:00",
        message: "feat: add login",
        files_changed: 2,
        additions: 20,
        deletions: 5,
      },
      {
        sha: "def5678",
        timestamp: "2026-04-14T10:20:00-04:00",
        message: "fix: login validation",
        files_changed: 1,
        additions: 5,
        deletions: 2,
      },
    ],
    start_time: "2026-04-14T10:00:00-04:00",
    end_time: "2026-04-14T10:20:00-04:00",
    ...overrides,
  });

  it("inserts a new session with draft status and proof artifacts", () => {
    const session = makeSession();
    upsertSession(db, session, 15);

    const entry = db.findBySessionId("myapp_abc1234");
    expect(entry).not.toBeNull();
    expect(entry!.status).toBe("draft");
    expect(entry!.source).toBe("git_session");
    expect(entry!.employer_id).toBe("acme");
    expect(entry!.description).toBe("feat: add login; fix: login validation");

    const artifacts = db.getProofArtifacts(entry!.id);
    expect(artifacts).toHaveLength(2);
    expect(artifacts[0].type).toBe("commit");
    expect(artifacts[0].reference).toBe("abc1234");
    expect(artifacts[1].reference).toBe("def5678");
  });

  it("applies buffer to start/end times", () => {
    const session = makeSession();
    upsertSession(db, session, 15);

    const entry = db.findBySessionId("myapp_abc1234");
    expect(entry).not.toBeNull();
    // start should be 15 min before first commit
    const start = new Date(entry!.start_time);
    const expectedStart = new Date("2026-04-14T10:00:00-04:00");
    expectedStart.setMinutes(expectedStart.getMinutes() - 15);
    expect(start.getTime()).toBe(expectedStart.getTime());

    // end should be 15 min after last commit
    const end = new Date(entry!.end_time);
    const expectedEnd = new Date("2026-04-14T10:20:00-04:00");
    expectedEnd.setMinutes(expectedEnd.getMinutes() + 15);
    expect(end.getTime()).toBe(expectedEnd.getTime());
  });

  it("rounds hours to nearest quarter hour", () => {
    const session = makeSession();
    upsertSession(db, session, 15);

    const entry = db.findBySessionId("myapp_abc1234");
    // 20min between commits + 30min buffer = 50min total = 0.833h -> rounds to 0.75
    expect(entry!.hours).toBe(0.75);
  });

  it("sets confidence medium for 3+ commits, low otherwise", () => {
    const sessionLow = makeSession();
    upsertSession(db, sessionLow, 15);
    const entryLow = db.findBySessionId("myapp_abc1234");
    expect(entryLow!.confidence).toBe("low");

    const sessionMed = makeSession({
      session_id: "myapp_xxx9999",
      commits: [
        { sha: "a1", timestamp: "2026-04-14T10:00:00-04:00", message: "one", files_changed: 1, additions: 1, deletions: 0 },
        { sha: "b2", timestamp: "2026-04-14T10:05:00-04:00", message: "two", files_changed: 1, additions: 1, deletions: 0 },
        { sha: "c3", timestamp: "2026-04-14T10:10:00-04:00", message: "three", files_changed: 1, additions: 1, deletions: 0 },
      ],
    });
    upsertSession(db, sessionMed, 15);
    const entryMed = db.findBySessionId("myapp_xxx9999");
    expect(entryMed!.confidence).toBe("medium");
  });

  it("updates existing session on re-upsert (dedup by session_id)", () => {
    const session = makeSession();
    upsertSession(db, session, 15);
    const entry1 = db.findBySessionId("myapp_abc1234");

    // Add a new commit to the session
    const updatedSession = makeSession({
      commits: [
        ...session.commits,
        {
          sha: "ghi9012",
          timestamp: "2026-04-14T10:35:00-04:00",
          message: "chore: cleanup",
          files_changed: 1,
          additions: 2,
          deletions: 1,
        },
      ],
      end_time: "2026-04-14T10:35:00-04:00",
    });
    upsertSession(db, updatedSession, 15);

    const entry2 = db.findBySessionId("myapp_abc1234");
    expect(entry2!.id).toBe(entry1!.id); // same entry
    expect(entry2!.description).toContain("chore: cleanup");

    const artifacts = db.getProofArtifacts(entry2!.id);
    expect(artifacts).toHaveLength(3); // added the new commit
  });
});
