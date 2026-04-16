import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { google } from "googleapis";
import type { OAuth2Client } from "google-auth-library";

interface GoogleCredentials {
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

export interface GoogleAccountConfig {
  id: string;
  credentialsFile: string;
  refreshTokenEnvVar: string;
}

/**
 * Create an authenticated Google OAuth2 client for a given account.
 *
 * Reads credentials from `.brain/{account.credentialsFile}` and refresh token
 * from `process.env[account.refreshTokenEnvVar]`.
 *
 * Returns null if either is missing (non-fatal).
 */
export function createGoogleOAuth2(
  vaultRoot: string,
  account: GoogleAccountConfig,
): OAuth2Client | null {
  const credPath = join(vaultRoot, ".brain", account.credentialsFile);
  if (!existsSync(credPath)) {
    console.warn(
      `[google-auth:${account.id}] No credentials file at .brain/${account.credentialsFile} — skipping`,
    );
    return null;
  }

  const refreshToken = process.env[account.refreshTokenEnvVar];
  if (!refreshToken) {
    console.warn(
      `[google-auth:${account.id}] No ${account.refreshTokenEnvVar} in env — run \`pnpm calendar:auth --account ${account.id}\` first`,
    );
    return null;
  }

  const raw = readFileSync(credPath, "utf-8");
  const creds: GoogleCredentials = JSON.parse(raw);
  const installed = creds.installed ?? creds.web;
  if (!installed) {
    console.error(
      `[google-auth:${account.id}] Invalid credentials file — missing 'installed' or 'web' key`,
    );
    return null;
  }

  const oauth2 = new google.auth.OAuth2(
    installed.client_id,
    installed.client_secret,
    installed.redirect_uris[0],
  );

  oauth2.setCredentials({ refresh_token: refreshToken });

  return oauth2;
}
