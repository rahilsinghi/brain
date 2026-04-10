---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:163826a
ingested_at: 2026-04-10T03:04:49.547Z
parsed_at: 2026-04-10T03:04:49.547Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuMEXobivF7AojghbUxG"}
compile_progress: null
---



# Phase 6.1: Apollo browser automation with LLM-powered contact selection

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 163826a
- **Date:** 2026-02-25T19:04:23Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +1770
- **Deletions:** -0

Implemented intelligent contact discovery using Playwright + LLM:

Core Features:
- Persistent Chrome context (bypasses Google OAuth blocks)
- Session management (login once, reuse cookies)
- Credit tracking (120 free credits, JSON-based tracking)
- LLM-powered contact selection (Haiku selects best 3-5 from full list)

Workflow:
1. Navigate to company page via top search
2. Click company People tab
3. Scrape all employees (name + title)
4. LLM selects best contacts (recruiters, eng managers, CTOs)
5. Reveal emails only for selected contacts (saves credits!)
6. Extract and save to CSV

Key Methods:
- _navigate_to_company(): Search + select company (handles dropdown)
- _click_people_tab(): Click company page tab (not sidebar!)
- _scrape_people_list(): Extract all employees from table
- _select_best_contacts_with_llm(): Smart selection via Haiku
- _reveal_and_extract_email(): Click "Access email" + extract

Integration:
- contact_finder.py: Added --apollo-search flag
- Auto-detect contact type from title
- Convert to Contact objects, save to CSV

CLI Usage:
  python cli/apollo_browser.py --setup
  python cli/apollo_browser.py --search "Company" --titles "Recruiter,Eng Manager" --max 3
  python cli/contact_finder.py --apollo-search "Company" --max 2

Advantages over keyword filtering:
- LLM recognizes role variations (Talent Acquisition = Recruiter)
- Adapts to company-specific org structures
- Prioritizes based on job search context
- More credit-efficient (only reveal high-value contacts)

Status: Testing in progress (Selfbook, Cloudbeds, Atomize)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
