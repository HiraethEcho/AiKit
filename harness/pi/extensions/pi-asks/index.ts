import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { Text, Editor, Key, matchesKey, visibleWidth, wrapTextWithAnsi } from "@earendil-works/pi-tui";
import { Type, type Static } from "typebox";
import { getBus, Events } from "./bus.js";
import { connect } from "node:net";
import { randomUUID } from "node:crypto";

// ── Types ────────────────────────────────────────────────────────────────

interface Question {
  id: string;
  label: string;
  prompt: string;
  description?: string;
  options: Array<{ value: string; label: string; description?: string }>;
  allowOther: boolean;
  recommended?: number;
}

interface Answer {
  id: string;
  value: string;
  label: string;
  wasCustom: boolean;
  index?: number;
}

interface AskResult {
  questions: Question[];
  answers: Answer[];
  cancelled: boolean;
}

// ── Schema ────────────────────────────────────────────────────────────────

const OptionItem = Type.Object({
  value: Type.String({ description: "Value returned when selected" }),
  label: Type.String({ description: "Display label" }),
  description: Type.Optional(Type.String()),
});

const QuestionItem = Type.Object({
  id: Type.String({ description: "Unique id" }),
  label: Type.Optional(Type.String({ description: "Tab label (defaults to Q1, Q2…)" })),
  prompt: Type.String({ description: "Question text" }),
  description: Type.Optional(Type.String({ description: "Markdown/plain context" })),
  options: Type.Array(OptionItem, { description: "Options", minItems: 1 }),
  allowOther: Type.Optional(Type.Boolean({ description: "Allow custom input (default true)" })),
  recommended: Type.Optional(Type.Number({ description: "0-indexed recommended option" })),
});

const AskParams = Type.Object({
  questions: Type.Array(QuestionItem, { description: "Questions to ask", minItems: 1 }),
});

type AskParamsT = Static<typeof AskParams>;

// ── Default export ────────────────────────────────────────────────────────

export default function (pi: ExtensionAPI): void {
  const unsubscribes: Array<() => void> = [];
  let currentCtx: ExtensionContext | undefined;

  pi.on("session_start", (_e, ctx: ExtensionContext) => { currentCtx = ctx; });
  pi.on("turn_start", (_e, ctx: ExtensionContext) => { currentCtx = ctx; });

  // Bus: handle subagent ask requests
  unsubscribes.push(getBus().on(Events.ASK_REQUEST, async (payload: unknown) => {
    const data = payload as { source: string; requestId: string; questions: Question[] };
    if (!currentCtx?.ui) return;
    const result = await runAskUI(currentCtx, data.questions);
    getBus().emit(Events.ASK_RESPONSE, {
      requestId: data.requestId,
      cancelled: result.cancelled,
      results: result.answers.map(a => ({
        id: a.id,
        value: a.value,
        label: a.label,
        wasCustom: a.wasCustom,
        index: a.index,
        selectedOptions: a.wasCustom ? [] : [a.value],
        customInput: a.wasCustom ? a.value : undefined,
      })),
    });
  }));

  pi.on("session_shutdown", () => {
    unsubscribes.forEach(fn => fn());
    unsubscribes.length = 0;
  });

  // Register ask tool
  pi.registerTool({
    name: "ask",
    label: "Ask",
    description:
      "Ask the user one or more questions. Use for clarifying requirements, getting preferences, or confirming decisions. Shows a TUI list for single questions or tabbed interface for multiple.",
    parameters: AskParams,

    async execute(_id: string, params: AskParamsT, _signal, _onUpdate, ctx: ExtensionContext) {
      if (!ctx.hasUI) {
        // Headless: connect via socket (subagent path)
        const requestId = randomUUID();
        const socketPath = process.env.PI_SUBAGENT_SOCKET;
        if (!socketPath) {
          return { content: [{ type: "text" as const, text: "No UI available and no socket bridge" }], isError: true };
        }
        const response = await askViaSocket(socketPath, requestId, params.questions);
        if (response.cancelled) {
          return { content: [{ type: "text" as const, text: "User cancelled." }], details: { answers: [], cancelled: true } };
        }
        const lines = response.answers.map((a: any) => `${a.id}: ${a.label}`);
        return { content: [{ type: "text" as const, text: lines.join("\n") }], details: { answers: response.answers, cancelled: false } };
      }

      // TUI mode
      if (params.questions.length === 0) {
        return { content: [{ type: "text" as const, text: "No questions provided" }], isError: true };
      }

      const questions: Question[] = params.questions.map((q, i) => ({
        ...q,
        label: q.label || `Q${i + 1}`,
        allowOther: q.allowOther !== false,
      }));

      const result = await runAskUI(ctx, questions);
      if (result.cancelled) {
        return { content: [{ type: "text" as const, text: "User cancelled." }], details: result };
      }
      const lines = result.answers.map(a => {
        const ql = questions.find(q => q.id === a.id)?.label || a.id;
        return a.wasCustom ? `${ql}: user wrote: ${a.label}` : `${ql}: ${a.index}. ${a.label}`;
      });
      return { content: [{ type: "text" as const, text: lines.join("\n") }], details: result };
    },

    renderCall(args: unknown, theme: any): any {
      const qs = ((args as any)?.questions as any[]) || [];
      let text = theme.fg("toolTitle", theme.bold("ask "));
      text += theme.fg("muted", `${qs.length} question${qs.length !== 1 ? "s" : ""}`);
      return new Text(text, 0, 0);
    },

    renderResult(result: any, _options: any, theme: any): any {
      const details = result?.details;
      if (!details) {
        const t = result?.content?.[0]?.text; return new Text(t ? String(t) : "", 0, 0);
      }
      if (details.cancelled) return new Text(theme.fg("warning", "Cancelled"), 0, 0);
      const lines = (details.answers || []).map((a: any) =>
        `${theme.fg("success", "✓ ")}${theme.fg("accent", a.id)}: ${a.wasCustom ? theme.fg("muted", "(wrote) ") + a.label : `${a.index}. ${a.label}`}`
      );
      return new Text(lines.join("\n"), 0, 0);
    },
  });
}

