import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { google } from "googleapis";
import type { gmail_v1 } from "googleapis";

interface GmailCredentials {
  installed?: {
    client_id: string;
    client_secret: string;
    redirect_uris: string[];
  };
  web?: {
    client_id: string;
    client_secret: string;
    redirect_uris: string[];
  };
}

export interface GmailClient {
  gmail: gmail_v1.Gmail;
}

/**
 * Create an authenticated Gmail API client from stored credentials + refresh token.
 *
 * Requires:
 *   - .brain/gmail-credentials.json (OAuth client ID/secret)
 *   - GMAIL_REFRESH_TOKEN env var (set by scripts/gmail-auth.ts)
 *
 * Returns null if either is missing (non-fatal — daemon continues without gmail).
 */
export function createGmailClient(vaultRoot: string): GmailClient | null {
  const credPath = join(vaultRoot, ".brain", "gmail-credentials.json");
  if (!existsSync(credPath)) {
    console.warn("[gmail] No credentials file at .brain/gmail-credentials.json — skipping");
    return null;
  }

  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
  if (!refreshToken) {
    console.warn("[gmail] No GMAIL_REFRESH_TOKEN in env — run `pnpm gmail:auth` first");
    return null;
  }

  const raw = readFileSync(credPath, "utf-8");
  const creds: GmailCredentials = JSON.parse(raw);
  const installed = creds.installed ?? creds.web;
  if (!installed) {
    console.error("[gmail] Invalid credentials file — missing 'installed' or 'web' key");
    return null;
  }

  const oauth2 = new google.auth.OAuth2(
    installed.client_id,
    installed.client_secret,
    installed.redirect_uris[0],
  );

  oauth2.setCredentials({ refresh_token: refreshToken });

  const gmail = google.gmail({ version: "v1", auth: oauth2 });

  return { gmail };
}
