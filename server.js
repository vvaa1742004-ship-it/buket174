const fs = require('fs');
const path = require('path');
const express = require('express');

const { parseUserQuery } = require('./services/queryParser');
const { enrichBouquets } = require('./services/bouquetFeatures');
const { filterBouquets } = require('./services/filterBouquets');
const {
  prepareBouquetEmbeddings,
  getQueryEmbedding,
} = require('./services/embeddingService');
const { rankBouquets } = require('./services/rankingService');
const { logSmartSearch } = require('./services/logger');

const app = express();
const PORT = process.env.PORT || 3003;

const bouquetsFilePath = path.join(__dirname, 'bouquets_test_output.json');

let bouquets = [];
let bouquetEmbeddings = {};

try {
  const raw = fs.readFileSync(bouquetsFilePath, 'utf8');
  bouquets = enrichBouquets(JSON.parse(raw));
  console.log(`✅ Загружено букетов: ${bouquets.length} из ${path.basename(bouquetsFilePath)}`);
} catch (err) {
  console.error('❌ Не удалось прочитать файл с букетами:', err.message);
  process.exit(1);
}

try {
  bouquetEmbeddings = prepareBouquetEmbeddings(bouquets);
  console.log('🧠 Эмбеддинги букетов готовы');
} catch (err) {
  console.warn('⚠️ Не удалось подготовить эмбеддинги, будет пересчет на лету:', err.message);
}

// ====== Настройки Express ======
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// ====== Вспомогательные функции ======

function extractQueryText(body) {
  if (!body) return '';
  if (typeof body === 'string') return body;
  return (
    body.query ||
    body.text ||
    body.prompt ||
    body.message ||
    body.input ||
    body.request ||
    ''
  );
}

function parseNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const num = Number(value.replace(/\s+/g, ''));
    if (!Number.isNaN(num)) return num;
  }
  return null;
}

function parseFloatSafe(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const normalized = value.replace(/\s+/g, '').replace(',', '.');
    const num = Number(normalized);
    if (!Number.isNaN(num)) return num;
  }
  return null;
}

function parseStringArray(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? item : String(item)))
      .map((item) => item.trim())
      .filter(Boolean);
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function loadBouquetsFromDisk() {
  const raw = fs.readFileSync(bouquetsFilePath, 'utf8');
  return JSON.parse(raw);
}

function applyBouquetsFromRaw(rawList) {
  try {
    bouquets = enrichBouquets(rawList);
    bouquetEmbeddings = prepareBouquetEmbeddings(bouquets);
  } catch (err) {
    console.warn('⚠️ Не удалось обновить эмбеддинги после изменения букетов:', err.message);
  }
}

function saveBouquetsToDisk(rawList) {
  fs.writeFileSync(bouquetsFilePath, JSON.stringify(rawList, null, 2), 'utf8');
  applyBouquetsFromRaw(rawList);
}

async function handleSmartSearch(req, res) {
  console.log(`📩 Запрос на ${req.path}, body:`, req.body);

  const queryText = extractQueryText(req.body);
  if (!queryText || typeof queryText !== 'string') {
    return res.status(400).json({ error: 'Текст запроса обязателен' });
  }

  try {
    const parsedQuery = await parseUserQuery(queryText);
    const { candidates, filtersUsed, note } = filterBouquets(bouquets, parsedQuery);
    let safeCandidates = candidates;

    if (!safeCandidates.length && note !== 'strict_flowers') {
      safeCandidates = fallbackBouquets(parsedQuery);
    }

    if (!safeCandidates.length) {
      const emptyPayload = {
        results: [],
        totalFound: 0,
        debug: {
          parsedQuery,
          filtersUsed,
          candidateCount: 0,
          note,
        },
      };
      res.json(emptyPayload);
      logSmartSearch({
        query: queryText,
        parsedQuery,
        shownIds: [],
        clickedId: null,
      });
      return;
    }

    const queryEmbedding = getQueryEmbedding(queryText, parsedQuery);
    const ranked = rankBouquets(safeCandidates, parsedQuery, queryEmbedding, bouquetEmbeddings);
    const limited = ranked.slice(0, 5).map((item) => formatBouquet(item));

    const payload = {
      results: limited,
      totalFound: ranked.length,
      debug: {
        parsedQuery,
        filtersUsed,
        candidateCount: safeCandidates.length,
        note,
      },
    };

    res.json(payload);

    logSmartSearch({
      query: queryText,
      parsedQuery,
      shownIds: limited.map((item) => item.id),
      clickedId: null,
    });
  } catch (err) {
    console.error('❌ Ошибка обработки smart-search:', err);
    res.status(500).json({ error: 'Не удалось обработать запрос. Попробуйте позже.' });
  }
}

