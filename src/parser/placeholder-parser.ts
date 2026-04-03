import { updateFrontmatter } from "../frontmatter.js";

const PHASE2_FORMATS = new Set([".pdf", ".m4a", ".mp3", ".wav", ".png", ".jpg", ".jpeg", ".webp"]);

export function isPhase2Format(ext: string): boolean {
  return PHASE2_FORMATS.has(ext.toLowerCase());
}

export async function parsePlaceholder(filePath: string, ext: string): Promise<void> {
  updateFrontmatter(filePath, {
    status: "failed",
    retry_count: 1,
    last_error: `Parser for ${ext} is not yet implemented (Phase 2+)`,
  });
}