// ── TUI helper ────────────────────────────────────────────────────────────


async function runAskUI(ctx: ExtensionContext, questions: Question[]): Promise<AskResult> {
  const isMulti = questions.length > 1;
  const totalTabs = questions.length + 1; // + Submit

  return ctx.ui.custom<AskResult>((tui, theme, _kb, done) => {
    let currentTab = 0;
    let optionIndex = 0;
    let inputMode = false;
    let inputQuestionId: string | null = null;
    let cachedLines: string[] | undefined;
    const answers = new Map<string, Answer>();

    const editorTheme = {
      borderColor: (s: string) => theme.fg("accent", s),
      selectList: {
        selectedPrefix: (t: string) => theme.fg("accent", t),
        selectedText: (t: string) => theme.fg("accent", t),
        description: (t: string) => theme.fg("muted", t),
        scrollInfo: (t: string) => theme.fg("dim", t),
        noMatch: (t: string) => theme.fg("warning", t),
      },
    };
    const editor = new Editor(tui, editorTheme);

    function refresh() { cachedLines = undefined; tui.requestRender(); }

    function submit(cancelled: boolean) {
      done({ questions, answers: Array.from(answers.values()), cancelled });
    }

    function currentQuestion() { return questions[currentTab]; }

    function currentOptions() {
      const q = currentQuestion();
      if (!q) return [];
      const opts = q.options.map(o => ({ ...o, isOther: false }));
      if (q.allowOther) opts.push({ value: "__other__", label: "Type something.", description: undefined, isOther: true });
      return opts;
    }

    function allAnswered() { return questions.every(q => answers.has(q.id)); }

    function advanceAfterAnswer() {
      if (!isMulti) { submit(false); return; }
      if (currentTab < questions.length - 1) { currentTab++; }
      else { currentTab = questions.length; }
      optionIndex = 0;
      refresh();
    }

    editor.onSubmit = (value) => {
      if (!inputQuestionId) return;
      const trimmed = value.trim() || "(no response)";
      answers.set(inputQuestionId, { id: inputQuestionId, value: trimmed, label: trimmed, wasCustom: true });
      inputMode = false;
      inputQuestionId = null;
      editor.setText("");
      advanceAfterAnswer();
    };

    function handleInput(data: string) {
      if (inputMode) {
        if (matchesKey(data, Key.escape)) { inputMode = false; inputQuestionId = null; editor.setText(""); refresh(); return; }
        editor.handleInput(data); refresh(); return;
      }
      const q = currentQuestion();
      const opts = currentOptions();

      if (isMulti) {
        if (matchesKey(data, Key.tab) || matchesKey(data, Key.right)) { currentTab = (currentTab + 1) % totalTabs; optionIndex = 0; refresh(); return; }
        if (matchesKey(data, Key.shift("tab")) || matchesKey(data, Key.left)) { currentTab = (currentTab - 1 + totalTabs) % totalTabs; optionIndex = 0; refresh(); return; }
      }
      if (currentTab === questions.length) {
        if (matchesKey(data, Key.enter) && allAnswered()) submit(false);
        else if (matchesKey(data, Key.escape)) submit(true);
        return;
      }
      if (matchesKey(data, Key.up)) { optionIndex = Math.max(0, optionIndex - 1); refresh(); return; }
      if (matchesKey(data, Key.down)) { optionIndex = Math.min(opts.length - 1, optionIndex + 1); refresh(); return; }
      if (matchesKey(data, Key.enter) && q) {
        const opt = opts[optionIndex];
        if (opt.isOther) { inputMode = true; inputQuestionId = q.id; editor.setText(""); refresh(); return; }
        answers.set(q.id, { id: q.id, value: opt.value, label: opt.label, wasCustom: false, index: optionIndex + 1 });
        advanceAfterAnswer(); return;
      }
      if (matchesKey(data, Key.escape)) submit(true);
    }

    function render(width: number): string[] {
      if (cachedLines) return cachedLines;
      const lines: string[] = [];
      const rw = Math.max(1, width);
      const q = currentQuestion();
      const opts = currentOptions();

      function addW(t: string) { lines.push(...wrapTextWithAnsi(t, rw)); }
      function addWP(prefix: string, text: string) {
        const pw = visibleWidth(prefix);
        if (pw >= rw) { addW(prefix + text); return; }
        const wrapped = wrapTextWithAnsi(text, rw - pw);
        const cp = " ".repeat(pw);
        for (let i = 0; i < wrapped.length; i++) lines.push(`${i === 0 ? prefix : cp}${wrapped[i]}`);
      }

      lines.push(theme.fg("accent", "─".repeat(rw)));

      if (isMulti) {
        const tabs: string[] = ["← "];
        for (let i = 0; i < questions.length; i++) {
          const active = i === currentTab;
          const answered = answers.has(questions[i].id);
          const box = answered ? "●" : "○";
          const color = answered ? "success" : "muted";
          const text = ` ${box} ${questions[i].label} `;
          tabs.push(`${active ? theme.bg("selectedBg", theme.fg("text", text)) : theme.fg(color, text)} `);
        }
        const canSubmit = allAnswered();
        const isSubmit = currentTab === questions.length;
        const st = " ✓ Submit ";
        tabs.push(isSubmit ? theme.bg("selectedBg", theme.fg("text", st)) : theme.fg(canSubmit ? "success" : "dim", st));
        tabs.push(" →");
        addWP(" ", tabs.join(""));
        lines.push("");
      }

      if (inputMode && q) {
        addWP(" ", theme.fg("text", q.prompt));
        lines.push("");
        for (let i = 0; i < opts.length; i++) {
          const sel = i === optionIndex;
          const prefix = sel ? theme.fg("accent", "> ") : "  ";
          addWP(prefix, theme.fg(sel ? "accent" : "text", `${i + 1}. ${opts[i].label}${opts[i].isOther ? " ✎" : ""}`));
        }
        lines.push("");
        addWP(" ", theme.fg("muted", "Your answer:"));
        for (const line of editor.render(Math.max(1, rw - 2))) lines.push(` ${line}`);
        lines.push("");
        addWP(" ", theme.fg("dim", "Enter to submit • Esc to cancel"));
      } else if (currentTab === questions.length) {
        addWP(" ", theme.fg("accent", theme.bold("Ready to submit")));
        lines.push("");
        for (const question of questions) {
          const a = answers.get(question.id);
          if (a) {
            const prefix = a.wasCustom ? "(wrote) " : "";
            addWP(" ", `${theme.fg("muted", `${question.label}: `)}${theme.fg("text", prefix + a.label)}`);
          }
        }
        lines.push("");
        addWP(" ", allAnswered() ? theme.fg("success", "Enter to submit") : theme.fg("warning", "Unanswered questions"));
      } else if (q) {
        addWP(" ", theme.fg("text", q.prompt));
        if (q.description) { lines.push(""); addWP(" ", theme.fg("muted", q.description)); }
        lines.push("");
        for (let i = 0; i < opts.length; i++) {
          const sel = i === optionIndex;
          const prefix = sel ? theme.fg("accent", "> ") : "  ";
          let label = `${i + 1}. ${opts[i].label}`;
          if (q.recommended === i) label += " " + theme.fg("success", "(Recommended)");
          addWP(prefix, theme.fg(sel ? "accent" : "text", label));
          if (opts[i].description) addWP("     ", theme.fg("muted", opts[i].description));
        }
      }

      lines.push("");
      if (!inputMode) addWP(" ", theme.fg("dim", isMulti ? "Tab/←→ navigate • ↑↓ select • Enter confirm • Esc cancel" : "↑↓ navigate • Enter select • Esc cancel"));
      lines.push(theme.fg("accent", "─".repeat(rw)));

      cachedLines = lines;
      return lines;
    }

    return { render, invalidate: () => { cachedLines = undefined; }, handleInput };
  });
}

