// ── Split pane controller ──────────────────────────────────────────────
// Stripped from pi-atelier: no mouse resize, keyboard resize only.

import { HStack, isViewportTUI, matchesKey } from "@earendil-works/pi-tui";
import type { OverlayOptions, TUI } from "@earendil-works/pi-tui";

export const DEFAULT_PANE_WIDTH = 44;
export const MIN_PANE_WIDTH = 28;
export const MAX_PANE_WIDTH = 72;
export const MIN_MAIN_WIDTH = 64;

export interface SplitControllerOptions {
  defaultPaneWidth?: number;
  minPaneWidth?: number;
  maxPaneWidth?: number;
  minMainWidth?: number;
  onError?(error: unknown): void;
  subscribeInput?(handler: (data: string) => { consume?: boolean; data?: string } | undefined): () => void;
  onResizeChange?(resizing: boolean): void;
  onWarning?(message: string): void;
}

export interface SplitController {
  attach(tui: TUI, paneComponent?: { render(width: number): string[] }): void;
  show(): void;
  hide(): void;
  setPaneWidth(width: number): void;
  getPaneWidth(): number;
  isEnabled(): boolean;
  isVisibleAtWidth(terminalWidth: number): boolean;
  beginResize(): boolean;
  finishResize(): void;
  cancelResize(): void;
  isResizing(): boolean;
  overlayOptions(): OverlayOptions;
  requestRender(): void;
  dispose(): void;
}

const finiteInteger = (value: number, fallback: number): number =>
  Number.isFinite(value) ? Math.trunc(value) : fallback;

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, value));

