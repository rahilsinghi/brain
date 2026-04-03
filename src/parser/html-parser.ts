import TurndownService from "turndown";
import { readFrontmatter, writeFrontmatter } from "../frontmatter.js";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

export async function parseHtml(filePath: string): Promise<void> {
  const { data, content } = readFrontmatter(filePath);
  const markdown = turndown.turndown(content);
  writeFrontmatter(filePath, { ...data, status: "pending", parsed_at: new Date().toISOString() }, markdown + "\n");
}
