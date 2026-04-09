import { describe, it, expect, vi } from "vitest";
import { LocalWhisperProvider, OpenAIWhisperProvider } from "../../src/voice/transcribe.js";

describe("LocalWhisperProvider", () => {
  it("calls whisper-cpp with correct args and returns transcription", async () => {
    const mockExec = vi.fn().mockResolvedValue({
      stdout: "Hello this is a voice note",
      stderr: "",
      exitCode: 0,
    });
    const provider = new LocalWhisperProvider("medium", mockExec);
    const result = await provider.transcribe("/tmp/test.wav");
    expect(result.text).toBe("Hello this is a voice note");
    expect(mockExec).toHaveBeenCalledWith(
      expect.arrayContaining(["-m", "medium", "-f", "/tmp/test.wav"]),
    );
  });

  it("throws on non-zero exit code", async () => {
    const mockExec = vi.fn().mockResolvedValue({
      stdout: "",
      stderr: "Model not found",
      exitCode: 1,
    });
    const provider = new LocalWhisperProvider("medium", mockExec);
    await expect(provider.transcribe("/tmp/test.wav")).rejects.toThrow("whisper-cpp failed");
  });
});

describe("OpenAIWhisperProvider", () => {
  it("calls OpenAI API and returns transcription", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ text: "Transcribed text from OpenAI" }),
    });
    const provider = new OpenAIWhisperProvider("whisper-1", "sk-test-key", mockFetch);
    const result = await provider.transcribe("/tmp/test.wav");
    expect(result.text).toBe("Transcribed text from OpenAI");
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.openai.com/v1/audio/transcriptions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer sk-test-key" }),
      }),
    );
  });

  it("throws on non-ok response", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: () => Promise.resolve("Unauthorized"),
    });
    const provider = new OpenAIWhisperProvider("whisper-1", "sk-test-key", mockFetch);
    await expect(provider.transcribe("/tmp/test.wav")).rejects.toThrow(
      "OpenAI Whisper API error (401)",
    );
  });
});
