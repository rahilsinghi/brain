---
status: processed
source_type: graphify-community
repo: portfolio
community_id: 16
ingested_at: 2026-04-13T18:25:04.301Z
parsed_at: 2026-04-13T18:25:04.301Z
compiled_to: "[[Text Embedding and Semantic Search Utilities]]"
processed_at: 2026-04-13T18:52:32.364Z
retry_count: 0
last_error: null
compile_progress: null
---



# portfolio — Community 16

## Files in this cluster

- `/Users/rahilsinghi/Desktop/portfolio/src/lib/embeddings.ts` — 8 connections
- `/Users/rahilsinghi/Desktop/portfolio/src/app/api/og/route.tsx` — 4 connections
- `/Users/rahilsinghi/Desktop/portfolio/src/lib/embeddings.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/portfolio/src/lib/embeddings.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/portfolio/src/lib/embeddings.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/portfolio/src/lib/embeddings.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/portfolio/src/app/api/chat/route.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/portfolio/src/app/api/chat/route.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/portfolio/src/content/terminal.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/portfolio/src/lib/embeddings.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/portfolio/src/lib/embeddings.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/portfolio/src/app/api/og/route.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/portfolio/src/components/TerminalChat.tsx` — 1 connection

## Internal relationships

- `route` → `embeddings` (imports_from)
- `route` → `route_checkratelimit` (contains)
- `route` → `route_post` (contains)
- `route` → `route_get` (contains)
- `route_checkratelimit` → `route_post` (calls)
- `terminal` → `terminalchat` (imports_from)
- `terminal` → `embeddings` (imports_from)
- `embeddings` → `embeddings_embedtext` (contains)
- `embeddings` → `embeddings_embedtexts` (contains)
- `embeddings` → `embeddings_cosinesimilarity` (contains)
- `embeddings` → `embeddings_getcontentembeddings` (contains)
- `embeddings` → `embeddings_semanticsearch` (contains)
- `embeddings` → `embeddings_generateanswer` (contains)
- `embeddings_embedtext` → `embeddings_semanticsearch` (calls)
- `embeddings_embedtexts` → `embeddings_getcontentembeddings` (calls)
- `embeddings_getcontentembeddings` → `embeddings_semanticsearch` (calls)

## External dependencies

_none_