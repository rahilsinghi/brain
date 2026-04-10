---
title: "Career Datacenter: Job Search Automation Platform"
author: ai
created_at: 2026-04-10T12:49:04.574Z
last_ai_edit: 2026-04-10T12:49:04.574Z
last_human_edit: null
last_embedded_hash: 1f77052e6e674560
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/repo-profiles/career-datacenter-project-profile.md]]"
tags:
  - job search
  - automation
  - python
  - llm
  - fastapi
  - playwright
  - linkedin
  - resume generation
  - cover letter
  - data engineering
  - machine learning
  - backend development
  - personal project
  - cli
  - web scraping
  - latex
  - anthropic
  - career transition
  - rahil singhi
  - full-stack
---


# Career Datacenter: Job Search Automation Platform

Career Datacenter is a Python-based, end-to-end job search automation platform developed by Rahil Singhi for his transition into a full-time engineering role. It integrates multi-source job scraping, LLM-powered fit analysis, tailored LaTeX resume and cover letter generation, and semi-automated LinkedIn Easy Apply with comprehensive pipeline tracking and analytics.

## Key Concepts

Job Search Automation,LLM-Powered Fit Analysis,Resume Generation (Tailored LaTeX),Cover Letter Generation,Browser Automation (Playwright),Application Pipeline Tracking,CLI (Command Line Interface),Web Dashboard (FastAPI),Knowledge Base Management,Multi-Source Web Scraping,Gmail API Integration,System Orchestration (Batch Processing),CSV-Centric State Management,User-Supervised Automation,Candidate Positioning

## Details

Career Datacenter is a comprehensive platform designed to streamline and automate the job search process. It is a personal project of Rahil Singhi, developed during his MS Computer Engineering program to facilitate his transition into a full-time engineering role.

## Project Overview

This platform serves as an end-to-end solution for job seekers, automating various stages from job discovery to application submission and tracking. It is built primarily in Python and consists of 44 Command Line Interface (CLI) modules, orchestrated to run nightly or on demand.

**Owner:** Rahil Singhi
**Status:** Phase 4 complete, actively maintained
**Graduating:** May 2026 (NYU MS Computer Engineering)
**Target Roles:** Backend SWE, ML Engineer, Data Engineer

## Tech Stack

Career Datacenter leverages a diverse set of technologies to achieve its automation goals:

**Core Languages & Runtimes:**
*   Python 3.11+ (primary)
*   LaTeX (for resume generation)

**LLM & AI:**
*   Anthropic Claude (primary, supporting Haiku, Sonnet, Opus)
*   LM Studio (for local models via OpenAI-compatible API)
*   OpenAI API (fallback option)

**Web & API:**
*   FastAPI 0.129.0 (for the web dashboard)
*   Uvicorn 0.41.0 (ASGI server)
*   Jinja2 3.1.4 (for LaTeX/email template rendering)
*   Requests 2.32.0, HTTPX 0.28.1 (HTTP clients)

**Data & ORM:**
*   PyYAML 6.0.1 (for knowledge base storage)
*   Pydantic 2.9.0 (for data validation and schemas)
*   CSV (for job tracking)
*   JSON (for reviewed jobs state)
*   BigQuery (optional, for analytics)

**Scraping & Browser Automation:**
*   Playwright 1.40.0 (for LinkedIn Easy Apply headless browser automation)
*   BeautifulSoup4 4.12.0 (for HTML parsing)
*   LinkedIn-api 2.1.0 (unofficial LinkedIn scraper)
*   Custom scrapers for Indeed, Y Combinator, Wellfound, Handshake

**Document Generation:**
*   Pandoc (Markdown to PDF conversion)
*   pdflatex (LaTeX compilation)

**CLI & Development:**
*   Click 8.1.0 (CLI framework)
*   Typer 0.12.0 (alternative CLI framework)
*   Rich 13.7.0 (terminal output formatting)
*   TQDM 4.66.0 (progress bars)
*   Black 24.0.0, Ruff 0.6.0 (code quality tools)
*   Pytest 8.0.0 (for testing, 37 passing tests)

