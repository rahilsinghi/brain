import { describe, it, expect, vi } from "vitest";
import { classifyCluster, detectPrefix } from "../../src/voice/classify.js";
import type { Cluster } from "../../src/types.js";

describe("detectPrefix", () => {
  it("detects 'Personal:' prefix", () => {
    const result = detectPrefix("Personal: I had a great day today");
    expect(result).toEqual({ cluster: "personal", text: "I had a great day today" });
  });

  it("detects 'Work,' prefix", () => {
    const result = detectPrefix("Work, the sprint planning went well");
    expect(result).toEqual({ cluster: "work", text: "the sprint planning went well" });
  });

  it("detects 'Life:' prefix", () => {
    const result = detectPrefix("Life: Found a great coffee shop");
    expect(result).toEqual({ cluster: "life", text: "Found a great coffee shop" });
  });

  it("detects 'Language:' prefix", () => {
    const result = detectPrefix("Language: I keep saying basically");
    expect(result).toEqual({ cluster: "language", text: "I keep saying basically" });
  });

  it("detects 'Tone:' prefix as language cluster", () => {
    const result = detectPrefix("Tone: My emails sound too formal");
    expect(result).toEqual({ cluster: "language", text: "My emails sound too formal" });
  });

  it("returns null for no prefix", () => {
    const result = detectPrefix("Just a regular thought about stuff");
    expect(result).toBeNull();
  });

  it("is case-insensitive", () => {
    const result = detectPrefix("PERSONAL: shouting thoughts");
    expect(result).toEqual({ cluster: "personal", text: "shouting thoughts" });
  });
});

describe("classifyCluster", () => {
  it("uses prefix when detected", async () => {
    const mockClaude = vi.fn();
    const result = await classifyCluster("Work: brain phase 4", {
      clusters: ["personal", "work", "life", "language"],
      defaultCluster: "personal",
      classifyModel: "claude-haiku-4-5-20251001",
      callClaude: mockClaude,
    });
    expect(result).toEqual({ cluster: "work", text: "brain phase 4", fallback: false });
    expect(mockClaude).not.toHaveBeenCalled();
  });

  it("calls Claude when no prefix detected", async () => {
    const mockClaude = vi.fn().mockResolvedValue("life");
    const result = await classifyCluster("Found a great coffee shop on 7th", {
      clusters: ["personal", "work", "life", "language"],
      defaultCluster: "personal",
      classifyModel: "claude-haiku-4-5-20251001",
      callClaude: mockClaude,
    });
    expect(result).toEqual({ cluster: "life", text: "Found a great coffee shop on 7th", fallback: false });
    expect(mockClaude).toHaveBeenCalledWith(
      expect.stringContaining("Found a great coffee shop"),
      "claude-haiku-4-5-20251001",
    );
  });

  it("falls back to default_cluster on Claude error", async () => {
    const mockClaude = vi.fn().mockRejectedValue(new Error("API timeout"));
    const result = await classifyCluster("Some ambiguous thought", {
      clusters: ["personal", "work", "life", "language"],
      defaultCluster: "personal",
      classifyModel: "claude-haiku-4-5-20251001",
      callClaude: mockClaude,
    });
    expect(result).toEqual({ cluster: "personal", text: "Some ambiguous thought", fallback: true });
  });

  it("falls back when Claude returns invalid cluster name", async () => {
    const mockClaude = vi.fn().mockResolvedValue("cooking");
    const result = await classifyCluster("My favorite recipe", {
      clusters: ["personal", "work", "life", "language"],
      defaultCluster: "personal",
      classifyModel: "claude-haiku-4-5-20251001",
      callClaude: mockClaude,
    });
    expect(result).toEqual({ cluster: "personal", text: "My favorite recipe", fallback: true });
  });
});
