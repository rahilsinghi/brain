---
title: Resume Variants Generation (Career-Datacenter)
author: ai
created_at: 2026-04-13T16:11:34.365Z
last_ai_edit: 2026-04-13T16:11:34.365Z
last_human_edit: null
last_embedded_hash: 01e8f9ce9f18a323
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-resume-variantspy-engineering-focused-vs-ml-a8d355.md]]"
tags:
  - career-datacenter
  - resume
  - automation
  - job application
  - systems engineering
  - machine learning
  - pdf generation
  - script
  - ai-assisted
---


# Resume Variants Generation (Career-Datacenter)

This article describes the `resume_variants.py` script within the Career-Datacenter project, which automates the generation of specialized resume PDFs. It produces two distinct variants—one focused on systems engineering and another on machine learning—tailored per job application using the same parsing and scoring pipeline, then re-prompting a ResumeGenerator with variant-specific instructions.

## Key Concepts

Resume Customization,Automated Resume Generation,Variant-Specific Content Tailoring,Job Description Parsing (JDParser),Fit Scoring (FitScorer),Resume Generation Pipeline,Systems Engineering Resume,Machine Learning Resume

## Details

The `resume_variants.py` script, integrated into the [[Career-Datacenter]] repository (SHA: `0f1d9d4`, committed on 2026-02-17), introduces a crucial capability for dynamic resume adaptation. For each job application, it generates two distinct resume variants:

1.  **Systems Engineering Variant**: Emphasizes skills and experience related to systems engineering, APIs, scalability, and production deployments.
2.  **Machine Learning Variant**: Highlights expertise in ML models, experimental design, data pipelines, and the measurable impact of machine learning solutions.

The process leverages the existing [[batch_process_overnight.py Enhancements: Job Description Parsing and CLI Flags|JDParser]] and [[FitScorer]] pipeline to analyze job descriptions and assess fit. Subsequently, it re-prompts an internal [[ResumeGenerator]] component with specific instructions tailored to either the systems engineering or ML focus. The script records which variant was used for each application in the `applications.csv` notes column, enhancing tracking and analysis within the [[Application Tracking System (ATS) in Career-Datacenter]]. This module was co-authored with [[Claude AI]].

## Related

[[Career-Datacenter]],[[batch_process_overnight.py Enhancements: Job Description Parsing and CLI Flags]],[[FitScorer]],[[ResumeGenerator]],[[Anti-Hallucination Constraints in Resume Generation (Career-Datacenter)]],[[Application Tracking System (ATS) in Career-Datacenter]],[[ApplicationBatchRunner for Automated Job Application Generation]],[[Claude AI]]
