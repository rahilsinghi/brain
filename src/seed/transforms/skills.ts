import { stringify as yamlStringify } from "yaml";
import { makeWikiFrontmatter, type TransformResult } from "../wiki-helpers.js";
import type { SkillsFile } from "../schemas.js";

export function transformSkills(skills: SkillsFile): TransformResult[] {
  const fm = makeWikiFrontmatter({
    title: "Skills Inventory",
    sources: ["career-datacenter/data/skills.yaml"],
    tags: ["skills", "profile"],
  });
  const fmYaml = yamlStringify(fm as unknown as Record<string, unknown>, { lineWidth: 0 }).trim();
  const sections: string[] = [];
  sections.push(`---\n${fmYaml}\n---\n`);
  sections.push(`# Skills Inventory\n`);
  const categories: [string, typeof skills.languages][] = [
    ["Languages", skills.languages],
    ["Frameworks", skills.frameworks],
    ["Systems & Databases", skills.systems],
    ["Data & Analytics", skills.data],
    ["ML & AI", skills.ml],
    ["Cloud & Infrastructure", skills.cloud],
    ["Tools", skills.tools],
    ["Other", skills.other],
  ];
  for (const [label, entries] of categories) {
    if (entries.length === 0) continue;
    sections.push(`## ${label}\n`);
    for (const skill of entries) {
      const evidenceLinks = skill.evidence
        .filter((e) => e.startsWith("exp_") || e.startsWith("proj_"))
        .map((e) => `[[ref:${e}]]`)
        .join(", ");
      const evidenceText = evidenceLinks || skill.evidence.join(", ");
      sections.push(`- **${skill.name}** (${skill.level}) — ${evidenceText}`);
    }
    sections.push("");
  }
  return [
    {
      id: "skills_inventory",
      filePath: "wiki/concepts/skills-inventory.md",
      content: sections.join("\n"),
    },
  ];
}
