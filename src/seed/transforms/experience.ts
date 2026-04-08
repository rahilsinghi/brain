import { stringify as yamlStringify } from "yaml";
import { makeWikiFrontmatter, slugFromId, type TransformResult } from "../wiki-helpers.js";
import type { ExperienceEntry, MetricEntry } from "../schemas.js";

function metricAlreadyInText(bullet: string, metric: MetricEntry): boolean {
  const valueStr = metric.value;
  return (
    bullet.includes(valueStr) &&
    (bullet.toLowerCase().includes(metric.unit.toLowerCase()) ||
      (bullet.includes("%") && metric.unit === "percent"))
  );
}

export function transformExperience(
  entries: ExperienceEntry[],
  metrics: MetricEntry[],
): TransformResult[] {
  const metricsByContext = new Map<string, MetricEntry[]>();
  for (const m of metrics) {
    const existing = metricsByContext.get(m.context) || [];
    existing.push(m);
    metricsByContext.set(m.context, existing);
  }

  const entriesByCompany = new Map<string, ExperienceEntry[]>();
  for (const entry of entries) {
    const existing = entriesByCompany.get(entry.company) || [];
    existing.push(entry);
    entriesByCompany.set(entry.company, existing);
  }

  return entries.map((entry) => {
    const slug = slugFromId(entry.id);
    const filePath = `wiki/experience/${slug}.md`;
    const entryMetrics = metricsByContext.get(entry.id) || [];

    const tags = [
      "experience",
      entry.company.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      ...entry.tech_stack.slice(0, 5).map((t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
    ];

    const fm = makeWikiFrontmatter({
      title: `${entry.company} — ${entry.title}`,
      sources: [`career-datacenter/data/experience.yaml#${entry.id}`],
      tags,
    });

    const fmYaml = yamlStringify(fm as unknown as Record<string, unknown>, { lineWidth: 0 }).trim();
    const sections: string[] = [];

    sections.push(`---\n${fmYaml}\n---\n`);
    sections.push(`# ${entry.company} — ${entry.title}\n`);
    sections.push(
      `**${entry.start_date} – ${entry.end_date || "Present"}**${entry.location ? ` · ${entry.location}` : ""}\n`,
    );

    if (entry.scope) {
      sections.push(`## Overview\n`);
      sections.push(`${entry.scope}\n`);
    }

    if (entry.bullets.length > 0) {
      sections.push(`## Key Achievements\n`);
      for (const bullet of entry.bullets) {
        sections.push(`- ${bullet}`);
      }
      sections.push("");
    }

    const unusedMetrics = entryMetrics.filter(
      (m) => !entry.bullets.some((b) => metricAlreadyInText(b, m)),
    );
    if (unusedMetrics.length > 0) {
      sections.push(`## Metrics\n`);
      for (const m of unusedMetrics) {
        sections.push(
          `- **${m.metric_name}:** ${m.value} ${m.unit}${m.confidence ? ` (${m.confidence} confidence)` : ""}`,
        );
      }
      sections.push("");
    }

    if (entry.tech_stack.length > 0) {
      sections.push(`## Tech Stack\n`);
      sections.push(`${entry.tech_stack.join(", ")}\n`);
    }

    const related = (entriesByCompany.get(entry.company) || []).filter((e) => e.id !== entry.id);
    if (related.length > 0) {
      sections.push(`## Related\n`);
      for (const r of related) {
        sections.push(`- [[ref:${r.id}]] — ${r.title}`);
      }
      sections.push("");
    }

    return { id: entry.id, filePath, content: sections.join("\n") };
  });
}
