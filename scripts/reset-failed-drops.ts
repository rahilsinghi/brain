/**
 * Reset all raw drops with status: failed back to status: pending so the
 * compiler can retry them. Also resets retry_count and last_error.
 *
 * Run: bun run scripts/reset-failed-drops.ts [--dry-run] [--filter <pattern>]
 *   --dry-run          list what would be reset without changing
 *   --filter <regex>   only reset drops whose path matches the regex
 */
import { existsSync, readdirSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { readFrontmatter, updateFrontmatter } from "../src/frontmatter.js";

const vaultRoot = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const filterIdx = args.indexOf("--filter");
const filterPattern = filterIdx !== -1 ? new RegExp(args[filterIdx + 1]) : null;

function collectRaw(dir: string): string[] {
  const out: string[] = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "quarantine") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectRaw(full));
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

async function main() {
  const rawDir = join(vaultRoot, "raw");
  const all = collectRaw(rawDir);

  const failed: string[] = [];
  for (const f of all) {
    try {
      const { data } = readFrontmatter(f);
      if (data.status !== "failed") continue;
      if (filterPattern && !filterPattern.test(f)) continue;
      failed.push(f);
    } catch { /* skip */ }
  }

  console.log(`[reset-failed] scanned ${all.length} raw drops`);
  console.log(`[reset-failed] found ${failed.length} failed drops${filterPattern ? ` matching ${filterPattern}` : ""}`);

  // Group by source type
  const bySource = new Map<string, number>();
  for (const f of failed) {
    const parts = relative(vaultRoot, f).split("/");
    const source = parts.slice(1, 3).join("/");
    bySource.set(source, (bySource.get(source) ?? 0) + 1);
  }
  console.log("\nBreakdown by source:");
  for (const [src, count] of [...bySource.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${src}: ${count}`);
  }

  if (dryRun) {
    console.log("\n[reset-failed] dry run — showing first 10 paths:");
    failed.slice(0, 10).forEach((f) => console.log(`  ${relative(vaultRoot, f)}`));
    return;
  }

  if (failed.length === 0) {
    console.log("\n[reset-failed] nothing to reset.");
    return;
  }

  console.log(`\n[reset-failed] resetting ${failed.length} drops to status: pending...`);
  let ok = 0;
  let err = 0;
  for (const f of failed) {
    try {
      updateFrontmatter(f, {
        status: "pending",
        retry_count: 0,
        last_error: null,
      });
      ok++;
    } catch (e) {
      err++;
      console.error(`[reset-failed] fail ${relative(vaultRoot, f)}: ${e instanceof Error ? e.message : e}`);
    }
  }
  console.log(`[reset-failed] done: ${ok} reset, ${err} errors`);
  console.log("\n[reset-failed] start the daemon to begin compilation:");
  console.log("  launchctl load ~/Library/LaunchAgents/com.rahilsinghi.brain-daemon.plist");
}

main().catch((err) => {
  console.error("[reset-failed] fatal:", err);
  process.exit(1);
});
