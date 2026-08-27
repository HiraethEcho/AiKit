import type { ExtensionAPI, ExtensionCommandContext, ExtensionContext, Theme } from "@earendil-works/pi-coding-agent";
import { Text } from "@earendil-works/pi-tui";
import { Type, type Static } from "typebox";
import { discoverRoles, findRole, type AgentConfig } from "./agents.js";
import type { CallItem, SubagentResult } from "./types.js";
import { runSubagent } from "./subagent.js";
import { renderSubagentResult } from "./render.js";

// ── Schema ────────────────────────────────────────────────────────────────

const CallItemSchema = Type.Object({
  agent: Type.Optional(Type.String({ description: "Agent name" })),
  prompt: Type.String({ description: "Task description for the subagent" }),
  model: Type.Optional(Type.String({ description: "Model override" })),
  cwd: Type.Optional(Type.String({ description: "Working directory" })),
  session: Type.Optional(Type.String({ description: "Named session handle for cross-turn reuse" })),
  initialContext: Type.Optional(Type.Enum({ parent: "parent", empty: "empty" }, {
    description: 'Context mode: "parent" (fork) inherits context, "empty" (default) starts blank',
  })),
  timeout: Type.Optional(Type.Number({ description: "Timeout in ms" })),
  output: Type.Optional(Type.String({ description: "Write final output to this file and return a reference instead of full text" })),
});

const SubagentParamsSchema = Type.Object({
  agent: Type.Optional(Type.String({ description: "Agent name (defaults to 'general')" })),
  prompt: Type.Optional(Type.String({ description: "Task description. Required when not using calls array." })),
  calls: Type.Optional(Type.Array(CallItemSchema, {
    description: "Multiple calls for parallel execution",
  })),
  chain: Type.Optional(Type.Array(CallItemSchema, {
    description: "Sequential steps. {previous} in a prompt is replaced with the prior step's output; a step with no prompt inherits it.",
  })),
  model: Type.Optional(Type.String({ description: "Default model override for all calls" })),
  cwd: Type.Optional(Type.String({ description: "Default working directory for all calls" })),
  async: Type.Optional(Type.Boolean({ description: "Run asynchronously (fire-and-forget)" })),
  session: Type.Optional(Type.String({ description: "Default session handle for all calls" })),
  initialContext: Type.Optional(Type.Enum({ parent: "parent", empty: "empty" })),
  timeout: Type.Optional(Type.Number({ description: "Default timeout in ms" })),
  output: Type.Optional(Type.String({ description: "Default output file for all calls" })),
});

type SubagentParams = Static<typeof SubagentParamsSchema>;

// ── Default export ────────────────────────────────────────────────────────

export default function (pi: ExtensionAPI): void {
  registerSubagentTool(pi);
  registerRoleCommand(pi);
}

// ── Subagent tool ─────────────────────────────────────────────────────────

