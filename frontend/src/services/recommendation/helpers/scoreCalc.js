const scoreCalc = (entry, opts, filterOptions, userTokenSet) => {
  let score = 0;
  const matches = [];
  for (const t of userTokenSet) {
    if (entry.prefTokens.has(t)) {
      score += opts.weightPreference;
      matches.push({ token: t, field: filterOptions.preferences });
    }
    if (entry.featTokens.has(t)) {
      score += opts.weightFeature;
      matches.push({ token: t, field: filterOptions.features });
    }
    if (entry.catTokens.has(t)) {
      score += opts.weightCategory;
      matches.push({ token: t, field: filterOptions.category });
    }
  }
  return { score, matches };
};

export default scoreCalc;
