import { stringify as yamlStringify } from "yaml";
import { makeWikiFrontmatter, type TransformResult } from "../wiki-helpers.js";
import type { CompanyEntry } from "../schemas.js";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function transformCompanies(companies: CompanyEntry[]): TransformResult[] {
  return companies.map((c) => {
    const slug = slugify(c.name);
    const filePath = `wiki/companies/${slug}.md`;
    const fm = makeWikiFrontmatter({
      title: c.name,
      sources: ["career-datacenter/data/hospitality_companies_tier1.yaml"],
      tags: ["company", c.category.toLowerCase(), slug],
    });
    const fmYaml = yamlStringify(fm as unknown as Record<string, unknown>, { lineWidth: 0 }).trim();
    const sections: string[] = [];
    sections.push(`---\n${fmYaml}\n---\n`);
    sections.push(`# ${c.name}\n`);
    sections.push(
      `**${c.category}** · ${c.location}${c.employee_count ? ` · ~${c.employee_count} employees` : ""}\n`,
    );
    sections.push(`${c.product_description}\n`);
    if (c.funding_stage || c.last_funding_amount) {
      sections.push(`## Funding\n`);
      if (c.funding_stage) sections.push(`**Stage:** ${c.funding_stage}`);
      if (c.last_funding_amount)
        sections.push(
          `**Last round:** ${c.last_funding_amount}${c.last_funding_date ? ` (${c.last_funding_date})` : ""}`,
        );
      if (c.valuation) sections.push(`**Valuation:** ${c.valuation}`);
      if (c.lead_investor) sections.push(`**Lead investor:** ${c.lead_investor}`);
      sections.push("");
    }
    if (c.tech_stack.length > 0) {
      sections.push(`## Tech Stack\n`);
      sections.push(`${c.tech_stack.join(", ")}\n`);
    }
    if (c.kismet_angle) {
      sections.push(`## Positioning Angle\n`);
      sections.push(`${c.kismet_angle}\n`);
    }
    if (c.hiring_signals.length > 0) {
      sections.push(`## Hiring Signals\n`);
      for (const s of c.hiring_signals) sections.push(`- ${s}`);
      sections.push("");
    }
    if (c.priority_score !== undefined) sections.push(`**Priority score:** ${c.priority_score}/10\n`);
    return { id: `company_${slug}`, filePath, content: sections.join("\n") };
  });
}
