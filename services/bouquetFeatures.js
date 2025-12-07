const {
  FLOWER_KEYWORDS,
  COLOUR_KEYWORDS,
  STYLE_KEYWORDS,
  OCCASION_KEYWORDS,
  RELATIONSHIP_KEYWORDS,
} = require('./keywords');

function enrichBouquets(rawBouquets = []) {
  return rawBouquets.map((bouquet) => {
    const features = deriveFeatures(bouquet);
    return {
      ...bouquet,
      flowers: bouquet.flowers && bouquet.flowers.length ? bouquet.flowers : features.flowers,
      colours: bouquet.colours && bouquet.colours.length ? bouquet.colours : features.colours,
      style: bouquet.style && bouquet.style.length ? bouquet.style : features.style,
      occasions: bouquet.occasions && bouquet.occasions.length ? bouquet.occasions : features.occasions,
      recipients:
        bouquet.recipients && bouquet.recipients.length
          ? bouquet.recipients
          : features.relationshipHints,
      derived: features,
    };
  });
}

function deriveFeatures(bouquet) {
  const normalizedText = normalizeText(
    [bouquet.name, bouquet.description, bouquet.composition, bouquet.promo].filter(Boolean).join(' '),
  );

  return {
    flowers: detectKeywords(normalizedText, FLOWER_KEYWORDS),
    colours: detectKeywords(normalizedText, COLOUR_KEYWORDS),
    style: detectKeywords(normalizedText, STYLE_KEYWORDS),
    occasions: detectKeywords(normalizedText, OCCASION_KEYWORDS),
    relationshipHints: detectKeywords(normalizedText, RELATIONSHIP_KEYWORDS),
  };
}

function detectKeywords(text, dictionary) {
  if (!text) return [];
  const result = [];
  for (const [canonical, variants] of Object.entries(dictionary)) {
    if (variants.some((variant) => containsVariant(text, variant))) {
      result.push(canonical);
    }
  }
  return result;
}

function containsVariant(text, variant) {
  if (!variant) return false;
  const trimmed = variant.trim();
  if (!trimmed) return false;

  if (trimmed.includes(' ')) {
    const escapedMulti = trimmed
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\s+/g, '\\s+');
    const multiPattern = new RegExp(escapedMulti, 'i');
    return multiPattern.test(text);
  }

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `(?:^|[^a-zа-яё0-9])${escaped}(?:[а-яё]+)?(?=$|[^a-zа-яё0-9])`,
    'i',
  );
  return pattern.test(text);
}

function normalizeText(text) {
  return (text || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

module.exports = {
  enrichBouquets,
  deriveFeatures,
};
