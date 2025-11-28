import { summarizeResults } from '../src/summarize.js';

test('summarize handles empty', () => {
  expect(summarizeResults({ results: [] })).toEqual({
    overview: 'No results', items: [], sources: [], breaking: []
  });
});

test('summarize extracts items and sources', () => {
  const resp = {
    results: [
      { url: 'https://a.com/1', title: 'A One', breaking: true, meta_url: { hostname: 'a.com' } },
      { url: 'https://b.com/2', title: 'B Two', meta_url: { hostname: 'b.com' } },
      { url: 'https://a.com/3', title: 'A Three', meta_url: { hostname: 'a.com' } },
    ]
  };
  const s = summarizeResults(resp);
  expect(s.items.length).toBe(3);
  expect(s.sources[0]).toEqual({ host: 'a.com', count: 2 });
  expect(s.breaking.length).toBe(1);
  expect(s.overview.includes('Top stories')).toBe(true);
});

