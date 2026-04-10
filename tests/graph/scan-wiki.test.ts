import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { writeFrontmatter } from "../../src/frontmatter.js";
import { scanWiki } from "../../src/graph/scan-wiki.js";

const TEST_VAULT = join(import.meta.dirname, "__fixtures__/scan-wiki-test");

function writeArticle(
  subdir: string,
  slug: string,
  title: string,
  tags: string[],
  content: string,
): void {
  const dir = join(TEST_VAULT, "wiki", subdir);
  mkdirSync(dir, { recursive: true });
  const fm = {
    title,
    author: "ai",
    created_at: "2026-04-10T00:00:00Z",
    last_ai_edit: "2026-04-10T00:00:00Z",
    last_human_edit: null,
    last_embedded_hash: null,
    sources: [],
    tags,
  };
  writeFrontmatter(join(dir, `${slug}.md`), fm, content);
}

describe("scanWiki", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_VAULT, "wiki"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_VAULT, { recursive: true, force: true });
  });

  it("returns nodes with category derived from subdirectory", () => {
    writeArticle("projects", "karen", "Karen", ["escalation"], "# Karen\n\nA project.");
    writeArticle("skills", "typescript", "TypeScript", ["lang"], "# TypeScript\n\nA skill.");

    const result = scanWiki(TEST_VAULT);
    expect(result.nodes).toHaveLength(2);

    const karen = result.nodes.find((n) => n.id === "projects/karen.md");
    expect(karen).toBeDefined();
    expect(karen!.category).toBe("projects");
    expect(karen!.title).toBe("Karen");
    expect(karen!.tags).toEqual(["escalation"]);

    const ts = result.nodes.find((n) => n.id === "skills/typescript.md");
    expect(ts).toBeDefined();
    expect(ts!.category).toBe("skills");
  });

  it("extracts wiki links as edges", () => {
    writeArticle(
      "projects",
      "karen",
      "Karen",
      [],
      "# Karen\n\nUses [[skills/typescript.md|TypeScript]].",
    );
    writeArticle(
      "skills",
      "typescript",
      "TypeScript",
      [],
      "# TypeScript\n\nUsed by [[projects/karen.md|Karen]].",
    );

    const result = scanWiki(TEST_VAULT);
    expect(result.links).toContainEqual({
      source: "projects/karen.md",
      target: "skills/typescript.md",
    });
  });

  it("deduplicates bidirectional edges", () => {
    writeArticle(
      "projects",
      "karen",
      "Karen",
      [],
      "# Karen\n\nUses [[skills/typescript.md|TypeScript]].",
    );
    writeArticle(
      "skills",
      "typescript",
      "TypeScript",
      [],
      "# TypeScript\n\nUsed by [[projects/karen.md|Karen]].",
    );

    const result = scanWiki(TEST_VAULT);
    // A→B and B→A should be deduplicated to one edge
    const edgesBetween = result.links.filter(
      (l) =>
        (l.source === "projects/karen.md" && l.target === "skills/typescript.md") ||
        (l.source === "skills/typescript.md" && l.target === "projects/karen.md"),
    );
    expect(edgesBetween).toHaveLength(1);
  });

  it("counts connections per node", () => {
    writeArticle(
      "projects",
      "karen",
      "Karen",
      [],
      "# Karen\n\nUses [[skills/typescript.md]] and [[skills/react.md]].",
    );
    writeArticle("skills", "typescript", "TypeScript", [], "# TypeScript\n\nA skill.");
    writeArticle("skills", "react", "React", [], "# React\n\nA skill.");

    const result = scanWiki(TEST_VAULT);
    const karen = result.nodes.find((n) => n.id === "projects/karen.md");
    expect(karen!.connection_count).toBe(2);
  });

  it("counts incoming connections too", () => {
    writeArticle(
      "projects",
      "karen",
      "Karen",
      [],
      "# Karen\n\nUses [[skills/typescript.md]].",
    );
    writeArticle("skills", "typescript", "TypeScript", [], "# TypeScript\n\nA skill.");

    const result = scanWiki(TEST_VAULT);
    const ts = result.nodes.find((n) => n.id === "skills/typescript.md");
    // typescript has 1 incoming connection from karen
    expect(ts!.connection_count).toBe(1);
  });

  it("returns empty for vault with no wiki articles", () => {
    const result = scanWiki(TEST_VAULT);
    expect(result.nodes).toEqual([]);
    expect(result.links).toEqual([]);
  });

  it("skips index.md files", () => {
    writeArticle("projects", "karen", "Karen", [], "# Karen\n\nA project.");
    // Write an index.md manually
    const indexDir = join(TEST_VAULT, "wiki");
    writeFrontmatter(
      join(indexDir, "index.md"),
      { title: "Index", author: "ai", created_at: "2026-04-10T00:00:00Z", tags: [] },
      "# Index",
    );

    const result = scanWiki(TEST_VAULT);
    expect(result.nodes).toHaveLength(1);
    expect(result.nodes[0].id).toBe("projects/karen.md");
  });

  it("strips wiki/ prefix from link targets", () => {
    writeArticle(
      "projects",
      "karen",
      "Karen",
      [],
      "# Karen\n\nSee [[wiki/skills/typescript.md|TypeScript]].",
    );
    writeArticle("skills", "typescript", "TypeScript", [], "# TypeScript");

    const result = scanWiki(TEST_VAULT);
    expect(result.links).toContainEqual({
      source: "projects/karen.md",
      target: "skills/typescript.md",
    });
  });

  it("appends .md to link targets missing extension", () => {
    writeArticle(
      "projects",
      "karen",
      "Karen",
      [],
      "# Karen\n\nSee [[skills/typescript]].",
    );
    writeArticle("skills", "typescript", "TypeScript", [], "# TypeScript");

    const result = scanWiki(TEST_VAULT);
    expect(result.links).toContainEqual({
      source: "projects/karen.md",
      target: "skills/typescript.md",
    });
  });

  it("resolves bare wikilink targets to full node IDs via filename lookup", () => {
    writeArticle(
      "projects",
      "proj-karen",
      "Project Karen",
      [],
      "# Project Karen\n\nSee [[exp-kismet-tracking]].",
    );
    writeArticle(
      "experience",
      "exp-kismet-tracking",
      "Kismet Tracking",
      [],
      "# Kismet Tracking\n\nAn experience.",
    );

    const result = scanWiki(TEST_VAULT);
    expect(result.links).toContainEqual({
      source: "projects/proj-karen.md",
      target: "experience/exp-kismet-tracking.md",
    });
  });

  it("drops dangling links that match no known node", () => {
    writeArticle(
      "projects",
      "proj-karen",
      "Project Karen",
      [],
      "# Project Karen\n\nSee [[nonexistent-article]].",
    );

    const result = scanWiki(TEST_VAULT);
    expect(result.links).toHaveLength(0);
  });

  it("resolves wikilinks by article title (case-insensitive)", () => {
    writeArticle("concepts", "zustand-graph-state-store", "Zustand Graph State Store", [], "# Zustand\n\nA state library.");
    writeArticle("projects", "brain-explorer", "Brain Explorer", [], '# Brain Explorer\n\nUses [[Zustand Graph State Store]].');
    const result = scanWiki(TEST_VAULT);
    expect(result.links).toContainEqual({ source: "projects/brain-explorer.md", target: "concepts/zustand-graph-state-store.md" });
  });

  it("resolves wikilinks case-insensitively", () => {
    writeArticle("projects", "karen", "Karen Project", [], "# Karen\n\nA project.");
    writeArticle("concepts", "escalation", "Escalation Ladder", [], "# Escalation\n\nUsed by [[karen project]].");
    const result = scanWiki(TEST_VAULT);
    expect(result.links).toContainEqual({ source: "concepts/escalation.md", target: "projects/karen.md" });
  });

  it("resolves wikilinks via slugified title fallback", () => {
    writeArticle("concepts", "zustand-graph-state-store", "Zustand Graph State Store", [], "# Zustand\n\nA state library.");
    writeArticle("projects", "brain-explorer", "Brain Explorer", [], "# Brain Explorer\n\nUses [[zustand-graph-state-store]].");
    const result = scanWiki(TEST_VAULT);
    expect(result.links).toContainEqual({ source: "projects/brain-explorer.md", target: "concepts/zustand-graph-state-store.md" });
  });

  it("uses first-match-wins for duplicate titles", () => {
    writeArticle("concepts", "aaa-zustand", "Zustand", [], "# Zustand\n\nFirst article.");
    writeArticle("projects", "zzz-zustand", "Zustand", [], "# Zustand\n\nSecond article.");
    writeArticle("projects", "brain-explorer", "Brain Explorer", [], "# Brain Explorer\n\nUses [[Zustand]].");
    const result = scanWiki(TEST_VAULT);
    expect(result.links).toContainEqual({ source: "projects/brain-explorer.md", target: "concepts/aaa-zustand.md" });
  });

  it("prefers path-based and filename-based resolution over title", () => {
    writeArticle("skills", "typescript", "TypeScript Language", [], "# TypeScript");
    writeArticle("projects", "karen", "Karen", [], "# Karen\n\nUses [[skills/typescript.md]].");
    const result = scanWiki(TEST_VAULT);
    expect(result.links).toContainEqual({ source: "projects/karen.md", target: "skills/typescript.md" });
  });
});