**Environment & Config:**
*   python-dotenv 1.0.0 (.env file loading)
*   Anthropic SDK, OpenAI SDK

**Gmail Integration:**
*   Gmail API client (for draft creation, thread management, labeling).

## Architecture

The platform follows a modular architecture, with a clear data flow and distinct components.

**High-Level Data Flow:**
```
LinkedIn Scraper (scraper_linkedin.py)
    ↓
Job Filter (job_filter.py) [RemoteOK? Visa? Salary?]
    ↓
Deduplicator (job_deduplicator.py) [Skip if seen before]
    ↓
Job Tracker CSV (tracking/scraped_jobs.csv) [Persistent storage]
    ↓
Fit Scorer (fit_scorer.py) [LLM: parsed_jd → fit_analysis]
    ↓
Manual Review (job_review_cli.py or dashboard.py)
    ↓
Approval → Applications.csv updated
    ↓
Resume Generator (resume_generator.py) [Tailored LaTeX]
    ↓
Cover Letter Generator (cover_letter_generator.py) [Jinja2 + LLM]
    ↓
Easy Apply Filler (easy_apply_filler.py) [Playwright browser]
    ↓
Application Status Tracking (job_tracker.py) [applied/interviewed/offer]
```

**Key Architectural Patterns:**
1.  **Knowledge Base (Single Source of Truth):** Candidate's profile, skills, projects, and preferences are stored in YAML files (`/data/`) and loaded by a `KnowledgeBase` class.
2.  **LLM-Driven Composition:** Anthropic Claude is extensively used for fit scoring, resume tailoring, and cover letter generation, guided by system prompts for deterministic output.
3.  **CSV-Centric State:** Application pipeline state, scraped jobs, and other data are primarily managed in CSV files (`/tracking/`), allowing for Git-friendly version control and easy external access.
4.  **Playwright Headed Browser (User-Supervised):** Easy Apply automation uses a visible Chromium browser to fill forms and *pauses for manual review* before final submission, adhering to service terms.
5.  **Modular CLI Architecture:** Each functional module is a separate script with consistent argument parsing, orchestrated by `batch_process_overnight.py`.
6.  **Template-Driven Generation:** LaTeX resumes and HTML emails are rendered using Jinja2 templates, supporting various stylistic variants.

**State Management:**
*   **Scraped jobs:** CSV + optional JSON cache.
*   **Reviewed decisions:** JSON (`reviewed_jobs.json`).
*   **Outreach tracking:** CSV (`outreach_log.csv`).
*   **Easy Apply answers:** YAML bank (`easy_apply_answers.yaml`) for pre-filling forms.

## Directory Structure

The project is organized into logical directories:

