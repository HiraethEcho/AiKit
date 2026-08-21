#!/usr/bin/env bash
# AI4Math setup — installs Goose + Python venv + MCP dependencies + wizard.
#
# Usage:
#   ./setup.sh                install without Lean
#   ./setup.sh --with-lean    + attempt to start lean-checker Docker container

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO"

GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
RESET='\033[0m'

say()  { echo -e "${GREEN}[AI4Math]${RESET} $*"; }
warn() { echo -e "${YELLOW}[AI4Math]${RESET} $*"; }
die()  { echo -e "${RED}[AI4Math]${RESET} $*" >&2; exit 1; }

WITH_LEAN_LOCAL=0
for arg in "$@"; do
    case "$arg" in
        --with-lean-local|--with-lean) WITH_LEAN_LOCAL=1 ;;
        -h|--help)
            cat <<EOF
AI4Math setup.

Usage:
  ./setup.sh                     install with remote Lean checker (default)
                                 — nothing to run locally
  ./setup.sh --with-lean-local   + start local Docker lean-checker
                                 (Mathlib 4.24, first build 1.5-2.5 h)

Steps:
  1. Check Python 3.10+ and system dependencies
  2. Create .venv and install Python packages from requirements.txt
  3. Install Goose CLI in .tools/ (locally, without root)
  4. Run cli/wizard.py to configure .env (if .env doesn't exist yet)
  5. (optional) docker compose up -d in vendor/lean-checker
  6. symlink in \$HOME/.local/bin/ai4math for global command

By default Lean verification goes through the public SciLib-GRC21
endpoint (https://scilibai.ru/grag) — works immediately,
Docker not needed.
EOF
            exit 0
            ;;
    esac
done

say "=== AI4Math setup ==="

# --- 0) System dependencies ---
# libgomp1 (GCC OpenMP runtime) is a hard-link requirement of the Goose binary
# on Linux — ldd shows libgomp.so.1 in the NEEDED section. Dev machines
# almost always have it via build-essential/python3-dev transitive deps, but
# minimal Docker images (python:3.12-slim etc.) strip it.

MISSING=()
for cmd in python3 curl git tar; do
    command -v "$cmd" >/dev/null 2>&1 || MISSING+=("$cmd")
done
command -v bzip2 >/dev/null 2>&1 || MISSING+=("bzip2")

# libgomp check — only Linux. macOS doesn't need it (Goose uses different
# runtime), Windows bundles it with goose.exe.
#
# The check has to survive PATH issues: regular users on Debian/Ubuntu don't
# have /usr/sbin in PATH, so `ldconfig` is "command not found", grep returns
# empty, and we'd falsely report libgomp1 as missing. We check the library
# file directly on disk first, then fall back to ldconfig with explicit paths.
have_libgomp() {
    local dir
    for dir in \
        /usr/lib/x86_64-linux-gnu \
        /usr/lib/aarch64-linux-gnu \
        /usr/lib64 \
        /usr/lib \
        /lib/x86_64-linux-gnu \
        /lib/aarch64-linux-gnu \
        /lib64 \
        /lib; do
        [ -e "$dir/libgomp.so.1" ] && return 0
    done
    # Fallback: ldconfig with explicit paths (users without /usr/sbin in PATH)
    local ldc
    for ldc in /usr/sbin/ldconfig /sbin/ldconfig ldconfig; do
        if [ -x "$ldc" ] || command -v "$ldc" >/dev/null 2>&1; then
            "$ldc" -p 2>/dev/null | grep -q "libgomp.so.1" && return 0
        fi
    done
    return 1
}

NEED_LIBGOMP=0
if [ "$(uname -s)" = "Linux" ]; then
    if ! have_libgomp; then
        NEED_LIBGOMP=1
        MISSING+=("libgomp1")
    fi
fi

# Helper: try to install Linux deps automatically without bothering the user
# when we can — running as root (typical in Docker) or with passwordless sudo.
try_install_linux_deps() {
    local pkgs=("$@")
    [ ${#pkgs[@]} -eq 0 ] && return 0
    # Map libgomp1 → correct package name per distro
    local apt_pkgs=()
    local dnf_pkgs=()
    for p in "${pkgs[@]}"; do
        apt_pkgs+=("$p")
        # dnf calls it just 'libgomp'
        if [ "$p" = "libgomp1" ]; then
            dnf_pkgs+=("libgomp")
        else
            dnf_pkgs+=("$p")
        fi
    done
    if command -v apt-get >/dev/null 2>&1; then
        local apt_cmd=(apt-get install -y --no-install-recommends "${apt_pkgs[@]}")
        if [ "$(id -u)" = "0" ]; then
            say "Устанавливаю через apt-get: ${apt_pkgs[*]}"
            apt-get update -qq >/dev/null 2>&1 || true
            "${apt_cmd[@]}" >/dev/null 2>&1 && return 0
        elif command -v sudo >/dev/null 2>&1 && sudo -n true 2>/dev/null; then
            say "Устанавливаю через sudo apt-get: ${apt_pkgs[*]}"
            say 
            sudo "${apt_cmd[@]}" >/dev/null 2>&1 && return 0
        fi
    elif command -v dnf >/dev/null 2>&1; then
        if [ "$(id -u)" = "0" ]; then
            say "Устанавливаю через dnf: ${dnf_pkgs[*]}"
            dnf install -y "${dnf_pkgs[@]}" >/dev/null 2>&1 && return 0
        elif command -v sudo >/dev/null 2>&1 && sudo -n true 2>/dev/null; then
            say "Устанавливаю через sudo dnf: ${dnf_pkgs[*]}"
            sudo dnf install -y "${dnf_pkgs[@]}" >/dev/null 2>&1 && return 0
        fi
    fi
    return 1
}

if [ ${#MISSING[@]} -gt 0 ]; then
    warn 'Missing system dependencies: '
    if [ "$(uname -s)" = "Linux" ]; then
        if try_install_linux_deps "${MISSING[@]}"; then
            say "Зависимости установлены."
            MISSING=()
        fi
    fi
fi

if [ ${#MISSING[@]} -gt 0 ]; then
    warn 'Some system dependencies are missing: '
    if command -v apt-get >/dev/null 2>&1; then
        echo "    Debian/Ubuntu: sudo apt-get install -y ${MISSING[*]}"
    elif command -v dnf >/dev/null 2>&1; then
        DNF_HINT="${MISSING[*]}"
        DNF_HINT="${DNF_HINT//libgomp1/libgomp}"
        echo "    Fedora/RHEL: sudo dnf install -y $DNF_HINT"
    elif command -v brew >/dev/null 2>&1; then
        echo "    macOS: brew install gcc git curl (libgomp приходит с gcc)"
    elif [ "$(uname -s)" = "Darwin" ]; then
        echo "    macOS: поставь Homebrew и выполни brew install gcc git curl"
    fi
    echo 'Manually install dependencies:'
fi

# Re-verify libgomp after potential auto-install
if [ "$NEED_LIBGOMP" = "1" ] && [ "$(uname -s)" = "Linux" ]; then
    if ! have_libgomp; then
        die 'libgomp.so.1 not found after installing libgomp1. Check find /usr/lib -name 'libgomp.so.1'.
    fi
fi

# --- 1) Python 3.10+ ---
PY_OK=$(python3 -c "import sys; print(1 if sys.version_info >= (3,10) else 0)" 2>/dev/null || echo 0)
        [ 
say "Python: $(python3 --version)"

# --- 2) venv + requirements ---
if [ ! -d ".venv" ]; then
    say "Создаю .venv ..."
    python3 -m venv .venv
fi
say "Устанавливаю зависимости из requirements.txt ..."
.venv/bin/pip install --quiet --upgrade pip
.venv/bin/pip install --quiet -r requirements.txt
say "Зависимости установлены."

# --- 3) Goose CLI ---
if [ ! -x ".tools/goose" ]; then
    say "Устанавливаю Goose CLI в .tools/ ..."
    if ! command -v curl >/dev/null 2>&1; then
        die "curl требуется для установки Goose."
    fi
    GOOSE_BIN_DIR="$REPO/.tools" CONFIGURE=false bash -c "
        curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash
    " >/dev/null 2>&1 || warn "Goose installer упал — проверь сеть."
fi
if [ -x ".tools/goose" ]; then
    GOOSE_VERSION=$(.tools/goose --version 2>&1 | tail -1 || echo "?")
    say "Goose: $GOOSE_VERSION"
else
    die "Goose не установлен. Проверь .tools/ и запусти setup.sh заново."
fi

# --- 4) Wizard ---
if [ -f ".env" ]; then
    warn ".env уже существует — пропускаю wizard. Удали .env и перезапусти setup.sh чтобы переконфигурировать."
else
    say "Запускаю cli/wizard.py ..."
    .venv/bin/python cli/wizard.py
fi

# --- 5) Optional local Lean ---
if [ "$WITH_LEAN_LOCAL" = "1" ]; then
    say "Поднимаю локальный lean-checker (Docker) ..."
    bash scripts/install_lean.sh || warn "lean-checker не поднялся. Детали выше."
else
    warn "Локальный Lean checker не устанавливался (используется remote SciLib)."
    warn "Чтобы добавить позже: ./scripts/install_lean.sh"
fi

# --- 6) symlink helper ---
if [ ! -e "$HOME/.local/bin/ai4math" ]; then
    mkdir -p "$HOME/.local/bin"
    ln -sf "$REPO/bin/ai4math" "$HOME/.local/bin/ai4math"
    say "Создан symlink: ~/.local/bin/ai4math → $REPO/bin/ai4math"
    case ":$PATH:" in
        *":$HOME/.local/bin:"*) : ;;
        *) warn "\$HOME/.local/bin отсутствует в PATH. Добавь в ~/.bashrc или ~/.zshrc:  export PATH=\"\$HOME/.local/bin:\$PATH\"" ;;
    esac
fi

# --- 7) Final pre-flight: ensure MCP subprocess actually loads ---
# This catches silent failures (wrong python, missing deps, shim bugs) BEFORE
# the user runs their first command and gets a confusing -32002 later.
say "Pre-flight: проверяю что MCP ai4math реально стартует..."
DOCTOR_OUT=$("$REPO/bin/ai4math" doctor 2>&1 || true)
if echo "$DOCTOR_OUT" | grep -q "MCP ai4math: OK"; then
    say "$(echo "$DOCTOR_OUT" | grep 'MCP ai4math:')"
else
    echo
    warn "MCP ai4math НЕ отвечает на pre-flight probe."
    warn "Вывод doctor:"
    echo "$DOCTOR_OUT" | sed 's/^/    /'
    echo
    warn 'Possible causes:'
    echo "    - .venv/bin/python не работает или отсутствует — попробуй rm -rf .venv && ./setup.sh"
    echo "    - pypdf/mcp/requests пакеты не установились — проверь: .venv/bin/pip list | grep -E 'pypdf|mcp|requests'"
    echo 
    echo "    - MCP subprocess падает при импорте — прямой тест:"
    echo "        .venv/bin/python src/ai4math_mcp.py < /dev/null &  # должен висеть, не падать"
    die "Установка НЕ завершена — agent не получит свои инструменты."
fi

cat <<EOF

${GREEN}Готово.${RESET} Запуск:
  ai4math                       интерактивная сессия
  ai4math -m deepseek           выбор модели
  ai4math run "промпт"          одна задача
  ai4math doctor                проверка окружения

Документация: README.md, docs/ARCHITECTURE.md, report/EXPERIMENT_REPORT.md
EOF
