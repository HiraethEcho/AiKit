// pi-board: shared/board-state.js
// Atomic persistence for BoardState: write tmp + rename, keep a .bak of the
// previous file, recover from .bak when the main file is corrupt.

import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { homedir } from "node:os";
import { createEmptyState, normalizeState } from "./board-model.js";

/** Resolve the board state file path. Prefers <cwd>/.pi/board.json; falls back to ~/.pi/board/board.json. */
export function resolveStatePath(cwd) {
  try {
    const dir = resolve(String(cwd ?? process.cwd()), ".pi");
    mkdirSync(dir, { recursive: true });
    return join(dir, "board.json");
  } catch {
    return join(homedir(), ".pi", "board", "board.json");
  }
}

/**
 * Load state from disk (with .bak fallback).
 * @returns {{ state: import("./board-model.js").BoardState, filePath: string, restored: boolean, fromBackup: boolean }}
 */
export function loadState(filePath) {
  const path = filePath || resolveStatePath(process.cwd());
  const readJson = (p) => {
    try {
      const raw = JSON.parse(readFileSync(p, "utf8"));
      const state = normalizeState(raw);
      return state ? { state, ok: true } : { state: null, ok: false };
    } catch {
      return { state: null, ok: false };
    }
  };

  const main = readJson(path);
  if (main.ok) return { state: main.state, filePath: path, restored: true, fromBackup: false };

  const bak = path + ".bak";
  const backup = readJson(bak);
  if (backup.ok) return { state: backup.state, filePath: path, restored: true, fromBackup: true };

  return { state: createEmptyState(), filePath: path, restored: false, fromBackup: false };
}

/** Atomically persist state. Never throws; failures are non-fatal (board keeps working in memory). */
export function saveState(state, filePath) {
  const path = filePath || resolveStatePath(process.cwd());
  try {
    mkdirSync(dirname(path), { recursive: true });
    const tmp = path + ".tmp";
    writeFileSync(tmp, JSON.stringify(state, null, 2), "utf8");
    if (existsSync(path)) {
      try {
        writeFileSync(path + ".bak", readFileSync(path), "utf8");
      } catch {
        // .bak best-effort
      }
    }
    renameSync(tmp, path);
  } catch {
    try {
      writeFileSync(path, JSON.stringify(state, null, 2), "utf8");
    } catch {
      // nothing more we can do; in-memory state remains authoritative
    }
  }
}
