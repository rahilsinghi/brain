import { readFrontmatter, writeFrontmatter } from "../frontmatter.js";
import { readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const CATEGORIES = ["concepts", "projects", "people", "decisions"] as const;

export function updateIndex(vaultRoot: string): void {
  const indexPath = join(vaultRoot, "wiki", "index.md");
  if (!existsSync(indexPath)) return;
  const { data } = readFrontmatter(indexPath);
  const sections: string[] = [];
  for (const category of CATEGORIES) {
    const dir = join(vaultRoot, "wiki", category);
    const label = category.charAt(0).toUpperCase() + category.slice(1);
    if (!existsSync(dir)) {
      sections.push(`## ${label}\n\n_No articles yet._`);
      continue;
    }
    const files = readdirSync(dir).filter((f) => f.endsWith(".md") && f !== ".gitkeep");
    if (files.length === 0) {
      sections.push(`## ${label}\n\n_No articles yet._`);
      continue;
    }
    const links = files
      .map((f) => {
        const fm = readFrontmatter(join(dir, f));
        const title = (fm.data.title as string) || basename(f, ".md");
        return `- [[${category}/${basename(f, ".md")}|${title}]]`;
      })
      .join("\n");
    sections.push(`## ${label}\n\n${links}`);
  }
  const content = `# Brain — Master Index\n\nAuto-maintained index of all wiki articles.\n\n${sections.join("\n\n")}\n`;
  writeFrontmatter(indexPath, { ...data, last_ai_edit: new Date().toISOString() }, content);
}
