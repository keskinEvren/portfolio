import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../public/screenshots/watchpath");
const BASE = "https://watchpath-two.vercel.app";

const browser = await puppeteer.launch({
  executablePath: "/usr/local/bin/google-chrome",
  headless: false, // headed on VNC for better interaction
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--display=:1",
    "--window-size=1440,900",
  ],
  defaultViewport: { width: 1440, height: 900 },
});

const page = await browser.newPage();
page.setDefaultTimeout(90000);

// Log network/console for debugging generation
page.on("console", (m) => {
  if (m.type() === "error") console.log("BROWSER ERR:", m.text());
});
page.on("response", async (res) => {
  const url = res.url();
  if (/api|generate|roadmap|gemini|openai/i.test(url)) {
    console.log(`API ${res.status()} ${url}`);
  }
});

async function shot(name) {
  const dest = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: dest, type: "png" });
  console.log(`✓ ${name}.png (${fs.statSync(dest).size} bytes)`);
}

await page.goto(BASE, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 2000));
await shot("cover");

const input = await page.$("input");
await input.click({ clickCount: 3 });
await input.type("react native", { delay: 40 });
await page.keyboard.press("Enter");
// Also try button
await page.evaluate(() => {
  [...document.querySelectorAll("button")]
    .find((b) => /başlayalım/i.test(b.textContent || ""))
    ?.click();
});

await page.waitForFunction(() => /için birkaç soru/i.test(document.body.innerText), {
  timeout: 45000,
});
await new Promise((r) => setTimeout(r, 1000));

// Dump modal structure to understand selectable elements
const structure = await page.evaluate(() => {
  const dialog = [...document.querySelectorAll("div")].find(
    (d) => /için birkaç soru/i.test(d.innerText || "") && d.querySelectorAll("button").length > 3
  );
  if (!dialog) return { error: "no dialog" };
  return {
    buttons: [...dialog.querySelectorAll("button")].map((b) => ({
      text: b.textContent.trim().slice(0, 80),
      disabled: b.disabled,
      type: b.type,
      classes: b.className.slice(0, 80),
    })),
    radios: [...dialog.querySelectorAll('input[type="radio"], [role="radio"]')].length,
    clickableOptions: [...dialog.querySelectorAll("[class*='cursor'], [role='option'], label")].map(
      (e) => e.textContent.trim().slice(0, 60)
    ),
  };
});
console.log("MODAL STRUCTURE:", JSON.stringify(structure, null, 2));

// Click first option of each question group by button text patterns
const optionButtons = structure.buttons?.filter(
  (b) => !/iptal|oluştur|olustur|haritam/i.test(b.text) && b.text.length > 10
) || [];
console.log("Option-like buttons:", optionButtons.length);

// Select by clicking option buttons at indices 1, 5, 8 (2nd of each group roughly)
await page.evaluate(() => {
  const dialog = [...document.querySelectorAll("div")].find(
    (d) => /için birkaç soru/i.test(d.innerText || "") && d.querySelectorAll("button").length > 3
  );
  if (!dialog) return;
  const opts = [...dialog.querySelectorAll("button")].filter(
    (b) => !/iptal|oluştur|haritam/i.test(b.textContent || "")
  );
  // pick index 1, 5, 8 if available
  [1, 5, 8].forEach((i) => opts[i]?.click());
});
await new Promise((r) => setTimeout(r, 800));
await shot("screen-1");

// Check generate button state
const genInfo = await page.evaluate(() => {
  const btn = [...document.querySelectorAll("button")].find((b) =>
    /yol haritam|oluştur/i.test(b.textContent || "")
  );
  return btn
    ? { text: btn.textContent.trim(), disabled: btn.disabled, ariaDisabled: btn.getAttribute("aria-disabled") }
    : null;
});
console.log("Generate btn:", genInfo);

await page.evaluate(() => {
  const btn = [...document.querySelectorAll("button")].find((b) =>
    /yol haritam|oluştur/i.test(b.textContent || "")
  );
  if (btn && !btn.disabled) btn.click();
});

console.log("Waiting for navigation/roadmap...");
for (let i = 0; i < 24; i++) {
  await new Promise((r) => setTimeout(r, 5000));
  const state = await page.evaluate(() => {
    const stillModal = /için birkaç soru/i.test(document.body.innerText);
    const hasFlow = !!document.querySelector(".react-flow, [class*='react-flow']");
    const loading = /oluşturuluyor|hazırlanıyor|yükleniyor|generating/i.test(document.body.innerText);
    return {
      stillModal,
      hasFlow,
      loading,
      url: location.href,
      text: document.body.innerText.slice(0, 250),
    };
  });
  console.log(`[${i * 5}s]`, state);
  if (!state.stillModal || state.hasFlow) {
    await new Promise((r) => setTimeout(r, 4000));
    await shot("screen-2");
    // zoom out a bit if flow exists
    await page.keyboard.down("Control");
    await page.keyboard.press("Minus");
    await page.keyboard.press("Minus");
    await page.keyboard.up("Control");
    await new Promise((r) => setTimeout(r, 1000));
    await shot("screen-3");
    break;
  }
  if (i === 23) {
    await shot("screen-2");
    await shot("screen-3");
  }
}

await browser.close();
console.log("Done.");
