---
title: "Career Datacenter: Application Generator CLI (Phase 1)"
author: ai
created_at: 2026-04-10T21:23:54.241Z
last_ai_edit: 2026-04-10T21:23:54.241Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-feat-complete-phase-1-application-generator-cli-f419fe.md]]"
tags:
  - application-generator
  - cli
  - career-datacenter
  - llm
  - job-application
  - automation
  - resume
  - cover-letter
  - python
  - phase-1
  - development
---

# Career Datacenter: Application Generator CLI (Phase 1)

This wiki article details the completion of Phase 1 for the Application Generator CLI within the Career-Datacenter project. This CLI automates the job application process by parsing job descriptions, scoring candidate fit, and generating tailored LaTeX resumes and personalized cover letters. It integrates various LLM APIs and automatically updates application tracking files.

## Key Concepts

- Application Generator CLI,- Job Description Parsing (LLM-powered),- Candidate Fit Scoring,- Resume Generation (LaTeX, Jinja2),- Cover Letter Generation (voice profile),- LLM Integration (Claude, LM Studio, OpenAI),- Automatic Application Tracking,- Phase-based Development

## Details

This entry marks the completion of **Phase 1** of the Application Generator CLI, a core component of the [[Career Datacenter]] project. The development milestone is associated with the following commit:

- **Repo:** `rahilsinghi/Career-Datacenter`
- **SHA:** `43eb595`
- **Date:** `2026-02-11T18:03:07Z`
- **Author:** [[Rahil Singhi]]
- **Files changed:** 13
- **Additions:** +2712
- **Deletions:** -0

### Core Components
The CLI is built upon several interconnected Python modules, each handling a specific task in the application generation workflow:

- `jd_parser.py`: Utilizes Large Language Models (LLMs) to parse job descriptions, extracting critical information such as keywords, required skills, and company details.
- `fit_scorer.py`: Calculates a candidate's fit score (0-10) against a parsed job description, providing a quantifiable metric for alignment.
- `resume_generator.py`: Generates a highly tailored LaTeX resume by dynamically selecting relevant bullet points and content using a [[Jinja2]] template (specifically based on the [[Anubhav Singh Resume Format]]).
- `cover_letter_generator.py`: Crafts a personalized 3-paragraph cover letter, adapting its tone and content based on a defined voice profile.
- `latex_utils.py`: Provides utilities for compiling documents, including LaTeX to PDF conversion via `pdflatex` and Markdown to PDF conversion using [[Pandoc]].
- `tracker_updater.py`: Automatically updates `applications.csv` and `companies.yaml` files to maintain an up-to-date record of applied positions and company interactions.
- `generate_application.py`: The main CLI script that orchestrates the entire workflow, integrating all other components to produce a complete application package.

### Templates & Prompts
Critical to the system's output quality are the templates and LLM prompts employed:

- `resume_template.tex.jinja2`: The LaTeX resume template, structured for dynamic content injection.
- **System prompts:** Carefully designed prompts for LLM interactions covering [[Job Description Parser|JD parsing]], [[Fit Scorer|fit scoring]], and resume/cover letter generation.
- **Few-shot examples:** Provided to LLMs to ensure consistent and high-quality output across various tasks.

### Key Features
Phase 1 delivers a robust set of functionalities:

- ✅ **Automated Document Generation:** Paste a job description to receive tailored resume and cover letter PDFs.
- ✅ **Intelligent Fit Scoring:** Automatic fit analysis with detailed keyword coverage insights.
- ✅ **Dynamic Resume Content:** LaTeX resume generation with smart bullet point selection for relevance.
- ✅ **Personalized Cover Letters:** Natural-sounding cover letter tone adapted from a user-defined voice profile.
- ✅ **Tracking Automation:** Automatic updates to `applications.csv` and `companies.yaml` tracking files.
- ✅ **LLM Flexibility:** Support for multiple LLM APIs including [[Claude API]], [[LM Studio]] (for local models), and [[OpenAI API]].

### Usage
The CLI can be executed as follows:
```bash
cd cli && python generate_application.py
```

### Next Steps
Future development will focus on [[Phase 2 Application Generator CLI]], which includes features like interactive Q&A, STAR story auto-saving, and a revision mode for generated content.

## Related

[[Career Datacenter]],[[Rahil Singhi]],[[Phase 2 Application Generator CLI]],[[Job Description Parser]],[[Fit Scorer]],[[Resume Generator]],[[Cover Letter Generator]],[[LaTeX Utilities]],[[Application Tracker Updater]],[[generate_application.py]],[[Anubhav Singh Resume Format]],[[Claude API]],[[LM Studio]],[[OpenAI API]],[[Jinja2]],[[Pandoc]],[[pdflatex]]
