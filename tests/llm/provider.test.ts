import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock both SDKs
vi.mock("@anthropic-ai/sdk", () => {
  return {
    default: class MockAnthropic {
      messages = {
        create: vi.fn().mockResolvedValue({
          content: [{ type: "text", text: "anthropic response" }],
          usage: { input_tokens: 10, output_tokens: 5 },
        }),
      };
      constructor() {}
    },
  };
});

vi.mock("@google-cloud/vertexai", () => {
  return {
    VertexAI: class MockVertexAI {
      getGenerativeModel() {
        return {
          generateContent: vi.fn().mockResolvedValue({
            response: {
              candidates: [{ content: { parts: [{ text: "gemini response" }] } }],
              usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 5 },
            },
          }),
        };
      }
      constructor() {}
    },
  };
});

import { getProvider, generate, _resetProviders } from "../../src/llm/provider.js";

describe("LLM Provider", () => {
  const origEnv = { ...process.env };

  beforeEach(() => {
    _resetProviders();
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env = { ...origEnv };
  });

  it("returns anthropic provider when API key is set", () => {
    process.env.ANTHROPIC_API_KEY = "test-key";
    delete process.env.GEMINI_API_KEY_1;
    delete process.env.GEMINI_API_KEY_2;
    const provider = getProvider("anthropic");
    expect(provider.name).toBe("anthropic");
  });

  it("returns gemini provider (Vertex AI always available with default project)", () => {
    delete process.env.ANTHROPIC_API_KEY;
    const provider = getProvider("gemini");
    expect(provider.name).toBe("gemini");
  });

  it("auto mode prefers gemini (Vertex AI) when available", () => {
    process.env.ANTHROPIC_API_KEY = "test-key";
    const provider = getProvider("auto");
    expect(provider.name).toBe("gemini");
  });

  it("auto mode falls back to gemini when no anthropic key", () => {
    delete process.env.ANTHROPIC_API_KEY;
    const provider = getProvider("auto");
    expect(provider.name).toBe("gemini");
  });

  it("throws when anthropic explicitly requested but no key", () => {
    delete process.env.ANTHROPIC_API_KEY;
    expect(() => getProvider("anthropic")).toThrow("Anthropic API key not configured");
  });

  it("generate returns response from anthropic provider", async () => {
    process.env.ANTHROPIC_API_KEY = "test-key";
    const result = await generate({ prompt: "test" }, "anthropic");
    expect(result.provider).toBe("anthropic");
    expect(result.text).toBe("anthropic response");
    expect(result.inputTokens).toBe(10);
    expect(result.outputTokens).toBe(5);
  });

  it("generate returns response from gemini provider", async () => {
    const result = await generate({ prompt: "test" }, "gemini");
    expect(result.provider).toBe("gemini");
    expect(result.text).toBe("gemini response");
  });

  it("reads BRAIN_LLM_PROVIDER env var as default preference", () => {
    process.env.ANTHROPIC_API_KEY = "test-key";
    process.env.BRAIN_LLM_PROVIDER = "gemini";
    const provider = getProvider();
    expect(provider.name).toBe("gemini");
  });
});
