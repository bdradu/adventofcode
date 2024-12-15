export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

export function mul(arr: number[]): number {
  return arr.reduce((acc, val) => acc * val, 1);
}

export function groupBy<T, K extends keyof T>(items: T[], key: K): { key: string; items: T[] }[] {
  const group = items.reduce((grouped: Record<string, T[]>, item: T) => {
    const groupKey = item[key];
    if (!grouped[groupKey as string]) {
      grouped[groupKey as string] = [];
    }
    grouped[groupKey as string].push(item);
    return grouped;
  }, {});

  return Object.entries(group).map((entry) => ({ key: entry[0], items: entry[1] }));
}
