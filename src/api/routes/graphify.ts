import { existsSync } from "node:fs";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { join, basename } from "node:path";
import type { FastifyInstance } from "fastify";
import { generateAllDrops } from "../../graph/community-drops.js";
import type { GraphifyGraphJson } from "../../graph/community-drops.js";

const schema = {
  body: {
    type: "object" as const,
    required: ["repo_path"],
    properties: {
      repo_path: { type: "string" },
      force: { type: "boolean" },
      depth: { type: "number" },
    },
  },
};

interface GraphifyBody {
  repo_path: string;
  force?: boolean;
  depth?: number;
}

async function runGraphifyBackground(
  repoPath: string,
  repoName: string,
  outputDir: string,
  force: boolean,
  vaultRoot: string,
): Promise<void> {
  const venvPython = join(vaultRoot, "scripts/graphify/.venv/bin/python");
  const cliScript = join(vaultRoot, "scripts/graphify/graphify_cli.py");

  // Python CLI creates a {repoName}/ subdirectory inside --output-dir
  // Pass parent dir so files land at outputDir/{repoName}/
  const parentDir = join(outputDir, "..");
  const args = [cliScript, "--repos", repoPath, "--output-dir", parentDir];
  if (!force) args.push("--incremental");

  const proc = Bun.spawn([venvPython, ...args], {
    stdout: "pipe",
    stderr: "pipe",
  });

  const exitCode = await proc.exited;
  if (exitCode !== 0) {
    const stderr = await new Response(proc.stderr).text();
    throw new Error(`graphify CLI exited ${exitCode}: ${stderr}`);
  }

  // CLI outputs to parentDir/{repoName}/ — which is outputDir
  const graphJsonPath = join(outputDir, `${repoName}-graph.json`);
  const archMdPath = join(outputDir, `${repoName}-architecture.md`);

  const graphJson: GraphifyGraphJson = JSON.parse(
    await readFile(graphJsonPath, "utf-8"),
  );
  const archMd = await readFile(archMdPath, "utf-8");

  const { communityDrops, architectureDrop, sentinel } = generateAllDrops(
    repoName,
    graphJson,
    archMd,
  );

  await mkdir(outputDir, { recursive: true });

  for (const drop of communityDrops) {
    await writeFile(join(outputDir, drop.filename), drop.content, "utf-8");
  }

  await writeFile(
    join(outputDir, "architecture-overview.md"),
    architectureDrop,
    "utf-8",
  );

  await writeFile(
    join(outputDir, ".sentinel"),
    JSON.stringify(sentinel, null, 2),
    "utf-8",
  );
}

export async function graphifyRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: GraphifyBody }>(
    "/graphify",
    { schema },
    async (request, reply) => {
      const { repo_path, force = false, depth = 2 } = request.body;

      if (!existsSync(repo_path)) {
        return reply.status(400).send({
          error: "invalid_repo",
          message: `Path does not exist: ${repo_path}`,
        });
      }

      if (!existsSync(join(repo_path, ".git"))) {
        return reply.status(400).send({
          error: "invalid_repo",
          message: `Not a git repository: ${repo_path}`,
        });
      }

      const repoName = basename(repo_path);
      const outputDir = join(
        app.vaultRoot,
        "raw",
        "graphify",
        repoName,
      );

      const deepLink = `https://brain.rahilsinghi.com/?focus=project:${repoName}&depth=${depth}`;

      setImmediate(() => {
        runGraphifyBackground(repo_path, repoName, outputDir, force, app.vaultRoot).catch(
          (err: unknown) => {
            const msg = err instanceof Error ? err.message : String(err);
            console.error(`[api] graphify background failed for ${repoName}: ${msg}`);
          },
        );
      });

      return reply.status(202).send({
        status: "accepted",
        repo_name: repoName,
        message: `Graphify analysis started for ${repoName}. Results will appear in raw/graphify/${repoName}/ when complete.`,
        deep_link: deepLink,
      });
    },
  );
}
