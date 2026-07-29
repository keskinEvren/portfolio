import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

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
page.setDefaultTimeout(90000);

async function shot(name) {
  const dest = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: dest, type: "png" });
  console.log(`✓ ${name}.png (${(await import("fs")).statSync(dest).size} bytes)`);
}

console.log("→ Landing");
await page.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2000));
await shot("cover");

// scroll to show nasıl çalışır partially - nice portfolio cover already has both
await page.evaluate(() => window.scrollTo({ top: 200, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 500));
await shot("screen-1"); // landing with how-it-works visible

console.log("→ Open questionnaire");
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 300));

const input = await page.$("input");
await input.click({ clickCount: 3 });
await input.type("react native", { delay: 30 });
await new Promise((r) => setTimeout(r, 300));

await page.evaluate(() => {
  const btn = [...document.querySelectorAll("button")].find((b) =>
    /başlayalım/i.test(b.textContent || "")
  );
  btn?.click();
});

// Wait until modal title appears
await page.waitForFunction(
  () => /için birkaç soru/i.test(document.body.innerText),
  { timeout: 30000 }
);
await new Promise((r) => setTimeout(r, 800));
await shot("screen-2"); // questionnaire empty-ish

console.log("→ Select answers");
// Click options by partial text match
const selections = [
  "Web geliştiriciyim",
  "Kendi projelerimi",
  "JavaScript",
];

for (const text of selections) {
  const clicked = await page.evaluate((t) => {
    const els = [...document.querySelectorAll("button, label, div, span, li")];
    const el = els.find((e) => {
      const txt = (e.textContent || "").trim();
      return txt.includes(t) && txt.length < 120 && e.children.length < 5;
    });
    if (el) {
      el.click();
      return el.textContent.trim().slice(0, 80);
    }
    return null;
  }, text);
  console.log("  selected:", clicked);
  await new Promise((r) => setTimeout(r, 400));
}

await new Promise((r) => setTimeout(r, 500));

// Scroll modal to reveal generate button if needed
await page.evaluate(() => {
  const dialog =
    document.querySelector('[role="dialog"]') ||
    [...document.querySelectorAll("div")].find((d) =>
      /için birkaç soru/i.test(d.textContent || "") && d.scrollHeight > 400
    );
  if (dialog) dialog.scrollTop = dialog.scrollHeight;
});
await new Promise((r) => setTimeout(r, 400));

const genText = await page.evaluate(() => {
  const buttons = [...document.querySelectorAll("button")];
  const btn = buttons.find((b) =>
    /yol haritam|oluştur|olustur/i.test(b.textContent || "")
  );
  if (btn) {
    btn.click();
    return btn.textContent.trim();
  }
  // fallback: any green-ish primary button at bottom
  const last = buttons[buttons.length - 1];
  last?.click();
  return last?.textContent?.trim() || null;
});
console.log("→ Generate:", genText);

console.log("→ Waiting for roadmap (AI)...");
// Wait up to 90s for react-flow or "react native" header on canvas
let found = false;
for (let i = 0; i < 18; i++) {
  await new Promise((r) => setTimeout(r, 5000));
  const state = await page.evaluate(() => {
    const hasFlow =
      !!document.querySelector(".react-flow") ||
      !!document.querySelector("[class*='react-flow']");
    const text = document.body.innerText;
    const hasRoadmap =
      /Başlangıç|videolar aranıyor|JavaScript Temeller/i.test(text);
    const stillQuestions = /için birkaç soru/i.test(text);
    return { hasFlow, hasRoadmap, stillQuestions, snippet: text.slice(0, 200) };
  });
  console.log(`  [${i * 5}s]`, state);
  if ((state.hasFlow || state.hasRoadmap) && !state.stillQuestions) {
    found = true;
    break;
  }
}

await new Promise((r) => setTimeout(r, 3000));
await shot("screen-3");

await browser.close();
console.log(found ? "Done — roadmap captured." : "Done — may not have full roadmap.");
