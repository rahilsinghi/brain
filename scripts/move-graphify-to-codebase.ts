/**
 * Move graphify-sourced wiki articles out of wiki/projects/ into wiki/codebase/{repo}/.
 * This prevents them from polluting default search (career/personal queries).
 *
 * Logic:
 * 1. Walk wiki/ recursively
 * 2. Find articles whose `sources` frontmatter references raw/graphify/{repo}/
 * 3. Move them to wiki/codebase/{repo}/ preserving filename
 * 4. Update LanceDB: delete old entries, re-embed at new path
 *
 * Run: bun run scripts/move-graphify-to-codebase.ts [--dry-run] [--no-embed]
 *   --dry-run   show what would move, no changes
 *   --no-embed  move files but skip re-embedding (daemon will pick them up)
 */
import { existsSync, readdirSync, mkdirSync, renameSync } from "node:fs";
import { join, resolve, relative, basename } from "node:path";
import { readFrontmatter } from "../src/frontmatter.js";
import { VectorStore } from "../src/embedder/vector-store.js";
import { syncFile } from "../src/embedder/sync.js";

const vaultRoot = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const noEmbed = args.includes("--no-embed");

function walk(dir: string): string[] {
  const out: string[] = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "codebase") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

/** Extract the repo name from sources frontmatter like "raw/graphify/maison-agent/..." */
function extractRepo(sources: unknown): string | null {
  if (!Array.isArray(sources)) return null;
  for (const src of sources) {
    if (typeof src !== "string") continue;
    const match = src.match(/raw\/graphify\/([^/]+)\//);
    if (match) return match[1];
  }
  return null;
}

async function main() {
  const wikiDir = join(vaultRoot, "wiki");
  const files = walk(wikiDir);

  const toMove: Array<{ src: string; dst: string; repo: string }> = [];

  for (const file of files) {
    try {
      const { data } = readFrontmatter(file);
      const repo = extractRepo(data.sources);
      if (!repo) continue;

      const dstDir = join(wikiDir, "codebase", repo);
      const dst = join(dstDir, basename(file));
      toMove.push({ src: file, dst, repo });
    } catch {
      // skip unreadable
    }
  }

  console.log(`[move-graphify] found ${toMove.length} graphify articles to move`);

  const byRepo = new Map<string, number>();
  for (const m of toMove) byRepo.set(m.repo, (byRepo.get(m.repo) ?? 0) + 1);
  console.log("\nBreakdown by repo:");
  for (const [r, c] of [...byRepo.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${r}: ${c}`);
  }

  if (dryRun) {
    console.log("\n[move-graphify] dry run — first 5 moves:");
    toMove.slice(0, 5).forEach((m) => {
      console.log(`  ${relative(vaultRoot, m.src)} → ${relative(vaultRoot, m.dst)}`);
    });
    return;
  }

  if (toMove.length === 0) {
    console.log("\n[move-graphify] nothing to move.");
    return;
  }

  // Ensure target dirs exist
  const dstDirs = new Set(toMove.map((m) => join(wikiDir, "codebase", m.repo)));
  for (const d of dstDirs) mkdirSync(d, { recursive: true });

  // Move files
  let moved = 0;
  let skipped = 0;
  for (const m of toMove) {
    if (existsSync(m.dst)) {
      console.warn(`[move-graphify] skip (exists): ${relative(vaultRoot, m.dst)}`);
      skipped++;
      continue;
    }
    renameSync(m.src, m.dst);
    moved++;
  }
  console.log(`\n[move-graphify] moved ${moved}, skipped ${skipped}`);

  if (noEmbed) {
    console.log("[move-graphify] --no-embed set. Daemon watcher will re-embed on next scan.");
    return;
  }

  // Re-embed all moved files at their new paths (deletes old entries, inserts new).
  console.log(`\n[move-graphify] re-embedding ${moved} files at new paths...`);
  const store = new VectorStore(join(vaultRoot, ".lancedb"));
  await store.init();

  let embedded = 0;
  let embedErr = 0;
  const start = Date.now();
  for (let i = 0; i < toMove.length; i++) {
    const m = toMove[i];
    try {
      // Delete old path first
      const oldRel = relative(vaultRoot, m.src);
      await store.deleteByFilePath(oldRel);
      // Re-sync at new path
      await syncFile(m.dst, vaultRoot, store);
      embedded++;
      if (embedded % 25 === 0) {
        const rate = embedded / ((Date.now() - start) / 1000);
        console.log(`[move-graphify] re-embed ${embedded}/${moved} (${rate.toFixed(1)}/s)`);
      }
    } catch (err) {
      embedErr++;
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[move-graphify] embed fail ${relative(vaultRoot, m.dst)}: ${msg.slice(0, 100)}`);
    }
  }
  console.log(`\n[move-graphify] done: ${embedded} re-embedded, ${embedErr} errors`);
}

main().catch((err) => {
  console.error("[move-graphify] fatal:", err);
  process.exit(1);
});
