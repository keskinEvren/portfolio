import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_BASE = path.join(__dirname, "../public/screenshots");
const VIEWPORT = { width: 1280, height: 720 };

const browser = await puppeteer.launch({
  executablePath: "/usr/local/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
});

const page = await browser.newPage();
await page.setViewport(VIEWPORT);
page.on("dialog", (d) => d.dismiss().catch(() => {}));

const shots = [
  { name: "cover",    scrollY: 0 },
  { name: "screen-1", scrollY: 600 },
];

console.log("📸 sherlith — loading...");
try {
  await page.goto("https://sherlith.com", { waitUntil: "domcontentloaded", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 8000));

  for (const s of shots) {
    if (s.scrollY) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), s.scrollY);
      await new Promise((r) => setTimeout(r, 1000));
    }
    const dest = path.join(OUTPUT_BASE, "sherlith", `${s.name}.png`);
    await page.screenshot({ path: dest, type: "png" });
    console.log(`  ✓ ${dest}`);
  }
} catch (err) {
  console.error(`  ✗ ${err.message}`);
}

await browser.close();
console.log("Done.");
