import assert from "node:assert/strict";
import { test } from "node:test";
import { spotify } from "../src/spotify/api";

const memoryStorage = () => {
  const data = new Map<string, string>();
  return { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => data.set(k, v), removeItem: (k: string) => data.delete(k) };
};

// Spotify answers accounts missing from the app's User Management list with a plain-text 403, not JSON.
test("a plain-text error from Spotify is shown as a readable message", async () => {
  Object.assign(globalThis, { sessionStorage: memoryStorage(), localStorage: memoryStorage() });
  sessionStorage.setItem("pm.tokens.source", JSON.stringify({ access_token: "x", refresh_token: "y", expires_at: Date.now() + 60_000 }));
  globalThis.fetch = async () =>
    new Response("The user is not registered for this application. Check your settings on developer.spotify.com/dashboard", { status: 403 });

  await assert.rejects(spotify("source", "/me"), (e: Error) => {
    assert.doesNotMatch(e.message, /JSON/);
    assert.match(e.message, /not registered/);
    assert.match(e.message, /User Management/);
    return true;
  });
});
