const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const path = require("path");

// Берём твои URL из bouquets.json
const bouquets = require("./bouquets.json");

async function scrape() {
  const browser = await puppeteer.launch({
    headless: "new", // если вдруг ругнётся — можно заменить на true
  });
  const page = await browser.newPage();

  const updated = [];

  for (const b of bouquets) {
    try {
      console.log("Открываю:", b.id, b.url);
      await page.goto(b.url, { waitUntil: "domcontentloaded" });

      const data = await page.evaluate(() => {
        const getText = (selector) => {
          const el = document.querySelector(selector);
          return el ? el.textContent.trim() : null;
        };

        // --- НАЗВАНИЕ ---
        const name =
          getText("h1") ||
          getText(".GoodHeader_Title") ||
          getText(".nc_product_full_name");

        // --- ЦЕНА ---
        const priceText =
          getText(".nc_price") ||
          getText(".GoodPrice_Current") ||
          getText(".netshop-price") ||
          getText(".ItemPrice") ||
          getText(".price");

        let price = null;
        if (priceText) {
          // убираем пробелы, ₽ и т.п., берём число
          const match = priceText.replace(/\s/g, "").match(/(\d{2,6})/);
          if (match) price = parseInt(match[1], 10);
        }

        // --- ТЕКСТЫ НА СТРАНИЦЕ (описание, состав, акции) ---
        const blocks = Array.from(
          document.querySelectorAll(
            "p, .description, .good-text, .nc_full, .product_desc, li"
          )
        )
          .map((el) => el.textContent.trim())
          .filter(Boolean);

        let description = null;
        let composition = null;
        let promo = null;

        for (const t of blocks) {
          const lower = t.toLowerCase();

          // Описание
          if (!description && (lower.startsWith("описание") || lower.includes("подробное описание"))) {
            description = t.replace(/^описание[:\s]*/i, "").trim();
          }

          // Состав
          if (!composition && (lower.startsWith("состав") || lower.includes("состав:"))) {
            composition = t.replace(/^состав[:\s]*/i, "").trim();
          }

          // Акции / скидки (очень грубо, но отловим “акция”, “скидка”, проценты и т.п.)
          if (
            !promo &&
            (lower.includes("акция") ||
              lower.includes("скидк") ||
              lower.includes("%") ||
              lower.includes("по акции"))
          ) {
            promo = t.trim();
          }
        }

        return { name, price, description, composition, promo };
      });

      const updatedBouquet = {
        ...b,
        name: data.name || b.name,
        price: data.price || b.price,
        description:
          data.description ||
          b.description ||
          null,
        composition: data.composition || b.composition || null,
        promo: data.promo || b.promo || null,
      };

      updated.push(updatedBouquet);
      console.log("OK:", updatedBouquet.id, updatedBouquet.name, updatedBouquet.price);
    } catch (err) {
      console.error("Ошибка для", b.id, b.url, "-", err.message);
      updated.push(b); // если страница не открылась — оставляем как есть
    }
  }

  await browser.close();

  const outPath = path.join(__dirname, "bouquets_enriched.json");
  await fs.writeFile(outPath, JSON.stringify(updated, null, 2), "utf8");
  console.log("Готово! Сохранено в", outPath);
}

scrape().catch((e) => {
  console.error("Фатальная ошибка скрипта:", e);
});