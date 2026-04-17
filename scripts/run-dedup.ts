/**
 * Run the dedup scanner on the wiki and print findings.
 * Use --apply to actually archive duplicates (moves to .brain/dedup-archive/).
 *
 * Run: bun run scripts/run-dedup.ts [--apply]
 */
import { resolve, join, relative } from "node:path";
import { findDuplicateGroups, removeDuplicates } from "../src/lint/dedup.js";

const vaultRoot = resolve(import.meta.dirname, "..");
const apply = process.argv.includes("--apply");
const wikiDir = join(vaultRoot, "wiki");

console.log(`[dedup] scanning ${wikiDir}...`);
const groups = findDuplicateGroups(wikiDir);

console.log(`[dedup] found ${groups.length} duplicate groups\n`);

if (groups.length === 0) {
  console.log("[dedup] no duplicates found. brain is clean.");
  process.exit(0);
}

// Preview top groups
console.log("=== Top duplicate groups ===");
const sorted = [...groups].sort((a, b) => b.articles.length - a.articles.length);
for (const group of sorted.slice(0, 20)) {
  console.log(`\n"${group.normalizedTitle}" — ${group.articles.length} variants:`);
  for (const art of group.articles.sort((a, b) => b.wordCount - a.wordCount)) {
    console.log(`  ${art.wordCount.toString().padStart(5)} words  ${relative(vaultRoot, art.path)}`);
  }
}

if (groups.length > 20) {
  console.log(`\n... and ${groups.length - 20} more groups`);
}

const totalExtra = groups.reduce((sum, g) => sum + g.articles.length - 1, 0);
console.log(`\n[dedup] total redundant articles (would archive): ${totalExtra}`);

if (!apply) {
  console.log("\n[dedup] dry run — use --apply to archive duplicates to .brain/dedup-archive/");
  process.exit(0);
}

console.log("\n[dedup] archiving duplicates...");
const result = removeDuplicates(wikiDir, join(vaultRoot, ".brain/dedup-archive"), groups);
console.log(`[dedup] archived ${result.articlesRemoved} articles from ${result.groupsFound} groups`);