export function createSplitController(options: SplitControllerOptions = {}): SplitController {
  const minimumPane = Math.max(1, finiteInteger(options.minPaneWidth ?? MIN_PANE_WIDTH, MIN_PANE_WIDTH));
  const maximumPane = Math.max(minimumPane, finiteInteger(options.maxPaneWidth ?? MAX_PANE_WIDTH, MAX_PANE_WIDTH));
  const minimumMain = Math.max(1, finiteInteger(options.minMainWidth ?? MIN_MAIN_WIDTH, MIN_MAIN_WIDTH));
  let paneWidth = clamp(
    finiteInteger(options.defaultPaneWidth ?? DEFAULT_PANE_WIDTH, DEFAULT_PANE_WIDTH),
    minimumPane,
    maximumPane,
  );
  let tui: TUI | undefined;
  let originalRender: Function | undefined;
  let wrappedRender: Function | undefined;
  // Fullscreen (alt-screen) layout injection state. In fullscreen mode pi-tui
  // paints via renderLayoutFrame(layoutRoot, w, h) and never calls tui.render,
  // so the render-wrap below cannot reserve width. Instead we wrap the tui's
  // layoutRoot in an HStack [main(grow) | pane(basis)] so the layout engine
  // shrinks the main column (transcript + editor + footer) for real.
  let fsMode = false;
  let fsRoot: any;
  let fsStack: HStack | undefined;
  let fsPaneEntry: any;
  let fsComponent: { render(width: number): string[] } | undefined;
  let enabled = false;
  let disposed = false;
  let resizing = false;
  let resizeStartWidth = paneWidth;
  let unsubscribeInput: (() => void) | undefined;
  let controller: SplitController;

  const safely = (action: () => unknown) => {
    try {
      const result = action();
      if (result && typeof (result as any).then === "function") {
        void Promise.resolve(result).catch(() => undefined);
      }
    } catch {
      // Cleanup and error reporting are best effort; continue with remaining actions.
    }
  };

  const visibleAt = (terminalWidth: number): boolean =>
    enabled && Number.isFinite(terminalWidth) && terminalWidth >= minimumMain + minimumPane;

  const effectivePaneWidth = (terminalWidth: number): number => {
    if (!visibleAt(terminalWidth)) return 0;
    return clamp(paneWidth, minimumPane, Math.min(maximumPane, terminalWidth - minimumMain));
  };

  const overlayLayout: OverlayOptions = {
    anchor: "top-right",
    width: paneWidth,
    maxHeight: "100%",
    margin: 0,
    nonCapturing: true,
    // In fullscreen the pane renders via the HStack layout, not the overlay.
    visible: (terminalWidth) => !fsMode && visibleAt(terminalWidth),
  };

  const syncOverlayWidth = (terminalWidth = tui?.terminal.columns) => {
    const effectiveWidth = terminalWidth === undefined ? 0 : effectivePaneWidth(terminalWidth);
    overlayLayout.width = effectiveWidth > 0 ? effectiveWidth : paneWidth;
  };

  const requestRender = () => tui?.requestRender();

  const stopResize = (restore: boolean) => {
    if (!resizing && !unsubscribeInput) return;
    if (restore) paneWidth = resizeStartWidth;
    syncOverlayWidth();
    const unsubscribe = unsubscribeInput;
    resizing = false;
    unsubscribeInput = undefined;
    if (unsubscribe) safely(unsubscribe);
    safely(() => options.onResizeChange?.(false));
    safely(requestRender);
  };

  const reconcileResizeWidth = (terminalWidth: number) => {
    if (!resizing) return;
    if (!visibleAt(terminalWidth)) {
      stopResize(true);
      return;
    }
    const effectiveMax = Math.min(maximumPane, terminalWidth - minimumMain);
    paneWidth = clamp(paneWidth, minimumPane, Math.max(minimumPane, effectiveMax));
  };

  const attachFs = (nextTui: TUI, component?: { render(width: number): string[] }): boolean => {
    if (!component) return false;
    fsComponent = component;
    const root = (nextTui as any).layoutRoot;
    if (!root || root === fsStack) return !!fsStack;
    fsRoot = root;
    fsPaneEntry = {
      component,
      basis: effectivePaneWidth((nextTui as any).terminal?.columns) || paneWidth,
      grow: 0,
      shrink: 0,
      minSize: minimumPane,
      maxSize: maximumPane,
      visible: (vp: { width: number; height: number }) => vp.width >= minimumMain + minimumPane,
    };
    fsStack = new HStack([{ component: root, grow: 1, shrink: 1, minSize: 1 } as any, fsPaneEntry]);
    (nextTui as any).setLayoutRoot(fsStack);
    fsMode = true;
    return true;
  };

  const detachFs = () => {
    if (!fsMode) return;
    if (tui && (tui as any).layoutRoot === fsStack) (tui as any).setLayoutRoot(fsRoot);
    fsMode = false;
    fsRoot = undefined;
    fsStack = undefined;
    fsPaneEntry = undefined;
  };

  const attach = (nextTui: TUI, paneComponent?: { render(width: number): string[] }) => {
    if (disposed) throw new Error("Cannot attach a disposed split pane");
    if (tui === nextTui) {
      // Re-show on the same tui: fullscreen layout was restored on hide; re-inject.
      if (enabled && isViewportTUI(nextTui)) safely(() => attachFs(nextTui, paneComponent));
      return;
    }
    if (tui) throw new Error("Split pane is already attached to another TUI");
    tui = nextTui;
    if (isViewportTUI(nextTui) && attachFs(nextTui, paneComponent)) {
      requestRender();
      return;
    }
    originalRender = nextTui.render;
    const previousRender = nextTui.render;
    wrappedRender = function (this: any, terminalWidth: number): string[] {
      reconcileResizeWidth(terminalWidth);
      const reserved = effectivePaneWidth(terminalWidth);
      syncOverlayWidth(terminalWidth);
      try {
        return previousRender.call(nextTui, terminalWidth - reserved);
      } catch (error) {
        stopResize(true);
        enabled = false;
        safely(() => options.onError?.(error));
        return previousRender.call(nextTui, terminalWidth);
      }
    };
    nextTui.render = wrappedRender;
    requestRender();
  };

  const handleResizeInput = (data: string): { consume?: boolean; data?: string } | undefined => {
    if (matchesKey(data, "shift+left")) { controller.setPaneWidth(paneWidth + 4); return { consume: true }; }
    if (matchesKey(data, "shift+right")) { controller.setPaneWidth(paneWidth - 4); return { consume: true }; }
    if (matchesKey(data, "left")) { controller.setPaneWidth(paneWidth + 1); return { consume: true }; }
    if (matchesKey(data, "right")) { controller.setPaneWidth(paneWidth - 1); return { consume: true }; }
    if (matchesKey(data, "enter")) { stopResize(false); return { consume: true }; }
    if (matchesKey(data, "escape")) { stopResize(true); return { consume: true }; }
    return undefined;
  };

  controller = {
    attach,
    show() {
      if (disposed || enabled) return;
      enabled = true;
      if (tui && isViewportTUI(tui) && !fsMode && fsComponent) safely(() => attachFs(tui, fsComponent));
      syncOverlayWidth();
      requestRender();
    },
    hide() {
      stopResize(true);
      detachFs();
      if (!enabled) return;
      enabled = false;
      requestRender();
    },
    setPaneWidth(width) {
      const next = clamp(finiteInteger(width, paneWidth), minimumPane, maximumPane);
      if (next === paneWidth) return;
      paneWidth = next;
      if (fsPaneEntry) fsPaneEntry.basis = next;
      syncOverlayWidth();
      requestRender();
    },
    getPaneWidth: () => paneWidth,
    isEnabled: () => enabled,
    isVisibleAtWidth: visibleAt,
    beginResize() {
      if (resizing) return true;
      if (!tui || !enabled) {
        options.onWarning?.("Pane is not ready to resize");
        return false;
      }
      if (!visibleAt(tui.terminal.columns)) {
        options.onWarning?.("Terminal is too narrow to resize");
        return false;
      }
      if (!options.subscribeInput) {
        options.onWarning?.("Terminal input is unavailable for resizing");
        return false;
      }
      paneWidth = effectivePaneWidth(tui.terminal.columns);
      syncOverlayWidth();
      resizeStartWidth = paneWidth;
      resizing = true;
      try {
        unsubscribeInput = options.subscribeInput(handleResizeInput);
        options.onResizeChange?.(true);
        requestRender();
        return true;
      } catch (error) {
        stopResize(true);
        safely(() => options.onError?.(error));
        return false;
      }
    },
    finishResize: () => stopResize(false),
    cancelResize: () => stopResize(true),
    isResizing: () => resizing,
    overlayOptions: () => overlayLayout,
    requestRender,
    dispose() {
      if (disposed) return;
      stopResize(true);
      detachFs();
      disposed = true;
      enabled = false;
      if (tui && originalRender && tui.render === wrappedRender) tui.render = originalRender;
      tui?.requestRender();
      tui = undefined;
      originalRender = undefined;
      wrappedRender = undefined;
    },
  };
  return controller;
}
