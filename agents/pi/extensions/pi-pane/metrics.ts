// ── Metrics: formatTokens only ─────────────────────────────────────────
// Stripped from pi-atelier

function finite(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0;
}

export function formatTokens(count: number): string {
  const safe = Math.max(0, finite(count));
  if (safe < 1000) return safe.toString();
  if (safe < 10000) return (safe / 1000).toFixed(1) + "k";
  if (safe < 1000000) return Math.round(safe / 1000) + "k";
  if (safe < 10000000) return (safe / 1000000).toFixed(1) + "M";
  return Math.round(safe / 1000000) + "M";
}
