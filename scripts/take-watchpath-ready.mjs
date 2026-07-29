import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../public/screenshots/watchpath");
const BASE = "https://watchpath-two.vercel.app";
const SLUG = "react-native-v55erHQ";

const browser = await puppeteer.launch({
  executablePath: "/usr/local/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  defaultViewport: { width: 1440, height: 900 },
});

const page = await browser.newPage();

async function shot(name) {
  const dest = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: dest, type: "png" });
  console.log(`✓ ${name}.png (${fs.statSync(dest).size} bytes)`);
}

// Cover = landing
console.log("→ cover");
await page.goto(BASE, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 2000));
await shot("cover");

// screen-1 = questionnaire with selections
console.log("→ screen-1 questionnaire");
const input = await page.$("input");
await input.click({ clickCount: 3 });
await input.type("react native", { delay: 25 });
await page.evaluate(() => {
  [...document.querySelectorAll("button")]
    .find((b) => /başlayalım/i.test(b.textContent || ""))
    ?.click();
});
await page.waitForFunction(() => /için birkaç soru/i.test(document.body.innerText), {
  timeout: 30000,
});
await new Promise((r) => setTimeout(r, 1000));

// Click option cards by matching label text (div/button with radio look)
await page.evaluate(() => {
  const labels = [
    "Web geliştiriciyim",
    "freelance",
    "JavaScript",
  ];
  for (const partial of labels) {
    const candidates = [...document.querySelectorAll("div, button, label, li")];
    const el = candidates.find((e) => {
      const t = (e.textContent || "").trim();
      return t.includes(partial) && t.length < 100 && getComputedStyle(e).cursor === "pointer";
    }) || candidates.find((e) => {
      const t = (e.textContent || "").trim();
      return t.includes(partial) && t.length < 100;
    });
    el?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  }
});
await new Promise((r) => setTimeout(r, 600));
await shot("screen-1");

// screen-2 + screen-3 = generated roadmap
console.log("→ roadmap", SLUG);
await page.goto(`${BASE}/r/${SLUG}`, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 5000));

try {
  await page.waitForSelector(".react-flow, [class*='react-flow']", { timeout: 30000 });
  console.log("  react-flow found");
} catch {
  console.log("  no react-flow selector");
}
await new Promise((r) => setTimeout(r, 4000));

const info = await page.evaluate(() => ({
  hasFlow: !!document.querySelector(".react-flow, [class*='react-flow']"),
  text: document.body.innerText.slice(0, 400),
}));
console.log(info);

await shot("screen-2");

// Try fit view / zoom out for fuller canvas
await page.evaluate(() => {
  // click fit-view control if present
  const btn =
    document.querySelector(".react-flow__controls-fitview") ||
    [...document.querySelectorAll("button")].find((b) =>
      /fit|sığdır|zoom/i.test(b.getAttribute("title") || b.textContent || "")
    );
  btn?.click();
});
await new Promise((r) => setTimeout(r, 1500));

// Also scroll/pan a bit
await page.mouse.wheel({ deltaY: -200 });
await new Promise((r) => setTimeout(r, 800));
await shot("screen-3");

await browser.close();
console.log("Done.");
