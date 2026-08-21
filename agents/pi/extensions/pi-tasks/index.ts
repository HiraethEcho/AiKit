import type {
  ExtensionAPI, ExtensionCommandContext, ExtensionContext,
} from "@earendil-works/pi-coding-agent";
import { Text } from "@earendil-works/pi-tui";
import { Type, type Static } from "typebox";
import { getBus, Events, type TaskItem } from "./bus.js";

// ── State ────────────────────────────────────────────────────────────────

class TaskState {
  tasks: TaskItem[] = [];
  private readonly onChange: () => void;

  constructor(onChange: () => void) {
    this.onChange = onChange;
  }


  loadFromSession(ctx: ExtensionContext) {
    let last: TaskItem[] | undefined;
    for (const entry of ctx.sessionManager.getBranch()) {
      if (entry.type !== "message") continue;
      const msg = entry.message;
      if (msg.role !== "toolResult" || msg.toolName !== "manage_task_list") continue;
      const details = (msg as any).details as { taskList?: TaskItem[] } | undefined;
      if (details?.taskList) last = details.taskList;
    }
    // Resume only the latest write; drop it when everything is finished.
    this.tasks = last && !isAllCompleted(last) ? last.map(t => ({ ...t })) : [];
  }

  read(): TaskItem[] { return this.tasks; }

  write(items: TaskItem[]) {
    this.tasks = items;
    this.onChange();
  }

  clear() {
    this.tasks = [];
    this.onChange();
  }

}

function isAllCompleted(tasks: TaskItem[]): boolean {
  return tasks.length > 0 && tasks.every(t => t.status === "completed");
}


// ── Tool ──────────────────────────────────────────────────────────────────

const TASK_LIST_PARAMS = Type.Object({
  operation: Type.Enum({ read: "read", write: "write" }, { description: "read or write" }),
  taskList: Type.Optional(Type.Array(Type.Object({
    id: Type.Number({ description: "Unique identifier" }),
    title: Type.String({ description: "Short task title" }),
    description: Type.String({ description: "Task details" }),
    status: Type.Enum(
      { "not-started": "not-started", "in-progress": "in-progress", completed: "completed" },
      { description: "Task status" },
    ),
  }), { description: "Full task list (required for write)" })),
});

type TaskListParams = Static<typeof TASK_LIST_PARAMS>;

// ── Default export ────────────────────────────────────────────────────────

