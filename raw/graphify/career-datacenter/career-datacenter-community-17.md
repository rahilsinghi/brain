---
status: processed
source_type: graphify-community
repo: career-datacenter
community_id: 17
ingested_at: 2026-04-13T22:29:48.749Z
parsed_at: 2026-04-13T22:29:48.749Z
compiled_to: "[[Job Salary Intelligence and Reporting]]"
processed_at: 2026-04-13T22:31:24.187Z
retry_count: 0
last_error: null
compile_progress: null
---



# career-datacenter — Community 17

## Files in this cluster

- `/Users/rahilsinghi/Desktop/career-datacenter/cli/salary_intel.py` — 10 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/salary_intel.py` — 5 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/salary_intel.py` — 5 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/salary_intel.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/salary_intel.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/salary_intel.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/salary_intel.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/salary_intel.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/salary_intel.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/salary_intel.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/salary_intel.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/salary_intel.py` — 1 connection

## Internal relationships

- `salary_intel` → `salary_intel_classify_role` (contains)
- `salary_intel` → `salary_intel_classify_experience` (contains)
- `salary_intel` → `salary_intel_parse_salary` (contains)
- `salary_intel` → `salary_intel_load_jobs` (contains)
- `salary_intel` → `salary_intel_percentile` (contains)
- `salary_intel` → `salary_intel_analyze` (contains)
- `salary_intel` → `salary_intel_fmt_k` (contains)
- `salary_intel` → `salary_intel_print_report` (contains)
- `salary_intel` → `salary_intel_save_report` (contains)
- `salary_intel` → `salary_intel_main` (contains)
- `salary_intel_classify_role` → `salary_intel_load_jobs` (calls)
- `salary_intel_classify_experience` → `salary_intel_load_jobs` (calls)
- `salary_intel_parse_salary` → `salary_intel_load_jobs` (calls)
- `salary_intel_parse_salary` → `salary_intel_rationale_90` (rationale_for)
- `salary_intel_load_jobs` → `salary_intel_main` (calls)
- `salary_intel_analyze` → `salary_intel_main` (calls)
- `salary_intel_fmt_k` → `salary_intel_print_report` (calls)
- `salary_intel_print_report` → `salary_intel_main` (calls)
- `salary_intel_save_report` → `salary_intel_main` (calls)

## External dependencies

_none_