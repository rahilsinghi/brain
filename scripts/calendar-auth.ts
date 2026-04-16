#!/usr/bin/env tsx
/**
 * One-time OAuth2 consent flow for Google Calendar.
 *
 * Usage:
 *   pnpm calendar:auth                   # default: personal account
 *   pnpm calendar:auth --account maison  # specific account
 *
 * Opens a browser for Google consent, exchanges the authorization code
 * for tokens, and saves the refresh token to .brain/.env.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { createInterface } from "node:readline";
import { parse as parseYaml } from "yaml";
import { google } from "googleapis";

const vaultRoot = resolve(import.meta.dirname, "..");
const configPath = join(vaultRoot, ".brain", "config.yaml");

// --- Parse --account flag ---
const args = process.argv.slice(2);
let accountId = "personal";
const accountIdx = args.indexOf("--account");
if (accountIdx !== -1 && args[accountIdx + 1]) {
  accountId = args[accountIdx + 1];
}

// --- Load config ---
if (!existsSync(configPath)) {
  console.error("Missing .brain/config.yaml");
  console.error("Add a calendar: section with account config first.");
  process.exit(1);
}

interface CalendarYamlAccount {
  id: string;
  credentials: string;
  refresh_token_env: string;
  calendar_ids: string[];
}

interface CalendarYamlConfig {
  accounts?: CalendarYamlAccount[];
}

const raw = readFileSync(configPath, "utf-8");
const parsed = parseYaml(raw) as Record<string, unknown> | null;
const calConfig = parsed?.calendar as CalendarYamlConfig | undefined;

if (!calConfig?.accounts || calConfig.accounts.length === 0) {
  console.error("No calendar accounts in .brain/config.yaml");
  console.error("Add calendar.accounts[] with id, credentials, refresh_token_env, calendar_ids");
  process.exit(1);
}

const account = calConfig.accounts.find((a) => a.id === accountId);
if (!account) {
  const ids = calConfig.accounts.map((a) => a.id).join(", ");
  console.error(`Account "${accountId}" not found in config. Available: ${ids}`);
  process.exit(1);
}

// --- Load credentials ---
const credPath = join(vaultRoot, ".brain", account.credentials);
if (!existsSync(credPath)) {
  console.error(`Missing credentials file: .brain/${account.credentials}`);
  console.error("Download OAuth credentials from Google Cloud Console first.");
  process.exit(1);
}

interface CredFile {
  installed?: { client_id: string; client_secret: string; redirect_uris: string[] };
  web?: { client_id: string; client_secret: string; redirect_uris: string[] };
}

const creds: CredFile = JSON.parse(readFileSync(credPath, "utf-8"));
const installed = creds.installed ?? creds.web;
if (!installed) {
  console.error("Invalid credentials file — missing 'installed' or 'web' key");
  process.exit(1);
}

const oauth2 = new google.auth.OAuth2(
  installed.client_id,
  installed.client_secret,
  "http://localhost",
);

const authUrl = oauth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["https://www.googleapis.com/auth/calendar.readonly"],
});

console.log(`\nCalendar OAuth consent for account: ${accountId}\n`);
console.log("1. Open this URL in your browser:\n");
console.log(authUrl);
console.log("\n2. Authorize and copy the code from the redirect URL");
console.log("   (the 'code' parameter in http://localhost/?code=XXXXX)\n");

const rl = createInterface({ input: process.stdin, output: process.stdout });

rl.question("Paste the authorization code: ", async (code) => {
  rl.close();

  try {
    const { tokens } = await oauth2.getToken(code.trim());
    if (!tokens.refresh_token) {
      console.error("No refresh token received. Try revoking access and re-running.");
      console.error("Revoke at: https://myaccount.google.com/permissions");
      process.exit(1);
    }

    // Save refresh token to .brain/.env
    const envPath = join(vaultRoot, ".brain", ".env");
    let envContent = "";
    if (existsSync(envPath)) {
      envContent = readFileSync(envPath, "utf-8");
    }

    const envVar = account.refresh_token_env;

    // Replace or append the refresh token env var
    if (envContent.includes(`${envVar}=`)) {
      envContent = envContent.replace(
        new RegExp(`${envVar}=.*`),
        `${envVar}=${tokens.refresh_token}`,
      );
    } else {
      envContent = envContent.trimEnd() + `\n${envVar}=${tokens.refresh_token}\n`;
    }

    writeFileSync(envPath, envContent);
    console.log(`\nRefresh token saved to .brain/.env as ${envVar}`);
    console.log("Calendar source is now ready. Restart the daemon to activate.");
  } catch (err) {
    console.error("Token exchange failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
});
