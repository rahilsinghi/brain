---
status: pending
source_type: file_drop
source_id: null
ingested_at: 2026-04-10T12:30:00Z
parsed_at: 2026-04-10T12:30:00Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Career Datacenter — Comprehensive Project Profile

## 1. Project Summary

Career Datacenter is an end-to-end job search automation platform for Rahil Singhi's MS Computer Engineering student-to-full-time-engineer transition. Built in Python with 44 CLI modules, it scrapes LinkedIn + multiple job boards nightly, scores jobs with LLM-powered fit analysis, generates tailored LaTeX resumes + cover letters, and semi-automates LinkedIn Easy Apply using Playwright browser automation. Users review jobs via terminal CLI or FastAPI web dashboard, approve targets, and submit applications. The system tracks the entire pipeline from scrape → approval → application → interview → offer, with email digests, weekly reports, and analytics dashboards.

**Owner:** Rahil Singhi | **Status:** Phase 4 complete, actively maintained | **Graduating:** May 2026 (NYU MS Computer Engineering) | **Target Roles:** Backend SWE, ML Engineer, Data Engineer | **Tech Stack:** Python 3.11+, Claude/Anthropic API, FastAPI, Playwright, LaTeX/Jinja2, PostgreSQL/BigQuery optional

## 2. Tech Stack

**Core Languages & Runtimes:**
- Python 3.11+ (primary); TypeScript/JavaScript in NestJS examples
- LaTeX (resume generation via pdflatex)

**LLM & AI:**
- Anthropic Claude (primary; supports Haiku, Sonnet, Opus models)
- LM Studio (local models via OpenAI-compatible API)
- OpenAI API (fallback)
- GPT-4o/Gemini tool-calling (legacy Kismet references)

**Web & API:**
- FastAPI 0.129.0 (web dashboard)
- Uvicorn 0.41.0 (ASGI server)
- Jinja2 3.1.4 (LaTeX/email template rendering)
- Requests 2.32.0 (HTTP client)
- HTTPX 0.28.1 (async HTTP)

**Data & ORM:**
- PyYAML 6.0.1 (knowledge base canonical storage)
- Pydantic 2.9.0 (data validation & schemas)
- CSV (job tracking in /tracking/)
- JSON (reviewed jobs state)
- BigQuery (Kismet tracking internship context, optional)

**Scraping & Browser Automation:**
- Playwright 1.40.0 (LinkedIn Easy Apply headless browser automation)
- BeautifulSoup4 4.12.0 (HTML parsing for company research)
- LinkedIn-api 2.1.0 (unofficial LinkedIn scraper)
- Custom scrapers for Indeed, Y Combinator, Wellfound, Handshake

**Document Generation:**
- Pandoc (markdown → PDF conversion)
- pdflatex (LaTeX compilation to PDF)
- python-multipart 0.0.22 (file uploads in dashboard)

**CLI & Development:**
- Click 8.1.0 (CLI prompts & interface)
- Typer 0.12.0 (alternative CLI framework, optional)
- Rich 13.7.0 (terminal output formatting)
- TQDM 4.66.0 (progress bars)
- Black 24.0.0 (code formatting)
- Ruff 0.6.0 (linting)
- Pytest 8.0.0 (37 tests, all passing)

**Environment & Config:**
- python-dotenv 1.0.0 (.env file loading)
- Anthropic SDK >=0.40.0 (Claude API client)
- OpenAI SDK >=1.54.0 (LM Studio/OpenAI compatibility)

**Gmail Integration (MCP):**
- Gmail API client for draft creation, thread management, label operations
- No send/delete capability (user manually sends from Gmail UI)

## 3. Architecture

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

1. **Knowledge Base (Single Source of Truth):** YAML files in `/data/` encode candidate identity, skills, projects, experience, metrics, preferences. Loaded once by `KnowledgeBase` class, passed to scorers/generators.

2. **LLM-Driven Composition:** Fit scoring, resume generation, and cover letter drafting all use Claude with system prompts from `/prompts/system_prompts/*.yaml`. Temperature 0.1–0.3 for determinism.

3. **CSV-Centric State:** Jobs tracked in `/tracking/scraped_jobs.csv` (job_id, fit_score, status, easy_apply_enabled). Applications tracked in `/tracking/applications.csv`. Enables git-friendly diffs and external tooling.

