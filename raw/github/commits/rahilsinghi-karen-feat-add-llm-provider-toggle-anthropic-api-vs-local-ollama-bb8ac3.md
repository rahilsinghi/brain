---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:37f37b3
ingested_at: 2026-04-09T01:03:46.907Z
parsed_at: 2026-04-09T01:03:46.907Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# feat: add LLM provider toggle (Anthropic API vs local Ollama)

- **Repo:** rahilsinghi/karen
- **SHA:** 37f37b3
- **Date:** 2026-04-04T15:28:19Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +1439
- **Deletions:** -0

- Add backend/services/llm_provider.py with AnthropicProvider + OllamaProvider
- Add ollama service to docker-compose.yml with named volume
- Add AI_PROVIDER, LOCAL_MODEL env vars to .env.example
- Add docs/FRONTEND_SPEC_FOR_SARIYA.md (1325-line frontend spec)

Set AI_PROVIDER=local in .env to use Ollama instead of Claude API.
Default remains anthropic (no behavior change without explicit opt-in).

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
