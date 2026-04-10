import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Mock googleapis before importing
vi.mock("googleapis", () => {
  class MockOAuth2 {
    setCredentials = vi.fn();
    constructor() {}
  }
  const mockGmail = vi.fn().mockReturnValue({ users: { messages: {} } });
  return {
    google: {
      auth: { OAuth2: MockOAuth2 },
      gmail: mockGmail,
    },
  };
});

// Mock fs for controlled test env
vi.mock("node:fs", async () => {
  const actual = await vi.importActual<typeof import("node:fs")>("node:fs");
  return {
    ...actual,
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
  };
});

import { createGmailClient } from "../../src/sources/gmail-auth.js";

const mockExistsSync = vi.mocked(existsSync);
const mockReadFileSync = vi.mocked(readFileSync);

const VALID_CREDS = JSON.stringify({
  installed: {
    client_id: "test-client-id",
    client_secret: "test-client-secret",
    redirect_uris: ["http://localhost"],
  },
});

describe("createGmailClient", () => {
  const origEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env = { ...origEnv };
  });

  it("returns null when credentials file is missing", () => {
    mockExistsSync.mockReturnValue(false);
    const result = createGmailClient("/fake/vault");
    expect(result).toBeNull();
  });

  it("returns null when GMAIL_REFRESH_TOKEN is not set", () => {
    mockExistsSync.mockReturnValue(true);
    mockReadFileSync.mockReturnValue(VALID_CREDS);
    delete process.env.GMAIL_REFRESH_TOKEN;
    const result = createGmailClient("/fake/vault");
    expect(result).toBeNull();
  });

  it("returns null when credentials file has no installed/web key", () => {
    mockExistsSync.mockReturnValue(true);
    mockReadFileSync.mockReturnValue("{}");
    process.env.GMAIL_REFRESH_TOKEN = "test-token";
    const result = createGmailClient("/fake/vault");
    expect(result).toBeNull();
  });

  it("returns a GmailClient when credentials and token are present", () => {
    mockExistsSync.mockReturnValue(true);
    mockReadFileSync.mockReturnValue(VALID_CREDS);
    process.env.GMAIL_REFRESH_TOKEN = "test-refresh-token";
    const result = createGmailClient("/fake/vault");
    expect(result).not.toBeNull();
    expect(result!.gmail).toBeDefined();
  });

  it("works with 'web' credentials format", () => {
    const webCreds = JSON.stringify({
      web: {
        client_id: "web-client-id",
        client_secret: "web-client-secret",
        redirect_uris: ["http://localhost"],
      },
    });
    mockExistsSync.mockReturnValue(true);
    mockReadFileSync.mockReturnValue(webCreds);
    process.env.GMAIL_REFRESH_TOKEN = "test-token";
    const result = createGmailClient("/fake/vault");
    expect(result).not.toBeNull();
  });
});
