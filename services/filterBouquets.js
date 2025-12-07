const { FLOWER_KEYWORDS } = require('./keywords');

function filterBouquets(allBouquets = [], parsedQuery) {
  const filtersUsed = [];
  let candidates = Array.from(allBouquets);
  let note = null;

  const budgetBeforeCount = candidates.length;
  candidates = applyBudgetFilter(candidates, parsedQuery, filtersUsed);
  if (!candidates.length && budgetBeforeCount) {
    note = 'budget_filter_empty';
    return {
      candidates: allBouquets.slice(0, 20),
      filtersUsed,
      note,
    };
  }

  candidates = applyForbiddenFlowers(candidates, parsedQuery, filtersUsed);

  const wantedResult = applyWantedFlowers(candidates, parsedQuery, filtersUsed);
  candidates = wantedResult.list;
  if (wantedResult.note) {
    note = wantedResult.note;
  }

  return {
    candidates,
    filtersUsed,
    note,
  };
}

function applyBudgetFilter(bouquets, parsedQuery, filtersUsed) {
  const { budget_min: min, budget_max: max } = parsedQuery || {};
  if (min == null && max == null) return bouquets;

  const filtered = bouquets.filter((bouquet) => {
    if (typeof bouquet.price !== 'number' || Number.isNaN(bouquet.price)) return false;
    if (min != null && bouquet.price < min) return false;
    if (max != null && bouquet.price > max) return false;
    return true;
  });

  filtersUsed.push(
    max && min
      ? `бюджет ${min}–${max} ₽`
      : max
        ? `до ${max} ₽`
        : `от ${min} ₽`,
  );

  if (filtered.length) return filtered;

  // мягкое расширение, если слишком жестко
  const relaxed = bouquets.filter((bouquet) => {
    if (typeof bouquet.price !== 'number') return false;
    const relaxedMin = min != null ? Math.max(0, Math.round(min * 0.9)) : null;
    const relaxedMax = max != null ? Math.round(max * 1.1) : null;
    if (relaxedMin != null && bouquet.price < relaxedMin) return false;
    if (relaxedMax != null && bouquet.price > relaxedMax) return false;
    return true;
  });

  if (relaxed.length) {
    filtersUsed.push('слегка расширили бюджет (~10%)');
    return relaxed;
  }

  return bouquets;
}

function applyForbiddenFlowers(bouquets, parsedQuery, filtersUsed) {
  const unwanted = (parsedQuery && parsedQuery.flowers_not_wanted) || [];
  if (!unwanted.length) return bouquets;
  const filtered = bouquets.filter((bouquet) => !hasAnyFlower(bouquet, unwanted));
  if (filtered.length !== bouquets.length) {
    filtersUsed.push(`без: ${unwanted.join(', ')}`);
  }
  return filtered;
}

function applyWantedFlowers(bouquets, parsedQuery, filtersUsed) {
  const wanted = (parsedQuery && parsedQuery.flowers_wanted) || [];
  if (!wanted.length) return { list: bouquets, note: null };
  const filtered = bouquets.filter((bouquet) => hasAnyFlower(bouquet, wanted));

  if (filtered.length) {
    filtersUsed.push(`нужны цветы: ${wanted.join(', ')}`);
    return { list: filtered, note: null };
  }

  filtersUsed.push(`не нашли эти цветы: ${wanted.join(', ')}`);
  return { list: [], note: 'strict_flowers' };
}

function hasAnyFlower(bouquet, list) {
  if (!Array.isArray(list) || !list.length) return false;
  const bouquetFlowers = normalizeArray(bouquet.flowers);
  if (bouquetFlowers.length) {
    return bouquetFlowers.some((flower) => list.includes(flower));
  }

  const haystack = normalizeText(
    [bouquet.name, bouquet.description, bouquet.composition, bouquet.promo].filter(Boolean).join(' '),
  );

  return list.some((needle) => {
    const variants = FLOWER_KEYWORDS[needle];
    if (!variants) return haystack.includes(needle);
    return variants.some((variant) => haystack.includes(variant));
  });
}

function normalizeArray(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => (typeof item === 'string' ? item.toLowerCase().trim() : '')).filter(Boolean);
}

function normalizeText(text) {
  return (text || '').toLowerCase();
}

module.exports = {
  filterBouquets,
};
