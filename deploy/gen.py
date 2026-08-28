#!/usr/bin/env python3
"""AiKit standalone generator.

Reads:
  deploy/manifest.toml + kit manifests (via includes)
  deploy/preset.toml     + kit presets       (via includes)
  harness/agents.toml    (agent deploy config)

Emits into deploy/:
  manifest.{lua,json,yaml}
  preset.{lua,json,yaml}
  agents.{lua,json,yaml}

Usage:
  python3 gen.py [--format lua|json|yaml|all]   (default: all)
"""
import argparse
import json
import pathlib
import tomllib
from datetime import datetime

DEPLOY = pathlib.Path(__file__).resolve().parent
ROOT = DEPLOY.parent
AGENTS_TOML = ROOT / "harness" / "agents.toml"
SECTIONS = ("skills", "agents", "commands", "mcp")


# ---------------------------------------------------------------- toml utils

def _load_toml(path: pathlib.Path) -> dict:
    with path.open("rb") as f:
        return tomllib.load(f)


def _check_entries(path: pathlib.Path, data: dict) -> list[str]:
    errs = []
    required = {"id", "category", "tags", "path", "description"}
    for sec in SECTIONS:
        entries = data.get(sec, [])
        seen = set()
        for i, e in enumerate(entries):
            missing = required - set(e)
            if missing:
                errs.append(f"{path}: {sec}[{i}] missing {sorted(missing)}")
            if e.get("id") in seen:
                errs.append(f"{path}: {sec} duplicate id {e.get('id')!r}")
            seen.add(e.get("id"))
    return errs


def load_manifest() -> dict:
    """Load deploy/manifest.toml, resolve includes (relative to repo root)."""
    root_data = _load_toml(DEPLOY / "manifest.toml")
    errs = _check_entries(DEPLOY / "manifest.toml", root_data)
    merged = {s: [] for s in SECTIONS}
    used = {s: set() for s in SECTIONS}

    def add(entries, section, qualifier, path):
        for e in entries:
            raw_id = e["id"]
            qual_id = f"{qualifier}:{raw_id}" if qualifier else raw_id
            if qual_id in used[section]:
                raise ValueError(f"duplicate qualified id: {section}:{qual_id}")
            used[section].add(qual_id)
            item = dict(e)
            item["_qual_id"] = qual_id
            item["_kit"] = qualifier
            item["_sec"] = section
            item["_manifest"] = str(path)
            merged[section].append(item)

    for sec in SECTIONS:
        for e in root_data.get(sec, []):
            add([e], sec, None, DEPLOY / "manifest.toml")

    for inc in root_data.get("includes", []):
        p = ROOT / inc
        if not p.exists():
            errs.append(f"include missing: {inc}")
            continue
        data = _load_toml(p)
        errs += _check_entries(p, data)
        qualifier = p.parent.name
        for sec in SECTIONS:
            for e in data.get(sec, []):
                add([e], sec, qualifier, p)

    if errs:
        raise ValueError("\n".join(errs))
    return merged


def load_presets() -> list[dict]:
    """Read deploy/preset.toml includes; fallback: kit glob excluding deploy/."""
    out: list[dict] = []
    root_p = DEPLOY / "preset.toml"
    if root_p.exists():
        root_data = _load_toml(root_p)
        for pre in root_data.get("preset", []):
            item = dict(pre)
            item["_kit"] = None
            item["_id"] = pre["id"]
            out.append(item)
        for inc in root_data.get("includes", []):
            p = ROOT / inc
            if not p.exists():
                continue
            data = _load_toml(p)
            qualifier = p.parent.name
            for pre in data.get("preset", []):
                item = dict(pre)
                item["_kit"] = qualifier
                item["_id"] = f"{qualifier}:{pre['id']}"
                out.append(item)
    else:
        for p in sorted(ROOT.glob("*/preset.toml")):
            if p.parent.name == "deploy":
                continue
            data = _load_toml(p)
            kit = p.parent.name
            for pre in data.get("preset", []):
                item = dict(pre)
                item["_kit"] = kit
                item["_id"] = f"{kit}:{pre['id']}"
                out.append(item)
    return out


def expand_preset(preset: dict, manifest: dict) -> list[dict]:
    out: list[dict] = []
    by_kit = {}
    for sec in SECTIONS:
        for e in manifest[sec]:
            by_kit.setdefault(e["_kit"], []).append(e)

    kits = preset.get("kits")
    has_refs = any(preset.get(sec) for sec in SECTIONS)
    if kits is None and not has_refs and preset["_kit"]:
        kits = [preset["_kit"]]
    for kit in kits or []:
        for e in by_kit.get(kit, []):
            if e not in out:
                out.append(e)

    for sec in SECTIONS:
        for ref in preset.get(sec, []):
            hit = _resolve_ref(ref, manifest, sec, preset["_kit"])
            if hit and hit not in out:
                out.append(hit)
    return out


