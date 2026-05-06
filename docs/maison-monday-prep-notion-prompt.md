# Prompt for Mac Studio Claude session (has Notion + brain MCP)

**Run this in the Claude Code session on the Mac Studio** where you're signed in with `rahil@maison.cx` and Notion MCP is authenticated.

---

## Context

I'm prepping for a Phase-1 architecture lock-in meeting on **Monday April 20** with Fredrik, Kim, Noel, and (async) Sandeep at Maison. I've already:

1. Done deep code research on the `maison-agent` monorepo (`/Users/rahilsinghi/Desktop/maison-agent`) — mapped screenshots → code, found all the PRDs in `docs/prd-maison-agent-os/`, identified which services are TypeScript vs Python, mapped the data model.
2. Ingested the April 17 POC architecture meeting (Fredrik/Kim/Noel three-layer debate, East End, Memorial Day deadline, dockerized-client pattern).
3. Ingested the April 18 product demo (Business Console, Admin Flyout, KB pipeline stages, Golden FAQs, AI Visibility report).
4. **Drafted the meeting-prep document.**

## Where to pull my work from

Everything lives on the branch **`docs/maison-monday-prep`** in the brain repo (pushed to `origin`). On Mac Studio:

```bash
cd ~/Desktop/brain
git fetch origin
git checkout docs/maison-monday-prep
git pull origin docs/maison-monday-prep
```

Files on this branch:
- `raw/api/articles/maison-monday-meeting-prep-april-20-2026.md` — **the draft you'll extend**
- `docs/maison-monday-prep-notion-prompt.md` — this prompt (for reference)
- `raw/api/articles/maison-poc-architecture-meeting-april-17-2026.md` — Apr 17 meeting summary
- `raw/api/articles/maison-poc-architecture-meeting-april-17-2026-transcript.md` — Apr 17 full transcript
- `raw/api/articles/maison-poc-action-items-april-17-2026.md` — Apr 17 action items per person

**What I don't have in that draft:** context from the Notion docs we created about maison.travel — the PRD analyses, architecture proposals, any product/strategy docs already living in Notion. I couldn't reach them from the MacBook session.

## Your job

Extend and finalize the meeting prep doc by:

1. **Searching Notion comprehensively** for everything Maison.travel-related, then
2. **Cross-referencing against my existing draft** and the brain's knowledge, then
3. **Updating the meeting prep doc** in place with Notion-derived additions, corrections, and references, then
4. **Pushing to brain** (via `brain_ingest`) so the doc is queryable everywhere.

## Step 1 — Read the existing draft

Read `~/Desktop/brain/raw/api/articles/maison-monday-meeting-prep-april-20-2026.md` in full. That's your starting point. Preserve its structure (Part 1–7).

## Step 2 — Query brain for additional context

Use `brain_query` for each of these to pick up anything I might have missed during drafting:

```
brain_query "PRD-001 Agent 2.0 per-property substrate composition slices knowledge record tool contract"
brain_query "PRD-006 Maison.travel consumer portal per-user agent cycle-aware PreferenceSlice"
brain_query "Maison.travel POC three-layer architecture content MCP tools payments April 17 meeting"
brain_query "dockerized client pattern Hermes KELO Kim Granlund JSON schema"
brain_query "Preferred Hotels headless CMS contract integration East End"
brain_query "Maison KB pipeline stages scrape chunk embed QA generate evaluate pipeline-tasks Python"
brain_query "Maison Golden FAQs AI Visibility report quality 70 80 benchmark"
brain_query "Maison Exchange knowledge graph agent content layer"
brain_query "Maison team roles Fredrik Kim Noel Sandeep David Jory responsibilities"
```

Capture any new fact, link, or nuance the brain surfaces that isn't in my draft.

## Step 3 — Search Notion systematically

Use `mcp__notion__notion-search` for each of these queries, then `mcp__notion__notion-fetch` on any relevant result URL:

### Priority A — direct POC context
- `"maison.travel POC"`
- `"maison travel architecture"`
- `"maison travel PRD"` (especially PRD-001 through PRD-006 if Notion-mirrored)
- `"East End POC"`
- `"Memorial Day"` (the deadline)
- `"bootstrap meeting"` (Fredrik/Rahil April 15)
- `"Rahil onboarding"` or `"AI engineer onboarding"`
- `"content layer"` and `"knowledge layer"`
- `"dockerized client"` or `"client-per-agent"`

