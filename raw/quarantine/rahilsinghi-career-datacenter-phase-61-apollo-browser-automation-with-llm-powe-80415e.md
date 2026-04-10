---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:163826a
ingested_at: 2026-04-09T21:03:21.271Z
parsed_at: 2026-04-09T21:03:21.271Z
compiled_to: "[[Phase 6.1: Apollo Browser Automation with LLM-Powered Contact Selection]]"
processed_at: 2026-04-10T02:01:27.162Z
retry_count: 2
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuGeAtqiwrxqCZ9DgHwH\"}"
compile_progress: null
quarantined_at: 2026-04-10T02:04:40.032Z
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
