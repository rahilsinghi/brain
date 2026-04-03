import { describe, it, expect } from "vitest";
import { classifyDocument } from "../../src/compiler/token-guard.js";

describe("classifyDocument", () => {
  it("returns 'single' for documents under 5K words", () => {
    const text = "word ".repeat(3000);
    expect(classifyDocument(text, { maxSingle: 5000, maxChunked: 20000, maxStaged: 100000 })).toBe("single");
  });

  it("returns 'chunked' for documents between 5K and 20K words", () => {
    const text = "word ".repeat(10000);
    expect(classifyDocument(text, { maxSingle: 5000, maxChunked: 20000, maxStaged: 100000 })).toBe("chunked");
  });

  it("returns 'staged' for documents between 20K and 100K words", () => {
    const text = "word ".repeat(50000);
    expect(classifyDocument(text, { maxSingle: 5000, maxChunked: 20000, maxStaged: 100000 })).toBe("staged");
  });

  it("returns 'manual_review' for documents over 100K words", () => {
    const text = "word ".repeat(110000);
    expect(classifyDocument(text, { maxSingle: 5000, maxChunked: 20000, maxStaged: 100000 })).toBe("manual_review");
  });

  it("handles edge case at exact boundary (5000 words = single)", () => {
    const text = "word ".repeat(5000);
    expect(classifyDocument(text, { maxSingle: 5000, maxChunked: 20000, maxStaged: 100000 })).toBe("single");
  });
});
