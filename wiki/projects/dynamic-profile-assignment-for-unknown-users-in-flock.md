---
title: Dynamic Profile Assignment for Unknown Users in Flock
author: ai
created_at: 2026-04-12T21:39:05.298Z
last_ai_edit: 2026-04-12T21:39:05.298Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-unknown-names-get-cloned-pre-built-profiles-with-random-03230a.md]]"
tags:
  - flock
  - user management
  - profiles
  - demo
  - onboarding
  - personalization
  - feature
---

# Dynamic Profile Assignment for Unknown Users in Flock

This feature in the Flock project dynamically assigns pre-built profiles to users with unknown names upon login, ensuring that every participant, especially judges during a demo, receives a rich and interesting personalized experience. Known users are mapped to their specific, pre-seeded profiles. The system clones context and aesthetic embeddings from a random profile and updates the display name.

## Key Concepts

[[Dynamic Profile Assignment]],[[Pre-built Profiles]],[[User Onboarding]],[[Flock Project]],[[Demo Experience]],[[Context Embedding]],[[Aesthetic Embedding]]

## Details

This feature, implemented in the `rahilsinghi/Flock` repository, addresses the need for providing personalized experiences for all users, particularly during demonstrations where various individuals (e.g., judges) might log in.

### Mechanism for Unknown Names
When a user logs in with a name not recognized by the system:
1.  The system randomly selects one of 10 available pre-built profiles.
2.  It then clones the `context_md` and `aesthetic embedding` from the chosen random profile.
3.  The `display_name` of the newly created user profile is updated to reflect what the user originally typed.

This process ensures that an unknown user, for example, "Mike", instantly receives a rich, pre-filled "travel fingerprint" without prior setup.

### Mechanism for Known Names
For pre-seeded or known names, the system directly maps them to their specific, designated profiles:
*   **Known users**: Rahil, Aayush, Thor, etc., are mapped to their unique profiles.
*   **Aliases**: Aish/Aishwarya are aliased to `judge_akriti`'s profile.

This dynamic assignment guarantees that all judges encounter an interesting and populated profile during the demo, regardless of whether their name was explicitly pre-configured.

## Related

[[Flock Project]],[[Aishwarya Session Prompt Update – Flock Backend State Snapshot]],[[Aishwarya Session Prompt Update – Flock Repo State (e98074d)]],[[Aishwarya Session Prompt Update – Flock Repo State (March 2026)]],[[Aishwarya Session Prompt Update (Flock Backend, e98074d)]],[[QR Code for Judges (Flock Project)]],[[Audio Layer Implementation for Flock Project]],[[Chore: Remove @clerk/nextjs Dependency and Implement Dynamic Agent Labels]]
