# Media & Visual Layer

> **Parent:** [V0 Content Layer — Master Architecture](./README.md)
> **Purpose:** Define the full image/video/360° tour pipeline — ingestion, normalization, AI understanding, storage, retrieval, and chat UX for rich visual results. The "solved problem" playbook used by Airbnb, Booking, Hopper, Mindtrip.

---

## Goals

1. Every hotel has at least 1 hero image and 5 gallery photos at POC
2. Images are searchable semantically ("sunset pool photo") via CLIP
3. Chat responses render rich carousels — swipeable, progressive, mobile-first
4. Video and 360° tour support is baked into the same retrieval path
5. Pipeline scales from 100 hotels to global without rewrite

---

## The Full Pipeline

```
┌────────────────────────────────────────────────────────────────┐
│  INGESTION                                                      │
│  ├─ Hotel website scrape (crawl4ai, existing pipeline)         │
│  ├─ Google Places Photos API (licensed, high quality)          │
│  ├─ Instagram Graph API (V1 — with hotel handle)               │
│  ├─ Supplier upload portal (V1)                                │
│  └─ Matterport/360° tour URLs (scraped from websites)          │
└─────────────────────────┬──────────────────────────────────────┘
                          ▼
┌────────────────────────────────────────────────────────────────┐
│  NORMALIZATION (media worker — SQS-triggered, one per image)   │
│  1. Perceptual hash (pHash) → dedup across sources             │
│  2. Write original to S3 (cold storage, never hit directly)    │
│  3. Generate 4 derivatives:                                    │
│       thumb(200w) · small(400w) · medium(800w) · large(1920w)  │
│  4. Convert to WebP + AVIF; JPEG fallback                      │
│  5. Write derivatives to S3 (hot) + CloudFront CDN             │
│  6. Generate Blurhash placeholder (~30 chars, instant render)  │
│  7. CLIP embedding (Cohere Embed v3 multimodal, 1024-dim)      │
│  8. VLM caption (Claude 3.5 Sonnet with image input)           │
│  9. Category detection (exterior/room/amenity/food/view/lobby) │
│  10. Subject tagging (pool, bed, lobby, beach, sunset, ...)    │
│  11. Quality score (resolution + Laplacian blur detection)     │
│  12. Hero candidate flag (best in its category)                │
└─────────────────────────┬──────────────────────────────────────┘
                          ▼
┌────────────────────────────────────────────────────────────────┐
│  STORAGE                                                        │
│  ├─ S3 originals (cold, versioned bucket)                      │
│  ├─ S3 derivatives + CloudFront (hot, cached globally)         │
│  ├─ Postgres media_items table + FK to hotel/room/amenity      │
│  ├─ pgvector CLIP embeddings (1024-dim, for visual semantic)   │
│  └─ Cloudflare Images (V1) for on-the-fly dynamic resizing     │
└─────────────────────────┬──────────────────────────────────────┘
                          ▼
┌────────────────────────────────────────────────────────────────┐
│  RETRIEVAL                                                      │
│  ├─ By hotel: getImages(hotelId, category?, limit?)            │
│  ├─ By semantic: searchImages("sunset pool") → CLIP search     │
│  ├─ By similarity: findSimilar(mediaId)                        │
│  ├─ Hero: getHero(hotelId, size) → highest-quality categorized │
│  └─ Structured carousel payload: array of {url, blurhash,      │
│     caption, srcset, width, height}                            │
└────────────────────────────────────────────────────────────────┘
```

---

## Ingestion Sources

### Hotel website scraping
- **Tool**: crawl4ai (existing Python scraper)
- **Change needed**: scraper's `remove_url_lines` currently strips images. We need to preserve `<img>` tags with `src` and `alt` attributes. **This is an action item for Sandeep** — ~5-line Python change.
- **Output to media worker**: list of `{ src, alt, sourceUrl, dimensions? }` per URL
- **License assumption**: hotel websites are scraping-permissive for their own content (fair use + customary for travel indexing). Document as `license: "property_owned"`.

### Google Places Photos API
- **Best source for quality + licensing clarity** — Places photos are licensed for display with attribution
- Each Places query returns up to 10 photos per location
- API call: `photos.get?maxWidthPx=1600&photoName=...`
- Store with `license: "google_places"` + attribution metadata

