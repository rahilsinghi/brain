import { renameSync } from "node:fs";
import { join, basename } from "node:path";
import { updateFrontmatter } from "./frontmatter.js";

export function shouldQuarantine(retryCount: number, maxRetries: number): boolean {
  return retryCount >= maxRetries;
}

export function quarantineFile(filePath: string, quarantineDir: string): string {
  const fileName = basename(filePath);
  const destPath = join(quarantineDir, fileName);
  updateFrontmatter(filePath, {
    status: "quarantined",
    quarantined_at: new Date().toISOString(),
  });
  renameSync(filePath, destPath);
  return destPath;
}
