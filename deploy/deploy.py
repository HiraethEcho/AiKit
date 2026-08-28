#!/usr/bin/env python3
"""AiKit deploy — Phase 1 symlink deployment CLI.

Generation of manifest/preset/agents data files is handled by the standalone
`gen.py` (run `python3 gen.py`). This CLI deploys (symlinks/agents settings).

Commands:
  deploy.py                 interactive TUI
  deploy.py list [--cat C --tag T]   list all resources
  deploy.py doctor          validate manifests/presets/paths
  deploy.py scan [--write]  diff real subdirs against manifest (--write: add stubs)
  deploy.py agents          preview pi settings + .agents plan
  deploy.py agents --project <proj>   write <proj>/.agents + .pi
  deploy.py agents --global           write ~/.agents + ~/.pi

list/scan filters: --cat <cat> (repeatable) --tag <tag> (repeatable)
"""
import argparse
import json
import os
import pathlib
import shutil
import sys
import tomllib
from datetime import datetime

try:
    import curses
except ImportError:  # pragma: no cover
    curses = None

DEPLOY = pathlib.Path(__file__).resolve().parent
ROOT = DEPLOY.parent  # repo root
HOME = pathlib.Path.home()
import sys
sys.path.insert(0, str(ROOT))
from gen import (
    load_manifest, load_presets, load_agents,
    expand_preset, _resolve_ref, expand_presets_by_id,
    mcp_json_data, render_pi_settings, build_data,
    _load_toml, AGENTS_TOML, gen_lua, gen,
)
SECTIONS = ("skills", "agents", "commands", "mcp")
TARGET_DIRS = {
    "skills": ".agents/skills",
    "agents": ".agents/agents",
    "commands": ".agents/commands",
    "mcp": ".agents/mcp",
}


# ---------------------------------------------------------------- toml utils













# ---------------------------------------------------------------- planning

def link_name(path_str: str) -> str:
    return pathlib.PurePosixPath(path_str).name


def target_for(resource: dict, target_root: pathlib.Path) -> pathlib.Path:
    sec = resource["_sec"]
    return target_root / TARGET_DIRS[sec] / link_name(resource["path"])


def plan_entry(resource: dict, target_root: pathlib.Path) -> dict:
    src = ROOT / resource["path"]
    dst = target_for(resource, target_root)
    entry = {"type": resource["_sec"], "id": resource["_qual_id"], "src": str(src), "dst": str(dst)}
    if not src.exists():
        entry["status"] = "error"
        entry["reason"] = "source missing"
    elif not dst.exists() and not dst.is_symlink():
        entry["status"] = "link"
    elif dst.is_symlink() and os.path.realpath(dst) == os.path.realpath(src):
        entry["status"] = "uptodate"
    else:
        entry["status"] = "conflict"
    return entry


# ---------------------------------------------------------------- actions

def backup_path(p: pathlib.Path) -> pathlib.Path:
    ts = datetime.now().strftime("%Y%m%d-%H%M%S")
    return p.with_name(p.name + f".bak-{ts}")


def apply_link(entry: dict, ask=None) -> str:
    src = pathlib.Path(entry["src"])
    dst = pathlib.Path(entry["dst"])
    if not src.exists():
        return "error"
    if dst.is_symlink() and os.path.realpath(dst) == os.path.realpath(src):
        return "uptodate"
    if dst.exists() or dst.is_symlink():
        action = ask(dst, src) if ask else "skip"
        if action == "skip":
            return "skip"
        if action == "backup":
            dst.rename(backup_path(dst))
        elif action == "overwrite":
            if dst.is_dir() and not dst.is_symlink():
                if any(dst.iterdir()):
                    if not (ask and ask(dst, src, confirm_dir=True) == "yes"):
                        return "skip"
                shutil.rmtree(dst)
            else:
                dst.unlink()
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.symlink_to(src)
    return "ok"


# ---------------------------------------------------------------- lua gen







def _atomic_write(path: pathlib.Path, text: str):
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(text)
    tmp.replace(path)