### Matterport / 360° tour URLs
- **V0**: scrape from hotel website embeds (look for `my.matterport.com` links)
- Store the tour URL, don't host or process
- Thumbnail = Matterport-provided preview image

### Supplier uploads (V1)
- Operator console drag-drop to media pipeline
- Highest confidence (`source: "operator_upload"`)
- License: `"property_owned"`
- Professional photo quality expected

---

## Normalization — Step by Step

### Step 1: Perceptual hash → dedup
- Compute pHash (DCT-based) for every ingested image
- If hash matches existing media item (within Hamming distance 5), skip ingestion
- Prevents duplicate hero images across Places + website

```typescript
const pHash = await computePHash(imageBuffer);
const existing = await db.mediaItems.findByPHash(pHash, hamming: 5);
if (existing) return existing; // skip
```

### Step 2: Upload original to S3
```
s3://maison-media-originals/hotels/{slug}/img/{uuid}.jpg
```
Cold storage class. Never served directly. Used only for re-processing.

### Step 3: Generate derivatives
- `thumb`: 200w (for UI placeholders, Obsidian thumb, email previews)
- `small`: 400w (mobile 1x)
- `medium`: 800w (mobile 2x, desktop 1x)
- `large`: 1920w (desktop 2x, hero images)

Using `sharp` (Node.js) or `Pillow-SIMD` (Python) for speed.

### Step 4: Format conversion
- Convert to WebP (lossy, q=82) + AVIF (for newer browsers)
- Keep JPEG fallback for old clients
- Derivatives uploaded to:
```
s3://maison-media/hotels/{slug}/img/{uuid}-{size}.webp
s3://maison-media/hotels/{slug}/img/{uuid}-{size}.avif
s3://maison-media/hotels/{slug}/img/{uuid}-{size}.jpg
```
Served via CloudFront CDN.

### Step 5: Blurhash
- ~30-character placeholder string encoding the image's color structure
- Rendered instantly while actual image loads → no blank spaces
- Computed once, stored alongside metadata

```typescript
const blurhash = encode(imageBuffer, 4, 3); // 4x3 components
// → "LKO2?U%2Tw=w]~RBVZRi};RPxuwH"
```

### Step 6: CLIP embedding
- **Provider**: Cohere Embed v3 multimodal (V0 decision)
- **API**: `cohere.embed(input, model='embed-multilingual-v3.0', input_type='image')`
- Returns 1024-dim vector
- Text and images embed into the SAME vector space — enables "sunset pool photo" text query to match pool-at-sunset images
- Stored in pgvector column on `media_items` table

### Step 7: VLM caption (Claude 3.5 Sonnet)
- System prompt: "Generate a descriptive caption for a hotel photo. Identify the subject, setting, time of day if apparent, and any notable features. 1-2 sentences. Don't hallucinate details not visible."
- Input: image + context (we know which hotel this is from)
- Output: caption (~150 chars)
- Used in `caption`, `description`, alt-text for accessibility

### Step 8: Category detection
- Secondary LLM call (or part of the caption prompt): classify into controlled vocabulary
- Categories: `exterior, room, amenity, food, view, lobby, interior, bathroom, detail, group-activity, staff, signage`
- Tie to entity: if category=`amenity` and subject contains `pool`, link media item to `maison:amenity:{hotel}:pool-*` in `linkedEntityIds`

### Step 9: Subject tagging
- LLM extracts specific objects/features in the image: `["deck", "sunset", "string-lights", "boats", "waterfront"]`
- Used for filtering + boosting retrieval relevance