// ── Socket bridge (headless subagent path) ─────────────────────────────────

async function askViaSocket(socketPath: string, requestId: string, questions: QuestionItem[]): Promise<{ cancelled: boolean; answers: Answer[] }> {
  return new Promise<{ cancelled: boolean; answers: Answer[] }>((resolve) => {
    let resolved = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = (r: { cancelled: boolean; answers: Answer[] }) => { if (resolved) return; resolved = true; if (timer) clearTimeout(timer); resolve(r); };
    const socket = connect(socketPath, () => {
      socket.write(JSON.stringify({ type: "ask_request", requestId, questions }) + "\n");
    });
    let buf = "";
    socket.on("data", (data: Buffer) => {
      buf += data.toString();
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";
      for (const line of lines) {
        try {
          const msg = JSON.parse(line);
          if (msg.type === "ask_response" && msg.requestId === requestId) {
            socket.end();
            finish({ cancelled: msg.cancelled, answers: msg.results });
          }
        } catch { /* ignore */ }
      }
    });
    socket.on("error", () => finish({ cancelled: true, answers: [] }));
    socket.on("close", () => finish({ cancelled: true, answers: [] }));
    timer = setTimeout(() => { socket.end(); finish({ cancelled: true, answers: [] }); }, 5 * 60 * 1000);
    timer.unref();
  });
}
