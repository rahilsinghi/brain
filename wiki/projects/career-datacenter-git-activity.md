---
title: Career-Datacenter — Git Activity
status: current
author: ai
source_type: git-commits
created_at: 2026-04-08T23:07:25.247Z
updated_at: 2026-04-08T23:07:25.247Z
tags:
  - git-activity
  - career-datacenter
category: projects
last_embedded_hash: 46dbbd841b7c7a7d
---


# Career-Datacenter — Git Activity

## Summary

Career-Datacenter is a personal job search automation platform built by [[rahil-singhi]] that combines structured career data (resume content, skills, experience) with a progressively automated application pipeline. The repository evolved from static YAML-based career documents into a multi-phase agentic system capable of scraping job boards, generating tailored application materials, tracking pipeline state, and managing outreach. It serves as both a knowledge base for interview and networking preparation and a runtime system for conducting an active job search at scale.

---

## Key Developments

### Career Data Foundation
The repository launched on 2026-02-10 with a comprehensive data layer: core identity, education, professional experience, projects portfolio, a [[skills-inventory]], quantified impact metrics, job search configuration templates, and a [[bullet-bank-reusable-resume-bullets-by-engineering-domain]]. Original LaTeX resume source was committed alongside a master resume and cover letter guides. An application tracking system and operational playbooks were added the same day, along with a [[decision-framework-what-to-build-first-for-job-search-automation]] and architecture roadmap for future automation.

### Phase 1 – Application Generator CLI
On 2026-02-11, a CLI-based application generator was designed and implemented end-to-end within a single day. The system used Jinja2 templates to render tailored resumes and cover letters from the YAML knowledge base. Subsequent fixes addressed a Jinja2 template rendering bug, anti-hallucination constraints in LLM-driven resume generation, and a comprehensive validation layer integrated into the generation pipeline. Related documentation on hallucination analysis was also committed.

### Phase 2 – Job Scraping and Tracking
On 2026-02-14, the scraping infrastructure was built in three sequential parts: a job scraper foundation, job board scrapers (including LinkedIn with cookie-based authentication), and a job tracker with scraper orchestrator. A LinkedIn overnight batch processing system and a `JobDeduplicator` for cross-run persistence were added on 2026-02-17, alongside an interactive terminal job review CLI and an approval gate wired into the batch processor.

### Phase 3 – Analytics, Reporting, and Variants
Also on 2026-02-17–18, higher-order tooling was layered on top of the pipeline: a FastAPI web dashboard with jobs table and analytics views, an HTML email digest generator with Gmail integration, a `SkillsGapAnalyzer`, `SalaryIntelligence`, `CompanyResearcher`, and weekly report generator. Resume variant generation (engineering-focused vs. ML-focused) and cover letter style variants (metric, mission, story hooks) were added, reflecting content in [[cover-letter-core-paragraphs]]. Unit and integration tests for core components were committed, and a full end-to-end pipeline runner script completed the phase.

### Phase 4 – Semi-Automated LinkedIn Easy Apply
On 2026-02-18, a semi-automated LinkedIn Easy Apply module was introduced in a single large commit encompassing approximately 20 logical changes, enabling browser-driven form submission with human-in-the-loop approval. This connects thematically to the [[easy-apply-answers]] knowledge article.

### Phase 5 – Hospitality Tech Outreach
On 2026-02-25, a dedicated hospitality technology outreach system was completed, reflecting a parallel targeting strategy aligned with [[hospitality-positioning]]. Apollo browser automation with LLM-powered contact selection was added in Phase 6.1, along with session storage configuration and a rescore utility.

### Phase 6 – Parallel Workflows and Outreach Infrastructure
The Phase 6 commits on 2026-02-25 formalized a dual-track workflow separating automated pipeline runs from manual outreach. Gmail Drafts integration was added on 2026-03-04 for outreach follow-ups, with dynamic loading from `outreach_log.csv`, HTML email formatting with a clickable signature, and SMTP send capability. Application tracking for ByteDance/TikTok, DoorDash, and Humana was also recorded.

