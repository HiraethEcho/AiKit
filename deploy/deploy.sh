#!/usr/bin/env bash
# AiKit deploy — shell 版（phase 1）
# 依赖: jq, fzf。数据源 = deploy 生成的 *.json。
set -u -o pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"
HOME_DIR="${HOME:-$HOME}"
SECTIONS=(skills agents commands mcp)
MANIFEST="$SCRIPT_DIR/manifest.json"
PRESETJSON="$SCRIPT_DIR/preset.json"

YOLO=0; CMD="deploy"; TARGET_ARG=""
for a in "$@"; do
  case "$a" in
    list|doctor|gen|deploy) CMD="$a" ;;
    --yolo) YOLO=1 ;;
    *) TARGET_ARG="$a" ;;
  esac
done

need() { command -v "$1" >/dev/null || { echo "missing: $1" >&2; exit 1; }; }
need jq; need fzf
[[ -f "$MANIFEST" ]] || { echo "missing $MANIFEST — run: python3 deploy/deploy.py gen" >&2; exit 1; }

resolve_path() {
  local p="$1"
  [[ "$p" == "~" ]] && p="$HOME_DIR"
  [[ "$p" == "~/"* ]] && p="$HOME_DIR${p:1}"
  [[ "$p" != /* ]] && p="$PWD/$p"
  printf '%s' "$(realpath -m "$p")"
}
target_dir() {
  case "$1" in skills) echo .agents/skills;; agents) echo .agents/agents;;
    commands) echo .agents/commands;; mcp) echo .agents/mcp;; esac
}
sec_of() { # id -> section
  local id="$1" s
  for s in "${SECTIONS[@]}"; do
    if jq -e --arg s "$s" --arg id "$id" ".[\$s] | map(.id) | index(\$id)" "$MANIFEST" >/dev/null 2>&1; then
      echo "$s"; return
    fi
  done
}
res_path() { jq -r --arg id "$1" '
  ([.skills[],.agents[],.commands[],.mcp[] | select(.id==$id)])[0].path // ""' "$MANIFEST"; }

# 展开 preset -> 资源 id（qualified）
preset_ids() {
  jq -r --arg id "$1" '.preset[] | select(.id==$id) as $p |
    (([.skills[]?,.agents[]?,.commands[]?,.mcp[]?]|length)>0) as $hasref |
    if $hasref then
      [(.skills[]?|$p.kit+":"+.), (.agents[]?|$p.kit+":"+.),
       (.commands[]?|$p.kit+":"+.), (.mcp[]?|$p.kit+":"+.)]
    else
      (( ($p.kits // [])|if length>0 then . else (if $p.kit!="" then [$p.kit] else [] end) end )) as $kits |
      [ [.skills[],.agents[],.commands[],.mcp[]] | .[] | select(. as $r | $kits | index($r.kit)) | .id ]
    end | .[]' "$PRESETJSON"
}

cmd_list() {
  for sec in "${SECTIONS[@]}"; do
    echo "[$sec]"
    jq -r --arg s "$sec" '.[$s][] | "  \(.id)  cat=\(.category)  tags=\(.tags|join(","))  path=\(.path)"' "$MANIFEST"
  done
}
cmd_doctor() {
  local bad=0
  local -a paths=()
  local sec p
  for sec in "${SECTIONS[@]}"; do
    while IFS= read -r p; do [[ -n "$p" ]] && paths+=("$p"); done \
      < <(jq -r --arg s "$sec" '.[$s][] | .path' "$MANIFEST")
  done
  for p in "${paths[@]}"; do
    [[ -e "$ROOT/$p" ]] || { echo "[FAIL] missing: $ROOT/$p"; bad=1; }
  done
  [[ -f "$PRESETJSON" ]] || echo "[WARN] missing preset.json"
  [[ $bad -eq 0 ]] && echo "[OK] doctor"
}

deploy_one() { # type id src dst
  local t="$1" id="$2" src="$3" dst="$4"
  [[ -e "$src" ]] || { echo "  [error] source missing: $src"; return 1; }
  if [[ -L "$dst" && "$(realpath "$dst")" == "$(realpath "$src")" ]]; then
    echo "  [ok] up-to-date: $dst"; return 0
  fi
  if [[ -e "$dst" || -L "$dst" ]]; then
    local act
    if [[ $YOLO -eq 1 ]]; then act=b
    else read -rp "  冲突: $dst [s]kip/[o]verwrite/[b]ackup? " -n1 act; echo; act="${act:-s}"; fi
    case "$act" in
      s) echo "  [skip] $dst"; return 1;;
      o) rm -rf "$dst";;
      b) local bp="$dst.bak-$(date +%Y%m%d-%H%M%S)"; mv "$dst" "$bp"; echo "  [backup] $bp";;
      *) echo "  [skip] $dst"; return 1;;
    esac
  fi
  mkdir -p "$(dirname "$dst")"
  if ln -s "$src" "$dst"; then echo "  [ok] $dst"; return 0; fi
  echo "  [error] symlink failed: $dst"; return 1
}

cmd_deploy() {
  local target_root
  if [[ -n "$TARGET_ARG" ]]; then target_root="$(resolve_path "$TARGET_ARG")"
  else
    echo "target: 1) project  2) global"; read -rp "> " mode
    if [[ "$mode" == 2 ]]; then target_root="$HOME_DIR"
    else read -rp "项目路径 [$PWD]: " tp; target_root="$(resolve_path "${tp:-$PWD}")"; fi
  fi
  [[ -d "$target_root" ]] || { echo "not a directory: $target_root"; return 1; }

  declare -A selected=()   # "type|id" -> 1

  # --- presets ---
  if jq -e '.preset|length>0' "$PRESETJSON" >/dev/null 2>&1; then
    local pitems; pitems="$(mktemp)"
    jq -r '.preset[] | [.id,(.description//"")] | @tsv' "$PRESETJSON" > "$pitems"
    local chosen
    chosen="$(fzf --multi --layout=reverse --prompt="presets > " <"$pitems" | cut -f1)"
    rm -f "$pitems"
    while read -r pid; do
      [[ -n "$pid" ]] || continue
      while read -r rid; do
        [[ -n "$rid" ]] || continue
        local sec; sec="$(sec_of "$rid")"
        [[ -n "$sec" ]] && selected["$sec|$rid"]=1
      done < <(preset_ids "$pid")
    done <<<"$chosen"
  fi

  # --- staged sections (fzf; preselected via query) ---
  for sec in "${SECTIONS[@]}"; do
    local nitems; nitems="$(jq -r --arg s "$sec" ".[\$s]|length" "$MANIFEST")"
    [[ "$nitems" == 0 ]] && continue
    local items; items="$(mktemp)"
    jq -r --arg s "$sec" '.[$s][] |
      [.id,.category,(.tags|join(",")),(.description//"")] | @tsv' "$MANIFEST" > "$items"
    local q=""
    while read -r id; do
      [[ -n "${selected["$sec|$id"]:-}" ]] && q="$q $id"
    done < <(cut -f1 "$items")
    local picked
    picked="$(fzf --multi --layout=reverse --query="$q" --prompt="[$sec] select > " <"$items" | cut -f1)"
    rm -f "$items"
    for k in "${!selected[@]}"; do case "$k" in "$sec|"*) unset 'selected['"$k"']';; esac; done
    while read -r id; do [[ -n "$id" ]] && selected["$sec|$id"]=1; done <<<"$picked"
  done

  [[ ${#selected[@]} -eq 0 ]] && { echo "nothing selected"; return 0; }

  # --- review ---
  echo "preview:"
  declare -A dst_of=()
  for k in "${!selected[@]}"; do
    local sec="${k%%|*}" id="${k#*|}"
    local src="$ROOT/$(res_path "$id")" dst="$target_root/$(target_dir "$sec")/$(basename "$src")"
    printf '  %-8s %-38s -> %s\n' "$([[ -e "$src" ]] && echo OK || echo MISSING)" "$id" "$dst"
    dst_of["$k"]="$dst"
  done
  read -rp "部署? [Y/n]: " go; [[ "$go" == n ]] && return 0

  for k in "${!selected[@]}"; do
    local sec="${k%%|*}" id="${k#*|}" src="$ROOT/$(res_path "$id")" dst="${dst_of[$k]}"
    deploy_one "$sec" "$id" "$src" "$dst"
  done
  echo done
}

case "$CMD" in
  list) cmd_list ;;
  doctor) cmd_doctor ;;
  gen) echo "数据文件用 python3 deploy/deploy.py gen 生成" ;;
  deploy) cmd_deploy ;;
esac
