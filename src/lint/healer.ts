import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, basename } from "node:path";
import type { Author, HealAction } from "../types.js";

/**
 * 3-tier conflict resolution:
 * 1. contradiction issue → always flag_contradiction (never auto-resolve)
 * 2. human edit < cooldownHours ago → skip (hands off)
 * 3. ai-authored, no human edit → direct_edit
 * 4. any file with stale human edit (>= cooldownHours) → append_synthesis
 */
export function determineHealAction(
  author: Author,
  lastHumanEdit: string | null,
  cooldownHours: number | null,
  issueType?: string,
): HealAction {
  if (issueType === "contradiction") {
    return "flag_contradiction";
  }

  if (lastHumanEdit !== null && cooldownHours !== null) {
    const editTime = new Date(lastHumanEdit).getTime();
    const cooldownMs = cooldownHours * 60 * 60 * 1000;
    if (Date.now() - editTime < cooldownMs) {
      return "skip";
    }
    // Edit exists but is older than cooldown — append only, never overwrite
    return "append_synthesis";
  }

  if (author === "human") {
    // Human-authored file with no recorded human edit — treat conservatively
    return "append_synthesis";
  }

  // AI-authored, no human edit ever — safe to edit directly
  return "direct_edit";
}

/**
 * Appends an Obsidian-style WARNING callout to the file body.
 * Never auto-resolves: human must read and decide.
 */
export function appendContradictionWarning(
  filePath: string,
  description: string,
): void {
  const raw = readFileSync(filePath, "utf-8");
  const warning = `\n\n> [!WARNING] Contradiction Detected\n> ${description}\n`;
  writeFileSync(filePath, raw + warning, "utf-8");
}

/**
 * Writes a proposal file into proposalsDir for human review.
 * Used when the healer cannot safely modify the target file directly.
 */
export function writeProposal(
  proposalsDir: string,
  targetFile: string,
  suggestion: string,
  reasoning: string,
): string {
  mkdirSync(proposalsDir, { recursive: true });
  const slug = basename(targetFile, ".md");
  const timestamp = new Date().toISOString().split("T")[0];
  const proposalPath = join(proposalsDir, `${timestamp}-${slug}.md`);

  const content = `# Proposed Change

**Target:** ${targetFile}
**Date:** ${new Date().toISOString()}

## Suggestion

${suggestion}

## Reasoning

${reasoning}
`;

  writeFileSync(proposalPath, content, "utf-8");
  return proposalPath;
}

/**
 * Appends an AI Synthesis section to the file body without touching existing content.
 * Used for ai-authored files with stale human edits, or human-authored files past cooldown.
 */
export function appendAISynthesis(filePath: string, synthesis: string): void {
  const raw = readFileSync(filePath, "utf-8");
  const section = `\n\n## AI Synthesis\n\n${synthesis}\n`;
  writeFileSync(filePath, raw + section, "utf-8");
}
