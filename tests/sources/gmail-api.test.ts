import { describe, it, expect, vi } from "vitest";
import { createGmailApiSource } from "../../src/sources/gmail.js";

// Mock gmail-auth to control client creation
vi.mock("../../src/sources/gmail-auth.js", () => ({
  createGmailClient: vi.fn(),
}));

import { createGmailClient } from "../../src/sources/gmail-auth.js";
const mockCreateClient = vi.mocked(createGmailClient);

function b64url(text: string): string {
  return Buffer.from(text).toString("base64url");
}

describe("createGmailApiSource", () => {
  it("returns null when gmail client is not configured", () => {
    mockCreateClient.mockReturnValue(null);
    const source = createGmailApiSource("/fake/vault");
    expect(source).toBeNull();
  });

  it("returns a SyncSource when client is configured", () => {
    const mockGmail = {
      users: {
        messages: {
          list: vi.fn(),
          get: vi.fn(),
        },
      },
    };
    mockCreateClient.mockReturnValue({ gmail: mockGmail as never });
    const source = createGmailApiSource("/fake/vault");
    expect(source).not.toBeNull();
    expect(source!.name).toBe("gmail");
  });

  it("polls and returns messages via googleapis", async () => {
    const mockGmail = {
      users: {
        messages: {
          list: vi.fn().mockResolvedValue({
            data: {
              messages: [
                { id: "api-msg-1", threadId: "t-1" },
              ],
            },
          }),
          get: vi.fn().mockResolvedValue({
            data: {
              id: "api-msg-1",
              threadId: "t-1",
              payload: {
                mimeType: "text/plain",
                headers: [
                  { name: "Subject", value: "API Test Email" },
                  { name: "From", value: "sender@example.com" },
                  { name: "Date", value: "Wed, 9 Apr 2026 10:00:00 +0000" },
                ],
                body: { data: b64url("Hello from the API") },
                parts: [],
              },
            },
          }),
        },
      },
    };
    mockCreateClient.mockReturnValue({ gmail: mockGmail as never });

    const source = createGmailApiSource("/fake/vault")!;
    const result = await source.poll({ last_poll: null, processed_ids: [] });

    expect(result.newItems).toHaveLength(1);
    expect(result.newItems[0].content).toContain("# API Test Email");
    expect(result.newItems[0].content).toContain("sender@example.com");
    expect(result.newItems[0].content).toContain("Hello from the API");
    expect(result.processedIds).toContain("api-msg-1");
  });

  it("returns empty when no messages", async () => {
    const mockGmail = {
      users: {
        messages: {
          list: vi.fn().mockResolvedValue({
            data: { messages: undefined },
          }),
          get: vi.fn(),
        },
      },
    };
    mockCreateClient.mockReturnValue({ gmail: mockGmail as never });

    const source = createGmailApiSource("/fake/vault")!;
    const result = await source.poll({ last_poll: null, processed_ids: [] });

    expect(result.newItems).toEqual([]);
    expect(result.processedIds).toEqual([]);
  });

  it("filters rejected senders", async () => {
    const mockGmail = {
      users: {
        messages: {
          list: vi.fn().mockResolvedValue({
            data: {
              messages: [{ id: "spam-1", threadId: "t-1" }],
            },
          }),
          get: vi.fn().mockResolvedValue({
            data: {
              id: "spam-1",
              threadId: "t-1",
              payload: {
                mimeType: "text/plain",
                headers: [
                  { name: "Subject", value: "You got a notification" },
                  { name: "From", value: "noreply@github.com" },
                  { name: "Date", value: "Wed, 9 Apr 2026 10:00:00 +0000" },
                ],
                body: { data: b64url("notification body") },
                parts: [],
              },
            },
          }),
        },
      },
    };
    mockCreateClient.mockReturnValue({ gmail: mockGmail as never });

    const source = createGmailApiSource("/fake/vault")!;
    const result = await source.poll({ last_poll: null, processed_ids: [] });

    expect(result.newItems).toHaveLength(0);
    expect(result.processedIds).toContain("spam-1");
  });
});
