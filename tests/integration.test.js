import { searchNews, buildQuery } from '../src/braveClient.js';

test('buildQuery requires q', () => {
  expect(() => buildQuery({})).toThrow();
});

test('buildQuery formats params', () => {
  const url = buildQuery({ q: 'munich', count: 10, country: 'us', search_lang: 'en', spellcheck: true });
  expect(url.includes('q=munich')).toBe(true);
  expect(url.includes('count=10')).toBe(true);
  expect(url.includes('country=us')).toBe(true);
  expect(url.includes('search_lang=en')).toBe(true);
  expect(url.includes('spellcheck=1')).toBe(true);
});

test('searchNews works when token is provided', async () => {
  const token = process.env.BRAVE_NEWS_TOKEN;
  if (!token) {
    console.warn('Skipping integration test: BRAVE_NEWS_TOKEN not set');
    return;
  }
  const data = await searchNews({ q: 'munich', count: 3 }, token);
  expect(data.type).toBe('news');
  expect(Array.isArray(data.results)).toBe(true);
});

