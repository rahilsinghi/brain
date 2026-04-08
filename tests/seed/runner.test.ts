import { describe, it, expect } from "vitest";
import { parseArgs, shouldRunStep } from "../../src/seed/runner.js";

describe("runner", () => {
  describe("parseArgs", () => {
    it("parses --force flag", () => {
      const opts = parseArgs(["--force"]);
      expect(opts.force).toBe(true);
      expect(opts.only).toBeUndefined();
    });

    it("parses --only flag", () => {
      const opts = parseArgs(["--only", "tracking"]);
      expect(opts.only).toBe("tracking");
      expect(opts.force).toBe(false);
    });

    it("defaults to no flags", () => {
      const opts = parseArgs([]);
      expect(opts.force).toBe(false);
      expect(opts.only).toBeUndefined();
    });
  });

  describe("shouldRunStep", () => {
    it("runs all steps when no --only flag", () => {
      expect(shouldRunStep("transforms", undefined)).toBe(true);
      expect(shouldRunStep("compile", undefined)).toBe(true);
      expect(shouldRunStep("github", undefined)).toBe(true);
      expect(shouldRunStep("embed", undefined)).toBe(true);
    });

    it("--only tracking runs only tracking and embed", () => {
      expect(shouldRunStep("transforms", "tracking")).toBe(false);
      expect(shouldRunStep("tracking", "tracking")).toBe(true);
      expect(shouldRunStep("compile", "tracking")).toBe(false);
      expect(shouldRunStep("github", "tracking")).toBe(false);
      expect(shouldRunStep("embed", "tracking")).toBe(true);
    });

    it("--only github runs only github and embed", () => {
      expect(shouldRunStep("transforms", "github")).toBe(false);
      expect(shouldRunStep("github", "github")).toBe(true);
      expect(shouldRunStep("gmail", "github")).toBe(false);
      expect(shouldRunStep("embed", "github")).toBe(true);
    });
  });
});
