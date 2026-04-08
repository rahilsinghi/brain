import { describe, it, expect } from "vitest";
import { transformProfile } from "../../../src/seed/transforms/profile.js";
import type { Profile, EducationEntry, ActivityEntry, LinksFile } from "../../../src/seed/schemas.js";

describe("transformProfile", () => {
  const profile: Profile = {
    full_name: "Rahil Singhi",
    current_title: "MS Computer Engineering Student at NYU",
    location: "New York, NY",
    email: "rahilsinghi300@gmail.com",
    summary_1line: "MS CE student @ NYU Tandon",
    summary_3line: "Full bio paragraph here.",
    target_roles: { primary: ["Software Engineer"], secondary: ["AI Engineer"], selective: [], avoid: ["Frontend"] },
    positioning: "Systems-oriented SWE.",
    differentiators: ["Built production systems"],
    industries: ["Tech", "AI/ML"],
    work_authorization: "F-1 visa, OPT eligible",
    preferred_locations: ["New York, NY"],
    work_mode_preference: "Remote",
  };

  const education: EducationEntry[] = [
    {
      id: "edu_nyu",
      institution: "NYU Tandon",
      degree: "MS",
      major: "Computer Engineering",
      start_date: "2024-09",
      end_date: "2026-05",
      gpa: "3.88/4.0",
      relevant_coursework: ["Deep Learning", "NLU"],
      honors: [],
      activities: [],
    },
  ];

  const activities: ActivityEntry[] = [
    {
      id: "activity_comedy_club",
      role: "President",
      organization: "Comedy Club",
      bullets: ["Led college comedy club"],
      skills_demonstrated: ["Leadership"],
    },
  ];

  const links: LinksFile = {
    github: { url: "https://github.com/rahilsinghi" },
    linkedin: { url: "https://linkedin.com/in/rahilsinghi27" },
  };

  it("returns a single TransformResult with correct filePath", () => {
    const results = transformProfile(profile, education, activities, links);
    expect(results).toHaveLength(1);
    expect(results[0].filePath).toBe("wiki/people/rahil-singhi.md");
    expect(results[0].id).toBe("profile_rahil_singhi");
  });

  it("includes frontmatter-compatible YAML header in content", () => {
    const results = transformProfile(profile, education, activities, links);
    expect(results[0].content).toContain("title: ");
    expect(results[0].content).toContain("author: ai");
    expect(results[0].content).toContain('sources:');
  });

  it("includes profile sections in content", () => {
    const content = transformProfile(profile, education, activities, links)[0].content;
    expect(content).toContain("# Rahil Singhi");
    expect(content).toContain("Systems-oriented SWE.");
    expect(content).toContain("## Target Roles");
    expect(content).toContain("Software Engineer");
    expect(content).toContain("## Education");
    expect(content).toContain("NYU Tandon");
    expect(content).toContain("3.88/4.0");
    expect(content).toContain("## Activities");
    expect(content).toContain("Comedy Club");
    expect(content).toContain("## Links");
    expect(content).toContain("github.com/rahilsinghi");
  });

  it("generates tags from target roles and industries", () => {
    const content = transformProfile(profile, education, activities, links)[0].content;
    expect(content).toContain("tags:");
  });
});