# minimal YAML emitter (zero-dep, only for generated sidecar files)












# ---------------------------------------------------------------- commands

def cmd_list(target_root: pathlib.Path | None = None, cats=None, tags=None):
    manifest = load_manifest()
    for sec in SECTIONS:
        entries = manifest[sec]
        if cats or tags:
            entries = [
                e for e in entries
                if (not cats or e.get("category") in cats)
                and (not tags or set(tags) & set(e.get("tags", [])))
            ]
        print(f"\n[{sec}] {len(entries)}")
        for e in entries:
            t = ",".join(e.get("tags", []))
            print(f"  {e['_qual_id']:40s} cat={e.get('category',''):12s} tags={t}")
            print(f"    path={e['path']}")
            print(f"    {e.get('description','')}")

def cmd_doctor():
    errs = []
    warn = []
    try:
        manifest = load_manifest()
    except Exception as exc:
        print(f"[FAIL] manifest: {exc}")
        return 1
    for sec in SECTIONS:
        for e in manifest[sec]:
            p = ROOT / e["path"]
            if not p.exists():
                errs.append(f"missing path: {e['path']} ({e['_qual_id']})")
    try:
        presets = load_presets()
        for pre in presets:
            selected = expand_preset(pre, manifest)
            print(f"[OK] preset {pre.get('_id')}: {len(selected)} resources")
            for sec in SECTIONS:
                for ref in pre.get(sec, []):
                    if not _resolve_ref(ref, manifest, sec, pre.get("_kit")):
                        errs.append(f"preset {pre.get('_id')}: bad ref {sec}:{ref}")
    except Exception as exc:
        errs.append(f"preset.toml: {exc}")
    if AGENTS_TOML.exists():
        try:
            agents = _load_toml(AGENTS_TOML)
            print("[OK] agents/agents.toml parses")
            pi = agents.get("pi", {})
            tpl = ROOT / pi.get("template", "")
            if pi and not tpl.exists():
                errs.append(f"pi template missing: {tpl}")
            for p in pi.get("packages", []):
                if p.get("type") not in ("local", "npm"):
                    errs.append(f"pi package bad type: {p.get('type')!r}")
                if p.get("type") == "local" and "path" in p and not (ROOT / p["path"]).exists():
                    errs.append(f"pi package path missing: {p['path']}")
        except Exception as exc:
            errs.append(f"agents/agents.toml: {exc}")
    else:
        warn.append("agents/agents.toml missing")
    root_preset = DEPLOY / "preset.toml"
    if root_preset.exists():
        root_data = _load_toml(root_preset)
        for inc in root_data.get("includes", []):
            if not (ROOT / inc).exists():
                warn.append(f"preset include missing: {inc}")
    for w in warn:
        print(f"[WARN] {w}")
    if errs:
        print("[FAIL]")
        for e in errs:
            print("  -", e)
        return 1
    print("[OK] doctor")
    return 0


# ---------------------------------------------------------------- scan

