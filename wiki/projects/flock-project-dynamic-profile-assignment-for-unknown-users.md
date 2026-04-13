---
title: "Flock Project: Dynamic Profile Assignment for Unknown Users"
author: ai
created_at: 2026-04-12T17:38:10.639Z
last_ai_edit: 2026-04-12T17:38:10.639Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-unknown-names-get-cloned-pre-built-profiles-with-random-03230a.md]]"
tags:
  - flock
  - user profiles
  - demo
  - dynamic profiles
  - context cloning
  - user experience
---

# Flock Project: Dynamic Profile Assignment for Unknown Users

This feature in the Flock project enables dynamic profile assignment for users whose names are not pre-registered. Unknown users are automatically assigned a randomly selected pre-built profile, ensuring a rich and engaging experience, particularly for demos. Known users continue to be mapped to their specific, pre-configured profiles.

## Key Concepts

Dynamic Profile Assignment,Pre-built Profiles,User Authentication (Known vs. Unknown),Context Cloning,Demo Experience,User Onboarding

## Details

This commit introduces a system within the [[Flock]] project to handle user profiles dynamically, primarily addressing the experience for new or unknown users.

When a user logs in with a name that is not pre-registered in the system:

1.  **Random Profile Selection**: The system selects one of 10 pre-built profiles from a pool.
2.  **Context Cloning**: The `context_md` and aesthetic embedding from the selected pre-built profile are cloned to create a new user profile.
3.  **Display Name Update**: The `display_name` of this new profile is updated to match what the user typed in.
4.  **Result**: The user, for example, named "Mike," is immediately provided with a rich, pre-filled travel fingerprint, making the application functional and engaging without prior setup.

For **known users** (e.g., Rahil, Aayush, Thor), their specific, pre-configured profiles are loaded directly. An alias is also managed, where names like "Aish" or "Aishwarya" are mapped to the `judge_akriti` profile.

The primary purpose of this feature is to guarantee that every judge or new user during a demo receives an interesting and fully populated profile, regardless of whether their name was explicitly pre-seeded into the system.

## Related

[[Flock Project]],[[Aishwarya Session Prompt Update – Flock Repo State (e98074d)]],[[Aishwarya Session Prompt Update (Flock Backend, e98074d)]],[[Chore: Add QR Code for Judges (Flock Project)]],[[Chore: Remove @clerk/nextjs Dependency and Dynamic Agent Labels (Flock)]]
