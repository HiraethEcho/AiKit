#!/usr/bin/env python3
"""pi-board automated test harness.

Each scenario spawns a FRESH interactive pi process in a new pseudo-terminal
(the "new terminal / new pi process" requirement), waits for the board server
to report its port, then drives the board via HTTP and via /board commands.

A background thread continuously drains the pty so the TUI's constant
redraws never fill the buffer and stall the pi event loop (which would
otherwise make the HTTP server unresponsive).
"""
import json
import os
import pty
import re
import select
import shutil
import signal
import subprocess
import sys
import threading
import time
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
EXT_DIR = os.path.dirname(HERE)          # pi-board/
FIXTURE = os.path.join(HERE, "fixture")  # cwd for the spawned pi

PORT_BASE = int(os.environ.get("PI_BOARD_TEST_PORT", 42100))


class PiProc:
    def __init__(self, proc, master):
        self.proc = proc
        self.master = master
        self.buf = bytearray()
        self._stop = False
        self._lock = threading.Lock()
        self._thread = threading.Thread(target=self._read, daemon=True)
        self._thread.start()

    def _read(self):
        while not self._stop:
            try:
                r, _, _ = select.select([self.master], [], [], 0.2)
                if not r:
                    continue
                data = os.read(self.master, 65536)
            except OSError:
                break
            if not data:
                break
            with self._lock:
                self.buf.extend(data)

    def text(self):
        with self._lock:
            return bytes(self.buf).decode("utf-8", "ignore")

    def send(self, line):
        os.write(self.master, (line + "\r").encode("utf-8"))

    def wait_for(self, pattern, timeout=40):
        deadline = time.time() + timeout
        rx = re.compile(pattern)
        while time.time() < deadline:
            m = rx.search(self.text())
            if m:
                return m
            if self.proc.poll() is not None:
                return None
            time.sleep(0.2)
        return None

    def stop(self):
        self._stop = True
        try:
            self.proc.send_signal(signal.SIGTERM)
        except Exception:
            pass
        try:
            self.proc.wait(timeout=5)
        except Exception:
            try:
                self.proc.kill()
            except Exception:
                pass
        try:
            os.close(self.master)
        except OSError:
            pass


def spawn_pi(port):
    env = dict(os.environ)
    env["PI_BOARD_PORT"] = str(port)
    env["TERM"] = "xterm-256color"
    cmd = [
        "pi",
        "-e", EXT_DIR,
        "--no-context-files",
        "--no-skills",
        "--no-prompt-templates",
        "--no-themes",
        "--approve",
        "--no-session",
    ]
    master, slave = pty.openpty()
    proc = subprocess.Popen(
        cmd, cwd=FIXTURE, env=env,
        stdin=slave, stdout=slave, stderr=slave, close_fds=True,
    )
    os.close(slave)
    return PiProc(proc, master)


def http_get(port, path, timeout=15):
    try:
        with urllib.request.urlopen(f"http://127.0.0.1:{port}{path}", timeout=timeout) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return json.loads(e.read().decode("utf-8"))


