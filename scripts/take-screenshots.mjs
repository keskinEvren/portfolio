import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_BASE = path.join(__dirname, "../public/screenshots");

const VIEWPORT = { width: 1280, height: 720 };

const projects = [
  {
    id: "watchpath",
    pages: [
      { name: "cover",    url: "https://watchpath-two.vercel.app",        waitFor: 4000 },
      { name: "screen-1", url: "https://watchpath-two.vercel.app",        waitFor: 4000, scrollY: 400 },
      { name: "screen-2", url: "https://watchpath-two.vercel.app/roadmap", waitFor: 5000 },
      { name: "screen-3", url: "https://watchpath-two.vercel.app",        waitFor: 4000, scrollY: 1000 },
    ],
  },
  {
    id: "apartman-plus",
    pages: [
      { name: "cover",    url: "https://www.komsu.site/",     waitFor: 4000 },
      { name: "screen-1", url: "https://www.komsu.site/",     waitFor: 4000, scrollY: 600 },
      { name: "screen-2", url: "https://www.komsu.site/",     waitFor: 4000, scrollY: 1400 },
      { name: "screen-3", url: "https://www.komsu.site/",     waitFor: 4000, scrollY: 2200 },
    ],
  },
  {
    id: "hizir-global",
    pages: [
      { name: "cover",    url: "https://hizirglobal.com.tr/tr",            waitFor: 4000 },
      { name: "screen-1", url: "https://hizirglobal.com.tr/tr",            waitFor: 4000, scrollY: 800 },
      { name: "screen-2", url: "https://hizirglobal.com.tr/tr/markalar",   waitFor: 4000 },
      { name: "screen-3", url: "https://hizirglobal.com.tr/en",            waitFor: 4000 },
    ],
  },
  {
    id: "sherlith",
    pages: [
      { name: "cover",    url: "https://sherlith.com",       waitFor: 6000 },
      { name: "screen-1", url: "https://sherlith.com",       waitFor: 5000, scrollY: 700 },
      { name: "screen-2", url: "https://sherlith.com",       waitFor: 5000, scrollY: 1600 },
      { name: "screen-3", url: "https://sherlith.com/shop",  waitFor: 5000 },
    ],
  },
];

async function shoot(browser, page, project, entry) {
  const dest = path.join(OUTPUT_BASE, project.id, `${entry.name}.png`);
  console.log(`  → ${entry.url} [${entry.name}]`);

  try {
    await page.goto(entry.url, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, entry.waitFor ?? 3000));

    if (entry.scrollY) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), entry.scrollY);
      await new Promise((r) => setTimeout(r, 800));
    }

    await page.screenshot({ path: dest, type: "png" });
    console.log(`  ✓ saved: ${dest}`);
  } catch (err) {
    console.error(`  ✗ failed [${entry.name}]: ${err.message}`);
  }
}

const browser = await puppeteer.launch({
  executablePath: "/usr/local/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
});

for (const project of projects) {
  console.log(`\n📸 ${project.id}`);
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  // dismiss cookie banners / popups
  page.on("dialog", (d) => d.dismiss().catch(() => {}));

  for (const entry of project.pages) {
    await shoot(browser, page, project, entry);
  }

  await page.close();
}

await browser.close();
console.log("\n✅ All screenshots done.");
