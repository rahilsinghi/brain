---
status: processed
source_type: api
channel: maison-travel-v0-spec
source_id: api/articles/v0-content-layer-dockerized-client-folder-model-1776443484196.md
ingested_at: 2026-04-17T16:31:24.196Z
parsed_at: null
compiled_to: "[[Dockerized Client Folder Model]]"
processed_at: 2026-04-17T16:33:32.521Z
retry_count: 0
last_error: null
compile_progress: null
---



# Dockerized Client Folder Model

> **Parent:** [V0 Content Layer — Master Architecture](./README.md)
> **Purpose:** Define the per-hotel filesystem layout, conventions, and a complete mock example. This is the architectural anchor Kim argued for — every hotel gets its own "home directory" where schemas, media, provenance, and agent config live together.

---

## The Concept

From Kim (April 17 meeting):
> "When clients sign up with Maison, they essentially get like a basic Claude account. It's like opening up Hermes or KELO. It sets up your core folders. It would hydrate your CLAUDE.md based on what Maison knows about your property to start with. There would be other folders in there for things like what we know about your customers. All of these things that are sort of unique IP that Maison brings that then essentially lets you stand up this sort of Ultron-style agent right off the bat that already has, like, it's fully trained, basically."

**Every hotel is an agent with a filesystem.** The folder is the contract between Maison, the hotel, and any AI model reading it.

---

## Canonical Folder Layout

```
hotels/
└── baron-s-cove-sag-harbor/              ← slugified hotel identifier
    │
    ├── CLAUDE.md                          ← agent system prompt, hydrated from JSON
    ├── README.md                          ← human-facing summary (auto-generated)
    │
    ├── data/                              ← JSON source of truth (10 schemas)
    │   ├── hotel.json                     ← Hotel schema
    │   ├── rooms.json                     ← Room[] — array of all rooms
    │   ├── amenities.json                 ← Amenity[] — all facilities/services
    │   ├── policies.json                  ← Policy[] — one per policyType
    │   ├── offers.json                    ← Offer[] — active + scheduled
    │   ├── experiences.json               ← Experience[] — nearby, linked
    │   ├── media.json                     ← Media[] — all images/videos/tours metadata
    │   ├── faq.json                       ← FAQ[] — wrapping existing QA pairs
    │   └── meta.json                      ← index + sync metadata
    │
    ├── markdown/                          ← GENERATED from JSON for human/Obsidian viewing
    │   ├── hotel.md                       ← rendered hotel.json
    │   ├── rooms.md
    │   ├── amenities.md
    │   ├── policies.md
    │   ├── offers.md
    │   ├── experiences.md
    │   └── faq.md
    │
    ├── media/                             ← local media manifest + thumbnails
    │   ├── manifest.json                  ← maps filenames → media IDs in media.json
    │   ├── hero/
    │   │   └── hero-001-thumb.webp        ← thumbnail for quick inspection; full versions on CDN
    │   └── gallery/
    │       ├── 001-thumb.webp
    │       └── ...
    │
    ├── provenance/                        ← audit trail
    │   ├── sources.json                   ← per-field: source URL, confidence, verified date
    │   ├── last-scrape.json               ← latest scraper run metadata
    │   ├── last-normalization.json        ← last normalizer run result
    │   ├── conflicts.json                 ← detected contradictions between sources
    │   └── exa-snapshots/
    │       ├── 2026-04-17.json            ← daily EXA diff snapshots
    │       └── ...
    │
    ├── skills/                            ← hotel-specific agentic workflows (V1+)
    │   ├── check-availability.md          ← how this agent checks availability
    │   ├── recommend-experiences.md       ← local recommendations logic
    │   ├── handle-special-request.md      ← e.g. "can I get a late check-out?"
    │   └── _index.json                    ← skill registry
    │
    ├── tools/                             ← hotel-specific integrations
    │   ├── pms-config.json                ← PMS type + property ID for Layer 2
    │   ├── stripe-account.json            ← Stripe Connect account for Layer 3
    │   ├── ticketing-partners.json        ← Resy/OpenTable integrations (V1)
    │   └── booking-engine-url.json        ← fallback deeplink if direct booking unavailable
    │
    └── .meta/                             ← internal tracking (hidden)
        ├── hash.txt                       ← SHA-256 of data/ — triggers Postgres sync
        ├── sync-state.json                ← last sync to Postgres + embeddings
        └── schema-versions.json           ← per-schema version tracking
```

