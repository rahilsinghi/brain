import TurndownService from "turndown";
import { uniqueSlug } from "./slug.js";
import type { SyncSource, SourceSyncState, SyncResult, RawDrop } from "./types.js";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

// --- Gmail API shape (what MCP tools return) ---

interface GmailHeader {
  name: string;
  value: string;
}

interface GmailPayload {
  mimeType: string;
  headers: GmailHeader[];
  body: { data: string };
  parts?: GmailPayload[];
}

interface GmailMessage {
  id: string;
  threadId: string;
  payload: GmailPayload;
}

interface GmailSearchResult {
  messages: { id: string; threadId: string; snippet: string }[];
}

export interface GmailDeps {
  searchMessages: (q: string, opts?: Record<string, unknown>) => Promise<GmailSearchResult>;
  readMessage: (id: string) => Promise<GmailMessage>;
}

// --- Body extraction ---

/**
 * Decode Gmail's base64url-encoded body data.
 */
function decodeBase64url(data: string): string {
  if (!data) return "";
  const base64 = data.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(base64, "base64").toString("utf-8");
}

/**
 * Signature / footer patterns to strip from email bodies.
 */
const SIGNATURE_DELIMITER = /\n-- \n[\s\S]*/;
const MOBILE_FOOTER = /\n\nSent from (my )?(iPhone|iPad|Gmail|Outlook|Mail)[\s\S]*/;

function stripSignature(text: string): string {
  return text.replace(SIGNATURE_DELIMITER, "").replace(MOBILE_FOOTER, "").trim();
}

/**
 * Recursively find the first part matching a given MIME type.
 */
function findPart(payload: GmailPayload, mimeType: string): GmailPayload | undefined {
  if (payload.mimeType === mimeType && payload.body?.data) {
    return payload;
  }
  for (const part of payload.parts ?? []) {
    const found = findPart(part, mimeType);
    if (found) return found;
  }
  return undefined;
}

/**
 * Extract the body text from a Gmail message payload.
 * Prefers text/plain; falls back to text/html converted via turndown.
 * Strips email signatures and common mobile footers.
 *
 * Exported for direct unit testing.
 */
export function extractBody(payload: GmailPayload): string {
  // Try text/plain first
  const plainPart = findPart(payload, "text/plain");
  if (plainPart) {
    const raw = decodeBase64url(plainPart.body.data);
    return stripSignature(raw);
  }

  // Fall back to text/html → markdown
  const htmlPart = findPart(payload, "text/html");
  if (htmlPart) {
    const html = decodeBase64url(htmlPart.body.data);
    const markdown = turndown.turndown(html);
    return stripSignature(markdown);
  }

  return "";
}

// --- Header helpers ---

function getHeader(payload: GmailPayload, name: string): string {
  const header = payload.headers.find(
    (h) => h.name.toLowerCase() === name.toLowerCase(),
  );
  return header?.value ?? "";
}

// --- Source factory ---

/**
 * Gmail uses processed_ids as the PRIMARY dedup mechanism (not cursor/timestamp).
 *
 * Rationale: the search query `newer_than:1h` is fuzzy — Gmail's internal
 * timestamps can differ from delivery time, and messages can be starred or
 * labelled retroactively which may cause them to reappear in search results.
 *
 * Edge case: if processed_ids exceeds ~500 entries or messages are older than
 * ~20 days, the rolling window may miss messages that reappear in search.
 * This is an acceptable trade-off vs. storing unbounded state.
 */
export function createGmailSource(deps: GmailDeps): SyncSource {
  return {
    name: "gmail",
    async poll(state: SourceSyncState): Promise<SyncResult> {
      const searchResult = await deps.searchMessages("newer_than:1h", {
        maxResults: 50,
      });

      const messages = searchResult.messages ?? [];
      if (messages.length === 0) {
        return { newItems: [], processedIds: [] };
      }

      const processedSet = new Set(state.processed_ids);
      const unprocessed = messages.filter((m) => !processedSet.has(m.id));

      const newItems: RawDrop[] = [];
      const processedIds: string[] = [];

      for (const msg of unprocessed) {
        const full = await deps.readMessage(msg.id);
        const subject = getHeader(full.payload, "Subject") || "No Subject";
        const from = getHeader(full.payload, "From");
        const date = getHeader(full.payload, "Date");
        const body = extractBody(full.payload);

        const filename = `gmail/emails/${uniqueSlug(subject, msg.id)}.md`;
        const content = `# ${subject}\n\n**From:** ${from}\n**Date:** ${date}\n\n${body}\n`;

        newItems.push({ filename, content, sourceId: msg.id });
        processedIds.push(msg.id);
      }

      return { newItems, processedIds };
    },
  };
}
