// ─── MCP module for pi-toolkit ────────────────────────────────────────────────
//
// Multi-server MCP runtime with:
//   - Lazy stdio/HTTP connections
//   - Runtime in-memory tool cache only, no disk files
//   - Proxy mcp() tool for model
//   - /mcp command with SettingsList checkbox toggle + status/tools/reconnect
//   - Idle timeout: kills server process after inactivity
//   - Enable/disable: immediate, no reload needed
//   - Footer status: plug-icon enabled/total

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { getSettingsListTheme } from "@earendil-works/pi-coding-agent";
import { Container, SettingItem, SettingsList } from "@earendil-works/pi-tui";
import type { AutocompleteItem } from "@earendil-works/pi-tui";
import { loadConfig } from "./config.ts";
import { McpStdioClient } from "./client.ts";
import { McpHttpClient } from "./http-client.ts";
import type { McpClient, McpTool } from "./types.ts";
import {
  contentToText,
  buildProxyDescription,
  findTool,
  formatSchema,
  buildStatusText,
} from "./helpers.ts";
const IDLE_CHECK_INTERVAL_MS = 60_000; // Check idle every minute
const PLUG_ICON = "\uf1e6"; // NerdFont plug icon

export default function registerMcp(pi: ExtensionAPI) {
  const config = loadConfig();
  const serverNames = Object.keys(config.mcpServers);
  if (serverNames.length === 0) return;

  let clients = new Map<string, McpClient>();
  let connecting = new Map<string, Promise<McpClient>>();
  let toolsCache = new Map<string, McpTool[]>();
  let activeUi: any = null; // For footer status updates outside command scope

  function computeStatusText(): string {
    let enabled = 0;
    for (const name of serverNames) {
      if (config.mcpServers[name]?.enabled !== false) enabled++;
    }
    return `${PLUG_ICON} ${enabled}/${serverNames.length}`;
  }

  function updateFooterStatus(): void {
    if (activeUi) {
      activeUi.setStatus("mcp", computeStatusText());
    }
  }

  // ─── Idle timeout check ────────────────────────────────────────────────────
  let idleTimer: ReturnType<typeof setInterval> | null = null;

  function startIdleCheck(): void {
    stopIdleCheck();
    idleTimer = setInterval(() => {
      const now = Date.now();
      let changed = false;
      for (const [name, client] of clients) {
        if (client.isDead) continue;
        const cfg = config.mcpServers[name];
        if (cfg?.enabled === false) {
          client.close();
          clients.delete(name);
          changed = true;
          continue;
        }
        const timeout = cfg?.idleTimeout ?? 10;
        if (timeout <= 0) continue;
        const elapsed = now - client.lastUsedAt;
        if (elapsed > timeout * 60 * 1000) {
          client.close();
          clients.delete(name);
          changed = true;
        }
      }
      if (changed) updateFooterStatus();
    }, IDLE_CHECK_INTERVAL_MS);
    idleTimer.unref();
  }

  function stopIdleCheck(): void {
    if (idleTimer) {
      clearInterval(idleTimer);
      idleTimer = null;
    }
  }

  // ─── Lazy connection ────────────────────────────────────────────────────────
  async function getOrConnect(serverName: string, ctx: any): Promise<McpClient> {
    const existing = clients.get(serverName);
    if (existing && !existing.isDead) return existing;

    const pending = connecting.get(serverName);
    if (pending) return pending;

    const cfg = config.mcpServers[serverName];
    if (cfg?.enabled === false) {
      throw new Error(`Server "${serverName}" is disabled. Toggle it on via /mcp.`);
    }
    if (!cfg?.command && !cfg?.url) {
      throw new Error(`Server "${serverName}" has no command or url configured.`);
    }

    const promise = (async () => {
      const isHttp = !!cfg.url;
      try {
        const excluded = new Set(cfg.excludeTools ?? []);
        let client: McpClient;

        if (isHttp) {
          client = new McpHttpClient(serverName, cfg);
          await client.initialize();
        } else {
          client = new McpStdioClient(serverName, cfg);
          await client.initialize();
        }

        const tools = (await client.listTools()).filter((t) => !excluded.has(t.name));
        clients.set(serverName, client);
        toolsCache.set(serverName, tools);
        updateFooterStatus();
        return client;
      } finally {
        connecting.delete(serverName);
      }
    })();

    connecting.set(serverName, promise);
    return promise;
  }

  // ─── Toggle helper: in-memory only ──────────────────────────────────────
  function setServerEnabled(serverName: string, enabled: boolean, ctx: any): void {
    const cfg = config.mcpServers[serverName];
    if (!cfg) return;
    cfg.enabled = enabled;
    if (enabled) {
      clients.delete(serverName);
      connecting.delete(serverName);
      if (ctx?.hasUI) {
        ctx.ui.notify(`MCP: ${serverName} enabled. Will connect on next tool call.`, "info");
      }
    } else {
      const client = clients.get(serverName);
      if (client && !client.isDead) {
        client.close();
      }
      clients.delete(serverName);
      connecting.delete(serverName);
      toolsCache.delete(serverName);
      if (ctx?.hasUI) {
        ctx.ui.notify(`MCP: ${serverName} disabled.`, "info");
      }
    }
    updateFooterStatus();
  }

  // ─── Proxy tool ──────────────────────────────────────────────────────────────
  pi.registerTool({
    name: "mcp",
    label: "MCP",
    description: buildProxyDescription(config, toolsCache),
    promptSnippet: `MCP: ${serverNames.join(", ")} — describe and call tools on demand`,
    parameters: {
      type: "object",
      properties: {
        tool: { type: "string", description: 'Tool name to call, e.g. "read_file"' },
        describe: { type: "string", description: "Show full parameter schema for a named tool" },
        connect: { type: "string", description: "Explicitly connect a server by name" },
        server: { type: "string", description: "Filter describe/tool/connect to a specific server" },
      },
    },

    async execute(_id, params: Record<string, any>, _signal, _onUpdate, ctx) {

      // ── describe ──
      if (params.describe) {
        const found = findTool(params.describe, params.server, toolsCache);
        if (!found) {
          return {
            content: [{ type: "text", text: `Tool "${params.describe}" not found in cache.` }],
            details: {},
          };
        }
        return {
          content: [{ type: "text", text: formatSchema(found.tool) }],
          details: { server: found.serverName },
        };
      }

      // ── connect ──
      if (params.connect) {
        if (!config.mcpServers[params.connect]) {
          return {
            content: [{ type: "text", text: `Unknown server "${params.connect}".` }],
            details: {},
          };
        }
        try {
          await getOrConnect(params.connect, ctx);
          const tools = toolsCache.get(params.connect) ?? [];
          return {
            content: [{ type: "text", text: `Connected to "${params.connect}". ${tools.length} tools available.` }],
            details: { server: params.connect, toolCount: tools.length },
          };
        } catch (err) {
          return {
            content: [{ type: "text", text: `Failed to connect: ${err instanceof Error ? err.message : String(err)}` }],
            details: { error: "connect_failed" },
          };
        }
      }

      // ── tool call ──
      if (params.tool) {
        let parsedArgs: Record<string, unknown> = {};
        if (params.args) {
          try {
            const a = JSON.parse(params.args);
            if (typeof a !== "object" || a === null || Array.isArray(a)) {
              throw new Error(`args must be a JSON object`);
            }
            parsedArgs = a;
          } catch (e) {
            throw new Error(`Invalid args JSON: ${e instanceof Error ? e.message : String(e)}`);
          }
        }

        const found = findTool(params.tool, params.server, toolsCache);
        let targetServer = found?.serverName;
        if (!targetServer) {
          targetServer = params.server;
          if (!targetServer) {
            return {
              content: [{ type: "text", text: `Tool ${params.tool} not found. Use describe to discover tools.` }],
              details: {},
            };
          }
        }

        let client: McpClient;
        try {
          client = await getOrConnect(targetServer, ctx);
        } catch (err) {
          return {
            content: [{ type: "text", text: `Cannot connect to "${targetServer}": ${err instanceof Error ? err.message : String(err)}` }],
            details: { error: "connect_failed" },
          };
        }
        const result = await client.callTool(params.tool, parsedArgs);
        const text = contentToText(result.content ?? []);

        if (result.isError) {
          throw new Error(text || `MCP tool "${params.tool}" reported an error`);
        }

        return {
          content: [{ type: "text", text: text || "(empty response)" }],
          details: { server: targetServer, tool: params.tool },
        };
      }

      // ── status (default) ──
      return {
        content: [{ type: "text", text: buildStatusText(config, clients, toolsCache) }],
        details: { servers: serverNames.length },
      };
    },
  });

  // ─── /mcp command ────────────────────────────────────────────────────────────
  pi.registerCommand("mcp", {
description: "MCP server management: status · tools [server] · reconnect [server]",
    getArgumentCompletions(argumentPrefix: string): AutocompleteItem[] | null {
      const p = argumentPrefix.trim().toLowerCase();
      const items: AutocompleteItem[] = [];
      const subs: { value: string; description: string }[] = [
        { value: "status", description: "Show MCP server status" },
        { value: "tools", description: "List tools for a server" },
        { value: "reconnect", description: "Reconnect server(s)" },
      ];
      for (const s of subs) {
        if (!p || s.value.startsWith(p)) items.push({ value: s.value, label: s.value, description: s.description });
      }
      for (const name of serverNames) {
        if (!p || name.toLowerCase().startsWith(p)) {
          items.push({ value: name, label: name, description: `MCP server` });
        }
      }
      return items.length > 0 ? items : null;
    },
    handler: async (args, ctx) => {
      if (!ctx.hasUI) return;
      const parts = (args ?? "").trim().split(/\s+/).filter(Boolean);
      const sub = parts[0] ?? "status";
      const arg = parts.slice(1).join(" ");

      switch (sub) {
        // ── Open SettingsList toggle panel ─────────────────────────────────────
        case "":
        case "status": {
          if (!parts[0]) {
            // No subcommand: open interactive toggle panel
            await showTogglePanel(ctx);
          } else {
            ctx.ui.notify(buildStatusText(config, clients, toolsCache), "info");
          }
          break;
        }

        case "tools": {
          const targetServer = arg || undefined;
          const lines: string[] = [];
          for (const [name, tools] of toolsCache) {
            if (targetServer && name !== targetServer) continue;
            lines.push(`${name} (${tools.length} tools):`);
            for (const t of tools) {
              const desc = (t.description ?? "").slice(0, 80);
              lines.push(`  ${t.name}${desc ? ` — ${desc}` : ""}`);
            }
            lines.push("");
          }
          if (lines.length === 0) {
            ctx.ui.notify(
              targetServer
                ? `No cached tools for "${targetServer}". Try /mcp reconnect ${targetServer}`
                : "No cached tool metadata.",
              "info",
            );
          } else {
            ctx.ui.notify(lines.join("\n").trimEnd(), "info");
          }
          break;
        }

        case "reconnect": {
          const targets = arg ? [arg] : serverNames;
          for (const name of targets) {
            if (!config.mcpServers[name]) {
              ctx.ui.notify(`Unknown server: "${name}"`, "error");
              continue;
            }
            clients.get(name)?.close();
            clients.delete(name);
            connecting.delete(name);
            try {
              await getOrConnect(name, ctx);
              ctx.ui.notify(`MCP: reconnected to "${name}"`, "info");
            } catch (err) {
              ctx.ui.notify(
                `MCP: failed to reconnect "${name}": ${err instanceof Error ? err.message : String(err)}`,
                "error",
              );
            }
          }
          break;
        }
        default:
          ctx.ui.notify("Unknown subcommand. Use: status, tools, reconnect", "info");
          break;
      }
    },
  });

  // ─── Interactive toggle panel ───────────────────────────────────────────────
  async function showTogglePanel(ctx: any): Promise<void> {
    const items: SettingItem[] = serverNames.map((name) => {
      const cfg = config.mcpServers[name];
      const disabled = cfg?.enabled === false;
      return {
        id: name,
        label: name + (cfg?.url ? " [http]" : " [stdio]"),
        currentValue: disabled ? "disabled" : "enabled",
        values: ["enabled", "disabled"],
      };
    });

    await ctx.ui.custom((tui: any, theme: any, _kb: any, done: any) => {
      const container = new Container();
      container.addChild(
        new (class {
          render(_width: number) {
            return [theme.fg("accent", theme.bold("MCP Servers")), "", theme.fg("muted", "Toggle servers on/off — changes take effect immediately"), ""];
          }
          invalidate() {}
        })(),
      );

      const settingsList = new SettingsList(
        items,
        Math.min(items.length + 3, 18),
        getSettingsListTheme(),
        (id: string, newValue: string) => {
          const enabled = newValue === "enabled";
          setServerEnabled(id, enabled, { hasUI: true, ui: ctx.ui, cwd: ctx.cwd });
        },
        () => done(undefined),
      );

      container.addChild(settingsList);

      return {
        render(width: number) { return container.render(width); },
        invalidate() { container.invalidate(); },
        handleInput(data: string) {
          settingsList.handleInput?.(data);
          tui.requestRender();
        },
      };
    });
  }

  // ─── Session lifecycle ──────────────────────────────────────────────────────
  pi.on("session_start", async (_event: any, ctx: any) => {
    activeUi = ctx.ui;
    for (const client of clients.values()) client.close();
    clients = new Map();
    connecting = new Map();
    startIdleCheck();
    updateFooterStatus();
  });

  pi.on("session_shutdown", async () => {
    stopIdleCheck();
    for (const client of clients.values()) client.close();
    clients.clear();
    connecting.clear();
    activeUi = null;
  });
}
