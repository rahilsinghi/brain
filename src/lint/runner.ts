import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { scanForIssues } from "./scanner.js";
import { determineHealAction, appendContradictionWarning, writeProposal } from "./healer.js";
import { writeDailySummary, discoverConnections } from "./connector.js";
import { readFrontmatter } from "../frontmatter.js";
import type { LintHealStats, LintIssue, WikiFrontmatter } from "../types.js";

interface RunOptions {
  maxOperations: number;
  maxWebSearches: number;
  cooldownHours: number;
}

export async function runLintHeal(
  vaultRoot: string,
  options: RunOptions
): Promise<LintHealStats> {
  const stats: LintHealStats = {
    lintIssuesFound: 0,
    healOperationsRun: 0,
    webSearchesUsed: 0,
    connectionsDiscovered: 0,
    filesModified: [],
  };

  // Phase 1: Lint (read-only scan)
  const issues = scanForIssues(vaultRoot);
  stats.lintIssuesFound = issues.length;

  // Write lint report to .brain/
  const reportDir = join(vaultRoot, ".brain");
  mkdirSync(reportDir, { recursive: true });
  writeFileSync(join(reportDir, "lint-report.md"), generateLintReport(issues), "utf-8");

  // Phase 2: Heal (with cost guardrails)
  const changes: string[] = [];

  for (const issue of issues) {
    if (stats.healOperationsRun >= options.maxOperations) break;

    if (issue.type === "contradiction") {
      // Contradictions are NEVER auto-resolved — flag and propose only
      const filePath = join(vaultRoot, issue.filePath);
      appendContradictionWarning(filePath, issue.description);
      if (issue.relatedFiles) {
        for (const related of issue.relatedFiles) {
          appendContradictionWarning(join(vaultRoot, related), issue.description);
        }
      }
      writeProposal(
        join(vaultRoot, "proposals"),
        issue.filePath,
        `Resolve contradiction: ${issue.description}`,
        "Contradiction detected during lint. Requires human review."
      );
      changes.push(`Flagged contradiction in ${issue.filePath}`);
      stats.healOperationsRun++;
      stats.filesModified.push(issue.filePath);
      continue;
    }

    if (issue.type === "broken_link" || issue.type === "orphan_article") {
      // Informational — recorded in report, no auto-fix applied
      continue;
    }

    if (issue.type === "format_issue") {
      const filePath = join(vaultRoot, issue.filePath);
      try {
        const { data } = readFrontmatter<WikiFrontmatter>(filePath);
        const action = determineHealAction(
          data.author ?? "ai",
          data.last_human_edit ?? null,
          options.cooldownHours
        );

        if (action === "skip") continue;

        // Format fixes are complex — always go through proposals for human review
        writeProposal(
          join(vaultRoot, "proposals"),
          issue.filePath,
          `Fix format issue: ${issue.description}`,
          "Detected during nightly lint scan."
        );
        changes.push(`Proposed fix for format issue in ${issue.filePath}`);
        stats.healOperationsRun++;
      } catch {
        // Unreadable file — skip silently, already captured in lint report
        continue;
      }
    }
  }

  // Phase 3: Connect — discover cross-references and write daily summary
  const { existingLinks } = discoverConnections(vaultRoot);
  for (const links of existingLinks.values()) {
    stats.connectionsDiscovered += links.size;
  }

  if (changes.length > 0) {
    writeDailySummary(vaultRoot, changes);
  }

  // Persist run stats for daemon/cron inspection
  const healLog = join(vaultRoot, ".brain", "heal-log.json");
  writeFileSync(
    healLog,
    JSON.stringify({ timestamp: new Date().toISOString(), ...stats }, null, 2),
    "utf-8"
  );

  return stats;
}

function generateLintReport(issues: LintIssue[]): string {
  const lines = [
    "# Lint Report",
    "",
    `**Generated:** ${new Date().toISOString()}`,
    `**Issues found:** ${issues.length}`,
    "",
  ];

  if (issues.length === 0) {
    lines.push("No issues found.");
    return lines.join("\n");
  }

  const grouped = new Map<string, LintIssue[]>();
  for (const issue of issues) {
    const existing = grouped.get(issue.type) ?? [];
    existing.push(issue);
    grouped.set(issue.type, existing);
  }

  for (const [type, typeIssues] of grouped) {
    const heading = type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    lines.push(`## ${heading}`);
    lines.push("");
    for (const issue of typeIssues) {
      lines.push(`- **${issue.filePath}**: ${issue.description}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}