def _resolve_ref(ref: str, manifest: dict, section: str, kit: str | None = None):
    entries = manifest.get(section, [])
    if kit:
        for e in entries:
            if e["_kit"] == kit and e["id"] == ref:
                return e
    for e in entries:
        if e["_qual_id"] == ref:
            return e
    for e in entries:
        if e["_qual_id"].endswith(":" + ref):
            return e
    return None


def expand_presets_by_id(preset_ids: list[str], manifest, presets) -> list[dict]:
    out = []
    for pid in preset_ids:
        pre = next((x for x in presets if x["_id"] == pid), None)
        if pre is None:
            raise SystemExit(f"bad preset ref: {pid}")
        for e in expand_preset(pre, manifest):
            if e not in out:
                out.append(e)
    return out


def mcp_json_data(agents_cfg: dict) -> dict:
    servers = (agents_cfg.get("agents") or {}).get("mcp") or {}
    return {"mcpServers": servers}


def render_pi_settings() -> dict:
    agents_cfg = load_agents()
    pi = agents_cfg.get("pi", {})
    if not pi:
        raise SystemExit("harness/agents.toml: missing [pi]")
    template_p = ROOT / pi["template"]
    if not template_p.exists():
        raise SystemExit(f"template missing: {template_p}")
    data = json.loads(template_p.read_text())

    packages = []
    for p in pi.get("packages", []):
        kind = p.get("type")
        if kind == "npm":
            packages.append("npm:" + p["name"])
        elif kind == "local":
            packages.append(str((ROOT / p["path"]).resolve()))
        else:
            raise SystemExit(f"bad pi.packages type: {kind!r}")
    data["packages"] = packages

    manifest = load_manifest()
    presets = load_presets()
    skills = []
    for pid in pi.get("skills", {}).get("presets", []):
        pre = next((x for x in presets if x["_id"] == pid), None)
        if pre is None:
            raise SystemExit(f"bad preset ref: {pid}")
        for e in expand_preset(pre, manifest):
            if e["_sec"] == "skills":
                skills.append(e["path"].replace("/skills/", "/"))
    data["skills"] = sorted(set(skills))
    data["prompts"] = [str((ROOT / d).resolve()) for d in pi.get("commands", {}).get("dirs", [])]
    data["mcp"] = list(pi.get("mcp", {}).get("names", []))
    return data


def load_agents() -> dict:
    return _load_toml(AGENTS_TOML) if AGENTS_TOML.exists() else {}


# ---------------------------------------------------------------- build data

def build_data():
    manifest = load_manifest()
    presets = load_presets()
    agents = load_agents()

    def clean_entry(e):
        return {
            "id": e["_qual_id"],
            "kit": e.get("_kit") or "",
            "category": e.get("category", ""),
            "tags": e.get("tags", []),
            "path": e["path"],
            "description": e.get("description", ""),
        }

    manifest_data = {"version": "1.0"}
    for sec in SECTIONS:
        manifest_data[sec] = [clean_entry(e) for e in manifest[sec]]

    def clean_preset(p):
        return {
            "id": p["_id"],
            "kit": p.get("_kit") or "",
            "description": p.get("description", ""),
            "kits": p.get("kits", []),
            "skills": p.get("skills", []),
            "agents": p.get("agents", []),
            "commands": p.get("commands", []),
            "mcp": p.get("mcp", []),
        }

    presets_data = {"version": "1.0", "preset": [clean_preset(p) for p in presets]}
    return manifest_data, presets_data, agents


def _atomic_write(path: pathlib.Path, text: str):
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(text)
    tmp.replace(path)


# ---------------------------------------------------------------- lua gen

def lua_repr(obj) -> str:
    if isinstance(obj, bool):
        return "true" if obj else "false"
    if obj is None:
        return "nil"
    if isinstance(obj, (int, float)):
        return str(obj)
    if isinstance(obj, str):
        return lua_string(obj)
    if isinstance(obj, list):
        return "{ " + ", ".join(lua_repr(x) for x in obj) + " }"
    if isinstance(obj, dict):
        return "{ " + ", ".join(f"[{lua_string(k)}] = {lua_repr(v)}" for k, v in obj.items()) + " }"
    raise TypeError(type(obj))


def lua_string(s: str) -> str:
    if "\n" in s or "]]" in s:
        level = 1
        while ("]" * level) in s:
            level += 1
        return f"[{'='*level}[\n{s}\n]{'='*level}]"
    esc = s.replace("\\", "\\\\").replace('"', '\\"').replace("\r", "\\r").replace("\n", "\\n")
    return f'"{esc}"'


