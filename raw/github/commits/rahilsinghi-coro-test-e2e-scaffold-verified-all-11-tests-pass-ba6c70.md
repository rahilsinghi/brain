---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Coro:ddce0e5
ingested_at: 2026-04-10T12:03:43.583Z
parsed_at: 2026-04-10T12:03:43.583Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv4MB5deqRw4iJKtW9b6"}
compile_progress: null
---



# test: e2e scaffold verified — all 11 tests pass

- **Repo:** rahilsinghi/Coro
- **SHA:** ddce0e5
- **Date:** 2026-02-28T16:22:26Z
- **Author:** Rahil Singhi
- **Files changed:** 14
- **Additions:** +3921
- **Deletions:** -28

Fixes applied during e2e run:
- backend/requirements.txt: upgrade google-genai 1.14.0→1.65.0 (adds WeightedPrompt, LiveMusicGenerationConfig, client.aio.live.music)
- backend/main.py: move load_dotenv() before router imports so GEMINI_API_KEY is set before singleton init
- backend/services/gemini_service.py: disable thinking tokens (ThinkingConfig budget=0), increase max_output_tokens to 2000, robust markdown-fence stripping with regex, weight normalisation, density/brightness float clamping
- frontend/index.html + pages: rename CrowdSynth → Coro throughout UI
- backend/tests/: add test_lyria.py, test_gemini.py, test_ws.py, test_input_update.py, test_full_flow.py
- frontend/.env: create with VITE_WS_URL=ws://localhost:8000/ws

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
