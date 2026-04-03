import { describe, it, expect } from "vitest";
import { chunkMarkdown } from "../../src/embedder/chunker.js";

const SAMPLE_MD = `# Vercel AI SDK

Overview of the SDK.

## Streaming

The AI SDK supports streaming responses via ReadableStream.
This enables real-time token delivery.

### Error Handling

Streaming errors are caught via onError callback.

## Tool Calling

Tools are defined as schemas and passed to the model.

## Providers

Multiple providers supported: OpenAI, Anthropic, Google.
`;

describe("chunkMarkdown", () => {
  it("splits markdown by ## headings", () => {
    const chunks = chunkMarkdown(SAMPLE_MD, "wiki/concepts/vercel-ai-sdk.md");

    expect(chunks.length).toBeGreaterThanOrEqual(3);
    expect(chunks.some((c) => c.heading === "Streaming")).toBe(true);
    expect(chunks.some((c) => c.heading === "Tool Calling")).toBe(true);
    expect(chunks.some((c) => c.heading === "Providers")).toBe(true);
  });

  it("preserves heading breadcrumbs", () => {
    const chunks = chunkMarkdown(SAMPLE_MD, "wiki/concepts/vercel-ai-sdk.md");
    const streaming = chunks.find((c) => c.heading === "Streaming");

    expect(streaming?.breadcrumb).toBe("Vercel AI SDK → Streaming");
  });

  it("includes child headings in parent chunk content", () => {
    const chunks = chunkMarkdown(SAMPLE_MD, "wiki/concepts/vercel-ai-sdk.md");
    const streaming = chunks.find((c) => c.heading === "Streaming");

    expect(streaming?.content).toContain("Error Handling");
    expect(streaming?.content).toContain("onError callback");
  });

  it("sets filePath on all chunks", () => {
    const chunks = chunkMarkdown(SAMPLE_MD, "wiki/concepts/vercel-ai-sdk.md");

    for (const chunk of chunks) {
      expect(chunk.filePath).toBe("wiki/concepts/vercel-ai-sdk.md");
    }
  });

  it("generates unique sectionHash per chunk", () => {
    const chunks = chunkMarkdown(SAMPLE_MD, "wiki/concepts/vercel-ai-sdk.md");
    const hashes = new Set(chunks.map((c) => c.sectionHash));

    expect(hashes.size).toBe(chunks.length);
  });

  it("creates a preamble chunk for content before first ## heading", () => {
    const chunks = chunkMarkdown(SAMPLE_MD, "wiki/concepts/vercel-ai-sdk.md");
    const preamble = chunks.find((c) => c.heading === "Vercel AI SDK");

    expect(preamble).toBeDefined();
    expect(preamble?.breadcrumb).toBe("Vercel AI SDK");
    expect(preamble?.content).toContain("Overview of the SDK");
    expect(preamble?.content).not.toContain("# Vercel AI SDK");
  });

  it("handles files with no ## headings as a single chunk", () => {
    const simple = "# Simple Note\n\nJust one section with no subheadings.\n";
    const chunks = chunkMarkdown(simple, "wiki/concepts/simple.md");

    expect(chunks.length).toBe(1);
    expect(chunks[0].heading).toBe("Simple Note");
    expect(chunks[0].content).toContain("Just one section");
  });
});
