#!/usr/bin/env bash
# Install local lean-checker — optional alternative to the default
# remote SciLib endpoint used in AI4Math.
#
# Clones andkhalov/lean-checker (Lean 4.24 + Mathlib 4.24) into vendor/,
# runs docker compose up -d. First Mathlib build takes
# 1.5-2.5 hours, requires ~8 GB RAM, ~10 GB free space.
#
# After successful install change LEAN_CHECKER_URL in .env from
# https://scilibai.ru/grag  →  http://localhost:8888
# AI4Math MCP will auto-detect the old lean-checker schema and
# work with it (separate tool path).
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENDOR="$REPO/vendor/lean-checker"

GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
RESET='\033[0m'

say()  { echo -e "${GREEN}[lean]${RESET} $*"; }
warn() { echo -e "${YELLOW}[lean]${RESET} $*"; }
die()  { echo -e "${RED}[lean]${RESET} $*" >&2; exit 1; }

if ! command -v docker >/dev/null 2>&1; then
    die "Docker not found. Install Docker + Docker Compose v2."
fi
if ! docker compose version >/dev/null 2>&1; then
    die "Docker Compose v2 not found (docker compose version)."
fi

mkdir -p "$REPO/vendor"
if [ ! -d "$VENDOR" ]; then
    say "Cloning andkhalov/lean-checker into $VENDOR ..."
    git clone https://github.com/andkhalov/lean-checker.git "$VENDOR"
fi

cd "$VENDOR"
say "docker compose up --build -d (first build 1.5-2.5 hours)..."
docker compose up --build -d

say "Waiting for first /health warm-up (lake env warm-up may take ~90 seconds)..."
for i in $(seq 1 60); do
    if curl -fsS --max-time 5 "http://localhost:8888/health" 2>/dev/null | grep -q '"lean_ok":true'; then
        say "/health OK — lean-checker ready."
        say "To switch AI4Math to local checker, set in .env:"
        say "    LEAN_CHECKER_URL=http://localhost:8888"
        exit 0
    fi
    sleep 5
done
warn "/health did not respond within 5 minutes. Check: docker logs lean-checker-lean-server-1"
exit 1
