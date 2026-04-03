# Brain — Claude Code Integration

This is a self-improving personal knowledge base. You (Claude Code) are the brain.

## Vault Structure

- `raw/` — Unprocessed drops. Never read from here for Q&A.
- `wiki/` — Compiled knowledge. This is your primary knowledge source.
- `output/` — Generated slides, plots, reports.
- `proposals/` — AI suggestions for human-owned files. Review these.
- `daily/` — Daily knowledge logs.
- `templates/` — Visual themes (brutalist). Use these for all output.

## Capturing Knowledge

When the user says "remember X" or invokes `/brain`:

**Quick capture** — write to `raw/conversations/{slug}.md` with frontmatter:
```yaml
---
status: pending
source_type: conversation
ingested_at: <ISO timestamp>
parsed_at: <ISO timestamp>
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---
```

**Direct wiki** — for well-structured knowledge, write directly to the appropriate `wiki/` subfolder with wiki frontmatter.

## Querying Knowledge

When the user asks "what do I know about X?" or similar:
1. Search `wiki/` using Grep for relevant articles
2. Read the top matches
3. Synthesize an answer with `[[wiki links]]` to sources
4. Do NOT auto-save the answer. Only save if user explicitly says `/save`.

## Output Generation

- Slides: Use Marp format with `templates/brutalist-marp.css` theme
- Diagrams: Use Mermaid with dark/cyan/green theme from `templates/mermaid-theme.json`
- All outputs go to `output/` subdirectories

## Rules

- Never modify files in `.brain/` — that's system config
- Never read or index `.brain/.env` — contains API keys
- Respect the conflict resolution rules in the spec
- When in doubt, write to `proposals/` instead of editing human files
