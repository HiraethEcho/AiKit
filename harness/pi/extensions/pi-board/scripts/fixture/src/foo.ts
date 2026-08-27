export function foo(items: any[]): string {
  const out: string[] = [];
  for (const item of items) {
    out.push(String(item));
  }
  return out.join(",");
}

export function bar(x: number): number {
  return x * 2;
}
