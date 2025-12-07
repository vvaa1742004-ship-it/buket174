const { QUERY_PARSER_PROMPT } = require('../prompts/queryParserPrompt');
const { runLLM } = require('./llmClient');
const {
  FLOWER_KEYWORDS,
  COLOUR_KEYWORDS,
  STYLE_KEYWORDS,
  RELATIONSHIP_KEYWORDS,
  OCCASION_KEYWORDS,
} = require('./keywords');

const NEGATIVE_PREFIXES = ['без', 'не хочу', 'не нужны', 'не надо', 'исключая'];

function createEmptyParsedQuery() {
  return {
    budget_min: null,
    budget_max: null,
    flowers_wanted: [],
    flowers_not_wanted: [],
    colours: [],
    style: [],
    relationship: null,
    occasion: null,
    age: null,
  };
}

async function parseUserQuery(text) {
  const query = (text || '').trim();
  if (!query) {
    return createEmptyParsedQuery();
  }

  const heuristics = fallbackParse(query);

  try {
    const response = await runLLM(QUERY_PARSER_PROMPT, query);
    const parsed = normalizeParsedQuery(parseJsonLike(response));
    return mergeWithHeuristics(parsed, heuristics);
  } catch (err) {
    console.warn('[queryParser] Falling back to heuristics:', err.message);
    return heuristics;
  }
}

function normalizeParsedQuery(raw) {
  const base = createEmptyParsedQuery();

  if (!raw || typeof raw !== 'object') {
    return base;
  }

  base.budget_min = normalizeNumber(raw.budget_min);
  base.budget_max = normalizeNumber(raw.budget_max);
  base.flowers_wanted = normalizeArray(raw.flowers_wanted);
  base.flowers_not_wanted = normalizeArray(raw.flowers_not_wanted);
  base.colours = normalizeArray(raw.colours);
  base.style = normalizeArray(raw.style);
  base.relationship = normalizeNullableString(raw.relationship);
  base.occasion = normalizeNullableString(raw.occasion);
  base.age = normalizeNumber(raw.age);

  return base;
}

function normalizeArray(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  const result = [];
  for (const item of value) {
    if (typeof item !== 'string') continue;
    const normalized = item.trim().toLowerCase();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(normalized);
  }
  return result;
}

function normalizeNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.round(value);
  if (typeof value === 'string' && value.trim()) {
    const num = parseInt(value.replace(/[^\d]/g, ''), 10);
    if (!Number.isNaN(num)) return num;
  }
  return null;
}

function normalizeNullableString(value) {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().toLowerCase();
  return normalized || null;
}

