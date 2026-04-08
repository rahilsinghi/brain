import { describe, it, expect } from "vitest";
import { transformProjects } from "../../../src/seed/transforms/projects.js";
import type { ProjectEntry, MetricEntry } from "../../../src/seed/schemas.js";

describe("transformProjects", () => {
  const projects: ProjectEntry[] = [
    {
      id: "proj_edgemesh",
      name: "EdgeMesh – Distributed Edge Inference Mesh",
      type: "coursework",
      dates: "2024-2025",
      repo_link: "https://github.com/test/edgemesh",
      stack: ["Python", "Distributed Systems"],
      problem: "Need for local-first mesh.",
      approach: "Built device discovery with heartbeat monitoring.",
      results: "Functional mesh with failover routing.",
      bullets: ["Built a local-first mesh", "Implemented device discovery"],
      metrics: [],
      screenshots: [],
      proofs: [],
    },
  ];

  const metrics: MetricEntry[] = [];

  it("produces one article per project", () => {
    const results = transformProjects(projects, metrics);
    expect(results).toHaveLength(1);
    expect(results[0].filePath).toBe("wiki/projects/proj-edgemesh.md");
  });

  it("includes problem, approach, results sections", () => {
    const content = transformProjects(projects, metrics)[0].content;
    expect(content).toContain("## Problem");
    expect(content).toContain("local-first mesh");
    expect(content).toContain("## Approach");
    expect(content).toContain("## Results");
  });

  it("includes repo link when present", () => {
    const content = transformProjects(projects, metrics)[0].content;
    expect(content).toContain("github.com/test/edgemesh");
  });

  it("includes valid frontmatter with source path", () => {
    const content = transformProjects(projects, metrics)[0].content;
    expect(content).toContain("career-datacenter/data/projects.yaml#proj_edgemesh");
  });
});
