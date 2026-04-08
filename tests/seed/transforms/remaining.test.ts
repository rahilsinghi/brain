import { describe, it, expect } from "vitest";
import { transformSkills } from "../../../src/seed/transforms/skills.js";
import { transformCompanies } from "../../../src/seed/transforms/companies.js";
import { transformPositioning } from "../../../src/seed/transforms/positioning.js";
import { transformStories } from "../../../src/seed/transforms/stories.js";
import { transformAnswers } from "../../../src/seed/transforms/answers.js";
import { transformTracking } from "../../../src/seed/transforms/tracking.js";
import type { SkillsFile, CompanyEntry, HospitalityPositioning, RoleFamiliesFile, StoryEntry, EasyApplyAnswers, OutreachRow, ApplicationRow } from "../../../src/seed/schemas.js";

describe("transformSkills", () => {
  const skills: SkillsFile = {
    languages: [{ name: "Python", level: "advanced", evidence: ["exp_kismet_ai_data"] }],
    frameworks: [{ name: "FastAPI", level: "advanced", evidence: ["exp_kismet_ai_data"] }],
    systems: [], data: [], ml: [], cloud: [], tools: [], other: [],
  };

  it("produces single article at wiki/concepts/skills-inventory.md", () => {
    const results = transformSkills(skills);
    expect(results).toHaveLength(1);
    expect(results[0].filePath).toBe("wiki/concepts/skills-inventory.md");
  });

  it("includes skill categories and evidence refs", () => {
    const content = transformSkills(skills)[0].content;
    expect(content).toContain("Python");
    expect(content).toContain("advanced");
    expect(content).toContain("[[ref:exp_kismet_ai_data]]");
  });
});

describe("transformCompanies", () => {
  const companies: CompanyEntry[] = [
    {
      name: "Canary Technologies",
      category: "GuestCX",
      location: "New York, NY",
      employee_count: 250,
      funding_stage: "Series D",
      tech_stack: ["Cloud", "PMS integrations"],
      product_description: "Guest CX platform",
      kismet_angle: "Booking flows, PMS integrations",
      hiring_signals: ["Recent raise"],
      priority_score: 9.5,
    },
  ];

  it("produces one article per company", () => {
    const results = transformCompanies(companies);
    expect(results).toHaveLength(1);
    expect(results[0].filePath).toBe("wiki/companies/canary-technologies.md");
  });

  it("includes company details", () => {
    const content = transformCompanies(companies)[0].content;
    expect(content).toContain("Canary Technologies");
    expect(content).toContain("Series D");
    expect(content).toContain("9.5");
  });
});

describe("transformPositioning", () => {
  const positioning: HospitalityPositioning = {
    core_positioning: "Hospitality-tech engineer",
    internships: [],
    categories: {
      PMS: {
        label: "Property Management Systems",
        target_companies: ["Mews"],
        positioning_angle: "I build PMS integrations",
        top_deliverables: [{ bullet: "Integrated OHIP rates", tags: ["PMS"] }],
        vocabulary: ["OHIP"],
      },
    },
  };

  const roleFamilies: RoleFamiliesFile = {
    role_families: {
      backend: {
        aliases: ["Backend Engineer"],
        keywords: ["REST API"],
        my_strength_bullets: [],
      },
    },
  };

  it("produces two articles (positioning + role-families)", () => {
    const results = transformPositioning(positioning, roleFamilies);
    expect(results).toHaveLength(2);
    expect(results[0].filePath).toBe("wiki/concepts/hospitality-positioning.md");
    expect(results[1].filePath).toBe("wiki/concepts/role-families.md");
  });
});

describe("transformStories", () => {
  const stories: StoryEntry[] = [
    {
      id: "kismet_llm_tool_calling",
      title: "Built GPT-4o Pipeline",
      category: "high_impact",
      situation: "Needed automation.",
      task: "Build AI pipeline.",
      action: "Designed Playwright crawler.",
      result: "95% field capture.",
      best_for_roles: ["AI Engineer"],
      tags: ["LLM"],
    },
  ];

  it("produces single article", () => {
    const results = transformStories(stories);
    expect(results).toHaveLength(1);
    expect(results[0].filePath).toBe("wiki/concepts/star-stories.md");
  });

  it("includes STAR breakdown", () => {
    const content = transformStories(stories)[0].content;
    expect(content).toContain("Situation");
    expect(content).toContain("Task");
    expect(content).toContain("Action");
    expect(content).toContain("Result");
  });
});

describe("transformAnswers", () => {
  const answers: EasyApplyAnswers = {
    work_authorization: {
      authorized: { answer: "Yes", type: "radio", aliases: [] },
      sponsorship: { answer: "No", type: "radio", aliases: [] },
    },
    experience: {
      years: { answer: "3", type: "text", aliases: [] },
    },
  };

  it("produces single article", () => {
    const results = transformAnswers(answers);
    expect(results).toHaveLength(1);
    expect(results[0].filePath).toBe("wiki/concepts/easy-apply-answers.md");
  });

  it("includes answer categories", () => {
    const content = transformAnswers(answers)[0].content;
    expect(content).toContain("Work Authorization");
    expect(content).toContain("Yes");
  });
});

describe("transformTracking", () => {
  const outreach: OutreachRow[] = [
    { log_id: "BT-001", contact_email: "test@test.com", contact_name: "Test Person", company_name: "TestCo", email_subject: "Hello", status: "sent" },
  ];
  const applications: ApplicationRow[] = [
    { company: "TestCo", role: "SWE", status: "preparing", location: "NYC" },
  ];

  it("produces two articles (outreach + applications)", () => {
    const results = transformTracking(outreach, applications);
    expect(results).toHaveLength(2);
    expect(results[0].filePath).toBe("wiki/tracking/outreach-log.md");
    expect(results[1].filePath).toBe("wiki/tracking/applications.md");
  });

  it("includes table rows", () => {
    const content = transformTracking(outreach, applications)[0].content;
    expect(content).toContain("Test Person");
    expect(content).toContain("TestCo");
    expect(content).toContain("sent");
  });
});
