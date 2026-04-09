import { describe, it, expect, vi } from "vitest";
import {
  handleTextMessage,
  handleVoiceMessage,
  handleStartCommand,
  handleHelpCommand,
  handleStatusCommand,
  handleSlidesCommand,
  handlePlotCommand,
  type HandlerDeps,
} from "../../src/telegram/bot.js";

function mockCtx(overrides: {
  text?: string;
  userId?: number;
  isVoice?: boolean;
}) {
  return {
    from: { id: overrides.userId ?? 123 },
    message: overrides.isVoice
      ? { voice: {} }
      : { text: overrides.text ?? "" },
    reply: vi.fn(),
  };
}

function makeDeps(overrides?: Partial<HandlerDeps>): HandlerDeps {
  return {
    allowedUserIds: [123, 456],
    vaultRoot: "/tmp/test-vault",
    token: "test-bot-token",
    config: {
      api: { default_top_k: 8 },
    } as never,
    synthesizeFn: vi.fn().mockResolvedValue({
      answer: "The answer is 42.",
      sourcePaths: [],
      chunks: [],
    }),
    ingestFn: vi.fn().mockReturnValue({
      source_id: "api/articles/test-1234.md",
      raw_path: "raw/api/articles/test-1234.md",
      ingested_at: "2026-04-08T00:00:00.000Z",
    }),
    store: { search: vi.fn() } as never,
    startTime: Date.now() - 60000,
    getHealthStatsFn: vi.fn().mockReturnValue({
      status: "ok",
      uptime_s: 60,
      lancedb_ready: true,
      wiki_article_count: 97,
      raw_pending_count: 3,
    }),
    convertAudioFn: vi.fn(),
    generateSlidesFn: vi.fn().mockResolvedValue({
      mdPath: "output/slides/test.md",
      pdfPath: "output/slides/test.pdf",
      htmlPath: "output/slides/test.html",
    }),
    generatePlotFn: vi.fn().mockResolvedValue({
      pyPath: "output/plots/test.py",
      pngPath: "output/plots/test.png",
    }),
    ...overrides,
  };
}

describe("handleTextMessage", () => {
  it("silently ignores messages from non-allowed users", async () => {
    const ctx = mockCtx({ text: "hello", userId: 999 });
    const deps = makeDeps();

    await handleTextMessage(ctx as never, deps);

    expect(ctx.reply).not.toHaveBeenCalled();
    expect(deps.ingestFn).not.toHaveBeenCalled();
    expect(deps.synthesizeFn).not.toHaveBeenCalled();
  });

  it("rejects empty messages after trim", async () => {
    const ctx = mockCtx({ text: "   \n  " });
    const deps = makeDeps();

    await handleTextMessage(ctx as never, deps);

    expect(ctx.reply).toHaveBeenCalledWith(
      "Empty message — nothing to save.",
    );
    expect(deps.ingestFn).not.toHaveBeenCalled();
  });

  it("routes ?query to synthesize and replies with answer", async () => {
    const ctx = mockCtx({ text: "?What is the meaning of life?" });
    const deps = makeDeps();

    await handleTextMessage(ctx as never, deps);

    expect(deps.synthesizeFn).toHaveBeenCalledWith(
      "What is the meaning of life?",
      deps.store,
      8,
    );
    expect(ctx.reply).toHaveBeenCalledWith("The answer is 42.");
  });

  it("ingests plain text and replies with confirmation", async () => {
    const ctx = mockCtx({ text: "TIL: Kubernetes uses etcd for state" });
    const deps = makeDeps();

    await handleTextMessage(ctx as never, deps);

    expect(deps.ingestFn).toHaveBeenCalledWith({
      content: "TIL: Kubernetes uses etcd for state",
      source: "telegram",
      vaultRoot: "/tmp/test-vault",
    });
    expect(ctx.reply).toHaveBeenCalledWith(
      "Saved. (api/articles/test-1234.md)",
    );
  });

  it("replies with error message when synthesis fails", async () => {
    const ctx = mockCtx({ text: "?broken query" });
    const deps = makeDeps({
      synthesizeFn: vi.fn().mockRejectedValue(new Error("API down")),
    });

    await handleTextMessage(ctx as never, deps);

    expect(ctx.reply).toHaveBeenCalledWith(
      "Synthesis failed — try again later.",
    );
  });

  it("replies with error message when ingest fails", async () => {
    const ctx = mockCtx({ text: "some knowledge" });
    const deps = makeDeps({
      ingestFn: vi.fn().mockImplementation(() => {
        throw new Error("disk full");
      }),
    });

    await handleTextMessage(ctx as never, deps);

    expect(ctx.reply).toHaveBeenCalledWith(
      "Failed to save — try again later.",
    );
  });

  it("truncates long synthesis answers at sentence boundary", async () => {
    const longAnswer = "A".repeat(2000) + ". " + "B".repeat(2000) + ". " + "C".repeat(2000) + ".";
    const ctx = mockCtx({ text: "?long question" });
    const deps = makeDeps({
      synthesizeFn: vi.fn().mockResolvedValue({
        answer: longAnswer,
        sourcePaths: [],
        chunks: [],
      }),
    });

    await handleTextMessage(ctx as never, deps);

    const reply = ctx.reply.mock.calls[0][0] as string;
    expect(reply.length).toBeLessThanOrEqual(4099); // 4096 + "..."
    expect(reply.endsWith("...")).toBe(true);
  });
});

