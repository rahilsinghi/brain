import { execSync } from "node:child_process";

export function takePreHealSnapshot(vaultRoot: string): boolean {
  try {
    execSync("git add -A", { cwd: vaultRoot, stdio: "pipe" });

    const status = execSync("git status --porcelain", {
      cwd: vaultRoot,
      encoding: "utf-8",
    }).trim();

    if (!status) return false;

    const timestamp = new Date().toISOString();
    execSync(
      `git commit -m "pre-heal snapshot ${timestamp}"`,
      { cwd: vaultRoot, stdio: "pipe" }
    );

    return true;
  } catch {
    return false;
  }
}