---

## Conventions

### Slug format
`{hotel-name}-{city-or-area}` — kebab-case, ASCII-only
- Good: `baron-s-cove-sag-harbor`, `gurneys-montauk`, `the-maidstone-east-hampton`
- Bad: `BaronsCove_SagHarbor`, `baron's cove (sag harbor)`

Slug is the primary key. Changes require a migration (rare).

### File types by directory

| Directory | File types | Who writes |
|-----------|-----------|------------|
| `data/` | `.json` only | Normalizer service (automated); operator admin (V1) |
| `markdown/` | `.md` only | Auto-generated FROM `data/` — never edit directly |
| `media/` | `.json` + image thumbnails | Media pipeline |
| `provenance/` | `.json` only | Normalizer + scraper + EXA pipelines |
| `skills/` | `.md` + `.json` index | Hotel agent designers (V1) |
| `tools/` | `.json` only | Operator admin (during onboarding) |
| `.meta/` | `.txt`, `.json` | Sync pipeline |

### Source of truth rule (Kim's principle)
- `data/*.json` is the contract
- `markdown/*.md` is derived — regenerated on every `data/` change
- Human operators edit `data/` via admin console (V1), not markdown
- Markdown exists for visual inspection (Obsidian), diffing, agent readability

### Idempotency rule
- Writing the same JSON twice produces no change (hash match → skip)
- Regenerating markdown from unchanged JSON produces byte-identical output
- Postgres sync is idempotent — re-running is safe

### No cross-hotel files in `hotels/`
- Shared data (amenity ontology, experience dedup, global event index) lives elsewhere
- `hotels/` is purely per-hotel

---

## CLAUDE.md — The Agent System Prompt

Each hotel has a `CLAUDE.md` auto-generated from its JSON schemas. It's the "personality" of the hotel agent.

**Example** (excerpt from `hotels/baron-s-cove-sag-harbor/CLAUDE.md`):