export default function (pi: ExtensionAPI): void {
  const state = new TaskState(() => refreshWidget());
  const subagentTasks = new Map<string, TaskItem[]>();
  const unsubscribes: Array<() => void> = [];
  let currentCtx: ExtensionContext | undefined;


  const bus = getBus();
  let widgetHidden = false; // user preference via /tasks hide

  const refreshWidget = () => {
    if (currentCtx && !widgetHidden) renderWidget(state, currentCtx, subagentTasks);
  };

  // Bus: subagent task updates
  unsubscribes.push(bus.on(Events.TASK_UPDATE, (payload: unknown) => {
    const data = payload as { source: string; tasks: TaskItem[] };
    if (data.source === "main") return;
    subagentTasks.set(data.source, data.tasks);
    refreshWidget();
  }));
  unsubscribes.push(bus.on(Events.TASK_CLEAR, (payload: unknown) => {
    const data = payload as { source: string };
    subagentTasks.delete(data.source);
    refreshWidget();
  }));

  // Session lifecycle
  const reconstruct = (ctx: ExtensionContext) => {
    currentCtx = ctx;
    state.loadFromSession(ctx);
    refreshWidget();
  };
  pi.on("session_start", async (_e, ctx) => reconstruct(ctx));
  pi.on("session_tree", async (_e, ctx) => reconstruct(ctx));
  pi.on("turn_start", async (_e, ctx) => { currentCtx = ctx; });
  // Next user input: drop all-completed lists (extension commands skip this event)
  pi.on("input", async (_e, ctx) => {
    currentCtx = ctx;
    const main = state.read();
    if (isAllCompleted(main)) {
      state.clear();
      ctx.ui.notify("Completed tasks cleared.", "info");
    }
    let dropped = false;
    for (const [source, tasks] of subagentTasks) {
      if (isAllCompleted(tasks)) {
        subagentTasks.delete(source);
        dropped = true;
      }
    }
    if (dropped) refreshWidget();
  });
  pi.on("turn_end", async (_e, ctx) => { currentCtx = ctx; refreshWidget(); });
  pi.on("session_shutdown", () => {
    unsubscribes.forEach(fn => fn());
    unsubscribes.length = 0;
    subagentTasks.clear();
    if (currentCtx) clearWidget(currentCtx);
  });

  // Register tool
  pi.registerTool({
    name: "manage_task_list",
    label: "Manage Task List",
    description: "Manage a structured task list to track progress. Use for complex multi-step work.",
    parameters: TASK_LIST_PARAMS,

    async execute(_id: string, params: TaskListParams, _signal, _onUpdate, ctx: ExtensionContext) {
      if (params.operation === "read") {
        return {
          content: [{ type: "text" as const, text: JSON.stringify(state.read(), null, 2) }],
          details: {},
        };
      }
      if (params.operation === "write") {
        if (!params.taskList) {
          return { content: [{ type: "text" as const, text: "taskList required for write" }], details: {}, isError: true };
        }
        state.write(params.taskList as TaskItem[]);
        return { content: [{ type: "text" as const, text: "Task list updated." }], details: { taskList: params.taskList } };
      }
      return { content: [{ type: "text" as const, text: "Unknown operation" }], details: {}, isError: true };
    },

    renderCall(args: unknown, theme: any): any {
      const p = args as Record<string, unknown> | undefined;
      const op = p?.operation as string | undefined;
      let label = theme.fg("toolTitle", theme.bold("tasks"));
      if (op) label += " " + theme.fg("accent", op);
      return new Text(label, 0, 0);
    },

    renderResult(result: any, _options: any, theme: any): any {
      const text = result?.content?.[0]?.text ?? "";
      return new Text(theme.fg("text", text), 0, 0);
    },
  });

  // Register /tasks commands
  pi.registerCommand("tasks", {
    description: "/tasks (refresh), /tasks show, /tasks hide, /tasks clear",
    handler: async (args: string, ctx: ExtensionCommandContext) => {
      currentCtx = ctx;
      const cmd = args?.trim().toLowerCase();
      if (cmd === "show") {
        widgetHidden = false;
        renderWidget(state, ctx, subagentTasks);
        ctx.ui.notify("Tasks widget shown.", "info");
        return;
      }
      if (cmd === "hide") {
        widgetHidden = true;
        clearWidget(ctx);
        ctx.ui.notify("Tasks widget hidden.", "info");
        return;
      }
      if (cmd === "clear") {
        state.clear();
        ctx.ui.notify("Tasks cleared.", "info");
        return;
      }
      // /tasks → refresh
      widgetHidden = false;
      renderWidget(state, ctx, subagentTasks);
      ctx.ui.notify("Tasks refreshed.", "info");
    },
  });
}

// ── Widget rendering ──────────────────────────────────────────────────────

function renderWidget(state: TaskState, ctx: ExtensionContext, subagentTasks: Map<string, TaskItem[]>) {
  const WIDGET_ID = "pi-tasks:widget";
  const mainTasks = state.read();
  if (mainTasks.length === 0 && subagentTasks.size === 0) {
    ctx.ui.setWidget(WIDGET_ID, undefined);
    return;
  }

  ctx.ui.setWidget(WIDGET_ID, (_tui: any, theme: any) => {
    const currentMain = state.read();
    const currentSub = new Map(subagentTasks);
    if (currentMain.length === 0 && currentSub.size === 0) {
      ctx.ui.setWidget(WIDGET_ID, undefined);
      return { render: () => [], invalidate: () => {} };
    }

    const cols: Array<{ label: string; tasks: TaskItem[] }> = [];
    if (currentMain.length > 0) cols.push({ label: "Tasks", tasks: currentMain });
    for (const [source, tasks] of currentSub) {
      if (tasks.length > 0) cols.push({ label: source, tasks });
    }

    return {
      render: (_width: number) => {
        const lines: string[] = [];
        for (const col of cols) {
          if (lines.length > 0) lines.push("");
          lines.push(theme.fg("accent", theme.bold(col.label)));
          for (const t of col.tasks) {
            const icon = t.status === "completed" ? "✓" : t.status === "in-progress" ? "◉" : "○";
            const iconColor = t.status === "completed" ? "success" : t.status === "in-progress" ? "accent" : "dim";
            const titleStyle = t.status === "completed" ? "dim" : "text";
            lines.push(" " + theme.fg(iconColor, icon) + " " + theme.fg(titleStyle, t.title));
          }
        }
        return lines;
      },
      invalidate: () => {},
    };
  });
}

function clearWidget(ctx: ExtensionContext) {
  ctx.ui.setWidget("pi-tasks:widget", undefined);
}
