// ─── Helpers for MCP proxy tool and commands ─────────────────────────────────

import type { McpConfig, McpClient, McpTool, McpCallResult } from "./types.ts";

export function contentToText(content: McpCallResult["content"]): string {
  return content
    .map((c) => {
      if (c.type === "text") return c.text ?? "";
      if (c.type === "image") return `[image: ${c.mimeType ?? "unknown"}]`;
      if (c.type === "resource") return c.text ?? "[resource]";
      return `[${c.type}]`;
    })
    .join("\n");
}

export function buildProxyDescription(config: McpConfig, toolsCache: Map<string, McpTool[]>): string {
  const serverNames = Object.keys(config.mcpServers);
  const lines: string[] = [
    "MCP gateway — describe and call tools from configured MCP servers.",
    "Servers connect lazily on first use. Use describe to inspect tools before calling.",
    "",
    "Configured servers:",
  ];

  for (const name of serverNames) {
    const count = toolsCache.get(name)?.length;
    const info = count !== undefined ? `${count} tools` : "not yet connected";
    const disabled = config.mcpServers[name]?.enabled === false ? " (disabled)" : "";
    lines.push(`  \u2022 ${name}: ${info}${disabled}`);
  }

  lines.push(
    "",
    "Modes (pass one parameter at a time):",
    '  describe: "tool_name"                    \u2014 show full parameter schema for a tool',
    "  tool: \"tool_name\", args: '{}'          \u2014 call a tool (auto-connects its server)",
    '  connect: "server_name"                   \u2014 explicitly connect a server',
    '  server: "server_name"                    \u2014 filter describe/tool/connect to one server',
    "  (no params)                              \u2014 show server connection status",
  );

  return lines.join("\n");
}

export function findTool(
  toolName: string,
  serverFilter: string | undefined,
  toolsCache: Map<string, McpTool[]>,
): { tool: McpTool; serverName: string } | null {
  for (const [serverName, tools] of toolsCache) {
    if (serverFilter && serverName !== serverFilter) continue;
    const tool = tools.find((t) => t.name === toolName);
    if (tool) return { tool, serverName };
  }
  return null;
}

export function formatSchema(tool: McpTool): string {
  const schema = tool.inputSchema;
  const lines: string[] = [tool.name, `  ${tool.description ?? "(no description)"}`];

  if (!schema?.properties || Object.keys(schema.properties).length === 0) {
    lines.push("  No parameters.");
    return lines.join("\n");
  }

  lines.push("", "  Parameters:");
  const required = new Set<string>(Array.isArray(schema.required) ? schema.required : []);
  for (const [propName, propSchema] of Object.entries(
    schema.properties as Record<string, Record<string, unknown>>,
  )) {
    const req = required.has(propName) ? " (required)" : "";
    const type = (propSchema?.type as string) ?? "any";
    const desc = propSchema?.description ? ` \u2014 ${propSchema.description}` : "";
    lines.push(`    ${propName}: ${type}${req}${desc}`);
  }

  return lines.join("\n");
}

export function buildStatusText(
  config: McpConfig,
  clients: Map<string, McpClient>,
  toolsCache: Map<string, McpTool[]>,
): string {
  const serverNames = Object.keys(config.mcpServers);
  if (serverNames.length === 0) return "No MCP servers configured.";

  const lines: string[] = [];
  let connectedCount = 0;

  for (const name of serverNames) {
    const cfg = config.mcpServers[name];
    const client = clients.get(name);
    const connected = !!client && !client.isDead;
    if (connected) connectedCount++;
    const transport = cfg?.url ? "http" : "stdio";
    let status: string;
    if (cfg?.enabled === false) {
      status = "disabled";
    } else if (connected) {
      status = "connected";
    } else {
      status = "idle";
    }
    const tools = toolsCache.get(name);
    const toolInfo = tools ? `${tools.length} tools` : "no cache";
    lines.push(`  \u2022 ${name} [${transport}]: ${status} (${toolInfo})`);
  }

  return [
    `MCP: ${connectedCount}/${serverNames.length} server(s) connected`,
    ...lines,
  ].join("\n");
}
