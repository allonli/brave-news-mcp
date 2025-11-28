import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://api.search.brave.com/res/v1/news/search';

function buildQuery(params) {
  const url = new URL(BASE_URL);
  const qp = new URLSearchParams();
  if (!params || !params.q) throw new Error('q is required');
  qp.set('q', params.q);
  if (params.count != null) qp.set('count', String(params.count));
  if (params.country) qp.set('country', params.country);
  if (params.search_lang) qp.set('search_lang', params.search_lang);
  if (params.ui_lang) qp.set('ui_lang', params.ui_lang);
  if (params.offset != null) qp.set('offset', String(params.offset));
  if (params.spellcheck != null) qp.set('spellcheck', params.spellcheck ? '1' : '0');
  if (params.safesearch) qp.set('safesearch', params.safesearch);
  if (params.freshness) qp.set('freshness', params.freshness);
  if (params.extra_snippets != null) qp.set('extra_snippets', params.extra_snippets ? '1' : '0');
  if (Array.isArray(params.goggles)) {
    for (const g of params.goggles) qp.append('goggles', g);
  }
  if (params.operators != null) qp.set('operators', params.operators ? '1' : '0');
  url.search = qp.toString();
  return url.toString();
}

export async function searchNews(params, token) {
  const subscriptionToken = token || process.env.BRAVE_NEWS_TOKEN;
  if (!subscriptionToken) throw new Error('BRAVE_NEWS_TOKEN is not set');
  const url = buildQuery(params);
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip',
      'X-Subscription-Token': subscriptionToken,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brave API error ${res.status}: ${text}`);
  }
  return res.json();
}

export { buildQuery };

