const fs = require('fs');
const path = require('path');

const CACHE_PATH = path.join(__dirname, '..', 'data', 'bouquetEmbeddings.json');
const VECTOR_SIZE = 256;

function prepareBouquetEmbeddings(bouquets = []) {
  const cache = loadEmbeddingsCache();
  const updatedCache = {
    version: 1,
    embeddings: { ...(cache.embeddings || {}) },
  };

  const vectors = {};
  let needsSave = false;

  for (const bouquet of bouquets) {
    if (!bouquet || !bouquet.id) continue;
    const text = buildBouquetSemanticText(bouquet);
    const fingerprint = hashString(text);
    const cachedEntry = cache.embeddings && cache.embeddings[bouquet.id];

    if (cachedEntry && cachedEntry.fingerprint === fingerprint) {
      vectors[bouquet.id] = cachedEntry.vector;
      continue;
    }

    const vector = textToVector(text);
    vectors[bouquet.id] = vector;
    updatedCache.embeddings[bouquet.id] = { vector, fingerprint };
    needsSave = true;
  }

  if (needsSave) {
    saveEmbeddingsCache(updatedCache);
  }

  return vectors;
}

function getQueryEmbedding(queryText, parsedSummary) {
  const summaryParts = [];
  if (parsedSummary) {
    if (parsedSummary.style && parsedSummary.style.length) {
      summaryParts.push(`стиль: ${parsedSummary.style.join(', ')}`);
    }
    if (parsedSummary.colours && parsedSummary.colours.length) {
      summaryParts.push(`цвета: ${parsedSummary.colours.join(', ')}`);
    }
    if (parsedSummary.relationship) {
      summaryParts.push(`для: ${parsedSummary.relationship}`);
    }
    if (parsedSummary.occasion) {
      summaryParts.push(`повод: ${parsedSummary.occasion}`);
    }
    if (parsedSummary.flowers_wanted && parsedSummary.flowers_wanted.length) {
      summaryParts.push(`нужны цветы: ${parsedSummary.flowers_wanted.join(', ')}`);
    }
  }

  const combined = `${queryText || ''}\n${summaryParts.join('. ')}`;
  return textToVector(combined);
}

function buildBouquetSemanticText(bouquet) {
  const parts = [
    `Букет "${bouquet.name || 'без названия'}"`,
    bouquet.price ? `цена ${bouquet.price} рублей` : null,
    bouquet.description ? `описание: ${bouquet.description}` : null,
    bouquet.composition ? `состав: ${bouquet.composition}` : null,
  ];

  if (bouquet.flowers && bouquet.flowers.length) {
    parts.push(`цветы: ${bouquet.flowers.join(', ')}`);
  }
  if (bouquet.colours && bouquet.colours.length) {
    parts.push(`цвета: ${bouquet.colours.join(', ')}`);
  }
  if (bouquet.style && bouquet.style.length) {
    parts.push(`стиль: ${bouquet.style.join(', ')}`);
  }
  if (bouquet.occasions && bouquet.occasions.length) {
    parts.push(`поводы: ${bouquet.occasions.join(', ')}`);
  }
  if (bouquet.recipients && bouquet.recipients.length) {
    parts.push(`для: ${bouquet.recipients.join(', ')}`);
  }

  return parts.filter(Boolean).join('. ');
}

function textToVector(text) {
  const tokens = tokenize(text);
  const vector = new Array(VECTOR_SIZE).fill(0);

  for (const token of tokens) {
    const idx = hashString(token) % VECTOR_SIZE;
    vector[idx] += 1;
  }

  const norm = Math.sqrt(vector.reduce((acc, val) => acc + val * val, 0)) || 1;
  return vector.map((value) => value / norm);
}

function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\s]/gi, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function hashString(input = '') {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function cosineSimilarity(vecA = [], vecB = []) {
  if (!vecA.length || !vecB.length || vecA.length !== vecB.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i += 1) {
    const a = vecA[i];
    const b = vecB[i];
    dot += a * b;
    normA += a * a;
    normB += b * b;
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom ? dot / denom : 0;
}

function loadEmbeddingsCache() {
  try {
    const raw = fs.readFileSync(CACHE_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return { version: 1, embeddings: {} };
  }
}

function saveEmbeddingsCache(cache) {
  try {
    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf8');
  } catch (err) {
    console.warn('Не удалось сохранить кэш эмбеддингов:', err.message);
  }
}

module.exports = {
  prepareBouquetEmbeddings,
  buildBouquetSemanticText,
  getQueryEmbedding,
  cosineSimilarity,
  textToVector,
};
