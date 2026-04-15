import { existsSync, readFileSync, writeFileSync, appendFileSync, chmodSync } from "node:fs";
import { join, basename } from "node:path";
import { execSync } from "node:child_process";
import type { FastifyInstance } from "fastify";
import { loadTimesheetConfig } from "../../timesheet/config.js";

const schema = {
  body: {
    type: "object" as const,
    required: ["repo_path", "employer_id"],
    properties: {
      repo_path: { type: "string" },
      employer_id: { type: "string" },
    },
  },
};

interface InitBody {
  repo_path: string;
  employer_id: string;
}

const HOOK_MARKER = "# Brain auto-sync";
const HOOK_BODY = `
# Brain auto-sync: re-graphify on each commit
curl -s -X POST http://127.0.0.1:3577/graphify \\
  -H "Content-Type: application/json" \\
  -d "{\\"repo_path\\": \\"$(git rev-parse --show-toplevel)\\"}" > /dev/null 2>&1 &`;

function installPostCommitHook(repoPath: string): boolean {
  const hookFile = join(repoPath, ".git", "hooks", "post-commit");

  if (existsSync(hookFile)) {
    const content = readFileSync(hookFile, "utf-8");
    if (content.includes(HOOK_MARKER)) return false; // already installed
    appendFileSync(hookFile, HOOK_BODY);
  } else {
    writeFileSync(hookFile, `#!/bin/bash\n${HOOK_BODY}\n`);
  }
  chmodSync(hookFile, 0o755);
  return true;
}

function generateClaudeMdSection(
  repoName: string,
  employerId: string,
  rate: number,
  cap: number | null,
): string {
  const capStr = cap ? `${cap}h/week` : "no cap";
  const rateStr = rate > 0 ? `$${rate}/hr` : "equity-based";

  return `## Brain Context
This repo is connected to the brain knowledge graph.

**Employer:** ${employerId} | **Rate:** ${rateStr} | **Cap:** ${capStr}

### Commands
- \`brain_query "${repoName} architecture"\` — codebase context from knowledge graph
- \`brain_query "${employerId} workspace"\` — employer context, people, product vision
- \`brain_graphify\` — refresh code analysis after major structural changes
- \`brain_timesheet\` — check hours (auto-tracked from commits every 15min)
- Manual log: \`brain timesheet log --employer ${employerId} --hours N --desc "..."\`
`;
}

function updateClaudeMd(repoPath: string, section: string): boolean {
  const claudeMd = join(repoPath, "CLAUDE.md");
  const repoName = basename(repoPath);

  if (existsSync(claudeMd)) {
    const content = readFileSync(claudeMd, "utf-8");
    if (content.includes("## Brain Context")) return false; // already present
    appendFileSync(claudeMd, `\n\n${section}`);
  } else {
    writeFileSync(claudeMd, `# ${repoName}\n\n${section}`);
  }
  return true;
}

function updateWorkspaceHub(vaultRoot: string, employerId: string, repoName: string, repoPath: string): boolean {
  const hubPath = join(vaultRoot, "wiki", "projects", `${employerId}-workspace.md`);
  if (!existsSync(hubPath)) return false;

  const content = readFileSync(hubPath, "utf-8");
  if (content.includes(repoPath) || content.includes(repoName)) return false; // already listed

  // Find "Connected Repos" table and add a row
  const tableMarker = "| Repo | Path | Status | Graphified |";
  if (content.includes(tableMarker)) {
    const updated = content.replace(
      tableMarker + "\n|------|------|--------|------------|",
      `${tableMarker}\n|------|------|--------|-----------|\n| ${repoName} | \`${repoPath}\` | Connected | Pending |`,
    );
    writeFileSync(hubPath, updated);
    return true;
  }

  return false;
}

export async function workspaceInitRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: InitBody }>(
    "/workspace/init",
    { schema },
    async (request, reply) => {
      const { repo_path, employer_id } = request.body;

      // Validate git repo
      if (!existsSync(repo_path) || !existsSync(join(repo_path, ".git"))) {
        return reply.status(400).send({ error: `Not a git repository: ${repo_path}` });
      }

      const repoName = basename(repo_path);
      const db = app.timesheetDb;
      const vaultRoot = app.vaultRoot;

      // Validate employer exists
      if (db) {
        const employer = db.getEmployer(employer_id);
        if (!employer) {
          return reply.status(400).send({ error: `Unknown employer: ${employer_id}. Known: check .brain/timesheet-config.yaml` });
        }
      }

      // 1. Timesheet integration
      let timesheetConnected = false;
      if (db) {
        db.upsertRepoMapping(repo_path, employer_id, "workspace_init");
        timesheetConnected = true;
      }

      // 2. Post-commit hook
      const hookInstalled = installPostCommitHook(repo_path);

      // 3. CLAUDE.md
      const tsConfig = loadTimesheetConfig(vaultRoot);
      const empConfig = tsConfig.employers[employer_id];
      const rate = empConfig?.rate_hourly ?? 0;
      const cap = empConfig?.weekly_cap ?? null;
      const section = generateClaudeMdSection(repoName, employer_id, rate, cap);
      const claudeMdUpdated = updateClaudeMd(repo_path, section);

      // 4. Workspace hub update
      const hubUpdated = updateWorkspaceHub(vaultRoot, employer_id, repoName, repo_path);

      // 5. Trigger graphify (fire-and-forget)
      let graphifyStarted = false;
      try {
        const graphifyRes = await fetch(`http://127.0.0.1:${app.config.api.port}/graphify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ repo_path }),
          signal: AbortSignal.timeout(3000),
        });
        graphifyStarted = graphifyRes.ok || graphifyRes.status === 202;
      } catch {
        // Graphify is optional — don't fail the whole init
        console.error(`[workspace-init] Graphify trigger failed for ${repoName} — will retry on next commit`);
      }

      const deepLink = `https://brain.rahilsinghi.com/?focus=project:${repoName}&depth=2`;

      return reply.send({
        repo_name: repoName,
        employer_id,
        deep_link: deepLink,
        timesheet_connected: timesheetConnected,
        hook_installed: hookInstalled,
        claude_md_updated: claudeMdUpdated,
        hub_updated: hubUpdated,
        graphify_started: graphifyStarted,
      });
    },
  );
}
