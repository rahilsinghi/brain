import { describe, it, expect } from "vitest";
import {
  makeWikiFrontmatter,
  validateWikiFrontmatter,
  resolveLinks,
  slugFromId,
  type TransformResult,
} from "../../src/seed/wiki-helpers.js";

describe("wiki-helpers", () => {
  describe("makeWikiFrontmatter", () => {
    it("creates valid WikiFrontmatter with all required fields", () => {
      const fm = makeWikiFrontmatter({
        title: "Test Article",
        sources: ["data/experience.yaml#exp_test"],
        tags: ["test"],
      });
      expect(fm.title).toBe("Test Article");
      expect(fm.author).toBe("ai");
      expect(fm.last_human_edit).toBeNull();
      expect(fm.last_embedded_hash).toBeNull();
      expect(fm.sources).toEqual(["data/experience.yaml#exp_test"]);
      expect(fm.tags).toEqual(["test"]);
      expect(fm.created_at).toBeDefined();
      expect(fm.last_ai_edit).toBeDefined();
    });
  });

  describe("validateWikiFrontmatter", () => {
    it("returns true for valid frontmatter", () => {
      const fm = makeWikiFrontmatter({ title: "Test", sources: [], tags: [] });
      expect(validateWikiFrontmatter(fm)).toEqual({ valid: true, errors: [] });
    });

    it("returns false for missing title", () => {
      const fm = { author: "ai", created_at: "2026-01-01", last_ai_edit: "2026-01-01", last_human_edit: null, last_embedded_hash: null, sources: [], tags: [] };
      const result = validateWikiFrontmatter(fm as Record<string, unknown>);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain("title");
    });
  });

  describe("slugFromId", () => {
    it("converts YAML id to file slug", () => {
      expect(slugFromId("exp_kismet_ai_data")).toBe("exp-kismet-ai-data");
    });

    it("handles proj_ prefix", () => {
      expect(slugFromId("proj_edgemesh")).toBe("proj-edgemesh");
    });
  });

  describe("resolveLinks", () => {
    it("resolves [[ref:id]] placeholders to Obsidian links", () => {
      const results: TransformResult[] = [
        { id: "exp_kismet_ai_data", filePath: "wiki/experience/exp-kismet-ai-data.md", content: "# AI Data\n\nSee [[ref:exp_kismet_tracking]]" },
        { id: "exp_kismet_tracking", filePath: "wiki/experience/exp-kismet-tracking.md", content: "# Tracking\n\nSee [[ref:exp_kismet_ai_data]]" },
      ];
      const resolved = resolveLinks(results);
      expect(resolved[0].content).toContain("[[exp-kismet-tracking]]");
      expect(resolved[1].content).toContain("[[exp-kismet-ai-data]]");
    });

    it("replaces unresolved refs with plain text and (unlinked) suffix", () => {
      const results: TransformResult[] = [
        { id: "test", filePath: "wiki/test.md", content: "See [[ref:nonexistent]]" },
      ];
      const resolved = resolveLinks(results);
      expect(resolved[0].content).toContain("nonexistent (unlinked)");
      expect(resolved[0].content).not.toContain("[[ref:");
    });

    it("returns unresolved count", () => {
      const results: TransformResult[] = [
        { id: "test", filePath: "wiki/test.md", content: "[[ref:a]] [[ref:b]]" },
      ];
      const resolved = resolveLinks(results);
      expect(resolved.unresolvedCount).toBe(2);
      expect(resolved.resolvedCount).toBe(0);
    });
  });
});
