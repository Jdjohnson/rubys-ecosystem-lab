function hashString(value: string): number {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }

  return hash;
}

/**
 * Returns a stable "shuffled" order without using Math.random().
 * This keeps server and client renders in sync while still mixing cards.
 */
export function shuffle<T>(array: T[]): T[] {
  return [...array]
    .map((item, index) => ({
      item,
      order: hashString(`${index}:${JSON.stringify(item)}`),
    }))
    .sort((a, b) => a.order - b.order)
    .map(({ item }) => item);
}
