/**
 * Extension loaded into sub-agents.
 * - Shows agent identity + available tools as a styled widget above the editor (toggle with Ctrl+Alt+O)
 * - Provides an `ask_question` tool for asking the parent orchestrator a question
 *
 * Subagents do NOT self-terminate via a tool. Auto-exit agents shut down
 * automatically when their agent loop ends (see the `agent_end` handler);
 * interactive agents end when the human exits the pane.
 *
 * `ask_question` keeps the session OPEN: it writes a `${sessionFile}.ask`
 * signal the parent's watcher picks up, parks the session in a "waiting" state
 * (auto-exit is suppressed for that turn via `awaitingAnswer`), and the parent
 * replies with subagent_message — which lands as the subagent's next turn.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Box, Text } from "@earendil-works/pi-tui";
import { Type } from "@sinclair/typebox";
import { writeFileSync } from "node:fs";
import { createSubagentActivityRecorder } from "./activity.ts";

const AskQuestionItemSchema = Type.Object({
	label: Type.Optional(Type.String({ description: "Tab label (defaults to Q1, Q2…)" })),
	question: Type.String({ description: "The question text." }),
	details: Type.Optional(Type.String({ description: "Optional extra context shown under the question." })),
	options: Type.Optional(
		Type.Array(
			Type.Object({
				label: Type.String(),
				value: Type.Optional(Type.String()),
				description: Type.Optional(Type.String()),
			}),
		),
	),
	multiSelect: Type.Optional(Type.Boolean()),
});

const AskQuestionParams = Type.Object({
	question: Type.Optional(
		Type.String({ description: "Single freeform question — either this or `questions` is required." }),
	),
	questions: Type.Optional(
		Type.Array(AskQuestionItemSchema, {
			description:
				"Batch several questions in one call — the main session shows them as a tabbed window with per-question options.",
		}),
	),
});

export function shouldMarkUserTookOver(agentStarted: boolean): boolean {
  return agentStarted;
}

/**
 * Number of child subagents this session itself still has in flight.
 *
 * When this extension is loaded inside a subagent that can spawn its own
 * children (e.g. a worker delegating to scout/researcher), `index.ts` runs in
 * the same process and publishes a live count through a shared process-global
 * symbol. A subagent that spawns children and then writes a "waiting for
 * results" message would otherwise auto-exit the instant that turn ends —
 * killing the session before its children report back. Reading this count lets
 * `agent_end` keep the session open until every child has finished and its
 * result has been delivered.
 *
 * Returns 0 when the spawning tools aren't loaded (scout/researcher, or a
 * standalone session), so those agents auto-exit exactly as before.
 */
export function runningChildrenCount(): number {
  const fn = (globalThis as any)[Symbol.for("pi-subagents/running-children-count")];
  if (typeof fn !== "function") return 0;
  try {
    const n = fn();
    return typeof n === "number" && n > 0 ? n : 0;
  } catch {
    return 0;
  }
}

export function shouldAutoExitOnAgentEnd(
  messages: any[] | undefined,
): boolean {
  // Manual input should not strand an auto-exit subagent. If the latest agent
  // turn completed normally, close the session. Escape/abort still leaves it
  // open for inspection or another prompt.
  //
  // stopReason: "error" (e.g. exhausted retries on a provider overload) also
  // returns true — we want to shut down so the parent is woken up — but we
  // pair this with findLatestAssistantError() so the parent learns it was an
  // error, not a clean completion.
  if (messages) {
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      if (msg?.role === "assistant") {
        return msg.stopReason !== "aborted";
      }
    }
  }

  return true;
}

export interface SubagentErrorInfo {
  errorMessage: string;
  stopReason: "error";
}

/**
 * If the last assistant message in the turn ended with `stopReason: "error"`
 * (typically auto-retry exhausted on an overload / rate limit / server error),
 * return its error info so the parent orchestrator can surface a clear
 * failure instead of silently treating the run as completed.
 *
 * Returns `null` when the latest assistant turn completed normally or was
 * aborted by the user (handled separately by shouldAutoExitOnAgentEnd).
 */
export function findLatestAssistantError(
  messages: any[] | undefined,
): SubagentErrorInfo | null {
  if (!messages) return null;
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg?.role !== "assistant") continue;
    if (msg.stopReason !== "error") return null;
    const raw = typeof msg.errorMessage === "string" ? msg.errorMessage.trim() : "";
    return {
      errorMessage: raw || "Subagent agent loop ended with stopReason=error (no errorMessage field).",
      stopReason: "error",
    };
  }
  return null;
}

