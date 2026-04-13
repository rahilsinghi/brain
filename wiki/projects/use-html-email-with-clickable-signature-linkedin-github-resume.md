---
title: Use HTML Email with Clickable Signature (LinkedIn | GitHub | Resume)
author: ai
created_at: 2026-04-12T18:10:21.278Z
last_ai_edit: 2026-04-12T18:10:21.278Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-use-html-email-with-clickable-signature-linkedin-a0dad7.md]]"
tags:
  - html
  - email
  - signature
  - linkedin
  - github
  - resume
  - career-datacenter
  - job-applications
  - automation
---

# Use HTML Email with Clickable Signature (LinkedIn | GitHub | Resume)

This update transitions the `Career-Datacenter` project's email generation from plain text to multipart/alternative, enabling HTML emails. It integrates a clickable signature containing LinkedIn, GitHub, and Resume links to enhance professionalism and outreach effectiveness for job applications.

## Key Concepts

HTML email,Multipart/alternative email format,Clickable email signature,Job application automation,Professional branding

## Details

This commit (`7fc44cf`) for the `rahilsinghi/Career-Datacenter` repository, authored by Rahil Singhi on 2026-03-04, implements a crucial upgrade to the email generation process. Instead of plain text, emails are now sent using the `multipart/alternative` format, which includes both HTML and plain text versions, ensuring compatibility across various email clients.

The core feature is the addition of a professional, clickable HTML signature. This signature mirrors the structure of a standard Gmail signature, incorporating:
*   Sender's name
*   Phone number
*   Clickable links to LinkedIn, GitHub, and a hosted Resume.

A `RESUME_URL` placeholder is included at the top of the file, serving as a clear reminder to update it with the actual hosted resume link. The signature is consistently appended within the `create_draft()` function, establishing a single source of truth for its inclusion in all generated emails.

## Related

[[Career-Datacenter]],[[Add SMTP Email Sending and Update Signature URLs]],[[Add SMTP Send Capability and Update Signature URLs]],[[Add SMTP Send Capability and Update Signature URLs (Career-Datacenter)]],[[Anti-Hallucination Constraints in Resume Generation]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]],[[Career Datacenter: Job Search Automation Platform]],[[Career-Datacenter README Update: Phase 3 Quick Start, Workflow, and Command Reference]]
