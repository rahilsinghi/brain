import { stringify as yamlStringify } from "yaml";
import { makeWikiFrontmatter, slugFromId, type TransformResult } from "../wiki-helpers.js";
import type { ProjectEntry, MetricEntry } from "../schemas.js";

function metricAlreadyInText(text: string, metric: MetricEntry): boolean {
  const valueStr = metric.value;
  return text.includes(valueStr) && (
    text.toLowerCase().includes(metric.unit.toLowerCase()) ||
    (text.includes("%") && metric.unit === "percent")
  );
}

export function transformProjects(
  projects: ProjectEntry[],
  metrics: MetricEntry[],
): TransformResult[] {
  const metricsByContext = new Map<string, MetricEntry[]>();
  for (const m of metrics) {
    const existing = metricsByContext.get(m.context) || [];
    existing.push(m);
    metricsByContext.set(m.context, existing);
  }

  return projects.map((proj) => {
    const slug = slugFromId(proj.id);
    const filePath = `wiki/projects/${slug}.md`;
    const projMetrics = metricsByContext.get(proj.id) || [];

    const tags = [
      "project",
      proj.type,
      ...proj.stack.slice(0, 5).map((t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
    ];

    const fm = makeWikiFrontmatter({
      title: proj.name,
      sources: [`career-datacenter/data/projects.yaml#${proj.id}`],
      tags,
    });

    const fmYaml = yamlStringify(fm as unknown as Record<string, unknown>, { lineWidth: 0 }).trim();
    const sections: string[] = [];

    sections.push(`---\n${fmYaml}\n---\n`);
    sections.push(`# ${proj.name}\n`);
    if (proj.dates) sections.push(`**${proj.type}** · ${proj.dates}\n`);

    if (proj.problem) {
      sections.push(`## Problem\n`);
      sections.push(`${proj.problem}\n`);
    }

    if (proj.approach) {
      sections.push(`## Approach\n`);
      sections.push(`${proj.approach}\n`);
    }

    if (proj.results) {
      sections.push(`## Results\n`);
      sections.push(`${proj.results}\n`);
    }

    if (proj.bullets.length > 0) {
      sections.push(`## Key Points\n`);
      for (const b of proj.bullets) sections.push(`- ${b}`);
      sections.push("");
    }

    const resultsText = proj.results || "";
    const unusedMetrics = projMetrics.filter(
      (m) =>
        !metricAlreadyInText(resultsText, m) &&
        !proj.bullets.some((b) => metricAlreadyInText(b, m)),
    );
    if (unusedMetrics.length > 0) {
      sections.push(`## Metrics\n`);
      for (const m of unusedMetrics) {
        sections.push(
          `- **${m.metric_name}:** ${m.value} ${m.unit} (${m.confidence} confidence)`,
        );
      }
      sections.push("");
    }

    if (proj.stack.length > 0) {
      sections.push(`## Tech Stack\n`);
      sections.push(`${proj.stack.join(", ")}\n`);
    }

    const linkItems: string[] = [];
    if (proj.repo_link) linkItems.push(`- [Repository](${proj.repo_link})`);
    if (proj.demo_link) linkItems.push(`- [Demo](${proj.demo_link})`);
    if (proj.paper_link) linkItems.push(`- [Paper](${proj.paper_link})`);
    if (linkItems.length > 0) {
      sections.push(`## Links\n`);
      sections.push(linkItems.join("\n") + "\n");
    }

    return { id: proj.id, filePath, content: sections.join("\n") };
  });
}
