# Graph Report - /Users/rahilsinghi/Desktop/career-datacenter  (2026-04-13)

## Corpus Check
- 118 files · ~150,023 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1018 nodes · 2583 edges · 24 communities detected
- Extraction: 58% EXTRACTED · 42% INFERRED · 0% AMBIGUOUS · INFERRED: 1082 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `Job` - 127 edges
2. `JobStatus` - 124 edges
3. `JobSource` - 116 edges
4. `LLMClient` - 96 edges
5. `JobTracker` - 79 edges
6. `KnowledgeBase` - 71 edges
7. `JDParser` - 65 edges
8. `ResumeGenerator` - 62 edges
9. `JobScraperBase` - 62 edges
10. `FitScorer` - 59 edges

## Surprising Connections (you probably didn't know these)
- `Company model for hospitality tech targets` --uses--> `LLMClient`  [INFERRED]
  /Users/rahilsinghi/Desktop/career-datacenter/cli/company_discovery.py → /Users/rahilsinghi/Desktop/career-datacenter/cli/llm_client.py
- `Convert to dict for CSV export` --uses--> `LLMClient`  [INFERRED]
  /Users/rahilsinghi/Desktop/career-datacenter/cli/company_discovery.py → /Users/rahilsinghi/Desktop/career-datacenter/cli/llm_client.py
- `Load Tier 1 curated companies from YAML` --uses--> `LLMClient`  [INFERRED]
  /Users/rahilsinghi/Desktop/career-datacenter/cli/company_discovery.py → /Users/rahilsinghi/Desktop/career-datacenter/cli/llm_client.py
- `Rank companies by priority score.      Priority algorithm (already computed in Y` --uses--> `LLMClient`  [INFERRED]
  /Users/rahilsinghi/Desktop/career-datacenter/cli/company_discovery.py → /Users/rahilsinghi/Desktop/career-datacenter/cli/llm_client.py
- `Save companies to tracking CSV` --uses--> `LLMClient`  [INFERRED]
  /Users/rahilsinghi/Desktop/career-datacenter/cli/company_discovery.py → /Users/rahilsinghi/Desktop/career-datacenter/cli/llm_client.py

## Communities

### Community 0 - "Community 0"
Cohesion: 0.03
Nodes (128): ABC, Enum, JobFilter, main(), Job Filter  Applies filters to scraped jobs based on configuration. Checks for m, Check for must-have keywords.          Job must have at least ONE language AND O, Check for bonus keywords that boost score., Check salary requirements. (+120 more)