```
career-datacenter/
├── README.md
├── CLAUDE.md
├── ARCHITECTURE.md
├── requirements.txt
├── pytest.ini
├── .env.example
│
├── cli/                                   (~44 Python modules)
│   ├── batch_process_overnight.py         (Main entry point)
│   ├── scraper_linkedin.py                (LinkedIn job scraper)
│   ├── job_filter.py                      (Filters jobs)
│   ├── fit_scorer.py                      (LLM-based job fit scoring)
│   ├── resume_generator.py                (Generates tailored LaTeX resume)
│   ├── easy_apply_filler.py               (Playwright automation)
│   ├── dashboard.py                       (FastAPI web dashboard)
│   ├── email_digest.py                    (Daily HTML digest email)
│   └── ... (other modules for tracking, research, outreach, etc.)
│
├── config/                                (Configuration files)
│   └── scraper_config.yaml
│
├── data/                                  (Canonical knowledge base, 19 YAML files)
│   ├── profile.yaml                       (Personal identity)
│   ├── experience.yaml                    (Work experience)
│   ├── projects.yaml                      (Side projects)
│   ├── skills.yaml                        (Skills inventory)
│   └── ... (other knowledge base components)
│
├── prompts/                               (LLM system prompts)
│   └── system_prompts/
│       ├── fit_scorer.yaml
│       └── resume_generator.yaml
│
├── templates/                             (Jinja2 templates)
│   ├── resume_template.tex
│   ├── cover_letter.html
│   └── email_digest.html
│
├── scripts/                               (Shell & utility scripts)
│   ├── setup_playwright.sh
│   └── start_dashboard.sh
│
├── tracking/                              (Runtime state, git-tracked CSVs)
│   ├── scraped_jobs.csv
│   ├── applications.csv
│   └── reviewed_jobs.json
│
├── outputs/                               (Generated application packs)
│   ├── batch_generated/
│   └── archives/
│
├── prep/                                  (Meeting preparation docs)
├── docs/                                  (Documentation & guides)
├── inputs/                                (Manually managed inputs)
├── tests/                                 (6 test modules, 37 tests)
├── .git/
├── .gitignore
├── CHANGELOG.md
└── PHASE_*.md
```

## Key Components (8 Core Modules)

1.  **`batch_process_overnight.py`** (OvernightBatchProcessor)
    *   Orchestrates the full pipeline: scrape → filter → deduplicate → score → generate.
    *   Primary entry point for cron jobs.
    *   Supports flags like `--auto-approve` and `--min-score`.

2.  **`fit_scorer.py`** (FitScorer)
    *   Performs LLM-based job-candidate matching, generating a 0-10 score and a recommendation.
    *   Uses parsed job descriptions and the knowledge base, outputting structured JSON via Claude.

3.  **`easy_apply_filler.py`** (EasyApplyFiller)
    *   Leverages Playwright for LinkedIn Easy Apply browser automation.
    *   Auto-fills forms, uploads resumes, and answers screening questions.
    *   **Crucially, it pauses on the review page for user's manual 'Submit' click.**

4.  **`resume_generator.py`** (ResumeGenerator)
    *   Generates tailored LaTeX resumes based on job descriptions and the knowledge base.
    *   Uses Jinja2 to render `resume_template.tex` into a `.tex` file, then compiles to PDF.

5.  **`dashboard.py`** (FastAPI app)
    *   Provides a web UI (localhost:8000) for viewing jobs, pipeline status, and analytics.
    *   Displays sortable/filterable tables, Kanban views, skill trends, and salary distributions.

6.  **`job_tracker.py`** (JobTracker)
    *   Manages the persistent CSV-based job database, tracking status and application dates.
    *   Handles deduplication and generates pipeline reports.

7.  **`llm_client.py`** (LLMClient)
    *   Offers a unified interface for Anthropic Claude, LM Studio, or OpenAI, configured via `.env`.
    *   Used consistently across modules requiring LLM interaction.

8.  **`knowledge_base_loader.py`** (KnowledgeBase)
    *   Loads and caches all YAML files from the `/data/` directory into memory.
    *   Ensures consistent access to candidate information for all generators and scorers.

## APIs & Integrations

*   **LinkedIn:** Unofficial `linkedin-api` library for scraping; Playwright for Easy Apply automation.
*   **Gmail (MCP):** Gmail API for creating email drafts, thread management, and labeling.
*   **Anthropic Claude API:** Primary LLM provider.
*   **LM Studio / OpenAI:** Fallback/alternative LLM providers with OpenAI-compatible API.
*   **Job Boards:** Direct integration with Indeed, Y Combinator, Wellfound, Handshake, Built In NYC via custom scrapers.
*   **Optional Cloud Services:** BigQuery (for analytics), Apollo.io (for contact finding).
*   **Authentication:** Environment variables (`.env`), LinkedIn session cookies, Gmail App Passwords, and API keys.

## Development Setup

