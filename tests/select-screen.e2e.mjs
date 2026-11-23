// Repro for "blank screen after clicking Choose what to move". Needs the built site served on :8443.
// Run: node tests/select-screen.e2e.mjs
import { createRequire } from "node:module";
const { chromium } = createRequire("/home/ubuntu/projects/unbound-ui/")("playwright");

const SITE = process.env.SITE_URL ?? "https://127.0.0.1:8443/";
const tokens = (t) => JSON.stringify({ access_token: t, refresh_token: "r", expires_at: Date.now() + 3600_000 });
const json = (route, body) => route.fulfill({ contentType: "application/json", body: JSON.stringify(body) });

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? `${process.env.HOME}/.cache/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-linux64/chrome-headless-shell` });
const page = await browser.newPage({ ignoreHTTPSErrors: true });
const errors = [];
page.on("pageerror", (e) => errors.push(e.stack ?? e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.route("https://api.spotify.com/**", (route) => {
  const url = new URL(route.request().url());
  const me = route.request().headers().authorization.endsWith("src") ? "alice" : "bob";
  if (url.pathname === "/v1/me") return json(route, { id: me, display_name: me });
  if (url.pathname === "/v1/me/playlists")
    return json(route, {
      next: null,
      items: [
        { id: "p1", uri: "spotify:playlist:p1", name: "Gym", description: "", public: false, owner: { id: "alice" }, images: [{ url: "https://i.scdn.co/a" }], items: { total: 3 } },
        { id: "p2", uri: "spotify:playlist:p2", name: "Chill", description: null, public: true, owner: { id: "carol" }, images: null },
      ],
    });
  return json(route, { total: 5, items: [], next: null });
});

await page.goto(SITE);
await page.evaluate(([s, t]) => {
  localStorage.setItem("pm.clientId", "0123456789abcdef0123456789abcdef");
  sessionStorage.setItem("pm.tokens.source", s);
  sessionStorage.setItem("pm.tokens.target", t);
}, [tokens("src"), tokens("tgt")]);
await page.reload();
await page.getByRole("button", { name: /Choose what to move/ }).click();
await page.waitForTimeout(1500);

const visible = await page.getByText("Gym").isVisible().catch(() => false);
await browser.close();
console.log(errors.length ? `errors:\n${errors.join("\n")}` : "no errors");
if (!visible) {
  console.log("FAIL: select screen did not render");
  process.exit(1);
}
console.log("PASS: select screen rendered");
