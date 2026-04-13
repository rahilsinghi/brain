---
title: "Navigation Fix: Separate Hackathons and Projects Section IDs"
author: ai
created_at: 2026-04-12T17:14:22.190Z
last_ai_edit: 2026-04-12T17:14:22.190Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-fix-nav-separate-hackathons-and-projects-section-ids-ed3a9c.md]]"
tags:
  - navigation
  - frontend
  - portfolio
  - hackathons
  - projects
  - section id
  - fix
---

# Navigation Fix: Separate Hackathons and Projects Section IDs

This commit addresses a navigation issue in the `rahilsinghi/portfolio` repository by assigning distinct IDs to the 'Hackathons' and 'Projects' sections. Each section now has a unique identifier, ensuring proper linking and navigation through the `SectionDots` component.

## Key Concepts

Navigation,Section IDs,Portfolio Website,Hackathons,Projects,SectionDots Component

## Details

This fix, identified by commit SHA `5344785` in the `rahilsinghi/portfolio` repository on `2026-04-08`, specifically separates the HTML `id` attributes for the 'Hackathons' and 'Projects' sections. The 'Hackathons' section is now assigned `id="hackathons"`, and the 'Projects' ticker section uses `id="projects"`. This change, involving 2 files with 2 additions and 1 deletion, ensures that the `SectionDots` navigation component correctly references and provides entries for both distinct sections, enhancing user experience and site structure.

## Related

[[rahilsinghi/portfolio]],[[Hackathons]],[[ProjectsTicker]]
