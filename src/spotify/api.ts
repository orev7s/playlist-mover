import { getAccessToken, type Slot } from "./token-store";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Most errors are JSON, but some (like an account missing from the app's allowlist) are plain text.
function errorMessage(text: string) {
  let message = text;
  try {
    message = JSON.parse(text).error?.message ?? text;
  } catch {}
  return /not registered/i.test(message)
    ? `${message} Add this account's email under User Management in your Spotify developer app, then connect again.`
    : message;
}

/** Authenticated Web API call. Waits out rate limits (429) and retries brief server errors. */
export async function spotify<T = unknown>(slot: Slot, path: string, method = "GET", body?: unknown): Promise<T> {
  const url = path.startsWith("https://") ? path : `https://api.spotify.com/v1${path}`;
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${await getAccessToken(slot)}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429 && attempt < 10) {
      await sleep((Number(res.headers.get("Retry-After")) || 2 ** attempt) * 1000);
      continue;
    }
    if (res.status >= 500 && attempt < 3) {
      await sleep(1000 * (attempt + 1));
      continue;
    }
    const text = await res.text();
    if (!res.ok) throw new Error(`Spotify error ${res.status}: ${errorMessage(text) || res.statusText}`);
    return (text ? JSON.parse(text) : undefined) as T;
  }
}

/** Follows `next` links until every page of a paged endpoint is loaded. */
export async function fetchAll<T>(slot: Slot, path: string): Promise<T[]> {
  const items: T[] = [];
  for (let next: string | null = path; next; ) {
    const page: { items: T[]; next: string | null } = await spotify(slot, next);
    items.push(...page.items);
    next = page.next;
  }
  return items;
}

export function chunk<T>(list: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(list.length / size) }, (_, i) => list.slice(i * size, (i + 1) * size));
}
