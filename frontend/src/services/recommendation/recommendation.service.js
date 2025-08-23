import {
  extractStringsArray,
  tokens,
  scoreCalc,
  tokenizeArray,
} from './helpers';

const DEFAULT_OPTIONS = {
  weightPreference: 3,
  weightFeature: 1,
  weightCategory: 1,
  minScoreToBeValid: 1,
  maxResults: 2,
  whitelist: ['AI', 'RD'],
};

const FILTERS_OPTIONS = {
  preferences: 'preferences',
  features: 'features',
  category: 'category',
};

const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: 'SingleProduct',
  },
  products,
  options
) => {
  const list = Array.isArray(products)
    ? products
    : (products && products.products) || [];
  const opts = Object.assign({}, options ?? DEFAULT_OPTIONS);
  const filtersOpts = FILTERS_OPTIONS;
  const mode = formData.selectedRecommendationType;
  const maxResults = opts.maxResults;
  const whitelist = opts.whitelist;
  const userPrefs = Array.isArray(formData.selectedPreferences)
    ? formData.selectedPreferences
    : [];

  const userFeats = Array.isArray(formData.selectedFeatures)
    ? formData.selectedFeatures
    : [];

  const userPhrases = [...userPrefs, ...userFeats].map(String).filter(Boolean);

  const userTokens = userPhrases.flatMap((p) =>
    tokens(p, {
      minLen: 3,
      whitelist,
    })
  );

  const userTokenSet = new Set(userTokens);

  const productTokenEntries = list.map((p, idx) => {
    const pPreferences = extractStringsArray(p, filtersOpts.preferences);
    const pFeatures = extractStringsArray(p, filtersOpts.features);
    const pCategory = extractStringsArray(p, filtersOpts.category);
    const prefTokens = tokenizeArray(pPreferences, { minLen: 3, whitelist });
    const featTokens = tokenizeArray(pFeatures, { minLen: 3, whitelist });
    const catTokens = tokenizeArray(pCategory, { minLen: 3, whitelist });
    return { product: p, prefTokens, featTokens, catTokens, idx };
  });

  const scored = productTokenEntries.map((entry) => {
    const { score, matches } = scoreCalc(
      entry,
      opts,
      filtersOpts,
      userTokenSet
    );
    return { product: entry.product, score, matches, idx: entry.idx };
  });

  if (mode === 'SingleProduct') {
    const maxScore = scored.length
      ? Math.max(...scored.map((s) => s.score))
      : -Infinity;
    if (maxScore < opts.minScoreToBeValid) return [];

    for (let i = scored.length - 1; i >= 0; i--) {
      if (scored[i].score === maxScore) {
        const p = scored[i].product;
        return [
          Object.assign({}, p, {
            score: scored[i].score,
            matches: scored[i].matches,
          }),
        ];
      }
    }
    return [];
  }

  const results = scored
    .filter((s) => s.score >= opts.minScoreToBeValid)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.idx - b.idx;
    })
    .slice(0, maxResults)
    .map((s) =>
      Object.assign({}, s.product, { score: s.score, matches: s.matches })
    );

  return results;
};

export { getRecommendations };
