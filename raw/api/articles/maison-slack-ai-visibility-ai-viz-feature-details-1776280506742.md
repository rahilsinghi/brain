---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-slack-ai-visibility-ai-viz-feature-details-1776280506742.md
ingested_at: 2026-04-15T19:15:06.742Z
parsed_at: null
compiled_to: "[[Maison AI Visibility Report]]"
processed_at: 2026-04-15T19:44:46.627Z
retry_count: 0
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca66Gi6L6rHQNZogFF3vo"}
compile_progress: null
---





# Maison Slack #ai-visibility — Feature Context
**Source:** Slack #ai-visibility channel (C0AAD9DUXAN)
**Retrieved:** April 15, 2026

## What AI Visibility Does
Generates a report comparing what ChatGPT says about a hotel vs what Maison's KB says. Helps hotels understand and improve their AI discoverability.

## Architecture Evolution
- **v1 (Feb 2026):** Used Playwright to automate headless Chrome, navigate to chatgpt.com, scrape answers. Brittle — prone to login walls, IP blocks, bot detection.
- **v2 (April 8, 2026):** Replaced with OpenAI Agents SDK. Agent backed by gpt-4.1 with WebSearchTool. Searches the web for each GFAQ question. Completes in 4-5 mins (vs 30-40 mins before). Lists sources.
- Downstream unchanged: KB querying, response pairing, batch evaluation, report generation.

## Report Structure
- Total questions tested
- Coverage (% answered)
- Average accuracy score
- Executive summary
- Areas for improvement (lowest accuracy questions)
- Complete question-by-question comparison

## Workflow for Commercial Team (April 14)
1. Send report to yourself first
2. Review as if you're the client admin
3. Generate consultative outreach email using Claude prompt (provided in channel)
4. Email positions Maison as trusted advisor, not vendor

## Issues
- Intermittent failures — no AWS task spawned, or task hangs (MA-963)
- Requires hotel name AND address in client config (Admin flyout)
- Backfilling addresses for all clients needed (MA-965)

## Competitive Landscape
- **Lighthouse (Connect AI)** — ChatGPT app for hotels, live rates, direct booking
- **Cendyn (AI Connect)** — "visible in AI search"
- **Profound** — tracking AI visibility, mentions, citations
- **80Days** — 3Cs framework: Clarity, Consistency, Credibility
- Gartner: 50% website traffic from AI by 2028

## Key Metrics
- Hotels with 43% travelers using AI for trip planning
- AI search traffic growing 50% faster than traditional search
- 62% of travelers prefer to book direct if given option