function parseJsonLike(raw) {
  if (!raw) throw new Error('Empty LLM response');
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?([\s\S]*?)```/i);
  const jsonText = fenced ? fenced[1] : trimmed;
  try {
    return JSON.parse(jsonText);
  } catch (err) {
    throw new Error(`Failed to parse JSON from LLM: ${err.message}`);
  }
}

function fallbackParse(text) {
  const normalized = normalizeText(text);
  const parsed = createEmptyParsedQuery();

  const budget = detectBudget(normalized);
  parsed.budget_min = budget.min;
  parsed.budget_max = budget.max;

  parsed.age = detectAge(normalized);
  parsed.flowers_not_wanted = detectNegativeFlowers(normalized);
  parsed.flowers_wanted = detectKeywords(normalized, FLOWER_KEYWORDS, parsed.flowers_not_wanted);
  parsed.colours = detectKeywords(normalized, COLOUR_KEYWORDS);
  parsed.style = detectKeywords(normalized, STYLE_KEYWORDS);
  parsed.relationship = detectSingleKeyword(normalized, RELATIONSHIP_KEYWORDS);
  parsed.occasion = detectSingleKeyword(normalized, OCCASION_KEYWORDS);

  return parsed;
}

function normalizeText(text) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function detectBudget(text) {
  const result = { min: null, max: null };
  if (!text) return result;

  const rangeMatch = text.match(/от\s+(\d[\d\s]*)\s*(?:до|-|—)\s*(\d[\d\s]*)/);
  if (rangeMatch) {
    result.min = parseMoney(rangeMatch[1]);
    result.max = parseMoney(rangeMatch[2]);
    return sanitizeBudget(result);
  }

  const minMatch = text.match(/(?:от|минимум)\s+(\d[\d\s]*)/);
  if (minMatch) {
    result.min = parseMoney(minMatch[1]);
  }

  const maxMatch = text.match(/(?:до|не дороже|максимум)\s+(\d[\d\s]*)/);
  if (maxMatch) {
    result.max = parseMoney(maxMatch[1]);
  }

  if (!result.max) {
    const approxMatch = text.match(/(?:около|примерно|в районе|за)\s+(\d[\d\s]*)/);
    if (approxMatch) {
      result.max = parseMoney(approxMatch[1]);
    }
  }

  if (!result.max && !result.min) {
    const looseNumber = text.match(/(\d{3,})/g);
    if (looseNumber && looseNumber.length) {
      result.max = parseMoney(looseNumber[looseNumber.length - 1]);
    }
  }

  return sanitizeBudget(result);
}

function sanitizeBudget({ min, max }) {
  if (min && max && min > max) {
    return { min: max, max: min };
  }

  return {
    min: Number.isFinite(min) ? min : null,
    max: Number.isFinite(max) ? max : null,
  };
}

function parseMoney(raw) {
  if (!raw) return null;
  const cleaned = raw.replace(/\s+/g, '');
  const number = parseInt(cleaned, 10);
  return Number.isNaN(number) ? null : number;
}

function detectAge(text) {
  const match = text.match(/(\d{1,2})\s*(?:лет|года|годик|годика|годков)/);
  if (!match) return null;
  const age = parseInt(match[1], 10);
  if (Number.isNaN(age)) return null;
  if (age < 7 || age > 100) return null;
  return age;
}

function detectKeywords(text, dictionary, exclude = []) {
  const excludeSet = new Set(exclude);
  const result = [];
  for (const [canonical, variants] of Object.entries(dictionary)) {
    if (excludeSet.has(canonical)) continue;
    if (variants.some((v) => text.includes(v))) {
      result.push(canonical);
    }
  }
  return result;
}

function detectSingleKeyword(text, dictionary) {
  for (const [canonical, variants] of Object.entries(dictionary)) {
    if (variants.some((v) => text.includes(v))) {
      return canonical;
    }
  }
  return null;
}

function detectNegativeFlowers(text) {
  const matches = new Set();
  for (const [canonical, variants] of Object.entries(FLOWER_KEYWORDS)) {
    for (const variant of variants) {
      for (const prefix of NEGATIVE_PREFIXES) {
        if (text.includes(`${prefix} ${variant}`)) {
          matches.add(canonical);
        }
      }
    }
  }
  return Array.from(matches);
}

function mergeWithHeuristics(primary, heuristics) {
  if (!heuristics) return primary;
  const result = { ...primary };

  const hasHeuristicBudget =
    heuristics.budget_min != null || heuristics.budget_max != null;
  if (hasHeuristicBudget) {
    result.budget_min = heuristics.budget_min;
    result.budget_max = heuristics.budget_max;
  }

  result.flowers_wanted = mergeArrays(primary.flowers_wanted, heuristics.flowers_wanted);
  result.flowers_not_wanted = mergeArrays(primary.flowers_not_wanted, heuristics.flowers_not_wanted);
  result.colours = mergeArrays(primary.colours, heuristics.colours);
  result.style = mergeArrays(primary.style, heuristics.style);

  if (!result.relationship && heuristics.relationship) {
    result.relationship = heuristics.relationship;
  }
  if (!result.occasion && heuristics.occasion) {
    result.occasion = heuristics.occasion;
  }
  if (!result.age && heuristics.age) {
    result.age = heuristics.age;
  }

  return result;
}

function mergeArrays(primary = [], fallback = []) {
  const normalizedPrimary = normalizeArray(primary);
  const normalizedFallback = normalizeArray(fallback);
  const seen = new Set(normalizedPrimary);
  const merged = [...normalizedPrimary];

  for (const value of normalizedFallback) {
    if (!seen.has(value)) {
      merged.push(value);
      seen.add(value);
    }
  }

  return merged;
}

module.exports = {
  parseUserQuery,
  normalizeParsedQuery,
  createEmptyParsedQuery,
};