def gen_lua(force: bool = False, backup: bool = False):
    manifest_data, presets_data, agents = build_data()
    files = {
        "manifest.lua": manifest_data,
        "preset.lua": presets_data,
        "agents.lua": agents,
    }
    for name, data in files.items():
        path = DEPLOY / name
        if path.exists() and not force:
            print(f"skip: {name} already exists (use --force to regenerate)")
            continue
        if backup and path.exists():
            backup_path = path.with_suffix(path.suffix + f".bak-{datetime.now().strftime('%Y%m%d-%H%M%S')}")
            path.rename(backup_path)
            print(f"backup: {name} -> {backup_path.name}")
        src = name.replace(".lua", ".toml")
        header = f"-- GENERATED FROM {src} by gen.py. DO NOT EDIT.\n"
        body = lua_repr(data)
        _atomic_write(path, header + "return " + body + "\n")
        print(f"gen: {name}")


def gen_json(force: bool = False, backup: bool = False):
    manifest_data, presets_data, agents = build_data()
    files = {
        "manifest.json": manifest_data,
        "preset.json": presets_data,
        "agents.json": agents,
    }
    for name, data in files.items():
        path = DEPLOY / name
        if path.exists() and not force:
            print(f"skip: {name} already exists (use --force to regenerate)")
            continue
        if backup and path.exists():
            backup_path = path.with_suffix(path.suffix + f".bak-{datetime.now().strftime('%Y%m%d-%H%M%S')}")
            path.rename(backup_path)
            print(f"backup: {name} -> {backup_path.name}")
        _atomic_write(path, json.dumps(data, indent=2, ensure_ascii=False) + "\n")
        print(f"gen: {name}")


# minimal YAML emitter (zero-dep, only for generated sidecar files)
def _yaml_inline(v):
    if v is None:
        return "null"
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return str(v)
    if isinstance(v, str):
        return json.dumps(v, ensure_ascii=False)
    return None


def _yaml_key(k: str) -> str:
    if k and all(c.isalnum() or c in "_-./" for c in k):
        return k
    return json.dumps(k, ensure_ascii=False)


def _yaml_block(obj, ind="") -> str:
    if isinstance(obj, dict):
        if not obj:
            return ind + "{}\n"
        out = []
        for k, v in obj.items():
            iv = _yaml_inline(v)
            if iv is not None:
                out.append(f"{ind}{_yaml_key(k)}: {iv}")
            else:
                out.append(f"{ind}{_yaml_key(k)}:")
                out.append(_yaml_block(v, ind + "  "))
        return "\n".join(out) + "\n"
    if isinstance(obj, list):
        if not obj:
            return ind + "[]\n"
        out = []
        for v in obj:
            iv = _yaml_inline(v)
            if iv is not None:
                out.append(f"{ind}- {iv}")
            else:
                out.append(f"{ind}-")
                out.append(_yaml_block(v, ind + "  "))
        return "\n".join(out) + "\n"
    return ind + str(obj) + "\n"


def _yaml_dump(data: dict) -> str:
    return _yaml_block(data)


def gen_yaml(force: bool = False, backup: bool = False):
    manifest_data, presets_data, agents = build_data()
    files = {
        "manifest.yaml": ("deploy/manifest.toml / preset.toml", manifest_data),
        "preset.yaml": ("deploy/preset.toml", presets_data),
        "agents.yaml": ("harness/agents.toml", agents),
    }
    for name, (src, data) in files.items():
        path = DEPLOY / name
        if path.exists() and not force:
            print(f"skip: {name} already exists (use --force to regenerate)")
            continue
        if backup and path.exists():
            backup_path = path.with_suffix(path.suffix + f".bak-{datetime.now().strftime('%Y%m%d-%H%M%S')}")
            path.rename(backup_path)
            print(f"backup: {name} -> {backup_path.name}")
        header = f"# GENERATED FROM {src} by gen.py. DO NOT EDIT.\n"
        _atomic_write(path, header + _yaml_dump(data))
        print(f"gen: {name}")


def gen(fmt: str, force: bool = False, backup: bool = False):
    if fmt in ("lua", "all"):
        gen_lua(force, backup)
    if fmt in ("json", "all"):
        gen_json(force, backup)
    if fmt in ("yaml", "all"):
        gen_yaml(force, backup)


def main():
    ap = argparse.ArgumentParser(description="AiKit generator")
    ap.add_argument("--format", choices=["lua", "json", "yaml", "all"], default="all",
                    help="output format (default: all)")
    ap.add_argument("--force", action="store_true",
                    help="force regeneration even if files exist")
    ap.add_argument("--backup", action="store_true",
                    help="backup existing files before overwriting")
    args = ap.parse_args()
    gen(args.format, args.force, args.backup)


if __name__ == "__main__":
    main()