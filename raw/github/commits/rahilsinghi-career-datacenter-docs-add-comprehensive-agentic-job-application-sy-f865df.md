---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:235154a
ingested_at: 2026-04-13T18:05:31.410Z
parsed_at: 2026-04-13T18:05:31.410Z
compiled_to: "[[Agentic Job Application System: Comprehensive Roadmap]]"
processed_at: 2026-04-13T18:10:22.942Z
retry_count: 0
last_error: null
compile_progress: null
---



# docs: Add comprehensive agentic job application system roadmap

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 235154a
- **Date:** 2026-02-10T22:09:17Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +543
- **Deletions:** -0

Add detailed implementation plan for multi-agent workflow:

Architecture:
- LangGraph orchestrator with 7 specialized agents
- JobScout, JDClassifier, CompanyIntel, ContactFinder, LeadEnrichment, TailorPack, OutreachComposer
- Human-in-the-loop approval gates at critical points

Legal-first approach:
- No LinkedIn automation (use ATS APIs: Greenhouse, Lever)
- GDPR compliant (opt-out, minimal data, retention policy)
- CAN-SPAM safe (5-10 emails/day, targeted outreach)

Phase 1 MVP (2 weeks):
- Job discovery + scoring + tailored resume/CL generation
- Manual-assisted, ban-safe, proves value

Phase 2 (2 weeks):
- Apollo.io integration for contact finding + enrichment
- Email drafting + approval + sending via Gmail API
- Rate limiting + deliverability safeguards

Phase 3 (ongoing):
- A/B testing, learning from outcomes
- Auto-skip low-fit jobs, predictive scoring

Tech stack: Python, FastAPI, LangGraph, PostgreSQL, Apollo API, Gmail API
Success metrics: 8-20% reply rate, <10 min/application, 10+ hours saved/week

Includes: DB schema, API integration guides, risk mitigation, legal compliance