describe("handleVoiceMessage", () => {
  it("silently ignores voice from non-allowed users", async () => {
    const ctx = mockCtx({ isVoice: true, userId: 999 });
    const deps = makeDeps();
    await handleVoiceMessage(ctx as never, deps);
    expect(ctx.reply).not.toHaveBeenCalled();
  });

  it("downloads voice file via Telegram API and calls convert", async () => {
    const mockFetchFile = vi.fn().mockResolvedValue(new ArrayBuffer(100));
    const ctx = {
      from: { id: 123 },
      message: { voice: { file_id: "abc123", duration: 5 } },
      reply: vi.fn(),
      getFile: vi.fn().mockResolvedValue({ file_path: "voice/file_0.oga" }),
    };
    const mockConvert = vi.fn().mockResolvedValue("/tmp/vault/raw/voice/12345.wav");
    const deps = makeDeps({ convertAudioFn: mockConvert, fetchFileFn: mockFetchFile });
    await handleVoiceMessage(ctx as never, deps);
    expect(ctx.getFile).toHaveBeenCalled();
    expect(mockFetchFile).toHaveBeenCalledWith(
      "https://api.telegram.org/file/bottest-bot-token/voice/file_0.oga",
    );
    expect(mockConvert).toHaveBeenCalled();
    expect(ctx.reply).toHaveBeenCalledWith("Transcribed (processing via voice pipeline)");
  });

  it("replies with error on conversion failure", async () => {
    const ctx = {
      from: { id: 123 },
      message: { voice: { file_id: "abc123", duration: 5 } },
      reply: vi.fn(),
      getFile: vi.fn().mockRejectedValue(new Error("Download failed")),
    };
    const deps = makeDeps();
    await handleVoiceMessage(ctx as never, deps);
    expect(ctx.reply).toHaveBeenCalledWith("Voice processing failed — try again later.");
  });
});

describe("handleStartCommand", () => {
  it("replies with welcome message", async () => {
    const ctx = mockCtx({});
    const deps = makeDeps();

    await handleStartCommand(ctx as never, deps);

    const reply = ctx.reply.mock.calls[0][0] as string;
    expect(reply).toContain("Brain");
    expect(reply).toContain("?");
  });
});

describe("handleHelpCommand", () => {
  it("replies with usage instructions", async () => {
    const ctx = mockCtx({});
    const deps = makeDeps();

    await handleHelpCommand(ctx as never, deps);

    const reply = ctx.reply.mock.calls[0][0] as string;
    expect(reply).toContain("?");
    expect(reply).toContain("ingest");
  });
});

describe("handleStatusCommand", () => {
  it("formats health stats into readable message", async () => {
    const ctx = mockCtx({});
    const deps = makeDeps();

    await handleStatusCommand(ctx as never, deps);

    const reply = ctx.reply.mock.calls[0][0] as string;
    expect(reply).toContain("97");
    expect(reply).toContain("ok");
  });
});

describe("handleSlidesCommand", () => {
  it("silently ignores non-allowed users", async () => {
    const ctx = mockCtx({ text: "/slides Brain overview", userId: 999 });
    const deps = makeDeps();
    await handleSlidesCommand(ctx as never, deps);
    expect(ctx.reply).not.toHaveBeenCalled();
  });

  it("replies with error if no topic provided", async () => {
    const ctx = mockCtx({ text: "/slides" });
    const deps = makeDeps();
    await handleSlidesCommand(ctx as never, deps);
    expect(ctx.reply).toHaveBeenCalledWith("Usage: /slides <topic>");
  });

  it("sends Generating message then delivers PDF path", async () => {
    const ctx = {
      from: { id: 123 },
      message: { text: "/slides Brain overview" },
      reply: vi.fn(),
      replyWithDocument: vi.fn(),
    };
    const deps = makeDeps();
    await handleSlidesCommand(ctx as never, deps);
    expect(ctx.reply).toHaveBeenCalledWith("Generating slides...");
    expect(ctx.replyWithDocument).toHaveBeenCalled();
  });

  it("replies with error on generation failure", async () => {
    const ctx = {
      from: { id: 123 },
      message: { text: "/slides Bad topic" },
      reply: vi.fn(),
      replyWithDocument: vi.fn(),
    };
    const deps = makeDeps({
      generateSlidesFn: vi.fn().mockRejectedValue(new Error("marp-cli failed")),
    });
    await handleSlidesCommand(ctx as never, deps);
    expect(ctx.reply).toHaveBeenCalledWith("Generating slides...");
    expect(ctx.reply).toHaveBeenCalledWith("Generation failed — check logs.");
  });
});

describe("handlePlotCommand", () => {
  it("replies with error if no description provided", async () => {
    const ctx = mockCtx({ text: "/plot" });
    const deps = makeDeps();
    await handlePlotCommand(ctx as never, deps);
    expect(ctx.reply).toHaveBeenCalledWith("Usage: /plot <description>");
  });

  it("sends Generating message then delivers PNG", async () => {
    const ctx = {
      from: { id: 123 },
      message: { text: "/plot brain stats" },
      reply: vi.fn(),
      replyWithPhoto: vi.fn(),
    };
    const deps = makeDeps();
    await handlePlotCommand(ctx as never, deps);
    expect(ctx.reply).toHaveBeenCalledWith("Generating plot...");
    expect(ctx.replyWithPhoto).toHaveBeenCalled();
  });

  it("replies with error on generation failure", async () => {
    const ctx = {
      from: { id: 123 },
      message: { text: "/plot broken" },
      reply: vi.fn(),
      replyWithPhoto: vi.fn(),
    };
    const deps = makeDeps({
      generatePlotFn: vi.fn().mockRejectedValue(new Error("uv run failed")),
    });
    await handlePlotCommand(ctx as never, deps);
    expect(ctx.reply).toHaveBeenCalledWith("Generating plot...");
    expect(ctx.reply).toHaveBeenCalledWith("Generation failed — check logs.");
  });
});
