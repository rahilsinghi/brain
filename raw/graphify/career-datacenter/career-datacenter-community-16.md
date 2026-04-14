---
status: processed
source_type: graphify-community
repo: career-datacenter
community_id: 16
ingested_at: 2026-04-13T22:29:48.749Z
parsed_at: 2026-04-13T22:29:48.749Z
compiled_to: "[[Job Application Tracking Utility]]"
processed_at: 2026-04-13T22:32:57.756Z
retry_count: 0
last_error: null
compile_progress: null
---



# career-datacenter — Community 16

## Files in this cluster

- `/Users/rahilsinghi/Desktop/career-datacenter/cli/tracker_updater.py` — 7 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/tracker_updater.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/tracker_updater.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/tracker_updater.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/tracker_updater.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/tracker_updater.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/tracker_updater.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/tracker_updater.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/tracker_updater.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/tracker_updater.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/tracker_updater.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/tracker_updater.py` — 1 connection

## Internal relationships

- `tracker_updater` → `tracker_updater_trackerupdater` (contains)
- `tracker_updater` → `tracker_updater_rationale_1` (rationale_for)
- `tracker_updater_trackerupdater` → `tracker_updater_trackerupdater_init` (method)
- `tracker_updater_trackerupdater` → `tracker_updater_trackerupdater_add_application` (method)
- `tracker_updater_trackerupdater` → `tracker_updater_trackerupdater_update_company` (method)
- `tracker_updater_trackerupdater` → `tracker_updater_trackerupdater_application_exists` (method)
- `tracker_updater_trackerupdater` → `tracker_updater_rationale_26` (rationale_for)
- `tracker_updater_trackerupdater_init` → `tracker_updater_rationale_29` (rationale_for)
- `tracker_updater_trackerupdater_add_application` → `tracker_updater_trackerupdater_application_exists` (calls)
- `tracker_updater_trackerupdater_add_application` → `tracker_updater_rationale_56` (rationale_for)
- `tracker_updater_trackerupdater_update_company` → `tracker_updater_rationale_116` (rationale_for)
- `tracker_updater_trackerupdater_application_exists` → `tracker_updater_rationale_185` (rationale_for)

## External dependencies

- `tracker_updater` → `generate_application` (imports_from) [community 2]
- `tracker_updater_trackerupdater` → `generate_application_rationale_50` (uses) [community 2]