import { stringify as yamlStringify } from "yaml";
import { makeWikiFrontmatter, type TransformResult } from "../wiki-helpers.js";
import type { EasyApplyAnswers } from "../schemas.js";

export function transformAnswers(answers: EasyApplyAnswers): TransformResult[] {
  const fm = makeWikiFrontmatter({
    title: "Easy Apply Answers",
    sources: ["career-datacenter/data/easy_apply_answers.yaml"],
    tags: ["career", "applications", "reference"],
  });
  const fmYaml = yamlStringify(fm as unknown as Record<string, unknown>, { lineWidth: 0 }).trim();
  const sections: string[] = [];
  sections.push(`---\n${fmYaml}\n---\n`);
  sections.push(`# Easy Apply Answers\n`);
  sections.push(`Quick reference for application form fields.\n`);
  for (const [category, fields] of Object.entries(answers)) {
    const heading = category
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    sections.push(`## ${heading}\n`);
    for (const [field, data] of Object.entries(fields)) {
      if (typeof data !== "object" || !data) continue;
      const answer = (data as { answer?: string }).answer;
      if (answer !== undefined) {
        const label = field
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        sections.push(`- **${label}:** ${answer || "(dynamic)"}`);
      }
    }
    sections.push("");
  }
  return [
    {
      id: "easy_apply_answers",
      filePath: "wiki/concepts/easy-apply-answers.md",
      content: sections.join("\n"),
    },
  ];
}
