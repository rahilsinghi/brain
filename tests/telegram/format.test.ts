import { describe, it, expect } from "vitest";
import { formatForTelegram } from "../../src/telegram/format.js";

describe("formatForTelegram", () => {
  describe("wiki link stripping", () => {
    it("extracts display text from [[path|display]]", () => {
      const input = "See [[wiki/projects/karen.md|Karen Architecture]] for details.";
      expect(formatForTelegram(input)).toBe("See Karen Architecture for details.");
    });

    it("extracts anchor text from [[path#heading]]", () => {
      const input = "See [[wiki/projects/karen.md#system-architecture]] for more.";
      expect(formatForTelegram(input)).toBe("See system architecture for more.");
    });

    it("extracts filename from [[path/file.md]]", () => {
      const input = "Details in [[wiki/projects/karen.md]] article.";
      expect(formatForTelegram(input)).toBe("Details in karen article.");
    });

    it("keeps simple [[Topic Name]] as plain text", () => {
      const input = "Check out [[Karen]] for more info.";
      expect(formatForTelegram(input)).toBe("Check out Karen for more info.");
    });

    it("handles multiple wiki links", () => {
      const input =
        "Both [[wiki/projects/karen.md|Karen]] and [[wiki/projects/asknyc.md|AskNYC]] are relevant.";
      expect(formatForTelegram(input)).toBe("Both Karen and AskNYC are relevant.");
    });
  });

  describe("inline slug citation removal", () => {
    it("removes bold slug citations with 3+ segments", () => {
      const input =
        "Maison is an AI platform **maison-call-preparation-brief-fredrik-sjoberg**.";
      expect(formatForTelegram(input)).toBe("Maison is an AI platform.");
    });

    it("removes trailing citation clusters", () => {
      const input = "Brooklyn, NY **maison-call-prep**, **meeting-prep-maison-ai-role**.";
      expect(formatForTelegram(input)).toBe("Brooklyn, NY.");
    });

    it("removes short bold citations before punctuation", () => {
      const input = "30 employees **maison**.";
      expect(formatForTelegram(input)).toBe("30 employees.");
    });
  });

  describe("markdown stripping", () => {
    it("strips bold markers", () => {
      const input = "The **Product** is great.";
      expect(formatForTelegram(input)).toBe("The Product is great.");
    });

    it("strips italic markers", () => {
      const input = "This is *important* text.";
      expect(formatForTelegram(input)).toBe("This is important text.");
    });

    it("converts markdown bullets to dashes", () => {
      const input = "Items:\n*   First item\n*   Second item";
      expect(formatForTelegram(input)).toBe("Items:\n- First item\n- Second item");
    });

    it("converts indented sub-bullets to dashes", () => {
      const input = "List:\n- Main item\n * Sub item\n * Another";
      expect(formatForTelegram(input)).toBe("List:\n- Main item\n- Sub item\n- Another");
    });

    it("strips markdown headers", () => {
      const input = "### Key Features\n\nSome text here.";
      expect(formatForTelegram(input)).toBe("Key Features\n\nSome text here.");
    });
  });

  describe("cleanup", () => {
    it("collapses multiple spaces", () => {
      const input = "word   word";
      expect(formatForTelegram(input)).toBe("word word");
    });

    it("cleans orphaned commas", () => {
      const input = "founded in 2024 , with 30 employees.";
      expect(formatForTelegram(input)).toBe("founded in 2024, with 30 employees.");
    });

    it("limits consecutive blank lines", () => {
      const input = "First paragraph.\n\n\n\n\nSecond paragraph.";
      expect(formatForTelegram(input)).toBe("First paragraph.\n\nSecond paragraph.");
    });

    it("returns empty string unchanged", () => {
      expect(formatForTelegram("")).toBe("");
    });

    it("does not strip proper nouns at end of sentences", () => {
      expect(formatForTelegram("Founded by Fredrik Sjoberg.")).toBe(
        "Founded by Fredrik Sjoberg.",
      );
      expect(formatForTelegram("The meeting is with Professor Zhang.")).toBe(
        "The meeting is with Professor Zhang.",
      );
      expect(formatForTelegram("Based in New York University.")).toBe(
        "Based in New York University.",
      );
    });
  });
});
