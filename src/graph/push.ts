import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import type { GraphCache } from "../types.js";

type ExecFn = (cmd: string, cwd: string) => string;

function defaultExec(cmd: string, cwd: string): string {
  const result = Bun.spawnSync(["sh", "-c", cmd], { cwd });
  if (result.exitCode !== 0) {
    throw new Error(
      `Command failed (exit ${result.exitCode}): ${cmd}\n${result.stderr.toString()}`,
    );
  }
  return result.stdout.toString();
}

export interface PushResult {
  status: "pushed";
  commit_sha: string;
  node_count: number;
}

export async function pushGraphToRepo(
  cache: GraphCache,
  repoPath: string,
  exec: ExecFn = defaultExec,
): Promise<PushResult> {
  const jsonPath = join(repoPath, "public", "graph.json");
  mkdirSync(dirname(jsonPath), { recursive: true });
  writeFileSync(jsonPath, JSON.stringify(cache), "utf-8");

  exec("git add public/graph.json", repoPath);
  exec(
    `git commit -m "chore: update graph data (${cache.node_count} nodes)"`,
    repoPath,
  );
  exec("git push", repoPath);

  const sha = exec("git rev-parse HEAD", repoPath).trim();

  console.log(
    `[graph] Pushed to ${repoPath}: ${cache.node_count} nodes, sha=${sha}`,
  );

  return { status: "pushed", commit_sha: sha, node_count: cache.node_count };
}
