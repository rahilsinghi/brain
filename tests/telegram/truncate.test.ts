import { describe, it, expect } from "vitest";
import { truncateAtSentence } from "../../src/telegram/truncate.js";

describe("truncateAtSentence", () => {
  it("returns short text unchanged", () => {
    expect(truncateAtSentence("Hello world.", 4096)).toBe("Hello world.");
  });

  it("truncates at last sentence boundary before limit", () => {
    const text = "First sentence. Second sentence. Third sentence.";
    const result = truncateAtSentence(text, 35);
    expect(result).toBe("First sentence. Second sentence....");
  });

  it("truncates at exclamation mark boundary", () => {
    const text = "Wow! That is amazing! And more content here that goes on.";
    const result = truncateAtSentence(text, 25);
    expect(result).toBe("Wow! That is amazing!...");
  });

  it("truncates at question mark boundary", () => {
    const text = "Is it working? Yes it is. More text follows here.";
    const result = truncateAtSentence(text, 20);
    expect(result).toBe("Is it working?...");
  });

  it("falls back to hard cut when no sentence boundary found", () => {
    const text = "A very long word " + "x".repeat(4096);
    const result = truncateAtSentence(text, 50);
    expect(result.length).toBeLessThanOrEqual(53); // 50 + "..."
    expect(result.endsWith("...")).toBe(true);
  });

  it("handles exact limit length", () => {
    const text = "Exactly this.";
    expect(truncateAtSentence(text, text.length)).toBe(text);
  });

  it("handles empty string", () => {
    expect(truncateAtSentence("", 4096)).toBe("");
  });
});
