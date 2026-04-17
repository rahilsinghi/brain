import { describe, it, expect } from "vitest";
import {
  extractTableFacts,
  extractBoldKeyFacts,
  extractFrontmatterFacts,
  extractFacts,
  formatFacts,
} from "../../src/embedder/fact-extractor.js";

describe("extractTableFacts", () => {
  it("extracts simple key-value table rows", () => {
    const md = `| Name | Rahil Singhi |
|------|------|
| Rate | $50/hr |
| Cap | 20h/week |`;

    const facts = extractTableFacts(md);
    expect(facts).toEqual([
      { key: "name", value: "Rahil Singhi" },
      { key: "rate", value: "$50/hr" },
      { key: "cap", value: "20h/week" },
    ]);
  });

  it("extracts bold keys in tables", () => {
    const md = `| **Field** | **Value** |
|-----------|-----------|
| **Rate (Trial)** | $50/hr, 20 hrs/week cap |
| **Equity** | 0.10% fully diluted |`;

    const facts = extractTableFacts(md);
    expect(facts).toEqual([
      { key: "rate (trial)", value: "$50/hr, 20 hrs/week cap" },
      { key: "equity", value: "0.10% fully diluted" },
    ]);
  });

  it("skips separator rows and empty values", () => {
    const md = `| Key | Value |
|-----|-------|
| Name | — |
| Role | Engineer |`;

    const facts = extractTableFacts(md);
    expect(facts).toEqual([{ key: "role", value: "Engineer" }]);
  });
});

describe("extractBoldKeyFacts", () => {
  it("extracts **Key:** Value patterns", () => {
    const md = `**Employer:** maison | **Rate:** $50/hr | **Cap:** 20h/week`;
    const facts = extractBoldKeyFacts(md);

    expect(facts.some((f) => f.key === "employer" && f.value.includes("maison"))).toBe(true);
    expect(facts.some((f) => f.key === "rate" && f.value.includes("$50"))).toBe(true);
  });

  it("extracts dash-prefixed bold keys", () => {
    const md = `- **Company:** Maison Labs\n- **Role:** AI Engineer`;
    const facts = extractBoldKeyFacts(md);

    expect(facts).toEqual([
      { key: "company", value: "Maison Labs" },
      { key: "role", value: "AI Engineer" },
    ]);
  });

  it("skips very long keys or values", () => {
    const longKey = "A".repeat(60);
    const md = `**${longKey}:** some value`;
    const facts = extractBoldKeyFacts(md);
    expect(facts).toEqual([]);
  });
});

describe("extractFrontmatterFacts", () => {
  it("extracts title and tags from frontmatter", () => {
    const md = `---
title: Maison Workspace Hub
author: ai
created_at: 2026-04-14
tags:
  - maison
  - workspace
---

# Content here`;

    const facts = extractFrontmatterFacts(md);
    expect(facts.some((f) => f.key === "title" && f.value === "Maison Workspace Hub")).toBe(true);
    // author and created_at should be skipped (system fields)
    expect(facts.some((f) => f.key === "author")).toBe(false);
    expect(facts.some((f) => f.key === "created_at")).toBe(false);
  });

  it("returns empty for no frontmatter", () => {
    const md = `# Just a heading\n\nSome content.`;
    const facts = extractFrontmatterFacts(md);
    expect(facts).toEqual([]);
  });
});

describe("extractFacts (integrated)", () => {
  it("combines all extraction methods and deduplicates", () => {
    const md = `---
title: Maison Workspace Hub
---

# Maison Workspace

| **Field** | **Value** |
|-----------|-----------|
| **Rate** | $50/hr |
| **Cap** | 20h/week |

**Employer:** Maison Labs
**Rate:** $50/hr`;

    const factsStr = extractFacts(md, "Maison Workspace Hub");

    expect(factsStr).toContain("FACTS from");
    expect(factsStr).toContain("rate: $50/hr");
    expect(factsStr).toContain("cap: 20h/week");
    expect(factsStr).toContain("employer:");
    // Should dedup the duplicate rate
    const rateCount = (factsStr.match(/rate: \$50\/hr/g) || []).length;
    expect(rateCount).toBe(1);
  });

  it("returns empty string when no facts found", () => {
    const md = `# Just Prose\n\nThis is a paragraph with no structured data.`;
    const result = extractFacts(md, "Prose Article");
    expect(result).toBe("");
  });
});

describe("formatFacts", () => {
  it("formats as searchable text block", () => {
    const result = formatFacts(
      [
        { key: "rate", value: "$50/hr" },
        { key: "name", value: "Rahil" },
      ],
      "Test Article"
    );
    expect(result).toBe('FACTS from "Test Article":\nrate: $50/hr\nname: Rahil');
  });
});
