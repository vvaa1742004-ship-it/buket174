const {
  cosineSimilarity,
  buildBouquetSemanticText,
  textToVector,
} = require('./embeddingService');

function rankBouquets(candidates = [], parsedQuery, queryEmbedding, embeddingLookup = {}) {
  if (!candidates.length) return [];
  const results = candidates.map((bouquet) => {
    const embedding = embeddingLookup[bouquet.id] || textToVector(buildBouquetSemanticText(bouquet));
    const semanticScore = cosineSimilarity(queryEmbedding, embedding);
    const { bonus, reasons } = computeMatchBonuses(bouquet, parsedQuery);
    const popularityBonus = typeof bouquet.popularity === 'number' ? bouquet.popularity * 0.01 : 0;
    const score = semanticScore * 0.7 + bonus + popularityBonus;
    return {
      ...bouquet,
      score,
      _debug: {
        semanticScore,
        bonus,
        popularityBonus,
        reasons,
      },
    };
  });

  return results.sort((a, b) => b.score - a.score);
}

function computeMatchBonuses(bouquet, parsedQuery) {
  if (!parsedQuery) return { bonus: 0, reasons: [] };
  const reasons = [];
  let total = 0;

  const styleMatches = intersection(bouquet.style, parsedQuery.style);
  if (styleMatches.length) {
    const bonus = styleMatches.length * 0.1;
    total += bonus;
    reasons.push(`совпадение по стилю (${styleMatches.join(', ')}) +${bonus.toFixed(2)}`);
  }

  const colourMatches = intersection(bouquet.colours, parsedQuery.colours);
  if (colourMatches.length) {
    const bonus = colourMatches.length * 0.05;
    total += bonus;
    reasons.push(`цвета: ${colourMatches.join(', ')} +${bonus.toFixed(2)}`);
  }

  if (parsedQuery.occasion && Array.isArray(bouquet.occasions)) {
    if (bouquet.occasions.includes(parsedQuery.occasion)) {
      total += 0.2;
      reasons.push(`подходит под повод "${parsedQuery.occasion}" +0.20`);
    }
  }

  if (parsedQuery.relationship && Array.isArray(bouquet.recipients)) {
    if (bouquet.recipients.includes(parsedQuery.relationship)) {
      total += 0.15;
      reasons.push(`для ${parsedQuery.relationship} +0.15`);
    }
  }

  const flowerMatches = intersection(bouquet.flowers, parsedQuery.flowers_wanted);
  if (flowerMatches.length) {
    const bonus = flowerMatches.length * 0.08;
    total += bonus;
    reasons.push(`цветы: ${flowerMatches.join(', ')} +${bonus.toFixed(2)}`);
  }

  return { bonus: total, reasons };
}

function intersection(a = [], b = []) {
  if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) return [];
  const setB = new Set(b.map((item) => (typeof item === 'string' ? item.toLowerCase() : item)));
  return a
    .map((item) => (typeof item === 'string' ? item.toLowerCase() : item))
    .filter((item, idx, arr) => arr.indexOf(item) === idx && setB.has(item));
}

module.exports = {
  rankBouquets,
  computeMatchBonuses,
};