export function parseDeniedTools(rawValue: string | undefined): string[] {
  return (rawValue ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export default function (pi: ExtensionAPI) {
  let toolNames: string[] = [];
  let denied: string[] = [];
  let expanded = false;

  // Read subagent identity from env vars (set by parent orchestrator)
  const subagentName = process.env.PI_SUBAGENT_NAME ?? "";
  const subagentAgent = process.env.PI_SUBAGENT_AGENT ?? "";
  const deniedToolsValue = process.env.PI_DENY_TOOLS;
  const autoExit = process.env.PI_SUBAGENT_AUTO_EXIT === "1";
  const recorder = createSubagentActivityRecorder({
    runningChildId: process.env.PI_SUBAGENT_ID,
    activityFile: process.env.PI_SUBAGENT_ACTIVITY_FILE,
  });

  function renderWidget(ctx: { ui: { setWidget: Function } }, _theme: any) {
    // RPC mode is headless; widgets/shortcuts are TUI-only.
    if ((ctx as any).mode !== "tui") return;
    ctx.ui.setWidget(
      "subagent-tools",
      (_tui: any, theme: any) => {
        const box = new Box(1, 0, (text: string) => theme.bg("toolSuccessBg", text));

        const label = subagentAgent || subagentName;
        const agentTag = label ? theme.bold(theme.fg("accent", `[${label}]`)) : "";

        if (expanded) {
          // Expanded: full tool list + denied
          const countInfo = theme.fg("dim", ` — ${toolNames.length} available`);
          const hint = theme.fg("muted", "  (Ctrl+Alt+O to collapse)");

          const toolList = toolNames
            .map((name: string) => theme.fg("dim", name))
            .join(theme.fg("muted", ", "));

          let deniedLine = "";
          if (denied.length > 0) {
            const deniedList = denied
              .map((name: string) => theme.fg("error", name))
              .join(theme.fg("muted", ", "));
            deniedLine = "\n" + theme.fg("muted", "denied: ") + deniedList;
          }

          const content = new Text(
            `${agentTag}${countInfo}${hint}\n${toolList}${deniedLine}`,
            0,
            0,
          );
          box.addChild(content);
        } else {
          // Collapsed: one-line summary
          const countInfo = theme.fg("dim", ` — ${toolNames.length} tools`);
          const deniedInfo =
            denied.length > 0
              ? theme.fg("dim", " · ") + theme.fg("error", `${denied.length} denied`)
              : "";
          const hint = theme.fg("muted", "  (Ctrl+Alt+O to expand)");

          const content = new Text(`${agentTag}${countInfo}${deniedInfo}${hint}`, 0, 0);
          box.addChild(content);
        }

        return box;
      },
      { placement: "aboveEditor" },
    );
  }

  let userTookOver = false;
  let agentStarted = false;
  // Set when ask_question is called; suppresses auto-exit so the session stays
  // open while it waits for the orchestrator's reply. Cleared when the reply
  // lands — on `input` (covers a reply steered into the current run) and on
  // `agent_start` (covers a reply that starts a fresh turn after parking).
  let awaitingAnswer = false;

  // Show widget + status bar on session start
  pi.on("session_start", (_event, ctx) => {
    recorder.sessionStart();
    // RPC mode is headless: the tools widget and its component factory are
    // TUI-only (RPC ignores component factories). Activity recording and the
    // ask_question tool still work.
    if ((ctx as any).mode !== "tui") return;
    const tools = pi.getAllTools();
    toolNames = tools.map((t) => t.name).sort();
    denied = parseDeniedTools(deniedToolsValue);

    renderWidget(ctx, null);
  });

  pi.on("input", () => {
    recorder.input();
    // A submitted message is the orchestrator's (or a human's) reply — the
    // pending ask_question has been answered, however it was delivered. Clear
    // here, not only on agent_start, because a reply steered in *mid-run* is
    // absorbed into the current run (pi's `steer` behavior injects it before
    // the next LLM call): no new agent_start fires, so without this the flag
    // would stay set and agent_end would park the session as `waiting` even
    // though the answer already arrived and was consumed. (The `input` event
    // fires for mid-run steers because prompt() emits it before queueing.)
    awaitingAnswer = false;
    // Ignore the initial task message that starts an autonomous subagent.
    // Only inputs after the first agent run has started count as user takeover.
    if (!shouldMarkUserTookOver(agentStarted)) return;
    userTookOver = true;
  });

  pi.on("before_agent_start", () => {
    recorder.beforeAgentStart();
  });

  pi.on("agent_start", () => {
    agentStarted = true;
    // A new turn is starting — any pending ask_question has now been answered
    // (or superseded), so let auto-exit resume normally when this turn ends.
    awaitingAnswer = false;
    recorder.agentStart();
  });

  pi.on("agent_end", (event, ctx) => {
    const messages = (event as any).messages as any[] | undefined;
    // Never shut down while this session still has work in flight:
    //  - awaitingAnswer: an ask_question is pending the orchestrator's reply.
    //  - runningChildrenCount(): this subagent spawned its own children and is
    //    waiting for their results (delivered as steered turns). Exiting now
    //    would strand those children and drop their results.
    // In both cases the session parks as `waiting` and resumes when the next
    // turn lands.
    const hasPendingChildren = runningChildrenCount() > 0;
    const shouldExit =
      !awaitingAnswer &&
      !hasPendingChildren &&
      autoExit &&
      shouldAutoExitOnAgentEnd(messages);

    if (shouldExit) {
      // Surface stopReason: "error" turns (auto-retry exhausted, provider
      // overload, etc.) to the parent via the .exit sidecar so the watcher
      // can report a clear failure with the underlying error message.
      // Without this the parent would only see exit code 0 and a stale
      // assistant message, mistaking the crash for a successful completion.
      const errorInfo = findLatestAssistantError(messages);
      const sessionFile = process.env.PI_SUBAGENT_SESSION;
      if (errorInfo && sessionFile) {
        try {
          writeFileSync(
            `${sessionFile}.exit`,
            JSON.stringify({
              type: "error",
              errorMessage: errorInfo.errorMessage,
              stopReason: errorInfo.stopReason,
            }),
          );
        } catch {
          // Best effort — even without the sidecar, watcher's session-file
          // fallback can still recover the errorMessage.
        }
      }

      recorder.agentEndDone();
      ctx.shutdown();
      return;
    }

    recorder.agentEndWaiting();
    if (autoExit) {
      // Reset any recorded manual input marker. Auto-exit is decided by whether
      // the latest agent turn completed normally, not by who initiated it.
      userTookOver = false;
    }
  });

  pi.on("turn_start", (event) => {
    recorder.turnStart((event as any).turnIndex);
  });

  pi.on("turn_end", (event) => {
    recorder.turnEnd((event as any).turnIndex);
  });

  pi.on("before_provider_request", () => {
    recorder.beforeProviderRequest();
  });

  pi.on("after_provider_response", () => {
    recorder.afterProviderResponse();
  });

  pi.on("message_update", (event) => {
    recorder.messageUpdate((event as any).assistantMessageEvent?.type);
  });

  pi.on("tool_execution_start", (event) => {
    recorder.toolExecutionStart((event as any).toolCallId, (event as any).toolName);
  });

  pi.on("tool_call", (event) => {
    recorder.toolCall((event as any).toolCallId, (event as any).toolName);
  });

  pi.on("tool_execution_update", (event) => {
    recorder.toolExecutionUpdate((event as any).toolCallId, (event as any).toolName);
  });

  pi.on("tool_result", (event) => {
    recorder.toolResult((event as any).toolCallId, (event as any).toolName);
  });

  pi.on("tool_execution_end", (event) => {
    recorder.toolExecutionEnd((event as any).toolCallId, (event as any).toolName);
  });

  pi.on("session_shutdown", (event) => {
    recorder.sessionShutdown((event as any).reason);
  });

  // Toggle expand/collapse with Ctrl+Alt+O
  pi.registerShortcut("ctrl+alt+o", {
    description: "Toggle subagent tools widget",
    handler: (ctx) => {
      expanded = !expanded;
      renderWidget(ctx, null);
    },
  });

  pi.registerTool({
    name: "ask_question",
    label: "ask_question",
    description:
      "Ask the orchestrator (the parent agent that spawned you) one or more questions and pause until they reply. " +
      "Pass `questions: [...]` to ask several at once — the main session shows a tabbed window with per-question options. " +
      "Use this when requirements are ambiguous, a decision would materially affect your work, you're blocked, " +
      "or you need information or confirmation only the orchestrator has. Prefer asking over guessing. " +
      "Your session stays open while you wait — the answers arrive as your next message, then you continue.",
    promptSnippet:
      "Use this tool to ask the orchestrator one clarifying, missing-requirement, preference, or decision question (or several via `questions: [...]`) before continuing — instead of guessing.",
    promptGuidelines: [
      "Ask one question per entry in `questions`; use the array for several at once instead of bundling them into a prompt or making separate calls.",
      "Including options is optional — omit them for freeform answers, or provide them so the user can pick quickly.",
      "Prefer this tool over guessing when requirements, preferences, or implementation choices are unclear.",
      "Use it when multiple valid paths exist and the right one depends on the orchestrator's intent.",
      "Give enough context in each question that the orchestrator can answer without re-reading your whole task.",
      "After asking, stop and wait — the replies will arrive as your next message.",
    ],
    parameters: AskQuestionParams,
    async execute(_toolCallId, params, _signal, _onUpdate, _ctx) {
      const sessionFile = process.env.PI_SUBAGENT_SESSION;
      if (!sessionFile) {
        throw new Error(
          "ask_question is only available in subagent contexts. " +
            "PI_SUBAGENT_SESSION environment variable is not set.",
        );
      }

      const rawItems = Array.isArray(params.questions) && params.questions.length > 0
        ? params.questions
        : [{ question: params.question }];
      const items = (rawItems as any[]).filter(
        (q) => typeof q?.question === "string" && q.question.trim().length > 0,
      );
      if (items.length === 0) {
        throw new Error("ask_question requires a non-empty `question` or `questions[]`.");
      }

      // Keep the session open: suppress auto-exit for this turn and park in the
      // "waiting" phase. The parent's watcher picks up the `.ask` signal and
      // asks the user in the main session, then replies via steer.
      awaitingAnswer = true;
      recorder.askQuestion();
      const askData = {
        name: process.env.PI_SUBAGENT_NAME ?? "subagent",
        agent: process.env.PI_SUBAGENT_AGENT ?? "",
        questions: items,
      };
      writeFileSync(`${sessionFile}.ask`, JSON.stringify(askData));

      return {
        content: [
          {
            type: "text",
            text:
              items.length > 1
                ? `${items.length} questions sent to the orchestrator. Stop here and wait — do not continue working or assume answers. The replies will arrive as your next message.`
                : "Question sent to the orchestrator. Stop here and wait — do not continue working or assume an answer. The reply will arrive as your next message.",
          },
        ],
        details: {
          questions: items.map((q: any, i: number) => ({
            label: typeof q?.label === "string" && q.label.trim() ? q.label.trim() : `Q${i + 1}`,
            question: q.question,
          })),
        },
      };
    },

    renderCall(args, theme) {
      const argsAny = args as any;
      const multi = Array.isArray(argsAny.questions) && argsAny.questions.length > 0;
      if (multi) {
        const labels = (argsAny.questions as any[])
          .map((q: any, i: number) => q.label?.trim() || `Q${i + 1}`)
          .join(", ");
        return new Text(
          theme.fg("toolTitle", theme.bold("ask_question ")) +
            theme.fg("muted", `${argsAny.questions.length} questions`),
          0,
          0,
        );
      }
      const text =
        theme.fg("toolTitle", theme.bold("ask_question ")) +
        theme.fg("muted", String(argsAny.question ?? ""));
      return new Text(text, 0, 0);
    },
  });

  // Non-auto-exit agents (interactive / headless RPC) close themselves when
  // done. Auto-exit agents omit this tool and shut down on agent_end instead.
  if (!autoExit) {
    pi.registerTool({
      name: "subagent_done",
      label: "Subagent Done",
      description:
        "Call this tool when you have completed your task. " +
        "It will close this session and return your results to the orchestrator. " +
        "Your LAST assistant message before calling this becomes the summary returned to the caller.",
      parameters: Type.Object({}),
      async execute(_toolCallId, _params, _signal, _onUpdate, ctx) {
        const sessionFile = process.env.PI_SUBAGENT_SESSION;
        if (sessionFile) {
          try {
            writeFileSync(`${sessionFile}.exit`, JSON.stringify({ type: "done" }));
          } catch {
            // Best effort — the watcher can still detect shutdown.
          }
        }
        ctx.shutdown();
        return {
          content: [{ type: "text", text: "Shutting down subagent session." }],
          details: {},
        };
      },
    });
  }

}