function fallbackBouquets(parsedQuery) {
  const list = bouquets.slice();
  const { budget_min: min, budget_max: max } = parsedQuery || {};
  const filtered = list.filter((b) => {
    if (typeof b.price !== 'number') return true;
    if (min != null && b.price < min * 0.8) return false;
    if (max != null && b.price > max * 1.2) return false;
    return true;
  });
  return filtered.length ? filtered : list;
}

function formatBouquet(bouquet) {
  const score =
    typeof bouquet.score === 'number' ? Number(bouquet.score.toFixed(4)) : null;
  return {
    id: bouquet.id,
    name: bouquet.name,
    price: bouquet.price,
    currency: bouquet.currency || '₽',
    description: bouquet.description,
    composition: bouquet.composition,
    imageUrl: bouquet.imageUrl,
    url: bouquet.url,
    flowers: bouquet.flowers,
    colours: bouquet.colours,
    style: bouquet.style,
    occasions: bouquet.occasions,
    recipients: bouquet.recipients,
    discountPercent: bouquet.discountPercent,
    discountedPrice: bouquet.discountedPrice,
    images: bouquet.images,
    focusX: bouquet.focusX,
    focusY: bouquet.focusY,
    score,
    reason: bouquet._debug ? bouquet._debug.reasons?.join('; ') : null,
  };
}

// ====== Роуты ======
app.post('/api/smart-search', handleSmartSearch);
app.post('/api/recommend', handleSmartSearch);
app.post('/recommend', handleSmartSearch);
app.post('/api/recommendations', handleSmartSearch);

app.get('/api/bouquets', (req, res) => {
  res.json(bouquets);
});