### Community 1 - "Community 1"
Cohesion: 0.03
Nodes (71): AnswerBank, _flatten(), Loads easy_apply_answers.yaml and provides fuzzy lookup for question labels., Load and flatten the YAML into a list of entry dicts., Find the best-matching answer bank entry for the given question label., EasyApplyFiller, _load_yaml(), Deferred Playwright import + launch headed Chromium. (+63 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (77): Generate applications for all jobs above a fit score threshold., Internal runner — processes each job dict., Generate resume + cover letter for one job. Returns output directory., Append this application to tracking/applications.csv., Generates tailored application packs for a list of approved jobs.      For each, Generate applications for all jobs approved in the review CLI., Generate application for a single job by ID., BaseModel (+69 more)

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (38): main(), OvernightBatchProcessor, Scrape LinkedIn jobs., Save jobs to tracker., Return only jobs that were approved in the review CLI., Generate applications for high-fit jobs., Generate daily summary report., Send daily email digest if Gmail credentials are configured. (+30 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (44): KnowledgeBase, Load voice_profile/rahil_voice.yaml (writing style guide)., Get specific experience by ID., Get specific project by ID., Filter STAR stories by tags.          Args:             tags: List of tags to ma, Filter STAR stories by role family.          Args:             role_family: Role, Build complete knowledge base context for prompts.          Returns:, Build YAML string of full context for prompt injection.          Useful for inje (+36 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (47): EasyApplyQueue, get_output_paths(), get_url_for_job(), _handle_result(), load(), main(), _mark_applied_in_csv(), Find the most recent output directory for this job. (+39 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (45): ApolloBrowserAgent, ApolloContact, main(), Reveal email and extract contact data from a result row          Args:, Helper to extract text from element using multiple selectors          Args:, Check how many Apollo credits remain          Returns:             Number of cre, Update credits tracking file          Args:             credits_used: Number of, Close browser and cleanup (+37 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (51): discover(), generate_meeting_prep(), get_company_info(), get_top_companies(), HospitalityCompany, load_tier1_companies(), main(), rank_companies() (+43 more)

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (25): _body_to_html(), _build_followup_body(), _check_credentials(), create_draft(), draft_all_followups(), draft_followup(), get_all_followups(), list_followups() (+17 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (22): create_draft(), get_entries_needing_followup(), get_stats(), init_outreach_log(), main(), mark_as_replied(), mark_as_sent(), OutreachLog (+14 more)

### Community 10 - "Community 10"
Cohesion: 0.16
Nodes (15): ApplicationBatchRunner, main(), batch_generate(), generate_and_review(), main(), mark_applied(), _open_pdf(), Generate application for one job then prompt to mark as applied. (+7 more)

### Community 11 - "Community 11"
Cohesion: 0.16
Nodes (5): _make_job(), TestLoadJobs, TestSaveJobs, TestSummaryReport, TestUpdateStatus

### Community 12 - "Community 12"
Cohesion: 0.27
Nodes (18): analytics(), applications(), easy_apply_page(), _fmt_salary(), _html_page(), job_action(), job_detail(), jobs_table() (+10 more)

### Community 13 - "Community 13"
Cohesion: 0.16
Nodes (17): _classify_from_text(), get_companies_from_jobs(), list_cached_companies(), load_companies(), main(), print_company(), Find first matching category from keyword_map based on text., Attempt to scrape basic company info from public sources.     Returns a dict wit (+9 more)

### Community 14 - "Community 14"
Cohesion: 0.28
Nodes (14): build_markdown(), daily_activity(), load_applications(), load_scraped_jobs(), main(), print_summary(), Count jobs per day of the week., Print a quick terminal summary. (+6 more)

### Community 15 - "Community 15"
Cohesion: 0.21
Nodes (13): analyze(), extract_skills_from_text(), load_jobs(), load_your_skills(), main(), print_report(), Load all skill names from skills.yaml., Extract skill names found in a job description text. (+5 more)

### Community 16 - "Community 16"
Cohesion: 0.18
Nodes (7): Tracker Updater  Automatically updates tracking/applications.csv and tracking/co, Add or update company in companies.yaml.          Args:             company: Com, Check if application already exists in CSV., Updates application tracking files., Initialize tracker updater.          Args:             base_path: Path to career, Add new application to tracking CSV.          Args:             company: Company, TrackerUpdater

### Community 17 - "Community 17"
Cohesion: 0.29
Nodes (10): analyze(), classify_experience(), classify_role(), fmt_k(), load_jobs(), main(), parse_salary(), print_report() (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.33
Nodes (8): _body_to_html(), build_msg(), create_draft(), log_to_csv(), main(), Append to Gmail Drafts using an existing IMAP connection., Send immediately via SMTP., send_email()

### Community 19 - "Community 19"
Cohesion: 0.29
Nodes (3): Add a dealbreaker that was found., Add a missing required keyword category., Adjust score for a specific reason.

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (1): pytest configuration for career-datacenter test suite.  Adds cli/ to sys.path so

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (1): Create from YAML config dictionary.

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (1): Flatten nested YAML structure into a flat list.          Input structure:

## Knowledge Gaps
- **115 isolated node(s):** `pytest configuration for career-datacenter test suite.  Adds cli/ to sys.path so`, `LaTeX Utilities  Handles LaTeX compilation to PDF using pdflatex.  Usage:     fr`, `Compile LaTeX code to PDF using pdflatex.      Args:         latex_code: LaTeX s`, `Check if LaTeX compiler is installed.      Args:         compiler: Compiler to c`, `Convert Markdown to PDF using pandoc or wkhtmltopdf.      Args:         markdown` (+110 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 20`** (2 nodes): `conftest.py`, `pytest configuration for career-datacenter test suite.  Adds cli/ to sys.path so`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (1 nodes): `__init__.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (1 nodes): `Create from YAML config dictionary.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (1 nodes): `Flatten nested YAML structure into a flat list.          Input structure:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LLMClient` connect `Community 2` to `Community 4`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.202) - this node is a cross-community bridge._
- **Why does `Job` connect `Community 0` to `Community 3`, `Community 2`, `Community 11`, `Community 5`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `ResumeGenerator` connect `Community 4` to `Community 10`, `Community 0`, `Community 2`, `Community 3`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Are the 123 inferred relationships involving `Job` (e.g. with `TestCSVOutputFormat` and `TestMultiRunDeduplication`) actually correct?**
  _`Job` has 123 INFERRED edges - model-reasoned connections that need verification._
- **Are the 122 inferred relationships involving `JobStatus` (e.g. with `TestCSVOutputFormat` and `TestMultiRunDeduplication`) actually correct?**
  _`JobStatus` has 122 INFERRED edges - model-reasoned connections that need verification._
- **Are the 113 inferred relationships involving `JobSource` (e.g. with `TestCSVOutputFormat` and `TestMultiRunDeduplication`) actually correct?**
  _`JobSource` has 113 INFERRED edges - model-reasoned connections that need verification._
- **Are the 88 inferred relationships involving `LLMClient` (e.g. with `FitAnalysis` and `FitScorer`) actually correct?**
  _`LLMClient` has 88 INFERRED edges - model-reasoned connections that need verification._