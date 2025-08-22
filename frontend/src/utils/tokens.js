import normalize from './normalize';

const STOP_WORDS_PT = new Set([
  'a',
  'à',
  'ao',
  'aos',
  'as',
  'o',
  'os',
  'e',
  'de',
  'do',
  'dos',
  'da',
  'das',
  'em',
  'no',
  'na',
  'nos',
  'nas',
  'um',
  'uma',
  'uns',
  'umas',
  'por',
  'para',
  'com',
  'sem',
  'sob',
  'sobre',
  'entre',
  'como',
  'que',
  'se',
  'ou',
  'mais',
  'menos',
  'quando',
  'onde',
  'quem',
  'qual',
  'os',
  'as',
  'dos',
  'das',
  'pelo',
  'pela',
  'pelos',
  'pelas',
  'suas',
  'seu',
  'sua',
  'meu',
  'minha',
  'nosso',
  'nossa',
  'também',
  'ja',
  'já',
  'isso',
  'este',
  'esta',
  'estes',
  'estas',
]);

function tokens(text, options = {}) {
  const { stopWords = STOP_WORDS_PT, minLen = 3, whitelist = [] } = options;

  if (!text && text !== 0) return [];

  const normalizedWhitelist = new Set(
    (whitelist || []).map((w) => normalize(w).toLowerCase())
  );
  const norm = normalize(text);
  const rawTokens = norm.split(/[\s,;:.()\-_]+/).filter(Boolean);
  const outSet = new Set();

  for (const tRaw of rawTokens) {
    const t = tRaw.toLowerCase();

    if (normalizedWhitelist.has(t)) {
      outSet.add(t);
      continue;
    }
    if (stopWords && stopWords.has(t)) continue;

    if (t.length < minLen) continue;

    outSet.add(t);
  }

  return Array.from(outSet);
}

export default tokens;
