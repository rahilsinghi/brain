/**
 * Bulk re-embed all wiki articles that don't have an embedded_hash.
 * Uses the daemon's existing syncFile pipeline (chunker + fact extractor + Ollama embed).
 *
 * Run: bun run scripts/bulk-reembed.ts [--force] [--dry-run]
 *   --force    ignore embedded_hash, re-embed everything
 *   --dry-run  print what would happen without doing it
 */
import { existsSync, readdirSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { readFrontmatter } from "../src/frontmatter.js";
import { VectorStore } from "../src/embedder/vector-store.js";
import { syncFile, shouldReembed } from "../src/embedder/sync.js";

const vaultRoot = resolve(import.meta.dirname, "..");
const args = new Set(process.argv.slice(2));
const force = args.has("--force");
const dryRun = args.has("--dry-run");

function collectWikiFiles(dir: string): string[] {
  const out: string[] = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectWikiFiles(full));
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

async function main() {
  console.log(`[bulk-reembed] vault: ${vaultRoot}`);
  console.log(`[bulk-reembed] force: ${force}, dry-run: ${dryRun}\n`);

  const store = new VectorStore(join(vaultRoot, ".lancedb"));
  await store.init();

  const files = collectWikiFiles(join(vaultRoot, "wiki"));
  const needsEmbed = force
    ? files
    : files.filter((f) => {
        try {
          const { data } = readFrontmatter(f);
          return !data.last_embedded_hash || shouldReembed(f);
        } catch {
          return false;
        }
      });

  console.log(`[bulk-reembed] total wiki articles: ${files.length}`);
  console.log(`[bulk-reembed] need embedding: ${needsEmbed.length}`);
  console.log(`[bulk-reembed] already embedded: ${files.length - needsEmbed.length}\n`);

  if (dryRun) {
    console.log("[bulk-reembed] dry run — showing first 10:");
    needsEmbed.slice(0, 10).forEach((f) => console.log(`  ${relative(vaultRoot, f)}`));
    process.exit(0);
  }

  if (needsEmbed.length === 0) {
    console.log("[bulk-reembed] nothing to do. all articles embedded.");
    process.exit(0);
  }

  let synced = 0;
  let failed = 0;
  let totalChunks = 0;
  const startTime = Date.now();

  for (let i = 0; i < needsEmbed.length; i++) {
    const file = needsEmbed[i];
    const rel = relative(vaultRoot, file);
    try {
      const count = await syncFile(file, vaultRoot, store);
      synced++;
      totalChunks += count;
      const elapsed = (Date.now() - startTime) / 1000;
      const rate = synced / elapsed;
      const eta = Math.round((needsEmbed.length - i - 1) / rate);
      if (synced % 10 === 0 || i === needsEmbed.length - 1) {
        console.log(
          `[bulk-reembed] ${i + 1}/${needsEmbed.length}: ${rel.slice(0, 60)} (${count} chunks, ${rate.toFixed(1)}/s, ETA ${eta}s)`,
        );
      }
    } catch (err) {
      failed++;
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[bulk-reembed] FAIL ${rel}: ${msg.slice(0, 100)}`);
    }
  }

  const totalElapsed = Math.round((Date.now() - startTime) / 1000);
  console.log(`\n[bulk-reembed] done in ${totalElapsed}s`);
  console.log(`  synced: ${synced}`);
  console.log(`  failed: ${failed}`);
  console.log(`  total chunks embedded: ${totalChunks}`);
  console.log(`  avg chunks/article: ${(totalChunks / Math.max(synced, 1)).toFixed(1)}`);
}

main().catch((err) => {
  console.error("[bulk-reembed] fatal:", err);
  process.exit(1);
});