### Step 10: Time of day + season (when inferable)
- `timeOfDay`: golden_hour, morning, midday, evening, night, unknown
- `season`: summer, fall, winter, spring, unknown
- Lightweight rule + LLM — not all images are inferable (interiors often aren't)

### Step 11: Quality score
- Resolution: min(width, height) — below 600px → quality penalty
- Blur: Laplacian variance of grayscale → threshold < 100 = blurry → penalty
- Composition: simple heuristic (face ratio, edge distribution) — optional
- Output: 0.0 to 1.0

```
quality = clamp(
  0.5 * normalizedResolution +
  0.3 * normalizedSharpness +
  0.2 * compositionScore,
  0.0, 1.0
)
```

### Step 12: Hero candidate flag
- Per category, the highest-quality image is flagged `isHero: true`
- Used for chat result cards (one hero per hotel)
- Re-evaluated when new images are added (hero can change)

---

## Storage Details

### Postgres `media_items` table

```sql
CREATE TABLE media_items (
  id               UUID PRIMARY KEY,
  maison_id        TEXT NOT NULL UNIQUE,    -- e.g. "maison:media:baron-s-cove:img:001"
  hotel_id         TEXT NOT NULL,
  media_type       TEXT NOT NULL,           -- 'image' | 'video' | 'tour_360'
  category         TEXT,
  subjects         TEXT[],
  time_of_day      TEXT,
  season           TEXT,
  is_hero          BOOLEAN DEFAULT FALSE,
  quality          REAL,

  perceptual_hash  TEXT,
  blurhash         TEXT,

  s3_original_key  TEXT,
  cdn_url_template TEXT,                    -- e.g. "https://cdn.maison.travel/hotels/{slug}/img/{uuid}-{size}.webp"
  available_sizes  TEXT[] DEFAULT ARRAY['thumb','small','medium','large'],
  width            INTEGER,
  height           INTEGER,
  encoding_format  TEXT,

  caption          TEXT,
  description      TEXT,

  clip_embedding   vector(1024),            -- Cohere multimodal

  linked_entity_ids TEXT[],                 -- hotel, amenity, room, experience IDs

  license          TEXT,
  source           TEXT,
  source_url       TEXT,
  ingested_at      TIMESTAMP NOT NULL,

  jsonb_blob       JSONB NOT NULL            -- full Media schema mock
);

CREATE INDEX idx_media_hotel ON media_items(hotel_id);
CREATE INDEX idx_media_category ON media_items(hotel_id, category);
CREATE INDEX idx_media_hero ON media_items(hotel_id, is_hero) WHERE is_hero = TRUE;
CREATE INDEX idx_media_phash ON media_items(perceptual_hash);
CREATE INDEX idx_media_clip ON media_items USING hnsw (clip_embedding vector_cosine_ops);
```

### S3 bucket structure

```
s3://maison-media-originals/
  hotels/
    baron-s-cove-sag-harbor/
      img/
        {uuid-1}.jpg
        {uuid-2}.png

s3://maison-media/          (served via CloudFront)
  hotels/
    baron-s-cove-sag-harbor/
      img/
        {uuid-1}-thumb.webp    {uuid-1}-small.webp
        {uuid-1}-medium.webp   {uuid-1}-large.webp
        {uuid-1}-thumb.avif    {uuid-1}-small.avif
        ...
        {uuid-1}-thumb.jpg     ...
```

CloudFront URL template:
```
https://cdn.maison.travel/hotels/{slug}/img/{uuid}-{size}.{format}
```

### CDN config
- CloudFront distribution in front of `maison-media` bucket
- Long max-age (1 year) — images are immutable; new versions get new UUIDs
- Accept-Encoding: gzip, br
- Serve AVIF to browsers that support it via `Accept` header + CloudFront Functions

---

## Retrieval Patterns

### 1. Get hotel hero

```typescript
// MCP tool: getMedia
await getMedia({
  hotelId: "maison:hotel:baron-s-cove-sag-harbor",
  filter: { isHero: true },
  limit: 1,
  size: "large"
});
// → { url, blurhash, caption, width, height }
```

SQL:
```sql
SELECT maison_id, cdn_url_template, blurhash, caption, width, height
FROM media_items
WHERE hotel_id = $1 AND is_hero = TRUE AND media_type = 'image'
ORDER BY quality DESC
LIMIT 1;
```

### 2. Get hotel gallery

```typescript
await getMedia({
  hotelId: "maison:hotel:baron-s-cove-sag-harbor",
  filter: { category: "interior" },
  limit: 10,
  size: "medium"
});
```

### 3. Semantic search ("sunset pool photo")

```typescript
await searchImages("sunset pool photo", { hotelId?, limit: 20 });
```

SQL:
```sql
-- Embed the query via Cohere first
SELECT maison_id, hotel_id, caption, cdn_url_template, blurhash,
       clip_embedding <=> $query_embedding AS distance
FROM media_items
WHERE ($hotel_id IS NULL OR hotel_id = $hotel_id)
  AND media_type = 'image'
  AND quality > 0.5
ORDER BY distance ASC
LIMIT 20;
```

### 4. Visual similarity ("more like this")

```typescript
await findSimilar({ mediaId: "maison:media:baron-s-cove:img:001", limit: 10 });
```

SQL:
```sql
WITH ref AS (SELECT clip_embedding FROM media_items WHERE maison_id = $1)
SELECT maison_id, caption, cdn_url_template, clip_embedding <=> ref.clip_embedding AS distance
FROM media_items, ref
WHERE maison_id != $1
ORDER BY distance ASC
LIMIT 10;
```

### 5. Structured carousel payload

For chat UI rendering:

```typescript
await getCarouselPayload({ hotelId: "...", size: "medium" });
```

Returns:
```json
{
  "hotelId": "...",
  "hero": {
    "url": "https://cdn.maison.travel/hotels/baron-s-cove/img/uuid1-medium.webp",
    "urlAvif": "https://cdn.maison.travel/.../uuid1-medium.avif",
    "urlJpegFallback": "https://cdn.maison.travel/.../uuid1-medium.jpg",
    "blurhash": "LKO2?U...",
    "width": 800,
    "height": 450,
    "caption": "Sunset view of the waterfront deck",
    "srcset": {
      "thumb": "https://cdn.maison.travel/.../uuid1-thumb.webp 200w",
      "small": "https://cdn.maison.travel/.../uuid1-small.webp 400w",
      "medium": "https://cdn.maison.travel/.../uuid1-medium.webp 800w",
      "large": "https://cdn.maison.travel/.../uuid1-large.webp 1920w"
    }
  },
  "gallery": [
    { "url": "...", "blurhash": "...", "caption": "...", "category": "room", ...},
    { "url": "...", "blurhash": "...", "caption": "...", "category": "amenity", ...},
    ...
  ],
  "video": null,
  "tour360": {
    "provider": "matterport",
    "url": "https://my.matterport.com/show/?m=abc123",
    "thumbnailUrl": "...",
    "coverageAreas": ["lobby", "pool", "deck"]
  }
}
```

UI component consumes this directly.

---

## Chat UX — The Carousel Experience

### User journey

```
User: "show me something romantic in Montauk"
  ↓
LLM streams text: "Gurney's Montauk is a stunning oceanfront resort..."
  ↓
[Alongside] MCP tool returns structured JSON:
  {
    "results": [
      {
        "hotel_id": "gurneys-montauk",
        "hero": {...},
        "gallery": [...5 images...],
        "video": null,
        "tour360": {...}
      },
      ...
    ]
  }
  ↓
UI renders each result as a card:
  - Blurhash placeholder visible instantly (0ms)
  - Hero image lazy-loads (→ fade in when ready, ~100-300ms)
  - Swipeable carousel on mobile
  - Video thumbnail if present → tap to play inline
  - "Take 360° tour" button if tour available
  - Price range + availability badge
  - Distance pin (if query was geo-contextual)
```

### Responsive rendering

```html
<!-- HTML output (Next.js components) -->
<figure>
  <div
    class="blurhash-placeholder"
    style="background-image: url('/blurhash-to-data-uri.js?hash=LKO2?U...')"
  ></div>
  <picture>
    <source type="image/avif" srcset="
      https://cdn.../uuid-small.avif 400w,
      https://cdn.../uuid-medium.avif 800w,
      https://cdn.../uuid-large.avif 1920w
    ">
    <source type="image/webp" srcset="
      https://cdn.../uuid-small.webp 400w,
      https://cdn.../uuid-medium.webp 800w,
      https://cdn.../uuid-large.webp 1920w
    ">
    <img src="https://cdn.../uuid-medium.jpg" alt="Sunset view of Gurney's deck" loading="lazy">
  </picture>
  <figcaption>Sunset view of Gurney's oceanfront deck</figcaption>
</figure>
```

### Mobile gestures
- Horizontal swipe → next image in carousel
- Tap → fullscreen modal, pinch-zoom enabled
- Tap video thumb → inline player
- Tap 360° tour → opens embed in modal

### Streaming behavior
- Text streams first (word-by-word via SSE)
- Media JSON comes as a separate SSE message
- UI reflows gracefully — text doesn't jump when media arrives

---

## V0 Scope Boundaries

### In scope (V0)
- Images (all flow)
- Matterport 360° URLs (scraped, not hosted)
- YouTube/Vimeo video URLs (scraped, embedded)
- Single Media schema with discriminator
- Cohere Embed v3 for CLIP
- Claude 3.5 Sonnet for VLM captions
- S3 + CloudFront

### Deferred to V1
- Operator-uploaded images via admin console
- Matterport account integration (if hotel has tour content in their account, sync directly)
- Video hosting via Mux (vs. YouTube linking)
- Cloudflare Images for on-the-fly resizing (vs. pre-generating sizes)
- AI-generated captions in multiple languages
- Video transcription (Whisper) + indexed-for-search
- Hero image A/B testing per hotel

### Deferred to V2+
- Auto-generated highlight reels (Runway API, Sora)
- Synthetic B-roll for hotels with thin media
- Real-time image quality monitoring (detecting stale/removed source images)
- Image moderation pipeline for operator uploads

---

## Failure Modes & Fallbacks

| Failure | Fallback |
|---------|----------|
| Scraper returns no images for a hotel | Fall back to Google Places Photos; if none, generate a map-based hero card |
| Cohere API down during embedding step | Retry with exponential backoff; if still failing, skip CLIP and queue for reprocessing |
| Claude 3.5 Sonnet caption fails | Use Places-provided description or "View of [hotel name]" default |
| CloudFront cache miss + S3 error | Serve blurhash-only card; log alert |
| Matterport tour URL becomes stale | Nightly check; remove from `tour_360` if 404; re-scan on next weekly scrape |
| Image exceeds 10MB | Skip derivative generation; use as-is; flag for operator review |

---

## Metrics to Monitor

- **Coverage**: % of hotels with ≥1 hero + ≥5 gallery
- **Hero quality**: median `quality` score across all hero images
- **CLIP search latency**: p95 of searchImages query
- **CDN cache hit rate**: target >95%
- **Normalization time**: median ms per image (scrape → CDN-ready)
- **Cost per hotel**: tracked for scale planning
- **Caption quality**: sampled, human-verified accuracy

---

## Integration Points

### With schemas
- Media objects linked to Hotel, Room, Amenity, Experience via `linkedEntityIds[]`
- Hero media ID stored on Hotel as `maison:heroMediaId`

### With scraper
- After scraper's Stage 3.5 emits SQS, our normalizer also fans out image URLs to the media worker
- Media worker runs in parallel with JSON normalization

### With operator console (V1)
- Console displays all media for a hotel in a grid
- Drag-drop upload routes to media worker
- Hero selection toggle
- Per-image category + tag editing

---

## Implementation Notes

### Libraries
- `sharp` for image processing (Node.js, very fast)
- `blurhash` npm package
- Cohere SDK for embeddings
- `@anthropic-ai/sdk` for Claude calls
- AWS SDK v3 for S3
- `pg` + `pgvector` for Postgres

### Worker type
- Lambda function triggered by SQS message
- Concurrency: 50 parallel workers per region
- Timeout: 90 seconds per image (handles retries internally)
- Batch mode: process up to 5 images per invocation to amortize cold starts

### Cost estimate (V0, 100 hotels)
- Assume 50 images per hotel = 5,000 images
- Cohere embeddings: $0.003/1K tokens × ~5K images × ~500 tokens each = ~$7.50
- Claude captioning: $3/M input tokens × 5K images × ~1K tokens = $15
- S3 storage: ~1KB/image × 5K × $0.023/GB/month = negligible
- CloudFront egress: ~100GB/month initially = ~$9
- **V0 media pipeline cost: ~$35 initial + ~$10/month recurring. Negligible.**

---

## Related Documents

- [Schema Specifications — Media schema](./schemas.md#7-media)
- [Storage Architecture](./storage.md) — where Postgres + S3 fit
- [Integration](./integration.md) — how media pipeline hooks into scraper events
- [Dockerized Client Model](./dockerized-client.md) — media manifest in per-hotel folder