### Priority B — product/strategy
- `"Preferred Hotels"` — the big contract Fredrik mentioned ("drop everything if we sign")
- `"headless CMS"` — the integration pattern for Preferred
- `"EXA"` — the search API Fredrik/Kim proposed for surface content
- `"Maison Exchange"` — came up as "enabling technology" in one brain answer
- `"agent tool contract"` or `"ToolContract"`
- `"booking link"` or `"deeplink"` — the per-engine URL templates (recently updated)

### Priority C — team/ops
- `"product plan"` and `"planning cycle"` (capture → groom → scope → build)
- `"I Preferred"` or `"enterprise client"` — Fredrik said test this
- `"Hermes"` and `"KELO"` — the internal projects Kim referenced for the dockerized-client model
- `"Sandeep"` + `"monorepo"` — the migration of agent-llm-service / pipeline-tasks

### Priority D — recent deeplink/booking reference doc
The booking link instructions property in the Admin Flyout references a Notion doc with the recently updated deeplink templates. Find that specifically — query `"booking deeplink template"`, `"SynXis query parameters"`, `"iHotelier URL"`.

## Step 4 — Extract and structure findings

For each Notion doc you find, capture:
- **Title**
- **URL** (Notion page URL)
- **Author + last edit date**
- **One-paragraph summary**
- **How it relates to my Phase 1 POC** (directly, tangentially, contradicts, confirms)

Group your findings as:
- **A. Confirms / extends my draft** — I keep my proposal as is, but add Notion reference + any detail
- **B. Changes my thinking** — needs re-framing in Part 2 (Proposed Phase 1 Scope) or Part 3 (Decisions to lock)
- **C. Net-new questions** — add to Part 4 (Open Questions)
- **D. Pure reference** — add to Part 6 (Code References) or create a new Part 8 (Notion References)

## Step 5 — Update the meeting prep doc in place

Edit `~/Desktop/brain/raw/api/articles/maison-monday-meeting-prep-april-20-2026.md` to incorporate your findings. Rules:

- Preserve the 7-part structure
- Add a **Part 8 — Notion References** section listing every doc you pulled (title, URL, relevance)
- Inline Notion URL references as `[See Notion: <title>](<url>)` wherever a Notion doc is the source
- If you change a recommendation in Part 2/3 based on Notion content, mark the change with `**[Updated post-Notion research]**` so Rahil can see what shifted
- Keep the document readable as a speaking-reference during the meeting (not a dump)
- Keep under 5000 words total after the edit

## Step 6 — Ingest to brain

POST the updated doc to brain via `brain_ingest`:
- Title: `"Maison POC — Monday Meeting Prep (Apr 20) — Final with Notion Context"`
- Content: the full updated document
- Source: `"claude-code"`

## Step 7 — Report back

In your final message to Rahil, list:
1. **Every Notion doc you pulled** (title + URL + one-line relevance)
2. **Key changes to the meeting prep doc** (what moved from Part X to Part Y, what got added, what got deleted)
3. **Anything unclear** — Notion content you couldn't find but expected to (e.g., "Preferred Hotels contract details — searched but no doc found")
4. **One final question to verify with Rahil before the meeting** — the most load-bearing assumption that's still unconfirmed

## Ground rules

- **Don't hallucinate URLs.** If Notion returns nothing for a query, say so.
- **Don't duplicate content already in my draft.** Extend, don't restate.
- **Preserve Rahil's voice** — the doc is his first-person meeting prep. Write in that voice.
- **If you find two conflicting Notion docs** (e.g., POC plan v1 vs v2), flag it as an open question, don't silently pick one.
- **Time budget: 30-45 minutes of work.** The meeting is Monday morning.

## Deliverables

1. Updated `~/Desktop/brain/raw/api/articles/maison-monday-meeting-prep-april-20-2026.md` on branch `docs/maison-monday-prep`
2. Commit + push the branch (don't merge to master yet — Rahil will do that Monday morning after review):
   ```bash
   cd ~/Desktop/brain
   git add raw/api/articles/maison-monday-meeting-prep-april-20-2026.md
   git commit -m "docs(maison): enrich Monday meeting prep with Notion context"
   git push origin docs/maison-monday-prep
   ```
3. `brain_ingest` confirmation (so brain has the final version queryable)
4. Summary message to Rahil per Step 7

Go.
