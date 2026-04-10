import { describe, it, expect, vi } from "vitest";
import { pushGraphToRepo } from "../../src/graph/push.js";
import type { GraphCache } from "../../src/types.js";

describe("pushGraphToRepo", () => {
  it("writes graph.json and runs git commands", async () => {
    const mockCache: GraphCache = {
      generated_at: "2026-04-10T00:00:00Z",
      node_count: 1,
      nodes: [
        {
          id: "a.md",
          title: "A",
          tags: [],
          category: "projects",
          source_type: "ai",
          created_at: "2026-04-10",
          connection_count: 0,
          x: 0,
          y: 0,
          z: 0,
        },
      ],
      links: [],
    };

    const commands: { cmd: string; cwd: string }[] = [];
    const mockExec = vi.fn().mockImplementation((cmd: string, cwd: string) => {
      commands.push({ cmd, cwd });
      if (cmd.includes("rev-parse")) return "abc123\n";
      return "";
    });

    const result = await pushGraphToRepo(
      mockCache,
      "/tmp/test-repo",
      mockExec,
    );

    expect(result.status).toBe("pushed");
    expect(result.node_count).toBe(1);
    expect(result.commit_sha).toBe("abc123");
    expect(commands.some((c) => c.cmd.includes("git add"))).toBe(true);
    expect(commands.some((c) => c.cmd.includes("git commit"))).toBe(true);
    expect(commands.some((c) => c.cmd.includes("git push"))).toBe(true);
    expect(commands.every((c) => c.cwd === "/tmp/test-repo")).toBe(true);
  });
});
