import { describe, it, expect } from "vitest";
import { transformExperience } from "../../../src/seed/transforms/experience.js";
import type { ExperienceEntry, MetricEntry } from "../../../src/seed/schemas.js";

describe("transformExperience", () => {
  const entries: ExperienceEntry[] = [
    {
      id: "exp_kismet_ai_data",
      company: "Kismet",
      title: "AI / Data Engineering Intern",
      team: "Engineering",
      location: "Remote",
      start_date: "2025-05",
      end_date: "2025-07",
      tech_stack: ["Python", "FastAPI", "GPT-4o"],
      scope: "Built AI-powered pipeline for hotel data extraction.",
      bullets: [
        "Built Playwright crawler + GPT-4o pipeline; captured >95% of required fields",
        "Deployed on AWS EC2 then migrated to Cloud Run",
      ],
      metrics: ["metric_kismet_ai_001"],
      links: [{ name: "Company", url: "https://makekismet.com/" }],
      proofs: [],
    },
    {
      id: "exp_kismet_tracking",
      company: "Kismet",
      title: "Tracking Engineer",
      start_date: "2025-09",
      end_date: "2025-12",
      tech_stack: ["GA4", "BigQuery"],
      bullets: ["Implemented cross-domain measurement"],
      metrics: [],
      links: [],
      proofs: [],
    },
  ];

  const metrics: MetricEntry[] = [
    {
      id: "metric_kismet_ai_001",
      context: "exp_kismet_ai_data",
      metric_name: "Hotel field capture rate",
      value: "95",
      unit: "percent",
      confidence: "high",
    },
  ];

  it("produces one article per experience entry", () => {
    const results = transformExperience(entries, metrics);
    expect(results).toHaveLength(2);
  });

  it("generates correct file path from id", () => {
    const results = transformExperience(entries, metrics);
    expect(results[0].filePath).toBe("wiki/experience/exp-kismet-ai-data.md");
    expect(results[1].filePath).toBe("wiki/experience/exp-kismet-tracking.md");
  });

  it("includes scope, bullets, and tech stack", () => {
    const content = transformExperience(entries, metrics)[0].content;
    expect(content).toContain("Built AI-powered pipeline");
    expect(content).toContain("Built Playwright crawler");
    expect(content).toContain("Python, FastAPI, GPT-4o");
  });

  it("does not double-render metrics already in bullet text", () => {
    const content = transformExperience(entries, metrics)[0].content;
    const metricMentions = (content.match(/Hotel field capture rate/g) || []).length;
    expect(metricMentions).toBeLessThanOrEqual(1);
  });

  it("includes [[ref:]] links to related experience entries at same company", () => {
    const content = transformExperience(entries, metrics)[0].content;
    expect(content).toContain("[[ref:exp_kismet_tracking]]");
  });

  it("includes valid frontmatter", () => {
    const content = transformExperience(entries, metrics)[0].content;
    expect(content).toContain("title: ");
    expect(content).toContain("author: ai");
    expect(content).toContain("sources:");
    expect(content).toContain("career-datacenter/data/experience.yaml#exp_kismet_ai_data");
  });
});
