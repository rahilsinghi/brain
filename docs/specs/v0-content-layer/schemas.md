# Schema Specifications

> **Parent:** [V0 Content Layer — Master Architecture](./README.md)
> **Purpose:** Full schema definitions with JSON-LD mocks for all 10 entity types
> **Running example:** Baron's Cove, Sag Harbor (real East End property)

---

## Schema Design Principles

1. **schema.org compliance** — every schema extends a schema.org base where possible. Agents and LLMs trained on web data already understand these shapes.
2. **Maison extensions** — custom fields use `maison:` namespace. Clearly non-standard, easy to filter out for third-party consumption.
3. **Provenance is first-class** — every field has a source, confidence score, and last-verified timestamp. Agents know what to trust.
4. **JSON is the contract** — schemas are JSON Schema validatable. Normalizer output must validate before writing to Postgres.
5. **No prescriptive rules at the retrieval layer** — schemas define structure, not behavior. The LLM reasons freely on top of structured data. (Responds to Noel's Poggio-era concern.)
6. **Extensible** — every schema has an `ext` field for hotel-specific or partner-specific additions without schema changes.

---

## Table of Contents

1. [Hotel](#1-hotel) — anchor entity
2. [Room](#2-room) — accommodation types
3. [Amenity](#3-amenity) — with sub-types
4. [Policy](#4-policy) — cancellation, pets, fees
5. [Offer](#5-offer) — promos and packages
6. [Experience](#6-experience) — nearby places to go
7. [Media](#7-media) — images/video/360° with discriminator
8. [Rates](#8-rates) — dynamic, Postgres-only
9. [FAQ](#9-faq) — scraped + operator
10. [Event](#10-event) — concerts, festivals (standalone index)

Each section contains:
- **Purpose** — what this schema represents and why it's separate
- **schema.org base** — the upstream type we inherit
- **JSON-LD mock** — realistic example using Baron's Cove
- **Field dictionary** — every field explained with types + sources
- **Relationships** — how this schema connects to others
- **V0 source mapping** — where data comes from initially

---

## Common Field Conventions

Every schema has:

| Field | Type | Purpose |
|-------|------|---------|
| `@context` | URL | `https://schema.org` |
| `@type` | string | schema.org type (e.g. `Hotel`, `Offer`) |
| `@id` | URN | stable Maison identifier (e.g. `maison:hotel:baron-s-cove-sag-harbor`) |
| `maison:version` | int | schema version for migration |
| `maison:provenance` | object | per-field source tracking (see below) |
| `maison:lastVerifiedAt` | ISO timestamp | last time this was checked for freshness |
| `ext` | object | hotel/partner-specific extensions |

### Provenance object (shared across schemas)

```json
{
  "maison:provenance": {
    "fields": {
      "name": { "source": "property_website", "confidence": 0.99, "verifiedAt": "2026-04-17T10:00:00Z" },
      "address": { "source": "google_places", "confidence": 0.95, "verifiedAt": "2026-04-17T10:00:00Z" },
      "description": { "source": "property_website", "confidence": 0.88, "verifiedAt": "2026-04-17T10:00:00Z" }
    },
    "sources": [
      { "id": "src:scrape:baron-s-cove:2026-04-17", "type": "property_website", "url": "https://baronscove.com" },
      { "id": "src:places:chij-abc123", "type": "google_places", "placeId": "ChIJabc123" }
    ]
  }
}
```

`source` values: `property_website | google_places | exa | operator_admin | preferred_cms | pms | ticketmaster | manual`

---

## 1. Hotel

### Purpose
The anchor entity. Every room, amenity, policy, offer, and media item links back to a hotel. Identity, location, contact details, character, and pointers to child entities all live here.

### schema.org base
`Hotel` + `LodgingBusiness`

### JSON-LD mock

```json
{
  "@context": "https://schema.org",
  "@type": "Hotel",
  "@id": "maison:hotel:baron-s-cove-sag-harbor",
  "maison:version": 1,

  "name": "Baron's Cove",
  "alternateName": ["Baron's Cove Sag Harbor", "Barons Cove"],
  "description": "A waterfront boutique hotel on Sag Harbor's historic cove, featuring 67 rooms with private balconies, a sunset-facing deck, and walking distance to Long Wharf.",

  "url": "https://baronscove.com",
  "telephone": "+1-631-725-2100",
  "email": "info@baronscove.com",

  "address": {
    "@type": "PostalAddress",
    "streetAddress": "31 West Water Street",
    "addressLocality": "Sag Harbor",
    "addressRegion": "NY",
    "postalCode": "11963",
    "addressCountry": "US"
  },

  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.9987,
    "longitude": -72.2945
  },

  "maison:area": "east-end-long-island",
  "maison:subArea": "sag-harbor",

  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.5,
    "reviewCount": 892,
    "bestRating": 5,
    "maison:source": "google_places",
    "maison:sampledReviews": 20
  },

  "priceRange": "$$$",
  "maison:priceTier": "luxury",
  "maison:priceIndicator": { "low": 450, "high": 1200, "currency": "USD", "per": "night" },

  "maison:characterTags": ["romantic", "waterfront", "boutique", "historic", "design-forward"],
  "maison:tripPurposes": ["romantic-getaway", "weekend-escape", "foodie-trip"],
  "maison:vibe": {
    "primary": "romantic",
    "secondary": ["quiet", "luxe"],
    "description": "Refined coastal elegance with a quiet, grown-up energy. Not a party hotel."
  },

  "maison:heroMediaId": "maison:media:baron-s-cove:img:hero-001",

  "maison:rooms": [
    "maison:room:baron-s-cove:harbor-view-king",
    "maison:room:baron-s-cove:water-view-suite",
    "maison:room:baron-s-cove:cove-king"
  ],

  "maison:amenities": [
    "maison:amenity:baron-s-cove:pool-outdoor",
    "maison:amenity:baron-s-cove:restaurant-the-tavern",
    "maison:amenity:baron-s-cove:bar-baron-s",
    "maison:amenity:baron-s-cove:pet-friendly",
    "maison:amenity:baron-s-cove:parking-valet"
  ],

  "maison:policyIds": [
    "maison:policy:baron-s-cove:cancellation",
    "maison:policy:baron-s-cove:pet",
    "maison:policy:baron-s-cove:check-in-out",
    "maison:policy:baron-s-cove:fees"
  ],

  "maison:nearbyExperienceIds": [
    "maison:experience:sag-harbor:sen-restaurant",
    "maison:experience:sag-harbor:long-wharf",
    "maison:experience:sag-harbor:whaling-museum"
  ],

  "maison:pmsConfig": {
    "type": "cloudbeds",
    "propertyId": "12345",
    "maisonClientId": "client_uuid_here"
  },

  "maison:stripeAccountId": "acct_1234567890",

  "maison:contentStatus": "baseline_verified",
  "maison:lastScrapeAt": "2026-04-17T10:00:00Z",
  "maison:lastVerifiedAt": "2026-04-17T10:00:00Z",

  "maison:provenance": {
    "fields": {
      "name": { "source": "property_website", "confidence": 0.99 },
      "telephone": { "source": "google_places", "confidence": 0.95 },
      "maison:vibe": { "source": "maison_llm_inference", "confidence": 0.78, "model": "claude-3-5-sonnet-20250929" }
    }
  },

  "ext": {
    "preferred_hotels_member": false,
    "small_luxury_hotels_member": false
  }
}
```

### Field dictionary

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `name` | string | Scrape + Places API | Canonical name (passed into scrape invocation to prevent LLM drift — see today's hallucination fix) |
| `alternateName` | string[] | LLM-extracted | For search matching |
| `description` | string | LLM-generated from scrape | Grounded, no hallucination |
| `url` | URL | Config (one row per website in Postgres) | |
| `telephone`, `email` | string | Scrape + Places | Places preferred for canonical format |
| `address` | PostalAddress | Scrape + Places | PostGIS geocodes from this |
| `geo` | GeoCoordinates | Places (preferred) or geocoding | Required for geo queries |
| `maison:area`, `subArea` | string | Hierarchical classification | For "East End of Long Island" or "Montauk vs. Sag Harbor" |
| `aggregateRating` | AggregateRating | Places API | Sampled reviews (20) retained for LLM context |
| `priceRange` | string | Scrape + LLM inference | `$`, `$$`, `$$$`, `$$$$` |
| `maison:priceTier` | enum | LLM inference | `budget`, `mid`, `luxury`, `ultra-luxury` |
| `maison:priceIndicator` | object | LLM-extracted from website pricing | Not live — indicative range |
| `maison:characterTags` | string[] | LLM from scrape + reviews | Controlled vocabulary (spec below) |
| `maison:tripPurposes` | string[] | LLM inference | Controlled vocabulary |
| `maison:vibe` | object | LLM inference | Primary + secondary + description |
| `maison:rooms[]` | URN[] | Normalizer links | FK-like to Room schema |
| `maison:amenities[]` | URN[] | Normalizer links | FK-like to Amenity schema |
| `maison:policyIds[]` | URN[] | | |
| `maison:nearbyExperienceIds[]` | URN[] | Postgres geo join | Populated nightly |
| `maison:pmsConfig` | object | Operator admin | For Layer 2 rate lookups |
| `maison:stripeAccountId` | string | Stripe Connect onboarding | For Layer 3 payouts |

### Controlled vocabularies

**`maison:characterTags`** (add to these; enforce one list):
`romantic, family-friendly, business, design-forward, rustic, luxe, budget, historic, boutique, all-inclusive, wellness, beachfront, waterfront, oceanfront, harbor, secluded, lively, party, adults-only, pet-friendly, kid-friendly, group-friendly, surf, mountain, urban, countryside, winery-adjacent, foodie-destination`

**`maison:tripPurposes`**:
`romantic-getaway, family-trip, solo-escape, group-friends, work-play, wellness-retreat, foodie-trip, wedding-venue, adventure, weekend-escape, business-trip, bachelorette, bachelor, honeymoon, anniversary, babymoon`

**`maison:vibe.primary`** (required, single):
`romantic, lively, design-forward, surf-outdoors, cozy-rustic, luxe, family-casual, business-efficient`

### Relationships

- `Hotel.maison:rooms[]` → `Room[]` (1-many)
- `Hotel.maison:amenities[]` → `Amenity[]` (1-many)
- `Hotel.maison:policyIds[]` → `Policy[]` (1-many, one per policy type)
- `Hotel.maison:nearbyExperienceIds[]` → `Experience[]` (many-many, denormalized from geo join)
- `Hotel.maison:heroMediaId` → `Media` (1-1)
- `Hotel.maison:pmsConfig.maisonClientId` → existing Maison `clients.id` (FK)

### V0 source mapping

Pipeline per hotel:
1. Scraper run (Stage 1-3.5) produces cleaned markdown in `content_snapshots`
2. Normalizer reads markdown, calls LLM with JSON Schema constraint
3. Google Places API called separately for `telephone`, `email`, `address`, `geo`, `aggregateRating`
4. LLM infers `characterTags`, `tripPurposes`, `vibe` from combined scrape + reviews
5. `pmsConfig` and `stripeAccountId` left null until operator onboarding (V1 for most hotels)
6. JSON file written to `hotels/baron-s-cove-sag-harbor/data/hotel.json`, Postgres row materialized from it

---

## 2. Room

### Purpose
Accommodation types within a hotel. One Room entity per room type (not per physical room). Occupancy, bed configurations, images, and base rate indicators.

### schema.org base
`HotelRoom` + `Accommodation`

### JSON-LD mock

```json
{
  "@context": "https://schema.org",
  "@type": "HotelRoom",
  "@id": "maison:room:baron-s-cove:harbor-view-king",
  "maison:version": 1,

  "maison:hotelId": "maison:hotel:baron-s-cove-sag-harbor",

  "name": "Harbor View King",
  "alternateName": ["Harbor King", "Premium Harbor View"],
  "description": "A 350 sq ft king room with a private balcony overlooking Sag Harbor Cove. Features in-room soaking tub and sunset exposure.",

  "maison:roomCategory": "standard",
  "maison:bedConfiguration": {
    "beds": [{ "type": "king", "count": 1 }],
    "sleeps": 2,
    "maxOccupancy": 2
  },
  "floorSize": { "@type": "QuantitativeValue", "value": 350, "unitCode": "FTK" },

  "maison:view": "harbor",
  "maison:floorLevel": { "min": 1, "max": 3 },

  "maison:inRoomAmenities": [
    "balcony",
    "soaking-tub",
    "rainfall-shower",
    "king-bed",
    "mini-fridge",
    "nespresso",
    "smart-tv",
    "work-desk",
    "air-conditioning",
    "heating"
  ],

  "maison:accessibilityFeatures": [],

  "maison:basePriceIndicator": {
    "low": 495,
    "high": 795,
    "currency": "USD",
    "per": "night",
    "note": "Indicative range — live rates from PMS"
  },

  "maison:mediaIds": [
    "maison:media:baron-s-cove:img:harbor-king-001",
    "maison:media:baron-s-cove:img:harbor-king-002",
    "maison:media:baron-s-cove:img:harbor-king-003"
  ],

  "maison:pmsMappings": {
    "cloudbeds": { "roomTypeId": "RT_001", "rateplanIds": ["RP_BAR", "RP_BB"] }
  },

  "maison:tags": ["king", "harbor-view", "balcony", "sunset", "couples"],

  "maison:lastVerifiedAt": "2026-04-17T10:00:00Z",

  "maison:provenance": {
    "fields": {
      "name": { "source": "property_website", "confidence": 0.99 },
      "floorSize": { "source": "property_website", "confidence": 0.85 },
      "maison:view": { "source": "property_website", "confidence": 0.92 }
    }
  }
}
```

### Field dictionary (highlights)

| Field | Type | Source |
|-------|------|--------|
| `maison:roomCategory` | enum | `standard`, `suite`, `deluxe`, `junior-suite`, `villa`, `bungalow`, `tent` |
| `maison:bedConfiguration` | object | Structured — enables "king bed" queries |
| `maison:view` | enum | `harbor`, `ocean`, `garden`, `city`, `courtyard`, `pool`, `mountain`, `street`, `interior` |
| `maison:inRoomAmenities` | string[] | Controlled vocabulary (see below) |
| `maison:basePriceIndicator` | object | Indicative only — live rates live in Rates schema |
| `maison:pmsMappings` | object | PMS-specific IDs for rate lookups; keyed by PMS type |

**`maison:inRoomAmenities` vocabulary:**
`king-bed, queen-bed, two-queen-beds, twin-beds, sofa-bed, crib-available, bathtub, soaking-tub, jet-tub, rainfall-shower, walk-in-shower, double-vanity, bidet, balcony, terrace, private-garden, ocean-view, harbor-view, city-view, fireplace, kitchenette, full-kitchen, mini-fridge, nespresso, smart-tv, soundbar, work-desk, seating-area, air-conditioning, heating, ceiling-fan, in-room-safe, iron-board, hair-dryer, robes-slippers, turndown-service, adjoining-room-option`

### V0 source mapping

- Name + description: scraped website room page + LLM structuring
- `bedConfiguration`, `floorSize`: scraped website (often in tables or bullet lists — LLM-extractable)
- `maison:inRoomAmenities`: LLM extraction from room page text + room photos (VLM captioning can catch things not in text)
- `maison:view`: LLM inference from description + photo analysis
- Media IDs: linked from Media pipeline (photos scraped from room pages and tagged to this room)
- `maison:pmsMappings`: empty in V0 (filled during hotel onboarding for Layer 2)

---

## 3. Amenity

### Purpose
A facility, service, or offering attached to a hotel. Composite schema with **sub-types** (Pool, Restaurant, Gym, Spa, Bar, Pet, EV, Conference, Parking, Accessibility). Sub-types share a common base and add specialized fields.

This is the most heterogeneous schema. A "Pool" has depth and heating; a "Restaurant" has cuisine and hours; a "Pet Policy" has weight limits. We use an inheritance pattern.

### schema.org base
No single good match. Composite:
- Pool/Gym/Spa → schema.org doesn't have these as first-class. We use `LocationFeatureSpecification` as the base for all.
- Restaurant → `FoodEstablishment`
- Bar → `BarOrPub`
- Conference → `MeetingRoom`
- Parking → `ParkingFacility`

### Base Amenity + Sub-type pattern

```json
{
  "@context": "https://schema.org",
  "@type": "LocationFeatureSpecification",
  "@id": "maison:amenity:baron-s-cove:pool-outdoor",
  "maison:version": 1,

  "maison:hotelId": "maison:hotel:baron-s-cove-sag-harbor",
  "maison:amenitySubType": "Pool",

  "name": "Outdoor Heated Pool",
  "description": "Seasonal heated outdoor pool open Memorial Day to Labor Day, with private cabanas available by reservation.",

  "value": true,

  "maison:category": "wellness",
  "maison:featured": true,

  "openingHours": "Mo-Su 07:00-22:00",
  "maison:seasonality": { "open": "May-25", "close": "Sept-30" },

  "maison:mediaIds": [
    "maison:media:baron-s-cove:img:pool-001",
    "maison:media:baron-s-cove:img:pool-sunset"
  ],

  "maison:tags": ["heated", "outdoor", "cabanas", "seasonal"],

  "ext": {
    "poolSpec": {
      "type": "outdoor",
      "heated": true,
      "indoor": false,
      "dimensions": { "lengthM": 15, "widthM": 6, "depthMetersMax": 2.0 },
      "kidsSection": false,
      "lapLanes": 0,
      "cabanas": { "count": 4, "reservationRequired": true, "hourlyRate": { "amount": 75, "currency": "USD" } },
      "towelsProvided": true,
      "foodServiceAtPool": true
    }
  },

  "maison:provenance": {
    "fields": {
      "name": { "source": "property_website", "confidence": 0.98 },
      "maison:seasonality": { "source": "property_website", "confidence": 0.9 }
    }
  }
}
```

### Sub-type specs (what goes in `ext`)

#### Pool (`poolSpec`)
```json
{
  "type": "outdoor | indoor | rooftop",
  "heated": boolean,
  "indoor": boolean,
  "kidsSection": boolean,
  "lapLanes": number,
  "cabanas": { "count": number, "reservationRequired": boolean, "hourlyRate": MonetaryAmount },
  "dimensions": { "lengthM": number, "widthM": number, "depthMetersMax": number },
  "towelsProvided": boolean,
  "foodServiceAtPool": boolean
}
```

#### Restaurant (`restaurantSpec`, `@type: FoodEstablishment`)
```json
{
  "cuisine": ["coastal-american", "seafood"],
  "mealsServed": ["breakfast", "lunch", "dinner", "brunch"],
  "priceRange": "$$$",
  "reservationRequired": true,
  "reservationUrl": "https://...",
  "accessibleForFree": false,
  "childFriendly": true,
  "petFriendly": false,
  "dresscode": "smart-casual",
  "dietaryOptions": ["vegetarian", "gluten-free"],
  "outdoorSeating": true,
  "barAttached": true,
  "notableDishes": ["lobster roll", "oysters rockefeller", "dayboat fish"],
  "chef": { "name": "Matty Boudreau" }
}
```

#### Gym (`gymSpec`)
```json
{
  "open24Hours": false,
  "openingHours": "Mo-Su 05:00-23:00",
  "ageRestriction": 16,
  "equipment": ["peloton", "treadmill", "free-weights", "rowing", "yoga-mats"],
  "personalTraining": true,
  "classes": ["yoga", "hiit"]
}
```

#### Spa (`spaSpec`)
```json
{
  "services": ["massage", "facial", "body-treatment", "couples-massage"],
  "priceRangePerTreatment": { "low": 150, "high": 450, "currency": "USD" },
  "hydrotherapy": true,
  "sauna": true,
  "steamRoom": true,
  "pool": true,
  "bookingUrl": "https://..."
}
```

#### Bar (`barSpec`, `@type: BarOrPub`)
```json
{
  "signatureDrinks": ["frozen martini", "cove old-fashioned"],
  "happyHour": "Mo-Fr 16:00-18:00",
  "livemusic": { "schedule": "Fr-Sa 20:00-23:00", "style": "jazz" },
  "outdoorSeating": true
}
```

#### Conference/Meeting (`conferenceSpec`, `@type: MeetingRoom`)
```json
{
  "roomCount": 3,
  "maxCapacity": 150,
  "layouts": ["theater", "boardroom", "ushape", "banquet"],
  "avEquipment": ["projector", "mic", "conference-phone"],
  "cateringAvailable": true,
  "bookingContactEmail": "events@baronscove.com"
}
```

#### Pet (`petSpec`) — the query "pet-friendly stay near Taylor Swift concert" depends on this
```json
{
  "allowed": true,
  "dogsAllowed": true,
  "catsAllowed": false,
  "otherAnimalsAllowed": false,
  "maxWeightKg": 25,
  "maxPetsPerRoom": 2,
  "feesPerStay": { "amount": 50, "currency": "USD" },
  "feesPerNight": { "amount": 25, "currency": "USD" },
  "depositRequired": false,
  "areasAllowed": ["rooms", "lobby", "outdoor-patio"],
  "areasRestricted": ["restaurant", "pool"],
  "amenitiesProvided": ["bowls", "dog-bed", "welcome-treat"],
  "leashRequired": true,
  "petSitterAvailable": false,
  "noteFromHotel": "Advance notification required. Pet relief area on north lawn."
}
```

#### Parking (`parkingSpec`, `@type: ParkingFacility`)
```json
{
  "type": "valet",
  "self-parking": false,
  "valet": true,
  "free": false,
  "rates": { "perNight": { "amount": 40, "currency": "USD" } },
  "evCharging": { "available": true, "chargerCount": 4, "types": ["tesla", "j1772"] },
  "accessibleSpots": 2
}
```

#### Accessibility (`accessibilitySpec`) — critical, often legally required
```json
{
  "wheelchairAccessible": true,
  "elevatorAvailable": true,
  "accessibleRooms": { "count": 4, "roomIds": ["maison:room:baron-s-cove:accessible-king"] },
  "accessibleBathrooms": ["roll-in-shower", "grab-bars"],
  "hearingAccessible": { "visualFireAlarm": true, "closedCaptionTVs": true, "ttyPhone": false },
  "visuallyAccessible": { "brailleSignage": true, "largePrintMenus": true },
  "pathAccessibility": "step-free",
  "guideDogsAllowed": true,
  "adaCompliant": true
}
```

### V0 source mapping

- Most amenity sub-types: LLM-extracted from website + Places API
- `petSpec`: extra-careful extraction — if ambiguous, mark `confidence < 0.7` and defer to operator verification in V1
- Media IDs: linked from image pipeline (e.g. all photos tagged `pool` get linked to Pool amenity)
- `openingHours`: Places API preferred (structured)
- `seasonality`: LLM from website (often in natural language: "open Memorial Day to Labor Day")

---

## 4. Policy

### Purpose
Rules that govern the stay: cancellation terms, check-in/out times, minimum stays, fees, pet rules, smoking, age restrictions. These affect booking logic and must be displayed before payment (per the booking flow in the main POC spec).

One Policy entity per policy type per hotel (not one big Policy blob). Enables precise querying: "hotels with free cancellation within 48hrs."

### schema.org base
No good single match. Custom schema with `@type: maison:Policy` (acceptable — policies are first-class Maison concept).

### JSON-LD mock (Cancellation policy)

```json
{
  "@context": "https://schema.org",
  "@type": "maison:Policy",
  "@id": "maison:policy:baron-s-cove:cancellation",
  "maison:version": 1,

  "maison:hotelId": "maison:hotel:baron-s-cove-sag-harbor",
  "maison:policyType": "cancellation",

  "name": "Cancellation Policy",
  "description": "Free cancellation up to 48 hours before check-in. After 48 hours, one night's room and tax is charged. No-shows are charged the full stay.",

  "maison:tiers": [
    { "windowHoursBefore": 48, "refundPct": 100, "description": "Full refund" },
    { "windowHoursBefore": 24, "refundPct": 50, "description": "50% refund; balance as hotel credit for 12 months" },
    { "windowHoursBefore": 0, "refundPct": 0, "description": "No refund; credit for 6 months at hotel's discretion" }
  ],
  "maison:noShowPolicy": "Full stay charged at scheduled check-in time",

  "maison:appliesTo": {
    "rateTypes": ["BAR", "BB", "AP"],
    "exclusions": ["non-refundable rate plan NR"]
  },

  "maison:source": "property_website",
  "maison:lastVerifiedAt": "2026-04-17T10:00:00Z"
}
```

### Policy types (required for V0)

Every hotel gets one of each of these policy objects (if applicable):

| `policyType` | Key fields |
|--------------|-----------|
| `cancellation` | `tiers[]`, `noShowPolicy`, `appliesTo` |
| `check-in-out` | `checkInTime`, `checkOutTime`, `earlyCheckIn`, `lateCheckOut`, `afterHoursProcess` |
| `pet` | See Amenity.petSpec — may be redundant; prefer amenity, keep policy for legal text |
| `smoking` | `smokingAllowed` (boolean), `designatedAreas`, `feeForViolation` |
| `age-restrictions` | `minimumCheckInAge`, `unaccompaniedMinors`, `childAgeDefinitions` |
| `fees` | `resortFee`, `destinationFee`, `cityTax`, `touristTax`, `parkingFee`, `petFee`, `all-fee-breakdown` |
| `deposit` | `depositRequired`, `depositAmount`, `depositType` (percent/flat/first-night) |
| `minimum-stay` | `weekendMinimum`, `holidayMinimum`, `seasonalMinimums` |
| `group-booking` | `definitionOfGroup` (e.g. >=5 rooms), `groupContactEmail`, `groupDepositTerms` |
| `damage-deposit` | `required`, `amount`, `refundTiming` |
| `noise-quiet-hours` | `quietHoursStart`, `quietHoursEnd` |

### Policy mock (Check-in/out)

```json
{
  "@type": "maison:Policy",
  "@id": "maison:policy:baron-s-cove:check-in-out",
  "maison:hotelId": "maison:hotel:baron-s-cove-sag-harbor",
  "maison:policyType": "check-in-out",

  "maison:checkInTime": "15:00",
  "maison:checkOutTime": "11:00",
  "maison:earlyCheckIn": {
    "available": true,
    "fee": null,
    "subjectToAvailability": true,
    "requestMethod": "in-advance-email"
  },
  "maison:lateCheckOut": {
    "available": true,
    "latestTime": "14:00",
    "fee": { "amount": 50, "currency": "USD" },
    "subjectToAvailability": true
  },
  "maison:afterHoursProcess": "Front desk manned 24 hours; lockbox alternative if arriving after 23:00"
}
```

### Policy mock (Fees)

```json
{
  "@type": "maison:Policy",
  "@id": "maison:policy:baron-s-cove:fees",
  "maison:policyType": "fees",

  "maison:resortFee": {
    "applies": true,
    "amount": 35,
    "currency": "USD",
    "per": "night",
    "mandatory": true,
    "includes": ["wifi", "pool-access", "gym-access", "newspaper"]
  },
  "maison:cityTax": {
    "applies": true,
    "pct": 4.25,
    "basis": "room_plus_resort_fee"
  },
  "maison:touristTax": {
    "applies": false
  },
  "maison:parkingFee": { "amount": 40, "currency": "USD", "per": "night", "valet": true },
  "maison:petFee": { "amount": 50, "currency": "USD", "per": "stay" }
}
```

### V0 source mapping

- Scrape the "Policies" / "FAQ" / "Terms" pages of each hotel website
- Google Places "About" section has some of this
- LLM extraction with heavy validation — confidence scores must exceed 0.8 to be shown without operator verification
- Fallback: `{ policyType: "cancellation", maison:contentStatus: "unknown", maison:defaultApplied: "24hr-standard" }`

---

## 5. Offer

### Purpose
Promotions, packages, seasonal deals, membership codes. Distinct from Rates because offers are hotel-authored marketing content with fixed terms. Rates are dynamic inventory+price lookups.

### schema.org base
`Offer` + `MonetaryAmount`

### JSON-LD mock

```json
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "@id": "maison:offer:baron-s-cove:summer-stay-3-for-2",
  "maison:version": 1,

  "maison:hotelId": "maison:hotel:baron-s-cove-sag-harbor",

  "name": "Stay 3, Pay for 2 — Summer Special",
  "description": "Book a stay of 3+ nights midweek (Sun-Thu) between May 25 and September 1 and receive the third night free. Breakfast for two included.",

  "maison:offerType": "package",
  "maison:category": "seasonal",

  "maison:discountType": "night-credit",
  "maison:discountDetail": { "thirdNightFree": true },

  "priceSpecification": {
    "@type": "PriceSpecification",
    "minPrice": 495,
    "maxPrice": 795,
    "priceCurrency": "USD",
    "note": "Starting rates per night"
  },

  "maison:inclusions": ["breakfast-for-two", "complimentary-parking", "1pm-late-checkout"],
  "maison:exclusions": ["holiday-blackouts"],

  "validFrom": "2026-05-25",
  "validThrough": "2026-09-01",
  "maison:blackoutDates": ["2026-07-04", "2026-08-29"],
  "maison:dayOfWeekRestrictions": ["Sun", "Mon", "Tue", "Wed", "Thu"],
  "maison:minNights": 3,
  "maison:maxNights": null,

  "maison:promoCode": "SUMMER3FOR2",
  "maison:bookingUrl": "https://baronscove.com/offers/summer-3-for-2",

  "maison:eligibleRoomTypes": [
    "maison:room:baron-s-cove:harbor-view-king",
    "maison:room:baron-s-cove:water-view-suite"
  ],

  "maison:recurring": { "season": "summer", "yearlyRecurrence": true, "nextOccurrence": "2027-05-25" },

  "maison:mediaIds": ["maison:media:baron-s-cove:img:summer-hero"],

  "maison:lastVerifiedAt": "2026-04-17T10:00:00Z"
}
```

### Offer types (controlled vocabulary)

| `offerType` | Examples |
|-------------|----------|
| `package` | 3-for-2, spa-and-stay, romantic-escape |
| `promo-code` | NEWSLETTER10, VALENTINES20 |
| `loyalty` | Returning guest rate, Amex Platinum rate |
| `seasonal` | Summer, holiday, shoulder-season |
| `group` | Corporate rate, wedding block |
| `last-minute` | 48-hour sale |
| `early-bird` | Book 60 days out, save 15% |
| `member-rate` | Preferred Hotels member discount |
| `governmental` | AAA, military, senior |

### V0 source mapping

- Scrape the "Offers" or "Specials" page of each hotel website
- Parse "Deals" sections of Google Places listings
- EXA (V0 exploratory) for dynamic offers — a hotel's summer sale updates mid-season
- Manual curation for top-20 hotels — ensures the demo has clean offer content

---

## 6. Experience

### Purpose
Places adjacent to hotels that guests want to know about: restaurants, wineries, beaches, farms, activities, shops. These aren't Maison inventory — they're the context that makes the travel experience complete.

### schema.org base
`TouristAttraction` + `FoodEstablishment` + `LocalBusiness` (varies by experience type; use most specific)

### JSON-LD mock (Restaurant experience)

```json
{
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "@id": "maison:experience:sag-harbor:sen-restaurant",
  "maison:version": 1,

  "name": "Sen Restaurant",
  "description": "Elevated Japanese cuisine in a restored whaling captain's house. Omakase counter and à la carte.",

  "address": {
    "@type": "PostalAddress",
    "streetAddress": "23 Main Street",
    "addressLocality": "Sag Harbor",
    "addressRegion": "NY",
    "postalCode": "11963"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 40.9981, "longitude": -72.2932 },

  "maison:experienceType": "restaurant",
  "maison:cuisine": ["japanese", "sushi", "omakase"],
  "priceRange": "$$$",

  "openingHours": ["Tu-Su 17:30-22:00"],

  "maison:tags": ["upscale", "date-night", "omakase", "sushi"],
  "maison:childFriendly": false,
  "maison:reservationRequired": true,
  "maison:reservationUrl": "https://resy.com/cities/ny/sen-restaurant",

  "maison:nearbyHotelIds": [
    "maison:hotel:baron-s-cove-sag-harbor",
    "maison:hotel:american-hotel-sag-harbor"
  ],
  "maison:preferredPartnerOf": [],

  "maison:typicalAvailabilityNotes": "Weekends book 2-3 weeks in advance",
  "maison:walkingDistanceToHotels": [
    { "hotelId": "maison:hotel:baron-s-cove-sag-harbor", "walkingMinutes": 6 },
    { "hotelId": "maison:hotel:american-hotel-sag-harbor", "walkingMinutes": 3 }
  ],

  "maison:mediaIds": [
    "maison:media:sen-restaurant:img:interior",
    "maison:media:sen-restaurant:img:omakase"
  ],

  "maison:source": "google_places",
  "maison:externalRefs": {
    "googlePlaceId": "ChIJsen_abc123",
    "resyId": "sen-restaurant-sag-harbor"
  }
}
```

### Experience types (controlled vocabulary)

`restaurant, cafe, bakery, bar, pub, nightlife, coffee, winery, brewery, distillery, farm-stand, farmers-market, beach, trail, park, museum, gallery, theater, cinema, venue, shop-retail, shop-boutique, spa-standalone, yoga-studio, gym-standalone, class-experience, tour, activity, watersport, skiing, golf, equestrian, marina, transport-service`

### Relationships

- `Experience.maison:nearbyHotelIds[]` — **many-to-many** with Hotel, populated nightly via PostGIS ST_DWithin
- `Experience.maison:preferredPartnerOf[]` — explicit endorsement from a hotel (filled in V1 by operator admin)
- `Experience` is shared across hotels — one Sen Restaurant serves many hotels nearby

### V0 source mapping

- **Google Places API** — primary source. Covers restaurants, attractions, shops with structured `name`, `address`, `geo`, `openingHours`, `photos`, reviews.
- **EXA** — fill gaps and find long-tail experiences Google misses (farms, private tours, hyperlocal venues).
- **Local guides** — scrape `wheretogoforweekend.com` type sites, manually curate for top destinations.
- **Hotel recommendation pages** — many hotels list "our favorite local spots" on their website; scrape these and deduplicate.

---

## 7. Media

### Purpose
Images, videos, 360° tours — unified schema with a `maison:mediaType` discriminator. Carries metadata (dimensions, categories, tags) plus provenance and quality signals. Enables the chat carousel experience.

### schema.org base
`ImageObject` / `VideoObject` / `Place` (for tours). Base `@type` varies by media type.

### JSON-LD mock (Image)

```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": "maison:media:baron-s-cove:img:hero-001",
  "maison:version": 1,

  "maison:mediaType": "image",
  "maison:hotelId": "maison:hotel:baron-s-cove-sag-harbor",
  "maison:linkedEntityIds": [
    "maison:hotel:baron-s-cove-sag-harbor"
  ],

  "contentUrl": "https://cdn.maison.travel/hotels/baron-s-cove/img/hero-001.webp",
  "thumbnailUrl": "https://cdn.maison.travel/hotels/baron-s-cove/img/hero-001-thumb.webp",
  "width": 1920,
  "height": 1080,
  "encodingFormat": "image/webp",

  "caption": "Sunset view of the waterfront deck with string lights and harbor boats",
  "description": "The view from Baron's Cove sunset-facing deck. Boats in Sag Harbor Cove. Golden-hour lighting.",

  "maison:category": "exterior",
  "maison:subjects": ["deck", "waterfront", "sunset", "boats", "string-lights"],
  "maison:timeOfDay": "golden_hour",
  "maison:season": "summer",
  "maison:quality": 0.92,
  "maison:isHero": true,
  "maison:orientation": "landscape",

  "maison:clipEmbeddingId": "emb:cohere-v3:9f8e7d6c5b4a",
  "maison:perceptualHash": "pHash_abcdef1234567890",
  "maison:blurhash": "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",

  "maison:derivatives": [
    { "size": "thumb", "width": 200, "url": "https://cdn.maison.travel/hotels/baron-s-cove/img/hero-001-thumb.webp" },
    { "size": "small", "width": 400, "url": "https://cdn.maison.travel/hotels/baron-s-cove/img/hero-001-sm.webp" },
    { "size": "medium", "width": 800, "url": "https://cdn.maison.travel/hotels/baron-s-cove/img/hero-001-md.webp" },
    { "size": "large", "width": 1920, "url": "https://cdn.maison.travel/hotels/baron-s-cove/img/hero-001-lg.webp" }
  ],
  "maison:originalFormat": "image/jpeg",
  "maison:originalUrl": "https://baronscove.com/wp-content/gallery/exterior/sunset-deck.jpg",

  "maison:provenance": {
    "source": "property_website",
    "sourceUrl": "https://baronscove.com/photo-gallery",
    "scrapeDate": "2026-04-17T10:00:00Z",
    "license": "property_owned",
    "confidence": 0.95
  }
}
```

### JSON-LD mock (Video)

```json
{
  "@type": "VideoObject",
  "@id": "maison:media:baron-s-cove:video:property-tour",
  "maison:mediaType": "video",
  "maison:hotelId": "maison:hotel:baron-s-cove-sag-harbor",

  "contentUrl": "https://www.youtube.com/watch?v=abc123",
  "embedUrl": "https://www.youtube.com/embed/abc123",
  "thumbnailUrl": "https://img.youtube.com/vi/abc123/maxresdefault.jpg",
  "duration": "PT2M34S",
  "uploadDate": "2025-06-15",

  "name": "Baron's Cove — Property Tour",
  "description": "A 2-minute walkthrough of rooms, amenities, and the waterfront deck",

  "maison:category": "property-tour",
  "maison:provider": "youtube",
  "maison:providerVideoId": "abc123",
  "maison:quality": 0.85,

  "maison:provenance": {
    "source": "property_website",
    "license": "property_owned"
  }
}
```

### JSON-LD mock (360° Tour)

```json
{
  "@type": "Place",
  "@id": "maison:media:baron-s-cove:tour:matterport-lobby",
  "maison:mediaType": "tour_360",
  "maison:hotelId": "maison:hotel:baron-s-cove-sag-harbor",

  "name": "Baron's Cove — Interactive 360° Tour",

  "maison:tourProvider": "matterport",
  "maison:tourUrl": "https://my.matterport.com/show/?m=abc123xyz",
  "maison:embedUrl": "https://my.matterport.com/show/?m=abc123xyz&play=1",
  "maison:thumbnailUrl": "https://cdn.matterport.com/models/abc123xyz/thumb.jpg",

  "maison:coverageAreas": ["lobby", "restaurant", "deck", "harbor-view-king", "pool"],

  "maison:provenance": {
    "source": "property_website",
    "license": "property_owned"
  }
}
```

### V0 source mapping

- **Image pipeline**
  - Scrape hotel websites (careful with licensing — document license as `property_owned` since display is intended use)
  - Google Places Photos API — licensed, high quality
  - Perceptual hash dedup (pHash)
  - Cohere Embed v3 multimodal → CLIP-style embedding → pgvector
  - Claude 3.5 Sonnet VLM for captions + categories + tags
  - Quality scoring: resolution + blur (Laplacian variance) + composition heuristics
- **Videos**: scrape YouTube/Vimeo URLs from hotel websites; store metadata, don't host
- **360° tours**: scrape Matterport URLs from hotel websites; embed, don't host

Full media pipeline in [media-layer.md](./media-layer.md).

---

## 8. Rates

### Purpose
Live, dynamic room availability and pricing. Cached from PMS direct (Maison client hotels) or aggregator (Nuitee/Derbysoft — for non-clients). **Not stored as JSON** — only in Postgres + Redis.

### schema.org base
`Offer` + `PriceSpecification` (schema.org/Offer is very flexible)

### Why Rates is different from every other schema

- **Dynamic**: changes hourly. JSON-as-source-of-truth doesn't apply.
- **Cached**: TTL-based, per PMS. Redis primary, Postgres for audit log.
- **Dual-source**: PMS direct preferred; aggregator fallback for non-client hotels.
- **Query-only at first**: we read, we don't write. Writing happens on booking confirmation (Layer 3).

### Postgres table sketch

```sql
CREATE TABLE rate_cache (
  id UUID PRIMARY KEY,
  hotel_id TEXT NOT NULL,
  room_id TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests_adult INT NOT NULL,
  guests_child INT NOT NULL DEFAULT 0,

  rate_plan_code TEXT,
  rate_plan_name TEXT,
  total_price NUMERIC NOT NULL,
  nightly_average NUMERIC NOT NULL,
  currency TEXT NOT NULL,
  fees JSONB,
  taxes JSONB,

  cancellation_terms JSONB,
  meal_plan TEXT,
  is_refundable BOOLEAN,
  rate_source TEXT NOT NULL,  -- 'pms:cloudbeds' | 'pms:mews' | 'aggregator:nuitee' | 'aggregator:derbysoft'
  rate_source_request_id TEXT,
  cache_expires_at TIMESTAMP NOT NULL,

  fetched_at TIMESTAMP NOT NULL,
  UNIQUE (hotel_id, room_id, check_in, check_out, guests_adult, guests_child, rate_plan_code)
);

CREATE INDEX idx_rate_cache_lookup
  ON rate_cache (hotel_id, check_in, check_out)
  INCLUDE (room_id, total_price, is_refundable)
  WHERE cache_expires_at > NOW();
```

### Lookup flow

```
getHotelRates(hotelId, checkIn, checkOut, guests) →
    1. Redis lookup: rate:{hotel}:{ci}:{co}:{guests}
    2. If hit and not expired → return cached
    3. If miss:
         a. Look up hotel.maison:pmsConfig
         b. If Maison client (has PMS) → call PMS adapter
         c. Else → call aggregator adapter (Nuitee/Derbysoft)
         d. Normalize response to Rates schema
         e. Write to Postgres (audit + expiry)
         f. Write to Redis with TTL (15 min)
         g. Return
```

### Rate schema (JSON structure — the response format)

```json
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "@id": "rate_query_abc123",

  "maison:hotelId": "maison:hotel:baron-s-cove-sag-harbor",
  "maison:rateSource": "pms:cloudbeds",
  "maison:fetchedAt": "2026-04-17T14:30:00Z",
  "maison:validUntil": "2026-04-17T14:45:00Z",

  "maison:queryParams": {
    "checkIn": "2026-05-24", "checkOut": "2026-05-27",
    "guests": { "adults": 2, "children": 0 }
  },

  "maison:rooms": [
    {
      "roomId": "maison:room:baron-s-cove:harbor-view-king",
      "ratePlans": [
        {
          "code": "BAR",
          "name": "Best Available Rate",
          "totalPrice": 1875,
          "nightlyAverage": 625,
          "currency": "USD",
          "fees": { "resort": 105, "parking": 120 },
          "taxes": { "state": 85, "city": 65, "touristTax": 20 },
          "cancellationTerms": { "type": "tiered", "tiersPolicyId": "maison:policy:baron-s-cove:cancellation" },
          "mealPlan": "room-only",
          "isRefundable": true,
          "remainingInventory": 2
        },
        {
          "code": "BB",
          "name": "Bed & Breakfast",
          "totalPrice": 2085,
          "nightlyAverage": 695,
          "currency": "USD",
          "mealPlan": "breakfast-included",
          "isRefundable": true
        }
      ]
    }
  ]
}
```

### V0 scope

- **V0 POC: hardcoded mock rates** for demo. The Rates schema is fully defined but we don't wire live PMS adapters until Week 4 per the timeline.
- **V0 Stripe**: mock booking completes against synthetic rate data — proves the flow
- **V1**: Nuitee/Derbysoft aggregator integration + direct PMS for Maison clients

---

## 9. FAQ

### Purpose
Hotel-authored question-and-answer pairs. Leverage existing Maison QA infrastructure — the scraper already generates hundreds of QA pairs per hotel. We reuse those as the V0 FAQ, plus scrape any explicit FAQ page for the most direct matches.

### schema.org base
`FAQPage` + `Question` + `Answer`

### JSON-LD mock

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "maison:faq:baron-s-cove",
  "maison:version": 1,

  "maison:hotelId": "maison:hotel:baron-s-cove-sag-harbor",

  "mainEntity": [
    {
      "@type": "Question",
      "@id": "maison:faq:baron-s-cove:q:heated-pool",
      "name": "Is the pool heated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our outdoor pool is heated and open seasonally from Memorial Day through September 30. Water is maintained at 82°F (28°C)."
      },
      "maison:category": "amenities",
      "maison:tags": ["pool", "heated", "seasonal"],
      "maison:sourceUrl": "https://baronscove.com/amenities/pool",
      "maison:confidence": 0.95,
      "maison:origin": "scraper_qa_pipeline"
    },
    {
      "@type": "Question",
      "name": "Can we bring our dog?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, dogs up to 25kg are welcome with advance notification. There's a $50 per stay pet fee plus $25 per night. Dog bed, bowls, and a welcome treat are provided. Dogs are allowed in rooms, lobby, and outdoor patio — not in the restaurant or pool area."
      },
      "maison:category": "policies",
      "maison:tags": ["pets", "dogs", "fees"],
      "maison:sourceAmenityId": "maison:amenity:baron-s-cove:pet-friendly",
      "maison:confidence": 0.92
    }
  ],

  "maison:lastVerifiedAt": "2026-04-17T10:00:00Z",
  "maison:itemCount": 87
}
```

### V0 source mapping

- **Primary**: existing Maison `qadump` MongoDB collection — we have hundreds of QA pairs per hotel already
- **Secondary**: scrape hotel FAQ pages if they exist (structured sections)
- **Deduplication**: cluster questions by embedding similarity; retain highest-confidence per cluster
- **Enrichment V1**: operator admin API to add/edit FAQ items via console

### Relationship to scraper QA

The existing scraper pipeline outputs `qadump` entries. Our FAQ schema **wraps** those entries with additional metadata:
- Category classification (amenities / policies / local / booking / general)
- Source amenity/policy cross-links (if the QA is about the pool, link to `maison:amenity:...:pool-outdoor`)
- Confidence normalization
- Deduplication markers

No re-ingestion needed. The FAQ schema is a **view** over existing QA data, enhanced with structure.

---

## 10. Event

### Purpose
Concerts, festivals, conferences, seasonal happenings — things that influence travel demand. Critical for composite queries like *"pet-friendly stay near Taylor Swift concert this Friday"*.

Separate from Hotel KG because events are high-volume, time-bounded, and externally-owned. They live in their own index, joined to hotels at query time by geography.

### schema.org base
`Event` + `Place`

### JSON-LD mock

```json
{
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  "@id": "maison:event:tm:taylor-swift-metlife-2026-04-24",
  "maison:version": 1,

  "name": "Taylor Swift: The Eras Tour",
  "description": "Taylor Swift's landmark Eras Tour at MetLife Stadium",

  "startDate": "2026-04-24T19:00:00-04:00",
  "endDate": "2026-04-24T23:30:00-04:00",
  "doorTime": "2026-04-24T17:00:00-04:00",

  "location": {
    "@type": "Place",
    "name": "MetLife Stadium",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1 MetLife Stadium Dr",
      "addressLocality": "East Rutherford",
      "addressRegion": "NJ",
      "postalCode": "07073"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 40.8135, "longitude": -74.0745 }
  },

  "performer": {
    "@type": "MusicGroup",
    "name": "Taylor Swift"
  },

  "maison:eventType": "concert",
  "maison:category": "music",
  "maison:tags": ["pop", "taylor-swift", "eras-tour", "stadium-concert"],
  "maison:expectedAttendance": 82000,
  "maison:demandSignal": "high",

  "maison:ticketInfo": {
    "url": "https://www.ticketmaster.com/taylor-swift-eras-tour/...",
    "priceRange": { "low": 150, "high": 800, "currency": "USD" },
    "soldOut": false
  },

  "maison:nearbyHotelSearchRadius": { "miles": 20, "km": 32 },
  "maison:maisonExternalRef": {
    "ticketmasterId": "tm_abc123",
    "source": "ticketmaster_discovery_api"
  },

  "maison:lastVerifiedAt": "2026-04-17T10:00:00Z"
}
```

### Event types (controlled vocabulary)

`concert, festival, sporting-event, theater, conference, wedding-event, seasonal-holiday, food-wine-festival, art-exhibit, film-festival, comedy, nightlife, market-fair`

### Composite query flow

User query: *"Best pet-friendly stay near Taylor Swift concert Friday"*

```
1. Parse query → event = "Taylor Swift", date = "Friday" (2026-04-24), amenity = "pet-friendly"
2. Events table:
     SELECT * FROM events
     WHERE name ILIKE 'Taylor Swift%'
       AND start_date::date = '2026-04-24'
   → returns Taylor Swift @ MetLife, lat/lng = (40.81, -74.07)

3. Hotels query:
     SELECT h.*, ST_Distance(h.geo, $event_geo) AS distance_m
     FROM hotels h
     JOIN amenities a ON a.hotel_id = h.@id
     WHERE a.maison_amenity_sub_type = 'Pet'
       AND a.ext_pet_spec->>'allowed' = 'true'
       AND ST_DWithin(h.geo, $event_geo, 32000)  -- 20 mi default
     ORDER BY distance_m ASC
     LIMIT 20;

4. For each candidate:
     - Call Rates schema: is this hotel available on 2026-04-24?
     - Filter out unavailable

5. Rank: distance (60%) + rating (25%) + vibe match (15%)

6. Generate "Why this" for each:
     "The Roundtree Amagansett is 8.2 miles from MetLife, accepts dogs up to 30kg with a $75/stay fee, has a pool, and has 1 king-bed room available Friday night for $485."

7. Return top 5 with media carousels.
```

### V0 source mapping

- **Ticketmaster Discovery API** — free tier, 5K calls/day, covers concerts + sports nationally
- **Ingestion cadence**: nightly refresh for next 60 days
- **Geographic scope**: East End region + NYC metro in V0, nationwide in V1
- **Deduplication**: by (name, date, venue)

### V1 expansion

- SerpAPI Google Events (paid) for festivals + small venues
- Local event calendars (e.g. Hamptons.com, Sag Harbor Patch) scraped via EXA
- Hotel-submitted events (weddings, private performances) via operator admin

---

## Schema Relationships Diagram

```
                      ┌──────────────────────┐
                      │                      │
                      │       HOTEL          │◀───────────┐
                      │   (anchor entity)    │            │
                      │                      │            │
                      └──────┬───────────────┘            │
                             │ 1-to-many                  │
            ┌────────────────┼────────────────┐           │
            │                │                │           │
            ▼                ▼                ▼           │
      ┌─────────┐      ┌──────────┐     ┌──────────┐      │
      │  ROOM   │      │ AMENITY  │     │  POLICY  │      │
      └────┬────┘      └────┬─────┘     └──────────┘      │
           │                │                              │
           │                └── sub-types: Pool, Gym,       │
           │                    Spa, Restaurant, Bar,       │
           │                    Pet, EV, Conference,        │
           │                    Parking, Accessibility      │
           │                                                │
           │                                                │
           │ links ────┐                                    │
           │           ▼                                    │
           │    ┌─────────────┐                             │
           └───▶│    MEDIA    │                             │
                │   (disc:    │                             │
                │   image/    │                             │
                │   video/    │                             │
                │   tour_360) │                             │
                └─────────────┘                             │
                                                            │
                      ┌──────────────────────┐              │
                      │       OFFER          │──────────────┤
                      │  (hotel-authored)    │              │
                      └──────────────────────┘              │
                                                            │
                      ┌──────────────────────┐              │
                      │       FAQ            │──────────────┤
                      │  (QA wrapper)        │              │
                      └──────────────────────┘              │
                                                            │
                                              ┌─────────────┤
                      ┌───────────────────────┴──┐          │
                      │     EXPERIENCE           │ many-    │
                      │  (nearby places to go)   │◀ to-many │
                      └───────────────────────┬──┘ (geo)    │
                                              │            │
                                              │            │
                      ┌───────────────────────┴──┐         │
                      │     EVENT                │ geo     │
                      │  (concerts, festivals)   │ joined  │
                      │  (standalone index)      │ at      │
                      └──────────────────────────┘ query-  │
                                                  time     │
                                                            │
                      ┌──────────────────────────┐          │
                      │     RATES                │──────────┘
                      │  (dynamic, Postgres+     │
                      │   Redis only — no JSON)  │
                      └──────────────────────────┘
```

---

## Schema Validation & Versioning

- JSON Schema definitions committed to `packages/knowledge-graph/schemas/*.json`
- Normalizer validates every emitted JSON against schema before writing
- Validation failures logged with source reference; fallback to `maison:contentStatus: "validation_failed"`
- `maison:version` bumped when schema changes; migrations handled via `kb-version-history` DynamoDB pattern (same as existing chatbot QA versioning)

---

## Field Reuse Across Schemas

The following identifiers and field conventions are reused across every schema:

| Field | Meaning |
|-------|---------|
| `@id` format | `maison:{schema}:{slug}[:{sub-id}]` e.g. `maison:hotel:baron-s-cove-sag-harbor`, `maison:amenity:baron-s-cove:pool-outdoor` |
| `maison:hotelId` | FK to parent Hotel (except Hotel itself and Experience/Event which can be standalone) |
| `maison:version` | Starts at 1, bumps on schema migration |
| `maison:provenance` | Per-field source/confidence/verifiedAt |
| `maison:lastVerifiedAt` | Freshness signal for LLM |
| `ext` | Hotel/partner-specific extensions |

---

## Next Steps

1. Commit these schemas to `packages/knowledge-graph/schemas/*.json` as JSON Schema definitions
2. Generate TypeScript types from JSON Schemas (using `quicktype` or similar)
3. Normalizer service validates against these on every run
4. Operator admin (V1) renders forms from these schemas (A2UI-style rendering)

Detailed data source mapping in [data-sources.md](./data-sources.md). Storage architecture in [storage.md](./storage.md).
