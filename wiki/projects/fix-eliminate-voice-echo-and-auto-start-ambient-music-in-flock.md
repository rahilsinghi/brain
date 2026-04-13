---
title: "Fix: Eliminate Voice Echo and Auto-Start Ambient Music in Flock"
author: ai
created_at: 2026-04-12T17:54:23.711Z
last_ai_edit: 2026-04-12T17:54:23.711Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-eliminate-voice-echo-auto-start-ambient-music-852079.md]]"
tags:
  - flock
  - audio
  - voice
  - music
  - bugfix
  - ux
  - commit
---

# Fix: Eliminate Voice Echo and Auto-Start Ambient Music in Flock

This update to the Flock project addresses a persistent voice echo issue by implementing ID-based tracking for proposals, ensuring voice and sound effects trigger only once per unique proposal. Additionally, it introduces an auto-start mechanism for ambient background music, which now plays automatically upon initial user interaction at a subtle volume level.

## Key Concepts

Voice Echo Elimination,ID-based Proposal Tracking,Ambient Music Auto-Start,Browser Autoplay Policy,Sound Effect Staggering

## Details

This commit for the [[Flock Project]] introduces significant improvements related to audio management and user experience.

### Voice Echo Fix
Previously, the system used a count-based method (`prevProposalCount`) to detect new proposals, which could lead to voice echo if the same proposals were detected multiple times due to polling. The fix replaces this with an ID-based `Set` (`voicedProposalIds`) to track each unique proposal ID. This ensures that voice readings and associated sound effects fire only once per distinct proposal, regardless of how many times polling identifies them.

Additionally, the timing of audio elements was adjusted:
*   Voice stagger between readings was increased from 4 seconds to 6 seconds.
*   Sound effect stagger was increased from 500 milliseconds to 800 milliseconds, providing a more natural auditory flow.

### Ambient Music Auto-Start
To enhance the user experience, ambient background music now auto-starts on the host page upon the first click or keypress. This change accommodates standard [Browser Autoplay Policy](https://developer.chrome.com/blog/autoplay) requirements, which necessitate a user gesture to initiate media playback.

*   The music's volume is set to a subtle 0.08 to serve as background ambiance without being distracting.
*   Prior to this update, ambient music could only be initiated by clicking the FLOCK logo, which was less intuitive for users.

## Related

[[Flock Project]],[[Browser Autoplay Policy]],[[Claude]]