def cmd_scan(write=False):
    """Discover resources from real subdirs (name-only) and diff against manifest."""
    IGNORE = {".git", "node_modules", "__pycache__", ".opencode", "templates"}
    root_data = _load_toml(DEPLOY / "manifest.toml")
    kit_dirs = [inc.split("/")[0] for inc in root_data.get("includes", [])]
    owners = {kd: ROOT / kd / "manifest.toml" for kd in kit_dirs}

    discovered = []  # (sec, name, path_str, owner_dir)
    for d in kit_dirs:
        base_root = ROOT / d
        for sec in SECTIONS:
            base = base_root / sec
            if not base.is_dir():
                continue
            for item in sorted(base.iterdir()):
                if item.name.startswith(".") or item.name in IGNORE:
                    continue
                path_str = str(item.relative_to(ROOT))
                discovered.append((sec, item.name, path_str, d))

    manifest = load_manifest()
    manifest_paths = {e["path"] for sec in SECTIONS for e in manifest[sec]}
    discovered_paths = {x[2] for x in discovered}

    added = [x for x in discovered if x[2] not in manifest_paths]
    removed = [e["path"] for sec in SECTIONS for e in manifest[sec] if e["path"] not in discovered_paths]

    print(f"scan: discovered {len(discovered)} resource paths; manifest has {len(manifest_paths)}")
    print(f"\n[+] in filesystem, not in manifest ({len(added)}):")
    for sec, name, path_str, owner in added:
        print(f"    {sec:9s} {path_str}  (owner: {owner}/manifest.toml)")
    print(f"\n[-] in manifest, missing on disk ({len(removed)}):")
    for p in removed:
        print(f"    {p}")

    if not write:
        if added or removed:
            print("\n(run with --write to append stub entries for new paths)")
        else:
            print("\nin sync")
        return 1 if (added or removed) else 0

    by_owner: dict[str, list] = {}
    for sec, name, path_str, owner in added:
        by_owner.setdefault(owner, []).append((sec, name, path_str))
    for owner, items in by_owner.items():
        mp = owners[owner]
        lines = []
        for sec, name, path_str in items:
            lines += ["", f"[[{sec}]]", f'id = "{name}"', 'category = ""',
                      "tags = []", f'path = "{path_str}"', 'description = ""']
        with mp.open("a", encoding="utf-8") as f:
            f.write("\n".join(lines) + "\n")
        print(f"\nwrote {len(items)} stub(s) to {mp}")
    gen_lua()
    print("gen-lua: regenerated lua files")
    return 0


# ---------------------------------------------------------------- TUI

