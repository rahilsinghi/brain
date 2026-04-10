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

vi.mock("@google/generative-ai", () => {
  return {
    GoogleGenerativeAI: class MockGoogleAI {
      getGenerativeModel() {
        return {
          generateContent: vi.fn().mockResolvedValue({
            response: {
              text: () => "gemini response",
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

  it("returns gemini provider when keys are set", () => {
    delete process.env.ANTHROPIC_API_KEY;
    process.env.GEMINI_API_KEY_1 = "test-gemini-key";
    const provider = getProvider("gemini");
    expect(provider.name).toBe("gemini");
  });

  it("auto mode prefers anthropic when available", () => {
    process.env.ANTHROPIC_API_KEY = "test-key";
    process.env.GEMINI_API_KEY_1 = "test-gemini-key";
    const provider = getProvider("auto");
    expect(provider.name).toBe("anthropic");
  });

  it("auto mode falls back to gemini when no anthropic key", () => {
    delete process.env.ANTHROPIC_API_KEY;
    process.env.GEMINI_API_KEY_1 = "test-gemini-key";
    const provider = getProvider("auto");
    expect(provider.name).toBe("gemini");
  });

  it("throws when no provider is available", () => {
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.GEMINI_API_KEY_1;
    delete process.env.GEMINI_API_KEY_2;
    expect(() => getProvider("auto")).toThrow("No LLM provider configured");
  });

  it("throws when requesting unavailable specific provider", () => {
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
    process.env.GEMINI_API_KEY_1 = "test-key";
    const result = await generate({ prompt: "test" }, "gemini");
    expect(result.provider).toBe("gemini");
    expect(result.text).toBe("gemini response");
  });

  it("reads BRAIN_LLM_PROVIDER env var as default preference", () => {
    process.env.ANTHROPIC_API_KEY = "test-key";
    process.env.GEMINI_API_KEY_1 = "test-gemini-key";
    process.env.BRAIN_LLM_PROVIDER = "gemini";
    const provider = getProvider();
    expect(provider.name).toBe("gemini");
  });
});
