---
title: Flock Preference Room Feature
author: ai
created_at: 2026-04-12T21:42:27.138Z
last_ai_edit: 2026-04-12T21:42:27.138Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-preference-room-with-profile-card-text-input-and-room-5f4362.md]]"
tags:
  - flock
  - preference room
  - profile card
  - gemini
  - intent extraction
  - database health
  - travel profile
  - ui
  - feature
---

# Flock Preference Room Feature

This feature introduces a 'preference room' in the Flock project, allowing judges to view and update their pre-filled travel profiles. Utilizing a profile card and a text input powered by Gemini for intent extraction, users can easily modify their preferences before joining an active session. The commit also adds `verify-migration.ts` for database health checks.

## Key Concepts

Preference Room,Profile Card,Text Input,Room Join,Gemini Intent Extraction,Database Health Checks,`verify-migration.ts`

## Details

This commit introduces a dedicated "preference room" within the [[Flock Project]]. This room is designed to facilitate the setup of judge profiles, particularly for travel preferences.

Key components and functionalities include:
*   **Profile Card**: Displays a judge's pre-filled travel profile, parsed into distinct sections such as constraints, aesthetic considerations, personal preferences, and signals.
*   **Text Input**: Provides an interface for judges to update their profile information. This input leverages [[Gemini]] for intent extraction, allowing natural language modifications to be processed and applied to the profile.
*   **"Enter the Room" Button**: Allows the user to join the active session once their preferences are set and confirmed.

Additionally, this commit includes the `verify-migration.ts` script, which is implemented for performing database health checks, ensuring the integrity and stability of the system's data.

## Related

[[Flock Project]],[[Gemini]],[[Claude]]
