import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadYaml, loadCsv } from "../../src/seed/yaml-loader.js";
import { ExperienceFileSchema, OutreachRowSchema } from "../../src/seed/schemas.js";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/loader-test");

describe("yaml-loader", () => {
  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  describe("loadYaml", () => {
    it("loads and validates a valid YAML file", () => {
      const file = join(TEST_DIR, "test.yaml");
      writeFileSync(file, `entries:\n  - id: "exp_test"\n    company: "TestCo"\n    title: "Engineer"\n    start_date: "2025-01"\n    end_date: null\n`);
      const result = loadYaml(file, ExperienceFileSchema);
      expect(result.entries).toHaveLength(1);
      expect(result.entries[0].id).toBe("exp_test");
    });

    it("throws on missing required field with descriptive error", () => {
      const file = join(TEST_DIR, "bad.yaml");
      writeFileSync(file, `entries:\n  - company: "TestCo"\n    title: "Engineer"\n`);
      expect(() => loadYaml(file, ExperienceFileSchema)).toThrow(/bad\.yaml/);
    });

    it("applies defaults for optional array fields", () => {
      const file = join(TEST_DIR, "defaults.yaml");
      writeFileSync(file, `entries:\n  - id: "exp_test"\n    company: "TestCo"\n    title: "Engineer"\n    start_date: "2025-01"\n    end_date: null\n`);
      const result = loadYaml(file, ExperienceFileSchema);
      expect(result.entries[0].tech_stack).toEqual([]);
      expect(result.entries[0].bullets).toEqual([]);
      expect(result.entries[0].metrics).toEqual([]);
    });

    it("preserves passthrough fields", () => {
      const file = join(TEST_DIR, "extra.yaml");
      writeFileSync(file, `entries:\n  - id: "exp_test"\n    company: "TestCo"\n    title: "Engineer"\n    start_date: "2025-01"\n    end_date: null\n    custom_field: "kept"\n`);
      const result = loadYaml(file, ExperienceFileSchema);
      expect((result.entries[0] as Record<string, unknown>).custom_field).toBe("kept");
    });

    it("throws if file does not exist", () => {
      expect(() => loadYaml("/nonexistent.yaml", ExperienceFileSchema)).toThrow();
    });
  });

  describe("loadCsv", () => {
    it("loads and validates CSV rows", () => {
      const file = join(TEST_DIR, "test.csv");
      writeFileSync(file, `log_id,contact_email,contact_name,company_name,email_subject,status\nBT-001,test@test.com,Test Person,TestCo,Subject,sent\n`);
      const rows = loadCsv(file, OutreachRowSchema);
      expect(rows).toHaveLength(1);
      expect(rows[0].log_id).toBe("BT-001");
      expect(rows[0].contact_name).toBe("Test Person");
    });

    it("handles quoted fields with commas", () => {
      const file = join(TEST_DIR, "quoted.csv");
      writeFileSync(file, `log_id,contact_email,contact_name,company_name,email_subject,status\nBT-001,test@test.com,"Last, First",TestCo,Subject,sent\n`);
      const rows = loadCsv(file, OutreachRowSchema);
      expect(rows[0].contact_name).toBe("Last, First");
    });

    it("returns empty array for header-only CSV", () => {
      const file = join(TEST_DIR, "empty.csv");
      writeFileSync(file, `log_id,contact_email,contact_name,company_name,email_subject,status\n`);
      const rows = loadCsv(file, OutreachRowSchema);
      expect(rows).toEqual([]);
    });
  });
});
