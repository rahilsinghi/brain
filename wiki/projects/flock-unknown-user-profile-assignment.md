---
title: "Flock: Unknown User Profile Assignment"
author: ai
created_at: 2026-04-10T21:19:58.720Z
last_ai_edit: 2026-04-10T21:19:58.720Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-unknown-names-get-cloned-pre-built-profiles-with-random-03230a.md]]"
tags:
  - flock
  - user profiles
  - random assignment
  - profile cloning
  - demo enhancement
  - pre-built profiles
  - feature
---

# Flock: Unknown User Profile Assignment

This commit introduces a feature in the Flock project that assigns pre-built, rich profiles to users whose names are not pre-seeded in the system. When an unknown user logs in, they receive a randomly selected, cloned profile to ensure an engaging experience, particularly for demos.

## Key Concepts

- Pre-built Profiles,- Random Assignment,- Profile Cloning,- User Onboarding,- Demo Experience Enhancement

## Details

This feature, implemented in the `rahilsinghi/Flock` repository (SHA: `c944d36`), addresses the need to provide compelling user profiles even for names not explicitly defined beforehand.

**Process for Unknown Names:**
1.  When a user with an unrecognized name logs in, the system selects one of 10 available pre-built profiles at random.
2.  It then clones the `context_md` and `aesthetic embedding` from the chosen pre-built profile into a new user record.
3.  The `display_name` of this new user is updated to reflect the name the user typed during login.
4.  This results in an unknown user, such as "Mike," being assigned a rich, pre-filled profile (e.g., a "travel fingerprint"), ready for interaction.

**Handling Known Names:**
-   Pre-defined names like Rahil, Aayush, and Thor are mapped directly to their specific, dedicated profiles.
-   Aliases are also supported, with "Aish" or "Aishwarya" being mapped to the `judge_akriti` profile.

**Rationale:**
This mechanism ensures that every 'judge' participating in a demo receives an interesting and fully populated profile, significantly enhancing the demonstration experience, regardless of whether their specific name was initially pre-seeded into the system. The co-authorship by Claude Opus 4.6 indicates AI assistance in the development of this feature.

## Related

[[Flock Project]],[[Pre-built Profiles]],[[User Profile Management]],[[Judge Akriti Profile]]