4. **Playwright Headed Browser (User-Supervised):** Easy Apply automation opens a visible Chromium browser, auto-fills form fields, and **pauses on review page**. User must manually click Submit. Satisfies LinkedIn ToS requirement of human oversight.

5. **Modular CLI Architecture:** Each feature (scrape, score, review, apply, email digest) is a separate script with consistent argument parsing (Click/Typer). `batch_process_overnight.py` orchestrates the full pipeline.

6. **Template-Driven Generation:** LaTeX resumes and HTML emails rendered with Jinja2 from templates in `/templates/`. Supports style variants (metric_focused, mission_focused, story_focused).

**State Management:**
- **Scraped jobs:** CSV + optional JSON cache
- **Reviewed decisions:** JSON (reviewed_jobs.json) storing user approvals
- **Outreach tracking:** CSV (outreach_log.csv) for hospitality outreach Phase
- **Easy Apply answers:** YAML bank (easy_apply_answers.yaml) for form pre-fills (contact info, salary expectations, screening Q&A)

## 4. Directory Structure

```
career-datacenter/
├── README.md                              Main user guide
├── CLAUDE.md                              Agent instructions (hospitality outreach)
├── ARCHITECTURE.md                        System design docs
├── requirements.txt                       Python dependencies (44 packages)
├── pytest.ini                             Test configuration
├── .env.example                           Template for environment secrets
│
├── cli/                                   (44 Python modules, ~600 lines avg)
│   ├── batch_process_overnight.py         Main entry point (scrape→score→gen→email)
│   ├── scraper_linkedin.py                LinkedIn job scraper (headless browser)
│   ├── scraper_indeed.py                  Indeed scraper
│   ├── scraper_wellfound.py               Wellfound (YC startup jobs) scraper
│   ├── scraper_ycombinator.py             Y Combinator Jobs scraper
│   ├── job_scraper_base.py                Abstract base for all scrapers
│   ├── job_scraper_models.py              Pydantic models: Job, JobStatus, JobSource
│   ├── job_filter.py                      Filters by salary, location, visa, seniority
│   ├── job_deduplicator.py                Prevents duplicate processing
│   ├── job_tracker.py                     CSV persistence & state mgmt
│   ├── fit_scorer.py                      LLM-based job-candidate fit scoring
│   ├── jd_parser.py                       Parses job description → structured data
│   ├── resume_generator.py                Generates tailored LaTeX resume
│   ├── resume_validator.py                Validates & scores resume quality
│   ├── resume_variants.py                 Engineering vs ML-focused resume variants
│   ├── cover_letter_generator.py          LLM-generated cover letters (Jinja2)
│   ├── latex_utils.py                     Compile LaTeX → PDF, markdown → PDF
│   ├── job_review_cli.py                  Terminal UI for reviewing jobs (rich prompts)
│   ├── dashboard.py                       FastAPI web dashboard (localhost:8000)
│   ├── apply_workflow.py                  Generate + submit applications
│   ├── easy_apply_workflow.py             Queue + orchestrate Easy Apply jobs
│   ├── easy_apply_filler.py               Playwright browser automation for Easy Apply
│   ├── answer_bank.py                     Pre-filled form answers for Easy Apply
│   ├── email_digest.py                    Daily HTML digest email (Gmail API)
│   ├── email_generator.py                 Email body + subject generation
│   ├── gmail_drafts.py                    Create Gmail drafts (MCP client)
│   ├── knowledge_base_loader.py           Load & cache YAML knowledge base
│   ├── llm_client.py                      Unified LLM client (Anthropic/LM Studio/OpenAI)
│   ├── skills_gap.py                      Skills demand analysis across jobs
│   ├── salary_intel.py                    Salary benchmarking report
│   ├── company_researcher.py              BeautifulSoup company enrichment
│   ├── company_discovery.py               Company discovery (Kismet context)
│   ├── contact_finder.py                  LinkedIn/Apollo contact identification
│   ├── weekly_report.py                   Weekly summary report
│   ├── outreach_tracker.py                Track cold outreach (hospitality focus)
│   ├── followup_generator.py              Auto-generate follow-up emails (5-day rule)
│   ├── hospitality_outreach.py            CLI for outreach campaigns
│   ├── linkedin_messages.py               LinkedIn message templates
│   ├── apollo_browser.py                  Apollo.io browser scraper (legacy)
│   ├── application_runner.py              Batch application generation runner
│   ├── generate_application.py            Single application generator
│   ├── tracker_updater.py                 Update application status
│   ├── rescore_jobs.py                    Re-score existing jobs
│   ├── run_job_scraper.py                 Scraper CLI entry point
│   ├── test_scraper_system.py             Scraper validation tests
│   └── README.md                          CLI module documentation
│
├── config/                                Configuration & rules
│   └── scraper_config.yaml                Scraper settings, cover letter style, keywords
│
├── data/                                  (19 YAML files, canonical knowledge base)
│   ├── profile.yaml                       Personal identity (name, email, phone, summary)
│   ├── experience.yaml                    Work experience (Kismet internships, etc.)
│   ├── projects.yaml                      Side projects (Wind forecasting, MarkPush, Flock)
│   ├── skills.yaml                        Skills inventory (language, frameworks, tools)
│   ├── education.yaml                     Degrees & coursework
│   ├── courses.yaml                       Relevant coursework, MOOCs
│   ├── activities.yaml                    Extracurriculars, awards
│   ├── metrics.yaml                       Quantifiable achievements
│   ├── stories_star.yaml                  STAR narrative library for bullets
│   ├── keyword_library.yaml               ATS keywords by role family
│   ├── role_families.yaml                 Target role categories & tiers
│   ├── links.yaml                         Portfolio URLs (LinkedIn, GitHub, website)
│   ├── preferences.yaml                   Salary, location, work mode
│   ├── easy_apply_answers.yaml            Pre-filled form answers (contact, salary, URLs)
│   ├── hospitality_companies_tier1.yaml   50+ companies in hospitality tech
│   ├── hospitality_positioning.yaml       Category-specific positioning (PMS, revenue mgmt, etc.)
│   ├── email_templates.yaml               Email template library
│   └── keyword_library.yaml               ATS keyword matching
│
├── prompts/                               LLM system prompts
│   └── system_prompts/
│       ├── fit_scorer.yaml                Fit scoring logic & rubric
│       ├── resume_generator.yaml          Resume composition instructions
│       ├── cover_letter.yaml              Cover letter style & tone
│       └── email_generator.yaml           Email subject/body generation
│
├── templates/                             Jinja2 templates
│   ├── resume_template.tex                LaTeX resume master
│   ├── cover_letter.html                  HTML email template
│   └── email_digest.html                  Daily digest email layout
│
├── scripts/                               Shell & utility scripts
│   ├── setup_playwright.sh                Playwright + Chromium install
│   ├── start_dashboard.sh                 Launch FastAPI dashboard
│   └── cron_overnight.sh                  Cron job wrapper
│
├── tracking/                              Runtime state (git-tracked CSVs)
│   ├── scraped_jobs.csv                   All scraped jobs + fit scores
│   ├── applications.csv                   Application pipeline (generated, submitted, etc.)
│   ├── reviewed_jobs.json                 User approval decisions
│   ├── outreach_log.csv                   Cold outreach emails sent (hospitality phase)
│   └── linkedin_followups.md              Follow-up tracking (hospitality)
│
├── outputs/                               Generated application packs (PDFs)
│   ├── batch_generated/
│   │   ├── YYYYMMDD/
│   │   │   ├── company_name_resume.pdf
│   │   │   ├── company_name_cover_letter.pdf
│   │   │   └── application_pack.json
│   │   └── ...
│   └── archives/
│
├── prep/                                  Meeting preparation docs
│   ├── <company>_<contact>_prep.md        Full prep (research, talking points, scripts)
│   ├── <company>_talking_points.md        TL;DR version
│   └── ...
│
├── docs/                                  Documentation & guides
│   ├── HOSPITALITY_OUTREACH_PLAYBOOK.md   Full outreach methodology
│   ├── HOSPITALITY_TECH_LANDSCAPE.md      Company deep dives
│   ├── JOB_SCRAPER_GUIDE.md               Scraper architecture docs
│   ├── COMPANY_DISCOVERY_README.md        Company research flows
│   ├── bullet_bank.md                     Reusable resume bullets
│   ├── interview_prep.md                  Interview prep materials
│   └── master_resume_source.md            Comprehensive resume library
│
├── inputs/                                Manually managed inputs
│   └── resumes/
│       ├── one_page_*.tex                 Role-specific LaTeX variants
│       └── one_page_*.pdf                 Compiled PDFs
│
├── tests/                                 (6 test modules, 37 tests total)
│   ├── conftest.py                        Pytest fixtures
│   ├── test_pipeline_integration.py       End-to-end scrape→score→gen flow
│   ├── test_job_tracker.py                CSV state management
│   ├── test_deduplicator.py               Duplicate detection
│   ├── test_easy_apply_filler.py          Playwright automation
│   ├── test_easy_apply_answers.py         Form pre-filling logic
│   └── __init__.py
│
├── .git/                                  Git repo (version controlled)
├── .gitignore                             Excludes .env, venv/, outputs/
├── CHANGELOG.md                           Version history
├── PHASE_*.md                             Phase completion summaries
├── PHASE_4_SUMMARY.md                     Easy Apply implementation
└── APPLICATION_GENERATOR_PLAN.md          Original feature specification
```