class TUI:
    def __init__(self, stdscr, yolo=False):
        self.scr = stdscr
        self.yolo = yolo
        curses.curs_set(0)
        try:
            curses.start_color()
            curses.init_pair(1, curses.COLOR_BLACK, curses.COLOR_CYAN)
        except curses.error:
            pass
        self.h, self.w = stdscr.getmaxyx()
        self.hl = curses.A_REVERSE

    def _draw_opts(self, title, header, options, current, top):
        self.scr.erase()
        self.scr.addstr(0, 0, title[: self.w - 1], curses.A_BOLD)
        if header:
            self.scr.addstr(1, 0, header[: self.w - 1])
        start_y = 2 if header else 1
        maxy = self.h - 1 - start_y
        for i, opt in enumerate(options[top:top + maxy]):
            y = start_y + i
            full = opt if current == top + i else opt
            line = (("> " if current == top + i else "  ") + full)[: self.w - 1]
            attr = self.hl if current == top + i else 0
            self.scr.addstr(y, 0, line, attr)
        self.scr.addstr(self.h - 1, 0, "↑/↓: move  SPACE: toggle  ENTER: done  q: cancel  /: filter")
        self.scr.refresh()

    def menu(self, title, options, header=""):
        cur, top = 0, 0
        while True:
            self._draw_opts(title, header, options, cur, top)
            k = self.scr.getch()
            if k in (curses.KEY_UP, ord("k")):
                cur = (cur - 1) % len(options)
            elif k in (curses.KEY_DOWN, ord("j")):
                cur = (cur + 1) % len(options)
            elif k in (10, 13, curses.KEY_ENTER):
                return cur
            elif k in (ord("q"), 27):
                return None
            top = self._scroll(cur, top, len(options), 1)

    def _scroll(self, cur, top, n, start_y):
        maxy = self.h - 1 - start_y
        if maxy < 1:
            maxy = 1
        if cur < top:
            return cur
        if cur >= top + maxy:
            return cur - maxy + 1
        return top

    def pick(self, title, options, preselected=None, header="", entries=None):
        selected = list(preselected) if preselected else [False] * len(options)
        cur, top = 0, 0
        filt = ""
        filtering = False

        def matches(o, i):
            f = filt.lower()
            if f.startswith("cat:"):
                e = entries[i] if entries else None
                return bool(e and (e.get("category") or "").lower() == f[4:].strip())
            if f.startswith("tag:"):
                e = entries[i] if entries else None
                return bool(e and f[4:].strip() in [t.lower() for t in (e.get("tags") or [])])
            return filt.lower() in o.lower()

        while True:
            vis = [i for i, o in enumerate(options) if matches(o, i)]
            if not vis:
                vis = list(range(len(options)))
            self._draw_pick(title, header, options, selected, cur, top, vis, filt)
            k = self.scr.getch()
            if filtering:
                if k in (10, 13, curses.KEY_ENTER):
                    filtering = False
                elif k == 27:
                    filtering = False
                elif k in (curses.KEY_BACKSPACE, 127, 8):
                    filt = filt[:-1]
                elif 32 <= k <= 126:
                    filt += chr(k)
                cur, top = 0, 0
                continue
            if k in (curses.KEY_UP, ord("k")):
                if vis:
                    cur = (cur - 1) % len(vis)
            elif k in (curses.KEY_DOWN, ord("j")):
                if vis:
                    cur = (cur + 1) % len(vis)
            elif k == ord(" "):
                if vis:
                    selected[vis[cur]] = not selected[vis[cur]]
            elif k == ord("a"):
                for i in vis:
                    selected[i] = True
            elif k == ord("n"):
                for i in vis:
                    selected[i] = False
            elif k == ord("/"):
                filtering = True
                filt = ""
                cur, top = 0, 0
            elif k in (10, 13, curses.KEY_ENTER):
                return [i for i, s in enumerate(selected) if s]
            elif k in (ord("q"), 27):
                return None
            top = self._scroll(cur, top, len(vis), 2 if header else 1)

    def _draw_pick(self, title, header, options, selected, cur, top, vis, filt):
        self.scr.erase()
        self.scr.addstr(0, 0, title[: self.w - 1], curses.A_BOLD)
        y = 1
        if header:
            self.scr.addstr(y, 0, header[: self.w - 1])
            y += 1
        self.scr.addstr(y, 0, f"filter: {filt or '(none)'}"[: self.w - 1])
        y += 1
        start_y = y
        maxy = self.h - 1 - start_y
        if maxy < 1:
            maxy = 1
        for i, full_idx in enumerate(vis[top:top + maxy]):
            mark = "[x]" if selected[full_idx] else "[ ]"
            line = (f"{mark} {options[full_idx]}")[: self.w - 1]
            attr = self.hl if cur == top + i else 0
            self.scr.addstr(start_y + i, 0, line, attr)
        self.scr.addstr(self.h - 1, 0, "↑/↓: move  SPACE: toggle  a/n: all/none  ENTER: done  q: cancel  /: filter (cat:/tag:)")
        self.scr.refresh()

    def input(self, title, default=""):
        buf = list(default)
        while True:
            self.scr.erase()
            self.scr.addstr(0, 0, title, curses.A_BOLD)
            self.scr.addstr(2, 0, "> " + "".join(buf)[-self.w + 3:])
            self.scr.addstr(self.h - 1, 0, "ENTER: confirm  ESC/q: cancel")
            self.scr.refresh()
            k = self.scr.getch()
            if k in (10, 13, curses.KEY_ENTER):
                return "".join(buf)
            elif k == 27:
                return None
            elif k in (curses.KEY_BACKSPACE, 127, 8):
                if buf:
                    buf.pop()
            elif 32 <= k <= 126:
                buf.append(chr(k))
            elif k == ord("q"):
                return None

    def confirm(self, title, default_yes=False):
        opts = ["yes", "no"]
        cur = 0 if default_yes else 1
        while True:
            self.scr.erase()
            self.scr.addstr(0, 0, title, curses.A_BOLD)
            for i, o in enumerate(opts):
                prefix = "> " if i == cur else "  "
                self.scr.addstr(2 + i, 0, prefix + o, self.hl if i == cur else 0)
            self.scr.refresh()
            k = self.scr.getch()
            if k in (curses.KEY_LEFT, curses.KEY_RIGHT, ord("h"), ord("l")):
                cur = 1 - cur
            elif k in (10, 13, curses.KEY_ENTER):
                return opts[cur] == "yes"
            elif k in (ord("q"), 27):
                return False

    def msg(self, text):
        self.scr.erase()
        for i, line in enumerate(text.split("\n")):
            if i < self.h - 2:
                self.scr.addstr(i, 0, line[: self.w - 1])
        self.scr.addstr(self.h - 1, 0, "any key...")
        self.scr.refresh()
        self.scr.getch()


