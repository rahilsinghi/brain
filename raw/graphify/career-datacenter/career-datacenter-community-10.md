---
status: processed
source_type: graphify-community
repo: career-datacenter
community_id: 10
ingested_at: 2026-04-13T22:29:48.749Z
parsed_at: 2026-04-13T22:29:48.749Z
compiled_to: "[[Job Application Workflow Automation]]"
processed_at: 2026-04-13T22:35:28.003Z
retry_count: 0
last_error: null
compile_progress: null
---



# career-datacenter — Community 10

## Files in this cluster

- `/Users/rahilsinghi/Desktop/career-datacenter/cli/application_runner.py` — 22 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/apply_workflow.py` — 9 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/application_runner.py` — 8 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/application_runner.py` — 5 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/apply_workflow.py` — 5 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/apply_workflow.py` — 5 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/application_runner.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/application_runner.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/application_runner.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/apply_workflow.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/apply_workflow.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/application_runner.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/application_runner.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/apply_workflow.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/apply_workflow.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/apply_workflow.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/apply_workflow.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/apply_workflow.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/apply_workflow.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/apply_workflow.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/apply_workflow.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/apply_workflow.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/application_runner.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/application_runner.py` — 1 connection

## Internal relationships

- `apply_workflow` → `apply_workflow_open_pdf` (contains)
- `apply_workflow` → `apply_workflow_update_app_status` (contains)
- `apply_workflow` → `apply_workflow_generate_and_review` (contains)
- `apply_workflow` → `apply_workflow_batch_generate` (contains)
- `apply_workflow` → `apply_workflow_mark_applied` (contains)
- `apply_workflow` → `apply_workflow_show_pipeline` (contains)
- `apply_workflow` → `apply_workflow_main` (contains)
- `apply_workflow_open_pdf` → `apply_workflow_generate_and_review` (calls)
- `apply_workflow_open_pdf` → `apply_workflow_rationale_57` (rationale_for)
- `apply_workflow_update_app_status` → `apply_workflow_generate_and_review` (calls)
- `apply_workflow_update_app_status` → `apply_workflow_mark_applied` (calls)
- `apply_workflow_update_app_status` → `apply_workflow_rationale_70` (rationale_for)
- `apply_workflow_generate_and_review` → `apply_workflow_main` (calls)
- `apply_workflow_generate_and_review` → `apply_workflow_rationale_101` (rationale_for)
- `apply_workflow_batch_generate` → `apply_workflow_main` (calls)
- `apply_workflow_batch_generate` → `apply_workflow_rationale_160` (rationale_for)
- `apply_workflow_mark_applied` → `apply_workflow_main` (calls)
- `apply_workflow_mark_applied` → `apply_workflow_rationale_181` (rationale_for)
- `apply_workflow_show_pipeline` → `apply_workflow_main` (calls)
- `apply_workflow_show_pipeline` → `apply_workflow_rationale_187` (rationale_for)
- `apply_workflow_rationale_57` → `application_runner_applicationbatchrunner` (uses)
- `apply_workflow_rationale_70` → `application_runner_applicationbatchrunner` (uses)
- `apply_workflow_rationale_101` → `application_runner_applicationbatchrunner` (uses)
- `apply_workflow_rationale_160` → `application_runner_applicationbatchrunner` (uses)
- `apply_workflow_rationale_181` → `application_runner_applicationbatchrunner` (uses)
- `apply_workflow_rationale_187` → `application_runner_applicationbatchrunner` (uses)
- `application_runner_applicationbatchrunner` → `application_runner_applicationbatchrunner_init` (method)
- `application_runner_applicationbatchrunner` → `application_runner_applicationbatchrunner_run_for_approved` (method)
- `application_runner_applicationbatchrunner` → `application_runner_applicationbatchrunner_run_for_job_id` (method)
- `application_runner_applicationbatchrunner` → `application_runner_applicationbatchrunner_run_for_min_score` (method)
- `application_runner_applicationbatchrunner` → `application_runner_applicationbatchrunner_run` (method)
- `application_runner_applicationbatchrunner` → `application_runner_applicationbatchrunner_generate_one` (method)
- `application_runner_applicationbatchrunner` → `application_runner_applicationbatchrunner_record_application` (method)
- `application_runner_applicationbatchrunner` → `application_runner_applicationbatchrunner_print_summary` (method)
- `application_runner_applicationbatchrunner` → `application_runner_main` (calls)
- `application_runner_applicationbatchrunner_run_for_approved` → `application_runner_applicationbatchrunner_run` (calls)
- `application_runner_applicationbatchrunner_run_for_approved` → `application_runner_main` (calls)
- `application_runner_applicationbatchrunner_run_for_job_id` → `application_runner_applicationbatchrunner_run` (calls)
- `application_runner_applicationbatchrunner_run_for_job_id` → `application_runner_main` (calls)
- `application_runner_applicationbatchrunner_run_for_min_score` → `application_runner_applicationbatchrunner_run` (calls)
- `application_runner_applicationbatchrunner_run_for_min_score` → `application_runner_main` (calls)
- `application_runner_applicationbatchrunner_run` → `application_runner_applicationbatchrunner_generate_one` (calls)
- `application_runner_applicationbatchrunner_run` → `application_runner_applicationbatchrunner_record_application` (calls)
- `application_runner_applicationbatchrunner_run` → `application_runner_applicationbatchrunner_print_summary` (calls)

## External dependencies

- `fit_scorer_fitscorer` → `application_runner_applicationbatchrunner` (uses) [community 2]
- `cover_letter_generator_coverlettergenerator` → `application_runner_applicationbatchrunner` (uses) [community 2]
- `job_tracker` → `apply_workflow` (imports_from) [community 5]
- `job_tracker_jobtracker` → `apply_workflow_rationale_57` (uses) [community 5]
- `job_tracker_jobtracker` → `apply_workflow_rationale_70` (uses) [community 5]
- `job_tracker_jobtracker` → `apply_workflow_rationale_101` (uses) [community 5]
- `job_tracker_jobtracker` → `apply_workflow_rationale_160` (uses) [community 5]
- `job_tracker_jobtracker` → `apply_workflow_rationale_181` (uses) [community 5]
- `job_tracker_jobtracker` → `apply_workflow_rationale_187` (uses) [community 5]
- `job_tracker_jobtracker` → `application_runner_applicationbatchrunner` (uses) [community 5]
- `resume_generator_resumegenerator` → `application_runner_applicationbatchrunner` (uses) [community 4]
- `apply_workflow` → `application_runner` (imports_from) [community 2]
- `application_runner` → `application_runner_applicationbatchrunner` (contains) [community 2]
- `application_runner` → `application_runner_main` (contains) [community 2]
- `application_runner_applicationbatchrunner` → `application_runner_rationale_49` (rationale_for) [community 2]
- `application_runner_applicationbatchrunner` → `jd_parser_jdparser` (uses) [community 2]
- `application_runner_applicationbatchrunner_run_for_approved` → `application_runner_rationale_72` (rationale_for) [community 2]
- `application_runner_applicationbatchrunner_run_for_job_id` → `application_runner_rationale_91` (rationale_for) [community 2]
- `application_runner_applicationbatchrunner_run_for_min_score` → `application_runner_rationale_100` (rationale_for) [community 2]
- `application_runner_applicationbatchrunner_run` → `application_runner_rationale_108` (rationale_for) [community 2]
- `application_runner_applicationbatchrunner_generate_one` → `application_runner_rationale_137` (rationale_for) [community 2]
- `application_runner_applicationbatchrunner_record_application` → `application_runner_rationale_197` (rationale_for) [community 2]