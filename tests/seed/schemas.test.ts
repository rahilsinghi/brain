import { describe, it, expect } from "vitest";
import {
  ProfileSchema,
  ExperienceFileSchema,
  EducationFileSchema,
  SkillsFileSchema,
  ProjectsFileSchema,
  MetricsFileSchema,
  StoriesFileSchema,
  ActivitiesFileSchema,
  LinksFileSchema,
  HospitalityCompaniesSchema,
  HospitalityPositioningSchema,
  RoleFamiliesSchema,
  EasyApplyAnswersSchema,
} from "../../src/seed/schemas.js";

describe("schemas", () => {
  describe("ProfileSchema", () => {
    it("validates a complete profile", () => {
      const data = {
        full_name: "Rahil Singhi",
        current_title: "MS CE Student",
        location: "New York, NY",
        email: "test@example.com",
        summary_1line: "Engineer",
        summary_3line: "Full bio here.",
        target_roles: { primary: ["SWE"], secondary: [], selective: [], avoid: [] },
        positioning: "Systems engineer.",
        differentiators: ["Built production systems"],
        industries: ["Tech"],
        work_authorization: "F-1 visa",
        preferred_locations: ["NYC"],
        work_mode_preference: "Remote",
      };
      const result = ProfileSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("fails on missing full_name", () => {
      const result = ProfileSchema.safeParse({ current_title: "Student" });
      expect(result.success).toBe(false);
    });

    it("preserves unknown fields via passthrough", () => {
      const data = {
        full_name: "Test",
        current_title: "Student",
        location: "NYC",
        email: "t@t.com",
        summary_1line: "x",
        summary_3line: "x",
        target_roles: { primary: [] },
        positioning: "x",
        differentiators: [],
        industries: [],
        custom_field: "preserved",
      };
      const result = ProfileSchema.parse(data);
      expect((result as Record<string, unknown>).custom_field).toBe("preserved");
    });
  });

  describe("ExperienceFileSchema", () => {
    it("validates experience entries with required id", () => {
      const data = {
        entries: [{
          id: "exp_test",
          company: "TestCo",
          title: "Engineer",
          start_date: "2025-01",
          end_date: null,
          tech_stack: ["Python"],
          bullets: ["Did things"],
        }],
      };
      const result = ExperienceFileSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("fails when entry missing id", () => {
      const data = {
        entries: [{ company: "TestCo", title: "Engineer", start_date: "2025-01" }],
      };
      const result = ExperienceFileSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("defaults optional arrays to empty", () => {
      const data = {
        entries: [{
          id: "exp_test",
          company: "TestCo",
          title: "Engineer",
          start_date: "2025-01",
          end_date: null,
        }],
      };
      const result = ExperienceFileSchema.parse(data);
      expect(result.entries[0].tech_stack).toEqual([]);
      expect(result.entries[0].bullets).toEqual([]);
      expect(result.entries[0].metrics).toEqual([]);
    });
  });

  describe("MetricsFileSchema", () => {
    it("validates metric entries", () => {
      const data = {
        metrics: [{
          id: "metric_001",
          context: "exp_test",
          metric_name: "Accuracy",
          value: "95",
          unit: "percent",
          confidence: "high",
        }],
      };
      const result = MetricsFileSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe("ProjectsFileSchema", () => {
    it("validates project entries", () => {
      const data = {
        projects: [{
          id: "proj_test",
          name: "Test Project",
          type: "personal",
          stack: ["Python"],
          problem: "A problem",
          approach: "An approach",
          results: "Good results",
          bullets: ["Did stuff"],
        }],
      };
      const result = ProjectsFileSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe("EducationFileSchema", () => {
    it("validates education entries", () => {
      const data = {
        entries: [{
          id: "edu_test",
          institution: "NYU",
          degree: "MS",
          major: "CE",
          start_date: "2024-09",
          end_date: "2026-05",
        }],
      };
      const result = EducationFileSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe("HospitalityCompaniesSchema", () => {
    it("validates company entries", () => {
      const data = {
        companies: [{
          name: "Canary Technologies",
          category: "GuestCX",
          location: "New York, NY",
          product_description: "Guest CX platform",
        }],
      };
      const result = HospitalityCompaniesSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});
