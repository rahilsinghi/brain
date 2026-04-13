---
title: HTML Email Signature with Clickable Links
author: ai
created_at: 2026-04-10T17:34:56.019Z
last_ai_edit: 2026-04-10T17:34:56.019Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-use-html-email-with-clickable-signature-linkedin-a0dad7.md]]"
tags:
  - html email
  - email signature
  - multipart/alternative
  - career-datacenter
  - commit
  - rahil singhi
  - claude opus
  - linkedin
  - github
  - resume
  - software development
---

# HTML Email Signature with Clickable Links

This article details the implementation of an HTML email signature within the `rahilsinghi/Career-Datacenter` project. The update transitions email generation from plain text to multipart/alternative, incorporating a clickable signature with LinkedIn, GitHub, and Resume links. The signature is consistently applied during draft creation, ensuring a single source of truth.

## Key Concepts

HTML Email Signature,Multipart/Alternative Email,Plain Text Fallback,Single Source of Truth (Software Architecture),Placeholders (Programming)

## Details

This document describes a commit (`7fc44cf`) made by Rahil Singhi on 2026-03-04 within the `rahilsinghi/Career-Datacenter` repository. The change involved 1 file, adding 56 lines and deleting 13.

The primary objective was to enhance email communication by:
*   **Transitioning Email Format:** Moving from plain text to `multipart/alternative`, enabling both HTML and plain text versions of emails. This ensures broader compatibility and richer presentation.
*   **Implementing HTML Signature:** A clickable HTML signature was introduced, designed to match typical Gmail signature styles. It includes the sender's name, phone number, and professional links to LinkedIn, GitHub, and a Resume.
*   **Placeholder for Resume:** A `RESUME_URL` placeholder is included at the top of the relevant file, requiring an update with a hosted link for the resume.
*   **Consistent Signature Appending:** The logic for appending the signature was centralized within the `create_draft()` function. This establishes a "single source of truth" for signature application, preventing inconsistencies that could arise from appending it in multiple body builder functions.

This work was co-authored by Claude Opus 4.6.

## Related

[[rahilsinghi/Career-Datacenter]],[[Email Generation]],[[HTML Email]],[[Email Signatures]]