function registerSubagentTool(pi: ExtensionAPI): void {
  pi.registerTool({
    name: "subagent",
    label: "Subagent",
    description:
      "Delegate tasks to subagents. Provide 'prompt' (single), 'calls' (parallel), or 'chain' (sequential, {previous} = prior output). Options: agent, model, cwd, session, initialContext, timeout, output, async.",
    parameters: SubagentParamsSchema,

    async execute(
      _id: string,
      params: SubagentParams,
      signal: AbortSignal | undefined,
      onUpdate: ((u: any) => void) | undefined,
      ctx: ExtensionContext,
    ) {
      const defaultAgent = params.agent;
      const defaultModel = params.model;
      const defaultCwd = params.cwd ?? ctx.cwd;
      const defaultSession = params.session;
      const defaultInitialContext = params.initialContext ?? "empty";
      const defaultTimeout = params.timeout;
      const defaultOutput = params.output;

      // Chain mode (sequential)
      if (params.chain && params.chain.length > 0) {
        const results: SubagentResult[] = [];
        let previous = "";
        for (let i = 0; i < params.chain.length; i++) {
          const step = params.chain[i];
          const raw = step.prompt ?? "";
          const prompt = raw.includes("{previous}")
            ? raw.replace(/\{previous\}/g, previous)
            : (raw || previous);
          const r = await runSubagent({
            agentName: step.agent ?? defaultAgent,
            prompt,
            model: step.model ?? defaultModel,
            cwd: step.cwd ?? defaultCwd,
            session: step.session ?? defaultSession,
            initialContext: step.initialContext ?? defaultInitialContext,
            timeout: step.timeout ?? defaultTimeout,
            output: step.output ?? defaultOutput,
            outputSuffix: i + 1,
          }, signal, onUpdate, ctx);
          results.push(r);
          previous = r.finalOutput || "";
          if (r.exitCode !== 0) break; // stop chain on failure
        }
        const summary = results.map((r, i) =>
          `${r.exitCode === 0 ? "✓" : "✗"} [${i + 1}] ${r.agent}: ${r.savedSummary || r.finalOutput?.slice(0, 100) || r.error || "done"}`
        ).join("\n");
        return {
          content: [{ type: "text" as const, text: summary }],
          details: { mode: "chain" as const, results, progress: results.map(r => r.progress) },
          isError: results.some(r => r.exitCode !== 0),
        };
      }

      // Parallel mode
      if (params.calls && params.calls.length > 0) {
        const progressMap = new Map<number, any>();

        const results = await Promise.all(params.calls.map(async (call, i) => {
          const indexOnUpdate = (update: any) => {
            if (update.details?.progress?.[0]) {
              progressMap.set(i, update.details.progress[0]);
            }
            if (onUpdate) {
              const allProgress = params.calls!.map((_, j) => progressMap.get(j)).filter(Boolean);
              onUpdate({
                ...update,
                details: { mode: "parallel", results: [], progress: allProgress },
              });
            }
          };
          return runSubagent({
            agentName: call.agent ?? defaultAgent,
            prompt: call.prompt,
            model: call.model ?? defaultModel,
            cwd: call.cwd ?? defaultCwd,
            session: call.session ?? defaultSession,
            initialContext: call.initialContext ?? defaultInitialContext,
            timeout: call.timeout ?? defaultTimeout,
            output: call.output ?? defaultOutput,
          }, signal, indexOnUpdate, ctx);
        }));
        const summary = results.map(r =>
          `${r.exitCode === 0 ? "✓" : "✗"} ${r.agent}: ${r.savedSummary || r.finalOutput?.slice(0, 100) || r.error || "done"}`
        ).join("\n");
        return {
          content: [{ type: "text" as const, text: summary }],
          details: {
            mode: "parallel" as const,
            results,
            progress: results.map(r => r.progress),
          },
        };
      }

      // Single mode
      if (params.prompt) {
        if (params.async) {
          runSubagent({
            agentName: defaultAgent,
            prompt: params.prompt,
            model: params.model,
            cwd: params.cwd ?? ctx.cwd,
            session: params.session,
            initialContext: params.initialContext ?? "empty",
            timeout: params.timeout,
            output: params.output,
          }, undefined, undefined, ctx).catch(() => {});
          return {
            content: [{ type: "text" as const, text: `Async subagent "${defaultAgent ?? "general"}" started.` }],
          };
        }

        const result = await runSubagent({
          agentName: defaultAgent,
          prompt: params.prompt,
          model: params.model,
          cwd: params.cwd ?? ctx.cwd,
          session: params.session,
          initialContext: params.initialContext ?? "empty",
          timeout: params.timeout,
          output: params.output,
        }, signal, onUpdate, ctx);

        return {
          content: [{ type: "text" as const, text: result.savedSummary || result.finalOutput || result.error || "completed" }],
          details: {
            mode: "single" as const,
            results: [result],
            progress: result.progress ? [result.progress] : undefined,
          },
          isError: result.exitCode !== 0,
        };
      }

      return {
        content: [{ type: "text" as const, text: "Missing prompt or calls parameter" }],
        isError: true,
      };
    },

    renderCall(args: unknown, theme: Theme): any {
      const p = args as Record<string, unknown> | undefined;
      const calls = p?.calls as Array<unknown> | undefined;
      const chain = p?.chain as Array<unknown> | undefined;
      const agent = p?.agent as string | undefined;
      let label = theme.fg("toolTitle", theme.bold("subagent"));
      if (chain && chain.length > 0) label += " " + chain.length + " steps";
      else if (calls && calls.length > 0) label += " " + calls.length + " calls";
      else if (agent) label += " " + theme.fg("accent", agent);
      return new Text(label, 0, 0);
    },

    renderResult(result: any, options: any, theme: any, context: any): any {
      const expanded = context?.expanded ?? options?.expanded ?? false;
      const text = new Text("", 0, 0);
      const renderContext = {
        expanded,
        state: (context as Record<string, unknown>)?.state ?? {},
        invalidate: () => {},
      };
      (context as Record<string, unknown>).lastComponent = text;
      try {
        return renderSubagentResult(text, result, expanded, theme, renderContext);
      } catch {
        const fallback = result?.content?.[0]?.text ?? "completed";
        text.setText(theme.fg("text", String(fallback)));
        return text;
      }
    },
  });
}

// ── /role command ─────────────────────────────────────────────────────────

let activeRole: AgentConfig | null = null;

function setRoleStatus(ctx: { ui: { setStatus: (key: string, text: string | undefined) => void } }) {
  ctx.ui.setStatus("role", activeRole ? activeRole.name : "default");
}

function registerRoleCommand(pi: ExtensionAPI): void {
  pi.registerCommand("role", {
    description: "/role (list), /role <name> (switch), /role off (clear)",
    handler: async (args: string, ctx: ExtensionCommandContext) => {
      const name = args?.trim();

      if (!name) {
        const roles = discoverRoles(ctx.cwd);
        if (roles.length === 0) {
          ctx.ui.notify("No roles found. Create agent .md files with mode: primary.", "info");
          return;
        }
        const lines = roles.map(r => `  ${r.name}${r.description ? ": " + r.description : ""}`);
        ctx.ui.notify(`Available roles:\n${lines.join("\n")}`, "info");
        return;
      }

      if (name === "off" || name === "clear") {
        activeRole = null;
        setRoleStatus(ctx);
        ctx.ui.notify("Role cleared.", "info");
        return;
      }

      const role = findRole(ctx.cwd, name);
      if (!role) {
        ctx.ui.notify(`Role "${name}" not found. Run /role to list available roles.`, "warning");
        return;
      }

      activeRole = role;
      setRoleStatus(ctx);
      ctx.ui.notify(`Switched to role: ${role.name}`, "info");
    },
  });

  // Apply role to each turn
  pi.on("before_agent_start", async (event: any, ctx: ExtensionContext) => {
    if (!activeRole) return undefined;
    setRoleStatus(ctx);
    return {
      systemPrompt: activeRole.systemPrompt || undefined,
      model: activeRole.model || undefined,
    };
  });

  // Filter tools per role
  pi.on("tool_call", async (event: any, _ctx: ExtensionContext) => {
    if (!activeRole?.tools) return undefined;
    const allowed = new Set(activeRole.tools);
    if (!allowed.has(event.toolName)) {
      return { block: true, reason: `Tool "${event.toolName}" not available for role "${activeRole.name}"` };
    }
  });
}