def _label(e):
    tags = ",".join(e.get("tags", []))
    return f"{e['_qual_id']}  cat={e.get('category','')}  tags={tags}  {e.get('description','')}"


def run_tui(stdscr, args):
    ui = TUI(stdscr)
    manifest = load_manifest()
    presets = load_presets()

    # target
    if args.global_:
        mode = "global"
        target_root = HOME
    elif args.project:
        mode = "project"
        target_root = pathlib.Path(args.project).expanduser().resolve()
        if not target_root.is_dir():
            print(f"not a directory: {target_root}")
            return 1
    else:
        idx = ui.menu("Select target", ["project", "global", "quit"])
        if idx is None or idx == 2:
            return 0
        mode = "global" if idx == 1 else "project"
        if mode == "global":
            target_root = HOME
        else:
            default = str(pathlib.Path.cwd())
            path_str = ui.input("Project path (dir, ~ and . ok)", default=default)
            if path_str is None:
                return 0
            target_root = pathlib.Path(path_str).expanduser().resolve()
            if not target_root.is_dir():
                ui.msg(f"not a directory: {target_root}")
                return 1

    # presets
    selected_entries: list[dict] = []
    if presets:
        opts = [f"{p['_id']} — {p.get('description','')}" for p in presets]
        idxs = ui.pick(f"Presets (target: {target_root})", opts)
        if idxs is None:
            return 0
        for i in idxs:
            selected_entries += expand_preset(presets[i], manifest)

    # staged extra selection per type
    for sec in SECTIONS:
        entries = manifest[sec]
        if not entries:
            continue
        opts = [_label(e) for e in entries]
        preselect = [e in selected_entries for e in entries]
        header = f"preset 已选 {sum(preselect)} 项；SPACE 增删，ENTER 进入下一类"
        idxs = ui.pick(f"[{sec}] select resources (target: {target_root})", opts,
                       preselected=preselect, header=header, entries=entries)
        if idxs is None:
            return 0
        chosen = [entries[i] for i in idxs]
        selected_entries = [e for e in selected_entries if e not in entries] + chosen

    if not selected_entries:
        ui.msg("nothing selected")
        return 0

    # review — ENTER deploy
    lines = ["Review plan (ENTER to deploy, q quit):", ""]
    for e in selected_entries:
        dst = target_for(e, target_root)
        src = ROOT / e["path"]
        status = "OK" if src.exists() else "MISSING SOURCE"
        lines.append(f"  {status:14s} {e['_qual_id']:32s} -> {dst}")
    while True:
        ui.scr.erase()
        for i, line in enumerate(lines):
            if i < ui.h - 2:
                ui.scr.addstr(i, 0, line[: ui.w - 1])
        ui.scr.addstr(ui.h - 1, 0, "ENTER: deploy   q: quit")
        ui.scr.refresh()
        k = ui.scr.getch()
        if k in (ord("q"), 27):
            return 0
        if k in (10, 13, curses.KEY_ENTER):
            break

    # deploy
    results = []
    conflict_choice = None

    def ask_conflict(dst, src, confirm_dir=False):
        nonlocal conflict_choice
        if confirm_dir:
            return "yes" if ui.confirm(f"dst is non-empty dir: {dst}\nremove?") else "no"
        if conflict_choice is not None:
            return conflict_choice
        opts = [
            f"skip all      {dst.name}",
            f"overwrite all {dst.name}",
            f"backup all    {dst.name}",
        ]
        idx = ui.menu("Conflict — target exists (applies to ALL conflicts)", opts)
        choice = ["skip", "overwrite", "backup"][idx] if idx is not None else "skip"
        conflict_choice = choice
        return choice

    for e in selected_entries:
        entry = plan_entry(e, target_root)
        st = apply_link(entry, ask=ask_conflict)
        results.append((e, st))

    ui.scr.erase()
    ui.scr.addstr(0, 0, "Deploy done:", curses.A_BOLD)
    y = 2
    for e, st in results:
        if y >= ui.h - 2:
            break
        ui.scr.addstr(y, 0, f"  [{st:8s}] {e['_qual_id']}")
        y += 1
    ui.scr.addstr(ui.h - 1, 0, "any key...")
    ui.scr.refresh()
    ui.scr.getch()
    return 0


