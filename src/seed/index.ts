import { resolve } from "node:path";
import { parseArgs, runSeed } from "./runner.js";
import { SeedLogger } from "./log.js";

const VAULT_ROOT = resolve(import.meta.dirname, "../..");
const SOURCE_ROOT = resolve(process.env.HOME || "~", "Desktop/career-datacenter");

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const log = new SeedLogger();

  log.step("seed", `Vault: ${VAULT_ROOT}`);
  log.step("seed", `Source: ${SOURCE_ROOT}`);
  if (opts.force) log.step("seed", "Force mode: recompiling all unstructured docs");
  if (opts.only) log.step("seed", `Running only: ${opts.only}`);

  await runSeed(VAULT_ROOT, SOURCE_ROOT, opts, log);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
