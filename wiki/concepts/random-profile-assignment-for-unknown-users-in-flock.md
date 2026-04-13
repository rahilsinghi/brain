---
title: Random Profile Assignment for Unknown Users in Flock
author: ai
created_at: 2026-04-10T17:20:00.710Z
last_ai_edit: 2026-04-10T17:20:00.710Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-unknown-names-get-cloned-pre-built-profiles-with-random-03230a.md]]"
tags:
  - flock
  - user provisioning
  - profile assignment
  - randomization
  - demo enhancement
  - pre-built profiles
  - context_md
  - aesthetic embedding
  - commit c944d36
---

# Random Profile Assignment for Unknown Users in Flock

This feature, implemented in the Flock project, automatically assigns a pre-built, context-rich profile to users whose names are not explicitly recognized in the system. It clones `context_md` and `aesthetic embedding` from a random pool of 10 profiles, ensuring that every participant, particularly judges in a demo, receives an engaging and interesting user experience without requiring prior seeding.

## Key Concepts

User Profile Provisioning,Randomized Data Assignment,Pre-built Profiles,Context Cloning,Demo Experience Enhancement,Aesthetic Embedding

## Details

### Feature: Random Profile Assignment for Unknown Users

This commit introduces a new feature in the [[Flock]] project, developed by [[Rahil Singhi]] (co-authored by [[Claude Opus 4.6]]), that streamlines the user experience for individuals whose names are not explicitly defined within the system. The primary goal is to provide a consistent and rich profile experience, especially beneficial for demonstrations involving multiple users.

**Commit Details:**
- **Repository:** `rahilsinghi/Flock`
- **SHA:** `c944d36`
- **Date:** `2026-03-21T18:34:47Z`
- **Files changed:** 1
- **Additions:** +81
- **Deletions:** -47

**Functionality for Unknown Names:**
When an unknown name attempts to log in or is encountered by the system, the following automated process occurs:
1.  **Profile Selection:** The system randomly selects one of 10 available pre-built profiles from a designated pool.
2.  **Profile Cloning:** It then clones the `context_md` and `aesthetic embedding` attributes from the selected pre-built profile to create a new user profile.
3.  **Display Name Update:** The `display_name` of this newly cloned profile is updated to reflect the name the user originally typed (e.g., "Mike").
4.  **Result:** The user is immediately provided with a rich, pre-filled profile (e.g., a "travel fingerprint" for Mike), ensuring an engaging and personalized experience from the outset.

**Behavior for Known Names:**
-   Known names (e.g., Rahil, Aayush, Thor) are mapped directly to their specific, pre-configured profiles.
-   Aliases are also supported; for example, "Aish" or "Aishwarya" are aliased to the `judge_akriti` profile.

**Rationale and Benefits:**
This mechanism ensures that every participant, particularly judges in a demo scenario, receives an interesting and fully populated profile. This eliminates the need to pre-seed every potential name into the system, significantly enhancing the demo's robustness and user satisfaction, regardless of whether their name was initially configured.

## Related

[[Flock]],[[Rahil Singhi]],[[Claude Opus 4.6]],[[judge_akriti]]
