import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import type { Cluster } from "../types.js";

const SECTIONS = ["Personal", "Work", "Life", "Language", "System Activity"] as const;

const CLUSTER_TO_SECTION: Record<Cluster | "system", string> = {
  personal: "Personal",
  work: "Work",
  life: "Life",
  language: "Language",
  system: "System Activity",
};

function todayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function timeStamp(): string {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function buildTemplate(date: string): string {
  const sections = SECTIONS.map((s) => `## ${s}\n`).join("\n");
  return `---
title: "${date} — Daily Log"
status: current
author: ai
created_at: ${date}T00:00:00Z
updated_at: ${date}T23:59:59Z
tags: [daily-log]
category: decisions
---

# ${date}

${sections}`;
}

function insertEntryIntoContent(
  content: string,
  sectionName: string,
  timestampedEntry: string
): string {
  const sectionHeader = `## ${sectionName}`;
  const sectionIdx = content.indexOf(sectionHeader);
  if (sectionIdx === -1) {
    // Append section at end as fallback
    return content.trimEnd() + `\n\n${sectionHeader}\n${timestampedEntry}\n`;
  }

  // Find where the section ends: next ## or end of file
  const afterSectionStart = sectionIdx + sectionHeader.length;
  const nextSectionMatch = content.indexOf("\n## ", afterSectionStart);
  const insertPos =
    nextSectionMatch === -1 ? content.length : nextSectionMatch;

  // Find last non-empty character before insertPos to determine whether to add newline
  const sectionBody = content.slice(afterSectionStart, insertPos);
  const hasEntries = sectionBody.trim().length > 0;

  const entryLine = `\n${timestampedEntry}`;
  if (hasEntries) {
    return (
      content.slice(0, insertPos) + entryLine + content.slice(insertPos)
    );
  } else {
    return (
      content.slice(0, insertPos) + entryLine + content.slice(insertPos)
    );
  }
}

export function appendDailyEntry(
  vaultRoot: string,
  cluster: Cluster | "system",
  entry: string
): void {
  const date = todayDate();
  const dailyDir = join(vaultRoot, "daily");
  mkdirSync(dailyDir, { recursive: true });

  const filePath = join(dailyDir, `${date}.md`);
  const content = existsSync(filePath)
    ? readFileSync(filePath, "utf-8")
    : buildTemplate(date);

  const section = CLUSTER_TO_SECTION[cluster];
  const timestampedEntry = `- ${timeStamp()} — ${entry}`;
  const updated = insertEntryIntoContent(content, section, timestampedEntry);

  writeFileSync(filePath, updated, "utf-8");
}

export async function writeDailySummary(
  vaultRoot: string,
  date: string,
  callClaude?: (content: string) => Promise<string>
): Promise<void> {
  const filePath = join(vaultRoot, "daily", `${date}.md`);
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, "utf-8");

  const claudeFn = callClaude ?? defaultCallClaude;
  const summary = await claudeFn(content);

  const blockquote = `> ${summary}`;

  // Insert after the # heading line
  const headingMatch = content.match(/^# .+$/m);
  if (!headingMatch || headingMatch.index === undefined) {
    // No heading found — prepend blockquote at top
    writeFileSync(filePath, blockquote + "\n\n" + content, "utf-8");
    return;
  }

  const headingEnd = headingMatch.index + headingMatch[0].length;
  const updated =
    content.slice(0, headingEnd) +
    "\n\n" +
    blockquote +
    "\n" +
    content.slice(headingEnd);

  writeFileSync(filePath, updated, "utf-8");
}

async function defaultCallClaude(dailyContent: string): Promise<string> {
  const { generate } = await import("../llm/provider.js");
  const response = await generate({
    prompt: `Summarize this daily log in 2-3 sentences. Be concise and highlight key themes.\n\n${dailyContent}`,
    maxTokens: 256,
  });
  return response.text.trim();
}