### Meeting Prep and Interview Preparation
Starting 2026-03-03, the repository took on a knowledge management role for active interviews and networking. A meeting prep system was initialized alongside the [[rogers-leo-mews-meeting-prep-march-3-2026]] brief, with a follow-up commit tracking the meeting's positive outcome. On 2026-03-23, dedicated interview prep documents were added for [[maison-call-interview-preparation-brief-fredrik-sjoberg-march-2026]], [[spiderrock-interview-preparation-junior-quantitative-developer-role]], and a hospitality outreach playbook. CLAUDE.md agent instructions were also committed, indicating integration with Claude as an AI assistant for the system.

### Knowledge Base Expansion
On 2026-03-10, PayPal and SpiderRock resume variants were added, and [[proj-marketpulse-ai]] and [[proj-imessage-scheduler]] were registered in the knowledge base. The broader projects portfolio tracked in the repository also references [[proj-wind-energy-forecasting]], [[proj-edgemesh]], [[proj-adversarial]], [[proj-laundry-management]], [[proj-optireality]], [[proj-parser]], [[proj-superplay]], and [[star-stories]]. Role targeting and positioning artifacts connect to [[role-families]], [[stardrift-yc-s24-founding-software-engineer-interview-prep]], [[stardrift-founding-swe-interview-leila-clark-call-prep]], [[harrison-qian-builder-profile-meeting-prep]], [[meeting-prep-brenton-andersen-toolhouse-creative-writing-app]], [[maison-negotiation-logistics-notes-rahil-offer-2026]], and [[mechanize-rl-environment-company-for-frontier-ai-labs]].

---

## Timeline

### February 2026
**Feb 10** — Repository initialized with the full career data layer: identity, experience, projects, [[skills-inventory]], [[bullet-bank-reusable-resume-bullets-by-engineering-domain]], impact metrics, LaTeX resume source, cover letter and networking guides, application tracker, operational playbooks, and the [[decision-framework-what-to-build-first-for-job-search-automation]]. Architecture roadmap and manual workflow documentation also committed.

**Feb 11** — Phase 1 completed: Application Generator CLI designed, implemented, and debugged in a single day.

**Feb 13** — Jinja2 template bug fixed; anti-hallucination constraints strengthened; hallucination analysis documented.

**Feb 14** — Phase 2 completed: full job scraping stack built (foundation, board scrapers, job tracker, orchestrator, LinkedIn overnight batch processor, validation layer). Comprehensive system test with mock data committed.

**Feb 17** — `JobDeduplicator`, interactive review CLI, approval gate, FastAPI dashboard, email digest system, batch application runner, apply workflow, `SkillsGapAnalyzer`, `SalaryIntelligence`, `CompanyResearcher`, weekly report, resume variants, cover letter variants, and unit tests all committed.

**Feb 18** — Pipeline integration tests, Phase 3 summary documentation, README rewrite, end-to-end pipeline runner script, onboarding polish (`.env.example`, `conftest.py`), and Phase 4 semi-automated LinkedIn Easy Apply module committed.

**Feb 25** — Phase 5 (hospitality tech outreach system) and Phase 6 (documentation, parallel workflow, Apollo browser automation with LLM contact selection) completed.

### March 2026
**Mar 3** — Meeting prep system initialized; [[rogers-leo-mews-meeting-prep-march-3-2026]] brief committed; ideas section restructured with Integration Intelligence Agent concept; positive meeting outcome tracked.

**Mar 4** — Gmail Drafts integration for outreach follow-ups completed (dynamic CSV loading, HTML email, SMTP send). Application tracking updated for ByteDance/TikTok, DoorDash, and Humana outreach.

**Mar 10** — PayPal and SpiderRock resume variants added; [[proj-marketpulse-ai]] and [[proj-imessage-scheduler]] added to knowledge base.

**Mar 23** — [[maison-call-interview-preparation-brief-fredrik-sjoberg-march-2026]] and [[spiderrock-interview-preparation-junior-quantitative-developer-role]] interview prep documents committed; LinkedIn follow-up tracking updated; hackathon portfolio documented; CLAUDE.md agent instructions and hospitality outreach playbook added.
