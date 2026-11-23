// Measures first-load performance of the served site.
// Run: node tests/measure-load.mjs [url]   (default https://127.0.0.1:8443/)
// Emulates a remote visitor (150 ms round trip, 10 Mbit/s down) so results are closer to real use than localhost.
import { createRequire } from "node:module";
const { chromium } = createRequire("/home/ubuntu/projects/unbound-ui/")("playwright");

const SITE = process.argv[2] ?? "https://127.0.0.1:8443/";
const RUNS = 5;
const RTT = Number(process.env.RTT ?? 150);
const MBIT = Number(process.env.MBIT ?? 10);
const executablePath =
  process.env.CHROME_PATH ??
  `${process.env.HOME}/.cache/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-linux64/chrome-headless-shell`;

const browser = await chromium.launch({ executablePath });
const results = [];

for (let i = 0; i < RUNS; i++) {
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: RTT,
    downloadThroughput: (MBIT * 1024 * 1024) / 8,
    uploadThroughput: (MBIT * 1024 * 1024) / 16,
  });
  let bytes = 0;
  cdp.on("Network.loadingFinished", (e) => (bytes += e.encodedDataLength));

  const start = Date.now();
  await page.goto(SITE, { waitUntil: "load" });
  // "Visible" = the first real screen content is painted (setup wizard or connect page).
  await page.locator("main h3, main h2").first().waitFor({ state: "visible" });
  const visible = Date.now() - start;
  const t = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const fcp = performance.getEntriesByName("first-contentful-paint")[0];
    return { ttfb: nav.responseStart, dcl: nav.domContentLoadedEventEnd, load: nav.loadEventEnd, fcp: fcp?.startTime ?? 0 };
  });
  await new Promise((r) => setTimeout(r, 300));
  results.push({ ...t, visible, kb: bytes / 1024 });
  await context.close();
}
await browser.close();

const median = (k) => results.map((r) => r[k]).sort((a, b) => a - b)[Math.floor(RUNS / 2)];
const row = (label, k, unit = "ms") => console.log(`${label.padEnd(26)} ${median(k).toFixed(0).padStart(6)} ${unit}`);
console.log(`${SITE}  (median of ${RUNS}, ${RTT} ms RTT, ${MBIT} Mbit/s)`);
row("Time to first byte", "ttfb");
row("First contentful paint", "fcp");
row("DOM content loaded", "dcl");
row("Load event", "load");
row("Screen content visible", "visible");
row("Transferred", "kb", "KB");
