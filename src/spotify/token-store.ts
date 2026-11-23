export type Slot = "source" | "target";
export const SLOTS: Slot[] = ["source", "target"];

interface Tokens {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

const CLIENT_ID_KEY = "pm.clientId";
// Tokens live in sessionStorage so they disappear when the tab closes.
const tokenKey = (slot: Slot) => `pm.tokens.${slot}`;

export const getClientId = () => localStorage.getItem(CLIENT_ID_KEY) ?? "";
export const setClientId = (id: string) =>
  id ? localStorage.setItem(CLIENT_ID_KEY, id) : localStorage.removeItem(CLIENT_ID_KEY);

const readTokens = (slot: Slot): Tokens | null => JSON.parse(sessionStorage.getItem(tokenKey(slot)) ?? "null");
export const hasTokens = (slot: Slot) => readTokens(slot) !== null;
export const clearTokens = (slot: Slot) => sessionStorage.removeItem(tokenKey(slot));

export async function requestTokens(slot: Slot, params: Record<string, string>) {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: getClientId(), ...params }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description ?? data.error ?? `Token request failed (${res.status})`);
  const tokens: Tokens = {
    access_token: data.access_token,
    refresh_token: data.refresh_token ?? readTokens(slot)?.refresh_token,
    expires_at: Date.now() + (data.expires_in - 60) * 1000,
  };
  sessionStorage.setItem(tokenKey(slot), JSON.stringify(tokens));
}

export async function getAccessToken(slot: Slot) {
  const tokens = readTokens(slot);
  if (!tokens) throw new Error(`The ${slot} account is not connected.`);
  if (Date.now() < tokens.expires_at) return tokens.access_token;
  await requestTokens(slot, { grant_type: "refresh_token", refresh_token: tokens.refresh_token });
  return readTokens(slot)!.access_token;
}
