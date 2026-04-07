import { describe, it, expect } from "vitest";
import { slugify, uniqueSlug } from "../../src/sources/slug.js";

describe("slugify", () => {
  it("converts title to lowercase kebab-case", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips non-alphanumeric characters", () => {
    expect(slugify("What's New in TypeScript 5.0?")).toBe("whats-new-in-typescript-50");
  });

  it("collapses multiple hyphens", () => {
    expect(slugify("foo---bar")).toBe("foo-bar");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("--hello--")).toBe("hello");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("untitled");
  });
});

describe("uniqueSlug", () => {
  it("appends 6-char hash of sourceId to slug", () => {
    const result = uniqueSlug("Hello World", "https://example.com/article");
    expect(result).toMatch(/^hello-world-[a-f0-9]{6}$/);
  });

  it("produces different hashes for different sourceIds", () => {
    const a = uniqueSlug("Same Title", "source-a");
    const b = uniqueSlug("Same Title", "source-b");
    expect(a).not.toBe(b);
  });

  it("produces consistent hash for same sourceId", () => {
    const a = uniqueSlug("Title", "same-source");
    const b = uniqueSlug("Title", "same-source");
    expect(a).toBe(b);
  });
});
