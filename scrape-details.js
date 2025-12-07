const fs = require('fs');
const puppeteer = require('puppeteer');

const bouquets = require('./bouquets_enriched.json'); // или ./bouquets.json – если у тебя другой файл

// БЕРЁМ ТОЛЬКО ПЕРВЫЕ 10 БУКЕТОВ ДЛЯ ТЕСТА
const testBouquets = bouquets;

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();
  const result = [];

  for (const bouquet of testBouquets) {
    try {
      console.log(`\n=== Обрабатываю: ${bouquet.id} – ${bouquet.name} ===`);
      console.log(`URL: ${bouquet.url}`);

      await page.goto(bouquet.url, {
        waitUntil: 'networkidle2',
        timeout: 60000,
      });

      // Паузы больше нет — сразу читаем DOM
      const details = await page.evaluate(() => {
        const normalize = (text) =>
          text ? text.replace(/\s+/g, ' ').trim() : null;

        // То, что было раньше — пытаемся найти инфо-блоки, если вдруг они есть
        const infoBlocks = Array.from(
          document.querySelectorAll('.product_info__item, .product-info__item')
        );

        let description = null;
        let composition = null;
        let promo = null;

        // Для отладки
        const infoTexts = infoBlocks.map((el) => el.innerText.trim());
        const infoBlocksCount = infoBlocks.length;

        // 1) ОПИСАНИЕ через блоки, если есть
        const descBlock = infoBlocks.find((el) =>
          /описание/i.test(el.textContent)
        );
        if (descBlock) {
          const textEl =
            descBlock.querySelector('.product_info__text') || descBlock;
          description = normalize(textEl.innerText);
        }

        // 2) СОСТАВ: сначала через блоки (если когда-нибудь появятся)
        const compBlock = infoBlocks.find((el) =>
          /состав букета/i.test(el.textContent)
        );

        if (compBlock) {
          const titleEl = compBlock.querySelector('.product_info__title');
          const textEl =
            compBlock.querySelector('.product_info__text') || compBlock;

          let text = textEl.innerText.trim();

          if (titleEl) {
            const title = titleEl.innerText.trim();
            text = text.replace(title, '').trim();
          }

          text = text
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean)
            .join('\n');

          composition = (text || '')
            .replace(/В наличии/gi, '')
            .replace(/Внимание!/gi, '')
            .replace(/Внимание/gi, '')
            .trim() || null;
        }

        // 2-бис) СОСТАВ: ФОЛБЭК ПО ТЕКСТУ СТРАНИЦЫ
        if (!composition) {
          const body = document.body;
          const bodyText = body ? body.innerText : '';

          const rawLines = bodyText
            .split('\n')
            .map((s) => s.trim());

          const idx = rawLines.findIndex((l) =>
            /состав букета/i.test(l)
          );

          if (idx !== -1) {
            const collected = [];
            for (let i = idx + 1; i < rawLines.length; i++) {
              const line = rawLines[i];

              // стоп-слова — когда явно пошла другая секция
              if (!line) break;
              if (
                /доставк|оплат|контакт|повод|телефон|адрес|бонусн|возврат|оферт|совет|партнер/i.test(
                  line
                )
              ) {
                break;
              }

              collected.push(line);
            }

            const text = collected
              .map((s) => s.trim())
              .filter(Boolean)
              .join('\n');

            if (text) {
              composition = text
                .replace(/В наличии/gi, '')
                .replace(/Внимание!/gi, '')
                .replace(/Внимание/gi, '')
                .trim();
            }
          }
        }

        // 3) АКЦИЯ / ПРОМО (если появится)
        const promoEl =
          document.querySelector('.product__sale, .sale_badge, .product-sale') ||
          null;
        if (promoEl) {
          promo = normalize(promoEl.innerText);
        }

        const bodyHasCompositionWord =
          /состав/i.test((document.body && document.body.innerText) || '');

        return {
          description,
          composition,
          promo,
          infoTexts,
          infoBlocksCount,
          bodyHasCompositionWord,
        };
      });

      const {
        description,
        composition,
        promo,
        infoTexts,
        infoBlocksCount,
        bodyHasCompositionWord,
      } = details;

      console.log(`Блоков .product_info__item: ${infoBlocksCount}`);
      console.log(`Нашли слово "состав" в тексте страницы: ${bodyHasCompositionWord}`);
      console.log(`Нашли description: ${!!description}`);
      console.log(`Нашли composition: ${!!composition}`);
      console.log(`Нашли promo: ${!!promo}`);

      if (!composition) {
        console.log('--- Тексты infoBlocks (для отладки) ---');
        infoTexts.forEach((t, idx) => {
          console.log(`[${idx}]`, t.replace(/\s+/g, ' ').slice(0, 200));
        });
        console.log('--- Конец infoBlocks ---');
      }

      result.push({
        ...bouquet,
        description: description || bouquet.description || null,
        composition: composition || bouquet.composition || null,
        promo: promo || bouquet.promo || null,
      });
    } catch (err) {
      console.error(`❌ Ошибка для ${bouquet.id} – ${bouquet.name}:`, err.message);
      result.push({
        ...bouquet,
        description: bouquet.description || null,
        composition: bouquet.composition || null,
        promo: bouquet.promo || null,
      });
    }
  }

  await browser.close();

  fs.writeFileSync(
    'bouquets_test_output.json',
    JSON.stringify(result, null, 2),
    'utf8'
  );

  console.log('\nГотово! Файл bouquets_test_output.json обновлён (только первые 10 букетов).');
})();