# ---------------------------------------------------------------- agents render









def _target_root(args) -> pathlib.Path | None:
    if args.project:
        return pathlib.Path(args.project).expanduser().resolve()
    if args.global_:
        return HOME
    return None


def cmd_agents(args):
    agents_cfg = load_agents()
    pi_data = render_pi_settings()
    mcp_data = mcp_json_data(agents_cfg)
    target_root = _target_root(args)

    manifest = load_manifest()
    presets = load_presets()
    resources = expand_presets_by_id((agents_cfg.get("agents") or {}).get("presets", []), manifest, presets)

    if target_root is None:
        print("# pi settings preview")
        print(json.dumps(pi_data, indent=2, ensure_ascii=False))
        print("# mcp.json preview")
        print(json.dumps(mcp_data, indent=2, ensure_ascii=False))
        print("# .agents phase1 plan")
        if resources:
            print("  " + "\n  ".join(e["_qual_id"] for e in resources))
        else:
            print("  (no [agents].presets)")
        print("# use --project PATH or --global to write")
        return 0

    # phase 1: symlink resources → <target>/.agents/
    for e in resources:
        entry = plan_entry(e, target_root)
        st = apply_link(entry, ask=lambda dst, src, confirm_dir=False: "backup")
        print(f"  [{st:9s}] {entry['id']}")

    # mcp.json → <target>/.agents/mcp.json
    if mcp_data["mcpServers"]:
        mcp_target = target_root / ".agents" / "mcp.json"
        mcp_target.parent.mkdir(parents=True, exist_ok=True)
        if mcp_target.exists():
            shutil.copy2(mcp_target, mcp_target.with_suffix(".json.bak"))
        _atomic_write(mcp_target, json.dumps(mcp_data, indent=2, ensure_ascii=False) + "\n")
        print(f"  wrote {mcp_target}")

    # phase 2: pi settings → <target>/.pi/
    pi = agents_cfg.get("pi", {})
    rel = pi["global_target"] if args.global_ else pi["project_target"]
    target = target_root / rel
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        shutil.copy2(target, target.with_suffix(target.suffix + ".bak"))
    _atomic_write(target, json.dumps(pi_data, indent=2, ensure_ascii=False) + "\n")
    print(f"  wrote {target}")
    return 0


# ---------------------------------------------------------------- main

def main():
    ap = argparse.ArgumentParser(description="AiKit deploy")
    ap.add_argument("command", nargs="?", default=None)
    ap.add_argument("--project", help="target project path")
    ap.add_argument("--global", dest="global_", action="store_true", help="target global home")
    ap.add_argument("--cat", action="append", help="filter by category (repeatable)")
    ap.add_argument("--tag", action="append", help="filter by tag (repeatable)")
    ap.add_argument("--write", action="store_true", help="scan: append stub entries for discovered paths")
    ap.add_argument("--format", choices=["lua", "json", "yaml", "all"], default="all",
                    help="gen output format (default: all)")
    args = ap.parse_args()

    if args.command == "list":
        return cmd_list(cats=args.cat, tags=args.tag)
    if args.command == "doctor":
        return cmd_doctor()
    if args.command == "scan":
        return cmd_scan(write=args.write)
    if args.command == "agents":
        return cmd_agents(args)

    if curses is None:
        print("curses not available")
        return 1
    return curses.wrapper(run_tui, args)


if __name__ == "__main__":
    sys.exit(main())
