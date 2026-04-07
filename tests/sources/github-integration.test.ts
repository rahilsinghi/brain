import { describe, it, expect } from "vitest";
import { createGithubSource } from "../../src/sources/github.js";

describe("GitHub source integration", () => {
  it("createGithubSource returns a valid SyncSource", () => {
    const source = createGithubSource({
      execGh: async () => "[]",
    });

    expect(source.name).toBe("github");
    expect(typeof source.poll).toBe("function");
  });
});
