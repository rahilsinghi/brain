import { updateFrontmatter } from "../frontmatter.js";

export async function parsePassthrough(filePath: string): Promise<void> {
  updateFrontmatter(filePath, {
    status: "pending",
    parsed_at: new Date().toISOString(),
  });
}
