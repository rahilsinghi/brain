---
title: HTML Email with Clickable Signature for Job Applications
author: ai
created_at: 2026-04-11T01:34:40.337Z
last_ai_edit: 2026-04-11T01:34:40.337Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-use-html-email-with-clickable-signature-linkedin-a0dad7.md]]"
tags:
  - html-email
  - email-signature
  - job-application
  - career-datacenter
  - automation
  - ux
  - linkedin
  - github
  - resume
  - smtp
---

# HTML Email with Clickable Signature for Job Applications

This update to the Career-Datacenter project introduces HTML email formatting with a `multipart/alternative` structure, allowing for clickable links to LinkedIn, GitHub, and a resume within the email signature. This enhances the professionalism and user experience of automated job applications. The signature is now centrally managed in the `create_draft()` function for consistency.

## Key Concepts

HTML Email,Clickable Email Signature,Multipart/alternative Email Format,Job Application Automation,Email Professionalism,Single Source of Truth

## Details

This enhancement, committed on 2026-03-04 by Rahil Singhi (with co-authorship by Claude Opus 4.6) to the `rahilsinghi/Career-Datacenter` repository (SHA: `7fc44cf`), replaces plain text emails with a more robust HTML format. The primary motivation is to improve the presentation and functionality of outgoing job application correspondence.

Key changes include:
*   **Email Format Upgrade**: Transition from plain text to `multipart/alternative` emails. This ensures that recipients' email clients can render a rich HTML version with clickable links, while providing a plain text fallback for compatibility.
*   **Professional HTML Signature**: The new HTML signature is designed to match the sender's standard Gmail signature, incorporating essential contact information such as name and phone, alongside directly clickable links to LinkedIn, GitHub, and a resume. This significantly improves the recipient's ability to quickly access relevant professional profiles.
*   **Resume URL Placeholder**: A `RESUME_URL` placeholder has been introduced at the top of the relevant file, making it straightforward to update the hosted resume link as needed.
*   **Centralized Signature Management**: To ensure consistency and maintainability, the logic for appending the signature has been moved to the `create_draft()` function. This establishes a single source of truth for the signature, preventing discrepancies that could arise from individual body builders handling signature appending.

## Related

[[Career-Datacenter]],[[Add SMTP Email Sending and Update Signature URLs]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]]
