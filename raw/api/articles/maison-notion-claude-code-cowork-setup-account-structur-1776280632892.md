---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-notion-claude-code-cowork-setup-account-structur-1776280632892.md
ingested_at: 2026-04-15T19:17:12.892Z
parsed_at: null
compiled_to: "[[Claude Code & Cowork Setup for Maison]]"
processed_at: 2026-04-15T19:44:23.264Z
retry_count: 0
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca66SJ3VXHBTyCvKMJiXb"}
compile_progress: null
---





# Claude Code & Cowork Setup for Maison
**Source:** Notion page "Claude Code & Cowork Setup for Maison"
**Retrieved:** April 15, 2026

## Account Structure
- **Tier 1: Claude Teams Plan** — ~$25/person/month + $25 premium add-on. 5-6 people. Managed via claude.ai Org Settings. SSO with @maison.cx domain.
- **Tier 2: Individual Pro** — $20/person/month. Expensed by Maison.
- **Total cost:** ~$400-500/month for ~9 people

## Key Benefits of Team Plan
- Central billing
- Admin controls (Fredrik as admin)
- SSO + domain capture (@maison.cx auto-joins org)
- No model training on company content
- Slack & Microsoft 365 integrations
- Usage visibility

## Engineering Strategy
- Claude Code = primary AI coding tool
- Mono-repo setup by Sandeep
- API Migration: case-by-case evaluation from OpenAI to Anthropic API
- Track usage via Organization Settings

## Commercial Team Strategy (Cowork)
- Install Claude Cowork desktop app
- Use cases: automating client setup, sales outreach, summarizing materials, communication workflows
- Weekly wins/blockers shared in Slack

## Sales-Skills Repo
- `sales-skills` GitHub repo = source of truth for Cowork skills
- Workflow: describe change to Claude Code → creates branch → pushes to GitHub → anyone reviews and merges
- `CLAUDE.md` instructs Claude to always branch, never commit directly to main
- Pull latest: "pull the latest from GitHub" in Claude Code
- Infrastructure: one GitHub repo, local clone on each machine, CLAUDE.md at root

## Claude Apps
- Desktop app: Chat, Cowork, Code modes in one app
- Web: claude.ai
- Mobile: iOS & Android
- Developer: console.anthropic.com for API keys, usage, workbench
- Connectors: Notion, Google Workspace, Linear, Slack, Chrome