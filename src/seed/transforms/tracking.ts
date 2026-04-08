import { stringify as yamlStringify } from "yaml";
import { makeWikiFrontmatter, type TransformResult } from "../wiki-helpers.js";
import type { OutreachRow, ApplicationRow } from "../schemas.js";

export function transformTracking(
  outreach: OutreachRow[],
  applications: ApplicationRow[],
): TransformResult[] {
  const results: TransformResult[] = [];

  {
    const fm = makeWikiFrontmatter({
      title: "Outreach Log",
      sources: ["career-datacenter/tracking/outreach_log.csv"],
      tags: ["tracking", "outreach", "career"],
    });
    const fmYaml = yamlStringify(fm as unknown as Record<string, unknown>, { lineWidth: 0 }).trim();
    const sections: string[] = [];
    sections.push(`---\n${fmYaml}\n---\n`);
    sections.push(`# Outreach Log\n`);
    sections.push(`| Contact | Company | Subject | Status | Sent |`);
    sections.push(`|---------|---------|---------|--------|------|`);
    for (const row of outreach) {
      sections.push(
        `| ${row.contact_name} | ${row.company_name} | ${row.email_subject.slice(0, 50)} | ${row.status} | ${row.date_sent || "-"} |`,
      );
    }
    sections.push("");
    results.push({
      id: "outreach_log",
      filePath: "wiki/tracking/outreach-log.md",
      content: sections.join("\n"),
    });
  }

  {
    const fm = makeWikiFrontmatter({
      title: "Applications",
      sources: ["career-datacenter/tracking/applications.csv"],
      tags: ["tracking", "applications", "career"],
    });
    const fmYaml = yamlStringify(fm as unknown as Record<string, unknown>, { lineWidth: 0 }).trim();
    const sections: string[] = [];
    sections.push(`---\n${fmYaml}\n---\n`);
    sections.push(`# Applications\n`);
    sections.push(`| Company | Role | Location | Status | Applied |`);
    sections.push(`|---------|------|----------|--------|---------|`);
    for (const row of applications) {
      sections.push(
        `| ${row.company} | ${row.role} | ${row.location || "-"} | ${row.status} | ${row.date_applied || "-"} |`,
      );
    }
    sections.push("");
    results.push({
      id: "applications",
      filePath: "wiki/tracking/applications.md",
      content: sections.join("\n"),
    });
  }

  return results;
}
