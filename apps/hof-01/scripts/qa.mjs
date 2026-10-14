import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
const output = path.resolve("artifacts/qa");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  channel:
    process.env.PLAYWRIGHT_BROWSER_CHANNEL === "msedge" ? "msedge" : undefined,
});
const report = [];
try {
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
    ["tablet", 768, 1024],
    ["narrow", 320, 900],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(() => {
      window.__qa = { lcp: 0, cls: 0, interaction: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          window.__qa.lcp = entry.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          if (!entry.hadRecentInput) window.__qa.cls += entry.value;
      }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          window.__qa.interaction = Math.max(
            window.__qa.interaction,
            entry.duration,
          );
      }).observe({ type: "event", buffered: true, durationThreshold: 16 });
    });
    if (name === "mobile") {
      const cdp = await context.newCDPSession(page);
      await cdp.send("Network.enable");
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 150,
        downloadThroughput: 200000,
        uploadThroughput: 93750,
      });
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    }
    const response = await page.goto("http://127.0.0.1:3011", {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => {
      const image = document.querySelector(".hero-portrait img");
      return image?.complete && image.naturalWidth > 0;
    });
    await page.screenshot({ path: path.join(output, `${name}-hero.png`) });
    for (const section of await page.locator("main>section").all()) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({
      path: path.join(output, `${name}-full.png`),
      fullPage: true,
    });
    await page
      .getByRole("button", { name: "Mostrar detalhes dos lábios" })
      .click();
    await page.waitForFunction(() => {
      const image = document.querySelector(".case-photo");
      return image?.complete && image.naturalWidth > 0;
    });
    await page.locator(".case-open").click();
    await page.waitForFunction(() => {
      const image = document.querySelector(".case-dialog>img");
      return image?.complete && image.naturalWidth > 0;
    });
    await page.screenshot({ path: path.join(output, `${name}-dialog.png`) });
    await page.keyboard.press("Escape");
    if (name === "mobile") {
      await page.locator(".case-selection").scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(output, "mobile-gallery.png") });
    }
    const metrics = await page.evaluate(() => ({
      ...window.__qa,
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      fonts: [
        getComputedStyle(document.querySelector("h1")).fontFamily,
        getComputedStyle(document.body).fontFamily,
      ],
      bytes: performance
        .getEntriesByType("resource")
        .reduce((sum, resource) => sum + resource.transferSize, 0),
      brokenImages: [...document.querySelectorAll("main img")].filter(
        (image) => !image.complete || image.naturalWidth === 0,
      ).length,
      mapRequestedInitially: performance
        .getEntriesByType("resource")
        .some((resource) => resource.name.includes("google.com/maps")),
      resourceCount: performance.getEntriesByType("resource").length,
    }));
    report.push({
      viewport: name,
      width,
      status: response?.status(),
      ...metrics,
      errors,
      conditions:
        name === "mobile"
          ? "CDP: 150 ms latency, 200 KB/s download, CPU 4x, cold browser context; local production server"
          : "Local production server, cold browser context, no throttle",
    });
    await context.close();
  }
  await writeFile(
    path.join(output, "metrics.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report));
  if (
    report.some(
      (item) =>
        item.overflow ||
        item.brokenImages ||
        item.errors.length ||
        item.status !== 200,
    )
  )
    process.exitCode = 1;
} finally {
  await browser.close();
}
