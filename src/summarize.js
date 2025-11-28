function summarizeResults(apiResponse) {
  if (!apiResponse || !Array.isArray(apiResponse.results)) {
    return { overview: 'No results', items: [], sources: [], breaking: [] };
  }
  const items = apiResponse.results.map(r => ({
    url: r.url,
    title: r.title,
    description: r.description,
    age: r.age || r.page_age,
    breaking: !!r.breaking,
    host: r.meta_url?.hostname,
    thumbnail: r.thumbnail?.src,
  }));

  const sourcesMap = new Map();
  let breaking = [];
  for (const it of items) {
    if (it.host) sourcesMap.set(it.host, (sourcesMap.get(it.host) || 0) + 1);
    if (it.breaking) breaking.push(it);
  }
  const sources = Array.from(sourcesMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([host, count]) => ({ host, count }));

  if (items.length === 0) {
    return { overview: 'No results', items, sources, breaking };
  }
  const topTitles = items.slice(0, 5).map(x => x.title).filter(Boolean);
  const overview = topTitles.length
    ? `Top stories: ${topTitles.join(' | ')}`
    : 'No titles available';

  return { overview, items, sources, breaking };
}

export { summarizeResults };
