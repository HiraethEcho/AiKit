import type { Plugin } from "@opencode-ai/plugin";
import { readFileSync } from "fs";
import { resolve } from "path";
import { homedir } from "os";

interface McpServersEntry {
  mcpServers?: Record<
    string,
    {
      command?: string;
      args?: string[];
      env?: Record<string, string>;
      enabled?: boolean;
      directTools?: boolean;
    }
  >;
}

function injectServers(input: any, mcpPath: string, label: string) {
  let mcpJson: string;
  try {
    mcpJson = readFileSync(mcpPath, "utf-8");
  } catch {
    return;
  }

  let parsed: McpServersEntry;
  try {
    parsed = JSON.parse(mcpJson);
  } catch {
    console.warn(`[mcp-loader] Failed to parse ${label}`);
    return;
  }

  for (const [name, server] of Object.entries(parsed.mcpServers ?? {})) {
    const command = server.args?.length
      ? [server.command ?? "", ...server.args]
      : [server.command ?? ""];

    input.mcp = input.mcp ?? {};
    input.mcp[name] = {
      type: "local",
      command,
      enabled: server.enabled ?? true,
      ...(server.env ? { environment: server.env } : {}),
    };
  }
}

export const McpLoaderPlugin: Plugin = async ({ directory }) => {
  return {
    config: async (input) => {
      injectServers(
        input,
        resolve(homedir(), ".agents", "mcp.json"),
        "~/.agents/mcp.json",
      );
      injectServers(
        input,
        resolve(directory, ".agents", "mcp.json"),
        ".agents/mcp.json",
      );
    },
  };
};
