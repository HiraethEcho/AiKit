// ── Pane: rendering + controller ───────────────────────────────────

import { homedir } from "node:os";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { type Component, truncateToWidth, visibleWidth } from "@earendil-works/pi-tui";
import { formatTokens } from "./metrics";
import { createSplitController, type SplitController } from "./split";
import type { RunActivitySnapshot } from "./run-activity";
import { formatDuration } from "./run-activity";

// ── Inline palette ────────────────────────────────────────────────────

type Role = "accent"|"primary"|"muted"|"dim"|"ready"|"working"|"context"|"warning"|"error"|"input"|"output"|"cache"|"cost";
type Rgb = [number,number,number];

const DARK: Record<Role,Rgb> = {
  accent:[177,140,255], primary:[212,212,212], muted:[128,128,128], dim:[102,102,102],
  ready:[110,168,254], working:[255,159,67],
  context:[110,168,254], warning:[255,159,67], error:[255,93,115],
  input:[110,168,254], output:[177,140,255], cache:[125,211,252], cost:[255,159,67],
};

const PLAIN: Record<Role,string> = {
  accent:"accent", primary:"text", muted:"muted", dim:"dim",
  ready:"thinkingLow", working:"mdHeading",
  context:"thinkingLow", warning:"warning", error:"error",
  input:"thinkingLow", output:"thinkingHigh", cache:"syntaxType", cost:"mdHeading",
};

const NOCOLOR: Record<Role,string> = {
  accent:"accent", primary:"text", muted:"muted", dim:"dim",
  ready:"text", working:"text",
  context:"text", warning:"warning", error:"error",
  input:"text", output:"text", cache:"text", cost:"text",
};

function palette(theme: any, color: boolean) {
  return {
    paint: function(r: Role, t: string): string {
      if (!color) return theme.fg(NOCOLOR[r], t);
      if (!theme.name) return theme.fg(PLAIN[r], t);
      const d = DARK[r]; return "\u001b[38;2;"+d[0]+";"+d[1]+";"+d[2]+"m"+t+"\u001b[39m";
    },
  };
}

// ── Snapshot ──────────────────────────────────────────────────────────

export interface TodoItem {
  description: string;
  done: boolean;
}

export interface WorksColumn {
  agent: string;
  todos: TodoItem[];
}

export interface WorksData {
  columns: WorksColumn[];
}

export interface PaneSnapshot {
  projectName: string; cwd: string; sessionName: string;
  branch: string;
  gitStaged: number; gitUnstaged: number; gitAhead: number; gitBehind: number;
  branchEntryCount: number;
  persisted: boolean;
  runActivity: RunActivitySnapshot;
  // Usage metrics (for CONTEXT panel)
  usageAvailable: boolean;
  costAvailable: boolean;
  inputTokens: number;
  outputTokens: number;
  cacheRead: number;
  cacheWrite: number;
  cacheHitPercent?: number;
  cost: number;
  contextWindow: number;
  systemTokens: number;
  userTokens: number;
  toolTokens: number;
  thinkTokens: number;
  compactTokens: number;
  assistantTokens: number;
  // Extension statuses
  extensionStatuses: string[];
  // Works data (pi-work integration)
  worksData: WorksData | null;
}

// ── Helpers ───────────────────────────────────────────────────────────

