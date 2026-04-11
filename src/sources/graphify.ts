import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { homedir } from "node:os";
import type { SyncSource, SyncResult, RawDrop, SourceSyncState } from "./types.js";
import type { GraphifyConfig } from "../types.js";

export function createGraphifySource(
  vaultRoot: string,
  config: GraphifyConfig,
): SyncSource {
  return {
    name: "graphify",

    async poll(_state: SourceSyncState): Promise<SyncResult> {
      if (config.repos.length === 0) {
        return { newItems: [], processedIds: [] };
      }

      // Expand ~ and filter to repos that exist on disk
      const validRepos = config.repos
        .map((r) => r.replace(/^~/, homedir()))
        .filter((r) => existsSync(r));

      if (validRepos.length === 0) {
        return { newItems: [], processedIds: [] };
      }

      const pythonPath = join(vaultRoot, "scripts/graphify/.venv/bin/python");
      const graphifyCliPath = join(vaultRoot, "scripts/graphify/graphify_cli.py");
      const outputDir = config.output_dir;

      const args = [graphifyCliPath, "--repos", ...validRepos, "--output-dir", outputDir, "--incremental"];

      if (config.semantic) {
        args.push("--semantic");
        const apiKey = process.env["ANTHROPIC_API_KEY"];
        if (apiKey) {
          args.push("--anthropic-key", apiKey);
        }
      }

      try {
        execFileSync(pythonPath, args, { timeout: 300_000 });
      } catch (err) {
        console.error("[graphify] CLI execution failed:", err);
        return { newItems: [], processedIds: [] };
      }

      const newItems: RawDrop[] = [];
      const processedIds: string[] = [];

      for (const repoPath of validRepos) {
        try {
          const repoName = basename(repoPath);
          const repoOutputDir = join(outputDir, repoName);

          if (!existsSync(repoOutputDir)) {
            continue;
          }

          // Collect architecture report
          const archFile = join(repoOutputDir, `${repoName}-architecture.md`);
          if (existsSync(archFile)) {
            const content = readFileSync(archFile, "utf8");
            const sourceId = `graphify:${repoName}:architecture`;
            newItems.push({
              filename: `graphify/${repoName}/${repoName}-architecture.md`,
              content,
              sourceId,
            });
            processedIds.push(sourceId);
          }

          // Collect file summaries
          const summariesDir = join(repoOutputDir, "file-summaries");
          if (existsSync(summariesDir)) {
            const files = readdirSync(summariesDir);
            for (const file of files) {
              const content = readFileSync(join(summariesDir, file), "utf8");
              const slug = basename(file, ".md");
              const sourceId = `graphify:${repoName}:${slug}`;
              newItems.push({
                filename: `graphify/${repoName}/file-summaries/${file}`,
                content,
                sourceId,
              });
              processedIds.push(sourceId);
            }
          }
        } catch (err) {
          console.error(`[graphify] Failed to collect output for repo at ${repoPath}:`, err);
        }
      }

      return { newItems, processedIds };
    },
  };
}
