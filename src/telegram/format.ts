/**
 * Format synthesis output for Telegram plain text.
 *
 * Strips wiki links, markdown formatting, and any residual citations.
 * Telegram ctx.reply() sends plain text — no parse_mode.
 */
export function formatForTelegram(text: string): string {
  let result = text;

  // 1. Remove [[wiki links]] — extract human-readable display text only
  result = result.replace(/\[\[([^\]]+)\]\]/g, (_match, inner: string) => {
    const pipeIdx = inner.indexOf("|");
    if (pipeIdx !== -1) return inner.slice(pipeIdx + 1);

    const hashIdx = inner.indexOf("#");
    if (hashIdx !== -1) return inner.slice(hashIdx + 1).replace(/-/g, " ");

    if (inner.includes("/") || inner.endsWith(".md")) {
      const parts = inner.split("/");
      return parts[parts.length - 1].replace(/\.md$/, "").replace(/-/g, " ");
    }

    return inner;
  });

  // 2. Remove inline slug citations (bold slugs like **some-long-slug-name**)
  result = result.replace(/\*\*[a-z0-9]+(?:-[a-z0-9]+){2,}\*\*/g, "");

  // 2b. Remove trailing citation clusters: text **slug**, **slug2**.
  result = result.replace(/(?:,?\s*\*\*[a-z][a-z0-9-]*\*\*)+(?=[.,;])/g, "");

  // 3. Strip bold markers **text** → text
  result = result.replace(/\*\*(.+?)\*\*/g, "$1");

  // 4. Strip italic markers *text* → text (but not bullet points)
  result = result.replace(/(?<!\n)(?<!\* )\*([^*\n]+)\*/g, "$1");

  // 5. Convert markdown bullet points: *   text or  * text → - text
  result = result.replace(/^[ \t]*\*\s{1,4}/gm, "- ");

  // 6. Strip markdown headers: ### Title → Title
  result = result.replace(/^#{1,6}\s+/gm, "");

  // 7. Clean up orphaned commas/spaces from removed citations
  result = result.replace(/ {2,}/g, " ");
  result = result.replace(/,\s*,/g, ",");
  result = result.replace(/,\s*\./g, ".");
  result = result.replace(/ ,/g, ",");
  result = result.replace(/ \./g, ".");
  result = result.replace(/ +$/gm, "");

  // 8. Clean up blank lines (max 2 consecutive)
  result = result.replace(/\n{3,}/g, "\n\n");

  return result.trim();
}
