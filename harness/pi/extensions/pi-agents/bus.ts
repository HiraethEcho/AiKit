// ── Bus (pub/sub via globalThis Symbol) ──────────────────────────────────
// Embedded in each extension — zero shared deps.

const BUS_KEY = Symbol.for("pi-ext:bus");

interface Bus {
  emit(event: string, payload: unknown): void;
  on(event: string, listener: (payload: unknown) => void): () => void;
}

function getGlobal<T>(key: symbol): T | undefined {
  return (globalThis as Record<symbol, unknown>)[key] as T | undefined;
}
function setGlobal<T>(key: symbol, value: T): void {
  (globalThis as Record<symbol, unknown>)[key] = value;
}

function createBus(): Bus {
  const listeners = new Map<string, Array<(payload: unknown) => void>>();
  return {
    emit(event, payload) {
      const subs = listeners.get(event);
      if (!subs) return;
      for (const fn of subs) {
        try {
          Promise.resolve(fn(payload)).catch((err) =>
            console.error(`[pi-ext:bus] async error in "${event}":`, err)
          );
        } catch (err) {
          console.error(`[pi-ext:bus] error in "${event}":`, err);
        }
      }
    },
    on(event, listener) {
      if (!listeners.has(event)) listeners.set(event, []);
      listeners.get(event)!.push(listener);
      return () => {
        const idx = listeners.get(event)!.indexOf(listener);
        if (idx !== -1) listeners.get(event)!.splice(idx, 1);
      };
    },
  };
}

export function getBus(): Bus {
  let bus = getGlobal<Bus>(BUS_KEY);
  if (!bus) {
    bus = createBus();
    setGlobal(BUS_KEY, bus);
  }
  return bus;
}

export const Events = {
  TASK_UPDATE: "pi:task_update",
  TASK_CLEAR: "pi:task_clear",
  ASK_REQUEST: "pi:ask_request",
  ASK_RESPONSE: "pi:ask_response",
} as const;

export interface TaskUpdatePayload {
  source: string; // "main" | "subagent:<name>"
  tasks: Array<{
    id: number;
    title: string;
    description: string;
    status: "not-started" | "in-progress" | "completed";
  }>;
}
export interface TaskClearPayload {
  source: string;
}
export interface AskRequestPayload {
  source: string;
  requestId: string;
  questions: Array<{
    id: string;
    question: string;
    description?: string;
    options: Array<{ label: string }>;
    multi?: boolean;
    recommended?: number;
  }>;
}
export interface TaskItem {
  id: number;
  title: string;
  description: string;
  status: "not-started" | "in-progress" | "completed";
}

export interface AskResponsePayload {
  requestId: string;
  cancelled: boolean;
  results: Array<{
    id: string;
    selectedOptions: string[];
    customInput?: string;
  }>;
}