const sanitize = (t: string): string =>
  t.replace(/\u001b\[[0-?]*[ -/]*[@-~]/g,"").replace(/[\u0000-\u001f\u007f]/g," ").replace(/\s+/g," ").trim();

const display = (v: string|undefined): string => {
  const s = v === undefined ? "" : sanitize(v); return s || "\u2014";
};

const finite = (v: number): number =>
  Number.isFinite(v) ? Math.max(0, Math.trunc(v)) : 0;

function shortPath(p: string): string {
  const s = sanitize(p); const h = homedir();
  if (s === h) return "~";
  if (h && s.indexOf(h+"/")===0) return "~"+s.slice(h.length);
  return s||"\u2014";
}

function padToWidth(text: string, w: number): string {
  const sw = Math.max(0,Math.trunc(w));
  const c = truncateToWidth(text,sw,"");
  return c+" ".repeat(Math.max(0,sw-visibleWidth(c)));
}

function spacedRow(l: string, r: string, w: number): string {
  const sw = Math.max(0,Math.trunc(w));
  const rw = visibleWidth(r);
  const lm = Math.max(0,sw-rw-1);
  const sl = truncateToWidth(l,lm,"");
  const gap = " ".repeat(Math.max(1,sw-visibleWidth(sl)-rw));
  return truncateToWidth(sl+gap+r,sw,"");
}

function valueRow(v: string|undefined, pal: ReturnType<typeof palette>, role: Role): string {
  const t = display(v); return pal.paint(t==="\u2014"?"dim":role,t);
}

// ── Frame system ──────────────────────────────────────────────────────

function renderDock(rows: string[], w: number, h: number, pal: ReturnType<typeof palette>, resizing?: boolean): string[] {
  const sw = Math.max(0,Math.trunc(w)), sh = Math.max(0,Math.trunc(h));
  if (sw<=0||sh<=0) return [];
  const cw = Math.max(0,sw-2);
  const div = pal.paint(resizing?"warning":"dim","\u2502");
  const out: string[] = [];
  for (let i=0;i<sh;i++) {
    const c = truncateToWidth(rows[i]||"",cw,"");
    const pad = " ".repeat(Math.max(0,cw-visibleWidth(c)));
    out.push(truncateToWidth(div+" "+c+pad,sw,""));
  }
  return out;
}

interface Group { name: string; panel?: string; panelRole?: Role; panelJewel?: "\u2726"|"\u2727"; rows: string[]; required: boolean; dropRank: number; }

function panelRows(title: string, rows: string[], w: number, theme: any, role: Role, _jewel: string, pal: ReturnType<typeof palette>): string[] {
  const sw = Math.max(4,Math.trunc(w));
  const st = sanitize(title).toUpperCase();
  const cp = "\u2500 ";
  const cf = "\u2500".repeat(Math.max(0,sw-visibleWidth(cp)-visibleWidth(st)-1));
  const top = pal.paint(role,cp)+theme.bold(pal.paint(role,st))+" "+pal.paint(role,cf);
  const body: string[] = [];
  for (let i=0;i<rows.length;i++) {
    body.push(padToWidth(rows[i],sw));
  }
  return [top].concat(body).concat([""]);
}

function renderGroups(gs: Group[], w: number, theme: any, pal: ReturnType<typeof palette>): string[] {
  const out: string[] = [];
  for (let i=0;i<gs.length;) {
    const g = gs[i]; if (!g) break;
    if (!g.panel) { for (let ri=0;ri<g.rows.length;ri++) out.push(g.rows[ri]); i++; continue; }
    const rows: string[] = []; let n = i;
    while (gs[n]&&gs[n].panel===g.panel) {
      const gr = gs[n]; if (gr) for (let rj=0;rj<gr.rows.length;rj++) rows.push(gr.rows[rj]);
      n++;
    }
    if (rows.length>0) {
      const pr = panelRows(g.panel,rows,w,theme,g.panelRole||"accent",g.panelJewel||"\u2726",pal);
      for (let pk=0;pk<pr.length;pk++) out.push(pr[pk]);
    }
    i=n;
  }
  return out;
}

/**
 * Drop groups (smallest dropRank first, required/infinite never dropped) until
 * the rendered output fits the pane height. dropRank semantics:
 *   Infinity        — never dropped (required, e.g. resize banner)
 *   70..            — activity core
 *   25..            — context panel
 *   10..            — tasks / lower-priority panels
 */
function composeGroups(gs: Group[], h: number, w: number, theme: any, pal: ReturnType<typeof palette>): Group[] {
  let cand = gs.filter(function(g:Group){return g.rows.length>0;});
  while (renderGroups(cand,w,theme,pal).length > h) {
    let di = -1; let dr = Infinity;
    for (let i=0;i<cand.length;i++) {
      const g = cand[i]; if (g.required||g.dropRank>=dr) continue;
      dr = g.dropRank; di = i;
    }
    if (di===-1) return cand;
    cand = cand.filter(function(_:Group,idx:number){return idx!==di;});
  }
  return cand;
}


// ── Panel: ACTIVITY ───────────────────────────────────────────────────

function toolActivityRow(tool: any, cw: number, pal: ReturnType<typeof palette>, now: number): string {
  const safeName = sanitize(tool.name) || "tool";
  const safeSummary = sanitize(tool.summary);
  const statusTime = formatDuration(tool.durationMs ?? Math.max(0, now - tool.startedAt));
  const statusLabel = tool.status === "running" ? statusTime : tool.status+" "+statusTime;
  const statusW = visibleWidth(statusLabel);
  const nameW = Math.min(Math.max(visibleWidth(safeName), 4), 10, Math.max(0, cw));
  const summaryW = Math.max(0, cw - nameW - statusW - 2);
  const statusText = truncateToWidth(statusLabel, Math.max(0, cw - nameW - summaryW - 2), "");
  const row = padToWidth(pal.paint("muted", safeName), nameW)+" "+padToWidth(pal.paint(safeSummary?"primary":"dim", safeSummary||"—"), summaryW)+" "+pal.paint(tool.status==="failed"?"error":tool.status==="running"?"working":"ready", statusText);
  return truncateToWidth(row, cw, "");
}

function activityRows(s: PaneSnapshot, cw: number, pal: ReturnType<typeof palette>, theme: any, now: number): Group[] {
  const ra = s.runActivity;
  const rows: string[] = [];
  const hasActivity = ra.activeTools.length > 0 || ra.recentTools.length > 0 || ra.completedCount > 0 || ra.failedCount > 0;
  if (ra.phase !== "idle" || hasActivity) {
    // Run summary
    const runDur = ra.phase === "settled"
      ? formatDuration(ra.durationMs ?? Math.max(0, now - (ra.startedAt ?? now)))
      : formatDuration(Math.max(0, now - (ra.startedAt ?? now)));
    const sumRole: Role = ra.phase === "running" ? "working" : ra.failedCount > 0 ? "error" : "ready";
    if (ra.phase === "settled") {
      rows.push(pal.paint(sumRole, "Last run · "+runDur));
    } else {
      const label = ra.turnNumber === undefined ? "Run" : "Turn "+(ra.turnNumber);
      rows.push(pal.paint(sumRole, label+" · "+ra.phase+" "+runDur));
    }
    // Active tools
    const sortedActive = Array.from(ra.activeTools).sort(function(a: any, b: any) { return a[1].startedAt - b[1].startedAt || 0; });
    for (let ai=0; ai<sortedActive.length; ai++) {
      rows.push(toolActivityRow(sortedActive[ai][1], cw, pal, now));
    }
    // Recent tools (up to 3)
    const activeIds = new Set();
    for (let ai2=0; ai2<sortedActive.length; ai2++) activeIds.add(sortedActive[ai2][1].id);
    let recentShown = 0;
    for (let ri=0; ri<ra.recentTools.length && recentShown<3; ri++) {
      if (!activeIds.has(ra.recentTools[ri].id)) {
        rows.push(toolActivityRow(ra.recentTools[ri], cw, pal, now));
        recentShown++;
      }
    }
    // Aggregate
    if (ra.completedCount>0 || ra.failedCount>0) {
      rows.push(pal.paint(ra.failedCount>0?"error":"ready", "tools "+ra.completedCount+" done · "+ra.failedCount+" failed"));
    }
  }
  if (rows.length===0) rows.push(pal.paint("dim","No activity yet"));
  // Append ALERTS
  const alerts = statusDetailRows(s, pal);
  if (alerts.length>0) {
    for (let ai3=0;ai3<alerts.length;ai3++) rows.push(alerts[ai3]);
  }
  const ro: Role = ra.phase==="running"?"working":ra.failedCount>0?"error":"ready";
  return [{name:"activity",panel:"ACTIVITY",panelRole:ro,rows:rows,required:false,dropRank:70}];
}

// ── Panel: CONTEXT ────────────────────────────────────────────────────

function pctStr(v: number, total: number): string {
  return total > 0 ? "(" + Math.round(v / total * 100) + "%)" : "";
}

function contextRows(s: PaneSnapshot, cw: number, pal: ReturnType<typeof palette>): string[] {
  const rows: string[] = [];
  const sep = "  ";

  function mv(label: string, value: string, role: Role): string {
    return pal.paint("muted", label) + " " + pal.paint(role, value);
  }

  function fmtPct(v: number, total: number): string {
    return total > 0 ? Math.round(v / total * 100) + "%" : "";
  }

  function catVal(tokens: number, total: number): string {
    return formatTokens(tokens) + "/" + fmtPct(tokens, total);
  }

  // ── Usage stats ──
  if (s.usageAvailable) {
    const inStr = mv("In", formatTokens(s.inputTokens), "input");
    const outStr = mv("Out", formatTokens(s.outputTokens), "output");
    if (s.costAvailable && Number.isFinite(s.cost) && s.cost > 0) {
      const costStr = mv("Cost", "$" + s.cost.toFixed(3), "cost");
      const trio = inStr + sep + outStr + sep + costStr;
      if (visibleWidth(trio) <= cw) {
        rows.push(trio);
      } else {
        rows.push(inStr + sep + outStr);
        rows.push(costStr);
      }
    } else {
      rows.push(inStr + sep + outStr);
    }

    const hitText = s.cacheHitPercent !== undefined && Number.isFinite(s.cacheHitPercent) ? s.cacheHitPercent.toFixed(1) + "%" : "—";
    const cacheStr = mv("Cache", formatTokens(s.cacheRead), "cache");
    const hitStr = mv("Hit", hitText, hitText === "—" ? "dim" : "cache");
    rows.push(visibleWidth(cacheStr + sep + hitStr) <= cw ? cacheStr + sep + hitStr : cacheStr);
  }

  // ── Category breakdown ──
  const catTotal = s.systemTokens + s.userTokens + s.toolTokens + s.thinkTokens + s.compactTokens + s.assistantTokens;
  if (catTotal > 0) {
    rows.push("");
    function catLine(label: string, val: string, role: Role): string {
      return mv(label, val, role);
    }
    function catPair(aLabel: string, aVal: string, aRole: Role, bLabel: string, bVal: string, bRole: Role): void {
      if (!bVal && !aVal) return;
      if (!bVal) { rows.push(catLine(aLabel, aVal, aRole)); return; }
      const left = catLine(aLabel, aVal, aRole);
      const right = catLine(bLabel, bVal, bRole);
      rows.push(visibleWidth(left + sep + right) <= cw ? left + sep + right : left);
      if (visibleWidth(left + sep + right) > cw) rows.push(right);
    }
    catPair("System", catVal(s.systemTokens, catTotal), "accent", "Compact", catVal(s.compactTokens, catTotal), "dim");
    catPair("Tool",   catVal(s.toolTokens, catTotal), "warning", "Think",   catVal(s.thinkTokens, catTotal), "context");
    catPair("User",   catVal(s.userTokens, catTotal), "input", "Answer", catVal(s.assistantTokens, catTotal), "primary");
  }

  // ── Free ──
  const totalWindow = s.inputTokens + s.outputTokens + s.cacheRead;
  if (s.contextWindow > 0 && totalWindow <= s.contextWindow) {
    const freeTokens = s.contextWindow - totalWindow;
    rows.push("");
    rows.push(mv("Free", catVal(freeTokens, s.contextWindow), "dim"));
  }

  if (rows.length === 0) rows.push(pal.paint("dim", "No usage data"));
  return rows;
}


// ── Panel: ALERTS (ported from pi-atelier) ────────────────────────────

const exceptionStatusPattern = /\b(error|failed?|failure|warn(?:ing)?|offline|unavailable|blocked|degraded)\b/i;

function statusDetailRows(s: PaneSnapshot, pal: ReturnType<typeof palette>): string[] {
  if (!s.extensionStatuses || s.extensionStatuses.length===0) return [pal.paint("dim","No alerts")];
  const statuses = s.extensionStatuses.filter(function(st: string){
    return st && exceptionStatusPattern.test(st);
  });
  if (statuses.length===0) return [pal.paint("dim","No alerts")];
  return statuses.map(function(st: string){
    const role: Role = /\b(error|failed?|failure|offline|unavailable)\b/i.test(st) ? "error" : "warning";
    return pal.paint(role, (role==="error"?"\u2715":"\u25B2")+" "+st);
  });
}

// ── Panel: WORKS (pi-work todo integration, moved from AGENTS pane) ───

function worksRows(s: PaneSnapshot, cw: number, pal: ReturnType<typeof palette>): string[] {
  if (!s.worksData || !s.worksData.columns || s.worksData.columns.length===0) return [];
  const rows: string[] = [];
  for (let ci=0; ci<s.worksData.columns.length; ci++) {
    const col = s.worksData.columns[ci];
    if (!col || !col.todos || col.todos.length===0) continue;
    rows.push(pal.paint("accent", col.agent));
    for (let ti=0; ti<col.todos.length; ti++) {
      const td = col.todos[ti];
      const mark = td.done ? pal.paint("ready","\u2611") : pal.paint("dim","\u2610");
      rows.push(mark+" "+sanitize(td.description));
    }
    rows.push("");
  }
  return rows;
}

// ── Main render ───────────────────────────────────────────────────────

export function renderPaneLines(
  snapshot: PaneSnapshot, width: number, height: number, theme: any, color: boolean, nowTs?: number, resizing?: boolean,
): string[] {
  if (nowTs===undefined) nowTs = Date.now();
  const pal = palette(theme,color);
  const sw = Math.max(0,Math.trunc(width)), sh = Math.max(0,Math.trunc(height));
  if (sw<=0||sh<=0) return [];
  const cw = Math.max(0,sw-2);
  const pcw = Math.max(0,cw-4);

  const groups: Group[] = [];
  if (resizing) groups.push({name:"resize",rows:[pal.paint("warning","RESIZE \u00B7 drag divider"),""],required:true,dropRank:Infinity});

  groups.push({name:"context",panel:"CONTEXT",panelRole:"output",
    rows:contextRows(snapshot,pcw,pal),required:false,dropRank:25});

  const ag = activityRows(snapshot,pcw,pal,theme,nowTs);
  for (let ai=0;ai<ag.length;ai++) groups.push(ag[ai]);

  const tasks = worksRows(snapshot,pcw,pal);
  if (tasks.length>0) groups.push({name:"tasks",panel:"TASKS",
    panelRole:"accent",rows:tasks,required:false,dropRank:10});

  return renderDock(
    renderGroups(composeGroups(groups,sh,cw,theme,pal),cw,theme,pal),
    sw,sh,pal,resizing,
  );
}

// ── Component ─────────────────────────────────────────────────────────

export function createPaneComponent(
  getSnapshot: () => PaneSnapshot,
  getTheme: () => any,
  getHeight: () => number,
  isResizing?: () => boolean,
): Component {
  const color = !("NO_COLOR" in process.env);
  return {
    render: function (width: number) {
      try {
        return renderPaneLines(getSnapshot(), width, getHeight(), getTheme(), color, Date.now(),
          isResizing ? isResizing() : false);
      } catch (_e) {
        return ["Pane unavailable"];
      }
    },
    invalidate: function () {},
  };
}

// ── Controller ────────────────────────────────────────────────────────

export interface PaneController {
  show(): void; hide(): void; toggle(): void; isVisible(): boolean;
  beginResize(): boolean; isResizing(): boolean; getWidth(): number;
  requestRender(): void; dispose(): void;
}

export interface PaneControllerOptions {
  ctx: ExtensionContext;
  getSnapshot(): PaneSnapshot;
  onWarning?(message: string): void;
  onError?(error: unknown): void;
}

export function createPaneController(options: PaneControllerOptions): PaneController {
  let enabled = false, disposed = false, generation = 0;
  let closeOverlay: (()=>void)|undefined, requestOverlayRender: (()=>void)|undefined;
  let splitRequestRender: (()=>void)|undefined;

  const reportError = (e: unknown) => { try { if(options.onError)options.onError(e); } catch(_){} };
  const safely = (a: ()=>unknown): boolean => { try { a(); return true; } catch(e) { reportError(e); return false; } };

  const split: SplitController = createSplitController({
    subscribeInput: function(h: any) { return options.ctx.ui.onTerminalInput(h); },
    onResizeChange: function() {
      safely(function(){ if(requestOverlayRender)requestOverlayRender(); });
      safely(function(){ if(splitRequestRender)splitRequestRender(); });
    },
    onWarning: options.onWarning, onError: options.onError,
  });

  const clear = () => { closeOverlay=undefined; requestOverlayRender=undefined; splitRequestRender=undefined; };

  function hide() {
    if (!enabled && !closeOverlay && !split.isEnabled()) return;
    enabled=false; generation=generation+1;
    safely(split.cancelResize);
    if (closeOverlay) safely(closeOverlay);
    clear(); safely(split.hide);
  }

  function show() {
    if (disposed||enabled) return;
    if (options.ctx.mode!=="tui") { reportError(new Error("Pane requires TUI mode")); return; }
    enabled=true; const cg = ++generation;
    if (!safely(split.show)) { enabled=false; clear(); safely(split.hide); return; }
    try {
      const pending = options.ctx.ui.custom<void>(
        function(tui: any, theme: any, _kb: any, done: any) {
          let closed=false; const close=function(){if(closed)return;closed=true;done(undefined);};
          const component = createPaneComponent(
            options.getSnapshot,
            function(){return theme;},
            function(){return tui.terminal.rows;},
            split.isResizing,
          );
          if (!safely(function(){split.attach(tui, component);})) {
            enabled=false;generation=generation+1;clear();safely(split.hide);safely(close);
          } else {
            splitRequestRender=function(){tui.requestRender();};
            if (enabled&&generation===cg) { closeOverlay=close; requestOverlayRender=function(){tui.requestRender();}; }
            else { close(); }
          }
          return component;
        },
        {
          overlay: true,
          overlayOptions: function(){return split.overlayOptions();},
        },
      );
      pending.catch(reportError).finally(function(){
        if (generation!==cg) return;
        enabled=false; clear(); safely(split.hide);
      });
    } catch(error) {
      if (generation===cg) { enabled=false; clear(); safely(split.hide); }
      reportError(error);
    }
  }

  return {
    show:show, hide:hide,
    toggle:function(){if(enabled)hide();else show();},
    isVisible:function(){return enabled;},
    beginResize:split.beginResize, isResizing:split.isResizing, getWidth:split.getPaneWidth,
    requestRender:function(){
      safely(function(){if(requestOverlayRender)requestOverlayRender();});
      safely(split.requestRender);
    },
    dispose:function(){if(disposed)return;disposed=true;hide();safely(split.dispose);},
  };
}
