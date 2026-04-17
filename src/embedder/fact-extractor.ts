/**
 * Fact Extractor — extracts key-value facts from markdown tables,
 * frontmatter fields, and structured patterns into a companion "facts"
 * chunk that embeds well against direct factual queries.
 *
 * e.g., "| Rate | $50/hr |" → "rate: $50/hr"
 *       "**Name:** Fredrik" → "name: Fredrik"
 */

export interface ExtractedFact {
  key: string;
  value: string;
}

/**
 * Extract facts from markdown table rows.
 * Matches: | Key | Value | and | **Key** | Value |
 */
export function extractTableFacts(markdown: string): ExtractedFact[] {
  const facts: ExtractedFact[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    // Match table rows: | key | value | (with optional ** bold)
    const match = line.match(
      /^\|\s*\*{0,2}([^|*]+?)\*{0,2}\s*\|\s*([^|]+?)\s*\|/
    );
    if (!match) continue;

    const key = match[1].trim();
    const value = match[2].trim();

    // Skip header separator rows (---|---)
    if (/^[-:]+$/.test(key) || /^[-:]+$/.test(value)) continue;
    // Skip generic headers like "Field" "Value" "Description"
    if (/^(field|key|property|column|header)$/i.test(key)) continue;

    if (key && value && value !== "—" && value !== "-") {
      facts.push({ key: key.toLowerCase(), value });
    }
  }

  return facts;
}

/**
 * Extract facts from bold-key patterns.
 * Matches: **Key:** Value, **Key** — Value, - **Key**: Value
 */
export function extractBoldKeyFacts(markdown: string): ExtractedFact[] {
  const facts: ExtractedFact[] = [];
  // Process line by line to avoid greedy cross-line matching
  const lines = markdown.split("\n");

  for (const line of lines) {
    // Find all **Key:** Value or **Key**: Value patterns (colon may be inside or outside bold)
    const boldColonPattern = /\*\*([^*:]+?):?\*\*:?\s*([^|*]+)/g;
    let match: RegExpExecArray | null;
    while ((match = boldColonPattern.exec(line)) !== null) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (key && value && key.length < 50 && value.length < 200) {
        facts.push({ key: key.toLowerCase(), value });
      }
    }

    // **Key** — Value pattern
    const boldDashPattern = /\*\*([^*]+?)\*\*\s*[—–]\s*([^|*]+)/g;
    while ((match = boldDashPattern.exec(line)) !== null) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (key && value && key.length < 50 && value.length < 200) {
        facts.push({ key: key.toLowerCase(), value });
      }
    }

    // Note: list items (- **Key:** Value) are already caught by boldColonPattern above
  }

  return facts;
}

/**
 * Extract facts from YAML frontmatter key-value pairs.
 * Only extracts simple string/number values, not nested objects.
 */
export function extractFrontmatterFacts(markdown: string): ExtractedFact[] {
  const facts: ExtractedFact[] = [];
  const fmMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return facts;

  const lines = fmMatch[1].split("\n");
  for (const line of lines) {
    const match = line.match(/^(\w[\w_\s]*?):\s*"?([^"\n]+)"?\s*$/);
    if (!match) continue;

    const key = match[1].trim();
    const value = match[2].trim();

    // Skip system fields
    if (
      /^(status|author|created_at|last_ai_edit|last_human_edit|last_embedded_hash|compile_progress|retry_count|source_type|source_id|ingested_at|parsed_at|compiled_to|processed_at|last_error)$/i.test(
        key
      )
    )
      continue;

    if (key && value) {
      facts.push({ key: key.toLowerCase(), value });
    }
  }

  return facts;
}

/**
 * Format extracted facts into a searchable text block.
 */
export function formatFacts(facts: ExtractedFact[], articleTitle: string): string {
  if (facts.length === 0) return "";

  const uniqueFacts = dedup(facts);
  const lines = uniqueFacts.map((f) => `${f.key}: ${f.value}`);
  return `FACTS from "${articleTitle}":\n${lines.join("\n")}`;
}

function dedup(facts: ExtractedFact[]): ExtractedFact[] {
  const seen = new Set<string>();
  return facts.filter((f) => {
    const key = `${f.key}::${f.value}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Main entry: extract all facts from a markdown article.
 * Returns formatted facts string (empty if no facts found).
 */
export function extractFacts(markdown: string, articleTitle: string): string {
  const tableFacts = extractTableFacts(markdown);
  const boldFacts = extractBoldKeyFacts(markdown);
  const fmFacts = extractFrontmatterFacts(markdown);

  const allFacts = [...tableFacts, ...boldFacts, ...fmFacts];
  return formatFacts(allFacts, articleTitle);
}
