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

try {
  const raw = fs.readFileSync(bouquetsFilePath, 'utf8');
  bouquets = enrichBouquets(JSON.parse(raw));
  console.log(`✅ Загружено букетов: ${bouquets.length} из ${path.basename(bouquetsFilePath)}`);
} catch (err) {
  console.error('❌ Не удалось прочитать файл с букетами:', err.message);
  process.exit(1);
}

let bouquetEmbeddings = {};
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
    score,
    reason: bouquet._debug ? bouquet._debug.reasons?.join('; ') : null,
  };
}

// ====== Роуты ======
app.post('/api/smart-search', handleSmartSearch);
app.post('/api/recommend', handleSmartSearch);
app.post('/recommend', handleSmartSearch);
app.post('/api/recommendations', handleSmartSearch);

app.get('/ping', (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
