import { stringify as yamlStringify } from "yaml";
import { makeWikiFrontmatter, type TransformResult } from "../wiki-helpers.js";
import type { HospitalityPositioning, RoleFamiliesFile } from "../schemas.js";

export function transformPositioning(
  positioning: HospitalityPositioning,
  roleFamilies: RoleFamiliesFile,
): TransformResult[] {
  const results: TransformResult[] = [];

  {
    const fm = makeWikiFrontmatter({
      title: "Hospitality Tech Positioning",
      sources: ["career-datacenter/data/hospitality_positioning.yaml"],
      tags: ["positioning", "hospitality", "career"],
    });
    const fmYaml = yamlStringify(fm as unknown as Record<string, unknown>, { lineWidth: 0 }).trim();
    const sections: string[] = [];
    sections.push(`---\n${fmYaml}\n---\n`);
    sections.push(`# Hospitality Tech Positioning\n`);
    sections.push(`**Core:** ${positioning.core_positioning}\n`);
    for (const [key, cat] of Object.entries(positioning.categories)) {
      sections.push(`## ${cat.label} (${key})\n`);
      sections.push(`**Angle:** ${cat.positioning_angle}\n`);
      if (cat.target_companies.length > 0)
        sections.push(`**Target companies:** ${cat.target_companies.join(", ")}\n`);
      if (cat.top_deliverables.length > 0) {
        sections.push(`**Key deliverables:**`);
        for (const d of cat.top_deliverables) sections.push(`- ${d.bullet}`);
        sections.push("");
      }
      if (cat.vocabulary.length > 0)
        sections.push(`**Vocabulary:** ${cat.vocabulary.join(", ")}\n`);
    }
    results.push({
      id: "hospitality_positioning",
      filePath: "wiki/concepts/hospitality-positioning.md",
      content: sections.join("\n"),
    });
  }

  {
    const fm = makeWikiFrontmatter({
      title: "Role Families",
      sources: ["career-datacenter/data/role_families.yaml"],
      tags: ["career", "roles", "positioning"],
    });
    const fmYaml = yamlStringify(fm as unknown as Record<string, unknown>, { lineWidth: 0 }).trim();
    const sections: string[] = [];
    sections.push(`---\n${fmYaml}\n---\n`);
    sections.push(`# Role Families\n`);
    for (const [key, family] of Object.entries(roleFamilies.role_families)) {
      sections.push(`## ${key.charAt(0).toUpperCase() + key.slice(1)}\n`);
      if (family.aliases.length > 0)
        sections.push(`**Aliases:** ${family.aliases.join(", ")}\n`);
      if (family.keywords.length > 0)
        sections.push(`**Keywords:** ${family.keywords.join(", ")}\n`);
    }
    results.push({
      id: "role_families",
      filePath: "wiki/concepts/role-families.md",
      content: sections.join("\n"),
    });
  }

  return results;
}
