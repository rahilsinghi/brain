---
status: processed
source_type: graphify-community
repo: career-datacenter
community_id: 14
ingested_at: 2026-04-13T22:29:48.748Z
parsed_at: 2026-04-13T22:29:48.748Z
compiled_to: "[[Weekly Job Search Activity Report Generation]]"
processed_at: 2026-04-13T22:34:57.181Z
retry_count: 0
last_error: null
compile_progress: null
---



# career-datacenter — Community 14

## Files in this cluster

- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 12 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 8 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 6 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 5 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 5 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/weekly_report.py` — 1 connection

## Internal relationships

- `weekly_report` → `weekly_report_load_scraped_jobs` (contains)
- `weekly_report` → `weekly_report_load_applications` (contains)
- `weekly_report` → `weekly_report_score_distribution` (contains)
- `weekly_report` → `weekly_report_top_companies` (contains)
- `weekly_report` → `weekly_report_safe_score` (contains)
- `weekly_report` → `weekly_report_source_breakdown` (contains)
- `weekly_report` → `weekly_report_top_jobs` (contains)
- `weekly_report` → `weekly_report_daily_activity` (contains)
- `weekly_report` → `weekly_report_build_markdown` (contains)
- `weekly_report` → `weekly_report_print_summary` (contains)
- `weekly_report` → `weekly_report_main` (contains)
- `weekly_report_load_scraped_jobs` → `weekly_report_main` (calls)
- `weekly_report_load_applications` → `weekly_report_main` (calls)
- `weekly_report_score_distribution` → `weekly_report_build_markdown` (calls)
- `weekly_report_score_distribution` → `weekly_report_print_summary` (calls)
- `weekly_report_top_companies` → `weekly_report_safe_score` (calls)
- `weekly_report_top_companies` → `weekly_report_build_markdown` (calls)
- `weekly_report_top_companies` → `weekly_report_rationale_96` (rationale_for)
- `weekly_report_safe_score` → `weekly_report_top_jobs` (calls)
- `weekly_report_safe_score` → `weekly_report_build_markdown` (calls)
- `weekly_report_safe_score` → `weekly_report_print_summary` (calls)
- `weekly_report_source_breakdown` → `weekly_report_build_markdown` (calls)
- `weekly_report_top_jobs` → `weekly_report_build_markdown` (calls)
- `weekly_report_top_jobs` → `weekly_report_print_summary` (calls)
- `weekly_report_daily_activity` → `weekly_report_build_markdown` (calls)
- `weekly_report_daily_activity` → `weekly_report_rationale_120` (rationale_for)
- `weekly_report_build_markdown` → `weekly_report_main` (calls)
- `weekly_report_print_summary` → `weekly_report_main` (calls)
- `weekly_report_print_summary` → `weekly_report_rationale_255` (rationale_for)

## External dependencies

- `weekly_report` → `hospitality_outreach` (imports) [community 7]