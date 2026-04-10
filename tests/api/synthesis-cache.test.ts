import { describe, it, expect } from "vitest";
import {
  cacheSynthesis,
  getCachedSynthesis,
} from "../../src/api/synthesis-cache.js";
import type { SynthesisResult } from "../../src/query/synthesize.js";

function makeSynthesis(answer = "test answer"): SynthesisResult {
  return {
    answer,
    sourcePaths: ["wiki/test.md"],
    chunks: [],
    provider: "test",
    model: "test",
    novelty_score: 0.9,
  };
}

describe("synthesis-cache", () => {
  it("stores and retrieves a synthesis result", () => {
    const result = makeSynthesis();
    cacheSynthesis("q1", "test query", result);
    const cached = getCachedSynthesis("q1");
    expect(cached).toBeDefined();
    expect(cached!.result.answer).toBe("test answer");
    expect(cached!.query).toBe("test query");
  });

  it("returns undefined for unknown query_id", () => {
    expect(getCachedSynthesis("nonexistent")).toBeUndefined();
  });

  it("overwrites existing entry with same query_id", () => {
    cacheSynthesis("q2", "first", makeSynthesis("first"));
    cacheSynthesis("q2", "second", makeSynthesis("second"));
    const cached = getCachedSynthesis("q2");
    expect(cached!.result.answer).toBe("second");
  });
});
