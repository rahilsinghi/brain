import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatChunksForPrompt } from "../../src/query/synthesize.js";
import type { WikiChunk } from "../../src/types.js";

describe("formatChunksForPrompt", () => {
  const mockChunks: WikiChunk[] = [
    {
      id: "f1::Streaming",
      filePath: "wiki/concepts/vercel-ai-sdk.md",
      breadcrumb: "Vercel AI SDK → Streaming",
      heading: "Streaming",
      content: "The AI SDK supports streaming responses.",
      sectionHash: "abc",
    },
    {
      id: "f2::SSE",
      filePath: "wiki/concepts/sse.md",
      breadcrumb: "SSE → Overview",
      heading: "Overview",
      content: "Server-Sent Events enable real-time communication.",
      sectionHash: "def",
    },
  ];

  it("formats chunks into a context string with file paths and breadcrumbs", () => {
    const result = formatChunksForPrompt(mockChunks);

    expect(result).toContain("wiki/concepts/vercel-ai-sdk.md");
    expect(result).toContain("Vercel AI SDK → Streaming");
    expect(result).toContain("streaming responses");
    expect(result).toContain("wiki/concepts/sse.md");
  });

  it("assembleContext returns empty string for no chunks", () => {
    const result = formatChunksForPrompt([]);
    expect(result).toBe("");
  });
});

describe("synthesize", () => {
  it("is exported and callable", async () => {
    const { synthesize } = await import("../../src/query/synthesize.js");
    expect(typeof synthesize).toBe("function");
  });
});
