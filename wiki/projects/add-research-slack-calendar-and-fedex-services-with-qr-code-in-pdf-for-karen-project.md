---
title: Add Research, Slack, Calendar, and FedEx Services with QR Code in PDF for Karen Project
author: ai
created_at: 2026-04-12T21:54:09.437Z
last_ai_edit: 2026-04-12T21:54:09.437Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-services-add-research-slack-calendar-fedex-services-5ccefc.md]]"
tags:
  - karen
  - services
  - api integration
  - osint
  - slack
  - google calendar
  - fedex
  - qr code
  - pdf generation
  - escalation ladder
  - python
---

# Add Research, Slack, Calendar, and FedEx Services with QR Code in PDF for Karen Project

This commit introduces several new services to the Karen project, including a research service for OSINT, Slack integration for messaging, Google Calendar for event management, and FedEx for rate quotes. It also adds a PDF generation service that embeds a QR code linking to 'open-matters', fulfilling tasks for the escalation ladder v2.

## Key Concepts

[[Karen Project]],OSINT (Open-Source Intelligence),Slack Web API Integration,Google Calendar API Integration,FedEx API Integration,QR Code Generation,PDF Generation,Escalation Ladder

## Details

This commit (`ffd88e0`) by Rahil Singhi on 2026-04-04 implements tasks 2-5 of the 'escalation ladder v2' within the `rahilsinghi/karen` repository. It involved changes across 7 files, with 371 additions and 1 deletion.

The following services were added:

*   `research_service.py`: Provides pre-cached OSINT lookups, incorporating timed animation steps for presentation.
*   `slack_service.py`: Enables posting and deleting messages via the Slack Web API (`chat.postMessage`, `chat.delete`).
*   `calendar_service.py`: Facilitates Google Calendar event creation and deletion using a service account.
*   `fedex_service.py`: Implements a sandbox rate quote feature, with a fallback of $28.40 to ensure no 'unavailable' status is ever returned.
*   `pdf_service.py`: Handles QR code generation using the `qrcode` library (converting to base64 PNG) for embedding into official letters.

Additionally, the `formal_letter.html` template was updated to include a dedicated QR section. This QR code links to `rahilsinghi.com/open-matters`, providing a public access point for relevant information.

New dependencies added to `requirements.txt` include `qrcode`, `pillow`, `google-api-python-client`, and `google-auth` to support these new functionalities.

## Related

[[Karen Project]],[[Calendar Service Update: Service Account Compatibility and Documentation Refresh]],[[Channel Integrations and Personality Service (Karen Project)]],[[Open Matter for Bharath Mahesh Gera (Karen Project)]],[[Open Matter for Rahil Singhi (Karen Project)]]