**Prerequisites:**
```bash
# macOS
brew install python3.11 pdflatex pandoc
# OR: brew install basictex (minimal LaTeX)

# Linux
sudo apt install python3.11 texlive-latex-base texlive-latex-extra pandoc
```

**Installation & Activation:**
```bash
cd /Users/rahilsinghi/Desktop/Career-Datacenter
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Optional: install Playwright + Chromium (for Easy Apply)
chmod +x scripts/setup_playwright.sh
./scripts/setup_playwright.sh
```

**Environment Variables (.env):**
```bash
cp .env.example .env
# Required:
ANTHROPIC_API_KEY=sk-ant-...
LINKEDIN_COOKIE_LI_AT=...
LINKEDIN_COOKIE_JSESSIONID=...

# Optional:
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
DIGEST_EMAIL=you@gmail.com
DIGEST_FROM=you@gmail.com
LLM_PROVIDER=anthropic  # or lm_studio / openai
LM_STUDIO_BASE_URL=http://localhost:1234/v1
OPENAI_API_KEY=sk-...
```

**Running Tests:**
```bash
pytest tests/ -v
pytest tests/test_easy_apply_filler.py -v
```

**Running Locally:**
```bash
# Full overnight batch (interactive review)
python cli/batch_process_overnight.py

# Web dashboard
./scripts/start_dashboard.sh
# Opens http://localhost:8000

# Easy Apply workflow (interactive)
python cli/easy_apply_workflow.py --run
```

**Cron Setup (macOS example):**
```bash
crontab -e
# Add:
0 2 * * * cd /Users/rahilsinghi/Desktop/Career-Datacenter && source venv/bin/activate && python cli/batch_process_overnight.py --auto-approve --min-score 9.0 >> /tmp/career_dc.log 2>&1
```

## Current State: Working Features & Known Limitations

**Fully Working (Phase 4 Complete):**
*   Multi-source job scraping (LinkedIn, Indeed, Y Combinator, Wellfound, Handshake)
*   Job filtering by salary, location, visa, seniority
*   Deduplication of jobs
*   LLM-powered fit scoring with structured rubric
*   Terminal review CLI and FastAPI web dashboard
*   Tailored LaTeX resume and LLM-generated cover letter generation
*   Daily email digest delivery via Gmail API
*   Semi-automated LinkedIn Easy Apply (Playwright, user-supervised)
*   Application pipeline tracking, weekly reports, and skills gap/salary analysis
*   Comprehensive test suite (37 passing pytest tests)

**Partially Working / In Progress:**
*   Hospitality outreach module (Phase 6, includes email generation and tracking)
*   Company discovery features (requires manual updates)
*   Resume variants (e.g., engineering vs. ML-focused) are tested but not fully integrated into batch processes.

**Known Issues / Limitations:**
*   Unofficial LinkedIn API is fragile to UI changes.
*   Easy Apply automation is limited to Chromium/Firefox.
*   Outreach tracker assumes single-threaded email sending.
*   Dashboard is primarily a read-only view; status updates are CSV-based.
*   No ORM; relies on flat files for state, potentially limiting scalability for very large datasets.
*   LaTeX compilation requires system `pdflatex` (e.g., MiKTeX on Windows, or WSL).
*   Gmail API draft creation doesn't auto-append signatures; must be included in templates.

**Last Updated:** March 26, 2026
**Test Suite:** 37 tests, pytest
**Git:** Version-controlled at `/Users/rahilsinghi/Desktop/Career-Datacenter/.git`

## Related

[[Rahil Singhi]],[[Large Language Models (LLMs)]],[[Playwright]],[[FastAPI]],[[LaTeX]],[[Jinja2]],[[Python]],[[Anthropic Claude]],[[LinkedIn Easy Apply Automation]],[[Job Scraping]],[[Applicant Tracking Systems (ATS)]],[[Command Line Interface (CLI)]],[[Web Development]],[[Natural Language Processing (NLP)]]
