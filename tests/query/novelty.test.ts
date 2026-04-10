import { describe, it, expect } from "vitest";
import { cosineSimilarity, noveltyScore } from "../../src/query/novelty.js";

describe("cosineSimilarity", () => {
  it("returns 1 for identical vectors", () => {
    const v = [0.5, 0.5, 0.5];
    expect(cosineSimilarity(v, v)).toBeCloseTo(1, 5);
  });

  it("returns 0 for orthogonal vectors", () => {
    const a = [1, 0, 0];
    const b = [0, 1, 0];
    expect(cosineSimilarity(a, b)).toBeCloseTo(0, 5);
  });

  it("returns -1 for opposite vectors", () => {
    const a = [1, 0];
    const b = [-1, 0];
    expect(cosineSimilarity(a, b)).toBeCloseTo(-1, 5);
  });

  it("returns 0 for zero vectors", () => {
    const a = [0, 0, 0];
    const b = [1, 0, 0];
    expect(cosineSimilarity(a, b)).toBe(0);
  });
});

describe("noveltyScore", () => {
  it("returns 1.0 when no existing chunks", () => {
    const answerVec = [1, 0, 0];
    expect(noveltyScore(answerVec, [])).toBe(1.0);
  });

  it("returns low score when answer is very similar to existing chunk", () => {
    const answerVec = [0.9, 0.1, 0];
    const chunkVectors = [[0.9, 0.1, 0], [0, 0, 1]];
    const score = noveltyScore(answerVec, chunkVectors);
    expect(score).toBeLessThan(0.1);
  });

  it("returns high score when answer is dissimilar to all chunks", () => {
    const answerVec = [1, 0, 0];
    const chunkVectors = [[0, 1, 0], [0, 0, 1]];
    const score = noveltyScore(answerVec, chunkVectors);
    expect(score).toBeGreaterThan(0.9);
  });

  it("uses max similarity (worst case) for novelty", () => {
    const answerVec = [1, 0, 0];
    // One orthogonal, one partially similar
    const chunkVectors = [[0, 1, 0], [0.7, 0.7, 0]];
    const score = noveltyScore(answerVec, chunkVectors);
    // Novelty = 1 - max(cosine sim)
    // cosine([1,0,0], [0.7,0.7,0]) ≈ 0.707
    expect(score).toBeCloseTo(1 - 0.7071, 1);
  });
});
