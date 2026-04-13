---
title: "Karen Project: Service Integrations and PDF QR Code"
author: ai
created_at: 2026-04-10T15:15:51.663Z
last_ai_edit: 2026-04-10T15:15:51.663Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-services-add-research-slack-calendar-fedex-services-5ccefc.md]]"
tags:
  - feat
  - services
  - research
  - slack
  - calendar
  - fedex
  - qrcode
  - pdf
  - integration
  - python
  - api
  - karenproject
  - ffd88e0
---

# Karen Project: Service Integrations and PDF QR Code

This commit introduces several new service integrations—research, Slack, Google Calendar, and FedEx—along with a PDF QR code generation feature to the `rahilsinghi/karen` repository. It enables functionalities such as OSINT lookups, Slack messaging, calendar event management, FedEx rate quotes, and embedding QR codes in formal letters.

## Key Concepts

- OSINT Lookup,- Slack Web API,- Google Calendar API,- FedEx API,- QR Code Generation,- PDF Embedding,- Service Account Authentication

## Details

This commit (`ffd88e0`) by Rahil Singhi (co-authored by Claude Opus 4.6) on 2026-04-04 implemented significant feature additions, comprising 7 file changes with 371 additions and 1 deletion. These updates correspond to "Tasks 2-5 of escalation ladder v2".

**Key Service Implementations:**
*   `research_service.py`: Implements a pre-cached OSINT lookup mechanism, designed with timed animation steps for user experience.
*   `slack_service.py`: Provides core functionality to interact with the Slack Web API, specifically for posting messages (`chat.postMessage`) and deleting them (`chat.delete`).
*   `calendar_service.py`: Facilitates the creation and deletion of events in Google Calendar, leveraging a service account for authentication.
*   `fedex_service.py`: Integrates with the FedEx API to provide sandbox rate quotes. It includes a robust fallback mechanism, returning a fixed value of $28.40 to ensure a rate is always provided and avoids "unavailable" responses.
*   `pdf_service.py`: Manages QR code generation using the `qrcode` library. The generated QR codes are converted to base64 PNG format for seamless embedding into PDF documents.

**Document Updates:**
*   `formal_letter.html`: Modified to include a new section for displaying the generated QR code, which links to `rahilsinghi.com/open-matters`.

**Dependencies:**
*   The `requirements.txt` file was updated to include new dependencies essential for these services:
    *   `qrcode`
    *   `pillow`
    *   `google-api-python-client`
    *   `google-auth`

## Related

[[Karen Project]],[[Rahil Singhi]],[[Claude Opus 4.6]],[[OSINT Lookup]],[[Slack API]],[[Google Calendar API]],[[FedEx API Integration]],[[QR Code Technology]],[[Escalation Ladder v2]]
