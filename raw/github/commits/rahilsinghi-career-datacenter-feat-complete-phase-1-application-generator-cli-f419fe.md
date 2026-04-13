---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:43eb595
ingested_at: 2026-04-13T18:05:31.409Z
parsed_at: 2026-04-13T18:05:31.409Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: Complete Phase 1 - Application Generator CLI

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 43eb595
- **Date:** 2026-02-11T18:03:07Z
- **Author:** Rahil Singhi
- **Files changed:** 13
- **Additions:** +2712
- **Deletions:** -0

Core Components:
- jd_parser.py: Parse job descriptions with LLM (extracts keywords, skills, company info)
- fit_scorer.py: Score candidate fit (0-10) against parsed JD
- resume_generator.py: Generate tailored LaTeX resume using Jinja2 template
- cover_letter_generator.py: Generate 3-paragraph cover letter using voice profile
- latex_utils.py: Compile LaTeX→PDF (pdflatex) and Markdown→PDF (pandoc)
- tracker_updater.py: Auto-update applications.csv and companies.yaml
- generate_application.py: Main CLI orchestrating full workflow

Templates & Prompts:
- resume_template.tex.jinja2: LaTeX resume template (Anubhav Singh format)
- System prompts for JD parsing, fit scoring, resume/cover letter generation
- Few-shot examples for consistent output

Features:
- ✅ Paste job description → get tailored resume + cover letter PDFs
- ✅ Automatic fit scoring with keyword coverage analysis
- ✅ LaTeX resume generation with smart bullet selection
- ✅ Natural cover letter tone using voice profile
- ✅ Auto-update tracking files (CSV + YAML)
- ✅ Support for Claude API, LM Studio (local), and OpenAI

Usage:
  cd cli && python generate_application.py

Next: Phase 2 (interactive Q&A, STAR story auto-save, revision mode)