def http_post(port, payload, timeout=15):
    req = urllib.request.Request(
        f"http://127.0.0.1:{port}/action",
        data=json.dumps(payload).encode("utf-8"),
        headers={"content-type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return json.loads(e.read().decode("utf-8"))


class Scenario:
    def __init__(self, name, fn, keep_state=False):
        self.name = name
        self.fn = fn
        self.keep_state = keep_state


def clean_state():
    state_dir = os.path.join(FIXTURE, ".pi")
    if os.path.isdir(state_dir):
        shutil.rmtree(state_dir, ignore_errors=True)


def run_scenario(sc, port):
    if not sc.keep_state:
        clean_state()
    pi = spawn_pi(port)
    failures = []
    try:
        time.sleep(3)  # let the TUI become ready for command input
        pi.send("/board")
        m = pi.wait_for(r"\[board\] port=(\d+)")
        if not m:
            failures.append(f"server did not report port; boot tail:\n{pi.text()[-1500:]}")
            return failures
        port_found = int(m.group(1))
        try:
            sc.fn(pi, port_found, failures)
        except Exception as e:  # noqa
            failures.append(f"scenario raised: {e!r}\n  tail: {pi.text()[-600:]}")
    finally:
        pi.stop()
    return failures


def check(failures, cond, msg):
    if not cond:
        failures.append(msg)


# ── scenarios ──────────────────────────────────────────────────────────

def s_empty_board(pi, port, failures):
    st = http_get(port, "/state")
    check(failures, st.get("ok") is True, f"/state ok: {st}")
    check(failures, st["items"] == [], f"empty items: {st['items']}")
    check(failures, st["annotations"] == [], "empty annotations")



def s_open_file(pi, port, failures):
    j = http_post(port, {"action": "open", "source": "file", "locator": "src/foo.ts"})
    check(failures, j.get("ok") is True, f"open file: {j}")
    check(failures, "export function foo" in j.get("content", ""), "content has foo")
    item_id = j.get("itemId")
    check(failures, bool(item_id), "itemId present")
    st = http_get(port, "/state")
    check(failures, len(st["items"]) == 1, f"one item pinned: {st['items']}")
    check(failures, st["items"][0]["source"] == "file", "item source file")
    j2 = http_post(port, {"action": "open", "source": "file", "locator": "src/foo.ts"})
    check(failures, j2.get("itemId") == item_id, "dedupe by locator")


def s_plain_file_omitted(pi, port, failures):
    http_post(port, {"action": "open", "source": "file", "locator": "src/foo.ts"})
    pv = http_post(port, {"action": "preview"})["text"]
    check(failures, pv.strip() == "", f"plain file with no edit/comment omitted: {pv!r}")


def s_annotate_offsets(pi, port, failures):
    j = http_post(port, {"action": "open", "source": "file", "locator": "src/foo.ts"})
    content = j["content"]
    item_id = j["itemId"]
    start = content.index("export function foo")
    end = content.index("{", start) + 1
    ch = j["contentHash"]
    a = http_post(port, {"action": "annotate", "itemId": item_id, "contentHash": ch,
                         "offsetStart": start, "offsetEnd": end, "text": "why any?"})
    check(failures, a.get("ok") is True, f"annotate: {a}")
    reg = a.get("region") or {}
    check(failures, reg.get("lineRange", {}).get("start") == 1, f"lineRange.start=1: {reg}")
    check(failures, "export function foo" in reg.get("quote", ""), f"quote: {reg}")
    st = http_get(port, "/state")
    check(failures, len(st["annotations"]) == 1, f"one annotation: {st['annotations']}")
    check(failures, st["annotations"][0]["kind"] == "comment", "kind comment")
    bad = http_post(port, {"action": "annotate", "itemId": item_id, "contentHash": "deadbeef",
                           "offsetStart": 0, "offsetEnd": 3, "kind": "comment", "text": "x"})
    check(failures, bad.get("ok") is False, f"hash mismatch rejected: {bad}")


def s_edit_file(pi, port, failures):
    j = http_post(port, {"action": "open", "source": "file", "locator": "src/foo.ts"})
    item_id = j["itemId"]
    original = j["content"]
    edited = original.replace("function foo(items: any[]): string", "async function foo(items: any[]): Promise<string>")
    se = http_post(port, {"action": "save_edit", "itemId": item_id, "content": edited})
    check(failures, se.get("ok") is True, f"save_edit: {se}")
    with open(os.path.join(FIXTURE, "src", "foo.ts"), encoding="utf-8") as f:
        disk = f.read()
    check(failures, "export async function foo" not in disk, "edit does not write disk")
    check(failures, "export function foo" in disk, "disk still has original content")
    st = http_get(port, "/state")
    check(failures, st["items"][0].get("edit") is not None, "item has edit")
    pv = http_post(port, {"action": "preview"})["text"]
    check(failures, "# file" in pv and "## foo.ts" in pv, f"assembly has file group:\n{pv}")
    check(failures, "### diff" in pv and "apply following diff" in pv and "+export async function foo" in pv and "```diff" in pv, f"diff present:\n{pv}")
    check(failures, "### Items" not in pv and "### Annotations" not in pv, "simplified assembly has no Items/Annotations sections")
    rv = http_post(port, {"action": "revert_edit", "itemId": item_id})
    check(failures, rv.get("ok") is True, f"revert_edit: {rv}")
    with open(os.path.join(FIXTURE, "src", "foo.ts"), encoding="utf-8") as f:
        disk2 = f.read()
    check(failures, "export async function foo" not in disk2 and "export function foo" in disk2, "disk unchanged after revert")
    check(failures, http_get(port, "/state")["items"][0].get("edit") is None, "edit cleared after revert")


def s_edit_comment(pi, port, failures):
    j = http_post(port, {"action": "open", "source": "file", "locator": "src/foo.ts"})
    item_id, ch = j["itemId"], j["contentHash"]
    orig = j["content"]
    # 1) edit-mode comment: annotate with a supplied buffer (not the on-disk file)
    buf = "line one\nline two\nline three\n"
    a = http_post(port, {"action": "annotate", "itemId": item_id, "content": buf,
                         "offsetStart": 0, "offsetEnd": 8, "text": "on line one"})
    check(failures, a.get("ok") is True, f"annotate with content: {a}")
    reg = a.get("region") or {}
    check(failures, reg.get("lineRange") == {"start": 1, "end": 1}, f"region from buffer: {reg}")
    check(failures, reg.get("quote") == "line one", f"quote from buffer: {reg}")
    # 2) comment on 'out.push' (line 4), then insert a header line to shift it down
    idx = orig.index("out.push")
    c = http_post(port, {"action": "annotate", "itemId": item_id, "contentHash": ch,
                         "offsetStart": idx, "offsetEnd": idx + len("out.push"), "text": "loop push"})
    check(failures, c.get("ok") is True, f"annotate loop push: {c}")
    edited = "// header\n" + orig
    se = http_post(port, {"action": "save_edit", "itemId": item_id, "content": edited})
    check(failures, se.get("ok") is True, f"save_edit: {se}")
    st = http_get(port, "/state")
    loop = [x for x in st["annotations"] if x["text"] == "loop push"][0]
    check(failures, loop["region"]["lineRange"] == {"start": 5, "end": 5}, f"re-anchored after insert: {loop}")
    # revert re-anchors annotations back to the original content
    rv = http_post(port, {"action": "revert_edit", "itemId": item_id})
    check(failures, rv.get("ok") is True, f"revert_edit: {rv}")
    st = http_get(port, "/state")
    loop = [x for x in st["annotations"] if x["text"] == "loop push"][0]
    check(failures, loop["region"]["lineRange"] == {"start": 4, "end": 4}, f"re-anchored back after revert: {loop}")


def s_preview_assembly(pi, port, failures):
    j = http_post(port, {"action": "open", "source": "file", "locator": "src/foo.ts"})
    content = j["content"]
    item_id = j["itemId"]
    ch = j["contentHash"]
    start = content.index("export function foo")
    http_post(port, {"action": "annotate", "itemId": item_id, "contentHash": ch,
                     "offsetStart": start, "offsetEnd": content.index("{", start) + 1,
                     "text": "why any?"})
    http_post(port, {"action": "annotate", "itemId": item_id, "contentHash": ch,
                     "offsetStart": 0, "offsetEnd": 0, "text": "keep this"})
    pv = http_post(port, {"action": "preview"})
    check(failures, pv.get("ok") is True, f"preview: {pv}")
    text = pv.get("text", "")
    for section in ["# file", "## foo.ts", "### comments", "### content", "[comment]"]:
        check(failures, section in text, f"assembly contains {section!r}\n---\n{text}")
    check(failures, "# 追加" not in text, "assembly no longer has appendix section")
    check(failures, "### Items" not in text and "### Annotations" not in text and "## Board" not in text,
                    "simplified assembly has no Board/Items/Annotations sections")
    check(failures, "### Modifications" not in text, "no Modifications block")
    check(failures, "[an:" not in text, "no inline [an:...] in assembly")
    check(failures, "### Questions" not in text, "no Questions block")


def s_edit_delete(pi, port, failures):
    j = http_post(port, {"action": "open", "source": "file", "locator": "src/foo.ts"})
    item_id, ch = j["itemId"], j["contentHash"]
    # annotate + edit + delete
    a = http_post(port, {"action": "annotate", "itemId": item_id, "contentHash": ch,
                         "offsetStart": 0, "offsetEnd": 0, "text": "v1"})
    ann_id = http_get(port, "/state")["annotations"][0]["id"]
    u = http_post(port, {"action": "update_annotation", "annotationId": ann_id, "text": "v2"})
    check(failures, u.get("ok") is True, f"update annotation: {u}")
    st = http_get(port, "/state")
    check(failures, st["annotations"][0]["text"] == "v2", "annotation edited")
    d = http_post(port, {"action": "delete_annotation", "annotationId": ann_id})
    check(failures, d.get("removed") == 1, f"delete annotation: {d}")
    check(failures, len(http_get(port, "/state")["annotations"]) == 0, "annotation gone")
    # whole-file comment: no selection -> region undefined
    a2 = http_post(port, {"action": "annotate", "itemId": item_id, "contentHash": ch,
                          "offsetStart": 0, "offsetEnd": 0, "text": "whole file"})
    check(failures, a2.get("ok") is True and a2.get("region") is None, f"whole-file comment region null: {a2}")
    pv = http_post(port, {"action": "preview"})["text"]
    check(failures, "### comments" in pv and "### content" not in pv, "whole-file-only comment skips content")


def s_refresh_restart(pi, port, failures):
    m = pi.wait_for(r"\[board\] port=(\d+)")
    check(failures, m is not None, "server started")
    port0 = int(m.group(1)) if m else port
    time.sleep(0.5)  # let the TUI become ready for command input
    pi.send("/board refresh")
    deadline = time.time() + 40
    seen = False
    while time.time() < deadline:
        text = pi.text()
        if len(re.findall(r"\[board\] port=\d+", text)) >= 2:
            seen = True
            break
        if pi.proc.poll() is not None:
            break
        time.sleep(0.3)
    check(failures, seen, "server restarted after /board refresh")
    st = wait_until(port0, lambda s: s.get("ok") is True, timeout=20)
    check(failures, st.get("ok") is True, f"state after refresh: {st}")


def s_clear(pi, port, failures):
    http_post(port, {"action": "open", "source": "file", "locator": "src/foo.ts"})
    c = http_post(port, {"action": "clear"})
    check(failures, c.get("ok") is True, f"clear: {c}")
    st = http_get(port, "/state")
    check(failures, st["items"] == [] and st["annotations"] == [], "cleared")


def wait_until(port, predicate, timeout=20):
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            st = http_get(port, "/state")
            if predicate(st):
                return st
        except Exception:
            pass
        time.sleep(0.5)
    return http_get(port, "/state")


def s_tree(pi, port, failures):
    t = http_get(port, "/tree?path=")
    check(failures, t.get("ok") is True, f"tree: {t}")
    check(failures, "src" in [d["name"] for d in t.get("dirs", [])], "tree has src dir")
    check(failures, "README.md" in [f["name"] for f in t.get("files", [])], "tree has README.md")
    t2 = http_get(port, "/tree?path=src")
    check(failures, "foo.ts" in [f["name"] for f in t2.get("files", [])], "src tree has foo.ts")
    bad = http_get(port, "/tree?path=../../etc")
    check(failures, bad.get("ok") is False, f"traversal blocked: {bad}")


def s_quote_uniqueness(pi, port, failures):
    j = http_post(port, {"action": "open", "source": "file", "locator": "src/foo.ts"})
    content = j["content"]
    item_id = j["itemId"]
    ch = j["contentHash"]
    first = content.index("return")
    second = content.index("return", first + 1)
    a = http_post(port, {"action": "annotate", "itemId": item_id, "contentHash": ch,
                         "offsetStart": second, "offsetEnd": second + len("return"),
                         "kind": "comment", "text": "dup"})
    check(failures, a.get("ok") is True, f"annotate dup quote: {a}")
    reg = a.get("region") or {}
    check(failures, len(reg.get("quote", "")) > len("return"), f"quote extended: {reg}")
    check(failures, reg.get("ambiguous") is False, f"extended quote became unique: {reg}")
    check(failures, reg.get("lineRange", {}).get("start") == 10, f"second return on line 10: {reg}")


def s_persistence(pi, port, failures):
    http_post(port, {"action": "open", "source": "file", "locator": "src/foo.ts"})
    http_post(port, {"action": "note", "text": "persisted note"})
    st = http_get(port, "/state")
    check(failures, len(st["items"]) == 2, "two items before restart")


def s_persistence_after_restart(pi, port, failures):
    st = http_get(port, "/state")
    check(failures, len(st["items"]) == 2, f"restored 2 items: {st['items']}")
    check(failures, any(i["source"] == "note" for i in st["items"]), "note restored")


SCENARIOS = [
    Scenario("empty_board", s_empty_board),
    Scenario("open_file", s_open_file),
    Scenario("plain_file_omitted", s_plain_file_omitted),
    Scenario("annotate_offsets", s_annotate_offsets),
    Scenario("edit_file", s_edit_file),
    Scenario("preview_assembly", s_preview_assembly),
    Scenario("edit_comment", s_edit_comment),
    Scenario("clear", s_clear),
    Scenario("refresh_restart", s_refresh_restart),
    Scenario("tree", s_tree),
    Scenario("quote_uniqueness", s_quote_uniqueness),
    Scenario("edit_delete", s_edit_delete),
    Scenario("persistence", s_persistence, keep_state=True),
    Scenario("persistence_after_restart", s_persistence_after_restart, keep_state=True),
]


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    passed = 0
    failed = 0
    for i, sc in enumerate(SCENARIOS):
        if only and only not in sc.name:
            continue
        port = PORT_BASE + i
        failures = run_scenario(sc, port)
        if failures:
            failed += 1
            print(f"[FAIL] {sc.name}")
            for f in failures:
                print("       -", f.replace("\n", "\n         "))
        else:
            passed += 1
            print(f"[PASS] {sc.name}")
    print(f"\n== {passed} passed, {failed} failed ==")
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
