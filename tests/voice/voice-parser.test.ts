import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseVoice } from "../../src/voice/voice-parser.js";
import type { TranscriptionProvider } from "../../src/voice/transcribe.js";

const tmpDir = join(import.meta.dirname, ".tmp-voice-parser-test");

beforeEach(() => {
  mkdirSync(join(tmpDir, "raw", "voice"), { recursive: true });
});

afterEach(() => {
  rmSync(tmpDir, { recursive: true, force: true });
});

function mockProvider(text: string = "Hello world"): TranscriptionProvider {
  return {
    transcribe: vi.fn().mockResolvedValue({ text, language: "en", duration_s: 5.2 }),
  };
}

function mockClassify(cluster: string = "personal", fallback: boolean = false) {
  return vi.fn().mockResolvedValue({ cluster, text: "Hello world", fallback });
}

describe("parseVoice", () => {
  it("skips if .processed sidecar exists", async () => {
    const audioPath = join(tmpDir, "raw", "voice", "1234.wav");
    writeFileSync(audioPath, "fake-audio");
    writeFileSync(audioPath + ".processed", "");
    const provider = mockProvider();
    const classify = mockClassify();
    await parseVoice(audioPath, tmpDir, provider, classify);
    expect(provider.transcribe).not.toHaveBeenCalled();
  });

  it("transcribes audio and writes markdown drop to raw/{cluster}/", async () => {
    const audioPath = join(tmpDir, "raw", "voice", "1234.wav");
    writeFileSync(audioPath, "fake-audio");
    const provider = mockProvider("Work: Brain Phase 4 going well");
    const classify = mockClassify("work");
    await parseVoice(audioPath, tmpDir, provider, classify);

    const workDir = join(tmpDir, "raw", "work");
    expect(existsSync(workDir)).toBe(true);
    // List files in work dir
    const { readdirSync } = await import("node:fs");
    const files = readdirSync(workDir).filter(f => f.endsWith(".md"));
    expect(files.length).toBe(1);
    expect(files[0]).toMatch(/^voice-.*\.md$/);
    const mdContent = readFileSync(join(workDir, files[0]), "utf-8");
    expect(mdContent).toContain("status: pending");
    expect(mdContent).toContain("source_type: voice");
    expect(mdContent).toContain("cluster: work");
  });

  it("creates .processed sidecar after successful transcription", async () => {
    const audioPath = join(tmpDir, "raw", "voice", "1234.wav");
    writeFileSync(audioPath, "fake-audio");
    await parseVoice(audioPath, tmpDir, mockProvider(), mockClassify());
    expect(existsSync(audioPath + ".processed")).toBe(true);
  });

  it("sets classification_fallback: true when classification falls back", async () => {
    const audioPath = join(tmpDir, "raw", "voice", "5678.wav");
    writeFileSync(audioPath, "fake-audio");
    await parseVoice(audioPath, tmpDir, mockProvider(), mockClassify("personal", true));
    const personalDir = join(tmpDir, "raw", "personal");
    const { readdirSync } = await import("node:fs");
    const files = readdirSync(personalDir).filter(f => f.endsWith(".md"));
    const mdContent = readFileSync(join(personalDir, files[0]), "utf-8");
    expect(mdContent).toContain("classification_fallback: true");
  });

  it("does not create sidecar on transcription failure", async () => {
    const audioPath = join(tmpDir, "raw", "voice", "bad.wav");
    writeFileSync(audioPath, "fake-audio");
    const failProvider: TranscriptionProvider = {
      transcribe: vi.fn().mockRejectedValue(new Error("whisper crashed")),
    };
    await expect(
      parseVoice(audioPath, tmpDir, failProvider, mockClassify()),
    ).rejects.toThrow("whisper crashed");
    expect(existsSync(audioPath + ".processed")).toBe(false);
  });

  describe("timesheet prefix detection", () => {
    it("routes transcripts starting with 'timesheet' to the nl hook and does NOT write a voice drop", async () => {
      const audioPath = join(tmpDir, "raw", "voice", "ts1.wav");
      writeFileSync(audioPath, "fake-audio");
      const provider: TranscriptionProvider = {
        transcribe: vi.fn().mockResolvedValue({ text: "timesheet 2 hours maison coding from 3 to 5 PM yesterday" }),
      };
      const classify = vi.fn();
      const nlHook = vi.fn().mockResolvedValue(undefined);

      await parseVoice(audioPath, tmpDir, provider, classify, { onTimesheetNL: nlHook });

      expect(nlHook).toHaveBeenCalledOnce();
      expect(nlHook.mock.calls[0][0]).toBe("2 hours maison coding from 3 to 5 PM yesterday");
      expect(classify).not.toHaveBeenCalled();
      // No cluster drop written
      expect(existsSync(join(tmpDir, "raw", "work"))).toBe(false);
      // Sidecar IS written so we don't re-process
      expect(existsSync(audioPath + ".processed")).toBe(true);
    });

    it("routes 'log time' prefix the same way", async () => {
      const audioPath = join(tmpDir, "raw", "voice", "ts2.wav");
      writeFileSync(audioPath, "fake-audio");
      const provider: TranscriptionProvider = {
        transcribe: vi.fn().mockResolvedValue({ text: "log time: 1 hour wilbo meeting" }),
      };
      const classify = vi.fn();
      const nlHook = vi.fn().mockResolvedValue(undefined);

      await parseVoice(audioPath, tmpDir, provider, classify, { onTimesheetNL: nlHook });

      expect(nlHook).toHaveBeenCalledOnce();
      expect(nlHook.mock.calls[0][0]).toBe("1 hour wilbo meeting");
    });

    it("falls through to cluster classifier when no prefix", async () => {
      const audioPath = join(tmpDir, "raw", "voice", "ts3.wav");
      writeFileSync(audioPath, "fake-audio");
      const provider: TranscriptionProvider = {
        transcribe: vi.fn().mockResolvedValue({ text: "just brainstorming some product ideas" }),
      };
      const classify = vi.fn().mockResolvedValue({
        cluster: "work",
        text: "just brainstorming some product ideas",
        fallback: false,
      });
      const nlHook = vi.fn().mockResolvedValue(undefined);

      await parseVoice(audioPath, tmpDir, provider, classify, { onTimesheetNL: nlHook });

      expect(nlHook).not.toHaveBeenCalled();
      expect(classify).toHaveBeenCalledOnce();
      expect(existsSync(join(tmpDir, "raw", "work"))).toBe(true);
    });

    it("prefix detection still works without the opts param (backwards compatibility)", async () => {
      const audioPath = join(tmpDir, "raw", "voice", "ts4.wav");
      writeFileSync(audioPath, "fake-audio");
      const provider: TranscriptionProvider = {
        transcribe: vi.fn().mockResolvedValue({ text: "timesheet 1h maison" }),
      };
      const classify = vi.fn().mockResolvedValue({ cluster: "work", text: "timesheet 1h maison", fallback: false });

      // No opts.onTimesheetNL — should fall through to classifier
      await parseVoice(audioPath, tmpDir, provider, classify);

      expect(classify).toHaveBeenCalledOnce();
    });
  });
});
