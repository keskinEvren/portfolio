import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../public/screenshots/watchpath");
const BASE = "https://watchpath-two.vercel.app";

const browser = await puppeteer.launch({
  executablePath: "/usr/local/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  defaultViewport: { width: 1440, height: 900 },
});

const page = await browser.newPage();
page.setDefaultTimeout(60000);

async function shot(name) {
  const dest = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: dest, type: "png" });
  console.log(`✓ ${name}.png (${fs.statSync(dest).size} bytes)`);
}

// 1) Cover = clean landing
console.log("→ cover (landing)");
await page.goto(BASE, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 2000));
await shot("cover");

// 2) screen-1 = questionnaire
console.log("→ screen-1 (questionnaire)");
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

// Select answers for a nicer filled state
for (const t of ["Web geliştiriciyim", "Kendi projelerimi", "JavaScript"]) {
  await page.evaluate((text) => {
    const el = [...document.querySelectorAll("button, label, div")].find((e) => {
      const txt = (e.textContent || "").trim();
      return txt.includes(text) && txt.length < 120;
    });
    el?.click();
  }, t);
  await new Promise((r) => setTimeout(r, 300));
}
await new Promise((r) => setTimeout(r, 500));
await shot("screen-1");

// 3) screen-2 + screen-3 = shared roadmap pages
const roadmapUrls = [
  { name: "screen-2", url: `${BASE}/r/react-native-ogrenme-yolu` },
  { name: "screen-3", url: `${BASE}/r/react-ogrenme-yolu` },
];

for (const { name, url } of roadmapUrls) {
  console.log(`→ ${name} (${url})`);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 5000));

  // Wait for flow or nodes
  try {
    await page.waitForFunction(
      () =>
        !!document.querySelector(".react-flow") ||
        /videolar|Başlangıç|temel/i.test(document.body.innerText),
      { timeout: 20000 }
    );
  } catch {}
  await new Promise((r) => setTimeout(r, 3000));

  const info = await page.evaluate(() => ({
    hasFlow: !!document.querySelector(".react-flow"),
    text: document.body.innerText.slice(0, 300),
  }));
  console.log("  ", info);

  await shot(name);
}

await browser.close();
console.log("Done.");