## 5. Key Components (8 Core Modules)

1. **batch_process_overnight.py** (OvernightBatchProcessor class)
   - Orchestrates full pipeline: scrape → filter → deduplicate → score → generate
   - Entry point for cron job (2am nightly)
   - Flags: `--auto-approve` (skip manual review), `--min-score N` (fit threshold), `--dry-run`
   - Outputs: scraped_jobs.csv (with fit scores), email digest

2. **fit_scorer.py** (FitScorer class)
   - LLM-based job-candidate matching; outputs FitAnalysis (0–10 score + recommendation)
   - Loads jd_parser output + knowledge base; generates structured JSON via Claude
   - Scores keyword coverage, relevant projects, gaps; recommendation: strong/good/moderate/weak

3. **easy_apply_filler.py** (EasyApplyFiller class)
   - Playwright-based LinkedIn Easy Apply browser automation
   - Auto-fills contact info, uploads resume PDF, fills cover letter textarea, answers screening Q&A
   - Pauses on review page; user manually clicks Submit
   - Headless=False (user sees browser); slow_mo=150ms for readability

4. **resume_generator.py** (ResumeGenerator class)
   - Generates tailored LaTeX resume from parsed job description + knowledge base
   - Uses Jinja2 to render /templates/resume_template.tex
   - Includes header, education, experience, projects, skills sections with LaTeX escaping
   - Produces .tex file → compiled to PDF via pdflatex