```markdown
# Baron's Cove — Sag Harbor Agent

You are the conversational concierge for **Baron's Cove**, a waterfront
boutique hotel in Sag Harbor, NY. You answer guest questions, help with
bookings, recommend local experiences, and represent the property
warmly and accurately.

## Hotel Context

- **Location:** 31 West Water Street, Sag Harbor, NY 11963
- **Type:** Boutique waterfront hotel, 67 rooms
- **Vibe:** Romantic, quiet, luxe — *not* a party hotel
- **Price tier:** Luxury ($450–$1,200/night)
- **Notable:** Harbor views, sunset deck, in-room soaking tubs

## Strict Grounding Rules

1. Only state facts present in this hotel's knowledge base (`data/*.json`).
2. If asked something not in the KB: say you don't have that information
   and offer to connect the guest with the hotel directly.
3. Never infer pricing, availability, or booking terms. Use the
   `getHotelRates` tool for live pricing.
4. For policy questions, reference the exact text in `data/policies.json`.
5. For amenity questions, reference `data/amenities.json`. Don't make
   up hours or specifications.
6. For questions about nearby places, reference `data/experiences.json`.

## Available Tools

- `searchHotels` — used if guest asks about other Maison properties
- `getHotelRates` — live availability + pricing for this hotel
- `bookHotelOffer` — initiate a booking
- `getMedia` — fetch photos to display in chat
- `getFAQ` — surface common questions

## Skills

- check-availability → `skills/check-availability.md`
- recommend-experiences → `skills/recommend-experiences.md`

## Tone

Warm but concise. Know when to let the guest just look at pictures vs.
when to explain details. Match the hotel's brand: design-forward,
understated, confident. No corporate fluff.

---

*This CLAUDE.md is auto-generated from this hotel's data/ folder.
Last updated: 2026-04-17T10:00:00Z*
*Do not edit directly — edit data/hotel.json and regenerate.*
```

---

## meta.json — The Folder Index

Quick-access metadata for the whole hotel folder:

```json
{
  "hotelId": "maison:hotel:baron-s-cove-sag-harbor",
  "slug": "baron-s-cove-sag-harbor",
  "name": "Baron's Cove",
  "schemaCounts": {
    "rooms": 3,
    "amenities": 12,
    "policies": 7,
    "offers": 2,
    "experiences": 15,
    "media": 47,
    "faq": 87
  },
  "contentStatus": "baseline_verified",
  "lastNormalizedAt": "2026-04-17T10:00:00Z",
  "schemaVersions": {
    "hotel": 1, "room": 1, "amenity": 1, "policy": 1, "offer": 1,
    "experience": 1, "media": 1, "faq": 1
  },
  "qualityScore": 0.82,
  "maisonClient": false,
  "pmsConnected": false,
  "stripeConnected": false,
  "notes": [
    "Baseline scrape + Google Places only. No operator verification.",
    "Top 20 hero hotel — manual media enrichment pending."
  ]
}
```

---

## Markdown Generation

Human-readable markdown is auto-generated from JSON. Example:

### From `data/hotel.json` → `markdown/hotel.md`

```markdown
# Baron's Cove

*Sag Harbor, NY — 67 rooms*

A waterfront boutique hotel on Sag Harbor's historic cove, featuring rooms
with private balconies, a sunset-facing deck, and walking distance to Long Wharf.

## Location
- **Address:** 31 West Water Street, Sag Harbor, NY 11963
- **Area:** East End, Long Island → Sag Harbor
- **Coordinates:** 40.9987, -72.2945

## Contact
- Phone: +1-631-725-2100
- Email: info@baronscove.com
- Web: https://baronscove.com

## Character
- **Vibe:** Romantic (primary), quiet, luxe
- **Tags:** romantic, waterfront, boutique, historic, design-forward
- **Trip purposes:** Romantic getaway, weekend escape, foodie trip
- **Price tier:** Luxury ($450–$1,200/night)

## Rating
- **Google:** 4.5 (892 reviews)

## What's Here
See [rooms.md](./rooms.md) · [amenities.md](./amenities.md) ·
[policies.md](./policies.md) · [offers.md](./offers.md) ·
[faq.md](./faq.md)

## Nearby
See [experiences.md](./experiences.md) for 15 curated places within
walking distance.

---
*Auto-generated from `data/hotel.json`. Last updated: 2026-04-17T10:00:00Z.*
```

### From `data/amenities.json` → `markdown/amenities.md`

```markdown
# Amenities — Baron's Cove

## Pool — Outdoor Heated Pool
**Seasonal** · Open May 25 – Sept 30 · Daily 7am–10pm

Seasonal heated outdoor pool. Private cabanas available by reservation
(4 cabanas, $75/hour).

- Heated: Yes
- Outdoor: Yes
- Cabanas: 4 (reservable)
- Food service: Yes

## Restaurant — The Tavern
**$$$** · Coastal American, Seafood

Signature restaurant featuring locally sourced ingredients. Outdoor
seating on the deck overlooking the harbor.

- Meals: Breakfast, Lunch, Dinner
- Reservations required: Yes ([reserve via Resy](https://resy.com/...))
- Dresscode: Smart-casual
- Dietary: Vegetarian, Gluten-free options
- Signature dishes: Lobster roll, Oysters Rockefeller

...

---
*Auto-generated. Edit `data/amenities.json` to change.*
```

Markdown preserves hyperlinks between hotel files for navigation, lists photos inline (markdown references that render in Obsidian), and includes auto-generation timestamps.

---

## Media Manifest

`media/manifest.json` maps local filenames to media IDs:

```json
{
  "version": 1,
  "updated": "2026-04-17T10:00:00Z",
  "images": {
    "hero/hero-001-thumb.webp": {
      "mediaId": "maison:media:baron-s-cove:img:hero-001",
      "category": "exterior",
      "isHero": true,
      "cdnUrlTemplate": "https://cdn.maison.travel/hotels/baron-s-cove/img/hero-001-{size}.webp",
      "availableSizes": ["thumb", "small", "medium", "large"]
    },
    "gallery/001-thumb.webp": {
      "mediaId": "maison:media:baron-s-cove:img:gallery-001",
      "category": "interior",
      "subjects": ["lobby"],
      "cdnUrlTemplate": "https://cdn.maison.travel/hotels/baron-s-cove/img/gallery-001-{size}.webp"
    }
  },
  "videos": {},
  "tours": {}
}
```

Only **thumbnails** live in the folder (for quick inspection, Git-friendly size). Full images live on CloudFront; manifest carries the URL template.

---

## Provenance Files

### `provenance/sources.json` — per-field provenance

```json
{
  "hotel.name": {
    "source": "property_website",
    "sourceUrl": "https://baronscove.com",
    "confidence": 0.99,
    "verifiedAt": "2026-04-17T10:00:00Z",
    "method": "html_meta_og_title"
  },
  "hotel.telephone": {
    "source": "google_places",
    "sourceId": "ChIJsen_abc123",
    "confidence": 0.95,
    "verifiedAt": "2026-04-17T10:00:00Z"
  },
  "hotel.maison:vibe": {
    "source": "maison_llm_inference",
    "confidence": 0.78,
    "model": "claude-3-5-sonnet-20250929",
    "prompt": "maison-travel/vibe-inference-v1",
    "verifiedAt": "2026-04-17T10:00:00Z",
    "basedOn": ["hotel.description", "aggregateRating.sampledReviews"]
  },
  "amenity:pool-outdoor.ext.poolSpec.heated": {
    "source": "property_website",
    "sourceUrl": "https://baronscove.com/amenities/pool",
    "confidence": 0.98,
    "verifiedAt": "2026-04-17T10:00:00Z"
  }
}
```

### `provenance/last-scrape.json` — scraper run metadata

```json
{
  "scrapeRunId": "scrape_2026-04-17_10-00",
  "clientId": "client_uuid",
  "websiteId": "website_uuid",
  "triggeredBy": "daily_cron",
  "startedAt": "2026-04-17T10:00:00Z",
  "completedAt": "2026-04-17T10:04:23Z",
  "status": "SUCCESS",
  "scrapeType": "SCRAPE",
  "urlsDiscovered": 34,
  "urlsScraped": 34,
  "chunksGenerated": 89,
  "qaPairsGenerated": 112,
  "contentSnapshotId": "snap_abc123",
  "changeDetected": true,
  "changePct": 8.2,
  "previousSnapshotId": "snap_prev123"
}
```

### `provenance/conflicts.json` — detected contradictions

```json
{
  "version": 1,
  "updated": "2026-04-17T10:00:00Z",
  "conflicts": [
    {
      "field": "hotel.amenities[petFriendly].ext.petSpec.maxWeightKg",
      "sources": [
        { "source": "property_website", "value": 25, "confidence": 0.85 },
        { "source": "google_places_review", "value": 35, "confidence": 0.40 }
      ],
      "resolution": "used_highest_confidence",
      "resolvedValue": 25,
      "needsOperatorReview": false
    },
    {
      "field": "hotel.checkInTime",
      "sources": [
        { "source": "property_website", "value": "15:00", "confidence": 0.90 },
        { "source": "google_places", "value": "16:00", "confidence": 0.95 }
      ],
      "resolution": "deferred",
      "resolvedValue": null,
      "needsOperatorReview": true,
      "impact": "high — affects booking confirmation emails"
    }
  ]
}
```

Conflicts with `needsOperatorReview: true` are surfaced in the admin console and appear as warnings in `meta.json`.

---

## Skills Folder (V1)

Hotel-specific agent behaviors live here. V0 uses the generic skills; V1 lets hotels customize.

### Example `skills/check-availability.md`

```markdown
# Check Availability — Baron's Cove

When a guest asks about availability:

1. Call `getHotelRates` tool with:
   - hotelId: "maison:hotel:baron-s-cove-sag-harbor"
   - check_in, check_out, guests from the conversation

2. If rates are returned:
   - Present 2-3 room types, best for their party size first
   - Always show nightly rate + total + taxes + fees clearly
   - Mention cancellation terms if BAR is refundable

3. If no rates available for dates:
   - Don't apologize extensively
   - Offer 2 alternatives: shifting dates +/- 1 day, OR waitlist signup
   - Mention that Sag Harbor books up fast on summer weekends

4. If asked about fees/taxes, reference `data/policies.json` fees section.

## Tone

Confident. This is a high-end property — we're not bargaining.
But we're warm. Guests should feel cared for, not pitched.
```

V0 has a generic version; V1 adds per-hotel customization.

---

## Tools Folder

Hotel-specific integrations. Populated during onboarding.

### Example `tools/pms-config.json`

```json
{
  "pmsType": "cloudbeds",
  "propertyId": "12345",
  "connectionStatus": "active",
  "maisonClientId": "client_uuid_here",
  "credentialsRef": "aws-sm:maison/pms/baron-s-cove/cloudbeds",
  "features": {
    "ari_read": true,
    "rates_read": true,
    "booking_write": true,
    "booking_modify": true,
    "booking_cancel": true
  },
  "lastVerifiedAt": "2026-04-17T10:00:00Z"
}
```

Empty in V0 for non-client hotels. Populated when a hotel signs up and onboards their PMS.

### Example `tools/stripe-account.json`

```json
{
  "stripeAccountId": "acct_1234567890",
  "accountType": "standard",
  "connectionStatus": "active",
  "onboardingStatus": "completed",
  "chargesEnabled": true,
  "payoutsEnabled": true,
  "applicationFeePct": 5.0,
  "lastVerifiedAt": "2026-04-17T10:00:00Z"
}
```

---

## The Complete Hotel Folder — Mock Example

Here's what `hotels/baron-s-cove-sag-harbor/` looks like fully populated, at Week 2 of the POC:

```
baron-s-cove-sag-harbor/
├── CLAUDE.md                              # 3KB, auto-generated system prompt
├── README.md                              # 2KB, human overview
├── data/
│   ├── hotel.json                         # 18KB
│   ├── rooms.json                         # 24KB (3 rooms × ~8KB each)
│   ├── amenities.json                     # 32KB (12 amenities with sub-types)
│   ├── policies.json                      # 12KB (7 policy types)
│   ├── offers.json                        # 6KB (2 active offers)
│   ├── experiences.json                   # 45KB (15 experiences)
│   ├── media.json                         # 38KB (47 media refs, thin)
│   ├── faq.json                           # 52KB (87 QA pairs)
│   └── meta.json                          # 1KB
├── markdown/
│   ├── hotel.md                           # 3KB
│   ├── rooms.md                           # 5KB
│   ├── amenities.md                       # 8KB
│   ├── policies.md                        # 4KB
│   ├── offers.md                          # 2KB
│   ├── experiences.md                     # 10KB
│   └── faq.md                             # 18KB
├── media/
│   ├── manifest.json                      # 14KB
│   ├── hero/
│   │   └── hero-001-thumb.webp            # 12KB thumb
│   └── gallery/
│       ├── 001-thumb.webp … 046-thumb.webp  # 46 thumbs × ~10KB
├── provenance/
│   ├── sources.json                       # 24KB (per-field tracking)
│   ├── last-scrape.json                   # 2KB
│   ├── last-normalization.json            # 2KB
│   ├── conflicts.json                     # 4KB
│   └── exa-snapshots/
│       ├── 2026-04-17.json                # 8KB
│       └── ...
├── skills/                                # empty in V0
├── tools/
│   ├── pms-config.json                    # empty (not a Maison client)
│   └── booking-engine-url.json            # 512B
└── .meta/
    ├── hash.txt                           # 64B
    ├── sync-state.json                    # 1KB
    └── schema-versions.json               # 256B
```

**Total folder size**: ~800KB per hotel (mostly JSON + thumbnails).
**For 100 hotels**: ~80MB in Git — no problem.
**For 10K hotels**: ~8GB — Git-friendly but approaching threshold; migrate to S3.
**For 500K hotels**: ~400GB — S3 at this point, definitely.

---

## Navigating the Folder as an Agent

When an agent is asked a question about a hotel, it can:

```typescript
// Load full hotel context in one read
const hotel = await loadHotel("baron-s-cove-sag-harbor");
// hotel = { hotel: {...}, rooms: [...], amenities: [...], ... }

// Or load specific schema
const amenities = await loadSchema("baron-s-cove-sag-harbor", "amenities");

// Or read the generated markdown (for LLM context hydration)
const markdown = await loadMarkdown("baron-s-cove-sag-harbor");
// returns combined markdown from all .md files
```

The folder IS the agent's context. Load it, reason, respond.

---

## Version Control & Diffing

### Git (V0, 100 hotels)

- Each normalizer run commits to `hotels/{slug}/` with message:
  ```
  [baron-s-cove] scrape refresh 2026-04-17 — 3 fields updated

  - amenity:pool-outdoor.ext.poolSpec.heated: false → true (confidence 0.85 → 0.98)
  - policy:cancellation.maison:tiers[0].refundPct: 90 → 100 (confidence 0.78 → 0.92)
  - offer:summer-3-for-2 (NEW): 3-for-2 summer package detected

  Scrape run: scrape_2026-04-17_10-00
  ```
- PRs for operator-proposed changes (V1): operator edits JSON → creates branch → team reviews
- Diffs are reviewable

### S3 Versioning (V1+, 10K+ hotels)

- Each JSON file versioned in S3 with object versioning enabled
- Change log stored in DynamoDB (`kb-version-history` pattern)
- Git-like `blame` via S3 version history

---

## Schema Versioning

Every schema file has `maison:version` at root. Changes bump version.

`data/meta.json` tracks current per-schema version:

```json
{
  "schemaVersions": {
    "hotel": 1,
    "room": 1,
    "amenity": 1,
    "policy": 1,
    "offer": 1,
    "experience": 1,
    "media": 1,
    "faq": 1
  }
}
```

When a schema version bumps, the migrator updates all hotels' JSON files. Postgres picks up the new structure via normal sync.

---

## Admin Console Integration (V1)

The operator console (`apps/console`) provides a visual UI over the folder:

- Tree view of schemas (click hotel → browse rooms, amenities, policies)
- Form editors per schema (rendered from JSON Schema via A2UI)
- Diff viewer (changes since last verification)
- Media uploader (drag-drop → CDN pipeline)
- Provenance viewer (click any field → see source + confidence)
- Conflicts panel (resolve contradictions)

Console writes directly to `data/*.json`. Sync pipeline picks up changes and updates Postgres. JSON is always canonical.

---

## Why This Works

### For the team
- **Kim**: JSON-first confirmed. Dockerized client folder is real. Agents can cd into a hotel.
- **Noel**: No over-engineering. Folder is just filesystem. Postgres handles queries. No exotic DB.
- **Fredrik**: Maison Exchange has a *filesystem contract* — any AI platform can be handed a hotel folder and operate.
- **Operators (V1)**: See their hotel as a coherent entity. Verify, enrich, own it.

### For the agents
- **Claude / GPT / Gemini**: Read `CLAUDE.md` + `data/*.json` → full context, zero hallucination
- **Cross-hotel queries**: Delegated to Postgres via MCP tools
- **Per-hotel reasoning**: Local filesystem read — no API calls needed

### For ops
- **Backup is free** — JSON folder IS the backup
- **Regeneration** — if Postgres dies, rebuild from JSON in hours
- **Transparency** — every piece of data has a source, confidence, timestamp

---

## Related Documents

- [Schema Specifications](./schemas.md) — what each JSON file contains
- [Storage Architecture](./storage.md) — how folders sync to Postgres
- [Integration](./integration.md) — how scraper output writes into these folders
- [Media Layer](./media-layer.md) — how media pipeline populates `media/`
