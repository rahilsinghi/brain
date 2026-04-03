import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkStringify from "remark-stringify";
import { createHash } from "node:crypto";
import type { WikiChunk } from "../types.js";

interface MdastNode {
  type: string;
  depth?: number;
  children?: MdastNode[];
  value?: string;
  position?: { start: { line: number }; end: { line: number } };
}

function extractText(node: MdastNode): string {
  if (node.value) return node.value;
  if (node.children) return node.children.map(extractText).join("");
  return "";
}

function nodeToMarkdown(node: MdastNode): string {
  const processor = unified().use(remarkStringify);
  return processor.stringify(node as never).trim();
}

function hashContent(content: string): string {
  return createHash("sha256").update(content).digest("hex").slice(0, 12);
}

export function chunkMarkdown(
  markdown: string,
  filePath: string
): WikiChunk[] {
  const processor = unified().use(remarkParse).use(remarkFrontmatter, ["yaml"]);
  const tree = processor.parse(markdown) as MdastNode;

  const children = (tree.children ?? []).filter((n) => n.type !== "yaml");

  if (children.length === 0) {
    return [];
  }

  let h1Title = "";
  const firstNode = children[0];
  if (firstNode.type === "heading" && firstNode.depth === 1) {
    h1Title = extractText(firstNode);
  }

  const sections: { heading: string; depth: number; nodes: MdastNode[] }[] = [];
  let currentSection: { heading: string; depth: number; nodes: MdastNode[] } | null = null;

  for (const node of children) {
    if (node.type === "heading" && node.depth === 2) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        heading: extractText(node),
        depth: 2,
        nodes: [node],
      };
    } else if (currentSection) {
      currentSection.nodes.push(node);
    } else if (node.type !== "heading") {
      currentSection = {
        heading: h1Title || "Untitled",
        depth: 1,
        nodes: [node],
      };
    }
  }

  if (currentSection) sections.push(currentSection);

  if (sections.length === 0) {
    const content = children.map((n) => nodeToMarkdown(n)).join("\n\n");
    return [
      {
        id: `${filePath}::${h1Title || "root"}`,
        filePath,
        breadcrumb: h1Title || "Untitled",
        heading: h1Title || "Untitled",
        content,
        sectionHash: hashContent(content),
      },
    ];
  }

  return sections.map((section) => {
    const content = section.nodes.map((n) => nodeToMarkdown(n)).join("\n\n");
    const breadcrumb =
      section.depth === 1 || !h1Title
        ? section.heading
        : `${h1Title} → ${section.heading}`;

    return {
      id: `${filePath}::${section.heading}`,
      filePath,
      breadcrumb,
      heading: section.heading,
      content,
      sectionHash: hashContent(content),
    };
  });
}
