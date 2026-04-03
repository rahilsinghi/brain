import { extname } from "node:path";
import { readFrontmatter, updateFrontmatter } from "../frontmatter.js";
import { parsePassthrough } from "./passthrough.js";
import { parseHtml } from "./html-parser.js";
import { isPhase2Format, parsePlaceholder } from "./placeholder-parser.js";

const TEXT_EXTENSIONS = new Set([".md", ".txt"]);
const HTML_EXTENSIONS = new Set([".html", ".htm"]);

export async function routeAndParse(filePath: string): Promise<void> {
  const { data } = readFrontmatter(filePath);
  if (data.status !== "unparsed") return;
  updateFrontmatter(filePath, { status: "parsing" });
  const ext = extname(filePath).toLowerCase();
  try {
    if (TEXT_EXTENSIONS.has(ext)) {
      await parsePassthrough(filePath);
    } else if (HTML_EXTENSIONS.has(ext)) {
      await parseHtml(filePath);
    } else if (isPhase2Format(ext)) {
      await parsePlaceholder(filePath, ext);
    } else {
      updateFrontmatter(filePath, {
        status: "failed",
        retry_count: (data.retry_count ?? 0) + 1,
        last_error: `Unsupported file type: ${ext}`,
      });
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    updateFrontmatter(filePath, {
      status: "failed",
      retry_count: (data.retry_count ?? 0) + 1,
      last_error: msg,
    });
  }
}
