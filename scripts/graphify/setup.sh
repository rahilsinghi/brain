#!/usr/bin/env bash
# Setup persistent Python venv for Graphify CLI
# Run once after clone, or after updating requirements-graphify.txt
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BRAIN_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
VENV_DIR="$SCRIPT_DIR/.venv"

echo "[graphify] Creating venv at $VENV_DIR (Python 3.13)..."
uv venv --python 3.13 "$VENV_DIR"

echo "[graphify] Installing deps from requirements-graphify.txt..."
uv pip install --python "$VENV_DIR/bin/python" -r "$BRAIN_ROOT/requirements-graphify.txt"

# Install the local graphify fork in editable mode
GRAPHIFY_REPO="$HOME/Desktop/graphify"
if [ -d "$GRAPHIFY_REPO" ]; then
    echo "[graphify] Installing graphify fork from $GRAPHIFY_REPO..."
    uv pip install --python "$VENV_DIR/bin/python" -e "$GRAPHIFY_REPO"
else
    echo "[graphify] WARNING: Graphify repo not found at $GRAPHIFY_REPO"
    echo "[graphify] Clone it first: git clone git@github.com:rahilsinghi/graphify.git ~/Desktop/graphify"
    exit 1
fi

echo "[graphify] Setup complete. venv at: $VENV_DIR"
echo "[graphify] Test with: $VENV_DIR/bin/python -c 'from graphify import extract; print(\"OK\")'"
