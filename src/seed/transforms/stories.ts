import { stringify as yamlStringify } from "yaml";
import { makeWikiFrontmatter, type TransformResult } from "../wiki-helpers.js";
import type { StoryEntry } from "../schemas.js";

export function transformStories(stories: StoryEntry[]): TransformResult[] {
  const fm = makeWikiFrontmatter({
    title: "STAR Stories",
    sources: ["career-datacenter/data/stories_star.yaml"],
    tags: ["stories", "interview", "star"],
  });
  const fmYaml = yamlStringify(fm as unknown as Record<string, unknown>, { lineWidth: 0 }).trim();
  const sections: string[] = [];
  sections.push(`---\n${fmYaml}\n---\n`);
  sections.push(`# STAR Stories\n`);
  for (const story of stories) {
    sections.push(`---\n`);
    sections.push(`## ${story.title}\n`);
    sections.push(
      `**Category:** ${story.category}${story.subcategory ? ` / ${story.subcategory}` : ""}`,
    );
    if (story.best_for_roles.length > 0)
      sections.push(`**Best for:** ${story.best_for_roles.join(", ")}`);
    sections.push("");
    sections.push(`### Situation\n`);
    sections.push(`${story.situation.trim()}\n`);
    sections.push(`### Task\n`);
    sections.push(`${story.task.trim()}\n`);
    sections.push(`### Action\n`);
    sections.push(`${story.action.trim()}\n`);
    sections.push(`### Result\n`);
    sections.push(`${story.result.trim()}\n`);
  }
  return [
    {
      id: "star_stories",
      filePath: "wiki/concepts/star-stories.md",
      content: sections.join("\n"),
    },
  ];
}
