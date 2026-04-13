---
title: Resume Variants for Tailored Job Applications
author: ai
created_at: 2026-04-12T18:05:02.731Z
last_ai_edit: 2026-04-12T18:05:02.731Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-resume-variantspy-engineering-focused-vs-ml-a8d355.md]]"
tags:
  - resume
  - career-datacenter
  - automation
  - job application
  - personalization
  - ml
  - engineering
  - python
---

# Resume Variants for Tailored Job Applications

This update introduces `resume_variants.py` to the Career-Datacenter project, enabling the generation of two distinct resume PDFs (engineering-focused and ML-focused) tailored to specific job descriptions. It re-prompts the ResumeGenerator with variant-specific instructions after using the JDParser and FitScorer pipeline, and tracks the variant used for each application.

## Key Concepts

Resume variants,Engineering-focused resume,ML-focused resume,JDParser,FitScorer,ResumeGenerator,Job application automation,Personalized resumes

## Details

The `resume_variants.py` script, added to the `rahilsinghi/Career-Datacenter` repository (SHA: `0f1d9d4` on 2026-02-17), automates the creation of two specialized resume versions for each job application. This enhancement addresses the need for tailored resumes that highlight specific skill sets depending on the job's focus.

**Functionality:**
1.  **Job Description Parsing & Scoring**: It leverages the existing [[JDParser]] and [[FitScorer]] pipeline to analyze job descriptions and determine relevance.
2.  **Variant-Specific Re-prompting**: The core innovation is re-prompting the [[ResumeGenerator]] with distinct instructions based on the desired variant:
    *   **Variant 1 (Engineering-focused)**: Emphasizes systems engineering, APIs, scalability, and production deployments.
    *   **Variant 2 (ML-focused)**: Highlights ML models, experiments, data pipelines, and quantifiable ML impact.
3.  **Application Tracking**: The specific resume variant used for each application is recorded in the `applications.csv` notes column, providing valuable data for later analysis and optimization.

This feature significantly enhances the personalization capabilities of the [[Career-Datacenter: Job Search Automation Platform]], allowing for more targeted and effective job submissions.

## Related

[[Career-Datacenter: Job Search Automation Platform]],[[Anti-Hallucination Constraints in Resume Generation]],[[Application Tracking System]],[[JDParser]],[[FitScorer]],[[ResumeGenerator]],[[resume_variants.py]]
