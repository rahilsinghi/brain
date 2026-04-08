import { stringify as yamlStringify } from "yaml";
import { makeWikiFrontmatter, type TransformResult } from "../wiki-helpers.js";
import type { Profile, EducationEntry, ActivityEntry, LinksFile } from "../schemas.js";

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function transformProfile(
  profile: Profile,
  education: EducationEntry[],
  activities: ActivityEntry[],
  links: LinksFile,
): TransformResult[] {
  const slug = slugify(profile.full_name);
  const filePath = `wiki/people/${slug}.md`;
  const id = `profile_${slug.replace(/-/g, "_")}`;

  const tags = [
    "profile",
    ...profile.industries.map((i) => i.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
  ];

  const fm = makeWikiFrontmatter({
    title: profile.full_name,
    sources: ["career-datacenter/data/profile.yaml"],
    tags,
  });

  const fmYaml = yamlStringify(fm as unknown as Record<string, unknown>, { lineWidth: 0 }).trim();

  const sections: string[] = [];

  // Header
  sections.push(`---\n${fmYaml}\n---\n`);
  sections.push(`# ${profile.full_name}\n`);
  sections.push(`**${profile.current_title}** · ${profile.location}\n`);
  sections.push(`${profile.summary_3line.trim()}\n`);

  // Positioning
  sections.push(`## Positioning\n`);
  sections.push(`${profile.positioning.trim()}\n`);
  if (profile.differentiators.length > 0) {
    sections.push(profile.differentiators.map((d) => `- ${d}`).join("\n") + "\n");
  }

  // Target Roles
  sections.push(`## Target Roles\n`);
  if (profile.target_roles.primary.length > 0) {
    sections.push(`**Primary:** ${profile.target_roles.primary.join(", ")}\n`);
  }
  if (profile.target_roles.secondary.length > 0) {
    sections.push(`**Secondary:** ${profile.target_roles.secondary.join(", ")}\n`);
  }
  if (profile.target_roles.avoid.length > 0) {
    sections.push(`**Avoid:** ${profile.target_roles.avoid.join(", ")}\n`);
  }

  // Work Info
  if (profile.work_authorization || profile.preferred_locations.length > 0) {
    sections.push(`## Work Details\n`);
    if (profile.work_authorization) sections.push(`**Authorization:** ${profile.work_authorization}\n`);
    if (profile.preferred_locations.length > 0) sections.push(`**Locations:** ${profile.preferred_locations.join(", ")}\n`);
    if (profile.work_mode_preference) sections.push(`**Mode:** ${profile.work_mode_preference}\n`);
  }

  // Education
  if (education.length > 0) {
    sections.push(`## Education\n`);
    for (const edu of education) {
      sections.push(`### ${edu.institution}\n`);
      sections.push(`**${edu.degree} in ${edu.major}** · ${edu.start_date} – ${edu.end_date}\n`);
      if (edu.gpa) sections.push(`GPA: ${edu.gpa}\n`);
      if (edu.relevant_coursework.length > 0) {
        sections.push(`Coursework: ${edu.relevant_coursework.join(", ")}\n`);
      }
    }
  }

  // Activities
  if (activities.length > 0) {
    sections.push(`## Activities\n`);
    for (const act of activities) {
      sections.push(`- **${act.role}**, ${act.organization}${act.dates ? ` (${act.dates})` : ""}`);
      if (act.bullets.length > 0) {
        sections.push(act.bullets.map((b) => `  - ${b}`).join("\n"));
      }
    }
    sections.push("");
  }

  // Links
  const linkEntries: string[] = [];
  if (links.github?.url) linkEntries.push(`- [GitHub](${links.github.url})`);
  if (links.linkedin?.url) linkEntries.push(`- [LinkedIn](${links.linkedin.url})`);
  if (links.personal_website?.url) linkEntries.push(`- [Website](${links.personal_website.url})`);
  if (links.portfolio?.url) linkEntries.push(`- [Portfolio](${links.portfolio.url})`);
  if (linkEntries.length > 0) {
    sections.push(`## Links\n`);
    sections.push(linkEntries.join("\n") + "\n");
  }

  const content = sections.join("\n");

  return [{ id, filePath, content }];
}