5. **dashboard.py** (FastAPI app)
   - Web UI at localhost:8000 with routes: /, /jobs, /jobs/{id}, /applications, /analytics
   - Loads scraped_jobs.csv + applications.csv + reviewed_jobs.json
   - Tables: all jobs (sortable/filterable), kanban pipeline view, skill trends, salary distribution
   - Forms to mark jobs as approved/rejected/applied

6. **job_tracker.py** (JobTracker class)
   - Persistent CSV-based job database; tracks job_id → fit_score → status → applied_date
   - Deduplicates by job_id to prevent double-processing
   - Generates reports on pipeline progress

7. **llm_client.py** (LLMClient class)
   - Unified interface to Anthropic Claude, LM Studio (local), or OpenAI
   - Reads provider from .env (LLM_PROVIDER); supports temperature + max_tokens tuning
   - Used by fit_scorer, resume_generator, cover_letter_generator

8. **knowledge_base_loader.py** (KnowledgeBase class)
   - Loads all /data/*.yaml files once into memory
   - Caches profile, experience, projects, skills, metrics for use by scorers/generators
   - Prevents repeated file I/O; enables consistent candidate identity across runs

## 6. APIs & Integrations

**LinkedIn:**
- Unofficial API via linkedin-api library (requires LINKEDIN_COOKIE_LI_AT + LINKEDIN_COOKIE_JSESSIONID env vars)
- Scrapes job listings, job details, easy apply eligibility
- Playwright browser automation for Easy Apply form interaction

**Gmail (MCP):**
- Create Gmail drafts (not auto-send; user sends manually)
- Search/read threads, label management
- Requires GMAIL_APP_PASSWORD + DIGEST_EMAIL env vars
- Used by email_digest.py to compose daily digest

**Anthropic Claude API:**
- Primary LLM for fit scoring, resume generation, cover letter composition
- Supports models: Haiku, Sonnet, Opus
- env vars: ANTHROPIC_API_KEY, ANTHROPIC_MODEL_RESUME

**LM Studio / OpenAI:**
- Fallback LLM providers for local or commercial alternatives
- OpenAI-compatible API interface (POST /v1/chat/completions)

**Job Boards:**
- Indeed, Y Combinator, Wellfound, Handshake, LinkedIn, Built In NYC
- Custom scrapers in scraper_*.py (headless browser or API)

**Optional Cloud Services:**
- BigQuery (salary benchmarking, analytics)
- Apollo.io (contact finder, legacy apollo_browser.py)
- Clearbit (company enrichment, optional)

**Auth Methods:**
- Environment variables (.env file)
- LinkedIn session cookies (captured manually)
- Gmail App Passwords (not full account password)
- API keys for Claude, OpenAI, LM Studio

## 7. Development Setup

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
pytest tests/ -v    # 37 tests, all passing
pytest tests/test_easy_apply_filler.py -v  # Playwright tests (require headless browser)
```

**Running Locally:**
```bash
# Full overnight batch (interactive review)
python cli/batch_process_overnight.py

# Scrape only (no generation)
python cli/batch_process_overnight.py --dry-run

# Auto-approve high-fit jobs
python cli/batch_process_overnight.py --auto-approve --min-score 9.0

# Terminal review UI
python cli/job_review_cli.py

# Web dashboard
./scripts/start_dashboard.sh
# Opens http://localhost:8000

# Single job application
python cli/apply_workflow.py --job-id linkedin_4372772208

# Easy Apply queue
python cli/easy_apply_workflow.py --queue

# Easy Apply workflow (interactive)
python cli/easy_apply_workflow.py --run

# Dry run Easy Apply (no browser)
python cli/easy_apply_workflow.py --dry-run --job-id linkedin_1234567
```

**Cron Setup (macOS):**
```bash
crontab -e
# Add:
0 2 * * * cd /Users/rahilsinghi/Desktop/Career-Datacenter && source venv/bin/activate && python cli/batch_process_overnight.py --auto-approve --min-score 9.0 >> /tmp/career_dc.log 2>&1
```

## 8. Current State: Working Features & Known Limitations

**Fully Working (Phase 4 Complete):**
- ✅ Multi-source job scraping (LinkedIn, Indeed, Y Combinator, Wellfound, Handshake)
- ✅ Job filtering (salary range, location, remote, visa sponsorship, seniority)
- ✅ Deduplication (prevent re-processing same job across runs)
- ✅ LLM-powered fit scoring with structured rubric
- ✅ Terminal review CLI (rich prompts, approve/reject/skip)
- ✅ FastAPI web dashboard (pipeline view, job detail, analytics)
- ✅ Tailored LaTeX resume generation (Jinja2 + pdflatex)
- ✅ LLM-generated cover letters (3 style variants: metric/mission/story-focused)
- ✅ Email digest delivery (Gmail API, daily HTML)
- ✅ Easy Apply Playwright automation (form-filling, paused on review)
- ✅ Application pipeline tracking (CSV state machine)
- ✅ Weekly progress reports
- ✅ Skills gap analysis
- ✅ Salary intelligence benchmarking
- ✅ 37 pytest tests (all passing)

**Partially Working / In Progress:**
- ⚠️ Hospitality outreach module (Phase 6; email generator, follow-ups, outreach tracking)
- ⚠️ Company discovery (need manual updates to hospitality_companies_tier1.yaml)
- ⚠️ Resume variants (eng vs ML-focused; tested but not fully integrated into batch)
- ⚠️ Contact finder (apollo_browser.py exists but not integrated into main flow)

**Known Issues / Limitations:**
- LinkedIn API is unofficial; fragile to UI changes. Recommended: use LinkedIn cookie refresh monthly.
- Easy Apply only supports Chromium/Firefox (Playwright limitation); Edge unsupported.
- Outreach tracker assumes single-threaded email sending; no concurrency.
- Dashboard is read-only view; status updates via CSV only (no database backend).
- No ORM; all state in flat CSV/JSON files (works for <1000 jobs, may need refactor at scale).
- LaTeX compilation requires system pdflatex; Windows users need MiKTeX or WSL.
- Gmail API drafts don't auto-append user's signature; must include in template.

**Last Updated:** March 26, 2026 | **Test Suite:** 37 tests, pytest | **Git:** Version-controlled at /Users/rahilsinghi/Desktop/Career-Datacenter/.git

---
