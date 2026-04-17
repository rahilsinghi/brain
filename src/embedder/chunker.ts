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

  // Split at ## and ### headings for finer-grained chunks
  const sections: { heading: string; depth: number; parentHeading: string; nodes: MdastNode[] }[] = [];
  let currentSection: { heading: string; depth: number; parentHeading: string; nodes: MdastNode[] } | null = null;
  let currentH2 = "";

  for (const node of children) {
    if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
      if (currentSection) sections.push(currentSection);
      if (node.depth === 2) currentH2 = extractText(node);
      currentSection = {
        heading: extractText(node),
        depth: node.depth,
        parentHeading: node.depth === 3 ? currentH2 : "",
        nodes: [node],
      };
    } else if (currentSection) {
      currentSection.nodes.push(node);
    } else if (node.type !== "heading") {
      currentSection = {
        heading: h1Title || "Untitled",
        depth: 1,
        parentHeading: "",
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

  // Split oversized chunks (>500 words) at paragraph boundaries
  const MAX_CHUNK_WORDS = 500;
  const finalSections: typeof sections = [];

  for (const section of sections) {
    const content = section.nodes.map((n) => nodeToMarkdown(n)).join("\n\n");
    const wordCount = content.split(/\s+/).length;

    if (wordCount <= MAX_CHUNK_WORDS) {
      finalSections.push(section);
    } else {
      // Split into sub-chunks at paragraph boundaries
      let currentNodes: MdastNode[] = [];
      let currentWords = 0;
      let subIndex = 0;

      for (const node of section.nodes) {
        const nodeText = nodeToMarkdown(node);
        const nodeWords = nodeText.split(/\s+/).length;

        if (currentWords + nodeWords > MAX_CHUNK_WORDS && currentNodes.length > 0) {
          finalSections.push({
            heading: subIndex === 0 ? section.heading : `${section.heading} (cont.)`,
            depth: section.depth,
            parentHeading: section.parentHeading,
            nodes: currentNodes,
          });
          currentNodes = [node];
          currentWords = nodeWords;
          subIndex++;
        } else {
          currentNodes.push(node);
          currentWords += nodeWords;
        }
      }

      if (currentNodes.length > 0) {
        finalSections.push({
          heading: subIndex === 0 ? section.heading : `${section.heading} (cont.)`,
          depth: section.depth,
          parentHeading: section.parentHeading,
          nodes: currentNodes,
        });
      }
    }
  }

  return finalSections.map((section) => {
    const content = section.nodes.map((n) => nodeToMarkdown(n)).join("\n\n");
    let breadcrumb: string;
    if (section.depth === 1 || !h1Title) {
      breadcrumb = section.heading;
    } else if (section.depth === 3 && section.parentHeading) {
      breadcrumb = `${h1Title} → ${section.parentHeading} → ${section.heading}`;
    } else {
      breadcrumb = `${h1Title} → ${section.heading}`;
    }

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
