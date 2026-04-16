---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-linear-current-sprint-issues-april-2026-1776280390144.md
ingested_at: 2026-04-15T19:13:10.144Z
parsed_at: null
compiled_to: "[[Maison Linear Current Sprint Issues (April 2026)]]"
processed_at: 2026-04-15T19:13:31.475Z
retry_count: 0
last_error: null
compile_progress: null
---



# Maison Linear — Current Sprint Issues (Last 2 Weeks)
**Source:** Linear API
**Retrieved:** April 15, 2026

## High Priority Issues

### MA-965: Backfill addresses for all clients (Todo)
- **Assignee:** Durgansh Dixit
- Prerequisite for AI Visibility — need structured address data for all hotel clients
- Audit all existing client records, backfill address fields, validate quality

### MA-964: Optimize scraper for cost (Todo)
- **Assignee:** Noel Panicker
- Indigo East End produced 30,000+ QA pairs — huge OpenAI spend
- Root cause: scraper followed links outside target domain
- Need model swap, vanity-site caps, URL filtering

### MA-966: Create test cases for stg → prod deploy (In Progress)
- **Assignee:** Julia Burke
- **Due:** April 20, 2026
- Build test coverage in Quality Dashboard ahead of stg → prod deploy targeted Wed April 22
- Use Claude to generate test cases from plain language scenarios

### MA-963: AI Viz report silently fails (In Progress)
- **Assignee:** Noel Panicker
- Intermittent — no AWS task spawned, or task hangs, email never arrives
- Some hotels work (Park Lane), others don't (Ameswell, Hotel Alameda)

### MA-961: Hallucination — webchat references hotel not in KB (Todo)
- **Assignee:** Noel Panicker
- Grand Hacienda webchat referenced "El Monte Sagrado Resort" — not in KB
- Model hallucinated a hotel name from outside client's knowledge base

### MA-960: Fix rate retrieval for Mews (In Progress)
- **Assignee:** Javed MD
- `rates/getAll` only returns 10 results (default limitation)
- Not filtering Private and AvailabilityBlock rate types

### MA-959: Superadmin hard delete client (Backlog)
- Duplicate clients during onboarding need cleanup
- Delete button in danger zone on `/console/clients/:id`

### MA-958: BC Clients page slow load (Todo)
- **Assignee:** Sandeep Baynes
- Need virtualized list + server-side search
- Currently renders all clients with no pagination

### MA-953: Bot re-asks for guest count already provided (Todo)
- **Assignee:** Noel Panicker
- During live Park Lane demo, bot asked for guest count after "family of four" already stated

## Medium Priority Issues

### MA-962: Ingestion sync email shows file count, not QA pair count (Todo)
- **Assignee:** Durgansh Dixit
- Email says "1 change" = 1 source file, should show QA pair-level changes

### MA-957: Replace key-value client config with NLP interface (Todo)
- **Assignee:** Sandeep Baynes
- Current config: deterministic key-value pairs, not self-explanatory, case-sensitive

### MA-955: Deleting visual in BC Theme page has no effect (Todo)
- **Assignee:** Sandeep Baynes