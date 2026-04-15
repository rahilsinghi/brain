import { describe, it, expect } from "vitest";
import { classifyMessage, getAckMessage } from "../src/webhook.js";

describe("classifyMessage", () => {
  describe("timesheet_reply — replyToOutboundId is set", () => {
    it("returns timesheet_reply with reply_to_queue_id", () => {
      const result = classifyMessage("some text", "outbound-123");
      expect(result.type).toBe("timesheet_reply");
      expect(result.reply_to_queue_id).toBe("outbound-123");
    });

    it("ignores text content when replyToOutboundId is set", () => {
      const result = classifyMessage("?what is Karen", "outbound-abc");
      expect(result.type).toBe("timesheet_reply");
      expect(result.reply_to_queue_id).toBe("outbound-abc");
    });
  });

  describe("query — text starts with ?", () => {
    it("classifies ?what is Karen as query", () => {
      const result = classifyMessage("?what is Karen", null);
      expect(result.type).toBe("query");
    });

    it("classifies ? alone as query", () => {
      const result = classifyMessage("?", null);
      expect(result.type).toBe("query");
    });
  });

  describe("timesheet_entry — matches +Nh pattern", () => {
    it("classifies +2h maison coding fix as timesheet_entry", () => {
      const result = classifyMessage("+2h maison coding fix", null);
      expect(result.type).toBe("timesheet_entry");
    });

    it("classifies +0.5h maison meeting standup as timesheet_entry", () => {
      const result = classifyMessage("+0.5h maison meeting standup", null);
      expect(result.type).toBe("timesheet_entry");
    });

    it("classifies +10h with description as timesheet_entry", () => {
      const result = classifyMessage("+10h wilbo some task", null);
      expect(result.type).toBe("timesheet_entry");
    });

    it("does not classify +2h with no trailing space/description", () => {
      // must match ^\+\d+(?:\.\d+)?h\s — needs space after h
      const result = classifyMessage("+2h", null);
      expect(result.type).toBe("ingest");
    });
  });

  describe("timesheet_command — slash commands", () => {
    it("classifies /ts as timesheet_command with command 'ts'", () => {
      const result = classifyMessage("/ts", null);
      expect(result.type).toBe("timesheet_command");
      expect(result.command).toBe("ts");
    });

    it("classifies /ts today as timesheet_command with command 'ts'", () => {
      const result = classifyMessage("/ts today", null);
      expect(result.type).toBe("timesheet_command");
      expect(result.command).toBe("ts");
    });

    it("classifies /eod as timesheet_command with command 'eod'", () => {
      const result = classifyMessage("/eod", null);
      expect(result.type).toBe("timesheet_command");
      expect(result.command).toBe("eod");
    });

    it("classifies /finalize as timesheet_command with command 'finalize'", () => {
      const result = classifyMessage("/finalize", null);
      expect(result.type).toBe("timesheet_command");
      expect(result.command).toBe("finalize");
    });

    it("classifies /invoice maison april as timesheet_command with command 'invoice'", () => {
      const result = classifyMessage("/invoice maison april", null);
      expect(result.type).toBe("timesheet_command");
      expect(result.command).toBe("invoice");
    });

    it("classifies /start as timesheet_command with command 'start'", () => {
      const result = classifyMessage("/start", null);
      expect(result.type).toBe("timesheet_command");
      expect(result.command).toBe("start");
    });

    it("classifies /help as timesheet_command with command 'help'", () => {
      const result = classifyMessage("/help", null);
      expect(result.type).toBe("timesheet_command");
      expect(result.command).toBe("help");
    });

    it("classifies /status as timesheet_command with command 'status'", () => {
      const result = classifyMessage("/status", null);
      expect(result.type).toBe("timesheet_command");
      expect(result.command).toBe("status");
    });

    it("classifies /slides as timesheet_command with command 'slides'", () => {
      const result = classifyMessage("/slides some topic", null);
      expect(result.type).toBe("timesheet_command");
      expect(result.command).toBe("slides");
    });

    it("classifies /plot as timesheet_command with command 'plot'", () => {
      const result = classifyMessage("/plot some description", null);
      expect(result.type).toBe("timesheet_command");
      expect(result.command).toBe("plot");
    });
  });

  describe("ingest — fallthrough", () => {
    it("classifies plain text as ingest", () => {
      const result = classifyMessage("Remember this fact", null);
      expect(result.type).toBe("ingest");
    });

    it("classifies empty string as ingest", () => {
      const result = classifyMessage("", null);
      expect(result.type).toBe("ingest");
    });

    it("classifies unknown slash command as ingest", () => {
      const result = classifyMessage("/unknown", null);
      expect(result.type).toBe("ingest");
    });
  });
});

describe("getAckMessage", () => {
  it("returns correct ack for ingest", () => {
    expect(getAckMessage("ingest")).toBe("⏳ Queued for ingestion");
  });

  it("returns correct ack for query", () => {
    expect(getAckMessage("query")).toBe(
      "🔍 Queued — will answer when brain is online",
    );
  });

  it("returns correct ack for voice", () => {
    expect(getAckMessage("voice")).toBe(
      "🎤 Saved — will transcribe when brain is online",
    );
  });

  it("returns correct ack for audio", () => {
    expect(getAckMessage("audio")).toBe(
      "🎤 Saved — will transcribe when brain is online",
    );
  });

  it("returns correct ack for timesheet_entry", () => {
    expect(getAckMessage("timesheet_entry")).toBe("⏱ Queued");
  });

  it("returns correct ack for timesheet_command", () => {
    expect(getAckMessage("timesheet_command")).toBe("⏱ Queued");
  });

  it("returns correct ack for timesheet_reply", () => {
    expect(getAckMessage("timesheet_reply")).toBe("⏱ Queued");
  });

  it("returns default ack for unknown type", () => {
    expect(getAckMessage("unknown_type")).toBe("⏳ Queued");
  });
});
