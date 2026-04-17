import { describe, it, expect } from "vitest";
import {
  normalizeTitle,
  contentOverlap,
  findDuplicateGroups,
} from "../../src/lint/dedup.js";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

describe("normalizeTitle", () => {
  it("lowercases and strips dates", () => {
    expect(normalizeTitle("Meeting Fredrik Sjoberg 2026-04-14")).toBe(
      "meeting fredrik sjoberg"
    );
  });

  it("strips month names and years", () => {
    expect(normalizeTitle("Maison Update April 2026")).toBe("maison update");
  });

  it("collapses special chars and whitespace", () => {
    expect(normalizeTitle("Rahil's Career — Status")).toBe("rahil s career status");
  });
});

describe("contentOverlap", () => {
  it("returns 1.0 for identical content", () => {
    const text = "This is a sample article about knowledge graphs and embeddings";
    expect(contentOverlap(text, text)).toBeCloseTo(1.0, 1);
  });

  it("returns 0 for completely different content", () => {
    expect(
      contentOverlap(
        "alpha beta gamma delta epsilon zeta",
        "hotel india juliet kilo lima mike"
      )
    ).toBe(0);
  });

  it("returns partial overlap for similar content", () => {
    const a = "Maison Labs is building an AI-powered hotel concierge platform with knowledge graphs";
    const b = "Maison Labs is creating an AI-powered hotel assistant using knowledge graphs and agents";
    const overlap = contentOverlap(a, b);
    expect(overlap).toBeGreaterThan(0.3);
    expect(overlap).toBeLessThan(1.0);
  });

  it("ignores short words (3 chars or fewer)", () => {
    expect(contentOverlap("the and for are", "the and for are")).toBe(0);
  });
});

describe("findDuplicateGroups", () => {
  const tmpDir = join(import.meta.dirname, "__dedup_test__");
  const wikiDir = join(tmpDir, "wiki");

  function writeArticle(subdir: string, filename: string, title: string, content: string): void {
    const dir = join(wikiDir, subdir);
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, filename),
      `---\ntitle: "${title}"\nauthor: ai\ncreated_at: "2026-04-15"\nlast_ai_edit: "2026-04-15"\nlast_human_edit: null\nlast_embedded_hash: null\nsources: []\ntags: []\n---\n\n# ${title}\n\n${content}`
    );
  }

  it("detects duplicate articles with overlapping content", () => {
    rmSync(tmpDir, { recursive: true, force: true });

    writeArticle(
      "decisions",
      "meeting-april-14.md",
      "Meeting Fredrik April 14 2026",
      "Fredrik and Rahil met at Stumptown Coffee to discuss the knowledge graph architecture and transaction layer. They talked about hotel aggregator partnerships including Derbysoft and Travelport. The meeting covered compensation renegotiation from seven thousand to eight thousand per month."
    );

    writeArticle(
      "people",
      "meeting-update-april.md",
      "Meeting Update Fredrik and Rahil April 2026",
      "Fredrik and Rahil met at Stumptown Coffee to discuss the knowledge graph architecture and transaction layer. They discussed hotel aggregator partnerships including Derbysoft and Travelport. Compensation was renegotiated from seven thousand to eight thousand per month."
    );

    writeArticle(
      "projects",
      "unrelated.md",
      "Wilbo Screenwriting Tool",
      "Wilbo is a completely different project about screenwriting tools and storyboard generation with Brenton Andersen."
    );

    const groups = findDuplicateGroups(wikiDir);

    expect(groups.length).toBe(1);
    expect(groups[0].articles.length).toBe(2);

    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("does not flag articles with different content", () => {
    rmSync(tmpDir, { recursive: true, force: true });

    writeArticle(
      "decisions",
      "article-a.md",
      "Maison Architecture",
      "The Maison platform uses a knowledge graph with RAG for hotel recommendations. Agents pull context from graph nodes."
    );

    writeArticle(
      "projects",
      "article-b.md",
      "Maison Architecture Overview",
      "Completely different content about deployment infrastructure on AWS with CDK and CloudFront distributions."
    );

    const groups = findDuplicateGroups(wikiDir);
    expect(groups.length).toBe(0);

    rmSync(tmpDir, { recursive: true, force: true });
  });
});