app.post('/api/bouquets', (req, res) => {
  let rawList;
  try {
    rawList = loadBouquetsFromDisk();
  } catch (err) {
    console.error('❌ Не удалось прочитать букетов для POST /api/bouquets:', err.message);
    return res.status(500).json({ error: 'Не удалось прочитать данные букетов' });
  }

  const body = req.body || {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const price = parseNumber(body.price);

  if (!name || price == null) {
    return res.status(400).json({ error: 'Поля name и price обязательны' });
  }

  const maxId = rawList.reduce((max, item) => {
    const idNum = parseNumber(item.id);
    return idNum != null && idNum > max ? idNum : max;
  }, 0);
  const newId = maxId > 0 ? maxId + 1 : Date.now();

  const bouquet = {
    id: newId,
    name,
    price,
    currency: typeof body.currency === 'string' && body.currency.trim() ? body.currency.trim() : '₽',
    description:
      typeof body.description === 'string' && body.description.trim()
        ? body.description
        : null,
    composition:
      typeof body.composition === 'string' && body.composition.trim()
        ? body.composition
        : null,
    imageUrl:
      typeof body.imageUrl === 'string' && body.imageUrl.trim() ? body.imageUrl.trim() : '',
    url: typeof body.url === 'string' && body.url.trim() ? body.url.trim() : '',
    promo:
      typeof body.promo === 'string' && body.promo.trim()
        ? body.promo
        : null,
  };

  const style = parseStringArray(body.style);
  const flowers = parseStringArray(body.flowers);
  const colours = parseStringArray(body.colours);
  const occasions = parseStringArray(body.occasions);
  const recipients = parseStringArray(body.recipients);
  const images = parseStringArray(body.images);
  const discountPercent = parseFloatSafe(body.discountPercent);
  const discountedPrice = parseFloatSafe(body.discountedPrice);
  const focusX = parseFloatSafe(body.focusX);
  const focusY = parseFloatSafe(body.focusY);

  if (style.length) bouquet.style = style;
  if (flowers.length) bouquet.flowers = flowers;
  if (colours.length) bouquet.colours = colours;
  if (occasions.length) bouquet.occasions = occasions;
  if (recipients.length) bouquet.recipients = recipients;
  if (images.length) bouquet.images = images;
  if (discountPercent != null) bouquet.discountPercent = discountPercent;
  if (discountedPrice != null) bouquet.discountedPrice = discountedPrice;
  if (focusX != null) bouquet.focusX = focusX;
  if (focusY != null) bouquet.focusY = focusY;

  rawList.push(bouquet);

  try {
    saveBouquetsToDisk(rawList);
  } catch (err) {
    console.error('❌ Не удалось сохранить новый букет:', err.message);
    return res.status(500).json({ error: 'Не удалось сохранить букет' });
  }

  res.status(201).json(bouquet);
});

app.put('/api/bouquets/:id', (req, res) => {
  const idNum = parseNumber(req.params.id);
  if (idNum == null) {
    return res.status(400).json({ error: 'Некорректный id букета' });
  }

  let rawList;
  try {
    rawList = loadBouquetsFromDisk();
  } catch (err) {
    console.error('❌ Не удалось прочитать букетов для PUT /api/bouquets:', err.message);
    return res.status(500).json({ error: 'Не удалось прочитать данные букетов' });
  }

  const index = rawList.findIndex((item) => parseNumber(item.id) === idNum);
  if (index === -1) {
    return res.status(404).json({ error: 'Букет с таким id не найден' });
  }

  const body = req.body || {};
  const existing = rawList[index];
  const updated = { ...existing };

  if (typeof body.name === 'string' && body.name.trim()) {
    updated.name = body.name.trim();
  }

  const price = parseNumber(body.price);
  if (price != null) {
    updated.price = price;
  }

  if (typeof body.currency === 'string' && body.currency.trim()) {
    updated.currency = body.currency.trim();
  }

  if (typeof body.description === 'string') {
    updated.description = body.description.trim() ? body.description : null;
  }

  if (typeof body.composition === 'string') {
    updated.composition = body.composition.trim() ? body.composition : null;
  }

  if (typeof body.imageUrl === 'string') {
    updated.imageUrl = body.imageUrl.trim();
  }

  if (typeof body.url === 'string') {
    updated.url = body.url.trim();
  }

  if (typeof body.promo === 'string') {
    updated.promo = body.promo.trim() ? body.promo : null;
  }

  const style = parseStringArray(body.style);
  const flowers = parseStringArray(body.flowers);
  const colours = parseStringArray(body.colours);
  const occasions = parseStringArray(body.occasions);
  const recipients = parseStringArray(body.recipients);
  const images = parseStringArray(body.images);
  const discountPercent = parseFloatSafe(body.discountPercent);
  const discountedPrice = parseFloatSafe(body.discountedPrice);
  const focusX = parseFloatSafe(body.focusX);
  const focusY = parseFloatSafe(body.focusY);

  if (Array.isArray(body.style) || typeof body.style === 'string') updated.style = style;
  if (Array.isArray(body.flowers) || typeof body.flowers === 'string') updated.flowers = flowers;
  if (Array.isArray(body.colours) || typeof body.colours === 'string') updated.colours = colours;
  if (Array.isArray(body.occasions) || typeof body.occasions === 'string') updated.occasions = occasions;
  if (Array.isArray(body.recipients) || typeof body.recipients === 'string') updated.recipients = recipients;
  if (Array.isArray(body.images) || typeof body.images === 'string') updated.images = images;
  if (discountPercent != null) updated.discountPercent = discountPercent;
  if (discountedPrice != null) updated.discountedPrice = discountedPrice;
  if (focusX != null) updated.focusX = focusX;
  if (focusY != null) updated.focusY = focusY;

  rawList[index] = updated;

  try {
    saveBouquetsToDisk(rawList);
  } catch (err) {
    console.error('❌ Не удалось сохранить изменения букета:', err.message);
    return res.status(500).json({ error: 'Не удалось сохранить изменения' });
  }

  res.json(updated);
});

app.get('/ping', (req, res) => {
  res.json({ ok: true });
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
