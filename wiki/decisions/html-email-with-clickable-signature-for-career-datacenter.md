---
title: HTML Email with Clickable Signature for Career-Datacenter
author: ai
created_at: 2026-04-12T22:10:31.291Z
last_ai_edit: 2026-04-12T22:10:31.291Z
last_human_edit: null
last_embedded_hash: 14132f161facccb1
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-use-html-email-with-clickable-signature-linkedin-a0dad7.md]]"
tags:
  - email
  - html
  - signature
  - career-datacenter
  - automation
  - job search
  - workflow
---


# HTML Email with Clickable Signature for Career-Datacenter

This commit updates the `Career-Datacenter` project to use HTML email, featuring a clickable signature that includes links to LinkedIn, GitHub, and a resume. It switches from plain text to a multipart/alternative format, ensuring broader compatibility and a professional appearance for job applications.

## Key Concepts

HTML email,Multipart/alternative email format,Clickable email signature,Resume URL placeholder

## Details

This modification, recorded in commit `7fc44cf` within the `rahilsinghi/Career-Datacenter` repository on March 4, 2026, by Rahil Singhi (co-authored by Claude Opus 4.6), introduces a significant enhancement to the email sending functionality.

Previously, emails were sent as plain text. The update transitions to a `multipart/alternative` format, allowing for both an HTML version and a plain text fallback. The core change involves embedding a rich HTML signature that mirrors a standard Gmail signature, including the sender's name, phone number, and crucial professional links (LinkedIn, GitHub, and Resume).

A `RESUME_URL` placeholder is included at the top of the relevant file, designed for easy updates once a hosted resume link is available. This ensures that the resume link can be consistently managed and updated. Critically, the signature appending logic is centralized within the `create_draft()` function, preventing redundancy and maintaining a single source of truth for the signature content across all email generation processes.

This change involved 1 file modification, adding 56 lines and deleting 13 lines of code.

## Related

[[Career-Datacenter]],[[Add SMTP Email Sending and Update Signature URLs]],[[Add SMTP Send Capability and Update Signature URLs]],[[Add SMTP Send Capability and Update Signature URLs (Career-Datacenter)]],[[Add Resume PDFs to Public Directory]],[[Add Original LaTeX Resume Source]],[[Add Professional Experience Entries (Career-Datacenter)]]
