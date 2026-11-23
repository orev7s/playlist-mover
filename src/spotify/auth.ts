import { getClientId, requestTokens, type Slot } from "./token-store";

// Authorization Code with PKCE: the only Spotify flow that needs no server and no client secret.
const SCOPES = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-library-read",
  "user-library-modify",
].join(" ");

const PKCE_KEY = "pm.pkce";

export const redirectUri = () => location.origin + location.pathname;

/** The slot Spotify is redirecting back for, read before completeLogin clears the URL. */
export const returningSlot = new URLSearchParams(location.search).get("state")?.split(".")[0] as Slot | undefined;

const randomString = (length: number) =>
  Array.from(crypto.getRandomValues(new Uint8Array(length)), (b) => "abcdefghijklmnopqrstuvwxyz0123456789"[b % 36]).join("");

const base64Url = (buffer: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buffer))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

export async function beginLogin(slot: Slot) {
  const verifier = randomString(64);
  const state = `${slot}.${randomString(16)}`;
  const challenge = base64Url(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)));
  sessionStorage.setItem(PKCE_KEY, JSON.stringify({ verifier, state }));
  location.assign(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        client_id: getClientId(),
        response_type: "code",
        redirect_uri: redirectUri(),
        code_challenge_method: "S256",
        code_challenge: challenge,
        scope: SCOPES,
        state,
        // Forces the consent page, which has the "Not you?" link for switching accounts.
        show_dialog: "true",
      }),
  );
}

/** Finishes a login if Spotify just redirected back here. Safe to call on every page load. */
export async function completeLogin() {
  const params = new URLSearchParams(location.search);
  const state = params.get("state");
  if (!state) return;
  const saved = JSON.parse(sessionStorage.getItem(PKCE_KEY) ?? "null");
  sessionStorage.removeItem(PKCE_KEY);
  history.replaceState(null, "", redirectUri());

  const error = params.get("error");
  if (error) throw new Error(error === "access_denied" ? "Login was cancelled." : `Spotify login failed: ${error}`);
  if (!saved || saved.state !== state) throw new Error("Login check failed. Please try connecting again.");

  await requestTokens(state.split(".")[0] as Slot, {
    grant_type: "authorization_code",
    code: params.get("code") ?? "",
    redirect_uri: redirectUri(),
    code_verifier: saved.verifier,
  });
}
