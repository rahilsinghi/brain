---
status: processed
source_type: graphify-community
repo: career-datacenter
community_id: 19
ingested_at: 2026-04-13T22:29:48.749Z
parsed_at: 2026-04-13T22:29:48.749Z
compiled_to: "[[Job Scraper Filtering and Scoring Logic]]"
processed_at: 2026-04-13T22:30:03.924Z
retry_count: 0
last_error: null
compile_progress: null
---



# career-datacenter — Community 19

## Files in this cluster

- `/Users/rahilsinghi/Desktop/career-datacenter/cli/job_scraper_models.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/job_scraper_models.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/job_scraper_models.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/job_scraper_models.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/job_scraper_models.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/job_scraper_models.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/job_scraper_models.py` — 1 connection

## Internal relationships

- `job_scraper_models_filterresult_add_reason` → `job_scraper_models_filterresult_add_dealbreaker` (calls)
- `job_scraper_models_filterresult_add_reason` → `job_scraper_models_filterresult_add_missing_required` (calls)
- `job_scraper_models_filterresult_add_reason` → `job_scraper_models_filterresult_adjust_score` (calls)
- `job_scraper_models_filterresult_add_dealbreaker` → `job_scraper_models_rationale_152` (rationale_for)
- `job_scraper_models_filterresult_add_missing_required` → `job_scraper_models_rationale_158` (rationale_for)
- `job_scraper_models_filterresult_adjust_score` → `job_scraper_models_rationale_164` (rationale_for)

## External dependencies

- `job_scraper_models_filterresult` → `job_scraper_models_filterresult_add_reason` (method) [community 0]
- `job_scraper_models_filterresult` → `job_scraper_models_filterresult_add_dealbreaker` (method) [community 0]
- `job_scraper_models_filterresult` → `job_scraper_models_filterresult_add_missing_required` (method) [community 0]
- `job_scraper_models_filterresult` → `job_scraper_models_filterresult_adjust_score` (method) [community 0]